var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  tabs.open("http://lurkmore.to/%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%D0%B2%D0%B7%D1%80%D1%8B%D0%B2%D0%B0%D0%B5%D1%82_%D0%B4%D0%BE%D0%BC%D0%B0");
}
