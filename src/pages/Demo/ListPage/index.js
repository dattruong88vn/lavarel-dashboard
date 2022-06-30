import React, { Fragment, useContext } from "react"

import ThemeContext from "context/ThemeContext"
import { Link } from "react-router-dom"

const ListPage = () => {
  const { lead } = useContext(ThemeContext)

  const renderItem = () => {
    return (
      <ul>
        {lead.map((itm) => (
          <li key={`lead-${itm.id}`}>
            <Link to={`/demo/${itm.id}/detail`}>{itm.name}</Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <Fragment>
      <h1>List page</h1>
      <ul>
        <li>
          <Link to="/demo">Demo page</Link>
        </li>
      </ul>

      <div className="list-lead">{renderItem()}</div>
    </Fragment>
  )
}

export default ListPage
