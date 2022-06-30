/**
 The special functions for prescreen
 */
var common = (function () {
    Window.prescreener = {};
    var module = {}

    var API_PRESCREEN = {
        UPDATE: '/pos/prescreener/updateListing',
        INSERT: '/pos/prescreener/insertListing',
        SEND_SA: '/pos/prescreener/sendSA',
        SEND_DIY: '/pos/prescreener/sendDiy',
        CHECK_EXIST_OWNER: '/pos/prescreener/check-exists-owner',
        GET_AGENT: '/pos/CommonPos/getAgentListV2',
        GET_CHANNEL_TYPE: '/pos/prescreener/channel-types',
        GET_CRAWLER_STATUS: '/pos/crawler/get-status-list',
        GET_LISTING_TYPE: '/lso/get-property-types',
        GET_REAL_ESTATE_GROUP: '/lso/get-real-estate-group',
        GET_PROPERTY_TYPE: '/lso/get-property-type-list',
        GET_PROPERTY_TYPE_V2: '/common/property-type-list-v2',
        GET_BUILDING_BY_DISTRICT: '/pos/crawler/getBuildingListByDistrictId',
        GET_BLOCK_BY_BUILDING: '/pos/crawler/get-blocks-by-building',
    };

    module.redirect = function (type = 1) {
        if (type = 1) {
            window.location.href = '/pos/prescreener/create';
        } else {
            window.location.href = '/pos/prescreener#need-to-call-listing';
        }
    };

    module.initData = function (data = null) {
        var result = {
            "id": isVal(data) ? data.id : null,
            "ownerId": isVal(data) ? data.ownerId : null,
            "fromId": isVal(data) ? data.fromId : null,
            "sourceId": isVal(data) ? data.sourceId : null,
            "createdBy": isVal(data) ? data.createdBy : null,
            "updatedBy": isVal(data) ? data.updatedBy : null,
            "assignedTo": isVal(data) ? data.assignedTo : null,
            "assignedDate": isVal(data) ? data.assignedDate : null,
            "cityId": isVal(data) ? data.cityId : null,
            "districtId": isVal(data) ? data.districtId : null,
            "wardId": isVal(data) ? data.wardId : null,
            "streetId": isVal(data) ? data.streetId : null,
            "houseNumber": isVal(data) ? data.houseNumber : null,
            "oldAddress": isVal(data) ? data.oldAddress : null,
            "virtualTouring": isVal(data) ? data.virtualTouring : null,
            "address": isVal(data) ? data.address : null,
            "latitude": isVal(data) ? data.latitude : null,
            "longitude": isVal(data) ? data.longitude : null,
            "lotSize": isVal(data) ? data.lotSize : null,
            "floorSize": isVal(data) ? data.floorSize : null,
            "sizeLength": isVal(data) ? data.sizeLength : null,
            "sizeWidth": isVal(data) ? data.sizeWidth : null,
            "bathRooms": isVal(data) ? data.bathRooms : null,
            "bedRooms": isVal(data) ? data.bedRooms : null,
            "floor": isVal(data) ? data.floor : null,
            "isMezzanine": isVal(data) ? data.isMezzanine : null,
            "isRooftop": isVal(data) ? data.isRooftop : null,
            "isPenhouse": isVal(data) ? data.isPenhouse : null,
            "isAttic": isVal(data) ? data.isAttic : null,
            "facility": {
                "numberBasement": isVal(data) ? data.isBasement : null,
            },
            "deposit": isVal(data) ? data.deposit : null,
            "isGuaranteed": isVal(data) ? data.isGuaranteed : null,
            "isVAT": isVal(data) ? data.isVAT : null,
            "listingTypeId": isVal(data) ? data.listingTypeId : null,
            "minContractDeadline": isVal(data) ? data.minContractDeadline : null,
            "minPrice": isVal(data) ? data.minPrice : null,
            "moveInDate": isVal(data) ? data.moveInDate : null,
            "noteForLs": isVal(data) ? data.noteForLs : null,
            "noteFromLsCall": isVal(data) ? data.noteFromLsCall : null,
            "diyRequestEdit": isVal(data) ? data.diyRequestEdit : null,
            "diyRequestedDate": isVal(data) ? data.diyRequestedDate : null,
            "isDoneForDiy": isVal(data) ? data.isDoneForDiy : null,
            "suggestToDiy": isVal(data) ? data.suggestToDiy : null,
            "numberFloor": isVal(data) ? data.numberFloor : null,
            "statusId": isVal(data) ? data.statusId : null,
            "contractFrom": isVal(data) ? data.contractFrom : null,
            "contractTo": isVal(data) ? data.contractTo : null,
            "statusDate": isVal(data) ? data.statusDate : null,
            "diyStatusId": isVal(data) ? data.diyStatusId : null,
            "diyStatusDate": isVal(data) ? data.diyStatusDate : null,
            "rListingStatusId": isVal(data) ? data.rListingStatusId : null,
            "diyStatusName": isVal(data) ? data.diyStatusName : null,
            "diyRequestLive": isVal(data) ? data.diyRequestLive : null,
            "diyStop": isVal(data) ? data.diyStop : null,
            "photo": isVal(data) ? JSON.stringify(data.photos) : null,
            "photoGcn": isVal(data) ? JSON.stringify(data.photoGcns) : null,
            "price": isVal(data) ? data.price : null,
            "newPrice": isVal(data) ? data.newPrice : null,
            "currency": isVal(data) ? data.currency : 'VND',
            "propertyTypeId": isVal(data) ? data.propertyTypeId : null,
            "realEstateGroupId": isVal(data) ? data.realEstateGroupId : null,
            "roadFrontageDistanceFrom": isVal(data) ? data.roadFrontageDistanceFrom : null,
            "roadFrontageDistanceTo": isVal(data) ? data.roadFrontageDistanceTo : null,
            "createdDate": isVal(data) ? data.createdDate : null,
            "updatedDate": isVal(data) ? data.updatedDate : null,
            "useRightTypeId": isVal(data) ? data.useRightTypeId : null,
            "rlistingId": isVal(data) ? data.rlistingId : null,
            "isLocked": isVal(data) ? data.isLocked : null,
            "isDeleted": isVal(data) ? data.isDeleted : null,
            "deletedBy": isVal(data) ? data.deletedBy : null,
            "deletedDate": isVal(data) ? data.deletedDate : null,
            "reasonId": isVal(data) ? data.reasonId : null,
            "reasonContent": isVal(data) ? data.reasonContent : null,
            "roadPrice": isVal(data) ? data.roadPrice : null,
            "oldHouse": isVal(data) ? data.oldHouse : null,
            "valuationType": isVal(data) ? data.valuationType : null,
            "yearBuilt": isVal(data) ? data.yearBuilt : null,
            "yearFixed": isVal(data) ? data.yearFixed : null,
            "sellFolding": isVal(data) ? data.sellFolding : null,
            "buyNewHouse": isVal(data) ? data.buyNewHouse : null,
            "crawlerStatus": isVal(data) ? data.crawlerStatus : null,
            "useDiy": isVal(data) ? data.useDiy : null,
            "reasonNotUseDiy": isVal(data) ? data.reasonNotUseDiy : null,
            "privacy": isVal(data) ? data.privacy : null,
            "houseCastings": isVal(data) ? data.houseCastings : null,
            "valuationPriceFormat": isVal(data) ? data.valuationPriceFormat : null,
            "buildingId": isVal(data) ? data.buildingId : null,
            "blockId": isVal(data) ? data.blockId : null,
            "owner": isVal(data) && isVal(data.owner) ? data.owner : {},
            "agent": isVal(data) && isVal(data.agent) ? data.agent : {},
            "position": isVal(data) && isVal(data.position) ? data.position : {},
            "tcid": isVal(data) && isVal(data.tcid) ? data.tcid : null,
            "channelTypeId": isVal(data) && isVal(data.channelTypeId) ? data.channelTypeId : null,
            "channelTypeChildId": isVal(data) && isVal(data.channelTypeChildId) ? data.channelTypeChildId : null,
            "mapCode": isVal(data) && isVal(data.mapCode) ? data.mapCode : null,
            "landCode": isVal(data) && isVal(data.landCode) ? data.landCode : null,
        };
        if (!isVal(result.agent.info)) {
            result.agent.info = {};
        }

        return result;
    };

    module.showReuire = function (callback) {
        var labels = [
            'statusId', 'listingTypeId', 'realEstateGroupId', 'propertyTypeId', 'cityId', 'districtId', 'wardId', 'streetId',
            'address', 'statusQuoId', 'gmap', 'price', 'useDiy', 'photo', 'sellFolding', 'buyNewHouse', 'useRightTypeId',
            'title', 'description', 'sourceId', "tcId"
        ]

        if (callback) callback(labels);

        $.each(labels, function (i, item) {
            $('.label-' + item).addRequired();
        })

        showRequireByListingType();
        showRequireByPropertyType();
        showRequireByStatus();
        checkPropertyTypeStatus();
        // event for show require
        /*$('body').on('change', '#propertyTypeId', function (e) {
            // dat nen va mat bang
            var propertyTypeId = parseInt($(this).val());
            showRequireByPropertyType(propertyTypeId);
        })

        $('body').on('change', '#listingTypeId', function (e) {
        	
            showRequireByListingType(listingTypeId);
        })

        $('body').on('change', '#statusId', function (e) {
            var statusId = parseInt($(this).val());
            showRequireByStatus(statusId);
        })*/

        function showRequireByListingType() {
            var listingTypeId = parseInt($('#listingTypeId').val());
            var list = ['minContractDeadline', 'deposit', 'photoGcn'];
            var adds = [];
            $.each(list, function (i, item) {
                $('.label-' + item).removeRequired();
            });
            if (listingTypeId == 2) {
                $.merge(adds, ['minContractDeadline']);
            } else {
                $.merge(adds, ['photoGcn']);
            }
            $.each(adds, function (i, item) {
                $('.label-' + item).addRequired();
            });
        }
        function clearRequireByPropertyType(){
            const list = ['projectId', 'buildingId', 'houseNumber', 'modelCode', 'landCode', 'mapCode', 'bedRooms', 'bathRooms', 'position', 'floor', 'numberFloor', 'floorSize', 'lotSize', 'sizeLength', 'sizeWidth'];
            $.each(list, function (i, item) {
                $('.label-' + item).removeRequired();
            });
        }
        function showRequireByPropertyType() {
            clearRequireByPropertyType();
            let formId = parseInt($("#propertyTypeId").find(":selected").data("formid"));
            let findId = !isNaN(formId) ? formId : 0; // Form default
            const checkByFormId = ListForm.filter(f => f.id == findId)[0];
            const requiredFields = (checkByFormId && checkByFormId.requiredFields) ? checkByFormId.requiredFields : [];
            var adds = ['alleyId', 'alleyWidth', 'position', 'roadFrontageWidth', 'roadFrontageDistance', 'statusQuoId'];
            $.merge(adds, requiredFields);

            $.each(adds, function (i, item) {
                $('.label-' + item).addRequired();
            });
        }

        function showRequireByStatus() {
            var crawlerStatus = parseInt($('#statusId').val());
            var removes = ['name', 'phone', 'name-agent', 'phone-agent'];
            $.each(removes, function (i, item) {
                $('.label-' + item).removeRequired();
            });
            var adds = [];

            if (crawlerStatus == 3) {
                $.merge(adds, ['name-agent', 'phone-agent']);
            } else {
                $.merge(adds, ['name', 'phone']);
            }
            $.each(adds, function (i, item) {
                $('.label-' + item).addRequired();
            });
        }
        
        function checkPropertyTypeStatus() {
            const isDisabled = $('#propertyTypeId option:selected').prop('disabled');
            const propertyTypeName = $('#propertyTypeId option:selected').text();
            if(isDisabled){
                $('#error-propertyTypeId-wrapper').show()
                $('#error-propertyTypeId-wrapper').html(`<p class='error'>Ghi chú: Loại hình BĐS "${propertyTypeName}" đã NGƯNG ÁP DỤNG. Vui lòng cập nhật loại hình BĐS cho Listing</p>`)
            }else {
                $('#error-propertyTypeId-wrapper').hide();
            }
        }
    }

    module.validate = function (data, types = [], callback) {
        var options = [
            {
                id: 'sourceId',
                val: data.sourceId,
                name: 'Nguồn',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'statusId',
                val: data.crawlerStatus,
                name: 'Phân loại',
                optionsErr: [
                    'notNegative',
                ]

            },
            {
                id: 'listingTypeId',
                val: data.listingTypeId,
                name: 'Loại giao dịch',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'realEstateGroupId',
                val: data.realEstateGroupId,
                name: 'Nhóm bất động sản',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'propertyTypeId',
                val: data.propertyTypeId,
                name: 'Loại bất động sản',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'cityId',
                val: data.cityId,
                name: 'Thành phố',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'districtId',
                val: data.districtId,
                name: 'Quận',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'wardId',
                val: data.wardId,
                name: 'Phường',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'streetId',
                val: data.streetId,
                name: 'Đường',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'address',
                val: data.address,
                name: 'Địa chỉ',
                optionsErr: []
            },
            {
                id: 'longitude',
                val: data.longitude,
                name: 'longitude',
                noShowMess: true,
                optionsErr: []
            },
            {
                id: 'latitude',
                val: data.latitude,
                name: 'latitude',
                noShowMess: true,
                optionsErr: []
            },
            {
                id: 'price',
                val: data.price,
                name: 'Giá',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'photo',
                val: JSON.parse(data.photo),
                name: 'Hình ảnh',
                noShowMess: true,
                label: 'photo',
                optionsErr: []

            },
            {
                id: 'sellFolding',
                val: data.sellFolding,
                name: 'Cần bán gấp',
                noShowMess: true,
                optionsErr: []
            },
            {
                id: 'statusQuoId',
                val: data.statusQuoId,
                name: 'Hiện trạng nhà'
            },
            {
                id: 'buyNewHouse',
                val: data.buyNewHouse,
                name: 'Cần mua nhà mới',
                noShowMess: true,
                optionsErr: []
            },
            {
                id: 'title',
                val: data.title,
                name: 'Tiêu đề',
                optionsErr: []
            },
            {
                id: 'description',
                val: data.description,
                name: 'Mô tả',
                optionsErr: []
            },

        ]

        if (data.position.position == 1) {
            // mat tiền
            $.merge(options, [
                {
                    id: 'roadFrontageWidth',
                    val: data.position.roadFrontageWidth,
                    name: 'Độ rộng mặt tiền',
                    optionsErr: [
                        'notNegative',
                    ]
                }
            ]);
        }

        if (data.listingTypeId == 2) {
            $.merge(options, [
                {
                    id: 'minContractDeadline',
                    val: data.minContractDeadline,
                    name: 'Thời gian thuê tối thiểu',
                    optionsErr: [
                        'notNegative'
                    ]
                },
                // {
                //     id: 'deposit',
                //     val: data.deposit,
                //     name: 'Số tiền đặt cọc',
                //     optionsErr: [
                //         'notNegative',
                //     ]
                // }
            ]);
        } else {
            $.merge(options, [
                {
                    id: 'useRightTypeId',
                    val: data.useRightTypeId,
                    name: 'Giấy tờ pháp lý',
                    optionsErr: []
                },
                {
                    id: 'photoGcn',
                    val: JSON.parse(data.photoGcn),
                    name: 'Hình GCN',
                    noShowMess: true,
                    label: 'photoGcn',
                    optionsErr: []
                }]);
        }
        let formId = parseInt($("#propertyTypeId").find(":selected").data("formid"));
        let findId = !isNaN(formId) ? formId : 0; // Form default
        const checkByFormId = ListForm.filter(f => f.id == findId)[0];
        const requiredOptions = checkByFormId ? checkByFormId.requiredOptions : [];
        const optionalValidate = [
            { id: "projectId", name: "Dự án", optionsErr: [] },
            { id: "buildingId", name: "Building", optionsErr: [] },
            { id: "modelCode", name: "Mã căn hộ", optionsErr: [] },
            { id: "numberFloor", name: "Số lầu",optionsErr: ["notNegative"]},
            { id: "houseNumber", name: "Số nhà", optionsErr: [] },
            { id: 'landCode', name: 'Số thửa', optionsErr: [] },
            { id: 'mapCode', name: 'Tờ bản đồ', optionsErr: [] },
            { id: "lotSize", name: "Diện tích đất", optionsErr: ["notNegative"] },
            { id: "floorSize", name: "Diện tích sử dụng", optionsErr: ["notNegative"] },
            { id: "numberFloor", name: "Số lầu", optionsErr: ["notNegative"] },
            { id: "sizeLength", name: "Chiều dài", optionsErr: ["notNegative"] },
            { id: "sizeWidth", name: "Chiều rộng", optionsErr: ["notNegative"] },
            { id: "bedRooms", name: "Số phòng ngủ", optionsErr: ["notNegative"] },
            { id: "bathRooms", name: "Số phòng wc", optionsErr: ["notNegative"] }
        ]
        const checkRequiredValue = function (data) {
            return requiredOptions.map(item => {
                return {
                    ...item,
                    val: data[item.id]
                }
            })
        }
        const checkOptionalValue = function (data) {
            return optionalValidate
            .filter(item => hasValue(data[item.id]))
            .filter(item => !requiredOptions.find(find => find.id == item.id)).map(item => {
                item.val = data[item.id];
                return item;
            });
        }
        const optionalCheck = checkOptionalValue(data);
        const requiredCheck = checkRequiredValue(data);
        $.merge(options, optionalCheck);
        $.merge(options, requiredCheck);

        if (data.crawlerStatus == 3) {
            $.merge(options, [
                {
                    id: 'name-agent',
                    val: data.agent.info.agentId,
                    name: 'Tên môi giới',
                    optionsErr: []
                },
                {
                    id: 'phone-agent',
                    val: data.agent.info.phone,
                    nameFull: 'Số điện thoại agent không tồn tại',
                    optionsErr: []
                }
            ]);
            if (isVal(data.owner)) {
                if (isVal(data.owner.name) || isVal(data.owner.email) || isVal(data.owner.phone)) {
                    $.merge(options, [
                        {
                            id: 'name',
                            val: data.owner.name,
                            name: 'Tên chủ nhà',
                            optionsErr: []
                        },
                        {
                            id: 'phone',
                            val: data.owner.phone,
                            name: 'Số điện thoại ',
                            optionsErr: []
                        }
                    ]);
                }
            }
        } else {
            $.merge(options, [
                {
                    id: 'name',
                    val: data.owner.name,
                    name: 'Tên chủ nhà',
                    optionsErr: []
                },
                {
                    id: 'phone',
                    val: data.owner.phone,
                    name: 'Số điện thoại ',
                    optionsErr: []
                }
            ]);
        }

        //

        if (data.sourceId == 177) {
            // mat tiền
            $.merge(options, [
                {
                    id: 'tcId',
                    val: data.tcid,
                    name: 'Trung tâm giao dịch',
                    optionsErr: []
                }
            ]);
        }

        if (typeof (data.campaignCheck) !== "undefined" && !data.campaignCheck && data.campaignId == null) {
            $.merge(options, [
                {
                    id: 'campaignId',
                    val: data.campaignId,
                    name: 'campaign',
                    optionsErr: []
                }
            ]);
        }
        if (typeof (data.campaignCheck) == "undefined" && data.campaignId == null) {
            $.merge(options, [
                {
                    id: 'campaignId',
                    val: data.campaignId,
                    name: 'Campaign ID',
                    optionsErr: []
                }
            ]);
        }

        // callback
        if (callback) callback(options);

        var hasErr = false;
        var idErr = [];
        $.each(options, function (i, item) {
            if ($.inArray(item.id, types) != -1 || types.length == 0) {
                var err = $('#' + item.id).validateInputData(item);
                if (err) {
                    hasErr = true;
                    idErr.push(item.id);
                }
            }
        })
        return {isErr: hasErr, ids: idErr, options: options};
    };

    module.updateData = function (dataInput, callback) {

        var data = $.extend(true, {}, dataInput);

        var listingTypeId = parseInt($('#listingTypeId').val());
        var sourceId = parseInt($('#sourceId').val());
        var statusQuoId = parseInt($('#statusQuoId').val());
        var crawlerStatus = parseInt($('#statusId').val());
        var fields = [
            {
                key: 'useDefaultPhoto',
                type: 'boolean',
                val: $('#useDefaultPhoto').is(':checked') ? true : false,
                objectDefault: null,
            },
            {
                key: 'sourceId',
                type: 'int',
                val: $('#sourceId').val(),
                objectDefault: null
            },
            {
                key: 'channelTypeId',
                type: 'int',
                val: $('#infoChannel').val(),
                objectDefault: null
            },
            {
                key: 'channelTypeChildId',
                type: 'int',
                val: $('#infoChannelChild').val(),
                objectDefault: null
            },
            {
                key: 'crawlerStatus',
                type: 'int',
                val: $('#statusId').val(),
                objectDefault: null
            },
            {
                key: 'listingTypeId',
                type: 'int',
                val: $('#listingTypeId').val(),
                objectDefault: null
            },
            {
                key: 'realEstateGroupId',
                type: 'int',
                val: $('#realEstateGroupId').val(),
                objectDefault: null
            },
            {
                key: 'propertyTypeId',
                type: 'int',
                val: $('#propertyTypeId').val(),
                objectDefault: null
            },
            {
                key: 'cityId',
                type: 'int',
                val: $('#cityId').val(),
                objectDefault: null
            },
            {
                key: 'districtId',
                type: 'int',
                val: $('#districtId').val(),
                objectDefault: null
            },
            {
                key: 'wardId',
                type: 'int',
                val: $('#wardId').val(),
                objectDefault: null
            },
            {
                key: 'streetId',
                type: 'int',
                val: $('#streetId').val(),
                objectDefault: null
            },
            {
                key: 'houseNumber',
                type: 'string',
                val: $('#houseNumber').val(),
                objectDefault: null
            },
            {
                key: 'address',
                type: 'string',
                val: $('#address').val(),
                objectDefault: null
            },
            {
                key: 'oldAddress',
                type: 'string',
                val: $('#oldAddress').val(),
                objectDefault: null
            },
            {
                key: 'virtualTouring',
                type: 'string',
                val: $('#virtualTouring').val(),
                objectDefault: null
            },
            {
                key: 'xCoordinate',
                type: 'float',
                val: $('#x-latitude').val(),
                objectDefault: null
            },
            {
                key: 'yCoordinate',
                type: 'float',
                val: $('#y-longitude').val(),
                objectDefault: null
            },
            {
                key: 'latitude',
                type: 'float',
                val: $('#latitude').val(),
                objectDefault: null
            },
            {
                key: 'longitude',
                type: 'float',
                val: $('#longitude').val(),
                objectDefault: null
            },
            {
                key: 'price',
                type: 'int',
                val: $('#price').autoNumeric("get"),
                objectDefault: null
            },
            {
                key: 'minPrice',
                type: 'int',
                val: $('#minPrice').autoNumeric("get"),
                objectDefault: null
            },
            {
                key: 'floorSize',
                type: 'float',
                val: $('#floorSize').val().replace(/\,/g, ''),
                objectDefault: null
            },
            {
                key: 'lotSize',
                type: 'float',
                val: $('#lotSize').val().replace(/\,/g, ''),
                objectDefault: null
            },
            {
                key: 'sizeLength',
                type: 'float',
                val: $('#sizeLength').val().replace(/\,/g, ''),
                objectDefault: null
            },
            {
                key: 'sizeWidth',
                type: 'float',
                val: $('#sizeWidth').val().replace(/\,/g, ''),
                objectDefault: null
            },
            {
                key: 'yearBuilt',
                type: 'int',
                val: $('#yearBuilt').val(),
                objectDefault: null
            },
            {
                key: 'yearFixed',
                type: 'int',
                val: $('#yearFixed').val(),
                objectDefault: null
            },
            {
                key: 'noteForLs',
                type: 'string',
                val: $('#noteForLs').val(),
                objectDefault: null
            },
            {
                key: 'title',
                type: 'string',
                val: $('#title').val(),
                objectDefault: null
            },
            {
                key: 'description',
                type: 'string',
                val: $('#description').val(),
                objectDefault: null
            },
            {
                key: 'directionId',
                type: 'string',
                val: $('#directionId').val(),
                objectDefault: null
            }
        ];
        var positions = [];
        var owners = [];
        var agents = [];

        //
        var minContractDeadline = {
            key: 'minContractDeadline',
            type: 'string',
            val: null,
            objectDefault: null
        };
        var deposit = {
            key: 'deposit',
            type: 'int',
            val: null,
            objectDefault: null
        };
        var useRightTypeId = {
            key: 'useRightTypeId',
            type: 'int',
            val: null,
            objectDefault: null
        };
        var privacy = {
            key: 'privacy',
            type: 'int',
            val: null,
            objectDefault: null
        };
        var buildingId = {
            key: 'buildingId',
            type: 'int',
            val: null,
            objectDefault: null
        };
        var blockId = {
            key: 'blockId',
            type: 'int',
            val: null,
            objectDefault: null
        };
        var modelCode = {
            key: 'modelCode',
            type: 'string',
            val: null,
            objectDefault: null
        };
        var numberFloor = {
            key: 'numberFloor',
            type: 'int',
            val: null,
            objectDefault: null
        };
        var bedRooms = {
            key: 'bedRooms',
            type: 'int',
            val: null,
            objectDefault: null
        };
        var bathRooms = {
            key: 'bathRooms',
            type: 'int',
            val: null,
            objectDefault: null
        };
        var isMezzanine = {
            key: 'isMezzanine',
            type: 'boolean',
            val: null,
            objectDefault: null
        };
        var isRooftop = {
            key: 'isRooftop',
            type: 'boolean',
            val: null,
            objectDefault: null
        };
        var facility = {
            key: 'facility',
            type: 'boolean',
            val: null,
            objectDefault: null
        };
        var isAttic = {
            key: 'isAttic',
            type: 'boolean',
            val: null,
            objectDefault: null
        };
        var isPenhouse = {
            key: 'isPenhouse',
            type: 'boolean',
            val: null,
            objectDefault: null
        };
        var houseCastings = {
            key: 'houseCastings',
            type: 'int',
            val: null,
            objectDefault: null
        };
        var statusQuoId = {
            key: 'statusQuoId',
            type: 'int',
            val: null,
            objectDefault: null
        };
        var priceForStatusQuo = {
            key: 'priceForStatusQuo',
            type: 'int',
            val: null,
            objectDefault: null
        };
        var sellFolding = {
            key: 'sellFolding',
            type: 'boolean',
            val: null,
            objectDefault: null
        };
        var buyNewHouse = {
            key: 'buyNewHouse',
            type: 'boolean',
            val: null,
            objectDefault: null
        };
        var moveInDate = {
            key: 'moveInDate',
            type: 'int',
            val: null,
            objectDefault: null
        };
        var contractFrom = {
            key: 'contractFrom',
            type: 'int',
            val: null,
            objectDefault: null
        };
        var contractTo = {
            key: 'contractTo',
            type: 'int',
            val: null,
            objectDefault: null
        };
        // positon
        var floor = {
            key: 'floor',
            type: 'int',
            val: null,
            objectDefault: null
        };
        var position = {
            key: 'position',
            type: 'int',
            val: null,
            objectDefault: null
        };
        var roadFrontageWidth = {
            key: 'roadFrontageWidth',
            type: 'float',
            val: null,
            objectDefault: null
        }
        var widthFrontWay = {
            key: 'widthFrontWay',
            type: 'float',
            val: null,
            objectDefault: null
        }
        var alleyId = {
            key: 'alleyId',
            type: 'int',
            val: null,
            objectDefault: null
        }
        var alleyType = {
            key: 'alleyType',
            type: 'int',
            val: null,
            objectDefault: null
        }
        var alleyWidth = {
            key: 'alleyWidth',
            type: 'float',
            val: null,
            objectDefault: null
        }
        var roadFrontageDistanceFrom = {
            key: 'roadFrontageDistanceFrom',
            type: 'int',
            val: null,
            objectDefault: null
        }
        var roadFrontageDistanceTo = {
            key: 'roadFrontageDistanceTo',
            type: 'int',
            val: null,
            objectDefault: null
        }
        var currency = {
            key: 'currency',
            type: 'string',
            val: 'VND',
            objectDefault: null
        }

        var tcId = {
            key: 'tcid',
            type: 'int',
            val: null,
            objectDefault: null
        }
        var projectId = {
            key: 'projectId',
            type: 'int',
            val: null,
            objectDefault: null
        }

        var mortgaged = {
            key: 'mortgaged',
            type: 'boolean',
            val: null,
            objectDefault: null
        }
        var bankId = {
            key: 'bankId',
            type: 'int',
            val: null,
            objectDefault: null
        };
        var landCode = {
            key: 'landCode',
            type: 'string',
            val: null,
            objectDefault: null
        };
        var mapCode = {
            key: 'mapCode',
            type: 'string',
            val: null,
            objectDefault: null
        };

        // owner

        if (sourceId == 177) {
            tcId.val = Number.parseInt($('#tcId').val()) !== 0 ? Number.parseInt($('#tcId').val()) : null;
        }


        if (listingTypeId == 2) {
            minContractDeadline.val = $('#minContractDeadline').val();
            deposit.val = $('#deposit').autoNumeric("get");
            currency.val = $('#currency').val();
        } else {
            useRightTypeId.val = $('#useRightTypeId').val();
            if ($.inArray(useRightTypeId.val, ['1', '2']) > -1) {
                if ($('#privacy1').is(':checked')) {
                    privacy.val = 1;
                } else if ($('#privacy2').is(':checked')) {
                    privacy.val = 2;
                }
            }
        }
        let formId = parseInt($("#propertyTypeId").find(":selected").data("formid"));
        let findId = !isNaN(formId) ? formId : 0; // Form default
        const checkByFormId = ListForm.filter(f => f.id == findId)[0];
        const { building } = checkByFormId;
        const displayBuildingBlock = building.buildingBlock;
        //building & block
        if (displayBuildingBlock) {
            buildingId.val = $('#buildingId').val();
            blockId.val = $('#blockId').val();
        }
        //modelCode
        const displayModelCode = building.modelCode;
        if(displayModelCode){
            modelCode.val = $.trim($('#modelCode').val());
        }
        // position 
        let useFloor = checkByFormId ? checkByFormId.floor : false;
        if (useFloor) {
            floor.val = $('#floor').val();
        } else if (isVal(buildingId.val)) {
            floor.val = $('#floor').val();
        } else {
            position.val = parseInt($('#position').val());
            if (position.val == 1) {
                roadFrontageWidth.val = $('#roadFrontageWidth').val();
                widthFrontWay.val = $('#roadFrontageWidth').val();
            } else if (position.val == 2) {
                alleyId.val = $('#alleyId').val();
                alleyWidth.val = isVal($('#alleyWidth').val()) ? $('#alleyWidth').val() : null;
                alleyType.val = $('#alleyType1').is(':checked') ? 1 : 2;

                var roadFrontageDistance = parseInt($('#roadFrontageDistance').val());
                if (roadFrontageDistance == 0) {
                    roadFrontageDistanceFrom.val = 0;
                    roadFrontageDistanceTo.val = 100;
                } else if (roadFrontageDistance == 100) {
                    roadFrontageDistanceFrom.val = 100;
                    roadFrontageDistanceTo.val = 200;
                } else if (roadFrontageDistance == 200) {
                    roadFrontageDistanceFrom.val = 200;
                    roadFrontageDistanceTo.val = 500;
                } else if (roadFrontageDistance == 500) {
                    roadFrontageDistanceFrom.val = 500;
                }
            }
        }
        let hasStruct = checkByFormId ? checkByFormId.struct : false;
        if (hasStruct) {
            bedRooms.val = $('#bedRooms').val();
            bathRooms.val = $('#bathRooms').val();
            isMezzanine.val = $('#isMezzanine').is(':checked') ? true : false
            isRooftop.val = $('#isRooftop').is(':checked') ? true : false
            facility.val = $('#isBasement').is(':checked') ? 1 : 0
            isAttic.val = $('#isAttic').is(':checked') ? true : false
            isPenhouse.val = $('#isPenhouse').is(':checked') ? true : false
            if ($('#houseCastings1').is(':checked')) {
                houseCastings.val = 1;
            } else if ($('#houseCastings2').is(':checked')) {
                houseCastings.val = 2;
            }

        }
        //Number floor
        let hasNumberFloor = checkByFormId ? checkByFormId.numberFloor.display : false;
        if(hasNumberFloor){
            numberFloor.val = $('#numberFloor').val();
        }
        statusQuoId.val = $('#statusQuoId').val();
        if (statusQuoId.val == '163') {
            priceForStatusQuo.val = $('#priceForStatusQuo').autoNumeric("get");
        }
        
        landCode.val = $.trim($('#landCode').val()) ? $.trim($('#landCode').val()) : null;
        mapCode.val = $.trim($('#mapCode').val()) ? $.trim($('#mapCode').val()) : null;
        //Check project is has value
        let { project } = checkByFormId;
        let isProject = project.display;
        if (isProject) {
            projectId.val = $('#projectId').val();
        }


        sellFolding.val = $('#sellFolding1').is(':checked') ? true : false;
        buyNewHouse.val = $('#buyNewHouse1').is(':checked') ? true : false;

        if (!$('#moveInDateCheck').is(':checked') && hasValue($('#moveInDatePicker').val())) {
            moveInDate.val = moment($('#moveInDatePicker').val(), 'DD/MM/YYYY').unix() * 1000;
        }

        mortgaged.val = $("#mortgaged").is(":checked");
        if ($("#mortgaged").is(":checked")) {
            bankId.val = hasValue($("#bankId").val()) ? Number.parseInt($("#bankId").val()) : null;
        }
        var mockSurnameId = {
            key: 'mockSurnameId',
            type: 'string',
            val: $('#mockSurnameId').val(),
            objectDefault: null
        };

        $.merge(fields, [mockSurnameId, minContractDeadline, deposit, useRightTypeId, privacy, buildingId, blockId, modelCode, numberFloor, bedRooms, bathRooms, isMezzanine, isRooftop, facility, isAttic, isPenhouse, houseCastings, statusQuoId, priceForStatusQuo, sellFolding, buyNewHouse,
            moveInDate, contractFrom, contractTo, floor, roadFrontageDistanceFrom, roadFrontageDistanceTo, currency, tcId, mortgaged, bankId, projectId, landCode, mapCode]);
        $.merge(positions, [position, roadFrontageWidth, widthFrontWay, alleyId, alleyWidth, alleyType]);


        if (crawlerStatus == 3) {
            var email = {
                key: 'email',
                type: 'string',
                val: $('#email-agent').val(),
                objectDefault: null
            };
            var agentId = {
                key: 'agentId',
                type: 'string',
                val: $('#name-agent').val(),
                objectDefault: null
            }
            var phone = {
                key: 'phone',
                type: 'string',
                val: $('#phone-agent').val(),
                objectDefault: null
            }
            var socialUid = {
                key: 'socialUid',
                type: 'string',
                val: $('#socialUid-agent').val(),
                objectDefault: null
            }
            $.merge(agents, [email, agentId, phone, socialUid]);
        }
        var email = {
            key: 'email',
            type: 'string',
            val: $('#email').val(),
            objectDefault: null
        };
        var name = {
            key: 'name',
            type: 'string',
            val: $('#name').val(),
            objectDefault: null
        };
        var phone = {
            key: 'phone',
            type: 'string',
            val: $('#phone').val(),
            objectDefault: null
        };
        $.merge(owners, [email, name, phone]);
        //callback;
        if (callback) callback({
            fields: fields,
            positions: positions,
            owners: owners,
            agents: agents
        })

        if (!hasValue(data.position)) {
            data.position = {};
        }

        data.agent = {
            info: {}
        }

        if (!isVal(data.owner)) {
            data.owner = {};
        }

        // campaign
        if ($('#campaignChecked').is(':checked')) {
            data.campaignId = null;
        } else {
            data.campaignId = hasValue($('#campaignId').val()) ? $('#campaignId').val() : null;

        }
        data.campaignCheck = $('#campaignChecked').is(':checked');
        $.each(fields, function (i, field) {
            field.val = parseType(field.val, field.type, field.objectDefault)
            if (field.key == 'facility') {
                data['facility'] = {
                    numberBasement: field.val
                }
            } else {
                data[field.key] = field.val;
            }
        });
        $.each(positions, function (i, field) {
            field.val = parseType(field.val, field.type, field.objectDefault)
            $.extend(data.position, {[field.key]: field.val})
        });
        $.each(owners, function (i, field) {
            field.val = parseType(field.val, field.type, field.objectDefault)
            $.extend(data.owner, {[field.key]: field.val})
        });
        $.each(agents, function (i, field) {
            field.val = parseType(field.val, field.type, field.objectDefault)
            $.extend(data.agent.info, {[field.key]: field.val})
        });

        return data;

        function parseType(data, type, objectDefault = null) {
            if (type == 'int') {
                data = $.isNumeric(data) ? parseInt(data) : objectDefault;
            } else if (type == 'float') {
                data = $.isNumeric(data) ? parseFloat(data) : objectDefault;
            } else if (type == 'string') {
                data = isVal(data) ? data : objectDefault;
            }
            return data;
        }
    };

    module.showView = function (data, callback) {
        $('#link').text(data.crawlerLink);

        if (isVal(data.owner)) {
            $('#name').val(data.owner.name);
            $('#phone').val(data.owner.phone);
            $('#email').val(data.owner.email);
        }
        if (isVal(data.agent)) {
            $('#name-agent').val(data.agent.info.name);
            $('#phone-agent').val(data.agent.info.phone);
            $('#email-agent').val(data.agent.info.email);
        }


        var statusId = data.crawlerStatus;
        Listing.getStatusList().done(function (response) {
            var html = '<option value="">--Chọn--</option>';
            $.each(response.data, function (i, data) {
                html += '<option value="' + data.statusId + '">' + data.statusName + '</option>';
            });
            $('#statusId').html('').append(html);
            $('#statusId').val(statusId);
        });

        if (statusId == 3) {
            $('.display-agent').show();
        } else {
            $('.display-agent').hide();
        }

        var listingTypeId = data.listingTypeId;
        Listing.getListingType().done(function (response) {
            var html = '<option value="">--Chọn--</option>';
            $.each(response, function (i, data) {
                html += '<option value="' + i + '">' + data + '</option>';
            });

            $('#listingTypeId').html('').append(html);
            $('#listingTypeId').val(listingTypeId);
        });

        var propertyTypeId = data.propertyTypeId;
        Listing.getPropertyType(listingTypeId).done(function (response) {
            var html = '<option value="">--Chọn--</option>';
            $.each(response, function (i, data) {
                html += '<option value="' + data.propertyTypeID + '">' + data.typeName + '</option>';
            });

            $('#propertyTypeId').html('').append(html);
            $('#propertyTypeId').val(propertyTypeId);
        });

        var sourceId = data.sourceId;
        var statusQuoId = data.statusQuoId;
        $('#display-statusQuoId').hide();
        Listing.getChannelTypes().done(function (response) {
            if (response.result) {
                $.each(response.data, function (id, type) {
                    if (type.type == 1) {
                        $.each(type.list, function (key, item) {
                            if (item.id == sourceId) {
                                $('#sourceId').val(item.name);
                            }
                        });
                    }
                    if (type.type == 13) {
                        $('#display-statusQuoId').show();
                        var option = '<option value="">---Chọn---</option>';
                        $.each(type.list, function (key, item) {
                            var addOption = '<option value="' + item.id + '">' + item.name + '</option>';
                            if (item.id == data) {
                                addOption = '<option value="' + item.id + '" selected>' + item.name + '</option>';
                            }
                            if (statusQuoId == 163) {
                                $('#display-statusQuo').show();
                                $('#priceForStatusQuo').autoNumeric("set", data.priceForStatusQuo);
                            }
                            option += addOption;
                        });
                        $('#statusQuoId').html('').append(option);
                        $('#statusQuoId').val(statusQuoId);
                    }
                });
            }
        });

        var districtId = data.districtId;
        Listing.getDistrictList(1).done(function (response) {
            var html = '<option value="">--Chọn Quận--</option>';
            $.each(response.data, function (i, data) {
                html += '<option value="' + data.districtId + '">' + data.districtName + '</option>';
            });
            $('#districtId').html('').append(html);
            $('#districtId').val(districtId);
        });

        var wardId = data.wardId;
        if (hasValue(wardId)) {
            Listing.getWardList(districtId).done(function (response) {
                var html = '<option value="">--Chọn Phường--</option>';
                $.each(response.data, function (i, data) {
                    html += '<option value="' + data.wardId + '">' + data.wardName + '</option>';
                });
                $('#wardId').html('').append(html);
                $('#wardId').val(wardId);
            });
        } else {
            var html = '<option value="">--Chọn Phường--</option>';
            $('#wardId').html('').append(html);
            $('#wardId').val(wardId);
        }


        var streetId = data.streetId;
        if (hasValue(streetId)) {
            Listing.getStreetList(wardId).done(function (response) {
                var html = '<option value="">--Chọn Đường--</option>';
                $.each(response.data, function (i, data) {
                    html += '<option value="' + data.streetId + '" data-width-value="' + data.widthValue + '">' + data.streetName + '</option>';
                });
                $('#streetId').html('').append(html);
                $('#streetId').val(streetId);
            });
        } else {
            var html = '<option value="">--Chọn Đường--</option>';
            $('#streetId').html('').append(html);
            $('#streetId').val(streetId);
        }

        $('#landCode').val(data.landCode);
        $('#mapCode').val(data.mapCode);
        $('#houseNumber').val(data.houseNumber);
        $('#address').val(data.address);
        $('#oldAddress').val(data.oldAddress);
        $('#virtualTouring').val(data.virtualTouring);
        $('#longitude').val(data.longitude);
        $('#latitude').val(data.latitude);

        $('#lotSize').val(data.lotSize);
        $('#floorSize').val(data.floorSize);
        $('#sizeLength').val(data.sizeLength);
        $('#sizeWidth').val(data.sizeWidth);


        if (data.buyNewHouse) {
            $('#buyNewHouse1').attr('checked', true);
        } else {
            $('#buyNewHouse2').attr('checked', true);
        }

        if (data.sellFolding) {
            $('#sellFolding1').attr('checked', true);
        } else {
            $('#sellFolding2').attr('checked', true);
        }

        $('#yearBuilt').val(data.yearBuilt);
        $('#yearFixed').val(data.yearFixed);

        $('#price').autoNumeric("set", data.price);
        $('#minPrice').autoNumeric("set", data.minPrice);
        $('#currency').val(data.currency);



        if (data.moveInDate == null) {
            $('#moveInDate').val('Ngay sau khi dọn vào');
        } else {
            $('#moveInDate').val(data.moveInDate);
        }


        if (data.useDiy == 1) {
            $('#useDiy').val('Có sử dụng diy');
        } else if (data.useDiy == 2) {
            $('#useDiy').val('Không sử dụng diy');
            $('#display-not-use-diy').show();
            $('#reasonNotUseDiy').val(data.reasonNotUseDiy);
        } else {
            $('#useDiy').val('Chưa tư vấn Diy');
        }

        $('#title').val(data.title);
        $('#description').val(data.description);
        $('#noteData').val(data.noteData);
        $('#noteForLs').val(data.noteForLs);

        if (listingTypeId == 2) {
            $('#display-deposit').show();
            $('#minContractDeadline').val(data.minContractDeadline);
            $('#deposit').autoNumeric("set", data.deposit);
        } else {

            var useRightTypeId = data.useRightTypeId;
            Listing.getUserRightTypes().done(function (response) {
                var html = '<option value="">--Chọn--</option>';
                $.each(response.data, function (i, data) {
                    html += '<option value="' + data.useRightTypeId + '">' + data.typeName + '</option>';
                });
                $('#useRightTypeId').html('').append(html);
                $('#useRightTypeId').val(useRightTypeId);

            })

            if ($.inArray(useRightTypeId, [1, 2]) > -1) {
                $('#display-privacy').show();
                if (useRightTypeId == 1) {
                    $('#privacy1').attr('checked', true);
                } else {
                    $('#privacy2').attr('checked', true);
                }

            }
        }

        var buildingId = data.buildingId;
        let formId = parseInt($("#propertyTypeId").find(":selected").data("formid"));
        let findId = !isNaN(formId) ? formId : 0; // Form default
        const checkByFormId = ListForm.filter(f => f.id == findId)[0];
        const { building } = checkByFormId;
        const displayBuilding = building.display;
        const displayBuildingBlock = building.buildingBlock;
        const displayModelCode = building.modelCode;
        if(displayBuilding){
            $('#blc-building').show();
        }else {
            $('#blc-building').hide();
        }
        if (displayBuildingBlock) {
            $('#blc-building').show();
            Listing.getBuildingListByDistrictId(districtId).done(function (response) {
                var html = '<option value="">--Chọn--</option>';
                if (response.result) {
                    $.each(response.data, function (i, data) {
                        html += '<option value="' + data.buildId + '">' + data.buildingName + '</option>';
                    });
                }
                $('#buildingId').html('').append(html);
                $('#buildingId').val(buildingId);
            });

            Listing.getBlocksByBuilding(buildingId).done(function (response) {
                var html = '<option value="">--Chọn--</option>';
                if (response.result) {
                    $.each(response.data, function (i, data) {
                        html += '<option value="' + data.blockId + '">' + data.blockName + '</option>';
                    });
                }
                $('#blockId').html('').append(html);
                $('#blockId').val(data.blockId);
            });
        }
        if(displayModelCode){
            $('#modelCode').val(data.modelCode);
            $('#display-modelCode').show();
        }else {
            $('#display-modelCode').hide();
        }
        let displayStruct = checkByFormId ? checkByFormId.struct : false;
        if (displayStruct) {
            $('.display-struct').show();
            $('#bathRooms').val(data.bathRooms);
            $('#bedRooms').val(data.bedRooms);

            $('#isMezzanine').attr('checked', data.isMezzanine);
            $('#isRooftop').attr('checked', data.isRooftop);
            $('#isBasement').attr('checked', data.facility.numberBasement ? true : false);
            $('#isAttic').attr('checked', data.isAttic);
            $('#isPenhouse').attr('checked', data.isPenhouse);

            var houseCastings = data.houseCastings;
            if (houseCastings == 1) {
                $('#houseCastings1').attr('checked', true);
            } else if (houseCastings == 2) {
                $('#houseCastings2').attr('checked', true);
            }
        } else {
            $('.display-struct').hide();
        }
        let displayNumberFloor = checkByFormId ? checkByFormId.numberFloor.display : false;
        if(displayNumberFloor){
            $('#numberFloor').val(data.numberFloor);
        }
        let displayFloor = checkByFormId ? checkByFormId.floor : false;
        let displayPosition = checkByFormId ? checkByFormId.position : false;
        if (displayFloor || (displayPosition && hasValue(buildingId))) {
            $('#display-floor').show();
            $('#floor').val(data.floor);
            $('.label-numberFloor').text('Số tầng của tòa nhà');
        } else {
            $('.label-numberFloor').text('Số lầu');
            $('#display-basic-position').show();

            var options = '<option value="">---Chọn---</option>';
            var divSelect = {1: 'Mặt Tiền', 2: 'Hẻm'};
            var position = data.position;
            for (var key in divSelect) {

                var addOption = '<option value="' + key + '">' + divSelect[key] + '</option>';

                if (position != null && position.position == key) {
                    addOption = '<option value="' + key + '" selected>' + divSelect[key] + '</option>';
                }
                options += addOption;
            }

            $('#position').html('').append(options);
            $('#position').val(position.position);

            if (position.position == 1) {
                $('#display-front').show();
                $('#roadFrontageWidth').val(position.roadFrontageWidth);
            } else if (position.position == 2) {
                $('#display-alley').show();
                var options = '<option value="">---Chọn---</option>';
                var divSelect = {8: 'Xe ba gác', 9: 'Xe ô tô', 10: 'Xe tải'};
                for (var key in divSelect) {

                    var addOption = '<option value="' + key + '">' + divSelect[key] + '</option>';

                    if (position != null && position.alleyId == key) {
                        addOption = '<option value="' + key + '" selected>' + divSelect[key] + '</option>';
                    }
                    options += addOption;
                }
                $('#alleyId').html('').append(options);
                $('#alleyId').val(position.alleyId);

                if (position != null && position.alleyType == 1) {
                    $('#alleyType1').attr('checked', true);
                } else if (position != null && position.alleyType == 2) {
                    $('#alleyType2').attr('checked', true);
                }

                $('#alleyWidth').val(position.alleyWidth);

                var options = '';
                var divSelect = {'0': '<= 100m', '100': '100m-200m', '200': '200m-500m', '500': '> 500m'};
                var dataFrom = data.roadFrontageDistanceFrom;
                for (var key in divSelect) {

                    var addOption = '<option value="' + key + '">' + divSelect[key] + '</option>';

                    if (dataFrom == key) {
                        addOption = '<option value="' + key + '" selected>' + divSelect[key] + '</option>';
                    }
                    options += addOption;
                }
                $('#roadFrontageDistance').html('').append(options);
                $('#roadFrontageDistance').val(dataFrom);

            }
        }

        $("#mortgaged").prop("checked", data.mortgaged);
        axios.get(POS_APIS_COMMON.get("GET_BANK_LIST"), {})
            .then(xhr => {
                const response = xhr.data;
                var optionList = [{
                    id: '',
                    text: 'Chọn ngân hàng'
                }];
                if (response.result) {
                    const dataMap = response.data.map(bank => {
                        return {
                            id: bank.id,
                            text: bank.name
                        };
                    });
                    optionList = optionList.concat(dataMap);
                }

                $("#bankId").html("");
                $("#bankId").select2({
                    data: optionList
                });
                if (data.bankId) {
                    $("#bankId").val(data.bankId).select2();
                }
            })
            .catch(err => {
                var optionList = [{
                    id: '',
                    text: 'Chọn ngân hàng'
                }];
                $("#bankId").html("");
                $("#bankId").select2({
                    data: optionList
                });
                showErrLog(err);
            });
        axios.get(POS_APIS_COMMON.get("GET_CHANNEL_TYPES"), {params: {type: 10}})
            .then(xhr => {
                const response = xhr.data;
                var optionList = [{
                    id: '',
                    text: '--Chọn định danh--'
                }];
                if (response.result) {
                    const dataMap = response.data[0].list.map(it => {
                        return {
                            id: it.id,
                            text: it.name
                        }
                    });
                    optionList = optionList.concat(dataMap);
                }

                $("#mockSurnameId").html("");
                $("#mockSurnameId").select2({
                    data: optionList
                });
                if (data.mockSurnameId) {
                    $("#mockSurnameId").val(data.mockSurnameId).select2();
                }
            })
            .catch(err => {
                var optionList = [{
                    id: '',
                    text: '--Chọn định danh--'
                }];
                $("#mockSurnameId").html("");
                $("#mockSurnameId").select2({
                    data: optionList
                });
                showErrLog(err);
            });

    }

    module.checkExistedOwner = function (data) {

        var postData = {
            email: null,
            phones: null,
            ownerId: isVal(data.ownerId) ? data.ownerId : null,
            type: 2
        };
        if (data.isPhone) {
            postData.phones = data.val;
        } else {
            postData.email = data.val;
        }
        return $.ajax({
            url: API_PRESCREEN.CHECK_EXIST_OWNER,
            type: "POST",
            data: JSON.stringify(postData)
        });

    }

    module.getAgent = function (data) {
        return $.ajax({
            url: API_PRESCREEN.GET_AGENT,
            type: "POST",
            data: JSON.stringify(data)
        });
    }

    module.getNewSubPhones = function () {
        var phones = $('.blc-phone-items').map(function (idx, elem) {
            var phone = $(elem).find('.phone-multi').val();
            if ($.isNumeric(phone)) {
                return {
                    phoneSub: $(elem).find('.phone-multi').val(),
                    noteForPhone: $(elem).find('.phone-note').val()
                };
            }
        }).get();
        return $.unique(phones);
    }

    module.getFullPhones = function (data) {
        var phone = {
            phoneSub: data.owner.phone,
            noteForPhone: data.owner.noteForPhone
        }
        return $.merge([phone], data.owner.phones);
    }

    module.getPhonesStringArray = function (phones) {
        var phonesArray = $.map(phones, function (value, inx) {
            return value.phoneSub;
        });
        return phonesArray;
    }

    module.updateListing = function (postData) {
        return $.ajax({
            url: API_PRESCREEN.UPDATE,
            data: JSON.stringify(postData),
            type: "POST"
        })
    }
    module.insertListing = function (postData) {
        return $.ajax({
            url: API_PRESCREEN.INSERT,
            data: JSON.stringify(postData),
            type: "POST"
        })
    }
    module.sendSa = function (postData) {
        return $.ajax({
            url: API_PRESCREEN.SEND_SA,
            data: JSON.stringify(postData),
            type: "POST"
        })
    }
    module.sendDiy = function (id) {
        return $.ajax({
            url: API_PRESCREEN.SEND_DIY + '/' + id,
            type: "GET"
        })
    }
    module.loadSourceApi = function (option) {
        var options = {
            callback: function (response) {
                var optionList = [
                    {
                        value: '',
                        text: '-- Vui Lòng Chọn --'
                    }
                ];
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
            },
            callBackFinish: function (response) { },
            onChange: function () { },
            afterRender: function () { }
        }
        $.extend(options, option);

        var feild = {
            id: '#sourceId',
            type: 'select2',
            optionsList: {
                type: 'ajax',
                data: function () {
                    return $.ajax({
                        url: API_PRESCREEN.GET_CHANNEL_TYPE,
                        type: "GET"
                    })
                },
                callBack: function (response) {
                    return options.callback(response);
                },
                callBackFinish: function () {
                    options.callBackFinish();
                }
            },
            onChange: function () {
                options.onChange();
            },
            afterRender: function () {
                options.afterRender();
            }
        };
        renderField(feild);

    }

    module.loadCrawlerStatus = function (option) {
        var options = {
            callback: function (response) {
                var optionList = [{
                    value: '',
                    text: '---Chọn---'
                }];
                if (response.result) {
                    $.each(response.data, function (key, item) {
                        // HIDE PROPZY OPTION
                        item.statusId !== 12 && optionList.push({
                            value: item.statusId,
                            text: item.statusName
                        });
                    });
                }
                return optionList;
            },
            callBackFinish: function (response) { },
            onChange: function () { },
            afterRender: function () { },
        }
        $.extend(options, option);

        var feild = {
            id: '#statusId',
            type: 'select2',
            optionsList: {
                type: 'ajax',
                data: function () {
                    return $.ajax({
                        url: API_PRESCREEN.GET_CRAWLER_STATUS + '/1',
                        type: "GET"
                    })
                },
                callBack: function (response) {
                    return options.callback(response);
                },
                callBackFinish: function () {
                    options.callBackFinish();
                }
            },
            onChange: function (response) {
                options.onChange(response);
            },
            afterRender: function () {
                options.afterRender();
            }
        };
        renderField(feild);

    }
    module.loadListingType = function (option) {
        var options = {
            callback: function (response) {
                var optionList = [
                    {
                        value: '',
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
            },
            callBackFinish: function (response) { },
            onChange: function () { },
            afterRender: function () { },
        }
        $.extend(options, option);

        var feild = {
            id: '#listingTypeId',
            type: 'select2',
            optionsList: {
                type: 'ajax',
                data: function () {
                    return $.ajax({
                        url: API_PRESCREEN.GET_LISTING_TYPE,
                        type: "GET"
                    })
                },
                callBack: function (response) {
                    return options.callback(response);
                },
                callBackFinish: function () {
                    options.callBackFinish();
                }
            },
            onChange: function (response) {
                options.onChange(response);
            },
            afterRender: function () {
                options.afterRender();
            }
        };
        renderField(feild);

    }

    module.loadRealEstateGroup = function (option) {
        var options = {
            callback: function (response) {
                var optionList = [
                    {
                        value: '',
                        text: '-- Vui Lòng Chọn --'
                    }
                ];
                $.each(response, function (i, item) {
                    optionList.push({
                        value: item.id,
                        text: item.name
                    });
                });
                return optionList;
            },
            callBackFinish: function (response) { },
            onChange: function () { },
            afterRender: function () { },
        }
        $.extend(options, option);

        var feild = {
            id: '#realEstateGroupId',
            type: 'select2',
            optionsList: {
                type: 'ajax',
                data: function () {
                    return $.ajax({
                        url: API_PRESCREEN.GET_REAL_ESTATE_GROUP,
                        type: "GET"
                    })
                },
                callBack: function (response) {
                    return options.callback(response);
                },
                callBackFinish: function () {
                    options.callBackFinish();
                }
            },
            onChange: function (response) {
                options.onChange(response);
            },
            afterRender: function () {
                options.afterRender();
            }
        };
        renderField(feild);

    }

    module.loadPropertyType = function (option) {
        var options = {
            callback: function (response) {
                var optionList = [
                    {
                        value: '',
                        text: '-- Vui Lòng Chọn --'
                    }
                ];
                if (response.result == false) {
                    return optionList;
                }
                $.each(response.data, function (i, item) {
                    optionList.push({
                        value: item.propertyTypeId,
                        text: item.typeName,
                        data: {
                            formId: item.formId
                        },
                        disabled: !item.active
                    });
                });
                return optionList;
            },
            callBackFinish: function (response) { },
            onChange: function () { },
            afterRender: function () { },
        }
        $.extend(options, option);

        var feild = {
            id: '#propertyTypeId',
            type: 'select2',
            optionsList: {
                type: 'ajax',
                data: function () {
                    let listingTypeId = isVal($('#listingTypeId').val()) ? parseInt($('#listingTypeId').val()) : '';
                    let realEstateGroupId = isVal($('#realEstateGroupId').val()) ? parseInt($('#realEstateGroupId').val()) : '';
                    return $.ajax({
                        url: API_PRESCREEN.GET_PROPERTY_TYPE_V2 + '/' + realEstateGroupId + '/' + listingTypeId,
                        type: "GET"
                    })
                },
                callBack: function (response) {
                    return options.callback(response);
                },
                callBackFinish: function () {
                    options.callBackFinish();
                }
            },
            onChange: function (response) {
                options.onChange(response);
            },
            afterRender: function () {
                options.afterRender();
            }
        };
        renderField(feild);

    }
    module.loadBuilding = function (option) {
        var options = {
            id: '#buildingId',
            type: 'select2',
            optionsListType: 'ajax',
            data: function () {
                var districtId = isVal($('#districtId').val()) ? parseInt($('#districtId').val()) : -1;
                return $.ajax({
                    url: API_PRESCREEN.GET_BUILDING_BY_DISTRICT,
                    type: "POST",
                    data: JSON.stringify({
                        districtId: districtId
                    })
                })
            },
            callback: function (response) {
                var optionList = [
                    {
                        value: '',
                        text: '-- Vui Lòng Chọn --'
                    }
                ];
                if (response.result == false) {
                    return optionList;
                }
                $.each(response.data, function (i, item) {
                    optionList.push({
                        value: item.buildId,
                        text: item.buildingName,
                        address: item.address,
                        long: item.longitude,
                        lat: item.latitude,
                        numberFloor: item.numberFloor,
                        projectId: item.projectId,
                        data: {
                            address: item.address,
                            long: item.longitude,
                            lat: item.latitude,
                            numberFloor: item.numberFloor,
                            projectId: item.projectId
                        }
                    });
                });
                return optionList;
            },
            callBackFinish: function (response) { },
            onChange: function () { },
            afterRender: function () { },
        }
        $.extend(options, option);

        renderFieldFun(options);

    }

    module.loadBlockBuilding = function (option) {
        var options = {
            id: '#blockId',
            type: 'select2',
            optionsListType: 'ajax',
            data: function () {
                var buildingId = isVal($('#buildingId').val()) ? parseInt($('#buildingId').val()) : null;
                return $.ajax({
                    url: API_PRESCREEN.GET_BLOCK_BY_BUILDING + '/' + buildingId,
                    type: "GET",
                })
            },
            callback: function (response) {
                var optionList = [
                    {
                        value: '',
                        text: '-- Vui Lòng Chọn --'
                    }
                ];
                if (response.result == false) {
                    return optionList;
                }
                $.each(response.data, function (i, item) {
                    optionList.push({
                        value: item.blockId,
                        text: item.blockName,
                        numberFloor: item.numberFloor,
                        data: {
                            numberFloor: item.numberFloor,
                        }
                    });
                });
                return optionList;
            },
            callBackFinish: function (response) { },
            onChange: function () { },
            afterRender: function () { },
        }
        $.extend(options, option);

        renderFieldFun(options);

    }


    function renderFieldFun(options) {
        var feild = {
            id: options.id,
            type: options.type,
            optionsList: {
                type: options.optionsListType,
                data: function () {
                    return options.data();
                },
                callBack: function (response) {
                    return options.callback(response);
                },
                callBackFinish: function () {
                    options.callBackFinish();
                }
            },
            onChange: function (response) {
                options.onChange(response);
            },
            afterRender: function () {
                options.afterRender();
            }
        };
        renderField(feild);
    }


    return module;
})