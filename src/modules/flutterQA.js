export async function initFlutterQA() {
  const container = document.getElementById("dailyQA");
  if (!container) return;

  const API_URL =
    "https://api.stackexchange.com/2.3/questions?order=desc&sort=votes&tagged=flutter&site=stackoverflow&filter=withbody";

  const fallbackQA = [
    {
      q: "What is BuildContext in Flutter?",
      a: "Represents widget location in the tree and allows access to inherited widgets."
    },
    {
      q: "What is setState()?",
      a: "Triggers UI rebuild with updated state."
    }
  ];

  function getTodayKey() {
    return new Date().toDateString();
  }

  function saveTodayQA(data) {
    localStorage.setItem("qa_date", getTodayKey());
    localStorage.setItem("qa_data", JSON.stringify(data));
  }

  function loadSavedQA() {
    const savedDate = localStorage.getItem("qa_date");
    if (savedDate === getTodayKey()) {
      return JSON.parse(localStorage.getItem("qa_data"));
    }
    return null;
  }

  async function fetchFromAPI() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (!data.items || !data.items.length) return null;

      const item =
        data.items[Math.floor(Math.random() * data.items.length)];

      return {
        q: item.title,
        a: item.body
          ? item.body.replace(/<[^>]+>/g, "").slice(0, 200) + "...": "No answer available.",
        link: item.link
      };
    } catch (e) {
      console.error("API Error:", e);
      return null;
    }
  }

  function render(qa) {
    container.innerHTML = `
        <div class="question">${qa.q}</div>

        <div id="qaAnswer" class="answer mt-2" style="display:none;">
        ${qa.a}
        </div>

      <div class="d-flex gap-2 mt-3">
        <button id="toggleAnswer" class="btn-custom">
          Show Answer
        </button>

        <button id="nextQA" class="btn-custom">
          🔄 Next
        </button>

        ${
          qa.link
            ? `<a href="${qa.link}" target="_blank" class="btn btn-sm btn-outline-success">Open</a>`
            : ""
        }
      </div>
    `;

    const answer = document.getElementById("qaAnswer");
    const toggleBtn = document.getElementById("toggleAnswer");
    const nextBtn = document.getElementById("nextQA");

    toggleBtn.onclick = () => {
      const isHidden = answer.style.display === "none";
      answer.style.display = isHidden ? "block" : "none";
      toggleBtn.textContent = isHidden ? "Hide Answer" : "Show Answer";
    };

    nextBtn.onclick = async () => {
      nextBtn.textContent = "Loading...";
      nextBtn.disabled = true;

      const newQA = await fetchFromAPI();

      if (newQA) {
        render(newQA); // ⚡ instant refresh (no cache)
      } else {
        const random =
          fallbackQA[Math.floor(Math.random() * fallbackQA.length)];
        render(random);
      }
    };
  }

  // 🔥 Initial Load (daily cache)
  const cached = loadSavedQA();

  if (cached) {
    render(cached);
    return;
  }

  const apiQA = await fetchFromAPI();

  if (apiQA) {
    saveTodayQA(apiQA);
    render(apiQA);
  } else {
    const random =
      fallbackQA[Math.floor(Math.random() * fallbackQA.length)];
    render(random);
  }
}