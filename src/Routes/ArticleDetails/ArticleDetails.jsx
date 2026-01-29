import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Heading from "../../Component/Ui/Heading/Heading";
import Spinner from "../../Component/Ui/Spinner/Spinner";
import NoDataFounded from "../../Component/Ui/NoDataFounded/NoDataFounded";
import ContactSection from "../../Component/ContactSection/ContactSection";
import { baseURL, getHeaders } from "../../Utilies/data";
import SEO from "../../Component/SEO/SEO";
import style from "./ArticleDetails.module.css";

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  image: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
};

const ArticleDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchArticleDetails = useCallback(async () => {
    if (!id) {
      navigate("/articles");
      return;
    }

    try {
      setIsLoading(true);
      setHasError(false);
      setArticle(null);

      const { data } = await axios.get(`${baseURL}/blog/${id}`, {
        headers: getHeaders(),
      });

      if (data.success && data.data) {
        setArticle(data.data);
        // Fetch related articles
        fetchRelatedArticles();
      } else {
        setArticle(null);
      }
    } catch (error) {
      console.error("Failed to fetch article details:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  const fetchRelatedArticles = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/blog`, {
        headers: getHeaders(),
      });
      if (data.success && data.data) {
        // Filter out current article and take first 3
        const filtered = data.data
          .filter((a) => a.id !== id && a._id !== id)
          .slice(0, 3);
        setRelatedArticles(filtered);
      }
    } catch (error) {
      console.error("Failed to fetch related articles:", error);
    }
  };

  useEffect(() => {
    fetchArticleDetails();
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [fetchArticleDetails]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article?.title || "";

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  if (isLoading) {
    return (
      <main className={style.articleDetailsPage}>
        <Heading
          heading={t("articlePage.heading")}
          subHeading={t("articlePage.subheading")}
          pageName={t("articlePage.article details")}
        />
        <div className={style.loadingState}>
          <Spinner sectionFlag />
        </div>
      </main>
    );
  }

  if (hasError || !article) {
    return (
      <main className={style.articleDetailsPage}>
        <Heading
          heading={t("articlePage.heading")}
          subHeading={t("articlePage.subheading")}
          pageName={t("articlePage.article details")}
        />
        <div className={style.emptyState}>
          <NoDataFounded />
        </div>
      </main>
    );
  }

  return (
    <main className={style.articleDetailsPage}>
      <SEO
        title={`${article.title} - Tamiuzz`}
        description={article.description?.replace(/<[^>]*>/g, "").slice(0, 160) || t("seo.articles.description", "مقالات شركة تميّز للحلول الرقمية")}
        ogType="article"
        ogImage={article.imageUrl || undefined}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.title,
          "image": article.imageUrl || undefined,
          "author": article.author ? { "@type": "Person", "name": article.author } : { "@type": "Organization", "name": "Tamiuzz" },
          "datePublished": article.date || undefined,
          "publisher": {
            "@type": "Organization",
            "name": "Tamiuzz - شركة تميّز",
            "logo": { "@type": "ImageObject", "url": "https://tamiuzz.com/logo.svg" }
          }
        }}
      />
      <Heading
        heading={t("articlePage.heading")}
        subHeading={t("articlePage.subheading")}
        pageName={t("articlePage.article details")}
      />

      {/* Hero Section */}
      <section className={style.heroSection}>
        <div className="container">
          <motion.div
            className={style.heroContent}
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS.container}
          >
            {/* Featured Image */}
            {article.imageUrl && (
              <motion.div
                className={style.featuredImageWrapper}
                variants={ANIMATION_VARIANTS.image}
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className={style.featuredImage}
                />
                <div className={style.imageOverlay} />
              </motion.div>
            )}

            {/* Article Header */}
            <motion.div className={style.articleHeader} variants={ANIMATION_VARIANTS.item}>
              {/* Category Badge */}
              {article.category && (
                <span className={style.categoryBadge}>
                  <i className="fa-solid fa-folder" aria-hidden="true" />
                  {article.category}
                </span>
              )}

              {/* Title */}
              <h1 className={style.articleTitle}>{article.title}</h1>

              {/* Meta Information */}
              <div className={style.metaInfo}>
                {article.author && (
                  <div className={style.metaItem}>
                    <div className={style.metaIcon}>
                      <i className="fa-solid fa-user" aria-hidden="true" />
                    </div>
                    <span>{article.author}</span>
                  </div>
                )}
                {article.date && (
                  <div className={style.metaItem}>
                    <div className={style.metaIcon}>
                      <i className="fa-solid fa-calendar" aria-hidden="true" />
                    </div>
                    <span>{article.date}</span>
                  </div>
                )}
                {article.readTime && (
                  <div className={style.metaItem}>
                    <div className={style.metaIcon}>
                      <i className="fa-solid fa-clock" aria-hidden="true" />
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className={style.contentSection}>
        <div className="container">
          <div className={style.contentWrapper}>
            {/* Main Content */}
            <motion.article
              className={style.articleContent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={ANIMATION_VARIANTS.container}
            >
              {article.sections?.map((section, idx) => (
                <motion.div
                  key={idx}
                  className={style.section}
                  variants={ANIMATION_VARIANTS.item}
                >
                  {section.title && (
                    <h2 className={style.sectionTitle}>{section.title}</h2>
                  )}
                  <div
                    className={style.sectionContent}
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                  {section.imageUrl && (
                    <figure className={style.sectionImage}>
                      <img
                        src={section.imageUrl}
                        alt={section.title || `${t("articlePage.article details")} ${idx + 1}`}
                        loading="lazy"
                      />
                    </figure>
                  )}
                </motion.div>
              ))}

              {/* If no sections, show description */}
              {(!article.sections || article.sections.length === 0) && article.description && (
                <motion.div className={style.section} variants={ANIMATION_VARIANTS.item}>
                  <div
                    className={style.sectionContent}
                    dangerouslySetInnerHTML={{ __html: article.description }}
                  />
                </motion.div>
              )}
            </motion.article>

            {/* Sidebar */}
            <aside className={style.sidebar}>
              {/* Share Card */}
              <div className={style.shareCard}>
                <h4 className={style.shareTitle}>
                  <i className="fa-solid fa-share-nodes" aria-hidden="true" />
                  {t("articlePage.share") || "Share"}
                </h4>
                <div className={style.shareButtons}>
                  <button
                    className={`${style.shareButton} ${style.shareTwitter}`}
                    onClick={() => handleShare("twitter")}
                    aria-label="Share on Twitter"
                  >
                    <i className="fa-brands fa-x-twitter" aria-hidden="true" />
                  </button>
                  <button
                    className={`${style.shareButton} ${style.shareFacebook}`}
                    onClick={() => handleShare("facebook")}
                    aria-label="Share on Facebook"
                  >
                    <i className="fa-brands fa-facebook-f" aria-hidden="true" />
                  </button>
                  <button
                    className={`${style.shareButton} ${style.shareLinkedin}`}
                    onClick={() => handleShare("linkedin")}
                    aria-label="Share on LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
                  </button>
                  <button
                    className={`${style.shareButton} ${style.shareWhatsapp}`}
                    onClick={() => handleShare("whatsapp")}
                    aria-label="Share on WhatsApp"
                  >
                    <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                  </button>
                  <button
                    className={`${style.shareButton} ${style.shareCopy}`}
                    onClick={copyLink}
                    aria-label="Copy link"
                  >
                    <i className="fa-solid fa-link" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Back to Articles */}
              <Link to="/articles" className={style.backLink}>
                <i className="fa-solid fa-arrow-left" aria-hidden="true" />
                {t("articlePage.back_to_articles") || "Back to Articles"}
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className={style.relatedSection}>
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={ANIMATION_VARIANTS.container}
            >
              <motion.div className={style.relatedHeader} variants={ANIMATION_VARIANTS.item}>
                <span className={style.relatedLabel}>
                  {t("articlePage.related") || "Related"}
                </span>
                <h3 className={style.relatedTitle}>
                  {t("articlePage.related_articles") || "Related Articles"}
                </h3>
              </motion.div>

              <div className={style.relatedGrid}>
                {relatedArticles.map((relatedArticle, idx) => (
                  <motion.div
                    key={relatedArticle.id || relatedArticle._id || idx}
                    variants={ANIMATION_VARIANTS.item}
                  >
                    <Link
                      to={`/articles/${relatedArticle.id || relatedArticle._id}`}
                      className={style.relatedCard}
                    >
                      <div className={style.relatedImageWrapper}>
                        <img
                          src={relatedArticle.imageUrl}
                          alt={relatedArticle.title}
                          loading="lazy"
                        />
                      </div>
                      <div className={style.relatedContent}>
                        <h4 className={style.relatedCardTitle}>
                          {relatedArticle.title}
                        </h4>
                        {relatedArticle.date && (
                          <span className={style.relatedDate}>
                            <i className="fa-solid fa-calendar" aria-hidden="true" />
                            {relatedArticle.date}
                          </span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <ContactSection />
    </main>
  );
};

export default ArticleDetails;
