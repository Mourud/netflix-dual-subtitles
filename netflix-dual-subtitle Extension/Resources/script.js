async function translateText(text, from = "en", to = "fr") {
  const url = "https://translation.googleapis.com/language/translate/v2?key={API_KEY}";
  try {
      const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q: text, source: from, target: to, format: "text" })
      });
      const data = await response.json();
      return data.translatedText;
  } catch (err) {
      console.error("LibreTranslate error:", err.message);
      return null;
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  async function runExtensionLogic() {
    if (window.location.pathname.startsWith("/watch")) {
      const div = document.querySelector(".player-timedtext");
      const text = div?.querySelector(".player-timedtext-text-container span")?.innerText;
      if (text) {
        console.log("Original text:", text);
        const translation = await translateText(text);
        console.log("Translated text:", translation);
      }
    }
  }

  // Run logic initially
  runExtensionLogic();

  // Observe DOM changes for dynamic navigation
  const observer = new MutationObserver(() => {
    runExtensionLogic();
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
