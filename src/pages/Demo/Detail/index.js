import React, { Fragment, useContext } from "react"

import ThemeContext from "context/ThemeContext"

const Detail = (routerProps) => {
  const { lead } = useContext(ThemeContext)
  const detailItem = lead.filter(
    (l) => l.id === parseInt(routerProps.match.params.id)
  )

  return (
    <Fragment>
      <h1>Detail page</h1>

      <ul>
        <li>{detailItem[0].name}</li>
      </ul>
    </Fragment>
  )
}

export default Detail
