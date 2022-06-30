import ListingFilter from 'model/filter/ListingFilter';
import {getNameListingType} from 'model/listing/ListingModel';
import React from 'react';
import dateTime from 'utils/dateTime';

const BsaListingColumn: React.FC<{column: string, item: any, filter: ListingFilter}> = (props) => {

    const render = () => {
        switch (props.column) {
            case 'rlistingId':
                var html = '<a href="/pos/sa/detail/' + props.item.rlistingId + '" target="_blank">' + props.item.rlistingId + "</a>";
                let mess = "";
                if (props.item.liveTypeId == 196) {
                    mess += "<p>- Tin đăng riêng tư</p>";
                }
                if (props.item.isRequestByDiy == true) {
                    mess += "<p>- Có chỉnh sửa diy</p>";
                }
                if (props.item.lastestDateFeedBack) {
                    mess += "<p>- Có đánh giá của khách hàng</p>";
                }
                if (mess) {
                    html += '<span class="sa-tooltip" data-toggle="tooltip" data-placement="bottom">' + mess + "</span>";
                }
                return <span dangerouslySetInnerHTML={{__html: html}}></span>;
            case 'updatedDate':
                if (props.filter.type == 3 || props.filter.type == 1) {
                    if (props.item[props.column]) {
                        const d = new Date(props.item[props.column]);
                        return dateTime.getDateString(d);
                    }
                }
                return 'N/A';
            case 'liveType':
            case 'districtName':
            case 'propertyTypeName':
            case 'psAssignedName':
            case 'assignedName':
            case 'liveType':
            case 'reasonName':
                return props.item[props.column] || 'N/A';
            case 'timeCounter':
            case 'phone':
                return props.item[props.column] || '';
            case 'ownerName':
                let bpoRenderText = <></>;
                if ((props.item.listingTypeId && props.item.listingTypeId !== 2)) {
                    if (props.item.bpoLabel && props.item.bpoLabel == 'Đã BPO') {
                        bpoRenderText = <p>
                            <small className="label bg-green">
                                <b style={{fontSize: '12px'}}>
                                    <a style={{color: '#fff', padding: '1px'}} onClick={e => $('#modalBPO').modal('show')}>{props.item.bpoLabel}</a>
                                </b></small>
                        </p>;
                    } else {
                        bpoRenderText = <a className="bpo-popup" onClick={e => $('#modalBPO').modal('show')}>BPO: {props.item.bpoLabel}</a>;
                    }
                }
                return <><p>{props.item.ownerName}</p>{bpoRenderText}</>;
            case 'bpoCloseDate':
                return props.item.bpoCloseDate ? dateTime.getDateStringFromTimestamp(props.item.bpoCloseDate, '/') : 'N/A';
            case 'address':
                var address = props.item.address || 'N/A';
                if ([13, 14].indexOf(props.item.propertyTypeId) > -1) {
                    const landCode = props.item.landCode || 'N/A';
                    const mapCode = props.item.mapCode || 'N/A';
                    address += `<br><a href="javascript:void(0);" class="control-label text-danger land-code-list" data-rlistingid="${props.item.rlistingId}">Số thửa : ${landCode}</a> `;
                    address += `<br><a href="javascript:void(0);" class="control-label text-primary map-code-list" data-rlistingid="${props.item.rlistingId}">Tờ bản đồ : ${mapCode}</a> `;
                }
                return <span dangerouslySetInnerHTML={{__html: address}}></span>;
            case 'price':
                return props.item.formatedPrice ? (props.item.formatedPrice + "(" + props.item.currency + ")") : 'N/A';
            case 'sourceName':
                let result = props.item.sourceName ? props.item.sourceName : "N/A";
                if (props.item.useDiy === 1) {
                    result += '<span class="badge pull-right bg-info" style="background-color:#13B0AC">diy</span>';
                }
                return <span dangerouslySetInnerHTML={{__html: result}}></span>;
            case 'listingTypeId':
                const listType = getNameListingType(props.item.listingTypeId);
                return listType ? listType.sale.name : "N/A";
            case 'assignedDate':
                return props.item.assignedDate ? dateTime.getFullDateStringFromTimestamp(props.item.assignedDate, '/') : 'N/A';
            case 'guaranteedExpiredDate':
                let guaranteedExpiredDate = props.item.guaranteedExpiredDate ? dateTime.getDateStringFromTimestamp(props.item.guaranteedExpiredDate) : 'N/A';
                if (props.item.liveTypeId == 197) {
                    guaranteedExpiredDate = guaranteedExpiredDate + ' <a href="javascrip:void()" class="editGuaranteedExpiredDate" data-object=' + JSON.stringify({
                        rlistingId: props.item.rlistingId,
                        guaranteedExpiredDate: props.item.guaranteedExpiredDate,
                        guaranteedSignedDate: props.item.guaranteedSignedDate,
                    }) + '> <i class="fa fa-edit"></i></a>';
                }
                return <span dangerouslySetInnerHTML={{__html: guaranteedExpiredDate}}></span>;
            case 'numberDeal':
                const numberDeal = props.item.numberDeal || "N/A";
                const numberTour = props.item.numberTour || "N/A";
                var html = `<a href="javascript:void(0);" class="control-label text-danger open-deal-total-list" data-rlistingid="${props.item.rlistingId}">Số Deal : ${numberDeal}</a> 
                                <br>
                              <a href="javascript:void(0);" class="control-label text-primary open-tour-total-list" data-rlistingid="${props.item.rlistingId}">Số Tour : ${numberTour}</a> `;
                return <span dangerouslySetInnerHTML={{__html: html}}></span>;;
            case 'statusCreateDate':
                return props.item.statusCreateDate ? dateTime.getFullDateStringFromTimestamp(props.item.statusCreateDate, '/') : 'N/A';
            default: return '';
        }
    }
    return (<td>{render()}</td>)
};

export default BsaListingColumn;
