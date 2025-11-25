/**
 * Analytics tracking utility
 * Supports multiple analytics providers (Google Analytics, custom analytics, etc.)
 */

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

/**
 * Track page views
 */
export function trackPageView(url: string): void {
  if (typeof window === 'undefined') return;

  // Google Analytics (gtag)
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
    });
  }

  // Custom analytics endpoint (if configured)
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'pageview',
        url,
        timestamp: new Date().toISOString(),
      }),
    }).catch((error) => console.error('Analytics error:', error));
  }
}

/**
 * Track custom events
 */
export function trackEvent({ action, category, label, value }: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  // Google Analytics (gtag)
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Custom analytics endpoint (if configured)
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'event',
        action,
        category,
        label,
        value,
        timestamp: new Date().toISOString(),
      }),
    }).catch((error) => console.error('Analytics error:', error));
  }
}

/**
 * Track CTA clicks
 */
export function trackCTAClick(ctaName: string, destination: string): void {
  trackEvent({
    action: 'cta_click',
    category: 'engagement',
    label: `${ctaName} -> ${destination}`,
  });
}

/**
 * Track template selection
 */
export function trackTemplateSelection(templateId: string, templateName: string): void {
  trackEvent({
    action: 'template_selected',
    category: 'product',
    label: `${templateId}: ${templateName}`,
  });
}

/**
 * Track plan selection
 */
export function trackPlanSelection(planId: string, planName: string): void {
  trackEvent({
    action: 'plan_selected',
    category: 'product',
    label: `${planId}: ${planName}`,
  });
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, success: boolean): void {
  trackEvent({
    action: success ? 'form_submitted' : 'form_error',
    category: 'conversion',
    label: formName,
    value: success ? 1 : 0,
  });
}

/**
 * Track demo link clicks
 */
export function trackDemoClick(demoName: string): void {
  trackEvent({
    action: 'demo_clicked',
    category: 'engagement',
    label: demoName,
  });
}

/**
 * Track license package selection
 */
export function trackLicenseSelection(packageIds: string[], totalPrice: number): void {
  trackEvent({
    action: 'license_selected',
    category: 'product',
    label: packageIds.join(', '),
    value: totalPrice,
  });
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
