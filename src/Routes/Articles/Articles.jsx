import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ArticleCard from "../../Component/ArticleCard/ArticleCard";
import H2 from "../../Component/Ui/H2/H2";
import Heading from "../../Component/Ui/Heading/Heading";
import Spinner from "../../Component/Ui/Spinner/Spinner";
import ErrorComp from "../../Component/Ui/ErrorComp/ErrorComp";
import NoDataFounded from "../../Component/Ui/NoDataFounded/NoDataFounded";
import { baseURL, getHeaders } from "../../Utilies/data";
import SEO from "../../Component/SEO/SEO";
import style from "./Articles.module.css";

const Articles = () => {
  const { t } = useTranslation();

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      setArticles([]);

      const { data } = await axios.get(`${baseURL}/blogs`, {
        headers: getHeaders(),
      });

      if (data.success && data.data?.length > 0) {
        setArticles(data.data);
      } else {
        setArticles([]);
      }
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={style.loadingState}>
          <Spinner sectionFlag />
        </div>
      );
    }

    if (hasError) {
      return (
        <div className={style.errorState}>
          <ErrorComp />
        </div>
      );
    }

    if (articles.length === 0) {
      return (
        <div className={style.emptyState}>
          <NoDataFounded />
        </div>
      );
    }

    return (
      <div className="container">
        <div className={style.articlesGrid}>
          {articles.map((article, idx) => (
            <ArticleCard key={article.id || idx} idx={idx} {...article} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className={style.articlesPage}>
      <SEO
        title={t("seo.articles.title", "مقالات تميّز - أحدث المقالات في التسويق الرقمي | Tamiuzz Articles")}
        description={t("seo.articles.description", "اقرأ أحدث المقالات والنصائح في التسويق الإلكتروني، SEO، تصميم المواقع وإدارة وسائل التواصل الاجتماعي من خبراء شركة تميّز.")}
      />
      <Heading
        heading={t("articlePage.heading")}
        subHeading={t("articlePage.subheading")}
        pageName="articles"
      />

      {!isLoading && !hasError && articles.length > 0 && (
        <H2 text={t("articlePage.Top Articles")} />
      )}

      {renderContent()}
    </main>
  );
};

export default Articles;
