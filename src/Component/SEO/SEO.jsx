import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://tamiuzz.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * SEO component for managing per-page meta tags dynamically.
 *
 * @param {string} title - Page title
 * @param {string} description - Meta description
 * @param {string} [ogType="website"] - Open Graph type
 * @param {string} [ogImage] - Open Graph image URL
 * @param {string} [canonicalPath] - Override canonical path (defaults to current pathname)
 * @param {object} [jsonLd] - JSON-LD structured data object
 */
export default function SEO({
  title,
  description,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  canonicalPath,
  jsonLd,
}) {
  const { pathname } = useLocation();
  const canonical = `${BASE_URL}${canonicalPath || pathname}`;

  useEffect(() => {
    // Title
    document.title = title;

    // Helper to set or create a meta tag
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("name", "description", description);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", ogImage);

    // Twitter Card
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);

    // JSON-LD
    const jsonLdId = "seo-json-ld";
    let script = document.getElementById(jsonLdId);
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.id = jsonLdId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, ogType, ogImage, canonical, jsonLd]);

  return null;
}
