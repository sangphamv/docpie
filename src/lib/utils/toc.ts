// Utility functions for generating Table of Contents from headings

export interface TocItem {
  level: number;
  text: string;
  id: string;
}

export interface AstroHeading {
  depth: number;
  text: string;
  slug?: string;
}

/**
 * Extract headings from HTML content, DOM element, or Astro heading data and generate Table of Contents
 * @param content HTML string, DOM element, or array of Astro heading objects
 * @returns Array of TOC items with heading text and generated IDs
 */
export function generateTOC(
  content: string | Element | AstroHeading[] | null | undefined
): TocItem[] {
  // Handle null/undefined
  if (!content) return [];

  // Handle Astro heading data
  if (Array.isArray(content)) {
    const toc: TocItem[] = [];
    content.forEach((heading, index) => {
      if (!heading || typeof heading !== "object") return;
      
      const depth = (heading as any).depth || (heading as any).tag || 2;
      const text = (heading as any).text || (heading as any).content || "";
      const id = (heading as any).slug || `heading-${index}`;

      toc.push({
        level: depth,
        text,
        id,
      });
    });
    return toc;
  }

  // Handle HTML string or DOM element
  let htmlElement: Element | null = null;

  if (typeof content === "string") {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      htmlElement = doc.body;
    } catch {
      return [];
    }
  } else if (content instanceof Element) {
    htmlElement = content;
  }

  // If still no element, return empty
  if (!htmlElement || typeof htmlElement.querySelectorAll !== "function") {
    return [];
  }

  const headings = htmlElement.querySelectorAll(
    "h2, h3, h4, h5, h6"
  ) as NodeListOf<HTMLHeadingElement>;
  const toc: TocItem[] = [];

  headings.forEach((heading, index) => {
    // Generate ID if not present
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }

    const level = parseInt(heading.tagName[1]);
    const text = heading.textContent || "";

    toc.push({
      level,
      text,
      id: heading.id,
    });
  });

  return toc;
}

/**
 * Calculate nesting level for TOC items
 * @param toc Array of TOC items
 * @returns Array with nesting information
 */
export function calculateTOCNesting(toc: TocItem[]): (TocItem & { depth: number })[] {
  if (toc.length === 0) return [];

  const minLevel = Math.min(...toc.map((item) => item.level));

  return toc.map((item) => ({
    ...item,
    depth: item.level - minLevel,
  }));
}

/**
 * Filter TOC to only show specific levels
 * @param toc Array of TOC items
 * @param maxLevel Maximum heading level to include (e.g., 3 for H2-H4)
 * @returns Filtered TOC array
 */
export function filterTOCByLevel(toc: TocItem[], maxLevel: number = 3): TocItem[] {
  return toc.filter((item) => item.level <= maxLevel);
}

/**
 * Check if an article should have TOC (minimum heading count)
 * @param toc Array of TOC items
 * @param minHeadings Minimum number of headings to show TOC (default: 3)
 * @returns Boolean indicating if TOC should be displayed
 */
export function shouldShowTOC(toc: TocItem[], minHeadings: number = 3): boolean {
  return toc.length >= minHeadings;
}
