import React, { useEffect } from 'react';
import DealBlock from './DealBlock';

const _Window = (window as any).Window;

const Deals: React.FC<{}> = () => {
    useEffect(() => {
        if (_Window.CRMReassignDeals) {
            _Window.CRMReassignDeals.bindEvent();
            _Window.CRMReassignDeals.loadApi();
            _Window.CRMReassignDeals.reloadList();
        }
    }, []);

    return (
        <DealBlock showTable={true} id="lead-list"/>
    )
};

export default Deals;