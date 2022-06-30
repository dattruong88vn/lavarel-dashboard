import ListingFilter, {BsaListingDefautlFilter} from 'model/filter/ListingFilter';
import React, {useEffect, useState} from 'react';
export class TabsInformation {
    needLive: number = 0;
    living: number = 0;
}
type FilterProps = {
    filter: ListingFilter,
    tabsInformation: TabsInformation,
    onFilter: (filter: ListingFilter) => void
}
const BsaListingTabs: React.FC<FilterProps> = (props) => {
    const [tabsInformation, setTabsInformation] = useState<TabsInformation>(new TabsInformation());
    const [filter, setFilter] = useState<ListingFilter>(BsaListingDefautlFilter);

    useEffect(() => {
        setTabsInformation(props.tabsInformation);
    }, [props.tabsInformation])
    useEffect(() => {
        setFilter(props.filter);
    }, [props.filter])
    
    return (<>
        <div className="bsa-tabs">
            <div className="row">
                <div className={filter.type == 1 ? '-active' : ''} onClick={e => props.onFilter({...filter, type: 1})}>Tin đăng cần live <span className="label label-success">{tabsInformation.needLive}</span></div>
                <div className={filter.type == 3 ? '-active' : ''}  onClick={e => props.onFilter({...filter, type: 3})}>Tin đăng đang live <span className="label label-success">{tabsInformation.living}</span></div>
                <div style={{clear: 'both'}}></div>
            </div>
        </div>
    </>)
};

export default BsaListingTabs;
