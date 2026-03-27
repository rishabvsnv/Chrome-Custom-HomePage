export function initSearch() {
  const form = document.querySelector(".search-form");
  if (!form) return;

  form.onsubmit = (e) => {
    const input = form.querySelector("input");
    const q = input.value.trim();

    if (q.startsWith("yt ")) {
      form.action = "https://www.youtube.com/results";
      input.name = "search_query";
      input.value = q.replace("yt ", "");
    } 
    else if (q.startsWith("gh ")) {
      form.action = "https://github.com/search";
      input.name = "q";
      input.value = q.replace("gh ", "");
    } 
    else {
      form.action = "https://www.google.com/search";
      input.name = "q";
    }
  };
}