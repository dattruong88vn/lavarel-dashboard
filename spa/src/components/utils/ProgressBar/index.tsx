import React, { FC } from "react"

import { ProgressItem } from "model/DealModel/index.d"

import "components/utils/ProgressBar/index.scss"

type ProgressBarProps = {
    bgcolor?: string
    completed: number
    progressList: Array<ProgressItem>
}
const ProgressBar: FC<ProgressBarProps> = (props) => {
    const fillerStyles = {
        backgroundColor: props.bgcolor || "#e1e1d0",
        width: "auto"
    }
    const fillerSelectedStyle = {
        left: `calc(${props.completed}% - 15px)`, // 15px is the wide of dot yellow
        right: "unset"
    }

    const RenderProgressList = (items: Array<ProgressItem>) => {
        return items.map((p, k) => {
            const styleLabel = { left: "0", right: "unset", width: "inherit", textOverflow: "auto", overflow: "unset" }
            const key = `label-${p.progressId}`
            const keyBottom = `label-bottom-${p.progressId}`
            const widthLabel = 100 / (items.length - 1)
            
            // if item is the last
            if ((k + 1) === items.length) {
                styleLabel.left = "unset"
                styleLabel.right = "0"
                styleLabel.width = "62px"
                // styleLabel.textOverflow = "ellipsis"
                // styleLabel.overflow = "hidden"
            } else {
                if (k > 0) {
                    styleLabel.left = `calc(${k * widthLabel}% + 6px)` // adjust to align label center
                    styleLabel.right = "unset"
                } else {
                    styleLabel.left = "0" // adjust to align label center
                    styleLabel.right = "unset"
                }
            }

            if (props.completed === p.progressId) {
                // if item is the last
                if ((k + 1) === items.length) {
                    fillerStyles.width = "100%"
                    fillerSelectedStyle.right = "0"
                    fillerSelectedStyle.left = "unset"
                } else {
                    fillerStyles.width = `calc(${k * widthLabel}% + 6px)`
                    fillerSelectedStyle.left = `calc(${k * widthLabel}% + 6px)`
                    fillerSelectedStyle.right = "unset"
                }
            }

            return (
                <div key={key} className="label-group">
                    <label className="label-bar" style={styleLabel}>
                        {p.progressName}
                    </label>
                    <label
                        key={keyBottom}
                        className="label-bar-bottom label label-warning"
                        style={styleLabel}
                    >
                        {p.lable}
                    </label>
                    {p.progressQuoList.length > 0 &&
                        p.progressQuoList.map((quo, q) => (
                            <label
                                key={`quo-${q}`}
                                className="label-bar-bottom label label-warning quo-item"
                                style={styleLabel}
                            >
                                {quo.progressQuoName}
                            </label>
                        ))}
                </div>
            )
        })
    }

    return (
        <div className="progress-wrapper">
            {RenderProgressList(props.progressList)}

            <div className="filter-bar" style={fillerStyles}>
                <span className="selected-progress-bar" style={fillerSelectedStyle}></span>
            </div>
        </div>
    )
}

export default ProgressBar
