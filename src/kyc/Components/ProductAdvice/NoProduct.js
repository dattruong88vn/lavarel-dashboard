import React, { Component } from 'react';

class NoProduct extends Component {
    render() {
        return (
            <div className="box-kyc-body">
                <div className="row form-group text-center">
                    <div className="no-data">
                        <img src="/images/kyc/nodata.png" alt="no-data"/>
                    </div>
                    <h4 className="title-no-data">Chưa có thông tin khách hàng</h4>
                </div>
            </div>
        );
    }
}

export default NoProduct;