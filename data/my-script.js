//
// @author: Iryna V.
//

// cached regex expressions
var cachedRegexArr = [];

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// Code copied from: http://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};

// Traverse this node and its children to process all text nodes
function traverse(node, keywordsArr) {
    // If it is a #TEXT node
    if (node.nodeType === 3) {
        var nodeName = node.parentNode.nodeName;
        var nodeType = node.nodeType;
        var nodeText = "" + node.nodeValue;
        var wasReplaced = false;

        if (!/(script|style)/i.test(nodeName)
            && nodeText.trim().indexOf("{") !== 0) {

            keywordsArr.forEach(function (entry) {
                var regex = entry.regex;
                var value = entry.value;

                try {
                    if (regex.test(nodeText)) {
//                        console.log("+++ " + nodeName + " " + nodeType + " " + nodeText);
                        nodeText = nodeText.replace(regex, value);
                        wasReplaced = true;
                    }
                } catch (e) {
                    console.log("!!! Error while replacing '" + regex + "' with '" + value + "'", e);
                }
            });

            if (wasReplaced) {
                node.nodeValue = nodeText;
            }
        }
    }

    // Get an array with the child nodes
    var children = node.childNodes;

    // Traverse each of the child nodes
    for (var i = 0; i < children.length; i++) {
        traverse(children[i], keywordsArr);
    }
}

// create array of regex with value to use for replacement
function getKeywordsRegexArr(keywordsDict) {
    if (Object.keys(cachedRegexArr).length !== 0) {
        console.log("Returned cached dictionary");
        return cachedRegexArr;
    }

    for (var key in keywordsDict) {
        cachedRegexArr.push({
            regex: new RegExp(key + "([а-яА-Яa-zA-Z]+)", "i"),
            value: keywordsDict[key].slice(0, -1) + "$1"
        });

        cachedRegexArr.push({
            regex: new RegExp(key, "i"),
            value: keywordsDict[key]
        });
    }

    return cachedRegexArr;
}

function doReplace(keywordsDict) {
    var regexDict = getKeywordsRegexArr(keywordsDict);
    traverse(document.body, regexDict);

    // https://developer.mozilla.org/en/docs/Web/API/MutationObserver
    // select the target node
    var target = document.querySelector('body');

    var traverseFn = debounce(function () {
        var regexDict = getKeywordsRegexArr(keywordsDict);
        traverse(document.body, regexDict);
    }, 300);

    // create an observer instance
    var observer = new MutationObserver(traverseFn);

    // configuration of the observer:
    var config = { attributes: false, childList: true, characterData: true }

    // pass in the target node, as well as the observer options
    observer.observe(target, config);
}

// "self" is a global object in content scripts
// Listen for a message, and replace the document's
// contents with the message payload.
self.port.on("loaded", function (keywordsDict) {
    doReplace(keywordsDict);
});
