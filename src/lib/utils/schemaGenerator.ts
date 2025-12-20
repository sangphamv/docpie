/**
 * Utility functions for generating Schema.org structured data
 */

import type { SITE as SiteType } from "../config";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate BreadcrumbList schema
 * @param items - Array of breadcrumb items with name and url
 * @returns Schema.org BreadcrumbList JSON-LD
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate WebSite schema with search action
 * @param site - Site configuration
 * @returns Schema.org WebSite JSON-LD with search capability
 */
export function generateWebSiteSchema(site: typeof SiteType) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.title,
    url: site.url,
    description: site.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate Organization schema
 * @param site - Site configuration
 * @param logoUrl - URL to the organization logo (optional)
 * @returns Schema.org Organization JSON-LD
 */
export function generateOrganizationSchema(site: typeof SiteType, logoUrl?: string) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.title,
    url: site.url,
    description: site.description,
  };

  if (logoUrl) {
    schema.logo = logoUrl;
  }

  // Add social profiles
  schema.sameAs = [site.github];

  return schema;
}

/**
 * Generate Person schema for author
 * @param author - Author data
 * @param siteUrl - Base site URL
 * @returns Schema.org Person JSON-LD
 */
export function generatePersonSchema(
  author: {
    id: string;
    data: {
      name: string;
      job: string;
      bio: string;
      avatar?: {
        src: string;
      };
      social?: Array<{
        name: string;
        url: string;
      }>;
    };
  },
  siteUrl: string
) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.data.name,
    jobTitle: author.data.job,
    description: author.data.bio,
    url: `${siteUrl}/authors/${author.id}`,
  };

  if (author.data.avatar?.src) {
    schema.image = new URL(author.data.avatar.src, siteUrl).toString();
  }

  if (author.data.social && author.data.social.length > 0) {
    schema.sameAs = author.data.social.map((s) => s.url);
  }

  return schema;
}

/**
 * Generate Article schema (enhanced NewsArticle)
 * @param articleData - Article data
 * @returns Schema.org Article JSON-LD
 */
export function generateArticleSchema(articleData: {
  headline: string;
  description: string;
  image?: string[];
  author: Array<{
    "@type": string;
    name: string;
    url: string;
  }>;
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
  publisher: {
    "@type": string;
    name: string;
    url: string;
  };
  keywords?: string[];
  articleSection?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    ...articleData,
  };
}
