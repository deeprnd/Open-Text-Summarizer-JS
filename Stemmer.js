var OpenTextSummarizer = OpenTextSummarizer || {};
OpenTextSummarizer.Stemmer = function () {
    "use strict";

    var Word = OpenTextSummarizer.Word,
    stemStrip = function stemStrip(word, rules) {
        var originalWord = word;
        word = stemFormat(word, rules);
        word = replaceWord(word, rules.manualReplacementRules);
        word = stripPrefix(word, rules.prefixRules);
        word = stripSuffix(word, rules.suffixRules);
        word = replaceWord(word, rules.synonymRules);
        if (word && word.length <= 2) word = stemFormat(originalWord, rules);
        return word;
    },

    stemFormat = function stemFormat(word, rules) {
        word = stripPrefix(word, rules.step1PrefixRules);
        word = stripSuffix(word, rules.step1SuffixRules);
        return word;
    },

    stripSuffix = function stripSuffix(word, suffixRule) {
        //not simply using .Replace() in this method in case the 
        //rule.Key exists multiple times in the string.

        for (var key in suffixRule) {
            if (word && word.endsWith(key)) {
                word = word.substring(0, word.length - key.length) + suffixRule[key];
            }
        }
        return word;
    },

    replaceWord = function replaceWord(word, replacementRule) {
        for (var key in replacementRule) {
            if (word == key) {
                return replacementRule[key];
            }
        }
        return word;
    },

    stripPrefix = function stripPrefix(word, prefixRule) {
        //not simply using .Replace() in this method in case the 
        //rule.Key exists multiple times in the string.
        for (var key in prefixRule) {
            if (word && word.indexOf(key) === 0) {
                word = prefixRule[key] + word.substring(key.length);
            }
        }
        return word;
    },

    stemWord = function stemWord(word, rules) {
        var newword = new Word();
        word = word.toLowerCase();
        newword.setTermFrequency(1);
        newword.setValue(stemFormat(word, rules));
        newword.setStem(stemStrip(word, rules));
        return newword;
    };

    return {
        stemWord: stemWord,
        stemStrip: stemStrip
    };
}();