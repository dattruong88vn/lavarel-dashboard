import React from "react"
import { Button } from "react-bootstrap"

const DefaultButton = ({ id, label, variant, onClick }) => {
  return (
    <Button id={id} variant={variant} onClick={onClick}>
      {label}
    </Button>
  )
}

export default DefaultButton
