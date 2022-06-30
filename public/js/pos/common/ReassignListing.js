function ReassignListing() {
    var _this = this
    _this.timer = new TimerCountDown()

    var REASSIGN_PARAM_CODE_POS_ASSISTANT = 16; // params Phòng POS_ASSISTANT: 16
    var REASSIGN_PARAM_CODE_POS_SA = 17;  // params Phòng POS_ASSISTANT: 17
    var REASSIGN_CONFIG_CURRENT_USER = false; // config current user = true -> get list reassign by current user

    var api = {
        loadDepartmentUserList: "/pos/CommonPos/loadDepartmentUserList",
        loadDepartmentUserListWithEntity:
            "/pos/CommonPos/loadDepartmentUserListWithEntity",
        reassignListing: "/pos/CommonPos/reassignListing",
        reassignSAListing: "/pos/CommonPos/reassignSAListing",
        getReassignAllListingId: "/pos/CommonPos/getReassignAllListingId",
    }
    var allowDepartmentIdList = []

    // field textarea note for assign to
    let baNote = ""

    var domList = {
        btnReassign: ".show-reassign-listing-modal-btn",
        btnReassignAll: ".show-reassign-all-listing-modal-btn",
        cbSelectAll: ".selectAll",
        cbSelectItem: ".reassign",
        modalReassignId: "#reassign-listing-modal-v2",
        btnReassignOkId: "#reassign-listing-btn",
        tbDepartmentId: "#department-user-list-table-v2",
    }
    var departmentsInfo = {
        prescreen: {
            id: 16,
            departmentCode: "pos_prescreen",
            departmentName: "POS-Prescreen",
            apiUrlLoadDepartmentUserList: api.loadDepartmentUserList,
            apiUrlReassignListing: api.reassignListing,
            redirectUrl: "/pos/prescreener",
        },
        sa: {
            id: 17,
            departmentCode: "pos_sa",
            departmentName: "POS-SA",
            apiUrlLoadDepartmentUserList: api.loadDepartmentUserList,
            apiUrlReassignListing: api.reassignSAListing,
            redirectUrl: "/pos/sa",
        },
    }
    var departmentUse = null

    var assigningList = {}
    var assigningListAll = {}
    var isReassignAll = false;
    var userAssign = null
    var loaded = false

    _this.init = function () {
        initVAR()
        bindEvent()
    }

    function initVAR() {
        if (window.location.pathname.search("/pos/sa") >= 0) {
            departmentUse = departmentsInfo.sa
        } else if (window.location.pathname.search("/pos/prescreener") >= 0) {
            departmentUse = departmentsInfo.prescreen
        }
        allowDepartmentIdList.push(departmentUse.id)
    }

    function bindEvent() {
        /**
         * new event list
         * */

        $("body")
            .off("click", "th " + domList.cbSelectAll)
            .on("click", "th " + domList.cbSelectAll, function (e) {
                //e.preventDefault();
                var tableTabId = $(this).data("tab")
                if (hasValue(tableTabId)) {
                    showHideSelectAll(tableTabId)
                } else {
                    console.error("Không tìm thấy table")
                }
            })

        $("body")
            .off("click", "td " + domList.cbSelectItem)
            .on("click", "td " + domList.cbSelectItem, function (e) {
                //e.preventDefault();
                var tableId = $(this).data("tab")
                if ($(this).is(":checked")) {
                    addList(showHideSelectItem(this))
                } else {
                    removeList(showHideSelectItem(this))
                }
                var countReassignAll = $("#" + tableId + " td .reassign").length
                var countReassignCheck = $(
                    "#" + tableId + " td .reassign:checked"
                ).length

                $("#" + tableId + " " + domList.cbSelectAll).prop(
                "checked",
                countReassignAll === countReassignCheck
                );
            })

        $("body")
            .off("click", domList.btnReassign)
            .on("click", domList.btnReassign, function (e) {
                e.preventDefault()
                isReassignAll = false;
                if (!$.isEmptyObject(assigningList)) {
                    loadDepartmentUserList(function () {
                        $(domList.modalReassignId).modal({
                            backdrop: "static",
                            keyboard: false,
                        })

                        // callback this to search
                        $("#filter-ba-name").on("keyup", function () {
                            /* Filter on the column (the index) of this element */
                            _this.departmentUserListTable
                                .search(this.value)
                                .draw()
                        })
                    })
                } else {
                    showPropzyAlert("Bạn chưa chọn tin đăng nào.")
                }
            })

        $("body")
            .off("click", domList.btnReassignAll)
            .on("click", domList.btnReassignAll, function (e) {
                e.preventDefault()
                isReassignAll = true;
                Window.saIndex.updateFilter();
                let filterDataPost = Window.saIndex.convertFieldToPostData(localIndexVariables._dataPost);
                delete filterDataPost.sort;

                showPropzyLoading();
                $.ajax({
                    url: api.getReassignAllListingId,
                    data: JSON.stringify(filterDataPost),
                    type: "post",
                })
                .done(function (response) {
                    hidePropzyLoading();
                    if (response.result && response.data.length == 0) {
                        showPropzyAlert('Không có listing để reassign')
                    } else if (response.data.length > 0) {
                        let listIds = {}
                        response.data.map(listingId => {
                            return listIds[listingId] = listingId
                        })

                        assigningListAll = {}; // set empty
                        assigningListAll = listIds; // reassign all 

                        loadDepartmentUserList(function () {
                            $(domList.modalReassignId).modal({
                                backdrop: "static",
                                keyboard: false,
                            })
    
                            // callback this to search
                            $("#filter-ba-name").on("keyup", function () {
                                /* Filter on the column (the index) of this element */
                                _this.departmentUserListTable
                                    .search(this.value)
                                    .draw()
                            })
                        })
                    } else if (response.result == false) {
                        showPropzyAlert(response.message)
                    }
                })
                .fail(function (err) {
                    console.error(err)
                })
            })

        $("body")
            .off("click", domList.btnReassignOkId)
            .on("click", domList.btnReassignOkId, function (e) {
                e.preventDefault()
                if (!hasValue(userAssign)) {
                    showPropzyAlert("Bạn chưa chọn user để assign")
                    return false
                }

                baNote = $("#ba-note").val()
                if (!hasValue(baNote.trim())) {
                    showPropzyAlert("Bạn chưa chọn Lý do để assign")
                    return false
                }

                ajaxStart()
                reassignListing().done(function (response) {
                    $(domList.modalReassignId).modal("hide")
                    if (response.result == true) {
                        if (
                            window.location.pathname != "/pos/prescreener" &&
                            window.location.pathname != "/pos/sa"
                        ) {
                            // chỉ tính time counter trong trang detail, ko tính trang quản lý
                            _this.timer.done(function (dataPost) {
                                let dataSend = {}
                                dataSend.openedDate = dataPost.initTimeStamp
                                dataSend.duration = dataPost.timer
                                if (
                                    window.location.pathname.search(
                                        "/pos/sa"
                                    ) >= 0
                                ) {
                                    dataSend.rListingId =
                                        Window.jsDetailData.rlistingId
                                    $.ajax({
                                        url:
                                            "/time-counter/save-time-counter-sa",
                                        data: JSON.stringify(dataSend),
                                        type: "post",
                                    })
                                        .done(function (response) {
                                            console.log(response)
                                        })
                                        .fail(function (err) {
                                            console.error(err)
                                        })
                                } else if (
                                    window.location.pathname.search(
                                        "/pos/prescreener"
                                    ) >= 0
                                ) {
                                    dataSend.lsoId = Window.jsDetailData.id
                                    $.ajax({
                                        url:
                                            "/time-counter/save-time-counter-assistant",
                                        data: JSON.stringify(dataSend),
                                        type: "post",
                                    })
                                        .done(function (response) {
                                            console.log(response)
                                        })
                                        .fail(function (err) {
                                            console.error(err)
                                        })
                                }
                            })
                        }
                        showPropzyAlert(
                            response.message,
                            "Thông báo",
                            function () {
                                window.location.href = departmentUse.redirectUrl
                            }
                        )
                    } else {
                        showPropzyAlert(response.message)
                    }
                    ajaxEnd()
                })
            })

        $("body")
            .off("click", domList.tbDepartmentId + " tr")
            .on("click", domList.tbDepartmentId + " tr", function (e) {
                e.preventDefault()
                if ($(this).hasClass("selected")) {
                    $(this).removeClass("selected")
                    _this.selectedUser = null
                } else {
                    _this.departmentUserListTable
                        .$("tr.selected")
                        .removeClass("selected")
                    $(this).addClass("selected")
                    userAssign = _this.departmentUserListTable.row(this).data()
                        .userId
                }
            })

        //tab for presceen
        if ($("a#need-to-call-listing-id").length > 0) {
            $("body").on("click", "a#need-to-call-listing-id", function (e) {
                clearList();
                resetCheckAll("need-to-call-listing");
            })
        }
        if ($("a#called-listing-id").length > 0) {
            $("body").on("click", "a#called-listing-id", function (e) {
                clearList();
                resetCheckAll("called-listing");
            })
        }

        //tab for sa
        if ($("a#need-to-live-listing-id").length > 0) {
            $("body").on("click", "a#need-to-live-listing-id", function (e) {
                clearList()
            })
        }
        if ($("a#living-listing-id").length > 0) {
            $("body").on("click", "a#living-listing-id", function (e) {
                clearList()
            })
        }

        /**
         * end of new event
         * */
    }

    _this.addListOver = function (list = {}) {
        addList(list)
    }

    _this.reloadPage = function (tableId) {
        $("#" + tableId + " " + domList.cbSelectAll).prop("checked", false)

        $("#" + tableId + " td .reassign").each(function (i, item) {
            var _this = this
            var id = $(_this).val()
            $.each(assigningList, function (key, value) {
                if (id == key) {
                    $(_this).prop("checked", true)
                    return true
                }
            })
        })
        var countReassignAll = $("#" + tableId + " td .reassign").length
        var countReassignCheck = $("#" + tableId + " td .reassign:checked")
            .length

        if (countReassignAll === countReassignCheck) {
            $("#" + tableId + " " + domList.cbSelectAll).prop("checked", true)
        }
    }

    _this.clearList = clearList;

    function showHideSelectAll(tableId) {
        /*var paging = "#" + tableId + "-table_paginate";
        var curentPage = $(paging).find(".active a").data("dt-idx");*/

        var isSelect = $("#" + tableId + " " + domList.cbSelectAll).prop(
            "checked"
        )
        $("#" + tableId + " td .reassign").prop("checked", isSelect)

        var list = {}
        var listRemove = {}

        $("#" + tableId + " td .reassign:checked").each(function (i, item) {
            $.extend(true, list, showHideSelectItem(this))
        })
        $("#" + tableId + " td .reassign:not(:checked)").each(function (
            i,
            item
        ) {
            $.extend(true, listRemove, showHideSelectItem(this))
        })
        addList(list)
        removeList(listRemove)
    }

    function showHideSelectItem(_this) {
        return { [$(_this).val()]: { id: $(_this).val() } }
    }

    function addList(list = {}) {
        $.extend(true, assigningList, list)
    }

    function removeList(list = {}) {
        $.each(list, function (id, item) {
            delete assigningList[id]
        })
    }

    function clearList() {
        assigningList = {}
    }

    function getIds() {
        var keys = [];
        if (isReassignAll) {
            keys = Object.keys(assigningListAll)
        } else {
            keys = Object.keys(assigningList)
        }
        return $.map(keys, Number)
    }

    function reassignListing() {
        return $.ajax({
            url: departmentUse.apiUrlReassignListing,
            type: "POST",
            data: JSON.stringify({
                idList: getIds(),
                assignedTo: userAssign,
                note: baNote,
            }),
        })
    }

    function loadDepartmentUserList(callback) {
        ajaxStart()
        try {
            _this.departmentUserListTable.destroy()
        } catch (Ex) {
            // nothing
        }

        // reset input filter while toggle modal
        $("#filter-ba-name").val("")
        var departmentCode = {};
        var pathName = window.location.pathname; 
        if (pathName == '/pos/prescreener' || pathName.includes("/pos/prescreener/detail") ) {
            departmentCode = REASSIGN_PARAM_CODE_POS_ASSISTANT; 
        } else if (pathName == '/pos/sa' || pathName.includes("/pos/sa/detail")) {
            departmentCode = REASSIGN_PARAM_CODE_POS_SA;
        }

        _this.departmentUserListTable = $(domList.tbDepartmentId)
            .DataTable({
                processing: true,
                serverSide: false,
                ajax: {
                    url: departmentUse.apiUrlLoadDepartmentUserList,
                    type: "POST",
                    data : { 
                        departmentIds : departmentCode,
                        useConfigCurrentUser: REASSIGN_CONFIG_CURRENT_USER
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                pageLength: 10,
                searching: true,
                ordering: false,
                language: DatatableHelper.languages.vn,
                columns: [
                    {
                        data: "name",
                        render: function (data, type, object) {
                            return object.name
                        },
                    },
                    {
                        data: "email",
                        render: function (data, type, object) {
                            return object.email
                        },
                    },
                    {
                        data: "listingTypeNames",
                        render: function (data, type, object) {
                            return data
                        },
                    },
                    {
                        data: "zoneNames",
                        render: function (data, type, object) {
                            return data
                        },
                    },
                    {
                        data: "zoneDistrictNames",
                        render: function (data, type, object) {
                            return data
                        },
                    },
                    {
                        data: "districtWardNames",
                        render: function (data, type, object) {
                            return data
                        },
                    },
                ],
            })
            .off("processing.dt")
            .on("processing.dt", function (e, settings, processing) {
                if (processing) {
                    ajaxStart()
                } else {
                    ajaxEnd()
                }
            })
            .on("xhr.dt", function (e, settings, json, xhr) {
                if (json && json.recordsTotal > 0) {
                    loaded = true
                }
                if (hasValue(callback)) {
                    callback(e, settings, json, xhr)
                }
                ajaxEnd()
            })
            .on("page.dt", function () {
                _this.departmentUserListTable
                    .$("tr.selected")
                    .removeClass("selected")
            })
    }

    function resetCheckAll(id) {
        $("#" + id + " " + domList.cbSelectAll).prop("checked", false);
    } 
}

$(document).ready(function () {
    if (
        hasValue(currentUser) &&
        hasValue(currentUser.departments) &&
        currentUser.departments.length > 0
    ) {
        Window.reAssignListing = new ReassignListing()
        Window.reAssignListing.init()
    }
})
