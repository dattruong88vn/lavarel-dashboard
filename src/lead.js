import React from "react"
import ReactDOM from "react-dom"

import regeneratorRuntime from "regenerator-runtime"

import Routes from "pages/Lead/route"

import "assets/scss/general.scss"

// include element
ReactDOM.render(<Routes />, document.getElementById("lead-root"))
