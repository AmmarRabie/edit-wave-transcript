import React, { useEffect, useRef, useState } from 'react';
import { drawFreqBars, drawPosition } from './renderer';
// import './styles.css';

export const Wave = ({
    spaceBetweenBars = 1,
    width = 1024,
    height = 100,
    clip,
    playingProgress = -1, // don't draw
    index
}) => {
    //// const [previousPositionData, setPreviousPositionData] = useState(null)
    const freqСanvas = useRef(null)
    const posСanvas = useRef(null)

    useEffect(() => {
        // re-render the tape
        render()
    }, [clip])

    useEffect(() => {
        // re-render the position
        const posPixel = playingProgress / 100 * freqСanvas.current.width
        drawPosition(posСanvas.current, posPixel)
        //// drawPosition(freqСanvas.current, posPixel)
        //// const oldData = drawPosition(freqСanvas.current, posPixel, undefined, previousPositionData)
        //// setPreviousPositionData(oldData)
    }, [playingProgress])

    const render = () => {
        if (!clip) return
        // console.log("rendering2", tape, JSON.parse(JSON.stringify(tape.buffer)));
        window.tt = clip
        if (!clip.buffer) return

        const styles = {
            fillStyle: 'rgb(250, 250, 250)', // background
            strokeStyle: 'rgb(251, 89, 17)', // line color
            lineWidth: 1,
            fftSize: 16384, // delization of bars from 1024 to 32768
            spaceBetweenBars: spaceBetweenBars
        }
        const canvas = freqСanvas.current
        console.log("rendering..........", clip);
        drawFreqBars(clip.buffer.getChannelData(0), canvas, styles)
    }
    return (
        <div style={{ position: "relative", display: "inline-block", width: "512px", height: height, margin: "0px", padding: "0px", overflow: "hidden" }}>
            <canvas ref={freqСanvas} width={width} height={height}
                style={{
                    position: 'absolute',
                    width: width,
                    height: "100%",
                    left: 0,
                    top: 0,
                    zIndex: 4,
                }} />
            <canvas ref={posСanvas} width={width} height={height}
                style={{
                    position: 'absolute',
                    width: width,
                    height: "100%",
                    left: 0,
                    top: 0,
                    zIndex: 5,
                }} />
        </div>

    );
}
