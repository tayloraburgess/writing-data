#!/usr/bin/env node

var fs = require("fs");
var commander = require("commander");

var main = function (file) {

	fs.readFile(file, function (error, logData) {

	if (error) throw error;

	var fileText = logData.toString();

	var characterCount = 0;
	var wordCount = 0;
	var lastCharIsBlank = 0;
	for (i = 0; i < fileText.length; i++) {
		var thisChar = fileText.charAt(i);
		if (thisChar != " " && thisChar != "\n" && thisChar != "\t") {
			characterCount++;
			if (lastCharIsBlank == 1 | i == 0) wordCount++;
			lastCharIsBlank = 0;
			if (!commander.emdash && thisChar == "—") lastCharIsBlank = 1;
		}
		else lastCharIsBlank = 1;
	}

	if (commander.wordfreq) {

		var wordFreqCount = 0;
		var wordFreqString = fileText;

		while (fileText.search(commander.wordfreq) != -1) {
			wordFreqCount++;
			fileText = fileText.slice(fileText.search(commander.wordfreq) + commander.wordfreq.length - 1);
		}

	}
	console.log("")	
	console.log('"' + file + '" ' + "Stats")
	console.log("---")
	console.log("Characters: " + characterCount);
	console.log("Words: " + wordCount);
	if (commander.wordfreq) console.log('Frequency of "' + commander.wordfreq + '": ' + wordFreqCount);
	console.log("")

	});

}

commander
	.version("1.0.0")
	.usage("<file>")
	.option("-e, --emdash", "Disallow emdash from splitting words")
	.option("-w, --wordfreq <w>", "Returns frequency of input word")
	.action(main)

commander.parse(process.argv)
