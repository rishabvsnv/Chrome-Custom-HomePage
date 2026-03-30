import { $, } from "../core/dom.js";
import { getStorage, setStorage } from "../core/storage.js";

export async function initNotes() {
  const notes = $("#notes");
  const status = $("#saveStatus");

  notes.value = (await getStorage("note")) || "";

  let timeout;

  notes.addEventListener("input", () => {
    status.innerText = "Saving...";

    clearTimeout(timeout);

    timeout = setTimeout(async () => {
      await setStorage({ note: notes.value });
      status.innerText = "Saved";
    }, 500);
  });
}