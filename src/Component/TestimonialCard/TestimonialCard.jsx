import React from 'react';
import style from './TestimonialCard.module.css';
import { motion } from 'framer-motion';

export default function TestimonialCard({ idx = 0, imageUrl, name, position, stars, rate }) {

    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.96 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 14,
                delay: Math.min(idx * 0.1, 0.5),
            }
        }
    };

    const quoteVariants = {
        rest: { rotate: 0, scale: 1 },
        hover: { rotate: -8, scale: 1.15, transition: { type: "spring", stiffness: 300, damping: 12 } },
    };

    const accentVariants = {
        rest: { width: 40 },
        hover: { width: 70, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
    };

    return (
        <motion.div
            className={style.card}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover="hover"
            animate="rest"
        >
            {/* Header: user info + quote icon */}
            <div className={style.header}>
                <div className={style.user}>
                    <div className={style.avatarWrapper}>
                        <img loading="lazy" src={imageUrl} alt={name} className={style.avatar} />
                        <div className={style.avatarRing} />
                    </div>
                    <div className={style.userInfo}>
                        <h5 className={style.userName}>{name}</h5>
                        <p className={style.userRole}>{position}</p>
                        <div className={style.stars}>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <i
                                    key={i}
                                    className={`fa-star ${style.star} ${i < stars ? `fas ${style.starFilled}` : 'far'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <motion.i
                    className={`fas fa-quote-right ${style.quoteIcon}`}
                    variants={quoteVariants}
                />
            </div>

            {/* Testimonial text */}
            <p className={style.text}>{rate}</p>

            {/* Bottom accent line */}
            <motion.div className={style.bottomAccent} variants={accentVariants} />
        </motion.div>
    );
}
