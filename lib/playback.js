"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopSources = exports.playBuffers = exports.AudioPlayer = void 0;

var AudioPlayer = function AudioPlayer(sourceOrBuffer, context) {
  var shouldClose = !context;
  var audioContext = context || new AudioContext();
  var handler;
  var startTime;
  var source = sourceOrBuffer;
  console.log(sourceOrBuffer instanceof AudioBuffer);

  if (sourceOrBuffer instanceof AudioBuffer) {
    source = audioContext.createBufferSource();
    source.buffer = sourceOrBuffer;
    source.connect(audioContext.destination);
  }

  var start = function start() {
    if (startTime !== undefined) {
      console.log("playback: ignore start of already started source...");
      return;
    }

    if (!source || !source.buffer) {
      console.log("playback: source or its buffer is not set correctly!");
      return;
    }

    source.start(0, 0);
    startTime = audioContext.currentTime;
  };

  var stop = function stop() {
    handler && clearInterval(handler);
    if (startTime !== undefined) stopSources(source);
    close();
  };

  var onProgress = function onProgress(feedback) {
    var perc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    // if (!source) throw Error("you should start the sound first")
    if (!source || !source.buffer) {
      console.log("playback: source or its buffer is not set correctly!");
      return;
    }

    var duration = source.buffer.duration;
    handler = setInterval(function () {
      if (startTime === undefined) return;
      var time = audioContext.currentTime - startTime;
      feedback(Math.floor(time / duration * 100));
    }, perc);

    source.onended = function (e) {
      feedback("end");
      clearInterval(handler);
      close();
    };
  };

  var close = function close() {
    if (shouldClose) audioContext.close();
  };

  return {
    start: start,
    stop: stop,
    onProgress: onProgress
  };
};

exports.AudioPlayer = AudioPlayer;

var playBuffers = function playBuffers(buffers, onProgress, perc, callbackargs) {
  var context = new AudioContext();
  var players = buffers.map(function (b) {
    return AudioPlayer(b, context);
  });

  var _loop = function _loop(pi) {
    var currentPlayer = players[pi];
    currentPlayer.onProgress(function (progress) {
      if (progress === "end" && pi < players.length - 1) {
        console.log(pi, "end");
        players[pi + 1].start();
      }

      onProgress(pi, progress, callbackargs && callbackargs[pi]);
    }, perc);
  };

  for (var pi = 0; pi < players.length; pi++) {
    _loop(pi);
  }

  players[0].start();
  return players;
};

exports.playBuffers = playBuffers;

var stopSources = function stopSources() {
  for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  sources.forEach(function (source) {
    source.stop();
    source.onended = null;
  });
};

exports.stopSources = stopSources;