//
// @author: Iryna V.
//

var keywordsDict = {
    "путин": "Хула-ла",
    "пу́тин": "Хула-ла",
    "путін": "Хула-ла",
    "пу́тін": "Хула-ла",
    "putin": "Hula-la",
    "putyn": "Hula-la"};

// Import the page-mod API
var pageMod = require("sdk/page-mod");
// Import the self API
var self = require("sdk/self");

// Create a page mod
// It will run a script whenever any URL is loaded
// The script replaces the shit content to more adapted one
pageMod.PageMod({
    include: "*",
    contentScriptFile: [self.data.url("jquery-min.js"),
        self.data.url("xregexp-all-min.js"),
        self.data.url("my-script.js")],

    // Send the content script a message inside onAttach
    onAttach: function (worker) {
        worker.port.emit("replaceShit", keywordsDict);
    }
});
