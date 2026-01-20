import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Heading from "../../Component/Ui/Heading/Heading";
import H2 from "../../Component/Ui/H2/H2";
import ContactForm from "../../Component/ContactForm/ContactForm";
import { phoneAndEmail, socialMedia } from "../../Utilies/data";
import style from "./Support.module.css";

const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
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
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
};

const CONTACT_LABELS = {
  "fa-phone": "phone",
  "fa-envelope": "email",
  "fa-whatsapp": "whatsapp",
};

const Support = () => {
  const { t } = useTranslation();

  return (
    <main className={style.supportPage} id="support">
      <Heading
        heading={t("supportPage.heading")}
        subHeading={t("supportPage.subheading")}
        pageName="support"
      />

      <H2 text={t("supportPage.talk with us")} />

      <div className="container">
        <div className={`row ${style.contentWrapper}`}>
          {/* Contact Form Section */}
          <div className={`col-lg-7 ${style.formSection}`}>
            <ContactForm />
          </div>

          {/* Contact Info Section */}
          <div className={`col-lg-5 ${style.contactSection}`}>
            <motion.div
              className={style.contactCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={ANIMATION_VARIANTS.fadeIn}
            >
              <div className={style.contactHeader}>
                <h2 className={style.contactTitle}>
                  {t("supportPage.contact with us")}
                </h2>
                <p className={style.contactSubtitle}>
                  {t("supportPage.contact subtitle")}
                </p>
              </div>

              <motion.div
                className={style.contactList}
                variants={ANIMATION_VARIANTS.staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {phoneAndEmail.map((item, idx) => {
                  const labelKey = CONTACT_LABELS[item.icon] || "contact";
                  return (
                    <motion.a
                      key={idx}
                      href={item.link}
                      className={style.contactItem}
                      variants={ANIMATION_VARIANTS.staggerItem}
                      aria-label={`${t(`supportPage.${labelKey}`)}: ${item.text}`}
                    >
                      <span className={style.contactIcon} aria-hidden="true">
                        <i className={`fa-solid ${item.icon}`} />
                      </span>
                      <div className={style.contactContent}>
                        <span className={style.contactLabel}>
                          {t(`supportPage.${labelKey}`)}
                        </span>
                        <span className={style.contactText} dir="ltr">
                          {item.text}
                        </span>
                      </div>
                    </motion.a>
                  );
                })}
              </motion.div>

              {/* Social Links */}
              {socialMedia && socialMedia.length > 0 && (
                <motion.div
                  className={style.socialLinks}
                  variants={ANIMATION_VARIANTS.staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {socialMedia.slice(0, 4).map((item, idx) => (
                    <motion.a
                      key={idx}
                      href={item.link}
                      className={style.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.className}
                      variants={ANIMATION_VARIANTS.staggerItem}
                    >
                      <i className={`fa-brands ${item.icon}`} aria-hidden="true" />
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Support;
