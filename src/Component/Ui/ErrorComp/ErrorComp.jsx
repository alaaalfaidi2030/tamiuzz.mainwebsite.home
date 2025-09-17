import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ErrorComp() {
    const { t } = useTranslation()
    return (
        <div className="row fw-bold my-5">
            <p className='text-center alert alert-warning w-75 rounded-4 m-auto fs-1'>
                {t("errors.Something went wrong, please try again later")}
            </p>
        </div>
    )
}
