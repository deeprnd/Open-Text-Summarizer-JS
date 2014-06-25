var OpenTextSummarizer = OpenTextSummarizer || {};
OpenTextSummarizer.Grader = function () {
    "use strict";
    
    var Stemmer = OpenTextSummarizer.Stemmer,
/*    applySentenceFactors = function applySentenceFactors(article) {
        //grade the first sentence of the article higher.
        var sentences = article.getSentences(),
            i, len, sentence, words;

        sentence = sentences[0];
        sentence.setScore(sentence.getScore() * 2);

        //grade first sentence of new paragraphs (denoted by two \n in a row) higher
        for (i = 0, len = sentences.length; i < len; i += 1) {
            sentence = sentences[i];
            words = sentence.getWords();
            if (words.length < 2) continue;
            if (words[0].getValue().indexOf('\n') > -1 && words[1].getValue().indexOf('\n') > -1) {
                sentence.setScore(sentence.getScore() * 1.6);
            }
        }
    },*/

    extractArticleConcepts = function extractArticleConcepts(article) {
        var baseFreq, concepts = [], importantWords = article.getImportantWords(), 
            filterImportantWords, filteredWords, i, len;
			
		for (i = 0, len = Math.min(importantWords.length, 5); i < len; i += 1) {
			concepts.push(importantWords[i]);
		}
        /*
        if (importantWords.length > 5) {
            baseFreq = importantWords[5].getTermFrequency();
            
            filterImportantWords = function filterImportantWords(match) {
                return match.getTermFrequency() >= baseFreq;
            };
            
            filteredWords = importantWords.filter(filterImportantWords)
            for (i = 0, len = filteredWords.length; i < len; i += 1) {
                concepts.push(filteredWords[i].getValue());
            }
            
        } else {            
            for (i = 0, len = importantWords.length; i < len; i += 1) {
                concepts.push(importantWords[i].getValue());
            }
        }*/
        article.setConcepts(concepts);
    },

    gradeSentences = function gradeSentences(article) {
        var i, j, words, wordstem, sentences = article.getSentences(), sentence, wordsLen, sentencesLen,
            rules = article.getRules(), importantWords = article.getImportantWords(),
            importantWord, score = 0;
        
        for (i = 0, sentencesLen = sentences.length; i < sentencesLen; i += 1) {
            sentence = sentences[i];
            score = sentence.getScore();
            if (score === undefined)
                score = 0;
            words = sentence.getWords();
            for (j = 0, wordsLen = words.length; j < wordsLen; j += 1) {            
                wordstem = Stemmer.stemStrip(words[j].getValue(), rules);
                
                importantWord = importantWords.filter(function filterImportantWords(match) {
                    return match.getStem() == wordstem;
                });
                if (importantWord.length > 0) {
                    score += 1;
                }
            }
            sentence.setScore(score);
        }
    },

    compareWordsByFrequency = function compareWordsByFrequency(word1, word2) {
        var lhs = word1.getTermFrequency(), rhs = word2.getTermFrequency();

        if (lhs === rhs) {
            return 0;
        }
        if (rhs < lhs) {
            return -1;
        }
        return 1;
    },
    
    createImportantWordsList = function createImportantWordsList(article) {
        var wordCounts = article.getWordCounts(),
            unimportantWords = article.getRules().unimportantWords,
            importantWords = [], word, foundWord, i, len;
        
        for (i = 0, len = wordCounts.length; i < len; i += 1) {
            word = wordCounts[i];
            
            foundWord = unimportantWords.filter(function filterWordCounts(match) {
                return word.getValue().toLowerCase() === match.getValue().toLowerCase();
            });
            if (foundWord.length === 0) {
                importantWords.push(word);
            }
        }       
        
        importantWords.sort(compareWordsByFrequency);
        article.setImportantWords(importantWords);
    },

    grade = function grade(article) {        
        createImportantWordsList(article);
        gradeSentences(article);
        extractArticleConcepts(article);
        //applySentenceFactors(article);
    };

    return {
        grade: grade
    };
}();