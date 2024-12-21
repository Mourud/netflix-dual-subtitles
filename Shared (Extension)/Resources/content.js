// TODO: Add OAuth2.0 for API key
// TODO: Add language Selection feature
// TODO: Consider performance optimization-
// 1. Use a single API call for multiple translations
// 2. Scope the Observer to a specific element
// TODO: Check CORS header for the API

async function translateText(text, from = "en", to = "fr") {
  const url = `https://translation.googleapis.com/language/translate/v2?key=..`;
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
      const br = document.createElement("br");

      const textNode = await translateText(node.textContent, "fr", "en");
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
        clonetainer.style.top = clonetainer.style.bottom;
        clonetainer.style.removeProperty("bottom");
        const spans = clonetainer.querySelector("span");
        await translateNestedText(spans);
        my_div_shell.style.display = "block";


        const pos = Math.floor (window.innerWidth / 2) -  Math.floor(clonetainer.offsetWidth / 2);
        console.log(clonetainer.offsetWidth);
        
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

// Run logic initially
console.log("Extension is loaded");
runExtensionLogic();
// Observe DOM changes for dynamic navigation
const observer = new MutationObserver(() => {
  runExtensionLogic();
});
const subtitleContainer = document.querySelector(".player-timedtext");

observer.observe(document.body, { childList: true, subtree: true });

////? Google API
//function start() {
//  // Initializes the client with the API key and the Translate API.
//  gapi.client.init({
//    'apiKey': 'YOUR_API_KEY',
//    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
//  }).then(function() {
//    // Executes an API request, and returns a Promise.
//    // The method name `language.translations.list` comes from the API discovery.
//    return gapi.client.language.translations.list({
//      q: 'hello world',
//      source: 'en',
//      target: 'de',
//    });
//  }).then(function(response) {
//    console.log(response.result.data.translations[0].translatedText);
//  }, function(reason) {
//    console.log('Error: ' + reason.result.error.message);
//  });
//};
//
//// Loads the JavaScript client library and invokes `start` afterwards.
//gapi.load('client', start);
//
//
//(function() {
//  // Load the Google API script dynamically
//  const script = document.createElement('script');
//  script.src = "https://apis.google.com/js/api.js";
//  script.onload = function() {
//    // This function runs once the Google API script is loaded
//    gapi.load('client', start);
//  };
//  document.head.appendChild(script);
//
//  // Define your start function
//  function start() {
//    // Initializes the client with the API key and the Translate API
//    gapi.client.init({
//      apiKey: 'YOUR_API_KEY',
//      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
//    }).then(function() {
//      // Executes an API request, and returns a Promise
//      // The method name `language.translations.list` comes from the API discovery
//      return gapi.client.language.translations.list({
//        q: 'hello world',
//        source: 'en',
//        target: 'de',
//      });
//    }).then(function(response) {
//      console.log(response.result.data.translations[0].translatedText);
//    }, function(reason) {
//      console.log('Error: ' + reason.result.error.message);
//    });
//  }
//})();
