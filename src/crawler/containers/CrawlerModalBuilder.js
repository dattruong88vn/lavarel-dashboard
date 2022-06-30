import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ModalTransfer from '../components/ModalTransfer';
import ModalCancel from '../components/ModalCancel';
import ModalDuplicate from '../components/ModalDuplicate';
import ModalMove from '../components/ModalMove';

class CrawlerModalBuilder extends Component {

    checkFocusPagination = (numberCrawler) => { // số number crawler sau khi transfer, cancel, move có status không trùng với status filter hiện tại
        const {pagination, totalItems} = this.props;
        const totalPagesAfter = Math.ceil((totalItems - numberCrawler) / pagination.limit);

        if (totalPagesAfter >= pagination.page) {
            return pagination;
        }

        return {page: totalPagesAfter, limit: pagination.limit};
    }

    render() {
        const {
            isShowModal, selectOptions, dataFields, dataPost, activeTab,
            idsSelected, itemSelected, tabFocus, crawlerData, services
        } = this.props;
        return (
            <>
                {isShowModal.modalTransfer &&
                    <ModalTransfer
                        dataFields={dataFields}
                        dataPost={dataPost}
                        itemSelected={itemSelected}
                        checkFocusPagination={this.checkFocusPagination}
                        services={services} />}
                {isShowModal.modalCancel &&
                    <ModalCancel
                        selectOptions={selectOptions}
                        dataFields={dataFields}
                        dataPost={dataPost}
                        idsSelected={idsSelected}
                        checkFocusPagination={this.checkFocusPagination}
                        services={services} /> }
                {isShowModal.modalMove && 
                    <ModalMove 
                        crawlerData={crawlerData}
                        activeTab={activeTab}
                        dataPost={dataPost}
                        idsSelected={idsSelected}
                        selectOptions={selectOptions}
                        checkFocusPagination={this.checkFocusPagination}
                        services={services} />}        
                {isShowModal.modalDuplicate && 
                    <ModalDuplicate 
                        itemSelected={itemSelected}
                        tabFocus={tabFocus}
                        services={services}/> }        
            </>           
        )
    }
}

const mapStateToProps = state => {
    const {dataFields, dataPost, selectOptions} = state.CrawlerFilter;
    const {crawlerData, idsSelected, activeTab, totalItems, pagination} = state.CrawlerData;
    const {isShowModal} = state.CrawlerModal;
    return {
        dataFields, dataPost, selectOptions,
        crawlerData, idsSelected, activeTab, totalItems, pagination,
        isShowModal
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
            onShowModal: (field, boolean) => {
                dispatch(actions.showModal(field, boolean));
            },
            onShowNotification: (boolean, notification = null) => {
                dispatch(actions.showNotification(boolean, notification));
            },
            onIdSelected: (ids = []) => {
                dispatch(actions.onIdSelected(ids));
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CrawlerModalBuilder);