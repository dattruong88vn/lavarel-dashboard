var ReassignLeads = (function () {
    var loadCrmsSelect = function (element = "") {
        $.ajax({
            url: "/account/get-list-json/5?active=true",
            type: "get",
        }).done(function (response) {
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
                    $.each($(".crm_select").val(), function (k, v) {
                        $(".crm_except option[value=" + v + "]").prop(
                            "disabled",
                            true
                        )
                    })
                }
            }
            // $(".crms.crms-from").html(html);
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

    $(".crms-from").change(function () {
        if ($(this).val() != null) {
            $("#filter").removeClass("disabled")
            $("input[name=searchKeywords]").removeAttr("disabled")
            $("select[name=districts], select[name=statusIds]").prop(
                "disabled",
                false
            )
        } else {
            // location.reload();
            // $('#filter').addClass('disabled');
            // $('select[name=progressQuoId], select[name=districts], select[name=statusIds]').prop("disabled", true);
            // $('select[name=progressQuoId], select[name=districts], select[name=statusIds]').val(null).trigger('change');
            // $('input[name=searchKeywords]').attr('disabled','disabled');
            // $('input[name=searchKeywords]').val('');
        }
        // $(".btnReassign").hide();
        // loadLeads();
    })

    $("select[name=progressId]").change(function () {
        var statusIds = []
        if ($(this).val() != null) {
            $.each($(this).val(), function (k, v) {
                statusIds.push(
                    $("select[name=progressId]")
                        .find("option[value=" + v + "]")
                        .data("statusid")
                )
            })
            console.log(statusIds)
            $.each($("select[name=statusIds]").val(), function (k, v) {
                v = parseInt(v)
                if (jQuery.inArray(v, statusIds) === -1) {
                    // console.log(v);
                    $("select[name=statusIds]")
                        .find("option[value=" + v + "]")
                        .prop("selected", false)
                    $("select[name=statusIds]").trigger("change")
                }
            })
        } else {
            // $('select[name=statusIds]').val(null).select2();
            // $('select[name=statusIds]').find('option').prop('selected',false);
            // $('select[name=statusIds]').trigger('change');
        }
    })

    $("select[name=statusIds]").change(function () {
        if ($(this).val() != null) {
            if (jQuery.inArray("13", $(this).val()) !== -1) {
                // $("select[name=progressQuoId]").append($('#forPending').html());
                $("select[name=statusIds]")
                    .find("option")
                    .removeAttr("selected")
                $("select[name=statusIds]")
                    .find("option[value=13]")
                    .prop("selected", true)
                $("select[name=progressQuoId]").trigger("change")
                $("select[name=progressQuoId]").prop("disabled", false)

                $("select[name=progressId]").prop("disabled", true)
                $("select[name=progressId]").val(null).select2()
                // $.notify('Bỏ chọn pending để chọn các trạng thái khác.');
                $("#warning_pending").removeClass("hidden")
            } else {
                $("#warning_pending").addClass("hidden")
                $("select[name=progressQuoId]").prop("disabled", true)
                $("select[name=progressQuoId]").val(null).trigger("change")
                $.ajax({
                    url: "/common/get-progress/lead",
                    type: "post",
                    data: JSON.stringify({statusIds: $(this).val()}),
                })
                    .done(function (response) {
                        $("select[name=progressId]").html("")
                        $.each(response, function (k, item) {
                            var selected = ""
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
                            )
                        })

                        // $('select[name=progressId]').trigger('change');
                        $("select[name=progressId]").prop("disabled", false)
                        console.log(response)
                        return false
                    })
                    .always(function () {
                        // hidePropzyLoading();
                    })
                // $('select[name=progressQuoId]').prop("disabled", true);
                // $('select[name=progressQuoId]').val(null).trigger('change');
            }

            // if(jQuery.inArray("28", $(this).val()) !== -1){
            //     $('select[name=progressQuoId]').prop("disabled", false);
            // }else{
            //     $('select[name=progressQuoId]').prop("disabled", true);
            //     $('select[name=progressQuoId]').val(null).trigger('change');
            // }
        } else {
            $("select[name=progressQuoId],select[name=progressId]").prop(
                "disabled",
                true
            )
            $("select[name=progressQuoId],select[name=progressId]")
                .val(null)
                .select2()
        }
        // if($(this).val() != null){
        //     $.ajax({
        //         'url': '/common/get-progress/lead',
        //         'type': 'post',
        //         'data': JSON.stringify({'statusIds':$(this).val()})
        //     }).done(function (response) {
        //         $("select[name=progressQuoId]").html('');
        //         $.each(response,function(k,item){
        //             $("select[name=progressQuoId]").append("<option value='"+item.progressId+"'>"+item.progressName+"</option>");
        //         })

        //         $('select[name=progressQuoId]').trigger('change');
        //         $('select[name=progressQuoId]').prop("disabled", false);
        //         console.log(response);return false;
        //     }).always(function () {
        //         // hidePropzyLoading();
        //     });
        //     // if(jQuery.inArray("13", $(this).val()) !== -1){
        //     //     $('select[name=progressQuoId]').prop("disabled", false);
        //     // }else{
        //     //     $('select[name=progressQuoId]').prop("disabled", true);
        //     //     $('select[name=progressQuoId]').val(null).trigger('change');
        //     // }
        // }else{
        //     $('select[name=progressQuoId]').prop("disabled", true);
        //     $('select[name=progressQuoId]').val(null).trigger('change');
        // }
        // $(".btnReassign").hide();
        // loadDeals();
    })

    var initPostData = function () {
        return {
            customerIds: [],
            assignedTo: null,
            reason: null,
        }
    }

    var filterExistedCustomerId = function (data, customerId) {
        return customerId == data
    }

    var reassignData = initPostData()
    $(".btnReassign").on("click", function (event) {
        event.preventDefault()
        reassignData = initPostData()
        let leadIds = []
        $(".select-customer:checked").each(function () {
            var customerId = $(this).val()
            if (reassignData.customerIds.filter(filterExistedCustomerId).length <= 0) {
                reassignData.customerIds.push(customerId);
            }

            // get leads then parse lead id to array

            const dataRow = dataTableLeads.row($(this).parents("tr")).data();
            if(!dataRow.leads) {
                leadIds.push(dataRow.leadId);
                return;
            }
            dataRow.leads.map((lead) => leadIds.push(lead.leadId))
        })
        reassignData.leadIds = leadIds

        var rootHtml = $(".crms.crms-from")
        var cloneHtml = $("<div>")
        $.each(rootHtml.find("option"), function (key, item) {
            if ($(item).attr("value") != rootHtml.find(":selected").val())
                cloneHtml.append($(item).clone())
        })
        $(".crms.crms-to").html(cloneHtml.html())

        modalReassignLeads.modal()
    })

    $("#modalReassignLeads").on("shown.bs.modal", function () {
        $("#modalReassignLeads").find(".assignedTos").select2()
        loadCrmsSelect(".crm_except")
    })

    var dataTableLeads = null
    var loadLeads = function () {
        try {
            dataTableLeads.destroy()
        } catch (ex) {}
        var ajax = {}
        ajax.url = "/crm-manager/get-leads-by-crms"
        ajax.type = "POST"
        ajax.cache = false
        var filter = []
        if ($(".nav-tabs .active > a").attr("href") == "#home") {
            filter["strNeedIds"] = $("input[name=strNeedIds]").val()
        } else {
            $(".select_for_filter").each(function () {
                // console.log($(this).attr('name'))
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


        var limit = 50
        dataTableLeads = $("#dataTableLeads").DataTable({
            searching: false,
            paging: true,
            processing: true,
            pagingType: "full_numbers",
            serverSide: true,
            ajax: ajax,
            cache: false,
            scrollX: true,
            lengthChange: true,
            lengthMenu: [[50], [50 + " records"]],
            iDisplayLength: limit,
            columns: [
                {
                    data: "customerId",
                    render: function (data, type, object, meta) {
                        return (
                            "<input type='checkbox' class='select-customer' value='" +
                            data +
                            "' class='select-customer' />"
                        )
                    },
                    orderable: false,
                },
                {
                    data: "leads",
                    type: "num",
                    render: function (data, type, object, meta) {
                        if (!data) {
                            return object.leadId || 'N/A';
                        }
                        var result = "";
                        $.each(data, function (k, v) {
                            var progressQuoName = v.progressQuoName != null ? ' <span class="label label-info">' + v.progressQuoName + "</span>" : "";
                            var progressName = v.progressName != null ? ' <span class="label label-warning">' + v.progressName + "</span>" : "";
                            result += v.leadId + ' <span class="label label-primary">' + v.statusName + "</span>" + progressName + progressQuoName + "<br/>";
                        });
                        return result;
                    },
                },
                {
                    data: "leads",
                    render: function (data, type, object, meta) {
                        if (!data) {
                            return object.assignedName || 'N/A';
                        }
                        var result = ""
                        var assigname = []
                        $.each(data, function (k, v) {
                            assigname.push(v.assignedName)
                        })
                        var uniqueNames = []
                        $.each(assigname, function (i, el) {
                            if ($.inArray(el, uniqueNames) === -1)
                                uniqueNames.push(el)
                        })
                        $.each(uniqueNames, function (k, v) {
                            result += v + "<br/>"
                        })
                        return result
                    },
                },
                {data: "customerName"},
                {data: "customerId"},
            ],
            drawCallback: function (setting) {
                $(".dataTables_paginate > .pagination").addClass(
                    "pagination-sm"
                )
                var pagination = $(this)
                    .closest(".dataTables_wrapper")
                    .find(".dataTables_paginate")
                pagination.toggle(this.api().page.info().pages > 1)
                $(".select-all-customers").prop("checked", false)
                $(".select-customer").change(function () {
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

    var validatePostData = function (postData) {
        var isValidated = true
        $(".errors").html("")
        if (postData.reason.trim() === "") {
            $(".reason").parent().find(".errors").html("Nhập lý do")
            isValidated = false
        }
        if ("-1" == postData.assignedTo.trim()) {
            $(".crms-to").parent().find(".errors").html("Chọn người chuyển đến")
            isValidated = false
        }
        return isValidated
    }

    $(".btnSaveReassign").on("click", function (event) {
        reassignData.assignedTo = $(".crms-to").val()
        reassignData.reason = $(".reason").val()
        if (validatePostData(reassignData) == false) {
            return false
        }
        // console.log(reassignData);return false;
        showPropzyLoading()
        $.ajax({
            url: "/crm-manager/do-reassign-leads",
            type: "post",
            data: JSON.stringify(reassignData),
        })
            .done(function (response) {
                if (response.result) {
                    loadLeads()
                    $(".crms-to").val(-1)
                    $(".reason").val("")
                }
                showPropzyAlert(response.message)
                modalReassignLeads.modal("hide")
            })
            .always(function () {
                hidePropzyLoading()
            })
    })

    $(".select-all-customers").on("click", function () {
        $(".select-customer").prop("checked", $(this).prop("checked"))
        toggleReassignButton()
    })

    var modalReassignLeads = $("#modalReassignLeads")
    $("#filter").on("click", function () {
        loadLeads()
    })

    // $('input[name=strNeedIds]').keyup(function(){
    //     if($(this).val() != ''){
    //         $('#filter').removeClass('disabled')
    //     }else{
    //         // $('#filter').addClass('disabled');
    //     }
    // })

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault()
        var flag = false
        $(
            ".tab-content #home input, .tab-content #home select, .tab-content #menu1 input, .tab-content #menu1 select"
        ).each(function () {
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
    })

    var loadFilter = function () {
        $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
            try {
                $("#dataTableLeads tbody").empty()
                $("#dataTableLeads_wrapper .row:last").empty()
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
                loadCrmsSelect()
                $(
                    "select[name=progressQuoId], select[name=progressId], select[name=assignedTos], select[name=districts], select[name=statusIds]"
                ).select2({maximumSelectionLength: 1})
                $("select[name=progressQuoId], select[name=progressId]").prop(
                    "disabled",
                    true
                )
            }
        })
    }

    return {
        loadFilter: loadFilter,
        loadCrmsSelect: loadCrmsSelect,
    }
    // $(document).ready(function () {
    //     loadCrmsSelect();
    //     $('select[name=progressQuoId], select[name=assignedTos], select[name=districts], select[name=statusIds]').select2();
    //     $('select[name=progressQuoId], select[name=districts], select[name=statusIds]').prop("disabled", true);
    // })
})()
