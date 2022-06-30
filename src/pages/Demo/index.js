import React, { Fragment } from "react"
import { Link } from "react-router-dom"

import Header from "themes/Example/Header"
import Footer from "themes/Example/Footer"

import ListPage from "pages/Demo/ListPage"
import Detail from "pages/Demo/Detail"

const Demo = (routerProps) => {
  const handleRenderProps = () => {
    let content = null

    switch (routerProps.location.pathname) {
      case "/demo/list":
        content = <ListPage {...routerProps} />
        break
      case `/demo/${routerProps.match.params.id}/detail`:
        content = <Detail {...routerProps} />
        break

      default:
        break
    }

    return content
  }
  return (
    <Fragment>
      <Header />
      <h1>Demo page</h1>
      <ul>
        <li>
          <Link to="/demo/list">List page</Link>
        </li>
      </ul>

      {handleRenderProps()}

      <Footer />
    </Fragment>
  )
}

export default Demo
