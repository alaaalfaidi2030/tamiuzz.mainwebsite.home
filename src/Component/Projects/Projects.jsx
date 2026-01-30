import React from 'react'
import projectsImage from "../../assets/Images/Home/Projects.jpg"
import style from "./Projects.module.css"
import { useTranslation } from 'react-i18next';
import H3 from '../Ui/H3/H3';
import H2 from '../Ui/H2/H2';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';

export default function Projects({ projects }) {
    const { t } = useTranslation();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2
            }
        }
    };

    const headingVariants = {
        hidden: { opacity: 0, y: -30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 90,
                damping: 15
            }
        }
    };

    return (
        <div className={style["projects"]} style={{ backgroundImage: `url(${projectsImage})` }}>
            {/* Premium dark overlay */}
            <div className={style.overlay} />

            {/* Floating Decorative Shapes */}
            <motion.div
                className={style.floatingShape1}
                animate={{
                    y: [0, -35, 0],
                    x: [0, 20, 0],
                    rotate: [0, 12, 0]
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className={style.floatingShape2}
                animate={{
                    y: [0, 30, 0],
                    x: [0, -25, 0],
                    scale: [1, 1.15, 1]
                }}
                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className={style.floatingShape3}
                animate={{
                    y: [0, -25, 0],
                    rotate: [0, -10, 0]
                }}
                transition={{
                    duration: 13,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="container">
                <motion.div
                    className="col-md-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div className={style["heading"]} variants={headingVariants}>
                        <H2 text={t("projects.Our Projects")} textColorWhite={true} />
                        <H3 text={t("projects.Description")} />
                    </motion.div>
                </motion.div>

                <div className="col-md-12 my-3 flex-grow-1 d-flex align-items-center" style={{ minHeight: "60vh" }}>
                    <div className="w-100">
                        <Swiper
                            modules={[Pagination]}
                            spaceBetween={30}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                        >
                            {projects.map((project, index) => (
                                <SwiperSlide key={index}>
                                    <ProjectCard {...project} index={index} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProjectCard({ imageUrl, title, category, index }) {
    return (
        <motion.div
            className={style.card}
            initial={{ opacity: 0, y: 60, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
                type: "spring",
                stiffness: 80,
                damping: 18,
                delay: index * 0.1
            }}
            whileHover="hover"
            animate="rest"
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Premium Card Glow */}
            <div className={style.cardGlow} />

            <motion.img
                src={imageUrl}
                alt={title}
                className={style.image}
                variants={{
                    rest: { scale: 1 },
                    hover: {
                        scale: 1.15,
                        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
                    }
                }}
            />

            <motion.div
                className={style.overlay}
                variants={{
                    rest: { opacity: 0.8 },
                    hover: {
                        opacity: 0.95,
                        transition: { duration: 0.3 }
                    }
                }}
            >
                <motion.span
                    className={style.category}
                    variants={{
                        rest: { y: 0, opacity: 0.9 },
                        hover: {
                            y: -5,
                            opacity: 1,
                            transition: { type: "spring", stiffness: 300 }
                        }
                    }}
                >
                    {category}
                </motion.span>

                <motion.h3
                    className={style.title}
                    variants={{
                        rest: { y: 0 },
                        hover: {
                            y: -8,
                            transition: { type: "spring", stiffness: 300 }
                        }
                    }}
                >
                    {title}
                </motion.h3>

                <motion.div
                    className={style.icon}
                    variants={{
                        rest: {
                            scale: 1,
                            rotate: 0,
                            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%"
                        },
                        hover: {
                            scale: 1.2,
                            rotate: 45,
                            borderRadius: "50%",
                            transition: {
                                type: "spring",
                                stiffness: 200,
                                damping: 12
                            }
                        }
                    }}
                >
                    <div className={style.iconGlow} />
                    <i className="fa-solid fa-up-right-from-square"></i>
                </motion.div>
            </motion.div>

            {/* Decorative corner */}
            <div className={style.cardCorner} />
        </motion.div>
    );
}
