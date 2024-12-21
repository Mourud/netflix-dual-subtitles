browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    if (request.greeting === "hello")
        return Promise.resolve({ farewell: "goodbye" });
});

browser.runtime.sendMessage({ greeting: "hello from the backside" }).then((response) => {
    console.log("Received response: ", response);
});