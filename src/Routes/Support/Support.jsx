import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Heading from "../../Component/Ui/Heading/Heading";
import ContactForm from "../../Component/ContactForm/ContactForm";
import { phoneAndEmail, socialMedia } from "../../Utilies/data";
import SEO from "../../Component/SEO/SEO";
import style from "./Support.module.css";

const CONTACT_LABELS = {
  "fa-phone": "phone",
  "fa-solid fa-phone": "phone",
  "fa-envelope": "email",
  "fa-solid fa-envelope": "email",
  "fa-whatsapp": "whatsapp",
  "fa-brands fa-whatsapp": "whatsapp",
};

const Support = () => {
  const { t } = useTranslation();

  return (
    <main className={style.supportPage} id="support">
      <SEO
        title={t("seo.support.title", "تواصل معنا - شركة تميّز | Tamiuzz Support")}
        description={t("seo.support.description", "تواصل مع فريق شركة تميّز للحلول الرقمية. نحن هنا لمساعدتك في تحقيق أهدافك الرقمية.")}
      />

      <Heading pageName="support" />

      <section className={style.section}>
        {/* Background Shapes */}
        <div className={style.bgShape1} aria-hidden="true" />
        <div className={style.bgShape2} aria-hidden="true" />
        <div className={style.bgShape3} aria-hidden="true" />

        <div className={style.container}>
          {/* Header */}
          <motion.div
            className={style.header}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={style.badge}>
              <i className="fa-solid fa-headset" aria-hidden="true" />
              <span>{t("supportPage.getInTouch", "تواصل معنا")}</span>
            </div>
            <h2 className={style.title}>{t("supportPage.talk with us", "دعنا نتحدث")}</h2>
            <p className={style.subtitle}>
              {t("supportPage.heroSubtitle", "نحن هنا للإجابة على استفساراتك ومساعدتك في تحقيق أهدافك الرقمية")}
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className={style.contentGrid}>
            {/* Contact Form */}
            <motion.div
              className={style.formWrapper}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className={style.formCard}>
                <div className={style.formHeader}>
                  <div className={style.formIcon}>
                    <i className="fa-solid fa-paper-plane" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className={style.formTitle}>
                      {t("supportPage.sendMessage", "أرسل رسالتك")}
                    </h3>
                    <p className={style.formSubtitle}>
                      {t("supportPage.formSubtitle", "سنرد عليك في أقرب وقت ممكن")}
                    </p>
                  </div>
                </div>
                <ContactForm />
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className={style.infoWrapper}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Contact Card */}
              <div className={style.contactCard}>
                <div className={style.contactHeader}>
                  <div className={style.contactIcon}>
                    <i className="fa-solid fa-address-book" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className={style.contactTitle}>
                      {t("supportPage.contact with us", "معلومات التواصل")}
                    </h3>
                    <p className={style.contactSubtitle}>
                      {t("supportPage.contact subtitle", "تواصل معنا مباشرة")}
                    </p>
                  </div>
                </div>

                <div className={style.contactList}>
                  {phoneAndEmail.map((item, idx) => {
                    const labelKey = CONTACT_LABELS[item.icon] || "contact";
                    return (
                      <motion.a
                        key={idx}
                        href={item.link}
                        className={style.contactItem}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                        aria-label={`${t(`supportPage.${labelKey}`)}: ${item.text}`}
                      >
                        <span className={style.itemIcon} aria-hidden="true">
                          <i className={`fa-solid ${item.icon}`} />
                        </span>
                        <div className={style.itemContent}>
                          <span className={style.itemLabel}>
                            {t(`supportPage.${labelKey}`)}
                          </span>
                          <span className={style.itemText} dir="ltr">
                            {item.text}
                          </span>
                        </div>
                        <span className={style.itemArrow} aria-hidden="true">
                          <i className="fa-solid fa-arrow-left" />
                        </span>
                      </motion.a>
                    );
                  })}
                </div>

                {/* Social Links */}
                {socialMedia && socialMedia.length > 0 && (
                  <div className={style.socialSection}>
                    <p className={style.socialLabel}>
                      {t("supportPage.followUs", "تابعنا على")}
                    </p>
                    <div className={style.socialLinks}>
                      {socialMedia.slice(0, 4).map((item, idx) => (
                        <motion.a
                          key={idx}
                          href={item.link}
                          className={style.socialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.className}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                        >
                          <i className={`fa-brands ${item.icon}`} aria-hidden="true" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Info Cards */}
              <div className={style.quickInfoGrid}>
                <motion.div
                  className={style.quickCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <div className={style.quickIcon}>
                    <i className="fa-solid fa-clock" aria-hidden="true" />
                  </div>
                  <div className={style.quickContent}>
                    <h4 className={style.quickTitle}>
                      {t("supportPage.responseTime", "وقت الاستجابة")}
                    </h4>
                    <p className={style.quickText}>
                      {t("supportPage.responseValue", "خلال 24 ساعة")}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className={style.quickCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <div className={style.quickIcon}>
                    <i className="fa-solid fa-shield-check" aria-hidden="true" />
                  </div>
                  <div className={style.quickContent}>
                    <h4 className={style.quickTitle}>
                      {t("supportPage.secureData", "بياناتك آمنة")}
                    </h4>
                    <p className={style.quickText}>
                      {t("supportPage.secureValue", "حماية 100%")}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Support;
