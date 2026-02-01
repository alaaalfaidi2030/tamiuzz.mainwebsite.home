import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import style from './FAQ.module.css';
import H2 from '../../Component/Ui/H2/H2';
import Heading from '../../Component/Ui/Heading/Heading';
import { baseURL, getHeaders } from '../../Utilies/data';
import Spinner from '../../Component/Ui/Spinner/Spinner';
import NoDataFounded from '../../Component/Ui/NoDataFounded/NoDataFounded';
import ErrorComp from '../../Component/Ui/ErrorComp/ErrorComp';
import SEO from '../../Component/SEO/SEO';

const ANIMATION_VARIANTS = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
    },
    item: {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            },
        },
    },
};

function FAQ() {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(null);
    const [faq, setFaq] = useState([]);
    const [errorFlag, setErrorFlag] = useState(false);
    const [loading, setLoading] = useState(false);

    const getFaq = async () => {
        try {
            setLoading(true);
            setErrorFlag(false);
            setFaq([]);
            const { data } = await axios.get(baseURL + "/faqs", {
                headers: getHeaders(),
            });
            if (data.success && data.data && data.data.length !== 0) {
                setFaq(data.data);
                setLoading(false);
            } else {
                setFaq([]);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setErrorFlag(true);
        }
    };

    const toggleItem = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    useEffect(() => {
        getFaq();
    }, []);

    return (
        <>
            <SEO
                title={t("seo.faq.title", "الأسئلة الشائعة - شركة تميّز | Tamiuzz FAQ")}
                description={t("seo.faq.description", "إجابات على أكثر الأسئلة شيوعاً حول خدمات شركة تميّز للحلول الرقمية والتسويق الإلكتروني.")}
                jsonLd={faq.length > 0 ? {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": faq.map(item => ({
                        "@type": "Question",
                        "name": item.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": item.answer
                        }
                    }))
                } : undefined}
            />
            <Heading pageName="faq" />
            <H2 text={t("faq")} />

            {loading ? (
                <Spinner sectionFlag={true} />
            ) : (
                <section className={style.faqSection}>
                    {/* Animated Gradient Orbs */}
                    <div className={style.orbsContainer}>
                        <motion.div
                            className={style.orb1}
                            animate={{
                                scale: [1, 1.2, 1],
                                x: [0, 40, 0],
                                y: [0, -30, 0],
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className={style.orb2}
                            animate={{
                                scale: [1, 1.15, 1],
                                x: [0, -35, 0],
                                y: [0, 35, 0],
                            }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className={style.orb3}
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 180, 360],
                            }}
                            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Grid Pattern Overlay */}
                    <div className={style.gridPattern} />

                    <div className="container">
                        {errorFlag ? (
                            <ErrorComp />
                        ) : faq.length === 0 ? (
                            <NoDataFounded />
                        ) : (
                            <div className={style.content}>
                                {/* Header */}
                                <motion.div
                                    className={style.header}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <div className={style.headerBadge}>
                                        <i className="fa-solid fa-circle-question" />
                                        <span>{t('faqPage.badge', 'الأسئلة الشائعة')}</span>
                                    </div>
                                    <h2 className={style.title}>
                                        {t('faqPage.headline1')}
                                        <span className={style.titleHighlight}> {t('faqPage.headline2')}</span>
                                    </h2>
                                    <p className={style.subtitle}>
                                        {t('faqPage.subtitle', 'نجيب على جميع استفساراتك لمساعدتك في اتخاذ القرار الصحيح')}
                                    </p>
                                </motion.div>

                                {/* FAQ Grid */}
                                <div className={style.faqGrid}>
                                    {/* Accordion */}
                                    <motion.div
                                        className={style.accordion}
                                        variants={ANIMATION_VARIANTS.container}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.1 }}
                                    >
                                        {faq.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                className={`${style.faqItem} ${activeIndex === index ? style.active : ''}`}
                                                variants={ANIMATION_VARIANTS.item}
                                            >
                                                {/* Glass Card */}
                                                <div className={style.glassCard}>
                                                    {/* Number Badge */}
                                                    <div className={style.numberBadge}>
                                                        <span>{String(index + 1).padStart(2, '0')}</span>
                                                    </div>

                                                    {/* Question */}
                                                    <button
                                                        className={style.question}
                                                        onClick={() => toggleItem(index)}
                                                        aria-expanded={activeIndex === index}
                                                    >
                                                        <span className={style.questionText}>{item.question}</span>
                                                        <motion.div
                                                            className={style.iconWrapper}
                                                            animate={{ rotate: activeIndex === index ? 45 : 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <i className="fa-solid fa-plus" />
                                                        </motion.div>
                                                    </button>

                                                    {/* Answer */}
                                                    <AnimatePresence>
                                                        {activeIndex === index && (
                                                            <motion.div
                                                                className={style.answer}
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            >
                                                                <div className={style.answerContent}>
                                                                    <div className={style.answerIcon}>
                                                                        <i className="fa-solid fa-lightbulb" />
                                                                    </div>
                                                                    <p>{item.answer}</p>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    {/* Side Panel */}
                                    <motion.div
                                        className={style.sidePanel}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        viewport={{ once: true }}
                                    >
                                        {/* Stats Card */}
                                        <div className={style.statsCard}>
                                            <div className={style.statsIcon}>
                                                <i className="fa-solid fa-headset" />
                                            </div>
                                            <h3>{t('faqPage.needHelp', 'تحتاج مساعدة؟')}</h3>
                                            <p>{t('faqPage.helpDesc', 'فريقنا متاح للإجابة على جميع استفساراتك')}</p>
                                            <a href="/contact" className={style.contactBtn}>
                                                <span>{t('faqPage.contactUs', 'تواصل معنا')}</span>
                                                <i className="fa-solid fa-arrow-left" />
                                            </a>
                                        </div>

                                        {/* Info Cards */}
                                        <div className={style.infoCards}>
                                            <div className={style.infoCard}>
                                                <div className={style.infoIcon}>
                                                    <i className="fa-solid fa-clock" />
                                                </div>
                                                <div className={style.infoContent}>
                                                    <span className={style.infoLabel}>{t('faqPage.responseTime', 'وقت الرد')}</span>
                                                    <span className={style.infoValue}>{t('faqPage.responseValue', '24 ساعة')}</span>
                                                </div>
                                            </div>
                                            <div className={style.infoCard}>
                                                <div className={style.infoIcon}>
                                                    <i className="fa-solid fa-comments" />
                                                </div>
                                                <div className={style.infoContent}>
                                                    <span className={style.infoLabel}>{t('faqPage.totalQuestions', 'الأسئلة')}</span>
                                                    <span className={style.infoValue}>{faq.length}+</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}

export default FAQ;
