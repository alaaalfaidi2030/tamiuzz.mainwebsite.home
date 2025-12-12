import React, { useState, useEffect } from 'react';
import Heading from '../../Component/Ui/Heading/Heading';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import H2 from '../../Component/Ui/H2/H2';
import style from "./SolutionDetails.module.css";
import { motion } from 'framer-motion';
import { baseURL, getHeaders } from '../../Utilies/data';
import axios from 'axios';
import NoDataFounded from '../../Component/Ui/NoDataFounded/NoDataFounded';
import Spinner from '../../Component/Ui/Spinner/Spinner';

export default function SolutionDetails() {

    const { t } = useTranslation();

    const { id } = useParams();


    const [solutionDetails, setSolutionDetails] = useState(null);
    const [noDataFounded, setNoDataFounded] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    // {

    //         title: "business automation title",
    //         shortDescriptionKey: "business automation short description",
    //         imageUrl: "/images/solutions/business.jpg",
    //         sections: [
    //             {

    //                 title: "automation tools",
    //                 descriptionKey: "automation tools description",
    //                 images: ["/images/sections/automation1.jpg"]
    //             },
    //             {
    //                 title: "data analytics",
    //                 descriptionKey: "solution details section data analytics description",
    //                 images: ["/images/sections/data-analytics.jpg"]
    //             },
    //             {
    //                 title: "cloud integration",
    //                 descriptionKey: "cloud integration description",
    //                 images: ["/images/sections/cloud-integration.jpg"]
    //             }
    //         ]
    //     }


    const getSolutionsDetails = async () => {
        try {
            setLoading(true)
            setNoDataFounded(false)
            setSolutionDetails(null);
            const { data } = await axios.get(baseURL + "/solutions/" + id, {
                headers: getHeaders(),
            });
            if (data.success && data.data && data.data.length !== 0) {
                setSolutionDetails(data.data);
                setLoading(false)
            } else {
                setSolutionDetails(null);
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            setNoDataFounded(true)
        }
    };

    const headingVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const sectionContainerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        },
    };

    const imageWrapperVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
    };


    useEffect(() => {
        if (id) {

            getSolutionsDetails()
        }
        else {
            navigate("/solutions")
        }

    }, [id]);

    return (
        <>
            <Heading heading={t("solutionPage.heading")} subHeading={t("solutionPage.subheading")} pageName={t("solutionPage.solution details")} />
            <div className="py-3"></div>
            {(!loading) ?
                noDataFounded ?
                    <div className="container">

                        <NoDataFounded />
                    </div>
                    :
                    <div className="container  my-3">

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={headingVariants}
                        >
                            <H2 text={t(solutionDetails.title)} />
                        </motion.div>



                        {solutionDetails.sections.map((section, idx) => (
                            <React.Fragment key={idx}>
                                <motion.div
                                    className={"row g-5 my-3 py-3 " + style.cardContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.4 }}
                                    variants={sectionContainerVariants}
                                >
                                    <motion.div
                                        className="col-md-6 d-flex justify-content-center"
                                        variants={imageWrapperVariants}
                                    >
                                        <div className={style["imageWrapper"]}>
                                            <img loading='lazy'
                                                src={section.images[0]}
                                                className='w-100 rounded-4'
                                                alt={section.title}
                                            />
                                        </div>
                                    </motion.div>
                                    <div className={"col-md-6 " + style.info}>
                                        <h3>{section.title}</h3>
                                        <div className={style.desc} dangerouslySetInnerHTML={{
                                            __html: section.description
                                        }}></div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className={style.flatBtnGroup}
                                    initial={{ opacity: 0, y: 32 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                >
                                    {solutionDetails.profileUrl &&
                                        <a
                                            target='_blank'
                                            href={solutionDetails.profileUrl}
                                            className={style.flatBtn + ' ' + style.flatProfile}
                                            title={t('solutionPage.download_profile')}
                                        >
                                            <i className="fa-solid fa-file" style={{ marginLeft: 6 }}></i>
                                            <span>{t('solutionPage.download_profile')}</span>
                                        </a>}
                                    {solutionDetails.downloadUrl &&
                                        <a
                                            target='_blank'
                                            href={solutionDetails.downloadUrl}
                                            className={style.flatBtn + ' ' + style.flatDownload}
                                            title={t('solutionPage.download_document')}
                                        >
                                            <i className="fa-solid fa-download" style={{ marginLeft: 6 }}></i>
                                            <span>{t('solutionPage.download_document')}</span>
                                        </a>}
                                </motion.div>
                            </React.Fragment>
                        ))}


                        <div className={style.downloadLinks}>
                            <div className="container">
                                <div className={style["linksWrapper"]}>
                                    {solutionDetails.profileUrl &&
                                        <motion.a
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, amount: 0.4 }}
                                            variants={sectionContainerVariants}
                                            target='_blank'
                                            href={solutionDetails.profileUrl}
                                            className={`btn-web btn-web-secondary ${style.downloadBtn} ${style.iconOnlyBtn}`}
                                            title={t('solutionPage.download_profile')}
                                        >
                                            <i className="fa-solid fa-file"></i>
                                            <span className={style.btnText}>{t('solutionPage.download_profile')}</span>
                                        </motion.a>}
                                    {solutionDetails.downloadUrl &&
                                        <motion.a
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, amount: 0.4 }}
                                            variants={sectionContainerVariants}
                                            target='_blank'
                                            href={solutionDetails.downloadUrl}
                                            className={`btn-web btn-web-primary ${style.downloadBtn} ${style.iconOnlyBtn}`}
                                            title={t('solutionPage.download_document')}
                                        >
                                            <i className="fa-solid fa-download"></i>
                                            <span className={style.btnText}>{t('solutionPage.download_document')}</span>
                                        </motion.a>}
                                </div>
                            </div>
                        </div>
                    </div > : <Spinner sectionFlag={true} />
            }
        </>
    );
}