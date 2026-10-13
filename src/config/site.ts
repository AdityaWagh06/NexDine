/**
 * NextDine Site & Custom Domain Configuration
 * Single source of truth for custom domain, SEO defaults, canonical URLs, and brand metadata.
 */

export const SITE_CONFIG = {
  domain: "nextdine.in",
  canonicalBase: "https://nextdine.in",
  name: "NextDine",
  legalName: "NextDine Technologies Pvt. Ltd.",
  shortName: "NextDine OS",
  tagline: "The Complete Digital Dining OS Built For Modern Outlets",
  description:
    "NextDine is the premier restaurant dining OS featuring instant table QR code ordering, live 0.2s Kitchen Display System (KDS), gourmet visual menus, and zero commission at just ₹999/month.",
  keywords: [
    "NextDine",
    "restaurant POS",
    "QR table ordering",
    "digital dining OS",
    "kitchen display system",
    "KDS",
    "contactless dining India",
    "restaurant menu QR",
    "visual food menu",
    "restaurant billing software",
    "zero commission ordering",
  ],
  author: "NextDine Technologies",
  themeColor: "#7650E8",
  backgroundColor: "#FFFFFF",
  contact: {
    email: "support@nextdine.in",
    salesEmail: "sales@nextdine.in",
    phone: "+91 98765 43210",
    address: {
      streetAddress: "Level 4, Bandra Kurla Complex",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400051",
      addressCountry: "IN",
    },
  },
  socials: {
    twitter: "https://twitter.com/nextdine_os",
    linkedin: "https://linkedin.com/company/nextdine",
    instagram: "https://instagram.com/nextdine.in",
    github: "https://github.com/AdityaWagh06/NexDine",
  },
  ogImage: "https://nextdine.in/og-image.png",
  pricing: {
    planName: "Everything Included",
    monthlyPriceINR: 999,
    onboardingFeeINR: 2999,
    currency: "INR",
    currencySymbol: "₹",
  },
} as const;

/**
 * Returns a fully-qualified canonical URL for any route slug.
 */
export function getCanonicalUrl(path = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath === "/") {
    return SITE_CONFIG.canonicalBase;
  }
  return `${SITE_CONFIG.canonicalBase}${cleanPath.replace(/\/+$/, "")}`;
}
