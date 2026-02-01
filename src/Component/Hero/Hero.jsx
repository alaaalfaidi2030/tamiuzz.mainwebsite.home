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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.4 + i * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section
      className={style.hero}
      style={{ backgroundImage: `url(${heroBackground})` }}
      aria-label={t("homePage.hero_title")}
    >
      {/* Gradient Overlay */}
      <div className={style.overlay} aria-hidden="true" />

      {/* Ambient Glow Effects */}
      <div className={style.ambientGlow} aria-hidden="true">
        <div className={`${style.glowOrb} ${style.glowOrb1}`} />
        <div className={`${style.glowOrb} ${style.glowOrb2}`} />
      </div>

      {/* Main Content */}
      <div className={style.content}>
        <div className={style.container}>
          <motion.div
            className={style.card}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className={style.cardInner}>
              {/* Text Column */}
              <motion.div
                className={style.textColumn}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Badge */}
                <motion.div className={style.badge} variants={itemVariants}>
                  <span className={style.badgeIcon}>
                    <i className="fa-solid fa-bolt" aria-hidden="true" />
                  </span>
                  <span className={style.badgeText}>
                    {t("homePage.badge_text") || t("homePage.hero_subtitle")}
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1 className={style.headline} variants={itemVariants}>
                  <span className={style.headlineWhite}>
                    {t("homePage.hero_title")}
                  </span>
                  <span className={style.headlineGold}>
                    {t("homePage.hero_subtitle")}
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p className={style.description} variants={itemVariants}>
                  {t("homePage.hero_desc_part1")} {t("homePage.hero_desc_part2")}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div className={style.ctaGroup} variants={itemVariants}>
                  <Link to="/support" className={style.ctaPrimary}>
                    <span>{t("homePage.request-quote-button")}</span>
                    <i className="fa-solid fa-arrow-left" aria-hidden="true" />
                  </Link>
                  <Link to="/services" className={style.ctaSecondary}>
                    <span>{t("homePage.discover our services")}</span>
                    <i className="fa-solid fa-arrow-left" aria-hidden="true" />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Visual Column - Stats Grid */}
              <div className={style.visualColumn}>
                <div className={style.statsGrid}>
                  {STATS.map((stat, index) => (
                    <motion.div
                      key={stat.valueKey}
                      className={style.statCard}
                      custom={index}
                      variants={statVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className={style.statIcon}>
                        <i className={stat.icon} aria-hidden="true" />
                      </div>
                      <span className={style.statValue}>
                        {t(`homePage.stats.${stat.valueKey}`)}
                      </span>
                      <span className={style.statLabel}>
                        {t(`homePage.stats.${stat.labelKey}`)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className={style.waveDivider} aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,120 L0,60 Q360,100 720,60 T1440,60 L1440,120 Z"
            fill="var(--bg-body)"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
