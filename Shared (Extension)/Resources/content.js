async function translateText(text, to, from) {
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

async function translateNestedText(element, langsPromise) {
  console.log("Trying to translate");
  const texts = Array.from(element.childNodes)
  let keepNextBr = false;
  let translatedText;
  for (const textNode of texts) {
    console.log(textNode);
    const originalText = textNode.textContent;
    textNode.textContent = "";
    if(keepNextBr) {
      const br = document.createElement("br");
      textNode.appendChild(br);
    }
    if (originalText === "- " ) {
      keepNextBr = false;
      translatedText = originalText;
    }else {
      const { to, from } = await langsPromise;
      console.log("Translating from", from, "to", to);
      translatedText = await translateText(originalText, to, from);
      keepNextBr = true;
    }
    
    textNode.appendChild(document.createTextNode(translatedText));
  }
}

let prevText;
async function runExtensionLogic() {
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
        my_div_shell.style.display = "none";
        const clonetainer = container.cloneNode(true);

        my_div_shell.innerHTML = "";
        my_div_shell.appendChild(clonetainer);
        if (clonetainer.style.top){
          clonetainer.style.removeProperty("top");
          clonetainer.style.bottom = "25%";
        }else{
          clonetainer.style.removeProperty("bottom");
          clonetainer.style.top = "10%";
        }
        const spans = clonetainer.querySelector("span");
        langsPromise = browser.runtime.sendMessage({message: "getLangs"});
        await translateNestedText(spans, langsPromise);
        my_div_shell.style.display = "block";

        const pos =
          Math.floor(window.innerWidth / 2) -
          Math.floor(clonetainer.offsetWidth / 2);

        const pos_percent = (pos / window.innerWidth) * 100;
        clonetainer.style.left = `${pos_percent}%`;
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

console.log("Extension is loaded");
runExtensionLogic();
const observer = new MutationObserver(() => {
  runExtensionLogic();
});
const subtitleContainer = document.querySelector(".player-timedtext");

observer.observe(document.body, { childList: true, subtree: true });

