const renderSpecificField = (object, fieldKey) => {
    let fieldValue = 'N/A'
    if (hasValue(object[fieldKey])) {
        fieldValue = object[fieldKey]
    }

    return fieldValue
}

const renderDIY = (object) => {
    let result = hasValue(object.sourceName) ? object.sourceName : 'N/A';
    /**
       * NONE(1784, "Không có nhãn", 1),
       BLUE(1785, "Nhãn DIY màu xanh", 2),
       GRAY(1786, "Nhãn Propzy app màu xám", 3),
       ORANGE(1787, "Nhãn Propzy app màu cam", 4);
      */

    let iconOrText = '';
    let hoverText = '';
    if (object.listingAppStatus.color) {
        const listingAppStatusId = object.listingAppStatus.id;
        switch (listingAppStatusId) {
            case LISTING_APP_STATUS.NONE:
                iconOrText = '<i class="fa fa-map-marker" aria-hidden="true"></i>';
                break;
            case LISTING_APP_STATUS.BLUE:
                iconOrText = 'diy';
                break;
            case LISTING_APP_STATUS.GRAY:
                iconOrText = '<i class="fa fa-map-marker" aria-hidden="true"></i>';
                hoverText = 'Chủ listing đã có tài khoản Propzy App/ portal.';
                break;
            case LISTING_APP_STATUS.ORANGE:
                iconOrText = '<i class="fa fa-map-marker" aria-hidden="true"></i>';
                hoverText =
                    'Chủ listing đã xem/cập nhật thông tin listing từ Propzy App/ portal.';
                break;
            default:
                break;
        }

        result += `<span class="badge pull-right bg-info" data-toggle="tooltip" title="${hoverText}" style="background-color:${object.listingAppStatus.color}">${iconOrText}</span>`;
    }
    return result;
};

// ================= PriceTags ===============

let dataPriceTags = {};
function priceTagsDealDetail(id) {
    const tagsdata = [];
    let style = '';
    let html = '';
    let tooltip = '';
    if (dataPriceTags[id] !== undefined) {
        if (
            dataPriceTags[id].hasOwnProperty('tagging') &&
            dataPriceTags[id].tagging !== []
        ) {
            dataPriceTags[id].tagging.map((item) => {
                let temp = {
                    tagId: 0,
                    tagName: '',
                    vote: 0,
                    color: '',
                };
                temp.tagId = item.id;
                temp.tagName = item.tagName;
                temp.vote = dataPriceTags[id].taggingCounter[item.id];
                temp.color = item.attributes !== null ? item.attributes.color : '';
                tagsdata.push(temp);
            });
        }
    }

    if (tagsdata !== undefined && tagsdata.length > 0) {
        if (tagsdata[0].color !== '') {
            style = `background: ${tagsdata[0].color};`;
        }
        let tooltipInner = '';
        if (tagsdata.length > 0) {
            tagsdata.forEach((tag, index) => {
                if (index === 0) {
                    tooltipInner += '';
                } else {
                    tooltipInner += `<li>${tag.tagName} (${tag.vote})</li>`;
                }
            });
        }

        if (tooltipInner === '') {
            tooltip = '';
        } else {
            tooltip += `<button class='tag-more' data-toggle="tooltip" data-html="true" data-placement="right" title="<ul>
${tooltipInner}
</ul>">
</button>`;
        }

        if (tooltip === '') {
            html += `<div class='tag-display no-more'>
<div
class="tag" style="${style}"
>
${tagsdata[0].tagName} (${tagsdata[0].vote})
</div>
</div>`;
        } else {
            html += `<div class='tag-display'>
<div
class="tag" style="${style}"
>
${tagsdata[0].tagName} (${tagsdata[0].vote})
</div>
${tooltip}
</div>`;
        }
    }
    return html;
}

function showPriceTags(id) {
    let html = priceTagsDealDetail(id);
    $(`.pricetag-${id}`).empty();
    $(`.pricetag-${id}`).append(html);
}

let getDaTaPriceTags = async function (listId) {
    if (listId !== undefined && listId !== null && listId.length > 0) {
        listId = listId.join(',');
    }
    const configGetPriceTag = {
        method: 'get',
        url: `/price-tag/tag-listing/aggregate-by-listing-ids/${listId}`,
    };
    try {
        const res = await axios(configGetPriceTag);
        dataPriceTags = { ...res.data.data };
    } catch (error) {
        console.log('error', error);
    }
};

let postDataPriceTags = async (priceTagData) => {
    let taggingDisplay = {};
    let taggingOthers = [];
    if (priceTagData.tagging !== undefined && priceTagData.tagging.length > 0) {
        priceTagData.tagging.map((tag, index) => {
            let tagId = tag.id;
            if (index === 0) {
                taggingDisplay = {
                    id: tagId,
                    count: priceTagData.taggingCounter[tagId],
                };
            } else {
                let temp = {
                    id: tagId,
                    count: priceTagData.taggingCounter[tagId],
                };
                taggingOthers.push(temp);
            }
        });
    } else {
        console.log('không có dữ liệu pricetag');
        return;
    }
    let dataTagPost = {
        listingId: priceTagData.listingId,
        taggingDisplay: taggingDisplay,
        taggingOthers: taggingOthers,
    };
    await postPriceTagsAPI(dataTagPost);
};

let postPriceTagsAPI = async (data) => {
    const configPostPriceTag = {
        method: 'post',
        url: '/price-tag/tag-tracking/view-listing',
        data: data,
    };

    await axios(configPostPriceTag)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
};

const styleHiddenAddressText = "text-decoration: underline; color: blue; cursor: pointer";
const textHiddenAddress = "Xem số nhà";

