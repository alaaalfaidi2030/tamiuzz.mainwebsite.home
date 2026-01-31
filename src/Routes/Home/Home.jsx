import React, { lazy, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { HomeContentContext } from '../../Context/homeContentContext'
import Spinner from '../../Component/Ui/Spinner/Spinner'
import { createLazyLoadingComp } from '../../Utilies/LazyLoadingHelper'
import Projects from '../../Component/Projects/Projects'
import SEO from '../../Component/SEO/SEO'
import style from './Home.module.css'


const Hero = createLazyLoadingComp(() => import('../../Component/Hero/Hero'))
const AboutSection = createLazyLoadingComp(() => import('../../Component/AboutSection/AboutSection'))
// const HowWeWork = createLazyLoadingComp(() => import('../../Component/HowWeWork/HowWeWork'))
const WhatWeAreDoing = createLazyLoadingComp(() => import('../../Component/WhatWeAreDoing/WhatWeAreDoing'))
const ArticlesInHome = createLazyLoadingComp(() => import('../../Component/ArticlesInHome/ArticlesInHome'))
const Testimonials = createLazyLoadingComp(() => import('../../Component/Testimonials/Testimonials'));
const HowWeWork = createLazyLoadingComp(() => import('../../Component/HowWeWork/HowWeWork'));

export default function Home() {
    const { t } = useTranslation()
    const { homeContent, isLoading, } = useContext(HomeContentContext)

    if (isLoading)
        return <Spinner sectionFlag />
    else return (
        <div className={style.homePage}>
            <SEO
                title={t("seo.home.title", "Tamiuzz - شركة تميّز للحلول الرقمية والتسويق الإلكتروني")}
                description={t("seo.home.description", "شركة تميّز للحلول الرقمية والتسويق الإلكتروني تقدم خدمات SEO وتصميم مواقع وحملات PPC وإدارة التواصل الاجتماعي للشركات في مصر والخليج منذ 2018.")}
                canonicalPath="/"
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Tamiuzz - شركة تميّز",
                    "url": "https://tamiuzz.com",
                    "logo": "https://tamiuzz.com/logo.svg",
                    "description": "شركة تميّز للحلول الرقمية والتسويق الإلكتروني",
                    "foundingDate": "2018",
                    "address": [
                        {
                            "@type": "PostalAddress",
                            "addressLocality": "Riyadh",
                            "addressCountry": "SA"
                        },
                        {
                            "@type": "PostalAddress",
                            "addressLocality": "Dammam",
                            "addressCountry": "SA"
                        },
                        {
                            "@type": "PostalAddress",
                            "addressLocality": "Cairo",
                            "addressCountry": "EG"
                        }
                    ],
                    "sameAs": []
                }}
            />
            
            <Hero />
            {homeContent.counter && homeContent.logos.length != 0 &&
                < AboutSection counter={homeContent.counter} logos={homeContent.logos} services={homeContent.services} />
            }
            {
                homeContent.solutions.length !== 0
                &&
                <WhatWeAreDoing
                    solutions={homeContent.solutions}
                />
            }

            <HowWeWork counter={homeContent.counter} />

            {
                homeContent.projects &&
                homeContent.projects.length != 0 &&
                <Projects projects={homeContent.projects} />

            }
            {homeContent.rates.length != 0 &&
                <Testimonials rates={homeContent.rates} />}
            {
                homeContent.blogs.length != 0 &&
                <ArticlesInHome blogs={homeContent.blogs} />
            }
        </div>
    )
}


/**
 *  {
        "banners": [],
        "services": [
            {
                "title": "اختبار الإضافة بالعربية",
                "path": "demo-service"
            }
        ],
        "counter": {
            "clients": 400,
            "projects": 2500,
            "experts": 300
        },
        "logos": [],
        "projects": [],
        "rates": [],
        "solutions": [],
        "blogs": []
    }
 */