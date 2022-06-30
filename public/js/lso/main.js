$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});

// LSO Main
var main = {
    lsoListing: "",
    lsoFilter: {
        "address": null,
        "name": null,
        "phone": null,
        "statusId": null,
        "sourceId": null,
        "lsoSourceId": null,
        "cityId": null,
        "districtId": null,
        "wardId": null,
        "streetId": null
    },
    lsoDupIds: [],
    statuses: [],
    lsoMembers: [],
    init: function() {
        requestCallback.initCallback(3);

        // Danh sách status
        main.getStatusList(function(response) {
            requestCallback.addCallbackToQueue();
            if (response.result) {
                $.map(response.data, function(item) {
                    if (item.type == 1) {
                        // Prepare data into statuses
                        $.map(item.list, function(status) {
                            main.statuses.push({
                                id: status.id,
                                text: status.name
                            });
                        });
                        $("#statusId").select2({
                            data: main.statuses
                        });
                    }
                });
            }
        });

        // Channel types (8,9,10,11,12)
        // 1: Nguồn khách hàng
        // 2: Loại nhà
        // 3: Loại công trình
        // 4: Loại vật liệu
        // 5: Ưu điểm
        // 6: Nhược điểm
        // 7: Loại lịch sử
        main.loadChannelTypes(function(response) {
            $.map(response.data, function(item) {
                main.loadChannelType(item);
            });
            requestCallback.addCallbackToQueue();
        });

        main.getLsMembers(function(response) {
            if (response.result) {
                $.map(response.data, function(item) {
                    main.lsoMembers.push({
                        id: item.userId,
                        text: item.name
                    });
                });
            }

            // Danh sách Listing DIYs
            main.getListings();
        });
    },
    // LSO Listings
    getListings: function() {
        try {
            main.lsoListing.destroy();
        } catch (Ex) {}

        var lsoAjax = "/lso/get-listings?";
        for (var property in main.lsoFilter) {
            if (main.lsoFilter.hasOwnProperty(property)) {
                lsoAjax += property + "=" + main.lsoFilter[property] + "&";
            }
        }
        lsoAjax = lsoAjax.slice(0, -1);

        main.lsoListing = $('#lsoListing').on('processing.dt', function(e, settings, processing) {
            if (!processing) {
                requestCallback.addCallbackToQueue();
            }
        }).DataTable({
            "processing": false,
            "serverSide": true,
            "ajax": lsoAjax,
            "lengthChange": false,
            "paging": true,
            "searching": false,
            "ordering": false,
            "scrollX": true,
            "language": getDataTableLanguage("vn"),
            "columns": [{
                    data: "ownerId",
                    render: main.renderOwnerId
                },
                {
                    data: "name",
                    render: main.renderName
                },
                {
                    data: "address",
                    render: main.renderAddress
                },
                // Nguồn CN
                {
                    data: "sourceName",
                    render: main.renderSourceName
                },
                // Nguồn TĐ
                {
                    data: "sourceNameTD",
                    render: main.renderSourceNameTD
                },
                {
                    data: "statusName",
                    render: main.renderStatusName
                },
                // Tên LSO
                {
                    data: "lsoName",
                    render: main.renderLsoName
                },
                // Status (DIY)
                {
                    data: "statusDiy",
                    render: main.renderStatusDiy
                },
                {
                    data: "createdDate",
                    render: main.renderCreatedDate
                },
                {
                    data: "updatedDate",
                    render: main.renderUpdatedDate
                },
                {
                    data: "districtName",
                    render: main.renderDistrictName
                },
                {
                    data: "price",
                    render: main.renderPrice
                },
                {
                    data: "LID",
                    render: main.renderIsDuplicated
                },
                {
                    data: "cancel",
                    render: main.renderCancel
                },
            ],
            "initComplete": function(settings, json) {
                hidePropzyLoading();
            },
            "fnCreatedRow": function(row, data, index) {
                //Đã bán
                if (data.diyStatusId == 4 && data.listingTypeId == 1) {
                    $(row).find(".status-diy").closest('td').addClass("is-sold-ls");
                }
                // Cho thuê
                else if (data.diyStatusId == 4 && data.listingTypeId == 2) {
                    $(row).find(".status-diy").closest('td').addClass("is-rent-ls");
                }
                // Chờ xét duyệt
                else if (data.diyStatusId == 1) {
                    $(row).find(".status-diy").closest('td').addClass("is-review-ls");
                }
                // Đã ngưng
                else if (data.diyStatusId == 5) {
                    $(row).find(".status-diy").closest('td').addClass("is-stop-ls");
                }
            }
        });
    },

    // Tình trạng
    getStatusList: function(callback) {
        $.ajax({
            url: "/lso/get-status-list",
            type: "GET",
        }).done(function(response) {
            callback(response);
        });
    },
    loadChannelTypes: function(callback) {
        $.ajax({
            url: "/lso/get-channel-types",
            type: "GET",
            success: function(response) {
                callback(response);
            }
        });
    },
    loadChannelType: function(channel) {
        var channels = [{
                id: "1",
                text: "#sourceId, #lsoSourceId",
                type: "select",
            },
            {
                id: "2",
                text: "#houseTypes",
                type: "select",
                compare: "#hiddenHouseId"
            },
            // {id: "3", text: ""}, SPECIAL CASE
            // {id: "4", text: ""},
            {
                id: "5",
                text: "#advantages",
                type: "checkbox"
            },
            {
                id: "6",
                text: "#disadvantages",
                type: "checkbox"
            },
            // {id: "7", text: ""},
        ];
        // Loại công trình
        if (channel.type == 1) {
            var findChannel = $.grep(channels, function(each) {
                return each.id == channel.type;
            });
            if (typeof findChannel[0] != "undefined") {
                if (findChannel[0].type == "select") {
                    var datas = [];
                    var removeIds = [2, 5, 7, 9];
                    $.map(channel.list, function(item) {
                        if (removeIds.indexOf(item.id) == -1) {
                            datas.push({
                                id: item.id,
                                text: item.name
                            });
                        }
                    });

                    var channelsArr = findChannel[0].text.split(',');

                    $.map(channelsArr, function(item) {
                        $(item).select2({
                            data: datas
                        });
                    });
                }
            }
        }
    },
    ///// listing render columns /////
    renderOwnerId: function(data, type, object) {
        return object.ownerId;
    },
    renderName: function(data, type, object) {
        return "<a href='/lso/detail/" + object.id + "'>" + object.name + " - " + object.phone + "</a>";
    },
    renderAddress: function(data, type, object) {
        return object.address;
    },
    renderSourceName: function(data, type, object) {
        return object.sourceName;
    },
    renderSourceNameTD: function(data, type, object) {
        return object.listingSourceName;
    },
    renderStatusName: function(data, type, object) {
        if (typeof object.statusId == "undefined") {
            return object.statusName;
        } else if (!$.isNumeric(object.statusId)) {
            return "";
        } else {
            var status = $.grep(main.statuses, function(item) {
                return item.id == object.statusId;
            });
            if (typeof status[0] != "undefined") {
                console.log(object.statusName);
                return object.statusName;
            } else {
                console.log(object.statusName);
                return "Junk - " + object.statusName;
            }
        }
    },
    renderLsoName: function(data, type, object) {
        return (object.responsibleName) ? object.responsibleName : "<code>N/A</code>";
    },
    renderStatusDiy: function(data, type, object) {        
        var statusDiy = checkStringNotNull(object.diyStatusName) ? "<div class='status-diy'>" + object.diyStatusName + "</div>" : "<code>N/A</code>";
        // '4','Đã giao dịch'
        if (object.diyStatusId == 4) {
            switch (object.listingTypeId) {
                case 1:
                    statusDiy = "<div class='status-diy'>Đã bán</div>";
                    break;
                case 2:
                    statusDiy = "<div class='status-diy'>Đã cho thuê</div>";
                    break;
            }
        }
        return statusDiy;
    },
    renderCreatedDate: function(data, type, object) {
        return main.formatDIYDate(object.createdDate);
    },
    renderUpdatedDate: function(data, type, object) {
        return main.formatDIYDate(object.updatedDate);
    },
    renderDistrictName: function(data, type, object) {
        return object.districtName;
    },
    renderPrice: function(data, type, object) {
        if (!object.price) {
            return "<code>N/A</code>";
        }
        return formatCurrency(object.price, ',', '.', ' đ');
    },
    renderIsDuplicated: function(data, type, object) {
        if (object.rlistingId) {
            return '<a target="_blank" href="/listing/view/' + object.rlistingId + '">' + object.rlistingId + '</a>';
        } else {
            return "<code>N/A</code>";
        }
    },
    renderCancel: function(data, type, object) {
        // Tính năng mới - 18/07/2017
        var actionBtn = "<div class='lsoActionGroup'>";
        actionBtn = actionBtn + "<button class='btn btn-xs btn-danger delete-lso-btn' data-id='" + object.id + "'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span></button>";
        actionBtn = actionBtn + "<button class='btn btn-xs btn-info assign-lso-btn' data-assigned-to='" + object.assignedTo + "' data-id='" + object.id + "'><span class='glyphicon glyphicon-user' aria-hidden='true'></span></button>";
        actionBtn = actionBtn + "</div>";
        return actionBtn;
    },
    // Listing
    getListing: function() {

    },
    // Search
    processSearch: function() {
        requestCallback.initCallback(1);
        main.lsoFilter.address = $("#address").val();
        main.lsoFilter.name = $("#name").val();
        main.lsoFilter.phone = $("#phone").val();
        main.lsoFilter.statusId = $("#statusId").val();
        main.lsoFilter.sourceId = $("#sourceId").val();
        main.lsoFilter.lsoSourceId = $("#lsoSourceId").val();
        if (typeof $("#statusId").val() !== 'undefined') {
            main.lsoFilter.statusId = $("#statusId").val();
        }
        // Re-display LSO Listings
        main.getListings();
    },
    // Common functions
    showField: function(fieldName) {
        var listFields = ['.mat-tien', '.trong-hem'];
        $.map(listFields, function(item) {
            if (item == fieldName) {
                $(item).show();
            } else {
                $(item).hide();
            }
        });
    },
    formatDIYDate: function(fieldVal) {
        return moment(fieldVal).format("DD/MM/YYYY");
    },
    deleteLso: function(id) {
        showPropzyLoading();
        $.ajax({
            url: "/lso/delete-lso?id=" + id,
            type: "GET",
            success: function(response) {
                hidePropzyLoading();
                if (response.result) {
                    main.lsoListing.ajax.reload(null, false);
                }
                showPropzyAlert(response.message);
            }
        })
    },
    getLsMembers: function(callback) {
        $.ajax({
            url: "/lso/get-lso-members",
            type: "GET"
        }).done(function(response) {
            callback(response);
        });
    },
    reassignLso: function(id, assignedTo) {
        showPropzyLoading();
        var postData = {
            id: id,
            assignedTo: assignedTo
        };

        $.ajax({
            url: "/lso/reassignLso",
            type: "POST",
            data: JSON.stringify(postData)
        }).done(function(response) {
            hidePropzyLoading();
            $("#reassign-modal").modal("hide");
            if (response.result) {
                main.lsoListing.ajax.reload();
            }
            showPropzyAlert(response.message);
        });
    }
};

