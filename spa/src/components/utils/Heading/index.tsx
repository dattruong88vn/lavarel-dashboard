import React, { FC, memo } from 'react'

import "./index.scss"

type HeadingProps = {
  title: string
}
const Heading: FC<HeadingProps> = (props) => {
  return (
    <div className="heading-container">
      <h4 className="title">{props.title}</h4>
    </div>
  )
}

export default memo(Heading)