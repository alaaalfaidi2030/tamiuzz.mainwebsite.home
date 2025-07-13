import React from 'react';
import styles from './ServiceCard.module.css';
import { delay, motion } from 'framer-motion'; // Import motion
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ServiceCard({ idx = 0, imageUrl, iconUrl, title, path, description }) {

    const { t } = useTranslation()
    // Define animation variants for the card
    const cardVariants = {
        hidden: { opacity: 0, y: 50 }, // Starts invisible and slightly below
        visible: {
            opacity: 1,
            y: 0, // Moves to its original position
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
                duration: 0.5,
                delay: (idx * 0.1) < 1 ? idx * 0.1 : 0.1,

            }
        },

    };

    return (
        <motion.div
            className={styles.ServiceCard }
            variants={cardVariants}
            initial="hidden"
            animate="visible"  >
            {/* <div className={styles.imageWrapper}>
                <img src={image} alt="article image" className={styles.image} />
                <div className={styles.dateBadge}>
                    <span className={styles.day}>{date}</span>
                    <span className={styles.month}>{month}</span>
                </div>
            </div> */}
            <div className={styles.content}>
                <h4>
                    {title}
                </h4>
                <p className={styles.description}>{description}</p>
                <Link to={`/services/${path}`} className={styles.link}>{t("read more")} →</Link>
            </div>
        </motion.div>
    );
}