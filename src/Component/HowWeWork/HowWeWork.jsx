import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import H2 from '../Ui/H2/H2';
import ourClients from "../../assets/Images/Home/ourClients.svg";
import projects from "../../assets/Images/Home/projects.svg";
import experts from "../../assets/Images/Home/experts.svg";
import style from "./HowWeWork.module.css";

export default function HowWeWork({ counter }) {
  const { t } = useTranslation();

  const workflowSteps = [
    {
      number: "01",
      title: t("howWeWork.step1_title", "طلب اجتماع"),
      description: t("howWeWork.step1_desc", "تواصل معنا لحجز اجتماع استشاري مجاني"),
      icon: "fa-solid fa-handshake"
    },
    {
      number: "02",
      title: t("howWeWork.step2_title", "أختيار الخدمة"),
      description: t("howWeWork.step2_desc", "نساعدك في اختيار الحل المناسب لاحتياجاتك"),
      icon: "fa-solid fa-list-check"
    },
    {
      number: "03",
      title: t("howWeWork.step3_title", "تحديد المتطلبات"),
      description: t("howWeWork.step3_desc", "نحدد جميع المتطلبات الفنية والتقنية"),
      icon: "fa-solid fa-clipboard-list"
    },
    {
      number: "04",
      title: t("howWeWork.step4_title", "الحل النهائي"),
      description: t("howWeWork.step4_desc", "تسليم الحل النهائي المتكامل"),
      icon: "fa-solid fa-check-circle"
    }
  ];

  const stats = [
    { icon: ourClients, number: counter.clients, label: t("howWeWork.clients") },
    { icon: projects, number: counter.projects, label: t("howWeWork.projects") },
    { icon: experts, number: counter.experts, label: t("howWeWork.experts") }
  ].filter(stat => stat.number);

  return (
    <section className={style.section}>
      <div className={style.container}>
        {/* Header */}
        <motion.div
          className={style.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <H2 text={t("howWeWork.title")} />
          <p className={style.subtitle}>
            {t("howWeWork.description")}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className={style.stepsGrid}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {workflowSteps.map((step, idx) => (
            <motion.div
              key={idx}
              className={style.stepCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + idx * 0.1 }}
            >
              <div className={style.stepNumber}>{step.number}</div>
              <div className={style.stepIcon}>
                <i className={step.icon} aria-hidden="true" />
              </div>
              <div className={style.stepContent}>
                <h3 className={style.stepTitle}>{step.title}</h3>
                <p className={style.stepDesc}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className={style.statsBar}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className={style.statItem}>
              <div className={style.statIcon}>
                <img
                  loading="lazy"
                  src={stat.icon}
                  alt=""
                  width={32}
                  height={32}
                />
              </div>
              <div className={style.statInfo}>
                <span className={style.statNumber}>{stat.number}+</span>
                <span className={style.statLabel}>{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
