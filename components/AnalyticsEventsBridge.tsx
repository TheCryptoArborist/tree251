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

function sendEvent(eventName: string, props: Record<string, string> = {}) {
  window.plausible?.(eventName, { props });
  window.gtag?.("event", eventName, props);
}

function sendTrackingEvent(element: HTMLElement) {
  const eventName = element.dataset.trackEvent;
  if (!eventName) return;

  sendEvent(eventName, getTrackingProps(element));
}

function getText(element: Element | null) {
  return element?.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

export function AnalyticsEventsBridge() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trackedElement = target.closest("[data-track-event]") as HTMLElement | null;
      if (trackedElement) {
        sendTrackingEvent(trackedElement);
        return;
      }

      const selfCheckButton = target.closest("#start-here button") as HTMLButtonElement | null;
      if (selfCheckButton) {
        sendEvent("Self Check Option Click", {
          label: getText(selfCheckButton.querySelector("span span span")) || getText(selfCheckButton),
          location: "start_here"
        });
      }
    };

    const handleToggle = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLDetailsElement) || !target.open) return;

      if (target.dataset.trackEvent) {
        sendTrackingEvent(target);
        return;
      }

      const section = target.closest("section") as HTMLElement | null;
      const summary = target.querySelector("summary");

      sendEvent("Accordion Open", {
        label: getText(summary),
        section: section?.id || "unknown"
      });
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
