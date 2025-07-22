import React from 'react'
import { useTranslation } from 'react-i18next'
import NotFounded from "../../../assets/Images/NotFounded.png"
import style from "./NoDataFounded.module.css"

export default function NoDataFounded() {
    const { t } = useTranslation()
    return (
        <div className={'d-flex flex-column justify-content-center align-items-center ' + style.NoDataFounded}>
            <img src={NotFounded} alt="Error Image" />
            <p> {t("No data founded")}</p>
        </div>
    )
}
