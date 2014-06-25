var OpenTextSummarizer = OpenTextSummarizer || {};
(function (key) {
    "use strict";
    // Constructor
    OpenTextSummarizer.Sentence = function () {
        /* Start private parameters and functions of the class */
        var privates = {
            words: undefined,
            score: undefined,
            selected: undefined,
            wordCount: undefined,
            originalSentence: undefined,
            _constructor: function _constructor() {
                this.words = [];
                this.selected = false;
            }
        };
        /* End private parameters and functions of the class */

        this._ = function (aKey) {
            return key === aKey && privates;
        }
        privates._constructor();
    };

    /* Start Default encapsulated functions deffinitions */
    OpenTextSummarizer.Sentence.prototype = {
        getWords: function getWords() {
            return this._(key).words;
        },
        getScore: function getScore() {
            return this._(key).score;
        },
        setOriginalSentence: function setOriginalSentence(obj) {
            return this._(key).originalSentence = obj;
        },
        setScore: function setScore(obj) {
            this._(key).score = obj;
        }
    }
    /* End Default encapsulated functions deffinitions */
}({}));
