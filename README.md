Open-Text-Summarizer-JS
=======================

The project contains a Javascript port of OpenTextSummarizer. Please see more details in http://libots.sourceforge.net/


How to use:

function summarizeText(text) {
  var args = new OpenTextSummarizer.SummarizerArguments();
  args.setInputString(text);
  return OpenTextSummarizer.Summarizer.summarize(args);
}
