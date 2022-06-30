var ListingByAgent = (function(){
    var tableListingByAgent = null;
    var tableListings = null;
    var modalListings = $("#modalListings");
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    var paramData = function () {
        var status = $("#selectStatus").val();
        var item = {
            "name": $("#txtBrokerName").val().trim(),
            "email": $("#txtEmail").val().trim(),
            "phone": $("#txtPhone").val().trim(),
            "statusList": parseInt(status) != 0 ? status : ""
        };
        return item;
    };
    var loadData = function () { 
        var postData = paramData();
        if (tableListingByAgent !== null) {
            tableListingByAgent.destroy();
        }
        tableListingByAgent = $("#tableListingByAgent").DataTable({
            "lengthChange": false,
            "processing": true,
            "serverSide": true,
            "searching": false, 
            "order": [[4, "desc"]],
            "ajax": {
                url: "/listing-by-agent/get-data",
                type: 'post',
                data: function (d) {
                    Object.assign(d, postData);
                    return d;
                }
            },
            "language":{
                "paginate": {
                    previous: "Trước",
                    next: "Tiếp"
                },
                "info": "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục"
            },
            "columns": [
                {"data": "agentName", orderable: false},
                {"data": "phone", orderable: false},
                {"data": "email", orderable: false},
                {"data": "numberOfListing", orderable: false, render: function (data, type, object) {
                    return "<a href='javascript:void(0);' class='btnDetailListing'>"+data+"</a>";
                }},
                {"data": "createdDate", orderable: true, render: function (data, type, object) {
                    var date = "";
                    if(data)
                    {
                        date = moment.unix(data / 1000).format("DD/MM/YYYY");
                    }
                    return date;
                }}
            ]
        });
    };
    var exportExcel = function () {
        showPropzyLoading();
        var postData = paramData();
        for (var x in postData) {
            if (postData[x]=="") {
                postData[x]=null;
            }
        }
        $.ajax({
            url: "/listing-by-agent/export-excel",
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
            $("#selectStatus").val(0).select2();
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
        $(document).on("click", ".btnDetailListing", function (e) {
            e.preventDefault();
            var tr = $(this).closest('tr');
            var row = tableListingByAgent.row(tr);
            var status = $("#selectStatus").val();
            var dataPost = {
                "agentId": row.data().agentId,
                "statusList": parseInt(status) != 0 ? status : ""
            };
            if (tableListings !== null) {
                tableListings.destroy();
            }
            tableListings = $(".dataTableListings").DataTable({
                "lengthChange": false,
                "processing": true,
                "serverSide": true,
                "searching": false, 
                "order": [[2, "asc"]],
                "ajax": {
                    url: "/listing-by-agent/get-data-listing",
                    type: 'post',
                    data: function (d) {
                        Object.assign(d, dataPost);
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
                "columns": [
                    {"data": "rlistingId", orderable: false},
                    {"data": "address", orderable: false},
                    {"data": "priceVnd", orderable: true},
                    {"data": "districtName", orderable: false},
                    {"data": "commission", orderable: false, render: function (data, type, object) {
                        var html = "";
                        if (hasValue(object.commissionPrice)) {
                            html += object.commissionPriceVnd;
                        } else {
                            html += (hasValue(object.commissionFrom) ? object.commissionFrom : 0)+ " %";
                        }
                        return html;
                    }},
                    {"data": "statusName", orderable: false}
                ]
            });
            modalListings.modal();
        });
    };
    var checkDisableButtonExport = function () { 
        var status = $("#selectStatus").val();
        if ($("#txtBrokerName").val().length == 0 && 
            $("#txtPhone").val().length == 0 && 
            $("#txtEmail").val().length == 0 &&
            (status == null || parseInt(status) == 0)) 
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
        $("#selectStatus").select2().on('change', function () {
            if ($(this).val().length > 0) {
                $(".btnExport").removeAttr('disabled');
            } 
            checkDisableButtonExport();
        });
    };
    $(document).ready(function () {
        loadData();
        initButton();
        $.ajax({
            url: "/pos/sa-api/get-channel-status-list?type=1",
            dataType: "json",
            type: "GET",
        }).done(function(data){
            result = $.map(data.data[0].list, function (item) {
                return {
                    id: item.id,
                    text: item.name
                };
            });
            var dataStatus = [{id : 0, text : 'Chọn trạng thái'}];
            dataStatus = dataStatus.concat(result);
            $("#selectStatus").select2({
                placeholder: "Chọn trạng thái",
                data: dataStatus,
            });
        });
        showHideButtonExport();
    });
})();