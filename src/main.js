import { initClock } from "./modules/clock.js";
import { initTabs } from "./modules/tabs.js";
import { initTopSites } from "./modules/topSites.js";
import { initHistory } from "./modules/history.js";
import { initNotes } from "./modules/notes.js";
import { initSearch } from "./modules/search.js";
import { initAnimation } from "./modules/animation.js";
import { initFlutterQA } from "./modules/flutterQA.js";

document.addEventListener("DOMContentLoaded", async () => {
  initAnimation();

  try {
    initClock();
    initTabs();
    initSearch();
    initFlutterQA();
    await initTopSites();
    await initHistory();
    await initNotes();
  } catch (e) {
    console.error("App Init Error:", e);
  }
});
