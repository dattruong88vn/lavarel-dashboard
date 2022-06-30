import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { getWardList, getPropertyListV2 } from 'api/list/listApi';
import { IsDisabled, Option, FormMatrix, defaultFormMatrix } from 'utils/form';
import { formatOptionLabel, handleConvertOptions } from 'utils/func';

const transactionList = [
    { label: 'Bán', value: 1 },
    { label: 'Thuê', value: 2 }
];

type ExpandMatrixFilterProp = {
    districtList: Option[];
    classificationList: Option[];
    postList: Option[];
    applyFilter: Function;
};

const ShortcutMatrixFilter: React.FC<ExpandMatrixFilterProp> = (props) => {
    const [isShowed, setIsShowed] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<IsDisabled>(new IsDisabled());
    const [wardList, setWardList] = useState<Array<Option>>([]);
    const [propertyList, setPropertyList] = useState<Array<Option>>([]);

    const [formMatrix, setFormMatrix] = useState<any>(defaultFormMatrix);

    const classShow = isShowed ? 'show' : '';

    const handleApply = (): void => {
        let filter = formMatrix;
        props.applyFilter(filter);
        setIsShowed(false);
    }
    
    const resetFilter = () :void => {
        setFormMatrix(defaultFormMatrix);
    }
    
    const onClickBtn = (): void => {
        setIsShowed(!isShowed);
    };

    const onChangeInput = (value: any, key: string): void => {
        const state = {...formMatrix};
        state[key] = value;
        setFormMatrix(state);
    };

    const onChangeSelect = (e: any, type: keyof FormMatrix): void => {
        const state = {...formMatrix};
        let data = defaultFormMatrix[type];
        if (e) {
            data = e;
        }
        state[type] = data;
        setFormMatrix(state);
    };

    useEffect(() => {
        const state = {...formMatrix, ward: {...defaultFormMatrix.ward}};
        setFormMatrix(state);
        (async () => {
            const param = formMatrix.district.value ? formMatrix.district.value : '-1';
            const wardList = await getWardList(param);
            setWardList(handleConvertOptions(wardList.data, 'ward'));
        })();
    }, [formMatrix.district]);

    useEffect(() => {
        const state = {...formMatrix, property: [...defaultFormMatrix.property]};
        setFormMatrix(state);
        if(formMatrix.transaction.value) {
            setIsDisabled({...isDisabled, property: false});
            (async () => {
                const response = await getPropertyListV2(formMatrix.transaction.value);
                const propertyList = response.data;
                setPropertyList(handleConvertOptions(propertyList, 'property_prefix'));
            })();
            return;
        }
        setIsDisabled({...isDisabled, property: true});
    }, [formMatrix.transaction])

    return (
        <div className="col-md-12 filter">
            <button className="btn btn-default" onClick={onClickBtn}>
                <i className="fa fa-filter" aria-hidden="true"></i>
                <span>Lọc</span>
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
            </button>
            <div className={`filter-content ${classShow}`}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="id: 1001, 1002" value={formMatrix.id}
                                    onChange={e => onChangeInput(e.target.value, 'id')} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group input-group custom-datepicker">
                            <DatePicker
                                dateFormat='dd/MM/yyyy'
                                placeholderText="Từ"
                                selected={formMatrix.bpoCloseGradeDateFrom} 
                                onChange={date => onChangeInput(date, 'bpoCloseGradeDateFrom')} />
                            <div className="input-group-addon">
                                <i className="fa fa-calendar"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group input-group custom-datepicker">
                            <DatePicker
                                dateFormat='dd/MM/yyyy'
                                placeholderText="Đến" 
                                selected={formMatrix.bpoCloseGradeDateTo} 
                                onChange={date => onChangeInput(date, 'bpoCloseGradeDateTo')} />
                            <div className="input-group-addon">
                                <i className="fa fa-calendar"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                placeholder="Tất cả loại giao dịch"
                                options={transactionList}
                                value={formMatrix.transaction}
                                onChange={e => onChangeSelect(e, 'transaction')} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select
                                isMulti
                                placeholder="Tất cả loại hình bđs"
                                isDisabled={isDisabled.property}
                                options={propertyList}
                                formatOptionLabel={formatOptionLabel}
                                value={formMatrix.property}
                                onChange={e => onChangeSelect(e, 'property')} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                options={props.districtList}
                                value={formMatrix.district}
                                onChange={e => onChangeSelect(e, 'district')} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                options={wardList}
                                value={formMatrix.ward}
                                onChange={e => onChangeSelect(e, 'ward')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                options={props.classificationList}
                                value={formMatrix.classification}
                                onChange={e => onChangeSelect(e, 'classification')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                options={props.postList}
                                value={formMatrix.post}
                                onChange={e => onChangeSelect(e, 'post')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group group-btn">
                            <button type="button" className="btn btn-default" onClick={resetFilter}>Xóa bộ lọc</button>
                            <button type="button" className="btn btn-success" onClick={e => handleApply()}>Áp dụng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShortcutMatrixFilter;