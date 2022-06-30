var configCanlendar = {
    height: 'auto',
    lang: 'vi',
        header: {
    left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
},
    buttonText: {
        today: 'Hôm nay',
            month: 'Tháng',
            week: 'Tuần',
            day: 'Ngày'
    },
    eventLimit: true, // for all non-agenda views
    // views: {
    //     agenda: {
    //         eventLimit: 6 // adjust to 6 only for agendaWeek/agendaDay
    //     }
    // },
    eventClick: function(event) {
        if (event.title) {
            console.log(event)
            // alert(event.title);
        }
    },
    editable: false,
    droppable: false
}

// {
//     height: 'auto',
//         header: {
//     left: 'prev,next today',
//         center: 'title',
//         right: 'month,agendaWeek,agendaDay'
// },
//     buttonText: {
//         today: 'Hôm nay',
//             month: 'Tháng',
//             week: 'Tuần',
//             day: 'Ngày'
//     },
//     eventMouseover: function(calEvent, jsEvent) {
//         var tooltip = '<div class="tooltipevent" style="width:100px;height:100px;background:#ccc;position:absolute;z-index:10001;">' + calEvent.title + '</div>';
//         var $tooltip = $(tooltip).appendTo('body');
//
//         $(this).mouseover(function(e) {
//             $(this).css('z-index', 10000);
//             $tooltip.fadeIn('500');
//             $tooltip.fadeTo('10', 1.9);
//         }).mousemove(function(e) {
//             $tooltip.css('top', e.pageY + 10);
//             $tooltip.css('left', e.pageX + 20);
//         });
//     },
//
//     eventMouseout: function(calEvent, jsEvent) {
//         $(this).css('z-index', 8);
//         $('.tooltipevent').remove();
//     },
//     eventClick: function(event) {
//         if (event.title) {
//             console.log(event)
//             // alert(event.title);
//         }
//     },
//     //Random default events
//     events: tasks,
//         // events: [
//         //     {
//         //         title: 'All Day Event',
//         //         start: new Date(y, m, 1),
//         //         backgroundColor: "#f56954", //red
//         //         borderColor: "#f56954" //red
//         //     },
//         //     {
//         //         title: 'Long Event',
//         //         start: new Date(y, m, d - 5),
//         //         end: new Date(y, m, d - 2),
//         //         backgroundColor: "#f39c12", //yellow
//         //         borderColor: "#f39c12" //yellow
//         //     },
//         //     {
//         //         title: 'Meeting',
//         //         start: new Date(y, m, d, 10, 30),
//         //         allDay: false,
//         //         backgroundColor: "#0073b7", //Blue
//         //         borderColor: "#0073b7" //Blue
//         //     },
//         //     {
//         //         title: 'Lunch',
//         //         start: new Date(y, m, d, 12, 0),
//         //         end: new Date(y, m, d, 14, 0),
//         //         allDay: false,
//         //         backgroundColor: "#00c0ef", //Info (aqua)
//         //         borderColor: "#00c0ef" //Info (aqua)
//         //     },
//         //     {
//         //         title: 'Birthday Party',
//         //         start: new Date(y, m, d + 1, 19, 0),
//         //         end: new Date(y, m, d + 1, 22, 30),
//         //         allDay: false,
//         //         backgroundColor: "#00a65a", //Success (green)
//         //         borderColor: "#00a65a" //Success (green)
//         //     },
//         //     {
//         //         title: 'Click for Google',
//         //         start: new Date(y, m, 28),
//         //         end: new Date(y, m, 29),
//         //         url: 'http://google.com/',
//         //         backgroundColor: "#3c8dbc", //Primary (light-blue)
//         //         borderColor: "#3c8dbc" //Primary (light-blue)
//         //     }
//         // ],
//         editable: false,
//     droppable: false
// }