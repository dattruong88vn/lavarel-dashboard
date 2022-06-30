var LeadDealByAgent = (function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    var tableLeadDealByAgent = null;
    var paramData = function () {
        var statusLead = $("#selectStatusLead").val();
        var statusDeal = $("#selectStatusDeal").val();
        var name = $("#txtBrokerName").val().trim();
        var email = $("#txtEmail").val().trim();
        var phone = $("#txtPhone").val().trim();
        var item = {
            "name": name != "" ? name : null,
            "email": email != "" ? email : null,
            "phone": phone != "" ? phone : null,
            "statusLead": statusLead != null ? statusLead.toString() : null,
            "statusDeal": statusDeal != null ? statusDeal.toString() : null
        };
        return item;
    };
    var loadData = function () { 
        var postData = paramData();
        if (tableLeadDealByAgent !== null) {
            tableLeadDealByAgent.destroy();
        }
        tableLeadDealByAgent = $("#tableLeadDealByAgent").DataTable({
            "lengthChange": false,
            "processing": true,
            "serverSide": true,
            "searching": false, 
            "order": [[11, "asc"], [0, "desc"], [8, "desc"]],
            "autoWidth": false,
            "ajax": {
                url: "/lead-deal-by-agent/get-data",
                type: 'post',
                data: function (d) {
                    Object.assign(d, postData);
                    return d;
                },
            },
            "language":{
                "paginate": {
                    previous: "Trước",
                    next: "Tiếp"
                },
                "info": "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục"
            },
            "drawCallback": function () {
                $('.getInfoAgent').on('click', function (e) {
                    e.preventDefault();
                    $('[data-toggle="popover"]').popover('destroy');
                    var index = $(this).closest('tr').find('td:first');
                    var data = tableLeadDealByAgent.row(index).data();
                    if (typeof data.agentName != 'undefined' ) {
                        var titleTooltip = "<b>Tên: </b>"+data.agentName+"<br/> <b>Số điện thoại: </b>"+data.phone+"<br/> <b>Email: </b>"+data.email;
                        $(this).popover({
                            html : true,
                            content: function() {
                                return titleTooltip;
                            },
                            title: function() {
                                return "Thông tin"
                            }
                        }).popover('show');
                    } else {
                        $(this).popover({
                            html : true,
                            content: function() {
                                return "Chưa có dữ liệu";
                            },
                            title: function() {
                                return "Thông tin";
                            }
                        }).popover('show');
                    }
                    return false;
                });
            },
            "columns": [
                {"data": "requestId", orderable: true},
                {"data": "dealId", orderable: false, render: function (data, type, object) {
                    var html = "<span>N/A</span>";
                    if(data)
                    {
                        html = "<span>"+data+"</span>";
                    }
                    return html;
                }},
                {"data": "leadId", orderable: false},
                {"data": "agentName", orderable: false, render: function (data, type, object) {
                    return "<a class='getInfoAgent' data-placement='top' data-toggle='popover' href='javascript:void(0)'>"+data+"</a>";
                }},
                {"data": "tmName", orderable: false, render: function (data, type, object) {
                    return "<span class='text-primary'>"+data+"</span>";
                }},
                {"data": "baName", orderable: false, render: function (data, type, object) {
                    var html = "<span>N/A</span>";
                    if(data && data != "N/A")
                    {
                        html = "<span class='text-primary'>"+data+"</span>";
                    }
                    return html;
                }},
                {"data": "statusLead", orderable: false},
                {"data": "statusDeal", orderable: false},
                {"data": "createdDate", orderable: true, render: function (data, type, object) {
                    var date = "";
                    if(data)
                    {
                        date = moment.unix(data / 1000).format("DD/MM/YYYY HH:mm");
                    }
                    return date;
                }, "width": "100"},
                {"data": "subjectName", orderable: false},
                {"data": "propertyTypeName", orderable: false},
                {"data": "formatedPrice", orderable: true},
                {"data": "sourceName", orderable: false}
            ]
        });
    };
    var exportExcel = function () {
        showPropzyLoading();
        var postData = paramData();
        $.ajax({
            url: "/lead-deal-by-agent/export-excel",
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                window.location.href = response.data.link;
            } else {
                alert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    };
    var initButton = function()
    {
        $(".btnFilterData").unbind("click");
        $(".btnFilterData").on("click", function(e){
            e.preventDefault();
            loadData();
        });
        $(".btnDelete").unbind("click");
        $(".btnDelete").on("click", function(e){
            e.preventDefault();
            $("#selectStatusLead").val(0).select2();
            $("#selectStatusDeal").val(0).select2();
            $("#txtBrokerName").val(""),
            $("#txtEmail").val(""),
            $("#txtPhone").val(""),
            loadData();
            showHideButtonExport();
        });
        $(".btnExport").unbind("click");
        $(".btnExport").on("click", function(e){
            e.preventDefault();
            exportExcel();
        });
    };
    var checkDisableButtonExport = function () { 
        var statusLead = $("#selectStatusLead").val();
        var statusDeal = $("#selectStatusDeal").val();
        if ($("#txtBrokerName").val().length == 0 && 
            $("#txtPhone").val().length == 0 && 
            $("#txtEmail").val().length == 0 &&
            (statusLead == null || parseInt(statusLead) == 0) &&
            (statusDeal == null || parseInt(statusDeal) == 0)) 
        {
            $(".btnExport").attr('disabled', 'disabled');
        }
    };
    var showHideButtonExport = function () {
        $(".btnExport").attr('disabled', 'disabled');
        $("#txtBrokerName").keyup(function(event) {
            if ($(this).val().length > 0) {
                $(".btnExport").removeAttr('disabled');
            } 
            checkDisableButtonExport();
        });
        $("#txtPhone").keyup(function(event) {
            if ($(this).val().length > 0) {
                $(".btnExport").removeAttr('disabled');
            } 
            checkDisableButtonExport();
        });
        $("#txtEmail").keyup(function(event) {
            if ($(this).val().length > 0) {
                $(".btnExport").removeAttr('disabled');
            } 
            checkDisableButtonExport();
        });
        $("#selectStatusLead").select2().on('change', function () {
            var data = $(this).val();
            if (data && data.length > 0) {
                $(".btnExport").removeAttr('disabled');
            } 
            checkDisableButtonExport();
        });
        $("#selectStatusDeal").select2().on('change', function () {
            var data = $(this).val();
            if (data && data.length > 0) {
                $(".btnExport").removeAttr('disabled');
            } 
            checkDisableButtonExport();
        });
    };
    $(document).ready(function () {
        loadData();
        initButton();
        /* load data status lead */
        $.ajax({
            url: "/lead-deal-by-agent/get-data-status-lead",
            dataType: "json",
            type: "GET",
        }).done(function(data){
            result = $.map(data.data, function (item) {
                return {
                    id: item.statusId,
                    text: item.statusName
                };
            });
            // var dataStatus = [{id : 0, text : 'Chọn trạng thái lead'}];
            // dataStatus = dataStatus.concat(result);
            $("#selectStatusLead").select2({
                placeholder: "Chọn trạng thái lead",
                data: result,
            });
        });
        /* load data status deal */
        $.ajax({
            url: "/lead-deal-by-agent/get-data-status-deal",
            dataType: "json",
            type: "GET",
        }).done(function(data){
            result = $.map(data.data, function (item) {
                return {
                    id: item.statusId,
                    text: item.statusName
                };
            });
            // var dataStatus = [{id : 0, text : 'Chọn trạng thái deal'}];
            // dataStatus = dataStatus.concat(result);
            $("#selectStatusDeal").select2({
                placeholder: "Chọn trạng thái deal",
                data: result,
            });
        });
        /* show hide button export */
        showHideButtonExport();
    });
})();