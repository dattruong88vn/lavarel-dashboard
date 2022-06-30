<!DOCTYPE html>
<!--
This is a starter template page. Use this page to start your new project from
scratch. This page gets rid of all links and provides the needed markup only.
-->
<html>

<head>
    <meta charset="UTF-8">
    <title>{{ $page_title or "Propzy Dashboard" }} {{protocol}}</title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <!-- <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> -->
    <!-- Bootstrap 3.3.2 -->
    <link href="{{loadAsset("bootstrap/css/bootstrap.min.css") }}" rel="stylesheet" type="text/css" />
    <!-- Font Awesome Icons -->
    <link href="{{loadAsset("/css/common/font-awesome-4.7.0/css/font-awesome.min.css") }}" rel="stylesheet" type="text/css" />
    <!-- Ionicons
		<link href="http://code.ionicframework.com/ionicons/2.0.0/css/ionicons.min.css" rel="stylesheet" type="text/css" />-->
    <link rel="shortcut icon" type="image/webp" href="{{loadAsset('/images/icon-fav-propzy.ico')}}" />
    <link rel="shortcut icon" type="image/webp" href="{{loadAsset('/images/icon-fav-propzy.ico')}}" />

    <!-- daterange picker -->
    <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
    <!-- iCheck for checkboxes and radio inputs -->
    <link href="{{loadAsset("/plugins/iCheck/all.css")}}" rel="stylesheet" type="text/css" />
    <!-- Select2 -->
    <link href="{{loadAsset("/plugins/select2/select2.min.css")}}" rel="stylesheet" type="text/css" />


    <!-- Theme style -->
    <link href="{{loadAsset("/dist/css/AdminLTE.min.css")}}" rel="stylesheet" type="text/css" />


    <link rel="stylesheet" type="text/css" href="/css/lightgallery.min.css">


    <!-- AdminLTE Skins. We have chosen the skin-blue for this starter
		  page. However, you can choose any other skin. Make sure you
		  apply the skin class to the body tag so the changes take effect.
	-->
    <link href="{{loadAsset("/dist/css/skins/skin-blue.min.css")}}" rel="stylesheet" type="text/css" />

    <!-- jQuery 2.1.3 -->
    <script src="{{ loadAsset ("/plugins/jQuery/jQuery-2.1.4.min.js") }}"></script>

    <script src="{{loadAsset('/js/common/jquery-ui.js') }}"></script>
    <script src="{{loadAsset('/js/common/moment-with-locales.js') }}"></script>
    <script src="{{loadAsset('/plugins/datepicker/bootstrap-datepicker.js')}}"></script>
    <script src="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.js')}}"></script>
    <script src="{{loadAsset('/js/commons/crm-modal-question.js')}}"></script>

    <script type="text/javascript" src="{{loadAsset("/js/masterScripts.js") }}"></script>
    <script type="text/javascript" src="{{loadAsset("/js/nprogress.js") }}"></script>
    <script type="text/javascript" src="{{loadAsset("/js/Collapse-Long-Content-View-More-jQuery/jquery.show-more.js") }}"></script>
    @yield('page-css')
    <link rel="stylesheet" href="{{loadAsset("/css/jquery-confirm.css") }}">
    <link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset('/css/nprogress.css')}}" rel="stylesheet" type="text/css" />
    {{-- <link href="{{ loadAsset("js/pos/common/plugins/jquery-select-areas-master/resources/jquery.selectareas.css")}}" rel="stylesheet" type="text/css"/> --}}
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
	<script src="{{loadAsset('/js/common/html5shiv.js')}}"></script>
	<script src="{{loadAsset('/js/common/respond.min.js')}}"></script>
	<![endif]-->
    <link href="{{loadAsset("/css/common.css")}}" rel="stylesheet" type="text/css" />
    <style type="text/css">
        table.dataTable thead .sorting:after {
            opacity: 0.5;
            content: "\e150";
        }

        table.dataTable thead .sorting_asc:after {
            opacity: 0.5;
            content: "\e155";
        }

        table.dataTable thead .sorting_desc:after {
            opacity: 0.5;
            content: "\e156";
        }
    </style>
    <script src="{{loadAsset('/js/commons/timer-counter.js')}}"></script>
    <script type="text/javascript" src="{{loadAsset('/js/commons/browser-close-action.js')}}"></script>

    <!-- for fe services -->
    <link href="{{loadAsset('fe-services/call/css/index.css')}}" rel="stylesheet" type="text/css" />
    <!--\ for fe services -->
    
    <!-- common function jquery event for fe service -->
    <script src="{{loadAsset('fe-services/call/js/index.js')}}" type="text/javascript"></script>

    <!-- reset css -->
    <style>
        html{font-size:14px;}
    </style>    
