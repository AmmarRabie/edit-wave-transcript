"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.synthesizeText = void 0;

var synthesizeText = function synthesizeText(oldWord, newWord) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      // resolve("audio/vocals30.mp3");
      // resolve(`https://ssl.gstatic.com/dictionary/static/sounds/oxford/${newWord}--_us_1.mp3`)
      var url = "audio/words/".concat(newWord.word, ".mp3");
      console.log(url); // promises.access(url).then(() => resolve(url)).catch(err => reject(err));

      resolve(url);
    }, 1000);
  });
};

exports.synthesizeText = synthesizeText;