$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    loadDataTableEvents('/deal/events-data/' + dealId+"?leadId="+leadId);
});
var dataTableEvents = null;
function loadDataTableEvents(url) {
    try {
        dataTableEvents.destroy();
    } catch (Ex) {
    }
    dataTableEvents = $('#dataTableEvents').DataTable({
        'searching': false,
        'lengthChange': false,
        'orderCellsTop': true,
        "processing": true,
        "serverSide": true,
        "ajax": url,
        "paging": false,
        'scrollX': false,
        "columns": [
            //{"data": "rlistingId"},
            {"data": "typeName", width:"32px"},
            {"data": "time", orderable: false},
            {"data": "createdDate", render: dateRender},
            {"data": "creater", width:"10%"},
            {"data": "participant"},
            {"data": "content", orderable: false, width:"40%", render:renderEventContent},
            {"data": "note", orderable: false},
            {"data": "address", orderable: false}
        ]
    });
    
    $('#dataTableEvents').on('draw.dt', function () {
        var maxheight = 134;
        var showText = "Xem tất cả";
        var hideText = "Thu gọn lại";

        $('.textContainer_Truncate').each(function () {
            var text = $(this);
            if (text.height() > maxheight) {
                text.css({'overflow': 'hidden', 'height': maxheight + 'px'});

                var link = $('<hr /><a href="#">' + showText + '</a>');
                var linkDiv = $('<div></div>');
                linkDiv.append(link);
                $(this).after(linkDiv);

                link.click(function (event) {
                    event.preventDefault();
                    if (text.height() > maxheight) {
                        $(this).html(showText);
                        text.css('height', maxheight + 'px');
                    } else {
                        $(this).html(hideText);
                        text.css('height', 'auto');
                    }
                });
            }
        });
    });

    $('#dataTableEvents_wrapper .row-filter select').unbind('change');
    $('#dataTableEvents_wrapper .row-filter select').select2();
    $('#dataTableEvents_wrapper .row-filter select').on('change', function (event) {
        var row = $(this).parents('tr');
        var typeName = row.find('.TypeName').val() + '';
        if (typeName == 'null' || typeName.startsWith(',')) {
            typeName = '';
        }
        var creater = row.find('.Creater').val() + '';
        if (creater == 'null' || creater.startsWith(',')) {
            creater = '';
        }
        var participant = row.find('.Participant').val() + '';
        if (participant == 'null' || participant.startsWith(',')) {
            participant = '';
        }
        var url = '/deal/events-data/' + dealId + "?leadId="+leadId+"&TypeName=" + typeName + "&Creater=" + creater + "&Participant=" + participant;
        loadDataTableEvents(url);
    });
}


var renderEventContent = function (data, type, object) {
    var returnVal = "";
    if(object.scheduleTime){
        returnVal+= moment(object.scheduleTime).format('DD/MM/YYYY HH:mm:ss')+"<br/>";
    }
    if(data===null){
        data="";
    }
    returnVal += "<div class='textContainer_Truncate'>" + data + "</div>";
    return returnVal;
};