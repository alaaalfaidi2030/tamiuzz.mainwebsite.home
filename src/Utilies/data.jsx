import i18n from "../i18n";

export const baseURL = "https://api-landing.tamiuzz.com";

export const getHeaders = (token) => {

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
    "Accept-Language": i18n.language.toUpperCase(),
  };
};
export const phoneAndEmail = [
  {
    icon: "fa-solid fa-envelope",
    text: "info@tamiuzz.com",
    link: "mailto:info@tamiuzz.com",
    title: "form.email"
  },
  {
    icon: "fa-solid fa-phone",
    text: "966 544 277 172",
    link: "https://wa.me/966544277172",
    title: "contact_us"
  },
]
export const socialMedia = [
  {
    link: "https://www.facebook.com",
    icon: "fa-brands fa-facebook-f",
    className: "facebook",
  },
  {
    link: "https://www.instagram.com",
    icon: "fa-brands fa-instagram",
    className: "instagram",
  },
  {
    link: "https://www.x.com",
    icon: "fa-brands fa-x-twitter",
    className: "twitter",
  },
  {
    link: "https://www.youtube.com",
    icon: "fa-brands fa-youtube",
    className: "youtube",
  },
]




// pseduo data
export const services = [
  {
    "path": "web-development",
    "title": "تطوير المواقع",
    "iconUrl": "/icons/web.png",
    "imageUrl": "/images/web-dev.jpg",
    "description": "حلول متكاملة لتطوير الواجهة الأمامية والخلفية للمواقع الإلكترونية."
  },
  {
    "path": "mobile-app-development",
    "title": "تطوير تطبيقات الجوال",
    "iconUrl": "/icons/mobile.png",
    "imageUrl": "/images/mobile-app.jpg",
    "description": "إنشاء تطبيقات جوال عالية الجودة لأنظمة أندرويد وiOS."
  },
  {
    "path": "seo-optimization",
    "title": "تحسين محركات البحث (SEO)",
    "iconUrl": "/icons/seo.png",
    "imageUrl": "/images/seo.jpg",
    "description": "رفع ترتيب موقعك في نتائج محركات البحث."
  },
  {
    "path": "ui-ux-design",
    "title": "تصميم UI/UX",
    "iconUrl": "/icons/design.png",
    "imageUrl": "/images/ui-ux.jpg",
    "description": "تصميم واجهات مذهلة وسهلة الاستخدام."
  },
  {
    "path": "cloud-hosting",
    "title": "الاستضافة السحابية",
    "iconUrl": "/icons/cloud.png",
    "imageUrl": "/images/cloud.jpg",
    "description": "خدمات استضافة سحابية موثوقة وقابلة للتوسيع."
  },
  {
    "path": "ecommerce-solutions",
    "title": "حلول التجارة الإلكترونية",
    "iconUrl": "/icons/ecommerce.png",
    "imageUrl": "/images/ecommerce.jpg",
    "description": "أطلق متجرك الإلكتروني وحقق النمو باستخدام خدماتنا."
  },
  {
    "path": "digital-marketing",
    "title": "التسويق الرقمي",
    "iconUrl": "/icons/marketing.png",
    "imageUrl": "/images/marketing.jpg",
    "description": "زيادة انتشارك الرقمي من خلال استراتيجيات تسويقية فعالة."
  },
  {
    "path": "content-writing",
    "title": "كتابة المحتوى",
    "iconUrl": "/icons/content.png",
    "imageUrl": "/images/content.jpg",
    "description": "خدمات كتابة احترافية للمدونات والمواقع والإعلانات."
  },
  {
    "path": "it-consulting",
    "title": "الاستشارات التقنية",
    "iconUrl": "/icons/consulting.png",
    "imageUrl": "/images/consulting.jpg",
    "description": "توجيه خبراء لتطوير البنية التحتية والاستراتيجية التقنية لديك."
  },
  {
    "path": "cybersecurity",
    "title": "الأمن السيبراني",
    "iconUrl": "/icons/security.png",
    "imageUrl": "/images/security.jpg",
    "description": "احمِ بياناتك وأنظمتك بحلول أمان متقدمة."
  },
  {
    "path": "web-development",
    "title": "تطوير المواقع",
    "iconUrl": "/icons/web.png",
    "imageUrl": "/images/web-dev.jpg",
    "description": "حلول متكاملة لتطوير الواجهة الأمامية والخلفية للمواقع الإلكترونية."
  }] 