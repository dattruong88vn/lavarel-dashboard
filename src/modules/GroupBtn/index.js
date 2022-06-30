import React, { Fragment, memo, useContext, useEffect, useReducer } from "react"

import ThemeContext from "context/ThemeContext"
import DefaultButton from "components/Buttons/DefaultButton"

import "modules/GroupBtn/index.scss"

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      state = [...state, action.payload]
      break
    case "decrement":
      state = [...state, action.payload]
      break
    default:
      throw new Error()
  }

  return state
}

const GroupBtn = () => {
  const { lead } = useContext(ThemeContext)
  const [dispatch] = useReducer(reducer, lead)

  const handleAdd = async () => {
    const newLead = {
      id: 3,
      name: "Phat",
    }

    dispatch({
      type: "increment",
      payload: newLead,
    })
  }

  return (
    <Fragment>
      <p className="group-btn-title">Module GroupBtn</p>
      <DefaultButton
        id="add"
        label="Btn 1"
        variant="primary"
        onClick={() => handleAdd()}
      />
      <DefaultButton
        id="minus"
        label="Btn 2"
        variant="second"
        onClick={() => handleClick2("#fff")}
      />
    </Fragment>
  )
}

export default memo(GroupBtn)
