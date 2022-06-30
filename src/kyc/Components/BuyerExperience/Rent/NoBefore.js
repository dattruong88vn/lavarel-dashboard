import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
class NoBefore extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div  style={this.props.style ? this.props.style : {}} >
                <div className="row form-group">
                    <div className="col-lg-12">
                        <p><strong>- Trao đổi về kinh nghiệm thuê nhà với Propzy</strong></p>
                        <p><strong>- Sẵn sàng tư vấn cho khách hàng về nhà đã chọn</strong></p>
                        <p>Theo như thông tin từ trên Công Ty gửi xống thì E có chọn ra một số căn phù hợp với tiêu chí của Anh, tuy nhiên là không biết Anh có thêm tiêu chí gì khác nữa không?</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(React.memo(NoBefore));