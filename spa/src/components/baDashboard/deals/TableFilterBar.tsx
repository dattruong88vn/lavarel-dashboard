import React from 'react';
import BtnFilterBar from './BtnFilterBar';
import '../../../material/scss/ba-table-filter-bar.scss';

const TableFilterBar: React.FC<{}> = () => {
    return (
        <div className="container-flex">
            <div className="row row-eq-height">
                <div className="col-md-12">
                    <div className="block-table-filter-bar">
                        <input className="input-search" id="input-search-matrix" type="text" placeholder="Tìm theo SĐT, Tên, Email khách hàng, DealID"/>
                        <button type="submit" className="searchButton">
                            <i className="fa fa-search"></i>
                        </button>
                        <BtnFilterBar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableFilterBar;