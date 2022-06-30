import React, {Component} from 'react';
import CommissionConfigList from './CommissionConfigList';
import SelectMonthYear from '../../commonComponents/dateMonthYearSelect/SelectMonthYear';
import {Link} from 'react-router-dom';
import Pagination, {PaginationFilter} from '../../commonComponents/pagination/Pagination';
import Spinner from '../../commonComponents/spinner/Spinner';

const headers = [
    {text: 'Tên hoa hồng', column: 'commissionName'},
    {text: 'Đối tượng', column: 'positionName'},
    {text: 'Loại hoa hồng', column: 'name'},
    {text: 'Kỳ tính', column: 'period'}
];

class CommissionConfigs extends Component {
    constructor(props) {
        super(props);
        const cDate = new Date();
        this.state = {
            isLoading: false,
            filter: {
                sortBy: [],
                period: {
                    monthPeriod: cDate.getMonth() + 1,
                    yearPeriod: cDate.getFullYear()
                },
                pagination: new PaginationFilter()
            }
        }
    }
    filter = () => {
        this.state.isLoading = true;
        this.setState({...this.state}, () => {
            this.props.functionServices.getCommissionList(this.state.filter, () => {
                this.state.isLoading = false;
                this.setState({...this.state});
            });
        });
    }
    componentDidMount() {
        this.filter();
    }
    onSortFilterHandle = (column) => {
        if (!column || column === '') {
            return;
        }
        const sortBy = this.state.filter.sortBy.find(item => item.column === column);
        if (sortBy) {
            sortBy.isAsc = !sortBy.isAsc;
            this.setState({...this.state, filter: {...this.state.filter, sortBy: [sortBy]}});
            return;
        }
        this.setState({...this.state, filter: {...this.state.filter, sortBy: [{column: column, isAsc: true}]}});
    };

    onChangePeriod = (month, year) => {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                period: {
                    monthPeriod: month,
                    yearPeriod: year
                }
            }
        }, this.filter);
    }
    onClickPagination = (page) => {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                pagination: {
                    limit: this.state.filter.pagination.limit,
                    page: page
                }
            }
        }, this.filter);
    }
    render() {
        return (
            <>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">Danh sách cấu hình hoa hồng</h3>
                                <div className="filter-box">
                                    <div className="col col-md-8">
                                        <SelectMonthYear selectedMonth={this.state.filter.period.monthPeriod} selectedYear={this.state.filter.period.yearPeriod} labelText={'Kỳ tính'} onChange={this.onChangePeriod} />
                                    </div>
                                    <div className="col col-md-4">
                                        <Link to="/commission-config/add" className="btn btn-primary pull-right"><i className="fa fa-plus"></i> Thêm</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="box-body">
                                <div className="form-group">
                                    <CommissionConfigList list={this.props.commissionConfigs.commissionConfigList.list || []} headers={headers} filter={this.state.filter} onHeaderSortIconClick={this.onSortFilterHandle} />
                                </div>
                                <div className="form-group">
                                    <Pagination
                                        pagination={this.state.filter.pagination}
                                        onClickHandle={this.onClickPagination}
                                        maxPage={this.props.commissionConfigs.commissionConfigList.totalPages || 0}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isLoading && <Spinner />}
            </>
        );
    }
}

export default CommissionConfigs;