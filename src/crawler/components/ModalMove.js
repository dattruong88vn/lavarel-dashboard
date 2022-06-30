import React, {Component} from 'react';
import httpServices from '../utils/http';
import CustomSelect from '../../commonComponents/form/CustomSelect';

const header = [
    {name: 'checkbox', sorting: false},
    {name: 'Đường', sorting: true},
    {name: 'Số nhà', sorting: true},
    {name: 'Giá', sorting: false},
    {name: 'Loại', sorting: false},
    {name: 'Trạng thái', sorting: false}
];

class ModalMove extends Component {
    state = {
        group: {},
        totalItem: 0,
        options: [],
        select: {
            value: '',
            label: ''
        },
        idsSelected: []
    }

    componentDidMount() {
        const {idsSelected, selectOptions} = this.props;
        const options = selectOptions.tabOptions.filter(i => parseInt(i.value) > 0);

        let phones = [];
        idsSelected.forEach(i => {
            i.phones.forEach(p => phones.push(p));
        });
        const getDataPost = {
            ids: idsSelected.map(i => i.id),
            phones: phones
        }
        httpServices.getListRelated(getDataPost).then(res => {
            this.state.idsSelected = res.data.data.list;
            this.setState({...this.state});
            const group = res.data.data.list.reduce((result, currentValue) => {
                const key = `${currentValue.districtName.replace(/ /g, "")}${currentValue.wardName.replace(/ /g, "")}`;
                (result[key] = result[key] || []).push(currentValue);
                return result;
            }, {});
            this.setState({group, totalItem: res.data.data.list.length, options});
        });
    }

    handleChange = data => {
        this.setState({select: data});
    }

    handleMove = () => {
        const {value, label} = this.state.select;
        const {dataPost, activeTab, checkFocusPagination, services} = this.props;
        services.onShowModal('modalMove', false);
        const moveDataPost = {
            ids: this.state.idsSelected.map(i => i.id).join(),
            ownerTypeId: value,
            ownerTypeName: label
        }
        httpServices.moveCrawler(moveDataPost).then(res => {
            if (res.data.result) {
                services.onShowNotification(true, {type: 'success', message: res.data.message});
                setTimeout(() => {
                    const numberCarwlerMove = value !== activeTab ? this.state.idsSelected.length : 0;
                    const focusPagination = checkFocusPagination(numberCarwlerMove);
                    services.onGetCrawlerList(focusPagination, dataPost);
                }, 3000);
                return;
            }
            services.onShowNotification(true, {type: 'failed', message: res.data.message});
        });
    }

    render() {
        const {group, totalItem, options, select} = this.state;
        const {selectOptions, services} = this.props;

        const checkOnClickHanle = (item) => {
            if (this.state.idsSelected.filter(i => i.id === item.id).length > 0) {
                const arrId = this.state.idsSelected.filter(i => i.id !== item.id);
                this.state.idsSelected = arrId;
                this.setState({...this.state});
                return;
            }
            this.state.idsSelected.push({id: item.id, phones: item.phones});
            this.setState({...this.state});
        };

        const allCheckOnClickHandle = (group) => {
            if (isCheckAll(group)) {
                const arrIds = group.map(i => i.id);
                this.state.idsSelected = this.state.idsSelected.filter(i => !arrIds.includes(i.id));
                this.setState({...this.state});
                return;
            }
            group.map(i => {
                this.state.idsSelected.push(i);
            });
            this.setState({...this.state});
        }

        const onClickAllOfDataHanle = (e) => {
            if (this.state.idsSelected.length === totalItem) {
                this.state.idsSelected = [];
                this.setState({...this.state});
                return;
            }
            this.state.idsSelected = [];
            Object.keys(group).map(k => {
                group[k].forEach(i => {
                    this.state.idsSelected.push(i);
                });
            });
            this.setState({...this.state});
            return;
        }

        const isCheckAll = (group) => {
            const arrIds = this.state.idsSelected.map(i => i.id);
            let isCheckAll = true;
            group.forEach(item => {
                if (!arrIds.includes(item.id)) {
                    isCheckAll = false;
                    return;
                }
            });
            return isCheckAll;
        };

        const columns = (group) => {
            return header.map((item, index) => {
                if (item.name === 'checkbox') {
                    return (
                        <th key={index}>
                            <input
                                type="checkbox"
                                onClick={e => allCheckOnClickHandle(group)}
                                checked={isCheckAll(group)}
                                alt="Chọn/hủy tất cả" />
                        </th>);
                }
                const hasSorting = item.sorting ? 'sorting' : 'sorting_disabled';
                return (
                    <th key={index} className={`text-center ${hasSorting}`}>{item.name}</th>
                );
            });
        };

        const type = id => {
            return selectOptions.listingTypeOptions.find(i => parseInt(i.value) === id).label;
        }

        const data = Object.keys(group).map(iKey => {
            const bgClass = time => {
                if (time) {
                    const date = new Date(time).toLocaleDateString("en-GB"),
                        dateParse = `${new Date(time).getFullYear()}/${new Date(time).getMonth() + 1}/${new Date(time).getDate()} 00:00:00`,
                        todayParse = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} 00:00:00`,
                        times = Math.abs(new Date(dateParse) - new Date(todayParse)),
                        days = times / (1000 * 3600 * 24);

                    if(parseInt(days, 10) > 5){
                        return 'five-days';
                    }
                    if(parseInt(days, 10) > 2){
                        return 'two-days';
                    }
                }
                return 'one-day';
            };
            return (
                <div className="tab-content" key={iKey}>
                    <h4>{`${group[iKey][0].districtName},${group[iKey][0].wardName}`}</h4>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                <table className="table table-bordered table-listing dataTable no-footer">
                                    <thead>
                                        <tr>
                                            {columns(group[iKey])}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {group[iKey].map(item => (
                                            <tr key={item.id} className={bgClass(item.createdDate)}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        onClick={e => checkOnClickHanle(item)}
                                                        checked={this.state.idsSelected.filter(i => i.id === item.id).length > 0}
                                                        value={item.id} />
                                                </td>
                                                <td>{item.streetName}</td>
                                                <td>{item.houseNumber}</td>
                                                <td>{item.formatedPrice}</td>
                                                <td>{type(item.listingTypeId)}</td>
                                                <td>{item.statusName}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className="modal fade in" style={{display: 'block', zIndex: '1051'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                onClick={() => services.onShowModal('modalMove', false)}>×</button>
                            <h4 className="modal-title">Danh sách tin có thể được move theo</h4>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <CustomSelect
                                                name="tab"
                                                label="Tab"
                                                required={true}
                                                options={options}
                                                value={select}
                                                changed={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div>Có {this.state.idsSelected.length}/{totalItem} tin đang được chọn để move</div>
                                <div style={{marginTop: '10px'}}>
                                    <div className="col-md-4">
                                        <input checked={this.state.idsSelected.length === totalItem} type="checkbox" onClick={onClickAllOfDataHanle} name="chkAllOfData" id="chkAllOfData" value="all-of-data" /> <label for="chkAllOfData"> Tất cả tin</label>
                                    </div>
                                    <div className="col-md-8 text-right">
                                        <button type="button" className="btn btn-second" onClick={() => services.onShowModal('modalMove', false)} >Đóng</button>
                                        {select.value && <button style={{marginLeft: '5px'}} type="button" className="btn btn-danger" onClick={this.handleMove} >Move</button>}
                                    </div>
                                    <div style={{clear: 'both'}}></div>
                                </div>
                                <div>{data}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalMove;