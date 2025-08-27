"use client";

import { useEffect } from "react";
import IsMobileProvider from "@/Context/isMobileContext";
import HomeContentProvider from "@/Context/homeContentContext";
import AuthProvider from "@/Context/authContext";
import IsThemeModeProvider from "@/Context/isThemeModeContext";

export default function Providers({ children }) {
  useEffect(() => {
    // تحميل Bootstrap JS في Client Side
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    // this code is for the language direction
    const i18nextLng = localStorage.getItem("i18nextLng") || "ar";

    if (i18nextLng === "ar") {
      document.body.dir = "rtl";
      document.documentElement.setAttribute("lang", "ar");
    } else {
      document.body.dir = "ltr";
      document.documentElement.setAttribute("lang", "en");
    }
  }, []);

  return (
    <IsThemeModeProvider>
      <AuthProvider>
        <IsMobileProvider>
          <HomeContentProvider>{children}</HomeContentProvider>
        </IsMobileProvider>
      </AuthProvider>
    </IsThemeModeProvider>
  );
}
