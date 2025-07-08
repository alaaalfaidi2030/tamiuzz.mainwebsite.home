import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from './FAQ.module.css';
import AboutImage from '../../assets/Images/Home/about-img.png';
import H2 from '../../Component/Ui/H2/H2';
import Heading from '../../Component/Ui/Heading/Heading';

const faqItems = [
    {
        question: 'ماهي المده المناسبة لخطة العمل ؟',
        answer: 'There are many variations of passages Lorem Ipsum but the majority have suffered alteration in some form, by injected humor.'
    },
    {
        question: 'ماذا تشمل الخطة؟',
        answer: 'The plan includes infrastructure, security, user experience, and marketing essentials.'
    }
];

export default function FAQ() {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleItem = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (<>
        <Heading pageName={"faq"} />
        <H2 text={t("faq")}> </H2>
        <section className={style.faqSection + " border-bottom border-5 border-white"}>
            <div className="container">
                <div className="row">
                    <div className="col-md-7 d-flex flex-column  gap-5">

                        <h2 className={style.heading}>
                            حافظ على أمان عملك<br />وتأكد من توافره بدرجة عالية
                        </h2>
                        <div className={style.accordion}>
                            {faqItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`${style.item} ${activeIndex === index ? style.active : ''}`}
                                >
                                    <div
                                        className={style.question}
                                        onClick={() => toggleItem(index)}
                                    >
                                        <span>{item.question}</span>
                                        {/* {activeIndex === index ? <FaAngleDown /> : <FaAngleLeft />} */}
                                    </div>
                                    {activeIndex === index && (
                                        <div className={style.answer}>
                                            <strong>{item.question}</strong>
                                            <p>{item.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-5 d-flex justify-content-center align-items-center">

                        <div className={style.imageWrapper}>
                            <img src={AboutImage} alt="business team" className={style.image} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    );
}
