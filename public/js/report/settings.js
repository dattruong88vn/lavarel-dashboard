$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#_token').val()
    }
});

var reportType = 1; // Default
var timeOfStart = 1; //$('input[name=timeOfStart]:checked').val();

$(document).ready(function () {

    $('.btnReportType').on('click', function () {
        $('.btnReportType').removeClass('active');
        $(this).addClass('active');
        reportType = parseInt($(this).attr('data-type'));
        if (reportType == 1) {
            $('#startCurrentTitle').html(' THÁNG HIỆN TẠI');
            $('#startNextTitle').html(' THÁNG KẾ TIẾP');


        } else if (reportType == 2) {
            $('#startCurrentTitle').html(' QUÝ HIỆN TẠI');
            $('#startNextTitle').html(' QUÝ KẾ TIẾP');
        }

        loadTargetList();
    });

    $('input[type=radio][name=timeOfStart]').on('change', function() {
        timeOfStart = parseInt($(this).val());
        loadTargetList();
    });

    $('#btnSaveTarget').on('click', function () {

        var emptyInput = 0;
        $(".inputText").each(function( index ) {
            // console.log( index + ": " + $( this ).text());
            if ($(this).val().trim() === '')
            {
                emptyInput++;
            }
        });
        if (emptyInput >= 4) {
            showPropzyAlert('Bạn phải nhập dữ liệu');
            return;
        }

        showPropzyLoading();
        $.ajax({
            url: "/report/management-report-settings-target-list?reportType="+reportType+'&timeOfStart='+timeOfStart,
            type: 'post',
            data: $('#reportTargetData').serialize()
        }).success(function (response) {
            console.log(response);
            if (response && response.result)
            {
                $('#settingsTargetHistoryBody').html('');
                showPropzyAlert('Đã lưu');
                // -- Reload data list --
                loadTargetList();
                return;
            }
            showPropzyAlert(response.message, 'Lỗi');
        }).always(function () {
            hidePropzyLoading();
        });
    });

    $(".txtSaleFunnel" ).focus(function() {
        var saleFunnelTypeId = $(this).attr('saleFunnelTypeId');
        $.ajax({
            url: "/report/management-report-settings-sale-funnel-history-list?saleFunnelTypeId="+saleFunnelTypeId,
            type: 'get'
        }).success(function (response) {
            // console.log(response);
            $('#settingsSaleFunnelHistoryList').html(response.contentHtml);
        }).always(function () { });
    });

    $('#btnSaveSaleFunnel').on('click', function () {
        showPropzyLoading();
        $.ajax({
            url: "/report/management-report-settings?actionType=saveSaleFunnel",
            type: 'post',
            data: $('#reportSaleFunnelData').serialize()
        }).success(function (response) {
            // console.log(response);
            if (response && response.result)
            {
                showPropzyAlert('Đã lưu');
                return;
            }
            showPropzyAlert(response.message, 'Lỗi');
        }).always(function () {
            hidePropzyLoading();
        });
    });

    // -- Start load --
    loadTargetList();
});

function loadTargetList()
{
    $.ajax({
        url: "/report/management-report-settings-target-list?reportType="+reportType+'&timeOfStart='+timeOfStart,
        type: 'get'
    }).success(function (response) {
        // console.log(response.contentHtml);
        $('#settingsTargetList').html(response.contentHtml);
        defineShowTargetListHistoryAction();
    }).always(function () { });
}

function defineShowTargetListHistoryAction()
{
    $('.btnShowTargetListHistory').on('click', function (event) {
        var targetId = parseInt($(this).attr('targetId'));
        if (isNaN(targetId))
        {
            showPropzyAlert("Chưa có dữ liệu");
            return;
        }
        $.ajax({
            url: "/report/management-report-settings-target-history?reportType="+reportType+'&targetId='+targetId,
            type: 'get'
        }).success(function (response) {
            // console.log(response);
            $('#settingsTargetHistory').html(response.contentHtml);
        }).always(function () { });
    });
}