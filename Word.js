var OpenTextSummarizer = OpenTextSummarizer || {};
(function (key) {
    "use strict";
    // Constructor
    OpenTextSummarizer.Word = function (word) {
        /* Start private parameters and functions of the class */
        var privates = {
            value: undefined,
            stem: undefined,
            termFrequency: undefined,
            _constructor: function _constructor(word) {
                if (word) {
                    this.value = word;
                }
            }
        };
        /* End private parameters and functions of the class */

        this._ = function (aKey) {
            return key === aKey && privates;
        }
        privates._constructor(word);
    };

    /* Start Default encapsulated functions deffinitions */
    OpenTextSummarizer.Word.prototype = {
        getValue: function getValue() {
            return this._(key).value;
        },
        getStem: function getStem() {
            return this._(key).stem;
        },
        getTermFrequency: function getTermFrequency() {
            return this._(key).termFrequency;
        },
        setValue: function setValue(obj) {
            return this._(key).value = obj;
        },
		setStem: function setStem(obj) {
            return this._(key).stem = obj;
        },
        setTermFrequency: function setTermFrequency(obj) {
            return this._(key).termFrequency = obj;
        }
    }
    /* End Default encapsulated functions deffinitions */
}({}));
