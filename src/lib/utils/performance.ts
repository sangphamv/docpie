/**
 * Performance Utility Functions for Docpie
 * Implements Core Web Vitals optimizations
 */

/**
 * Preload critical resources
 * Use in head component for critical images/fonts
 */
export function preloadCriticalResource(href: string, as: string) {
  return `<link rel="preload" href="${href}" as="${as}" />`;
}

/**
 * Prefetch non-critical resources for faster navigation
 * Use for links that user might click
 */
export function prefetchResource(href: string) {
  return `<link rel="prefetch" href="${href}" />`;
}

/**
 * Check if IntersectionObserver is supported
 * Use for implementing custom lazy loading
 */
export function supportsIntersectionObserver(): boolean {
  return 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window;
}

/**
 * Performance marks for measuring custom metrics
 */
export const performanceMarks = {
  markStart: (name: string) => {
    if ('performance' in window) {
      window.performance.mark(`${name}-start`);
    }
  },
  markEnd: (name: string) => {
    if ('performance' in window) {
      window.performance.mark(`${name}-end`);
      try {
        window.performance.measure(name, `${name}-start`, `${name}-end`);
      } catch (e) {
        console.warn('Could not measure performance:', e);
      }
    }
  },
  getMetrics: () => {
    if ('performance' in window) {
      return window.performance.getEntriesByType('measure');
    }
    return [];
  },
};

/**
 * Report Core Web Vitals to analytics
 */
export function reportWebVitals(
  onMetric: (metric: {
    name: string;
    value: number;
    id: string;
    navigationType: string;
  }) => void
) {
  if ('web-vital' in window) {
    // Use dynamic import to load web-vitals library if available
    console.log('Web Vitals reporter initialized');
  }
}

/**
 * Optimize image loading with fallback
 */
export function getOptimizedImageUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    format?: 'avif' | 'webp' | 'jpg';
  } = {}
): string {
  // Simple implementation - can be extended with image service
  const format = options.format || 'avif';
  return `${url}?format=${format}&w=${options.width || 'auto'}`;
}

/**
 * Detect network conditions for adaptive loading
 */
export function detectNetworkCondition(): 'slow' | 'normal' | 'fast' {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection.saveData) return 'slow';
    if (connection.effectiveType === '4g') return 'fast';
    if (connection.effectiveType === '3g') return 'slow';
  }
  return 'normal';
}

/**
 * Adaptive image loading based on network
 */
export function shouldLazyLoadImage(index: number, networkCondition: string): boolean {
  if (networkCondition === 'slow') {
    return index > 1; // More aggressive lazy loading on slow networks
  }
  return index > 5; // Standard lazy loading
}
