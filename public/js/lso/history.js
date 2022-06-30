// LSO historyLso
var historyLso = {
    lsoHistories: [],
    init: function() {
        showPropzyLoading();
        try {
            historyLso.lsoHistories.destroy();
        } catch (Ex) {}

        main.lsoHistories = $('#lsoHistories').on('processing.dt', function(e, settings, processing) {
            if (processing) {
                showPropzyLoading();
            } else {
                hidePropzyLoading();
            }
        }).DataTable({
            "processing": false,
            "serverSide": true,
            "ajax": "/lso/get-histories?id=" + parseInt($("#historyLsoId").val()),
            "lengthChange": false,
            "paging": true,
            "searching": false,
            "ordering": false,
            "language": getDataTableLanguage("vn"),
            "columns": [
                // Ngày tạo
                {
                    data: "createdDate",
                    render: historyLso.renderCreatedDate
                },
                // Tên action
                {
                    data: "typeName",
                    render: historyLso.renderTypeName
                },
                // Nội dung
                {
                    data: "content",
                    render: historyLso.renderContent
                },
                // Người tạo
                {
                    data: "creater",
                    render: historyLso.renderCreater
                }
            ],
            "initComplete": function(settings, json) {
                hidePropzyLoading();
            },
            "fnCreatedRow": function(row, data, index) {

            }
        });
    },
    getHistories: function(callback) {
        $.ajax({
            url: "/lso/get-histories?id=" + parseInt($("#historyLsoId").val()),
            type: "GET"
        }).done(function(response) {
            callback(response);
        })
    },
    renderCreatedDate: function(data, type, object) {
        return moment(object.createdDate).format("DD/MM/YYYY HH:mm:ss");
    },
    renderTypeName: function(data, type, object) {
        return object.typeName;
    },
    renderContent: function(data, type, object) {
        return object.content;
    },
    renderCreater: function(data, type, object) {
        return object.creater;
    }
};

$(document).ready(function() {
    historyLso.init();
});
