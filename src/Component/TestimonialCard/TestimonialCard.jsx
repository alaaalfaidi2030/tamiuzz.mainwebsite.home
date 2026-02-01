import style from './TestimonialCard.module.css';
import { motion } from 'framer-motion';

export default function TestimonialCard({ idx = 0, imageUrl, name, position, stars, rate }) {
  return (
    <motion.article
      className={style.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(idx * 0.1, 0.3) }}
    >
      {/* Quote Icon */}
      <div className={style.quoteWrapper}>
        <i className="fa-solid fa-quote-right" aria-hidden="true" />
      </div>

      {/* Rating Stars */}
      <div className={style.rating}>
        {Array.from({ length: 5 }).map((_, i) => (
          <i
            key={i}
            className={`fa-star ${i < stars ? 'fa-solid' : 'fa-regular'} ${style.star} ${i < stars ? style.starFilled : ''}`}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className={style.text}>{rate}</p>

      {/* User Info */}
      <div className={style.user}>
        <div className={style.avatarContainer}>
          <img
            loading="lazy"
            src={imageUrl}
            alt={name}
            width="56"
            height="56"
            className={style.avatar}
          />
          <div className={style.avatarBorder} aria-hidden="true" />
        </div>
        <div className={style.userInfo}>
          <h4 className={style.userName}>{name}</h4>
          <p className={style.userRole}>{position}</p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={style.cornerAccent} aria-hidden="true" />
    </motion.article>
  );
}
