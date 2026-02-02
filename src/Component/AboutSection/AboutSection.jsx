import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import H2 from '../Ui/H2/H2';
import style from './AboutSection.module.css';

export default function AboutSection({ counter, logos, services }) {
  const { t } = useTranslation();

  return (
    <section className={style.section}>
      <div className={style.container}>
        {/* Header */}
        <motion.div
          className={style.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <H2 text={t("homePage.aboutHomeHeading")} />
        </motion.div>

        {/* Creative Grid Layout */}
        <div className={style.grid}>
          {/* Left - Main Content */}
          <motion.div
            className={style.mainContent}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className={style.badge}>
              <i className="fa-solid fa-star" aria-hidden="true" />
              {t("homePage.aboutHomeHeading")}
            </span>

            <h3 className={style.title}>
              {t("homePage.aboutSectionTitle")}
            </h3>

            <p className={style.description}>
              {t("homePage.aboutSectionDescription")}
            </p>

            {/* Stats Row */}
            <div className={style.statsRow}>
              <div className={style.stat}>
                <div className={style.statNumber}>{counter.projects}+</div>
                <div className={style.statLabel}>{t("homePage.projectsLabel")}</div>
              </div>
              <div className={style.stat}>
                <div className={style.statNumber}>{counter.clients}+</div>
                <div className={style.statLabel}>{t("homePage.clientsLabel")}</div>
              </div>
            </div>

            <Link to="/services" className={style.cta}>
              <span>{t("homePage.servicesDetailsButton")}</span>
              <i className="fa-solid fa-arrow-left" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Right - Services Card */}
          <motion.div
            className={style.servicesCard}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={style.servicesHeader}>
              <div className={style.servicesIcon}>
                <i className="fa-solid fa-cubes" aria-hidden="true" />
              </div>
              <h4 className={style.servicesTitle}>{t("services")}</h4>
            </div>

            <div className={style.servicesList}>
              {services.slice(0, 5).map((service, idx) => (
                <Link
                  key={idx}
                  to={`/services/${service.path}`}
                  className={style.serviceItem}
                >
                  <i className="fa-solid fa-bolt" aria-hidden="true" />
                  <span>{service.title}</span>
                  <i className="fa-solid fa-arrow-left serviceArrow" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Partners Section */}
        <motion.div
          className={style.partners}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className={style.partnersHeader}>
            <span className={style.partnersBadge}>
              <i className="fa-solid fa-handshake" aria-hidden="true" />
              {t("homePage.MoreThanOneHundredBrands")}
            </span>
          </div>

          <Swiper
            spaceBetween={32}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 20 },
              480: { slidesPerView: 3, spaceBetween: 24 },
              768: { slidesPerView: 4, spaceBetween: 28 },
              1024: { slidesPerView: 5, spaceBetween: 32 },
            }}
            modules={[Autoplay]}
            className={style.partnersSwiper}
          >
            {logos.map((logo, idx) => (
              <SwiperSlide key={idx}>
                <div className={style.logoBox}>
                  <img
                    loading="lazy"
                    src={"https://tamiuzz.com/" + logo.imageUrl}
                    alt={logo.name}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
