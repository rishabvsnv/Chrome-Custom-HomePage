import { $$ } from "../core/dom.js";

export function initTabs() {
  const buttons = $$("#mainTabs button");

  buttons.forEach((btn) => {
    btn.onclick = () => {
      document
        .querySelectorAll(".tab-pane")
        .forEach((p) => p.classList.remove("show", "active"));

      document
        .querySelector(btn.dataset.bsTarget)
        .classList.add("show", "active");

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    };
  });
}