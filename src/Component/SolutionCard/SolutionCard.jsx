import React from 'react';
import style from "./SolutionCard.module.css";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion
import { useTranslation } from 'react-i18next';

export default function SolutionCard({
    title,
    urlPath,
    shortDescription,
    imageUrl, // Use imageUrl from props if available, otherwise fallback to AboutImage
}) {
    const { t } = useTranslation()
    // Variants for the overall container animation
    const cardContainerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 10,
                delay: 0.1, // Slight delay for overall card
                when: "beforeChildren", // Animate container before children
                staggerChildren: 0.2 // Stagger child animations
            }
        },
    };

    // Variants for the image wrapper
    const imageWrapperVariants = {
        hidden: { opacity: 0, x: -50 }, // Starts left and hidden
        visible: {
            opacity: 1,
            x: 0, // Slides to original position
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        },
    };


    // Variants for individual text elements (h3, p) and button
    const textItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <>
            <motion.div
                className={"row my-5 py-5 rounded  " + style.cardContainer}
                variants={cardContainerVariants}
                initial="hidden"
                animate="visible"
                // Optional: Animate when it scrolls into view
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Animate once when 30% in view
            >
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <motion.div
                        className={style["imageWrapper"]}
                        variants={imageWrapperVariants}
                    >
                        <img loading='lazy' src={imageUrl} 
                            alt={title} />
                    </motion.div>
                </div>
                <div className="col-md-6 d-flex justify-content-center gap-3 flex-column">
                    <motion.h3 variants={textItemVariants}>{title}</motion.h3>
                    <motion.p variants={textItemVariants}>{shortDescription}...</motion.p>
                    <motion.div variants={textItemVariants}>
                        <Link className='btn-web btn-web-secondary' to={"/solutions/" + urlPath}> {t("read more")}</Link>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
}