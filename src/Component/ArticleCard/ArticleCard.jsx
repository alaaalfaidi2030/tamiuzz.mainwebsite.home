import React from 'react';
import styles from './ArticleCard.module.css';
// import { FaUser, FaTag } from 'react-icons/fa';

export default function ArticleCard({ image, date, month, title, author, category, description, link }) {
    return (
        <div className={styles.card + " col-md-4"}>
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
                        <i class="fa-solid fa-user"></i>{author}</span>
                    <span className={styles.category}><i class="fa-solid fa-tag"></i>{category}</span>
                </div>
                <p className={styles.description}>{description}</p>
                <a href={link} className={styles.link}>اطلع على المزيد →</a>
            </div>
        </div>
    );
}
