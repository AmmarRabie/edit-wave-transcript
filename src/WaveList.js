/**
 * The data structure required is
 * {
 *  buffer: "the audio data"
 *  duration: "length in seconds"
 *  words: "sentence attached to this buffer"
 * }
 */
import React from 'react';
// import './styles.css';
import { Wave } from "./Wave";

export const WaveList = ({ clips }) => {


    return (
        // <div>
        clips && <div>
            {clips.map((clip, index) => (
                clip.buffer && <Wave key={clip.words.id} index={index}
                    clip={clip}
                    playingProgress={clip.progress ? clip.progress : -1}
                    width={512} />
            ))}
        </div>
        // </div>
    );
}