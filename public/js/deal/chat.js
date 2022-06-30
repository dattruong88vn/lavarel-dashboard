$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    $(".btn-switch-chat-source").on('click', function (event) {
        event.preventDefault();
        chatSource = $(this).attr('data-chat-source');
        $(".btn-switch-chat-source").removeClass('active');
        $(this).addClass('active');
        $(".notesList").html('');
        getChatData();
    });
    getChatData();
    setInterval(getChatData, 20000);
});
var chatSource = "deal";
function getChatData() {
    var dataUrl = "/deal/list-notes/" + dealId;
    if (chatSource === 'order') {
        dataUrl = "/order/list-notes/" + orderId;
    }
    //showPropzyLoading();
    $.ajax({
        'url': dataUrl,
        'type': 'get'
    }).done(function (response) {
        if (chatSource === 'deal') {
            showNoteList(response.data.list);
        } else {
            showNoteList(response.data);
        }
    }).always(function () {
        //hidePropzyLoading();
    });
}

$("#btnSaveComment").on("click", function (event) {
    event.preventDefault();
    var note = $(".txtComment").val();
    var url = "/deal/add-note";
    var postData = {
        "dealId": dealId,
        "note": note
    }
    if (chatSource === "order") {
        url = "/order/add-note";
        delete postData.dealId;
        postData.orderId = orderId;
    }
    saveNote(url, postData);
});

function saveNote(url, data) {
    showPropzyLoading();
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data)
    }).done(function (response) {
        if (response.result) {
            $(".txtComment").val("");
            //showNoteList(response.data);
            getChatData();
        }
    }).always(function () {
        hidePropzyLoading();
    });
}

function showNoteList(noteList) {
    var notesListHtml = "";
    if (noteList) {
        for (i = 0; i < noteList.length; i++) {
            var item = noteList[i];
            var isMine = item.isMine ? "isMine right" : "";
            var photo = item.photo ? item.photo : "/images/icon-tm.png";
            notesListHtml += "<li class='" + isMine + " direct-chat-msg' >";
            notesListHtml += "<div class='direct-chat-info  clearfix'><span class='direct-chat-name'>" + (item.name ? item.name : "") + "</span> <span class='direct-chat-timestamp'>" + moment(item.createdDate).format("DD/MM/YYYY HH:mm:ss") + "</span></div>";
            notesListHtml += "<img class='direct-chat-img' src='" + photo + "' />";
            notesListHtml += "<div class='direct-chat-text'>" + item.note + "</div>";
            notesListHtml += "</li>";
        }
    }
    $(".notesList").html(notesListHtml);
}