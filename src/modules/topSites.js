import { getTopSites } from "../core/chromeApi.js";
import { $ } from "../core/dom.js";

export async function initTopSites() {
  const container = $("#topsites");
  const sites = await getTopSites();

  container.innerHTML = "";

  sites.slice(0, 8).forEach((site) => {
    const url = new URL(site.url);
    const domain = url.hostname.replace("www.", "");

    const favicon =
      "https://www.google.com/s2/favicons?sz=64&domain_url=" + site.url;

    const tile = document.createElement("a");
    tile.className = "top-tile";
    tile.href = site.url;

    tile.innerHTML = `
      <img src="${favicon}">
      <div class="top-title">${site.title || domain}</div>
      <div class="top-domain">${domain}</div>
    `;

    container.appendChild(tile);
  });
}