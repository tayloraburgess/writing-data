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
		var wordPosition = 0;
		var wordFreqCount = 0;
		for (i = 0; i < fileText.length; i++) {
			if (fileText.charAt(i) == commander.wordfreq.charAt(wordPosition)) {
				if (wordPosition == (commander.wordfreq.length - 1)) {
					wordFreqCount++;
					wordPosition = 0;
				}
				else wordPosition++;
			}
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
