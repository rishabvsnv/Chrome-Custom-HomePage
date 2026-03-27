import { initClock } from "./modules/clock.js";
import { initTabs } from "./modules/tabs.js";
import { initTopSites } from "./modules/topSites.js";
import { initHistory } from "./modules/history.js";
import { initNotes } from "./modules/notes.js";

document.addEventListener("DOMContentLoaded", () => {
  initClock();
  initTabs();
  initTopSites();
  initHistory();
  initNotes();
});