import React from 'react';
import style from './TestimonialCard.module.css';
import { motion } from 'framer-motion';

export default function TestimonialCard({ imageUrl, name, position, stars, rate }) {
    //   {
    //             "imageUrl": "/static/reviews/Ahmed Ibrahim940.png",
    //             "name": "Ahmed Ibrahim",
    //             "position": "CEO of SRFGd",
    //             "rate": "Hello, This is test review",
    //             "stars": 4.50
    //         }
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
                    <img src={imageUrl} alt={name} className={style["user-image"]} />
                    <div>
                        <h5 className={style["user-name"]}>{name}</h5>
                        <p className={style["user-role"]}>{position}</p>
                        <div className={style["stars"]}>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <i
                                    key={i}
                                    className={`fa-star ${style["fa-star"]} ${i < stars ? `fas ${style.filled}` : 'far'}`}
                                ></i>
                            ))}
                        </div>
                    </div>
                </div >
                <i className={`fas fa-quote-right ${style["quote-icon"]}`}></i>
            </div >
            <p className={style["testimonial-text"]}>{rate}</p>
        </motion.div >
    );
}