// LSO Listing Detail
var detail = {
    // Edit
    isEditFlag: false,
    // Hình ảnh
    deletingOldImages: [],
    uploadNewImages: [],
    uploadedImages: [],
    uploadedImagesSource: [],
    uploadedImagesCaption: [],
    // Hình GCN
    deletingOldGCNImages: [],
    uploadNewGCNImages: [],
    uploadedGCNImages: [],
    uploadedGCNImagesSource: [],
    uploadedGCNImagesCaption: [],
    // Hình process cho upload
    processPhotos: [],
    processPhotosFinal: [],
    processGCNPhotos: [],
    processGCNPhotosFinal: [],
    // Streets , Phường, Quận
    streetData: [],
    wardData: [],
    districtData: [],
    // Dữ liệu yêu cầu nội bộ
    internalRequestLs: "",
    // Tính năng cập nhật - 17/05/2017
    /**
     * - Bên LSO tin đăng khi edit hay tạo mới. lúc mình chọn tình trạng của tin đăng là "Junk"
     * thi kế bên sẽ hiện thêm một select option và trong đó có 3 option là
     * Không hop tac, tỉnh khác, môi giới
     * (3 option này anh lấy trong cái childs list tương ứng với
     * cái trang thái Junk trong api channel-status :)
     */
    subStatusIds: [],
    statusParentIds: [],
    statusChildIds: [],
    // Tình trạng
    stopFlg: false,
    soldFlg: false,
    rentFlg: false,
    // Giá trị lưu error codes
    errorCodes: [],
    // PS
    psData: [],
    donePsData: [],
    psTotal: 0,
    // PS Delay
    psCount: 0,
    psDelayFlag: false,
    psDate: "",
    psId: "",
    psDelayNote: "",    
    constructionTypes: [],

    init: function() {
        detail.constructionTypes = [];
        detail.isEditFlag = true;
        // Init Number of Queue
        requestCallback.initCallback(7);        

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('#csrf-token').val()
            }
        });
        detail.loadListingImages("#image-list", ".add-image-placeholder", "#add-image-item");
        detail.loadListingImages("#gcn-image-list", ".add-gcn-image-placeholder", "#add-gcn-image-item");

        // Active
        detail.activeFields();
        detail.initModalFields();
        detail.initFields('chinh-dien');

        // Status (1)
        detail.getStatusList();

        // Loading data-source
        // Loại hình giao dịch (2)
        detail.loadPropertyTrans(function(response) {
            console.log("--loai hinh giao dich--");
            requestCallback.addCallbackToQueue();
            var propertyTrans = [];
            for (var i in response) {
                propertyTrans.push({
                    id: i,
                    text: response[i]
                });
            }
            $("#propertyTrans").select2({
                data: propertyTrans
            }).select2('val', $("#hiddenListingTypeId").val(), false);

            // Thuê
            if ($("#propertyTrans").val() == 2) {
                $(".rightTypes-required").hide();
                $("#rightTypes").prop("disabled", true);
            }
        });

        if (!$.isNumeric($("#hiddenListingTypeId").val())) {
            $("#statusId").prop("disabled", true);
        }

        // Loại BĐS (3)
        detail.loadPropertyTypes(function(response) {
            console.log("--Loai BDS--");
            requestCallback.addCallbackToQueue();
            var propertyTypes = [];
            $.map(response, function(item) {
                propertyTypes.push({
                    id: item.propertyTypeID,
                    text: item.typeName
                });
            });
            $("#propertyTypes").select2({
                data: propertyTypes
            }).select2('val', $("#hiddenPropertyTypeId").val(), false);

            // Hiển thị
            if ($("#hiddenPropertyTypeId").val() == 13) {
                $(".bedRooms-required").hide();
                $("#bedRooms").prop("disabled", true);
                $(".bathRooms-required").hide();
                $("#bathRooms").prop("disabled", true);
                $("#numberFloor").prop("disabled", true);
                $("#houseTypes").prop("disabled", true);
                $("#construct-roof").prop("disabled", true);
                $("#construct-wall").prop("disabled", true);
                $("#construct-floor").prop("disabled", true);
                $("#construct-ceil").prop("disabled", true);
                $("#depreciation").prop("disabled", true);
                showErrorLabel("other");
            } else if ($("#hiddenPropertyTypeId").val() == 11) {
                showErrorLabel("privateOwner");
            } else {
                showErrorLabel("other");
            }
        });

        // TP, Phường, Quận (4)
        detail.loadDistrict(function(response) {
            console.log("--Quan--");
            requestCallback.addCallbackToQueue();
            if (response.result) {
                $.map(response.data, function(item) {
                    detail.districtData.push({
                        id: item.districtId,
                        text: item.districtName
                    });
                });

                $("#districtId").select2({
                    data: detail.districtData
                }).select2('val', $("#hiddenDistrictId").val(), false);
            } else {
                showPropzyAlert(response.message);
            }
        });

        // Load Ward (5)
        // Clear Ward
        detail.wardData = [{
            id: '',
            text: 'Phường'
        }];
        $("#wardId").empty();
        if ($("#hiddenWardId").val() != "") {
            requestCallback.numOfQueue++;
            detail.loadWard(function(response) {   
                console.log("--Phuong--");
                requestCallback.addCallbackToQueue();
                if (typeof response[1] != "undefined") {
                    $.map(response, function(item) {
                        detail.wardData.push({
                            id: item.wardId,
                            text: item.wardName
                        });
                    });
                    $("#wardId").select2({
                        data: detail.wardData
                    }).select2('val', $("#hiddenWardId").val(), false);                    
                } else {
                    window.location.reload();
                }
            });
        }

        // Load Đường (6)
        detail.streetData = [{
            id: '',
            text: 'Đường'
        }];
        $("#streetId").empty();
        if ($("#hiddenStreetId").val() != "") {
            requestCallback.numOfQueue++;
            detail.loadStreet(function(response) {
                console.log("--Duong--");
                requestCallback.addCallbackToQueue();
                if (typeof response.data[1] != undefined) {
                    $.map(response.data, function(item) {                    
                        detail.streetData.push({
                            id: item.streetId,
                            text: item.streetName,
                            widthValue: item.widthValue,
                            price: item.price
                        });
                    })
                    $("#streetId").select2({
                        data: detail.streetData
                    }).select2('val', $("#hiddenStreetId").val(), false);                    
                } else {
                    window.location.reload();
                }
            });
        }

        // API lấy danh sách giay chủ quyền (7)
        detail.loadRightTypes(function(response) {
            console.log("--Giay chu quyen--");
            if (response.result) {
                var rightTypes = [];
                $.map(response.data, function(item) {
                    rightTypes.push({
                        id: item.useRightTypeId,
                        text: item.typeName
                    });
                });
                $("#rightTypes").select2({
                    data: rightTypes
                }).select2('val', $("#hiddenUseRightTypeId").val(), false);
            } else {
                showPropzyAlert(response.message);
            }
            requestCallback.addCallbackToQueue();
        });

        // Channel types (8,9,10,11,12)
        // 1: Nguồn khách hàng
        // 2: Loại nhà
        // 3: Loại công trình
        // 4: Loại vật liệu
        // 5: Ưu điểm
        // 6: Nhược điểm
        // 7: Loại lịch sử
        detail.loadChannelTypes(function(response) {
            console.log("--Kenh--");
            $.map(response.data, function(item) {
                detail.loadChannelType(item);
            });
            requestCallback.addCallbackToQueue();
        });

        // Load LSO (*)
        detail.getLsMembers(function(response) {
            console.log("--Lso member--");
            requestCallback.addCallbackToQueue();
            if (response.result) {
                var members = [];
                var activeId = "";
                $.map(response.data, function(item) {
                    if (typeof item.type != "undefined") {
                        activeId = item.userId;
                    }
                    members.push({
                        id: item.userId,
                        text: item.name
                    });
                });
                $("#assignedTo").select2({
                    data: members
                }).select2("val", parseInt($("#hiddenAssignedTo").val()));
            }
        });

        // PS Total
        detail.getPsTotal();
    },

    // Lấy total
    getPsTotal: function() {
        $.ajax({
            url: "/lso/get-total-ps-services",
            data: {
                lsoId: parseInt($("#hiddenId").val())
            }
        }).done(function(rs) {
            if ($.isNumeric(rs)) {
                this.psTotal = rs;
            }
            if (this.psTotal > 0) {
                $(".ps-total-count").html(this.psTotal);
                $(".ps-total-count").show();
            }
        });
    },

    // Tình trạng
    getStatusList: function() {
        var statuses = [];
        $.ajax({
            url: "/lso/get-status-list",
            type: "GET",
        }).done(function(response) {
            console.log("--Tinh Trang--");
            requestCallback.addCallbackToQueue();
            if (response.result) {
                var hiddenRlistingId = $("#hiddenRlistingId").val();
                $.map(response.data, function(item) {
                    if (item.type == 1) {
                        var hiddenStatusId = $("#hiddenStatusId").val();
                        var selectStatus = $.grep(item.list, function(iterStatus) {
                            return iterStatus.id == hiddenStatusId;
                        });
                        // Prepare data into statuses
                        $.map(item.list, function(status) {                            
                            var avoidStatus = [17, 18, 20];
                            if (!$.isNumeric(hiddenRlistingId)) {
                                if ($.inArray(status.id, avoidStatus) == -1) {
                                    statuses.push({
                                        id: status.id,
                                        text: status.name
                                    });
                                }
                            } else {
                                statuses.push({
                                    id: status.id,
                                    text: status.name
                                });
                            }

                            detail.statusParentIds.push(status.id);

                            // Junk
                            if (status.id == 5 && typeof detail.subStatusIds[0] == "undefined") {
                                if (typeof status.childs[0] != "undefined") {
                                    $.map(status.childs, function(item) {
                                        detail.subStatusIds.push({
                                            id: item.id,
                                            text: item.name
                                        });
                                        detail.statusChildIds.push(item.id);
                                    });
                                }
                            }
                        });

                        // Tính năng mới - 17/05/2017
                        $("#statusId").select2({
                            data: statuses
                        });

                        // Login hiển thị nút [Ngưng]
                        detail.handleStatus(hiddenStatusId);
                        if (detail.statusParentIds.indexOf(parseInt(hiddenStatusId)) != -1) {
                            $("#statusId").select2("val", hiddenStatusId);
                        } else if (detail.statusChildIds.indexOf(parseInt(hiddenStatusId)) != -1) {
                            // Case JUNK (5)
                            // Show Sub Status
                            $(".subStatus").show();
                            $("#subStatusId").select2({
                                data: detail.subStatusIds
                            }).select2('val', hiddenStatusId);
                            $("#statusId").select2("val", 5);
                        }
                        detail.lockStatus();
                    }
                    // Chưa có tin đăng hệ thống
                    if (item.type == 4 || item.type == 99) {
                        statuses = [];
                        $.map(item.list, function(status) {
                            statuses.push({
                                id: status.id,
                                text: status.name
                            });
                        });
                        console.log(statuses);
                        console.log(hiddenRlistingId);
                        if (!$.isNumeric(hiddenRlistingId)) {
                            console.log("Chưa có tin đăng: " + item.type);
                            if (item.type == 4) {
                                $("#rlistingStatusId").empty();
                                $("#listing-status-label").html("Tình trạng tin đăng");
                                var tmpHiddenDiyStatusId = 20;
                                if ($.isNumeric($("#hiddenDiyStatusId").val())) {
                                    tmpHiddenDiyStatusId = $("#hiddenDiyStatusId").val();
                                }
                                $("#rlistingStatusId").select2({
                                    data: statuses
                                }).select2("val", tmpHiddenDiyStatusId);
                            }
                        } else {
                            console.log(item.type);
                            if (item.type == 99) {
                                $("#listing-status-label").html("Tình trạng tin đăng HT");
                                $("#rlistingStatusId").select2({
                                    data: statuses
                                }).select2("val", $("#hiddenRlistingStatusId").val());
                                $("#rlistingStatusId").prop("disabled", true);
                            }
                        }
                    }
                });
                // LSO Listing
                // main.getListings();
            }
        });
    },

    // Check Active
    activeFields: function() {
        var listFields = [{
            type: "radio",
            name: ".mattien"
        }];
        $.map(listFields, function(item) {
            if (item.type == 'radio') {
                $(item.name).attr("checked", "checked");
            }
        });
        // Khoảng cách đến mặt tiền
        var roadFrontage = [{
                id: "0-100",
                text: " <= 100m"
            },
            {
                id: "100-200",
                text: " > 100m-200m"
            },
            {
                id: "200-500",
                text: " 200m-500m"
            },
            {
                id: "500-0",
                text: " > 500m"
            }
        ];
        $("#roadFrontage").select2({
            data: roadFrontage
        });
        // Chọn giá trị [Selectbox] Mặt tiền đường
        var from = 0;
        if (!isNaN($("#hiddenRoadFrontageDistanceFrom").val())) {
            from = parseInt($("#hiddenRoadFrontageDistanceFrom").val());
        }
        var to = 0;
        if (!isNaN($("#hiddenRoadFrontageDistanceTo").val())) {
            to = parseInt($("#hiddenRoadFrontageDistanceTo").val());
        }
        $("#roadFrontage").select2('val', from + "-" + to);

        // Logic hiển thị button DIY, Locked, Unlock
        if ($("#hiddenIsSent").val() == "1") {
            detail.displayElements("#unlock-btn");
        } else {
            detail.displayElements("#diy-btn");
        }

        // Logic hiện thị nút [Tạo tin đăng đầy đủ]
        if ($("#hiddenRlistingId").val() != "") {
            $("#create-listing-btn").removeClass("btn-primary");
            $("#create-listing-btn").prop("disabled", true);
        } else {
            if (!$("#create-listing-btn").hasClass("btn-primary")) {
                $("#create-listing-btn").addClass("btn-primary");
            }
            $("#create-listing-btn").prop("disabled", false);
        }

        // If loại == 2 (Thuê)
        if ($("#hiddenListingTypeId").val() == 2) {
            $(".gcn-required").hide();
        } else if ($("#hiddenListingTypeId").val() == 1) {
            $(".gcn-required").show();
        }

        // Init autoNumeric
        // $("#lotSize").autoNumeric("init", {"mDec":0});
        // $("#sizeLength").autoNumeric("init", {"mDec":0});
        // $("#sizeWidth").autoNumeric("init", {"mDec":0});
        // $("#floorSize").autoNumeric("init", {"mDec":0});
        $("#price").autoNumeric("init", {
            "mDec": 0
        });
        $("#price-diy").autoNumeric("init", {
            "mDec": 0
        });
        $("#minPrice").autoNumeric("init", {
            "mDec": 0
        });
        $("#depositText").autoNumeric("init", {
            "mDec": 0
        });
        $("#priceStreetFrontage").autoNumeric("init", {
            "mDec": 0
        });

        // Khấu hao công trình theo tuổi đời
        $("#depreciation").autoNumeric("init", {
            "mDec": 0,
            "pSign": '%'
        });
        
        if ($("#price").val()) {
            $("#price").autoNumeric("set", $("#price").val());
        }
        if ($("#minPrice").val()) {
            $("#minPrice").autoNumeric("set", $("#minPrice").val());
        }
        // Đặt cọc
        if ($("#depositText").val()) {
            $("#depositText").autoNumeric("set", $("#depositText").val());
        }
        // Khấu hao công trình theo tuổi đời
        if ($("#depreciation").val()) {
            $("#depreciation").autoNumeric("set", $("#depreciation").val());
        }
        // Đơn giá mặt tiền đường
        if ($("#priceStreetFrontage").val()) {
            $("#priceStreetFrontage").autoNumeric("set", $("#priceStreetFrontage").val());
        }

        // Khấu hao công trình theo tuổi đời
        $("#depreciation").autoNumeric();

        // Button [Da cho thue] [Da ban]
        $("#sold-date").datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true
        });
        if ($("#hiddenSoldDate").val()) {
            $("#sold-date").datepicker('setDate', formatDate($("#hiddenSoldDate").val()));
        }

        $("#sold-price").autoNumeric("init", {
            "mDec": 0
        });
        if ($("#hiddenPrice").val()) {
            $("#sold-price").autoNumeric("set", $("#hiddenPrice").val());
        }

        $("#sold-from").datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true
        });
        if ($("#hiddenContractFrom").val()) {
            $("#sold-from").datepicker('setDate', formatDate($("#hiddenContractFrom").val()));
        }

        $("#sold-to").datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true
        });
        if ($("#hiddenContractTo").val()) {
            $("#sold-to").datepicker('setDate', formatDate($("#hiddenContractTo").val()));
        }

        $("#rent-price").autoNumeric("init", {
            "mDec": 0
        });
        if ($("#hiddenPrice").val()) {
            $("#rent-price").autoNumeric("set", $("#hiddenPrice").val());
        }

        $("#rent-from").datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true
        });
        if ($("#hiddenContractFrom").val()) {
            $("#rent-from").datepicker('setDate', formatDate($("#hiddenContractFrom").val()));
        }

        $("#rent-to").datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true
        });
        if ($("#hiddenContractTo").val()) {
            $("#rent-to").datepicker('setDate', formatDate($("#hiddenContractTo").val()));
        }        
    },

    // Logic field [Chính diện]
    initFields: function(fieldName) {
        if (fieldName == 'chinh-dien') {
            // Set value
            if ($("#hiddenAlleyWidth").val()) {
                $("div.mat-tien").find('#alleyWidth').val($("#hiddenAlleyWidth").val());
                $("div.trong-hem").find('#widthFrontWay').val($("#hiddenAlleyWidth").val());
            }
            // Position = 1 (Mat tien)
            if ($("#hiddenPosition").val() == 1 || $("#hiddenPosition").val() == "") {
                $(".position[value=1]").prop("checked", true);
                // Bên hông
                if ($("#hiddenHaveBeSide").val() == 1) {
                    $("#haveBeSide-facade").prop("checked", true);
                    $("#chi-tiet-mat-tien").show();
                    if ($("#hiddenRoadFrontageWidth").val()) {
                        $("div#chi-tiet-mat-tien").find("#roadFrontageWidth").val($("#hiddenRoadFrontageWidth").val());
                    }
                    if ($("#hiddenWidthValue").val()) {
                        $("div#chi-tiet-mat-tien").find("#widthValue").val($("#hiddenWidthValue").val());
                    }
                } else {
                    $("#haveBeSide-facade").prop("checked", false);
                }
                $(".mat-tien").show();
                $(".trong-hem").hide();
            }
            // Position = 2 (Hem)
            else if ($("#hiddenPosition").val() == 2) {
                // Set value
                if ($("#hiddenAlleyWidth").val()) {
                    $("div.trong-hem").find('#alleyWidth').val($("#hiddenAlleyWidth").val());
                }
                if ($("#hiddenWidthFrontWay").val()) {
                    $("div.trong-hem").find('#widthFrontWay').val($("#hiddenWidthFrontWay").val());
                }
                // Bên hông
                if ($("#hiddenHaveBeSide").val() == 1) {
                    $("#chi-tiet-hem").show();
                    $("#haveBeSide-alley").prop("checked", true);
                    if ($("#hiddenWidthValue").val()) {
                        $("div#chi-tiet-hem").find("#widthValue").val($("#hiddenWidthValue").val());
                    }
                } else {
                    $("#haveBeSide-facade").prop("checked", false);
                }
                $(".position[value=2]").prop("checked", true);
                $(".trong-hem").show();
                $(".mat-tien").hide();
            }
        }
    },

    initModalFields: function() {
        // Modal thêm đường
        $("#priceStreetModal").autoNumeric("init", {
            "mDec": 0,
            "pSign": 'đ'
        });
    },

    loadListingImages: function(imgLs, imgPlace, imgItem) {
        var imageString = $(imgLs).data("images");
        var imageSourceString = $(imgLs).data("images-source");
        var imageSourceCaption = $(imgLs).data("images-caption");

        if (typeof imageString != undefined && imageString.length > 0) {
            var images = checkStringNotNull(imageString) ? imageString.split(",") : "";
            var imagesSource = checkStringNotNull(imageSourceString) ? imageSourceString.split(",") : "";
            var imagesCaption = checkStringNotNull(imageSourceCaption) ? imageSourceCaption.split(",") : "";

            if (imgPlace == ".add-image-placeholder") {
                detail.uploadedImages = images;
                detail.uploadedImagesSource = imagesSource;
                detail.uploadedImagesCaption = imagesCaption;
            } else {
                detail.uploadedGCNImages = images;
                detail.uploadedGCNImagesSource = imagesSource;
                detail.uploadedGCNImagesCaption = imagesCaption;
            }

            for (var i = 0; i < images.length; i++) {
                var imageSrc = images[i];
                var newImageItem = $(imgPlace).clone();
                newImageItem.find("input").remove();
                newImageItem.find("img").attr("src", imageSrc);
                newImageItem.find("img").attr("class", "lso-image");
                newImageItem.attr("data-src", imageSrc);
                if (imgPlace == ".add-image-placeholder") {
                    newImageItem.insertBefore(imgItem).removeClass("add-image-placeholder hidden");
                } else {
                    newImageItem.insertBefore(imgItem).removeClass("add-gcn-image-placeholder hidden");
                }
            }
        }
    },
    // Validate Image [DETAIL]
    validateImageUpload: function(file) {
        if (typeof file != undefined) {
            if (file.size > 5 * 1024 * 1024) {
                showPropzyAlert(INVALID_SIZE_IMG);
                return false;
            }
            var supportImageTypes = [
                "image/jpeg",
                "image/gif",
                "image/png"
            ];

            if (supportImageTypes.indexOf(file.type) < 0) {
                showPropzyAlert(INVALID_TYPE_IMG);
                return false;
            }

            return true;
        } else {
            showPropzyAlert(EMPTY_FILE);
            return false;
        }
    },
    loadPropertyTrans: function(callback) {
        return $.ajax({
            url: "/lso/get-property-types",
            type: "GET",
            success: function(response) {
                callback(response);
            },
            error: function(response) {
                hidePropzyLoading();
                showPropzyAlert('Đã có lỗi xảy ra. Xin vui lòng làm mới trang');
            }
        });
    },
    loadPropertyTypes: function(callback) {
        var typeId = $("#hiddenListingTypeId").val();
        $.ajax({
            url: "/lso/get-property-type-list/" + typeId,
            type: "GET",
            success: function(response) {
                callback(response);
            },
            error: function(response) {
                hidePropzyLoading();
                showPropzyAlert('Đã có lỗi xảy ra. Xin vui lòng làm mới trang');
            }
        });
    },
    // Reload property types
    reloadPropertyTypes: function(typeId) {
        showPropzyLoading();
        var propertyTypes = [];
        $.ajax({
            url: "/lso/get-property-type-list/" + typeId,
            type: "GET",
            success: function(response) {
                hidePropzyLoading();
                $("#propertyTypes").empty();
                $.map(response, function(item) {
                    propertyTypes.push({
                        id: item.propertyTypeID,
                        text: item.typeName
                    });
                });
                $("#propertyTypes").select2({
                    data: propertyTypes
                });
            },
            error: function(response) {
                hidePropzyLoading();
                showPropzyAlert('Đã có lỗi xảy ra. Xin vui lòng làm mới trang');
            }
        });
    },
    loadDistrict: function(callback) {
        // Trường hợp cityId null, gán cityId = 1
        if ($("#hiddenCityId").val() == "") {
            $("#hiddenCityId").val(1);
        }
        var postData = {
            "regionIdsList": null,
            "cityIdsList": [parseInt($("#hiddenCityId").val())]
        };
        $.ajax({
            url: "/zone/get-districts-by-cities",
            type: "POST",
            data: JSON.stringify(postData),
            success: function(response) {
                callback(response);
            },
            error: function(response) {
                hidePropzyLoading();
                showPropzyAlert('Đã có lỗi xảy ra. Xin vui lòng làm mới trang');
            }
        });
    },
    loadWardWithDistrict: function() {
        showPropzyLoading();
        // Load Ward
        detail.wardData = [{
            id: '',
            text: 'Phường'
        }];
        $("#wardId").empty();
        $("#hiddenDistrictId").val($("#districtId").val());
        detail.loadWard(function(response) {
            $.map(response, function(item) {
                detail.wardData.push({
                    id: item.wardId,
                    text: item.wardName
                });
            });
            $("#wardId").select2({
                data: detail.wardData
            });
            hidePropzyLoading();
        });
    },
    loadWard: function(callback) {
        if ($.isNumeric($("#hiddenDistrictId").val())) {
            $.ajax({
                url: "/common/get-ward/" + $("#hiddenDistrictId").val(),
                type: "GET",
                success: function(response) {
                    callback(response);
                },
                error: function(response) {
                    showPropzyAlert("Đã có lỗi xảy ra. Xin vui lòng làm mới trang");
                    hidePropzyLoading();
                }
            });
        } else {            
            hidePropzyLoading();
        }
    },
    loadStreetWithWard: function() {
        showPropzyLoading();
        // Load street
        detail.streetData = [{
            id: '',
            text: 'Đường'
        }];
        $("#streetId").empty();
        $("#hiddenWardId").val($("#wardId").val());
        detail.loadStreet(function(response) {
            $.map(response.data, function(item) {
                if (item.streetId == parseInt($("#hiddenStreetId").val())) {
                    var widthValue = (item.widthValue) ? item.widthValue : "";
                    if (!$("div.mat-tien").find('#alleyWidth').val()) {
                        $("div.mat-tien").find("#alleyWidth").val(widthValue);
                    }
                }
                detail.streetData.push({
                    id: item.streetId,
                    text: item.streetName,
                    widthValue: item.widthValue,
                    price: item.price
                });
            })
            $("#streetId").select2({
                data: detail.streetData
            });
            hidePropzyLoading();
        });
    },
    loadStreet: function(callback) {
        if ($.isNumeric($("#hiddenWardId").val())) {
            $.ajax({
                url: "/zone/get-streets/" + $("#hiddenWardId").val(),
                type: "GET"
            }).done(function(response) {
                callback(response);
            });
        } else {
            hidePropzyLoading();
        }
    },
    loadSourceTypes: function(callback) {
        $.ajax({
            url: "/lso/get-source-types",
            type: "GET",
            success: function(response) {
                callback(response);
            },
            error: function(response) {
                hidePropzyLoading();
                showPropzyAlert('Đã có lỗi xảy ra. Xin vui lòng làm mới trang');
            }
        });
    },
    loadRightTypes: function(callback) {
        $.ajax({
            url: "/lso/get-right-types",
            type: "GET",
            success: function(response) {
                callback(response);
            },
            error: function(response) {
                hidePropzyLoading();
                showPropzyAlert('Đã có lỗi xảy ra. Xin vui lòng làm mới trang');
            }
        });
    },
    loadHouseTypes: function(callback) {
        $.ajax({
            url: "/lso/get-house-types",
            type: "GET",
            success: function(response) {
                callback(response);
            },
            error: function(response) {
                hidePropzyLoading();
                showPropzyAlert('Đã có lỗi xảy ra. Xin vui lòng làm mới trang');
            }
        });
    },
    loadConstructionTypes: function(callback) {
        $.ajax({
            url: "/lso/get-construction-types",
            type: "GET",
            success: function(response) {
                callback(response);
            },
            error: function(response) {
                hidePropzyLoading();
                showPropzyAlert('Đã có lỗi xảy ra. Xin vui lòng làm mới trang');
            }
        });
    },
    loadAdvantages: function(callback) {
        $.ajax({
            url: "/lso/get-advantages",
            type: "GET",
            success: function(response) {
                callback(response);
            },
            error: function(response) {
                hidePropzyLoading();
                showPropzyAlert('Đã có lỗi xảy ra. Xin vui lòng làm mới trang');
            }
        });
    },
    loadDisadvantages: function(callback) {
        $.ajax({
            url: "/lso/get-disadvantages",
            type: "GET",
            success: function(response) {
                callback(response);
            },
            error: function(response) {
                hidePropzyLoading();
                showPropzyAlert('Đã có lỗi xảy ra. Xin vui lòng làm mới trang');
            }
        });
    },

    loadChannelTypes: function(callback) {
        $.ajax({
            url: "/lso/get-channel-types",
            type: "GET",
            success: function(response) {
                callback(response);
            },
            error: function(response) {
                hidePropzyLoading();
                showPropzyAlert('Đã có lỗi xảy ra. Xin vui lòng làm mới trang');
            }
        });
    },

    loadChannelType: function(channel) {
        var channels = [{
                id: "1",
                text: "#sourceTypes",
                type: "select",
                compare: "#hiddenSourceId"
            },
            {
                id: "2",
                text: "#houseTypes",
                type: "select",
                compare: "#hiddenHouseId"
            },
            // {id: "3", text: ""}, SPECIAL CASE
            // {id: "4", text: ""},
            {
                id: "5",
                text: "#advantages",
                type: "checkbox"
            },
            {
                id: "6",
                text: "#disadvantages",
                type: "checkbox"
            },
            // {id: "7", text: ""},
            {
                id: "9",
                text: "#rejects",
                type: "radio"
            }
        ];
        
        // Lý do từ chối
        if (channel.type == 9) {
            $.map(channel.list, function(each) {
                $('<div class="radio"><label><input type="radio" name="reject-by" data-control="' + each.control + '" class="reject-by" value="' + each.id + '">' + each.name + '</label></div>').appendTo("#reject-opts");
            });
        } else {
            var findChannel = $.grep(channels, function(each) {
                return each.id == channel.type;
            });

            if (channel.type == 2) {
                detail.constructionTypes = channel.list;
            }

            if (typeof findChannel[0] != "undefined") {
                if (findChannel[0].type == "select") {
                    var datas = [];
                    $.map(channel.list, function(item) {
                        datas.push({
                            id: item.id,
                            text: item.name
                        });
                    });

                    // Nguồn tin đăng và nguồn chủ nhà cùng data
                    if (findChannel[0].id == 1) {
                        $("#sourceTypes").select2({
                            data: datas
                        }).select2('val', $("#hiddenSourceId").val());

                        $("#sourceTypesListing").select2({
                            data: datas
                        }).select2('val', $("#hiddenSourceListingId").val());
                    } else {
                        $(findChannel[0].text).select2({
                            data: datas
                        }).select2('val', $(findChannel[0].compare).val());
                    }

                    if (findChannel[0].text == "#propertyTypes") {
                        if ($(findChannel[0].compare).val() == 13) {
                            $(".bedRooms-required").hide();
                            $("#bedRooms").prop("disabled", true);
                            $(".bathRooms-required").hide();
                            $("#bathRooms").prop("disabled", true);
                            $("#numberFloor").prop("disabled", true);
                            $("#houseTypes").prop("disabled", true);
                            $("#construct-roof").prop("disabled", true);
                            $("#construct-wall").prop("disabled", true);
                            $("#construct-floor").prop("disabled", true);
                            $("#construct-ceil").prop("disabled", true);
                        }
                    }
                } else if (findChannel[0].type == "checkbox") {
                    var datas = $(findChannel[0].text + "Ls").val().split(",");
                    var fieldName = findChannel[0].text.substring(1);
                    $.map(channel.list, function(item) {
                        var isChecked = "";
                        if (datas.indexOf(item.id.toString()) != "-1") {
                            isChecked = "checked";
                        }
                        $(findChannel[0].text).append("<input type='checkbox' name='" + fieldName + "' value='" + item.id + "' " + isChecked + "/> " + item.name + "<br/>");
                    });
                }
            }
        }
    },

    // Check existed owner [DETAIL]
    checkExistedOwner: function(isPhone) {
        var isValid = true;
        var errorMsg = "";
        showPropzyLoading();
        var postData = [];
        if (isPhone) {
            if (!$("#phone").val()) {
                isValid = false;
                errorMsg = "Số điện thoại không hợp lệ.  Chỉ cho phép nhập số";
            }
            postData = {
                email: null,
                phone: $("#phone").val(),
                ownerId: parseInt($("#hiddenOwnerId").val()),
                type: 1
            };
        } else {
            if (!$("#email").val()) {
                isValid = false;
                errorMsg = "Email không hợp lệ";
            }
            postData = {
                email: $("#email").val(),
                phone: null,
                ownerId: parseInt($("#hiddenOwnerId").val()),
                type: 1
            };
        }
        if (isValid) {
            $.ajax({
                url: "/lso/check-exists-owner",
                type: "POST",
                data: JSON.stringify(postData),
                success: function(response) {
                    var result = "";
                    if (response.result) {
                        if (typeof response.data[0] != "undefined") {
                            var table = $("<table></table>").addClass("table table-hover");
                            table.append("<thead><tr style='white-space: nowrap;'><th>Tên</th><th>Email</th><th>SĐT</th><th>Loại</th><th>Chi tiết</th></tr></thead>");
                            var tbody = $("<tbody></tbody>");
                            $.map(response.data, function(item) {
                                var row = $("<tr></tr>");
                                row.append($("<td></td>").html(item.name));
                                row.append($("<td></td>").text(item.email));
                                row.append($("<td></td>").text(item.phone));
                                row.append($("<td></td>").text(item.typeName));
                                if (item.id == 3) {
                                    row.append($("<td></td>").html("<a target='_blank' href='/listing/view/" + item.id + "'>Xem chi tiết</a>"));
                                } else {
                                    row.append($("<td></td>").text("N/A"));
                                }
                                tbody.append(row);
                            });
                            table.append(tbody);
                            showPropzyAlert(table);
                        } else {
                            showPropzyAlert("Không có dữ liệu");
                        }
                    } else {
                        showPropzyAlert(response.message);
                    }
                    hidePropzyLoading();
                }
            });
        } else {
            hidePropzyLoading();
            showPropzyAlert(errorMsg);
        }
    },

    displayConstructionTypes: function() {
        // Clear empty
        $('#constructionTypes').empty();
        var tmpHouseTypeId = $("#houseTypes").val();

        var tmpConstructionType = $.grep(detail.constructionTypes, function(item) {
            return parseInt(item.id) == parseInt(tmpHouseTypeId);
        });

        if (typeof tmpConstructionType[0] != "undefined") {
            if (typeof tmpConstructionType[0].childs[0] != "undefined") {
                $.each(tmpConstructionType[0].childs, function(idx, item) {
                    var isChecked = "";
                    if (parseInt(item.id) == parseInt($("#hiddenConstructionTypeId").val())) {
                        isChecked = "checked = 'checked'";
                    }
                    $('<input type="radio" name="constructionTypeId" value="' + item.id + '" ' + isChecked + '> ' + item.name + '<br>').appendTo("#constructionTypes");
                });
            } else {
                $('<label>Không tính chi phí xây dựng</label>').appendTo('#constructionTypes');
            }
        } else {
            $('<label>-- Vui lòng chọn [Loại nhà] --</label>').appendTo('#constructionTypes');
        }
    },

    // Check duplicated address [DETAIL]
    checkDuplicatedAddress: function() {
        var isValid = true;

        if (!$("#cityId").val() || !$("#districtId").val() || !$("#wardId").val() ||
            !$("#streetId").val() || !$("#houseNumber").val()) {
            isValid = false;
            showPropzyAlert("Địa chỉ không hợp lệ");
        }

        if (isValid) {
            showPropzyLoading();
            var postData = {
                "id": parseInt($("#hiddenId").val()),
                "cityId": $("#cityId").val(),
                "districtId": $("#districtId").val(),
                "wardId": $("#wardId").val(),
                "streetId": ($.isNumeric($("#streetId").val())) ? parseInt($("#streetId").val()) : "",
                "houseNumber": $("#houseNumber").val()
            };
            $.ajax({
                url: "/lso/check-duplicated-address",
                type: "POST",
                data: JSON.stringify(postData),
                success: function(response) {
                    var result = "";
                    if (response.result) {
                        if (typeof response.data[0] != "undefined") {
                            var duplicatedMsg = "<p>- Tin đăng hệ thống trùng: </p>";
                            // Add new notify
                            var duplicatedLsoMsg = "<p>- Tin đăng LSO trùng: </p>";
                            $.map(response.data, function(item) {
                                if (item.type == 1) {
                                    duplicatedMsg = duplicatedMsg + "<a target='_blank' href='/listing/view/" + item.id + "'>LID #" + item.id + "</a>, ";
                                } else if (item.type == 2) {
                                    duplicatedLsoMsg = duplicatedLsoMsg + "<a target='_blank' href='/lso/detail/" + item.id + "'>LID #" + item.id + "</a>, ";
                                }
                            });
                            var newDuplicatedMsg = duplicatedMsg.substring(0, duplicatedMsg.length - 1) + "<br>";
                            var duplicatedLsoMsg = duplicatedLsoMsg.substring(0, duplicatedLsoMsg.length - 1) + "<br>";
                            showPropzyAlert(newDuplicatedMsg + duplicatedLsoMsg);
                        } else {
                            showPropzyAlert("Không có tin đăng trùng địa chỉ");
                        }
                    } else {
                        showPropzyAlert(response.message);
                    }
                    hidePropzyLoading();
                }
            });
        }
    },
    updateOwner: function() {
        detail.processUpdateOwner();
    },
    // Update [DETAIL]
    updateListing: function() {
        detail.isEditFlag = true;

        // Tính năng mới - 17/07/2017
        detail.initFormField();
        var isValid = true;
        if (!$("#phone").val() || !isValidPhone($("#phone").val())) {
            $(".phone-error").html("<code>Số điện thoại không hợp lệ.  Chỉ cho phép nhập số</code>");
            isValid = false;
        }

        var bedRooms = $("#bedRooms").val();
        // Đất nền không check [Phòng ngủ]
        if (checkStringNotNull(bedRooms)) {
            if (!isValidNumber(bedRooms)) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#bedRooms");
                $("#bedRooms").css("border-color", "red");
                $(".bedRooms-error").html("<code>Phòng ngủ không hợp lệ</code>");
            }
        }
        // Đất nền không check [WC]
        // WC
        var bathRooms = $("#bathRooms").val();
        if (checkStringNotNull(bathRooms)) {
            if (!isValidNumber(bathRooms)) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#bathRooms");
                $("#bathRooms").css("border-color", "red");
                $(".bathRooms-error").html("<code>WC  không hợp lệ</code>");
            }
        }
        // Check so tang
        if (checkStringNotNull($("#numberFloor").val())) {
            if (!isValidNumber($("#numberFloor").val())) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#numberFloor");
                $("#numberFloor").css("border-color", "red");
                $(".numberFloor-error").html("<code>Số tầng không hợp lệ</code>");
            }
        }
        // Check do rong mat tien 
        if (checkStringNotNull($("#roadFrontageWidth").val())) {
            var tmpRoadFrontageWidth = $("#roadFrontageWidth").val();
            if (tmpRoadFrontageWidth.indexOf("-") != -1) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#roadFrontageWidth");
                $("#roadFrontageWidth").css("border-color", "red");
            }
        }
        // Check do rong hem 
        if (checkStringNotNull($("#widthValue").val())) {
            var tmpWidthValue = $("#widthValue").val();
            if (tmpWidthValue.indexOf("-") != -1) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#widthValue");
                $("#widthValue").css("border-color", "red");
            }
        }

        var tmpPositionChck = parseInt($("input[name=position]:checked").val());

        if (tmpPositionChck == 1) {
            // if (!checkStringNotNull($("div.mat-tien").find("#alleyWidth").val())) {
            //     isValid = false;
            //     detail.errorCodes.push("#alleyWidth");
            //     $("div.mat-tien").find("#alleyWidth").css("border-color", "red");
            //     $("div.mat-tien").find(".alleyWidth-error").html("<code>Độ rộng mặt tiền không hợp lệ</code>");
            // }
            if ($("#haveBeSide-facade:checkbox:checked").val()) {
                var tmpRoadFrontageWidthChck = $("div#chi-tiet-mat-tien").find("#roadFrontageWidth").val();
                var tmpWidthValueChck = $("div#chi-tiet-mat-tien").find("#widthValue").val();

                if ((tmpRoadFrontageWidthChck > 0 && tmpWidthValueChck > 0) || (!checkStringNotNull(tmpRoadFrontageWidthChck) && !checkStringNotNull(tmpWidthValueChck))) {
                    isValid = false;
                    // Add to array
                    detail.errorCodes.push("input[name=position]");
                    $("div#chi-tiet-mat-tien").find("#roadFrontageWidth").css("border-color", "red");
                    $("div#chi-tiet-mat-tien").find("#widthValue").css("border-color", "red");
                }
            }
        } else if (tmpPositionChck == 2) {
            // if (!checkStringNotNull($("div.trong-hem").find("#alleyWidth").val())) {
            //     isValid = false;
            //     detail.errorCodes.push("#alleyWidth");
            //     $("div.trong-hem").find("#alleyWidth").css("border-color", "red");
            //     $("div.trong-hem").find(".alleyWidth-error").html("<code>Độ rộng hẻm không hợp lệ</code>");
            // }
        }        

        if (!isValid) {          
            $("#update-listing-btn").attr("disabled", false);  
            showPropzyAlert("Vui lòng kiểm tra dữ liệu");
            if (typeof detail.errorCodes[0] != "undefined") {
                $("body, html").animate({
                    scrollTop: $(detail.errorCodes[0]).offset().top
                }, 600);
            }
            return false;
        }

        // Reset
        detail.processPhotos = [];
        detail.processGCNPhotos = [];

        // Reset photos
        detail.processPhotos = [];
        detail.processGCNPhotos = [];

        if (detail.uploadedImages.length > 0) {
            $.map(detail.uploadedImages, function(item, i) {
                detail.processPhotos.push({
                    "link": item,
                    "isPrivate": false,
                    "source": detail.uploadedImagesSource[i],
                    "caption": (detail.uploadedImagesCaption[i] == "null") ? "" : detail.uploadedImagesCaption[i]
                });
            });
        }
        if (detail.uploadedGCNImages.length > 0) {
            $.map(detail.uploadedGCNImages, function(item, i) {
                detail.processGCNPhotos.push({
                    "link": item,
                    "isPrivate": false,
                    "source": detail.uploadedGCNImagesSource[i],
                    "caption": (detail.uploadedGCNImagesCaption[i] == "null") ? "" : detail.uploadedGCNImagesCaption[i]
                });
            });
        }

        // If exists photo
        if (detail.uploadNewImages.length > 0) {
            requestCallback.initCallback(1 + detail.uploadNewImages.length + detail.uploadNewGCNImages.length);
            detail.processPhotoLSO('edit');
        } else if (detail.uploadNewGCNImages.length > 0) {
            requestCallback.initCallback(1 + detail.uploadNewGCNImages.length);
            detail.processGCNPhoto('edit');
        } else {
            requestCallback.initCallback(1);
            detail.processUpdateListing();
        }
    },
    // Add [DETAIL]
    addRealListing: function() {
        detail.isEditFlag = true;
        // is not edit
        var chckEditFlag = "add";

        // Reset photos
        detail.processPhotos = [];
        detail.processGCNPhotos = [];

        var profileValid = profile.validateForm();

        if (profileValid) {
            var isValid = true;

            isValid = detail.validateForm();

            if (detail.uploadedImages.length > 0) {
                $.map(detail.uploadedImages, function(item, i) {
                    detail.processPhotos.push({
                        "link": item,
                        "isPrivate": false,
                        "source": detail.uploadedImagesSource[i],
                        "caption": (detail.uploadedImagesCaption[i] == "null") ? "" : detail.uploadedImagesCaption[i]
                    });
                });
            }
            if (detail.uploadedGCNImages.length > 0) {
                $.map(detail.uploadedGCNImages, function(item) {
                    detail.processGCNPhotos.push({
                        "link": item,
                        "isPrivate": false,
                        "source": detail.uploadedGCNImagesSource[i],
                        "caption": (detail.uploadedGCNImagesCaption[i] == "null") ? "" : detail.uploadedGCNImagesCaption[i]
                    });
                });
            }

            if (isValid) {
                // If exists photo
                if (detail.uploadNewImages.length > 0) {
                    requestCallback.initCallback(1 + detail.uploadNewImages.length + detail.uploadNewGCNImages.length);
                    detail.processPhotoLSO(chckEditFlag);
                } else if (detail.uploadNewGCNImages.length > 0) {
                    requestCallback.initCallback(1 + detail.uploadNewGCNImages.length);
                    detail.processGCNPhoto(chckEditFlag);
                } else {
                    requestCallback.initCallback(1);
                    detail.processRealListing();
                }
            } else {
                $("#create-listing-btn").attr("disabled", false);
                detail.isEditFlag = false;
                hidePropzyLoading();
                // $(".dashboard").fadeIn('slow');
                // showPropzyAlert("Xin vui lòng kiểm tra lại dữ liệu");
                if (typeof detail.errorCodes[0] != "undefined") {
                    $("body, html").animate({
                        scrollTop: $(detail.errorCodes[0]).offset().top
                    }, 600);
                }
            }
        } else {
            $("#create-listing-btn").attr("disabled", false);
        }
    },
    // Stop [DETAIL]
    stopRealListing: function() {
        $("#lsoStopNote").val(($("#hiddenDiyStopReason").val()) ? $("#hiddenDiyStopReason").val() : "");
        $("#stop-listing-modal").modal("show");
    },
    // Từ chối [DETAIL]
    rejectRealListing: function() {
        var constraints = {
            lsoId: {
                presence: true,
                numericality: {
                    onlyInteger: true,
                    greaterThan: 0
                }
            },
            reasonId: {
                presence: true,
                numericality: {
                    onlyInteger: true,
                    greaterThan: 0
                }
            }
        };

        var rejectReasonId = parseInt($("input[name=reject-by]:checked").val());
        var rejectContent = null;
        if (rejectReasonId == 84) {
            rejectContent = checkStringNotNull($("#reject-reason-input").val()) ? $("#reject-reason-input").val() : null
        } else {
            rejectContent = null;
        }


        var requestData = {
            lsoId: parseInt($("#hiddenId").val()),
            reasonId: rejectReasonId,
            content: rejectContent
        };
        var errors = validate(requestData, constraints);
        console.log(errors);

        if (typeof errors == "undefined") {
            showPropzyLoading();
            $.ajax({
                url: "/lso/reject-listing",
                type: "POST",
                data: JSON.stringify(requestData)
            }).done(function(response) {
                hidePropzyLoading();
                if (response.result) {
                    showPropzyAlert("Thao tác thành công. Đang tải dữ liệu mới..");
                    //$("#stop-listing-modal").modal("hide");
                    // Logic display buttons
                    // detail.stopFlg = false;
                    // detail.soldFlg = detail.rentFlg = true;
                    // detail.displayButtons();
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                } else {
                    showPropzyAlert(response.message);
                }
            });
        } else {
            showPropzyAlert("Xin vui lòng chọn lý do");
        }
    },
    stopListing: function() {
        // validate data
        var constraints = {
            lsoId: {
                presence: true,
                numericality: {
                    onlyInteger: true,
                    greaterThan: 0,
                }
            },
            reason: {
                presence: true
            }
        };

        var requestData = {
            lsoId: parseInt($("#hiddenId").val()),
            reason: $("#lsoStopNote").val()
        };

        var errors = validate(requestData, constraints);
        console.log(errors);

        if (typeof errors == "undefined") {
            showPropzyLoading();
            $.ajax({
                url: "/lso/stop-listing",
                type: "POST",
                data: JSON.stringify(requestData)
            }).done(function(response) {
                hidePropzyLoading();
                showPropzyAlert("Thao tác thành công. Đang tải dữ liệu mới..");
                if (response.result) {
                    //$("#stop-listing-modal").modal("hide");
                    // Logic display buttons
                    // detail.stopFlg = false;
                    // detail.soldFlg = detail.rentFlg = true;
                    // detail.displayButtons();
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                }
            });
        } else {
            showPropzyAlert("Xin vui lòng kiểm tra lại dữ liệu");
        }
    },
    // Sold [DETAIL]
    soldRealListing: function() {
        if ($.isNumeric($("#hiddenDiyStatusId").val())) {
            // Bán
            if ($("#hiddenDiyStatusId").val() == 8) {
                $('.sold-by').each(function() {
                    if ($(this).val() == "owner") {
                        $(this).prop("checked", true);
                    }
                });
                detail.displaySoldOption("owner");
                $(".sold-add-opts").show();
            }
        }
        $("#sold-listing-modal").modal("show");
    },
    // Sold Options [DETAIL]
    displaySoldOption: function(soldBy) {
        // Danh sách sold options
        var options = [{
                source: "propzy",
                values: []
            },
            {
                source: "owner",
                values: [{
                        id: 8,
                        text: 'Khách hàng tự đến'
                    },
                    {
                        id: 9,
                        text: 'Khách hàng là người quen'
                    },
                    {
                        id: 10,
                        text: 'Khách hàng là môi giới'
                    }
                ]
            },
        ];

        var soldOpts = $.grep(options, function(item) {
            return item.source == soldBy;
        })[0].values;

        var hiddenLsoReasons = [];
        if ($("#hiddenLsoReasons").val()) {
            hiddenLsoReasons = $("#hiddenLsoReasons").val().split(",");
        }

        var soldOptTxt = $(".sold-options-by");
        soldOptTxt.empty();
        if (typeof soldOpts !== "undefined") {
            $.map(soldOpts, function(item) {
                if (hiddenLsoReasons.indexOf(item.id.toString()) != -1) {
                    soldOptTxt.append('<div class="checkbox"><label><input type="checkbox" name="sold-by-option" class="sold-by-option" value="' + item.id + '" checked> ' + item.text + '</label></div>');
                } else {
                    soldOptTxt.append('<div class="checkbox"><label><input type="checkbox" name="sold-by-option" class="sold-by-option" value="' + item.id + '"> ' + item.text + '</label></div>');
                }
            });
        }
    },
    // Sold
    soldListing: function() {
        // Validate data
        var constraints = {
            lsoId: {
                presence: true,
                numericality: {
                    onlyInteger: true,
                    greaterThan: 0,
                }
            },
            source: {
                presence: true,
            }
        };

        var reasonIds = $(".sold-by-option:checkbox:checked").map(function() {
            return $(this).val();
        }).get().toString();

        // type = 1 or 2 , 1 Ban, 2 Thue
        var requestData = {
            lsoId: parseInt($("#hiddenId").val()),
            type: 1,
            reasonIds: (reasonIds) ? reasonIds : "",
            source: $(".sold-by:checked").val(),
            soldDate: dateStringToTimestamp($("#sold-date").val()),
            price: $.isNumeric($("#sold-price").autoNumeric("get")) ? $("#sold-price").autoNumeric("get") : null,
            fromDate: null,
            toDate: null
        };

        var errors = validate(requestData, constraints);

        if (typeof errors == "undefined") {
            // Process sold listing
            showPropzyLoading();
            $.ajax({
                url: "/lso/soldRentListing",
                type: "POST",
                data: JSON.stringify(requestData)
            }).done(function(response) {
                hidePropzyLoading();
                if (response.result) {
                    showPropzyAlert("Thao tác thành công. Đang tải dữ liệu mới..");
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                    // $("#sold-listing-modal").modal("hide");
                    // detail.handleStatus(17);
                } else {
                    showPropzyAlert(response.message);
                }
            });
        } else {
            // Show propzy alert
            console.log(errors);
            // var errorTxt = "";
            // $.each(errors, function(index, value) {
            //     errorTxt = errorTxt + value + "<br>";
            // });
            showPropzyAlert("Vui lòng chọn nguồn");
        }
    },
    // Rent [DETAIL]
    rentRealListing: function() {
        if ($.isNumeric($("#hiddenDiyStatusId").val())) {
            // Thuê
            if ($("#hiddenDiyStatusId").val() == 7) {
                $('.rent-by').each(function() {
                    if ($(this).val() == "owner") {
                        $(this).prop("checked", true);
                    }
                });
                detail.displayRentOption("owner");
            }
        }
        $("#rent-listing-modal").modal("show");
    },

    displayRentOption: function(rentBy) {
        var options = [{
            source: "propzy",
            values: []
        }, {
            source: "owner",
            values: [{
                    id: 8,
                    text: 'Khách hàng tự đến'
                },
                {
                    id: 9,
                    text: 'Khách hàng là người quen'
                },
                {
                    id: 10,
                    text: 'Khách hàng là môi giới'
                }
            ]
        }];

        var rentOpts = $.grep(options, function(item) {
            return item.source == rentBy;
        })[0].values;

        var hiddenLsoReasons = [];
        if ($("#hiddenLsoReasons").val()) {
            hiddenLsoReasons = $("#hiddenLsoReasons").val().split(",");
        }

        var rentOptTxt = $(".rent-options-by");
        rentOptTxt.empty();
        if (typeof rentOpts[0] !== "undefined") {
            $.map(rentOpts, function(item) {
                if (hiddenLsoReasons.indexOf(item.id.toString()) != -1) {
                    rentOptTxt.append('<div class="checkbox"><label><input type="checkbox" name="rent-by-option" class="rent-by-option" value="' + item.id + '" checked> ' + item.text + '</label></div>');
                } else {
                    rentOptTxt.append('<div class="checkbox"><label><input type="checkbox" name="rent-by-option" class="rent-by-option" value="' + item.id + '"> ' + item.text + '</label></div>');
                }
            });
        }
    },
    resendInfo: function() {
        showPropzyLoading();
        // Gửi lại info
        $.ajax({
            url: "/lso/resendAccountInfo",
            type: "POST",
            data: {
                "ownerId": parseInt($("#hiddenOwnerId").val())
            }
        }).done(function(response) {
            hidePropzyLoading();
            showPropzyAlert(response.message);
        });
    },
    rentListing: function() {
        // Validate data
        var constraints = {
            lsoId: {
                presence: true,
                numericality: {
                    onlyInteger: true,
                    greaterThan: 0,
                },
            },
            source: {
                presence: true
            },
            // fromDate: {
            //     numericality: {
            //         onlyInteger: true,
            //         greaterThan: dateStringToTimestamp($("#sold-from").val()),
            //     },
            // },
            // toDate: {
            //     numericality: {
            //         onlyInteger: true,
            //         greaterThan: dateStringToTimestamp($("#sold-to").val()),
            //     },
            // }
        };

        var reasonIds = [];
        reasonIds = $(".rent-by-option:checkbox:checked").map(function() {
            return $(this).val();
        }).get().toString();

        // type = 1 or 2 , 1 Ban, 2 Thue
        var requestData = {
            lsoId: parseInt($("#hiddenId").val()),
            type: 2,
            reasonIds: (reasonIds) ? reasonIds : null,
            source: $(".rent-by:checked").val(),
            fromDate: $("#rent-from").val() ? dateStringToTimestamp($("#rent-from").val()) : null,
            toDate: $("#rent-to").val() ? dateStringToTimestamp($("#rent-to").val()) : null,
            price: $.isNumeric($("#rent-price").autoNumeric("get")) ? $("#rent-price").autoNumeric("get") : null,
            soldDate: null
        };

        var errors = validate(requestData, constraints);

        if (typeof errors == "undefined") {
            var isValidDate = true;
            if (($("#rent-from").val()) && ($("#rent-to").val())) {
                var rentFromTimestamp = dateStringToTimestamp($("#rent-from").val());
                var rentToTimestamp = dateStringToTimestamp($("#rent-to").val());

                if (rentFromTimestamp > rentToTimestamp) {
                    isValidDate = false;
                    showPropzyAlert("Xin vui lòng chọn ngày hợp lệ !");
                }
            }

            if (isValidDate) {
                // Process sold listing
                showPropzyLoading();
                $.ajax({
                    url: "/lso/soldRentListing",
                    type: "POST",
                    data: JSON.stringify(requestData)
                }).done(function(response) {
                    hidePropzyLoading();
                    if (response.result) {
                        showPropzyAlert("Thao tác thành công. Đang tải dữ liệu mới..");
                        // $("#rent-listing-modal").modal("hide");
                        // detail.handleStatus(18);
                        setTimeout(function() {
                            window.location.reload();
                        }, 1000);
                    } else {
                        showPropzyAlert(response.message);
                    }
                });
            }
        } else {
            // Show propzy alert
            console.log("[Error] Cho thuê LSO: " + errors);
            var errorTxt = "";
            $.each(errors, function(index, value) {
                errorTxt = "Xin kiểm tra lại nguồn";
            });
            showPropzyAlert(errorTxt);
        }
    },
    // Gửi request
    requestRealListing: function() {
        $("#lsoRequestNote").val("");
        $("#request-listing-modal").modal("show");
    },
    requestListing: function() {
        // Validate data
        var constraints = {
            lsoId: {
                presence: true,
                numericality: {
                    onlyInteger: true,
                    greaterThan: 0,
                },
            },
            content: {
                presence: true
            },
        };

        // type = 1 or 2 , 1 Ban, 2 Thue
        var requestData = {
            lsoId: parseInt($("#hiddenId").val()),
            content: ($(".send-request-opt:radio:checked").val() == "other") ? $("#lsoRequestNote").val() : "Chủ nhà yêu cầu mở bán lại tin đăng có mã là #" + $("#hiddenRlistingId").val(),
        };

        var errors = validate(requestData, constraints);

        if (typeof errors == "undefined") {
            // Process sold listing
            showPropzyLoading();
            $.ajax({
                url: "/lso/sendRequestLs",
                type: "POST",
                data: JSON.stringify(requestData)
            }).done(function(response) {
                hidePropzyLoading();
                if (response.result) {
                    $("#request-listing-modal").modal("hide");
                }
                showPropzyAlert(response.message);
            });
        } else {
            // Show propzy alert
            console.log("[Error] Gửi Request LSO: " + errors);
            var errorTxt = "";
            $.each(errors, function(index, value) {
                if (index == "content") {
                    errorTxt = "Xin kiểm tra dữ liệu ghi chú";
                }
            });
            showPropzyAlert(errorTxt);
        }
    },
    processPhotoLSO: function(flag) {
        var count = 0;
        $.map(detail.uploadNewImages, function(item) {
            detail.uploadSinglePhoto(item, function(response) {
                requestCallback.addCallbackToQueue();
                if (typeof response.data != "undefined") {
                    detail.processPhotos.push({
                        "link": response.data.file_name,
                        "isPrivate": false,
                        "source": "lso",
                        "caption": ""
                    });
                }
                count++;
                if (count == detail.uploadNewImages.length) {
                    if (detail.uploadNewGCNImages.length > 0) {
                        detail.processGCNPhoto(flag);
                    } else {
                        if (flag == 'edit') {
                            detail.processUpdateListing();
                        } else {
                            detail.processRealListing();
                        }
                    }
                }
            });
        });
    },
    uploadSinglePhoto: function(item, callback) {
        var formData = new FormData();
        formData.append('file', item);
        formData.append('type', 'listing');
        $.ajax({
            url: $("#hiddenBaseApi").val() + "upload?access_token=" + $("#hiddenUserToken").val(),
            data: formData,
            type: "POST",
            contentType: false,
            cache: false,
            processData: false,
            success: function(response) {
                callback(response);
            }
        });
    },
    processGCNPhoto: function(flag) {
        var count = 0;
        $.map(detail.uploadNewGCNImages, function(item) {
            detail.uploadSingleGCNPhoto(item, function(response) {
                requestCallback.addCallbackToQueue();
                if (typeof response.data != "undefined") {
                    detail.processGCNPhotos.push({
                        "link": response.data.file_name,
                        "isPrivate": false,
                        "source": "lso",
                        "caption": ""
                    });
                }
                count++;
                if (count == detail.uploadNewGCNImages.length) {
                    if (flag == 'edit') {
                        detail.processUpdateListing();
                    } else {
                        detail.processRealListing();
                    }
                }
            });
        });
    },
    uploadSingleGCNPhoto: function(item, callback) {
        var formData = new FormData();
        formData.append('file', item);
        formData.append('type', 'useright');
        $.ajax({
            url: $("#hiddenBaseApi").val() + "upload?access_token=" + $("#hiddenUserToken").val(),
            data: formData,
            type: "POST",
            contentType: false,
            cache: false,
            processData: false,
            success: function(response) {
                callback(response);
            }
        });
    },
    // Update owner [DETAIL]
    processUpdateOwner: function() {
        // Tính năng mới - 17/05/2017

        // Clear phone-error
        $(".phone-error").html("");

        // Validate phone
        var isValidate = true;

        if (!$("#phone").val() || !isValidPhone($("#phone").val())) {
            isValidate = false;
            $(".phone-error").html("<code>SĐT không hợp lệ</code>");
        }

        if (isValidate) {
            showPropzyLoading();
            var postData = {
                "ownerId": $("#hiddenOwnerId").val(),
                "name": $("#name").val(),
                "phone": $("#phone").val(),
                "email": $("#email").val(),
                "sourceId": parseInt($("#sourceTypes").val())
            }

            $.ajax({
                url: "/lso/update-owner",
                type: "POST",
                data: JSON.stringify(postData),
                success: function(response) {
                    hidePropzyLoading();
                    showPropzyAlert(response.message);
                }
            });
        } else {
            showPropzyAlert("Xin vui lòng kiểm tra lại dữ liệu");
        }
    },
    // Process update [DETAIL]
    processUpdateListing: function() {
        // Tính năng mới - 17/05/2017
        $("#phone-error").html("");
        if (!$("#phone").val()) {
            $("#phone-error").html("<code>Số điện thoại không hợp lệ. Chỉ cho phép nhập số</code>");
            showPropzyAlert("Xin vui lòng nhập số điện thoại")
            return false;
        }

        var lsoListingStatusId = null;
        if ($.isNumeric($("#subStatusId").val())) {
            lsoListingStatusId = parseInt($("#subStatusId").val());
        } else if ($.isNumeric($("#statusId").val())) {
            lsoListingStatusId = parseInt($("#statusId").val());
        }

        // Khoảng cách đến mặt tiền đường
        var roadFrontageDistanceFrom = 0;
        var roadFrontageDistanceTo = 0;

        if ($("#roadFrontage").val()) {
            var roadFrontage = $("#roadFrontage").val().split("-");
            roadFrontageDistanceFrom = parseInt(roadFrontage[0]);
            roadFrontageDistanceTo = parseInt(roadFrontage[1]);
        }

        // Địa chỉ
        var address = "";
        // Số nhà
        address = address + ($("#houseNumber").val()) ? $("#houseNumber").val() : " ";
        // Đường
        if ($.isNumeric($("#streetId").val())) {
            var tmpAddress = $.grep(detail.streetData, function(each) {
                return each.id == parseInt($("#streetId").val());
            });
            address = address + " " + tmpAddress[0].text + ", ";
        }
        // Phường
        if ($.isNumeric($("#wardId").val())) {
            var tmpWard = $.grep(detail.wardData, function(each) {
                return each.id == parseInt($("#wardId").val());
            });
            address = address + tmpWard[0].text + ", ";
        }
        // Quận
        if ($.isNumeric($("#districtId").val())) {
            var tmpDistrict = $.grep(detail.districtData, function(each) {
                return each.id == parseInt($("#districtId").val());
            });
            address = address + tmpDistrict[0].text + ", ";
        }
        // TP. Hồ Chí Minh
        address = address + "TP. Hồ Chí Minh";

        // Hình ảnh
        // upload images

        // Loại công trình
        var constructions = [
            // Khung
            {
                "id": {
                    "houseTypeId": parseInt($("#houseTypes").val()),
                    "constructionTypeId": parseInt($("input[name=constructionTypeId]:checked").val()),
                    "materialId": null
                },
                "createdDate": null
            },
        ];

        // Đặc điểm tốt
        var selectedAdvantages = $("input[name=advantages]:checked").map(function() {
            return {
                "id": {
                    "advantageId": $(this).val()
                }
            };
        }).get();

        // Đặc điểm xấu
        var selectedDisadvantages = $("input[name=disadvantages]:checked").map(function() {
            return {
                "id": {
                    "disAdvantageId": $(this).val()
                }
            };
        }).get();


        // Chính diện
        var selectedPos = $("input[name=position]:checked").val();
        // Mặt tiền
        var position = [];
        if (selectedPos == 1) {
            position = {
                alleyWidth: $("div.mat-tien").find("#alleyWidth").val() ? Number($("div.mat-tien").find("#alleyWidth").val()) : null,
                widthFrontWay: $("div.mat-tien").find("#alleyWidth").val() ? Number($("div.mat-tien").find("#alleyWidth").val()) : null,
                haveBeSide: ($("#haveBeSide-facade:checkbox:checked").val()) ? true : false,
                position: 1,
                roadFrontageWidth: ($("#haveBeSide-facade:checkbox:checked").val()) ? Number($("div#chi-tiet-mat-tien").find("#roadFrontageWidth").val()) : null,
                widthValue: ($("#haveBeSide-facade:checkbox:checked").val()) ? Number($("div#chi-tiet-mat-tien").find("#widthValue").val()) : null
            };
        }
        // Trong hẻm
        else if (selectedPos == 2) {     
            position = {
                alleyWidth: $("div.trong-hem").find("#alleyWidth").val() ? Number($("div.trong-hem").find("#alleyWidth").val()) : null,
                widthFrontWay: $("div.trong-hem").find("#widthFrontWay").val() ? Number($("div.trong-hem").find("#widthFrontWay").val()) : null,
                haveBeSide: ($("#haveBeSide-alley:checkbox:checked").val()) ? true : false,
                position: 2,
                roadFrontageWidth: null,
                widthValue: ($("#haveBeSide-alley:checkbox:checked").val()) ? Number($("div#chi-tiet-hem").find("#widthValue").val()) : null
            };
        }

        var postData = {
            "id": parseInt($("#hiddenId").val()),
            "ownerId": parseInt($("#hiddenOwnerId").val()),
            "address": address,
            "bathRooms": $("#bathRooms").val(),
            "bedRooms": $("#bedRooms").val(),
            "cityId": parseInt($("#cityId").val()),
            "commissionText": $("#commissionText").val(),
            "depositText": $("#depositText").autoNumeric("get"),
            "districtId": $.isNumeric($("#districtId").val()) ? parseInt($("#districtId").val()) : "",
            "floorSize": $("#floorSize").val(),
            "houseNumber": $("#houseNumber").val(),
            "isGuaranteed": ($("#isGuaranteed:checkbox:checked").val() == 1) ? true : false,
            "isVAT": $("#isVAT").val(),
            "latitude": $("#latitude").val(),
            "listingTypeId": parseInt($("#propertyTrans").val()),
            "longitude": $("#longitude").val(),
            "lotSize": $("#lotSize").val(),
            "minContractDeadline": $("#minContractDeadline").val(),
            "minPrice": $("#minPrice").autoNumeric("get"),
            "moveInDate": $("#moveInDate").val(),
            // "noteForLs": CKEDITOR.instances.noteForLs.getData(),
            "noteForLs": $("#noteForLs").val(),
            // "noteFromLsCall": CKEDITOR.instances.noteFromLsCall.getData(),
            "noteFromLsCall": $("#noteFromLsCall").val(),
            "numberFloor": $("#numberFloor").val(),
            "photo": JSON.stringify(detail.processPhotos),
            "photoGcn": JSON.stringify(detail.processGCNPhotos),
            "price": $("#price").autoNumeric("get"),
            // Add 2 more fields
            // "newPrice": $("#price-diy").autoNumeric("get"),
            // "diyRequestEdit": $("#diyRequestEdit").val(),
            "suggestToDiy": $("#suggestToDiy").val(),
            "isDoneForDiy": ($("#isDoneForDiy:checkbox:checked").val() == 1) ? true : false,
            // Done add
            "propertyTypeId": parseInt($("#propertyTypes").val()),
            "roadFrontageDistanceFrom": roadFrontageDistanceFrom,
            "roadFrontageDistanceTo": roadFrontageDistanceTo,
            "sizeLength": $("#sizeLength").val(),
            "sizeWidth": $("#sizeWidth").val(),
            "streetId": $.isNumeric($("#streetId").val()) ? parseInt($("#streetId").val()) : "",
            "statusId": lsoListingStatusId,
            // "createdDate": null,
            // "updatedDate": null,
            "useRightTypeId": parseInt($("#rightTypes").val()),
            "wardId": $.isNumeric($("#wardId").val()) ? parseInt($("#wardId").val()) : "",
            "position": position,
            "constructions": constructions,
            "advantages": selectedAdvantages,
            "disadvantages": selectedDisadvantages,
            // Tính năng mới - 17/05/2017
            "assignedTo": parseInt($("#assignedTo").val()),
            // Nguồn tin đăng
            "sourceId": $.isNumeric($("#sourceTypesListing").val()) ? parseInt($("#sourceTypesListing").val()) : null,
            // Đơn giá mặt tiền đường
            "roadPrice": $("#priceStreetFrontage").autoNumeric('get') ? $("#priceStreetFrontage").autoNumeric('get') : null,
            // Khấu hao
            "oldHouse": $("#depreciation").autoNumeric('get') ? $("#depreciation").autoNumeric('get') : null,
        };

        if (!$.isNumeric($("#hiddenRlistingId").val())) {
            postData.diyStatusId = parseInt($("#rlistingStatusId").val());
        }

        $.ajax({
            url: "/lso/update-listing",
            type: "POST",
            data: JSON.stringify(postData),
            success: function(response) {
                $("#update-listing-btn").attr("disabled", false);
                requestCallback.addCallbackToQueue();
                showPropzyAlert(response.message);                
                setTimeout(function() {
                    window.location.reload();
                }, 1000);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $("#update-listing-btn").attr("disabled", false);
                requestCallback.addCallbackToQueue();
                showPropzyAlert("Status: " + textStatus);
                alert("Error: " + errorThrown);
            }
        });
    },
    // Process create [DETAIL]
    processRealListing: function() {
        var lsoListingStatusId = null;
        if ($.isNumeric($("#subStatusId").val())) {
            lsoListingStatusId = parseInt($("#subStatusId").val());
        } else if ($.isNumeric($("#statusId").val())) {
            lsoListingStatusId = parseInt($("#statusId").val());
        }

        // Khoảng cách đến mặt tiền đường
        var roadFrontageDistanceFrom = 0;
        var roadFrontageDistanceTo = 0;

        if ($("#roadFrontage").val()) {
            var roadFrontage = $("#roadFrontage").val().split("-");
            roadFrontageDistanceFrom = parseInt(roadFrontage[0]);
            roadFrontageDistanceTo = parseInt(roadFrontage[1]);
        }

        // Địa chỉ
        // Địa chỉ
        var address = "";
        // Số nhà
        address = address + ($("#houseNumber").val()) ? $("#houseNumber").val() : " ";
        // Đường
        if ($("#streetId").val()) {
            var tmpAddress = $.grep(detail.streetData, function(each) {
                return each.id == parseInt($("#streetId").val());
            });
            address = address + " " + tmpAddress[0].text + ", ";
        }
        // Phường
        if ($("#wardId").val()) {
            var tmpWard = $.grep(detail.wardData, function(each) {
                return each.id == parseInt($("#wardId").val());
            });
            address = address + tmpWard[0].text + ", ";
        }
        // Quận
        if ($("#districtId").val()) {
            var tmpDistrict = $.grep(detail.districtData, function(each) {
                return each.id == parseInt($("#districtId").val());
            });
            address = address + tmpDistrict[0].text + ", ";
        }
        // TP. Hồ Chí Minh
        address = address + "TP. Hồ Chí Minh";

        // Hình ảnh
        // upload images

        // Loại công trình
        var constructions = [
            // Khung
            {
                "id": {
                    "houseTypeId": parseInt($("#houseTypes").val()),
                    "constructionTypeId": parseInt($("input[name=constructionTypeId]:checked").val()),
                    "materialId": null
                },
                "createdDate": null
            },
        ];

        // Đặc điểm tốt
        var selectedAdvantages = $("input[name=advantages]:checked").map(function() {
            return {
                "id": {
                    "advantageId": $(this).val()
                }
            };
        }).get();

        // Đặc điểm xấu
        var selectedDisadvantages = $("input[name=disadvantages]:checked").map(function() {
            return {
                "id": {
                    "disAdvantageId": $(this).val()
                }
            };
        }).get();


        // Chính diện
        var selectedPos = $("input[name=position]:checked").val();
        // Mặt tiền
        var position = [];
        if (selectedPos == 1) {
            position = {
                alleyWidth: Number($("div.mat-tien").find("#alleyWidth").val()),
                widthFrontWay: Number($("div.mat-tien").find("#alleyWidth").val()),
                haveBeSide: ($("#haveBeSide-facade:checkbox:checked").val()) ? true : false,
                position: 1,
                roadFrontageWidth: ($("#haveBeSide-facade:checkbox:checked").val()) ? Number($("div#chi-tiet-mat-tien").find("#roadFrontageWidth").val()) : 0,
                widthValue: ($("#haveBeSide-facade:checkbox:checked").val()) ? Number($("div#chi-tiet-mat-tien").find("#widthValue").val()) : 0
            };
        }
        // Trong hẻm
        else if (selectedPos == 2) {
            position = {
                alleyWidth: Number($("div.trong-hem").find("#alleyWidth").val()),
                widthFrontWay: Number($("div.trong-hem").find("#widthFrontWay").val()),
                haveBeSide: ($("#haveBeSide-alley:checkbox:checked").val()) ? true : false,
                position: 2,
                roadFrontageWidth: null,
                widthValue: ($("#haveBeSide-alley:checkbox:checked").val()) ? Number($("div#chi-tiet-hem").find("#widthValue").val()) : 0
            };
        }

        var postData = {
            "id": parseInt($("#hiddenId").val()),
            "ownerId": parseInt($("#hiddenOwnerId").val()),
            "address": address,
            "bathRooms": $("#bathRooms").val(),
            "bedRooms": $("#bedRooms").val(),
            "cityId": parseInt($("#cityId").val()),
            "commissionText": $("#commissionText").val(),
            "depositText": $("#depositText").autoNumeric("get"),
            "districtId": parseInt($("#districtId").val()),
            "floorSize": $("#floorSize").val(),
            "houseNumber": $("#houseNumber").val(),
            "isGuaranteed": ($("#isGuaranteed:checkbox:checked").val() == 1) ? true : false,
            "isVAT": $("#isVAT").val(),
            "latitude": $("#latitude").val(),
            "listingTypeId": parseInt($("#propertyTrans").val()),
            "longitude": $("#longitude").val(),
            "lotSize": $("#lotSize").val(),
            "minContractDeadline": $("#minContractDeadline").val(),
            "minPrice": $("#minPrice").autoNumeric("get"),
            "moveInDate": $("#moveInDate").val(),
            // "noteForLs": CKEDITOR.instances.noteForLs.getData(),
            "noteForLs": $("#noteForLs").val(),
            // "noteFromLsCall": CKEDITOR.instances.noteFromLsCall.getData(),
            "noteFromLsCall": $("#noteFromLsCall").val(),
            "numberFloor": $("#numberFloor").val(),
            "photo": JSON.stringify(detail.processPhotos),
            "photoGcn": JSON.stringify(detail.processGCNPhotos),
            "price": $("#price").autoNumeric("get"),
            "newPrice": $("#price-diy").val(),
            "diyRequestEdit": $("#diyRequestEdit").val(),
            "propertyTypeId": parseInt($("#propertyTypes").val()),
            "roadFrontageDistanceFrom": roadFrontageDistanceFrom,
            "roadFrontageDistanceTo": roadFrontageDistanceTo,
            "sizeLength": $("#sizeLength").val(),
            "sizeWidth": $("#sizeWidth").val(),
            "streetId": ($.isNumeric($("#streetId").val())) ? parseInt($("#streetId").val()) : "",
            "statusId": lsoListingStatusId,
            // "createdDate": null,
            // "updatedDate": null,
            "useRightTypeId": parseInt($("#rightTypes").val()),
            "wardId": ($.isNumeric($("#wardId").val())) ? parseInt($("#wardId").val()) : "",
            "position": position,
            "constructions": constructions,
            "advantages": selectedAdvantages,
            "disadvantages": selectedDisadvantages,
            // Tính năng mới - 17/05/2017
            "assignedTo": parseInt($("#assignedTo").val()),
            // Add 2 more fields
            "suggestToDiy": $("#suggestToDiy").val(),
            "isDoneForDiy": ($("#isDoneForDiy:checkbox:checked").val() == 1) ? true : false,
            // Nguồn tin đăng
            "sourceId": $.isNumeric($("#sourceTypesListing").val()) ? parseInt($("#sourceTypesListing").val()) : null,
            // Đơn giá mặt tiền đường
            "roadPrice": $("#priceStreetFrontage").autoNumeric('get') ? $("#priceStreetFrontage").autoNumeric('get') : null,
            // Khấu hao
            "oldHouse": $("#depreciation").autoNumeric('get') ? $("#depreciation").autoNumeric('get') : null,
        };

        if (!$.isNumeric($("#hiddenRlistingId").val())) {
            postData.diyStatusId = parseInt($("#rlistingStatusId").val());
        }


        // console.log(postData);
        $.ajax({
            url: "/lso/create-real-listing",
            type: "POST",
            data: JSON.stringify(postData),
            success: function(response) {
                $("#create-listing-btn").attr("disabled", false);
                requestCallback.addCallbackToQueue();
                if (response.result) {
                    //$("#create-listing-btn").prop("disabled", true);
                    // Khi [Đăng tin đầy đủ] thành công
                    // Cập nhật status thành [Chuyển đổi LS]
                    showPropzyAlert("Thao tác thành công ! Xin vui lòng chờ để dữ liệu cập nhật..");
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                } else {
                    showPropzyAlert(response.message);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $("#create-listing-btn").attr("disabled", false);
                // requestCallback.addCallbackToQueue();
                showPropzyAlert("Status: " + textStatus);
                alert("Error: " + errorThrown);
            }
        });
    },
    sendDIY: function() {
        showPropzyLoading();
        $.ajax({
            url: "/lso/send-diy",
            data: {
                id: $("#hiddenId").val()
            },
            type: "GET",
            success: function(response) {
                hidePropzyLoading();

                if (response.result) {
                    $("#display-diy-note").html(response.message);
                    $("#diy-hidden-id").val(response.data.id);
                    $("#show-diy-modal").modal({
                        backdrop: false,
                        keyboard: false
                    });
                } else {
                    showPropzyAlert(response.message);
                }
            }
        });
    },
    unlock: function() {
        showPropzyLoading();
        $.ajax({
            url: "/lso/unlock",
            data: {
                id: $("#hiddenId").val()
            },
            type: "GET",
            success: function(response) {
                hidePropzyLoading();
                showPropzyAlert(response.message);
            }
        });
    },

    // COMMON FUNCTIONS
    // Show & Hide selector
    displayElements: function(element) {
        var elements = ["#chi-tiet-mat-tien", "#chi-tiet-hem", "#unlock-btn", "#lock-btn", "#diy-btn"];
        $.map(elements, function(item) {
            if (element == item) {
                $(item).show();
            } else {
                $(item).hide();
            }
        })
    },

    // Construct select2
    initSelect2Construct: function(data, selector, defaultSelector) {
        var materials = [];
        $.map(data, function(item) {
            materials.push({
                id: item.id,
                text: item.name
            });
        });
        $(selector).select2({
            data: materials
        }).select2('val', $(defaultSelector).val());
    },

    initFormField: function() {
        // Clear error codes
        detail.errorCodes = [];
        // 
        var errorSelectors = [
            {id: "#phone", error: ".phone-error"},
            {id: "#propertyTrans", error: ".propertyTrans-error"},
            {id: "#propertyTypes", error: ".propertyTypes-error"},
            {id: "#cityId", error: ".cityId-error"},
            {id: "#districtId", error: ".districtId-error"},
            {id: "#wardId", error: ".wardId-error"},
            {id: "#streetId", error: ".streetId-error"},
            {id: "#houseNumber", error: ".houseNumber-error"},
            {id: "#price", error: ".price-error"},
            {id: "#commissionText", error: ".commissionText-error"},
            {id: "#bedRooms", error: ".bedRooms-error"},
            {id: "#bathRooms", error: ".bathRooms-error"},
            {id: "#numberFloor", error: ".numberFloor-error"},
            {id: "#alleyWidth", error: ".alleyWidth-error"},
            {id: "#roadFrontageWidth", error: ""},
            {id: "#widthValue", error: ""},
            {id: "#widthFrontWay", error: ""},
            {id: "#rightTypes", error: "#rightTypes-error"},
            {id: "", error: ".image-list-error"},
            {id: "", error: ".gcn-image-list-error"},
            {id: "", error: ".advantages-error"},
            {id: "", error: ".disadvantages-error"},
            {id: "#depreciation", error: ".depreciation-error"},
            {id: "", error: ".houseTypes-error"},
            {id: "", error: ".construct-roof-error"},
            {id: "", error: ".construct-wall-error"},
            {id: "", error: ".construct-floor-error"},
            {id: "", error: ".construct-ceil-error"},
            {id: "#lotSize", error: ".lotSize-error"},
            {id: "#sizeLength", error: ".sizeLength-error"},
            {id: "#sizeWidth", error: ".sizeWidth-error"},
            {id: "#priceStreetFrontage", error: ".priceStreetFrontage-error"},
            {id: "#roadFrontage", error: ".roadFrontage-error"},
        ];

        $.each( errorSelectors, function(index, item) {
            $(item.id).css("border-color", "");
            $(item.error).html("");
        });

        $("div#chi-tiet-mat-tien").find("#roadFrontageWidth").css("border-color", "");
        $("div#chi-tiet-mat-tien").find("#widthValue").css("border-color", "");
        $(".widthValue-error").html("");
    },

    // VALIDATE [DETAIL]
    validateForm: function() {
        var isValid = true;
        detail.initFormField();
        // Số điện thoại
        var phone = $("#phone").val();
        if (!phone) {
            isValid = false;
            // Add to array
            detail.errorCodes.push("#phone");
            $("#phone").css("border-color", "red");
            $(".phone-error").html("<code>Số điện thoại không hợp lệ.  Chỉ cho phép nhập số</code>");
        } else if (!isValidPhone(phone)) {
            isValid = false;
            // Add to array
            detail.errorCodes.push("#phone");
            $("#phone").css("border-color", "red");
            $(".phone-error").html("<code>Số điện thoại không hợp lệ.  Chỉ cho phép nhập số</code>");
        }

        // Loại hình giao dịch
        var propertyTrans = $("#propertyTrans").val();
        if (!propertyTrans) {
            isValid = false;
            // Add to array
            detail.errorCodes.push("#propertyTrans");
            $("#propertyTrans").css("border-color", "red");
            $(".propertyTrans-error").html("<code>Loại hình giao dịch không hợp lệ</code>");
        }
        // Loại BĐS
        var propertyTypes = $("#propertyTypes").val();
        if (!propertyTypes) {
            isValid = false;
            // Add to array
            detail.errorCodes.push("#propertyTypes");
            $("#propertyTypes").css("border-color", "red");
            $(".propertyTypes-error").html("<code>Loại BĐS không hợp lệ</code>");
        }

        // Nhà riêng
        if (propertyTypes == 11) {
            // Địa chỉ tin đăng
            var cityId = $("#cityId").val();
            if (!cityId) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#cityId");
                $("#cityId").css("border-color", "red");
                $(".cityId-error").html("<code>Thành phố không hợp lệ</code>")
            }
            var districtId = $("#districtId").val();
            if (!districtId) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#districtId");
                $("#districtId").css("border-color", "red");
                $(".districtId-error").html("<code>Quận không hợp lệ</code>")
            }
            var wardId = $("#wardId").val();
            if (!wardId) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#wardId");
                $("#wardId").css("border-color", "red");
                $(".wardId-error").html("<code>Phường không hợp lệ</code>")
            }
            var streetId = $("#streetId").val();
            if (!streetId) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#streetId");
                $("#streetId").css("border-color", "red");
                $(".streetId-error").html("<code>Đường không hợp lệ</code>");
            }
            var houseNumber = $("#houseNumber").val();
            if (!houseNumber) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#houseNumber");
                $("#houseNumber").css("border-color", "red");
                $(".houseNumber-error").html("<code>Số nhà không hợp lệ</code>");
            }
            // Diện tích đất + Dài + Rộng
            if (!checkStringNotNull($("#lotSize").val()) || !$.isNumeric($("#lotSize").val())) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#lotSize");
                $("#lotSize").css("border-color", "red");
                $(".lotSize-error").html("<code>Diện tích không hợp lệ</code>");
            }
            // Dài
            if (!checkStringNotNull($("#sizeLength").val()) || !$.isNumeric($("#sizeLength").val())) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#sizeLength");
                $("#sizeLength").css("border-color", "red");
                $(".sizeLength-error").html("<code>Chiều dài không hợp lệ</code>");
            }
            // Rộng
            if (!checkStringNotNull($("#sizeWidth").val()) || !$.isNumeric($("#sizeWidth").val())) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#sizeWidth");
                $("#sizeWidth").css("border-color", "red");
                $(".sizeWidth-error").html("<code>Chiều rộng không hợp lệ</code>");
            }
            // Diện tích sử dụng
            if (!checkStringNotNull($("#floorSize").val()) || !$.isNumeric($("#floorSize").val())) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#floorSize");
                $("#floorSize").css("border-color", "red");
                $(".floorSize-error").html("<code>Diện tích sử dụng không hợp lệ</code>");
            }
            var rightType = $("#rightTypes").val();
            if (!$.isNumeric(rightType) && propertyTrans != 2) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#rightTypes");
                $("#rightTypes").css("border-color", "red");
                $(".rightTypes-error").html("<code>Giấy chủ quyền không hợp lệ</code>");
            }
            var price = $("#price").val();
            if (!price) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#price");
                $("#price").css("border-color", "red");
                $(".price-error").html("<code>Gía không hợp lệ</code>");
            }
            // Hoa hồng
            var commissionText = $("#commissionText").val();
            if (!commissionText) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#commissionText");
                $("#commissionText").css("border-color", "red");
                $(".commissionText-error").html("<code>Hoa hồng không hợp lệ</code>");
            }
            var propertyTypesId = $("#propertyTypes").val();
            // Phòng ngủ
            var bedRooms = $("#bedRooms").val();
            // Đất nền không check [Phòng ngủ]
            if (!isValidNumber(bedRooms) && propertyTypesId != 13) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#bedRooms");
                $("#bedRooms").css("border-color", "red");
                $(".bedRooms-error").html("<code>Phòng ngủ không hợp lệ</code>");
            }
            // Đất nền không check [WC]
            // WC
            var bathRooms = $("#bathRooms").val();
            if (!isValidNumber(bathRooms) && propertyTypesId != 13) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#bathRooms");
                $("#bathRooms").css("border-color", "red");
                $(".bathRooms-error").html("<code>WC  không hợp lệ</code>");
            }
            // Check so tang
            if (checkStringNotNull($("#numberFloor").val())) {
                if (!isValidNumber($("#numberFloor").val())) {
                    isValid = false;
                    // Add to array
                    detail.errorCodes.push("#numberFloor");
                    $("#numberFloor").css("border-color", "red");
                    $(".numberFloor-error").html("<code>Số tầng không hợp lệ</code>");
                }
            }
            // Chinh dien
            var tmpPositionChck = parseInt($("input[name=position]:checked").val());

            if (tmpPositionChck == 1) {
                if (!checkStringNotNull($("div.mat-tien").find("#alleyWidth").val())) {
                    isValid = false;
                    detail.errorCodes.push("#alleyWidth");
                    $("div.mat-tien").find("#alleyWidth").css("border-color", "red");
                    $("div.mat-tien").find(".alleyWidth-error").html("<code>Độ rộng mặt tiền không hợp lệ</code>");
                }
                if ($("#haveBeSide-facade:checkbox:checked").val()) {
                    var tmpRoadFrontageWidthChck = $("div#chi-tiet-mat-tien").find("#roadFrontageWidth").val();
                    var tmpWidthValueChck = $("div#chi-tiet-mat-tien").find("#widthValue").val();

                    if ((tmpRoadFrontageWidthChck > 0 && tmpWidthValueChck > 0) || (!checkStringNotNull(tmpRoadFrontageWidthChck) && !checkStringNotNull(tmpWidthValueChck))) {
                        isValid = false;
                        // Add to array
                        detail.errorCodes.push("input[name=position]");
                        $("div#chi-tiet-mat-tien").find("#roadFrontageWidth").css("border-color", "red");
                        $("div#chi-tiet-mat-tien").find("#widthValue").css("border-color", "red");
                    }
                }
            } else if (tmpPositionChck == 2) {
                if (!checkStringNotNull($("div.trong-hem").find("#alleyWidth").val())) {
                    isValid = false;
                    detail.errorCodes.push("#alleyWidth");
                    $("div.trong-hem").find("#alleyWidth").css("border-color", "red");
                    $("div.trong-hem").find(".alleyWidth-error").html("<code>Độ rộng hẻm không hợp lệ</code>");
                }
                if (!checkStringNotNull($("div.trong-hem").find("#widthFrontWay").val())) {
                    isValid = false;
                    detail.errorCodes.push("#widthFrontWay");
                    $("div.trong-hem").find("#widthFrontWay").css("border-color", "red");
                    $("div.trong-hem").find(".widthFrontWay-error").html("<code>Độ rộng mặt tiền không hợp lệ</code>");
                }
            }

            // Check do rong mat tien 
            if (checkStringNotNull($("#roadFrontageWidth").val())) {
                var tmpRoadFrontageWidth = $("#roadFrontageWidth").val();
                if (tmpRoadFrontageWidth.indexOf("-") != -1) {
                    isValid = false;
                    // Add to array
                    detail.errorCodes.push("#roadFrontageWidth");
                    $("#roadFrontageWidth").css("border-color", "red");
                }
            }
            // Check do rong hem 
            if (checkStringNotNull($("#widthValue").val())) {
                var tmpWidthValue = $("#widthValue").val();
                if (tmpWidthValue.indexOf("-") != -1) {
                    isValid = false;
                    // Add to array
                    detail.errorCodes.push("#widthValue");
                    $("#widthValue").css("border-color", "red");
                }
            }
            // Đơn gia mặt tiền đường
            if (!$("#priceStreetFrontage").autoNumeric('get')) {
                isValid = false;
                detail.errorCodes.push("#priceStreetFrontage");
                $("#priceStreetFrontage").css("border-color", "red");
                $(".priceStreetFrontage-error").html("<code>Đơn giá mặt tiền đường không hợp lệ</code>");
            }
            if (!$("#roadFrontage").val()) {
                isValid = false;
                detail.errorCodes.push("#roadFrontage");
                $("#roadFrontage").css("border-color", "red");
                $(".roadFrontage-error").html("<code>Khoảng cách đến mặt tiền đường không hợp lệ</code>");
            }
            //Hình ảnh
            // Empty hình ảnh
            var totalUpload = detail.uploadNewImages.length + detail.uploadedImages.length;
            // Hình ảnh < 3 tấm
            if (totalUpload < 3) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#image-list");
                $(".image-list-error").html("<code>Hình ảnh tối thiểu 3 tấm</code>");
            }

            // Hình GCN
            if ($.isNumeric(propertyTrans) && propertyTrans == 1) {
                var totalUpload = detail.uploadNewGCNImages.length + detail.uploadedGCNImages.length;
                // Hình ảnh < 2 tấm
                if (totalUpload < 2) {
                    isValid = false;
                    // Add to array
                    detail.errorCodes.push("#gcn-image-list");
                    $(".gcn-image-list-error").html("<code>Hình ảnh tối thiểu 2 tấm</code>");
                }
            }
            // Loại nhà
            if (parseInt($("#propertyTypes").val()) != 13) {
                if (!checkStringNotNull($("#houseTypes").val()) || !$.isNumeric($("#houseTypes").val())) {
                    isValid = false;
                    // Add to array
                    detail.errorCodes.push("#houseTypes");
                    $(".houseTypes-error").html("<code>Loại nhà không hợp lệ</code>");
                }        
            }

            if (parseInt($("#propertyTypes").val()) != 13 && parseInt($("#houseTypes").val()) != 89) {
                // Loại công trình
                if (!checkStringNotNull($("input[name=constructionTypeId]:checked").val()) || !$.isNumeric($("input[name=constructionTypeId]:checked").val())) {
                    isValid = false;
                    // Add to array
                    detail.errorCodes.push("input[name=constructionTypeId]");
                    $(".constructionTypeId-error").html("<code>Loại công trình không hợp lệ</code>");
                }
            }

            // Đặc điểm tốt
            var selectedAdvantages = $("input[name=advantages]:checked").map(function() {
                return {
                    "id": {
                        "advantageId": $(this).val()
                    }
                };
            }).get();
            if (typeof selectedAdvantages[0] == "undefined") {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#advantages");
                $(".advantages-error").html("<code>Đặc điểm tốt không hợp lệ</code>");
            }        
            // 
            if (!checkStringNotNull($("#depreciation").val())) {
                isValid = false;
                detail.errorCodes.push("#depreciation");
                $(".depreciation-error").html("<code>Khấu hao không hợp lệ</code>");
            }
        } else {
            // Địa chỉ tin đăng
            var cityId = $("#cityId").val();
            if (!cityId) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#cityId");
                $("#cityId").css("border-color", "red");
                $(".cityId-error").html("<code>Thành phố không hợp lệ</code>")
            }
            var districtId = $("#districtId").val();
            if (!districtId) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#districtId");
                $("#districtId").css("border-color", "red");
                $(".districtId-error").html("<code>Quận không hợp lệ</code>")
            }
            var wardId = $("#wardId").val();
            if (!wardId) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#wardId");
                $("#wardId").css("border-color", "red");
                $(".wardId-error").html("<code>Phường không hợp lệ</code>")
            }
            var streetId = $("#streetId").val();
            if (!streetId) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#streetId");
                $("#streetId").css("border-color", "red");
                $(".streetId-error").html("<code>Đường không hợp lệ</code>");
            }
            var houseNumber = $("#houseNumber").val();
            if (!houseNumber) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#houseNumber");
                $("#houseNumber").css("border-color", "red");
                $(".houseNumber-error").html("<code>Số nhà không hợp lệ</code>");
            }
            var price = $("#price").val();
            if (!price) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#price");
                $("#price").css("border-color", "red");
                $(".price-error").html("<code>Gía không hợp lệ</code>");
            }
            // Hoa hồng
            var commissionText = $("#commissionText").val();
            if (!commissionText) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#commissionText");
                $("#commissionText").css("border-color", "red");
                $(".commissionText-error").html("<code>Hoa hồng không hợp lệ</code>");
            }
            // Chinh dien
            var tmpPositionChck = parseInt($("input[name=position]:checked").val());

            if (tmpPositionChck == 1) {
                if (!checkStringNotNull($("div.mat-tien").find("#alleyWidth").val())) {
                    isValid = false;
                    detail.errorCodes.push("#alleyWidth");
                    $("div.mat-tien").find("#alleyWidth").css("border-color", "red");
                    $("div.mat-tien").find(".alleyWidth-error").html("<code>Độ rộng mặt tiền không hợp lệ</code>");
                }
                if ($("#haveBeSide-facade:checkbox:checked").val()) {
                    var tmpRoadFrontageWidthChck = $("div#chi-tiet-mat-tien").find("#roadFrontageWidth").val();
                    var tmpWidthValueChck = $("div#chi-tiet-mat-tien").find("#widthValue").val();

                    if ((tmpRoadFrontageWidthChck > 0 && tmpWidthValueChck > 0) || (!checkStringNotNull(tmpRoadFrontageWidthChck) && !checkStringNotNull(tmpWidthValueChck))) {
                        isValid = false;
                        // Add to array
                        detail.errorCodes.push("input[name=position]");
                        $("div#chi-tiet-mat-tien").find("#roadFrontageWidth").css("border-color", "red");
                        $("div#chi-tiet-mat-tien").find("#widthValue").css("border-color", "red");
                    }
                }
            } else if (tmpPositionChck == 2) {
                if (!checkStringNotNull($("div.trong-hem").find("#alleyWidth").val())) {
                    isValid = false;
                    detail.errorCodes.push("#alleyWidth");
                    $("div.trong-hem").find("#alleyWidth").css("border-color", "red");
                    $("div.trong-hem").find(".alleyWidth-error").html("<code>Độ rộng hẻm không hợp lệ</code>");
                }
                if (!checkStringNotNull($("div.trong-hem").find("#widthFrontWay").val())) {
                    isValid = false;
                    detail.errorCodes.push("#widthFrontWay");
                    $("div.trong-hem").find("#widthFrontWay").css("border-color", "red");
                    $("div.trong-hem").find(".widthFrontWay-error").html("<code>Độ rộng mặt tiền không hợp lệ</code>");
                }
            }
            //Hình ảnh
            // Empty hình ảnh
            var totalUpload = detail.uploadNewImages.length + detail.uploadedImages.length;
            // Hình ảnh < 3 tấm
            if (totalUpload < 3) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#image-list");
                $(".image-list-error").html("<code>Hình ảnh tối thiểu 3 tấm</code>");
            }

            // Hình GCN
            if ($.isNumeric(propertyTrans) && propertyTrans == 1) {
                var totalUpload = detail.uploadNewGCNImages.length + detail.uploadedGCNImages.length;
                // Hình ảnh < 2 tấm
                if (totalUpload < 2) {
                    isValid = false;
                    // Add to array
                    detail.errorCodes.push("#gcn-image-list");
                    $(".gcn-image-list-error").html("<code>Hình ảnh tối thiểu 2 tấm</code>");
                }
            }

            // Đặc điểm tốt
            var selectedAdvantages = $("input[name=advantages]:checked").map(function() {
                return {
                    "id": {
                        "advantageId": $(this).val()
                    }
                };
            }).get();
            if (typeof selectedAdvantages[0] == "undefined") {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#advantages");
                $(".advantages-error").html("<code>Đặc điểm tốt không hợp lệ</code>");
            }
        }

        return isValid;
    },
    // Tạo note
    createListingNote: function() {
        showPropzyLoading();
        var note = $.trim($("#note").val());
        if (note == "") {
            hidePropzyLoading();
            showPropzyAlert("Xin vui lòng nhập Ghi Chú");
        } else {
            var postData = {
                "id": null,
                "lsoId": parseInt($("#hiddenId").val()),
                "content": note
            };
            $.ajax({
                url: "/lso/create-listing-note",
                data: JSON.stringify(postData),
                type: "POST"
            }).done(function(response) {
                hidePropzyLoading();
                showPropzyAlert(response.message);
                if (response.result) {
                    $("#history-modal").modal('hide');
                    $("#note").val("");
                }
            });
        }
    },
    showSubStatus: function() {
        $("#subStatusId").empty();
        $("#subStatusId").select2({
            data: detail.subStatusIds
        });
    },
    getLsMembers: function(callback) {
        $.ajax({
            url: "/lso/get-lso-members",
            type: "GET"
        }).done(function(response) {
            callback(response);
        });
    },

    handleStatus: function(sstatusId) {
        var statusId = $("#hiddenRlistingStatusId").val();
        var transStatusId = $.isNumeric($("#hiddenListingTypeId").val()) ? $("#hiddenListingTypeId").val() : $("#propertyTrans").val();
        console.log("[Loại hình giao dịch] :" + transStatusId);
        console.log("[Tình Trạng] :" + statusId);
        // Đã chuyển LS thì show [Ngưng] [Đã bán] [Đã cho thuê]
        // Cập nhật yêu cầu : có rListingId thì hiển thị
        var tmpRListingId = $("#hiddenRlistingId").val();
        if ($.isNumeric(tmpRListingId)) {
            // Bán
            if (transStatusId == 1) {
                detail.stopFlg = detail.soldFlg = true;
                detail.rentFlg = false;
            }
            // Thuê
            else if (transStatusId == 2) {
                detail.stopFlg = detail.rentFlg = true;
                detail.soldFlg = false;
            }
        }
        // Ngưng
        else if (statusId == 6) {
            detail.stopFlg = false;
            // Bán
            if (transStatusId == 1) {
                detail.soldFlg = true;
                detail.rentFlg = false;
            }
            // Thuê
            else if (transStatusId == 2) {
                detail.rentFlg = true;
                detail.soldFlg = false;
            }
        }
        // Đã bán && Cho thuê
        if (statusId == 7) {
            detail.stopFlg = detail.soldFlg = detail.rentFlg = false;
        }
        // Set selected status
        if ($.isNumeric(statusId)) {
            $("#statusId").select2("val", statusId);
        }
        detail.lockStatus();
        detail.displayButtons();
    },

    displayButtons: function() {
        if ($.isNumeric($("#hiddenRlistingId").val())) {
            if (!$("#request-listing-btn").hasClass("btn-info")) {
                $("#request-listing-btn").addClass("btn-info");
            }
            $("#request-listing-btn").prop("disabled", false);
        } else {
            $("#request-listing-btn").removeClass("btn-info");
            $("#request-listing-btn").prop("disabled", true);
        }

        if (!detail.stopFlg) {
            $("#stop-listing-btn").hide();
        } else {
            $("#stop-listing-btn").show();
        }

        if (!detail.soldFlg) {
            $("#sold-listing-btn").hide();
        } else {
            $("#sold-listing-btn").show();
        }

        if (!detail.rentFlg) {
            $("#rent-listing-btn").hide();
        } else {
            $("#rent-listing-btn").show();
        }
    },

    lockStatus: function() {
        var statusId = $("#statusId").val();
        // Đã bán hoặc Thuê
        if (statusId == 17 || statusId == 18) {
            $("#statusId").attr("disabled", true);
        } // Nếu status = "Từ chối"
        else if (statusId == 19) {
            $("#create-listing-btn").hide();
            $("#reject-listing-btn").hide();
        } else {
            $("#statusId").attr("disabled", false);
        }
    },

    requestInternalModal: function() {
        $("#request-internal-modal").modal("show");
        requestCallback.initCallback(1);
        detail.showRequestInternal();
    },

    showRequestInternal: function() {
        try {
            detail.internalRequestLs.destroy();
        } catch (Ex) {}

        var lsoAjax = "/lso/get-internal-listings?rListingId=" + $("#hiddenRlistingId").val();

        detail.internalRequestLs = $('#request-internal-listings').on('processing.dt', function(e, settings, processing) {
            if (!processing) {
                requestCallback.addCallbackToQueue();
            }
        }).DataTable({
            "processing": false,
            "serverSide": true,
            "ajax": lsoAjax,
            "autoWidth": false,
            "lengthChange": false,
            "paging": false,
            "searching": false,
            "ordering": false,
            "scrollX": false,
            "language": getDataTableLanguage("vn"),
            "columns": [{
                    data: "createdDate",
                    render: detail.renderCreatedDate
                },
                {
                    data: "creater",
                    render: detail.renderCreater
                },
                {
                    data: "departmentName",
                    render: detail.renderDepartmentName
                },
                {
                    data: "content",
                    render: detail.renderContent
                },
            ],
            "initComplete": function(settings, json) {},
            "fnCreatedRow": function(row, data, index) {}
        });
    },

    createRequestInternalModal: function() {
        $("#request-internal-modal").modal("hide");
        $("#create-request-internal-modal").modal("show");
    },

    processRequestInternalModal: function() {
        var constraints = {
            lsoId: {
                presence: true,
                numericality: {
                    onlyInteger: true,
                    greaterThan: 0
                }
            },
            content: {
                presence: true
            }
        };
        var requestData = {
            lsoId: parseInt($("#hiddenId").val()),
            content: $("#internalContent").val()
        };
        var errors = validate(requestData, constraints);
        console.log(errors);

        if (typeof errors == "undefined") {
            showPropzyLoading();
            $.ajax({
                url: "/lso/create-request-internal",
                type: "POST",
                data: JSON.stringify(requestData)
            }).done(function(response) {
                hidePropzyLoading();
                if (response.result) {
                    // Hide create modal, show list modal(Reload ajax)
                    $("#internalContent").val("");
                    $("#create-request-internal-modal").modal('hide');
                    detail.internalRequestLs.ajax.reload();
                    // Show list modal
                    $("#request-internal-modal").modal("show");
                } else {
                    showPropzyAlert(response.message);
                }
            });
        } else {
            showPropzyAlert("Xin vui lòng kiểm tra lại dữ liệu");
        }
    },

    renderCreatedDate: function(data, type, object) {
        return object.createdDate ? moment(object.createdDate).format("DD/MM/YYYY") : "";
    },

    renderCreater: function(data, type, object) {
        return object.creater ? object.creater : "";
    },

    renderDepartmentName: function(data, type, object) {
        return object.departmentName ? object.departmentName : "";
    },

    renderContent: function(data, type, object) {
        return object.content ? object.content : "";
    },

    // LSO Listings
    listOwnerPosts: "",
    getListOwnerPosts: function() {
        showPropzyLoading();
        try {
            detail.listOwnerPosts.destroy();
        } catch (Ex) {}

        var lsoAjax = "/lso/getListingsByOwner?id=" + $("#hiddenId").val();

        detail.listOwnerPosts = $('#owner-posts-list').on('processing.dt', function(e, settings, processing) {
            if (!processing) {
                hidePropzyLoading();
            }
        }).DataTable({
            "processing": false,
            "serverSide": true,
            "autoWidth": false,
            "ajax": lsoAjax,
            "lengthChange": false,
            "paging": true,
            "searching": false,
            "ordering": false,
            "scrollX": false,
            "language": getDataTableLanguage("vn"),
            "columns": [{
                    data: "rlistingIdOwner",
                    render: detail.renderRlistingIdOwner
                },
                {
                    data: "lsoIdOwner",
                    render: detail.renderLsoIdOwner
                },
            ],
            "initComplete": function(settings, json) {
                hidePropzyLoading();
            },
            "fnCreatedRow": function(row, data, index) {}
        });
    },

    renderRlistingIdOwner: function(data, type, object) {
        return $.isNumeric(object.rlistingId) ? "<a target='_blank' href='/listing/" + object.rlistingId + "'>" + object.rlistingId + "</a>" : "<code>N/A</code>";
    },

    renderLsoIdOwner: function(data, type, object) {
        return $.isNumeric(object.lsoId) ? "<a target='_blank' href='/lso/detail/" + object.lsoId + "'>" + object.lsoId + "</a>" : "<code>N/A</code>";
    },

    // Show PS
    showPs: function() {
        // load PS
        detail.showPsData();
        $("#modal-ps-listing").modal("show");
    },

    // Show PS Datatable
    showPsData: function() {
        $("#lso-ps-datas").empty();
        showPropzyLoading();
        detail.getLsoService(function(response) {
            if (typeof response.services != "undefined") {
                $.each(response.services, function(index, service) {
                    $('<tr><td>' +
                        '<div class="form-check">' +
                        '<label class="form-check-label">' +
                        '<input type="checkbox" name="typeIds" value="' + service.typeId + '" class="form-check-input"> ' +
                        service.name +
                        '</label>' +
                        '</div></td></tr>'
                    ).appendTo("#lso-ps-datas");
                });
            }
            if (typeof response.content != "undefined") {
                $("#sendPsContent").val(response.content);
            }
        });
    },

    showDonePs: function() {
        $("#lso-ps-done-datas").empty();
        showPropzyLoading();
        detail.getSentLsoServices(function(response) {
            detail.donePsData = (typeof response != "undefined") ? response : [];
            $.each(response, function(index, service) {
                var isDone = "";
                var isDisabled = "";
                var isLate = "";
                var throughDone = "";
                if (typeof service.isDone != "undefined" && service.isDone) {
                    isDone = "checked";
                    isDisabled = "disabled";
                    throughDone = "is-done";
                } else {
                    isLate = (typeof service.isLate != "undefined" && service.isLate) ? "has-warning" : "";
                }
                var isCrm = (typeof service.isCrm != "undefined" && service.isCrm) ? "is-crm" : "";
                var delayPsDate = (typeof service.deadline != "undefined" && service.deadline) ? formatDate(service.deadline) : "";
                $('<tr><td>' +
                    '<div class="form-check"><label class="form-check-label ' + isCrm + '"><input data-isdone="' + service.isDone + '" type="checkbox" ' + isDone + ' name="psIds" value="' + service.psId + '" class="form-check-input" ' + isDisabled + '><span class="' + throughDone + '">' + service.name + '</span></label></div>' +
                    '</td>' +
                    '<td><div class="form-group ' + isLate + '"><input name="delay-date" readonly class="delay-date form-control" placeholder="Chọn ngày" data-id="' + service.psId + '" value="' + delayPsDate + '"  ' + isDisabled + '></div></td>' +
                    '</tr>'
                ).appendTo("#lso-ps-done-datas");
            });

            $('.delay-date').datepicker({
                format: 'dd/mm/yyyy',
                autoclose: true,
                startDate: new Date()
            });
        });
    },

    sendPs: function() {
        var constraints = {
            lsoId: {
                presence: true,
                numericality: {
                    onlyInteger: true,
                    greaterThan: 0
                }
            },
            typeIds: {
                presence: true
            }
        };

        var typeIds = $("input[name=typeIds]:checked").map(function() {
            return parseInt($(this).val());
        }).get();

        var postData = {
            lsoId: parseInt($("#hiddenId").val()),
            typeIds: typeIds,
            content: $("#sendPsContent").val() ? $("#sendPsContent").val() : null
        };

        var errors = validate(postData, constraints);

        if (typeof errors == "undefined") {
            $.ajax({
                url: "/lso/sent-lso-services",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(postData)
            }).done(function(rs) {
                hidePropzyLoading();
                if (rs.result) {
                    // reload list PS
                    detail.showPsData();
                    // reload PS number
                    detail.getPsTotal();
                } else {
                    showPropzyAlert(rs.message);
                }
            });
        } else {
            showPropzyAlert("Xin vui lòng chọn ít nhất 1 dịch vụ");
        }
    },

    sendDonePs: function() {
        var constraints = {
            psIds: {
                presence: true
            }
        };

        var psIds = $("input[name=psIds]:checked").map(function() {
            if (!$(this).data('isdone')) {
                return $(this).val();
            }
        }).get();

        var postData = {
            psIds: psIds,
        };

        var errors = validate(postData, constraints);

        if (typeof errors == "undefined") {

            // Loop delay-date 
            var isPsValid = true;
            $(".delay-date").each(function() {                
                var checkPsId = parseInt($(this).data('id'));
                var currentPsDelay = $.grep(psIds, function(psId) {
                    return parseInt(psId) == checkPsId;
                });            

                if (typeof currentPsDelay[0] != "undefined") {
                    if ($(this).val() == null || !$(this).val()) {
                        isPsValid = false;
                        $(this).parent().addClass("has-error");
                    }
                }
            });

            if (isPsValid) {
                showPropzyLoading();
                $.ajax({
                    url: "/lso/done-lso-services",
                    type: "POST",
                    data: JSON.stringify(postData)
                }).done(function(rs) {
                    hidePropzyLoading();
                    if (rs.result) {
                        // reload list Done PS
                        detail.showDonePs();
                        // PS Total
                        detail.getPsTotal();
                    } else {
                        showPropzyAlert(rs.message);
                    }
                });
            } else {
                showPropzyAlert("Xin vui lòng chọn ngày cho dịch vụ trước khi thao tác");
            }
        } else {
            showPropzyAlert("Xin vui lòng chọn ít nhất 1 dịch vụ");
        }
    },

    processDelayPs: function() {
        var postData = {
            psId: detail.psId,
            deadline: dateStringToTimestamp(detail.psDate),
            note: detail.psDelayNote
        };

        showPropzyLoading();
        $.ajax({
            url: "/lso/delay-lso-services",
            type: "POST",
            data: JSON.stringify(postData)
        }).done(function(rs) {
            // Reset 
            detail.psDelayNote = "";
            detail.psDelayFlag = false;
            detail.psCount = 0;
            hidePropzyLoading();
            if (rs.result) {
                // Hide modal 
                $("#delay-note-modal").modal("hide");
                $("#ps-delay-note").val("");
                detail.showDonePs();
            } else {
                showPropzyAlert(rs.message);
            }
        });
    },

    delayPsService: function() {
        if (detail.psDelayFlag) {
            detail.processDelayPs();
        } else {
            // Check delay reason
            var delayPs = $.grep(detail.donePsData, function(ps) {
                return ps.psId == detail.psId;
            });
            console.log(delayPs);

            if (typeof delayPs[0] != "undefined") {
                $("#tmp-ps-id").val(delayPs[0].psId);
                // Check note is not empty
                if (delayPs[0].deadline != null || delayPs[0].deadline) {
                    detail.psDelayFlag = true;
                    // Show note                
                    $("#delay-note-modal").modal({
                        backdrop: false,
                        keyboard: false
                    });
                } else {
                    detail.processDelayPs();
                }
            } else {
                // Báo lỗi
                // Rare case ! WTF
                showPropzyAlert("Không có PS ID !!!");
            }
        }
    },

    delayPsNote: function() {
        // Check reason
        if (checkStringNotNull($("#ps-delay-note").val())) {
            var tmpPsId = $("#tmp-ps-id").val();
            detail.psDelayNote = ($("#ps-delay-note").val()) ? $("#ps-delay-note").val() : "";
            detail.processDelayPs();
        } else {
            showPropzyAlert("Lý do không được trống !");
        }
    },

    getLsoService: function(callback) {
        $.ajax({
            url: '/lso/get-lso-services?lsoId=' + parseInt($("#hiddenId").val()),
            type: "GET"
        }).done(function(response) {
            hidePropzyLoading();
            if (response.result) {
                callback(response.data);
            } else {
                showPropzyAlert(response.message);
            }
        });
    },

    getSentLsoServices: function(callback) {
        $.ajax({
            url: '/lso/get-sent-lso-services?lsoId=' + parseInt($("#hiddenId").val()),
            type: "GET"
        }).done(function(response) {
            hidePropzyLoading();
            if (response.result) {
                callback(response.data);
            } else {
                showPropzyAlert(response.message);
            }
        });
    },

    valuationOfRealEstate: function() {     
        var isValid = true; 
        
        detail.initFormField();        

        // Loại hình giao dịch
        var propertyTrans = $("#propertyTrans").val();
        if (!propertyTrans) {
            isValid = false;
            // Add to array
            detail.errorCodes.push("#propertyTrans");
            $("#propertyTrans").css("border-color", "red");
            $(".propertyTrans-error").html("<code>Loại hình giao dịch không hợp lệ</code>");
        }
        // Loại BĐS
        var propertyTypes = $("#propertyTypes").val();
        if (!propertyTypes) {
            isValid = false;
            // Add to array
            detail.errorCodes.push("#propertyTypes");
            $("#propertyTypes").css("border-color", "red");
            $(".propertyTypes-error").html("<code>Loại BĐS không hợp lệ</code>");
        }

        // Nhà riêng
        if (propertyTypes == 11) {
            // Địa chỉ tin đăng
            var cityId = $("#cityId").val();
            if (!cityId) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#cityId");
                $("#cityId").css("border-color", "red");
                $(".cityId-error").html("<code>Thành phố không hợp lệ</code>")
            }
            var districtId = $("#districtId").val();
            if (!districtId) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#districtId");
                $("#districtId").css("border-color", "red");
                $(".districtId-error").html("<code>Quận không hợp lệ</code>")
            }
            var wardId = $("#wardId").val();
            if (!wardId) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#wardId");
                $("#wardId").css("border-color", "red");
                $(".wardId-error").html("<code>Phường không hợp lệ</code>")
            }
            var streetId = $("#streetId").val();
            if (!streetId) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#streetId");
                $("#streetId").css("border-color", "red");
                $(".streetId-error").html("<code>Đường không hợp lệ</code>");
            }
            var houseNumber = $("#houseNumber").val();
            if (!houseNumber) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#houseNumber");
                $("#houseNumber").css("border-color", "red");
                $(".houseNumber-error").html("<code>Số nhà không hợp lệ</code>");
            }
            // Diện tích đất + Dài + Rộng
            if (!checkStringNotNull($("#lotSize").val()) || !$.isNumeric($("#lotSize").val())) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#lotSize");
                $("#lotSize").css("border-color", "red");
                $(".lotSize-error").html("<code>Diện tích không hợp lệ</code>");
            }
            // Dài
            if (!checkStringNotNull($("#sizeLength").val()) || !$.isNumeric($("#sizeLength").val())) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#sizeLength");
                $("#sizeLength").css("border-color", "red");
                $(".sizeLength-error").html("<code>Chiều dài không hợp lệ</code>");
            }
            // Rộng
            if (!checkStringNotNull($("#sizeWidth").val()) || !$.isNumeric($("#sizeWidth").val())) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#sizeWidth");
                $("#sizeWidth").css("border-color", "red");
                $(".sizeWidth-error").html("<code>Chiều rộng không hợp lệ</code>");
            }
            // Diện tích sử dụng
            if (!checkStringNotNull($("#floorSize").val()) || !$.isNumeric($("#floorSize").val())) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#floorSize");
                $("#floorSize").css("border-color", "red");
                $(".floorSize-error").html("<code>Diện tích sử dụng không hợp lệ</code>");
            }
            var rightType = $("#rightTypes").val();
            if (!$.isNumeric(rightType) && propertyTrans != 2) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#rightTypes");
                $("#rightTypes").css("border-color", "red");
                $(".rightTypes-error").html("<code>Giấy chủ quyền không hợp lệ</code>");
            }
            var price = $("#price").val();
            if (!price) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#price");
                $("#price").css("border-color", "red");
                $(".price-error").html("<code>Gía không hợp lệ</code>");
            }
            
            var propertyTypesId = $("#propertyTypes").val();
            // Phòng ngủ
            var bedRooms = $("#bedRooms").val();
            // Đất nền không check [Phòng ngủ]
            if (!isValidNumber(bedRooms) && propertyTypesId != 13) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#bedRooms");
                $("#bedRooms").css("border-color", "red");
                $(".bedRooms-error").html("<code>Phòng ngủ không hợp lệ</code>");
            }
            // Đất nền không check [WC]
            // WC
            var bathRooms = $("#bathRooms").val();
            if (!isValidNumber(bathRooms) && propertyTypesId != 13) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#bathRooms");
                $("#bathRooms").css("border-color", "red");
                $(".bathRooms-error").html("<code>WC  không hợp lệ</code>");
            }
            // Check so tang
            if (checkStringNotNull($("#numberFloor").val())) {
                if (!isValidNumber($("#numberFloor").val())) {
                    isValid = false;
                    // Add to array
                    detail.errorCodes.push("#numberFloor");
                    $("#numberFloor").css("border-color", "red");
                    $(".numberFloor-error").html("<code>Số tầng không hợp lệ</code>");
                }
            }
            // Chinh dien
            var tmpPositionChck = parseInt($("input[name=position]:checked").val());

            if (tmpPositionChck == 1) {
                if (!checkStringNotNull($("div.mat-tien").find("#alleyWidth").val())) {
                    isValid = false;
                    detail.errorCodes.push("#alleyWidth");
                    $("div.mat-tien").find("#alleyWidth").css("border-color", "red");
                    $("div.mat-tien").find(".alleyWidth-error").html("<code>Độ rộng mặt tiền không hợp lệ</code>");
                }
                if ($("#haveBeSide-facade:checkbox:checked").val()) {
                    var tmpRoadFrontageWidthChck = $("div#chi-tiet-mat-tien").find("#roadFrontageWidth").val();
                    var tmpWidthValueChck = $("div#chi-tiet-mat-tien").find("#widthValue").val();

                    if ((tmpRoadFrontageWidthChck > 0 && tmpWidthValueChck > 0) || (!checkStringNotNull(tmpRoadFrontageWidthChck) && !checkStringNotNull(tmpWidthValueChck))) {
                        isValid = false;
                        // Add to array
                        detail.errorCodes.push("input[name=position]");
                        $("div#chi-tiet-mat-tien").find("#roadFrontageWidth").css("border-color", "red");
                        $("div#chi-tiet-mat-tien").find("#widthValue").css("border-color", "red");
                    }
                }
            } else if (tmpPositionChck == 2) {
                if (!checkStringNotNull($("div.trong-hem").find("#alleyWidth").val())) {
                    isValid = false;
                    detail.errorCodes.push("#alleyWidth");
                    $("div.trong-hem").find("#alleyWidth").css("border-color", "red");
                    $("div.trong-hem").find(".alleyWidth-error").html("<code>Độ rộng hẻm không hợp lệ</code>");
                }
                if (!checkStringNotNull($("div.trong-hem").find("#widthFrontWay").val())) {
                    isValid = false;
                    detail.errorCodes.push("#widthFrontWay");
                    $("div.trong-hem").find("#widthFrontWay").css("border-color", "red");
                    $("div.trong-hem").find(".widthFrontWay-error").html("<code>Độ rộng mặt tiền không hợp lệ</code>");
                }
            }

            // Check do rong mat tien 
            if (checkStringNotNull($("#roadFrontageWidth").val())) {
                var tmpRoadFrontageWidth = $("#roadFrontageWidth").val();
                if (tmpRoadFrontageWidth.indexOf("-") != -1) {
                    isValid = false;
                    // Add to array
                    detail.errorCodes.push("#roadFrontageWidth");
                    $("#roadFrontageWidth").css("border-color", "red");
                }
            }
            // Check do rong hem 
            if (checkStringNotNull($("#widthValue").val())) {
                var tmpWidthValue = $("#widthValue").val();
                if (tmpWidthValue.indexOf("-") != -1) {
                    isValid = false;
                    // Add to array
                    detail.errorCodes.push("#widthValue");
                    $("#widthValue").css("border-color", "red");
                }
            }       
            // Đơn gia mặt tiền đường
            if (!$("#priceStreetFrontage").autoNumeric('get')) {
                isValid = false;
                detail.errorCodes.push("#priceStreetFrontage");
                $("#priceStreetFrontage").css("border-color", "red");
                $(".priceStreetFrontage-error").html("<code>Đơn giá mặt tiền đường không hợp lệ</code>");
            }     
            // Loại nhà
            if (parseInt($("#propertyTypes").val()) != 13) {
                if (!checkStringNotNull($("#houseTypes").val()) || !$.isNumeric($("#houseTypes").val())) {
                    isValid = false;
                    // Add to array
                    detail.errorCodes.push("#houseTypes");
                    $(".houseTypes-error").html("<code>Loại nhà không hợp lệ</code>");
                }        
            }

            if (parseInt($("#propertyTypes").val()) != 13 && parseInt($("#houseTypes").val()) != 89) {
                // Loại công trình
                if (!checkStringNotNull($("input[name=constructionTypeId]:checked").val()) || !$.isNumeric($("input[name=constructionTypeId]:checked").val())) {
                    isValid = false;
                    // Add to array
                    detail.errorCodes.push("input[name=constructionTypeId]");
                    $(".constructionTypeId-error").html("<code>Loại công trình không hợp lệ</code>");
                }
            }

            if (!$("#roadFrontage").val()) {
                isValid = false;
                detail.errorCodes.push("#roadFrontage");
                $("#roadFrontage").css("border-color", "red");
                $(".roadFrontage-error").html("<code>Khoảng cách đến mặt tiền đường không hợp lệ</code>");
            }

            // Đặc điểm tốt
            var selectedAdvantages = $("input[name=advantages]:checked").map(function() {
                return {
                    "id": {
                        "advantageId": $(this).val()
                    }
                };
            }).get();
            if (typeof selectedAdvantages[0] == "undefined") {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#advantages");
                $(".advantages-error").html("<code>Đặc điểm tốt không hợp lệ</code>");
            }        
            // 
            if (!checkStringNotNull($("#depreciation").val())) {
                isValid = false;
                detail.errorCodes.push("#depreciation");
                $(".depreciation-error").html("<code>Khấu hao không hợp lệ</code>");
            }
        } else if (propertyTypes == 13) {
            // Địa chỉ tin đăng
            var cityId = $("#cityId").val();
            if (!cityId) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#cityId");
                $("#cityId").css("border-color", "red");
                $(".cityId-error").html("<code>Thành phố không hợp lệ</code>")
            }
            var districtId = $("#districtId").val();
            if (!districtId) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#districtId");
                $("#districtId").css("border-color", "red");
                $(".districtId-error").html("<code>Quận không hợp lệ</code>")
            }
            var wardId = $("#wardId").val();
            if (!wardId) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#wardId");
                $("#wardId").css("border-color", "red");
                $(".wardId-error").html("<code>Phường không hợp lệ</code>")
            }
            var streetId = $("#streetId").val();
            if (!streetId) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#streetId");
                $("#streetId").css("border-color", "red");
                $(".streetId-error").html("<code>Đường không hợp lệ</code>");
            }
            var houseNumber = $("#houseNumber").val();
            if (!houseNumber) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#houseNumber");
                $("#houseNumber").css("border-color", "red");
                $(".houseNumber-error").html("<code>Số nhà không hợp lệ</code>");
            }
            // Diện tích đất + Dài + Rộng
            if (!checkStringNotNull($("#lotSize").val()) || !$.isNumeric($("#lotSize").val())) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#lotSize");
                $("#lotSize").css("border-color", "red");
                $(".lotSize-error").html("<code>Diện tích không hợp lệ</code>");
            }
            // Dài
            if (!checkStringNotNull($("#sizeLength").val()) || !$.isNumeric($("#sizeLength").val())) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#sizeLength");
                $("#sizeLength").css("border-color", "red");
                $(".sizeLength-error").html("<code>Chiều dài không hợp lệ</code>");
            }
            // Rộng
            if (!checkStringNotNull($("#sizeWidth").val()) || !$.isNumeric($("#sizeWidth").val())) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#sizeWidth");
                $("#sizeWidth").css("border-color", "red");
                $(".sizeWidth-error").html("<code>Chiều rộng không hợp lệ</code>");
            }            
            var rightType = $("#rightTypes").val();
            if (!$.isNumeric(rightType) && propertyTrans != 2) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#rightTypes");
                $("#rightTypes").css("border-color", "red");
                $(".rightTypes-error").html("<code>Giấy chủ quyền không hợp lệ</code>");
            }
            var price = $("#price").val();
            if (!price) {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#price");
                $("#price").css("border-color", "red");
                $(".price-error").html("<code>Gía không hợp lệ</code>");
            }            
            var propertyTypesId = $("#propertyTypes").val();                        
            // Chinh dien
            var tmpPositionChck = parseInt($("input[name=position]:checked").val());

            if (tmpPositionChck == 1) {
                if (!checkStringNotNull($("div.mat-tien").find("#alleyWidth").val())) {
                    isValid = false;
                    detail.errorCodes.push("#alleyWidth");
                    $("div.mat-tien").find("#alleyWidth").css("border-color", "red");
                    $("div.mat-tien").find(".alleyWidth-error").html("<code>Độ rộng mặt tiền không hợp lệ</code>");
                }
                if ($("#haveBeSide-facade:checkbox:checked").val()) {
                    var tmpRoadFrontageWidthChck = $("div#chi-tiet-mat-tien").find("#roadFrontageWidth").val();
                    var tmpWidthValueChck = $("div#chi-tiet-mat-tien").find("#widthValue").val();

                    if ((tmpRoadFrontageWidthChck > 0 && tmpWidthValueChck > 0) || (!checkStringNotNull(tmpRoadFrontageWidthChck) && !checkStringNotNull(tmpWidthValueChck))) {
                        isValid = false;
                        // Add to array
                        detail.errorCodes.push("input[name=position]");
                        $("div#chi-tiet-mat-tien").find("#roadFrontageWidth").css("border-color", "red");
                        $("div#chi-tiet-mat-tien").find("#widthValue").css("border-color", "red");
                    }
                }
            } else if (tmpPositionChck == 2) {
                if (!checkStringNotNull($("div.trong-hem").find("#alleyWidth").val())) {
                    isValid = false;
                    detail.errorCodes.push("#alleyWidth");
                    $("div.trong-hem").find("#alleyWidth").css("border-color", "red");
                    $("div.trong-hem").find(".alleyWidth-error").html("<code>Độ rộng hẻm không hợp lệ</code>");
                }
                if (!checkStringNotNull($("div.trong-hem").find("#widthFrontWay").val())) {
                    isValid = false;
                    detail.errorCodes.push("#widthFrontWay");
                    $("div.trong-hem").find("#widthFrontWay").css("border-color", "red");
                    $("div.trong-hem").find(".widthFrontWay-error").html("<code>Độ rộng mặt tiền không hợp lệ</code>");
                }
            }

            // Check do rong mat tien 
            if (checkStringNotNull($("#roadFrontageWidth").val())) {
                var tmpRoadFrontageWidth = $("#roadFrontageWidth").val();
                if (tmpRoadFrontageWidth.indexOf("-") != -1) {
                    isValid = false;
                    // Add to array
                    detail.errorCodes.push("#roadFrontageWidth");
                    $("#roadFrontageWidth").css("border-color", "red");
                }
            }
            // Check do rong hem 
            if (checkStringNotNull($("#widthValue").val())) {
                var tmpWidthValue = $("#widthValue").val();
                if (tmpWidthValue.indexOf("-") != -1) {
                    isValid = false;
                    // Add to array
                    detail.errorCodes.push("#widthValue");
                    $("#widthValue").css("border-color", "red");
                }
            }    

            // Đơn gia mặt tiền đường
            if (!$("#priceStreetFrontage").autoNumeric('get')) {
                isValid = false;
                detail.errorCodes.push("#priceStreetFrontage");
                $("#priceStreetFrontage").css("border-color", "red");
                $(".priceStreetFrontage-error").html("<code>Đơn giá mặt tiền đường không hợp lệ</code>");
            }                

            if (!$("#roadFrontage").val()) {
                isValid = false;
                detail.errorCodes.push("#roadFrontage");
                $("#roadFrontage").css("border-color", "red");
                $(".roadFrontage-error").html("<code>Khoảng cách đến mặt tiền đường không hợp lệ</code>");
            }

            // Đặc điểm tốt
            var selectedAdvantages = $("input[name=advantages]:checked").map(function() {
                return {
                    "id": {
                        "advantageId": $(this).val()
                    }
                };
            }).get();
            if (typeof selectedAdvantages[0] == "undefined") {
                isValid = false;
                // Add to array
                detail.errorCodes.push("#advantages");
                $(".advantages-error").html("<code>Đặc điểm tốt không hợp lệ</code>");
            }                    
        }

        if (!isValid) {          
            $("#update-listing-btn").attr("disabled", false);  
            showPropzyAlert("Vui lòng kiểm tra dữ liệu");
            if (typeof detail.errorCodes[0] != "undefined") {
                $("body, html").animate({
                    scrollTop: $(detail.errorCodes[0]).offset().top
                }, 600);
            }
            return false;
        }

        detail.getValuationOfRealEstate(function(resp) {
                if (resp.result) {                    
                    var data = resp.data;                    
                    if (data.classify == "E") {
                        showPropzyAlert(data.message);
                    } else if (data.classify == "D") {                        
                        showPropzyAlert(data.message);
                        setTimeout(function() {
                            window.location.reload();
                        }, 1000);
                    } else {
                        showPropzyAlert(resp.message);
                        setTimeout(function() {
                            window.location.reload();
                        }, 1000);
                    }
                } else {
                    showPropzyAlert()
                }
            });
    },

    /**
     * Lấy dữ liệu giá thẩm định     
     */
    getValuationOfRealEstate: function(callback) {
        showPropzyLoading();
        $.ajax({
            url: "/lso/get-valuation-of-real-estate?lsoId=" + parseInt($("#hiddenId").val()),
            type: "GET",
            success: function(resp) {
                hidePropzyLoading();
                callback(resp);
            },
            error: function(err) {
                hidePropzyLoading();
                showPropzyAlert("Đã có lỗi xảy ra");
            }
        });
    },

    /*
     * Thêm đường
     */
    startStreetForm: function() {
        if ($.isNumeric($("#wardId").val())) {
            $("#wardIdField").val($("#wardId").val());
            $("#create-street-modal").modal('show');
        } else {
            showPropzyAlert("Vui lòng chọn Phường!");
        }
    },

    showProfile: function() {
        $("#profile-modal").modal('show');
    }
};

