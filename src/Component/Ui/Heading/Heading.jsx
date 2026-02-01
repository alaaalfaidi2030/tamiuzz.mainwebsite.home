import React from 'react';
import headingBackground from '../../../assets/Images/HeadingBackground.png';
import style from './Heading.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ANIMATION_VARIANTS = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.15
            }
        }
    },
    title: {
        hidden: { y: 30, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 15
            }
        }
    },
    subtitle: {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    },
    breadcrumb: {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.3
            }
        }
    }
};

export default function Heading({ heading, subHeading, pageName }) {
    const { t } = useTranslation();
    const location = useLocation();

    return (
        <motion.div
            className={"d-flex mt-5 justify-content-center align-items-center flex-column " + style.heading}
            style={{ backgroundImage: `url(${headingBackground})` }}
            variants={ANIMATION_VARIANTS.container}
            initial="hidden"
            animate="visible"
        >
            {/* Premium Overlay */}
            <div className={style.overlay} />

            {/* Floating Decorative Shapes */}
            <motion.div
                className={style.floatingShape1}
                animate={{
                    y: [0, -22, 0],
                    x: [0, 15, 0],
                    rotate: [0, 7, 0]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className={style.floatingShape2}
                animate={{
                    y: [0, 25, 0],
                    x: [0, -12, 0],
                    scale: [1, 1.08, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className={style.floatingShape3}
                animate={{
                    y: [0, -18, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Content */}
            <motion.h2 variants={ANIMATION_VARIANTS.title} className={style.titleText}>
                {heading || t("about tamuizz")}
            </motion.h2>

            <motion.p variants={ANIMATION_VARIANTS.subtitle} className={style.subtitleText}>
                {subHeading || t("we present our services in the best way")}
            </motion.p>

            {/* Premium Breadcrumb */}
            <motion.div
                className={style.breadcrumbContainer}
                variants={ANIMATION_VARIANTS.breadcrumb}
            >
                <div className={style.breadcrumbGlow} />
                <motion.div className={style.breadcrumb}>
                    <Link to="/" className={style.breadcrumbLink}>
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {t("home")}
                        </motion.span>
                    </Link>
                    <motion.span
                        className={style.arrow}
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        &gt;&gt;
                    </motion.span>
                    <Link to={location.pathname} className={style.breadcrumbLinkActive}>
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {t(pageName)}
                        </motion.span>
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
