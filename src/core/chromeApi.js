export const getTopSites = () =>
  new Promise((res) => chrome.topSites.get(res));

export const getHistory = () =>
  new Promise((res) =>
    chrome.history.search({ text: "", maxResults: 6 }, res)
  );