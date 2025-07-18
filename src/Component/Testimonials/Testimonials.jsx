import React from 'react'
import img from "../../assets/Images/Home/testimonials.jpg"
import style from "./Testimonials.module.css"
import H2 from '../Ui/H2/H2'
import H3 from '../Ui/H3/H3'
import { useTranslation } from 'react-i18next'
export default function Testimonials() {
    const { t } = useTranslation()
    return (
        <div className={"my-2 " + style.Testimonials} style={{
            backgroundImage: `url(${img})`
        }}>
            <div className="container py-5 "
            >
                <div className={style.heading + " row"}>

                    <H2 text={t("Testimonials")} />
                    <H3 text={t("Some of our customer testimonials")} />
                </div>
            </div>
        </div>
    )
}
