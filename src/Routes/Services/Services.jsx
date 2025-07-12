import React from 'react'
import Heading from '../../Component/Ui/Heading/Heading'
import { useTranslation } from 'react-i18next'
import H3 from '../../Component/Ui/H3/H3'
import ContactSection from '../../Component/ContactSection/ContactSection'
import H2 from '../../Component/Ui/H2/H2'

export default function Services() {
    const { t } = useTranslation()
    return (
        <section id='services'>
            <Heading pageName={t("services")} />

            <div className="container my-5">
                <div className=" row mb-5">
                    <H2 text={t("services")} />
                </div>
                <div className="row mt-5">
                    <H3 text={"نحن نقدم أفضل جوده"} />

                </div>

            </div>

            <ContactSection />
        </section>
    )
}
