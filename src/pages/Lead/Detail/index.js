import React, { useContext, useEffect, useState } from "react"

// import MatchingFilterByLocation from "modules/MatchingFilterByLocation"
// import MatchingListingList from "modules/MatchingListingList"

import { LeadContext } from "context/LeadContext"
import GeneralInfo from "modules/GeneralInfo"

import LeadDealService from "services/LeadDealService"

import * as actions from "src_redux/actions/LeadAction"

const Detail = () => {
    const { dispatch } = useContext(LeadContext)
    const [itemDetail, setItemDetail] = useState(null)

    // get item detail
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const itemService = new LeadDealService()
        const resp = await itemService.getDetail()

        dispatch(actions.getItemDetail(resp.data))
        setItemDetail(resp.data)
    }

    return <div className="col-md-12">{itemDetail && <GeneralInfo />}</div>
}

export default Detail
