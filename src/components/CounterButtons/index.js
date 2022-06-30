import React, { Fragment } from "react"
import DefaultButton from "components/Buttons/DefaultButton"

export const CounterButtons = ({ handleChange }) => {
  return (
    <Fragment>
      <DefaultButton
        id="add"
        label="Add"
        variant="primary"
        onClick={handleChange}
      >
        Add
      </DefaultButton>
      <DefaultButton
        id="minus"
        label="Minus"
        variant="secondary"
        onClick={handleChange}
      >
        Minus
      </DefaultButton>
    </Fragment>
  )
}
