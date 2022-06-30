
var agentIds = [];
$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    var meetingCalendar = $("#meetingCalendar");
    meetingCalendar.fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'agendaDay,agendaWeek,month'
        },
        editable: true,
        eventLimit: true,
        events: loadCalendarData
    });

    $("#txtSearchAgent").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/agent/search",
                dataType: "json",
                data: {
                    term: request.term
                },
                success: function (data) {
                    response(data);
                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            var item = ui.item;
            var agentIds = getSelectedAgentIds();
            if ($.inArray(item.agentId + "", agentIds) === -1) {
                var itemHtml = "<li>"
                        + "<label><input type='checkbox' value=" + item.agentId + " class='item' checked /> " + item.name + "</label>"
                        + "</li>";
                $(".selectedAgents").append(itemHtml);

                meetingCalendar.fullCalendar('refetchEvents');

                $(".selectedAgents li input.item").unbind("click");
                $(".selectedAgents li input.item").on("click", function () {
                    if (!$(this).prop("checked")) {
                        $(this).parents("li").remove();
                        meetingCalendar.fullCalendar('refetchEvents');
                    }
                });
            }
        }
    }).autocomplete("instance")._renderItem = function (ul, item) {
        return $("<li>")
                .append("<a>" + item.name + " - " + item.email + "</a>")
                .appendTo(ul);
    };

});

function loadCalendarData(start, end, timezone, callback) {

    $.ajax({
        url: '/deal/meeting-calendar-data',
        dataType: 'json',
        type: "POST",
        data: {
            // our hypothetical feed requires UNIX timestamps
            start: start.unix(),
            end: end.unix(),
            saleIds: getSelectedAgentIds()
        }
    }).done(function (response) {
        var events = [];
        for (i = 0; i < response.data.length; i++) {
            var item = response.data[i];
            events.push({
                title: item.name,
                start: moment(item.reminderDate) // will be parsed,
            });
        }
        callback(events);

    });
}

function getSelectedAgentIds() {
    var agentIds = [];
    $(".selectedAgents li input.item").each(function () {
        var id = $(this).val();
        agentIds.push(id);
    });
    return agentIds;
}