/// <reference path="SummarizerArguments.js" />
/// <reference path="Dictionary.js" />
var OpenTextSummarizer = OpenTextSummarizer || {};
OpenTextSummarizer.Summarizer = function () {
    "use strict";
    
    var Dictionary = OpenTextSummarizer.Dictionary, Article = OpenTextSummarizer.Article,
        Grader = OpenTextSummarizer.Grader,
    summarize = function summarize(summarizerArguments) {
        var rules = Dictionary.load(summarizerArguments.getDictionaryLanguage()),
        article = new Article(rules),
		results = [];
        article.parseText(summarizerArguments.getInputString());
        Grader.grade(article);
        
		for (var i = 0, concepts = article.getConcepts(), len = concepts.length; i < len; i += 1) {
			results.push(concepts[i].getStem());
		}
		return results;
    };

    return {
        summarize: summarize
    };
}();