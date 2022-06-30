
/**
 * define script load action cancel deposit for calendar
 * @author barry
 * @create_date : 18/01/2019
 */

class CalendarSARedirect{
    constructor() {
        console.log('CalendarAction CalendarSACancelDeposit has call');
        if(!Window.calendarActionClickTask) {
            Window.calendarActionClickTask = new Map();
        }
        this.stored = {
            taskId : null,
            rlistingId : null
        };

        this.events();

    }

    events() {
        const that = this;
        Window.calendarActionClickTask.set('SA_LIVED_LISTING', function (event) {
            console.log('calendarActionClickTask SA_LIVED_LISTING');
            that.stored.taskId = event.id;
            that.stored.rlistingId = event.data.rlistingId;
            if(!event.isClosed) {
                if (that.stored.rlistingId) {
                    window.location.href = `/pos/sa/detail/${that.stored.rlistingId}`;
                } else {

                }

            }
        });
        Window.calendarActionClickTask.set('SA_RECALL_OWNER', function (event) {
            console.log('calendarActionClickTask SA_RECALL_OWNER');
            that.stored.taskId = event.id;
            that.stored.rlistingId = event.data.rlistingId;
            if(!event.isClosed) {
                if (that.stored.rlistingId) {
                    window.location.href = `/pos/sa/detail/${that.stored.rlistingId}`;
                } else {

                }

            }
        });

        Window.calendarActionClickTask.set('SA_UPDATE_POSITION', function (event) {
            console.log('calendarActionClickTask SA_UPDATE_POSITION');
            that.stored.taskId = event.id;
            that.stored.rlistingId = event.data.rlistingId;
            if(!event.isClosed) {
                if (that.stored.rlistingId) {
                    window.location.href = `/pos/sa/update-lat-long?rlistingId=${that.stored.rlistingId}`;
                } else {

                }

            }
        });

    }

}

$(document).ready(function () {
    Window.calendarSaRedirect = new CalendarSARedirect();
});