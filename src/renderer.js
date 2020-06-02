export const drawFreqBars = (data, canvas, styles) => {
    const defaults = {
        fillStyle: 'rgb(250, 250, 250)', // background
        strokeStyle: 'rgb(251, 89, 17)', // line color
        lineWidth: 1,
        fftSize: 16384, // delization of bars from 1024 to 32768
        spaceBetweenBars: 1,
        heightPadding: 0
    }
    styles = { ...defaults, ...styles }
    const canvasContext = canvas.getContext("2d")
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    // analyser.getByteFrequencyData(data);
    // requestAnimationFrame(drawFrequency);
    canvasContext.fillStyle = styles.fillStyle;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.lineWidth = styles.lineWidth;
    canvasContext.beginPath();

    // const resolution = 0.01
    const oneBarResoultion = 0.20 // 50 % of the width
    const barWidth = styles.barWidth || canvas.width * (oneBarResoultion / 100); // TODO: fix issue of space between bars greater than 1
    let barHeight;
    const array_chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));
    let average = (array) => array.reduce((a, b) => a + Math.abs(b)) / array.length;
    data = array_chunks(data, canvas.width / (barWidth + styles.spaceBetweenBars)).map(average)
    // const minValue = Math.min(data)
    const maxValueRef = styles.maxValue || Math.max(...data)
    let xOffset = 0;
    for (let i = 0; i < data.length; i++) {
        barHeight = (data[i] / maxValueRef) * (canvas.height - styles.heightPadding);

        canvasContext.fillStyle = styles.strokeStyle;
        canvasContext.fillRect(xOffset, canvas.height - barHeight, barWidth, barHeight);
        // if (i % 10) {
        //     canvasContext.stroke();
        //     canvasContext.beginPath();
        // }
        xOffset += barWidth + styles.spaceBetweenBars;
    }
    console.log(barWidth, barHeight, maxValueRef);
    // canvasContext.stroke()
}

export const reDrawPosition = (canvas, pos, styles, previous) => {
    const defaults = {
        color: 'rgb(0, 0, 255)', // line color
        lineWidth: 3,
    }
    styles = { ...defaults, ...styles }
    const canvasContext = canvas.getContext("2d")
    canvasContext.beginPath()
    canvasContext.fillStyle = styles.color;
    if (previous) {
        canvasContext.putImageData(previous.waveUnderPos, previous.pos, 0)
    }
    const waveUnderPos = canvasContext.getImageData(pos, 0, styles.lineWidth, canvas.height)
    canvasContext.fillRect(pos, 0, styles.lineWidth, canvas.height)
    canvasContext.stroke()
    return { waveUnderPos, pos }
}

export const drawPosition = (canvas, pos, styles) => {
    const defaults = {
        color: 'rgb(0, 0, 255)', // line color
        lineWidth: 2,
        fillStyle: 'transparent', // line color
    }
    styles = { ...defaults, ...styles }
    console.log("draw position", pos);
    const canvasContext = canvas.getContext("2d")
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = styles.fillStyle;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.lineWidth = styles.lineWidth;

    // canvasContext.clip();
    if (pos < 0) return
    canvasContext.beginPath()
    canvasContext.fillStyle = styles.color;
    canvasContext.fillRect(pos, 0, styles.lineWidth, canvas.height)
    canvasContext.stroke()
}


// TODO: make a function that draw it in sinewave