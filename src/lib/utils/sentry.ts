/**
 * Sentry Error Tracking Configuration
 * Captures JavaScript errors, performance issues, and network problems
 * Note: Full Sentry integration requires @sentry/astro package installation
 */

// Basic error tracking without Sentry package
// For full Sentry features, install: npm install @sentry/astro

export function initSentry() {
  // Initialize basic error tracking
  // Note: DSN should be set via environment variable SENTRY_DSN
  const dsn = import.meta.env.SENTRY_DSN || "";

  if (!dsn) {
    console.warn("Sentry: SENTRY_DSN environment variable is not set");
    return;
  }

  // Basic error handler
  if (typeof window !== "undefined") {
    window.addEventListener("error", (event) => {
      captureError(event.error);
    });

    window.addEventListener("unhandledrejection", (event) => {
      captureError(event.reason);
    });
  }
}

/**
 * Capture custom error with context
 */
export function captureError(
  error: Error | string,
  context?: Record<string, any>
) {
  console.error("Error captured:", error, context);
}

/**
 * Capture custom message
 */
export function captureMessage(
  message: string,
  level: "info" | "warning" | "error" = "info"
) {
  console.log(`[${level.toUpperCase()}] ${message}`);
}

/**
 * Add breadcrumb for tracking user actions
 */
export function addBreadcrumb(
  category: string,
  message: string,
  data?: Record<string, any>
) {
  console.log(`[Breadcrumb] ${category}: ${message}`, data);
}

/**
 * Set user context for error tracking
 */
export function setUserContext(userId?: string, email?: string) {
  if (typeof window !== "undefined") {
    (window as any).sentryUser = { id: userId, email };
  }
}

/**
 * Track performance metrics
 */
export function startTransaction(
  name: string,
  op: string = "http.request"
) {
  const startTime = performance.now();
  return {
    finish: () => {
      const duration = performance.now() - startTime;
      console.log(`[Performance] ${name} (${op}): ${duration.toFixed(2)}ms`);
    },
    setStatus: (status: string) => {
      console.log(`[Transaction Status] ${name}: ${status}`);
    },
  };
}

/**
 * Performance monitoring utilities
 */
export const performanceMonitoring = {
  /**
   * Measure API request performance
   */
  measureAPIRequest: (url: string, method: string) => {
    const transaction = startTransaction(
      `${method} ${url}`,
      "http.request"
    );
    return {
      end: () => transaction.finish(),
      setStatus: (status: number) => {
        transaction.setStatus(status >= 400 ? "failed" : "ok");
      },
    };
  },

  /**
   * Measure database/CMS query time
   */
  measureQuery: (query: string) => {
    const transaction = startTransaction(query, "db.query");
    return {
      end: () => transaction.finish(),
    };
  },

  /**
   * Measure render time for components
   */
  measureRender: (componentName: string) => {
    const transaction = startTransaction(
      `Render ${componentName}`,
      "ui.render"
    );
    return {
      end: () => transaction.finish(),
    };
  },
};

export default {
  initSentry,
  captureError,
  captureMessage,
  addBreadcrumb,
  setUserContext,
  startTransaction,
  performanceMonitoring,
};
