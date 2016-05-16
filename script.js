#!/usr/bin/env node

var fs = require("fs");
var commander = require("commander");

var checkF = function(file) {

	fs.readFile(file, function (error, logData) {

	if (error) throw error;

	var fileText = logData.toString();

	var characterCount = 0;
	for (i= 0; i < fileText.length; i++) {
		var thisChar = fileText.charAt(i);
		if (thisChar != " " && thisChar != "\n" && thisChar != "\t") characterCount++;
	}

	console.log("Characters: " + characterCount);
	});

}

commander
	.version('0.0.1')
	.usage('<file...>')
	.action(checkF)

commander.parse(process.argv)