// ================= END PriceTags ===============
const localIndexVariables = {
    _dataPost: {
        address: null,
        fromAssignedDate: DEFAULT_FROM_DATE,
        guaranteedExpired: null,
        listingTypeId: null,
        liveType: null,
        ownerName: null,
        phone: null,
        propertyTypeIds: null,
        rlistingId: null,
        sort: {
            columnName: 'updatedDate',
            value: 'desc',
        },
        scorecardType: null,
        sourceId: null,
        tcId: null,
        toAssignedDate: DEFAULT_TO_DATE,
        type: 1,
        zoneField: null,
        teamField: null,
        districtId: null,
        wardId: null,
        memberField: null,
        departmentField: null,
    },
    _defaultSelected: {
        zoneIds: [
            {
                id: '',
                text: '--Tất cả Zone--',
            },
        ],
        teamIds: [
            {
                id: '',
                text: '--Tất cả Team--',
            },
        ],
        departmentIds: [
            {
                id: '',
                text: '--Tất cả Phòng ban--',
            },
        ],
        userIds: [
            {
                id: '',
                text: '--Tất cả Thành viên--',
            },
        ],
        wardIds: [
            {
                id: '',
                text: '--Tất cả Phường--',
            },
        ],
        districtIds: [
            {
                id: '',
                text: '--Tất cả Quận--',
            },
        ],
        sourceId: [
            {
                id: '',
                text: '--Tất cả nguồn--',
            },
        ],
        tcId: [
            {
                id: '',
                text: '--Tất cả trung tâm--',
            },
        ],
        infoChannel: [
            {
                id: '',
                text: '--Tất cả kênh thông tin--',
            },
        ],
        infoSource: [
            {
                id: '',
                text: '--Tất cả nguồn thông tin--',
            },
        ],
        listingTypeId: [
            {
                id: '',
                text: '--Tất cả loại giao dịch--',
            },
        ],
        propertyTypeIds: [
            {
                id: '',
                text: '--Tất cả loại hình bất động sản--',
            },
        ],
        liveType: [
            {
                id: '',
                text: '--Tất cả loại đăng tin--',
            },
        ],
        classified: [
            {
                id: '',
                text: '--Tất cả phân loại listing--',
            },
        ],
        bpo: [
            {
                id: '',
                text: '--Tất cả BPO--',
            },
        ],
    },
    _filter: {
        type: 1,
        phone: null,
        rlistingId: null,
        address: null,
        ownerName: null,
        liveType: null,
        sourceId: null, //"177_0,185_178,186_178"
        fromAssignedDate: DEFAULT_FROM_DATE,
        toAssignedDate: DEFAULT_TO_DATE,
        tcId: null,
        listingTypeId: null,
        propertyTypeIds: null,
        sort: {
            columnName: 'updatedDate',
            value: 'desc',
        },
        scorecardType: null,
        districtId: null,
        wardId: null,
        zoneField: null,
        teamField: null,
        departmentField: null,
        memberField: null,
        bpo: null,
    },
    stored: {
        tabIndex: {
            live: 1,
            living: 3,
            canceled: 4,
            notStandard: 2,
            archived: 5,
        },
        sourceId: null,
        sourceParentIds: new Set(),
        sourceChildList: new Map(),
        sourceChooseList: [],
        rlistingId: null,
        guaranteedExpired: null,
        listingTypeId: null,
        today: moment().format(DEFAULT_FORMAT_DATE),
        zoneField: null,
        teamField: null,
        departmentField: null,
        memberField: null,
        districtId: null,
        wardId: null,
    },
    _dataTableConfig: {
        processing: false,
        serverSide: true,
        bSort: false,
        autoWidth: true,
        deferRender: false,
        lengthChange: false,
        paging: false,
        info: false,
        searching: false,
        ordering: true,
        order: [[0, 'desc']],
        language: DatatableHelper.languages.vn,
    },
    columsTable: {
        live: [
            {
                data: 'updatedDate',
                visible: false,
                className: 'never',
                render: function (data, type, object) {
                    var updatedDate = hasValue(object.updatedDate)
                        ? object.updatedDate
                        : 'N/A';
                    return updatedDate;
                },
            },
            {
                data: 'rlistingId',
                render: function (data, type, object) {
                    var html =
                        '<a href="/pos/sa/detail/' +
                        object.rlistingId +
                        '" target="_blank"' +
                        '>' +
                        object.rlistingId +
                        '</a>';
                    let mess = '';
                    if (object.liveTypeId == 196) {
                        // rieng tu
                        mess += '<p>- Tin đăng riêng tư</p>';
                    }
                    if (object.isRequestByDiy == true) {
                        mess += '<p>- Có chỉnh sửa diy</p>';
                    }
                    if (hasValue(object.lastestDateFeedBack)) {
                        mess += '<p>- Có đánh giá của khách hàng</p>';
                    }
                    if (mess) {
                        html +=
                            '<span class="sa-tooltip" data-toggle="tooltip" data-placement="bottom">' +
                            mess +
                            '</span>';
                    }
                    return html;
                },
            },
            {
                data: 'ownerName',
                render: function (data, type, object) {
                    return `<p>${object.ownerName}</p>`;
                },
            },
            {
                data: 'bpoCloseDate',
                class: 'bpoCloseDate',
                render: function (data, type, object) {
                    return hasValue(object.bpoCloseDate)
                        ? moment(object.bpoCloseDate).format('DD/MM/YYYY')
                        : 'N/A';
                },
            },
            {
                data: 'timeCounter',
                render: function (data, type, object) {
                    const timeCounter = hasValue(object.timeCounter)
                        ? object.timeCounter
                        : '';
                    return timeCounter;
                },
            },
            {
                data: 'phone',
                render: function (data, type, object) {
                    const maskedPhone = generateMaskedPhone(object.phone)
                    return `<div data-plugin_toggleValue="true">
                                <div data-origin="true" style="white-space: nowrap; padding-right: 20px; position: relative;">
                                    <div data-btn="true" data-toggle-value=${object.phone} data-target="true" data-one-time="true">${maskedPhone}</div>
                                    <i data-btn="true" class="fa fa-eye view-phone-icon" aria-hidden="true" style="cursor: pointer; position: absolute; right: 0px; top: 0px"></i>
                                </div>
                            </div>`;
                },
            },
            {
                data: 'address',
                render: function (data, type, object) {
                    var address = hasValue(object.address) ? `
                        <div data-plugin_toggleValue="true">
                            <div data-toggle-value="${object.address}" data-one-time="true" data-target="true" data-origin="true">
                                <div data-btn="true" style="${styleHiddenAddressText}">${textHiddenAddress}</div>
                                <div>${object.maskedAddress || ""}</div>
                            </div>
                        </div>` : 'N/A';

                    if ([13, 14].indexOf(object.propertyTypeId) > -1) {
                        const landCode = hasValue(object.landCode)
                            ? object.landCode
                            : 'N/A';
                        const mapCode = hasValue(object.mapCode) ? object.mapCode : 'N/A';
                        address += `<br><a href="javascript:void(0);" class="control-label text-danger land-code-list" data-rlistingid="${object.rlistingId}">Số thửa : ${landCode}</a> `;
                        address += `<br><a href="javascript:void(0);" class="control-label text-primary map-code-list" data-rlistingid="${object.rlistingId}">Tờ bản đồ : ${mapCode}</a> `;
                    }
                    return address;
                },
            },
            {
                data: 'districtName',
                class: 'districtName',
                render: function (data, type, object) {
                    var districtName = hasValue(object.districtName)
                        ? object.districtName
                        : 'N/A';
                    return districtName;
                },
            },
            {
                data: 'price',
                class: 'price',
                render: function (data, type, object) {
                    var price = hasValue(object.formatedPrice)
                        ? object.formatedPrice + '(' + object.currency + ')'
                        : 'N/A';
                    return price;
                },
            },
            {
                data: 'sourceName',
                class: 'sourceName',
                render: function (data, type, object) {
                    return renderDIY(object);
                },
            },
            {
                data: 'listingTypeId',
                class: 'listingTypeId',
                render: function (data, type, object) {
                    return typeof getNameListingType !== 'undefined' &&
                        getNameListingType(data)
                        ? getNameListingType(data).sale.name
                        : 'N/A';
                },
            },
            {
                data: "propertyTypeGroupName",
                class: "propertyTypeGroupName",
                render: function (data, type, object) {
                    return renderSpecificField(object, 'propertyTypeGroupName')
                },
            },
            {
                data: 'propertyTypeId',
                class: 'propertyTypeName',
                render: function (data, type, object) {
                    return hasValue(object.propertyTypeName)
                        ? object.propertyTypeName
                        : 'N/A';
                },
            },
            {
                data: 'contractId',
                class: 'contractId text-center',
                orderable: true,
                render: function (data, type, object) {
                    var html =
                    '<a href="/contract-management/' +
                    object.contractId +
                    '" target="_blank"' +
                    '>' +
                    "Xem"
                    '</a>';
                    return hasValue(object.contractId)
                    ? html
                    : "";
                }
            },
            {
                data: 'assignedDate',
                class: 'assignedDate',
                render: function (data, type, object) {
                    return hasValue(object.assignedDate)
                        ? moment(object.assignedDate).format('HH:mm:ss DD/MM/YYYY')
                        : 'N/A';
                },
            },
            {
                data: 'psAssignedName',
                class: 'psAssignedName',
                render: function (data, type, object) {
                    return hasValue(object.psAssignedName)
                        ? object.psAssignedName
                        : 'N/A';
                },
            },
            {
                data: 'assignedName',
                class: 'assignedName-wrapper',
                render: function (data, type, object) {
                    var assignedName = hasValue(object.assignedName)
                        ? object.assignedName
                        : 'N/A';
                    return assignedName;
                },
            },
        ],
        living: [
            {
                data: 'updatedDate',
                visible: false,
                className: 'never',
                render: function (data, type, object) {
                    var updatedDate = hasValue(object.updatedDate)
                        ? object.updatedDate
                        : 'N/A';
                    return updatedDate;
                },
            },
            {
                data: 'rlistingId',
                render: function (data, type, object) {
                    let _onMouseDown = '';
                    if (object.bpoLabel.indexOf('BPO:') !== -1) {
                        _onMouseDown = `onMouseDown="return postDataPriceTags(dataPriceTags[${object.rlistingId}]); return true"`;
                    }
                    var html =
                        '<a href="/pos/sa/detail/' +
                        object.rlistingId +
                        '" target="_blank"' +
                        _onMouseDown +
                        '>' +
                        object.rlistingId +
                        '</a>';
                    if (hasValue(object.latestHistory)) {
                        html +=
                            '<br><i class="fa fa-clock-o lasted-owner-see" data-id="' +
                            object.rlistingId +
                            '"></i>';
                    }

                    let mess = '';
                    if (object.livePrivate === true) {
                        // rieng tu
                        mess += '<p>- Tin đăng riêng tư cần bán gấp</p>';
                    }
                    if (object.isRequestByDiy == true) {
                        mess += '<p>- Có chỉnh sửa diy</p>';
                    }
                    if (hasValue(object.lastestDateFeedBack)) {
                        mess += '<p>- Có đánh giá của khách hàng</p>';
                    }
                    if (hasValue(object.latestHistory)) {
                        if (
                            typeof ownerActivitesKey !== 'undefined' &&
                            ownerActivitesKey(object.latestHistory.code) !== null
                        ) {
                            mess +=
                                '<p>- Ngày ' +
                                moment(object.latestHistory.historyTime).format(
                                    'DD/MM/YYYY HH:mm:ss'
                                ) +
                                ' - ' +
                                ownerActivitesKey(object.latestHistory.code).name +
                                '</p>';
                        }
                    }

                    if (mess) {
                        html +=
                            '<span class="sa-tooltip" data-toggle="tooltip" data-placement="bottom">' +
                            mess +
                            '</span>';
                    }
                    return html;
                },
            },
            {
                data: 'ownerName',
                render: function (data, type, object) {
                    let bpoRenderText = '';
                    if (object.listingTypeId && object.listingTypeId !== 2) {
                        let _onClick = '';
                        // bpoFlag: 1 - không có quyền, 2 - chưa có BPO, 3 - đã có bpo
                        switch (object.bpoFlag) {
                            case 1:
                                bpoRenderText = `<span class="bpo-popup" data-id="${object.rlistingId}">
                                            ${object.bpoLabel}
                                        </span>`;
                                break;
                            case 2:
                                _onClick = `onClick="Window.showSaCreateBpo(${object.listingTypeId},${object.rlistingId});return false;"`;
                                bpoRenderText = `<a ${_onClick} style="cursor:pointer;" class="bpo-popup" data-id="${object.rlistingId}">
                                            ${object.bpoLabel}
                                        </a>`;
                                break;

                            default:
                                _onClick = `onClick="Window.showSaBpoEvaluationHistor(${object.listingTypeId},${object.rlistingId});return false;"`;
                                bpoRenderText = `<a ${_onClick} style="cursor:pointer;" class="bpo-popup" data-id="${object.rlistingId}">
                                            ${object.bpoLabel}
                                        </a>`;
                                break;
                        }
                    }

                    if (object.scorecardType != null) {
                        let colorLabel =
                            object.scorecardType === 1637
                                ? 'label-high'
                                : object.scorecardType === 1638
                                    ? 'label-medium'
                                    : object.scorecardType === 1639
                                        ? 'label-low'
                                        : 'label-unclassified';
                        return `<p>${object.ownerName}</p>

                                <p>${hasValue(object.score)
                                ? object.score
                                : '<a href="#" class="btnShowLogScoreCard" data-rListingId="' +
                                object.rlistingId +
                                '" data-toggle="modal" data-target="#modalLogScoreCard">N/A</a>'
                            }</p>

                                <p>${hasValue(object.scorecardName)
                                ? '<i class="fa fa-circle ' +
                                colorLabel +
                                '"></i> ' +
                                object.scorecardName
                                : 'N/A'
                            }
                                </p>

                                ${bpoRenderText}`;
                    }
                    return `<p>${object.ownerName}</p>
                            ${bpoRenderText}`;
                },
            },
            {
                data: 'address',
                render: function (data, type, object) {
                    var address = hasValue(object.address) ? `
                        <div data-plugin_toggleValue="true">
                            <div data-toggle-value="${object.address}" data-one-time="true" data-target="true" data-origin="true">
                                <div data-btn="true" style="${styleHiddenAddressText}">${textHiddenAddress}</div>
                                <div>${object.maskedAddress || ""}</div>
                            </div>
                        </div>` : 'N/A';

                    if ([13, 14].indexOf(object.propertyTypeId) > -1) {
                        const landCode = hasValue(object.landCode)
                            ? object.landCode
                            : 'N/A';
                        const mapCode = hasValue(object.mapCode) ? object.mapCode : 'N/A';
                        address += `<br><a href="javascript:void(0);" class="control-label text-danger land-code-list" data-rlistingid="${object.rlistingId}">Số thửa : ${landCode}</a> `;
                        address += `<br><a href="javascript:void(0);" class="control-label text-primary map-code-list" data-rlistingid="${object.rlistingId}">Tờ bản đồ : ${mapCode}</a> `;
                    }
                    return address;
                },
            },
            {
                data: 'price',
                class: 'price',
                render: function (data, type, object) {
                    var price = hasValue(object.formatedPrice)
                        ? object.formatedPrice + '(' + object.currency + ')'
                        : 'N/A';
                    //=============priceTags==================
                    if (object.bpoLabel.indexOf('BPO:') !== -1) {
                        price +=
                            '<div class="pricetag-' +
                            object.rlistingId +
                            '">' +
                            priceTagsDealDetail(object.rlistingId) +
                            '</div>';
                    }
                    return price;
                },
            },
            {
                data: 'unitPrice',
                orderable: false,
                className: 'unitPrice',
                render: function (data, type, object) {
                    return data;
                },
            },
            {
                data: 'phone',
                render: function (data, type, object) {
                    const maskedPhone = generateMaskedPhone(object.phone)
                    return `<div data-plugin_toggleValue="true">
                                <div data-origin="true" style="white-space: nowrap; padding-right: 20px; position: relative;">
                                    <div data-btn="true" data-toggle-value=${object.phone} data-target="true" data-one-time="true">${maskedPhone}</div>
                                    <i data-btn="true" class="fa fa-eye view-phone-icon" aria-hidden="true" style="cursor: pointer; position: absolute; right: 0px; top: 0px"></i>
                                </div>
                            </div>`;
                },
            },
            {
                data: 'bpoCloseDate',
                class: 'bpoCloseDate',
                render: function (data, type, object) {
                    return hasValue(object.bpoCloseDate)
                        ? moment(object.bpoCloseDate).format('DD/MM/YYYY')
                        : 'N/A';
                },
            },
            {
                data: 'bpoCloseDateRemain',
                orderable: false,
                className: 'bpoCloseDateRemain',
                render: function (data, type, object) {
                    if (!hasValue(data)) {
                        return 'N/A';
                    }
                    let _diffBpoCloseDate = null;
                    if (hasValue(object.diffBpoCloseDate)) {
                        let _icon = `<i class="fa fa-arrow-up" aria-hidden="true"></i>`;
                        if (object.diffBpoCloseDate < 0) {
                            _icon = `<i class="fa fa-arrow-down" aria-hidden="true"></i>`;
                        }
                        _diffBpoCloseDate = `<a href="#" onClick="showPopoverHistory(this);return false;" data-poload="${baseApi}bpo/get-history-closing-date-for-bsa/${object.rlistingId
                            }?access_token=${currentUser.token
                            }" class="label label-default">${_icon} ${Math.abs(
                                object.diffBpoCloseDate
                            )}</a>`;
                    }
                    return `<span>${data} ${hasValue(_diffBpoCloseDate) ? _diffBpoCloseDate : ''
                        }</span>`;
                },
            },
            {
                data: 'districtName',
                class: 'districtName',
                render: function (data, type, object) {
                    var districtName = hasValue(object.districtName)
                        ? object.districtName
                        : 'N/A';
                    return districtName;
                },
            },
            {
                data: 'basketDeals',
                orderable: false,
                class: 'basketDeals',
                render: function (data, type, object) {
                    if (hasValue(data))
                        return `<a style="text-decoration:underline;" href="#" onClick="Window.renderModalDeals(${object.rlistingId
                            },'${data.dealIDs.join(',')}')">${data.count} ${data.count > 1 ? 'deals' : 'deal'
                            }</a>`;
                    return 'N/A';
                },
            },
            {
                data: 'bestDeals',
                orderable: false,
                class: 'bestDeals',
                render: function (data, type, object) {
                    if (hasValue(data))
                        return `<a href="#" onClick="Window.renderModalDeals(${object.rlistingId
                            },'${data.dealIDs.join(',')}')">${data.statusName} (${data.count
                            })</a>`;
                    return 'N/A';
                },
            },
            {
                data: 'listingTypeId',
                class: 'listingTypeId',
                render: function (data, type, object) {
                    return typeof getNameListingType !== 'undefined' &&
                        getNameListingType(data)
                        ? getNameListingType(data).sale.name
                        : 'N/A';
                },
            },
            {
                data: "propertyTypeGroupName",
                class: "propertyTypeGroupName",
                render: function (data, type, object) {
                    return renderSpecificField(object, 'propertyTypeGroupName')
                },
            },
            {
                data: 'propertyTypeId',
                class: 'propertyTypeName',
                render: function (data, type, object) {
                    return hasValue(object.propertyTypeName)
                        ? object.propertyTypeName
                        : 'N/A';
                },
            },
            {
                data: 'liveType',
                class: 'liveType',
                render: function (data, type, object) {
                    var liveType = hasValue(object.liveType) ? object.liveType : 'N/A';
                    return liveType;
                },
            },
            {
                data: 'updatedDate',
                class: 'updatedDate',
                render: function (data, type, object) {
                    return hasValue(object.updatedDate)
                        ? moment(object.updatedDate).format('HH:mm:ss DD/MM/YYYY')
                        : 'N/A';
                },
            },
            {
                data: 'guaranteedExpiredDate',
                class: 'guaranteedExpiredDate',
                render: function (data, type, object) {
                    let guaranteedExpiredDate = hasValue(object.guaranteedExpiredDate)
                        ? moment(object.guaranteedExpiredDate).format(DEFAULT_FORMAT_DATE)
                        : 'N/A';
                    //const guaranteedSignedDate = hasValue(object.guaranteedSignedDate) ? moment(object.guaranteedSignedDate).format('DD/MM/YYYY') : 'N/A';
                    if (object.liveTypeId == 197) {
                        //'độc quyền'
                        guaranteedExpiredDate =
                            guaranteedExpiredDate +
                            ' <a href="javascrip:void()" class="editGuaranteedExpiredDate" data-object=' +
                            JSON.stringify({
                                rlistingId: object.rlistingId,
                                guaranteedExpiredDate: object.guaranteedExpiredDate,
                                guaranteedSignedDate: object.guaranteedSignedDate,
                            }) +
                            '> <i class="fa fa-edit"></i></a>';
                    }
                    return guaranteedExpiredDate;
                },
            },
            {
                data: 'contractId',
                class: 'contractId text-center',
                orderable: true,
                render: function (data, type, object) {
                    var html =
                    '<a href="/contract-management/' +
                    object.contractId +
                    '" target="_blank"' +
                    '>' +
                    "Xem"
                    '</a>';
                    return hasValue(object.contractId)
                    ? html
                    : "";
                }
            },
            {
                data: 'deal-tour',
                class: 'numberDeal-wrapper',
                orderable: false,
                render: function (data, type, object) {
                    const numberDeal = hasValueV2(object.numberDeal)
                        ? object.numberDeal
                        : 'N/A';
                    const numberTour = hasValueV2(object.numberTour)
                        ? object.numberTour
                        : 'N/A';

                    const html = `<a href="javascript:void(0);" class="control-label text-danger open-deal-total-list" data-rlistingid="${object.rlistingId}">Số Deal : ${numberDeal}</a> <br>
<a href="javascript:void(0);" class="control-label text-primary open-tour-total-list" data-rlistingid="${object.rlistingId}">Số Tour : ${numberTour}</a> `;
                    return html;
                },
            },
            {
                data: 'statusCreateDate',
                render: function (data, type, object) {
                    var statusCreateDate = hasValue(object.statusCreateDate)
                        ? moment(object.statusCreateDate).format('HH:mm:ss DD/MM/YYYY')
                        : 'N/A';
                    return statusCreateDate;
                },
            },
            {
                data: 'sourceName',
                class: 'sourceName',
                render: function (data, type, object) {
                    return renderDIY(object);
                },
            },
            {
                data: 'timeCounter',
                render: function (data, type, object) {
                    const timeCounter = hasValue(object.timeCounter)
                        ? object.timeCounter
                        : '';
                    return timeCounter;
                },
            },
            {
                data: 'assignedDate',
                class: 'assignedDate',
                render: function (data, type, object) {
                    return hasValue(object.assignedDate)
                        ? moment(object.assignedDate).format('HH:mm:ss DD/MM/YYYY')
                        : 'N/A';
                },
            },
            {
                data: 'psAssignedName',
                class: 'psAssignedName',
                render: function (data, type, object) {
                    return hasValue(object.psAssignedName)
                        ? object.psAssignedName
                        : 'N/A';
                },
            },
            {
                data: 'assignedName',
                class: 'assignedName-wrapper',
                render: function (data, type, object) {
                    var assignedName = hasValue(object.assignedName)
                        ? object.assignedName
                        : 'N/A';
                    return assignedName;
                },
            },
        ],
        canceled: [
            {
                data: 'updatedDate',
                visible: false,
                className: 'never',
                render: function (data, type, object) {
                    var updatedDate = hasValue(object.updatedDate)
                        ? object.updatedDate
                        : 'N/A';
                    return updatedDate;
                },
            },
            {
                data: 'rlistingId',
                render: function (data, type, object) {
                    return (
                        '<a href="/pos/sa/detail/' +
                        object.rlistingId +
                        '" target="_blank"' +
                        '>' +
                        object.rlistingId +
                        '</a>'
                    );
                },
            },
            {
                data: 'ownerName',
                render: function (data, type, object) {
                    return `<p>${object.ownerName}</p>`;
                },
            },
            {
                data: 'bpoCloseDate',
                class: 'bpoCloseDate',
                render: function (data, type, object) {
                    return hasValue(object.bpoCloseDate)
                        ? moment(object.bpoCloseDate).format('DD/MM/YYYY')
                        : 'N/A';
                },
            },
            {
                data: 'timeCounter',
                render: function (data, type, object) {
                    const timeCounter = hasValue(object.timeCounter)
                        ? object.timeCounter
                        : '';
                    return timeCounter;
                },
            },
            {
                data: 'phone',
                render: function (data, type, object) {
                    const maskedPhone = generateMaskedPhone(object.phone)
                    return `<div data-plugin_toggleValue="true">
                                <div data-origin="true" style="white-space: nowrap; padding-right: 20px; position: relative;">
                                    <div data-btn="true" data-toggle-value=${object.phone} data-target="true" data-one-time="true">${maskedPhone}</div>
                                    <i data-btn="true" class="fa fa-eye view-phone-icon" aria-hidden="true" style="cursor: pointer; position: absolute; right: 0px; top: 0px"></i>
                                </div>
                            </div>`;
                },
            },
            {
                data: 'address',
                render: function (data, type, object) {
                    var address = hasValue(object.address) ? `
                        <div data-plugin_toggleValue="true">
                            <div data-toggle-value="${object.address}" data-one-time="true" data-target="true" data-origin="true">
                                <div data-btn="true" style="${styleHiddenAddressText}">${textHiddenAddress}</div>
                                <div>${object.maskedAddress || ""}</div>
                            </div>
                        </div>` : 'N/A';

                    if ([13, 14].indexOf(object.propertyTypeId) > -1) {
                        const landCode = hasValue(object.landCode)
                            ? object.landCode
                            : 'N/A';
                        const mapCode = hasValue(object.mapCode) ? object.mapCode : 'N/A';
                        address += `<br><a href="javascript:void(0);" class="control-label text-danger land-code-list" data-rlistingid="${object.rlistingId}">Số thửa : ${landCode}</a> `;
                        address += `<br><a href="javascript:void(0);" class="control-label text-primary map-code-list" data-rlistingid="${object.rlistingId}">Tờ bản đồ : ${mapCode}</a> `;
                    }
                    return address;
                },
            },
            {
                data: 'districtName',
                class: 'districtName',
                render: function (data, type, object) {
                    var districtName = hasValue(object.districtName)
                        ? object.districtName
                        : 'N/A';
                    return districtName;
                },
            },
            {
                data: 'price',
                class: 'price',
                render: function (data, type, object) {
                    var price = hasValue(object.formatedPrice)
                        ? object.formatedPrice + '(' + object.currency + ')'
                        : 'N/A';
                    return price;
                },
            },
            {
                data: 'sourceName',
                class: 'sourceName',
                render: function (data, type, object) {
                    return renderDIY(object);
                },
            },
            {
                data: 'listingTypeId',
                class: 'listingTypeId',
                render: function (data, type, object) {
                    return typeof getNameListingType !== 'undefined' &&
                        getNameListingType(data)
                        ? getNameListingType(data).sale.name
                        : 'N/A';
                },
            },
            {
                data: "propertyTypeGroupName",
                class: "propertyTypeGroupName",
                render: function (data, type, object) {
                    return renderSpecificField(object, 'propertyTypeGroupName')
                },
            },
            {
                data: 'propertyTypeId',
                class: 'propertyTypeName',
                render: function (data, type, object) {
                    return hasValue(object.propertyTypeName)
                        ? object.propertyTypeName
                        : 'N/A';
                },
            },
            {
                data: 'contractId',
                class: 'contractId text-center',
                orderable: true,
                render: function (data, type, object) {
                    var html =
                    '<a href="/contract-management/' +
                    object.contractId +
                    '" target="_blank"' +
                    '>' +
                    "Xem"
                    '</a>';
                    return hasValue(object.contractId)
                    ? html
                    : "";
                }
            },
            {
                data: 'statusCreateDate',
                class: 'statusCreateDate',
                render: function (data, type, object) {
                    return hasValue(object.statusCreateDate)
                        ? moment(object.statusCreateDate).format('HH:mm:ss DD/MM/YYYY')
                        : 'N/A';
                },
            },
            {
                data: 'psAssignedName',
                class: 'psAssignedName',
                render: function (data, type, object) {
                    return hasValue(object.psAssignedName)
                        ? object.psAssignedName
                        : 'N/A';
                },
            },
            {
                data: 'assignedName',
                class: 'assignedName-wrapper',
                render: function (data, type, object) {
                    var assignedName = hasValue(object.assignedName)
                        ? object.assignedName
                        : 'N/A';
                    return assignedName;
                },
            },
            {
                data: 'reasonName',
                class: 'reasonName',
                orderable: false,
                render: function (data, type, object) {
                    var reasonName = hasValue(object.reasonName)
                        ? object.reasonName
                        : 'N/A';
                    return reasonName;
                },
            },
        ],
        notStandard: [
            {
                data: 'updatedDate',
                visible: false,
                className: 'never',
                render: function (data, type, object) {
                    var updatedDate = hasValue(object.updatedDate)
                        ? object.updatedDate
                        : 'N/A';
                    return updatedDate;
                },
            },
            {
                data: 'rlistingId',
                render: function (data, type, object) {
                    return (
                        '<a href="/pos/sa/detail/' +
                        object.rlistingId +
                        '" target="_blank"' +
                        '>' +
                        object.rlistingId +
                        '</a>'
                    );
                },
            },
            {
                data: 'ownerName',
                render: function (data, type, object) {
                    return `<p>${object.ownerName}</p>`;
                },
            },
            {
                data: 'bpoCloseDate',
                class: 'bpoCloseDate',
                render: function (data, type, object) {
                    return hasValue(object.bpoCloseDate)
                        ? moment(object.bpoCloseDate).format('DD/MM/YYYY')
                        : 'N/A';
                },
            },
            {
                data: 'timeCounter',
                render: function (data, type, object) {
                    const timeCounter = hasValue(object.timeCounter)
                        ? object.timeCounter
                        : '';
                    return timeCounter;
                },
            },
            {
                data: 'phone',
                render: function (data, type, object) {
                    const maskedPhone = generateMaskedPhone(object.phone)
                    return `<div data-plugin_toggleValue="true">
                                <div data-origin="true" style="white-space: nowrap; padding-right: 20px; position: relative;">
                                    <div data-btn="true" data-toggle-value="${object.phone}" data-target="true" data-one-time="true">${maskedPhone}</div>
                                    <i data-btn="true" class="fa fa-eye view-phone-icon" aria-hidden="true" style="cursor: pointer; position: absolute; right: 0px; top: 0px"></i>
                                </div>
                            </div>`;
                },
            },
            {
                data: 'address',
                render: function (data, type, object) {
                    var address = hasValue(object.address) ? `
                        <div data-plugin_toggleValue="true">
                            <div data-toggle-value="${object.address}" data-one-time="true" data-target="true" data-origin="true">
                                <div data-btn="true" style="${styleHiddenAddressText}">${textHiddenAddress}</div>
                                <div>${object.maskedAddress || ""}</div>
                            </div>
                        </div>` : 'N/A';

                    if ([13, 14].indexOf(object.propertyTypeId) > -1) {
                        const landCode = hasValue(object.landCode)
                            ? object.landCode
                            : 'N/A';
                        const mapCode = hasValue(object.mapCode) ? object.mapCode : 'N/A';
                        address += `<br><a href="javascript:void(0);" class="control-label text-danger land-code-list" data-rlistingid="${object.rlistingId}">Số thửa : ${landCode}</a> `;
                        address += `<br><a href="javascript:void(0);" class="control-label text-primary map-code-list" data-rlistingid="${object.rlistingId}">Tờ bản đồ : ${mapCode}</a> `;
                    }
                    return address;
                },
            },
            {
                data: 'districtName',
                class: 'districtName',
                render: function (data, type, object) {
                    var districtName = hasValue(object.districtName)
                        ? object.districtName
                        : 'N/A';
                    return districtName;
                },
            },
            {
                data: 'price',
                class: 'price',
                render: function (data, type, object) {
                    var price = hasValue(object.formatedPrice)
                        ? object.formatedPrice + '(' + object.currency + ')'
                        : 'N/A';
                    return price;
                },
            },
            {
                data: 'sourceName',
                class: 'sourceName',
                render: function (data, type, object) {
                    return renderDIY(object);
                },
            },
            {
                data: 'listingTypeId',
                class: 'listingTypeId',
                render: function (data, type, object) {
                    return typeof getNameListingType !== 'undefined' &&
                        getNameListingType(data)
                        ? getNameListingType(data).sale.name
                        : 'N/A';
                },
            },
            {
                data: "propertyTypeGroupName",
                class: "propertyTypeGroupName",
                render: function (data, type, object) {
                    return renderSpecificField(object, 'propertyTypeGroupName')
                },
            },
            {
                data: 'propertyTypeId',
                class: 'propertyTypeName',
                render: function (data, type, object) {
                    return hasValue(object.propertyTypeName)
                        ? object.propertyTypeName
                        : 'N/A';
                },
            },
            {
                data: 'contractId',
                class: 'contractId text-center',
                orderable: true,
                render: function (data, type, object) {
                    var html =
                    '<a href="/contract-management/' +
                    object.contractId +
                    '" target="_blank"' +
                    '>' +
                    "Xem"
                    '</a>';
                    return hasValue(object.contractId)
                    ? html
                    : "";
                }
            },
            {
                data: 'assignedDate',
                class: 'assignedDate',
                render: function (data, type, object) {
                    return hasValue(object.assignedDate)
                        ? moment(object.assignedDate).format('HH:mm:ss DD/MM/YYYY')
                        : 'N/A';
                },
            },
            {
                data: 'psAssignedName',
                class: 'psAssignedName',
                render: function (data, type, object) {
                    return hasValue(object.psAssignedName)
                        ? object.psAssignedName
                        : 'N/A';
                },
            },
            {
                data: 'assignedName',
                class: 'assignedName-wrapper',
                render: function (data, type, object) {
                    var assignedName = hasValue(object.assignedName)
                        ? object.assignedName
                        : 'N/A';
                    return assignedName;
                },
            },
            {
                data: 'reasonName',
                class: 'reasonName-wrapper',
                render: function (data, type, object) {
                    var reasonName = hasValue(object.reasonName)
                        ? object.reasonName
                        : 'N/A';
                    return reasonName;
                },
            },
        ],
        archived: [
            {
                data: 'updatedDate',
                visible: false,
                className: 'never',
                render: function (data, type, object) {
                    var updatedDate = hasValue(object.updatedDate)
                        ? object.updatedDate
                        : 'N/A';
                    return updatedDate;
                },
            },
            {
                data: 'rlistingId',
                render: function (data, type, object) {
                    var html =
                        '<a href="/pos/sa/detail/' +
                        object.rlistingId +
                        '" target="_blank"' +
                        '>' +
                        object.rlistingId +
                        '</a>';
                    if (hasValue(object.latestHistory)) {
                        html +=
                            '<br><i class="fa fa-clock-o lasted-owner-see" data-id="' +
                            object.rlistingId +
                            '"></i>';
                    }

                    let mess = '';
                    if (object.livePrivate === true) {
                        // rieng tu
                        mess += '<p>- Tin đăng riêng tư cần bán gấp</p>';
                    }
                    if (object.isRequestByDiy == true) {
                        mess += '<p>- Có chỉnh sửa diy</p>';
                    }
                    if (hasValue(object.lastestDateFeedBack)) {
                        mess += '<p>- Có đánh giá của khách hàng</p>';
                    }
                    if (hasValue(object.latestHistory)) {
                        if (
                            typeof ownerActivitesKey !== 'undefined' &&
                            ownerActivitesKey(object.latestHistory.code) !== null
                        ) {
                            mess +=
                                '<p>- Ngày ' +
                                moment(object.latestHistory.historyTime).format(
                                    'DD/MM/YYYY HH:mm:ss'
                                ) +
                                ' - ' +
                                ownerActivitesKey(object.latestHistory.code).name +
                                '</p>';
                        }
                    }

                    if (mess) {
                        html +=
                            '<span class="sa-tooltip" data-toggle="tooltip" data-placement="bottom">' +
                            mess +
                            '</span>';
                    }
                    return html;
                },
            },
            {
                data: 'ownerName',
                render: function (data, type, object) {
                    let bpoRenderText = '';
                    if (object.scorecardType != null) {
                        let colorLabel =
                            object.scorecardType === 1637
                                ? 'label-high'
                                : object.scorecardType === 1638
                                    ? 'label-medium'
                                    : object.scorecardType === 1639
                                        ? 'label-low'
                                        : 'label-unclassified';
                        return `<p>${object.ownerName}</p>
                                <p>${hasValue(object.score)
                                ? object.score
                                : '<a href="#" class="btnShowLogScoreCard" data-rListingId="' +
                                object.rlistingId +
                                '" data-toggle="modal" data-target="#modalLogScoreCard">N/A</a>'
                            }</p>
                                <p>${hasValue(object.scorecardName)
                                ? '<i class="fa fa-circle ' +
                                colorLabel +
                                '"></i> ' +
                                object.scorecardName
                                : 'N/A'
                            }</p>
                                ${bpoRenderText}`;
                    }
                    return `<p>${object.ownerName}</p>`;
                },
            },
            {
                data: 'bpoCloseDate',
                class: 'bpoCloseDate',
                render: function (data, type, object) {
                    return hasValue(object.bpoCloseDate)
                        ? moment(object.bpoCloseDate).format('DD/MM/YYYY')
                        : 'N/A';
                },
            },
            {
                data: 'timeCounter',
                render: function (data, type, object) {
                    const timeCounter = hasValue(object.timeCounter)
                        ? object.timeCounter
                        : '';
                    return timeCounter;
                },
            },
            {
                data: 'phone',
                render: function (data, type, object) {
                    const maskedPhone = generateMaskedPhone(object.phone)
                    return `<div data-plugin_toggleValue="true">
                                <div data-origin="true" style="white-space: nowrap; padding-right: 20px; position: relative;">
                                    <div data-btn="true" data-toggle-value=${object.phone} data-target="true" data-one-time="true">${maskedPhone}</div>
                                    <i data-btn="true" class="fa fa-eye view-phone-icon" aria-hidden="true" style="cursor: pointer; position: absolute; right: 0px; top: 0px"></i>
                                </div>
                            </div>`;
                },
            },
            {
                data: 'address',
                render: function (data, type, object) {
                    var address = hasValue(object.address) ? `
                        <div data-plugin_toggleValue="true">
                            <div data-toggle-value="${object.address}" data-one-time="true" data-target="true" data-origin="true">
                                <div data-btn="true" style="${styleHiddenAddressText}">${textHiddenAddress}</div>
                                <div>${object.maskedAddress || ""}</div>
                            </div>
                        </div>` : 'N/A';

                    if ([13, 14].indexOf(object.propertyTypeId) > -1) {
                        const landCode = hasValue(object.landCode)
                            ? object.landCode
                            : 'N/A';
                        const mapCode = hasValue(object.mapCode) ? object.mapCode : 'N/A';
                        address += `<br><a href="javascript:void(0);" class="control-label text-danger land-code-list" data-rlistingid="${object.rlistingId}">Số thửa : ${landCode}</a> `;
                        address += `<br><a href="javascript:void(0);" class="control-label text-primary map-code-list" data-rlistingid="${object.rlistingId}">Tờ bản đồ : ${mapCode}</a> `;
                    }
                    return address;
                },
            },
            {
                data: 'districtName',
                class: 'districtName',
                render: function (data, type, object) {
                    var districtName = hasValue(object.districtName)
                        ? object.districtName
                        : 'N/A';
                    return districtName;
                },
            },
            {
                data: 'price',
                class: 'price',
                render: function (data, type, object) {
                    var price = hasValue(object.formatedPrice)
                        ? object.formatedPrice + '(' + object.currency + ')'
                        : 'N/A';
                    return price;
                },
            },
            {
                data: 'liveType',
                class: 'liveType',
                render: function (data, type, object) {
                    var liveType = hasValue(object.liveType) ? object.liveType : 'N/A';
                    return liveType;
                },
            },
            {
                data: 'updatedDate',
                class: 'updatedDate',
                render: function (data, type, object) {
                    return hasValue(object.updatedDate)
                        ? moment(object.updatedDate).format('HH:mm:ss DD/MM/YYYY')
                        : 'N/A';
                },
            },
            {
                data: 'guaranteedExpiredDate',
                class: 'guaranteedExpiredDate',
                render: function (data, type, object) {
                    let guaranteedExpiredDate = hasValue(object.guaranteedExpiredDate)
                        ? moment(object.guaranteedExpiredDate).format(DEFAULT_FORMAT_DATE)
                        : 'N/A';
                    //const guaranteedSignedDate = hasValue(object.guaranteedSignedDate) ? moment(object.guaranteedSignedDate).format('DD/MM/YYYY') : 'N/A';
                    if (object.liveTypeId == 197) {
                        //'độc quyền'
                        guaranteedExpiredDate =
                            guaranteedExpiredDate +
                            ' <a href="javascrip:void()" class="editGuaranteedExpiredDate" data-object=' +
                            JSON.stringify({
                                rlistingId: object.rlistingId,
                                guaranteedExpiredDate: object.guaranteedExpiredDate,
                                guaranteedSignedDate: object.guaranteedSignedDate,
                            }) +
                            '> <i class="fa fa-edit"></i></a>';
                    }
                    return guaranteedExpiredDate;
                },
            },
            {
                data: 'contractId',
                class: 'contractId text-center',
                orderable: true,
                render: function (data, type, object) {
                    var html =
                    '<a href="/contract-management/' +
                    object.contractId +
                    '" target="_blank"' +
                    '>' +
                    "Xem"
                    '</a>';
                    return hasValue(object.contractId)
                    ? html
                    : "";
                }
            },
            {
                data: 'deal-tour',
                class: 'numberDeal-wrapper',
                orderable: false,
                render: function (data, type, object) {
                    const numberDeal = hasValueV2(object.numberDeal)
                        ? object.numberDeal
                        : 'N/A';
                    const numberTour = hasValueV2(object.numberTour)
                        ? object.numberTour
                        : 'N/A';

                    const html = `<a href="javascript:void(0);" class="control-label text-danger open-deal-total-list" data-rlistingid="${object.rlistingId}">Số Deal : ${numberDeal}</a> <br>
<a href="javascript:void(0);" class="control-label text-primary open-tour-total-list" data-rlistingid="${object.rlistingId}">Số Tour : ${numberTour}</a> `;
                    return html;
                },
            },
            {
                data: 'statusCreateDate',
                render: function (data, type, object) {
                    var statusCreateDate = hasValue(object.statusCreateDate)
                        ? moment(object.statusCreateDate).format('HH:mm:ss DD/MM/YYYY')
                        : 'N/A';
                    return statusCreateDate;
                },
            },
            {
                data: 'sourceName',
                class: 'sourceName',
                render: function (data, type, object) {
                    return renderDIY(object);
                },
            },
            {
                data: 'listingTypeId',
                class: 'listingTypeId',
                render: function (data, type, object) {
                    return typeof getNameListingType !== 'undefined' &&
                        getNameListingType(data)
                        ? getNameListingType(data).sale.name
                        : 'N/A';
                },
            },
            {
                data: "propertyTypeGroupName",
                class: "propertyTypeGroupName",
                render: function (data, type, object) {
                    return renderSpecificField(object, 'propertyTypeGroupName')
                },
            },
            {
                data: 'propertyTypeId',
                class: 'propertyTypeName',
                render: function (data, type, object) {
                    return hasValue(object.propertyTypeName)
                        ? object.propertyTypeName
                        : 'N/A';
                },
            },
            {
                data: 'assignedDate',
                class: 'assignedDate',
                render: function (data, type, object) {
                    return hasValue(object.assignedDate)
                        ? moment(object.assignedDate).format('HH:mm:ss DD/MM/YYYY')
                        : 'N/A';
                },
            },
            {
                data: 'psAssignedName',
                class: 'psAssignedName',
                render: function (data, type, object) {
                    return hasValue(object.psAssignedName)
                        ? object.psAssignedName
                        : 'N/A';
                },
            },
            {
                data: 'assignedName',
                class: 'assignedName-wrapper',
                render: function (data, type, object) {
                    var assignedName = hasValue(object.assignedName)
                        ? object.assignedName
                        : 'N/A';
                    return assignedName;
                },
            },
        ],
    },
};

