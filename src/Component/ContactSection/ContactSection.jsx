import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ContactForm from "../ContactForm/ContactForm";
import contactImage from "../../assets/Images/ContactSection.png";
import style from "./ContactSection.module.css";

const ANIMATION_VARIANTS = {
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
};

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section className={style.contactSection} aria-labelledby="contact-section-title">
      <div className="container">
        <div className={`row align-items-center ${style.contentWrapper}`}>
          {/* Form Column */}
          <motion.div
            className={`col-lg-7 ${style.formColumn}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={ANIMATION_VARIANTS.fadeInLeft}
          >
            <ContactForm variant="dark" />
          </motion.div>

          {/* Image Column */}
          <motion.div
            className={`col-lg-5 ${style.imageColumn}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={ANIMATION_VARIANTS.fadeInRight}
          >
            <figure className={style.imageWrapper}>
              <img
                src={contactImage}
                alt={t("contact section illustration")}
                className={style.contactImage}
                loading="lazy"
              />
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
