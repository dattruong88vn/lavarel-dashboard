var triggerSendToCrm = function () {
    showPropzyLoading();
    //check data
    if (lead.crmAssignedList && lead.crmAssignedList.length > 0) {
        DealFunctions.setDefaultCrms(lead.crmAssignedList, null);
    } else {
        findCrms(null, null);
    }
    $.ajax({
        url: "/lead/get-detail-json/" + lead.leadId,
        type: "get"
    }).done(function (response) {

        //check isPrefered
        var check_districtsPrefered = false;
        var districtsLength = response.data.districtsList.length;
        console.log(districtsLength);

        for (var i = 0; i < districtsLength; i++) {
            if (response.data.districtsList[i].isPrefered == true) {
                //console.log('districtsPrefered ' + i + ' = ' + response.data.request.districtsList[i].isPrefered);
                check_districtsPrefered = true;
                break;
            }
        }

        //check initialBudgetFixed
        /*
         console.log('initialBudgetFixed = ' + response.data.request.initialBudgetFixed);
         var check_initialBudgetFixed = false;
         if (response.data.request.initialBudgetFixed > 0) {
         //error initialBudgetFixed
         check_initialBudgetFixed = true;
         }
         */

        //check customerReview
        console.log('customerReview = ' + response.data.customerReview);
        // var check_customerReview = false;
        // if (response.data.customerReview != null) {
        //     check_customerReview = true;
        // }

        if (check_districtsPrefered) {
            var isChecked = ($(this).prop("checked") || lead.meetingId);
            showUpdateOrCreateMeetingForm(lead.meetingId);
        } else {
            hidePropzyLoading();
            var alert_text = '';
            if (check_districtsPrefered == false) {
                $(".district-errors").html("Chưa chọn Quận ưa thích !");
                alert_text += "Chưa chọn Quận ưa thích\r\n";
                alert(alert_text);
            }
            /*
             if (check_initialBudgetFixed == false) {
             $(".initialbudgetfixed-errors").html("Chưa chọn Ngân sách !");
             alert_text += "Chưa chọn Ngân sách ban đầu (Fixed) \r\n";
             alert(alert_text);
             }
             */
            // if (check_customerReview == false) {
            //     alert_text += "Chưa có đánh giá khách hàng";
            // }

        }

    }).always(function () {
        hidePropzyLoading();
    });
};

function minModalFunc(){
    var $content, $modal, $apnData, $modalCon;

    $content = $(".min");
    //To fire modal
    $(".mdlFire").click(function(e){

        e.preventDefault();

        var $id = $(this).attr("data-target");

        $($id).modal({backdrop: false, keyboard: false});

    });


    $(".modalMinimize").on("click", function(){
        $modalCon = $(this).closest("#QuestionModal").attr("id");
        $apnData = $(this).closest("#QuestionModal");
        $modal = "#" + $modalCon;
        $(".modal-backdrop").addClass("display-none");
        $($modal).toggleClass("min");

        if ( $($modal).hasClass("min") ){
            if (localStorage.getItem("minQueModal") === null) {
               localStorage.setItem('minQueModal', JSON.stringify([lead.leadId]) );
            }else{
              var minModalId = JSON.parse( localStorage.getItem('minQueModal') );
              minModalId.push(lead.leadId);
              localStorage.setItem('minQueModal', JSON.stringify(minModalId) );
            }
            $('#formDGKH').hide();
            $("body").removeClass('modal-open');
            $(".minmaxCon").append($apnData);

            $(this).find("i").toggleClass( 'fa-minus').toggleClass( 'fa-clone');

        }
        else {
            if (localStorage.getItem("minQueModal") !== null) {
              var minModalId = JSON.parse( localStorage.getItem('minQueModal') );
              minModalId = jQuery.grep(minModalId, function(value) {
                return value != lead.leadId;
              });
              localStorage.setItem('minQueModal',JSON.stringify(minModalId));
            }
            $('#formDGKH').show();
            $("body").addClass('modal-open');
            $(".container").append($apnData);

            $(this).find("i").toggleClass( 'fa-clone').toggleClass( 'fa-minus');

        };

    });

    $("button[data-dismiss='modal']").click(function(){

        $(this).closest("#QuestionModal").removeClass("min");

        $(".container").removeClass($apnData);

        $(this).next('.modalMinimize').find("i").removeClass('fa fa-clone').addClass( 'fa fa-minus');

    });
}

// run this in multiple tabs!
// var intercom = Intercom.getInstance();

//        intercom.on('notice', function(data) {
//            console.log(data.message);
//        });

// intercom.emit('notice', {message: 'Hello, all windows!'});
