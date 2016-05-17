#!/usr/bin/env node

var fs = require("fs");
var commander = require("commander");

var checkF = function(file) {

	fs.readFile(file, function (error, logData) {

	if (error) throw error;

	var fileText = logData.toString();

	var characterCount = 0;
	var wordCount = 0;
	var lastCharIsBlank = 0;
	for (i= 0; i < fileText.length; i++) {
		var thisChar = fileText.charAt(i);
		if (thisChar != " " && thisChar != "\n" && thisChar != "\t") {
			characterCount++;
			if (lastCharIsBlank == 1 | i == 0) wordCount++;
			lastCharIsBlank = 0;
			if (!commander.emdash && thisChar == "—") lastCharIsBlank = 1;
		}
		else lastCharIsBlank = 1;
	}	

	console.log("Characters: " + characterCount);
	console.log("Words: " + wordCount)
	});

}

commander
	.version('0.0.1')
	.usage('<file...>')
	.option('-e, --emdash', 'Disallow emdash from splitting words')
	.action(checkF)

commander.parse(process.argv)
