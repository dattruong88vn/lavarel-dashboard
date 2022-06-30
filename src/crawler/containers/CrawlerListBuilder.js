import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CrawlerFilterBuilder from '../containers/CrawlerFilterBuilder';
import CrawlerModalBuilder from '../containers/CrawlerModalBuilder';
import CrawlerData from '../components/CrawlerData';
import Pagination from '../../commonComponents/pagination/Pagination';
import BackdropLoading from '../components/BackdropLoading';
import NotificationMessage from '../../commonComponents/notifications/NotificationMessage';
import { NumberInputUtil } from '../../utils/CommonUtils';

class CrawlerListBuilder extends Component {
    state = {
        itemSelected: {},
        tabFocus: null,
        filter: [
            {columnName: 'isFormat', value: true},
            {columnName: 'statusId', value: 'array:1,2'},
            {columnName: 'ownerTypeId', value: 1}
        ],
        isCheckAll: false
    }

    mappingFilterData = tab => {
        let response, isCheckAll = false;
        const filter = [...this.state.filter];
        const {activeTab, dataFields, selectOptions, services} = this.props;

        if (dataFields.statusId.value) {
            if (dataFields.statusId.value === '1') {
                isCheckAll = true;
            }
            if (tab === '-1') {
                if (dataFields.statusId.value === '1' || dataFields.statusId.value === '2') {
                    services.onSetCrawlerData({list: [], totalPages: null, totalItems: null});
                    if (tab !== activeTab) {
                        services.onChange(tab, '_TAB');
                    }
                    return;
                }
            }
            filter.push({columnName: 'statusId', value: parseInt(dataFields.statusId.value)});
        }

        ['siteId', 'listingTypeId', 'propertyTypeId', 'wardId', 
        'streetId', 'isDuplicate', 'legal', 'images', 'reasonId'].forEach(key => {
            if(dataFields[key].value) {
                filter.push({columnName: key, value: parseInt(dataFields[key].value)});
            }
        });

        if (dataFields.dateFrom.value || dataFields.dateTo.value) {
            const dateFrom = dataFields.dateFrom.value ? `date:${new Date(dataFields.dateFrom.value).getTime()}` : 'date:0';
            const dateTo = dataFields.dateTo.value ? `date:${new Date(dataFields.dateTo.value).getTime() + 86399000}` : ''; // 86399000 tương đương 23h59'59s => cuối ngày
            filter.push({columnName: 'createdDate', value: `${dateFrom}-${dateTo}`});
        }

        if (dataFields.priceFrom.value || dataFields.priceTo.value) {
            const priceFrom = (NumberInputUtil.removeThoundsand(dataFields.priceFrom.value) || 0) * 1000000;
            const priceTo = (NumberInputUtil.removeThoundsand(dataFields.priceTo.value) || 0) * 1000000;
            filter.push({columnName: 'price', value: `${priceFrom}-${priceTo}`});
        }

        if (dataFields.districtId.value) {
            filter.push({columnName: 'districtId', value: `array:${dataFields.districtId.value}`});
        } else {
            const districtIds = selectOptions.districtOptions.filter(i => i.value).map(i => i.value);
            filter.push({columnName: 'districtId', value: `array:${districtIds.join()}`});
        }

        if (dataFields.phones.value) {
            filter.push({columnName: 'phones', value: [dataFields.phones.value]});
        }

        if(dataFields.address.value) {
            filter.push({columnName: 'address', value: `like:${dataFields.address.value}`});
        }

        if(dataFields.email.value) {
            filter.push({columnName: 'email', value: `like:${dataFields.email.value}`});
        }
        this.setState({isCheckAll});
        services.onSetDataPost(filter, res => {
            response = res;
        });
        services.onGetCrawlerList({page: 1, limit: 20}, response.dataPost, tab, activeTab);
    }

    mappingFilterTab = tab => {
        let filter;
        switch(tab) {
            case '0': 
                filter = [
                    {columnName: 'isFormat', value: true},
                    {columnName: 'statusId', value: 'array:1,2'}
                ];
                break;
            case '-1':
                filter = [
                    {columnName: 'isFormat', value: true},
                    {columnName: 'statusId', value: 3}
                ];
                break;
            default:
                filter = [
                    {columnName: 'isFormat', value: true},
                    {columnName: 'statusId', value: 'array:1,2'},
                    {columnName: 'ownerTypeId', value: parseInt(tab)}
                ];    
                break;    
        }
        this.setState({filter}, () => {
            this.mappingFilterData(tab);
        })
    }

