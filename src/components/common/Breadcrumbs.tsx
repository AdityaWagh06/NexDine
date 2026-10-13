import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { SITE_CONFIG, getCanonicalUrl } from "../../config/site";

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = "" }) => {
  // Inject or update Schema.org BreadcrumbList structured data
  useEffect(() => {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_CONFIG.canonicalBase,
        },
        ...items.map((item, idx) => ({
          "@type": "ListItem",
          position: idx + 2,
          name: item.label,
          ...(item.path ? { item: getCanonicalUrl(item.path) } : {}),
        })),
      ],
    };

    let script = document.getElementById("breadcrumb-structured-data") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "breadcrumb-structured-data";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(breadcrumbSchema);

    return () => {
      const el = document.getElementById("breadcrumb-structured-data");
      if (el) el.remove();
    };
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs font-medium text-[#737373] ${className}`}>
      <ol className="flex items-center space-x-1.5 flex-wrap">
        <li>
          <Link
            to="/"
            className="hover:text-[#7650E8] transition-colors flex items-center space-x-1 text-[#737373]"
            title="NextDine Home"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li aria-hidden="true" className="text-[#BBBBBB]">
                <ChevronRight className="w-3 h-3" />
              </li>
              <li>
                {isLast || !item.path ? (
                  <span aria-current="page" className="text-[#111111] font-bold">
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.path} className="hover:text-[#7650E8] transition-colors">
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
