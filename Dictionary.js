var OpenTextSummarizer = OpenTextSummarizer || {};
OpenTextSummarizer.Dictionary = function () {
    "use strict";
    
    var Word = OpenTextSummarizer.Word, Languages = OpenTextSummarizer.Languages, dicts = {},
	loadKeyValueRule = function loadKeyValueRule(element, section) {
        var dict = {}, container = element[section],
            children = container.rule, len = children.length, i,
            pair;

        for (i = 0; i < len; i += 1) {
            pair = children[i].split('|');
            if (!dict[pair[0]]) {
                dict[pair[0]] = pair[1];
            }
        }
        return dict;
    },

    loadValueOnlyRule = function loadValueOnlyRule(element, section, array) {
        var list = [], container = element[section],
            children = container[array], len = children.length, i,
            pair;

        for (i = 0; i < len; i += 1) {
                list.push(children[i]);
        }
        return list;
    },
    
    load = function load(dictionaryLanguage) {
		if (dicts[dictionaryLanguage]) {
			return dicts[dictionaryLanguage];
		}
		
		var lang = Languages[dictionaryLanguage], dict = {},
			tempContainer, unimportantWords,
			list, i, len;
		if (!lang) {
			throw new Error("No such language");
		}
        tempContainer = lang.stemmer;
        dict.step1PrefixRules = loadKeyValueRule(tempContainer, 'step1_pre');
        dict.step1SuffixRules = loadKeyValueRule(tempContainer, 'step1_post');
        dict.manualReplacementRules = loadKeyValueRule(tempContainer, 'manual');
        dict.PrefixRules = loadKeyValueRule(tempContainer, 'pre');
        dict.suffixRules = loadKeyValueRule(tempContainer, 'post');
        dict.synonymRules = loadKeyValueRule(tempContainer, 'synonyms');

        tempContainer = lang.parser;
        dict.linebreakRules = loadValueOnlyRule(tempContainer, "linebreak", "rule");
        dict.notALinebreakRules = loadValueOnlyRule(tempContainer, "linedontbreak", "rule");
        dict.depreciateValueRule = loadValueOnlyRule(lang['grader-syn'], "depreciate", "rule");        
        //dict.termFreqMultiplierRule = loadValueOnlyRule(xmlDoc, "grader-tf");
				
        dict.unimportantWords = unimportantWords = [];
        list = loadValueOnlyRule(lang, "grader-tc", "word");
        for (i = 0, len = list.length; i < len; i += 1) {
            unimportantWords.push(new Word(list[i]));
        }
		dicts[dictionaryLanguage] = dict;
        return dict;
    };

    return {
        load: load
    };
}();