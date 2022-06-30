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
                        <h2>Khẳng Định Về Propzy Và Mong Đợi Của Khách</h2>
                        <p>
                            - Công ty cung cấp đầy đủ các dịch vụ liên quan đến BDS như mua, bán, thuê/cho thuê, pháp lý, tài chính ... giúp kết nối người mua và người bán qua ứng dụng trên điện thoại/máy tính cùng với hệ thống 22 phòng giao dịch khắp TPHCM. Mục tiêu là cung cấp giải pháp toàn diện và xuyên suốt cho thị trường BDS Vietnam và các nước Đông Nam Á.<span id="dotRent">..</span><a href="javascript:void(0);" id="btnSeeMoreRent">xem thêm</a>
                        </p>
                        <div id="contentMoreRent">
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