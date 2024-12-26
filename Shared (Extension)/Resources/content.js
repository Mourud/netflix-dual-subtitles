async function translateNestedText(element, to, from) {
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
      const res = await browser.runtime.sendMessage({message: "translate", text: originalText});
      if (res.error) {
        console.error(res.error);
        return;
      }
      translatedText = res.data;
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
        const res = await browser.runtime.sendMessage({message: "translate", spans: spans});
        if (res.error) {
          console.error(res.error);
          return;
        }
        await translateNestedText(spans, "fr", "en");
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

