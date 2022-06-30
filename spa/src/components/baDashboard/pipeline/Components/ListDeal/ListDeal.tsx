import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import "./listDeal.scss"
import { GroupBy, TimeGroupBy } from 'model';

type ListDealProps = {
    id: string;
};
const _Window = (window as any).Window;

const ListDeal: React.FC<ListDealProps> = (props) => {
    const { id } = props;
    useEffect(() => {
        _Window._ListDealMatrix = new _Window.ListDealMatrix();
    }, []);
    return (
        <div className="list-deal">
            <SearchBar />
            <table id={id} className="table table-bordered table-striped table-custom">
                <thead>
                    <tr>
                        <th>Deal ID</th>
                        <th>Tên KH</th>
                        <th>Giá</th>
                        <th>Giá / m2</th>
                        <th>Thuộc nhóm BĐS</th>
                        <th>Loại hình BĐS</th>
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

export default ListDeal;