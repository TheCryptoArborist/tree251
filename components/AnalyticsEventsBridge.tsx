"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
    gtag?: (command: "event", eventName: string, params?: Record<string, string>) => void;
  }
}

function getTrackingProps(element: HTMLElement) {
  const props: Record<string, string> = {};

  for (const [key, value] of Object.entries(element.dataset)) {
    if (!value || key === "trackEvent") continue;
    props[key] = value;
  }

  return props;
}

function sendTrackingEvent(element: HTMLElement) {
  const eventName = element.dataset.trackEvent;
  if (!eventName) return;

  const props = getTrackingProps(element);

  window.plausible?.(eventName, { props });
  window.gtag?.("event", eventName, props);
}

export function AnalyticsEventsBridge() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trackedElement = target.closest("[data-track-event]") as HTMLElement | null;
      if (!trackedElement) return;

      sendTrackingEvent(trackedElement);
    };

    const handleToggle = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLDetailsElement) || !target.open) return;

      sendTrackingEvent(target);
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("toggle", handleToggle, true);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("toggle", handleToggle, true);
    };
  }, []);

  return null;
}
