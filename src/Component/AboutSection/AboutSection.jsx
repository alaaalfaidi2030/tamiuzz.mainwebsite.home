import React from 'react'
import H2 from '../Ui/H2/H2'
import { useTranslation } from 'react-i18next';
import AboutImage from '../../assets/Images/Home/about-img.png';
import style from './AboutSection.module.css';

export default function AboutSection() {
    const { t } = useTranslation();

    return (
        <section className={style.aboutSection}>
            <H2 text={t("aboutHomeHeading") || "يمكننا تقديم خدمات مميزة للعملاء"} />
            <div className={style.container}>
                <div className={style.content}>
                    <h2 className={style.heading}>
                        يمكننا تقديم خدمات مميزه للعملاء
                    </h2>
                    <p className={style.description}>
                        شركة تميز هي شركة تقنية رائدة في المملكة العربية السعودية والشرق الأوسط، تهدف إلى تقديم حلول تقنية ذكية تلبي احتياجات الشركات والمؤسسات والأفراد.
                    </p>
                    <div className={style.features}>
                        <ul>
                            <li><i className="fa-solid fa-check"></i>استشارات تكنولوجيا المعلومات</li>
                            <li><i className="fa-solid fa-check"></i>تطوير التطبيقات</li>
                            <li><i className="fa-solid fa-check"></i>الأمن السيبراني</li>
                            <li><i className="fa-solid fa-check"></i>إدارة تكنولوجيا المعلومات</li>
                        </ul>
                        <ul>
                            <li><i className="fa-solid fa-check"></i>تصميم واجهة وتجربة المستخدم</li>
                            <li><i className="fa-solid fa-check"></i>تحليل البيانات</li>
                            <li><i className="fa-solid fa-check"></i>أمن قاعدة البيانات</li>
                            <li><i className="fa-solid fa-check"></i>التسوق الرقمي</li>
                        </ul>
                    </div>
                    <button className={"btn-web btn-web-secondary my-3"}>تفاصيل خدماتنا</button>
                    <div className={style.statistics}>
                        <div className={style.statBox + " row"}>
                            <div className="col-4 d-flex align-items-center justify-content-center">
                                <i className="fa-solid fa-diagram-project "></i>

                            </div>
                            <div className="col-8 d-flex flex-column align-items-center justify-content-center">
                                <h4>600</h4>
                                <p>مشروع</p>
                            </div>
                        </div>
                        <div className={style.statBox+" row"}>
                            <div className="col-4 d-flex align-items-center justify-content-center">

                                <i className="fa-solid fa-users"></i>
                            </div>
                            <div className="col-8 d-flex flex-column align-items-center justify-content-center">

                                <h4>+6,561</h4>
                                <p>عملاء راضون</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.imageWrapper}>
                    <img src={AboutImage} alt="About" className={style.image} />
                </div>
            </div>
        </section>
    );
}
