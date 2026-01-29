import React from 'react';
import styles from './ArticleCard.module.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

export default function ArticleCard({ idx = 0, imageUrl, time, title, author, tags, urlPath }) {

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.96 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 90,
                damping: 16,
                delay: Math.min(idx * 0.12, 0.6),
            }
        },
    };

    const imageVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.06, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    };

    const overlayVariants = {
        rest: { opacity: 0 },
        hover: { opacity: 1, transition: { duration: 0.4 } },
    };

    const tagVariants = {
        rest: { y: 0, scale: 1 },
        hover: { y: -3, scale: 1.04, transition: { type: "spring", stiffness: 300, damping: 15 } },
    };

    const arrowVariants = {
        rest: { x: 0 },
        hover: { x: 5, transition: { type: "spring", stiffness: 400, damping: 15 } },
    };

    const contentVariants = {
        rest: { y: 0 },
        hover: { y: -3, transition: { duration: 0.35, ease: "easeOut" } },
    };

    // Extract day and month from time
    let day, month;
    if (time) {
        const date = new Date(time);
        day = date.getDate();
        month = date.toLocaleString(i18n.language, { month: 'short' });
    }

    const { t } = useTranslation();

    return (
        <motion.div
            className={styles.card + " col-md-4 m-auto"}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            whileHover="hover"
            animate="rest"
        >
            {/* Image section */}
            <div className={styles.imageWrapper}>
                <motion.img
                    loading="lazy"
                    src={imageUrl}
                    alt={title || "article image"}
                    className={styles.image}
                    variants={imageVariants}
                />
                <motion.div className={styles.imageOverlay} variants={overlayVariants} />

                {time && (
                    <div className={styles.dateBadge}>
                        <span className={styles.day}>{day}</span>
                        <span className={styles.month}>{month}</span>
                    </div>
                )}

                {tags && tags.length > 0 && (
                    <div className={styles.tagsRow}>
                        {tags.slice(0, 2).map((tag, i) => (
                            <motion.span
                                key={i}
                                className={styles.tagChip}
                                variants={tagVariants}
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>
                )}
            </div>

            {/* Content section */}
            <motion.div className={styles.content} variants={contentVariants}>
                <div className={styles.meta}>
                    <div className={styles.authorRow}>
                        <span className={styles.authorIcon}>
                            <i className="fa-solid fa-user"></i>
                        </span>
                        <span className={styles.authorName}>{author}</span>
                    </div>
                    {time && (
                        <span className={styles.timeLabel}>
                            <i className="fa-regular fa-clock"></i>
                            {new Date(time).toLocaleDateString(i18n.language, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                    )}
                </div>

                <h3 className={styles.title}>{title}</h3>

                <div className={styles.divider} />

                <div className={styles.footer}>
                    <Link to={"/articles/" + urlPath} className={styles.link}>
                        {t("read more")}
                        <motion.span className={styles.linkArrow} variants={arrowVariants}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </motion.span>
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
}
