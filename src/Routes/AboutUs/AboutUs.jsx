import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Heading from "../../Component/Ui/Heading/Heading";
import ContactSection from "../../Component/ContactSection/ContactSection";
import aboutImg from "../../assets/Images/about-img.png";
import style from "./AboutUs.module.css";

const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
};

const STATS = [
  { id: "years", value: "10+", labelKey: "aboutSection.stats.years" },
  { id: "clients", value: "500+", labelKey: "aboutSection.stats.clients" },
  { id: "projects", value: "1000+", labelKey: "aboutSection.stats.projects" },
  { id: "team", value: "50+", labelKey: "aboutSection.stats.team" },
];

const VALUES = [
  { id: "mission", icon: "fa-rocket", titleKey: "aboutSection.mission-title", descKey: "aboutSection.mission-desc" },
  { id: "vision", icon: "fa-eye", titleKey: "aboutSection.vision-title", descKey: "aboutSection.vision-desc" },
  { id: "values", icon: "fa-heart", titleKey: "aboutSection.values-title", descKey: "aboutSection.values-desc" },
];

const WHY_CHOOSE_US = [
  { id: "expertise", icon: "fa-award", titleKey: "aboutSection.why.expertise-title", descKey: "aboutSection.why.expertise-desc" },
  { id: "support", icon: "fa-headset", titleKey: "aboutSection.why.support-title", descKey: "aboutSection.why.support-desc" },
  { id: "quality", icon: "fa-gem", titleKey: "aboutSection.why.quality-title", descKey: "aboutSection.why.quality-desc" },
  { id: "innovation", icon: "fa-lightbulb", titleKey: "aboutSection.why.innovation-title", descKey: "aboutSection.why.innovation-desc" },
];

const STORY_HIGHLIGHTS = [
  "aboutSection.highlight1",
  "aboutSection.highlight2",
  "aboutSection.highlight3",
  "aboutSection.highlight4",
];

