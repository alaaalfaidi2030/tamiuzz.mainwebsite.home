import React from 'react'
import headingBackground from '../../../assets/Images/HeadingBackground.png'
import style from './Heading.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export default function Heading({ pageName }) {
    const { t } = useTranslation();
    const location = useLocation();

    return (
        <div className={"d-flex justify-content-center align-items-center flex-column " + style.heading} style={{
            backgroundImage: `url(${headingBackground})`,
        }}>
            <h2 >
                عن شركة تميز
            </h2>
            <p>
                نلتزم بتقديم خدماتنا بأعلى معايير الجوده            </p>
            <div className="links ">
                <Link to="/" >
                    {t("home")}
                </Link>
                <span className={style.arrow}>&gt;&gt;</span>
                <Link to={location.pathname} >
                    {t(pageName)}
                </Link>


            </div>
        </div>

    )
}
