import { useRef, useEffect } from 'react';
import H2 from '../Ui/H2/H2';
import { useTranslation } from 'react-i18next';
import H3 from '../Ui/H3/H3';
import style from "./ArticlesInHome.module.css";
import ArticleCard from '../ArticleCard/ArticleCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

export default function ArticlesInHome({ blogs }) {
    const { t } = useTranslation();

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    // const articlesData = [
    //     {
    //         id: 1,
    //         image: '/assets/images/articles/article1.png',
    //         date: '17',
    //         month: 'Feb',
    //         author: 'المشرف',
    //         category: 'خدمات برمجيه',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     },
    //     {
    //         id: 2,
    //         image: '/assets/images/articles/article2.png',
    //         date: '20',
    //         month: 'May',
    //         author: 'المشرف',
    //         category: 'مصمم واجهة وتجربة المستخدم',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     },
    //     {
    //         id: 3,
    //         image: '/assets/images/articles/article3.png',
    //         date: '20',
    //         month: 'May',
    //         author: 'المشرف',
    //         category: 'أمن سيبراني',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     }, {
    //         id: 1,
    //         image: '/assets/images/articles/article1.png',
    //         date: '17',
    //         month: 'Feb',
    //         author: 'المشرف',
    //         category: 'خدمات برمجيه',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     },
    //     {
    //         id: 2,
    //         image: '/assets/images/articles/article2.png',
    //         date: '20',
    //         month: 'May',
    //         author: 'المشرف',
    //         category: 'مصمم واجهة وتجربة المستخدم',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     },
    //     {
    //         id: 3,
    //         image: '/assets/images/articles/article3.png',
    //         date: '20',
    //         month: 'May',
    //         author: 'المشرف',
    //         category: 'أمن سيبراني',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     }, {
    //         id: 1,
    //         image: '/assets/images/articles/article1.png',
    //         date: '17',
    //         month: 'Feb',
    //         author: 'المشرف',
    //         category: 'خدمات برمجيه',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     },
    //     {
    //         id: 2,
    //         image: '/assets/images/articles/article2.png',
    //         date: '20',
    //         month: 'May',
    //         author: 'المشرف',
    //         category: 'مصمم واجهة وتجربة المستخدم',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     },
    //     {
    //         id: 3,
    //         image: '/assets/images/articles/article3.png',
    //         date: '20',
    //         month: 'May',
    //         author: 'المشرف',
    //         category: 'أمن سيبراني',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     }
    // ];
 
    return (
        <div className={"container py-5 " + style.ArticleHomeContainer}>
            <motion.div
                className={style.heading}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <H2 text={t("articlePage.Top Articles")} />
                <H3 text={t("homePage.follow our newest articles")} />
            </motion.div>

            <div className="row">
                <ArticlesSlider articles={
                    blogs
                } />
            </div>
        </div>
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
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
            >
                {articles.map((article, idx) => (
                    <SwiperSlide key={idx} className='py-5 mx-auto'>

                        <ArticleCard idx={idx} {...article} urlPath={article.path} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={"d-flex justify-content-center gap-3 mt-4 " + style.buttonContainer}>
                <button
                    ref={prevRef}
                    className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 40, height: 40 }}
                >
                    <i className="fa fa-chevron-right"></i>
                </button>
                <button
                    ref={nextRef}
                    className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 40, height: 40 }}
                >
                    <i className="fa fa-chevron-left"></i>
                </button>
            </div>
        </div>
    );
}
