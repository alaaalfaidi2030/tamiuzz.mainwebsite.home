import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import heroBackground from '../../assets/Images/Home/Hero_background.jpg';
import style from './Hero.module.css';

const STATS = [
  { icon: 'fa-solid fa-users', valueKey: 'clients_count', labelKey: 'happy_clients' },
  { icon: 'fa-solid fa-briefcase', valueKey: 'projects_count', labelKey: 'projects_completed' },
  { icon: 'fa-solid fa-award', valueKey: 'experience_years', labelKey: 'years_experience' },
  { icon: 'fa-solid fa-headset', valueKey: 'support_hours', labelKey: 'support_availability' },
];

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      className={style.hero}
      style={{ background: `url(${heroBackground})` , backgroundSize: 'cover', backgroundPosition: 'center' }}
      aria-label={t("homePage.hero_title")}
    >
      {/* Background Elements */}
      <div className={style.bgPattern} aria-hidden="true">
        <div className={style.gridLines} />
        <div className={style.gradientOrb1} />
        <div className={style.gradientOrb2} />
        <div className={style.gradientOrb3} />
      </div>

      {/* Floating Shapes */}
      <div className={style.floatingShapes} aria-hidden="true">
        <motion.div
          className={style.shape1}
          animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={style.shape2}
          animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={style.shape3}
          animate={{ y: [-15, 15, -15], x: [-10, 10, -10] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <div className={style.container}>
        <div className={style.content}>
          {/* Left: Text Content */}
          <motion.div
            className={style.textContent}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <motion.div
              className={style.badge}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className={style.badgeDot} />
              <span>{t("homePage.badge_text") || t("homePage.hero_subtitle")}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className={style.headline}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={style.headlinePrimary}>{t("homePage.hero_title")}</span>
              <span className={style.headlineAccent}>{t("homePage.hero_subtitle")}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className={style.description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {t("homePage.hero_desc_part1")} {t("homePage.hero_desc_part2")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className={style.ctaGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link to="/support" className={style.ctaPrimary}>
                <span>{t("homePage.request-quote-button")}</span>
                <i className="fa-solid fa-arrow-left" aria-hidden="true" />
              </Link>
              <Link to="/services" className={style.ctaSecondary}>
                <span>{t("homePage.discover our services")}</span>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className={style.trustIndicators}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className={style.trustItem}>
                <i className="fa-solid fa-shield-check" aria-hidden="true" />
                <span>ISO 27001</span>
              </div>
              <div className={style.trustDivider} />
              <div className={style.trustItem}>
                <i className="fa-solid fa-clock" aria-hidden="true" />
                <span>24/7</span>
              </div>
              <div className={style.trustDivider} />
              <div className={style.trustItem}>
                <i className="fa-solid fa-star" aria-hidden="true" />
                <span>4.9/5</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Stats Visual */}
          <motion.div
            className={style.visualContent}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={style.statsContainer}>
              {/* Central Icon */}
              <div className={style.centralIcon}>
                <div className={style.centralIconInner}>
                  <i className="fa-solid fa-rocket" aria-hidden="true" />
                </div>
                <div className={style.centralIconRing} />
                <div className={style.centralIconRing2} />
              </div>

              {/* Stats Cards */}
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.valueKey}
                  className={`${style.statCard} ${style[`statCard${index + 1}`]}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5, type: 'spring' }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className={style.statIconWrapper}>
                    <i className={stat.icon} aria-hidden="true" />
                  </div>
                  <div className={style.statInfo}>
                    <span className={style.statValue}>
                      {t(`homePage.stats.${stat.valueKey}`)}
                    </span>
                    <span className={style.statLabel}>
                      {t(`homePage.stats.${stat.labelKey}`)}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Decorative Lines */}
              <svg className={style.connectionLines} aria-hidden="true">
                <line x1="50%" y1="50%" x2="20%" y2="20%" className={style.connectionLine} />
                <line x1="50%" y1="50%" x2="80%" y2="20%" className={style.connectionLine} />
                <line x1="50%" y1="50%" x2="20%" y2="80%" className={style.connectionLine} />
                <line x1="50%" y1="50%" x2="80%" y2="80%" className={style.connectionLine} />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className={style.bottomFade} aria-hidden="true" />
    </section>
  );
};

export default Hero;
