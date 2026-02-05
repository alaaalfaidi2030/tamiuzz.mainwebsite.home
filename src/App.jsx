import IsMobileProvider from './Context/isMobileContext'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import HomeContentProvider from './Context/homeContentContext'
import AuthProvider from './Context/authContext'
import IsThemeModeProvider from './Context/isThemeModeContext'
import SolutionsProvider from './Context/solutionsContext'
import RoutLayout from './Component/RoutLayout/RoutLayout'
import Error404 from './Routes/Error404/Error404'
import { createLazyLoadingComp, preloadRoute } from './Utilies/LazyLoadingHelper.jsx'
import { useEffect } from 'react'

// Lazy load all route components
const Home = createLazyLoadingComp(() => import('./Routes/Home/Home'))
const FAQ = createLazyLoadingComp(() => import('./Routes/FAQ/FAQ'))
const Articles = createLazyLoadingComp(() => import('./Routes/Articles/Articles'))
const Policy = createLazyLoadingComp(() => import('./Routes/Policy/Policy'))
const Support = createLazyLoadingComp(() => import('./Routes/Support/Support'))
const Solutions = createLazyLoadingComp(() => import('./Routes/Solutions/Solutions'))
const Services = createLazyLoadingComp(() => import('./Routes/Services/Services'))
const AboutUs = createLazyLoadingComp(() => import('./Routes/AboutUs/AboutUs'))
const SolutionDetails = createLazyLoadingComp(() => import('./Routes/SolutionDetails/SolutionDetails'))
const ArticleDetails = createLazyLoadingComp(() => import('./Routes/ArticleDetails/ArticleDetails'))
const ServiceDetails = createLazyLoadingComp(() => import('./Routes/ServiceDetails/ServiceDetails'))



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RoutLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Navigate to="/" replace /> },
        { path: "faq", element: <FAQ /> },
        { path: "articles", element: <Articles /> },
        { path: "articles/:id", element: <ArticleDetails /> },
        { path: "policy", element: <Policy /> },
        { path: "support", element: <Support /> },
        { path: "solutions", element: <Solutions /> },
        { path: "solutions/:id", element: <SolutionDetails /> },
        { path: "services", element: <Services /> },
        { path: "services/:id", element: <ServiceDetails /> },
        { path: "about-us", element: <AboutUs /> }
      ],
      errorElement: (
        <Error404 />
      )
    }
  ])

  useEffect(() => {
    const i18nextLng = localStorage.getItem("i18nextLng") || "ar";
    if (i18nextLng === "ar") {
      document.body.dir = "rtl";
      document.documentElement.setAttribute("lang", "ar");

    } else {
      document.body.dir = "ltr";
      document.documentElement.setAttribute("lang", "en");

    }


    // Preload critical routes after initial load
    setTimeout(() => {
      preloadRoute(() => import('./Routes/Home/Home'))
      preloadRoute(() => import('./Routes/Articles/Articles'))
    }, 2000)
  }, []);

  return (
    <IsThemeModeProvider>
      <AuthProvider>
        <IsMobileProvider>
          <HomeContentProvider>
            <SolutionsProvider>
              <RouterProvider router={router} />
            </SolutionsProvider>
          </HomeContentProvider>
        </IsMobileProvider>
      </AuthProvider>
    </IsThemeModeProvider>
  )
}

export default App
/**
 * 
 * project tasks 
 * *************** Contexts ****************
 * 
 * *************** Pages ****************
 *  -- 1) HomePage
 *            - Hero Section
 *            - what distinguishes us Section
 *            - What we do Section
 *            - How we work Section
 *            - Our latest success
 *            - Testimonials Section
 *            - our Articles
 * 
 * 
 * *************** Components ****************
 * 
 *  -- 1)  Navbar 
 *  -- 2)  TestimonialCard 
 *  -- 3)  Testimonials
 *  -- 4)  RoutLayout
 *  -- 5)  AboutSection
 *  -- 6)  ArticleCard 
 *  -- 7)  ArticlesInHome
 *  -- 8)  ContactForm 
 *  -- 9)  ContactSection
 *  -- 10) Footer
 *  -- 11) Hero
 *  -- 12) HowWeWork
 *  -- 13) MobileNav
 *  -- 14) ServiceCard
 *  -- 15) SolutionCard
 *  -- 16) WhatAreWeDoing
 * 
 * 
 * UI components <-- Very small components that can be used un many places -->
 *  -- 1)  DarkModeToggle
 *  -- 2)  Heading 
 *  -- 3)  H2
 *  -- 4)  NoDataFounded
 *  -- 5)  ErrorComp
 *  -- 6)  NavbarTop
 *  -- 7)  H3
 *  -- 8)  HomeLoading 
 *  -- 9)  ScrollToTop
 *  -- 10) Spinner 
 *  -- 11) Textarea 
 *  -- 12) TextInput
 */