const AboutUs = () => {
  const { t } = useTranslation();

  const branches = useMemo(
    () => [
      {
        id: "riyadh",
        city: t("aboutSection.riyadh"),
        phone: "0531235330 - 920019150",
        address: t("aboutSection.riyadh-address"),
      },
      {
        id: "dammam",
        city: t("aboutSection.dammam"),
        phone: "0531235330 - 920019150",
        address: t("aboutSection.dammam-address"),
      },
      {
        id: "cairo",
        city: t("aboutSection.cairo"),
        phone: "+208-6666-0112",
        address: t("aboutSection.cairo-address"),
      },
    ],
    [t]
  );

  return (
    <main className={style.aboutPage} id="about-us">
      <Heading pageName={t("aboutSection.about-us-page-name")} />

      {/* Hero Section */}
      <section className={style.heroSection}>
        <div className="container">
          <motion.div
            className={style.heroContent}
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS.fadeIn}
          >
            <h1 className={style.heroTitle}>
              {t("aboutSection.hero-title-1")} <span>{t("aboutSection.hero-title-highlight")}</span> {t("aboutSection.hero-title-2")}
            </h1>
            <p className={style.heroDescription}>
              {t("aboutSection.hero-description")}
            </p>
            <div className={style.heroActions}>
              <Link to="/support" className="btn-web btn-web-primary">
                {t("aboutSection.get-started")}
              </Link>
              <Link to="/services" className="btn-web btn-web-outline">
                {t("aboutSection.our-services")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={style.statsSection}>
        <div className="container">
          <motion.div
            className={style.statsGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={ANIMATION_VARIANTS.staggerContainer}
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.id}
                className={style.statItem}
                variants={ANIMATION_VARIANTS.staggerItem}
              >
                <div className={style.statNumber}>{stat.value}</div>
                <div className={style.statLabel}>{t(stat.labelKey)}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className={style.storySection}>
        <div className="container">
          <div className={style.storyContent}>
            <motion.div
              className={style.storyText}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={ANIMATION_VARIANTS.fadeInLeft}
            >
              <span className={style.storyLabel}>{t("aboutSection.our-story")}</span>
              <h2 className={style.storyTitle}>{t("aboutSection.story-title")}</h2>
              <p className={style.storyDescription}>{t("aboutSection.story-description")}</p>

              <div className={style.storyHighlights}>
                {STORY_HIGHLIGHTS.map((highlightKey, idx) => (
                  <div key={idx} className={style.highlightItem}>
                    <span className={style.highlightIcon}>
                      <i className="fa-solid fa-check" aria-hidden="true" />
                    </span>
                    <span>{t(highlightKey)}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className={style.storyImageWrapper}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={ANIMATION_VARIANTS.fadeInRight}
            >
              <img
                src={aboutImg}
                alt={t("aboutSection.about-us-image-alt")}
                className={style.storyImage}
              />
              <div className={style.imageDecoration} aria-hidden="true" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section (Mission, Vision, Values) */}
      <section className={style.valuesSection}>
        <div className="container">
          <motion.div
            className={style.sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={ANIMATION_VARIANTS.fadeIn}
          >
            <span className={style.sectionLabel}>{t("aboutSection.what-drives-us")}</span>
            <h2 className={style.sectionTitle}>{t("aboutSection.values-section-title")}</h2>
            <p className={style.sectionDescription}>{t("aboutSection.values-section-desc")}</p>
          </motion.div>

          <motion.div
            className={style.valuesGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={ANIMATION_VARIANTS.staggerContainer}
          >
            {VALUES.map((value) => (
              <motion.article
                key={value.id}
                className={style.valueCard}
                variants={ANIMATION_VARIANTS.scaleIn}
              >
                <div className={style.valueIcon} aria-hidden="true">
                  <i className={`fa-solid ${value.icon}`} />
                </div>
                <h3 className={style.valueTitle}>{t(value.titleKey)}</h3>
                <p className={style.valueDescription}>{t(value.descKey)}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={style.whyChooseSection}>
        <div className="container">
          <motion.div
            className={style.sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={ANIMATION_VARIANTS.fadeIn}
          >
            <span className={style.sectionLabel}>{t("aboutSection.why-choose-us")}</span>
            <h2 className={style.sectionTitle}>{t("aboutSection.why-choose-title")}</h2>
            <p className={style.sectionDescription}>{t("aboutSection.why-choose-desc")}</p>
          </motion.div>

          <motion.div
            className={style.whyChooseGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={ANIMATION_VARIANTS.staggerContainer}
          >
            {WHY_CHOOSE_US.map((item) => (
              <motion.div
                key={item.id}
                className={style.whyChooseCard}
                variants={ANIMATION_VARIANTS.staggerItem}
              >
                <div className={style.whyChooseIcon} aria-hidden="true">
                  <i className={`fa-solid ${item.icon}`} />
                </div>
                <div className={style.whyChooseContent}>
                  <h4>{t(item.titleKey)}</h4>
                  <p>{t(item.descKey)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Branches Section */}
      <section className={style.branchesSection}>
        <div className="container">
          <motion.div
            className={style.sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={ANIMATION_VARIANTS.fadeIn}
          >
            <span className={style.sectionLabel}>{t("aboutSection.our-locations")}</span>
            <h2 className={style.sectionTitle}>{t("aboutSection.our-branches-heading")}</h2>
            <p className={style.sectionDescription}>{t("aboutSection.branches-description")}</p>
          </motion.div>

          <motion.div
            className={style.branchesGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={ANIMATION_VARIANTS.staggerContainer}
          >
            {branches.map((branch) => (
              <motion.article
                key={branch.id}
                className={style.branchCard}
                variants={ANIMATION_VARIANTS.staggerItem}
              >
                <div className={style.branchHeader}>
                  <h3 className={style.branchCity}>
                    <i className="fa-solid fa-location-dot" aria-hidden="true" />
                    {branch.city}
                  </h3>
                </div>
                <div className={style.branchBody}>
                  <div className={style.branchInfo}>
                    <div className={style.branchDetail}>
                      <div className={style.branchDetailIcon}>
                        <i className="fa-solid fa-phone" aria-hidden="true" />
                      </div>
                      <div className={style.branchDetailContent}>
                        <div className={style.branchDetailLabel}>{t("aboutSection.phone")}</div>
                        <div className={style.branchDetailValue} dir="ltr">{branch.phone}</div>
                      </div>
                    </div>
                    <div className={style.branchDetail}>
                      <div className={style.branchDetailIcon}>
                        <i className="fa-solid fa-map-marker-alt" aria-hidden="true" />
                      </div>
                      <div className={style.branchDetailContent}>
                        <div className={style.branchDetailLabel}>{t("aboutSection.address")}</div>
                        <div className={style.branchDetailValue}>{branch.address}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
};

export default AboutUs;
