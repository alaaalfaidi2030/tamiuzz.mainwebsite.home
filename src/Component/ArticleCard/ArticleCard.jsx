import React from 'react';
import styles from './ArticleCard.module.css';
import { delay, motion } from 'framer-motion'; // Import motion
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../../next-i18next.config';

export default function ArticleCard({ idx = 0, imageUrl, time, title, author, tags, urlPath }) {

    // x = {
    //     "time": "2025-05-27T11:18:18.7957329",
    //     "tags": [
    //         "Motivation",
    //         "Growth"
    //     ],
    //     "urlPath": "personal-growth",
    //     "title": "Tips for Personal Growth",
    //     "imageUrl": "/images/blogs/growth.jpg",
    //     "author": "Yasin"
    // }
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

    // Extracting day and month form time
    // date, month,
    let date = new Date(time);
    let day = date.getDate();
    // English month name
    let month = date.toLocaleString(i18n.language, { month: 'long' }); // "May"


    const { t } = useTranslation()
    return (
        <motion.div
            className={styles.card + " col-md-4 m-auto"}
            variants={cardVariants}
            initial="hidden"
            animate="visible"  >
            <div className={styles.imageWrapper}>
                <img loading='lazy' src={imageUrl} alt="article image" className={styles.image} />
                {time && <div className={styles.dateBadge}>
                    <span className={styles.day}>{day}</span>
                    <span className={styles.month}>{month}</span>
                </div>}
            </div>
            <div className={styles.content}>
                <div className={styles.meta}>
                    <span className={styles.author}>
                        <i className="fa-solid fa-user"></i>{author}</span>
                    {tags && tags[0] &&
                        <span className={styles.category}><i className="fa-solid fa-tag"></i>{tags[0]}</span>
                    }
                </div>
                <p className={styles.title}>{title}</p>
                <Link to={"/articles/" + urlPath} className={styles.link}>{t("read more")} →</Link>
            </div>
        </motion.div>
    );
}