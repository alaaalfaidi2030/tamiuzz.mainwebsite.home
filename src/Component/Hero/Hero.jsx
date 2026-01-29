import { motion } from 'framer-motion';
import style from './Hero.module.css';
import heroBackground from '../../assets/Images/Home/Hero_background.jpg';
import shapeImg from "../../assets/Images/Home/shape-img.png"
import shapeImg1 from "../../assets/Images/Home/shape-img-1.png"
import shapeImg2 from "../../assets/Images/Home/shape-img-2.png"
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Hero = () => {
    const { t } = useTranslation();

    // Container orchestration
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    // Heading animations with spring physics
    const headingVariants = {
        hidden: { opacity: 0, y: 60, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1
            }
        }
    };

    // Description with delayed entrance
    const descriptionVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 18,
                delay: 0.2
            }
        }
    };

    // Button container with stagger
    const buttonContainerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 90,
                damping: 16,
                staggerChildren: 0.15,
                delayChildren: 0.4
            }
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.95
        }
    };

    // Decorative shapes with floating animations
    const floatingShape1Variants = {
        initial: {
            opacity: 0,
            scale: 0.5,
            rotate: -20
        },
        animate: {
            opacity: 0.7,
            scale: 1,
            rotate: 0,
            y: [0, -15, 0],
            transition: {
                opacity: { duration: 1, delay: 0.5 },
                scale: { duration: 0.8, delay: 0.5 },
                rotate: { duration: 0.8, delay: 0.5 },
                y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }
            }
        }
    };

    const floatingShape2Variants = {
        initial: {
            opacity: 0,
            scale: 0.5,
            rotate: 20
        },
        animate: {
            opacity: 0.7,
            scale: 1,
            rotate: 0,
            y: [0, 20, 0],
            transition: {
                opacity: { duration: 1, delay: 0.7 },
                scale: { duration: 0.8, delay: 0.7 },
                rotate: { duration: 0.8, delay: 0.7 },
                y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                }
            }
        }
    };

    const floatingShape3Variants = {
        initial: {
            opacity: 0,
            scale: 0.5,
            rotate: -10
        },
        animate: {
            opacity: 0.7,
            scale: 1,
            rotate: 0,
            x: [0, -10, 0],
            y: [0, -10, 0],
            transition: {
                opacity: { duration: 1, delay: 0.9 },
                scale: { duration: 0.8, delay: 0.9 },
                rotate: { duration: 0.8, delay: 0.9 },
                x: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                },
                y: {
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }
            }
        }
    };

    return (
        <div className={style.heroSection}
            style={{
                backgroundImage: `url(${heroBackground})`,
            }}>

            {/* Animated Background Shape - Main */}
            <motion.img
                loading='lazy'
                alt='decorative shape'
                variants={floatingShape3Variants}
                initial="initial"
                animate="animate"
                src={shapeImg}
                className={'position-absolute end-0 ' + style.decroImage}
            />

            <div className={style.contentContainer}>
                <div className="container-fluid">
                    <div className={`row py-5 ${style.mainContent}`}>
                        {/* Content Column */}
                        <div className="col-lg-8 col-xl-9 mb-5 mb-lg-0">

                            {/* Decorative floating shapes */}
                            <motion.img
                                loading='lazy'
                                alt='decorative shape'
                                variants={floatingShape1Variants}
                                initial="initial"
                                animate="animate"
                                src={shapeImg1}
                                className={'position-absolute ms-5 ' + style.decroImage}
                                style={{
                                    bottom: '80%',
                                }}
                            />

                            <motion.img
                                loading='lazy'
                                alt='decorative shape'
                                variants={floatingShape2Variants}
                                initial="initial"
                                animate="animate"
                                src={shapeImg2}
                                className={'position-absolute ms-5 ' + style.decroImage}
                                style={{
                                    top: '65%',
                                }}
                            />

                            {/* Main Content */}
                            <motion.div
                                className={"px-5 " + style.heading}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Heading with gradient text */}
                                <motion.h1
                                    className="fw-bold mb-4"
                                    variants={headingVariants}
                                >
                                    <motion.span
                                        className={style.gradientText}
                                        initial={{ backgroundPosition: "0% 50%" }}
                                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                    >
                                        {t("homePage.hero_title")}
                                    </motion.span>
                                    <br />
                                    <motion.span
                                        className={style.orangeText}
                                        animate={{
                                            textShadow: [
                                                "0 2px 8px rgba(228, 157, 35, 0.3)",
                                                "0 4px 16px rgba(228, 157, 35, 0.6)",
                                                "0 2px 8px rgba(228, 157, 35, 0.3)"
                                            ]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        {t("homePage.hero_subtitle")}
                                    </motion.span>
                                </motion.h1>

                                {/* Description */}
                                <motion.p
                                    className={"lead mb-4 text-light " + style.heroDescription}
                                    variants={descriptionVariants}
                                >
                                    {t("homePage.hero_desc_part1")}
                                    <br />
                                    {t("homePage.hero_desc_part2")}
                                </motion.p>

                                {/* Buttons */}
                                <motion.div
                                    className={"d-flex flex-row gap-3 mb-5 " + style.btnContainer}
                                    variants={buttonContainerVariants}
                                >
                                    <motion.div variants={buttonVariants}>
                                        <Link
                                            to="/support"
                                            className={style.ctaButton + " btn-web btn-web-secondary"}
                                        >
                                            <motion.span
                                                whileHover={{ x: [0, 5, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity }}
                                            >
                                                {t("homePage.request-quote-button")}
                                            </motion.span>
                                        </Link>
                                    </motion.div>

                                    <motion.div variants={buttonVariants}>
                                        <Link
                                            to={"/services"}
                                            className={style.secondaryButton + " btn-web"}
                                        >
                                            <motion.span
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ type: "spring", stiffness: 400 }}
                                            >
                                                {t("homePage.discover our services")}
                                            </motion.span>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave SVG */}
            <motion.div
                className="position-absolute bottom-0 start-0 end-0"
                style={{ zIndex: "1" }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path
                        fill="var(--bg-body)"
                        fillOpacity="1"
                        d="M0,256L60,234.7C120,213,240,171,360,149.3C480,128,600,128,720,154.7C840,181,960,235,1080,234.7C1200,235,1320,181,1380,154.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    />
                </svg>
            </motion.div>
        </div>
    );
};

export default Hero;
