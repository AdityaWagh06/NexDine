import React, { useEffect } from "react";
import { SITE_CONFIG, getCanonicalUrl } from "../../config/site";

export interface SEOProps {
  /** Page-specific title. If omitted, uses default site tagline */
  title?: string;
  /** Page-specific meta description */
  description?: string;
  /** Relative path or full URL for canonical link (e.g. "/features", "/pricing") */
  canonicalPath?: string;
  /** OpenGraph type (website, article, product) */
  ogType?: "website" | "article" | "product";
  /** Custom social preview image URL */
  ogImage?: string;
  /** Prevents search engines from indexing the page (e.g. 404, admin) */
  noindex?: boolean;
  /** Optional JSON-LD structured data object or array */
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = SITE_CONFIG.description,
  canonicalPath = "/",
  ogType = "website",
  ogImage = SITE_CONFIG.ogImage,
  noindex = false,
  schema,
}) => {
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;

  const canonicalUrl = getCanonicalUrl(canonicalPath);

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Primary Meta Tags
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    setMeta("name", "theme-color", SITE_CONFIG.themeColor);

    // 3. Canonical Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 4. OpenGraph Tags
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:site_name", SITE_CONFIG.name);

    // 5. Twitter Card Tags
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // 6. Optional Structured Data (JSON-LD)
    let schemaScript = document.getElementById("page-structured-data") as HTMLScriptElement | null;
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.id = "page-structured-data";
        schemaScript.type = "application/ld+json";
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [fullTitle, description, canonicalUrl, ogType, ogImage, noindex, schema]);

  return null;
};

export default SEO;
