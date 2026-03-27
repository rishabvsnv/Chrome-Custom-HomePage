export const getStorage = (key) =>
  new Promise((res) => chrome.storage.local.get([key], (r) => res(r[key])));

export const setStorage = (obj) =>
  chrome.storage.local.set(obj);