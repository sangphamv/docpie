/**
 * Accessibility Utilities for Docpie
 * Validators for alt text, heading structure, and ARIA labels
 */

/**
 * Alt Text Validation
 */
export interface AltTextValidation {
  isValid: boolean;
  isEmpty: boolean;
  isTooShort: boolean;
  isTooLong: boolean;
  message: string;
}

export function validateAltText(altText: string): AltTextValidation {
  const trimmed = altText.trim();
  const length = trimmed.length;

  // Alt text should be between 5-125 characters
  const MIN_LENGTH = 5;
  const MAX_LENGTH = 125;

  if (!trimmed) {
    return {
      isValid: false,
      isEmpty: true,
      isTooShort: false,
      isTooLong: false,
      message: "Alt text is empty. Provide a descriptive alternative text.",
    };
  }

  if (length < MIN_LENGTH) {
    return {
      isValid: false,
      isEmpty: false,
      isTooShort: true,
      isTooLong: false,
      message: `Alt text is too short (${length} characters). Use at least ${MIN_LENGTH} characters.`,
    };
  }

  if (length > MAX_LENGTH) {
    return {
      isValid: false,
      isEmpty: false,
      isTooShort: false,
      isTooLong: true,
      message: `Alt text is too long (${length} characters). Keep it under ${MAX_LENGTH} characters.`,
    };
  }

  // Check for common bad patterns
  const badPatterns = [
    /^image$/i,
    /^photo$/i,
    /^picture$/i,
    /^img\d+$/i,
    /^[a-zA-Z0-9]+\.(jpg|png|gif|webp)$/i,
  ];

  if (badPatterns.some((pattern) => pattern.test(trimmed))) {
    return {
      isValid: false,
      isEmpty: false,
      isTooShort: false,
      isTooLong: false,
      message:
        "Alt text appears to be a filename. Use a descriptive text instead.",
    };
  }

  return {
    isValid: true,
    isEmpty: false,
    isTooShort: false,
    isTooLong: false,
    message: "Alt text is valid.",
  };
}

/**
 * Heading Structure Validation
 */
export interface HeadingStructure {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  children: HeadingStructure[];
}

export function validateHeadingStructure(
  headings: HeadingStructure[]
): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  if (headings.length === 0) {
    issues.push("No headings found on page.");
    return { isValid: false, issues };
  }

  // Check if first heading is H1
  if (headings[0]?.level !== 1) {
    issues.push(
      `First heading should be H1, found H${headings[0]?.level || "?"}. Every page should start with H1.`
    );
  }

  // Check for multiple H1s
  const h1Count = headings.filter((h) => h.level === 1).length;
  if (h1Count > 1) {
    issues.push(
      `Found ${h1Count} H1 headings. Use only one H1 per page for better SEO.`
    );
  }

  // Check for skipped heading levels
  let previousLevel = 0;
  for (const heading of headings) {
    if (heading.level - previousLevel > 1) {
      issues.push(
        `Heading level skipped: H${previousLevel} → H${heading.level}. Use sequential heading levels.`
      );
    }
    previousLevel = heading.level;
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * ARIA Attribute Validation
 */
export interface AriaValidation {
  isValid: boolean;
  missingLabels: string[];
  warnings: string[];
}

export function validateAriaLabels(
  element: "button" | "link" | "input" | "icon" | "menu",
  hasAriaLabel: boolean,
  hasVisibleText: boolean,
  hasTitle: boolean
): AriaValidation {
  const issues: string[] = [];
  const warnings: string[] = [];

  switch (element) {
    case "button":
      if (!hasAriaLabel && !hasVisibleText) {
        issues.push(
          "Button must have either aria-label or visible text content."
        );
      }
      break;

    case "link":
      if (!hasAriaLabel && !hasVisibleText) {
        issues.push(
          "Link must have either aria-label or visible text content."
        );
      }
      break;

    case "input":
      if (!hasAriaLabel) {
        issues.push('Input must have aria-label or associated <label>.');
      }
      break;

    case "icon":
      if (!hasAriaLabel && !hasTitle) {
        warnings.push(
          "Icon button should have aria-label for screen readers."
        );
      }
      break;

    case "menu":
      if (!hasAriaLabel) {
        issues.push('Menu must have aria-label describing its purpose.');
      }
      break;
  }

  return {
    isValid: issues.length === 0,
    missingLabels: issues,
    warnings,
  };
}

/**
 * Image alt text guidelines
 */
export const altTextGuidelines = {
  minLength: 5,
  maxLength: 125,
  tips: [
    "Describe what you see in the image",
    "Include context when relevant",
    "Avoid starting with 'image of' or 'picture of'",
    "Keep it concise but descriptive",
    "For decorative images, use empty alt text: alt=''",
    "Use specific names instead of 'person' or 'people'",
  ],
};

/**
 * Heading structure guidelines
 */
export const headingGuidelines = {
  rules: [
    "Use only one H1 per page",
    "Start with H1, not H2 or H3",
    "Don't skip heading levels (H1 → H3 is bad)",
    "Use headings to structure content, not for styling",
    "Keep heading text concise and descriptive",
    "Use semantic HTML, not divs with CSS",
  ],
};

/**
 * ARIA guidelines
 */
export const ariaGuidelines = {
  interactive: [
    "Buttons: aria-label if no visible text",
    "Links: aria-label if no visible text or title",
    "Forms: aria-label or <label> for inputs",
    "Icons: aria-label describing action",
    "Dropdowns: aria-expanded, aria-haspopup",
    "Modals: role='dialog', aria-labelledby",
  ],
  structure: [
    "Navigation: <nav aria-label='...'>",
    "Main content: <main>",
    "Sidebars: <aside aria-label='...'>",
    "Search: <search>",
    "Breadcrumbs: <nav aria-label='Breadcrumb'>",
  ],
  live: [
    "Status: aria-live='polite'",
    "Alerts: aria-live='assertive'",
    "Notifications: role='status'",
    "Progress: aria-valuenow, aria-valuemin, aria-valuemax",
  ],
};
