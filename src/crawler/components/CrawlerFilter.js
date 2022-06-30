import React, { Fragment } from 'react';
import Input from '../../commonComponents/form/Input';
import CustomSelect from '../../commonComponents/form/CustomSelect';
import NumberFormat from 'react-number-format';

const CrawlerFilter = props => {
    const {activeTab, selectOptions, dataFields, changedSelect, changeInput, mappingFilterData, services} = props;
    const {siteOptions, listingTypeOptions, propertyOptions, statusOptions, districtOptions,
        wardOptions, streetOptions, duplicateOptions, legalOptions, imageOptions, reasonOptions
    } = selectOptions;

    const {dateFrom, dateTo, priceFrom, priceTo, address, phones, email, siteId, listingTypeId,
        propertyTypeId, statusId, districtId, wardId, streetId, isDuplicate, legal, images, reasonId
    } = dataFields;

    const isDisabledReasonSelect = statusId.value === '3' ? false : true;

    return (
        <Fragment>
            <h3 className="box-title" style={{marginTop: '0'}}>Lọc dữ liệu</h3>
            <div className="row">
                <div className="col-xs-12">
                    <div className="box box-info">
                        <div className="box-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row form-group">
                                        <div className="col-md-3">
                                            <Input
                                                type="date"
                                                name="dateFrom"
                                                value={dateFrom.value}
                                                changed={changeInput} />
                                        </div>
                                        <div className="col-md-3">
                                            <Input
                                                type="date"
                                                name="dateTo"
                                                value={dateTo.value}
                                                changed={changeInput} />
                                        </div>
                                        <div className="col-md-3">
                                            <NumberFormat decimalScale="-1" maxLength="15" thousandSeparator="," decimalSeparator="." className="form-control" name="priceFrom" onChange={changeInput} value={priceFrom.value} placeholder="Giá từ (Triệu)" />
                                        </div>
                                        <div className="col-md-3">
                                            <NumberFormat decimalScale="-1" maxLength="15" thousandSeparator="," decimalSeparator="." className="form-control" name="priceTo" onChange={changeInput} value={priceTo.value} placeholder="Giá đến (Triệu)" />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-md-3">
                                            <CustomSelect
                                                name="siteId"
                                                options={siteOptions}
                                                value={siteId}
                                                changed={changedSelect} />
                                        </div>
                                        <div className="col-md-3">
                                            <CustomSelect
                                                name="listingTypeId"
                                                options={listingTypeOptions}
                                                value={listingTypeId}
                                                changed={changedSelect} />
                                        </div>
                                        <div className="col-md-3">
                                            <CustomSelect
                                                name="propertyTypeId"
                                                options={propertyOptions}
                                                value={propertyTypeId}
                                                changed={changedSelect} />
                                        </div>
                                        <div className="col-md-3">
                                            <CustomSelect
                                                name="statusId"
                                                options={statusOptions}
                                                value={statusId}
                                                changed={changedSelect} />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-md-3">
                                            <CustomSelect
                                                name="districtId"
                                                options={districtOptions}
                                                value={districtId}
                                                changed={changedSelect} />
                                        </div>
                                        <div className="col-md-3">
                                            <CustomSelect
                                                name="wardId"
                                                options={wardOptions}
                                                value={wardId}
                                                changed={changedSelect} />
                                        </div>
                                        <div className="col-md-3">
                                            <CustomSelect
                                                name="streetId"
                                                options={streetOptions}
                                                value={streetId}
                                                changed={changedSelect} />
                                        </div>
                                        <div className="col-md-3">
                                            <Input
                                                type="text"
                                                name="address"
                                                placeholder="Nhập địa chỉ"
                                                value={address.value}
                                                changed={changeInput} />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-md-3">
                                            <Input
                                                type="text"
                                                name="phones"
                                                placeholder="Số điện thoại"
                                                value={phones.value}
                                                changed={changeInput} />
                                        </div>
                                        <div className="col-md-3">
                                            <Input
                                                type="text"
                                                name="email"
                                                placeholder="Email"
                                                value={email.value}
                                                changed={changeInput} />
                                        </div>
                                        <div className="col-md-3">
                                            <CustomSelect
                                                name="isDuplicate"
                                                options={duplicateOptions}
                                                value={isDuplicate}
                                                changed={changedSelect} />
                                        </div>
                                        <div className="col-md-3">
                                            <CustomSelect
                                                name="legal"
                                                options={legalOptions}
                                                value={legal}
                                                changed={changedSelect} />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-md-3">
                                            <CustomSelect
                                                name="images"
                                                options={imageOptions}
                                                value={images}
                                                changed={changedSelect} />
                                        </div>
                                        <div className="col-md-3">
                                            <CustomSelect
                                                name="reasonId"
                                                options={reasonOptions}
                                                isDisabled={isDisabledReasonSelect}
                                                value={reasonId}
                                                changed={changedSelect} />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-md-12 text-right">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                style={{marginRight: '10px'}}
                                                onClick={() => mappingFilterData(activeTab)} >Lọc dữ liệu</button>
                                            <button
                                                type="button"
                                                className="btn btn-default"
                                                onClick={services.onResetFilterForm}>Xóa</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CrawlerFilter;