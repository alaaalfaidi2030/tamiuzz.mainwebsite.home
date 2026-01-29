import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import axios from "axios";
import Heading from "../../Component/Ui/Heading/Heading";
import H3 from "../../Component/Ui/H3/H3";
import ContactSection from "../../Component/ContactSection/ContactSection";
import ServiceCard from "../../Component/ServiceCard/ServiceCard";
import Spinner from "../../Component/Ui/Spinner/Spinner";
import ErrorComp from "../../Component/Ui/ErrorComp/ErrorComp";
import NoDataFounded from "../../Component/Ui/NoDataFounded/NoDataFounded";
import { baseURL, getHeaders } from "../../Utilies/data";
import SEO from "../../Component/SEO/SEO";
import style from "./Services.module.css";

const ANIMATION_VARIANTS = {
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
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
};

const Services = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
  const [errorFlag, setErrorFlag] = useState(false);
  const [loading, setLoading] = useState(true);

  const getServices = useCallback(async () => {
    try {
      setLoading(true);
      setErrorFlag(false);
      setServices([]);
      const { data } = await axios.get(`${baseURL}/services`, {
        headers: getHeaders(),
      });
      if (data.success && data.data && data.data.length !== 0) {
        setServices(data.data);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setErrorFlag(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getServices();
  }, [getServices]);

  return (
    <main className={style.servicesPage} id="services">
      <SEO
        title={t("seo.services.title", "خدماتنا - شركة تميّز | Tamiuzz Services")}
        description={t("seo.services.description", "خدمات تسويق إلكتروني متكاملة: SEO، تصميم مواقع، حملات إعلانية، إدارة وسائل التواصل الاجتماعي. شركة تميّز شريكك الرقمي منذ 2018.")}
      />
      <Heading
        heading={t("servicesPage.heading")}
        subHeading={t("servicesPage.subheading")}
        pageName={t("services")}
      />

      {!loading ? (
        <div className="container my-5 pb-5">
          {errorFlag ? (
            <ErrorComp />
          ) : services.length === 0 ? (
            <NoDataFounded />
          ) : (
            <>
              <H3 text={t("servicesPage.ServicesSubTitle")} />

              <motion.div
                className={style.servicesGrid}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={ANIMATION_VARIANTS.staggerContainer}
              >
                {services.map((service, idx) => (
                  <motion.div
                    key={service.id || idx}
                    variants={ANIMATION_VARIANTS.staggerItem}
                  >
                    <ServiceCard {...service} idx={idx} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      ) : (
        <Spinner sectionFlag={true} />
      )}

      <ContactSection />
    </main>
  );
};

export default Services;
