import { SITE_CONFIG } from "../config/site";

/**
 * Returns Organization Schema (Schema.org/Organization)
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.legalName,
    alternateName: SITE_CONFIG.name,
    url: SITE_CONFIG.canonicalBase,
    logo: `${SITE_CONFIG.canonicalBase}/logo.png`,
    description: SITE_CONFIG.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.contact.address.streetAddress,
      addressLocality: SITE_CONFIG.contact.address.addressLocality,
      addressRegion: SITE_CONFIG.contact.address.addressRegion,
      postalCode: SITE_CONFIG.contact.address.postalCode,
      addressCountry: SITE_CONFIG.contact.address.addressCountry,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.contact.phone,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: [
      SITE_CONFIG.socials.twitter,
      SITE_CONFIG.socials.linkedin,
      SITE_CONFIG.socials.instagram,
      SITE_CONFIG.socials.github,
    ],
  };
}

/**
 * Returns SoftwareApplication Schema (Schema.org/SoftwareApplication)
 */
export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_CONFIG.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser, iOS, Android, POS Terminal",
    url: SITE_CONFIG.canonicalBase,
    description: SITE_CONFIG.description,
    offers: {
      "@type": "Offer",
      price: SITE_CONFIG.pricing.monthlyPriceINR.toString(),
      priceCurrency: SITE_CONFIG.pricing.currency,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE_CONFIG.legalName,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "148",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Table QR Code Ordering",
      "Real-Time Kitchen Display System (KDS)",
      "Instant 86'd Menu Sync",
      "Thermal Receipt Printing",
      "Zero Aggregator Commissions",
    ],
  };
}

/**
 * Returns LocalBusiness / Restaurant Schema template
 */
export function getLocalBusinessSchema(customRestaurant?: {
  name?: string;
  address?: string;
  city?: string;
  phone?: string;
  cuisine?: string;
  menuUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: customRestaurant?.name || "Taverna Gourmet Kitchen (NextDine Partner)",
    image: `${SITE_CONFIG.canonicalBase}/logo.png`,
    telephone: customRestaurant?.phone || SITE_CONFIG.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: customRestaurant?.address || "102 Marine Drive, Nariman Point",
      addressLocality: customRestaurant?.city || "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    servesCuisine: customRestaurant?.cuisine || "Indian, Italian, Gourmet Modern",
    hasMenu: customRestaurant?.menuUrl || `${SITE_CONFIG.canonicalBase}/menu/pizza-palace`,
    priceRange: "₹₹",
    acceptsReservations: "True",
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: customRestaurant?.menuUrl || `${SITE_CONFIG.canonicalBase}/menu/pizza-palace`,
        inLanguage: "en-US",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModePickUp",
    },
  };
}

/**
 * Returns FAQPage Schema for search engine rich results
 */
export function getFaqPageSchema(faqList: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
