import { Button, message, Spin } from 'antd';
import React, { useDebugValue, useEffect, useState } from 'react';
import { AudioPlayer, playBuffers } from './playback';
import { AdvancedTap, extractWithBuffers, fileToTape } from './utils';
import { WaveList } from './WaveList';
import { WordList } from './WordList';


export const WaveWords = ({
    src,
    alignments, 
    synthesizeText
}) => {

    // console.log("start rendering waveWords");


    // states
    const [tapes, setTapes] = useState([])
    const [loading, setLoading] = useState(false) // extraction of the buffers


    // const [progressDebug, setProgressDebug] = useState(0) // extraction of the buffers

    const [playingSources, setPlayingSources] = useState({}); // playing of individual sources alone
    // const [seriesSources, setSeriesSource] = useState([])
    const [audioPlayers, setAudioPlayers] = useState([]) // playing of all sounds in series
    // const playingSources = {}

    useDebugValue(loading ? "extracting the buffers" : "extraction done")

    useEffect(() => {
        const job = async () => {
            setLoading(true)
            const withBuffers = await extractWithBuffers(src, alignments["words"]) // it depends only on the start words, don't change alignments["words"] to words state
            setTapes(withBuffers)
            console.log("tapes returned with buffers", withBuffers);
            setLoading(false)
        }
        job()
    }, [src])

    // callbacks
    const onWordAction = ({ wordIndex, word }, action) => {
        const { type, value } = action
        switch (type) {
            case "delete":
                tapes.splice(wordIndex, 1)
                setTapes([...tapes])
                break;
            case "edited":
                // text is changed to be synthesized
                // tapes[wordIndex].words = { ...tapes[wordIndex].words, loading: true }
                tapes[wordIndex].loading = true
                setTapes([...tapes])
                const editedWord = {
                    ...value,
                    id: Date.now(),
                }
                synthesizeText(word, value).then(src => fileToTape(src, editedWord)).then(editedTape => {
                    tapes[wordIndex] = editedTape
                    console.log(editedTape);
                    // tapes[wordIndex].words = { ...tapes[wordIndex].words, loading: false }
                }).catch((err) => {
                    console.log(err);
                    message.error(`Can't synthesis ${value.word}`)
                }).finally(() => {
                    tapes[wordIndex].loading = false
                    setTapes([...tapes])
                })
                break;
            case "edit":
                console.log(`Word${wordIndex} requested to be edited alone`)
                message.warn("Not supported in current version")
                break;
            case "add-right":
            case "add-left":
                // text is changed to be synthesized
                const newWord = {
                    startText: "",
                    id: Date.now(),
                    word: ""
                }
                const newTape = new AdvancedTap(null, newWord)
                // const shift = type === "add-right" ? 1 : wordIndex ? -1 : 0
                const shift = type === "add-right" ? 1 : 0
                tapes.splice(wordIndex + shift, 0, newTape)
                setTapes([...tapes])
                break;
            case "play":
                console.log(`Word${wordIndex} requested play action`)
                // let pt = 0
                const step = 1
                // TODO: use word.id instead of the wordIndex, this may issue a bug if a new word is added while playing is running in changed a word which its index will be changed
                playingSources[wordIndex] && playingSources[wordIndex].stop() // two successive plays detection 
                const progressSource = AudioPlayer(tapes[wordIndex].buffer)
                progressSource.start()
                playingSources[wordIndex] = progressSource
                progressSource.onProgress(progress => {
                    progress = progress === "end" ? 100 : progress
                    if (progress === 100) delete playingSources[wordIndex]
                    progress = progress % 100 // zero again if reached the end
                    // pt = pt + step * 100 / (tapes[wordIndex].buffer.duration * 1000)
                    // progress = pt
                    // tapes[wordIndex].words = { ...tapes[wordIndex].words, progress: progress }
                    tapes[wordIndex].aloneProgress = progress
                    setTapes([...tapes])
                    // setProgressDebug(progress)
                }, step)
                break;
            case "stop":
                console.log(`Word${wordIndex} requested stop action`, playingSources)
                if (playingSources[wordIndex]) {
                    playingSources[wordIndex].stop()
                    delete playingSources[wordIndex]
                    // tapes[wordIndex].words = { ...tapes[wordIndex].words, progress: 0 }
                    tapes[wordIndex].aloneProgress = 0
                    setTapes([...tapes])
                    setPlayingSources({ ...playingSources })
                }
                break;

            default:
                break;
        }
    }

    const playAll = () => {
        // stopAllSources(seriesSources)
        // setSeriesSource(playTapesInSeries(tapes))
        audioPlayers.map(p => p.stop())
        _clearProgress()
        // const cntx = new AudioContext()
        // const silence = cntx.createBuffer(2, 1, cntx.sampleRate)
        const realTapes = tapes.filter(t => t.buffer)
        const players = playBuffers(realTapes.map(t => t.buffer), (i, p) => {
            // TODO: consider changing the structure of the tapes. instead of array save it in a dictionary, the key is the id, and value is the tape
            // realTapes[i].progress = p === "end" ? 0 : p
            const realTape = realTapes[i]
            tapes[tapes.findIndex(x => x.words.id === realTape.words.id)].progress = p === "end" ? 0 : p
            setTapes([...tapes])
        }, 30)
        setAudioPlayers(players)
    }

    const stopAll = () => {
        // stopAllSources(seriesSources)
        // setSeriesSource([])
        audioPlayers.map(p => p.stop())
        setAudioPlayers([])
        _clearProgress()
        setTapes([...tapes])
    }


    const _clearProgress = () => {
        tapes.filter(t => t.progress > 0).forEach(t => t.progress = 0)
    }



    // render logic
    if (!loading && (!tapes || tapes.length <= 0)) {
        // Empty view
        // add a new word
        const newWord = {
            startText: "",
            id: Date.now(),
            word: ""
        }
        const newTape = new AdvancedTap(null, newWord)
        setTapes([
            newTape
        ])
    }
    const someCanPlayed = tapes.some(t => t.buffer)
    return ( <Spin size="large" spinning={loading}>
            <Button hidden={loading || !someCanPlayed} onClick={playAll}>Play all</Button>
            <Button hidden={loading || !someCanPlayed} onClick={stopAll}>Stop all</Button>
            <WaveList clips={tapes} />
            <WordList onWordAction={onWordAction} clips={tapes} />
            {/* <Skeleton loading={loading} /> */}
        </Spin>
    )
}

const getOptionalCallback = (...callbacks) => (
    callbacks.map(cbk => (
        (...args) => cbk && cbk(...args)
    ))
)