import React from 'react';
import style from './TestimonialCard.module.css';
import { motion } from 'framer-motion';

export default function TestimonialCard({ image, name, role, rating, text }) {
    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut'
            }
        }
    };

    return (
        <motion.div
            className={`${style["testimonial-card"]} shadow`}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
        >
            <div className={style["testimonial-header"]}>
                <div className={style["testimonial-user"]}>
                    <img src={image} alt={name} className={style["user-image"]} />
                    <div>
                        <h5 className={style["user-name"]}>{name}</h5>
                        <p className={style["user-role"]}>{role}</p>
                        <div className={style["stars"]}>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <i
                                    key={i}
                                    className={`fa-star ${style["fa-star"]} ${i < rating ? `fas ${style.filled}` : 'far'}`}
                                ></i>
                            ))}
                        </div>
                    </div>
                </div >
                <i className={`fas fa-quote-right ${style["quote-icon"]}`}></i>
            </div >
            <p className={style["testimonial-text"]}>{text}</p>
        </motion.div >
    );
}
