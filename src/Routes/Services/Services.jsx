import React, { useEffect, useState } from 'react'
import Heading from '../../Component/Ui/Heading/Heading'
import { useTranslation } from 'react-i18next'
import H3 from '../../Component/Ui/H3/H3'
import ContactSection from '../../Component/ContactSection/ContactSection'
import H2 from '../../Component/Ui/H2/H2'
import ServiceCard from '../../Component/ServiceCard/ServiceCard'
import axios from 'axios'
import Spinner from '../../Component/Ui/Spinner/Spinner'
import ErrorComp from '../../Component/Ui/ErrorComp/ErrorComp'
import NoDataFounded from '../../Component/Ui/NoDataFounded/NoDataFounded'
import { baseURL, getHeaders } from '../../Utilies/data'
// import { services } from '../../Utilies/data'

export default function Services() {
    const { t } = useTranslation()
    const [services, setServices] = useState([])
    const [errorFlag, setErrorFlag] = useState(false)
    const [loading, setLoading] = useState(true)


    const getServices = async () => {
        try {
            setLoading(true)
            setErrorFlag(false)
            setServices([]);
            const { data } = await axios.get(baseURL + "/services", {
                headers: getHeaders(),
            });
            if (data.success && data.data && data.data.length !== 0) {
                setServices(data.data);
                setLoading(false)
            } else {
                setServices([]);
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            setErrorFlag(true)
        }
    };

    useEffect(() => {
        getServices()
    }, [])

    return (
        <section id='services'>
            <Heading pageName={t("services")} />
            {(!loading) ?
                <div className="container my-5">
                    <div className=" row mb-5">
                        <H2 text={t("services")} />
                    </div>
                    {
                        errorFlag ?
                            <ErrorComp /> :
                            services.length == 0 ?
                                <NoDataFounded />
                                :
                                <>
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
                                </>}

                </div>
                : <Spinner sectionFlag={true} />}

            <ContactSection />
        </section>
    )
}