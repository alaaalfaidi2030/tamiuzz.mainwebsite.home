import { useEffect, useState } from 'react'
import IsMobileProvider from './Context/isMobileContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeContentProvider from './Context/homeContentContext'
import AuthProvider from './Context/authContext'
import IsThemeModeProvider from './Context/isThemeModeContext'
import RoutLayout from './Component/RoutLayout/RoutLayout'
import i18n from './i18n'
import Home from './Routes/Home/Home'
import FAQ from './Routes/FAQ/FAQ'
import Articles from './Routes/Articles/Articles'
import Policy from "./Routes/Policy/Policy"
import Support from './Routes/Support/Support'
import Solutions from './Routes/Solutions/Solutions'
import Services from './Routes/Services/Services'
import AboutUs from './Routes/AboutUs/AboutUs'
import SolutionDetails from './Routes/SolutionDetails/SolutionDetails'
import ArticleDetails from './Routes/ArticleDetails/ArticleDetails'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RoutLayout />,
      children: [{
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "faq",
        element: <FAQ />
      },
      {
        path: "articles",
        element: <Articles />
      }, {
        path: "articles/:id",
        element: <ArticleDetails />

      }
        , {
        path: "policy",
        element: <Policy />
      }, {
        path: "support",
        element: <Support />
      }, {
        path: "solutions",
        element: <Solutions />
      }, {
        path: "solutions/:id",
        element: <SolutionDetails />
      }, {
        path: "services",
        element: <Services />
      },
      {
        path: "about-us",
        element: <AboutUs />
      }

      ]
    }
  ])

  useEffect(() => {
    // this code is for the language direction
    const i18nextLng = localStorage.getItem("i18nextLng") || "ar";
    i18n.changeLanguage(i18nextLng);
    if (i18nextLng === "ar") {
      document.body.dir = "rtl";
      document.documentElement.lang = "ar";
      // document.title = "منصة حصون التعليمية";
    } else {
      document.body.dir = "ltr";
      document.documentElement.lang = "en";
      // document.title = "Hoson Platform";
    }
  }, []);
  return (

    <IsThemeModeProvider>
      <AuthProvider>
        <IsMobileProvider>
          <HomeContentProvider>
            <RouterProvider router={router} />
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
 *  -- 1) Navbar 
 *  -- 2) Footer 
 *  -- 3) ScrollToTop
 *  -- 4) RoutLayout
 *  -- 5) NavbarTop
 * 
 *
 * 
 */