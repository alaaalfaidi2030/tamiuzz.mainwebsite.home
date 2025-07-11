import React from 'react';
import headingBackground from '../../../assets/Images/HeadingBackground.png';
import style from './Heading.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Heading({ pageName }) {
    const { t } = useTranslation();
    const location = useLocation();

    // Define animation variants for different elements
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const linkVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <motion.div
            className={"d-flex justify-content-center align-items-center flex-column " + style.heading}
            style={{ backgroundImage: `url(${headingBackground})` }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2 variants={itemVariants}>
                {t("about tamuizz")}
            </motion.h2>
            <motion.p variants={itemVariants}>{
                t("we present our services in the best way")}
            </motion.p>
            <div className="links ">
                <motion.div variants={linkVariants} initial="hidden" animate="visible">
                    <Link to="/">
                        {t("home")}
                    </Link>
                    <span className={style.arrow}>&gt;&gt;</span>
                    <Link to={location.pathname}>
                        {t(pageName)}
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
}