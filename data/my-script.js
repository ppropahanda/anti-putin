//
// @author: Iryna V.
//

function replace(html, pattern, replacement) {
    var replacedHtml = html;

    try {
        replacedHtml = html.replace(new XRegExp(pattern, "ig"), replacement);
    } catch (e) {
        console.log("!!! Error while replacing '" + pattern + "' with '" + replacement + "'", e);
    }

    return replacedHtml;
}

function replaceInWrappedHtmlElement(html, pattern, replacement, wrapperHtmlElement) {
    var replacedHtml = html;

    var startElement = "<" + wrapperHtmlElement + "$1>";
    var endElement = "</" + wrapperHtmlElement + ">";
    var patternStartElement = "\\<" + wrapperHtmlElement + "([\\s\\w=\\'\"-]*)\\>";
    var patternEndElement = "\\<\\/" + wrapperHtmlElement + "\\>";

    var fixedPattern = patternStartElement + pattern + patternEndElement;
    var fixedReplacement = startElement + replacement + endElement;

    try {
        replacedHtml = html.replace(new XRegExp(fixedPattern, "ig"), fixedReplacement);
    } catch (e) {
        console.log("!!! Error while replacing '" + pattern + "' with '" +
            replacement + "' for '" + wrapperHtmlElement + "' element", e);
    }

    return replacedHtml;
}

function doReplace(keywordsDict) {
//    console.log("Start replacement: ", new Date());

    // https://developer.mozilla.org/en/docs/Web/API/MutationObserver
    // select the target node
//    var target = document.querySelector('body');
//
//    // create an observer instance
//    var observer = new MutationObserver(function (mutations) {
//        try {
//            $("body").find(":not(iframe)").addBack().contents().filter(function () {
//                return (this.nodeType === 1 && this.childNodes) && !/(script|style)/i.test(this.tagName);
//            }).each(function () {
////                console.log("!!! Try to find something ...", new Date());
//                var text = $(this).text();
//                if (/(script|style)/ig.test("putin")) {
//                    console.log("!!! text: ", text);
//                    console.log("!!! tagName: ", this.tagName);
//                }
//            });
//        } catch (e) {
//            console.log("!!! Error: ", e);
//        }
////        mutations.forEach(function (mutation) {
////            console.log(mutation.type);
////        });
//    });
//
//    // configuration of the observer:
//    var config = { attributes: true, childList: true, characterData: true }
//
//    // pass in the target node, as well as the observer options
//    observer.observe(target, config);

    var html = $("body").html();

    $.each(keywordsDict, function (key, value) {
        console.log("*** Replace: " + key + " with " + value);
        html = replace(html, "\\s+" + key, " " + value);
        html = replace(html, key + "\\s+", value + " ");

        html = replaceInWrappedHtmlElement(html, key, value, "span");
        html = replaceInWrappedHtmlElement(html, key, value, "strong");
        html = replaceInWrappedHtmlElement(html, key, value, "em");
        html = replaceInWrappedHtmlElement(html, key, value, "b");
        html = replaceInWrappedHtmlElement(html, key, value, "i");
    });

    $("body").html(html);
}

// "self" is a global object in content scripts
// Listen for a message, and replace the document's
// contents with the message payload.
self.port.on("loaded", function (keywordsDict) {
    var docUrl = document.location.toString();
    var docTitle = document.title;

    doReplace(keywordsDict);
});
