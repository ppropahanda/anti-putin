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
    disabled: false,
    label: "Anti Putin (ON)",
    icon: {
        "16": "./icon-on-16.png",
        "32": "./icon-on-32.png",
        "64": "./icon-on-64.png"
    }
};

const disabledState = {
    disabled: true,
    label: "Anti Putin (OFF)",
    icon: {
        "16": "./icon-off-16.png",
        "32": "./icon-off-32.png",
        "64": "./icon-off-64.png"
    }
};

// Import the page-mod API
var pageMod = require("sdk/page-mod");
// Import the self API
var self = require("sdk/self");
// Import the button API
var buttons = require('sdk/ui/button/action');

var button = buttons.ActionButton({
    id: "anti-putin-link",
    disabled: enabledState.disabled,
    label: enabledState.label,
    icon: enabledState.icon,
    onClick: toggleOnOff
});

function isDisabled() {
    var state = button.state(button);
    var currentValue = state.disabled;
    console.log("Current value is: ", currentValue);
    return Boolean(currentValue);
}

function setDisabled(disabled, state) {
    // TODO: https://developer.mozilla.org/en-US/Add-ons/SDK/Low-Level_APIs/ui_button_action#Methods
    if (disabled) {
        console.log("Set to Disable state");
        state.disabled = disabledState.disabled;
        state.label = disabledState.label;
        state.icon = disabledState.icon;
    } else {
        console.log("Set to Enable state");
        state.disabled = enabledState.disabled;
        state.label = enabledState.label;
        state.icon = enabledState.icon;
    }
}

function toggleOnOff(state) {
    console.log("[1] State: ", state);
    var btnState = button.state(button);
    console.log("[2] State: ", btnState);

    var disabled = isDisabled();
    console.log("Disabled?: ", disabled);
    var toggledValue = !disabled;
    console.log("Toggled Value: ", toggledValue);
    setDisabled(toggledValue, state);
    console.log("Disabled?: ", isDisabled());
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
        var disabled = isDisabled();
        console.log("Fire event?: ", !disabled);
        if (!disabled) {
            console.log("!!! Fire event");
            worker.port.emit("replaceShit", keywordsDict);
        }
    }
});
