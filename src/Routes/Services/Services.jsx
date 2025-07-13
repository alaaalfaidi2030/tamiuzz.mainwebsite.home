import React, { useState } from 'react'
import Heading from '../../Component/Ui/Heading/Heading'
import { useTranslation } from 'react-i18next'
import H3 from '../../Component/Ui/H3/H3'
import ContactSection from '../../Component/ContactSection/ContactSection'
import H2 from '../../Component/Ui/H2/H2'
import ServiceCard from '../../Component/ServiceCard/ServiceCard'

export default function Services() {
    const { t } = useTranslation()
    const [services, setServices] = useState([
        {
            "path": "web-development",
            "title": "تطوير المواقع",
            "iconUrl": "/icons/web.png",
            "imageUrl": "/images/web-dev.jpg",
            "description": "حلول متكاملة لتطوير الواجهة الأمامية والخلفية للمواقع الإلكترونية."
        },
        {
            "path": "mobile-app-development",
            "title": "تطوير تطبيقات الجوال",
            "iconUrl": "/icons/mobile.png",
            "imageUrl": "/images/mobile-app.jpg",
            "description": "إنشاء تطبيقات جوال عالية الجودة لأنظمة أندرويد وiOS."
        },
        {
            "path": "seo-optimization",
            "title": "تحسين محركات البحث (SEO)",
            "iconUrl": "/icons/seo.png",
            "imageUrl": "/images/seo.jpg",
            "description": "رفع ترتيب موقعك في نتائج محركات البحث."
        },
        {
            "path": "ui-ux-design",
            "title": "تصميم UI/UX",
            "iconUrl": "/icons/design.png",
            "imageUrl": "/images/ui-ux.jpg",
            "description": "تصميم واجهات مذهلة وسهلة الاستخدام."
        },
        {
            "path": "cloud-hosting",
            "title": "الاستضافة السحابية",
            "iconUrl": "/icons/cloud.png",
            "imageUrl": "/images/cloud.jpg",
            "description": "خدمات استضافة سحابية موثوقة وقابلة للتوسيع."
        },
        {
            "path": "ecommerce-solutions",
            "title": "حلول التجارة الإلكترونية",
            "iconUrl": "/icons/ecommerce.png",
            "imageUrl": "/images/ecommerce.jpg",
            "description": "أطلق متجرك الإلكتروني وحقق النمو باستخدام خدماتنا."
        },
        {
            "path": "digital-marketing",
            "title": "التسويق الرقمي",
            "iconUrl": "/icons/marketing.png",
            "imageUrl": "/images/marketing.jpg",
            "description": "زيادة انتشارك الرقمي من خلال استراتيجيات تسويقية فعالة."
        },
        {
            "path": "content-writing",
            "title": "كتابة المحتوى",
            "iconUrl": "/icons/content.png",
            "imageUrl": "/images/content.jpg",
            "description": "خدمات كتابة احترافية للمدونات والمواقع والإعلانات."
        },
        {
            "path": "it-consulting",
            "title": "الاستشارات التقنية",
            "iconUrl": "/icons/consulting.png",
            "imageUrl": "/images/consulting.jpg",
            "description": "توجيه خبراء لتطوير البنية التحتية والاستراتيجية التقنية لديك."
        },
        {
            "path": "cybersecurity",
            "title": "الأمن السيبراني",
            "iconUrl": "/icons/security.png",
            "imageUrl": "/images/security.jpg",
            "description": "احمِ بياناتك وأنظمتك بحلول أمان متقدمة."
        },
        {
            "path": "web-development",
            "title": "تطوير المواقع",
            "iconUrl": "/icons/web.png",
            "imageUrl": "/images/web-dev.jpg",
            "description": "حلول متكاملة لتطوير الواجهة الأمامية والخلفية للمواقع الإلكترونية."
        }])
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