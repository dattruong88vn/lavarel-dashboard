import React from 'react';
import Row from './Row';
import HttpService from './http';
import CollectedCompletionModal from './CollectedCompletionModal';
import MoneyCollectedModal from './MoneyCollectedModal';
import MoneyCollectedHistoryModal from './MoneyCollectedHistoryModal';
import RecordsUpdateModal from './RecordsUpdateModal';
import Spinner from '../commonComponents/spinner/Spinner';
import uniqid from 'uniqid';
import Pagination from '../commonComponents/pagination/Pagination';

const HEADERS = [
    { id: uniqid(), title: 'Listing ID'},
    { id: uniqid(), title: 'Tên chủ nhà'},
    { id: uniqid(), title: 'Deal ID'},
    { id: uniqid(), title: 'BA'},
    { id: uniqid(), title: 'Tên khách hàng'},
    { id: uniqid(), title: 'Môi giới'},
    { id: uniqid(), title: 'Trạng thái'},
    { id: uniqid(), title: 'Ngày đặt cọc/close'},
    { id: uniqid(), title: 'Giá trị giao dịch'},
    { id: uniqid(), title: 'Doanh thu'},
    { id: uniqid(), title: 'Đã thu'},
    { id: uniqid(), title: 'Ngày thu gần nhất'},
    { id: uniqid(), title: 'Còn lại'},
    { id: uniqid(), title: 'Dự kiến thu'},
    { id: uniqid(), title: 'Hành động'}
]

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            pagination: {
                page: 1,
                limit: 10,
            },
            maxPage: 1,
            searchValue: '',
            list: [],
            collectedCompletionShow: false,
            moneyCollectedShow: false,
            moneyCollectedHistoryShow: false,
            recordsUpdateShow: false,
            deal: null,
            loading: false,
            isNotification: false
        };

        this.handleCollectedMoneySearch = this.handleCollectedMoneySearch.bind(this);
        this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
        this.handleCollectedCompletion = this.handleCollectedCompletion.bind(this);
        this.handleMoneyCollect = this.handleMoneyCollect.bind(this);
        this.handleMoneyCollectedClose = this.handleMoneyCollectedClose.bind(this);
    }

    componentDidMount() {
        /**
         * Get list of commission deal list
         */
        
        this.getCommissionDealList();
    }

    getCommissionDealList = () => {
        const {
            pagination: {
                page,
                limit
            },
            searchValue
        } = this.state;

        this.setState({
            loading: true
        });

        HttpService.getCommissionDealList(page, limit, searchValue).then(res => {
            this.setState({
                loading: false
            });

            const {
                data: {
                    totalItems,
                    data,
                },
                result
            } = res.data;
            if(result) {
                const maxPage = Math.ceil(totalItems/limit);
                this.setState({
                    pagination: {
                        page,
                        limit
                    },
                    maxPage,
                    list: data
                })
            }
        }).catch(_ => {
            this.setState({
                loading: false
            })
        });
    }

    /**
     * Handle search value change event
     * @param event SyntheticEvent
     * Reset current page to 0
     */
    handleSearchValueChange(event) {
        const value = event.target.value;
        this.setState({
            searchValue: value
        });
    }

    /**
     * Handle searching collected money deal list
     */
    handleCollectedMoneySearch() {
        /**
         * Reset current page to 0
         * Get new list of commission deal 
         */

        const  { pagination } = this.state;

        this.setState({
            pagination: {
                ...pagination,
                page: 1
            },
            maxPage: 1
        }, () => {
            this.getCommissionDealList();
        });
    }


    /**
     * Event on clicking next pagination
     * //TODO
     */
    handlePagination = (page) => {

        const { pagination } = this.state;
        
        this.setState({
            pagination: {
                ...pagination,
                page
            }
        }, () => {
            /**
             * Get new list of commission deal
            */
            this.getCommissionDealList();
        });
    }

    /**
     * Handle event on collected completion
     * Update deal
     * Show collected completion modal
     */
    handleCollectedCompletion(deal) {
        this.setState({
            deal,
            collectedCompletionShow: true
        });
    }

    /**
     * Event on click money collect
     * Show up money collect modal
     */
    handleMoneyCollect(deal) {
        this.setState({
            moneyCollectedShow: true,
            deal
        })
    }

    /**
     * Event on close money collect
     */
    handleMoneyCollectedClose = (success) => {
        this.setState({
            moneyCollectedShow: false,
        }, () => {
            // Reload page
            if(success) {
                this.getCommissionDealList();
            }
        })
    }

    /**
     * Handle event on collected completion modal close
     * Update state collectedCompletionShow to false
     */
    handleCollectedCompletionClose = () => {
        this.setState({
            collectedCompletionShow: false
        })
    }

    /**
     * Handle event on closing money collected history modal
     */
    handleMoneyCollectedHistoryClose = () => {
        this.setState({
            moneyCollectedHistoryShow: false
        })
    }

    /**
     * Handle event records update
     * Show Records update modal
     * Update deal state
     */
    handleRecordsUpdate = (deal) => {
        this.setState({
            deal,
            recordsUpdateShow: true
        })
    }

    /**
     * Review money collected history
     * Update new deal state
     * Open collected history modal
     */
    handleMoneyCollectedHistoryReview = (deal) => {
        this.setState({
            deal,
            moneyCollectedHistoryShow: true
        })
    }

    /**
     * Handle event on closing records update modal
     * Update recordsUpdateShow state to false
     */
    handleRecordsUpdateClose = (success) => {
        this.setState({
            recordsUpdateShow: false
        });

        if(success) {
            // Reload to get updated list
            this.getCommissionDealList();
        }
    }

    /**
     * Update success notification and reload page after action complete.
     */

    render() {
        const {
            list,
            deal,
            moneyCollectedShow,
            collectedCompletionShow,
            moneyCollectedHistoryShow,
            recordsUpdateShow,
            loading,
            pagination,
            maxPage
        } = this.state;

        return <>
            <h2>Danh sách deal cần thu tiền</h2>
            <div className="collected-money-search-container">
                <div className="collected-money-search">
                    <input 
                        type="text" 
                        placeholder="Tên BA, DealID, ListingID" 
                        className="collected-money-search-text"
                        onChange={this.handleSearchValueChange}
                    />
                </div>

                <div>
                    <button 
                        className="btn btn-sm btn-primary" 
                        onClick={this.handleCollectedMoneySearch}
                    >Tìm kiếm</button>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        {HEADERS.map(header => (
                            <th key={header.id}>{header.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {list && list.map(deal => 
                        <Row 
                            key={deal.dealFinID} 
                            deal={deal} 
                            onMoneyCollect={this.handleMoneyCollect}
                            onCollectedCompletion={this.handleCollectedCompletion}
                            onMoneyCollectedHistory={this.handleMoneyCollectedHistoryReview}
                            onRecordsUpdate={this.handleRecordsUpdate}
                        />    
                    )}
                </tbody>
            </table>

            <Pagination 
                pagination={pagination}
                maxPage={maxPage}
                onClickHandle={this.handlePagination} 
            />

            {moneyCollectedShow && <MoneyCollectedModal 
                show={moneyCollectedShow} 
                dealFinId={deal.dealFinID}
                handleClose={this.handleMoneyCollectedClose}
            />}

            {collectedCompletionShow && <CollectedCompletionModal 
                show={collectedCompletionShow}
                dealFinId={deal.dealFinID} 
                handleClose={this.handleCollectedCompletionClose}
            />}
            
            {recordsUpdateShow && <RecordsUpdateModal 
                show={recordsUpdateShow}
                dealFinId={deal.dealFinID} 
                handleClose={this.handleRecordsUpdateClose}
            />}

            {moneyCollectedHistoryShow && <MoneyCollectedHistoryModal 
                show={moneyCollectedHistoryShow}
                dealFinId={deal.dealFinID} 
                handleClose={this.handleMoneyCollectedHistoryClose}
            />}

            {loading && <Spinner/>}
            
        </>
    }
}