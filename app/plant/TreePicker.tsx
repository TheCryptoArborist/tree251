"use client";

import type { MouseEvent } from "react";

const trees = [
  { id: "live-oak", name: "Live Oak" },
  { id: "overcup-oak", name: "Overcup Oak" },
  { id: "black-gum", name: "Black Gum" },
  { id: "chaste-tree", name: "Chaste Tree" },
  { id: "bald-cypress", name: "Bald Cypress" }
] as const;

export default function TreePicker() {
  function openGuide(event: MouseEvent<HTMLAnchorElement>, id: string) {
    // Preserve native fragment navigation, browser history, and modified clicks.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const guide = document.getElementById(id);
    if (!(guide instanceof HTMLDetailsElement)) return;
    guide.open = true;
    requestAnimationFrame(() => guide.querySelector("summary")?.focus({ preventScroll: true }));
  }

  return (
    <nav id="choose-tree" className="tree-picker" aria-labelledby="tree-picker-title" aria-describedby="tree-picker-help">
      <div className="tree-picker-inner">
        <p className="tree-picker-kicker">START WITH YOUR TREE</p>
        <h2 id="tree-picker-title">Which tree did you bring home?</h2>
        <p id="tree-picker-help" className="tree-picker-intro">Tap your tree to jump straight to its guide.</p>
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