const getPermission = currentUser.permissions.filter(
    (permission) =>
        permission.actionCode === 'list' && permission.entityCode === 'pos_sa'
);

const showHideFilter = () => {
    $('#form-filter').toggle();
};

const hideFilter = () => {
    $('#form-filter').hide();
};

const showPopoverHistory = (element) => {
    let e = $(element);
    $.get(e.data('poload'), function (d) {
        let data = d.data;
        let subContent = [];
        if (data.length > 0) {
            subContent = data.map((item) => {
                let _icon = `<i class="fa fa-arrow-up" aria-hidden="true"></i>`;
                if (item.dayDifference < 0) {
                    _icon = `<i class="fa fa-arrow-down" aria-hidden="true"></i>`;
                }
                return `<div>
                    <p>${moment(item.createdDate).format('DD/MM/YYYY')}<p>
                    <p style="padding-left:15px">Đánh giá lại BPO</p>
                    <p style="padding-left:15px">Ngày chốt bán listing: ${item.expectedClosingDate
                        ? moment(item.expectedClosingDate).format('DD/MM/YYYY')
                        : 'Rất khó bán'
                    } ${item.dayDifference
                        ? `<span class="label label-default">${_icon} ${Math.abs(
                            item.dayDifference
                        )}</span>`
                        : ``
                    }</p>
                </div`;
            });
        }
        let content = `<div style="width:280px;max-height:400px;overflow:auto">${subContent.join(
            ''
        )}</div>`;
        e.popover({
            content: content,
            html: true,
        }).popover('show');
    });
};

