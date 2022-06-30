class CRM_TOUR_TASK {
    constructor() {
        if(!Window.calendarActionClickTask) {
            Window.calendarActionClickTask = new Map();
        }
        this.events();

    }

    events() {
        const that = this;
        Window.calendarActionClickTask.set('CRM_TOUR_TASK', function (event) {
            let isAdmin = hasValue(currentUser.departments[0].isGroupAdmin) ? 1 : 0;
            if((currentUser.departments[0].departmentId == 12 && isAdmin) || currentUser.userId == event.data.dealAssignedTo){
                window.location.href = "/deal/tour/"+event.data.dealId+"#schedule"+event.data.scheduleId;
            }else{
                $.alert({
                    title: 'Thông báo!',
                    content: 'Tour này của BA khác!',
                });
            }
        });
    }
}

$(document).ready(function () {
    Window.CRM_TOUR_TASK = new CRM_TOUR_TASK();
});