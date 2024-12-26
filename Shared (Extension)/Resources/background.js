let toLang = "en";
let fromLang = "fr";
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    if (request.message === "getLangs") {
        return sendResponse({ to: toLang, from: fromLang });
    }
    if (request.message === "setLangs") {
        toLang = request.to;
        fromLang = request.from;
        return sendResponse({message: "Data is set"});
    }
});