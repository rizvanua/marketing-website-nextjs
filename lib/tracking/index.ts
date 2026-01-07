/**
 * Tracking utility for analytics events
 * Simulates sending data to GTM / GA / Mixpanel
 */

import type { ReadonlyURLSearchParams } from "next/navigation";

export interface TrackingPayload {
  [key: string]: unknown;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

/**
 * Extracts UTM parameters from URL search params
 * Accepts both URLSearchParams and ReadonlyURLSearchParams (from Next.js)
 */
export function extractUtmParams(
  searchParams: URLSearchParams | ReadonlyURLSearchParams
): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
} {
  return {
    utm_source: searchParams.get("utm_source") || undefined,
    utm_medium: searchParams.get("utm_medium") || undefined,
    utm_campaign: searchParams.get("utm_campaign") || undefined,
  };
}

/**
 * Tracks an event with optional payload
 * In a real implementation, this would send data to GTM/GA/Mixpanel
 */
export function track(
  event: string,
  payload: TrackingPayload = {}
): void {
  // Simulates sending data to GTM / GA / Mixpanel
  console.log("[track]", event, payload);
  
  // In production, this would look like:
  // if (typeof window !== "undefined" && window.gtag) {
  //   window.gtag("event", event, payload);
  // }
  // or
  // if (typeof window !== "undefined" && window.dataLayer) {
  //   window.dataLayer.push({ event, ...payload });
  // }
}

/**
 * Tracks a page view
 */
export function trackPageView(
  path: string,
  searchParams?: URLSearchParams | ReadonlyURLSearchParams
): void {
  const utmParams = searchParams ? extractUtmParams(searchParams) : {};
  track("page_view", {
    path,
    ...utmParams,
  });
}

/**
 * Tracks a CTA click
 */
export function trackCtaClick(
  ctaText: string,
  ctaHref: string,
  searchParams?: URLSearchParams | ReadonlyURLSearchParams
): void {
  const utmParams = searchParams ? extractUtmParams(searchParams) : {};
  track("cta_click", {
    cta_text: ctaText,
    cta_href: ctaHref,
    ...utmParams,
  });
}

