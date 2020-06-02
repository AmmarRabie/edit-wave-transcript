import Axios from "axios";
import Ciseaux from 'ciseaux/browser';

// TODO: rename it to WordClip, removes the tape from getter. this class should represents only the buffer, duration and the words
export class AdvancedTap { // rename to refer to the trasncription parts data (this now includes all things for the app, words and buffers)
    constructor(tape, words) {
        this.tape = tape
        this.words = words
        this.buffer = null
    }

    render() {
        return this.tape.render()
    }

    get tape() {
        return this._tape;
    }

    get source() {
        return this._source;
    }
    set source(s) {
        this._source = s;
    }

    set tape(tape) {
        this._tape = tape;
    }
    get buffer() {
        return this._buffer;
    }
    set buffer(buffer) {
        this._buffer = buffer;
    }
    get start() {
        return this._tape.start;
    }
    get end() {
        return this._tape.end;
    }
    get duration() {
        return this._tape.duration;
    }
}

export const getContext = () => {
    const ac = new AudioContext() // TODO: add different browsers
    return ac
}

export const loadAudioBuffer = async (src, context) => {
    const ac = context || getContext()
    const response = await Axios.get(src, {
        responseType: 'arraybuffer',
    });
    const audioBuffer = await ac.decodeAudioData(response.data);
    return audioBuffer
}

export const splitIntoTaps = (src, alignments) => {
    Ciseaux.context = new AudioContext() // TODO: remove from this method
    window.cx = Ciseaux.context
    return Ciseaux.from(src).then((origTap) => {
        console.log("here is the tape", origTap);

        // edit tape (test)
        // tape = Ciseaux.concat([ origTap.slice(10, 1), origTap.slice(2, 3) ]).loop(4);

        const tapes = []
        alignments.forEach(word => {
            const { start, end, text } = word // TODO BUG 
            const currentWordTape = origTap.slice(start, end - start)
            // currentWordTape.info = {start, end, duration: end - start}
            tapes.push(new AdvancedTap(currentWordTape, word))
        });
        return tapes;
    })/*.then((audioBuffer) => {
        console.log("here is the bufffer", audioBuffer);
        playAudioBuffer(Ciseaux.context, audioBuffer)
      });*/
}

export const extractWithBuffers = (src, alignments) => {
    const appendBuffer = (tape) => {
        return tape.render().then((audioBuffer) => {
            tape.buffer = audioBuffer
            return tape
        })
    }
    return splitIntoTaps(src, alignments).then((tapes) => {
        const promises = tapes.map(appendBuffer)
        return Promise.all(promises)
    })
}

export const fileToTape = (src, word) => {
    return Ciseaux.from(src).then(origTap => {
        return origTap.render().then(buffer => {
            const tape = new AdvancedTap(origTap, word)
            tape.buffer = buffer
            return tape
        })
    })
}

const concat = (buffer1, buffer2) => {
    const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);

    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);

    return tmp.buffer;
};

const withWaveHeader = (data, numberOfChannels, sampleRate) => {
    const header = new ArrayBuffer(44);

    const d = new DataView(header);

    d.setUint8(0, "R".charCodeAt(0));
    d.setUint8(1, "I".charCodeAt(0));
    d.setUint8(2, "F".charCodeAt(0));
    d.setUint8(3, "F".charCodeAt(0));

    d.setUint32(4, data.byteLength / 2 + 44, true);

    d.setUint8(8, "W".charCodeAt(0));
    d.setUint8(9, "A".charCodeAt(0));
    d.setUint8(10, "V".charCodeAt(0));
    d.setUint8(11, "E".charCodeAt(0));
    d.setUint8(12, "f".charCodeAt(0));
    d.setUint8(13, "m".charCodeAt(0));
    d.setUint8(14, "t".charCodeAt(0));
    d.setUint8(15, " ".charCodeAt(0));

    d.setUint32(16, 16, true);
    d.setUint16(20, 1, true);
    d.setUint16(22, numberOfChannels, true);
    d.setUint32(24, sampleRate, true);
    d.setUint32(28, sampleRate * 1 * 2);
    d.setUint16(32, numberOfChannels * 2);
    d.setUint16(34, 16, true);

    d.setUint8(36, "d".charCodeAt(0));
    d.setUint8(37, "a".charCodeAt(0));
    d.setUint8(38, "t".charCodeAt(0));
    d.setUint8(39, "a".charCodeAt(0));
    d.setUint32(40, data.byteLength, true);

    return concat(header, data);
};