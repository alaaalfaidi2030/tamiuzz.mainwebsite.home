import React, { lazy, useContext } from 'react'
import { HomeContentContext } from '../../Context/homeContentContext'
import Spinner from '../../Component/Ui/Spinner/Spinner'
import { createLazyLoadingComp } from '../../Utilies/LazyLoadingHelper'
import Projects from '../../Component/Projects/Projects'


const Hero = createLazyLoadingComp(() => import('../../Component/Hero/Hero'))
const AboutSection = createLazyLoadingComp(() => import('../../Component/AboutSection/AboutSection'))
// const HowWeWork = createLazyLoadingComp(() => import('../../Component/HowWeWork/HowWeWork'))
const WhatWeAreDoing = createLazyLoadingComp(() => import('../../Component/WhatWeAreDoing/WhatWeAreDoing'))
const ArticlesInHome = createLazyLoadingComp(() => import('../../Component/ArticlesInHome/ArticlesInHome'))
const Testimonials = createLazyLoadingComp(() => import('../../Component/Testimonials/Testimonials'));
const HowWeWork = createLazyLoadingComp(() => import('../../Component/HowWeWork/HowWeWork'));

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