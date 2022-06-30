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
                                    placeholder={'--Vui lòng chọn--'}
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
                        <h2 className="title18 bold">Khẳng Định Về Propzy Và Mong Đợi Của Khách</h2>
                        <p className="font15">
                            - Công ty cung cấp đầy đủ các dịch vụ liên quan đến BDS như mua, bán, thuê/cho thuê, pháp lý, tài chính ... giúp kết nối người mua và người bán qua ứng dụng trên điện thoại/máy tính cùng với hệ thống 22 phòng giao dịch khắp TPHCM. Mục tiêu là cung cấp giải pháp toàn diện và xuyên suốt cho thị trường BDS Vietnam và các nước Đông Nam Á.<span id="dotBuy">..</span><a href="javascript:void(0);" id="btnSeeMoreBuy">xem thêm</a>
                        </p>
                        <div id="contentMoreBuy">
                            <p>- Kho hàng phong phú và chất lượng đã được thẩm định về giá, thông tin qui hoạch và tình trạng pháp lý, không có tình trạng nhà ảo, giá ảo. Nguồn hàng chính chủ hơn 75% </p>
                            <p>- Khách được xem và tư vấn đầy đủ thông tin hình ảnh, pháp lý, qui hoạch trước khi đi xem, tiết kiệm thời gian</p>
                            <p>- Kiểm tra tranh chấp, đảm bảo nhà có thể giao dịch trước khi đặt cọc, giao dịch an toàn.</p>
                            <p>- Tư vấn và hỗ trợ tài chính cho vay, giúp khách mua được căn nhà như ý</p>
                            <p>- Miễn phí dịch vụ pháp lý giúp hoàn tất thủ tục giấy tờ từ A đến Z</p>
                            <p>- Giúp thẩm định giá bán hợp lý dựa vào kho dữ liệu khổng lồ về thị trường và phản hồi từ người mua thực kết hợp với công nghệ dữ liệu tiên tiến, không bị hớ khi bán nhà </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(React.memo(YesBefore));