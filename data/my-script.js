var keywords = ["putin", "путин"];

// "self" is a global object in content scripts
// Listen for a message, and replace the document's
// contents with the message payload.
self.port.on("replaceShit", function(message) {
	console.log("!!! Before handler !!!");
	// $('body').html( $('body').html().replace(new RegExp(keyword, "ig"),'<span style=color:red>  "' + message + '" </span>'));

	$('body').contents().filter(function() {
	    return this.nodeType == 3;
	}).each(function(){
		var str = this.textContent;
		var res = new RegExp(keyword, "ig").test(str);
		if (res) {
			console.log("!!! Matched: ", str);
		} else {
			console.log("--- Not Matched: ", str);
		}

	    this.textContent = this.textContent.replace(new RegExp(keyword, "ig"),'<span style=color:red>  "' + message + '" </span>');
	});

	console.log("!!! After handler !!!");
});
