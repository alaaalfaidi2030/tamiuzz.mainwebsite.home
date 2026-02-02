/**
 * SEO Schema Utilities
 * Common JSON-LD structured data schemas for improved SEO
 */

const BASE_URL = "https://tamiuzz.com";

// Social media links - update with actual links
const SOCIAL_LINKS = {
  facebook: "https://facebook.com/tamiuzz",
  twitter: "https://twitter.com/tamiuzz",
  instagram: "https://instagram.com/tamiuzz",
  linkedin: "https://linkedin.com/company/tamiuzz",
  youtube: "https://youtube.com/@tamiuzz"
};

/**
 * Organization Schema - Use on homepage
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tamiuzz - تميّز",
  alternateName: "شركة تميّز للحلول الرقمية",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.svg`,
    width: 200,
    height: 60
  },
  description: "شركة تميّز للحلول الرقمية والتسويق الإلكتروني تقدم خدمات SEO وتصميم مواقع وحملات PPC وإدارة التواصل الاجتماعي في المملكة العربية السعودية والخليج",
  foundingDate: "2018",
  sameAs: Object.values(SOCIAL_LINKS),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+966-XXX-XXX-XXXX", // TODO: Replace with actual phone
    contactType: "Customer Service",
    areaServed: ["SA", "AE", "KW", "BH", "QA", "OM"],
    availableLanguage: ["Arabic", "English"]
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "SA",
    addressRegion: "الرياض", // TODO: Update with actual region
    addressLocality: "الرياض"
  }
};

/**
 * LocalBusiness Schema - Use on homepage and contact page
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE_URL}/#organization`,
  name: "Tamiuzz - تميّز",
  alternateName: "شركة تميّز للحلول الرقمية والتسويق الإلكتروني",
  image: `${BASE_URL}/og-image.png`,
  url: BASE_URL,
  telephone: "+966-XXX-XXX-XXXX", // TODO: Replace with actual phone
  email: "info@tamiuzz.com", // TODO: Replace with actual email
  priceRange: "$$",
  currenciesAccepted: "SAR",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  address: {
    "@type": "PostalAddress",
    streetAddress: "", // TODO: Add street address
    addressLocality: "الرياض",
    addressRegion: "الرياض",
    postalCode: "", // TODO: Add postal code
    addressCountry: "SA"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.7136, // TODO: Update with actual coordinates
    longitude: 46.6753
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Saudi Arabia"
    },
    {
      "@type": "Country",
      name: "United Arab Emirates"
    },
    {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 24.7136,
        longitude: 46.6753
      },
      geoRadius: "2000 km"
    }
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00"
    }
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Marketing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO - تحسين محركات البحث"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "تصميم وتطوير المواقع"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "إدارة وسائل التواصل الاجتماعي"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "حملات PPC الإعلانية"
        }
      }
    ]
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
 * @param {Object} serviceData - {name, description, url, image, category}
 */
export const createServiceSchema = (serviceData) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": serviceData.url,
  name: serviceData.name,
  description: serviceData.description?.replace(/<[^>]*>/g, "").slice(0, 300),
  provider: {
    "@type": "Organization",
    name: "Tamiuzz - تميّز",
    url: BASE_URL
  },
  areaServed: [
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Bahrain" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Oman" }
  ],
  serviceType: serviceData.category || "Digital Marketing",
  url: serviceData.url,
  image: serviceData.image,
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "SAR",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "SAR"
    }
  }
});

/**
 * Solution/Product Schema Generator
 * @param {Object} solutionData - {name, description, url, image, category}
 */
export const createSolutionSchema = (solutionData) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: solutionData.name,
  description: solutionData.description?.replace(/<[^>]*>/g, "").slice(0, 300),
  brand: {
    "@type": "Organization",
    name: "Tamiuzz - تميّز"
  },
  manufacturer: {
    "@type": "Organization",
    name: "Tamiuzz - تميّز",
    url: BASE_URL
  },
  url: solutionData.url,
  image: solutionData.image,
  category: solutionData.category || "Digital Solutions",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "SAR",
    seller: {
      "@type": "Organization",
      name: "Tamiuzz"
    }
  }
});

/**
 * Combined Graph Schema for Homepage
 * Creates a @graph with multiple schemas
 */
export const createHomepageSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    { ...organizationSchema, "@context": undefined },
    { ...localBusinessSchema, "@context": undefined },
    { ...websiteSchema, "@context": undefined }
  ]
});
