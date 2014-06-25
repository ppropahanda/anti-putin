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

const enabledState = {
    label: "Anti Putin (ON)",
    icon: {
        "16": "./icon-on-16.png",
        "32": "./icon-on-32.png",
        "64": "./icon-on-64.png"
    }
};

const disabledState = {
    label: "Anti Putin (OFF)",
    icon: {
        "16": "./icon-off-16.png",
        "32": "./icon-off-32.png",
        "64": "./icon-off-64.png"
    }
};

// Configure development environment
var service = require("sdk/preferences/service");
service.set("javascript.options.strict", false);
// Import the self API
var self = require("sdk/self");
// Import the page-mod API
var pageMod = require("sdk/page-mod");
// Import the tab API
var tabs = require("sdk/tabs");
// Import the button API
var buttons = require('sdk/ui/button/action');

var button = buttons.ActionButton({
    id: "anti-putin-link",
    label: enabledState.label,
    icon: enabledState.icon,
    onClick: toggleOnOffState
});

function isDisabled() {
    var state = button.state("window");
    var currentValue = state.label;
    // console.log("Current label is: ", currentValue);
    if (currentValue === disabledState.label) {
        return true;
    }

    return false;
}

function setDisabled(disabled, state) {
    if (disabled) {
        // console.log("Set to Disable state");
        button.state("window", {
            icon: disabledState.icon,
            label: disabledState.label
        });
    } else {
        // console.log("Set to Enable state");
        button.state("window", {
            icon: enabledState.icon,
            label: enabledState.label
        });
    }
}

function toggleOnOffState() {
    var state = button.state("window");
    // console.log("State: ", state);

    var disabled = isDisabled();
    // console.log("[before] Disabled?: ", disabled);
    var toggledValue = !disabled;
    // console.log("Toggled Value: ", toggledValue);
    setDisabled(toggledValue, state);
    // console.log("[after] Disabled?: ", isDisabled());
}

// Create a page mod
// It will run a script whenever any URL is loaded
// The script replaces the shit content to more adapted one
pageMod.PageMod({
    include: ["*"],
    // https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/page-mod#Constructors
    contentScriptWhen: "end",
    contentScriptFile: [self.data.url("my-script.js")],

    // Send the content script a message inside onAttach
    onAttach: function (worker) {
        var disabled = isDisabled();
        // console.log("Fire event?: ", !disabled);
        if (!disabled) {
            // console.log("!!! Fire event");
            worker.port.emit("loaded", keywordsDict);
        }
    }
});
