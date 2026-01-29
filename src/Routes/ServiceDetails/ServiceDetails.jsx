import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Heading from "../../Component/Ui/Heading/Heading";
import ContactSection from "../../Component/ContactSection/ContactSection";
import Spinner from "../../Component/Ui/Spinner/Spinner";
import ErrorComp from "../../Component/Ui/ErrorComp/ErrorComp";
import NoDataFounded from "../../Component/Ui/NoDataFounded/NoDataFounded";
import { baseURL, getHeaders } from "../../Utilies/data";
import SEO from "../../Component/SEO/SEO";
import style from "./ServiceDetails.module.css";

const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
};

const ServiceDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [errorFlag, setErrorFlag] = useState(false);
  const [loading, setLoading] = useState(true);

  const getServiceDetails = useCallback(async () => {
    try {
      setLoading(true);
      setErrorFlag(false);

      // Fetch all services
      const { data } = await axios.get(`${baseURL}/services`, {
        headers: getHeaders(),
      });

      if (data.success && data.data && data.data.length !== 0) {
        setAllServices(data.data);

        // Find the current service by path or index
        const foundService = data.data.find(
          (s) => s.path === id || s.id === id || String(s.id) === id
        );

        if (foundService) {
          setService(foundService);
        } else if (id && !isNaN(Number(id)) && data.data[Number(id)]) {
          setService(data.data[Number(id)]);
        } else {
          setService(data.data[0]);
        }
      } else {
        setService(null);
        setAllServices([]);
      }
    } catch (error) {
      console.error("Error fetching service details:", error);
      setErrorFlag(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getServiceDetails();
  }, [getServiceDetails]);

  // Get other services for the "More Services" section
  const otherServices = allServices.filter(
    (s) => s.path !== service?.path && s.id !== service?.id
  ).slice(0, 3);

  return (
    <main className={style.serviceDetailsPage}>
      {service && (
        <SEO
          title={`${service.title} - Tamiuzz`}
          description={service.description?.replace(/<[^>]*>/g, "").slice(0, 160) || t("seo.services.description", "خدمات شركة تميّز للحلول الرقمية")}
          ogImage={service.imageUrl ? baseURL + service.imageUrl : undefined}
        />
      )}
      <Heading
        heading={t("servicesPage.heading")}
        subHeading={t("servicesPage.subheading")}
        pageName={t("servicesPage.serviceDetails")}
      />

      {loading ? (
        <Spinner sectionFlag />
      ) : errorFlag ? (
        <div className="container my-5">
          <ErrorComp />
        </div>
      ) : !service ? (
        <div className="container my-5">
          <NoDataFounded />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className={style.heroSection}>
            <div className="container">
              <div className={style.heroContent}>
                <motion.div
                  className={style.heroText}
                  initial="hidden"
                  animate="visible"
                  variants={ANIMATION_VARIANTS.fadeInLeft}
                >
                  <span className={style.heroLabel}>{t("services")}</span>
                  <h1 className={style.heroTitle}>{service.title}</h1>
                  <div
                    className={style.heroDescription}
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                  <div className={style.heroActions}>
                    <Link to="/support" className="btn-web btn-web-primary">
                      <i className="fa-solid fa-paper-plane" aria-hidden="true" />
                      <span>{t("supportPage.contact with us")}</span>
                    </Link>
                  </div>
                </motion.div>

                <motion.div
                  className={style.heroImageWrapper}
                  initial="hidden"
                  animate="visible"
                  variants={ANIMATION_VARIANTS.fadeInRight}
                >
                  <div className={style.heroImageContainer}>
                    <img
                      src={baseURL + service.imageUrl}
                      alt={service.title}
                      className={style.heroImage}
                    />
                  </div>
                  <div className={style.heroImageDecoration} aria-hidden="true" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Other Services Section */}
          {otherServices.length > 0 && (
            <section className={style.moreServicesSection}>
              <div className="container">
                <motion.div
                  className={style.sectionHeader}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={ANIMATION_VARIANTS.fadeIn}
                >
                  <span className={style.sectionLabel}>{t("servicesPage.explore-more")}</span>
                  <h2 className={style.sectionTitle}>{t("servicesPage.other-services")}</h2>
                </motion.div>

                <motion.div
                  className={style.servicesGrid}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={ANIMATION_VARIANTS.staggerContainer}
                >
                  {otherServices.map((otherService, idx) => (
                    <motion.article
                      key={otherService.id || idx}
                      className={style.serviceCard}
                      variants={ANIMATION_VARIANTS.staggerItem}
                    >
                      <Link
                        to={`/services/${otherService.path || idx}`}
                        className={style.serviceCardLink}
                      >
                        <div className={style.serviceCardImage}>
                          <img
                            src={baseURL + otherService.imageUrl}
                            alt={otherService.title}
                            loading="lazy"
                          />
                        </div>
                        <div className={style.serviceCardContent}>
                          <h3 className={style.serviceCardTitle}>
                            {otherService.title}
                          </h3>
                          <span className={style.serviceCardArrow}>
                            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
                          </span>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </motion.div>

                <motion.div
                  className={style.viewAllWrapper}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={ANIMATION_VARIANTS.fadeIn}
                >
                  <Link to="/services" className="btn-web btn-web-outline">
                    {t("servicesPage.view-all-services")}
                  </Link>
                </motion.div>
              </div>
            </section>
          )}
        </>
      )}

      <ContactSection />
    </main>
  );
};

export default ServiceDetails;
