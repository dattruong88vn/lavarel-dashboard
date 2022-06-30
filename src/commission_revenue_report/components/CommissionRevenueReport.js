import React, { Component } from 'react';
import CommissionRevenueReportSelect from './CommissionRevenueReportSelect';
import uniqid from 'uniqid';
import httpService from './../utils/http';
import CommissionRevenueReportRow from './CommissionRevenueReportRow';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import CommissionBrokerageDetailsModal from './CommissionBrokerageDetailsModal';
import CommissionHistoryReviewModal from './CommissionHistoryReviewModal';
import Spinner from '../../commonComponents/spinner/Spinner';
import Pagination from '../../commonComponents/pagination/Pagination';

const COLUMNS = [
    { id: uniqid(), name: 'ListingID' },
    { id: uniqid(), name: 'Tên chủ nhà' },
    { id: uniqid(), name: 'Deal ID' },
    { id: uniqid(), name: 'Tên NV' },
    { id: uniqid(), name: 'Tên KH' },
    { id: uniqid(), name: 'Giá trị giao dịch' },
    { id: uniqid(), name: 'Loại giao dịch' },
    { id: uniqid(), name: 'Ngày cọc/ Chốt deal' },
    { id: uniqid(), name: 'Doanh thu' },
    { id: uniqid(), name: 'Đã thu' },
    { id: uniqid(), name: 'Ngày thu gần nhất' },
    { id: uniqid(), name: 'Hình thức thu' },
    { id: uniqid(), name: 'Còn lại' },
    { id: uniqid(), name: 'Ngày dự thu' },
    { id: uniqid(), name: 'TPA' },
    { id: uniqid(), name: 'Hoa hồng' },
    { id: uniqid(), name: 'Hồ sơ' },
    { id: uniqid(), name: 'Hành động' }
];

export default class CommissionRevenueReport extends Component {
    _isMounted = false;
 
    constructor(props) {
        super(props);

        this.state = {
            dealFinId: 0,
            dealId: 0,
            reports: [],
            zones: [],
            teams: [],
            dealStatuses: [],
            collectedStatuses: [],
            transactionTypes: [],
            paymentMethods: [],
            showDateRangeOverlay: false,
            showBrokerageDetail: false,
            showHistoryReview: false,
            filter: {
                startDate: new Date(),
                endDate: new Date(),
                zoneID: [],
                teamID: [],
                dealStatusID: [],
                collectedStatusID: [],
                transactionTypeID: [],
                paymentMethodID: [],
                search: ''
            },
            pagination: {
                page: 1,
                limit: 10,
            },
            maxPage: 1,
            isLoading: false
        }
    }

