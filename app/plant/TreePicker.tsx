"use client";

import type { MouseEvent } from "react";

const trees = [
  { id: "live-oak", name: "Live oak" },
  { id: "overcup-oak", name: "Overcup oak" },
  { id: "black-gum", name: "Black gum" },
  { id: "chaste-tree", name: "Chaste tree / vitex" },
  { id: "bald-cypress", name: "Bald cypress" }
] as const;

export default function TreePicker() {
  function openGuide(event: MouseEvent<HTMLAnchorElement>, id: string) {
    // Keep the native fragment link, browser history, and modified clicks intact.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const guide = document.getElementById(id);
    if (!(guide instanceof HTMLDetailsElement)) return;
    guide.open = true;
    // Put keyboard and screen-reader focus at the newly opened guide.
    requestAnimationFrame(() => guide.querySelector("summary")?.focus({ preventScroll: true }));
  }

  return (
    <nav id="choose-tree" className="tree-picker" aria-labelledby="tree-picker-title">
      <div className="tree-picker-inner">
        <p className="tree-picker-kicker">START WITH YOUR TREE</p>
        <h2 id="tree-picker-title">Which tree did you pick up?</h2>
        <p className="tree-picker-intro">Tap your tree to go straight to its size, planting location, and care guide.</p>
        <div className="tree-picker-buttons">
          {trees.map((tree) => (
            <a
              key={tree.id}
              href={`#${tree.id}`}
              aria-controls={tree.id}
              aria-label={`Open the ${tree.name} care guide`}
              onClick={(event) => openGuide(event, tree.id)}
            >
              <span>{tree.name}</span>
              <span className="tree-picker-arrow" aria-hidden="true">↓</span>
            </a>
          ))}
        </div>
        <a className="tree-picker-compare" href="#tree-guide">Not sure? Compare the five trees <span aria-hidden="true">→</span></a>
      </div>
    </nav>
  );
}
