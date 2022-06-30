$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});

var crawlers = {
    // Init values
    crawlerListings: [],
    crawlerDatas: [],
    lsoFilter: {
        "statusId": null,
    },
    lsoDupIds: [],
    statuses: [],
    // For editing directly in list
    crawlerId: "",
    crawlerStatusId: "",
    crawlerNote: "",
    // Permission
    editPerm: false,
    crawlerNoteLso: "",
    crawlerHouseNumber: "",
    
    // Cho edit phường, quận, đường
    crawlerListWards: [],
    crawlerListStreets: [],
    crawlerWard: "",
    crawlerDistrict: "",
    crawlerStreet: "",

    init: function() {
        CKEDITOR.replace('note');

        requestCallback.initCallback(2);
        crawlers.getStatusList(function(response) {
            requestCallback.addCallbackToQueue();
            if (response.result) {
                $.map(response.data, function(item) {
                    // Prepare data into statuses
                    crawlers.statuses.push({
                        id: item.statusId,
                        text: item.statusName
                    });
                });
                $("#statusId").select2({
                    data: crawlers.statuses
                });

                // Lấy phường
                
                
                // Lấy đường

                // Danh sách status
                if ($("#hiddenEditPerm").val() == 1) {
                    crawlers.getCrawlers();
                } else {
                    crawlers.getLimitCrawlers();
                }
            }
        });
    },
    // Danh sách Crawlers
    getCrawlers: function() {
        try {
            crawlers.crawlerListings.destroy();
        } catch (Ex) {}

        var lsoAjax = "/lso/get-crawlers?";
        for (var property in crawlers.lsoFilter) {
            if (crawlers.lsoFilter.hasOwnProperty(property)) {
                lsoAjax += property + "=" + crawlers.lsoFilter[property] + "&";
            }
        }
        lsoAjax = lsoAjax.slice(0, -1);

        crawlers.crawlerListings = $('#crawlerListings').on('processing.dt', function(e, settings, processing) {
            if (processing) {
                showPropzyLoading();
            } else {
                hidePropzyLoading();
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
                    data: "createdDate",
                    render: crawlers.renderCreatedDate
                },
                {
                    data: "crawlerName",
                    render: crawlers.renderCrawlerName
                },
                {
                    data: "ownerName",
                    render: crawlers.renderOwnerName
                },
                {
                    data: "phone",
                    render: crawlers.renderPhone
                },
                {
                    data: "address",
                    render: crawlers.renderAddress
                },
                {
                    data: "price",
                    render: crawlers.renderPrice
                },
                {
                    data: "statusName",
                    render: crawlers.renderStatusName
                },
                // {
                //     data: "lsName",
                //     render: crawlers.renderLsName
                // },
                {
                    data: "link",
                    render: crawlers.renderLink
                },
                {
                    data: "isDuplicated",
                    render: crawlers.renderIsDuplicated
                },
                {
                    data: "note",
                    render: crawlers.renderNote
                },
                {
                    data: "noteLso",
                    render: crawlers.renderNoteLso
                },
                {
                    data: "editLso",
                    render: crawlers.renderEditLso
                },
            ],
            "initComplete": function(settings, json) {
                $.map(json.data, function(item) {
                    // Push item to array
                    crawlers.crawlerDatas.push(item);
                    // Check item is duplicated
                    if (typeof item.listingExist[0] != "undefined") {
                        var listIds = [];
                        $.map(item.listingExist, function(smallItem) {
                            listIds.push({
                                id: smallItem.id,
                                type: smallItem.type
                            });
                        })
                        crawlers.lsoDupIds.push({
                            id: item.id,
                            items: listIds,
                        });
                    }
                });
                crawlers.crawlerListings.$('tr').tooltip({
                    "delay": 0,
                    "track": true,
                    "fade": 250
                });

                requestCallback.addCallbackToQueue();
            },
            "fnCreatedRow": function(row, data, index) {},
        });
    },

    // Danh sách crawlers (limited) 
    // Cho nhân viên có quyền hạn <Update> DENIED
    getLimitCrawlers: function() {
        try {
            crawlers.crawlerListings.destroy();
        } catch (Ex) {}

        var lsoAjax = "/lso/get-crawlers?";
        for (var property in crawlers.lsoFilter) {
            if (crawlers.lsoFilter.hasOwnProperty(property)) {
                lsoAjax += property + "=" + crawlers.lsoFilter[property] + "&";
            }
        }
        lsoAjax = lsoAjax.slice(0, -1);

        crawlers.crawlerListings = $('#crawlerListings').on('processing.dt', function(e, settings, processing) {
            if (processing) {
                showPropzyLoading();
            } else {
                hidePropzyLoading();
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
                    data: "createdDate",
                    render: crawlers.renderCreatedDate
                },
                {
                    data: "crawlerName",
                    render: crawlers.renderCrawlerName
                },
                {
                    data: "ownerName",
                    render: crawlers.renderOwnerName
                },
                {
                    data: "phone",
                    render: crawlers.renderPhone
                },
                {
                    data: "address",
                    render: crawlers.renderAddress
                },
                {
                    data: "price",
                    render: crawlers.renderPrice
                },
                {
                    data: "statusName",
                    render: crawlers.renderStatusName
                },
                // {
                //     data: "lsName",
                //     render: crawlers.renderLsName
                // },
                {
                    data: "link",
                    render: crawlers.renderLink
                },
                {
                    data: "isDuplicated",
                    render: crawlers.renderIsDuplicated
                },
                {
                    data: "note",
                    render: crawlers.renderNote
                },
                // {
                //     data: "noteLso",
                //     render: crawlers.renderNoteLso
                // },
                // {
                //     data: "editLso",
                //     render: crawlers.renderEditLso
                // },
            ],
            "initComplete": function(settings, json) {
                $.map(json.data, function(item) {
                    // Push item to array
                    crawlers.crawlerDatas.push(item);
                    // Check item is duplicated
                    if (typeof item.listingExist[0] != "undefined") {
                        var listIds = [];
                        $.map(item.listingExist, function(smallItem) {
                            listIds.push({
                                id: smallItem.id,
                                type: smallItem.type
                            });
                        })
                        crawlers.lsoDupIds.push({
                            id: item.id,
                            items: listIds,
                        });
                    }
                });
                crawlers.crawlerListings.$('tr').tooltip({
                    "delay": 0,
                    "track": true,
                    "fade": 250
                });

                requestCallback.addCallbackToQueue();
            },
            "fnCreatedRow": function(row, data, index) {},
        });
    },

    // Tình trạng
    getStatusList: function(callback) {
        $.ajax({
            url: "/lso/get-status-lso-list",
            type: "GET",
        }).done(function(response) {
            callback(response);
        });
    },

    loadWardWithDistrict: function() {
        // Clear Ward
        crawlers.crawlerListWards = [{
            id: "",
            text: "--Phường--"
        }];
        $("#crawlerWard").empty();

        // Start..
        showPropzyLoading();

        // Load Ward
        crawlers.loadWard(function(response) {
            $.map(response, function(item) {
                crawlers.crawlerListWards.push({
                    id: item.wardId,
                    text: item.wardName
                });
            });
            $("#crawlerWard").select2({
                data: crawlers.crawlerListWards
            });

            if ($.isNumeric(crawlers.crawlerWard)) {
                $("#crawlerWard").select2("val", crawlers.crawlerWard);
            }
            hidePropzyLoading();
        });
    },

    // Load Ward
    loadWard: function(callback) {
        if ($.isNumeric(crawlers.crawlerDistrict)) {
            $.ajax({
                url: "/common/get-ward/" + crawlers.crawlerDistrict,
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
        // Reset state..
        crawlers.crawlerListStreets = [{
            id: "",
            text: "--Đường--"
        }];
        $("#crawlerStreet").empty();
        // Start..
        showPropzyLoading();
        crawlers.loadStreet(function(response) {
            $.map(response.data, function(item) {
                crawlers.crawlerListStreets.push({
                    id: item.streetId,
                    text: item.streetName
                });
            })
            $("#crawlerStreet").select2({
                data: crawlers.crawlerListStreets
            });

            if ($.isNumeric(crawlers.crawlerStreet)) {
                $("#crawlerStreet").select2("val", crawlers.crawlerStreet);
            }
            hidePropzyLoading();
        });
    },

    // Load Street
    loadStreet: function(callback) {
        if ($.isNumeric(crawlers.crawlerWard)) {
            $.ajax({
                url: "/zone/get-streets/" + crawlers.crawlerWard,
                type: "GET"
            }).done(function(response) {
                callback(response);
            });
        } else {
            hidePropzyLoading();
        }
    },

    ///// listing render columns /////
    renderCreatedDate: function(data, type, object) {
        return moment(object.createdDate).format("DD/MM/YYYY");
    },
    renderCrawlerName: function(data, type, object) {
        return object.crawlerName;
    },
    renderOwnerName: function(data, type, object) {
        return object.ownerName;
    },
    renderPhone: function(data, type, object) {
        return object.phone;
    },
    renderAddress: function(data, type, object) {
        return object.address;
    },
    renderPrice: function(data, type, object) {
        if (!object.price) {
            return "";
        }
        return formatCurrency(object.price, ',', '.', ' đ');
    },
    renderStatusName: function(data, type, object) {
        if ($("#hiddenEditPerm").val() == 1) {
            return crawlers.createStatusList(object.id, object.districtId, object.wardId, object.streetId, object.statusId);
        } else {
            return object.statusName;
        }
    },
    renderLsName: function(data, type, object) {
        return object.lsName;
    },
    renderLink: function(data, type, object) {
        if (!object.link) {
            return "";
        }
        return "<a target='_blank' href='" + object.link + "'>" + object.link + "</a>";
    },
    renderIsDuplicated: function(data, type, object) {
        if (typeof object.listingExist[0] !== "undefined") {
            return '<a class="duplicated-lid" data-id="' + object.id + '" href="#" onclick="crawlers.checkDuplicatedCrawler(event,' + object.id + ')">LID trùng</a>';
        } else {
            return "N/A";
        }
    },
    renderNote: function(data, type, object) {
        if (!object.note || object.note == "") {
            return "";
        } else {
            return "<div title='Click vào dữ liệu để xem chi tiết' class='crawlerNoteView' data-note='" + object.note + "'>" + shortenInputStr(object.note) + "</div>";
        }
    },
    renderNoteLso: function(data, type, object) {
        if ($("#hiddenEditPerm").val() == 1) {
            if (!object.noteLso || object.noteLso == "") {
                return "<div title='Click vào dữ liệu để chỉnh sửa' class='crawlerNoteLso' data-id='" + object.id + "' data-statusId='" + object.statusId + "' data-note='" + object.noteLso + "' data-house-number='" + object.houseNumber + "'><button type='button' class='btn btn-xs btn-default btn-lg'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button></div>";
            } else {
                return "<div title='Click vào dữ liệu để chỉnh sửa' class='crawlerNoteLso' data-id='" + object.id + "' data-statusId='" + object.statusId + "' data-note='" + object.noteLso + "' data-house-number='" + object.houseNumber + "'>" + shortenInputStr(object.noteLso) + "</div>";
            }
        } else {
            return "";
        }
    },
    renderEditLso: function(data, type, object) {
        if ($("#hiddenEditPerm").val() == 1) {
            return "<button data-id='" + object.id + "' class='edit-crawler btn btn-xs btn-primary'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button>";
        } else {
            return "";
        }
    },
    // Search
    processSearch: function() {
        crawlers.lsoFilter.statusId = $("#statusId").val();
        if (typeof $("#statusId").val() !== 'undefined') {
            crawlers.lsoFilter.statusId = $("#statusId").val();
        }
        // Re-display LSO Listings
        if ($("#hiddenEditPerm").val() == 1) {
            crawlers.getCrawlers();
        } else {
            crawlers.getLimitCrawlers();
        }
    },
    checkDuplicatedCrawler: function(e, id) {
        e.preventDefault();
        if (typeof crawlers.lsoDupIds[0] != "undefined") {
            $.map(crawlers.lsoDupIds, function(item) {
                if (parseInt(item.id) == id) {
                    var duplicatedMsg = "Danh sách LID trùng: ";
                    $.map(item.items, function(subItem) {
                        if (subItem.type == 1) {
                            duplicatedMsg = duplicatedMsg + "<a target='_blank' href='/listing/view/" + subItem.id + "'>LID #" + subItem.id + "</a>,";
                        } else if (subItem.type == 2) {
                            duplicatedMsg = duplicatedMsg + "<a target='_blank' href='/lso/detail/" + subItem.id + "'>LID #" + subItem.id + "</a>,";
                        }
                    });
                    var newDuplicatedMsg = duplicatedMsg.substring(0, duplicatedMsg.length - 1);
                    $(".duplicated-lid").each(function() {
                        if ($(this).data('id') == id) {
                            $("#duplicated-crawler-detail").html(newDuplicatedMsg);
                            $("#duplicated-modal").modal('show');
                        }
                    });
                }
            });
        }
        return false;
    },
    // Create status list
    createStatusList: function(id, districtId, wardId, streetId, selectedId) {
        var select2Statuses = "<select class='crawlerStatus form-control' data-id='" + id + "' data-district-id='" + districtId + "' data-ward-id='" + wardId + "' data-street-id='" + streetId + "'>";
        $.map(crawlers.statuses, function(item) {
            var selected = "";
            if (item.id == selectedId) {
                selected = "selected";
            }
            select2Statuses = select2Statuses + "<option value='" + item.id + "' " + selected + ">" + item.text + "</option>";
        });
        select2Statuses = select2Statuses + "</select>";
        return select2Statuses;
    },
    updateCrawler: function(callback) {
        var postData = {
            id: parseInt(crawlers.crawlerId),
            statusId: parseInt(crawlers.statusId),
            noteLSO: CKEDITOR.instances.note.getData(),
            wardId: parseInt(crawlers.crawlerWard),
            streetId: parseInt(crawlers.crawlerStreet),
            houseNumber: crawlers.crawlerHouseNumber
        };
        $.ajax({
            url: "/lso/update-crawler",
            type: "POST",
            data: JSON.stringify(postData)
        }).done(function(response) {
            callback(response);
        });
    },
    updateCrawlerNote: function() {
        var confirmChangeNote = confirm("Bạn có muốn cập nhật nội dung cho note LSO ?");

        var allowUpdate = false;
        if (confirmChangeNote) {
            // Show popup
            $("#edit-note-modal").modal("show");
        } else {
            showPropzyLoading();
            crawlers.updateCrawler(function(response) {
                hidePropzyLoading();
                showPropzyAlert(response.message);
                if (response.result) {
                    // Reload datatables
                    crawlers.crawlerListings.ajax.reload();
                }
            })
        }
    },
    editCrawlerAddr: function() {
        // Prepare fields
        crawlers.loadWardWithDistrict();
        crawlers.loadStreetWithWard();

        // Show modal
        $("#edit-house-modal").modal("show");
    }
};

/**
 * AJAX Callbacks
 */
var requestCallback = {
    // Queue callbacks
    numOfQueue: 0,
    countQueue: 0,
    initCallback: function(numOfQueue) {
        requestCallback.numOfQueue = numOfQueue;
        requestCallback.countQueue = 0;
        showPropzyLoading();
    },
    addCallbackToQueue: function() {
        requestCallback.countQueue++;
        if (requestCallback.numOfQueue == requestCallback.countQueue) {
            hidePropzyLoading();
        }
    }
};


$(function() {
    // Init
    crawlers.init();

    // Tình trạng
    $("#statusId").on("change", function() {
        crawlers.processSearch();
    });

    // Search
    $("button#search-listing-action").click(function() {
        crawlers.processSearch();
    });

    // Mở form tạo Crawler
    $("#create-crawler").click(function() {
        window.location.replace("/lso/crawler");
    });

    // Edit crawler
    $("body").on("click", ".edit-crawler", function() {
        var lid = $(this).data('id');
        if ($.isNumeric(lid)) {
            window.location.replace('/lso/crawler/' + lid);
        } else {
            showPropzyAlert("Xin vui lòng kiểm tra dữ liệu nhập");
        }
    });

    // Popup edit note LSO
    $("body").on("click", ".crawlerNoteLso", function() {
        // Save temporary data
        crawlers.crawlerId = $(this).data('id');
        crawlers.statusId = $(this).data('statusid');

        CKEDITOR.instances['note'].setData($(this).data('note').trim());
        $("#edit-note-modal").modal("show");
    });

    // Popup view note LSO
    $("body").on("click", ".crawlerNoteView", function() {
        $("#view-note").html($(this).data('note').trim());
        $("#show-note-modal").modal("show");
    });

    // Popup save note LSO
    $("body").on("click", "#save-listing-note-btn", function(e) {
        showPropzyLoading();
        e.preventDefault();
        // validate
        var isValidate = false;

        if (CKEDITOR.instances.note.getData()) {
            isValidate = true;
        }

        // Process update..
        if (isValidate) {
            crawlers.updateCrawler(function(response) {
                hidePropzyLoading();
                showPropzyAlert(response.message);
                if (response.result) {
                    $("#edit-note-modal").modal("hide");
                    // Reload datatables
                    crawlers.crawlerListings.ajax.reload();
                }
            })
        } else {
            hidePropzyLoading();
            showPropzyAlert("Note không được bỏ trống!");
        }
    });

    // Popup save status
    $("body").on("change", ".crawlerStatus", function(e) {
        e.preventDefault();
        // console.log($(this).val());

        $("#note").val("");
        $("#crawlerHouseNumber").val("");

        var selectStatus = "";
        for (i = 0; i < crawlers.statuses.length; i++) {
            if (crawlers.statuses[i].id == parseInt($(this).val())) {
                selectStatus = crawlers.statuses[i];
            }
        }
        // DEBUG
        // console.log(selectStatus);

        if (typeof selectStatus.id != "undefined") {
            var confirmChange = confirm("Bạn có muốn chuyển trạng thái sang " + selectStatus.text + " ?");

            if (confirmChange) {
                var isValidate = false;

                var sltCrawlerId = parseInt($(this).data('id'));
                var sltCrawlerDistrict = $.isNumeric($(this).data('district-id')) ? parseInt($(this).data('district-id')) : "";
                var sltCrawlerWard = $.isNumeric($(this).data('ward-id')) ? parseInt($(this).data('ward-id')) : "";
                var sltCrawlerStreet = $.isNumeric($(this).data('street-id')) ? parseInt($(this).data('street-id')) : "";

                // Check note LSO
                crawlers.crawlerNoteLso = "";
                crawlers.crawlerId = sltCrawlerId;
                crawlers.statusId = selectStatus.id;
                // Thêm field phường, đường, số nhà
                crawlers.crawlerDistrict = sltCrawlerDistrict;
                crawlers.crawlerWard = sltCrawlerWard;
                crawlers.crawlerStreet = sltCrawlerStreet;
                crawlers.crawlerHouseNumber = "";

                $(".crawlerNoteLso").each(function(i, obj) {
                    if ($(this).data('id') == sltCrawlerId) {
                        crawlers.crawlerNoteLso = $(this).data('note');
                        crawlers.crawlerHouseNumber = $(this).data('house-number');
                        return false;
                    }
                });

                CKEDITOR.instances['note'].setData(crawlers.crawlerNoteLso);

                // DEBUG
                // console.log(crawlers.crawlerHouseNumber);

                // List of restricted status
                // Không hợp tác (5), Hủy (6)
                var restrictStatuses = [5,6];
                if (hasValue(crawlers.crawlerHouseNumber) || $.inArray(crawlers.statusId, restrictStatuses) != -1) {
                    crawlers.updateCrawlerNote();
                } else {
                    // Hide note modal
                    $("#edit-note-modal").modal("hide");
                    // Display edit address modal
                    crawlers.editCrawlerAddr();
                }
            } else {
                // Reload
                crawlers.crawlerListings.ajax.reload();
            }
        }
    });

    $("body").on("click", "#save-listing-house-number-btn", function(e) {
        e.preventDefault();
        // New code
        var isValid = true;
        var errorMsg = "";

        let fields = [
            {
                id: "#crawlerWard",
                rule: "numeric",
                message: "Phường không hợp lệ"
            },
            {
                id: "#crawlerStreet",
                rule: "numeric",
                message: "Đường không hợp lệ"
            },
            {
                id: "#crawlerHouseNumber",
                rule: "empty",
                message: "Số nhà không hợp lệ"
            }
        ];

        $.map(fields, function(item) {
            switch(item.rule) {
                case "numeric":
                    if (!$.isNumeric($(item.id).val())) {
                        isValid = false;
                        $(item.id).css("border-color", "red");
                        errorMsg = errorMsg + item.message + "<br/>";
                    }
                    break;
                case "empty":
                    if (!$(item.id).val()) {
                        isValid = false;
                        $(item.id).css("border-color", "red");
                        errorMsg = errorMsg + item.message + "<br/>";
                    }
                    break;
            }
        });

        if (isValid) {
            // Data
            crawlers.crawlerWard = $("#crawlerWard").val();
            crawlers.crawlerStreet = $("#crawlerStreet").val();
            crawlers.crawlerHouseNumber = $("#crawlerHouseNumber").val();
            $("#edit-house-modal").modal("hide");
            crawlers.updateCrawlerNote();
        } else {
            showPropzyAlert(errorMsg);
        }
    });

    $("body").on("change", "#crawlerWard", function(e) {
        let ward = $("#crawlerWard").val();
        if ($.isNumeric(ward)) {
            crawlers.crawlerWard = ward;
            crawlers.loadStreetWithWard();
        }
    })
});