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
    text: "+1966 544 277 172",
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
