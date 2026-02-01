import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Heading from '../../Component/Ui/Heading/Heading';
import SEO from '../../Component/SEO/SEO';
import style from './Policy.module.css';

const policyData = [
  {
    icon: "fa-solid fa-database",
    titleKey: "policy.section1.title",
    titleFallback: "جمع المعلومات",
    contentKey: "policy.section1.content",
    contentFallback: "نقوم بجمع المعلومات التالية عند استخدامك لموقعنا:",
    items: [
      "معلومات اتصال مثل البريد الإلكتروني ورقم الهاتف.",
      "معلومات تقنية مثل عنوان IP، نوع المتصفح، الصفحات التي تزورها، ومدة الاستخدام.",
      "أي معلومات تقدمها طوعاً عبر النماذج أو استفسارات الدعم."
    ]
  },
  {
    icon: "fa-solid fa-chart-line",
    titleKey: "policy.section2.title",
    titleFallback: "استخدام المعلومات",
    contentKey: "policy.section2.content",
    contentFallback: "نستخدم البيانات التي نجمعها للأغراض التالية:",
    items: [
      "تحسين تجربة المستخدم على الموقع.",
      "الرد على الاستفسارات وتقديم الدعم الفني.",
      "إرسال التحديثات أو العروض في حال الموافقة على ذلك.",
      "تحليل أداء الموقع وتطوير خدماتنا."
    ]
  },
  {
    icon: "fa-solid fa-shield-halved",
    titleKey: "policy.section3.title",
    titleFallback: "حماية البيانات",
    contentKey: "policy.section3.content",
    contentFallback: "نتخذ كافة الإجراءات التقنية والتنظيمية المناسبة لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الفقد أو التلف."
  },
  {
    icon: "fa-solid fa-share-nodes",
    titleKey: "policy.section4.title",
    titleFallback: "مشاركة المعلومات",
    contentKey: "policy.section4.content",
    contentFallback: "لا نقوم ببيع أو مشاركة بياناتك الشخصية مع أي جهة خارجية، باستثناء الحالات التي يتطلبها القانون أو بموافقتك المسبقة. نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك."
  },
  {
    icon: "fa-solid fa-scale-balanced",
    titleKey: "policy.section5.title",
    titleFallback: "حقوقك",
    contentKey: "policy.section5.content",
    contentFallback: "يحق لك:",
    items: [
      "طلب الاطلاع على بياناتك الشخصية التي نحتفظ بها.",
      "طلب تعديل أو حذف معلوماتك.",
      "سحب موافقتك في أي وقت."
    ]
  },
  {
    icon: "fa-solid fa-rotate",
    titleKey: "policy.section6.title",
    titleFallback: "التعديلات",
    contentKey: "policy.section6.content",
    contentFallback: "قد نقوم بتحديث سياسة الخصوصية من وقت لآخر، وسيتم نشر أي تغييرات على هذه الصفحة مع تحديث تاريخ آخر تعديل."
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
                  {t(section.titleKey, section.titleFallback)}
                </h3>
                <p className={style.cardContent}>
                  {t(section.contentKey, section.contentFallback)}
                </p>
                {section.items && (
                  <ul className={style.cardList}>
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
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
