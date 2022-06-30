import React, { useState, useEffect, memo } from "react";
import "./grouping.scss"
import { ListingGroup, TimeGroupBy, GroupBy, TrackingType } from 'model'
import { salePipeLineTracking } from "api/ba/SalePipelineApi/getSalesPipelineReport";

type GroupingProps = {
    dataGroupChange: (data: ListingGroup) => void;
    removeEmptyChange: (reomoveEmtpy: boolean) => void;
    defautlGroup: ListingGroup;
};

const Grouping: React.FC<GroupingProps> = (props) => {
    const { dataGroupChange, removeEmptyChange, defautlGroup } = props;
    const groupBy = [{ value: GroupBy.STATUS, text: "Trạng thái" }, { value: GroupBy.USER, text: "Nhân viên" }];
    const timeGroupby = [{ value: TimeGroupBy.WEEK, text: "Tuần" }, { value: TimeGroupBy.MONTH, text: "Tháng" }];
    const [group, setGroup] = useState<ListingGroup>({ ...defautlGroup });
    const [oldGroup, setOldGroup] = useState<ListingGroup>({ ...defautlGroup });
    const [removeEmtpy, setRemoveEmpty] = useState(false);
    const [timeFrom, setTimeFrom] = useState(Date.now());
    const [unLoad, setUnLoad] = useState(false);
    const [fistLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (unLoad) {
            callApiTracking(group, true);
            console.log("unload");
        }
        const tracking = () => setUnLoad(true);
        window.addEventListener('beforeunload', tracking);
        return () => {
            window.removeEventListener('beforeunload', tracking);
        }
    }, [unLoad, setUnLoad]);

    useEffect(() => {
        //end
        if (unLoad)
            return;
        if (fistLoad) {
            setFirstLoad(false)
        } else {
            callApiTracking(oldGroup, true);
        }
    }, [oldGroup]);

    useEffect(() => {
        dataGroupChange(group);
    }, [group]);

    useEffect(() => {
        //start
        if (unLoad)
            return;
        callApiTracking(group, false);
    }, [timeFrom]);


    useEffect(() => {
        removeEmptyChange(removeEmtpy);
    }, [removeEmtpy]);

    const callApiTracking = (groupValue: ListingGroup, haveDuration: boolean) => {
        const timeEnd = Date.now();
        const durationTime = haveDuration ? timeEnd - timeFrom : 0;
        (async () => {
            await salePipeLineTracking({
                trackingType: TrackingType.PAGE,
                fromTime: String(timeFrom),
                duration: durationTime,
                viewType: groupValue.groupBy,
                viewTimeType: groupValue.timeGroupby,
            });
            if (durationTime > 0) {
                setTimeFrom(Date.now())
            }
        })();
    }

    return (
        <div className="grouping-container">
            <div className="view-group">
                <p>Xem deal theo</p>
                <select name="viewDeal" className="group-select" onChange={e => (setOldGroup({ ...group }), setGroup({ ...group, groupBy: e.target.value as GroupBy }))}>
                    {groupBy.map(i => <option value={i.value}>{i.text}</option>)}
                </select>
            </div>
            <div className="view-group">
                <p>và thời gian theo</p>
                <select name="viewTime" className="group-select" onChange={e => (setOldGroup({ ...group }), setGroup({ ...group, timeGroupby: e.target.value as TimeGroupBy }))}>
                    {timeGroupby.map(i => <option value={i.value}>{i.text}</option>)}
                </select>
            </div>
            <div className="view-group">
                <input
                    type="checkbox"
                    className="check-box"
                    defaultChecked={removeEmtpy}
                    onChange={() => setRemoveEmpty(!removeEmtpy)}
                />
                <p>Chỉ hiển thị thời gian có dữ liệu</p>
            </div>
        </div>);
};

export default memo(Grouping);
