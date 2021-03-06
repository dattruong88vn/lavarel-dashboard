import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import Select from 'react-select';

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
            if (it.childs.length > 0) {
                if (it.control == 'select') {
                    const options = it.childs.map(option => {
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
                        <div className="col-sm-12" key={it.id}>
                            <div className="row form-group">
                                <div className="col-lg-3 col-md-4 col-sm-12">
                                    <div className="row form-group"><p>{it.title}</p></div>
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
                        </div>
                    )
                } else {
                    const childCheckbox = it.childs.filter(child=> child.control == 'checkbox');
                    const childInput = it.childs.filter(child=> child.control == 'input');
                    const childCheckboxMap = childCheckbox.map(child => {
                       return(
                           <div className="col-lg-2 col-md-3 col-sm-4" key={child.id}>
                               <div className="bl-checkbox">
                                   <input type="checkbox" id={`rent-checkbox-${child.id}`} checked={child.checked} onChange={this.onChangeItem({
                                       id : child.id,
                                       data : child.data,
                                       control : child.control,
                                       checked : !child.checked,
                                       hasValue : child.hasValue
                                   })}/>
                                   <label htmlFor={`rent-checkbox-${child.id}`}> {child.title}</label>
                               </div>
                           </div>
                       )
                    });
                    const childInputMap = childInput.map(child => {
                        return(<div className="col-md-12" key={child.id}>
                            <div className="row form-group" key={child.id}>
                                <textarea placeholder={child.title} className="form-control" rows={3}
                                          onChange={this.onChangeItem({
                                              id : child.id,
                                              data : child.data,
                                              control : child.control,
                                              checked : !child.checked,
                                              hasValue : child.hasValue
                                          })}
                                          value={child.data ? child.data : ''}
                                />
                            </div>
                        </div>)
                    });
                    return (
                        <div className="row form-group" key={it.id}>
                            <div className="col-md-12">
                                <div className="row form-group"> {it.title}</div>
                            </div>
                            {childCheckboxMap.length > 0 && childCheckboxMap}
                            {childInputMap.length > 0 && childInputMap}
                        </div>
                    )
                }

            }
            if (it.control == 'checkbox' || it.control == null) {
                return (
                    <Fragment>
                        {it.control == null && <div className="col-sm-12">
                            <div className="row form-group"> <p>{it.title}</p></div>
                        </div>}
                        {it.control != null && <div className="col-lg-3 col-md-4 col-sm-12" key={it.id}>
                            <div className="bl-checkbox">
                                <input type="checkbox" id={`rent-checkbox-${it.id}`}  checked={it.checked} onChange={this.onChangeItem({
                                    id : it.id,
                                    data : it.data,
                                    control : it.control,
                                    checked : !it.checked,
                                    hasValue : it.hasValue
                                })}/>
                                <label htmlFor={`rent-checkbox-${it.id}`}> {it.title}</label>
                            </div>
                        </div>}
                    </Fragment>
                )
            }
            if (it.control == 'input') {
                return (
                    <div className="row form-group" key={it.id}>
                        <textarea placeholder={it.title} className="form-control" rows={3}
                                  onChange={this.onChangeItem({
                                      id : it.id,
                                      data : it.data,
                                      control : it.control,
                                      checked : !it.checked,
                                      hasValue : it.hasValue
                                  })}
                                  value={it.data ? it.data : ''}
                        />
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
        const list = this.props.infoRent.list;
        const newList = this.recursiveUpdateItem(list, data);
        this.props.functionServices.onSetBuyContentList(
            [{
                id: 1301,
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
        $(document).off('#btnSeeMoreRent').on('click', '#btnSeeMoreRent', function (e) {
            e.preventDefault();
            var dots = document.getElementById("dotRent");
            var moreText = document.getElementById("contentMoreRent");
            dots.style.display = "none";
            this.style.display = "none";
            moreText.style.display = "inline";
        });
    }

    render() {
        return(
            <div  style={this.props.style ? this.props.style : {}} >
                <ContentRender
                    list={this.props.infoRent.list}
                    onChangeItem={this.onChangeItem}
                />
                <div className="row form-group">
                    <div className="col-lg-12">
                        <h2>Kh???ng ?????nh V??? Propzy V?? Mong ?????i C???a Kh??ch</h2>
                        <p>
                            - C??ng ty cung c???p ?????y ????? c??c d???ch v??? li??n quan ?????n BDS nh?? mua, b??n, thu??/cho thu??, ph??p l??, t??i ch??nh ... gi??p k???t n???i ng?????i mua v?? ng?????i b??n qua ???ng d???ng tr??n ??i???n tho???i/m??y t??nh c??ng v???i h??? th???ng 22 ph??ng giao d???ch kh???p TPHCM. M???c ti??u l?? cung c???p gi???i ph??p to??n di???n v?? xuy??n su???t cho th??? tr?????ng BDS Vietnam v?? c??c n?????c ????ng Nam ??.<span id="dotRent">..</span><a href="javascript:void(0);" id="btnSeeMoreRent">xem th??m</a>
                        </p>
                        <div id="contentMoreRent">
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