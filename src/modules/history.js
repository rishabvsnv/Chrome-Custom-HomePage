import { getHistory } from "../core/chromeApi.js";
import { $ } from "../core/dom.js";

export async function initHistory() {
  const container = $("#history");
  const items = await getHistory();

  container.innerHTML = "";

  items.forEach((i) => {
    const url = new URL(i.url);
    const domain = url.hostname.replace("www.", "");

    const favicon =
      "https://www.google.com/s2/favicons?sz=32&domain_url=" + i.url;

    const item = document.createElement("a");
    item.href = i.url;
    item.className = "history-item d-flex align-items-center";

    item.innerHTML = `
      <img src="${favicon}" class="history-icon" />
      <div class="history-text">
        <div class="history-title">${i.title || domain}</div>
        <div class="history-domain">${domain}</div>
      </div>
    `;

    container.appendChild(item);
  });
}