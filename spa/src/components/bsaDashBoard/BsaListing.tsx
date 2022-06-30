import {getListings} from 'api/bsa/listingApi';
import ListingFilter, {BsaListingDefautlFilter} from 'model/filter/ListingFilter';
import ListingModel, {isDisplayListingColum} from 'model/listing/ListingModel';
import React, {useEffect, useState} from 'react';
import SortOrder, {HeaderSortItem} from '../utils/SortOrder';
import BsaListingColumn from './BsaListingColumn';
import BsaListingFilterPopup from './BsaListingFilter';
import BsaListingTabs, {TabsInformation} from './BsaListingTabs';

const BsaListing: React.FC<{}> = (props) => {
    const [listings, setListings] = useState<Array<ListingModel>>([]);
    const [filter, setFilter] = useState<ListingFilter>({...BsaListingDefautlFilter});
    const [tabsInformation, setTabsInformation] = useState<TabsInformation>(new TabsInformation());

    const headers: Array<HeaderSortItem> = [
        {text: 'ID', column: 'rlistingId', isSortable: true},
        {text: 'Ngày cập nhật Listing', column: 'updatedDate'},
        {text: 'Chủ tin đăng', column: 'ownerName'},
        {text: 'Ngày chốt', column: 'bpoCloseDate'},
        {text: 'Thời gian xử lý', column: 'timeCounter'},
        {text: 'Số điện thoại', column: 'phone'},
        {text: 'Địa chỉ', column: 'address'},
        {text: 'Quận', column: 'districtName'},
        {text: 'Giá', column: 'price'},
        {text: 'Nguồn', column: 'sourceName'},
        {text: 'Loại hình', column: 'listingTypeId'},
        {text: 'Loại BĐS', column: 'propertyTypeName'},
        {text: 'Ngày assign', column: 'assignedDate'},
        {text: 'Người chuyển', column: 'psAssignedName'},
        {text: 'Người phụ trách', column: 'assignedName'},
        {text: 'Deal-Tour', column: 'numberDeal'},
        {text: 'Ngày hết hạn độc quyền', column: 'guaranteedExpiredDate'},
        {text: 'Ngày đăng', column: 'statusCreateDate'},
        {text: 'Lý do', column: 'reasonName'},
        {text: 'Loại tin đăng', column: 'liveType'}
    ];
    useEffect(() => {
        //process filter to same as old version
        const f = {...filter};
        if (f.channelTypeIds) {
            let channelChild = '_' + (f.channelTypeChildIds || '0');
            f.channelTypeIds = f.channelTypeIds + channelChild;
        }
        if (f.rlistingId) {
            f.rlistingId = f.rlistingId.split(',');
        }

        (async () => {
            const res = await getListings(f);
            if (res && res.data) {
                setListings(res.data);
            }
        })();
    }, [filter]);
    const onHeaderSortIconClick = (column: string) => {
        console.log('--')
    }
    return (
        <>
            <BsaListingFilterPopup filter={filter} onFilter={f => setFilter(f)} />
            <div style={{clear: 'both'}}></div>
            <div style={{width: '100%', overflowX: 'auto'}}>
                <BsaListingTabs tabsInformation={tabsInformation} filter={filter} onFilter={f => setFilter(f)} />
                <table className="table table-striped listing-table">
                    <thead>
                        <tr>
                            {headers.filter(i => isDisplayListingColum(i.column, filter)).map((item, key) => <th key={key}>{item.isSortable ? <>{item.text} <a href={'#'} onClick={(e) => onHeaderSortIconClick(item.column)}><SortOrder sortBy={filter.sortBy?.find(itemSort => itemSort.column === item.column)} /></a></> : item.text}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {listings.map((item, key) => (
                            <tr key={key}>
                                {headers.filter(i => isDisplayListingColum(i.column, filter)).map(i => <BsaListingColumn column={i.column} item={item} filter={filter} />)}
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default BsaListing;
