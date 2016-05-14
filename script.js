var fs = require("fs");

fs.readFile("text.txt", function (error, logData) {

	if (error) throw error;

	var fileText = logData.toString();

	var characterCount = 0;
	for (i= 0; i < fileText.length; i++) {
		var thisChar = fileText.charAt(i);
		if (thisChar != " " && thisChar != "\n" && thisChar != "\t") characterCount++;
	}

	console.log("Characters: " + characterCount);
});