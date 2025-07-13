import React, { useState, useEffect } from 'react';
import Heading from '../../Component/Ui/Heading/Heading';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import H2 from '../../Component/Ui/H2/H2';
import style from "./SolutionDetails.module.css";
import { motion } from 'framer-motion';

export default function SolutionDetails() {

    const { t } = useTranslation();

    const { id } = useParams();


    const [solutionDetails, setSolutionDetails] = useState({

        title: "business automation title",
        shortDescriptionKey: "business automation short description",
        imageUrl: "/images/solutions/business.jpg",
        sections: [
            {

                title: "automation tools",
                descriptionKey: "automation tools description",
                images: ["/images/sections/automation1.jpg"]
            },
            {
                title: "data analytics",
                descriptionKey: "solution details section data analytics description",
                images: ["/images/sections/data-analytics.jpg"]
            },
            {
                title: "cloud integration",
                descriptionKey: "cloud integration description",
                images: ["/images/sections/cloud-integration.jpg"]
            }
        ]
    });


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








    }, [id]); 

    return (
        <>
            <Heading pageName={t("solution details")} />
            <div className="my-3"></div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={headingVariants}
            >
                <H2 text={t(solutionDetails.title)} />
            </motion.div>

            <div className="container my-3">
                {solutionDetails.sections.map((section, idx) => (
                    <motion.div
                        className={"row my-5 py-5 " + style.cardContainer}
                        key={idx}
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
                                <img
                                    src={section.images[0]}
                                    className='w-100'
                                    alt={t(section.title)}
                                />
                            </div>
                        </motion.div>
                        <div className={"col-md-6 " + style.info}>
                            <h3>{t(section.title)}</h3>
                            <p>{t(section.descriptionKey)}</p>
                        </div>


                    </motion.div>
                ))}
            </div>
        </>
    );
}