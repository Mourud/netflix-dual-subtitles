const res = await browser.runtime.onMessage.addListener(handleMessages);
console.log(res);
let selectedFromLang = "fr";
let selectedToLang = "en";

async function handleMessages(request, sender, sendResponse) {
        console.log("Received request: ", request);
        if (request.message === "translate") {
            const translatedText = await translateText(request.text, selectedFromLang, selectedToLang);
            return { data: translatedText, error: null };
        }
        if (request.to && request.from) {
            selectedToLang = request.to;
            selectedFromLang = request.from;
            return { data: "success", error: null };
        }
}

async function translateText(text, from, to) {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: from,
          target: to,
          format: "text",
        }),
      });
      const res = await response.json();
      return res.data.translations[0].translatedText;
    } catch (err) {
      console.error("Translation error:", err.message);
      return null;
    }
  }
  