class SAIndex {
    constructor() {
        this.mountedPage = false;
        this._tbLive = null;
        this._tbNotStandard = null;
        this._tbArchived = null;
        this._tbLiving = null;
        this._tbCanceled = null;
        this._tbTour = null;
        this._tbDeal = null;
        this._currentTabIndex = localIndexVariables.stored.tabIndex.live;
        this.isAdmin = isGroupAdmin;
        this._totalItems = 0;
        this._currentPage = 1;
        this.highlightNumber = {
            type1: 0,
            type2: 0,
            type3: 0,
            type4: 0,
            type5: 0,
        };

        this.bindEvent();
        this.loadApi();
        this.reloadList(true);
        this.loadTableTourAnDeal();
    }

    /**
     * function load API
     */
    loadApi() {
        getInputFilters('GET_ZONES', localIndexVariables, getPermission);
        getInputFilters('GET_TEAMS', localIndexVariables, getPermission);
        getInputFilters('GET_MEMBERS', localIndexVariables, getPermission);
        getInputFilters('GET_DISTRICTS', localIndexVariables, getPermission);
        getInputFilters('GET_WARDS', localIndexVariables, getPermission);
        getInputFilters('GET_DEPARTMENTS', localIndexVariables, getPermission);

        getInputFilters('GET_SOURCE', localIndexVariables);
        getInputFilters('GET_TC', localIndexVariables);
        getInputFilters('GET_INFO_CHANNEL', localIndexVariables);
        getInputFilters('GET_INFO_CHANNEL_CHILD', localIndexVariables);

        getInputFilters('GET_LISTING_TYPES', localIndexVariables);
        getInputFilters('GET_PROPERTY_LIST_PREFIX', localIndexVariables);
        getInputFilters('GET_TYPE_LIVE', localIndexVariables);
        getInputFilters('GET_CLASSIFIED', localIndexVariables);
        getInputFilters('GET_BPO', localIndexVariables);
    }
    /**
     * function load tables
     */
    renderDataTable = (props) => {
        const that = this;
        return (
            props.selectedId
                .DataTable({
                    ...localIndexVariables._dataTableConfig,
                    ajax: {
                        url: POS_APIS_SA.get('GET_LISTING_LIST_INDEX'),
                        type: 'POST',
                        data: {
                            ...localIndexVariables._dataPost,
                            length: 10,
                            type: props.tabIndex,
                        },
                    },
                    columns: props.columns,
                    createdRow: props.createdRow,
                    drawCallback: function( e, settings ) {
                        const curTable = $(this);
                        curTable.find('[data-plugin_toggleValue]').toggleValue({
                            extendParams: {curTable: curTable},
                            callbackClick: function(params) {
                                const curRowIndex = params.el.closest('tr').index();
                                const leftTrs = params.curTable.find('tbody tr').filter( function(index){return index !== curRowIndex});
                                leftTrs.find('[data-plugin_toggleValue]').each(function(){
                                    $(this).data('plugin_toggleValue').resetValue();
                                });
                            }
                        });
                    }
                })
                .off('draw.dt')
                // .on('draw.dt', function () {
                //     if (PROPZY_BPO) {
                //         PROPZY_BPO.reInit();
                //     }
                // })
                .off('processing.dt')
                .on('processing.dt', function (e, settings, processing) {
                    // assign to dataPost
                    let dataPost = {
                        ...localIndexVariables._dataPost,
                        length: 10,
                        type: props.tabIndex,
                    };

                    // convert dataPost to submit
                    dataPost = that.convertFieldToPostData(dataPost);
                    settings.ajax.data = function (d) {
                        dataPost.sort = {
                            columnName: settings.aoColumns[settings.aaSorting[0][0]].data,
                            value: settings.aaSorting[0][1],
                        };

                        return {
                            ...d,
                            ...dataPost,
                        };
                    };
                })
                .on('xhr.dt', async function (e, settings, json, xhr) {
                    hidePropzyLoading();
                    // if (PROPZY_BPO) {
                    //     PROPZY_BPO.reInit();
                    // }

                    if (!json) {
                        return
                    }
                    if (!json.result) {
                        alert(json.message);
                    }
                    let dataListId = [];
                    if (json.data !== undefined && json.data.length > 0) {
                        dataListId = json.data.map((o) => {
                            return o.rlistingId;
                        });
                        if (dataListId.length > 0) {
                            // pricetag
                            await getDaTaPriceTags(dataListId);
                            await dataListId.map((id) => {
                                showPriceTags(id);
                            });
                        }
                    }
                })
                
        );
    };

