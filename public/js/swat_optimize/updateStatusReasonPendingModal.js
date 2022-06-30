var ModalUpdateStatusPendingReason = (function () {
    var myConfig = null;
    var myModal = $("#modalUpdateStatusPendingReason");

    var showModal = function (params) {
        myConfig = params;
        myModal.modal();
    };

    myModal.find('.whenDate').datepicker({
        format: "dd/mm/yyyy",
        startDate: "0 days"
    });
    myModal.find('.whenTime').timepicker({
        showMeridian: false
    });

    var setReminderVisible = function (isVisible) {
        if (isVisible) {
            myModal.find(".reminder").show();
        } else {
            myModal.find(".reminder").hide();
        }
    }

    setReminderVisible(false);
    myModal.find(".reasonId").change(function () {
        var id = $(this).val();
        setReminderVisible(id == 3);
    });

    myModal.find(".btn-cornfirm").on("click", function (event) {
        event.preventDefault();
        var reasonId = myModal.find(".reasonId").val();
        myModal.find(".errors-reasonId").html("");
        if (reasonId == "-1") {
            myModal.find(".errors-reasonId").html("Chọn lý do");
            return false;
        }
        var postData = myConfig.postData;
        postData.reasonId = reasonId;
        postData.note = null;

        if (reasonId == 3) {
            var whenDate = myModal.find(".whenDate").val().trim();
            var whenTime = myModal.find(".whenTime").val().trim();
            if (whenDate !== "" && whenTime !== "") {
                var reminderTime = moment(whenDate + " " + whenTime, "DD/MM/YYYY HH:mm");
                console.log(reminderTime);
                if (reminderTime.isValid()) {
                    postData.reminderDate = reminderTime.unix() * 1000;
                }
            } else {
                showPropzyAlert("Chọn giờ đi xem!");
            }
        }

        showPropzyLoading();
        $.ajax({
            url: '/lead/update-status-pending',
            type: 'post',
            data: JSON.stringify(postData)
        }).done(function (response) {
            showPropzyAlert(response.message);
            if (response.result) {
                if(postData.typeNeedName == "lead") {
                    timer.submit({leadId: postData.needId});
                }
                if(postData.typeNeedName == "deal") {
                    timer.submit({dealId: postData.needId});
                }
                window.location.reload();
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });

    return {
        "showModal": showModal
    };
})();

const loadCancelReason = (callBack) => {
    axios.get(fullPathApiCancelReason).then(xhr => {
        const response = xhr.data;
        if(response.result){
            const reasons = response.data;
            let reasonsArr = reasons.map((reason,index)=>{
                return `<option value="${reason.id}">${reason.name}</option>`;
            });
            reasonsArr.unshift(`<option value="-1">Chọn lý do:</option>`);
            const reasonsString = reasonsArr.join('');
            callBack(reasonsString);
        }
    }).catch(err => {
        console.error(err);
    });
}

const _modalUpdateStatusPendingReason = $('#modalUpdateStatusPendingReason');
$(document).ready(function () {
    _modalUpdateStatusPendingReason.on('shown.bs.modal', function() { 
       loadCancelReason((reasonsString)=>{
           _modalUpdateStatusPendingReason.find('.reasonId').html(reasonsString);
       });
    });
 });