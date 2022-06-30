const table = "#list-deal-matrix";
class ListDealMatrix {
    constructor() {
        this._columns = columns(); // function columns from ba-dashboard/common-split-matrix.js
        // initial data
        this.bindEvent()
        this.loadApi()
            // this.reloadList()
    }

    resetFilter() {
        // .modal-expand-matrix
        $(".modal-expand-matrix .filter-content input, .modal-expand-matrix .filter-content select, .modal-expand-matrix .filter-content input, .modal-expand-matrix .filter-content select").each(function() {
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
            getInputFiltersMatrix("GET_ZONES", _indexVariables, getPermission)
            getInputFiltersMatrix("GET_TEAMS", _indexVariables, getPermission)
            getInputFiltersMatrix("GET_DEPARTMENTS", _indexVariables, getPermission)
            getInputFiltersMatrix("GET_MEMBERS", _indexVariables, getPermission)
            getInputFiltersMatrix("GET_DISTRICT", _indexVariables, getPermission)
            getInputFiltersMatrix("GET_WARDS", _indexVariables, getPermission)
        }
        /**
         * function load bindEvent
         */

    destroyTable() {
        $(table).dataTable().destroy();
    }


    bindEvent() {
        const that = this

        $(".fromDate").datepicker({
            format: "dd/mm/yyyy",
        })
        $(".fromDate").datepicker(
            "setDate",
            new Date(_indexVariables._dataPostMatrixFilter.fromDate)
        )
        $(".toDate").datepicker({
            format: "dd/mm/yyyy",
        })
        $(".toDate").datepicker("setDate", new Date())

        if ($(".modal-expand-matrix #btn_filter_button_deal").length > 0) {
            document
                .querySelector(".modal-expand-matrix #btn_filter_button_deal")
                .addEventListener("click", function() {
                    showPropzyLoading()

                    // destroy datatable to recall to get data if click search
                    $(table).dataTable().fnDestroy()

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
                            const urlGenerateListDeal = "deal/get-list-deal/-1"

                            that.loadTable(urlGenerateListDeal)
                                // hidePropzyLoading()

                            return false
                        }
                    )

                    return false
                })
        }

        DealFunctionsMatrix.init(); // at deal-function-split-matrix.js

        // init bind event common
        bindEventByPermissionMatrix(_indexVariables, getPermission)
    }

    updateFilter() {
        let dataPost = {}
        const wrapBlock = ".modal-expand-matrix";

        if ($(`${wrapBlock}`).has('#salePipeLineReport').length) {
            dataPost.salePipeLineReport = true;
        }

        if ($(`${wrapBlock} .fromDate`).is(":visible")) {
            var fromDate = $(`${wrapBlock} .fromDate`).val().trim()
            if (fromDate != "") {
                fromDate = moment(fromDate, "DD/MM/YYYY").unix() * 1000
                dataPost.fromDate = fromDate
            } else {
                dataPost.fromDate = null
            }

            var toDate = $(`${wrapBlock} .toDate`).val().trim()
            if (toDate != "") {
                toDate = moment(toDate, "DD/MM/YYYY").unix() * 1000
                dataPost.toDate = toDate
            } else {
                dataPost.toDate = null
            }
        } else {
            // dataPost.fromDate = _indexVariables._dataPostMatrixFilter.fromDate
            dataPost.fromDate = null
            dataPost.toDate = moment().unix() * 1000
        }

        if ($(`${wrapBlock} #zoneField`).is(":visible")) {
            let zoneField = _indexVariables._dataPostMatrixFilter.zoneField
            if (isArray(zoneField)) {
                zoneField = zoneField.join(",")
            }

            dataPost.zoneField = zoneField
        }
        if ($(`${wrapBlock} #departmentField`).is(":visible")) {
            let departmentField = _indexVariables._dataPostMatrixFilter.departmentField
            if (isArray(departmentField)) {
                departmentField = departmentField.join(",")
            }

            dataPost.departmentField = departmentField
        }
        if ($(`${wrapBlock} #teamField`).is(":visible")) {
            let teamField = _indexVariables._dataPostMatrixFilter.teamField
            if (isArray(teamField)) {
                teamField = teamField.join(",")
            }

            dataPost.teamField = teamField
        }
        if ($(`${wrapBlock} #districtId`).is(":visible")) {
            const districtId = [_indexVariables._dataPostMatrixFilter.districtId]
                /* if (isArray(districtId)) {
                          districtId = districtId.join(",")
                      } */

            dataPost.districtId = districtId
        }
        if ($(`${wrapBlock} #wardId`).is(":visible")) {
            let wardId = _indexVariables._dataPostMatrixFilter.wardId
            if (isArray(wardId)) {
                wardId = wardId.join(",")
            }

            dataPost.wardId = wardId
        }
        if ($(`${wrapBlock} #memberField`).is(":visible")) {
            const memberField = [_indexVariables._dataPostMatrixFilter.memberField]
                /* if (isArray(memberField)) {
                          memberField = memberField.join(",")
                      } */

            dataPost.memberField = memberField
        }

        // new update filter
        dataPost.listingTypeId = $(`${wrapBlock} #listingTypeId`).val()
        dataPost.propertyTypeId = $(`${wrapBlock} #propertyTypeId`).val()
        dataPost.scoreCardType = $(`${wrapBlock} #scoreCardType`).val()
        dataPost.dealId = $(`${wrapBlock} #inputDealId`).val() !== "" ? $(`${wrapBlock} #inputDealId`).val().split(",") : [];

        return dataPost
    }
    reloadList() {
        //.modal-expand-matrix 
        $(".modal-expand-matrix #btn_filter_button_deal").trigger("click")
    }
    loadTable(url, limit = 10) {
        const postData = this.updateFilter()
        const wrapBlock = ".modal-expand-matrix";

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

        var tableMatrix = $(table).DataTable({
            processing: true,
            serverSide: true,
            ajax: {
                url,
                type: "POST",
                data: postData,
            },
            scrollX: false,
            lengthChange: true,
            autoWidth: true,
            lengthMenu: [
                [10, 25, 50],
                [10 + " records", 25 + " records", 50 + " records"],
            ],
            pagingType: "full_numbers",
            iDisplayLength: limit,
            initComplete: function(settings, json) {
                $(`${wrapBlock} #input-search-matrix`).on('keyup', function() {
                    tableMatrix.search(this.value).draw();
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
            columns: this._columns,
            order: [
                [12, "desc"]
            ],
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
                //console.log(data);
                if (!data.isActivated) {
                    $("td", row).parent("tr").addClass("unactivated")
                }
                if (data.isNew) {
                    $("td", row).parent("tr").addClass("item-new")
                }
            },
        }).on('draw', () => {
            hidePropzyLoadingBPO();
            hidePropzyLoading();
        })
    }
}

$(document).ready(function() {
    Window.ListDealMatrix = ListDealMatrix;
})