    loadTable(mounting) {
        showPropzyLoading();
        const that = this;

        const columsLive = localIndexVariables.columsTable.live;
        const columsLiving = localIndexVariables.columsTable.living;
        const columsCanceled = localIndexVariables.columsTable.canceled;
        const columsNotStandard = localIndexVariables.columsTable.notStandard;
        const columsArchived = localIndexVariables.columsTable.archived;
        if (that.isAdmin === true) {
            // check only additional reassign column if mounting page
            if (mounting) {
                columsLive.splice(1, 0, {
                    data: 'reassign',
                    class: 'reassign-wrapper need-to-live-listing',
                    orderable: false,
                    render: function (data, type, object) {
                        var reassign =
                            '<input type="checkbox" value="' +
                            object.rlistingId +
                            '" class="reassign" data-tab="need-to-live-listing">';
                        return reassign;
                    },
                });

                columsLiving.splice(1, 0, {
                    data: 'reassign',
                    class: 'reassign-wrapper living-listing',
                    orderable: false,
                    render: function (data, type, object) {
                        var reassign =
                            '<input type="checkbox" value="' +
                            object.rlistingId +
                            '" class="reassign" data-tab="living-listing">';
                        return reassign;
                    },
                });
            }
        }

        const tabIndex = localIndexVariables.stored.tabIndex;

        // init tables
        if (!that._tbLive) {
            // check active tab
            if (that._currentTabIndex === tabIndex.live) {
                that._tbLive = this.renderDataTable({
                    selectedId: $('#tb-live-listing-index'),
                    columns: columsLive,
                    tabIndex: tabIndex.live,
                    createdRow: (row, data) => {
                        // ưu tiên request diy
                        if (data.isRequestByDiy == true) {
                            $(row).addClass('is-request-diy');
                        } else if (hasValue(data.lastestDateFeedBack)) {
                            $(row).addClass('is-feed-back-customer');
                        }
                    },
                });
            }
        } else {
            if (that._currentTabIndex === tabIndex.live) {
                that._tbLive.ajax.reload();
            }
        }

        // table living
        if (!that._tbLiving) {
            // check active tab
            if (that._currentTabIndex === tabIndex.living) {
                that._tbLiving = this.renderDataTable({
                    selectedId: $('#tb-living-listing-index'),
                    columns: columsLiving,
                    tabIndex: tabIndex.living,
                    createdRow: (row, data) => {
                        // ưu tiên request diy
                        if (data.livePrivate === true) {
                            $(row).addClass('is-private');
                        } else if (data.isRequestByDiy == true) {
                            $(row).addClass('is-request-diy');
                        } else if (hasValue(data.lastestDateFeedBack)) {
                            $(row).addClass('is-feed-back-customer');
                        }
                        if (hasValue(data.latestHistory)) {
                            $(row).addClass('is-owner-history');
                        }
                    },
                    
                });
            }
        } else {
            if (that._currentTabIndex === tabIndex.living) {
                that._tbLiving.ajax.reload();
            }
        }

        // table canceled
        if (!that._tbCanceled) {
            // check active tab
            if (that._currentTabIndex === tabIndex.canceled) {
                that._tbCanceled = this.renderDataTable({
                    selectedId: $('#tb-canceled-listing-index'),
                    columns: columsCanceled,
                    tabIndex: tabIndex.canceled,
                    createdRow: null,
                });
            }
        } else {
            if (that._currentTabIndex === tabIndex.canceled) {
                that._tbCanceled.ajax.reload();
            }
        }

        // table not Standard
        if (!that._tbNotStandard) {
            // check active tab
            if (that._currentTabIndex === tabIndex.notStandard) {
                that._tbNotStandard = this.renderDataTable({
                    selectedId: $('#tb-not-standard-listing-index'),
                    columns: columsNotStandard,
                    tabIndex: tabIndex.notStandard,
                    createdRow: null,
                });
            }
        } else {
            if (that._currentTabIndex === tabIndex.notStandard) {
                that._tbNotStandard.ajax.reload();
            }
        }

        // table archived
        if (!that._tbArchived) {
            // check active tab
            if (that._currentTabIndex === tabIndex.archived) {
                that._tbArchived = this.renderDataTable({
                    selectedId: $('#tb-archive-listing-index'),
                    columns: columsArchived,
                    tabIndex: tabIndex.archived,
                    createdRow: (row, data) => {
                        // ưu tiên request diy
                        if (data.livePrivate === true) {
                            $(row).addClass('is-private');
                        } else if (data.isRequestByDiy == true) {
                            $(row).addClass('is-request-diy');
                        } else if (hasValue(data.lastestDateFeedBack)) {
                            $(row).addClass('is-feed-back-customer');
                        }
                        if (hasValue(data.latestHistory)) {
                            $(row).addClass('is-owner-history');
                        }
                    },
                });
            }
        } else {
            if (that._currentTabIndex === tabIndex.archived) {
                that._tbArchived.ajax.reload();
            }
        }
    }

