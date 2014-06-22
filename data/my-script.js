//
// @author: Iryna V.
//

// "self" is a global object in content scripts
// Listen for a message, and replace the document's
// contents with the message payload.
self.port.on("replaceShit", function (keywordsDict) {
    $.each(keywordsDict, function (key, value) {
        // console.log("*** Replace: " + key + " with " + value);
        try {
            var replaced = $("body").html().replace(new XRegExp(key, "ig"), value);
            $("body").html(replaced);
        } catch (e) {
            console.log("!!! Error: ", e);
        }
    });
});
