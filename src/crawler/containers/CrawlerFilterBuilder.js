import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import CrawlerFilter from '../components/CrawlerFilter';
import httpServices from '../utils/http';

const defaultListToGetData = [
    {field: 'listingTypeOptions', define: 'CRAWLER-LTYPE'},
    {field: 'statusOptions', define: 'CRAWLER-STATUS'},
    {field: 'duplicateOptions', define: 'CRAWLER-DUP'},
    {field: 'legalOptions', define: 'CRAWLER-LG'},
    {field: 'imageOptions', define: 'CRAWLER-IMG'},
    {field: 'reasonOptions', define: 'CRAWLER-CANC'},
    {field: 'tabOptions', define: 'CRAWLER-TABS'}
];

class CrawlerFilterBuilder extends Component {
    componentDidMount() {
        const {activeTab, mappingFilterData, services} = this.props;
        httpServices.getSiteList().then(res => {
            if (res.data.result) {
                services.onSetOptionList(res.data.data.list, 'siteOptions');
            }
        });
        defaultListToGetData.forEach(i => {
            httpServices.getDefaultList(i.define).then(res => {
                if (res.data.result) {
                    services.onSetOptionList(res.data.data.list, i.field);
                }
            });
        });
        httpServices.getDistrictList().then(res => {
            if (res.data.result) {
                services.onSetOptionList(res.data.data, 'districtOptions');
                mappingFilterData(activeTab);
            }
        })
    }

    changeSelect = (data, action) => {
        const {services} = this.props;
        services.onChangeSelect(data, action);
        if (action.name === 'listingTypeId') {
            services.onResetSelect('propertyTypeId', 'propertyOptions');
            if (data.value) {
                httpServices.getPropertyList(data.value).then(res => {
                    if (res.data.result) {
                        services.onSetOptionList(res.data.data, 'propertyOptions');
                    }
                });
            }
        }

        if (action.name === 'districtId') {
            services.onResetSelect('wardId', 'wardOptions');
            services.onResetSelect('streetId', 'streetOptions');
            if (data.value) {
                httpServices.getWardList(data.value).then(res => {
                    if (res.data.result) {
                        services.onSetOptionList(res.data.data, 'wardOptions');
                    }
                })
            }
        }

        if (action.name === 'wardId') {
            services.onResetSelect('streetId', 'streetOptions');
            if (data.value) {
                httpServices.getStreetList(data.value).then(res => {
                    if (res.data.result) {
                        services.onSetOptionList(res.data.data, 'streetOptions');
                    }
                });
            }
        }

        if (action.name === 'statusId') {
            services.onResetSelect('reasonId');
        }
    }

    changeInput = () => {
        const {name, value} = event.target;
        const {dataFields, services} = this.props;

        if(name === 'dateTo') {
            if(new Date(value).getTime() < new Date(dataFields.dateFrom.value).getTime()) {
                services.onShowNotification(true, {type: 'failed', message: 'Thời gian không hợp lệ. Vui lòng chọn lại !'});
                return;
            }
        }

        if(name === 'dateFrom') {
            if(new Date(value).getTime() > new Date(dataFields.dateTo.value).getTime()) {
                services.onShowNotification(true, {type: 'failed', message: 'Thời gian không hợp lệ. Vui lòng chọn lại !'});
                return;
            }
        }

        if (name === 'phones') {
            if (/^\d*$/.test(value)) {
                services.onChangeInput({name, value});
            }
            return;
        }
        services.onChangeInput({name, value});
    }

    render() {
        const {selectOptions, dataFields, activeTab, mappingFilterData, services} = this.props;
        return (
            <CrawlerFilter
                activeTab={activeTab}
                selectOptions={selectOptions}
                dataFields={dataFields}
                changedSelect={this.changeSelect}
                changeInput={this.changeInput}
                mappingFilterData={mappingFilterData}
                services={services} />
        );
    }
}

const mapStateToProps = state => {
    const {selectOptions, dataFields} = state.CrawlerFilter;
    const {activeTab} = state.CrawlerData;
    return {selectOptions, dataFields, activeTab};
};

const mapDispatchToProps = dispatch => {
    return {
        services: {
            onSetOptionList: (data, field) => {
                dispatch(actions.setOptionList(data, field));
            },
            onChangeSelect: (data, action) => {
                dispatch(actions.changeSelect(data, action.name));
            },
            onResetSelect: (fieldValue, fieldOptions = null) => {
                dispatch(actions.resetSelect(fieldValue, fieldOptions));
            },
            onChangeInput: (data = {}) => {
                dispatch(actions.changeInput(data));
            },
            onResetFilterForm: () => {
                dispatch(actions.resetFilterForm());
            },
            onShowNotification: (boolean, notification = null) => {
                dispatch(actions.showNotification(boolean, notification));
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CrawlerFilterBuilder);