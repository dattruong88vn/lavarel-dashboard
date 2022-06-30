import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import axios from 'axios';
import Select from 'react-select';
import { handleConvertOptions } from '../../utils';
import './BPOListingFilter.scss';

const FORMAT_DATE_MOMENT = 'dd/mm/yyyy';
const FOCUS = 'focus';

const defaultForm = {
    district: { label: '--Tất cả các quận--', value: '' },
    ward: { label: '--Tất cả các phường--', value: '' },
    bpo: { label: '--Chọn BPO--', value: '' }
};

const optionsBPO = [
    {value: '', label: '-- Chọn BPO --'},
    {value: 50, label: '>= 4.5 (Bán trong tháng)'},
    {value: 49, label: '< 4.5 (Bán trong 90 ngày)'}
];

const BPOListingFilter = ({filterChange, data}) => {
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const fromRef = useRef(null);
    const toRef = useRef(null);
    const [formData, setFormData] = useState(defaultForm);

    useEffect(() => {
        (async () => {
            const districtList = await axios.get('/common/get-districts/1');
            setDistrictList(handleConvertOptions(districtList.data.data, 'district'));
        })();
    }, []);

    useEffect(() => {
        const state = {...formData, ward: {...defaultForm.ward}};
        setFormData(state);

        const district = !formData.district.value ? '-1' : formData.district.value;

        (async () => {
            const wardList = await axios.get(`/common/get-wards/${district}`);
            setWardList(handleConvertOptions(wardList.data.data, 'ward'));
        })();
    }, [formData.district]);

    const onChangeSelect = (e, type) => {
        const state = {...formData};
        let data = defaultForm[type];
        if (e) {
            data = e;
        }
        state[type] = data;
        setFormData(state);
    };

    const handleSearchFilter = () => {
        let dataPost = {
            districtIds: (formData.district.value).toString(),
            wardIds: (formData.ward.value).toString(),
            labelId: formData.bpo.value, 
            fromDate: fromDate, 
            toDate: toDate
        };
        filterChange && filterChange(dataPost);
    }
    
    useEffect(() => {
        if (data) {
            const $fromDateElement = $(fromRef.current);
            const $toDateElement = $(toRef.current);

            let dataFromDate = data.fromDate ? format(data.fromDate, 'dd/MM/yyyy') : null;
            let dataToDate = data.toDate ? format(data.toDate, 'dd/MM/yyyy') : null;

            $fromDateElement.datepicker({format: 'dd/mm/yyyy'}).datepicker('setDate', dataFromDate);
            $toDateElement.datepicker({format: 'dd/mm/yyyy'}).datepicker('setDate', dataToDate);

            const to = dataToDate ? dataToDate.split('/') : null;
            const toChangeFormat = dataToDate ? `${to[1]}/${to[0]}/${to[2]}` : null;
            setToDate(toChangeFormat);

            const from = dataFromDate ? dataFromDate.split('/') : null;
            const fromChangeFormat = dataFromDate ? `${from[1]}/${from[0]}/${from[2]}` : null;
            setFromDate(fromChangeFormat);

            // on change datetime picker
            $toDateElement.datepicker({format: FORMAT_DATE_MOMENT}).on(FOCUS, e => {
                if (e.target.value) {
                    const to = e.target.value.split('/');
                    const toChangeFormat = `${to[1]}/${to[0]}/${to[2]}`;
                    setToDate(toChangeFormat);
                }
            })
            $fromDateElement.datepicker({format: FORMAT_DATE_MOMENT}).on(FOCUS, e => {
                if (e.target.value) {
                    const from = e.target.value.split('/');
                    const fromChangeFormat = `${from[1]}/${from[0]}/${from[2]}`;
                    setFromDate(fromChangeFormat);
                }
            });
        }
    }, []);

    const handleChangeFromDate = ({target}) => {
        const {value} = target;

        if (value?.length === 0) {
            setFromDate(null);
        }
    };

    const handleChangeToDate = ({target}) => {
        const {value} = target;

        if (value?.length === 0) {
            setToDate(null);
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-sm-4">
                    <div className="form-group">
                        <label htmlFor="fromDateFilter">Từ ngày (Ngày chốt bán)</label>
                        <div className="input-group date" data-provide="datepicker" data-date-format="dd/mm/yyyy">
                            <input
                                type="text"
                                className="form-control"
                                ref={fromRef}
                                id="fromDateFilter"
                                onChange={handleChangeFromDate}
                                name="fromDateFilter"
                                autoComplete="off" placeholder="Từ ngày" />
                            <div className="input-group-addon">
                                <i className="fa fa-calendar"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label htmlFor="toDateFilter">Đến ngày (Ngày chốt bán)</label>
                        <div className="input-group date" data-provide="datepicker" data-date-format="dd/mm/yyyy">
                            <input
                                type="text"
                                className="form-control"
                                id="toDateFilter"
                                name="toDateFilter"
                                onChange={handleChangeToDate}
                                ref={toRef}
                                autoComplete="off" placeholder="Đến ngày"/>
                            <div className="input-group-addon">
                                <i className="fa fa-calendar"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>BPO</label>
                        <Select
                            isClearable={true}
                            options={optionsBPO}
                            value={formData.bpo}
                            onChange={e => onChangeSelect(e, 'bpo')} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>Quận</label>
                        <Select
                            isClearable={true}
                            options={districtList}
                            value={formData.district}
                            onChange={e => onChangeSelect(e, 'district')} />
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>Phường</label>
                        <Select
                            isClearable={true}
                            options={wardList}
                            value={formData.ward}
                            onChange={e => onChangeSelect(e, 'ward')} />
                    </div>
                </div>
                <div className="col-sm-1">
                    <div>&nbsp;</div>
                    <button className="btn btn-warning btn-search" onClick={handleSearchFilter}>Tìm</button>
                </div>
            </div>
        </>
    )
};

BPOListingFilter.propTypes = {
    filterChange: PropTypes.func,
    data: PropTypes.object,
};

BPOListingFilter.defaultProps = {
    filterChange: null,
    data: {}
};

export default BPOListingFilter;
