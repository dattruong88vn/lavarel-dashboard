var CRM_ModalQuestion = (function () {

    var isModalLoaded = false;
    var myLeadId = null;
    var myType = null;
    var notifyItem = null;
    var taskId = null;
    var isLoadFromNotify = false;

    var showModal = function (leadId, type) {
        openModalQuestion(leadId, type);
        myLeadId = leadId;
        myType = type;
    }

    var initBtnToggleModal = function () {
        $("#btnToggleCrmModalQuestions").unbind("click");
        // $("#btnToggleCrmModalQuestions").on("click", function(){
        //     $('#QuestionModal').modal();
        //     $("#btnToggleCrmModalQuestions").hide();
        //     $('#QuestionModal').on('shown.bs.modal', function () {
        // 			$('.modalMinimize').hide();
        // 	});
        // });
    }

    var onHideModal = function () {
        if (CRM_ModalQuestion.isLoadFromNotify) {
            $("#btnToggleCrmModalQuestions").show();
            initBtnToggleModal();
        }
    }


    var loadModalQuestion = function (leadId, typePageForQuestion) {
        // ẨN GROUP BUTTON ACTION IN DEAL/LEAD DETAIL
        $.ajax({
            url: "/question/open-modal-in-task",
            type: "post",
            datatype: 'html',
            data: JSON.stringify({'leadId': leadId})
        }).done(function (response) {
            if (typeof response.code !== "undefined" && parseInt(response.code) !== 200) {
                showPropzyAlert(response.message, "Thông báo");
                return;
            }
            $('#modal_here_question_ajax').html(response);
            $('#typePageForQuestion').val(typePageForQuestion);
            if (typePageForQuestion == 2) {
                $('#QuestionModal .modal-title').html('XÁC NHẬN NHU CẦU')
            }
            initQuestionModal();
            CRM_ModalQuestion.isModalLoaded = true;
            $("#btnToggleCrmModalQuestions").show();
            initBtnToggleModal();
            if (CRM_ModalQuestion.isLoadFromNotify) {
                CRM_ModalQuestion.modalLoaded();
            }
        })
    }

    var handleSavedNotify = function (item) {
        CRM_ModalQuestion.isModalLoaded = false;
        $("#btnToggleCrmModalQuestions").hide();
        setNotificationRead(item.id);
        CRM_ModalQuestion.taskId = null;
    }

    var loadOnNotiy = function (item) {
        $("#btnToggleCrmModalQuestions").attr('href', '/crm-dashboard/task-detail/' + item.taskId + '?defineId=32')
        $("#btnToggleCrmModalQuestions").show();
        // CRM_ModalQuestion.isLoadFromNotify = true;
        // if(!CRM_ModalQuestion.isModalLoaded){
        //     hideDealButtons();
        //     if(!item.isShown){
        //         showModal(item.leadId, 2);
        //     }else{
        //         loadModalQuestion(item.leadId, 2);
        //     }
        // }

        // CRM_ModalQuestion.notifyItem = item;
        // console.log("form loaded "+CRM_ModalQuestion.isModalLoaded);
        // CRM_ModalQuestion.taskId = item.taskId;

    }

    var modalLoaded = function () {
        $.ajax({
            "url": "/notification/set-show/" + CRM_ModalQuestion.notifyItem.id,
            "type": "get",
        }).done(function (response) {
            console.log(response);
            CRM_ModalQuestion.isModalLoaded = true;
        }).always(function () {

        });
    }

    var hideDealButtons = function () {
        if ((typeof deal) != "undefined" && deal.isFormProfile) {
            //            $(".content .btn").hide();
            $(".content .btnShowScheduleModal").hide();
            $(".content .btnOpenEmailForm").hide();
            $(".content .btnSendMail").hide();
            $(".content .btnOpenModalQuestion").hide();
        }
    }

    var controlMenu = function () {
        $('.sidebar-toggle').on('click', function () {
            globalMenuStatus = $('body').attr('class');
            localStorage.setItem("globalMenuStatus", globalMenuStatus);
        })

        // $(window).scroll(function (event) {
        //     var scroll = $(window).scrollTop();
        //     // Do something
        //     // console.log(scroll);
        //     if(scroll > 10){
        //         $('body').addClass('sidebar-collapse');
        //     }else{
        //         $('body').removeClass('sidebar-collapse');
        //     }
        // });
    }

    $(document).ready(function () {
        if (localStorage.getItem("globalMenuStatus")) {
            globalMenuStatus = localStorage.getItem("globalMenuStatus");
            $('body').addClass(globalMenuStatus);
        }
        hideDealButtons();
        controlMenu();
    });

    return {
        "isModalLoaded": isModalLoaded,
        "showModal": showModal,
        "onHideModal": onHideModal,
        "loadModalQuestion": loadModalQuestion,
        "loadOnNotiy": loadOnNotiy,
        "notifyItem": notifyItem,
        "handleSavedNotify": handleSavedNotify,
        "taskId": taskId,
        "isLoadFromNotify": isLoadFromNotify,
        "modalLoaded": modalLoaded
    };
})();
