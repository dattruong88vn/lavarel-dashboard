import React from 'react';
import TableFilterBar from './TableFilterBar';
import "./Deals.scss";

type DealBlockProps = {
    id: string;
    showTable: any
};

const DealBlock: React.FC<DealBlockProps> = (props) => {
    return (
        <div style={{display:props.showTable ? "block" : "none"}}>
            <TableFilterBar/>
            <div id="wrap_group_button_deal"></div>
            <table id={props.id} className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Deal ID</th>
                        <th>Tên KH</th>
                        <th>Giá</th>
                        <th>Giá / m2</th>
                        <th>Thuộc nhóm BĐS</th>
                        <th>Loại BĐS</th>
                        <th>Khoảng giá khách tìm kiếm</th>
                        <th>Ngân sách khách đang có</th>
                        <th>Quận - Phường ưa thích</th>
                        <th>Trạng thái</th>
                        <th>Tiến độ</th>
                        <th>Tổng số tour</th>
                        <th>Số ngày tồn tại</th>
                        <th>Ngày dự kiến chốt deal</th>
                        <th>Thời gian còn lại để chốt deal</th> 
                        <th>Ngày tương tác gần nhất</th>
                        <th>Ngày tạo</th>
                        <th>Nguồn</th>
                        <th>Tên CRM</th>
                        <th>Đối tượng</th>
                        <th>Time counter</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    );
};

export default DealBlock;