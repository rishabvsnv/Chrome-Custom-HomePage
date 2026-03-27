import { $ } from "../core/dom.js";

export function initClock() {
  const clock = $("#clock");
  const greeting = $("#greeting");

  function update() {
    const now = new Date();
    clock.innerText = now.toLocaleTimeString();

    const h = now.getHours();
    greeting.innerText =
      h < 12 ? "Good Morning" :
      h < 18 ? "Good Afternoon" :
      "Good Evening";
  }

  update();
  setInterval(update, 1000);
}