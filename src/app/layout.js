import { appWithTranslation } from "next-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./globals.css";
import Providers from "@/Component/Providers";

export const metadata = {
  title: "اسم موقعك",
  description: "وصف موقعك",
};

function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Providers>{children}</Providers>
        {/* Bootstrap JS يتم تحميله في useEffect */}
      </body>
    </html>
  );
}
export default appWithTranslation(RootLayout);
