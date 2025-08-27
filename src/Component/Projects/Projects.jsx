import React from 'react'
import projectsImage from "../../assets/Images/Home/Projects.jpg"
import style from "./Projects.module.css"
import { useTranslation } from 'react-i18next';
import H3 from '../Ui/H3/H3';
import H2 from '../Ui/H2/H2';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';

export default function Projects({projects }) {
    const { t } = useTranslation();

    // const projects = [
    //     {
    //         title: "Software Development",
    //         imageUrl: "https://dev1.tamiuzz.com/static/images/demo-project.jpg",
    //         category: "Technology"
    //     }, {
    //         title: "Software Development",
    //         imageUrl: "https://dev1.tamiuzz.com/static/images/demo-project.jpg",
    //         category: "Technology"
    //     }, {
    //         title: "Software Development",
    //         imageUrl: "https://dev1.tamiuzz.com/static/images/demo-project.jpg",
    //         category: "Technology"
    //     }, {
    //         title: "Software Development",
    //         imageUrl: "https://dev1.tamiuzz.com/static/images/demo-project.jpg",
    //         category: "Technology"
    //     },
    // ];


    return (
        <div className={style["projects"]} style={{ backgroundImage: `url(${projectsImage})` }}>
            <div className="container">
                <div className="col-md-12">
                    <div className={style["heading"]}>
                        <H2 text={t("projects.Our Projects")} textColorWhite={true} />
                        <H3 text={t("projects.Description")} />
                    </div>
                </div>
                <div className="col-md-12 my-3 flex-grow-1 d-flex align-items-center" style={{ minHeight: "70vh" }}>

                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={30}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {projects.map((project, index) => (
                            <SwiperSlide key={index}>
                                <ProjectCard {...project} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* Swiper Component */}

            </div>

        </div>
    )
}
function ProjectCard({ imageUrl, title, category }) {
    return (
        <motion.div
            className={style.card}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <img src={imageUrl} alt={title} className={style.image} />
            <div className={style.overlay}>
                <span className={style.category}>{category}</span>
                <h3 className={style.title}>{title}</h3>
                <div className={style.icon}>
                    <i className="fa-solid fa-up-right-from-square"></i>
                </div>
            </div>
        </motion.div>
    );
}
