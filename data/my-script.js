//
// @author: Iryna V.
//

var keywords = ["путин", "путін", "putin", "putyn"];

// "self" is a global object in content scripts
// Listen for a message, and replace the document's
// contents with the message payload.
self.port.on("replaceShit", function(message) {
	$.each(keywords, function(index, value) {
		// console.log("*** Replace: ", value);
		try {
			var replaced = $("body").html().replace(new XRegExp(value, "ig"), message);
			$("body").html(replaced);
		} catch (e) {
			console.log("!!! Error: ", e);
		}
	});
});
