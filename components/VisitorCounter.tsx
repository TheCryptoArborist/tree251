"use client";

import { Sprout, TreePine } from "lucide-react";
import { useEffect, useState } from "react";

const SESSION_KEY = "the-arborist-homepage-visit-counted";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCount() {
      try {
        const alreadyCounted = window.sessionStorage.getItem(SESSION_KEY) === "yes";
        const response = await fetch("/api/visitor-count", {
          method: alreadyCounted ? "GET" : "POST",
          cache: "no-store"
        });
        const data = (await response.json()) as { count?: number };

        if (!alreadyCounted) {
          window.sessionStorage.setItem(SESSION_KEY, "yes");
        }

        if (!cancelled && typeof data.count === "number") {
          setCount(data.count);
        }
      } catch {
        if (!cancelled) {
          setCount(null);
        }
      }
    }

    void loadCount();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto mt-8 max-w-7xl border-t border-teal-300/15 pt-6 sm:mt-10 sm:pt-8">
      <div className="relative overflow-hidden rounded-2xl border border-[#f6c95a]/25 bg-[linear-gradient(135deg,rgba(11,31,23,0.96),rgba(7,19,27,0.98))] px-5 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.24)] sm:px-6">
        <div className="tree-ring-texture pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-20" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#f6c95a]/35 bg-[#f6c95a]/10 text-[#f6c95a]">
              <TreePine className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Visitors to The Arborist</p>
              <p className="mt-1 text-sm leading-6 text-emerald-50/72">Thanks for stopping by and helping this tree-care resource keep growing.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-teal-300/20 bg-black/20 px-4 py-3 sm:min-w-48 sm:justify-center">
            <Sprout className="size-5 text-emerald-300" aria-hidden="true" />
            <div>
              <p className="text-2xl font-black tabular-nums text-white sm:text-3xl">
                {count === null ? "—" : count.toLocaleString()}
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-100/65">Visits have taken root</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
