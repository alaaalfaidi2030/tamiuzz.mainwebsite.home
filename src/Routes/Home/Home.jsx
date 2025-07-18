import React from 'react'
import Hero from '../../Component/Hero/Hero'
import AboutSection from '../../Component/AboutSection/AboutSection'
import HowWeWork from '../../Component/HowWeWork/HowWeWork'
import WhatWeAreDoing from '../../Component/WhatWeAreDoing/WhatWeAreDoing'
import ArticlesInHome from '../../Component/ArticlesInHome/ArticlesInHome'
import Testimonials from '../../Component/Testimonials/Testimonials'

export default function Home() {
    return (
        <>
            <Hero />
            <AboutSection />
            <WhatWeAreDoing />
            {/* <HowWeWork /> */}
            <Testimonials />
            <ArticlesInHome />
        </>
    )
}

