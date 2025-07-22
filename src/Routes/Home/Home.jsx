import React, { useContext } from 'react'
import Hero from '../../Component/Hero/Hero'
import AboutSection from '../../Component/AboutSection/AboutSection'
import HowWeWork from '../../Component/HowWeWork/HowWeWork'
import WhatWeAreDoing from '../../Component/WhatWeAreDoing/WhatWeAreDoing'
import ArticlesInHome from '../../Component/ArticlesInHome/ArticlesInHome'
import Testimonials from '../../Component/Testimonials/Testimonials'
import { HomeContentContext } from '../../Context/homeContentContext'
import Spinner from '../../Component/Ui/Spinner/Spinner'

export default function Home() {
    const { homeContent, isLoading, } = useContext(HomeContentContext)

    if (isLoading)
        return <Spinner sectionFlag />
    else return (
        <>
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
            {/* <HowWeWork /> */}
            {homeContent.rates.length != 0 &&
                <Testimonials rates={homeContent.rates} />}
            {
                homeContent.blogs.length != 0 &&
                <ArticlesInHome blogs={homeContent.blogs} />
            }
        </>
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