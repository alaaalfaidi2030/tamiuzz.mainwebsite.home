import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import H2 from '../Ui/H2/H2';
import { useTranslation } from 'react-i18next';
import H3 from '../Ui/H3/H3';
import style from "./ArticlesInHome.module.css";
import ArticleCard from '../ArticleCard/ArticleCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

export default function ArticlesInHome({ blogs }) {
    const { t } = useTranslation();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const headingVariants = {
        hidden: { opacity: 0, y: -25, scale: 0.96 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const subHeadingVariants = {
        hidden: { opacity: 0, y: -12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.1
            }
        }
    };

    return (
        <motion.div
            className={"container py-5 " + style.ArticleHomeContainer}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
        >
            {/* Floating Decorative Shapes */}
            <motion.div
                className={style.floatingShape1}
                animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0],
                    rotate: [0, 8, 0]
                }}
                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className={style.floatingShape2}
                animate={{
                    y: [0, 28, 0],
                    x: [0, -18, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 13,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className={style.floatingShape3}
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, -6, 0]
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div className={style.heading}>
                <motion.div variants={headingVariants}>
                    <H2 text={t("homePage.Top Articles")} />
                </motion.div>
                <motion.div variants={subHeadingVariants}>
                    <H3 text={t("homePage.follow our newest articles")} />
                </motion.div>
            </motion.div>

            <div className="row">
                <ArticlesSlider articles={blogs} />
            </div>

            <motion.div
                className={style.viewAllContainer}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 15,
                    delay: 0.5
                }}
            >
                <Link to="/articles" className={style.viewAllLink}>
                    <div className={style.linkGlow} />
                    <motion.span
                        className={style.linkContent}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        {t("View All Articles", "عرض جميع المقالات")}
                    </motion.span>
                    <motion.i
                        className="fas fa-arrow-left"
                        whileHover={{ x: -4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                </Link>
            </motion.div>
        </motion.div>
    );
}

function ArticlesSlider({ articles }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (
            swiperRef.current &&
            prevRef.current &&
            nextRef.current &&
            swiperRef.current.params?.navigation
        ) {
            swiperRef.current.params.navigation.prevEl = prevRef.current;
            swiperRef.current.params.navigation.nextEl = nextRef.current;
            swiperRef.current.navigation.destroy();
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);

    return (
        <div className="solution-slider-container position-relative">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                speed={800}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 24 }
                }}
            >
                {articles.map((article, idx) => (
                    <SwiperSlide key={article.id || idx} className='py-5 mx-auto'>
                        <ArticleCard idx={idx} {...article} urlPath={article.path} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <motion.div
                className={"d-flex justify-content-center gap-3 mt-4 " + style.buttonContainer}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 15,
                    delay: 0.3
                }}
            >
                <PremiumNavButton ref={prevRef} direction="prev" />
                <PremiumNavButton ref={nextRef} direction="next" />
            </motion.div>
        </div>
    );
}

// Enhanced Navigation Button Component
const PremiumNavButton = React.forwardRef(({ direction }, ref) => {
    return (
        <motion.button
            ref={ref}
            className={style.navButton}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            animate="rest"
            aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
        >
            <div className={style.buttonGlow} />
            <motion.i
                className={`fa fa-chevron-${direction === "prev" ? "right" : "left"}`}
                variants={{
                    rest: { scale: 1, rotate: 0 },
                    hover: {
                        scale: 1.15,
                        x: direction === "prev" ? 2 : -2,
                        transition: {
                            type: "spring",
                            stiffness: 300
                        }
                    },
                    tap: { scale: 0.95 }
                }}
            />
        </motion.button>
    );
});

PremiumNavButton.displayName = 'PremiumNavButton';