    componentDidMount() {
        this._isMounted = true;

        // Get list of zones, teams, and dealStatus
        httpService.getAll().then(res => {
            if(this._isMounted) {
                this.setState({
                    zones: res[0].data.data.map(zone => ({
                        value: zone.departmentId,
                        label: zone.departmentName
                    })),
                    teams: res[1].data.data.map(team => ({
                        value: team.departmentId,
                        label: team.departmentName
                    })),
                    dealStatuses: res[2].data.data.map(status => ({
                        value: status.statusId,
                        label: status.statusName
                    })),
                    collectedStatuses: res[3].data.data,
                    transactionTypes: res[4].data.data,
                    paymentMethods: res[5].data.data
                })
            }
        });
        
        /**
         * Get list of reports
         */
        this.handleRevenueReportSearch();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * Handle event on input change
     * Update state
     * @param {*} name 
     * @param {*} value 
     */
    handleSelectChange = (name, value) => {
        const { 
            filter,
            pagination
        } = this.state;

        this.setState({
            filter: {
                ...filter,
                [name]: value
            },
            pagination: {
                ...pagination,
                page: 1
            },
        }, () => {
            this.handleRevenueReportSearch();

            // Change teams according to zone
            if(name === 'zoneID') {
                // Get new list of team
                const { zoneID } = this.state.filter;
                const zoneIDs = zoneID ? zoneID.map(zone => zone.value) : [];

                httpService.getTeams(zoneIDs).then(res => {
                    const {
                        result,
                        data
                    } = res.data;

                    if(result && this._isMounted) {
                        // Update new teams
                        this.setState({
                            teams: data.map(team => ({
                                label: team.departmentName,
                                value: team.departmentId
                            }))
                        })
                    }
                })
            }
        })
    }

    getCommonDataPost = () => {
        const { 
            filter: {
                startDate,
                endDate,
                zoneID,
                teamID,
                dealStatusID,
                collectedStatusID,
                transactionTypeID,
                paymentMethodID,
                search: searchText,
            }
        } = this.state;
    
        const fromDate = startDate.getTime();
        const toDate = endDate.getTime();
        const zoneIds = zoneID && zoneID.map(zone => zone.value);
        const teamIds = teamID && teamID.map(team => team.value);
        const dealStatusIds = dealStatusID && dealStatusID.map(status => status.value);
        const listingTypeIds = transactionTypeID && transactionTypeID.map(transaction => transaction.value);
        const collectTypeIds = paymentMethodID && paymentMethodID.map(payment => payment.value);
        const isCollectEnoughs = collectedStatusID && collectedStatusID.map(collected => collected.value);

        return ({
            fromDate,
            toDate,
            zoneIds,
            teamIds,
            dealStatusIds,
            listingTypeIds,
            collectTypeIds,
            isCollectEnoughs,
            searchText
        })
    }

    /**
     * Handle event on revenue report search
     */
    handleRevenueReportSearch = () => {
       
        const commonDataPost = this.getCommonDataPost();

        const {
            page,
            limit
        } = this.state.pagination;

        // Spinner
        this.setState({
            isLoading: true
        });

        httpService.getRevenueReports({
            ...commonDataPost,
            page,
            limit
        }).then(res => {
            // Set loading false
            this.setState({
                isLoading: false
            });

            const {
                result,
                data: {
                    totalPages,
                    list
                }
            } = res.data;

            if(this._isMounted && result) {

                this.setState({
                    reports: list,
                    pagination: {
                        page,
                        limit
                    },
                    maxPage: totalPages
                })
            }
        }).catch(err => {
            // Set loading false
            this.setState({
                isLoading: false
            });
        });
    }

    /**
     * Handle event on reviewing brokerage commission details
     */
    handleBrokerageReview = (dealId) => {
        // Update dealId state then open brokerage commission details modal
        this.setState({
            dealId
        }, () => {
            this.setState({
                showBrokerageDetail: true
            })
        })
    }

    /**
     * Close brokerage details modal
     */
    handleCloseBrokerageDetailsModal = () => {
        this.setState({
            showBrokerageDetail: false
        })
    }

    /**
     * Handle event on reviewing revenue report history
     */
    handleHistoryReview = (dealFinId) => {
        // Update dealFinId state
        this.setState({
            dealFinId
        }, () => {
            // Show history review modal
            this.setState({
                showHistoryReview: true
            })
        })
    }

    /**
     * Handle event on closing commission history modal
     */
    handleCloseCommissionHistoryReviewModal = () => {
        this.setState({
            showHistoryReview: false
        })
    }

    /**
     * Handle event on clicking pagination
     */
    handlePagination = (page) => {
        const { pagination } = this.state;

        if(page) {
            this.setState({
                pagination: { ...pagination, page }
            }, () => {
                this.handleRevenueReportSearch();
            })
        }
    }

    /**
     * Handle event on select date range
     */
    handleSelectDaterange = (e) => {
        const { filter } = this.state;
        this.setState({
            filter: {
                ...filter,
                startDate: new Date(e.selection.startDate.getFullYear() + '/' + (e.selection.startDate.getMonth() + 1) + '/' + e.selection.startDate.getDate() + ' 00:00:00'),
                endDate: new Date(e.selection.endDate.getFullYear() + '/' + (e.selection.endDate.getMonth() + 1) + '/' + e.selection.endDate.getDate() + ' 23:59:59'),
            }
        })
    }

    /**
     * Handle event on toggling date range picker overlay
     */
    handleToggleDateRangeOverlay = () => {
        const { showDateRangeOverlay } = this.state;
        this.setState({
            showDateRangeOverlay: !showDateRangeOverlay
        })
    }

    /**
     * Handle event on clicking close date range picker button
     * Close the date range picker overlay
     * Filter revenue reports
     */
    handleCloseDateRangePicker = () => {
        const { pagination } = this.state;
        this.setState({
            showDateRangeOverlay: false,
            pagination: {
                ...pagination,
                page: 1,
            }
        }, () => {
            this.handleRevenueReportSearch();
        })
    }

    /**
     * Export report
     */
    handleExport = () => {
        const commonDataPost = this.getCommonDataPost();

        // Turn on loading spinner
        this.setState({
            isLoading: true
        })

        httpService.exportCommissionReport(commonDataPost).then(res => {

            // Turn off spinner loading
            this.setState({
                isLoading: false
            });

            if(res.data.result) {
                const aEl = document.createElement('a');
                aEl.href = res.data.data.linkFile;
                aEl.setAttribute('download', 'COMMISSION_REPORT');
                aEl.click();
            }
        }).catch(_ => {
            // Turn off spinner loading
            this.setState({
                isLoading: false
            });
        })
    }

    /**
     * Convert date to string
     * @param {} date 
     */

    dateToString = (date) => `${date.getFullYear()}/${+date.getMonth() + 1}/${date.getDate()}`;

    render() {

        const {
            dealFinId,
            dealId,
            reports,
            zones,
            teams,
            transactionTypes,
            dealStatuses,
            collectedStatuses,
            paymentMethods,
            showDateRangeOverlay,
            showBrokerageDetail,
            showHistoryReview,
            filter: {
                startDate,
                endDate,
                search,
                zoneID,
                teamID,
                dealStatusID,
                collectedStatusID,
                transactionTypeID,
                paymentMethodID,
            },
            pagination,
            maxPage,
            isLoading
        } = this.state;

        const selectionRange = {
            startDate: startDate,
            endDate: endDate,
            key: 'selection',
        }

        const sD = this.dateToString(startDate);
        const eD = this.dateToString(endDate);

        return (
            <>
                <div className="row report-revenue-row">
                    <h2 className="text-center">Báo cáo doanh thu</h2>
                </div>

                <div className="row report-revenue-row">
                    <div className="col-sm-4">
                        <div className="row form-group">
                            <div className="col-sm-5">
                                <label htmlFor="timeRange">Range time</label>
                            </div>
                            <div className="col-sm-7">
                                <button className="btn" onClick={this.handleToggleDateRangeOverlay}>{sD} - {eD}</button>

                                {showDateRangeOverlay && 
                                <>
                                    <div className="revenue-report-daterange-overlay">
                                        <DateRangePicker
                                            ranges={[selectionRange]}
                                            onChange={this.handleSelectDaterange}
                                        />

                                        <div className="date-range-picker-close-button">
                                            <button className="btn btn-primary" onClick={this.handleCloseDateRangePicker}>Apply</button>
                                        </div>
                                    </div>
                                </>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <input 
                            type="text" 
                            placeholder="dealId, Tên nhân viên"
                            className="revenue-report-search"
                            name="search"
                            value={search}
                            onChange={e => this.handleSelectChange(e.target.name, e.target.value)}
                        />
                    </div>

                    <div className="col-sm-4">
                        <i className="fa fa-file-excel-o text-success revenue-report-excel-icon" onClick={this.handleExport}></i>
                    </div>
                </div>

                <div className="row report-revenue-row">
                    <CommissionRevenueReportSelect
                        constainer="col-sm-4"
                        id="zone"
                        label="Zone"
                        name="zoneID"
                        options={zones}
                        selectedOption={zoneID}
                        isMulti={true}
                        onChange={this.handleSelectChange}
                    />

                   <CommissionRevenueReportSelect
                        constainer="col-sm-4"
                        id="team"
                        label="Team"
                        name="teamID"
                        options={teams}
                        selectedOption={teamID}
                        isMulti={true}
                        onChange={this.handleSelectChange}
                    />

                    <CommissionRevenueReportSelect
                        constainer="col-sm-4"
                        id="transactionTypes"
                        label="Loại giao dịch"
                        name="transactionTypeID"
                        options={transactionTypes}
                        selectedOption={transactionTypeID}
                        isMulti={true}
                        onChange={this.handleSelectChange}
                    />
                </div>

                <div className="row report-revenue-row">
                    <CommissionRevenueReportSelect
                        constainer="col-sm-4"
                        id="dealStatus"
                        label="Trạng thái deal"
                        name="dealStatusID"
                        options={dealStatuses}
                        selectedOption={dealStatusID}
                        isMulti={true}
                        onChange={this.handleSelectChange}
                    />

                    <CommissionRevenueReportSelect
                        constainer="col-sm-4"
                        id="collectedStatus"
                        label="Tình trạng thu tiền"
                        name="collectedStatusID"
                        options={collectedStatuses}
                        selectedOption={collectedStatusID}
                        isMulti={true}
                        onChange={this.handleSelectChange}
                    />

                    <CommissionRevenueReportSelect
                        constainer="col-sm-4"
                        id="paymentMethods"
                        label="Loại thanh toán"
                        name="paymentMethodID"
                        options={paymentMethods}
                        selectedOption={paymentMethodID}
                        isMulti={true}
                        onChange={this.handleSelectChange}
                    />
                </div>
           

                <table className="table">
                    <thead>
                        <tr>
                            {COLUMNS.map(column => <th key={column.id}>{column.name}</th>)}
                        </tr>
                    </thead>

                    <tbody>
                        {reports && reports.map(report => 
                            <CommissionRevenueReportRow 
                                key={report.rListingId} 
                                data={report}
                                onBrokerageDetails={this.handleBrokerageReview}
                                onHistory={this.handleHistoryReview}
                            />
                        )}
                    </tbody>
                </table>

                <Pagination 
                    pagination={pagination}
                    maxPage={maxPage}
                    onClickHandle={this.handlePagination} 
                />

                {showBrokerageDetail && 
                <CommissionBrokerageDetailsModal 
                    show={showBrokerageDetail}
                    dealId={dealId}
                    handleClose={this.handleCloseBrokerageDetailsModal}
                />
                }

                {showHistoryReview && 
                <CommissionHistoryReviewModal 
                    show={showHistoryReview}
                    dealFinId={dealFinId}
                    handleClose={this.handleCloseCommissionHistoryReviewModal}
                />
                }

                {isLoading && <Spinner />}
            </>
        )
    }
}