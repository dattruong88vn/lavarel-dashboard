import React, { Fragment, useEffect, useState } from "react"

const LimitedCharacter = ({
    className,
    errorMsg,
    id,
    rows,
    cols,
    value,
    limit,
    onChange,
}) => {
    let [content, setContent] = useState(value)

    const setFormattedContent = (text) => {
        content = text
        if (text.length > limit) {
            content = text.slice(0, limit)
        }
        setContent(content)

        onChange(text)
    }

    const renderError = () => {
        let msg = ""
        if (errorMsg) {
            msg = <p className="error">{errorMsg}</p>
        }

        return msg
    }

    const renderLimitBox = () => {
        return (
            <p>
                {content.length}/{limit}
            </p>
        )
    }

    return (
        <Fragment>
            <textarea
                className={className}
                cols={cols}
                id={id}
                rows={rows}
                onChange={(event) => setFormattedContent(event.target.value)}
                value={content}
            />
            {renderError()}
            {renderLimitBox()}
        </Fragment>
    )
}

export default LimitedCharacter
