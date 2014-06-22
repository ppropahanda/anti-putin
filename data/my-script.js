//
// @author: Iryna V.
//

function replace(pattern, replacement) {
    try {
        var replacedHtml = $("body").html().replace(new XRegExp(pattern, "ig"), replacement);
        $("body").html(replacedHtml);
    } catch (e) {
        console.log("!!! Error: ", e);
    }
}

function replaceInWrappedHtmlElement(pattern, replacement, wrapperHtmlElement) {
    var startElement = "<" + wrapperHtmlElement + "$1>";
    var endElement = "</" + wrapperHtmlElement + ">";
    var patternStartElement = "\\<" + wrapperHtmlElement + "([\\s\\w=\\'\"-]*)\\>";
    var patternEndElement = "\\<\\/" + wrapperHtmlElement + "\\>";

    var fixedPattern = patternStartElement + pattern + patternEndElement;
    var fixedReplacement = startElement + replacement + endElement;

    try {
        var replacedHtml = $("body").html().replace(new XRegExp(fixedPattern, "ig"), fixedReplacement);
        $("body").html(replacedHtml);
    } catch (e) {
        console.log("!!! Error: ", e);
    }
}

// "self" is a global object in content scripts
// Listen for a message, and replace the document's
// contents with the message payload.
self.port.on("replaceShit", function (keywordsDict) {
    $.each(keywordsDict, function (key, value) {
        // console.log("*** Replace: " + key + " with " + value);
        replace("\\s+" + key, " " + value);
        replace(key + "\\s+", value + " ");

        replaceInWrappedHtmlElement(key, value, "span");
        replaceInWrappedHtmlElement(key, value, "strong");
        replaceInWrappedHtmlElement(key, value, "em");
        replaceInWrappedHtmlElement(key, value, "b");
        replaceInWrappedHtmlElement(key, value, "i");
    });
});
