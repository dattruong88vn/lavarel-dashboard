var ReassignDeals = (function() {
    var _this = this

    var REASSIGN_PARAM_CODE_DEAL = 12; // params Phòng CRM: 12
    var REASSIGN_CONFIG_CURRENT_USER = false; // config current user = true -> get list reassign by current user

    var api = {
        loadDepartmentUserList: "/pos/CommonPos/loadDepartmentUserList",
    }
    var domList = {
        btnReassign: ".show-reassign-listing-modal-btn",
        cbSelectAll: ".selectAll",
        cbSelectItem: ".reassign",
        modalReassignId: "#modalReassignDeals-v2",
        btnReassignOkId: "#reassign-deal-btn",
        tbDepartmentId: "#department-user-list-table-v2",
    }
    var loadCrmsSelect = function(element = "") {
        $.ajax({
            url: "/account/get-list-json/12?active=true",
            type: "get",
        }).done(function(response) {
            var html = "<option value='0'>Tất cả</option>"
            if (response.result) {
                for (var i = 0; i < response.data.length; i++) {
                    html +=
                        "<option value='" +
                        response.data[i].userId +
                        "' >" +
                        response.data[i].name +
                        "</option>"
                }
            }
            if (element == "") {
                $(".assignedTos").html(html)
            } else {
                $(element).html(html)
                if ($(".nav-tabs .active > a").attr("href") != "#home") {
                    $.each($(".crm_select").val(), function(k, v) {
                        $(".crm_except option[value=" + v + "]").prop("disabled", true)
                    })
                }
            }
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

        _this.departmentUserListTable = $("#department-user-list-table-v2")
            .DataTable({
                processing: true,
                serverSide: false,
                ajax: {
                    url: api.loadDepartmentUserList,
                    type: "POST",
                    data: {
                        departmentIds: REASSIGN_PARAM_CODE_DEAL,
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
                columns: [{
                        data: "name",
                        render: function(data, type, object) {
                            return object.name
                        },
                    },
                    {
                        data: "email",
                        render: function(data, type, object) {
                            return object.email
                        },
                    },
                    {
                        data: "listingTypeNames",
                        render: function(data, type, object) {
                            return data
                        },
                    },
                    {
                        data: "zoneNames",
                        render: function(data, type, object) {
                            return data
                        },
                    },
                    {
                        data: "zoneDistrictNames",
                        render: function(data, type, object) {
                            return data
                        },
                    },
                    {
                        data: "districtWardNames",
                        render: function(data, type, object) {
                            return data
                        },
                    },
                ],
            })
            .off("processing.dt")
            .on("processing.dt", function(e, settings, processing) {
                if (processing) {
                    ajaxStart()
                } else {
                    ajaxEnd()
                }
            })
            .on("xhr.dt", function(e, settings, json, xhr) {
                if (json && json.recordsTotal > 0) {
                    loaded = true
                }
                if (hasValue(callback)) {
                    callback(e, settings, json, xhr)
                }
                ajaxEnd()
            })
            .on("page.dt", function() {
                _this.departmentUserListTable.$("tr.selected").removeClass("selected")
            })
    }

    function toggleReassignButton() {
        if (
            $(".select-customer:checked").length > 0 &&
            $(".crms-from").val() != "-1"
        ) {
            $(".btnReassign").show()
        } else {
            $(".btnReassign").hide()
        }
    }

    $(".crms-from").change(function() {
        if ($(this).val() != null) {
            $("#filter").removeClass("disabled");
            $("input[name=searchKeywords]").removeAttr("disabled");
            $("select[name=districts], select[name=statusIds]").prop(
                "disabled",
                false
            );
        }
    });

    $("select[name=progressId]").change(function() {
        var statusIds = [];
        if ($(this).val() != null) {
            $.each($(this).val(), function(k, v) {
                statusIds.push(
                    $("select[name=progressId]")
                    .find("option[value=" + v + "]")
                    .data("statusid")
                );
            });
            $.each($("select[name=statusIds]").val(), function(k, v) {
                v = parseInt(v);
                if (jQuery.inArray(v, statusIds) === -1) {
                    $("select[name=statusIds]")
                        .find("option[value=" + v + "]")
                        .prop("selected", false);
                    $("select[name=statusIds]").trigger("change");
                }
            });
        }
    });

    $("select[name=statusIds]").change(function() {
        if ($(this).val() != null) {
            if (jQuery.inArray("28", $(this).val()) !== -1) {
                // $("select[name=progressQuoId]").append($('#forPending').html());
                $("select[name=statusIds]")
                    .find("option")
                    .removeAttr("selected");
                $("select[name=statusIds]")
                    .find("option[value=28]")
                    .prop("selected", true);
                $("select[name=progressQuoId]").trigger("change");
                $("select[name=progressQuoId]").prop("disabled", false);
                $("select[name=progressId]").prop("disabled", true);
                $("select[name=progressId]").val(null).select2();
                // $.notify('Bỏ chọn pending để chọn các trạng thái khác.');
                $("#warning_pending").removeClass("hidden");
            } else {
                $("#warning_pending").addClass("hidden");
                $("select[name=progressQuoId]").prop("disabled", true);
                $("select[name=progressQuoId]").val(null).trigger("change");
                $.ajax({
                        url: "/common/get-progress/deal",
                        type: "post",
                        data: JSON.stringify({ statusIds: $(this).val() }),
                    })
                    .done(function(response) {
                        $("select[name=progressId]").html("");
                        $.each(response, function(k, item) {
                            var selected = "";
                            // if(response.length == 1){
                            //     selected = ''
                            // }
                            $("select[name=progressId]").append(
                                "<option data-statusid='" +
                                item.statusId +
                                "' " +
                                selected +
                                " value='" +
                                item.progressId +
                                "'>" +
                                item.progressName +
                                "</option>"
                            );
                        });
                        // $('select[name=progressId]').trigger('change');
                        $("select[name=progressId]").prop("disabled", false);
                        return false;
                    })
                    .always(function() {
                        // hidePropzyLoading();
                    });
            }
        } else {
            $("select[name=progressQuoId],select[name=progressId]").prop(
                "disabled",
                true
            );
            $("select[name=progressQuoId],select[name=progressId]")
                .val(null)
                .select2();
        }
    });

    $("#filter-ba-name").on("keyup", function() {
        /* Filter on the column (the index) of this element */
        _this.departmentUserListTable.search(this.value).draw();
    });

    var initPostData = function() {
        return {
            dealIds: [],
            assignedTo: null,
            reason: null,
        };
    };

    var filterExistedCustomerId = function(data, customerId) {
        return customerId == data;
    };

    $(domList.modalReassignId + " .close-reassign").on("click", function() {
        $(".btnReassign").show();
    });

    var reassignData = initPostData();
    $(".btnReassign").on("click", function(event) {
        event.preventDefault();
        reassignData = initPostData();
        $(".select-customer:checked").each(function() {
            var dealIds = $(this).val();
            if (reassignData.dealIds.filter(filterExistedCustomerId).length <= 0) {
                reassignData.dealIds.push(dealIds);
            }
        });
        loadDepartmentUserList(function() {
            $(domList.modalReassignId).modal({
                backdrop: "static",
                keyboard: false,
            });
        });

        // hide assign button in list deal
        $(".btnReassign").hide();
    });

    // click to select assign to another user
    $("body")
        .off("click", domList.tbDepartmentId + " tr")
        .on("click", domList.tbDepartmentId + " tr", function(e) {
            e.preventDefault();
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
                reassignData.assignedTo = null;
            } else {
                _this.departmentUserListTable
                    .$("tr.selected")
                    .removeClass("selected");
                $(this).addClass("selected");
                reassignData.assignedTo = _this.departmentUserListTable
                    .row(this)
                    .data().userId;
            }
        });

    // click save assigned btn
    $("body")
        .off("click", domList.btnReassignOkId)
        .on("click", domList.btnReassignOkId, function(e) {
            e.preventDefault();
            if (!hasValue(reassignData.assignedTo)) {
                showPropzyAlert("Bạn chưa chọn user để assign");
                return false;
            }

            baNote = $("#ba-note").val();
            if (!hasValue(baNote.trim())) {
                showPropzyAlert("Bạn chưa chọn Lý do để assign");
                return false;
            }
            reassignData.reason = baNote;

            showPropzyLoading();

            $.ajax({
                    url: "/crm-manager/do-reassign-deals",
                    type: "post",
                    data: JSON.stringify(reassignData),
                })
                .done(function(response) {
                    if (response.result) {
                        loadDeals()
                    }
                    showPropzyAlert(response.message)
                    $(domList.modalReassignId).modal("hide")
                })
                .always(function() {
                    hidePropzyLoading()
                })
        })

    const convertFieldToPostData = (storeFields) => {
        const returnedTarget = Object.assign({}, storeFields)

        if (isArray(returnedTarget.zoneField)) {
            returnedTarget.zoneField = returnedTarget.zoneField.join(",")
        }
        if (isArray(returnedTarget.teamField)) {
            returnedTarget.teamField = returnedTarget.teamField.join(",")
        }
        if (isArray(returnedTarget.departmentField)) {
            returnedTarget.departmentField = returnedTarget.departmentField.join(",")
        }
        /* 
            if (isArray(returnedTarget.memberField)) {
                returnedTarget.memberField = returnedTarget.memberField.join(",")
            } 
            if (isArray(returnedTarget.districtId)) {
                returnedTarget.districtId = returnedTarget.districtId.join(",")
            } */
        if (isArray(returnedTarget.wardId)) {
            returnedTarget.wardId = returnedTarget.wardId.join(",")
        }

        return returnedTarget
    }

    var dataTableDeals = null
    var loadDeals = function(that) {
        if (dataTableDeals) {
            dataTableDeals.destroy()
        }

        $(".btnReassign").hide()

        var ajax = {}
        ajax.url = "/crm-manager/get-deals-by-crms"
        ajax.type = "POST"
        ajax.cache = false

        let filter = convertFieldToPostData(_indexVariables._dataPost)

        if ($(".nav-tabs .active > a").attr("href") == "#home") {
            filter["strNeedIds"] = $("input[name=strNeedIds]").val()
        } else {
            $(".select_for_filter").each(function() {
                filter[$(this).attr("name")] = $(this).val()
            })
            if ($(".crms-from").val() != "-1") {
                filter["assignedTos"] = $(".crms-from").val()
            }
            if ($("input[name=searchKeywords]").val() != "") {
                filter["searchKeywords"] = $("input[name=searchKeywords]").val()
            }
        }

        filter = $.extend({}, filter)
        ajax.data = filter
        var limit = 10
        dataTableDeals = $("#dataTableDeals").DataTable({
            searching: false,
            paging: true,
            processing: true,
            pagingType: "full_numbers",
            serverSide: true,
            ajax: ajax,
            cache: false,
            scrollX: true,
            lengthChange: true,
            lengthMenu: [
                [10, 25, 50],
                [10 + " records", 25 + " records", 50 + " records"],
            ],
            iDisplayLength: limit,
            columns: [{
                    data: "dealId",
                    render: function(data, type, object) {
                        return ("<input type='checkbox' value='" + data + "' class='select-customer' />")
                    },
                    orderable: false,
                },
                {
                    data: "deals",
                    type: "num",
                    render: function(data, type, object) {
                        var result = '';
                        if (data) {
                            $.each(data, function(k, v) {
                                var progressQuoName = v.progressQuoName != null ? ' <span class="label label-info">' + v.progressQuoName + "</span>" : ""
                                var progressName = v.progressName != null ? ' <span class="label label-warning">' + v.progressName + "</span>" : ""
                                result += v.dealId + ' <span class="label label-primary">' + v.statusName + "</span>" + progressName + progressQuoName + "<br/>"
                            });
                            return result;
                        }
                        var progressQuoName = object.progressQuoName != null ? ' <span class="label label-info">' + object.progressQuoName + "</span>" : ""
                        var progressName = object.progressName != null ? ' <span class="label label-warning">' + object.progressName + "</span>" : ""
                        result += object.dealId + ' <span class="label label-primary">' + object.statusName + "</span>" + progressName + progressQuoName + "<br/>"
                        return result;
                    },
                },
                {
                    data: "deals",
                    render: function(data, type, object) {
                        var result = object.assignedName;
                        if (data) {
                            var assigname = []
                            $.each(data, function(k, v) {
                                assigname.push(v.assignedName)
                            })
                            var uniqueNames = []
                            $.each(assigname, function(i, el) {
                                if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el)
                            })
                            $.each(uniqueNames, function(k, v) {
                                result += v + "<br/>"
                            });
                        }
                        return result
                    },
                },
                { data: "customerName" },
                { data: "customerId" },
            ],

            drawCallback: function(setting) {
                $(".dataTables_paginate > .pagination").addClass("pagination-sm")
                var pagination = $(this)
                    .closest(".dataTables_wrapper")
                    .find(".dataTables_paginate")
                pagination.toggle(this.api().page.info().pages > 1)
                $(".select-all-customers").prop("checked", false)
                $(".select-customer").change(function() {
                    toggleReassignButton()
                    if ($(this).prop("checked") == false) {
                        $(".select-all-customers").prop("checked", false)
                    } else if (
                        $(".select-customer").length == $(".select-customer:checked").length
                    ) {
                        $(".select-all-customers").prop("checked", true)
                    }
                })
                toggleReassignButton()
            },
            language: {
                search: "Tìm kiếm",
                paginate: {
                    previous: "<",
                    next: ">",
                    first: "|<",
                    last: ">|",
                },
                lengthMenu: "Hiển thị _MENU_ trên 1 trang",
                searchPlaceholder: "Deals ID, Tên, Mã KH",
                info: "Hiển thị _START_ đến _END_ của _TOTAL_",
                emptyTable: "Chưa có dữ liệu",
                infoEmpty: "",
            },
            order: [[1, 'asc']]
        })
    }

    $(".select-all-customers").on("click", function() {
        $(".select-customer").prop("checked", $(this).prop("checked"))
        toggleReassignButton()
    })

    $("#filter").on("click", function() {
        loadDeals()
    })

    // $('input[name=strNeedIds]').keyup(function(){
    //     if($(this).val() != ''){
    //         $('#filter').removeClass('disabled')
    //     }else{
    //         $('#filter').addClass('disabled');
    //     }
    // })
    // $(document).ready(function () {
    //   alert('yeeeeeeeeeeeeeeeeeeeee')
    // })

    $('a[data-toggle="tab"]').click(function(e) {
        e.preventDefault()
        var flag = false
        $("#home input,#home select, #menu1 input,#menu1 select").each(function() {
            if (
                $(this).val() != "" &&
                $(this).val() != null &&
                $(this).attr("name") != "_token" &&
                $(this).attr("class") != "select-all-customers" &&
                $(this).attr("class") != "form-control whenDate"
            ) {
                flag = true
                return false
            }
        })
        if (flag) {
            var areYouSure = confirm(
                "Bạn có muốn chuyển tab, hành động này sẽ reset lại bộ lọc."
            )
            if (areYouSure === true) {
                $(this).tab("show")
            } else {
                // do other stuff
                return false
            }
        }
        $(
            "select[name=progressQuoId], select[name=progressId], select[name=assignedTos], select[name=districts], select[name=statusIds]"
        ).val(null)

        $("#zoneField").val(null)
        $("#teamField").val(null)
        $("#districtId").val(null)
        $("#wardId").val(null)
        $("#departmentField").val(null)
        $("#memberField").val(null)
        $(".assignedTos").val(null)

        $("#zoneField").trigger("change")
        $("#teamField").trigger("change")
        $("#districtId").trigger("change")
        $("#wardId").trigger("change")
        $("#departmentField").trigger("change")
        $("#memberField").trigger("change")
        $(".assignedTos").trigger("change")
    })

    var loadFilter = function() {
        $('a[data-toggle="tab"]').on("shown.bs.tab", function(e) {
            try {
                $("#dataTableDeals tbody").empty()
                $("#dataTableDeals_wrapper .row:last").empty()
                    // dataTableDeals.clear().draw();
                    // dataTableDeals.draw();
                    // dataTableDeals.destroy();
                    // dataTableDeals.destroy();
            } catch (ex) {}
            $(".btnReassign").hide()
                // $('#filter').addClass('disabled');
            var target = $(e.target).attr("href")
            $("input").val(null)
            $("input:checkbox").prop("checked", false)
            if (target == "#menu1") {
                $(
                    "select[name=progressQuoId], select[name=progressId], select[name=assignedTos], select[name=districts], select[name=statusIds]"
                ).val(null)
                $(
                    "select[name=progressQuoId], select[name=progressId], select[name=assignedTos], select[name=districts], select[name=statusIds]"
                ).select2({ maximumSelectionLength: 1 })
                $("select[name=progressQuoId], select[name=progressId]").prop(
                    "disabled",
                    true
                )
            }
        })
    }

    return {
        loadFilter,
        loadCrmsSelect,
    }
})()

const getPermission = currentUser.permissions.filter(
    (permission) =>
    permission.actionCode === "list" && permission.entityCode === "deal"
)

const _indexVariables = {
    _dataPost: {
        fromDate: moment().subtract(1, "months").startOf("day").unix() * 1000,
        districtId: null,
        wardId: null,
        zoneField: null,
        teamField: null,
        departmentField: null,
        memberField: null,
    },
    _dataPostMatrixFilter: {
        fromDate: moment().subtract(1, "months").startOf("day").unix() * 1000,
        districtId: null,
        wardId: null,
        zoneField: null,
        teamField: null,
        departmentField: null,
        memberField: null,
    },
    _defaultSelected: {
        zoneIds: [{
            id: "",
            text: "--None Zone--",
        }, ],
        teamIds: [{
            id: "",
            text: "--None Team--",
        }, ],
        departmentIds: [{
            id: "",
            text: "--None Phòng ban--",
        }, ],
        userIds: [{
            id: "",
            text: "--None Thành viên--",
        }, ],
        wardIds: [{
            id: "",
            text: "--None Phường--",
        }, ],
        districtIds: [{
            id: "",
            text: "--None Quận--",
        }, ],
    },
    _filter: {
        fromDate: moment().subtract(1, "months").startOf("day").unix() * 1000,
        districtId: null,
        wardId: null,
        zoneField: null,
        teamField: null,
        departmentField: null,
        memberField: null,
    },
    stored: {
        districtId: null,
        wardId: null,
        zoneField: null,
        teamField: null,
        departmentField: null,
        memberField: null,
    },
}
class CRMReassignDeals {
    constructor() {
        this._columns = columns(); // function columns from ba-dashboard/common-split-matrix.js
        // initial data
        this.bindEvent()
        this.loadApi()
        this.reloadList()
    }

    resetFilter() {
        $(".filter-content input,.filter-content select, .filter-content input,.filter-content select").each(function() {
            if ($(this).is("input")) {
                $(this).val(null);
            }
            if ($(this).is("select")) {
                $(this).val(null).trigger("change");
            }
        })
    }

    /**
     * function load API
     */
    async loadApi() {
            getInputFilters("GET_ZONES", _indexVariables, getPermission)
            getInputFilters("GET_TEAMS", _indexVariables, getPermission)
            getInputFilters("GET_DEPARTMENTS", _indexVariables, getPermission)
            getInputFilters("GET_MEMBERS", _indexVariables, getPermission)
            getInputFilters("GET_DISTRICT", _indexVariables, getPermission)
            getInputFilters("GET_WARDS", _indexVariables, getPermission)
        }
        /**
         * function load bindEvent
         */

    bindEvent() {
        const that = this

        $(".fromDate").datepicker({
            format: "dd/mm/yyyy",
        })
        $(".fromDate").datepicker(
            "setDate",
            new Date(_indexVariables._dataPost.fromDate)
        )
        $(".toDate").datepicker({
            format: "dd/mm/yyyy",
        })
        $(".toDate").datepicker("setDate", new Date())

        if ($("#btn_filter_button_deal").length > 0) {
            document
                .getElementById("btn_filter_button_deal")
                .addEventListener("click", function() {
                    showPropzyLoading()

                    // destroy datatable to recall to get data if click search
                    $("#lead-list").dataTable().fnDestroy()

                    var urlGenerateGroupBtn = "/deal/generate-filter-deal-button"
                    const dataPostGroupBtn = that.updateFilter(urlGenerateGroupBtn)
                    if (isArray(dataPostGroupBtn.memberField)) {
                        if (dataPostGroupBtn.memberField[0] !== null) {
                            dataPostGroupBtn.memberField = dataPostGroupBtn.memberField.join(
                                ","
                            )
                        } else {
                            dataPostGroupBtn.memberField = null
                        }
                    }
                    if (isArray(dataPostGroupBtn.districtId)) {
                        if (dataPostGroupBtn.districtId[0] !== null) {
                            dataPostGroupBtn.districtId = dataPostGroupBtn.districtId.join(
                                ","
                            )
                        } else {
                            dataPostGroupBtn.districtId = null
                        }
                    }

                    $.post(
                        urlGenerateGroupBtn, {
                            ...dataPostGroupBtn,
                        },
                        function(response) {
                            $("#wrap_group_button_deal").html(response)
                            // get url with some get fields to load table
                            const urlGenerateListDeal = "/deal/get-list-deal/-1"

                            that.loadTable(urlGenerateListDeal)
                            hidePropzyLoading()

                            return false
                        }
                    )

                    return false
                })
        }

        // init bind event common
        bindEventByPermission(_indexVariables, getPermission)
    }

    updateFilter() {
        let dataPost = {}
        if ($(".fromDate").is(":visible")) {
            var fromDate = $(".fromDate").val().trim()
            if (fromDate != "") {
                fromDate = moment(fromDate, "DD/MM/YYYY").unix() * 1000
                dataPost.fromDate = fromDate
            } else {
                dataPost.fromDate = null
            }

            var toDate = $(".toDate").val().trim()
            if (toDate != "") {
                toDate = moment(toDate, "DD/MM/YYYY").unix() * 1000
                dataPost.toDate = toDate
            } else {
                dataPost.toDate = null
            }
        } else {
            dataPost.fromDate = _indexVariables._dataPost.fromDate
            // dataPost.fromDate = null
            dataPost.toDate = moment().unix() * 1000
        }

        if ($("#zoneField").is(":visible")) {
            let zoneField = _indexVariables._dataPost.zoneField
            if (isArray(zoneField)) {
                zoneField = zoneField.join(",")
            }

            dataPost.zoneField = zoneField
        }
        if ($("#departmentField").is(":visible")) {
            let departmentField = _indexVariables._dataPost.departmentField
            if (isArray(departmentField)) {
                departmentField = departmentField.join(",")
            }

            dataPost.departmentField = departmentField
        }
        if ($("#teamField").is(":visible")) {
            let teamField = _indexVariables._dataPost.teamField
            if (isArray(teamField)) {
                teamField = teamField.join(",")
            }

            dataPost.teamField = teamField
        }
        if ($("#districtId").is(":visible")) {
            const districtId = [_indexVariables._dataPost.districtId]
                /* if (isArray(districtId)) {
                          districtId = districtId.join(",")
                      } */

            dataPost.districtId = districtId
        }
        if ($("#wardId").is(":visible")) {
            let wardId = _indexVariables._dataPost.wardId
            if (isArray(wardId)) {
                wardId = wardId.join(",")
            }

            dataPost.wardId = wardId
        }
        if ($("#memberField").is(":visible")) {
            const memberField = [_indexVariables._dataPost.memberField]
                /* if (isArray(memberField)) {
                          memberField = memberField.join(",")
                      } */

            dataPost.memberField = memberField
        }

        // new update filter
        dataPost.listingTypeId = $("#listingTypeId").val()
        dataPost.propertyTypeId = $("#propertyTypeId").val()
        dataPost.scoreCardType = $("#scoreCardType").val()
        dataPost.dealId = $("#inputDealId").val() !== "" ? $("#inputDealId").val().split(",") : [];

        return dataPost
    }
    reloadList() {
        $("#btn_filter_button_deal").trigger("click")
    }
    loadTable(url, limit = 10) {
        const postData = this.updateFilter()

        // check this to fix getting list deals with
        // memberField and districtId are string
        if (isArray(postData.memberField)) {
            if (postData.memberField[0] !== null) {
                postData.memberField = postData.memberField.join(",")
            } else {
                postData.memberField = null
            }
        }
        if (isArray(postData.districtId)) {
            if (postData.districtId[0] !== null) {
                postData.districtId = postData.districtId.join(",")
            } else {
                postData.districtId = null
            }
        }

        var tableList = $("#lead-list").DataTable({
            processing: true,
            serverSide: true,
            ajax: {
                url,
                type: "POST",
                data: postData,
            },
            scrollX: false,
            lengthChange: true,
            autoWidth: false,
            lengthMenu: [
                [10, 25, 50],
                [10 + " records", 25 + " records", 50 + " records"],
            ],
            pagingType: "full_numbers",
            iDisplayLength: limit,
            initComplete: function(settings, json) {
                $(`#input-search-matrix`).on('keyup', function() {
                    tableList.search(this.value).draw();
                });
            },
            drawCallback: function(oSettings) {

                // close filter
                window.closeFilterInTypescript();

                $(".dataTables_paginate > .pagination").addClass("pagination-sm")
                var pagination = $(this)
                    .closest(".dataTables_wrapper")
                    .find(".dataTables_paginate")
                pagination.toggle(this.api().page.info().pages > 1)

                $('[data-toggle="popover"]').popover()

                $("body").on("click", function(e) {
                    //did not click a popover toggle or popover
                    if (
                        $(e.target).data("toggle") !== "popover" &&
                        $(e.target).parents(".popover.in").length === 0
                    ) {
                        $('[data-toggle="popover"]').popover("hide")
                    }
                })
            },
            columns:this._columns,
            order: [[16, "desc"]],
            // dom: 'lrtip',
            language: {
                search: "Tìm kiếm",
                paginate: {
                    previous: "<",
                    next: ">",
                    first: "|<",
                    last: ">|",
                },
                lengthMenu: "Hiển thị _MENU_ trên 1 trang",
                searchPlaceholder: "SDT, Tên, Email",
                info: "Hiển thị _START_ đến _END_ của _TOTAL_",
                emptyTable: "Chưa có dữ liệu",
                infoEmpty: "",
            },
            createdRow: function(row, data, index) {
                if (!data.isActivated) {
                    $("td", row).parent("tr").addClass("unactivated")
                }
                if (data.isNew) {
                    $("td", row).parent("tr").addClass("item-new")
                }
            },
        })
    }
}

$(document).ready(function() {
    Window.CRMReassignDeals = new CRMReassignDeals()
})

const CONTENT_CLASSNAME = 'collected-content';
const CUSTOM_DELETE_EVENT = 'deleteEvent';
const CUSTOM_ONCHANGE_EVENT = 'onChangeEvent';

/**
 * Convert epoch time to string
 * yyyy-MM-dd
 */

const numberToDate = number => {
    const datetime = new Date(+number);

    const date = (`0${datetime.getDate()}`).slice(-2);
    const mon = (`0${datetime.getMonth() + 1}`).slice(-2);
    const year = datetime.getFullYear();

    const result = `${year}-${mon}-${date}`;
    return result;
}

/**
 * Generate a random id
 */
const idGenerator = () => {
    // Math.random should be unique because of its seeding algorithm.
    // after the decimal.
    return Math.ceil(Math.random() * 10000000000000000);
};

/**
 * Add . to money
 */
const ALLOWED_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const handkeKeyUp = (e) => {
    if (!ALLOWED_CHARS.includes(e.key)) {
        return e.target.value.slice(0, -1);
    }

    if (e.key === ',' && e.target.value.indexOf(',') >= 0) {
        return e.target.value.slice(0, -1);
    }

    return numberToCurrency(parseInt(currencyToNumber(e.target.value.toString())));
}

/**
 * Convert number to currency string format
 * @param {*} number 1000000.56
 * Output format 1.000.000,56
 */

const numberToCurrency = number => {
    // Convert number to string
    let value = `${number}`;

    // Add . to amount of money
    let thousandPart = (value.split(',')[0]).replace(/\./g, '');
    let decimalPart = value.split(',')[1] || '';

    let count = 0;
    let tmp = '';
    if (thousandPart) {
        let i = thousandPart.length - 1;
        while (i >= 0) {
            count++;
            tmp = thousandPart[i].concat(tmp);

            if (count === 3 && i > 0) {
                tmp = '.'.concat(tmp);
                count = 0;
            }

            i--;
        }
        value = `${tmp}${(decimalPart || value.includes(',')) ? ',' : ''}${decimalPart}`;
    }
    return value;
}

/**
 * Convert currency to number
 */
const currencyToNumber = amount => {
    let value = `${amount}`.replace(/\./g, '');
    let result = +value.replace(',', '.');
    return result;
}

class CollectMoneyRow extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {

        // const amount = this.getAttribute('amount');
        // this.setAttribute('amount', numberToCurrency(amount));

        const date = this.getAttribute('date');
        this.setAttribute('date', numberToDate(date));

        this.render();

        document.addEventListener('change', e => {
            if (e.target && e.target.id == 'isCollected') {
                // Event on checkbox changes
                const isChecked = e.target.checked;

                const collectRow = e.target.parentElement.parentElement.parentElement;

                collectRow.setAttribute('checked', isChecked);

                this.onChangeEvent(e, { isChecked });
            } else if (e.target && e.target.id == 'date') {
                // Event on date change
                const date = e.target.value;

                const collectRow = e.target.parentElement.parentElement.parentElement;

                collectRow.setAttribute('date', date);

                this.onChangeEvent(e, { date });
            }
        })

        document.addEventListener('click', e => {
            if (e.target && e.target.id == 'deleteIcon') {
                const collectRow = e.target.parentElement.parentElement.parentElement;
                const id = collectRow.getAttribute('id');

                // Event on clicking delete icon button
                const deleteEvent = new CustomEvent(CUSTOM_DELETE_EVENT, {
                    bubbles: true,
                    detail: { data: () => ({ id }) }
                });
                this.dispatchEvent(deleteEvent);
            }
        });

        const amountEl = this.querySelector('#amount');
        amountEl.addEventListener('keyup', (e) => {
            let value = handkeKeyUp(e);
            // input format 1000000.56
            value = value.replace(/\./g, ''); // Remove . 
            let amount = numberToCurrency(value);
            e.target.value = `${amount}`;
        });

        amountEl.addEventListener('change', e => {
            const amount = currencyToNumber(e.target.value);
            const collectRow = e.target.parentElement.parentElement.parentElement;
            collectRow.setAttribute('amount', amount);
            // Convert currency to number
            this.onChangeEvent(e, { amount });
        })
    }

    onChangeEvent(e, {...args }) {
        const collectRow = e.target.parentElement.parentElement.parentElement;
        const id = collectRow.getAttribute('id');
        const amount = collectRow.getAttribute('amount');
        const date = collectRow.getAttribute('date');
        const isChecked = collectRow.getAttribute('checked');

        const onChangeEventCustom = new CustomEvent(CUSTOM_ONCHANGE_EVENT, {
            bubbles: true,
            detail: { data: () => ({ id, amount, date, isChecked, ...args }) }
        });

        this.dispatchEvent(onChangeEventCustom);
    }

    render() {

        this.innerHTML = `
      <div class="row modal-row" style="min-width:900px">
        <div class="col-md-2">Số tiến:</div>

        <div class="col-md-2">
          <input type="string" id="amount" value=${this.getAttribute('amount')} class="form-control" placeholder="Nhập số tiền" />
        </div>

        <div class="col-md-2">Ngày thu:</div>

        <div class="col-md-3">
          <input type="date" id="date" class="form-control" value=${this.getAttribute('date')} />
        </div>

        <div class="col-md-2">
          <input type="checkbox" id="isCollected" ${this.getAttribute('checked') === 'true' ? 'checked' : ''}/> Đã thu
        </div>

        <div class="col-md-1">
          <i id="deleteIcon" class="fa fa-times text-danger collect-money-row-delete"></i>
        </div>
      </div>
    `
    }
}

customElements.define('collect-money-row', CollectMoneyRow);

// Class defines a custom element
class CollectMoneyModal extends HTMLElement {

    constructor() {
        super();
        this.totalCommissionValue = 0;
        this.totalCommissionRemain = 0;
        this.note = '';
        this.details = [];
    }

    /**
     * Browser calls this method when the element is added to the document
     */
    connectedCallback() {
        this.render();

        this.setAttribute('class', 'modal-container');

        this.addEventListener('click', this.handleModalClick);

        const noteEl = this.querySelector('#note');
        const totalEl = this.querySelector('#totalValue');
        const remainEl = this.querySelector('#totalRemain');
        const collectedRows = this.querySelector('#collectedRows');
        const collectBtn = this.querySelector('#collect');

        // Get details
        const depositeid = this.getAttribute('depositeid');
        const params = new URLSearchParams();
        params.append('depositeid', `${depositeid}`);
        const url = `deal/getCollectedMoneyDetails?${params}`;

        showPropzyLoading();

        // Get list of ids returned by backend
        let oldCollectedIds = [];

        fetch(url)
            .then(res => res.json())
            .then(res => {
                hidePropzyLoading();
                const {
                    totalCommissionValue,
                    totalCommissionRemain,
                    note,
                    details
                } = res.data.data;

                this.totalCommissionValue = numberToCurrency(totalCommissionValue);
                this.totalCommissionRemain = numberToCurrency(totalCommissionRemain);
                this.note = note ? note : '';
                this.details = details.map(detail => {

                    oldCollectedIds.push(detail.collectId);

                    return {
                        ...detail,
                        id: detail.collectId
                    }
                });

                totalEl.innerHTML = `Doanh thu: ${this.totalCommissionValue}`;
                remainEl.innerHTML = `Còn lại: ${this.totalCommissionRemain}`;
                noteEl.innerHTML = this.note;

                details.forEach(detail => {
                    // Create a new row element
                    const newRowEl = document.createElement('collect-money-row');
                    newRowEl.setAttribute('id', detail.collectId);
                    newRowEl.setAttribute('amount', numberToCurrency(detail.collectPrice));
                    newRowEl.setAttribute('date', detail.expectedDate);
                    newRowEl.setAttribute('checked', detail.status);

                    //Add new row
                    collectedRows.appendChild(newRowEl);
                })

            }).catch(_ => {
                hidePropzyLoading();
            })

        this.addEventListener(CUSTOM_DELETE_EVENT, e => {
            // Cannot delete last row
            if (this.details.length > 1) {
                const details = e.detail.data();
                const id = details.id;
                // Remove row
                this.details = this.details.filter(detail => detail.collectId != id);

                // Remove collect-money-row with id
                const deletedEl = collectedRows.querySelector(`[id="${id}"]`);
                if (deletedEl) {
                    deletedEl.remove();
                }
            }
        })

        noteEl.addEventListener('keyup', e => {
            const value = e.target.value;
            this.note = value;
        });

        /**
         * Event on click collect button
         */

        collectBtn.addEventListener('click', () => {
            const {
                totalCommissionValue,
                totalCommissionRemain,
                note,
                details
            } = this;

            const depositId = this.getAttribute('depositeid');
            if (depositId) {

                // Check if total amount cannot be greater remain
                const sum = details.reduce((acc, cur) => acc + parseFloat(cur.collectPrice), 0);

                if (sum > parseFloat(totalCommissionValue.replace(/\./g, '').replace(/\,/g, '.'))) {

                    showPropzyAlert('Tổng số tiền không được lớn hơn doanh thu');
                    return false;

                } else if (!note) {

                    showPropzyAlert('Ghi chú không được để trống');
                    return false;

                } else {
                    // Validate all amount and date
                    let isValid = true;
                    details.forEach(detail => {
                        if (!detail.collectPrice || detail.collectPrice === '0' || !detail.expectedDate) {
                            isValid = false;
                        }
                    })

                    if (!isValid) {
                        showPropzyAlert('Số tiền hoặc ngày thu không hợp lệ');
                        return false;
                    } else {

                        const Http = new XMLHttpRequest();
                        const url = '/deal/postBsaMoneyCollect';

                        Http.open('POST', url, true);
                        Http.setRequestHeader('Content-Type', 'application/json');

                        Http.send(JSON.stringify({
                            depositId,
                            totalCommissionValue: currencyToNumber(totalCommissionValue),
                            totalCommissionRemain: currencyToNumber(totalCommissionRemain),
                            note,
                            details: details.map(it => ({
                                collectId: oldCollectedIds.includes(+it.id) ? +it.id : null,
                                collectPrice: currencyToNumber(it.collectPrice),
                                expectedDate: it.expectedDate,
                                status: (it.status === true || it.status === 'true') ? true : false
                            }))
                        }));

                        showPropzyLoading();

                        try {
                            Http.onreadystatechange = (e) => {
                                const res = JSON.parse(Http.response);
                                hidePropzyLoading();
                                if (res.result) {

                                    showPropzyAlert('Cập nhật lịch thu tiền thành công');

                                    // Close modal
                                    const overlay = document.querySelector('#overlay');
                                    // Get all child element of overlay
                                    for (let node of overlay.childNodes) {
                                        overlay.removeChild(node)
                                    }

                                } else {
                                    showPropzyAlert('Có lỗi xảy ra');
                                }
                            }
                        } catch (ex) {
                            hidePropzyLoading();
                        }
                    }
                }
            }
        })

        document.addEventListener('click', (e) => {
            if (e.target && e.target.id == 'addRow') {
                e.preventDefault();
                /**
                 * Handle event on add more row
                 */
                // Add new item to details array
                const rowId = idGenerator();
                this.details.push({
                    id: null,
                    collectId: rowId,
                    collectPrice: 0,
                    expectedDate: null,
                    status: false
                });

                // Create a new row element
                const newRowEl = document.createElement('collect-money-row');
                newRowEl.setAttribute('id', rowId);
                newRowEl.setAttribute('amount', 0);
                newRowEl.setAttribute('date', null);
                newRowEl.setAttribute('checked', false);

                //Add new row
                collectedRows.appendChild(newRowEl);
            }
        });

        /**
         * Handle event on input/select changes
         */
        this.addEventListener(CUSTOM_ONCHANGE_EVENT, e => {
            const details = e.detail.data();
            this.details = this.details.map(it => {
                if (it.collectId == details.id) {
                    return ({
                        id: +details.id,
                        collectId: +details.id,
                        collectPrice: details.amount,
                        expectedDate: (new Date(details.date)).getTime(),
                        status: details.isChecked
                    });
                }
                return it;
            })
        });

    }

    handleModalClick(event) {
        let closed = true;

        const paths = event.path;
        Array.from(paths).forEach(path => {
            let classes = Array.from(path.classList || []);
            classes.forEach(cl => {
                if (cl === CONTENT_CLASSNAME) {
                    closed = false;
                }
            })
        });

        if (closed) {
            const overlay = document.querySelector('#overlay');
            for (let node of overlay.childNodes) {
                overlay.removeChild(node)
            }
        }
    }

    /**
     * Browser calls this methods when the element is removed from the document
     */
    disconnectedCallback() {
        this.removeEventListener('click', this.handleModalClick);
    }

    render() {

        this.innerHTML = `
      <div class="collected-content">
        <div class="row modal-row">
          <div class="col-sm-12">
            <h3 class="text-center">Thu tiền</h3>
          </div>
        </div>

        <div class="row modal-row">
          <div class="col-sm-6" id="totalValue"></div>
          <div class="col-sm-6" id="totalRemain"></div>
        </div>

        <div id="collectedRows"></div>

        <i id="addRow" class="fa fa-plus text-success collect-money-row-add"></i>

        <div class="row modal-row">
          <div class="col-sm-2">Ghi chú (*):</div>
          <div class="col-sm-10">
            <textarea id="note" class="form-control" rows="4"></textarea>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 collect-button">
            <button id="collect" class="btn btn-primary">Hoàn tất</button>
          </div>
        </div>
      </div>
    `
    }
}

customElements.define('collect-money-modal', CollectMoneyModal);

/**
 * Handle event on click collect money button
 * Open collect money modal
 * @param depositeId 
 * */

function handleCollectedMoney(depositId) {
    // Create BA/BSA modal
    const modal = document.createElement('collect-money-modal');
    modal.setAttribute('depositeid', depositId);

    const overlay = document.querySelector('#overlay');
    // Get all child element of overlay and remove
    for (let node of overlay.childNodes) {
        overlay.removeChild(node)
    }

    // Append a new modal
    overlay.appendChild(modal);
}