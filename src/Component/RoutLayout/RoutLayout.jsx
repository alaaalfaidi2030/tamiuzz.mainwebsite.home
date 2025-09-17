import { Outlet } from "react-router-dom";
import { IsMobileContext } from "../../Context/isMobileContext";
import { isThemeModeContext } from "../../Context/isThemeModeContext.jsx";
import { useContext, Suspense, lazy } from "react";
import ScrollToTop from "../Ui/ScrollToTop/ScrollToTop.jsx"
import Spinner from "../Ui/Spinner/Spinner.jsx" // Your existing spinner component

// Lazy load heavy components that aren't immediately visible
const Footer = createLazyLoadingComp(() => import("../Footer/Footer.jsx"));
const MobileNav = createLazyLoadingComp(() => import("../MobileNav/MobileNav.jsx"));

// Keep critical above-the-fold components as regular imports for faster initial render
import Navbar from '../Navbar/Navbar'
import DarkModeToggle from "../Ui/DarkModeToggle/DarkModeToggle.jsx"
import { createLazyLoadingComp } from "../../Utilies/LazyLoadingHelper.jsx";



export default function RoutLayout() {
    const { isMobile } = useContext(IsMobileContext);
    const { isDarkMode, setIsDarkMode } = useContext(isThemeModeContext);

    return (
        <>
            <ScrollToTop />

            {!isMobile && <Navbar />}
            <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

            {/* Main content area */}
            <Outlet />

            {isMobile && (
                <Suspense fallback={<Spinner sectionFlag />}>
                    <MobileNav />
                </Suspense>
            )}

            <Suspense fallback={<Spinner sectionFlag />}>
                <Footer />
            </Suspense>
        </>
    );
}