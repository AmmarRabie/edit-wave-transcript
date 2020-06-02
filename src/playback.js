export const AudioPlayer = (sourceOrBuffer, context) => {
    const shouldClose = !context
    const audioContext = context || new AudioContext()
    let handler;
    let startTime
    let source = sourceOrBuffer
    console.log(sourceOrBuffer instanceof AudioBuffer);
    if (sourceOrBuffer instanceof AudioBuffer) {
        source = audioContext.createBufferSource()
        source.buffer = sourceOrBuffer
        source.connect(audioContext.destination)
    }

    const start = () => {
        if (startTime !== undefined) {
            console.log("playback: ignore start of already started source...");
            return
        }
        if (!source || !source.buffer) {
            console.log("playback: source or its buffer is not set correctly!");
            return
        }
        source.start(0, 0)
        startTime = audioContext.currentTime
    }

    const stop = () => {
        handler && clearInterval(handler)
        if (startTime !== undefined)
            stopSources(source)
        close()
    }

    const onProgress = (feedback, perc = 500) => {
        // if (!source) throw Error("you should start the sound first")
        if (!source || !source.buffer) {
            console.log("playback: source or its buffer is not set correctly!");
            return
        }
        const { duration } = source.buffer
        handler = setInterval(() => {
            if (startTime === undefined) return
            const time = audioContext.currentTime - startTime
            feedback(Math.floor(time / duration * 100))
        }, perc)
        source.onended = e => { feedback("end"); clearInterval(handler); close() }
    }

    const close = () => {
        if (shouldClose) audioContext.close()
    }

    return { start, stop, onProgress }
}

export const playBuffers = (buffers, onProgress, perc, callbackargs) => {
    const context = new AudioContext()
    const players = buffers.map(b => AudioPlayer(b, context))
    for (let pi = 0; pi < players.length; pi++) {
        const currentPlayer = players[pi];
        currentPlayer.onProgress((progress) => {
            if (progress === "end" && pi < players.length - 1) {
                console.log(pi, "end");
                players[pi + 1].start()
            }
            onProgress(pi, progress, callbackargs && callbackargs[pi])
        }, perc)
    }
    players[0].start()
    return players
}


export const stopSources = (...sources) => {
    sources.forEach(source => {
        source.stop()
        source.onended = null
    })
}