    async loadHighlight() {
        showPropzyLoading();

        const dataPost = this.convertFieldToPostData(localIndexVariables._dataPost);

        this.highlightNumber = await axios
            .post(POS_APIS_SA.get('GET_HIGHLIGHT_LIST_INDEX'), {
                ...dataPost,
                type: null,
            })
            .then((xhr) => {
                const response = xhr.data;
                if (response && response.result) {
                    return response.data;
                }
            })
            .finally(() => {
                hidePropzyLoading();
                // if (PROPZY_BPO) {
                //     PROPZY_BPO.reInit();
                // }
            })
            .catch((err) => { });

        // show paging
        const totalItems = this.highlightNumber[`type${this._currentTabIndex}`];
        showPage(this._currentPage, totalItems);

        // add for reassign all
        if ($('.show-reassign-all-listing-modal-btn')[0]) {
            // check is exist btn reassign-all
            if (this._currentTabIndex == 1) {
                $('.show-reassign-all-listing-modal-btn').html(
                    `<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Reassign all(${this.highlightNumber.type1})`
                );
            } else if (this._currentTabIndex == 3) {
                $('.show-reassign-all-listing-modal-btn').html(
                    `<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Reassign all(${this.highlightNumber.type3})`
                );
            }
        }

        $('#live-listing-id').html(
            `Tin đăng cần live <span class="label label-success">${this.highlightNumber.type1}</span>`
        );
        $('#living-listing-id').html(
            `Tin đăng đang live <span class="label label-success">${this.highlightNumber.type3}</span>`
        );
        $('#canceled-listing-id').html(
            `Tin đăng đã gỡ <span class="label label-success">${this.highlightNumber.type4}</span>`
        );
        $('#not-standard-listing-id').html(
            `Tin đăng không đạt chuẩn <span class="label label-success">${this.highlightNumber.type2}</span>`
        );
        $('#archive-listing-id').html(
            `Tin đăng Archived <span class="label label-success">${this.highlightNumber.type5}</span>`
        );
    }
    /**
     * function load loadOverview
     */
    async loadOverview() {
        showPropzyLoading();

        const that = this;
        let response = null;
        const dataPost = this.convertFieldToPostData(localIndexVariables._dataPost);

        // don't call overview when live or archived
        if (
            that._currentTabIndex == localIndexVariables.stored.tabIndex.live ||
            that._currentTabIndex == localIndexVariables.stored.tabIndex.archived
        ) {
            return;
        }

        await axios
            .post(POS_APIS_SA.get('GET_OVERVIEW_LIST_INDEX'), {
                ...dataPost,
                type: that._currentTabIndex,
            })
            .then((xhr) => {
                response = xhr.data;

                // load overview
                if (response && response.result) {
                    // getDaTaPriceTags(response.postData.rlistingId);
                    const data = response.data;
                    switch (that._currentTabIndex) {
                        case localIndexVariables.stored.tabIndex.live: {
                            // not overview
                            break;
                        }
                        case localIndexVariables.stored.tabIndex.living: {
                            // fill collection and tour
                            const collections = data.collections;
                            const tours = data.tours;
                            let total = {
                                collection: 0,
                                tour: 0,
                            };
                            const mapTour = new Map();
                            collections.forEach((it) => {
                                mapTour.set(it.districtId, {
                                    collection: it.total,
                                    tour: 0,
                                    districtName: it.districtName,
                                });
                                total.collection += it.total;
                            });
                            tours.forEach((it) => {
                                if (mapTour.has(it.districtId)) {
                                    const objectMap = mapTour.get(it.districtId);
                                    mapTour.set(it.districtId, {
                                        collection: objectMap.collection,
                                        tour: objectMap.tour + it.total,
                                        districtName: it.districtName,
                                    });
                                } else {
                                    mapTour.set(it.districtId, {
                                        collection: 0,
                                        tour: 0,
                                        districtName: it.districtName,
                                    });
                                }
                                total.tour += it.total;
                            });
                            // fill data in table
                            const $tableBody = $(
                                '#tb-overview-collection-tour-for-living tbody'
                            );
                            $tableBody.html('');
                            let i = 0;
                            mapTour.forEach((it) => {
                                const table =
                                    '<td style="padding: 0;">' +
                                    '<table class="table table-bordered table-striped"><thead><tr><th style="width: 200px">Quận</th><th>Quan tâm / Đi tour</th></tr></thead><tbody>' +
                                    '<tr><td>' +
                                    it.districtName +
                                    '</td><td>' +
                                    it.collection +
                                    '/' +
                                    it.tour +
                                    '</td></tr>' +
                                    '</tbody></table></td>';
                                if (i % 4 == 0) {
                                    $tableBody.append('<tr></tr>');
                                } else {
                                }
                                i++;
                                $tableBody.append(table);
                            });
                            const html = `<ul>
                            <li>Độc quyền: <span>${data.guaranteed ? data.guaranteed : 0
                                }</span></li>
                            <li>Riêng tư: <span>${data.private ? data.private : 0
                                }</span></li>
                            <li>Tin thường: <span>${data.normal ? data.normal : 0
                                }</span></li>
                            <li>Dịch vụ: <span>${data.service ? data.service : 0
                                }</span></li>
                            <li>Môi giới: <span>${data.countAgentRListing
                                    ? data.countAgentRListing
                                    : 0
                                }</span></li>
                            <li>Chủ nhà: <span>${data.countOwnerRListing
                                    ? data.countOwnerRListing
                                    : 0
                                }</span></li>
                            <li>Nhà đầu tư: <span>${data.countInvesterRListing
                                    ? data.countInvesterRListing
                                    : 0
                                }</span></li>
                            <li>Bán: <span>${data.countSellRListing
                                    ? data.countSellRListing
                                    : 0
                                }</span></li>
                            <li>Thuê: <span>${data.countRentRListing
                                    ? data.countRentRListing
                                    : 0
                                }</span></li>
                            <li>Quan tâm: <span>${total.collection}</span></li>
                            <li>Đi tour: <span>${total.tour}</span></li>
                            </ul>`;
                            $('#overview-listing-for-living').html(html);
                            break;
                        }
                        case localIndexVariables.stored.tabIndex.canceled: {
                            const html = `<ul>
                            <li>Yêu cầu ngưng rao: <span>${data.countDeactivateByCustomer
                                    ? data.countDeactivateByCustomer
                                    : 0
                                }</span></li>
                            <li>Tự giao dịch: <span>${data.countSoldOrRentedByCustomer
                                    ? data.countSoldOrRentedByCustomer
                                    : 0
                                }</span></li>
                            <li>Đã bán hoặc cho thuê: <span>${data.countRented ? data.countRented : 0
                                }</span></li>
                            <li>Loại khác: <span>${data.countOtherKind ? data.countOtherKind : 0
                                }</span></li>
                            </ul>`;
                            $('#overview-listing-for-canceled').html(html);
                            break;
                        }
                        case localIndexVariables.stored.tabIndex.notStandard: {
                            const html = `<ul>
                            <li>Không liên hệ được: <span>${data.countContactFail ? data.countContactFail : 0
                                }</span></li>
                            <li>Bị trùng: <span>${data.countDuplicate ? data.countDuplicate : 0
                                }</span></li>
                            <li>Lý do khác: <span>${data.countOtherReason ? data.countOtherReason : 0
                                }</span></li>
                            <li>Loại khác: <span>${data.countOtherKind ? data.countOtherKind : 0
                                }</span></li>
                            </ul>`;
                            $('#overview-listing-for-not-standard').html(html);
                            break;
                        }
                    }
                }
            });
    }

    /**
     * function load loadOverview
     */
    async reloadList(mounting) {
        const that = this;
        this.updateFilter();

        that.loadOverview();
        // if (dataFilter.length > 0) {
        //   await getDaTaPriceTags(dataFilter);
        // }
        await that.loadHighlight();
        this.loadTable(mounting);
    }

    convertFieldToPostData = (storeFields) => {
        const returnedTarget = Object.assign({}, storeFields);

        if (isArray(returnedTarget.zoneField)) {
            returnedTarget.zoneField = returnedTarget.zoneField.join(',');
        }
        if (isArray(returnedTarget.teamField)) {
            returnedTarget.teamField = returnedTarget.teamField.join(',');
        }
        if (isArray(returnedTarget.departmentField)) {
            returnedTarget.departmentField = returnedTarget.departmentField.join(',');
        }
        if (isArray(returnedTarget.memberField)) {
            returnedTarget.memberField = returnedTarget.memberField.join(',');
        }
        if (isArray(returnedTarget.districtId)) {
            returnedTarget.districtId = returnedTarget.districtId.join(',');
        }
        if (isArray(returnedTarget.wardId)) {
            returnedTarget.wardId = returnedTarget.wardId.join(',');
        }

        return returnedTarget;
    };

