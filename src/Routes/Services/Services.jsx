import React, { useState } from 'react'
import Heading from '../../Component/Ui/Heading/Heading'
import { useTranslation } from 'react-i18next'
import H3 from '../../Component/Ui/H3/H3'
import ContactSection from '../../Component/ContactSection/ContactSection'
import H2 from '../../Component/Ui/H2/H2'
import ServiceCard from '../../Component/ServiceCard/ServiceCard'
import { services } from '../../Utilies/data'

export default function Services() {
    const { t } = useTranslation()
    const [servicesx, setServices] = useState()
    return (
        <section id='services'>
            <Heading pageName={t("services")} />

            <div className="container my-5">
                <div className=" row mb-5">
                    <H2 text={t("services")} />
                </div>
                <div className="row mt-5">
                    <H3 text={t("ServicesSubTitle")} />

                </div>
                <div className="row justify-content-center my-5">
                    {
                        services.map((service, idx) => {

                            return <ServiceCard {...service} key={idx} />
                        })
                    }
                </div>

            </div>

            <ContactSection />
        </section>
    )
}