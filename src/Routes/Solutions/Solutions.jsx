import React from 'react'
import Heading from '../../Component/Ui/Heading/Heading'
import { useTranslation } from 'react-i18next'
import H3 from '../../Component/Ui/H3/H3'
import SolutionCard from '../../Component/SolutionCard/SolutionCard'

export default function Solutions() {
    const { t } = useTranslation()
    const solutions = [
        {
            "title": "Smart Business Automation",
            "urlPath": "smart-business-automation",
            "shortDescription": "Automate and optimize your business processes.",
            "imageUrl": "/images/solutions/business.jpg"
        },
        {
            "title": "E-Commerce Platform",
            "urlPath": "e-commerce-platform",
            "shortDescription": "Launch and manage your online store easily.",
            "imageUrl": "/images/solutions/ecommerce.jpg"
        },
        {
            "title": "Customer Support Portal",
            "urlPath": "customer-support-portal",
            "shortDescription": "Provide 24/7 support for your customers.",
            "imageUrl": "/images/solutions/support.jpg"
        },
        {
            "title": "Online Education System",
            "urlPath": "online-education-system",
            "shortDescription": "Deliver courses and track progress.",
            "imageUrl": "/images/solutions/education.jpg"
        },
        {
            "title": "Data Analytics Dashboard",
            "urlPath": "data-analytics-dashboard",
            "shortDescription": "Visualize and analyze business data.",
            "imageUrl": "/images/solutions/analytics.jpg"
        }]
    return (
        <section id='solutions'>
            <Heading pageName={t("solutions")} />

            <div className="container my-5">
                {/* 
                 {
            "path": "web-development",
            "title": "تطوير المواقع",
            "iconUrl": "/icons/web.png",
            "imageUrl": "/images/web-dev.jpg",
            "description": "حلول متكاملة لتطوير الواجهة الأمامية والخلفية للمواقع الإلكترونية."
        }, */}
                <H3 text="نحن نقدم أفضل الحلول" />

                {
                    solutions.map((service, idx) => <SolutionCard key={idx} {...service} />

                    )
                }

            </div>
        </section>
    )
}
