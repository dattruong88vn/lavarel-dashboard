import React, { useState, useEffect, useRef } from "react";
import { DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import moment from 'moment';
import { endOfDay, startOfDay, startOfMonth, endOfMonth, addMonths, isSameDay, addDays } from "date-fns";
import TriggerClickOutside from "../TriggerClickOutside";
import vi from 'date-fns/locale/vi'

const defineds = {
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
    startThreeMonthAgo: startOfMonth(addMonths(new Date(), -3)),
    startNextMonth: startOfMonth(addMonths(new Date(), 1)),
    endOfNextMonth: endOfMonth(addMonths(new Date(), 1)),
    endOfNextThreeMonth: endOfMonth(addMonths(new Date(), 3)),
    startOfToday: startOfDay(new Date()),
    endOfToday: endOfDay(new Date()),
};

const createDateRangeLabel = (from: Date, to: Date | null) => {
    if (to) {
        return `${moment(from).format('DD/MM/YYYY')} - ${moment(to).format('DD/MM/YYYY')}`;
    }
    return null;
}

type CustomDateRangePickerProps = {
    hasQuickRange: boolean,
    fromDate: Date,
    toDate: Date | null,
    name: string,
    onChange: (data: any, name: string) => void
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = (props) => {
    const [showPicker, setShowPicker] = useState(false);
    const [dateRange, setDateRange] = useState<any>(null);
    const [dateState, setDateState] = useState<any>(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        setDateRange(createDateRangeLabel(props.fromDate, props.toDate));
        if (props.hasQuickRange) {
            setDateState(
                props.toDate ?
                    [{
                        startDate: props.fromDate,
                        endDate: props.toDate,
                    }]
                    :
                    [{
                        startDate: props.fromDate,
                    }]
            )
            return;
        }
        setDateState(
            props.toDate ? [{
                startDate: props.fromDate,
                endDate: props.toDate
            }] : [{
                startDate: props.fromDate
            }]
        )
    }, [props.fromDate, props.toDate]);

    const createStaticRangesCustom = (ranges: any[]) => {
        return ranges.map((range: any) => ({
            isSelected(dateState: any) {
                const definedRange = this.range();
                return (
                    isSameDay(dateState?.startDate, definedRange.startDate) &&
                    isSameDay(dateState?.endDate, definedRange.endDate)
                );
            },
            ...range,
        }));
    };

    const staticRanges = createStaticRangesCustom([
        {
            label: "Hôm nay",
            range: () => ({
                startDate: defineds.startOfToday,
                endDate: defineds.endOfToday,
            }),
        },
        {
            label: "3 tháng trước",
            range: () => ({
                startDate: defineds.startThreeMonthAgo,
                endDate: defineds.endOfLastMonth,
            }),
        },
        {
            label: "Tháng trước",
            range: () => ({
                startDate: defineds.startOfLastMonth,
                endDate: defineds.endOfLastMonth,
            }),
        },
        {
            label: "Tháng hiện tại",
            range: () => ({
                startDate: defineds.startOfMonth,
                endDate: defineds.endOfMonth,
            }),
        },
        {
            label: "Tháng tới",
            range: () => ({
                startDate: defineds.startNextMonth,
                endDate: defineds.endOfNextMonth,
            }),
        },
        {
            label: "3 Tháng tới",
            range: () => ({
                startDate: defineds.startNextMonth,
                endDate: defineds.endOfNextThreeMonth,
            }),
        },
    ]);

    const onShow = () => {
        setShowPicker(!showPicker);
    };

    const onClickOutside = () => {
        setShowPicker(false);
    };

    TriggerClickOutside(wrapperRef, onClickOutside);

    const handleDateQuickRangeChange = (item: any) => {
        setDateState([{ ...dateState, ...item.range1 }]);
        setDateRange(createDateRangeLabel(item.range1.startDate.getTime(), item.range1.endDate.getTime()));
        props.onChange(item, props.name);
    };

    const handleDateChange = (item: any) => {
        setDateState([item.range1]);
        setDateRange(createDateRangeLabel(item.range1.startDate.getTime(), item.range1.endDate.getTime()));
        props.onChange(item, props.name);
    };

    return (
        <div className="custom-date-range-picker" ref={wrapperRef}>
            <div className="date-range-wrap" onClick={onShow}>
                <div className="date-range">{dateRange}</div>
                <div className="input-group-addon">
                    <i className="fa fa-calendar"></i>
                </div>
            </div>
            {showPicker &&
                <div className="picker">
                    {props.hasQuickRange ?
                        <div className="div-flex-column">
                            <DateRangePicker
                                onChange={handleDateQuickRangeChange}
                                ranges={dateState}
                                staticRanges={staticRanges}
                                locale={vi}
                                dateDisplayFormat="dd MMM yyyy"
                                inputRanges={[]}
                            />
                            <div className="apply-button-view">
                                <button className="btn btn-primary" onClick={onClickOutside}>Áp dụng</button>
                            </div>
                        </div>
                        : <div className="div-flex-column">
                            <DateRange
                                editableDateInputs={true}
                                onChange={handleDateChange}
                                moveRangeOnFirstSelection={false}
                                ranges={dateState}
                                locale={vi}
                                dateDisplayFormat="dd MMM yyyy"
                            />
                            <div className="apply-button-view">
                                <button className="btn btn-primary" onClick={onClickOutside}>Áp dụng</button>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default CustomDateRangePicker;
