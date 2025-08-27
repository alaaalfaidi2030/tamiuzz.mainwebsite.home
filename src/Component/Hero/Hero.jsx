import { motion } from 'framer-motion';
import style from './Hero.module.css';
import heroBackground from '../../assets/Images/Home/Hero_background.jpg'; // Assuming you have a background image
import shapeImg from "../../assets/Images/Home/shape-img.png"
import shapeImg1 from "../../assets/Images/Home/shape-img-1.png"
import shapeImg2 from "../../assets/Images/Home/shape-img-2.png"
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import i18n from '../../../next-i18next.config';
const Hero = () => {
    const { t, i18n } = useTranslation();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };



    return (
        <div className={style.heroSection}
            style={
                {
                    backgroundImage: `url(${heroBackground})`,
                }
            }>
            {/* Animated Background Elements */}
            <motion.img
                loading='lazy'
                alt='decroImage'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}

                src={shapeImg} className={'position-absolute end-0 ' + style.decroImage} />

            <div className={style.contentContainer} >
                <div className="container-fluid" >
                    <div className={`row py-5  ${style.mainContent} `}

                    >

                        {/* Right Side - Content */}
                        <div className="col-lg-8 col-xl-9 mb-5 mb-lg-0">

                            {/* decoration icons */}

                            <motion.img
                                loading='lazy'
                                alt='decroImage'
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                src={shapeImg1} className={'position-absolute ms-5  ' + style.decroImage} style={{
                                    bottom: '80%',
                                    // left: i18n.language == "ar" ? '10%' : "auto",
                                    // right: i18n.language == "ar" ? 'auto' : "10%"
                                }} />

                            <motion.img
                                loading='lazy'
                                alt='decroImage'
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                src={shapeImg2} className={'position-absolute ms-5  ' + style.decroImage} style={{
                                    top: '65%',
                                    // right: i18n.language == "ar" ? '10%' : "auto",
                                    // left: i18n.language == "ar" ? 'auto' : "10%"
                                }} />

                            <motion.div
                                className={"px-5 " + style.heading}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"

                            >
                                <motion.h1
                                    className="fw-bold mb-4  "
                                    variants={itemVariants}
                                >
                                    <span className={style.gradientText}>
                                        {t("homePage.hero_title")}
                                    </span>
                                    <br />
                                    <span className={style.orangeText}> {t("homePage.hero_subtitle")}</span>
                                </motion.h1>

                                <motion.p
                                    className={"lead mb-4 text-light " + style.heroDescription}
                                    variants={itemVariants}
                                >
                                    {t("homePage.hero_desc_part1")}
                                    <br />
                                    {t("homePage.hero_desc_part2")}

                                </motion.p>

                                <motion.div
                                    className={"d-flex flex-row gap-3 mb-5 " + style.btnContainer}
                                    variants={itemVariants}
                                >
                                    <Link
                                        to="/support"
                                        className={style.ctaButton + " btn-web btn-web-secondary  "}>
                                        {t("homePage.request-quote-button")}
                                    </Link>

                                    <Link
                                        to={"/services"}
                                        className={style.secondaryButton + " btn-web"}
                                    >
                                        {t("homePage.discover our services")}
                                    </Link>
                                </motion.div>

                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="position-absolute bottom-0 start-0 end-0" style={{ zIndex: "1" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="var(--bg-color)" fill-opacity="1" d="M0,256L60,234.7C120,213,240,171,360,149.3C480,128,600,128,720,154.7C840,181,960,235,1080,234.7C1200,235,1320,181,1380,154.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>            </div>
        </div>
    );
};

export default Hero;
