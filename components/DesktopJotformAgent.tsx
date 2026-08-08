"use client";

import { useEffect } from "react";

const agentScriptId = "jotform-agent-desktop";
const agentScriptSrc =
  "https://cdn.jotfor.ms/agent/embedjs/019fdd4d6df8700084324166264c1bd3dc5a/embed.js";

export function DesktopJotformAgent() {
  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    if (document.getElementById(agentScriptId)) return;

    const script = document.createElement("script");
    script.id = agentScriptId;
    script.src = agentScriptSrc;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
