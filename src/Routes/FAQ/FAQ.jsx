import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from './FAQ.module.css';
import AboutImage from '../../assets/Images/Home/about-img.png';
import H2 from '../../Component/Ui/H2/H2';
import Heading from '../../Component/Ui/Heading/Heading';
import { motion } from 'framer-motion';
import axios from 'axios';
import { baseURL } from '../../Utilies/data';
import { useEffect } from 'react';
import Spinner from '../../Component/Ui/Spinner/Spinner';
import NoDataFounded from '../../Component/Ui/NoDataFounded/NoDataFounded';

function FAQ() {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [faq, setFaq] = useState([]);
    const [errorFlag, setErrorFlag] = useState(false)
    const [loading, setLoading] = useState(false)


    const getFaq = async () => {
        try {
            setLoading(true)
            setErrorFlag(false)
            setFaq(null);
            const { data } = await axios.get(baseURL + "/faqs");
            if (data.success && data.data && data.data.length !== 0) {
                setFaq(data.data.data);
                setLoading(false)
            } else {
                setFaq([]);
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            setErrorFlag(true)
        }
    };


    const toggleItem = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut'
            }
        }
    };

    useEffect(() => {

        getFaq();
    }, [])

    return (
        <>
            <Heading pageName="faq" />
            <H2 text={t("faq")} />
            {

                (!loading) ?
                    <motion.section
                        className={`${style.faqSection} border-bottom border-5 border-white`}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                    >{
                            errorFlag ?

                                <div className="row fw-bold ">
                                    <p className='text-center alert alert-warning w-75 rounded-4 m-auto fs-1'>
                                        {t("errors.Something went wrong, please try again later")}

                                    </p>
                                </div>
                                :
                                <div className="container">
                                    {faq.length == 0 ?
                                        <NoDataFounded />
                                        :
                                        <div className="row">
                                            <div className="col-md-7 d-flex flex-column gap-5">

                                                <>
                                                    <motion.h2
                                                        className={style.heading}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2, duration: 0.6 }}
                                                        viewport={{ once: true }}
                                                    >
                                                        {t('faqPage.headline1')}<br />{t('faqPage.headline2')}
                                                    </motion.h2>

                                                    <div className={style.accordion}>
                                                        {faq.map((item, index) => (
                                                            <motion.div
                                                                key={index}
                                                                className={`${style.item} ${activeIndex === index ? style.active : ''}`}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                whileInView={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: index * 0.2 }}
                                                                viewport={{ once: true }}
                                                            >
                                                                <div
                                                                    className={style.question}
                                                                    onClick={() => toggleItem(index)}
                                                                >
                                                                    <span>{item.question}</span>
                                                                </div>
                                                                {activeIndex === index && (
                                                                    <motion.div
                                                                        className={style.answer}
                                                                        initial={{ opacity: 0, height: 0 }}
                                                                        animate={{ opacity: 1, height: 'auto' }}
                                                                        transition={{ duration: 0.3 }}
                                                                    >
                                                                        <strong>{item.question}</strong>
                                                                        <p>{item.answer}</p>
                                                                    </motion.div>
                                                                )}
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </>
                                            </div>
                                            <div className="col-md-5 d-flex justify-content-center align-items-center">
                                                <motion.div
                                                    className={style.imageWrapper}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.6, delay: 0.3 }}
                                                    viewport={{ once: true }}
                                                >
                                                    <img src={AboutImage} alt="business team" className={style.image} />
                                                </motion.div>
                                            </div>
                                        </div>
                                    }
                                </div>
                        }
                    </motion.section > : <Spinner sectionFlag={true} />
            }
        </>
    );
};

export default FAQ;