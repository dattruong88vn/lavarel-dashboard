import React, { FC, useEffect, useState } from 'react';
import { ListingDetailModel } from 'model/ListingDetailModel';
import { getDetailListing } from 'api/list/listApi';

import ListingDetail from "components/utils/ListingDetail";
import DealList from "components/utils/DealList";
import { ResponseDeal } from "model/DealModel/index.d"
import { getDeals } from "api/deals"
import {
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
} from "constants/index"

const _window = (window as any).window;

type DealListContainer = {
    rListingId: number | string | null
    dealIds: string | ''
}
const DealListContainer: FC<DealListContainer> = (props) => {
    const [listItem, setListItem] = useState<ListingDetailModel>(new ListingDetailModel());
    const [items, setItems] = useState<Array<ResponseDeal>>([])
    const [isLoadingListingDetail, setIsLoadingListingDetail] = useState(false)
    const [isLoadingDeals, setIsLoadingDeals] = useState(false)

    const convertDealIds = props.dealIds.split(",")
    const dataPost = {
        pagination: {
            limit: DEFAULT_LIMIT,
            page: DEFAULT_PAGE
        },
        dealIds: convertDealIds,
        rListingId: props.rListingId
    }

    useEffect(() => {
        (async () => {
            const res = await getDetailListing(props.rListingId);
            setListItem(res.data);
            setIsLoadingListingDetail(true);
        })();
    }, [props.rListingId])

    useEffect(() => {
        fetchGetDeals(dataPost);
    }, [])
    
    useEffect(() => {
        if (isLoadingListingDetail && isLoadingDeals) {
            _window.hidePropzyLoadingBPO()
        } else {
            _window.showPropzyLoadingBPO()
        }
    })

    const fetchGetDeals = (dataPost: any) => {
        (async () => {
            const response = await getDeals(dataPost)
            setItems(response.data)
            setIsLoadingDeals(true);
        })()
    }

    const onPageChanged = async (paginationData: any) => {
        const newDataPost = {...dataPost};
        newDataPost.pagination.page = paginationData.currentPage
        fetchGetDeals(newDataPost);
    }
  
    return (
        <div className="row">
            {(isLoadingListingDetail && isLoadingDeals) &&
            (<> 
                <div className="col-md-5">
                    <ListingDetail rlistingId={props.rListingId} listItem={listItem}/>
                </div>
                <div className="col-md-7">
                    <DealList items={items} totalRecords={convertDealIds} onPageChanged={onPageChanged}/>
                </div>
            </>)
            }
        </div>
    )
}

export default DealListContainer