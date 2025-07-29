import React, { useState } from 'react'
import Heading from '../../Component/Ui/Heading/Heading'
import { useTranslation } from 'react-i18next'
import H3 from '../../Component/Ui/H3/H3'
import SolutionCard from '../../Component/SolutionCard/SolutionCard'
import ContactSection from '../../Component/ContactSection/ContactSection'
import { useEffect } from 'react'
import Spinner from '../../Component/Ui/Spinner/Spinner'
import ErrorComp from '../../Component/Ui/ErrorComp/ErrorComp'
import NoDataFounded from '../../Component/Ui/NoDataFounded/NoDataFounded'
import axios from 'axios'
import { baseURL, getHeaders } from '../../Utilies/data'

export default function Solutions() {
    const { t } = useTranslation()
    // const solutions = [
    //     {
    //         "title": "Smart Business Automation",
    //         "urlPath": "smart-business-automation",
    //         "shortDescription": "Automate and optimize your business processes.",
    //         "imageUrl": "/images/solutions/business.jpg"
    //     },
    //     {
    //         "title": "E-Commerce Platform",
    //         "urlPath": "e-commerce-platform",
    //         "shortDescription": "Launch and manage your online store easily.",
    //         "imageUrl": "/images/solutions/ecommerce.jpg"
    //     },
    //     {
    //         "title": "Customer Support Portal",
    //         "urlPath": "customer-support-portal",
    //         "shortDescription": "Provide 24/7 support for your customers.",
    //         "imageUrl": "/images/solutions/support.jpg"
    //     },
    //     {
    //         "title": "Online Education System",
    //         "urlPath": "online-education-system",
    //         "shortDescription": "Deliver courses and track progress.",
    //         "imageUrl": "/images/solutions/education.jpg"
    //     },
    //     {
    //         "title": "Data Analytics Dashboard",
    //         "urlPath": "data-analytics-dashboard",
    //         "shortDescription": "Visualize and analyze business data.",
    //         "imageUrl": "/images/solutions/analytics.jpg"
    //     }]
    const [solutions, setSolutions] = useState([]);
    const [errorFlag, setErrorFlag] = useState(false)
    const [loading, setLoading] = useState(true)


    const getSolutions = async () => {
        try {
            setLoading(true)
            setErrorFlag(false)
            setSolutions([]);
            const { data } = await axios.get(baseURL + "/solutions", {
                headers: getHeaders(),
            });
            if (data.success && data.data && data.data.length !== 0) {
                setSolutions(data.data);
                setLoading(false)
            } else {
                setSolutions([]);
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            setErrorFlag(true)
        }
    };

    useEffect(() => {
        getSolutions()
    }, [])


    return (
        <section id='solutions'>
            <Heading pageName={t("solutions")} />
            {(!loading) ?
                <div className="container my-5">
                    {/* 
                 {
            "path": "web-development",
            "title": "تطوير المواقع",
            "iconUrl": "/icons/web.png",
            "imageUrl": "/images/web-dev.jpg",
            "description": "حلول متكاملة لتطوير الواجهة الأمامية والخلفية للمواقع الإلكترونية."
        }, */}
                    {errorFlag ?
                        <ErrorComp />

                        :
                        solutions.length == 0 ?
                            <NoDataFounded />
                            : <>
                                <H3 text={t("solutionPage.solution_title")} />

                                {
                                    solutions.map((service, idx) => <SolutionCard key={idx} {...service} />

                                    )
                                }
                            </>

                    }
                </div>
                :
                <Spinner sectionFlag={true} />
            }
            <ContactSection />
        </section>
    )
}
