/**
 * SEO Pagination Links
 * Generates rel="prev/next" links for pagination
 */

export interface PaginationLinks {
  prev?: string;
  next?: string;
}

/**
 * Generate pagination link headers for SEO
 * @param prevUrl - URL to previous page
 * @param nextUrl - URL to next page
 * @returns Array of link objects for head
 */
export function generatePaginationLinks(
  prevUrl?: string,
  nextUrl?: string
): PaginationLinks {
  return {
    ...(prevUrl ? { prev: prevUrl } : {}),
    ...(nextUrl ? { next: nextUrl } : {}),
  };
}

/**
 * Generate article tag keywords for meta
 */
export function generateArticleKeywords(tags: string[]): string {
  return tags.join(", ");
}
