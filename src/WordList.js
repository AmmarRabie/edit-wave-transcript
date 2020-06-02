/**
 * handle the multi-select mode
 */

import React, { useState } from 'react';
import { Col, Row } from 'antd';
import {Word} from './Word';

export const WordList = ({
    clips,
    onWordAction,
}) => {


    // states
    const [selectionMode, setSelectionMode] = useState(false)
    const [selections, setSelections] = useState(Array(clips.length).fill(false))

    // callbacks
    const _onWordAction = ({ wordIndex, word }, action) => {
        console.log("WordAction:", wordIndex, action);
        const { type, value } = action
        switch (type) {
            case "select":
                setSelectionMode(true)
                selections[wordIndex] = true
                setSelections([...selections])
                break;
            default:
                onWordAction({ wordIndex, word }, action)
                break;
        }
    }

    const onWordClicked = (word, wordIndex) => {
        console.log("word clicked");
        if (selectionMode) {
            selections[wordIndex] = !selections[wordIndex]
            setSelections([...selections])
        }
    }



    // render logic
    const someInPlay = clips.some(c => c.progress > 0)
    const someInLoading = clips.some(c => c.loading)
    return (
        <Row gutter={[6, 24]}>
            {clips.map((word, wordIndex) => (
                <Col key={word.words.id} onClick={() => onWordClicked(word, wordIndex)} span={3}>
                    <Word key={word.words.id}
                        word={word.words}
                        loading={word.loading}
                        playingProgress={word.aloneProgress || word.progress || 0}
                        canPlay={!someInPlay && word.buffer}
                        canStop={!someInPlay && word.buffer}
                        canEdit={!someInPlay && !someInLoading}
                        canAdd={!someInPlay}
                        onActionRequest={(action) => _onWordAction({ wordIndex, word }, action)}
                    />
                    {/* <h1>{word.progress || 0}</h1> */}
                </Col>
            ))}
        </Row>
    )
}

const getOptionalCallback = (...callbacks) => (
    callbacks.map(cbk => (
        (...args) => cbk && cbk(...args)
    ))
)