    updateFilter() {
        const that = this;
        let inputListingId = $('#rlistingId').val();
        let arrayId = [];
        let isValidId = true;

        if (inputListingId) {
            isValidId = /^[0-9]( ?[0-9]*,?)*[0-9]$/.test(inputListingId.trim());
        }
        if (!isValidId) {
            return;
        }

        if (inputListingId) {
            arrayId = inputListingId.split(',').map((listingId) => {
                return listingId;
            });
        }

        const id = inputListingId ? arrayId : null;

        const name = $('#owner-name').val() ? $.trim($('#owner-name').val()) : null;

        const phone = $('#phone').val() ? $('#phone').val() : null;
        const address = $('#address').val() ? $.trim($('#address').val()) : null;

        const dateFrom = hasValue($('#date-from').val())
            ? moment($('#date-from').val(), DEFAULT_FORMAT_DATE)
                .startOf('day')
                .unix() * 1000
            : null;
        const dateTo = hasValue($('#date-to').val())
            ? moment($('#date-to').val(), DEFAULT_FORMAT_DATE).endOf('day').unix() *
            1000
            : null;

        const liveType = localIndexVariables._filter.liveType;

        // zone, team, district, ward, department, member
        const zoneField = convertToStringFromArray(
            localIndexVariables._filter.zoneField
        );
        const teamField = convertToStringFromArray(
            localIndexVariables._filter.teamField
        );
        const memberField = convertToStringFromArray(
            localIndexVariables._filter.memberField
        );
        const districtId = convertToStringFromArray(
            localIndexVariables._filter.districtId
        );
        const wardId = convertToStringFromArray(localIndexVariables._filter.wardId);
        const departmentField = convertToStringFromArray(
            localIndexVariables._filter.departmentField
        );

        // listingTypeId, propertyTypeIds
        let listingTypeId = localIndexVariables._filter.listingTypeId;
        if (listingTypeId) {
            listingTypeId = parseInt(listingTypeId);
        }
        let propertyTypeIds = localIndexVariables._filter.propertyTypeIds;
        if (Array.isArray(propertyTypeIds)) {
            propertyTypeIds = propertyTypeIds.join(',');
        }

        // sourceId, tcId
        let sourceId = localIndexVariables._filter.sourceId;
        if (Array.isArray(sourceId)) {
            sourceId = sourceId.join(',');
        }
        let tcId = localIndexVariables._filter.tcId;
        if (Array.isArray(tcId)) {
            tcId = tcId.join(',');
        }

        const infoChannel = localIndexVariables._filter.channelTypeId;
        const channelTypeChild = localIndexVariables._filter.channelTypeIds;
        let channelTypeIds = [];
        if (infoChannel) {
            let childList = new Map();
            // get all source childs choose
            channelTypeChild &&
                channelTypeChild.forEach((source) => {
                    if (source.data) {
                        const parentId = source.data.parentId;
                        let strChilds = '';
                        if (childList.has(parentId)) {
                            strChilds = childList.get(parentId);
                            strChilds += `,${source.id}`;
                        } else {
                            strChilds = `${source.id}`;
                        }
                        childList.set(parentId, strChilds);
                    }
                });

            // get source id;
            infoChannel.forEach((parent) => {
                if (!hasValue(parent)) {
                    return false;
                }

                // get childs first
                const parentId = parseInt(parent);
                if (childList.has(parentId)) {
                    channelTypeIds = [...channelTypeIds, childList.get(parentId)];
                } else {
                    // get source other not choose child
                    channelTypeIds = [...channelTypeIds, `${parentId}_${0}`];
                }
            });
        }
        if (Array.isArray(channelTypeIds)) {
            channelTypeIds = channelTypeIds.join();
        }

        const scorecardType = $('#classified').val()
            ? parseInt($('#classified').val())
            : null;

        const bpo = $('#bpo').val() ? $('#bpo').val() : null;

        // for paging
        let start = 0;
        if (that._currentPage > 1) {
            start = that._currentPage * LIMIT_PER_PAGE - LIMIT_PER_PAGE;
        }

        const filter = {
            type: that._currentTabIndex,
            start,
            rlistingId: id,
            ownerName: name,
            scorecardType,
            phone,
            sourceId,
            address,
            liveType,
            fromAssignedDate: dateFrom,
            toAssignedDate: dateTo,
            channelTypeId: infoChannel,
            channelTypeIds,
            listingTypeId,
            propertyTypeIds,
            tcId,
            zoneField,
            teamField,
            districtId,
            wardId,
            memberField,
            departmentField,
            bpo,
        };

        // update to dataPost if filter updated
        localIndexVariables._dataPost = {
            ...localIndexVariables._dataPost,
            ...filter,
            tcid: filter.tcId,
        };

        return localIndexVariables._dataPost;
    }

    clearFilter() {
        localIndexVariables._filter = {
            ...localIndexVariables._filter,
            fromAssignedDate: null,
            fromReviewedDate: null,
            toAssignedDate: null,
            toReviewedDate: null,
            zoneField: null,
            departmentField: null,
            memberField: null,
            teamField: null,
            districtId: null,
            wardId: null,
            propertyTypeIds: null,
            listingTypeId: null,
            sourceId: null,
            tcId: null,
            channelTypeId: null,
            channelTypeIds: null,
            scorecardType: null,
        };

        // reset affected store
        getInputFilters('GET_ZONES', localIndexVariables, getPermission);
        getInputFilters('GET_TEAMS', localIndexVariables, getPermission);
        getInputFilters('GET_DEPARTMENTS', localIndexVariables, getPermission);
        getInputFilters('GET_MEMBERS', localIndexVariables, getPermission);
        getInputFilters('GET_DISTRICTS', localIndexVariables, getPermission);
        getInputFilters('GET_WARDS', localIndexVariables, getPermission);

        getInputFilters('GET_TYPE_LIVE', localIndexVariables);
        getInputFilters('GET_LISTING_TYPES', localIndexVariables);
        getInputFilters('GET_PROPERTY_LIST_PREFIX', localIndexVariables);
        getInputFilters('GET_SOURCE', localIndexVariables);
        getInputFilters('GET_TC', localIndexVariables);
        getInputFilters('GET_INFO_CHANNEL', localIndexVariables);
        getInputFilters('GET_INFO_CHANNEL_CHILD', localIndexVariables);
        getInputFilters('GET_CLASSIFIED', localIndexVariables);
        getInputFilters('GET_BPO', localIndexVariables);

        $('#date-from').val('').trigger('change');
        $('#date-to').val('').trigger('change');
        $('#form-filter input[type="text"]').val('');
    }

