import React from "react"

import "./NotFoundPage.scss"

class NotFoundPage extends React.Component {
    render() {
        return (
            <div className="not-found-page io">
                <h1 className="io">403</h1>
                <h2>Access forbidden</h2>
                <h5>(I'm sorry buddy...)</h5>
            </div>
        )
    }
}
export default NotFoundPage
