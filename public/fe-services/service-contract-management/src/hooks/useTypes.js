import { useState } from "react";
import { useSelector } from "react-redux";

const useTypes = () => {
    const types = useSelector(state=>state.formContractSlice.types);
    // console.log(typesSelector);
    // const [types] = useState([{"code":"SERVICE_TYPE","name":"Loại dịch vụ","list":[{"id":2,"code":"SERVICE_TYPE_SELL","name":"Bán","control":"Radio","unsignedName":"","childList":[]},{"id":3,"code":"SERVICE_TYPE_RENT","name":"Thuê","control":"Radio","unsignedName":"","childList":[]}]},{"code":"SERVICE_PACKAGE","name":"Gói dịch vụ","list":[{"id":5,"code":"SERVICE_PACKAGE_IBUY","name":"IBUY","control":"Radio","unsignedName":"","childList":[{"id":6,"code":"SERVICE_PACKAGE_IBUY_PROP_POST","name":"Đăng tin BĐS","control":"Checkbox","unsignedName":"","childList":[]},{"id":7,"code":"SERVICE_PACKAGE_IBUY_PROP_VAL","name":"Thẩm định giá BĐS","control":"Checkbox","unsignedName":"","childList":[]},{"id":8,"code":"SERVICE_PACKAGE_IBUY_SELL_TO_PROPZY","name":"Bán cho Propzy","control":"Checkbox","unsignedName":"","childList":[]}]},{"id":9,"code":"SERVICE_PACKAGE_EXCLUSIVE","name":"Độc quyền","control":"Radio","unsignedName":"","childList":[{"id":10,"code":"SERVICE_PACKAGE_EXCLUSIVE_PROP_POST","name":"Đăng tin BĐS","control":"Checkbox","unsignedName":"","childList":[]},{"id":11,"code":"SERVICE_PACKAGE_EXCLUSIVE_PROP_VAL","name":"Thẩm định giá BĐS","control":"Checkbox","unsignedName":"","childList":[]},{"id":12,"code":"SERVICE_PACKAGE_EXCLUSIVE_PROP_CONSULT","name":"Tư vấn, đặt lịch xem BĐS","control":"Checkbox","unsignedName":"","childList":[]}]},{"id":13,"code":"SERVICE_PACKAGE_STANDARD","name":"Tiêu chuẩn","control":"Radio","unsignedName":"","childList":[{"id":14,"code":"SERVICE_PACKAGE_STANDARD_PROP_POST","name":"Đăng tin BĐS","control":"Checkbox","unsignedName":"","childList":[]},{"id":15,"code":"SERVICE_PACKAGE_STANDARD_PROP_CONSULT","name":"Tư vấn, đặt lịch xem BĐS","control":"Checkbox","unsignedName":"","childList":[]}]}]},{"code":"PAYMENT_TERM","name":"Thời hạn thanh toán","list":[{"id":17,"code":"PAYMENT_TERM_100","name":"100 % phí dịch vụ ngay khi Giao dịch thành công.","control":"Radio","unsignedName":"","childList":[]},{"id":18,"code":"PAYMENT_TERM_80","name":"80% ngay khi đặt cọc, 20% còn lại thanh toán sau khi ký hợp đồng mua bán/ Công chứng sang tên","control":"Radio","unsignedName":"","childList":[]}]},{"code":"COMMISSION_TYPE","name":"Loại hoa hồng","list":[{"id":20,"code":"COMMISSION_TYPE_BY_MONEY","name":"Bằng tiền","control":"Dropdown","unsignedName":"","childList":[]},{"id":21,"code":"COMMISSION_TYPE_PERCENT","name":"Theo phần trăm %","control":"Dropdown","unsignedName":"","childList":[]}]},{"code":"PAYMENT_METHOD","name":"Hình thức thanh toán","list":[{"id":23,"code":"PAYMENT_METHOD_BANK_TRANSFER","name":"Chuyển khoản","control":"Radio","unsignedName":"","childList":[]},{"id":24,"code":"PAYMENT_METHOD_CASH","name":"Tiền mặt","control":"Radio","unsignedName":"","childList":[]}]},{"code":"SERVICE_TIME","name":"Thời hạn thực hiện dịch vụ","list":[{"id":26,"code":"SERVICE_TIME_30","name":"30 ngày","control":"Radio","unsignedName":"","childList":[]},{"id":27,"code":"SERVICE_TIME_60","name":"60 ngày","control":"Radio","unsignedName":"","childList":[]},{"id":28,"code":"SERVICE_TIME_90","name":"90 ngày","control":"Radio","unsignedName":"","childList":[]}]},{"code":"CUSTOMER_RELATION","name":"Mối quan hệ","list":[{"id":31,"code":"CUSTOMER_RELATION_PARTNER","name":"Vợ/chồng","control":"","unsignedName":"","childList":[]}]},{"code":"BANK","name":"Ngân hàng","list":[{"id":1,"code":"ACB","name":"Ngân hàng thương mại cổ phần Á Châu","unsignedName":"ngan hang thuong mai co phan a chau","childList":[]},{"id":2,"code":"BIDV","name":"Ngân hàng Đầu tư và Phát triển Việt Nam","unsignedName":"ngan hang dau tu va phat trien Viet Nam","childList":[]},{"id":3,"code":"Sacombank","name":"Ngân hàng thương mại cổ phần Sài gòn Thương Tín","unsignedName":"ngan hang thuong mai co phan sai gon thuong tin","childList":[]}]},{"code":"STATUS","name":"Trạng thái","list":[{"id":2,"code":"STATUS_CONTRACT","name":"Hợp đồng","control":null,"unsignedName":"Hop đong","childList":[]},{"id":3,"code":"STATUS_DRAFT","name":"Draft","control":null,"unsignedName":"Draft","childList":[]}]}])
    const getType = code => {
        return types.map((type) => code === type.code ? type : null).filter(item => item !== null)[0];
    }

    const getTypeReactSelect = code => {
        const type = getType(code);
        if(!type?.list){
            return [];
        }
        return type.list.map(item => {
            let codeLabel = item.code !== null ? `(${item.code})` : '';
            let label = code === 'BANK' ? `${item.name} ${codeLabel}` : item.name;
            return { "value": item.id, "label": label };
        })
    }

    const getDefaultValue = (code, value) => {
        const type = getType(code);
        if(!type?.list){
            return [];
        }
        return type.list.map((item) => {
            let codeLabel = item.code !== null ? `(${item.code})` : '';
            let label = code === 'BANK' ? `${item.name} ${codeLabel}` : item.name;
            // let label = code === 'BANK' ? `${item.code} - ${item.name}` : item.name;  
            return value === item.id ? { "value": item.id, "label": label } : null
        }).filter(item => item !== null)[0]
    }

    return [getTypeReactSelect, getType, getDefaultValue];
}

export default useTypes;