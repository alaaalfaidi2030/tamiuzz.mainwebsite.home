import { Outlet } from "react-router-dom";
import { IsMobileContext } from "../../Context/isMobileContext";
import { isThemeModeContext } from "../../Context/isThemeModeContext.jsx";
import { useContext } from "react";
import ScrollToTop from "../Ui/ScrollToTop/ScrollToTop.jsx"

import Navbar from '../Navbar/Navbar'
import Footer from "../Footer/Footer.jsx";
import TextInput from "../Ui/TextInput/TextInput.jsx";

export default function RoutLayout() {
    const { isMobile } = useContext(IsMobileContext);
    const { isDarkMode, setIsDarkMode } = useContext(isThemeModeContext);


    return (
        <>
            <ScrollToTop />

            <Navbar />
            <Outlet />
            <Footer />

        </>
    );
}
