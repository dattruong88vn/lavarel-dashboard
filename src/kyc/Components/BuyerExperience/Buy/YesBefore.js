import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import Select from "react-select";

class ContentRender extends Component {
    constructor(props) {
        super(props);
        this.onChangeItem = this.onChangeItem.bind(this);
    }
    onChangeItem = (data) => e => {
        if (this.props.onChangeItem) {
            if(data.control == 'input') {
                if ($.trim(e.target.value).length > 0) {
                    data.hasValue = true;
                    data.data = e.target.value;
                } else {
                    data.hasValue = false;
                    data.data = null;
                }
            }
            this.props.onChangeItem(data);
        }
    };
    onChangeSelect(data) {
        if (this.props.onChangeItem) {
            this.props.onChangeItem(data);
        }
    }
    render() {
        const list = this.props.list;
        const listMap = list.map(it => {
            if (it.control == 'checkbox') {
                return (
                    <div className="row form-group" key={it.id}>
                        <div className="col-lg-3 col-md-4 col-sm-12">
                            <div className="bl-checkbox">
                                <input type="checkbox" id={`buy-checkbox-${it.id}`} checked={it.checked} onChange={this.onChangeItem({
                                    id : it.id,
                                    data : it.data,
                                    control : it.control,
                                    checked : !it.checked,
                                    hasValue : it.hasValue
                                })}/>
                                <label htmlFor={`buy-checkbox-${it.id}`}> {it.title}</label>
                            </div>

                        </div>
                    </div>
                )
            }
            if (it.control == 'input') {
                return (
                    <div className="row form-group" key={it.id}>
                        <textarea placeholder={it.title} className="form-control" rows={3} onChange={this.onChangeItem({
                            id : it.id,
                            data : it.data,
                            control : it.control,
                            checked : !it.checked,
                            hasValue : it.hasValue
                        } )}
                        value={it.data ? it.data : ''}
                        />
                    </div>
                )
            }
            if (it.control == 'select') {
                let options = it.childs.map(option => {
                    return {
                        value : option.id,
                        label: option.title,
                        id : option.id,
                        data: option.data,
                        hasValue: option.hasValue,
                        control: option.control,
                        checked: option.checked
                    };
                });
                return (
                    <div className="row form-group" key={it.id}>
                        <div className="col-lg-3 col-md-4 col-sm-12">
                            <div className="row form-group font15"> {it.title}</div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-12">
                            <div className="row form-group">
                                <Select
                                    options={options}
                                    placeholder={'--Vui l??ng ch???n--'}
                                    value={options.find(it=> it.checked)}
                                    onChange={(value) => {
                                        options.forEach(it => {
                                            if (value.id == it.id) {
                                                this.onChangeSelect({
                                                    id : it.id,
                                                    data: it.data,
                                                    hasValue: it.hasValue,
                                                    control: it.control,
                                                    checked: true
                                                })
                                            } else {
                                                this.onChangeSelect({
                                                    id : it.id,
                                                    data: it.data,
                                                    hasValue: it.hasValue,
                                                    control: it.control,
                                                    checked: false
                                                })
                                            }
                                        })

                                    }}
                                    isSearchable={false}
                                />
                            </div>
                        </div>
                    </div>
                )
            }

        });
        return(
            <Fragment>
                {listMap}
            </Fragment>
        )
    }
}
class YesBefore extends Component {
    constructor(props) {
        super(props);
        this.onChangeItem = this.onChangeItem.bind(this);
        this.bindEvents();
    }

    onChangeItem(data) {
        const list = this.props.infoBuy.list;
        const newList = this.recursiveUpdateItem(list, data);
        this.props.functionServices.onSetRentContentList(
            [{
                id: 1251,
                childs : newList
            }]);
    }
    recursiveUpdateItem(list, data) {
        if (list.length > 0) {
            for(let i = 0; i < list.length; i++) {
                if (list[i].id == data.id) {
                    list[i]  = Object.assign(list[i], data);
                } else if (list[i].childs && list[i].childs.length > 0) {
                    list[i].childs = this.recursiveUpdateItem(list[i].childs, data);
                }
            }
        }
        return  list;
    }

    bindEvents() {
        $(document).off('#btnSeeMoreBuy').on('click', '#btnSeeMoreBuy', function (e) {
            e.preventDefault();
            var dots = document.getElementById("dotBuy");
            var moreText = document.getElementById("contentMoreBuy");
            dots.style.display = "none";
            this.style.display = "none";
            moreText.style.display = "inline";
        });
    }
    
    render() {
        return(
            <div  style={this.props.style ? this.props.style : {}} >
                <ContentRender
                    list={this.props.infoBuy.list}
                    onChangeItem={this.onChangeItem}
                />
                <div className="row form-group">
                    <div className="col-lg-12">
                        <h2 className="title18 bold">Kh???ng ?????nh V??? Propzy V?? Mong ?????i C???a Kh??ch</h2>
                        <p className="font15">
                            - C??ng ty cung c???p ?????y ????? c??c d???ch v??? li??n quan ?????n BDS nh?? mua, b??n, thu??/cho thu??, ph??p l??, t??i ch??nh ... gi??p k???t n???i ng?????i mua v?? ng?????i b??n qua ???ng d???ng tr??n ??i???n tho???i/m??y t??nh c??ng v???i h??? th???ng 22 ph??ng giao d???ch kh???p TPHCM. M???c ti??u l?? cung c???p gi???i ph??p to??n di???n v?? xuy??n su???t cho th??? tr?????ng BDS Vietnam v?? c??c n?????c ????ng Nam ??.<span id="dotBuy">..</span><a href="javascript:void(0);" id="btnSeeMoreBuy">xem th??m</a>
                        </p>
                        <div id="contentMoreBuy">
                            <p>- Kho h??ng phong ph?? v?? ch???t l?????ng ???? ???????c th???m ?????nh v??? gi??, th??ng tin qui ho???ch v?? t??nh tr???ng ph??p l??, kh??ng c?? t??nh tr???ng nh?? ???o, gi?? ???o. Ngu???n h??ng ch??nh ch??? h??n 75% </p>
                            <p>- Kh??ch ???????c xem v?? t?? v???n ?????y ????? th??ng tin h??nh ???nh, ph??p l??, qui ho???ch tr?????c khi ??i xem, ti???t ki???m th???i gian</p>
                            <p>- Ki???m tra tranh ch???p, ?????m b???o nh?? c?? th??? giao d???ch tr?????c khi ?????t c???c, giao d???ch an to??n.</p>
                            <p>- T?? v???n v?? h??? tr??? t??i ch??nh cho vay, gi??p kh??ch mua ???????c c??n nh?? nh?? ??</p>
                            <p>- Mi???n ph?? d???ch v??? ph??p l?? gi??p ho??n t???t th??? t???c gi???y t??? t??? A ?????n Z</p>
                            <p>- Gi??p th???m ?????nh gi?? b??n h???p l?? d???a v??o kho d??? li???u kh???ng l??? v??? th??? tr?????ng v?? ph???n h???i t??? ng?????i mua th???c k???t h???p v???i c??ng ngh??? d??? li???u ti??n ti???n, kh??ng b??? h??? khi b??n nh?? </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(React.memo(YesBefore));