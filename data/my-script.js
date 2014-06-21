var keywords = ["путин", "путін", "putin", "putyn"];

function contains(value, arr) {
	return $.inArray(value.toLowerCase(), arr) >= 0;
}

// "self" is a global object in content scripts
// Listen for a message, and replace the document's
// contents with the message payload.
self.port.on("replaceShit", function(message) {
	console.log("!!! Before handler !!!");

	// $('body').find('*')
	//   .contents()
	//   .filter(function(){
	//     return this.nodeType !== 1;
	//   })
	//   .wrap("<span style='color:red;'></span>");

	// $("*").each(function () {
 //        $(this).text($(this).text().replace(new RegExp(value, "ig"), message));
	// });

	$.each(keywords, function(index, value) {
		console.log("*** Replace: ", value);
		try {
			var replaced = $("body").html().replace(new XRegExp(value, "ig"), message);
			$("body").html(replaced);
		} catch (e) {
			console.log("!!! Error: ", e);
		}
	});

	console.log("!!! After handler !!!");
});