// LSO Create New
var create = {
    // Hình ảnh
    deletingOldImages: [],
    uploadNewImages: [],
    uploadedImages: [],
    // Hình GCN
    deletingOldGCNImages: [],
    uploadNewGCNImages: [],
    uploadedGCNImages: [],
    // Hình process cho upload
    processPhotos: [],
    processPhotosFinal: [],
    processGCNPhotos: [],
    processGCNPhotosFinal: [],
    // Streets , Phường, Quận
    streetData: [],
    wardData: [],
    districtData: [],
    // Tính năng cập nhật - 17/05/2017
    /**
     * - Bên LSO tin đăng khi edit hay tạo mới. lúc mình chọn tình trạng của tin đăng là "Junk"
     * thi kế bên sẽ hiện thêm một select option và trong đó có 3 option là
     * Không hop tac, tỉnh khác, môi giới
     * (3 option này anh lấy trong cái childs list tương ứng với
     * cái trang thái Junk trong api channel-status :)
     */
    subStatusIds: [],
    constructionTypes: [],

    init: function() {
        create.constructionTypes = [];
        // Init Number of Queue
        requestCallback.initCallback(7);

        // CKEDITOR.replace('noteForLs');

        create.loadListingImages("#image-list", ".add-image-placeholder", "#add-image-item");
        create.loadListingImages("#gcn-image-list", ".add-gcn-image-placeholder", "#add-gcn-image-item");

        // Active
        create.activeFields();
        create.initFields('chinh-dien');

        // Status (1)
        create.getStatusList();

        // Loading data-source
        // Loại hình giao dịch (2)
        create.loadPropertyTrans(function(response) {
            requestCallback.addCallbackToQueue();
            var propertyTrans = [];
            for (var i in response) {
                propertyTrans.push({
                    id: i,
                    text: response[i]
                });
            }
            $("#propertyTrans").select2({
                data: propertyTrans
            });
        });

        // Loại BĐS (3)
        create.loadPropertyTypes(function(response) {
            requestCallback.addCallbackToQueue();
            var propertyTypes = [];
            $.map(response, function(item) {
                propertyTypes.push({
                    id: item.propertyTypeID,
                    text: item.typeName
                });
            });
            $("#propertyTypes").select2({
                data: propertyTypes
            });
        });

        // TP, Phường, Quận (4)
        create.districtData = [{
            id: '',
            text: 'Quận'
        }];
        $("#districtId").empty();
        create.loadDistrict(function(response) {
            requestCallback.addCallbackToQueue();
            if (response.result) {
                $.map(response.data, function(item) {
                    create.districtData.push({
                        id: item.districtId,
                        text: item.districtName
                    });
                });

                $("#districtId").select2({
                    data: create.districtData
                });
            } else {
                showPropzyAlert(response.message);
            }
        });

        // API lấy danh sách giay chủ quyền (5)
        create.loadRightTypes(function(response) {
            requestCallback.addCallbackToQueue();
            if (response.result) {
                var rightTypes = [];
                $.map(response.data, function(item) {
                    rightTypes.push({
                        id: item.useRightTypeId,
                        text: item.typeName
                    });
                });
                $("#rightTypes").select2({
                    data: rightTypes
                });
            } else {
                showPropzyAlert(response.message);
            }
        });

        // Channel types (6,7,8,9,10)
        // 1: Nguồn khách hàng
        // 2: Loại nhà
        // 3: Loại công trình
        // 4: Loại vật liệu
        // 5: Ưu điểm
        // 6: Nhược điểm
        // 7: Loại lịch sử
        create.loadChannelTypes(function(response) {
            requestCallback.addCallbackToQueue();
            $.map(response.data, function(item) {
                create.loadChannelType(item);
            });
        });

        // Load LSO (*)
        create.getLsMembers(function(response) {
            requestCallback.addCallbackToQueue();
            if (response.result) {
                var members = [];
                var activeId = "";
                $.map(response.data, function(item) {
                    if (typeof item.type != "undefined") {
                        activeId = item.userId;
                    }
                    members.push({
                        id: item.userId,
                        text: item.name
                    });
                });
                console.log(members);
                $("#assignedTo").select2({
                    data: members
                }).select2('val', parseInt($("#hiddenLoggedInUserId").val()));
            }
        });
    },
    // Tình trạng
    getStatusList: function() {
        var statuses = [];
        $.ajax({
            url: "/lso/get-status-list",
            type: "GET",
        }).done(function(response) {
            requestCallback.addCallbackToQueue();
            if (response.result) {
                $.map(response.data, function(item) {
                    // Tin dang
                    if (item.type == 1) {
                        // Prepare data into statuses
                        $.map(item.list, function(status) {
                            statuses.push({
                                id: status.id,
                                text: status.name,
                            });
                            // Junk
                            if (status.id == 5) {
                                if (typeof status.childs[0] != "undefined") {
                                    $.map(status.childs, function(item) {
                                        create.subStatusIds.push({
                                            id: item.id,
                                            text: item.name
                                        });
                                    });
                                }
                            }
                        });
                        $("#statusId").select2({
                            data: statuses
                        });
                    }
                });
            }
        });
    },
    // Check Active
    activeFields: function() {
        var listFields = [{
            type: "radio",
            name: ".mattien"
        }];
        $.map(listFields, function(item) {
            if (item.type == 'radio') {
                $(item.name).attr("checked", "checked");
            }
        });
        // Khoảng cách đến mặt tiền
        var roadFrontage = [{
                id: "0-100",
                text: " <= 100m"
            },
            {
                id: "100-200",
                text: " > 100m-200m"
            },
            {
                id: "200-500",
                text: " 200m-500m"
            },
            {
                id: "500-0",
                text: " > 500m"
            }
        ];
        $("#roadFrontage").select2({
            data: roadFrontage
        });

        // Logic hiển thị button DIY, Locked, Unlock
        create.displayElements("#diy-btn");

        // Logic hiện thị nút [Tạo tin đăng đầy đủ]
        $("#create-listing-btn").prop("disabled", false);

        // Init autoNumeric
        // $("#lotSize").autoNumeric("init", {"mDec":0});
        // $("#sizeLength").autoNumeric("init", {"mDec":0});
        // $("#sizeWidth").autoNumeric("init", {"mDec":0});
        // $("#floorSize").autoNumeric("init", {"mDec":0});
        $("#price").autoNumeric("init", {
            "mDec": 0
        });
        $("#minPrice").autoNumeric("init", {
            "mDec": 0
        });
        $("#depositText").autoNumeric("init", {
            "mDec": 0
        });
        $("#priceStreetFrontage").autoNumeric("init", {
            "mDec": 0
        });
        // $("#commissionText").autoNumeric("init", {"mDec":0});
    },
    // Logic field [Chính diện]
    initFields: function(fieldName) {
        if (fieldName == 'chinh-dien') {
            $(".position[value=1]").prop("checked", true);
            $("#haveBeSide-facade").prop("checked", false);
            $(".mat-tien").show();
            $(".trong-hem").hide();
        }
    },
    loadListingImages: function(imgLs, imgPlace, imgItem) {
        var imageString = $(imgLs).data("images");
        if (typeof imageString != undefined && imageString.length > 0) {
            var images = imageString.split(",");

            if (imgPlace == ".add-image-placeholder") {
                create.uploadedImages = images;
            } else {
                create.uploadedGCNImages = images;
            }

            for (var i = 0; i < images.length; i++) {
                var imageSrc = images[i];
                var newImageItem = $(imgPlace).clone();
                newImageItem.find("input").remove();
                newImageItem.find("img").attr("src", imageSrc);
                newImageItem.find("img").attr("class", "lso-image");
                newImageItem.attr("data-src", imageSrc);
                if (imgPlace == ".add-image-placeholder") {
                    newImageItem.insertBefore(imgItem).removeClass("add-image-placeholder hidden");
                } else {
                    newImageItem.insertBefore(imgItem).removeClass("add-gcn-image-placeholder hidden");
                }
            }
        }
    },
    // Validate image [CREATE]
    validateImageUpload: function(file) {
        if (typeof file != undefined) {
            if (file.size > 5 * 1024 * 1024) {
                showPropzyAlert(INVALID_SIZE_IMG);
                return false;
            }
            var supportImageTypes = [
                "image/jpeg",
                "image/gif",
                "image/png"
            ];

            if (supportImageTypes.indexOf(file.type) < 0) {
                showPropzyAlert(INVALID_TYPE_IMG);
                return false;
            }

            return true;
        } else {
            showPropzyAlert(EMPTY_FILE);
            return false;
        }
    },
    loadPropertyTrans: function(callback) {
        return $.ajax({
            url: "/lso/get-property-types",
            type: "GET",
            success: function(response) {
                callback(response);
            }
        });
    },
    // Reload property types
    reloadPropertyTypes: function(typeId) {
        showPropzyLoading();
        var propertyTypes = [];
        $.ajax({
            url: "/lso/get-property-type-list/" + typeId,
            type: "GET",
            success: function(response) {
                hidePropzyLoading();
                $("#propertyTypes").empty();
                $.map(response, function(item) {
                    propertyTypes.push({
                        id: item.propertyTypeID,
                        text: item.typeName
                    });
                });
                $("#propertyTypes").select2({
                    data: propertyTypes
                });
            },
            error: function(response) {
                hidePropzyLoading();
                showPropzyAlert('Đã có lỗi xảy ra. Xin vui lòng làm mới trang');
            }
        });
    },
    loadPropertyTypes: function(callback) {
        var typeId = $("#propertyTrans").val();
        $.ajax({
            url: "/lso/get-property-type-list/" + typeId,
            type: "GET",
            success: function(response) {
                callback(response);
            }
        });
    },
    loadDistrict: function(callback) {
        var postData = {
            "regionIdsList": null,
            "cityIdsList": [parseInt($("#cityId").val())]
        };
        $.ajax({
            url: "/zone/get-districts-by-cities",
            type: "POST",
            data: JSON.stringify(postData),
            success: function(response) {
                callback(response);
            }
        });
    },
    loadWardWithDistrict: function() {
        showPropzyLoading();
        // Load Ward
        // Load street
        create.wardData = [{
            id: '',
            text: 'Phường'
        }];
        $("#wardId").empty();
        create.loadWard(function(response) {
            $.map(response, function(item) {
                create.wardData.push({
                    id: item.wardId,
                    text: item.wardName
                });
            });
            $("#wardId").select2({
                data: create.wardData
            });
            hidePropzyLoading();
        });
    },
    loadWard: function(callback) {
        if ($.isNumeric($("#districtId").val())) {
            $.ajax({
                url: "/common/get-ward/" + $("#districtId").val(),
                type: "GET",
                success: function(response) {
                    callback(response);
                }
            });
        } else {
            hidePropzyLoading();
        }
    },
    loadStreetWithWard: function() {
        showPropzyLoading();
        // Load street
        create.streetData = [{
            id: '',
            text: 'Đường'
        }];
        $("#streetId").empty();
        create.loadStreet(function(response) {
            console.log(response.data)
            $.map(response.data, function(item) {
                create.streetData.push({
                    id: item.streetId,
                    text: item.streetName,
                    widthValue: item.widthValue,
                    price: item.price
                });
            });
            $("#streetId").select2({
                data: create.streetData
            });
            hidePropzyLoading();
        });
    },
    loadStreet: function(callback) {
        if ($.isNumeric($("#wardId").val())) {
            $.ajax({
                url: "/zone/get-streets/" + $("#wardId").val(),
                type: "GET"
            }).done(function(response) {
                callback(response);
            });
        } else {
            hidePropzyLoading();
        }
    },
    loadSourceTypes: function(callback) {
        $.ajax({
            url: "/lso/get-source-types",
            type: "GET",
            success: function(response) {
                callback(response);
            }
        });
    },
    loadRightTypes: function(callback) {
        $.ajax({
            url: "/lso/get-right-types",
            type: "GET",
            success: function(response) {
                callback(response);
            }
        });
    },
    loadHouseTypes: function(callback) {
        $.ajax({
            url: "/lso/get-house-types",
            type: "GET",
            success: function(response) {
                callback(response);
            }
        });
    },
    loadConstructionTypes: function(callback) {
        $.ajax({
            url: "/lso/get-construction-types",
            type: "GET",
            success: function(response) {
                callback(response);
            }
        });
    },
    loadAdvantages: function(callback) {
        $.ajax({
            url: "/lso/get-advantages",
            type: "GET",
            success: function(response) {
                callback(response);
            }
        });
    },
    loadDisadvantages: function(callback) {
        $.ajax({
            url: "/lso/get-disadvantages",
            type: "GET",
            success: function(response) {
                callback(response);
            }
        });
    },
    loadChannelTypes: function(callback) {
        $.ajax({
            url: "/lso/get-channel-types",
            type: "GET",
            success: function(response) {
                callback(response);
            }
        });
    },
    loadChannelType: function(channel) {
        var channels = [{
                id: "1",
                text: "#sourceTypes",
                type: "select"
            },
            {
                id: "2",
                text: "#houseTypes",
                type: "select"
            },
            {
                id: "5",
                text: "#advantages",
                type: "checkbox"
            },
            {
                id: "6",
                text: "#disadvantages",
                type: "checkbox"
            },
        ];
        var findChannel = $.grep(channels, function(each) {
            return each.id == channel.type;
        });
        if (typeof findChannel[0] != "undefined") {
            if (findChannel[0].type == "select") {
                var datas = [];
                var removeIds = [2, 5, 7, 9];

                if (channel.type == 2) {
                    create.constructionTypes = channel.list;
                }                
                $.map(channel.list, function(item) {
                    // Source Types (bỏ 2,5,7,9)
                    if (channel.type == 1) {
                        if (removeIds.indexOf(item.id) == -1) {
                            datas.push({
                                id: item.id,
                                text: item.name
                            });
                        }
                    } else {
                        datas.push({
                            id: item.id,
                            text: item.name
                        });
                    }
                });
                $(findChannel[0].text).select2({
                    data: datas
                }).select2('val', '');
            } else if (findChannel[0].type == "checkbox") {
                var fieldName = findChannel[0].text.substring(1);
                $.map(channel.list, function(item) {
                    $(findChannel[0].text).append("<input type='checkbox' name='" + fieldName + "' value='" + item.id + "' /> " + item.name + "<br/>");
                });
            }
        }

        // Source type [Mặc định là cào]
        $("#sourceTypes").select2("val", 4);
    },

    // CREATE
    displayConstructionTypes: function() {
        // Clear empty
        $('#constructionTypes').empty();
        var tmpHouseTypeId = $("#houseTypes").val();

        var tmpConstructionType = $.grep(create.constructionTypes, function(item) {
            return parseInt(item.id) == parseInt(tmpHouseTypeId);
        });

        if (typeof tmpConstructionType[0] != "undefined") {
            if (typeof tmpConstructionType[0].childs[0] != "undefined") {
                $.each(tmpConstructionType[0].childs, function(idx, item) {
                    $('<input type="radio" name="constructionTypeId" value="' + item.id + '"> ' + item.name + '<br>').appendTo("#constructionTypes");
                });
            } else {
                $('<label>Không tính chi phí xây dựng</label>').appendTo('#constructionTypes');
            }
        } else {
            $('<label>-- Vui lòng chọn [Loại nhà] --</label>').appendTo('#constructionTypes');
        }
    },

    // Check exist owner [CREATE]
    checkExistedOwner: function(isPhone) {
        showPropzyLoading();
        var postData = [];
        if (isPhone) {
            postData = {
                email: null,
                phone: $("#phone").val(),
                ownerId: null,
                type: 1
            };
        } else {
            postData = {
                email: $("#email").val(),
                phone: null,
                ownerId: null,
                type: 1
            };
        }
        $.ajax({
            url: "/lso/check-exists-owner",
            type: "POST",
            data: JSON.stringify(postData),
            success: function(response) {
                var result = "";
                if (response.result) {
                    if (typeof response.data[0] != "undefined") {
                        var table = $("<table></table>").addClass("table table-hover");
                        table.append("<thead><tr><th>#</th><th>Tên</th><th>Email</th><th>SĐT</th><th>Loại</th></tr></thead>");
                        var tbody = $("<tbody></tbody>");
                        $.map(response.data, function(item) {
                            var row = $("<tr></tr>");
                            if (item.id == 3) {
                                row.append($("<td></td>").html("<a target='_blank' href='/listing/view/" + item.id + "'>Xem chi tiết</a>"));
                            } else {
                                row.append($("<td></td>").text(""));
                            }
                            row.append($("<td></td>").text(item.name));
                            row.append($("<td></td>").text(item.email));
                            row.append($("<td></td>").text(item.phone));
                            row.append($("<td></td>").text(item.typeName));
                            tbody.append(row);
                        });
                        table.append(tbody);
                        showPropzyAlert(table);
                    } else {
                        showPropzyAlert("Không có dữ liệu");
                    }
                } else {
                    showPropzyAlert(response.message);
                }
                hidePropzyLoading();
            }
        });
    },

    checkDuplicatedAddress: function() {
        showPropzyLoading();
        var postData = {
            "id": null,
            "cityId": $("#cityId").val(),
            "districtId": $("#districtId").val(),
            "wardId": $("#wardId").val(),
            "streetId": $("#streetId").val(),
            "houseNumber": $("#houseNumber").val()
        };
        $.ajax({
            url: "/lso/check-duplicated-address",
            type: "POST",
            data: JSON.stringify(postData),
            success: function(response) {
                var result = "";
                if (response.result) {
                    var duplicatedMsg = "Địa chỉ trùng với listing: ";
                    $.map(response.data, function(item) {
                        if (item.type == 1) {
                            duplicatedMsg = duplicatedMsg + "<a target='_blank' href='/listing/view/" + item.id + "'>LID #" + item.id + "</a>,";
                        } else if (item.type == 2) {
                            duplicatedMsg = duplicatedMsg + "<a target='_blank' href='/lso/detail/" + item.id + "'>LID #" + item.id + "</a>,";
                        }
                    });
                    var newDuplicatedMsg = duplicatedMsg.substring(0, duplicatedMsg.length - 1);
                    showPropzyAlert(newDuplicatedMsg);
                } else {
                    showPropzyAlert(response.message);
                }
                hidePropzyLoading();
            }
        })
    },
    // Update owner [CREATE]
    updateOwner: function() {
        create.processUpdateOwner();
    },
    // Update listing [CREATE]
    updateListing: function() {
        // Reset
        create.processPhotos = [];
        create.processGCNPhotos = [];

        // Reset photos
        create.processPhotos = [];
        create.processGCNPhotos = [];

        if (create.uploadedImages.length > 0) {
            $.map(create.uploadedImages, function(item, i) {
                create.processPhotos.push({
                    "link": item,
                    "isPrivate": false,
                    "source": create.uploadedImagesSource[i]
                });
            });
        }
        if (create.uploadedGCNImages.length > 0) {
            $.map(create.uploadedGCNImages, function(item, i) {
                create.processGCNPhotos.push({
                    "link": item,
                    "isPrivate": false,
                    "source": create.uploadedImagesSource[i]
                });
            });
        }

        // If exists photo
        if (create.uploadNewImages.length > 0) {
            requestCallback.initCallback(3);
            create.uploadPhoto(function(response) {
                $.map(response, function(item) {
                    requestCallback.addCallbackToQueue();
                    create.processPhotos.push({
                        "link": item,
                        "isPrivate": false,
                        "source": "lso"
                    });
                });

                if (create.uploadNewGCNImages.length > 0) {
                    create.uploadGCNPhoto(function(response) {
                        requestCallback.addCallbackToQueue();
                        $.map(response, function(item) {
                            create.processGCNPhotos.push({
                                "link": item,
                                "isPrivate": false,
                                "source": "lso"
                            });
                        });
                        //create.processingData();
                        create.processUpdateListing();
                    });
                }
            });
        } else if (create.uploadNewGCNImages.length > 0) {
            requestCallback.initCallback(2);
            create.uploadGCNPhoto(function(response) {
                requestCallback.addCallbackToQueue();
                $.map(response, function(item) {
                    create.processGCNPhotos.push({
                        "link": item,
                        "isPrivate": false,
                        "source": "lso"
                    });
                });
                //create.processingData();
                create.processUpdateListing();
            });
        } else {
            requestCallback.initCallback(1);
            create.processUpdateListing();
        }

    },
    // Nút {Lưu} [CREATE]
    addRealListing: function() {
        detail.isEditFlag = true;

        // Reset photos
        create.processPhotos = [];
        create.processGCNPhotos = [];

        var isValid = true;

        // REMOVE VALIDATION
        isValid = create.validateForm();

        // Tính năng mới - 19/5/2017
        if (create.uploadedImages.length > 0) {
            $.map(create.uploadedImages, function(item) {
                create.processPhotos.push({
                    "link": item,
                    "isPrivate": false,
                    // Add source "lso" cho hình mới
                    "source": "lso",
                    "caption": "",
                });
            });
        }
        if (create.uploadedGCNImages.length > 0) {
            $.map(create.uploadedGCNImages, function(item) {
                create.processGCNPhotos.push({
                    "link": item,
                    "isPrivate": false,
                    // Add source "lso" cho hình mới
                    "source": "lso",
                    "caption": "",
                });
            });
        }

        if (isValid) {
            // If exists photo
            if (create.uploadNewImages.length > 0) {
                var totalQueue = 1 + create.uploadNewImages.length + create.uploadNewGCNImages.length;
                requestCallback.initCallback(totalQueue);
                create.processPhotoLSO();
            } else if (create.uploadNewGCNImages.length > 0) {
                requestCallback.initCallback(1 + create.uploadNewGCNImages.length);
                create.processGCNPhoto();
            } else {
                requestCallback.initCallback(1);
                create.processRealListing();
            }
        } else {
            $("#create-listing-btn").attr("disabled", false);
            hidePropzyLoading();
            $(".dashboard").fadeIn('slow');
            showPropzyAlert("Xin vui lòng kiểm tra lại dữ liệu");
            $('body').animate({
                scrollTop: 0
            }, 'slow');
        }
    },
    processPhotoLSO: function() {
        var count = 0;
        $.map(create.uploadNewImages, function(item) {
            create.uploadSinglePhoto(item, function(response) {
                requestCallback.addCallbackToQueue();
                if (typeof response.data != "undefined") {
                    create.processPhotos.push({
                        "link": response.data.file_name,
                        "isPrivate": false,
                        "source": "lso",
                        "caption": ""
                    });
                }
                count++;
                if (count == create.uploadNewImages.length) {
                    if (create.uploadNewGCNImages.length > 0) {
                        create.processGCNPhoto();
                    } else {
                        create.processRealListing();
                    }
                }
            });
        });
    },
    uploadSinglePhoto: function(item, callback) {
        var formData = new FormData();
        formData.append('file', item);
        formData.append('type', 'listing');
        $.ajax({
            url: $("#hiddenBaseApi").val() + "upload?access_token=" + $("#hiddenUserToken").val(),
            data: formData,
            type: "POST",
            contentType: false,
            cache: false,
            processData: false,
            success: function(response) {
                callback(response);
            }
        });
    },
    processGCNPhoto: function(callback) {
        var count = 0;
        $.map(create.uploadNewGCNImages, function(item) {
            create.uploadSingleGCNPhoto(item, function(response) {
                requestCallback.addCallbackToQueue();
                if (typeof response.data != "undefined") {
                    create.processGCNPhotos.push({
                        "link": response.data.file_name,
                        "isPrivate": false,
                        "source": "lso",
                        "caption": ""
                    });
                }
                count++;
                if (count == create.uploadNewGCNImages.length) {
                    create.processRealListing();
                }
            });
        });
    },
    uploadSingleGCNPhoto: function(item, callback) {
        var formData = new FormData();
        formData.append('file', item);
        formData.append('type', 'useright');
        $.ajax({
            url: $("#hiddenBaseApi").val() + "upload?access_token=" + $("#hiddenUserToken").val(),
            data: formData,
            type: "POST",
            contentType: false,
            cache: false,
            processData: false,
            success: function(response) {
                callback(response);
            }
        });
    },
    // Process update owner [CREATE]
    processUpdateOwner: function() {
        showPropzyLoading();
        var postData = {
            "ownerId": $("#hiddenOwnerId").val(),
            "name": $("#name").val(),
            "phone": $("#phone").val(),
            "email": $("#email").val(),
            "sourceId": parseInt($("#sourceTypes").val())
        }

        $.ajax({
            url: "/lso/update-owner",
            type: "POST",
            data: JSON.stringify(postData),
            success: function(response) {
                hidePropzyLoading();
                showPropzyAlert(response.message);
            }
        })
    },    
    // Process real listing [CREATE]
    processRealListing: function() {
        // Get status id
        var lsoListingStatusId = null;
        if ($.isNumeric($("#subStatusId").val())) {
            lsoListingStatusId = parseInt($("#subStatusId").val());
        } else if ($.isNumeric($("#statusId").val())) {
            lsoListingStatusId = parseInt($("#statusId").val());
        }

        // Khoảng cách đến mặt tiền đường
        var roadFrontageDistanceFrom = 0;
        var roadFrontageDistanceTo = 0;

        if ($("#roadFrontage").val()) {
            var roadFrontage = $("#roadFrontage").val().split("-");
            roadFrontageDistanceFrom = parseInt(roadFrontage[0]);
            roadFrontageDistanceTo = parseInt(roadFrontage[1]);
        }

        var owner = {
            "email": $("#email").val(),
            "name": $("#name").val(),
            "phone": $("#phone").val(),
            "sourceId": $("#sourceTypes").val()
        }

        // Địa chỉ
        // Địa chỉ
        var address = "";
        // Số nhà
        address = address + ($("#houseNumber").val()) ? $("#houseNumber").val() : " ";
        // Đường
        if ($.isNumeric($("#streetId").val())) {
            var tmpAddress = $.grep(create.streetData, function(each) {
                return each.id == parseInt($("#streetId").val());
            });
            address = address + " " + tmpAddress[0].text + ", ";
        }
        // Phường
        if ($.isNumeric($("#wardId").val())) {
            var tmpWard = $.grep(create.wardData, function(each) {
                return each.id == parseInt($("#wardId").val());
            });
            address = address + tmpWard[0].text + ", ";
        }
        // Quận
        if ($.isNumeric($("#districtId").val())) {
            var tmpDistrict = $.grep(create.districtData, function(each) {
                return each.id == parseInt($("#districtId").val());
            });
            address = address + tmpDistrict[0].text + ", ";
        }
        // TP. Hồ Chí Minh
        address = address + "TP. Hồ Chí Minh";

        // Loại công trình
        var constructions = [
            {
                "id": {
                    "houseTypeId": parseInt($("#houseTypes").val()),
                    "constructionTypeId": parseInt($("input[name=constructionTypeId]:checked").val()),
                    "materialId": null
                },
                "createdDate": null
            },
        ];

        // Đặc điểm tốt
        var selectedAdvantages = $("input[name=advantages]:checked").map(function() {
            return {
                "id": {
                    "advantageId": $(this).val()
                }
            };
        }).get();

        // Đặc điểm xấu
        var selectedDisadvantages = $("input[name=disadvantages]:checked").map(function() {
            return {
                "id": {
                    "disAdvantageId": $(this).val()
                }
            };
        }).get();

        // Chính diện
        var selectedPos = $("input[name=position]:checked").val();
        // Mặt tiền
        var position = [];
        if (selectedPos == 1) {
            position = {
                alleyWidth: Number($("div.mat-tien").find("#alleyWidth").val()),
                haveBeSide: ($("#haveBeSide-facade:checkbox:checked").val()) ? true : false,
                position: 1,
                roadFrontageWidth: ($("#haveBeSide-facade:checkbox:checked").val()) ? Number($("div#chi-tiet-mat-tien").find("#roadFrontageWidth").val()) : 0,
                widthValue: ($("#haveBeSide-facade:checkbox:checked").val()) ? Number($("div#chi-tiet-mat-tien").find("#widthValue").val()) : 0
            };
        }
        // Trong hẻm
        else if (selectedPos == 2) {
            position = {
                alleyWidth: Number($("div.trong-hem").find("#alleyWidth").val()),
                haveBeSide: ($("#haveBeSide-alley:checkbox:checked").val()) ? true : false,
                position: 2,
                roadFrontageWidth: null,
                widthValue: ($("#haveBeSide-alley:checkbox:checked").val()) ? Number($("div#chi-tiet-hem").find("#widthValue").val()) : 0
            };
        }

        var postData = {
            "address": address,
            "bathRooms": $("#bathRooms").val(),
            "bedRooms": $("#bedRooms").val(),
            "cityId": parseInt($("#cityId").val()),
            "commissionText": $("#commissionText").val(),
            "depositText": $("#depositText").autoNumeric("get"),
            "districtId": parseInt($("#districtId").val()),
            "floorSize": $("#floorSize").val(),
            "houseNumber": $("#houseNumber").val(),
            "isGuaranteed": ($("#isGuaranteed:checkbox:checked").val() == '1') ? true : false,
            "isVAT": $("#isVAT").val(),
            "latitude": $("#latitude").val(),
            "listingTypeId": parseInt($("#propertyTrans").val()),
            "longitude": $("#longitude").val(),
            "lotSize": $("#lotSize").val(),
            "minContractDeadline": $("#minContractDeadline").val(),
            "minPrice": $("#minPrice").autoNumeric("get"),
            "moveInDate": $("#moveInDate").val(),
            // "noteForLs": CKEDITOR.instances.noteForLs.getData(),
            "noteForLs": $("#noteForLs").val(),
            "numberFloor": $("#numberFloor").val(),
            "photo": JSON.stringify(create.processPhotos),
            "photoGcn": JSON.stringify(create.processGCNPhotos),
            "price": $("#price").autoNumeric("get"),
            "propertyTypeId": parseInt($("#propertyTypes").val()),
            "roadFrontageDistanceFrom": roadFrontageDistanceFrom,
            "roadFrontageDistanceTo": roadFrontageDistanceTo,
            "sizeLength": $("#sizeLength").val(),
            "sizeWidth": $("#sizeWidth").val(),
            "streetId": parseInt($("#streetId").val()),
            "statusId": lsoListingStatusId,
            // "createdDate": null,
            // "updatedDate": null,
            "useRightTypeId": parseInt($("#rightTypes").val()),
            "wardId": parseInt($("#wardId").val()),
            "owner": owner,
            "position": position,
            "constructions": constructions,
            "advantages": selectedAdvantages,
            "disadvantages": selectedDisadvantages,
            // Tính năng mới - 17/05/2017
            "assignedTo": parseInt($("#assignedTo").val()),
            // Đơn giá mặt tiền đường
            "roadPrice": $("#priceStreetFrontage").autoNumeric('get') ? $("#priceStreetFrontage").autoNumeric('get') : null,
        };
        // console.log(postData);
        $.ajax({
            url: "/lso/create-lso",
            type: "POST",
            data: JSON.stringify(postData),
            success: function(response) {
                $("#create-listing-btn").attr("disabled", false);
                requestCallback.addCallbackToQueue();
                if (response.result) {
                    showPropzyAlert("Thao tác thành công. Đang tải dữ liệu..");
                    $("#create-listing-btn").prop("disabled", true);
                    // Get respone id
                    var lid = response.data.id;

                    if ($.isNumeric(lid)) {
                        setTimeout(function() {
                            window.location.replace('/lso/detail/' + lid);
                        }, 1000);
                    }
                } else {
                    showPropzyAlert(response.message);
                }
            }
        });
    },
    sendDIY: function() {
        showPropzyLoading();
        $.ajax({
            url: "/lso/send-diy",
            data: {
                id: $("#hiddenId").val()
            },
            type: "GET",
            success: function(response) {
                hidePropzyLoading();
                showPropzyAlert(response.message);
                if (response.result) {
                    setTimeout(function() {
                        window.location.replace("/lso/detail/" + response.data.id);
                    }, 1000);
                }
            }
        });
    },
    unlock: function() {
        showPropzyLoading();
        $.ajax({
            url: "/lso/unlock",
            data: {
                id: $("#hiddenId").val()
            },
            type: "GET",
            success: function(response) {
                hidePropzyLoading();
                showPropzyAlert(response.message);
            }
        });
    },

    // COMMON FUNCTIONS
    // Show & Hide selector
    displayElements: function(element) {
        var elements = ["#chi-tiet-mat-tien", "#chi-tiet-hem", "#unlock-btn", "#lock-btn", "#diy-btn"];
        $.map(elements, function(item) {
            if (element == item) {
                $(item).show();
            } else {
                $(item).hide();
            }
        })
    },

    // Construct select2
    initSelect2Construct: function(data, selector, defaultSelector) {
        var materials = [];
        $.map(data, function(item) {
            materials.push({
                id: item.id,
                text: item.name
            });
        });
        $(selector).select2({
            data: materials
        }).select2('val', $(defaultSelector).val());
    },
    initFormField: function() {
        // Clear error
        $(".phone-error").html("");
        $(".propertyTrans-error").html("");
        $(".propertyTypes-error").html("");
        $(".cityId-error").html("");
        $(".districtId-error").html("");
        $(".wardId-error").html("");
        $(".streetId-error").html("");
        $(".houseNumber-error").html("");
        $(".price-error").html("");
        $(".commissionText-error").html("");
        $(".bedRooms-error").html("");
        $(".bathRooms-error").html("");
        $(".image-list-error").html("");
        $(".gcn-image-list-error").html("");
        $(".advantages-error").html("");
        $(".disadvantages-error").html("");
        // $(".isGuaranteed-error").html("");
    },
    // VALIDATE [Create]
    validateForm: function() {
        var isValid = true;
        create.initFormField();

        // Phone
        var phone = $("#phone").val();
        if (!phone) {
            isValid = false;
            $(".phone-error").html("<code>Số điện thoại không hợp lệ.  Chỉ cho phép nhập số</code>");
        }

        if (!isValidPhone(phone)) {
            isValid = false;
            $(".phone-error").html("<code>Số điện thoại không hợp lệ.  Chỉ cho phép nhập số</code>");
        }        

        return isValid;
    },
    // SHOW POPUP
    showPopupMeeting: function() {
        // Init datepicker
        $("#meeting-time").datepicker();
        $("#meeting-modal").modal('show');
    },
    showSubStatus: function() {
        $("#subStatusId").empty();
        $("#subStatusId").select2({
            data: create.subStatusIds
        });
    },
    getLsMembers: function(callback) {
        $.ajax({
            url: "/lso/get-lso-members",
            type: "GET"
        }).done(function(response) {
            callback(response);
        });
    },
};

