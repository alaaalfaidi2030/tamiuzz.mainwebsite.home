/**
 * SEO Schema Utilities
 * Common JSON-LD structured data schemas for improved SEO
 */

const BASE_URL = "https://tamiuzz.com";

/**
 * Organization Schema - Use on homepage
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tamiuzz - تميّز",
  alternateName: "شركة تميّز للحلول الرقمية",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  description: "شركة تميّز للحلول الرقمية والتسويق الإلكتروني تقدم خدمات SEO وتصميم مواقع وحملات PPC وإدارة التواصل الاجتماعي",
  foundingDate: "2018",
  sameAs: [
    // Add social media links here
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    availableLanguage: ["Arabic", "English"]
  }
};

/**
 * LocalBusiness Schema - Use on homepage and contact page
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#organization`,
  name: "Tamiuzz - تميّز",
  image: `${BASE_URL}/og-image.png`,
  url: BASE_URL,
  telephone: "+20-XXX-XXX-XXXX", // Replace with actual phone
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "EG",
    addressRegion: "Cairo" // Update with actual region
  },
  geo: {
    "@type": "GeoCoordinates",
    // Add actual coordinates if available
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    opens: "09:00",
    closes: "18:00"
  }
};

/**
 * BreadcrumbList Schema Generator
 * @param {Array} breadcrumbs - Array of {name, url} objects
 */
export const createBreadcrumbSchema = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: crumb.url
  }))
});

/**
 * FAQPage Schema Generator
 * @param {Array} faqs - Array of {question, answer} objects
 */
export const createFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
});

/**
 * Article Schema Generator
 * @param {Object} articleData - {title, description, image, datePublished, dateModified, author}
 */
export const createArticleSchema = (articleData) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: articleData.title,
  description: articleData.description,
  image: {
    "@type": "ImageObject",
    url: articleData.image,
    width: 1200,
    height: 800
  },
  datePublished: articleData.datePublished,
  dateModified: articleData.dateModified || articleData.datePublished,
  author: {
    "@type": "Person",
    name: articleData.author || "Tamiuzz Team"
  },
  publisher: {
    "@type": "Organization",
    name: "Tamiuzz",
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.svg`
    }
  }
});

/**
 * WebSite Schema - Use on homepage
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Tamiuzz - تميّز",
  alternateName: "شركة تميّز للحلول الرقمية",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

/**
 * Service Schema Generator
 * @param {Object} serviceData - {name, description, url, image}
 */
export const createServiceSchema = (serviceData) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: serviceData.name,
  description: serviceData.description,
  provider: {
    "@type": "Organization",
    name: "Tamiuzz"
  },
  areaServed: {
    "@type": "Country",
    name: ["Egypt", "Saudi Arabia", "UAE", "Gulf Region"]
  },
  serviceType: "Digital Marketing",
  url: serviceData.url,
  image: serviceData.image
});
