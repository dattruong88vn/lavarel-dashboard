import React, {Component, Fragment} from 'react';
import 'babel-polyfill';
import moment from "moment";
import {InputText, InputDate} from "../../commonComponents/input/InputLabel";
import {Select2} from "../../commonComponents/select/selectLabel";

const listMap = new Map([
    [27, {
        "channelStatusId": 27,
        "channelStatusName": "Chờ tiếp nhận",
        "count": 0,
        "icon" : 'fa-download',
        "color": 'orange'
    }],
    [28, {
        "channelStatusId": 28,
        "channelStatusName": "Tiếp nhận và xử lý",
        "count": 0,
        "icon" : 'fa-cogs',
        "color": 'green'
    }],
    [29, {
        "channelStatusId": 29,
        "channelStatusName": "Trễ hạn",
        "count": 0,
        "icon" : 'fa-clock-o',
        "color": 'red'
    }],
    [null, {
        "channelStatusId": null,
        "channelStatusName": "Tổng PFS",
        "count": 0,
        "icon" : 'fa-file-text-o',
        "color": 'aqua'
    }]
]);
function OverviewList({list}) {
    const listRequest = [];
    listMap.forEach((item , key) => {
        const itemOverview = item;
        if (Array.isArray(list)) {
            const filter = list.filter(it => {
                return typeof (it.channelStatusId) !== undefined && it.channelStatusId === key;
            });
            if (filter.length > 0) {
                itemOverview.count = filter[0].count ? filter[0].count : 0;
                itemOverview.channelStatusName = filter[0].channelStatusName ? filter[0].channelStatusName : itemOverview.channelStatusName;
            }
        }
        let url = '/pfs-list';
        if (itemOverview.channelStatusId !== null) {
            url += '?channelStatusId=' + itemOverview.channelStatusId;
        }
        listRequest.push(
            <div className="col-lg-3 col-xs-6" key={key}>
                <div className={"small-box bg-" + itemOverview.color}>
                    <div className="inner">
                        <h3>{itemOverview.count}</h3>

                        <h4>{itemOverview.channelStatusName }</h4>
                    </div>
                    <div className="icon">
                        <i className={"fa "+ itemOverview.icon} />
                    </div>
                    <a href={url} className="small-box-footer">Xem thêm <i className="fa fa-arrow-circle-right"></i></a>
                </div>
            </div>
        );
    });
    return(
        <Fragment>
            {
                listRequest
            }
        </Fragment>
    );
}
class PfsList extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.props.functionServices.onFetchOverviewRequest();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">Danh sách công việc</h3>
                        </div>
                        <div className="box-body" id={"pfs-overview-request"}>
                            <div className="form-group col-md-12">
                                <div className="row">
                                    <OverviewList list={this.props.overview.data}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PfsList;