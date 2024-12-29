// browser.runtime.onMessage.addListener( (message) => {
//     browser.runtime.sendNativeMessage("application.id", {message}, function(response) {
//         console.log("Received sendNativeMessage response:");
//         console.log(response);
//         return response;
//     });

// });
browser.runtime.onMessage.addListener(async (message) => {
    try {
        const response = await browser.runtime.sendNativeMessage("application.id", { message });
        console.log("Received sendNativeMessage response:", response);
        return response; // This returns the response to the sender
    } catch (error) {
        console.error("Error in sendNativeMessage:", error);
        return { error: error.message }; // Send an error back to the sender
    }
});