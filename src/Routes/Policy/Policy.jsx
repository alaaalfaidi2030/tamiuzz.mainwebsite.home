import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Heading from '../../Component/Ui/Heading/Heading';
import SEO from '../../Component/SEO/SEO';
import style from './Policy.module.css';

const policyData = [
  {
    icon: "fa-solid fa-database",
    titleKey: "policy.section1.title",
    contentKey: "policy.section1.content",
    itemsKey: "policy.section1.items",
    itemsCount: 3
  },
  {
    icon: "fa-solid fa-chart-line",
    titleKey: "policy.section2.title",
    contentKey: "policy.section2.content",
    itemsKey: "policy.section2.items",
    itemsCount: 4
  },
  {
    icon: "fa-solid fa-shield-halved",
    titleKey: "policy.section3.title",
    contentKey: "policy.section3.content"
  },
  {
    icon: "fa-solid fa-share-nodes",
    titleKey: "policy.section4.title",
    contentKey: "policy.section4.content"
  },
  {
    icon: "fa-solid fa-scale-balanced",
    titleKey: "policy.section5.title",
    contentKey: "policy.section5.content",
    itemsKey: "policy.section5.items",
    itemsCount: 3
  },
  {
    icon: "fa-solid fa-rotate",
    titleKey: "policy.section6.title",
    contentKey: "policy.section6.content"
  }
];

export default function Policy() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t("seo.policy.title", "سياسة الخصوصية - شركة تميّز | Tamiuzz Privacy Policy")}
        description={t("seo.policy.description", "سياسة الخصوصية لشركة تميّز للحلول الرقمية. تعرّف على كيفية جمع واستخدام وحماية بياناتك الشخصية.")}
      />

      <Heading pageName={"privacy_policy"} />

      <section className={style.section}>
        {/* Background Shapes */}
        <div className={style.bgShape1} aria-hidden="true" />
        <div className={style.bgShape2} aria-hidden="true" />

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
              <i className="fa-solid fa-lock" aria-hidden="true" />
              <span>{t("policy.badge", "الخصوصية والأمان")}</span>
            </div>
            <h1 className={style.title}>{t("policy.title", "سياسة الخصوصية")}</h1>
            <p className={style.subtitle}>
              {t("policy.subtitle", "في شركة تميز، نلتزم بحماية خصوصية معلوماتك الشخصية، ونوضح في هذه السياسة كيف نقوم بجمع واستخدام وحماية البيانات.")}
            </p>
          </motion.div>

          {/* Policy Cards */}
          <div className={style.cardsGrid}>
            {policyData.map((section, idx) => (
              <motion.article
                key={idx}
                className={style.card}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className={style.cardHeader}>
                  <div className={style.cardIcon}>
                    <i className={section.icon} aria-hidden="true" />
                  </div>
                  <div className={style.cardNumber}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </div>
                <h3 className={style.cardTitle}>
                  {t(section.titleKey)}
                </h3>
                <p className={style.cardContent}>
                  {t(section.contentKey)}
                </p>
                {section.itemsKey && (
                  <ul className={style.cardList}>
                    {Array.from({ length: section.itemsCount }, (_, itemIdx) => (
                      <li key={itemIdx}>{t(`${section.itemsKey}.${itemIdx}`)}</li>
                    ))}
                  </ul>
                )}
              </motion.article>
            ))}
          </div>

          {/* Footer Note */}
          <motion.div
            className={style.footer}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={style.footerIcon}>
              <i className="fa-solid fa-calendar-check" aria-hidden="true" />
            </div>
            <p className={style.footerText}>
              {t("policy.lastUpdate", "تاريخ آخر تحديث:")} <strong>20 {t("policy.june", "يونيو")} 2025</strong>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
