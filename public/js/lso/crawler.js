$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});

var crawler = {
    // Định nghĩa TP.Hồ Chí Minh (id=1)
    givenCityId: 1,
    districtData: [],
    wardData: [],
    streetData: [],
    // Trường hợp EDIT
    isEditFlag: false,
    id: "",
    data: {
        createdBy: "",
        assignedTo: "",
        cityId: "",
        districtId: "",
        wardId: "",
        streetId: "",
        statusId: "",
        address: "",
        email: "",
        isDeleted: "",
        link: "",
        name: "",
        note: "",
        noteLSO: "",
        phone: "",
        houseNumber: "",
        price: "",
        createdDate: "",
        statusDate: "",
        updatedBy: "",
        updatedDate: ""
    },
    // Thông báo
    successUrl: '/lso/crawlers',
    homeUrl: '/lso/crawlers',
    // Init..
    init: function() {
        // Nếu có ID => Load data để edit crawler
        if ($("#hiddenCrawlerId").val()) {
            if ($("#hiddenEditPerm").val() == 1) {
                requestCallback.initCallback(6);
            } else {
                requestCallback.initCallback(4);
            }
            crawler.id = $("#hiddenCrawlerId").val();
            crawler.loadFields();
        } else {
            if ($("#hiddenEditPerm").val() == 1) {
                requestCallback.initCallback(3);
            } else {
                requestCallback.initCallback(1);
            }
            crawler.loadCreateForm();
        }
    },
    loadEditForm: function() {
        crawler.isEditFlag = true;
        // load district (1)
        crawler.loadDistrict(function(response) {
            requestCallback.addCallbackToQueue();
            if (response.result) {
                $.map(response.data, function(item) {
                    crawler.districtData.push({
                        id: item.districtId,
                        text: item.districtName
                    });
                });

                $("#districtId").select2({
                    data: crawler.districtData
                }).select2('val', crawler.data.districtId, false);
            } else {
                showPropzyAlert(response.message);
            }
        });

        // Load Phường (2)
        // Clear Ward
        crawler.wardData = [{
            id: "",
            text: "--Phường--"
        }];
        $("#wardId").empty();
        // Load Ward
        crawler.loadWard(function(response) {
            requestCallback.addCallbackToQueue();
            $.map(response, function(item) {
                crawler.wardData.push({
                    id: item.wardId,
                    text: item.wardName
                });
            });
            $("#wardId").select2({
                data: crawler.wardData
            }).select2('val', crawler.data.wardId, false);
        });

        // Load Đường (3)
        // Reset state..
        crawler.streetData = [];
        $("#streetId").empty();
        // Start..
        crawler.loadStreet(function(response) {
            requestCallback.addCallbackToQueue();
            $.map(response.data, function(item) {
                crawler.streetData.push({
                    id: item.streetId,
                    text: item.streetName
                });
            })
            $("#streetId").select2({
                data: crawler.streetData
            }).select2('val', crawler.data.streetId, false);
        });

        // Load tình trạng (4)
        if ($("#hiddenEditPerm").val() == 1) {
            crawler.getStatusList(function(response) {
                requestCallback.addCallbackToQueue();
                if (response.result) {
                    var statuses = [];
                    $.map(response.data, function(item) {
                        // Prepare data into statuses
                        statuses.push({
                            id: item.statusId,
                            text: item.statusName
                        });
                        $("#statusId").select2({
                            data: statuses
                        }).select2('val', crawler.data.statusId, false);
                    });
                }
            });
        }

        // Load LSO (5)
        if ($("#hiddenEditPerm").val() == 1) {
            crawler.getLsMembers(function(response) {
                requestCallback.addCallbackToQueue();
                if (response.result) {
                    var members = [];
                    var activeId = "";
                    $.map(response.data, function(item) {
                        members.push({
                            id: item.userId,
                            text: item.name
                        });
                    });
                    $("#assignedTo").select2({
                        data: members
                    }).select2('val', crawler.data.assignedTo, false);
                }
            });
        }

        // CKEditor
        CKEDITOR.replace('noteForLs');
        $("#noteForLs").html(crawler.data.note);

        if ($("#hiddenEditPerm").val() == 1) {
            CKEDITOR.replace('noteForLso');
            $("#noteForLso").html(crawler.data.noteLSO);
        }

        // Format currency
        $("#price").autoNumeric("init", {
            'mDec': 0
        });
        $("#price").autoNumeric("set", crawler.data.price);
    },
    loadCreateForm: function() {
        // load district (1)
        crawler.loadDistrict(function(response) {
            requestCallback.addCallbackToQueue();
            if (response.result) {
                $.map(response.data, function(item) {
                    crawler.districtData.push({
                        id: item.districtId,
                        text: item.districtName
                    });
                });

                $("#districtId").select2({
                    data: crawler.districtData
                });
            } else {
                showPropzyAlert(response.message);
            }
        });

        // Load tình trạng (2)
        if ($("#hiddenEditPerm").val() == 1) {
            crawler.getStatusList(function(response) {
                requestCallback.addCallbackToQueue();
                if (response.result) {
                    var statuses = [];
                    $.map(response.data, function(item) {
                        // Prepare data into statuses
                        statuses.push({
                            id: item.statusId,
                            text: item.statusName
                        });
                    });
                    $("#statusId").select2({
                        data: statuses
                    }).select2('val', 1);
                }
            });
        }

        // Load LSO (3)
        if ($("#hiddenEditPerm").val() == 1) {
            crawler.getLsMembers(function(response) {
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
                    }).select2('val', parseInt($("#hiddenLoggedInUserId").val()));
                }
            });
        }

        // CKEditor
        CKEDITOR.replace('noteForLs');

        if ($("#hiddenEditPerm").val() == 1) {
            CKEDITOR.replace('noteForLso');
        }

        // Format currency
        $("#price").autoNumeric("init", {
            'mDec': 0
        });
    },
    loadFields: function() {
        // (1)
        crawler.getCrawler(function(response) {
            requestCallback.addCallbackToQueue();
            if (response.result) {
                for (var x in crawler.data) {
                    crawler.data[x] = response.data[x];
                    if (response.data[x]) {
                        $("#" + x).val(response.data[x]);
                    }
                }
                // (5)
                crawler.loadEditForm();
            }
        });
    },
    getCrawler: function(callback) {
        $.ajax({
            url: "/lso/get-crawler?id=" + crawler.id,
            type: "GET"
        }).done(function(response) {
            callback(response);
        });
    },
    createCrawler: function() {
        requestCallback.initCallback(1);

        if (crawler.validateInput(false)) {
            crawler.processCreateCrawler(function(response) {
                requestCallback.addCallbackToQueue();
                showPropzyAlert(response.message);
                if (response.result) {
                    setTimeout(function() {
                        window.location.replace(crawler.successUrl);
                    }, 2000);
                }
            });
        } else {
            requestCallback.addCallbackToQueue();
            showPropzyAlert("Xin vui lòng kiểm tra lại form nhập");
        }
    },
    updateCrawler: function() {
        requestCallback.initCallback(1);
        if (crawler.validateInput(false)) {
            crawler.processUpdateCrawler(function(response) {
                requestCallback.addCallbackToQueue();
                showPropzyAlert(response.message);
                if (response.result) {
                    setTimeout(function() {
                        window.location.replace(crawler.homeUrl);
                    }, 2000);
                }
            });
        } else {
            requestCallback.addCallbackToQueue();
            showPropzyAlert("Xin vui lòng kiểm tra lại form nhập");
        }
    },
    loadDistrict: function(callback) {
        var postData = {
            "regionIdsList": null,
            "cityIdsList": [parseInt(crawler.givenCityId)]
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
        // Clear Ward
        crawler.wardData = [{
            id: "",
            text: "--Phường--"
        }];
        $("#wardId").empty();
        // Start..
        showPropzyLoading();
        // Load Ward
        crawler.loadWard(function(response) {
            $.map(response, function(item) {
                crawler.wardData.push({
                    id: item.wardId,
                    text: item.wardName
                });
            });
            $("#wardId").select2({
                data: crawler.wardData
            });
            hidePropzyLoading();
        });
    },
    loadWard: function(callback) {
        var districtId = $("#districtId").val();
        if (!$.isNumeric(districtId)) {
            districtId = (crawler.data.districtId) ? crawler.data.districtId : null;
        }

        if (districtId != "") {
            $.ajax({
                url: "/common/get-ward/" + districtId,
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
        crawler.streetData = [];
        $("#streetId").empty();
        // Start..
        showPropzyLoading();
        crawler.loadStreet(function(response) {
            $.map(response.data, function(item) {
                crawler.streetData.push({
                    id: item.streetId,
                    text: item.streetName
                });
            })
            $("#streetId").select2({
                data: crawler.streetData
            });
            hidePropzyLoading();
        });
    },
    loadStreet: function(callback) {
        var wardId = $("#wardId").val();
        if (!$.isNumeric(wardId)) {
            wardId = (crawler.data.wardId) ? crawler.data.wardId : null;
        }

        if (wardId != "") {
            $.ajax({
                url: "/zone/get-streets/" + wardId,
                type: "GET"
            }).done(function(response) {
                callback(response);
            });
        } else {
            hidePropzyLoading();
        }
    },
    getStatusList: function(callback) {
        var statuses = [];
        $.ajax({
            url: "/lso/get-status-lso-list",
            type: "GET",
        }).done(function(response) {
            callback(response);
        });
    },
    validateInput: function(isDuplicated) {
        var fields = [
            // {
            //     id: "#name",
            //     parent: "",
            //     error: "Tên không hợp lệ",
            //     rule: "empty"
            // },
            {
                id: "#phone",
                parent: "",
                error: "SDT không hợp lệ",
                rule: "empty"
            },
            {
                id: "#cityId",
                parent: "#cityId",
                error: "Thành phố không hợp lệ",
                rule: "empty"
            },
            {
                id: "#districtId",
                parent: "#cityId",
                error: "Quận không hợp lệ",
                rule: "empty"
            },
            // {
            //     id: "#wardId",
            //     parent: "#cityId",
            //     error: "Phường không hợp lệ",
            //     rule: "empty"
            // },
            // {
            //     id: "#streetId",
            //     parent: "#cityId",
            //     error: "Đường không hợp lệ",
            //     rule: "empty"
            // },
            {
                id: "#price",
                parent: "",
                error: "Giá không hợp lệ",
                rule: "empty"
            },
            {
                id: "#link",
                parent: "",
                error: "Link không hợp lệ",
                rule: "empty"
            },
            // {
            //     id: "#noteForLs",
            //     parent: "",
            //     error: "Ghi chú LS không hợp lệ",
            //     rule: "textareaempty"
            // }
        ];

        if ($("#hiddenEditPerm").val() == 1) {
            fields.push({
                id: "#houseNumber",
                parent: "#cityId",
                error: "Số nhà không hợp lệ",
                rule: "empty"
            });
            // fields.push({
            //     id: "#noteForLso",
            //     parent: "",
            //     error: "Ghi chú LSO không hợp lệ",
            //     rule: "textareaempty"
            // });
        }

        // Reset error fields
        $.map(fields, function(item) {
            $(item.id + "-error").remove();
            $(item.id).css("border-color", "");
        });
        // Start validate..
        var isValid = true;
        $.map(fields, function(item) {
            if (isDuplicated) {
                if (item.parent == "#cityId") {
                    switch (item.rule) {
                        case "empty":
                            if (!$(item.id).val() || $(item.id).val() == 'all') {
                                isValid = false;
                                var errorMsg = "<span id='" + item.id.substring(1) + "-error'><code>" + item.error + "</code></span>";
                                if (item.parent == "#cityId") {
                                    $(errorMsg).insertAfter(item.parent);
                                } else {
                                    $(errorMsg).insertAfter(item.id);
                                }
                                $(item.id).css("border-color", "red");
                            }
                            break;
                    }
                }
            } else {
                switch (item.rule) {
                    case "empty":
                        // Special case for phone
                        if (item.id == "#phone") {
                            if (!$(item.id).val()) {
                                isValid = false;
                                var errorMsg = "<span id='" + item.id.substring(1) + "-error'><code>" + item.error + "</code></span>";
                                if (item.parent == "#cityId") {
                                    $(errorMsg).insertAfter(item.parent);
                                } else {
                                    $(errorMsg).insertAfter(item.id);
                                }
                                $(item.id).css("border-color", "red");
                            } else if (!isValidPhone($(item.id).val())) {
                                isValid = false;
                                var errorMsg = "<span id='" + item.id.substring(1) + "-error'><code>" + item.error + "</code></span>";
                                $(errorMsg).insertAfter(item.id);
                                $(item.id).css("border-color", "red");
                            }
                        } else {
                            if (!$(item.id).val()) {
                                isValid = false;
                                var errorMsg = "<span id='" + item.id.substring(1) + "-error'><code>" + item.error + "</code></span>";
                                if (item.parent == "#cityId") {
                                    $(errorMsg).insertAfter(item.parent);
                                } else {
                                    $(errorMsg).insertAfter(item.id);
                                }
                                $(item.id).css("border-color", "red");
                            }
                        }
                        break;
                    case "textareaempty":
                        if (!CKEDITOR.instances[item.id.substring(1)].getData()) {
                            isValid = false;
                            var errorMsg = "<span id='" + item.id.substring(1) + "-error'><code>" + item.error + "</code></span><br>";
                            if (item.parent == "#cityId") {
                                $(errorMsg).insertAfter(item.parent);
                            } else {
                                $(errorMsg).insertAfter(item.id);
                            }
                            $(item.id).css("border-color", "red");
                        }
                        break;
                }
            }
        });
        return isValid;
    },
    getLsMembers: function(callback) {
        $.ajax({
            url: "/lso/get-lso-members",
            type: "GET"
        }).done(function(response) {
            callback(response);
        });
    },
    processCreateCrawler: function(callback) {
        var crawlerStatusId = 1;
        if ($.isNumeric($("#statusId").val())) {
            crawlerStatusId = parseInt($("#statusId").val());
        }
        var postData = {
            "createdBy": parseInt($("#hiddenLoggedInUserId").val()),
            "assignedTo": $.isNumeric($("#assignedTo").val()) ? parseInt($("#assignedTo").val()) : null,
            "cityId": parseInt($("#cityId").val()),
            "districtId": parseInt($("#districtId").val()),
            "wardId": $.isNumeric($("#wardId").val()) ? parseInt($("#wardId").val()) : "",
            "streetId": $.isNumeric($("#streetId").val()) ? parseInt($("#streetId").val()) : "",
            "statusId": crawlerStatusId,
            "email": ($("#email").val()) ? $("#email").val() : null,
            "link": $("#link").val(),
            "name": $("#name").val(),
            "note": (CKEDITOR.instances.noteForLs.getData()) ? CKEDITOR.instances.noteForLs.getData() : "",
            "noteLSO": ($("#hiddenEditPerm").val() == 1) ? CKEDITOR.instances.noteForLso.getData() : "",
            "phone": $("#phone").val(),
            "houseNumber": ($("#houseNumber").val()) ? $("#houseNumber").val() : null,
            "price": parseInt($("#price").autoNumeric("get"))
        };

        $.ajax({
            url: "/lso/insert-crawler",
            data: JSON.stringify(postData),
            type: "POST"
        }).done(function(response) {
            callback(response);
        });
    },
    processUpdateCrawler: function(callback) {
        var crawlerStatusId = 1;
        if ($.isNumeric($("#statusId").val())) {
            crawlerStatusId = parseInt($("#statusId").val());
        }
        var postData = {
            "id": parseInt(crawler.id),
            "createdBy": parseInt($("#hiddenLoggedInUserId").val()),
            "assignedTo": $.isNumeric($("#assignedTo").val()) ? parseInt($("#assignedTo").val()) : null,
            "cityId": parseInt($("#cityId").val()),
            "districtId": parseInt($("#districtId").val()),
            "wardId": $.isNumeric($("#wardId").val()) ? parseInt($("#wardId").val()) : "",
            "streetId": $.isNumeric($("#streetId").val()) ? parseInt($("#streetId").val()) : "",
            "statusId": crawlerStatusId,
            "email": ($("#email").val()) ? $("#email").val() : null,
            "link": $("#link").val(),
            "name": $("#name").val(),
            "note": (CKEDITOR.instances.noteForLs.getData()) ? CKEDITOR.instances.noteForLs.getData() : "",
            "noteLSO": CKEDITOR.instances.noteForLso.getData(),
            "phone": $("#phone").val(),
            "houseNumber": ($("#houseNumber").val()) ? $("#houseNumber").val() : null,
            "price": parseInt($("#price").autoNumeric("get"))
        };

        $.ajax({
            url: "/lso/insert-crawler",
            data: JSON.stringify(postData),
            type: "POST"
        }).done(function(response) {
            callback(response);
        });
    },
    checkDuplicatedAddress: function(callback) {
        var postData = {
            "id": parseInt($("#hiddenCrawlerId").val()),
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
                callback(response);
            }
        })
    },
    // Check existed owner
    checkExistedOwner: function(isPhone) {
        var isValid = true;
        var errorMsg = "";
        showPropzyLoading();
        var postData = [];
        if (isPhone) {
            if (!$("#phone").val()) {
                isValid = false;
                errorMsg = "Số điện thoại không hợp lệ";
            }
            postData = {
                email: null,
                phone: $("#phone").val(),
                ownerId: parseInt($("#hiddenOwnerId").val()),
                type: 2
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
                type: 2
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
        } else {
            hidePropzyLoading();
            showPropzyAlert(errorMsg);
        }
    },
};

/**
 * AJAX Callbacks
 */
var requestCallback = {
    numOfQueue: 0,
    countQueue: 0,
    initCallback: function(numQueue) {
        requestCallback.numOfQueue = numQueue;
        requestCallback.countQueue = 0;
        showPropzyLoading();
        $(".dashboard").fadeOut();
    },
    sendRequest: function() {
        requestCallback.numOfQueue++;
    },
    addCallbackToQueue: function() {
        requestCallback.countQueue++;
        if (requestCallback.numOfQueue == requestCallback.countQueue) {
            hidePropzyLoading();
            crawler.isEditFlag = false;
            $(".dashboard").fadeIn('slow');
        }
    }
};

$(function() {
    crawler.init();

    // Đổi quận -> Phường
    $("#districtId").on("change", function() {
        if ($("#districtId").val() != "" && !crawler.isEditFlag) {
            crawler.loadWardWithDistrict();
        }
    });

    // Đổi phường -> Đường
    $("#wardId").on("change", function() {
        if ($("#wardId").val() != "" && !crawler.isEditFlag) {
            crawler.loadStreetWithWard();
        }
    });

    // Tạo mới crawler
    $("#create-crawler-btn").click(function(e) {
        e.preventDefault();
        if (crawler.id != "") {
            crawler.updateCrawler();
        } else {
            crawler.createCrawler();
        }
    });

    // Check trùng tin đăng
    $("#check-duplicated-btn").click(function(e) {
        e.preventDefault();
        showPropzyLoading();
        if (!crawler.validateInput(true)) {
            hidePropzyLoading();
            showPropzyAlert("Xin vui lòng kiểm tra lại dữ liệu");
        } else {
            crawler.checkDuplicatedAddress(function(response) {
                hidePropzyLoading();
                var result = "";
                if (response.result) {
                    var duplicatedMsg = "Địa chỉ trùng với listing: ";
                    $.map(response.data, function(item) {
                        duplicatedMsg = duplicatedMsg + "<a target='_blank' href='/listing/view/" + item.id + "'>LID #" + item.id + "</a>,";
                    });
                    var newDuplicatedMsg = duplicatedMsg.substring(0, duplicatedMsg.length - 1);
                    showPropzyAlert(newDuplicatedMsg);
                } else {
                    showPropzyAlert(response.message);
                }
                hidePropzyLoading();
            });
        }
    });

    // Hủy tin đăng
    $("#cancel-crawler-btn").click(function(e) {
        e.preventDefault();
        window.location.replace("/lso/crawlers");
    });

    // Check phone
    $("#check-duplicated-phone-btn").click(function(e) {
        e.preventDefault();
        crawler.checkExistedOwner(true);
    });

    // Check email
    $("#check-duplicated-email-btn").click(function(e) {
        e.preventDefault();
        crawler.checkExistedOwner(false);
    });

    // Auto check phone
    $("#phone").blur(function() {
        $("#phone-error").remove();
        $("#phone").css("border-color", "");

        var isValid = true;
        if (!$("#phone").val()) {
            isValid = false;
        } else if (!isValidPhone($("#phone").val())) {
            isValid = false;
        }

        if (!isValid) {
            var errorMsg = "<span id='phone-error'><code>SĐT không hợp lệ</code></span>";
            $(errorMsg).insertAfter("#phone");
            $("#phone").css("border-color", "red");
            showPropzyAlert("Xin vui lòng kiểm tra SĐT");
        }
    });
});