</head>

<body class="skin-blue sidebar-mini disable-pointer-event">
    @yield('page-css-body')
    <div id='ajax-loading-bpo' style="height: 100%;
        width: 100%;
        top:0;
        left:0;
        position: absolute;
        z-index:100001;
        display:none; 
        background-color:rgba(255, 255, 255, 0.5);">
        <!-- <img src="/images/loading.gif" /> -->
    </div>
    <div class="wrapper">
        <!-- Header -->
        @include('layout.header')

        <!-- Sidebar -->
        @include('layout.sidebar')

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <div style="position: relative;">
                <div id='ajax-loading' style="height: 100%;
					width: 100%;
					top:0;
					left:0;
					position: absolute;
					z-index:100000;
					display:none; 
					background-color:rgba(255, 255, 255, 0.5);">
                    <!-- <img src="/images/loading.gif" /> -->
                </div>

                <!-- Content Header (Page header) -->
                @if(isset($page_title))
                <section class="content-header">
                    <h1>
                        {{ $page_title or "Page Title" }}
                        <small>{{ $page_description or null }}</small>
                    </h1>
                    <!-- You can dynamically generate breadcrumbs here -->
                    <!--    <ol class="breadcrumb">
						   <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
						   <li class="active">Here</li>
					   </ol> -->
                </section>
                @endif

                <!-- Main content -->
                <section class="content">
                    @if(session('succ_msg', null))
                    <div class="alert alert-success alert-dismissible alert-auto-close">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <h4><i class="icon fa fa-check"></i> Alert!</h4>
                        <b>{{ session('succ_msg') }}</b>
                    </div>
                    @endif

                    @if(session('err_msg', null))
                    <div class="alert alert-danger alert-dismissible alert-auto-close">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <h4><i class="icon fa fa-ban"></i> Alert!</h4>
                        <b>{{ session('err_msg') }}</b>
                    </div>
                    @endif

                    <!-- Your Page Content Here -->
                    @yield('content')
                    <div class="minmaxCon"></div>
                </section><!-- /.content -->
            </div>
        </div><!-- /.content-wrapper -->

        <!-- Footer -->
        @include('layout.footer')

    </div><!-- ./wrapper -->
    @yield('modal-container')
    <a id="btnToggleCrmModalQuestions" class="btn btn-success" style="position: fixed; left: 6px; bottom: 6px; z-index: 100000000; display: none; color: yellow"><i class="fa fa-star"></i> Đánh giá khách hàng</a>
    <!-- REQUIRED JS SCRIPTS -->

    <!-- Bootstrap 3.3.2 JS -->
    <script src="{{ loadAsset ("/bootstrap/js/bootstrap.min.js") }}" type="text/javascript"></script>
    <script src="{{loadAsset("/js/bootbox.min.js")}}"></script>
    <!-- AdminLTE App -->
    <script src="{{ loadAsset ("/dist/js/app.min.js") }}" type="text/javascript"></script>
    <script src="{{loadAsset("/js/jquery-confirm.min.js")}}"></script>
    <!-- jquery-waitingfor -->
    <script src="{{loadAsset("/plugins/jquery-waitingfor/waitingfor.js") }}" type="text/javascript"></script>
    <script src="{{ loadAsset ("/plugins/mask/jquery.mask.min.js") }}" type="text/javascript"></script>
    <script src="{{loadAsset("/js/endpoint.js")}}"></script>
    <script src="{{loadAsset("/js/template7.min.js")}}"></script>
    <script src="{{loadAsset("/js/function.js")}}"></script>
    {{--<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>--}}
    {{--<script src="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.js')}}"></script>--}}
    <script type="text/javascript" src="/js/jquery.elevatezoom.js"></script>
    <script type="text/javascript" src="/js/jm_commons/root.js"></script>
    <script src="/js/lightgallery-all.js"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key={!! GG_KEY !!}&libraries=places,drawing&language=vi-VN"></script>
    <script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script>
    <script type="text/javascript" src="/js/intercom.js"></script>
    <script src="{{ loadAsset("/js/commons/crm-modal-question.js") }}"></script>
    <!-- 3CX CALL -->
    <script src="{{loadAsset('/js/call-services/3cx.js') }}"></script>
    <script src="{{loadAsset('/js/CCall.js') }}"></script>
    <!-- END 3CX CALL -->
    <script>
        var baseApi = "{!! BASE_API !!}";
        var BASE_API_CALL = "{!! BASE_API_CALL !!}";
        var FE_HUB = "{!! FE_HUB !!}";
        var baseSearchListingApi = "{!! BASE_API_SEARCH_LISTING !!}";
        var baseWebSocketApi = "{!! BASE_WEB_SOCKET_API !!}";
        var baseUploadApi = "{!! BASE_UPLOAD_API !!}";
        var baseUploadApiPublic = "{!! BASE_UPLOAD_API_PUBLIC !!}";
        var CALL_SERVICES = "{!!CALL_SERVICES!!}" !== "" ? "{!!CALL_SERVICES!!}" : 1;
        var currentUser = <?php echo json_encode($currentUser); ?>;
        var notification = null;
        var curentUrl = null;
        var hotLine = '(028)73066099';
        var apiGateway = "{!! API_GATEWAY !!}";
        var PORTAL_BASE_URL = "{!! PORTAL_BASE_URL !!}";
    </script>
    @yield('page-js')
    <!-- Check Empty -->
    <script src="{{ loadAsset("/js/common/sockjs.min.js")}}"></script>
    <script src="{{ loadAsset("/js/common/stomp.min.js")}}"></script>
    <script src="{{ loadAsset("/js/common/ws.js")}}"></script>
    <script src="{{loadAsset("/plugins/bootstrap-notify/bootstrap-notify.min.js")}}"></script>
    <script src="{{ loadAsset("/js/common/PropzyNotifications.js")}}"></script>
    <script src="{{ loadAsset("/js/common/notification.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>

    <script src="{{ loadAsset("/js/pos/common/plugins/axios/axios.min.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/common-pos-api.js")}}"></script>
    <script src="{{ loadAsset("js/pos/common/common-pos.js") }}"></script>
    <script src="{{ loadAsset("/js/pos/common/common-pos-notification.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/PrescreenNotification.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/common-pos-call-all-pages-sa.js")}}"></script>

    <script src="{{ loadAsset("/js/pos/common/Listing.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/sa/SAApi.js")}}"></script>
    <script src="{{ loadAsset("js/pos/prescreener/Reminder.js") }}"></script>
    <script src="{{ loadAsset("/js/pos/sa/SAReminder.js")}}"></script>

    <script src="{{ loadAsset("/js/pos/sa/SANotification.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/sa/SACheckEmpty.js")}}"></script>

    <!-- SWAT OPTIMIZE -->
    <script src="{{loadAsset('/js/swat_optimize/api.js')}}"></script>

    @include('pos.sa.checkEmptyPopupModal')
    @include('pos.sa.checkEmptyResultModal')
    @include('pos.blocks.blc-show-note-reminder-model')
    @include('pos.sa.blocks.deposit-support-modal')
    @include('shared.timer-warning-modal')
    @include('shared.info-common-noti')
    @include('shared.modal-load-image360')

    <script>
        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.getElementById('csrf-token').value
        };
        $(document).ready(function() {
            Window.pre = {};
            Window.pre.reminder = new Reminder();
            Window.pre.reminder.init();
            Window.sa = {};
            Window.sa.api = new SAApi();
            Window.sa.reminder = new SAReminder();
            Window.sa.reminder.init();
        })
    </script>
    {{-- <script src="{{ loadAsset("js/pos/common/plugins/jquery-select-areas-master/jquery.selectareas.min.js") }}"></script> --}}

    {{--@if(!empty($currentUser->departments) && in_array($currentUser->departments[0]->departmentId, [14, 15, 16, 17, 18]))
	<!-- <script src="{{ loadAsset("/js/pos/common/plugins/axios/axios.min.js")}}"></script> -->
    <script src="{{ loadAsset("/js/pos/common/common-pos-api.js")}}"></script>
    <script src="{{ loadAsset("js/pos/common/common-pos.js") }}"></script>
    <script src="{{ loadAsset("/js/pos/common/common-pos-notification.js")}}"></script>
    <script>
        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': document.getElementById('csrf-token').value
        }
    </script>
    @endif

    @if(!empty($currentUser->departments) && $currentUser->departments[0]->departmentId == 14)
    <script src="{{ loadAsset("/js/pos/common/Listing.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/sa/SAApi.js")}}"></script>
    <script src="{{ loadAsset("js/pos/prescreener/Reminder.js") }}"></script>
    <script src="{{ loadAsset("/js/pos/sa/SAReminder.js")}}"></script>
    <script>
        $(document).ready(function() {
            Window.pre = {};
            Window.pre.reminder = new Reminder();
            Window.pre.reminder.init();
            Window.sa = {};
            Window.sa.api = new SAApi();
            Window.sa.reminder = new SAReminder();
            Window.sa.reminder.init();
        })
    </script>
    @elseif(!empty($currentUser->departments) && $currentUser->departments[0]->departmentId == 16)
    <script src="{{ loadAsset("/js/pos/common/PrescreenNotification.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/Listing.js")}}"></script>
    <script src="{{ loadAsset("js/pos/prescreener/Reminder.js") }}"></script>
    <script>
        $(document).ready(function() {
            Window.pre = {};
            Window.pre.reminder = new Reminder();
            Window.pre.reminder.init();
        })
    </script>
    @elseif(!empty($currentUser->departments) && $currentUser->departments[0]->departmentId == 17)
    <script src="{{ loadAsset("/js/pos/common/Listing.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/common-pos-call-all-pages-sa.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/sa/SAApi.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/sa/SANotification.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/sa/SACheckEmpty.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/sa/SAReminder.js")}}"></script>
    @include('pos.sa.checkEmptyPopupModal')
    @include('pos.sa.checkEmptyResultModal')
    @include('pos.blocks.blc-show-note-reminder-model')
    @include('pos.sa.blocks.deposit-support-modal')
    <script>
        $(document).ready(function() {
            Window.sa = {};
            Window.sa.api = new SAApi();
            Window.sa.reminder = new SAReminder();
            Window.sa.reminder.init();
        })
    </script>
    @elseif(!empty($currentUser->departments) && $currentUser->departments[0]->departmentId == 18)

    @endif--}}
    <!-- Check Empty -->
    @include('owner-activities.modal-log')
    <!-- QUESTION MODAL -->
    <div id="modal_here_question_ajax"></div>
    <!-- IMAGE MODAL -->
    @include('shared.image-modal')
    <link href="{{loadAsset("/css/common/bootstrap-select.min.css")}}" rel="stylesheet" type="text/css" />
    <script src="{{loadAsset("/js/common/bootstrap-select.min.js")}}"></script>
    <script type="text/javascript">
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('#csrf-token').val()
            }
        });


        function openModalQuestion(leadId, typePageForQuestion, auto = null, compare = null, isResult = null) {
            // alert('good');
            // return false;
            // ẨN GROUP BUTTON ACTION IN DEAL/LEAD DETAIL
            $('.show-btn-action-group').hide("slow");
            $('.hide-btn-action-group').show("slow");
            var postData = {
                'leadId': leadId
            };
            if (typeof deal !== 'undefined' && typeof deal.dealId !== 'undefined') {
                postData.dealId = deal.dealId;
            }
            if (compare != null) {
                postData.compare = 'compare';
            }

            if (isResult != null) {
                postData.isResult = isResult;
            }

            showPropzyLoading();
            $.ajax({
                url: "/question/open-modal-in-task",
                type: "post",
                datatype: 'html',
                data: JSON.stringify(postData)
            }).done(function(response) {
                if (typeof response.code !== "undefined" && parseInt(response.code) !== 200) {
                    showPropzyAlert(response.message, "Thông báo");
                    return;
                }
                $('#modal_here_question_ajax').html(response);
                // nếu đang ở task detail thì set CRM_ModalQuestion.flagIsTaskView = true (nếu có) để khi submit dùng taskId của task View
                if (typeof CRM_ModalQuestion !== "undefined" && globalElementJustClick != null) {
                    if (globalElementJustClick.className == 'btn btn-success btn-open-from-task-view') {
                        CRM_ModalQuestion.flagIsTaskView = true;
                    }
                }
                $('#QuestionModal').modal('show');
                $('#QuestionModal').on('shown.bs.modal', function() {
                    if (typeof lead !== "undefined" && typeof lead.requiredAction !== "undefined") {
                        // kích hoạt ẩn modal questionform
                        if (typeof minModalFunc === "function") {
                            minModalFunc();
                            $('#QuestionModal .closeQuestion').hide();
                        }
                    } else {
                        $('.modalMinimize').hide();
                    }

                    // if (localStorage.getItem("minQueModal") !== null) {
                    // 	var minModalId = JSON.parse( localStorage.getItem('minQueModal') );
                    // 	if(jQuery.inArray(lead.leadId, minModalId) !== -1){
                    // 		$('.modalMinimize').trigger( "click" );
                    // 	}
                    // }

                    // default là min question modal
                    if (auto != null) {
                        $('.modalMinimize').trigger("click");
                    }
                });
                $('#typePageForQuestion').val(typePageForQuestion);
                if (typePageForQuestion == 2) {
                    $('#QuestionModal .modal-title').html('XÁC NHẬN NHU CẦU')
                }
                initQuestionModal();
                if (CRM_ModalQuestion.isLoadFromNotify) {
                    CRM_ModalQuestion.modalLoaded();
                }
            }).always(function() {
                hidePropzyLoading();
            });
        }

        function resetResult() {

            var data_resq = JSON.parse($('#QuestionModal input[name=data]').val());
            data = data_resq.resultQuestion;

            $('#QuestionModal input,#QuestionModal select').each(function() {
                var level = $(this).attr('level');
                if (typeof level != 'undefined') {
                    if (level.indexOf('_') > -1) { // câu trả lời cấp con
                        levelArr = level.split('_');
                        var parentId = levelArr[0];
                        var answerId = levelArr[1];
                        var questionId = levelArr[2];
                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0; j < data[i].answers.length; j++) {
                                for (var g = 0; g < data[i].answers[j].questions.length; g++) {
                                    data[i].answers[j].questions[g]['results'] = [];
                                }
                            }
                        }
                    }
                }
            });

            data_resq.resultQuestion = data;
            $('#QuestionModal input[name=data]').val(JSON.stringify(data_resq));
        }

        function initQuestionModal() {
            $('.multiselect-ui').selectpicker({});

            $('.multiselect-ui-parent').each(function() {
                var idAnswer = $(this).val()
                if (idAnswer != "") {
                    $('label[answerId="' + idAnswer + '"], div[answerId="' + idAnswer + '"]').removeClass('hidden');
                    $(this).find("option").each(function() {
                        // console.log($(this).attr('value'))
                        if ($(this).attr('value') != idAnswer && $(this).attr('value') != "") {
                            $('label[answerId="' + $(this).attr('value') + '"], div[answerId="' + $(this).attr('value') + '"]').addClass('hidden');
                        }
                    });
                }
            })

            $('.multiselect-ui-parent').on('change', function() {
                var idAnswer = $(this).val()
                if (idAnswer != "") {
                    $('label[answerId="' + idAnswer + '"], div[answerId="' + idAnswer + '"]').removeClass('hidden');
                    $(this).find("option").each(function() {
                        // console.log($(this).attr('value'))
                        if ($(this).attr('value') != idAnswer && $(this).attr('value') != "") {
                            $('label[answerId="' + $(this).attr('value') + '"], div[answerId="' + $(this).attr('value') + '"]').addClass('hidden');
                        }
                    });
                }
            });

            $('#QuestionModal input').on('keydown', function() {
                $('#QuestionModal .btn-submit').show()
            })
            $('.multiselect-ui-parent').on('change', function() {
                $('#QuestionModal .btn-submit').show()
            })

            $('#QuestionModal .btn-submit').unbind('click');
            $('#QuestionModal .btn-submit').on('click', function(evt) {
                $('#QuestionModal .btn-submit').prop("disabled", true);
                var valid = false;
                resetResult(); // for case update form
                var data_resq = JSON.parse($('#QuestionModal input[name=data]').val());
                data = data_resq.resultQuestion;
                $('#QuestionModal input,#QuestionModal select').each(function() {
                    // reset require
                    $(this).removeAttr('style');
                    $(this).siblings('button').removeAttr('style');

                    if ($(this).is(":visible")) {
                        // check "isRequired"
                        if ($(this).attr('isRequired') == 'isRequired') {
                            if ($(this).val() == "" || $(this).val() == null || $(this).val() == 0) {
                                $(this).attr('style', 'border: 1px solid red');
                                $(this).siblings('button').attr('style', 'border: 1px solid red');
                                $(this).focus();
                                $(this).siblings('button').focus();
                                valid = true;
                            }
                            console.log('value: ' + $(this).val())
                            // evt.preventDefault();
                            // return false;
                        }
                        // if ( $(this).attr('isRequired') ){
                        //   console.log('isRequired '+$(this).val());
                        //   // if($(this).val() == ""){
                        //     $(this).attr('style','border: 1px solid red');
                        //     console.log(JSON.stringify(data));

                        //     console.log('no');
                        //     evt.preventDefault();
                        //     return false;
                        //   // }
                        // }
                        // console.log(JSON.stringify(data));

                        // console.log('no');
                        // evt.preventDefault();
                        // return false;

                        var level = $(this).attr('level');
                        if (level.indexOf('_') > -1) { // câu trả lời cấp con
                            levelArr = level.split('_');
                            var parentId = levelArr[0];
                            var answerId = levelArr[1];
                            var questionId = levelArr[2];
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].questionId == parentId) {
                                    for (var j = 0; j < data[i].answers.length; j++) {
                                        if (data[i].answers[j].answerId == answerId) {
                                            for (var g = 0; g < data[i].answers[j].questions.length; g++) {
                                                if (data[i].answers[j].questions[g].questionId == questionId) {
                                                    if ($(this).is('input')) {
                                                        data[i].answers[j].questions[g]['results'] = [{
                                                            "answerId": data[i].answers[j].questions[g].answers[0].answerId,
                                                            "customValue": $(this).val()
                                                        }];
                                                    } else {
                                                        if ($(this).val() != null && $(this).val().constructor === Array) { // nếu đây là câu trả lời nhiều câu trả lời (câu hỏi con)
                                                            var result = [];
                                                            for (var res = 0; res < $(this).val().length; res++) {
                                                                result.push({
                                                                    'answerId': $(this).val()[res],
                                                                    'answerName': $(this).find('option[value=' + $(this).val()[res] + ']').text(),
                                                                    'customValue': null
                                                                })
                                                            }
                                                            data[i].answers[j].questions[g]['results'] = result;
                                                        } else {
                                                            if ($(this).val() != '' && $(this).val() != null) {
                                                                data[i].answers[j].questions[g]['results'] = [{
                                                                    "answerId": $(this).val(),
                                                                    'answerName': $(this).find('option[value=' + $(this).val() + ']').text(),
                                                                    "customValue": null
                                                                }];
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else { // câu trả lời cha
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].questionId == level) {
                                    if ($(this).is('input')) {
                                        data[i]['results'] = [{
                                            "answerId": data[i].answers[0].answerId,
                                            "customValue": $(this).val()
                                        }];
                                    } else {
                                        if ($(this).val() != '' && $(this).val() != null) {
                                            data[i]['results'] = [{
                                                "answerId": $(this).val(),
                                                'answerName': $(this).find('option[value=' + $(this).val() + ']').text(),
                                                "customValue": null
                                            }]
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
                data_resq.resultQuestion = data;
                data_resq.typePageForQuestion = $('#typePageForQuestion').val();
                if (data_resq.typePageForQuestion == 2) {
                    if (CRM_ModalQuestion.taskId && CRM_ModalQuestion.flagIsTaskView != true) {
                        data_resq.taskId = CRM_ModalQuestion.taskId;
                    } else {
                        data_resq.taskId = $('#taskId').val();
                    }
                } else {
                    data_resq.taskId = null;
                }

                if (valid == true) {
                    console.log('no');
                    $('#QuestionModal .btn-submit').prop("disabled", false);
                    evt.preventDefault();
                    return false;
                }

                if (typeof deal !== 'undefined' && typeof deal.dealId !== 'undefined') {
                    data_resq.dealId = deal.dealId;
                }

                if (typeof lead !== 'undefined' && typeof lead.requiredAction !== 'undefined') {
                    data_resq.requiredAction = lead.requiredAction == "" ? null : lead.requiredAction;
                }
                // console.log(JSON.stringify(data_resq));
                // return false;
                showPropzyLoading();
                $.ajax({
                    'url': '/question/set-quetion-form-view',
                    'type': 'POST',
                    'data': JSON.stringify(data_resq)
                }).done(function(response) {
                    // return false;
                    // console.log(JSON.stringify(response));
                    // console.log('stop');
                    // evt.preventDefault();
                    // return false;
                    if (response.result == true) {
                        // nếu là form khách hàng ở lead thì ẩn question form và hiện tiếp meeting form (option)
                        if (typeof lead !== "undefined" && typeof lead.requiredAction !== "undefined") {
                            // kích hoạt socket client

                            var intercom = Intercom.getInstance();
                            // emit
                            intercom.emit('reloadPage', '<?php echo !empty($need_active) ?  json_encode($need_active) : '' ?>');
                            $('#QuestionModal').modal('hide');
                            if (lead.filterDGKH != "") { // Kiểm tra xem KH này có nhiều nhu cầu hay không và tất cả các nhu cầu đã DGKH hay chưa
                                if (lead.requiredAction == 'question-form') {
                                    // $('#btnSendToCrm').click();
                                    triggerSendToCrm();
                                }
                            } else {
                                location.reload();
                            }
                        } else {
                            $('#QuestionModal .btn-submit').hide();
                            $('#pointProfileQuestion').html(Math.round(response.data.profileValue) + " đ");
                            $('#alertSubmitCompleteQuestion').html('<div class="alert alert-success"> <strong>Hệ thống: </strong> Cập nhật thành công !</div>');

                            if (data_resq.typePageForQuestion == 2) {
                                JMDetail.typeDeal(data_resq.leadId);
                                // location.reload();
                                // $('#QuestionModal').modal('hide');
                                // showModalCreateTasks(data_resq.taskId);
                                // $('#modalCreateTasks').modal('show');
                                // $('#tasks .btn-success').hide();

                            }
                            // $("html, body").animate({
                            //         scrollTop: $('#alertSubmitCompleteQuestion').offset().top
                            //     });
                            // }
                            if (typeof CRM_ModalQuestion.notifyItem !== 'undefined' && CRM_ModalQuestion.notifyItem != null) {
                                // console.log(CRM_ModalQuestion.notifyItem.id);return false;
                                setNotificationRead(CRM_ModalQuestion.notifyItem.id);
                            }
                            if ((typeof deal) != "undefined") {
                                $.ajax({
                                    'url': '/common/check-closed-by/' + deal.dealId,
                                    'type': 'GET',
                                }).done(function(response) {
                                    if (response.result) {
                                        if (!response.data.isUpdateClosedBy) {
                                            JMDetail.typeDeal();
                                            // alert('Vô case này');return false;
                                        }
                                    }
                                })
                                // location.reload();
                            }
                            CRM_ModalQuestion.isLoadFromNotify = false;
                        }
                    } else {
                        $('#alertSubmitCompleteQuestion').html('<div class="alert alert-danger"><strong>Hệ thống: </strong> Đã xảy ra lỗi, vui lòng thử lại sau !.</div>');
                        setTimeout(function() {
                            location.reload()
                        }, 1000);

                    }
                }).always(function() {
                    hidePropzyLoading();
                })
            });

        }
    </script>
    <script>
        $(document).ready(function() {
            const activeMenu = localStorage.getItem('activeMenu');
            if (activeMenu) {
                $('#' + activeMenu).parents('.treeview-menu').css('display', 'block')
            }

            $(document).on('click', '.treeview-menu li', function(e) {
                localStorage.setItem('activeMenu', $(this).attr('id'));
            })
        });

        var intercom = Intercom.getInstance();
        intercom.on('closeModalCancleMeeting', function(meetingIdNoty) {
            console.log(meetingIdNoty)
            if (($("#modalTaskDetail").data('bs.modal') || {}).isShown) {
                var thisModal = $('#modalTaskDetail').find('#meetingId');
                if (parseInt(thisModal.val()) == parseInt(meetingIdNoty)) {
                    thisModal.parents('#modalTaskDetail').modal('hide');
                }
            }

            // defineId "32" meetingId "4494"
            if (typeof defineId !== 'undefined' && typeof meetingId !== 'undefined') {
                if (defineId == 32 && meetingId == meetingIdNoty) {
                    window.location.href = "/";
                }
            }

        })
        intercom.on('closeQuickCheckResult', function(res) {
            if (res.action) {
                $('#modalQuickCheckListingResults').modal('hide');
            }
        })

        intercom.on('closeModalRequestBankLoan', function(res) {
            $('#modalRequestBankLoan').modal('hide');
        })
    </script>
    <script type="text/javascript" src="{{loadAsset('/js/rldGlobal.js')}}"></script>
    <script src="{{ loadAsset('/js/commons/common-notify.js') }}"></script>

    <style type="text/css">
        #QuestionModal .dropdown-toggle,
        #QuestionModal .btn-group,
        #QuestionModal .dropdown-menu {
            width: 100%;
        }

        #check-empty-result-modal .form-group {
            width: auto;
        }
    </style>
    <!-- QUESTION MODAL -->
    <input type="hidden" id="propzyCallId">
    <input type="hidden" id="flagEndCall" value=="init">
    @include('layout.micro-fe')
</body>

</html>