import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import H2 from '../Ui/H2/H2';
import { phoneAndEmail } from '../../Utilies/data';
import style from "./WhatWeAreDoing.module.css";

export default function WhatWeAreDoing({ solutions }) {
  const { t } = useTranslation();

  return (
    <section className={style.section}>
      <div className={style.container}>
        {/* Header */}
        <motion.div
          className={style.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <H2 text={t("homePage.what are we doing?")} light />
          <p className={style.headerDesc}>
            {t("homePage.what are we doing?_desc")}
          </p>
        </motion.div>

        {/* Solutions Slider */}
        <motion.div
          className={style.sliderWrapper}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            speed={600}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 }
            }}
            className={style.swiper}
          >
            {solutions.map((solution, idx) => (
              <SwiperSlide key={idx}>
                <Link to={`/solutions/${solution.path}`} className={style.card}>
                  {/* Image */}
                  <div className={style.cardImage}>
                    <img
                      loading="lazy"
                      src={solution.imageUrl}
                      alt={solution.title}
                    />
                    {/* Icon */}
                    {solution.iconUrl && (
                      <div className={style.cardIcon}>
                        <img
                          loading="lazy"
                          src={solution.iconUrl}
                          alt=""
                          width={22}
                          height={22}
                        />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={style.cardBody}>
                    <h3 className={style.cardTitle}>{solution.title}</h3>
                    <p className={style.cardDesc}>{solution.shortDescription}</p>
                    <span className={style.cardLink}>
                      {t("read more")}
                      <i className="fa-solid fa-arrow-left" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Contact Bar */}
        <motion.div
          className={style.contactBar}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className={style.contactTitle}>
            <i className="fa-solid fa-comments" aria-hidden="true" />
            <span>{t("homePage.keep in touch with us")}</span>
          </div>

          <div className={style.contactItems}>
            {phoneAndEmail.map((item, idx) => (
              <div key={idx} className={style.contactItem}>
                <div className={style.contactIcon}>
                  <i className={item.icon} aria-hidden="true" />
                </div>
                <div className={style.contactInfo}>
                  <span className={style.contactLabel}>{t(item.title)}</span>
                  <span className={style.contactValue} dir="ltr">{item.text}</span>
                </div>
              </div>
            ))}
          </div>

          <Link to="/support" className={style.contactBtn}>
            <span>{t("aboutSection.request-quote-button")}</span>
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
