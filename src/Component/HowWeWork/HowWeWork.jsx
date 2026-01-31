import React from 'react'
import H2 from '../Ui/H2/H2'
import { useTranslation } from 'react-i18next'
import ourCLients from "../../assets/Images/Home/ourClients.svg"
import projects from "../../assets/Images/Home/projects.svg"
import experts from "../../assets/Images/Home/experts.svg"
import style from "./HowWeWork.module.css"
import { motion } from 'framer-motion'

export default function HowWeWork({ counter }) {
    const { t } = useTranslation()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    }

    const headingVariants = {
        hidden: { opacity: 0, y: -40, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    }

    const workflowSteps = [
        {
            number: "01",
            title: t("howWeWork.step1_title", "طلب اجتماع"),
            description: t("howWeWork.step1_desc", "تواصل معنا لحجز اجتماع استشاري مجاني"),
            icon: "fa-solid fa-handshake",
            color: "primary"
        },
        {
            number: "02",
            title: t("howWeWork.step2_title", "أختيار الخدمة"),
            description: t("howWeWork.step2_desc", "نساعدك في اختيار الحل المناسب لاحتياجاتك"),
            icon: "fa-solid fa-list-check",
            color: "secondary"
        },
        {
            number: "03",
            title: t("howWeWork.step3_title", "تحديد المتطلبات"),
            description: t("howWeWork.step3_desc", "نحدد جميع المتطلبات الفنية والتقنية"),
            icon: "fa-solid fa-clipboard-list",
            color: "primary"
        },
        {
            number: "04",
            title: t("howWeWork.step4_title", "الحل النهائي"),
            description: t("howWeWork.step4_desc", "تسليم الحل النهائي المتكامل"),
            icon: "fa-solid fa-check-circle",
            color: "secondary"
        }
    ]

    return (
        <div className={style.howWeWork}>
            {/* Floating decorative elements */}
            <motion.div
                className={style.floatingShape1}
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className={style.floatingShape2}
                animate={{
                    y: [0, 15, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className={style.processSection}>
                <div className="container">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                    >
                        <motion.div variants={headingVariants} className="text-center">
                            <H2 text={t("howWeWork.title")} />
                            <p className={style.subtitle}>
                                {t("howWeWork.description")}
                            </p>
                        </motion.div>

                        {/* Vertical Timeline */}
                        <div className={style.timeline}>
                            {/* Animated vertical line */}
                            <motion.div
                                className={style.timelineLine}
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                            />

                            {workflowSteps.map((step, idx) => (
                                <TimelineStep
                                    key={idx}
                                    step={step}
                                    t={t}
                                    index={idx}
                                    isEven={idx % 2 === 0}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Premium Achievements Section */}
            <div className={style.achievementsSection}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-5"
                    >
                        <H2 text={t("howWeWork.ourAchievements")} />
                        <p className={style.achievementSubtitle}>
                            {t("howWeWork.weIncreaseSuccess")}
                        </p>
                    </motion.div>

                    <div className={style.statsContainer}>
                        {counter.clients && (
                            <PremiumStatCard
                                icon={ourCLients}
                                number={counter.clients}
                                label={t("howWeWork.clients")}
                                delay={0.2}
                                gradient="primary"
                            />
                        )}
                        {counter.projects && (
                            <PremiumStatCard
                                icon={projects}
                                number={counter.projects}
                                label={t("howWeWork.projects")}
                                delay={0.4}
                                gradient="secondary"
                            />
                        )}
                        {counter.experts && (
                            <PremiumStatCard
                                icon={experts}
                                number={counter.experts}
                                label={t("howWeWork.experts")}
                                delay={0.6}
                                gradient="primary"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function TimelineStep({ step, index, isEven, t }) {
    const stepVariants = {
        hidden: {
            opacity: 0,
            x: isEven ? -80 : 80,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 20,
                delay: index * 0.2
            }
        }
    }

    const dotVariants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.2 + 0.3
            }
        }
    }

    return (
        <motion.div
            className={`${style.timelineItem} ${isEven ? style.timelineItemEven : style.timelineItemOdd}`}
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Timeline dot with pulse */}
            <motion.div
                className={style.timelineDot}
                variants={dotVariants}
            >
                <motion.div
                    className={style.dotPulse}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                    }}
                />
                <div className={style.dotInner}>
                    {step.number}
                </div>
            </motion.div>

            {/* Step Card */}
            <motion.div
                className={style.stepCard}
                whileHover={{
                    scale: 1.03,
                    y: -8,
                    transition: { type: "spring", stiffness: 300 }
                }}
            >
                <div className={style.cardGlow} />

                <div className={style.iconContainer}>
                    <motion.div
                        className={style.iconCircle}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <i className={step.icon}></i>
                    </motion.div>
                </div>

                <div className={style.cardContent}>
                    <h3 className={style.stepTitle}>{step.title}</h3>
                    <p className={style.stepDescription}>{step.description}</p>

                    <motion.div
                        className={style.stepAction}
                        whileHover={{ x: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <span>{t("common.learn_more", "المزيد")}</span>
                        <i className="fa-solid fa-arrow-left"></i>
                    </motion.div>
                </div>

                {/* Decorative corner */}
                <div className={style.cardCorner} />
            </motion.div>
        </motion.div>
    )
}

function PremiumStatCard({ icon, number, label, delay, gradient, t }) {
    return (
        <motion.div
            className={`${style.premiumStatCard} ${style[`gradient-${gradient}`]}`}
            initial={{ opacity: 0, y: 60, rotateX: -20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
                delay
            }}
            whileHover={{
                y: -12,
                scale: 1.05,
                transition: { type: "spring", stiffness: 400 }
            }}
        >
            <div className={style.statCardGlow} />

            <motion.div
                className={style.statIconWrapper}
                whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1
                }}
                transition={{ duration: 0.5 }}
            >
                <img
                    loading='lazy'
                    src={icon}
                    alt={`${label} Icon`}
                    width="48"
                    height="48"
                    decoding="async"
                />
            </motion.div>

            <motion.div
                className={style.statNumber}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    delay: delay + 0.3
                }}
            >
                <CountUpNumber target={number} delay={delay + 0.5} />
            </motion.div>

            <p className={style.statLabel}>{label}</p>

            <div className={style.statDecoration}>
                <motion.div
                    animate={{
                        rotate: 360
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
        </motion.div>
    )
}

function CountUpNumber({ target, delay }) {
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            let start = 0
            const duration = 2000
            const increment = target / (duration / 16)

            const timer = setInterval(() => {
                start += increment
                if (start >= target) {
                    setCount(target)
                    clearInterval(timer)
                } else {
                    setCount(Math.floor(start))
                }
            }, 16)

            return () => clearInterval(timer)
        }, delay * 1000)

        return () => clearTimeout(timeout)
    }, [target, delay])

    return <>{count}+</>
}