    loadTableTourAnDeal() {
        const that = this;
        const tourTotalList = {
            table: null,
            tableId: '#tour-total-list-table',
            popup: '#tour-total-list-modal',
        };
        const dealTotalList = {
            table: null,
            tableId: '#deal-total-list-table',
            popup: '#deal-total-list-modal',
        };

        const columnsTour = [
            {
                data: 'dealId',
                render: function (data, type, object) {
                    return object.dealId;
                },
            },
            {
                data: 'tourId',
                render: function (data, type, object) {
                    return object.tourId;
                },
            },
            {
                data: 'takeCharge',
                render: function (data, type, object) {
                    return object.takeCharge;
                },
            },
            {
                data: 'conciergre',
                render: function (data, type, object) {
                    return object.conciergre;
                },
            },
            {
                data: 'scheduleTime',
                render: function (data, type, object) {
                    var scheduleTime = hasValue(object.scheduleTime)
                        ? moment(object.scheduleTime).format('HH:mm:ss DD/MM/YYYY')
                        : '';
                    return scheduleTime;
                },
            },
            {
                data: 'statusName',
                render: function (data, type, object) {
                    var statusName = hasValue(object.statusName) ? object.statusName : '';
                    return statusName;
                },
            },
        ];
        const columnsDeal = [
            {
                data: 'dealId',
                render: function (data, type, object) {
                    return object.dealId;
                },
            },
            {
                data: 'name',
                render: function (data, type, object) {
                    return object.name;
                },
            },
            {
                data: 'phone',
                render: function (data, type, object) {
                    var phone = hasValue(object.phone)
                        ? '<a href="javascript:CCall.makeCall({phoneNumber:\'' +
                        object.phone +
                        '\'});" data-phone="' +
                        object.phone +
                        '">' +
                        object.phone +
                        '</a>'
                        : '';
                    return phone;
                },
            },
            {
                data: 'statusName',
                render: function (data, type, object) {
                    return object.statusName;
                },
            },
        ];

        // initTable
        that._tbTour = $(tourTotalList.tableId)
            .DataTable({
                processing: false,
                serverSide: true,
                deferLoading: 0,
                bSort: false,
                firstAjax: false,
                ajax: {
                    url: POS_APIS_SA.get('GET_LIST_TOUR_BY_ID'),
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, {
                            rlistingId: localIndexVariables._filter.rlistingId,
                        });
                        return d;
                    },
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: true,
                language: DatatableHelper.languages.vn,
                columns: columnsTour,
            })
            .off('draw.dt')
            // .on('draw.dt', function () {
            //     if (PROPZY_BPO) {
            //         PROPZY_BPO.reInit();
            //     }
            // })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading();
                } else {
                    $(tourTotalList.popup).modal();
                    hidePropzyLoading();
                }
            })
            .on('xhr.dt', function (e, settings, json, xhr) {
                if (hasValue(json)) {
                    var data = json.data;
                    var totalFeedback = 0;
                    var totalCCFeedback = 0;
                    $.each(data, function (index, val) {
                        totalFeedback += val.totalFeedback;
                        totalCCFeedback += val.totalCCFeedback;
                    });
                    $('#listingFeedbackCountTour').html(totalFeedback);
                    $('#count-feedback-concierge').html(totalCCFeedback);
                    $('#showListingFeedbackForManager').data(
                        'rlistingid',
                        localIndexVariables._filter.rlistingId
                    );
                    $('#btn-show-feedback-concierge').data(
                        'rlistingid',
                        localIndexVariables._filter.rlistingId
                    );
                }
            })
            .on('draw', function () {
                if (hasValue(Window.reAssignListing)) {
                    Window.reAssignListing.reloadPage('living-listing-table');
                }
            });

        that._tbDeal = $(dealTotalList.tableId)
            .DataTable({
                processing: false,
                serverSide: true,
                deferLoading: 0,
                bSort: false,
                firstAjax: false,
                ajax: {
                    url: POS_APIS_SA.get('GET_LIST_DEAL_BY_ID'),
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, {
                            rlistingId: localIndexVariables._filter.rlistingId,
                        });
                        return d;
                    },
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: true,
                language: DatatableHelper.languages.vn,
                columns: columnsDeal,
            })
            .off('draw.dt')
            // .on('draw.dt', function () {
            //     if (PROPZY_BPO) {
            //         PROPZY_BPO.reInit();
            //     }
            // })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading();
                } else {
                    $(dealTotalList.popup).modal();
                    hidePropzyLoading();
                }
            })
            .on('xhr.dt', function (e, settings, json, xhr) { });
    }

    updateGuaranteedExpired() {
        const that = this;
        const guaranteedExpired = localIndexVariables.stored.guaranteedExpired;
        const selectedGuaranteedExpiredDate =
            guaranteedExpired.guaranteedExpiredDate;
        const selectedGuaranteedSignedDate = guaranteedExpired.guaranteedSignedDate;

        if (!selectedGuaranteedExpiredDate || !selectedGuaranteedSignedDate) {
            showPropzyAlert(
                'Bạn chưa chọn ngày hết hạn độc quyền hoặc ngày ký độc quyền'
            );
            return;
        }
        if (
            moment(selectedGuaranteedExpiredDate).unix() <
            moment(selectedGuaranteedSignedDate).unix()
        ) {
            showPropzyAlert(
                'Ngày ký độc quyền không được nhỏ hơn ngày hết hạn độc quyền'
            );
            return;
        }
        if (
            moment().diff(moment(selectedGuaranteedSignedDate, 'DD/MM/YYY'), 'days') <
            0
        ) {
            showPropzyAlert('Ngày ký độc quyền không được lớn hơn ngày hiện tại');
            return;
        }
        const postData = {
            rlistingId: guaranteedExpired.rlistingId,
            isGuaranteed: true,
            guaranteedExpiredDate: selectedGuaranteedExpiredDate,
            guaranteedSignedDate: selectedGuaranteedSignedDate,
        };

        showPropzyLoading();
        axios
            .post(
                POS_APIS_SA.get('UPDATE_GUARANTEED_LISTING_INDEX'),
                JSON.stringify(postData)
            )
            .then((xhr) => {
                hidePropzyLoading();
                // if (PROPZY_BPO) {
                //     PROPZY_BPO.reInit();
                // }
                const response = xhr.data;
                if (response.result) {
                    // reset guaranteedExpired stored
                    localIndexVariables.stored.guaranteedExpired = {};

                    $('#editGuaranteedExpiredDateModal').modal('hide');
                    that._tbLiving.ajax.reload();
                }

                showPropzyAlert(response.message);
            });
    }

    /**
     * function load bindEvent
     */
    bindEvent() {
        const that = this;
        $('#date-from')
            .datepicker({ format: 'dd/mm/yyyy' })
            .datepicker(
                'setDate',
                moment(localIndexVariables._filter.fromAssignedDate).format(
                    DEFAULT_FORMAT_DATE
                )
            );
        $('#date-to')
            .datepicker({ format: 'dd/mm/yyyy' })
            .datepicker(
                'setDate',
                moment(localIndexVariables._filter.toAssignedDate).format(
                    DEFAULT_FORMAT_DATE
                )
            );

        $('#guaranteedSignedDate').datepicker({
            autoClose: true,
            format: 'dd/mm/yyyy',
            language: 'vn',
            endDate: '0d',
        });
        $('#guaranteedExpiredDate').datepicker({
            autoClose: true,
            format: 'dd/mm/yyyy',
            language: 'vn',
            startDate: '0d',
        });
        // set nguồn phụ
        $('#sourceChild').prop('disabled', true);
        $('#sourceChild').select2({
            data: [],
            placeholder: 'Chọn nguồn phụ',
        });

        document.getElementById('search').addEventListener('click', function () {
            that._currentPage = 1;

            that.reloadList();
            hideFilter();
        });

        document
            .getElementById('clearSearching')
            .addEventListener('click', function () {
                that._currentPage = 1;

                that.clearFilter();
                // that.reloadList()
            });

        document
            .getElementById('live-listing-id')
            .addEventListener('click', function () {
                that._currentTabIndex = localIndexVariables.stored.tabIndex.live;
                that._currentPage = 1;

                that.reloadList();
            });
        document
            .getElementById('living-listing-id')
            .addEventListener('click', function () {
                that._currentTabIndex = localIndexVariables.stored.tabIndex.living;
                that._currentPage = 1;

                that.reloadList();
            });

        document
            .getElementById('canceled-listing-id')
            .addEventListener('click', function () {
                that._currentTabIndex = localIndexVariables.stored.tabIndex.canceled;
                that._currentPage = 1;

                that.reloadList();
            });
        document
            .getElementById('not-standard-listing-id')
            .addEventListener('click', function () {
                that._currentTabIndex = localIndexVariables.stored.tabIndex.notStandard;
                that._currentPage = 1;

                that.reloadList();
            });
        document
            .getElementById('archive-listing-id')
            .addEventListener('click', function () {
                that._currentTabIndex = localIndexVariables.stored.tabIndex.archived;
                that._currentPage = 1;

                that.reloadList();
            });

        $(document)
            .off('change', '#sourceId')
            .on('change', '#sourceId', function (e) {
                const data = $(this).val();
                localIndexVariables._filter.sourceId = data;
                localIndexVariables._filter.tcId = null;

                // get api
                getInputFilters(
                    'GET_TC',
                    localIndexVariables,
                    getPermission,
                    true,
                    true
                );
            });
        $(document)
            .off('change', '#tcId')
            .on('change', '#tcId', function (e) {
                const data = $(this).val();
                localIndexVariables._filter.tcId = data;
            });

        $(document)
            .off('change', '#infoChannel')
            .on('change', '#infoChannel', function (e) {
                const data = $(this).val();
                localIndexVariables._filter.channelTypeId = data;
                // reset info channel child
                localIndexVariables._filter.channelTypeIds = null;

                // get api
                getInputFilters(
                    'GET_INFO_CHANNEL_CHILD',
                    localIndexVariables,
                    getPermission,
                    true,
                    true
                );
            });
        $(document)
            .off('change', '#infoChannelChild')
            .on('change', '#infoChannelChild', function (e) {
                const data = $(this).select2('data');
                localIndexVariables._filter.channelTypeIds = data;
            });

        $(document)
            .off('change', '#listingTypeId')
            .on('change', '#listingTypeId', function (e) {
                const data = $(this).val();
                localIndexVariables._filter.listingTypeId = data;
                // reset data while change parent item
                localIndexVariables._filter.propertyTypeIds = null;
                POS_STORED_LOCAL_API.PROPERTY_TYPES_LIST = null;

                bindEventForFilter(
                    '.propertyTypeBlock',
                    '#propertyTypeIds',
                    'GET_PROPERTY_LIST_PREFIX',
                    localIndexVariables,
                    getPermission
                );

                // get api
                getInputFilters(
                    'GET_PROPERTY_LIST_PREFIX',
                    localIndexVariables,
                    getPermission,
                    false,
                    true
                );
            });
        $(document)
            .off('change', '#propertyTypeIds')
            .on('change', '#propertyTypeIds', function (e) {
                const data = $(this).val();
                localIndexVariables._filter.propertyTypeIds = data;
            });
        $(document)
            .off('change', '#liveType')
            .on('change', '#liveType', function (e) {
                const data = $(this).val();
                localIndexVariables._filter.liveType = data;
            });

        // init bind event common
        bindEventByPermission(localIndexVariables, getPermission);

        // open deal and tour in tab living
        $(document)
            .off('click', '.open-deal-total-list')
            .on('click', '.open-deal-total-list', function (e) {
                e.preventDefault();
                localIndexVariables._filter.rlistingId = $(this).data('rlistingid');
                that._tbDeal.ajax.reload();
            });

        $(document)
            .off('click', '.open-tour-total-list')
            .on('click', '.open-tour-total-list', function (e) {
                e.preventDefault();
                localIndexVariables._filter.rlistingId = $(this).data('rlistingid');
                that._tbTour.ajax.reload();
            });

        // tooltip
        $(document)
            .off(
                'mouseover',
                'table tr.is-request-diy, table tr.is-feed-back-customer, table tr.is-private, table tr.is-owner-history'
            )
            .on(
                'mouseover ',
                'table tr.is-request-diy , table tr.is-feed-back-customer, table tr.is-private, table tr.is-owner-history',
                function (e) {
                    var messtool = $(this).find('.sa-tooltip').html();
                    var tooltip =
                        '<div class="tooltip-event-props">' + messtool + '</div>';
                    var $tooltip = $(tooltip).appendTo('body');
                    $(this)
                        .mouseover(function (e) {
                            $(this).css('z-index', 10000);
                            $tooltip.fadeIn('500');
                            $tooltip.fadeTo('10', 1.9);
                        })
                        .mousemove(function (e) {
                            $tooltip.css('top', e.pageY + 10);
                            $tooltip.css('left', e.pageX + 20);
                        });
                }
            );
        $(document)
            .off(
                'mouseout',
                'table tr.is-request-diy , table tr.is-feed-back-customer, table tr.is-private, table tr.is-owner-history'
            )
            .on(
                'mouseout ',
                'table tr.is-request-diy , table tr.is-feed-back-customer, .table tr.is-private, table tr.is-owner-history',
                function () {
                    $; //(this).find('.sa-tooltip').css('display', 'none');
                    //$(this).css('z-index', 8);
                    $('.tooltip-event-props').remove();
                }
            );

        // update time độc quyền
        $(document).on('change', '#guaranteedExpiredDateTo', function (e) {
            e.preventDefault();

            let timeNow = localIndexVariables.stored.today;
            const months = parseInt($('#guaranteedExpiredDateTo').val());

            if (months != 0) {
                timeNow = moment().add(months, 'M').format(DEFAULT_FORMAT_DATE);
            }
            const parseToTimestamp = moment(timeNow, 'DD/MM/YYYY').format('X');
            localIndexVariables.stored.guaranteedExpired.guaranteedExpiredDate =
                parseInt(parseToTimestamp) * 1000;

            $('#guaranteedExpiredDate').val(timeNow);
            $('#guaranteedExpiredDate').trigger('change');
        });

        $(document).on('change', '#guaranteedSignedDate', function (e) {
            e.preventDefault();

            // get guaranteedSignedDate value
            const guaranteedSignedDate = $('#guaranteedSignedDate').val();
            // parse guaranteedSignedDate to timestamp
            const parseToTimestamp = moment(
                guaranteedSignedDate,
                'DD/MM/YYYY'
            ).format('X');

            localIndexVariables.stored.guaranteedExpired.guaranteedSignedDate =
                parseInt(parseToTimestamp) * 1000;
        });

        $(document)
            .off('click', '#saveGuaranteedExpiredDateBtn')
            .on('click', '#saveGuaranteedExpiredDateBtn', function (e) {
                e.preventDefault();
                that.updateGuaranteedExpired();
            });
        $(document)
            .off('click', '.editGuaranteedExpiredDate')
            .on('click', '.editGuaranteedExpiredDate', function (e) {
                e.preventDefault();
                const object = $(this).data('object');

                localIndexVariables.stored.guaranteedExpired = object;
                const guaranteedExpiredDate = object.guaranteedExpiredDate
                    ? moment(object.guaranteedExpiredDate).format(DEFAULT_FORMAT_DATE)
                    : '';
                const guaranteedSignedDate = object.guaranteedSignedDate
                    ? moment(object.guaranteedSignedDate).format(DEFAULT_FORMAT_DATE)
                    : '';

                $('#editGuaranteedExpiredDateModal #guaranteedExpiredDate').datepicker(
                    'setDate',
                    guaranteedExpiredDate
                );
                $('#guaranteedExpiredDate').val(guaranteedExpiredDate);
                $('#guaranteedExpiredDate').trigger('change');

                $('#editGuaranteedExpiredDateModal #guaranteedSignedDate').datepicker(
                    'setDate',
                    guaranteedSignedDate
                );
                $('#guaranteedSignedDate').val(guaranteedSignedDate);
                $('#guaranteedSignedDate').trigger('change');

                $('#editGuaranteedExpiredDateModal').modal();
            });

        $(document).on('click', 'td .lasted-owner-see', function (e) {
            e.preventDefault();
            if (typeof ModalOwnerActivities != 'undefined') {
                ModalOwnerActivities.show($(this).data('id'));
            }
        });
        $(document).on('click', '.pagination-custom a', function (e) {
            e.preventDefault();

            const pageValue = $(this).text();
            if (pageValue === TXT_PAGE_PREV) {
                that._currentPage -= 1;
            } else if (pageValue === TXT_PAGE_NEXT) {
                that._currentPage += 1;
            } else {
                that._currentPage = parseInt(pageValue);
            }

            that.reloadList();
        });

        $(document)
            .off('mouseover', '.tag-display .tag-more')
            .on('mouseover ', '.tag-display .tag-more', function () {
                $('.tag-display').css('z-index', '10100');
            });
        $(document)
            .off('mouseout', '.tag-display .tag-more')
            .on('mouseout ', '.tag-display .tag-more', function () {
                $('.tag-display').css('z-index', '1');
            });
    }
}

$(document).ready(function () {
    Window.saIndex = new SAIndex();
    Window.saFeedBack = new SAListingFeedback(true).init();

    $('body').click(function () {
        if ($('.popover-title').length > 0) {
            $('[data-poload]').popover('hide');
        }
    });
});
