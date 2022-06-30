import React, { Fragment, memo, useContext } from "react"

import ThemeContext from "context/ThemeContext"
import { CounterButtons } from "components/CounterButtons"

export const MyCounter = memo((val) => {
  const myTheme = useContext(ThemeContext)

  return (
    <Fragment>
      <div>MyCounter {myTheme.color}</div>
      <CounterDisplay />
    </Fragment>
  )
})

const CounterDisplay = () => {
  const { handleChange, val } = useContext(ThemeContext)

  return (
    <div>
      <h3>Counter</h3>
      <div>{val}</div>
      <CounterButtons handleChange={handleChange} />
    </div>
  )
}
