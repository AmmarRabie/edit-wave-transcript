import { CheckCircleTwoTone, DeleteFilled, EditOutlined, LoadingOutlined, PlayCircleFilled, PlusCircleOutlined, SelectOutlined, StopFilled, UndoOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Menu, message, Space } from 'antd';
import { InsideLoading } from './inside-loading';
import React, { useState } from 'react';

export const Word = ({
    word,
    selectionMode = "none", // select mode used to select more than word and delete them all (from wordList). one of "none", "selected", "not-selected"
    canPlay = true, // canPlay
    canStop = true, // canPlay
    canAdd = true,
    canEdit = true,
    selectable = true, // enable or disable the selection action
    loading = false,
    playingProgress = 0, // the progress of playing, this can be used to make more awesome styles. If 0 means stopped
    onActionRequest // pass a string of "edited", "add-right", "add-left", "edit", "select", "play", "stop" or "delete"
}) => {


    // states
    const [focus, setFocus] = useState(false)
    const [actionsVisible, setActionsVisible] = useState(false)
    const [synthesizedText, setSynthesizedText] = useState(word.word)
    const [currentText, setCurrentText] = useState(synthesizedText)
    // const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState("synthesized") // one of "synthesized", "changed" ("selected" is now determined from isSelected)

    // helpers
    const [onActionRequestO] = getOptionalCallback(onActionRequest)
    const isPlaying = playingProgress > 0
    const isSelected = selectionMode === "selected"
    const startText = word.startText


    // callbacks
    const submit = (e) => {
        if (!canEdit) {
            message.info("you can't edit right now ! either loading or playing")
            return
        }
        const { value } = e.target
        if (value === '') { // TODO compare with striped value
            onActionRequestO({ type: "delete" })
            return
        }
        console.log("enter", value);
        let nw = word
        nw.word = value
        onActionRequestO({ type: "edited", value: nw })
    }

    const undoing = () => {
        setCurrentText(synthesizedText)
        setStatus("synthesized")
    }

    const typing = (e) => {
        // if (!canEdit) return
        const { value } = e.target
        console.log("typing callback triggered with value ", value);
        if (value === synthesizedText) {
            setStatus("synthesized")
        } else {
            setStatus("changed")
        }
        setCurrentText(value)
    }

    const handleMenuActions = (e) => {
        if (e.key !== "play" && e.key !== "stop") setActionsVisible(false)
        onActionRequestO({ type: e.key })
    }

    const UndoButton = props => (
        <Button size="small" block type="link" icon={<UndoOutlined />} {...props} />
    )



    const menu = (
        <Menu onClick={handleMenuActions}>
            <Menu.Item icon={<EditOutlined />} key="edit">
                Edit separately
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item icon={<PlayCircleFilled />} disabled={!canPlay || isPlaying} key="play">
                Play
            </Menu.Item>
            <Menu.Item icon={<StopFilled />} disabled={!canStop || !isPlaying} key="stop">
                Stop
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item disabled={!selectable} icon={<SelectOutlined />} key="select">
                Select
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="delete">
                <Button icon={<DeleteFilled />} danger type="link" block>Delete</Button>
            </Menu.Item>
        </Menu>
    );
    const content = menu


    // render logic
    const statusColor = synthesizedText === startText ? "gray" : "#52c41a" // new ones vs old ones colors
    const statusTitle = synthesizedText === startText ? "old word" : "new edited word" // new ones vs old ones colors
    const showAddButtons = canAdd && focus && selectionMode === "none"

    return (
        <span onMouseOver={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>
            <Space >
                <Button size={"small"} shape="circle" icon={<PlusCircleOutlined />} onClick={() => onActionRequestO({ type: "add-left" })} hidden={!showAddButtons} />
                {/* <Popover content={menu} title="title" >
                    <Input placeholder="New word"
                        disabled={loading || isSelected}
                        value={currentText}
                        prefix={<UndoButton onClick={undoing} />}
                        addonAfter={loading ? <LoadingOutlined /> : ""}
                        onPressEnter={submit}
                        onChange={typing}
                    />
                </Popover > */}
                <InsideLoading onContextMenu={(e) => { e.preventDefault(); setActionsVisible(true) }} progress={playingProgress}>
                    <Dropdown disabled={loading || isSelected} overlay={menu} trigger="contextMenu" visible={actionsVisible} onVisibleChange={setActionsVisible}>
                        <Input placeholder="New word"
                            // disabled={loading || isSelected}
                            value={currentText}
                            prefix={status === "changed" ? <UndoButton onClick={undoing} /> : null}
                            addonAfter={loading ? <LoadingOutlined /> : ""}
                            suffix={<CheckCircleTwoTone twoToneColor={statusColor} title={statusTitle} />}
                            onPressEnter={submit}
                            onChange={typing}
                        />
                    </Dropdown>
                </InsideLoading>
                <Button size={"small"} shape="circle" icon={<PlusCircleOutlined />} onClick={() => onActionRequestO({ type: "add-right" })} hidden={!showAddButtons} />
            </Space>
        </span >
    )
}

const getOptionalCallback = (...callbacks) => (
    callbacks.map(cbk => (
        (...args) => cbk && cbk(...args)
    ))
)