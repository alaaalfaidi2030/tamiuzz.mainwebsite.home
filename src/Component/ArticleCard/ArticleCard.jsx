import React from 'react';
import styles from './ArticleCard.module.css';
import { delay, motion } from 'framer-motion'; // Import motion
import { Link } from 'react-router-dom';

export default function ArticleCard({ idx = 0, image, date, month, title, author, category, description, link }) {
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
            className={styles.card + " col-md-4"}
            variants={cardVariants}
            initial="hidden"
            animate="visible"  >
            <div className={styles.imageWrapper}>
                <img src={image} alt="article image" className={styles.image} />
                <div className={styles.dateBadge}>
                    <span className={styles.day}>{date}</span>
                    <span className={styles.month}>{month}</span>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.meta}>
                    <span className={styles.author}>
                        <i className="fa-solid fa-user"></i>{author}</span>
                    <span className={styles.category}><i className="fa-solid fa-tag"></i>{category}</span>
                </div>
                <p className={styles.description}>{description}</p>
                <Link to={link} className={styles.link}>اطلع على المزيد →</Link>
            </div>
        </motion.div>
    );
}