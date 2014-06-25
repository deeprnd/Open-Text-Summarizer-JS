var OpenTextSummarizer = OpenTextSummarizer || {};
(function (key) {
    "use strict";
    // Constructor
    OpenTextSummarizer.SummarizerArguments = function () {
        /* Start private parameters and functions of the class */
        var privates = {
            dictionaryLanguage: undefined,
            displayPercent: undefined,
            inputString: undefined,
            inputFile: undefined,
            _constructor: function _constructor() {
                this.dictionaryLanguage = "en"; //default to english
                this.displayPercent = 10; //default to 10%
                this.inputString = '';
                this.inputFile = '';
            }
        };
        /* End private parameters and functions of the class */

        this._ = function (aKey) {
            return key === aKey && privates;
        }

        privates._constructor();
    };

    /* Start Default encapsulated functions deffinitions */
    OpenTextSummarizer.SummarizerArguments.prototype = {
        // returns Signature
        getDictionaryLanguage: function getDictionaryLanguage() {
            return this._(key).dictionaryLanguage;
        },
        getInputFile: function getInputFile() {
            return this._(key).inputFile;
        },
        getInputString: function getInputString() {
            return this._(key).inputString;
        },
        getDisplayPercent: function getDisplayPercent() {
            return this._(key).displayPercent;
        },
        getDisplayLines: function getDisplayLines() {
            return this._(key).displayLines;
        },
        setDictionaryLanguage: function setDictionaryLanguage(obj) {
            return this._(key).dictionaryLanguage = obj;
        },
        setInputFile: function setInputFile(obj) {
            return this._(key).inputFile = obj;
        },
        setInputString: function setInputString(obj) {
            return this._(key).inputString = obj;
        },
        setDisplayPercent: function setDisplayPercent(obj) {
            return this._(key).displayPercent = obj;
        },
        setDisplayLines: function setDisplayLines(obj) {
            return this._(key).displayLines = obj;
        }
    }
    /* End Default encapsulated functions deffinitions */
}({}));
