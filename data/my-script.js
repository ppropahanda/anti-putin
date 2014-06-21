// "self" is a global object in content scripts
// Listen for a message, and replace the document's
// contents with the message payload.
self.port.on("replaceShit", function(message) {
	$("body").html("<h1>" + message + "</h1>");
});
