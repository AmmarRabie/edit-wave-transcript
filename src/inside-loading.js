import React from 'react'


export const InsideLoading = ({ children, color, progress, opacity, onContextMenu }) => {
    opacity = opacity || 10
    progress = progress || 0
    color = color || "gray"
    return (
        <div onContextMenu={onContextMenu} style={{ margin: 0, position: "relative" }}>
            {children}
            <div style={{
                position: 'absolute',
                height: "100%",
                width: `${progress}%`,
                left: 0,
                top: 0,
                zIndex: 0,
                backgroundColor: color,
                opacity: `${opacity}%`
            }} />
        </div>
    )
}