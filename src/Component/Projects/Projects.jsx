import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import H2 from '../Ui/H2/H2';
import style from "./Projects.module.css";

export default function Projects({ projects }) {
  const { t } = useTranslation();

  return (
    <section className={style.section}>
      {/* Floating Decorative Elements */}
      <div className={style.floatingShape1} aria-hidden="true" />
      <div className={style.floatingShape2} aria-hidden="true" />
      <div className={style.floatingShape3} aria-hidden="true" />

      <div className={style.container}>
        {/* Header */}
        <motion.div
          className={style.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={style.badge}>
            <i className="fa-solid fa-briefcase" aria-hidden="true" />
            <span>{t("projects.Portfolio", "أعمالنا")}</span>
          </div>
          <H2 text={t("projects.Our Projects")} />
          <p className={style.headerDesc}>
            {t("projects.Description")}
          </p>
        </motion.div>

        {/* Projects Showcase */}
        <motion.div
          className={style.showcase}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={32}
            slidesPerView={1}
            navigation={true}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            speed={600}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 }
            }}
            className={style.swiper}
          >
            {projects.map((project, idx) => (
              <SwiperSlide key={idx}>
                <article className={style.card}>
                  {/* Project Number */}
                  <span className={style.projectNumber}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Image Container */}
                  <div className={style.imageContainer}>
                    <img
                      loading="lazy"
                      src={project.imageUrl}
                      alt={project.title}
                      className={style.image}
                    />
                    <div className={style.imageOverlay}>
                      <div className={style.overlayContent}>
                        <span className={style.viewBtn}>
                          <i className="fa-solid fa-eye" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={style.cardContent}>
                    {project.category && (
                      <span className={style.category}>
                        <i className="fa-solid fa-folder" aria-hidden="true" />
                        {project.category}
                      </span>
                    )}
                    <h3 className={style.title}>{project.title}</h3>
                    <div className={style.cardFooter}>
                      <div className={style.techStack}>
                        <span className={style.techDot} />
                        <span className={style.techDot} />
                        <span className={style.techDot} />
                      </div>
                      <span className={style.arrow}>
                        <i className="fa-solid fa-arrow-left" aria-hidden="true" />
                      </span>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className={style.cornerAccent} aria-hidden="true" />
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className={style.statsBar}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={style.statItem}>
            <span className={style.statNumber}>{projects.length}+</span>
            <span className={style.statLabel}>{t("projects.completedProjects", "مشاريع منجزة")}</span>
          </div>
          <div className={style.statDivider} />
          <div className={style.statItem}>
            <span className={style.statNumber}>100%</span>
            <span className={style.statLabel}>{t("projects.clientSatisfaction", "رضا العملاء")}</span>
          </div>
          <div className={style.statDivider} />
          <div className={style.statItem}>
            <span className={style.statNumber}>24/7</span>
            <span className={style.statLabel}>{t("projects.support", "دعم متواصل")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
