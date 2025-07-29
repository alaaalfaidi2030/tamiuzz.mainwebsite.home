import React from 'react'; // useEffect is not strictly needed for basic Framer Motion visibility animations
import Heading from '../../Component/Ui/Heading/Heading';
import { useTranslation } from 'react-i18next';
import ContactSection from '../../Component/ContactSection/ContactSection';
import H2 from '../../Component/Ui/H2/H2';
import style from "./AboutUs.module.css";
import aboutImg from "../../assets/Images/about-img.png";
import { motion } from 'framer-motion'; // Import motion
import { Link } from 'react-router-dom';

export default function AboutUs() {
    // We'll use the 'about' namespace for translations here
    const { t } = useTranslation();

    const branches = [
        {
            city: t("aboutSection.riyadh"),
            phone: "0531235330 - 920019150",
            address: t("aboutSection.riyadh-address"),
        },
        {
            city: t("aboutSection.dammam"),
            phone: "0531235330 - 920019150",
            address: t("aboutSection.dammam-address"),
        },
        {
            city: t("aboutSection.cairo"),
            phone: "+208-6666-0112",
            address: t("aboutSection.cairo-address"),
        },
    ];

    // Framer Motion Variants for common animations
    const fadeInVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const slideInRightVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const slideInLeftVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const branchItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
    };

    return (
        <section id='about-us'>
            <Heading pageName={t("aboutSection.about-us-page-name")} />

            <div className="container my-5">
                <motion.div
                    className="row mb-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }} // Animate when 60% in view
                    variants={fadeInVariants}
                >
                    <H2 text={t("aboutSection.why-are-we-special")} />
                </motion.div>

                <motion.div
                    className="row my-5 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    variants={fadeInVariants}
                    transition={{ delay: 0.2 }} // Added a slight delay
                >
                    <div className={style.info}>
                        <p className='mb-5'>{t("aboutSection.about-us-intro-paragraph")}</p>
                        <Link to="/support" className="btn-web btn-web-secondary">
                            {t("aboutSection.request-quote-button")}
                        </Link>
                    </div>
                </motion.div>

                {/* Technology Enhancement Section */}
                <div className={style.techSection + " my-5"}>
                    <div className="row align-items-center">
                        <motion.div
                            className="col-lg-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.6 }}
                            variants={slideInRightVariants}
                        >
                            <div className={style.content}>
                                <h3>{t("aboutSection.tech-enhancement-heading")}</h3>
                                <div className="row mt-5">
                                    <div className="col-md-6">
                                        <div className="d-flex gap-3">
                                            <div className="mt-3">
                                                <i className="fas fa-chart-line"></i>
                                            </div>
                                            <div>
                                                <h4>{t("aboutSection.our-goals-heading")}</h4>
                                                <p>{t("aboutSection.our-goals-paragraph")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex gap-3">
                                            <div className="mt-3">
                                                <i className="fas fa-eye"></i>
                                            </div>
                                            <div className="">
                                                <h4>{t("aboutSection.our-vision-heading")}</h4>
                                                <p>{t("aboutSection.our-vision-paragraph")}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="col-lg-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.6 }}
                            variants={slideInLeftVariants}
                        >
                            <div className={style.imageContainer}>
                                <img
                                    src={aboutImg}
                                    alt={t("aboutSection.about-us-image-alt")}
                                    className={"w-100 h-100"}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Our Branches Section */}
                <motion.div
                    className={"row " + style.branches}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }} // Adjust amount for branches section
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1 // Stagger animation for child branch items
                            }
                        }
                    }}
                >
                    <h3>{t("aboutSection.our-branches-heading")}</h3>
                    {branches.map((branch, idx) =>
                        <motion.div
                            className={style.branch}
                            key={idx}
                            variants={branchItemVariants}
                        >
                            <h5 className={style.city}>{branch.city}</h5>
                            <div className="row">
                                <p className='col-md-6'><i className="fas fa-phone"></i>{branch.phone}</p>
                                <p className='col-md-6'><i className="fas fa-map-marker-alt"></i> {branch.address}</p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            <ContactSection />
        </section>
    );
}