// LSO Meeting
var meeting = {
    init: function() {
        requestCallback.initCallback(1);
        // Init datepicker
        $("#meeting-date").datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true
        });
        $("#meeting-time").timepicker();
        $("#meeting-modal").modal('show');
        $("#meetingNote").val("");

        // Init lay danh sach nhan vien (1)
        meeting.getLsoMembers(function(response) {
            requestCallback.addCallbackToQueue();
            if (response.result) {
                var members = [];
                $.map(response.data, function(item) {
                    members.push({
                        id: item.userId,
                        text: item.name
                    });
                });
                $("#meeting-lso-members").select2({
                    data: members
                }).select2('val', $("#hiddenLoggedInUserId").val(), false);
            }
        });
        // Note
        // CKEDITOR.replace('meetingNote');
    },
    createMeeting: function() {
        if (meeting.validateMeeting()) {
            showPropzyLoading();
            meeting.createListingMeeting(function(response) {
                hidePropzyLoading();
                showPropzyAlert(response.message);
                if (response.result) {
                    $("#meeting-modal").modal('hide');
                    meeting.resetFormState();
                }
            });
        }
    },
    createListingMeeting: function(callback) {
        var startDate = $("#meeting-date").val() + " " + $("#meeting-time").val();
        var formatStartDate = moment(startDate, 'DD/MM/YYYY hh:mm A').valueOf();
        var postData = {
            "id": null,
            "address": $("#meeting-address").val(),
            "assignedTo": parseInt($("#meeting-lso-members").val()),
            "lsoId": parseInt($("#hiddenId").val()),
            "startDate": formatStartDate,
            "meetingTime": 30,
            "note": $.trim($("#meetingNote").val()),
        }

        $.ajax({
            url: "/lso/create-listing-meeting",
            type: "POST",
            data: JSON.stringify(postData)
        }).done(function(response) {
            callback(response);
        });
    },
    getLsoMembers: function(callback) {
        $.ajax({
            url: "/lso/get-lso-members",
            type: "GET",
            success: function(response) {
                callback(response);
            }
        });
    },
    validateMeeting: function() {
        // Reset form state
        meeting.resetFormState('validate');
        var isValid = true;
        var listFields = [{
                id: "#meeting-date",
                field: "text",
                type: "empty",
                message: "Xin vui lòng nhập ngày"
            },
            {
                id: "#meeting-time",
                field: "text",
                type: "empty",
                message: "Xin vui lòng nhập giờ"
            },
            {
                id: "#meeting-address",
                field: "text",
                type: "empty",
                message: "Xin vui lòng nhập địa chỉ"
            },
            {
                id: "#meeting-lso-members",
                field: "text",
                type: "empty",
                message: "Xin vui lòng chọn nhân viên LSO"
            },
            {
                id: "#meetingNote",
                field: "text",
                type: "empty",
                message: "Xin vui lòng nhập ghi chú"
            },
        ];
        // Validate
        $.map(listFields, function(item) {
            if (item.type == "empty") {
                switch (item.field) {
                    case "text":
                        if (!$.trim($(item.id).val())) {
                            isValid = false;
                            $(item.id).parent().append("<code>" + item.message + "</code>");
                            $(item.id).css("border-color", "red");
                        }
                        break;
                    case "textarea":
                        if (item.id == "#meetingNote") {
                            if ($("#meetingNote").val() == "") {
                                isValid = false;
                                $(item.id).css("border-color", "red");
                                $(item.id).parent().append("<code>" + item.message + "</code>");
                            }
                        }
                        break;
                }
            }
        });
        return isValid;
    },
    resetFormState: function(type) {
        // Reset khi validate
        // Clear het error, border-color
        if (type == "validate") {
            $("#lso-meeting-form").find("code").remove();
            $("#lso-meeting-form").find("input,textarea").css("border-color", "");
        } else {
            // Clear form state
            $("#lso-meeting-form").find("input,textarea").css("border-color", "");
            $("#lso-meeting-form").find("input,textarea").val("");
            $("#lso-meeting-form").find("code").remove();
        }

    }
};


