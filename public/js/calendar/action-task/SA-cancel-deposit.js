
/**
 * define script load action cancel deposit for calendar
 * @author barry
 * @create_date : 18/01/2019
 */

class CalendarSACancelDeposit {
    constructor() {
        console.log('CalendarAction CalendarSACancelDeposit has call');
        if(!Window.calendarActionClickTask) {
            Window.calendarActionClickTask = new Map();
        }
        this.stored = {
          taskId : null
        };
        this.renderHtmlPopup();
        this.events();

    }

    events() {
        const that = this;
        Window.calendarActionClickTask.set('SA_CANCEL_DEPOSIT', function (event) {
            console.log('calendarActionClickTask SA_CANCEL_DEPOSIT');
            that.stored.taskId = event.id;
            that.getInfoTask();

        });

        $('#calendar-deposit-cancel-modal').on('click','#btn-calendar-close-tast-deposit-cancel', function (e) {
            e.preventDefault();
            that.setDoneTask();
        });
    }

    async getInfoTask() {
        const that = this;
        let data = null;
        await $.ajax({method: "POST", url: '/pos/SaApi/get-deposit-task-cancel', data: {taskId : that.stored.taskId,}, dataType: "json",})
            .done(function( response ) {data = response.data;})
            .fail(function (err) {console.error(err);});

        if (data && data.length > 0) {
            that.fillDataDeposit(data[0]);
        }
    }

    async setDoneTask() {
        const that = this;
        let data = null;
        await $.ajax({method: "POST", url: '/pos/SaApi/set-deposit-task-support-done', data: {taskId : that.stored.taskId}, dataType: "json",})
            .done(function( response ) {data = response;})
            .fail(function (err) {console.error(err);});

        if (data && data.result) {
           Window.taskCalendar.reloadCalendar();
           $('#calendar-deposit-cancel-modal').modal('hide');
        }
    }
    renderHtmlPopup() {
        const html = `
        <div id="calendar-deposit-cancel-modal" class="modal" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content modal-lg">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">??</button>
                        <h4 class="modal-title">Th??ng tin h???y ?????c c???c</h4>
                    </div>
                    <div class="modal-body message">
                        <div class="form-horizontal">
                            <div class="row form-group">
                                <div class="col-md-6">
                                    <label>Ch??? tin ????ng:  </label> <span class="form-control deposit-cancel-info-owner-name" readonly></span>
                                </div>
                                <div class="col-md-6">
                                    <label>Gi?? ?????c c???c:  </label> <span class="form-control deposit-cancel-info-price" readonly></span>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-md-6">
                                    <label>S??? ??i???n tho???i:  </label> <span class="form-control deposit-cancel-info-owner-phone" readonly></span>
                                </div>
                                <div class="col-md-6">
                                    <button style="margin-top: 25px;" class="btn-sm btn btn-success deposit-modal-call"><i class="fa fa-phone"></i> G???i ch??? tin ????ng</button>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-md-12">
                                    <label>L?? do h???y :  </label> <span  class="form-control deposit-cancel-info-reason" readonly></span>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-md-12">
                                    <label>Ghi ch?? :  </label>  <textarea rows="5" class="form-control deposit-cancel-modal-note"  readonly></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">????ng</button>
                        <button id="btn-calendar-close-tast-deposit-cancel" type="button" class="btn btn-success">Ho??n t???t</button>
                    </div>
                </div>
            </div>`;

        $('#calendar-action-popup').html(html);
    }

    fillDataDeposit($data) {
        $('#calendar-deposit-cancel-modal').modal();
        $('#calendar-deposit-cancel-modal').find('.deposit-cancel-info-price').html($data.formatedDepositPrice ? $data.formatedDepositPrice : '');
        $('#calendar-deposit-cancel-modal').find('.deposit-cancel-info-owner-name').html($data.ownerName ? $data.ownerName : '');
        $('#calendar-deposit-cancel-modal').find('.deposit-cancel-info-owner-phone').html($data.phone ? $data.phone: '');
        $('#calendar-deposit-cancel-modal').find('.deposit-cancel-info-reason').html($data.reasonName ? $data.reasonName : '');
        $('#calendar-deposit-cancel-modal').find('.deposit-cancel-modal-note').text($data.taskNote ? $data.taskNote : '');
    }
}

$(document).ready(function () {
    Window.calendarSaCancelDeposit = new CalendarSACancelDeposit();
});