    changePagination = page => {
        const {dataPost, services} = this.props;
        const pagination = {page, limit: 20};
        services.onGetCrawlerList(pagination, dataPost);
    }

    showModalTransfer = itemSelected => {
        this.setState({itemSelected}, () => {
            this.props.services.onShowModal('modalTransfer', true);
        })
    }

    showModalCancel = (ids = [], isCancelOne = false) => {
        const {services} = this.props;
        if(ids.length === 0) {
            services.onShowNotification(true, {type: 'failed', message: 'Vui lòng chọn tin để hủy'});
            return;
        } 
        if(isCancelOne) {
            services.onIdSelected(ids);
        }
        services.onShowModal('modalCancel', true);   
    }

    showModalDuplicate = (itemSelected, tabFocus) => {
        this.setState({itemSelected, tabFocus}, () => {
            this.props.services.onShowModal('modalDuplicate', true);
        });
    }

    showModalMove = (ids = [], isMoveOne = false) => {
        const {services} = this.props;
        if(ids.length === 0) {
            services.onShowNotification(true, {type: 'failed', message: 'Vui lòng chọn tin để chuyển'});
            return;
        } 
        if(isMoveOne) {
            services.onIdSelected(ids);
        }
        services.onShowModal('modalMove', true);
    }

    closeNotification = () => {
        const {services} = this.props;
        services.onShowNotification(false);
    }

    render() {
        const {crawlerData, selectOptions, activeTab, totalPages, totalItems, pagination, dataPost,
               loading, idsSelected, isNotification, notification, services
        } = this.props;
        return (
            <Fragment>
                {loading && <BackdropLoading />}   
                {isNotification &&
                    <NotificationMessage
                        duration={3000}
                        data={notification}
                        handleClose={this.closeNotification} />}  
                <CrawlerFilterBuilder 
                    mappingFilterData={this.mappingFilterData} />        
                <CrawlerData
                    dataPost={dataPost}
                    selectOptions={selectOptions}
                    isCheckAll={this.state.isCheckAll}
                    crawlerData={crawlerData}
                    activeTab={activeTab}
                    mappingFilterTab={this.mappingFilterTab}
                    showModalTransfer={this.showModalTransfer}
                    showModalCancel={this.showModalCancel}
                    showModalDuplicate={this.showModalDuplicate}
                    showModalMove={this.showModalMove}
                    idsSelected={idsSelected}
                    services={services}
                    onSortingChange={() => this.changePagination(1)} />
                <Pagination
                    pagination={pagination}
                    totalItems={totalItems}
                    onClickHandle={this.changePagination}
                    maxPage={totalPages} />
                <CrawlerModalBuilder 
                    itemSelected={this.state.itemSelected}
                    tabFocus={this.state.tabFocus} />    
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    const {selectOptions, dataPost, dataFields} = state.CrawlerFilter;
    const {crawlerData, idsSelected, activeTab, totalItems, 
           totalPages, pagination, loading, isNotification, notification} = state.CrawlerData;
    return {
        selectOptions, dataPost, dataFields,
        crawlerData, idsSelected, activeTab, totalItems, 
        totalPages, pagination, loading, isNotification, notification
    };
};

const mapDispatchToProps = dispatch => {
    return {
        services: {
            onGetCrawlerList: (pagination, dataPost, clickedTabId = null, activeTab = null) => {
                dispatch(actions.getCrawlerList(pagination, dataPost, clickedTabId, activeTab));
            },
            onSetCrawlerData: data => {
                dispatch(actions.setCrawlerData(data));
            },
            onSetDataPost: (filter, callback = null) => {
                dispatch(actions.setDataPost(filter, callback));
            },
            onChange: (data, prefix = '') => {
                dispatch(actions.change(data, prefix));
            },
            onShowModal: (field, boolean) => {
                dispatch(actions.showModal(field, boolean));
            },
            onShowNotification: (boolean, notification = null) => {
                dispatch(actions.showNotification(boolean, notification));
            },
            onIdSelected: (ids = []) => {
                dispatch(actions.onIdSelected(ids));
            },
            onSortingChange: (data, callback = null) => {
                dispatch(actions.setSorting(data, callback));
            }
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CrawlerListBuilder);