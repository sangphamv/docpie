/**
 * Google Analytics 4 - Conversion & Event Tracking
 * Tracks user interactions and conversions for analytics
 */

/**
 * Event types enum for type safety
 */
export enum EventType {
  // Article engagement
  VIEW_ARTICLE = "view_article",
  SCROLL_ARTICLE = "scroll_article",
  TIME_ON_PAGE = "time_on_page",

  // Newsletter & Email
  NEWSLETTER_SIGNUP = "newsletter_signup",
  NEWSLETTER_ERROR = "newsletter_error",

  // Social sharing
  SHARE_ARTICLE = "share_article",
  COPY_LINK = "copy_link",

  // Related posts & Navigation
  VIEW_RELATED_POST = "view_related_post",
  CLICK_RELATED_POST = "click_related_post",
  VIEW_TOC = "view_toc",
  CLICK_TOC = "click_toc",

  // Search & Discovery
  SEARCH = "search",
  FILTER_BY_CATEGORY = "filter_by_category",
  FILTER_BY_TAG = "filter_by_tag",

  // Engagement
  READ_COMMENT = "read_comment",
  POST_COMMENT = "post_comment",
  EXTERNAL_LINK_CLICK = "external_link_click",

  // Performance & Errors
  PAGE_ERROR = "page_error",
  API_ERROR = "api_error",
}

/**
 * Initialize Google Analytics
 * Call this in your head/script component
 */
export function initGoogleAnalytics(measurementId: string) {
  if (typeof window === "undefined") return;

  // Load Google Analytics script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(arguments);
  }
  (window as any).gtag = gtag;
  gtag("js", new Date());
  gtag("config", measurementId, {
    page_path: window.location.pathname,
    anonymize_ip: true,
  });
}

/**
 * Track event with optional parameters
 */
export function trackEvent(
  eventName: EventType | string,
  parameters?: Record<string, any>
) {
  if (typeof window === "undefined") return;

  const gtag = (window as any).gtag;
  if (!gtag) {
    console.warn("Google Analytics not initialized");
    return;
  }

  gtag("event", eventName, {
    ...parameters,
    timestamp: new Date().toISOString(),
  });

  // Log in development
  if (import.meta.env.MODE === "development") {
    console.log(`📊 GA Event: ${eventName}`, parameters);
  }
}

/**
 * Article engagement tracking
 */
export const articleTracking = {
  /**
   * Track article view
   */
  viewArticle: (articleId: string, title: string, category: string) => {
    trackEvent(EventType.VIEW_ARTICLE, {
      article_id: articleId,
      article_title: title,
      article_category: category,
      value: 1,
    });
  },

  /**
   * Track scroll depth on article
   */
  trackScrollDepth: (articleId: string, scrollPercent: number) => {
    trackEvent(EventType.SCROLL_ARTICLE, {
      article_id: articleId,
      scroll_percent: Math.round(scrollPercent),
      value: scrollPercent / 100,
    });
  },

  /**
   * Track time spent on article
   */
  trackTimeOnPage: (articleId: string, seconds: number) => {
    trackEvent(EventType.TIME_ON_PAGE, {
      article_id: articleId,
      time_seconds: Math.round(seconds),
      value: seconds,
    });
  },
};

/**
 * Newsletter & Email tracking
 */
export const newsletterTracking = {
  /**
   * Track newsletter signup
   */
  signup: (articleId?: string) => {
    trackEvent(EventType.NEWSLETTER_SIGNUP, {
      article_id: articleId || "homepage",
      value: 1,
    });
  },

  /**
   * Track newsletter signup error
   */
  signupError: (errorMessage: string) => {
    trackEvent(EventType.NEWSLETTER_ERROR, {
      error_message: errorMessage,
    });
  },
};

/**
 * Social sharing tracking
 */
export const shareTracking = {
  /**
   * Track social share
   */
  share: (platform: string, articleId: string, title: string) => {
    trackEvent(EventType.SHARE_ARTICLE, {
      platform,
      article_id: articleId,
      article_title: title,
      value: 1,
    });
  },

  /**
   * Track link copy
   */
  copyLink: (articleId: string) => {
    trackEvent(EventType.COPY_LINK, {
      article_id: articleId,
      value: 1,
    });
  },
};

/**
 * Related posts & Navigation tracking
 */
export const navigationTracking = {
  /**
   * Track related posts view
   */
  viewRelatedPosts: (articleId: string) => {
    trackEvent(EventType.VIEW_RELATED_POST, {
      article_id: articleId,
    });
  },

  /**
   * Track click on related post
   */
  clickRelatedPost: (
    sourceArticleId: string,
    relatedArticleId: string,
    title: string
  ) => {
    trackEvent(EventType.CLICK_RELATED_POST, {
      source_article_id: sourceArticleId,
      related_article_id: relatedArticleId,
      article_title: title,
      value: 1,
    });
  },

  /**
   * Track table of contents view
   */
  viewTOC: (articleId: string) => {
    trackEvent(EventType.VIEW_TOC, {
      article_id: articleId,
    });
  },

  /**
   * Track TOC link click
   */
  clickTOC: (articleId: string, headingText: string) => {
    trackEvent(EventType.CLICK_TOC, {
      article_id: articleId,
      heading_text: headingText,
      value: 1,
    });
  },
};

/**
 * Search & Discovery tracking
 */
export const searchTracking = {
  /**
   * Track search
   */
  search: (query: string, resultCount: number) => {
    trackEvent(EventType.SEARCH, {
      search_term: query,
      result_count: resultCount,
    });
  },

  /**
   * Track category filter
   */
  filterByCategory: (category: string) => {
    trackEvent(EventType.FILTER_BY_CATEGORY, {
      category,
      value: 1,
    });
  },

  /**
   * Track tag filter
   */
  filterByTag: (tag: string) => {
    trackEvent(EventType.FILTER_BY_TAG, {
      tag,
      value: 1,
    });
  },
};

/**
 * Engagement tracking
 */
export const engagementTracking = {
  /**
   * Track external link click
   */
  externalLink: (url: string, articleId?: string) => {
    trackEvent(EventType.EXTERNAL_LINK_CLICK, {
      external_url: url,
      article_id: articleId,
      value: 1,
    });
  },
};

/**
 * Error tracking
 */
export const errorTracking = {
  /**
   * Track page error
   */
  pageError: (errorMessage: string, errorCode?: string) => {
    trackEvent(EventType.PAGE_ERROR, {
      error_message: errorMessage,
      error_code: errorCode,
    });
  },

  /**
   * Track API error
   */
  apiError: (endpoint: string, statusCode: number, errorMessage?: string) => {
    trackEvent(EventType.API_ERROR, {
      endpoint,
      status_code: statusCode,
      error_message: errorMessage,
    });
  },
};

export default {
  initGoogleAnalytics,
  trackEvent,
  articleTracking,
  newsletterTracking,
  shareTracking,
  navigationTracking,
  searchTracking,
  engagementTracking,
  errorTracking,
};
