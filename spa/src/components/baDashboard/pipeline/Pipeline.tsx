import React, { useState, useEffect } from "react";
import Grouping from "./Components/Grouping/Grouping";
import "./Pipeline.scss";
import { FilterPipeLine, GroupBy, ListingGroup, PopupType, TimeGroupBy, TimeoutType, TrackingType } from 'model';
import TotalValueComponent from "./Components/TotalValueData/TotalValueComponent";
import NoteView from "./Components/Note/Note";
import PipelineTable from "./Components/PipelineTable/PipelineTable";
import LoadingOverlay from 'react-loading-overlay-ts';
import PipelineFilter from './Components/Filter/PipelineFilter';
import { Modals } from "components/utils";
import ListDeal from "./Components/ListDeal/ListDeal"
import { salePipeLineTracking } from "api/ba/SalePipelineApi/getSalesPipelineReport";
import { getTimeoutApi } from "api/core-apis/apiGetTimeout";
import { createBrowserHistory } from "history";
import useRedirect from "./Components/AutoRedirect/autoRedirect"
import { debounce } from "lodash";
export const defautlGroup = {
    timeGroupby: TimeGroupBy.WEEK,
    groupBy: GroupBy.STATUS,
};
const _Window = (window as any).Window;
const _window = (window as any).window;

type SalesPipelineProps = {};

const SalesPipeline: React.FC<SalesPipelineProps> = (props) => {
    const [group, setGroup] = useState<ListingGroup>(defautlGroup);
    const [filter, setFilter] = useState<any>(undefined);
    const [isActive, setIsActive] = useState(false);
    const [showListDeal, setShowListDeal] = useState(false)
    const [rowIdValue, setRowIdValue] = useState("")
    const [removeEmptyValue, setRemoveEmptyValue] = useState(false);
    const [timeFrom, setTimeFrom] = useState(Date.now());
    const [linkNameValue, setLinkNameValue] = useState<PopupType>(PopupType.NONE)
    const [unLoad, setUnLoad] = useState(false);
    const [timeoutIdle, setTimeoutIdle] = useState(15 * 60 * 1000);
    const history = createBrowserHistory({ forceRefresh: true });

    useEffect(() => {
        (async () => {
            const dataTimeOut = await getTimeoutApi({
                type: TimeoutType.BUY,
            });
            setTimeoutIdle(dataTimeOut.data.dealTime * 60 * 1000)
        })();
    }, []);

   const timer = useRedirect(timeoutIdle);

    const debounceRedirect = debounce(() => {
        history.push("/crm-dashboard");
    }, 1100);

    if (timer === 1) {
        debounceRedirect();
    }

    useEffect(() => {
        if (unLoad) {
            if (showListDeal === true) {
                callApiTrackingPopup(false);
            }
        }
        const tracking = () => setUnLoad(true);
        window.addEventListener('beforeunload', tracking);
        return () => {
            window.removeEventListener('beforeunload', tracking);
        }
    }, [unLoad, setUnLoad]);

    const callApiTrackingPopup = (openPopup: boolean) => {
        const timeEnd = Date.now();
        const durationTime = openPopup ? 0 : timeEnd - timeFrom;
        (async () => {
            await salePipeLineTracking({
                trackingType: TrackingType.POPUP,
                fromTime: String(timeFrom),
                duration: durationTime,
                viewType: group.groupBy,
                viewTimeType: group.timeGroupby,
                rowId: rowIdValue,
                linkName: linkNameValue,
            });
        })();
    }

    const dataGroupChange = (data: ListingGroup) => {
        setGroup(data)
        setIsActive(true)
    }   

    const dataFilterChange = (data: FilterPipeLine) => {
        setFilter(data)
        setIsActive(true)
    }

    const removeEmptyChange = (removeEmpty: boolean) => {
        setIsActive(true)
        setRemoveEmptyValue(removeEmpty)
    }

    const loadDataDone = (loadDone: boolean) => {
        setTimeout(() => {
            setIsActive(!loadDone)
        }, 1000);
    };

    const closeModalListDeal = () => {
        setShowListDeal(false);
        callApiTrackingPopup(false);

    }
    useEffect(() => {
        if (showListDeal) {
            callApiTrackingPopup(true);
        }
    }, [showListDeal]);

    const showModalListDeal = async (dealIds: string, linkName: PopupType, rowId?: string) => {
        if (dealIds.length < 0) return;

        await Promise.all([
            setRowIdValue(rowId || ""),
            setTimeFrom(Date.now()),
            setLinkNameValue(linkName)]
        );
        setShowListDeal(true);
        _window.showPropzyLoadingBPO();
        setTimeout(() => { // load table from filters
            _Window._ListDealMatrix.resetFilter();
            $(".modal-expand-matrix .filter-content #inputDealId").val(dealIds);
            _Window._ListDealMatrix.reloadList();
        }, 1000);
    }
    _Window.renderModalDeals = showModalListDeal;
    return (
        <>
            <div className="row sales-pipeline">
                <LoadingOverlay
                    active={isActive}
                    spinner
                    text=''
                    classNamePrefix="sale-pipeline-"
                >
                    <div className="col-md-10">
                        <Grouping dataGroupChange={dataGroupChange} defautlGroup={defautlGroup} removeEmptyChange={removeEmptyChange} />
                    </div>
                    <div className="col-md-2">
                        <PipelineFilter onSubmit={dataFilterChange} />
                    </div>
                    <div className="col-md-12 custom-col-md-12">
                        <TotalValueComponent dataGroup={group} dataFilter={filter} showModal={showModalListDeal} />
                        <NoteView />
                        <PipelineTable dataGroup={group} dataFilter={filter} removeEmpty={removeEmptyValue} loadDataDone={loadDataDone} showModal={showModalListDeal} />
                    </div>
                </LoadingOverlay>
                <Modals isDisplay={showListDeal} title="Danh sách deal" className="modal-expand-matrix custom-modal" onCancelAction={closeModalListDeal}>
                    <ListDeal id="list-deal-matrix" />
                </Modals>
            </div>
        </>);
};

export default SalesPipeline;
