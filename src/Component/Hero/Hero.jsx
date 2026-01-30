import { motion } from 'framer-motion';
import style from './Hero.module.css';
import heroBackground from '../../assets/Images/Home/Hero_background.jpg';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Hero = () => {
    const { t } = useTranslation();

    // Orchestrated entrance
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.4
            }
        }
    };

    const headingVariants = {
        hidden: { opacity: 0, y: 80, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 20,
                mass: 1.2
            }
        }
    };

    const descriptionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 18,
                delay: 0.2
            }
        }
    };

    const buttonContainerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 75,
                damping: 16,
                staggerChildren: 0.12,
                delayChildren: 0.4
            }
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 30 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 180,
                damping: 15
            }
        }
    };

    return (
        <div className={style.heroSection}
            style={{ backgroundImage: `url(${heroBackground})` }}>

            {/* Multiple Floating Decorative Shapes */}
            <motion.div
                className={style.floatingOrb1}
                animate={{
                    y: [0, -30, 0],
                    x: [0, 15, 0],
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className={style.floatingOrb2}
                animate={{
                    y: [0, 25, 0],
                    x: [0, -20, 0],
                    scale: [1, 1.15, 1],
                    rotate: [0, -8, 0]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className={style.floatingOrb3}
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Particle Effects */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className={style.particle}
                    style={{
                        left: `${15 + i * 15}%`,
                        top: `${20 + i * 10}%`
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.6, 0],
                        scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut"
                    }}
                />
            ))}

            <div className={style.contentContainer}>
                <div className="container-fluid">
                    <div className={`row py-5 ${style.mainContent}`}>
                        <div className="col-lg-8 col-xl-9 mb-5 mb-lg-0">
                            <motion.div
                                className={"px-5 " + style.heading}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Premium Animated Heading */}
                                <motion.h1
                                    className="fw-bold mb-4"
                                    variants={headingVariants}
                                >
                                    <motion.span
                                        className={style.gradientText}
                                        animate={{
                                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                        }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                    >
                                        {t("homePage.hero_title")}
                                    </motion.span>
                                    <br />
                                    <motion.span
                                        className={style.orangeText}
                                        animate={{
                                            textShadow: [
                                                "0 2px 10px rgba(228, 157, 35, 0.4)",
                                                "0 6px 24px rgba(228, 157, 35, 0.7)",
                                                "0 2px 10px rgba(228, 157, 35, 0.4)"
                                            ]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        {t("homePage.hero_subtitle")}
                                    </motion.span>
                                </motion.h1>

                                {/* Description with typing effect simulation */}
                                <motion.p
                                    className={"lead mb-4 text-light " + style.heroDescription}
                                    variants={descriptionVariants}
                                >
                                    {t("homePage.hero_desc_part1")}
                                    <br />
                                    {t("homePage.hero_desc_part2")}
                                </motion.p>

                                {/* Premium Buttons */}
                                <motion.div
                                    className={"d-flex flex-row gap-3 mb-5 " + style.btnContainer}
                                    variants={buttonContainerVariants}
                                >
                                    <motion.div variants={buttonVariants}>
                                        <Link
                                            to="/support"
                                            className={style.ctaPrimary}
                                        >
                                            <motion.span
                                                className={style.buttonContent}
                                                whileHover={{ x: [0, 4, 0] }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                            >
                                                {t("homePage.request-quote-button")}
                                            </motion.span>
                                            <motion.div
                                                className={style.buttonGlow}
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.3, 0.6, 0.3]
                                                }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        </Link>
                                    </motion.div>

                                    <motion.div variants={buttonVariants}>
                                        <Link
                                            to={"/services"}
                                            className={style.ctaSecondary}
                                        >
                                            <motion.span
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ type: "spring", stiffness: 400 }}
                                            >
                                                {t("homePage.discover our services")}
                                            </motion.span>
                                            <motion.i
                                                className="fa-solid fa-arrow-left ms-2"
                                                whileHover={{ x: -4 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            />
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Wave SVG */}
            <motion.div
                className="position-absolute bottom-0 start-0 end-0"
                style={{ zIndex: "1" }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.2 }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <motion.path
                        fill="var(--bg-body)"
                        fillOpacity="1"
                        d="M0,256L60,234.7C120,213,240,171,360,149.3C480,128,600,128,720,154.7C840,181,960,235,1080,234.7C1200,235,1320,181,1380,154.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 1.5 }}
                    />
                </svg>
            </motion.div>
        </div>
    );
};

export default Hero;
