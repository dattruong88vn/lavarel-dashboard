import React, { FC } from 'react'

import Heading from "components/utils/Heading"
import ItemList from "components/utils/DealList/ItemList"

import { IPropsDealList } from "components/utils/DealList/index.d"

const DealList: FC<IPropsDealList> = (props) => {
  return (
    <div className="deal-list">
      <Heading title="Danh sách Deals" />
      <ItemList items={props.items} totalRecords={props.totalRecords} onPageChanged={props.onPageChanged} />
    </div>
  )
}

export default DealList