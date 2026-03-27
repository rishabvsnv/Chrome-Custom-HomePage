import { $, } from "../core/dom.js";
import { getStorage, setStorage } from "../core/storage.js";

export async function initNotes() {
  const notes = $("#notes");

  notes.value = (await getStorage("note")) || "";

  notes.onkeyup = () => {
    setStorage({ note: notes.value });
  };
}