var reminder = {
    callReminder: function() {
        requestCallback.initCallback(2);

        // Load tiêu đề
        // reminder.getReminderWorkTypes(function(response) {
        //     requestCallback.addCallbackToQueue();
        //     if (response.result) {
        //         var workTypes = [];
        //         $.map(response.data, function(item) {
        //             workTypes.push({id: item.workTypeId, text: item.name});
        //         });
        //         $("#reminderWorkTypes").select2({data: workTypes});
        //     }
        // });

        // Load channel types (1)
        reminder.getReminderChannelTypes(function(response) {
            requestCallback.addCallbackToQueue();
            if (response.result) {
                $.map(response.data, function(item) {
                    if (item.type == 8) {
                        reminder.createSelect2Field(item.list, "#reminderWorkTypes", "");
                    }
                })
            }
        });

        // Load channel type (2)
        reminder.getReminderChannelStatus(function(response) {
            requestCallback.addCallbackToQueue();
            if (response.result) {
                $.map(response.data, function(item) {
                    if (item.type == 3) {
                        reminder.createSelect2Field(item.list, "#reminderStatus", "");
                    }
                })
            }
        })

        // Nhân viên LSO (3)
        meeting.getLsoMembers(function(response) {
            requestCallback.addCallbackToQueue();
            if (response.result) {
                var members = [];
                $.map(response.data, function(item) {
                    members.push({
                        id: item.userId,
                        text: item.name
                    });
                });
                $("#reminderLsoMembers").select2({
                    data: members
                }).select2('val', $("#hiddenLoggedInUserId").val(), false);
            }
        });

        // Load status
        // reminder.getReminderStatus(function(response) {
        //     requestCallback.addCallbackToQueue();
        //     if (response.result) {
        //         var statuses = [];
        //         $.map(response.data, function(item) {
        //             statuses.push({id: item.statusId, text: item.name});
        //         });
        //         $("#reminderStatus").select2({data: statuses});
        //     }
        // });

        // Show Reminder
        // Chuẩn bị Reminder
        $("#reminderDate").datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true
        });
        $("#reminderTime").timepicker();
        $("#reminder-modal").modal("show");
        $("#isReminder").val(1);
        $("#reminderNote").val("");
        //reminder.callNotify(3000);
    },
    insertReminder: function() {
        if (reminder.isValidate()) {
            showPropzyLoading();
            reminder.createReminder(function(response) {
                hidePropzyLoading();
                showPropzyAlert(response.message);
                if (response.result) {
                    $("#reminder-modal").modal("hide");
                    // setTimeout(function() {
                    //     window.location.replace('/lso/detail/'+$("#hiddenId").val());
                    // }, 2000);
                    // Clear state
                    $("#lso-reminder-form").find("input,textarea").val("");
                    $("#lso-reminder-form").find("input,textarea").css("border-color", "");
                    $("#reminderTimeError").html("");
                    $("#reminderDateError").html("");
                    $("#reminderNoteError").html("");
                }
            });
        }
    },
    isValidate: function() {
        // Clear state
        $("#reminderTimeError").html("");
        $("#reminderDateError").html("");
        $("#reminderNoteError").html("");
        //
        var isValid = true;
        if ($("input[name=isReminder]:checked").val() == 1) {
            // Check reminderMinute (bắt buộc nhập)
            if (!$("#reminderMinute").val()) {
                isValid = false;
                $("#reminderTimeError").html("<code>Xin vui lòng nhập số phút</code>");
            }
        }
        if (!$("#reminderDate").val()) {
            isValid = false;
            $("#reminderDateError").html("<code>Xin vui lòng nhập ngày</code>");
        }
        if (!$.trim($("#reminderNote").val())) {
            isValid = false;
            $("#reminderNoteError").html("<code>Xin vui lòng nhập nội dung</code>");
        }
        return isValid;
    },
    // Xu ly select2
    createSelect2Field: function(list, selector, selected) {
        var arrValues = [];
        $.map(list, function(item) {
            arrValues.push({
                id: item.id,
                text: item.name
            });
        });
        $(selector).select2({
            data: arrValues
        }).select2('val', selected);
    },
    // Load tiêu đề
    getReminderWorkTypes: function(callback) {
        $.ajax({
            url: "/lso/get-reminder-work-types",
            type: "GET"
        }).done(function(response) {
            callback(response);
        });
    },
    getReminderStatus: function(callback) {
        $.ajax({
            url: "/lso/get-reminder-status",
            type: "GET"
        }).done(function(response) {
            callback(response);
        });
    },
    getReminderMeeting: function(callback) {
        $.ajax({
            url: "/lso/get-reminder-meeting",
            type: "GET"
        }).done(function(response) {
            callback(response);
        });
    },
    getReminderChannelTypes: function(callback) {
        $.ajax({
            url: "/lso/getChannelTypes",
            type: "GET"
        }).done(function(response) {
            callback(response);
        })
    },
    getReminderChannelStatus: function(callback) {
        $.ajax({
            url: "/lso/getStatusList",
            type: "GET"
        }).done(function(response) {
            callback(response);
        });
    },
    createReminder: function(callback) {
        var startDate = $("#reminderDate").val() + " " + $("#reminderTime").val();
        var formatStartDate = moment(startDate, 'DD/MM/YYYY hh:mm A').valueOf();

        var postData = {
            "id": null,
            "assignedTo": parseInt($("#reminderLsoMembers").val()),
            "isReminder": ($("input[name=isReminder]:checked").val() == 1) ? true : false,
            "note": $.trim($("#reminderNote").val()),
            "reminderDate": formatStartDate,
            "lsoId": parseInt($("#hiddenId").val()),
            "reminderTime": ($("input[name=isReminder]:checked").val() == 1) ? parseInt($("#reminderMinute").val()) : 30,
            "statusId": parseInt($("#reminderStatus").val()),
            "workTypeId": parseInt($("#reminderWorkTypes").val())
        };

        $.ajax({
            url: "/lso/create-reminder",
            type: "POST",
            data: JSON.stringify(postData)
        }).done(function(response) {
            callback(response);
        });
    }
};
/**
 * AJAX Callbacks
 */
var requestCallback = {
    // Queue callbacks (5)
    numOfQueue: 0,
    countQueue: 0,
    initCallback: function(numOfQueue) {
        // $(".dashboard").fadeOut();
        requestCallback.numOfQueue = numOfQueue;
        requestCallback.countQueue = 0;
        showPropzyLoading();
    },
    // sendRequest: function() {
    //     requestCallback.numOfQueue++;
    // },
    addCallbackToQueue: function() {
        requestCallback.countQueue++;
        if (requestCallback.numOfQueue == requestCallback.countQueue) {
            setTimeout(function() {
                detail.isEditFlag = false;
            }, 1000);            
            // $(".dashboard").fadeIn('slow');
            hidePropzyLoading();
        }
    }
};
