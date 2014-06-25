var OpenTextSummarizer = OpenTextSummarizer || {};
(function (key) {
    "use strict";

    var Word = OpenTextSummarizer.Word, Stemmer = OpenTextSummarizer.Stemmer, Sentence = OpenTextSummarizer.Sentence;
    // Constructor
    OpenTextSummarizer.Article = function (rules) {
        /* Start private parameters and functions of the class */
        var privates = {
            sentences: undefined,
            lineCount: undefined,
            concepts: undefined,
            rules: undefined,
            importantWords: undefined,
            wordCounts: undefined,
            _constructor: function _constructor(rules) {
                this.sentences = [];
                this.wordCounts = [];
                this.concepts = [];
                this.rules = rules;
            },            
            addWordCount: function addWordCount(word) {                
                if (word == null || word == '' || word == " " || word == "\n" || word == "\t") return;            
                var stemmedWord = Stemmer.stemWord(word, this.rules), stem = stemmedWord.getStem(),
                    filterWordCounts, foundWord;

                filterWordCounts = function filterWordCounts(match) {
                    return match.getStem() == stem;
                };

                foundWord = this.wordCounts.filter(filterWordCounts);
                if (foundWord.length == 0) {
                    this.wordCounts.push(stemmedWord);
                } else {
                    foundWord[0].setTermFrequency(foundWord[0].getTermFrequency() + 1);
                }
            },
            isSentenceBreak: function isSentenceBreak(word) {
                if (word.indexOf("\r") > -1 || word.indexOf("\n") > -1) return true;
            
                var rules = this.rules.linebreakRules, i, len, isOk = true;

                for (i = 0, len = rules.length; isOk && i < len; i += 1) {
                    if (word.endsWith(rules[i])) {
                        isOk = false;
                    }
                }

                if (isOk)
                    return false;

                rules = this.rules.notALinebreakRules;
                for (i = 0, len = rules.length; i < len; i += 1) {
                    if (word.indexOf(rules[i]) === 0) {
                        return false;
                    }
                }
                return true;
            }
        };
        /* End private parameters and functions of the class */

        this._ = function (aKey) {
            return key === aKey && privates;
        }

        if (!String.prototype.endsWith) {
            Object.defineProperty(String.prototype, 'endsWith', {
                enumerable: false,
                configurable: false,
                writable: false,
                value: function (searchString, position) {
                    if (searchString.length > this.length)
						return false;
					position = position || this.length;
                    position = position - searchString.length;
                    return this.lastIndexOf(searchString) === position;
                }
            });
        }

        privates._constructor(rules);
    };

    /* Start Default encapsulated functions deffinitions */
    OpenTextSummarizer.Article.prototype = {
        getWordCounts: function getWordCounts() {
            return this._(key).wordCounts;
        },
        getRules: function getRules() {
            return this._(key).rules;
        },
        getSentences: function getSentences() {
            return this._(key).sentences;
        },
        getImportantWords: function getImportantWords() {
            return this._(key).importantWords;
        },
        getConcepts: function getConcepts() {
            return this._(key).concepts;
        },
        setImportantWords: function setImportantWords(obj) {
            this._(key).importantWords = obj;
        },
        setConcepts: function setConcepts(obj) {
            this._(key).concepts = obj;
        },
        parseText: function parseText(text) {
            var words = text.split(/[\r ]+/), //space and line feed characters are the ends of words.
            cursentence = new Sentence(),
            originalSentence = '', // string builder
            i, len, word, locWord,
            privates = this._(key);

            privates.sentences.push(cursentence);
            for (i = 0, len = words.length; i < len; i += 1) {
                locWord = word = words[i];
                if (locWord.indexOf("\n") === 0 && word.length > 2) locWord = locWord.replace("\n", "");
                originalSentence += locWord + ' ';
                cursentence.getWords().push(new Word(locWord));
                privates.addWordCount(locWord);

                if (privates.isSentenceBreak(locWord)) {
                    cursentence.setOriginalSentence(originalSentence);
                    cursentence = new Sentence();
                    originalSentence = '';
                    privates.sentences.push(cursentence);
                }
            }            
        }
    }
    /* End Default encapsulated functions deffinitions */
}({}));
