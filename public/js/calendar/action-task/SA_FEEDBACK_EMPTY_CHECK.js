
/**
 * define script load action empty check for calendar
 * @author barry
 * @create_date : 04/01/2018
 */

class CalendarActionSaFeedbackCheckEmpty {
    constructor() {
        console.log('CalendarAction sa feeback check empty');
    }
}

$(document).ready(function () {
    Window.calendarActionSaFeedbackEmptyCheck = new CalendarActionSaFeedbackCheckEmpty();
});