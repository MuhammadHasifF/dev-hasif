import { siteConfig } from "@/../site.config";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: siteConfig.fullName,
        alternateName: siteConfig.shortName,
        url: siteConfig.url,
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Singapore",
          addressCountry: "SG",
        },
        sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.orcid],
        jobTitle: "Research Engineer",
        worksFor: { "@type": "Organization", name: "Singapore Institute of Technology" },
      },
      {
        "@type": "WebSite",
        url: siteConfig.url,
        name: siteConfig.shortName,
        description: siteConfig.description,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.url}/work?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
