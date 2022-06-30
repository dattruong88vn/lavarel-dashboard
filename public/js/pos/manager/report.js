/**/
function ManagerReport() {
    var _this = this;
    var _isAdmin = isVal(isAdmin) ? isAdmin : 0;
    var _userId = isVal(userId) ? userId : 0;
    var _isShown = false;
    var dateFormat = 'DD/MM/YYYY';
    var dataFormatLower = 'dd/mm/yyyy';
    var dataFilter = {
        "deptId": 2,
        "dateFrom": null,
        "dateTo": null,
        "ownerType": null,
        "listingTypeId": null,
        "propertyTypeId": null,
        "sourceId": null,
        "priceFrom": null,
        "priceTo": null,
        "statusId": null,
        "userId": null,
        "liveType": null,
        "districtIds": null,
        "updateStatus": 0,
        "diyBonus": 0,
        "preUserId": null,
        "tcid": null,
        "preStatusId": null,
        "channelTypeIds": null,
        "position": null

    };
    const stored = {
        sourceChildList: new Map(),
    };
    var API_LIST = {
        getChannelStatusList: '/pos/SaApi/getChannelStatusList',
        getListReport: '/pos/manager/get-list-report',
        getExport: '/pos/manager/get-export',
        getSpecialListingExport: '/pos/manager/get-special-listing-export',
        getListUser: '/pos/manager/get-user-list',
        getDistrictByUser: '/pos/manager/get-district-by-user',
        getTc: '/pos/SaApi/get-transaction-center',
    };
    var table = null;
    _this.init = async function () {
        await buildField();
        await loadApi();
        await buildTable();
        await event();

        /*$.when( buildField(), loadApi() ).done(function ( v1, v2 ) {
            buildTable();
            event();
        });*/
    }
    function updatePrice(ipf, ipt) {
        var to = (parseFloat(ipt.val()).toFixed(2) * 100) / 100;
        var from = (parseFloat(ipf.val()).toFixed(2) * 100) / 100;
        if (to + '' == 'NaN') {
            to = 0;
        }
        if (from + '' == 'NaN') {
            from = 0;
        }
        $('#price').val(from + '-' + to);
    }
    function renderListPopover() {
        var ul = $('<ul class="price-box-ul"></ul>');
        var data = [
            {
                value: '0-1',
                text: '< 1 tỷ'
            },
            {
                value: '1-2',
                text: '1 - 2 tỷ'
            },
            {
                value: '2-3',
                text: '2 - 3 tỷ'
            },
            {
                value: '3-4',
                text: '3 - 4 tỷ'
            },
            {
                value: '4-6',
                text: '4 - 6 tỷ'
            },
            {
                value: '6-8',
                text: '6 - 8 tỷ'
            },
            {
                value: '8-10',
                text: '8 - 10 tỷ'
            },
            {
                value: '10-20',
                text: '10 - 20 tỷ'
            },
            {
                value: '20-',
                text: '>= 20 tỷ'
            }
        ];

        if (parseInt($('#listingTypeId').val(), 10) == 2) {
            data = [
                {
                    value: '0-5',
                    text: '< 5 triệu'
                },
                {
                    value: '5-10',
                    text: '5 - 10 triệu'
                },
                {
                    value: '10-20',
                    text: '10 - 20 triệu'
                },
                {
                    value: '20-30',
                    text: '20 - 30 triệu'
                },
                {
                    value: '30-40',
                    text: '30 - 40 triệu'
                },
                {
                    value: '40-50',
                    text: '40 - 50 triệu'
                },
                {
                    value: '50-',
                    text: '>= 50 triệu'
                }
            ];
        }
        data.forEach(i => {
            var li = $('<li class="pop-price-select" data-value="' + i.value + '">' + i.text + '</li>');
            li.unbind('click').click(function (e) {
                var val = $(this).attr('data-value');
                $('#price').val(val);
                var arr = val.split('-');
                $('#price-from').val(arr[0]);
                $('#price-to').val(arr[1]);
                $('#price-span').popover('hide');
            });
            ul.append(li);
        });
        return ul;
    }
    function popovercontent() {
        if (parseInt($('#listingTypeId').val(), 10) == 0) {
            return '';
        }
        var unit = 'tỷ';
        if (parseInt($('#listingTypeId').val(), 10) == 2) {
            unit = 'triệu'
        }
        var row = $('<div class="row"></div>');
        var ipf = $('<input id="price-from" placeholder="' + unit + '" style="width:70px; display: block" type="text"></input>');
        var lb1 = $('<label >giá từ</label>');
        var col1 = $('<div class="col-md-6"></div>');
        var col2 = $('<div class="col-md-6"></div>');
        var ipt = $('<input id="price-to"  placeholder="' + unit + '"  style="width:70px; display: block" type="text"></input>');
        var lb2 = $('<label>giá đến</label>');
        var ok = $('<button  type="button" class="btn btn-success">Ok</button>');

        var row2 = $(`<div class="row mt-3" style="clear:both; margin-top:10px; margin-bottom: 10px;"></div>`);


        ipf.unbind('change').change(function () {
            updatePrice(ipf, ipt);
        }).keydown(function (e) {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
        ipt.unbind('change').change(function () {
            updatePrice(ipf, ipt);
        }).keydown(function (e) {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
        ok.unbind('click').click(function () {
            $('#price-span').popover('hide');
        });


        col1.append(lb1).append(ipf);
        col2.append(lb2).append(ipt);
        row.append(col1).append(col2).append($('<div style="clear:both"></div>'));
        return $('<div></div>')
            .append(row).append(row2.append('<div class="col-md-7"><div>').append($('<div class="col-md-5"></div>').append(ok)))
            .append(renderListPopover());
    }
    function initPopover() {
        $('#price-span').popover({
            html: true,
            placement: 'bottom',
            content: ''
        }).on('hidden.bs.popover', function () {
            var unit = ' tỷ';
            if (parseInt($('#listingTypeId').val(), 10) == 2) {
                unit = ' triệu';
            }
            var arr = $('#price').val().split('-');
            if (arr[1] === '0' || arr[1] === '0.00' || arr[1].trim() === '') {
                if (arr[0] === '0' || arr[0] === '0.00' || arr[0].trim() === '') {
                    $('#price-span').text('-- Vui Lòng Chọn --');
                    return;
                }
                $('#price-span').text('>= ' + arr[0].trim() + ' ' + unit);
                return;
            }
            $('#price-span').text($('#price').val().trim() + ' ' + unit);
        });
        // hide popover when click outside
        $('body').on('click', function (e) {
            if (e.target.id != "price-span" && $(e.target).parents('.popover').length === 0)
                $('#price-span').popover('hide');
        })
    }
    function buildField() {
        $("body").on(
            "change",
            '#listingTypeId',
            function (e) {
                // reset price
                $('#price-span').text('-- Vui Lòng Chọn --');
                $('#price').val('-');
                $('#price-span').data('bs.popover').options.content = popovercontent();
                e.preventDefault();
            }
        );
        initPopover();
        $('#report-manager-type').select2();
        $('#date-range-fast').select2();
        $('#ownerType').select2();
        $('#listingTypeId').select2();
        $('#propertyTypeId').select2();
        $('#sourceIds').select2();
        //$('#price').select2();
        $('#districtIds').select2();
        $('#liveType').select2();
        $('.date-range input').each(function () {
            $(this).datepicker({
                format: dataFormatLower,
                showOtherMonths: true,
                selectOtherMonths: true,
                autoclose: true,
                changeMonth: true,
                changeYear: true,
                todayHighlight: true,
            });
        });
        $('#updateStatus').attr('checked', false).val(0);
        $('#diyBonus').attr('checked', false).val(0);

        if (document.getElementById('statusId')) {
            $('#statusId').select2();
        }
        if (document.getElementById('userId')) {
            $('#userId').select2();
        }
        if (document.getElementById('userPreId')) {
            $('#userPreId').select2();
        }
        if (document.getElementById('statusPreId')) {
            $('#statusPreId').select2();
        }
        $('#tcId').select2();
        $('#infoChannel').select2();
        $('#infoChannelChild').select2();

    }

    function clearDataFilter() {
        // reset price
        $('#price-span').text('-- Vui Lòng Chọn --');
        $('#price').val('-');
        $('#price-span').data('bs.popover').options.content = '';

        $('#ownerType').val('0').select2();
        $('#listingTypeId').val('0').select2();
        $('#propertyTypeId').val('0').select2();
        // $('#price').val('-').select2();
        $('#liveType').val('').select2();
        $('#districtIds').val('').select2();
        $('#date-range-fast').val('this-month').select2();
        //$('#date-range-fast').trigger('click');
        //$('.date-range-to').datepicker("update", moment().endOf('day').format(dateFormat));
        //$('.date-range-from').datepicker("update", moment().subtract(1, 'months').endOf('day').format(dateFormat));
        $('.date-range-from').datepicker("setEndDate", '');
        $('.date-range-to').datepicker("setStartDate", '');
        $('#updateStatus').attr('checked', false).val(0);
        $('#diyBonus').attr('checked', false).val(0);
        if (document.getElementById('statusId')) {
            $('#statusId').val(0).select2();
        }
        if (document.getElementById('userId')) {
            $('#userId').val(0).select2();
        }
        if (document.getElementById('userPreId')) {
            $('#userPreId').val(0).select2();
        }
        if (document.getElementById('statusPreId')) {
            $('#statusPreId').val(0).select2();
        }

        $('#sourceIds').val('').select2({
            placeholder: "Chọn nguồn",
        });
        $('#infoChannel').val('').select2({
            placeholder: "Chọn kênh thông tin",
        });
        $('#position').val('-1');
        __indexPromiseApi('GET_TC');
        __indexPromiseApi('GET_INFO_CHANNEL_CHILD');

    }

    function updateDataFilter() {

        // get deptId :
        let deptId = 2;
        if (document.getElementById("report-manager-type")) {
            deptId = Number.parseInt($("#report-manager-type").select2('data')[0].id);
        }


        dataFilter.deptId = deptId;
        dataFilter.ownerType = isVal($('#ownerType').val()) ? parseInt($('#ownerType').val()) : null;
        dataFilter.listingTypeId = isVal($('#listingTypeId').val()) ? parseInt($('#listingTypeId').val()) : null;
        dataFilter.propertyTypeId = isVal($('#propertyTypeId').val()) ? parseInt($('#propertyTypeId').val()) : null;
        dataFilter.position = parseInt($('#position').val(), 10) > 0 ? parseInt($('#position').val(), 10) : null;

        //dataFilter.tcid = isVal($('#tcid').val()) ? $('#tcid').val() : null;
        dataFilter.districtIds = isVal($('#districtIds').val()) ? $('#districtIds').val() : null;
        var price = isVal($('#price').val()) ? $('#price').val() : null;
        dataFilter.priceFrom = null;
        dataFilter.priceTo = null;
        if (isVal(price)) {
            price = price.split('-');
            dataFilter.priceFrom = isVal(price[0]) ? parseFloat(price[0]).toFixed(2) : null;
            dataFilter.priceTo = isVal(price[1]) ? parseFloat(price[1]).toFixed(2) : null;
        }
        dataFilter.dateFrom = isVal($('.date-range-from').val()) ? moment($('.date-range-from').datepicker('getDate')).startOf('day').unix() * 1000 : null;
        dataFilter.dateTo = isVal($('.date-range-to').val()) ? moment($('.date-range-to').datepicker('getDate')).endOf('day').unix() * 1000 : null;
        dataFilter.updateStatus = isVal($('#updateStatus').val()) ? parseInt($('#updateStatus').val()) : 0;

        dataFilter.statusId = null;
        dataFilter.userId = null;
        dataFilter.diyBonus = null;
        dataFilter.liveType = null;

        dataFilter.preUserId = null;
        dataFilter.preStatusId = null;


        switch (deptId) {
            case 0: {
                dataFilter.statusId = isVal($('#statusId').val()) ? parseInt($('#statusId').val()) : null;
                dataFilter.diyBonus = isVal($('#diyBonus').val()) ? parseInt($('#diyBonus').val()) : 0;
                //dataFilter.liveType = isVal($('#liveType').val()) ? parseInt($('#liveType').val()) : null;
                //dataFilter.userId = isVal($('#userId').val()) ? parseInt($('#userId').val()) : 0;
                //dataFilter.preUserId = isVal($('#userPreId').val()) ? parseInt($('#userPreId').val()) : null;
                //dataFilter.preStatusId = isVal($('#statusPreId').val()) ? parseInt($('#statusPreId').val()) : null;
                break;
            }
            case 1: {
                dataFilter.preUserId = isVal($('#userPreId').val()) ? parseInt($('#userPreId').val()) : null;
                dataFilter.preStatusId = isVal($('#statusPreId').val()) ? parseInt($('#statusPreId').val()) : null;
                break;
            }
            case 2: {
                dataFilter.statusId = isVal($('#statusId').val()) ? parseInt($('#statusId').val()) : null;
                dataFilter.diyBonus = isVal($('#diyBonus').val()) ? parseInt($('#diyBonus').val()) : 0;
                dataFilter.liveType = isVal($('#liveType').val()) ? parseInt($('#liveType').val()) : null;
                if (!_isAdmin) {
                    dataFilter.userId = _userId;
                } else {
                    dataFilter.userId = isVal($('#userId').val()) ? parseInt($('#userId').val()) : 0;
                }
                break;
            }
        }

        // sourceId
        dataFilter.sourceIds = $('#sourceIds').val() ? $('#sourceIds').val().join(',') : null;
        dataFilter.tcid = $('#tcId').val() ? $('#tcId').val().join(',') : null;


        const channelType = $("#infoChannel").val();
        const channelTypeChild = $("#infoChannelChild").select2('data');
        let sourcePos = [];
        if (channelType && channelType.length > 0) {
            let childList = new Map();
            // get all source childs choose
            channelTypeChild.forEach(source => {
                const parentId = source.data.parentId;
                let strChilds = '';
                if (childList.has(parentId)) {
                    strChilds = childList.get(parentId);
                    strChilds += `,${source.id}`;
                } else {
                    strChilds = `${source.id}`;
                }
                childList.set(parentId, strChilds);
            });
            // get source id;

            channelType.forEach(parent => {
                // get childs first
                const parentId = Number.parseInt(parent);
                if (childList.has(parentId)) {
                    sourcePos.push(childList.get(parentId));
                } else {
                    // get source other not choose child
                    sourcePos.push(`${parentId}_${0}`);
                }
            });
        }
        sourcePos = sourcePos.join();
        dataFilter.channelTypeIds = sourcePos;
    }

    async function loadApi() {
        //
        var filterUi = [
            {
                id: '#report-manager-type',
                type: 'select2',
                optionsList: {
                    type: 'static',
                    data: function () {
                        var optionList = [
                            {
                                value: 0,
                                text: 'Tất cả'
                            },
                            {
                                value: 1,
                                text: 'Prescreen'
                            },
                            {
                                value: 2,
                                text: 'SA',
                                selected: true
                            }];
                        return optionList;
                    },
                },
                onChange: function () {
                    renderFiler();
                },
                afterRender: () => {
                    renderFiler();
                }
            },
            {
                id: '#ownerType',
                type: 'select2',
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return Listing.getStatusList();
                    },
                    callBack: function (response) {
                        var optionList = [
                            {
                                value: 0,
                                text: '-- Vui Lòng Chọn --'
                            }
                        ];
                        if (response.result) {
                            $.each(response.data, function (i, item) {
                                optionList.push({
                                    value: item.statusId,
                                    text: item.statusName
                                });
                            });
                        }
                        return optionList;
                    }
                },
            },
            {
                id: '#listingTypeId',
                type: 'select2',
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return Listing.getListingType();
                    },
                    callBack: function (response) {
                        var optionList = [
                            {
                                value: 0,
                                text: '-- Vui Lòng Chọn --'
                            }
                        ];
                        $.each(response, function (i, item) {
                            optionList.push({
                                value: i,
                                text: item
                            });
                        });
                        return optionList;
                    }
                },
            },
            {
                id: '#propertyTypeId',
                type: 'select2',
                optionsList: {
                    type: 'ajax',
                    changedBy: '#listingTypeId',
                    data: function () {
                        updateDataFilter();
                        return Listing.getPropertyTypeV2Prefix(dataFilter.listingTypeId);
                    },
                    callBack: function (response) {
                        var optionList = [
                            {
                                value: 0,
                                text: '-- Vui Lòng Chọn --'
                            }
                        ];
                        if (response.result == false) {
                            return optionList;
                        }
                        let list = response.data;
                        $.each(list, function (i, item) {
                            optionList.push({
                                value: item.propertyTypeId,
                                text: item.prefixName
                            });
                        });
                        return optionList;

                    }
                }
            },
            {
                id: '#sourceIds',
                type: 'select2',
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return Listing.getChannelTypes();
                    },
                    callBack: function (response) {
                        var optionList = [];
                        if (response.result) {
                            $.each(response.data, function (id, type) {
                                if (type.type == 1) {
                                    $.each(type.list, function (key, item) {
                                        //remove source diy
                                        if ($.inArray(item.id, [2, 5, 7, 9]) == -1) {
                                            optionList.push({
                                                value: item.id,
                                                text: item.name
                                            });
                                        }
                                    });
                                    return false;
                                }
                            })
                        }
                        return optionList;
                    }
                },
            },
            // {
            //     id: '#price',
            //     type: 'select2',

            //     select2Attr: {
            //         templateResult: function (data) {
            //             console.log(data);
            //             if (data.id !== 'custom-price') {
            //                 return data.text;
            //             }
            //             var ot = $('<input type="text" value="0"></input>');
            //             ot.on('click', function(event){
            //                 alert('a');
            //                 event.stopPropagation();
            //             });
            //             return ot;
            //         },
            //     },
            //     optionsList: {
            //         type: 'static',
            //         changedBy: '#listingTypeId',
            //         data: function () {
            //             var optionList = [
            //                 {
            //                     value: 0,
            //                     text: '-- Vui Lòng Chọn --'
            //                 },
            //             ];
            //             updateDataFilter();
            //             if (dataFilter.listingTypeId == 1) {
            //                 $.merge(optionList, [
            //                     {
            //                         value: 'custom-price',
            //                         disabled: true,
            //                         text: ''
            //                     },
            //                     {
            //                         value: '0-1',
            //                         text: '< 1 tỷ'
            //                     },
            //                     {
            //                         value: '1-2',
            //                         text: '1 - 2 tỷ'
            //                     },
            //                     {
            //                         value: '2-3',
            //                         text: '2 - 3 tỷ'
            //                     },
            //                     {
            //                         value: '3-4',
            //                         text: '3 - 4 tỷ'
            //                     },
            //                     {
            //                         value: '4-6',
            //                         text: '4 - 6 tỷ'
            //                     },
            //                     {
            //                         value: '6-8',
            //                         text: '6 - 8 tỷ'
            //                     },
            //                     {
            //                         value: '8-10',
            //                         text: '8 - 10 tỷ'
            //                     },
            //                     {
            //                         value: '10-20',
            //                         text: '10 - 20 tỷ'
            //                     },
            //                     {
            //                         value: '20-',
            //                         text: '>= 20 tỷ'
            //                     }])
            //             } else if (dataFilter.listingTypeId == 2) {
            //                 $.merge(optionList, [
            //                     {
            //                         value: '0-5',
            //                         text: '< 5 triệu'
            //                     },
            //                     {
            //                         value: '5-10',
            //                         text: '5 - 10 triệu'
            //                     },
            //                     {
            //                         value: '10-20',
            //                         text: '10 - 20 triệu'
            //                     },
            //                     {
            //                         value: '20-30',
            //                         text: '20 - 30 triệu'
            //                     },
            //                     {
            //                         value: '30-40',
            //                         text: '30 - 40 triệu'
            //                     },
            //                     {
            //                         value: '40-50',
            //                         text: '40 - 50 triệu'
            //                     },
            //                     {
            //                         value: '50-',
            //                         text: '>= 50 triệu'
            //                     }])
            //             }
            //             return optionList;
            //         }
            //     }
            // },
            {
                id: '#statusId',
                type: 'select2',
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return $.ajax({
                            url: API_LIST.getChannelStatusList,
                            type: 'GET'
                        });
                    },
                    callBack: function (response) {
                        var optionList = [{
                            value: 0,
                            text: 'Tất cả'
                        }];
                        if (response.result) {
                            $.each(response.data, function (id, type) {
                                if (type.type == 1) {
                                    $.each(type.list, function (key, item) {
                                        //remove source diy
                                        optionList.push({
                                            value: item.id,
                                            text: item.name
                                        });
                                    });
                                    return false;
                                }
                            });
                        }
                        return optionList;
                    }
                },
            },
            {
                id: '#districtIds',
                type: 'select2',
                optionsList: {
                    type: 'ajax',
                    changedBy: '#userId',
                    data: function () {
                        updateDataFilter();
                        if (!_isAdmin) {
                            dataFilter.userId = _userId;
                        }
                        return $.ajax({
                            url: API_LIST.getDistrictByUser,
                            type: 'POST',
                            data: dataFilter
                        });
                    },
                    callBack: function (response) {
                        var optionList = [];
                        if (response.result) {
                            $.each(response.data, function (i, item) {
                                optionList.push({
                                    value: item.districtId,
                                    text: isVal(item.districtName) ? item.districtName : 'N/A'
                                });
                            });
                        }

                        return optionList;

                    }
                }
            },
            {
                id: '#date-range-fast',
                type: 'select2',
                optionsList: {
                    type: 'static',
                    data: function () {
                        var optionList = [
                            {
                                value: 'custom',
                                text: 'Tự chọn'
                            },
                            {
                                value: 'today',
                                text: 'Hôm nay'
                            },
                            {
                                value: 'yesterday',
                                text: 'Hôm qua'
                            },
                            {
                                value: 'this-week',
                                text: 'Trong tuần này'
                            },
                            {
                                value: 'this-month',
                                text: 'Trong tháng này'
                            },
                            {
                                value: 'this-year',
                                text: 'Trong năm này'
                            }];
                        return optionList;
                    },
                },
                onChange: function () {
                    chooseDateFast();
                },
                afterRender: () => {
                    $('#date-range-fast').val('custom').select2();
                    $('.date-range-to').datepicker("update", moment().endOf('day').format(dateFormat));
                    $('.date-range-from').datepicker("update", moment().subtract(1, 'day').startOf('day').format(dateFormat));
                    //chooseDateFast();
                }
            }]

        if (_isAdmin) {
            filterUi.push(
                {
                    id: '#userId',
                    type: 'select2',
                    optionsList: {
                        type: 'ajax',
                        data: function () {
                            return $.ajax({
                                url: API_LIST.getListUser,
                                type: 'GET'
                            });
                        },
                        callBack: function (response) {
                            var optionList = [
                                {
                                    value: 0,
                                    text: '-- Vui Lòng Chọn --'
                                }];
                            if (response.result) {
                                $.each(response.data, function (id, item) {
                                    optionList.push({
                                        value: item.userId,
                                        text: item.name
                                    });
                                });
                            }
                            return optionList;
                        }
                    },
                });
            filterUi.push(
                {
                    id: '#userPreId',
                    type: 'select2',
                    optionsList: {
                        type: 'ajax',
                        data: function () {
                            return $.ajax({
                                url: POS_APIS_COMMON.get('GET_DEPARTMENT_USER_LIST'),
                                type: 'GET'
                            });
                        },
                        callBack: function (response) {
                            let optionList = [
                                {
                                    value: 0,
                                    text: '-- Vui Lòng Chọn --'
                                }];
                            let filter = response.data.filter((it) => it.departmentId === 16);
                            $.each(filter, function (id, item) {
                                optionList.push({
                                    value: item.userId,
                                    text: item.name
                                });
                            });
                            return optionList;
                        }
                    },
                });
            filterUi.push(
                {
                    id: '#statusPreId',
                    type: 'select2',
                    optionsList: {
                        type: 'ajax',
                        data: function () {
                            return $.ajax({
                                url: POS_APIS_PRESCREEN.get('GET_CHANNEL_STATUS'),
                                type: 'GET'
                            });
                        },
                        callBack: function (response) {
                            var optionList = [{
                                value: 0,
                                text: 'Tất cả'
                            }];
                            $.each(response.data, function (id, type) {
                                if ([5, 6, 7, 8].indexOf(type.type) > -1) {
                                    $.each(type.list, function (key, item) {
                                        //remove source diy
                                        optionList.push({
                                            value: item.id,
                                            text: item.name
                                        });
                                    });
                                }
                            });
                            return optionList;
                        }
                    },
                });
        }

        proccessAsynchRenderField(filterUi);

        // load api for source childs
        await __indexPromiseApi('GET_TYPE_LIVE');
        await __indexPromiseApi('GET_TC');
        await __indexPromiseApi('GET_INFO_CHANNEL');
        await __indexPromiseApi('GET_INFO_CHANNEL_CHILD');
    }

    async function __indexPromiseApi(name) {
        let promise = null;
        switch (name) {
            case 'GET_TC': {
                if (!POS_STORED_LOCAL_API.TC_LIST) {
                    await POS_PROMISISE_API("GET_TC");
                }
                $("#tcId").html('').select2();
                let data = [];


                if (stored.sourceId && stored.sourceId.indexOf("177") > -1) {
                    // load tc
                    $("#tcId").prop('disabled', false);
                    data = data.concat(POS_STORED_LOCAL_API.TC_LIST);
                } else {
                    $("#tcId").prop('disabled', true);
                }
                $("#tcId").select2({
                    data: data,
                    placeholder: "Chọn trung tâm",
                });

                break;
            }
            case "GET_INFO_CHANNEL": {

                if (!POS_STORED_LOCAL_API.INFO_CHANNEL_LIST) {
                    await POS_PROMISISE_API("GET_INFO_CHANNEL");
                }
                $("#infoChannel").html('').select2();
                let data = [];
                data = data.concat(POS_STORED_LOCAL_API.INFO_CHANNEL_LIST);
                $("#infoChannel").select2({
                    data: data,
                    placeholder: "Chọn kênh thông tin",
                });
                break;
            }
            case "GET_INFO_CHANNEL_CHILD": {
                $("#infoChannelChild").html('').select2();
                let data = [];
                // get all child
                if (!POS_STORED_LOCAL_API.INFO_CHANNEL_CHILD_LIST) {
                    await POS_PROMISISE_API("GET_INFO_CHANNEL_CHILD", {parentId: 0});
                }
                data = data.concat(POS_STORED_LOCAL_API.INFO_CHANNEL_CHILD_LIST);
                const channelTypeChild = new Map();
                data.forEach(item => {
                    if (channelTypeChild.has(item.parentId)) {
                        let sourceItem = channelTypeChild.get(item.parentId);
                        let listChild = sourceItem.children.concat([{
                            id: item.id + "_" + item.parentId,
                            text: item.text,
                            data: {
                                parentId: item.parentId
                            }
                        }]);
                        sourceItem.children = listChild;
                        channelTypeChild.set(item.parentId, sourceItem);

                    } else {
                        // none, we create new
                        const sourceItem = {
                            id: item.parentId,
                            text: item.parentName,
                            children: [
                                {
                                    id: item.id + "_" + item.parentId,
                                    text: item.text,
                                    data: {
                                        parentId: item.parentId
                                    }
                                }
                            ],
                        };
                        channelTypeChild.set(item.parentId, sourceItem);
                    }

                });
                const dataMap = [];
                // filter by info channel
                if (stored.channelTypeId) {
                    stored.channelTypeId.forEach(it => {
                        const id = Number.parseInt(it);
                        if (channelTypeChild.has(id)) {
                            dataMap.push(channelTypeChild.get(id));
                        }
                    });
                }
                if (dataMap.length > 0) {
                    $("#infoChannelChild").prop('disabled', false);
                } else {
                    $("#infoChannelChild").prop('disabled', true);

                }
                $("#infoChannelChild").select2({
                    data: dataMap,
                    placeholder: " Chọn nguồn thông tin",
                });

                break;
            }
            case 'GET_TYPE_LIVE': {
                $("#liveType").html('').select2();
                let data = [{id: "", text: "Tất cả"}];
                if (!POS_STORED_LOCAL_API.SA_CHANNEL_TYPE_LIST) {
                    await POS_PROMISISE_API("SA_GET_CHANNEL_TYPE", {});
                }
                let liveType = POS_STORED_LOCAL_API.SA_CHANNEL_TYPE_LIST.filter(it => it.type == 9);
                if (liveType) {
                    liveType = liveType[0].list;
                    const dataMap = liveType.map(it => {
                        return {
                            id: it.id,
                            text: it.name,
                        };
                    });
                    data = data.concat(dataMap);
                }

                $("#liveType").select2({
                    data: data,
                });
                break;
            }

        }
    }

    function formatChildRow(object) {
        // `d` is the original data object for the row

        let val = 2;
        if (document.getElementById('report-manager-type')) {
            val = Number.parseInt($('#report-manager-type').select2('data')[0].id);
        }
        let rowChild = "";
        switch (val) {
            case 0: {
                rowChild = '<table cellpadding="5" cellspacing="0" border="0" class="table tb-manager-report-childs" style="margin:0">' +
                    '<tbody>' +
                    '<tr>' +
                    '<td width="50%"><strong>SĐT phụ : </strong> ' + (hasValue(object.subPhone) ? object.subPhone.replace(',', '') : 'N/A') + '</td>' +
                    '<td width="50%"><strong>Loại GD : </strong>' + (hasValue(object.listingTypeName) ? object.listingTypeName : 'N/A') + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td width="50%"><strong>Loại BĐS : </strong>' + (hasValue(object.propertyTypePrefixName) ? object.propertyTypePrefixName : 'N/A') + '</td>' +
                    '<td width="50%"><strong>Phân loại : </strong>' + (hasValue(object.classify) ? object.classify : 'N/A') + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td width="50%"><strong>Loại tin đăng : </strong>' + (hasValue(object.liveType) ? object.liveType : 'N/A') + '</td>' +
                    '<td width="50%"><strong>Trung tâm giao dịch : </strong>' + (hasValue(object.tcName) ? object.tcName : 'N/A') + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td width="50%"></td>' +
                    '<td width="50%"><strong>Ngày live : </strong>' + (hasValue(object.reviewedDate) ? moment(object.reviewedDate).format("HH:mm:ss DD/MM/YYYY") : 'N/A') + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td width="50%"><strong>Ngày đổi trạng thái : </strong>' + (hasValue(object.createdDate) ? moment(object.createdDate).format("HH:mm:ss DD/MM/YYYY") : 'N/A') + '</td>' +
                    '<td width="50%"><strong>Ngày đổi trạng thái Pre : </strong>' + (hasValue(object.preStatusDate) ? moment(object.preStatusDate).format("HH:mm:ss DD/MM/YYYY") : 'N/A') + '</td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>';
                break;
            }
            case 1: {
                rowChild = '<table cellpadding="5" cellspacing="0" border="0" class="table tb-manager-report-childs" style="margin:0">' +
                    '<tbody>' +
                    '<tr>' +
                    '<td width="50%"><strong>SĐT phụ : </strong> ' + (hasValue(object.subPhone) ? object.subPhone.replace(',', '') : 'N/A') + '</td>' +
                    '<td width="50%"><strong>Loại GD : </strong>' + (hasValue(object.listingTypeName) ? object.listingTypeName : 'N/A') + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td width="50%"><strong>Loại BĐS : </strong>' + (hasValue(object.propertyTypePrefixName) ? object.propertyTypePrefixName : 'N/A') + '</td>' +
                    '<td width="50%"><strong>Phân loại : </strong>' + (hasValue(object.classify) ? object.classify : 'N/A') + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td width="50%"><strong>Trung tâm giao dịch : </strong>' + (hasValue(object.tcName) ? object.tcName : 'N/A') + '</td>' +
                    '<td width="50%"><strong>Ngày đổi trạng thái : </strong>' + (hasValue(object.preStatusDate) ? moment(object.preStatusDate).format("HH:mm:ss DD/MM/YYYY") : 'N/A') + '</td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>';
                break;
            }
            case 2: {
                rowChild = '<table cellpadding="5" cellspacing="0" border="0" class="table tb-manager-report-childs" style="margin:0">' +
                    '<tbody>' +
                    '<tr>' +
                    '<td width="50%"><strong>SĐT phụ : </strong> ' + (hasValue(object.subPhone) ? object.subPhone.replace(',', '') : 'N/A') + '</td>' +
                    '<td width="50%"><strong>Loại GD : </strong>' + (hasValue(object.listingTypeName) ? object.listingTypeName : 'N/A') + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td width="50%"><strong>Loại BĐS : </strong>' + (hasValue(object.propertyTypePrefixName) ? object.propertyTypePrefixName : 'N/A') + '</td>' +
                    '<td width="50%"><strong>Phân loại : </strong>' + (hasValue(object.classify) ? object.classify : 'N/A') + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td width="50%"><strong>Loại tin đăng : </strong>' + (hasValue(object.liveType) ? object.liveType : 'N/A') + '</td>' +
                    '<td width="50%"><strong>Trung tâm giao dịch : </strong>' + (hasValue(object.tcName) ? object.tcName : 'N/A') + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td width="50%"><strong>Ngày live : </strong>' + (hasValue(object.reviewedDate) ? moment(object.reviewedDate).format("HH:mm:ss DD/MM/YYYY") : 'N/A') + '</td>' +
                    '<td width="50%"><strong>Ngày đổi trạng thái : </strong>' + (hasValue(object.createdDate) ? moment(object.createdDate).format("HH:mm:ss DD/MM/YYYY") : 'N/A') + '</td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>';
                break;
            }
        }
        return rowChild;
    }

    function buildTable() {

        table = $('#tb-manager-report')
            .on('preInit.dt', function (e, settings) {
                showPropzyLoading();
                //clearDataFilter();
                updateDataFilter();
                $('#tb-manager-report').parent().css('overflow-x', 'auto');
            })
            .on('error.dt', function (e, settings, techNote, message) {
                hidePropzyLoading();
            })
            .DataTable({
                processing: false,
                serverSide: true,
                ajax: {
                    url: API_LIST.getListReport,
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, dataFilter);
                        return d;
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: false,
                language: DatatableHelper.languages.vn,
                columns: renderColumns()
            })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            })
            .on('xhr.dt', function (e, settings, json, xhr) {})
            .on('draw.dt', function () {
                /*
                for(var i = 0; i < rows[0].length; i++) {
                    var row = table.row(i);
                    
                    if (i % 2 == 0) {
                        row.child( formatChildRow(row.data()), 'get-row-detail odd').show();
                    } else {
                        row.child( formatChildRow(row.data()), 'get-row-detail even').show();
                    }
                }*/
                showHideDetail();

            });
    }

    function showHideDetail() {
        var rows = table.rows();
        if (_isShown == false) {
            for (let i = 0; i < rows[0].length; i++) {
                const row = table.row(i);
                row.child.hide();
                $('.td-control-detail').removeClass('fa-minus-circle').addClass('fa-plus-circle').css('color', '#3c8dbc');
            }
        } else {
            for (let i = 0; i < rows[0].length; i++) {
                const row = table.row(i);
                $('.td-control-detail').removeClass('fa-plus-circle').addClass('fa-minus-circle').css('color', '#dd4b39');
                row.child(formatChildRow(row.data()), 'get-row-detail odd').show();
            }
        }
    }

    function event() {

        $('body').off('click', '#btn-filter').on('click', '#btn-filter', function (e) {
            e.preventDefault();

            // table.fixedColumns().update();
            $('#tb-manager-report').DataTable().destroy();
            $('#tb-manager-report').find('tbody').html('');
            table = null;
            renderHeader();
            updateDataFilter();
            buildTable();
        })
        $('body').off('click', '#btn-clear-filter').on('click', '#btn-clear-filter', function (e) {
            e.preventDefault();
            clearDataFilter();
            updateDataFilter();
            table.ajax.reload();
        })
        $('body').off('click', '.td-control-detail').on('click', '.td-control-detail', function () {
            var tr = $(this).closest('tr');
            var row = table.row(tr);
            if (row.child.isShown() == true) {
                row.child.hide();
                $(this).removeClass('fa-minus-circle').addClass('fa-plus-circle').css('color', '#3c8dbc');
            }
            else {
                $(this).removeClass('fa-plus-circle').addClass('fa-minus-circle').css('color', '#dd4b39');
                row.child(formatChildRow(row.data()), 'get-row-detail odd').show();
            }
        });
        $('body').off('click', '#tb-show-detail').on('click', '#tb-show-detail', function (e) {
            e.preventDefault();
            _isShown = true;
            showHideDetail();
        })
        $('body').off('click', '#tb-hide-detail').on('click', '#tb-hide-detail', function (e) {
            e.preventDefault();
            _isShown = false;
            showHideDetail();
        })

        $('body').off('click', '#get-export').on('click', '#get-export', function (e) {
            e.preventDefault();
            var data = table.ajax.params();
            $.ajax({
                url: API_LIST.getExport,
                type: 'POST',
                data: data,
                beforeSend: function () {
                    showPropzyLoading();
                },
                complete: function () {
                    hidePropzyLoading();

                }
            }).done(function (response) {
                if (response.result) {
                    window.location.href = response.data.link;
                } else {
                    showPropzyAlert(response.message);
                }
            });
        });

        $('#get-special-export').on('click', function (e) {
            e.preventDefault();

            $.ajax({
                url: API_LIST.getSpecialListingExport,
                type: 'POST',
                data: {},
                beforeSend: function () {
                    showPropzyLoading();
                },
                complete: function () {
                    hidePropzyLoading();
                }
            }).done(function (response) {
                if (response.result) {
                    window.location.href = response.data.linkFile;
                } else {
                    showPropzyAlert(response.message);
                }
            });
        });

        $('.date-range-from').datepicker()
            .on('changeDate', function (e) {
                var dateFromString = $('.date-range-from').val();
                var dateToString = isVal($('.date-range-to').val()) ? $('.date-range-to').val() : null;

                if (isVal(dateToString)) {
                    var dateFromUnix = moment($('.date-range-from').datepicker('getDate')).unix();
                    var dateToUnix = moment($('.date-range-to').datepicker('getDate')).unix();

                    if (dateFromUnix > dateToUnix) {
                        $('.date-range-to').val("").datepicker("update");
                    }
                }
                $('.date-range-to').datepicker("setStartDate", dateFromString);
                $('.date-range-to').datepicker("setEndDate", '');
                $('#date-range-fast').val('custom').select2();
            });

        $('.date-range-to').datepicker()
            .on('changeDate', function (e) {
                var dateFromString = isVal($('.date-range-from').val()) ? $('.date-range-from').val() : null;
                var dateToString = $('.date-range-to').val();

                if (isVal(dateFromString)) {
                    var dateFromUnix = moment($('.date-range-from').datepicker('getDate')).unix();
                    var dateToUnix = moment($('.date-range-to').datepicker('getDate')).unix();

                    if (dateFromUnix > dateToUnix) {
                        $('.date-range-from').val("").datepicker("update");
                    }
                }
                $('.date-range-from').datepicker("setEndDate", dateToString);
                $('.date-range-from').datepicker("setStartDate", '');
                $('#date-range-fast').val('custom').select2();

            });
        /*$('#statusId').on('change', function() {
            var statusId = isVal($(this).val()) ? parseInt($(this).val()) : null;
            if (isVal(statusId) && statusId != 3) {
                $('#updateStatus').prop('checked', true).val(1);
                $('#updateStatus').attr('disabled', true);
            } else {
                $('#updateStatus').prop('checked', false).val(0);
                $('#updateStatus').attr('disabled', false);
            }
        })*/
        $('#updateStatus').on('click', function () {
            if ($(this).is(':checked')) {
                $(this).val(1);
            } else {
                $(this).val(0);
            }
        })
        $('#diyBonus').on('click', function () {
            if ($(this).is(':checked')) {
                $('#statusId').attr('disabled', true);
                $('#updateStatus').attr('disabled', true);
                $(this).val(1);
            } else {
                $('#statusId').attr('disabled', false);
                $('#updateStatus').attr('disabled', false);
                $(this).val(0);
            }
        });

        $(document).off('change', '#sourceIds').on('change', '#sourceIds', function (e) {
            const data = $(this).val();
            stored.sourceId = data;
            __indexPromiseApi('GET_TC');
        });

        $(document).off('change', '#infoChannel').on('change', '#infoChannel', function (e) {
            const data = $(this).val();
            stored.channelTypeId = data;
            __indexPromiseApi('GET_INFO_CHANNEL_CHILD');
        });

    }

    /**
     * function render filter
     */

    function renderFiler() {

        $('.pre-block-wrapper').show();
        $('.sa-block-wrapper').show();
        $('.all-block-wrapper').show();


        let val = 2;
        if (document.getElementById('report-manager-type')) {
            val = Number.parseInt($('#report-manager-type').select2('data')[0].id);
        }
        if (document.getElementById('statusId')) {
            $('#statusId').val(0).select2();
        }
        if (document.getElementById('userId')) {
            $('#userId').val(0).select2();
        }
        if (document.getElementById('userPreId')) {
            $('#userPreId').val(0).select2();
        }
        if (document.getElementById('statusPreId')) {
            $('#statusPreId').val(0).select2();
        }
        if (document.getElementById('liveType')) {
            $('#liveType').val(0).select2();
        }
        if (document.getElementById('diyBonus')) {
            /* $('#diyBonus').trigger('click');
             $('#diyBonus').attr('checked', false).val(0);
             */
            if ($('#diyBonus').is(':checked')) {
                $('#diyBonus').trigger('click');
            }
        }

        switch (val) {
            case 0: {
                $('.pre-block-wrapper').hide();
                $('.sa-block-wrapper').hide();
                $('.all-block-wrapper').show();
                break;
            }
            case 1: {
                $('.sa-block-wrapper').hide();
                break;
            }
            case 2: {
                $('.pre-block-wrapper').hide();
                break;
            }
        }
        $('#tb-hide-detail').trigger('click');
    }

    function renderColumns() {
        let val = 2;
        if (document.getElementById('report-manager-type')) {
            val = Number.parseInt($('#report-manager-type').select2('data')[0].id);
        }

        columns = [];
        switch (val) {
            case 0: {
                columns = [
                    {
                        data: 'control',
                        className: 'control-detail',
                        render: function (data, type, object) {
                            return '<i class="fa fa-plus-circle td-control-detail" style="color : #3c8dbc "></i>';
                        }
                    },
                    {
                        data: 'rlistingId',
                        render: function (data, type, object) {
                            return (hasValue(object.rlistingId) ? '<a id="tr-rlistingId-' + object.rlistingId + '" href="/pos/sa/detail/' + object.rlistingId + '" target="_blank">' + object.rlistingId + '</a>' : 'N/A');
                        }
                    },
                    {
                        data: 'id',
                        render: function (data, type, object) {
                            return (hasValue(object.lsoId) ? '<a id="tr-id-' + object.lsoId + '" href="/pos/prescreener/detail/' + object.lsoId + '" target="_blank">' + object.lsoId + '</a>' : 'N/A');
                        }
                    },
                    {
                        data: 'ownerName',
                        render: function (data, type, object) {
                            return (hasValue(object.ownerName) ? object.ownerName : 'N/A');
                        }
                    },
                    {
                        data: 'updatedDate',
                        render: function (data, type, object) {
                            return hasValue(object.updatedDate)
                                ? moment(object.updatedDate).format(
                                    "HH:mm:ss DD/MM/YYYY"
                                )
                                : "N/A"
                        }
                    },
                    {
                        data: 'phone',
                        render: function (data, type, object) {
                            return (hasValue(object.phone) ? object.phone : 'N/A');
                        }
                    },
                    {
                        data: 'priceFormat',
                        render: function (data, type, object) {
                            return (hasValue(object.priceFormat) ? object.priceFormat : 'N/A');
                        }
                    },
                    {
                        data: 'saName',
                        render: function (data, type, object) {
                            return (hasValue(object.saName) ? object.saName : 'N/A');
                        }
                    },
                    {
                        data: 'preName',
                        render: function (data, type, object) {
                            console.log(data);
                            return (hasValue(object.responsibleName) ? object.responsibleName : 'N/A');
                        }
                    },
                    {
                        data: 'districtName',
                        render: function (data, type, object) {
                            return (hasValue(object.districtName) ? object.districtName : 'N/A');
                        }
                    },
                    {
                        data: 'sourceName',
                        render: function (data, type, object) {
                            return (hasValue(object.sourceName) ? object.sourceName : 'N/A');
                        }
                    },
                    {
                        data: 'statusName',
                        render: function (data, type, object) {
                            return (hasValue(object.statusName) ? object.statusName : 'N/A');
                        }
                    },
                    {
                        data: 'statusNamePre',
                        render: function (data, type, object) {
                            return (hasValue(object.preStatusName) ? object.preStatusName : 'N/A');
                        }
                    }
                ]
                break;
            }
            case 1: {
                columns = [
                    {
                        data: 'control',
                        className: 'control-detail',
                        render: function (data, type, object) {
                            return '<i class="fa fa-plus-circle td-control-detail" style="color : #3c8dbc "></i>';
                        }
                    },
                    {
                        data: 'id',
                        render: function (data, type, object) {
                            return (hasValue(object.lsoId) ? '<a id="tr-rlistingId-' + object.lsoId + '" href="/pos/prescreener/detail/' + object.lsoId + '" target="_blank">' + object.lsoId + '</a>' : 'N/A');
                        }
                    },
                    {
                        data: 'ownerName',
                        render: function (data, type, object) {
                            return (hasValue(object.ownerName) ? object.ownerName : 'N/A');
                        }
                    },
                    {
                        data: 'updatedDate',
                        render: function (data, type, object) {
                            return hasValue(object.updatedDate)
                                ? moment(object.updatedDate).format(
                                    "HH:mm:ss DD/MM/YYYY"
                                )
                                : "N/A"
                        }
                    },
                    {
                        data: 'phone',
                        render: function (data, type, object) {
                            return (hasValue(object.phone) ? object.phone : 'N/A');
                        }
                    },
                    {
                        data: 'priceFormat',
                        render: function (data, type, object) {
                            return (hasValue(object.priceFormat) ? object.priceFormat : 'N/A');
                        }
                    },
                    {
                        data: 'preName',
                        render: function (data, type, object) {
                            console.log(data);
                            return (hasValue(object.responsibleName) ? object.responsibleName : 'N/A');
                        }
                    },
                    {
                        data: 'districtName',
                        render: function (data, type, object) {
                            return (hasValue(object.districtName) ? object.districtName : 'N/A');
                        }
                    },
                    {
                        data: 'sourceName',
                        render: function (data, type, object) {
                            return (hasValue(object.sourceName) ? object.sourceName : 'N/A');
                        }
                    },
                    {
                        data: 'statusNamePre',
                        render: function (data, type, object) {
                            return (hasValue(object.preStatusName) ? object.preStatusName : 'N/A');
                        }
                    }
                ]
                break;
            }
            case 2: {
                columns = [
                    {
                        data: 'control',
                        className: 'control-detail',
                        render: function (data, type, object) {
                            return '<i class="fa fa-plus-circle td-control-detail" style="color : #3c8dbc "></i>';
                        }
                    },
                    {
                        data: 'rlistingId',
                        render: function (data, type, object) {
                            return (hasValue(object.rlistingId) ? '<a id="tr-rlistingId-' + object.rlistingId + '" href="/pos/sa/detail/' + object.rlistingId + '" target="_blank">' + object.rlistingId + '</a>' : 'N/A');
                        }
                    },
                    {
                        data: 'ownerName',
                        render: function (data, type, object) {
                            return (hasValue(object.ownerName) ? object.ownerName : 'N/A');
                        }
                    },
                    {
                        data: 'updatedDate',
                        render: function (data, type, object) {
                            return hasValue(object.updatedDate)
                                ? moment(object.updatedDate).format(
                                    "HH:mm:ss DD/MM/YYYY"
                                )
                                : "N/A"
                        }
                    },
                    {
                        data: 'phone',
                        render: function (data, type, object) {
                            return (hasValue(object.phone) ? object.phone : 'N/A');
                        }
                    },
                    {
                        data: 'priceFormat',
                        render: function (data, type, object) {
                            return (hasValue(object.priceFormat) ? object.priceFormat : 'N/A');
                        }
                    },
                    {
                        data: 'saName',
                        render: function (data, type, object) {
                            return (hasValue(object.saName) ? object.saName : 'N/A');
                        }
                    },
                    {
                        data: 'districtName',
                        render: function (data, type, object) {
                            return (hasValue(object.districtName) ? object.districtName : 'N/A');
                        }
                    },
                    {
                        data: 'sourceName',
                        render: function (data, type, object) {
                            return (hasValue(object.sourceName) ? object.sourceName : 'N/A');
                        }
                    },
                    {
                        data: 'statusName',
                        render: function (data, type, object) {
                            return (hasValue(object.statusName) ? object.statusName : 'N/A');
                        }
                    }
                ]
                break;
            }
        }

        return columns;
    }
    function renderHeader() {
        let val = 2;
        if (document.getElementById('report-manager-type')) {
            val = Number.parseInt($('#report-manager-type').select2('data')[0].id);
        }
        let thead = [];
        switch (val) {
            case 0: {
                thead = [
                    '<th></th>',
                    '<th>Id</th>',
                    '<th>Id Pre</th>',
                    '<th>Chủ tin đăng</th>',
                    '<th>Ngày cập nhật Listing</th>',
                    '<th>Sđt</th>',
                    '<th>Giá</th>',
                    '<th>SA</th>',
                    '<th>Pre</th>',
                    '<th>Quận</th>',
                    '<th>Nguồn</th>',
                    '<th>Trạng thái</th>',
                    '<th>Trạng thái Pre</th>',
                ];
                break;
            }
            case 1: {
                thead = [
                    '<th></th>',
                    '<th>Id</th>',
                    '<th>Chủ tin đăng</th>',
                    '<th>Ngày cập nhật Listing</th>',
                    '<th>Sđt</th>',
                    '<th>Giá</th>',
                    '<th>Pre</th>',
                    '<th>Quận</th>',
                    '<th>Nguồn</th>',
                    '<th>Trạng thái</th>',
                ];
                break;
            }
            case 2: {
                thead = [
                    '<th></th>',
                    '<th>Id</th>',
                    '<th>Chủ tin đăng</th>',
                    '<th>Ngày cập nhật Listing</th>',
                    '<th>Sđt</th>',
                    '<th>Giá</th>',
                    '<th>SA</th>',
                    '<th>Quận</th>',
                    '<th>Nguồn</th>',
                    '<th>Trạng thái</th>',
                ];
                break;
            }
        }

        thead = '<tr>'.concat(thead.join(""), "</tr>");
        $('#tb-manager-report').find('thead').html(thead);
    }

    function chooseDateFast() {
        var date = $('#date-range-fast').val();
        switch (date) {
            case 'custom':
                break;
            case 'today':
                $('.date-range-to').datepicker("update", moment().endOf('day').format(dateFormat));
                $('.date-range-from').datepicker("update", moment().startOf('day').format(dateFormat));
                break;
            case 'yesterday':
                $('.date-range-to').datepicker("update", moment().subtract(1, 'day').endOf('day').format(dateFormat));
                $('.date-range-from').datepicker("update", moment().subtract(1, 'day').startOf('day').format(dateFormat));
                break;
            case 'this-week':
                $('.date-range-to').datepicker("update", moment().endOf('day').format(dateFormat));
                $('.date-range-from').datepicker("update", moment().startOf('isoWeek').format(dateFormat));
                break;
            case 'this-month':
                $('.date-range-to').datepicker("update", moment().endOf('day').format(dateFormat));
                $('.date-range-from').datepicker("update", moment().startOf('month').format(dateFormat));
                break;
            case 'this-year':
                $('.date-range-to').datepicker("update", moment().endOf('day').format(dateFormat));
                $('.date-range-from').datepicker("update", moment().startOf('year').format(dateFormat));
                break;

        }
    }
}
$(document).ready(function () {
    var managerReport = new ManagerReport();
    managerReport.init();
});
