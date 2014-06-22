//
// @author: Iryna V.
//

// key - string to find,
// value - replacement for found string
const keywordsDict = {
    "путин": "Хула-ла",
    "пу́тин": "Хула-ла",
    "путін": "Хула-ла",
    "пу́тін": "Хула-ла",
    "putin": "Hula-la",
    "putyn": "Hula-la"
};

const onState = {
    enabled: true,
    label: "Anti Putin (ON)",
    icon: {
        "16": "./icon-on-16.png",
        "32": "./icon-on-32.png",
        "64": "./icon-on-64.png"
    }
}

const offState = {
    enabled: false,
    label: "Anti Putin (OFF)",
    icon: {
        "16": "./icon-off-16.png",
        "32": "./icon-off-32.png",
        "64": "./icon-off-64.png"
    }
}

// Import the page-mod API
var pageMod = require("sdk/page-mod");
// Import the self API
var self = require("sdk/self");
// Import the button API
var buttons = require('sdk/ui/button/action');

var button = buttons.ActionButton({
    id: "anti-putin-link",
    enabled: onState.enabled,
    label: onState.label,
    icon: onState.icon,
    onClick: toggleOnOff
});

function isOn() {
    var currentValue = button.state(button).enabled;
    console.log("Current value is: ", currentValue);
    return Boolean(currentValue);
}

function setOn(on) {
    if (on) {
        button.state(button, onState);
    } else {
        button.state(button, offState);
    }
}

function toggleOnOff(state) {
    console.log("Before requesting button state");
    var btnState = button.state(button);
    console.log(btnState);

    var on = isOn();
    console.log("On?: ", on);
    var toggledValue = !on;
    console.log("Toggled Value?: ", toggledValue);
    setOn(toggledValue);
    console.log("On?: ", isOn());
}

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
        var on = isOn();
        console.log("On?: ", on);
        if (on) {
            console.log("!!! Fire event");
            worker.port.emit("replaceShit", keywordsDict);
        }
    }
});
