import { useState, useRef, useEffect } from "react";
import style from "./OptimizedImage.module.css";

/**
 * OptimizedImage Component
 * Provides lazy loading, WebP support with fallback, and responsive srcset
 *
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility (required)
 * @param {string} webpSrc - WebP version of the image (optional)
 * @param {number} width - Image width for aspect ratio
 * @param {number} height - Image height for aspect ratio
 * @param {string} sizes - Responsive sizes attribute
 * @param {string} className - Additional CSS classes
 * @param {boolean} priority - If true, loads immediately (above-the-fold images)
 * @param {string} objectFit - CSS object-fit value (cover, contain, etc.)
 * @param {Function} onLoad - Callback when image loads
 */
const OptimizedImage = ({
  src,
  alt,
  webpSrc,
  width,
  height,
  sizes = "100vw",
  className = "",
  priority = false,
  objectFit = "cover",
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px 0px", // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  // Generate srcset for responsive images if width is provided
  const generateSrcSet = (imageSrc) => {
    if (!imageSrc || !width) return undefined;

    // For external URLs, just return the original
    if (imageSrc.startsWith("http")) {
      return `${imageSrc} ${width}w`;
    }

    // For local images, you could implement different sizes
    // This is a placeholder - actual implementation depends on your build setup
    return `${imageSrc} ${width}w`;
  };

  // Aspect ratio for skeleton placeholder
  const aspectRatio = width && height ? width / height : undefined;

  return (
    <div
      ref={imgRef}
      className={`${style.imageWrapper} ${className}`}
      style={{
        aspectRatio: aspectRatio,
        "--object-fit": objectFit,
      }}
    >
      {/* Skeleton placeholder */}
      {!isLoaded && !hasError && (
        <div className={style.skeleton} aria-hidden="true">
          <div className={style.shimmer} />
        </div>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className={style.errorFallback} aria-hidden="true">
          <i className="fa-solid fa-image" />
        </div>
      )}

      {/* Actual image with picture element for WebP support */}
      {isInView && !hasError && (
        <picture>
          {/* WebP source if provided */}
          {webpSrc && (
            <source srcSet={generateSrcSet(webpSrc)} type="image/webp" sizes={sizes} />
          )}

          {/* Fallback to original format */}
          <img
            src={src}
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            onLoad={handleLoad}
            onError={handleError}
            className={`${style.image} ${isLoaded ? style.loaded : ""}`}
            {...props}
          />
        </picture>
      )}
    </div>
  );
};

export default OptimizedImage;
