async function translateText(text, from = "en", to = "fr") {
  const url =
    "https://translation.googleapis.com/language/translate/v2?key={API_key}";
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

async function translateNestedText(element) {
  console.log("Trying to translate");

  await Promise.all(
    Array.from(element.childNodes).map(async (node) => {
      const br = document.createElement('br');

      const textNode = await translateText(node.textContent);
      node.textContent = "";
      node.appendChild(br);
      node.appendChild(document.createTextNode(textNode));
      console.log("Translated text:", node.textContent);
    })
  );
  return element;
}

let prevText;
async function runExtensionLogic() {
  if (window.location.pathname.startsWith("/watch")) {
    const og_div = document.querySelector(".player-timedtext");
    const my_div_shell = document.querySelector(".nds-player-timedtext");
    if (my_div_shell) {
      text = og_div.textContent;
      if (text !== prevText) {
        if (text === "") {
          my_div_shell.innerHTML = "";
          return;
        }
        prevText = text;
        console.log("Original text:", text);
        const container = og_div.querySelector("div");
        if (container) {
          const clonetainer = container.cloneNode(true);
          clonetainer.style.bottom = "88%";
          const spans = clonetainer.querySelector("span");
          await translateNestedText(spans);
          my_div_shell.innerHTML = "";
          my_div_shell.appendChild(clonetainer);
        }
      }
    } else {
      if (og_div) {
        const my_div_shell = document.createElement("div");
        my_div_shell.className = "nds-player-timedtext";
        parentDiv = og_div.parentElement;
        parentDiv.insertBefore(my_div_shell, og_div.nextSibling);
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  // Run logic initially
  console.log("Extension is loaded");

  runExtensionLogic();

  // Observe DOM changes for dynamic navigation
  const observer = new MutationObserver(() => {
    runExtensionLogic();
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
