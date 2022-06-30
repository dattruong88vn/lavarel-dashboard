
/**
 * define script load action empty check for calendar
 * @author barry
 * @create_date : 04/01/2018
 */

class CalendarActionSaEmptyCheck {
    constructor() {
        console.log('CalendarAction SaEmptyCheck has call');
    }
}

$(document).ready(function () {
    Window.calendarActionSaEmptyCheck = new CalendarActionSaEmptyCheck();
});