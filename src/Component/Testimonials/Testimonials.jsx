import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import H2 from '../Ui/H2/H2';
import TestimonialCard from '../TestimonialCard/TestimonialCard';
import style from "./Testimonials.module.css";

export default function Testimonials({ rates }) {
  const { t } = useTranslation();

  return (
    <section className={style.section}>
      {/* Animated Background Shapes */}
      <div className={style.bgShape1} aria-hidden="true" />
      <div className={style.bgShape2} aria-hidden="true" />

      {/* Decorative Quote Marks */}
      <span className={style.quoteLeft} aria-hidden="true">"</span>
      <span className={style.quoteRight} aria-hidden="true">"</span>

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
            <i className="fa-solid fa-quote-right" aria-hidden="true" />
            <span>{t("testimonials.clientReviews", "آراء العملاء")}</span>
          </div>
          <H2 text={t("homePage.Testimonials")} />
          <p className={style.headerDesc}>
            {t("homePage.Some of our customer testimonials")}
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <motion.div
          className={style.sliderWrapper}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 24 },
              768: { slidesPerView: 2, spaceBetween: 28 },
              1024: { slidesPerView: 3, spaceBetween: 32 }
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className={style.swiper}
          >
            {rates?.map((item, idx) => (
              <SwiperSlide key={idx}>
                <TestimonialCard idx={idx} {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
