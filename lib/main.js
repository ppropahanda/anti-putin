// Import the page-mod API
var pageMod = require("sdk/page-mod");
// Import the self API
var self = require("sdk/self");

// Create a page mod
// It will run a script whenever any URL is loaded
// The script replaces the shit content to more adapted one
pageMod.PageMod({
  include: "*",
  contentScriptFile: [self.data.url("jquery-min.js"), self.data.url("my-script.js")],
  // Send the content script a message inside onAttach
  onAttach: function(worker) {
    worker.port.emit("replaceShit", "Ла-ла-ла-ла");
  }
});
