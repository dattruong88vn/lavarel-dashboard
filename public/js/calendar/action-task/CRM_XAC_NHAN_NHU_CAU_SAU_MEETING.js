
/**
 * define script load action empty check for calendar
 * @author barry
 * @create_date : 04/01/2018
 */

class CalendarCRMXacNhanMeeting {
    constructor() {
        console.log('CalendarAction CRM_XAC_NHAN_NHU_CAU_SAU_MEETING has call');
        if(!Window.calendarActionClickTask) {
            Window.calendarActionClickTask = new Map();
        }
        this.events();

    }

    events() {
        const that = this;
        Window.calendarActionClickTask.set('CRM_XAC_NHAN_NHU_CAU_SAU_MEETING', function (event) {
            console.log('calendarActionClickTask CRM_XAC_NHAN_NHU_CAU_SAU_MEETING');
            if(!event.isClosed) {
                window.location.href = "/crm-dashboard/task-detail/"+event.id+"/?defineId="+event.defineId;
            }

            // proccess http://dashboard.propzy.local/crm-dashboard/task-detail/126253/?defineId=31

        });
    }
}

$(document).ready(function () {
    Window.CalendarCRMXacNhanMeeting = new CalendarCRMXacNhanMeeting();
});