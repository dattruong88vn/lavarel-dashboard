<div id="modalBPOChangeTime" class="modal fade" role="dialog">
    <div class="modal-dialog modal-bpo">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title text-center"><strong>THAY ĐỔI THỜI GIAN CHỐT DEAL</strong></h4>
            </div>
            <div class="modal-body">
                <form id="modal-bpo-change-time">
                    <section id="section-date-confirmed" class="bpo-rating">
                        <h5 class="f-bold">Thời gian dự kiến có thể chốt Deal <span class="text-warning">*</span></h5>
                        <div class="row">
                            <div class="change-time-dropdown col-md-6 ">
                                <select id="change-time-date" class="form-control" name="change-time-date"></select>
                            </div>
                            <div class="col-md-4 input-group">
                                <input id="expectedClosingDate" name="expectedClosingDate" class="form-control" placeholder="N/A" />
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                            </div>
                        </div>
                    </section>
                    <br /><br />
                    <section id="section-change-time-reason" class="bpo-rating">
                        <h5 class="f-bold">Nhập lý do thay đổi thời gian chốt Deal <span class="text-warning">*</span></h5>
                        <div class="change-time-reason-limit">0/50</div>
                        <div class="change-time-reason-dropdown-menu">
                            <input rows="1" id="bpo-change-time-reason" class="" value="" />
                        </div>
                    </section>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" id="cancel-bpo-change-time-reason" class="btn btn-second" data-dismiss="modal">Hủy</button>
                <button type="button" id="update-bpo-change-time-reason" class="btn btn-success" disabled>Xác Nhận</button>
            </div>
        </div>
    </div>
</div>
<link href="/typeahead/dist/typeahead.css" type="text/css" rel="stylesheet" />
<link href="/bootstrap-tagsinput/dist/bootstrap-tagsinput.css" type="text/css" rel="stylesheet" />
<style type="text/css">
    #modalBPOChangeTime h3 {
        padding: 0px;
        margin: 0px;
    }

    .f-bold {
        font-weight: bold;
    }

    .change-time-reason-limit {
        float: right;
        margin-top: -20px;
    }

    .change-time-reason-limit::after {
        clear: both;
    }

    .modal-bpo {
        min-width: 800px;
        width: 800px;
    }

    .modal-bpo .modal-body {
        width: 800px;
    }

    .modal-bpo .bootstrap-tagsinput {
        width: 100%;
        max-width: 900px;
    }

    #section-change-time-reason .bootstrap-tagsinput {
        min-height: 100px;
    }

    a.bpo-modal-change-time {
        cursor: pointer;
    }

    .text-warning {
        color: #f00;
    }

    .change-time-reason-dropdown-menu .tt-menu,
    .change-time-reason-dropdown-menu .tt-menu {
        max-height: 200px;
        overflow-y: auto;
    }

    .bpo-rating .bootstrap-tagsinput .tag {
        white-space: break-spaces;
        max-width: 760px;
        display: inline-block;
        position: relative;
        padding-right: 25px;
        text-align: left;
        padding-left: 20px;
        overflow-x: hidden;
    }

    .bpo-rating .bootstrap-tagsinput .tag [data-role="remove"] {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
    }
</style>
<script src="/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js"></script>
<script src="/js/common/propzy-common.js"></script>
<script type="text/javascript">
    var PROPZY_BPO_CHANGE_TIME = {
        data: {
            reasons: []
        },
        details: {},
        render: () => {
            $('#modalBPOChangeTime input#expectedClosingDate').closest('.input-group').css('display', 'none');
            $('input#customerEvaluateDatePicker').datepicker({format: 'dd/mm/yyyy'});
            $('#modalBPOChangeTime input#bpo-change-time-reason').tagsinput({
                maxChars: 500,
                maxTags: 50,
                confirmKeys: [13],
                delimiter: ';'
            });

            $('#modalBPOChangeTime input#bpo-change-time-reason').on('itemAdded', function(e) {
                $('#modalBPOChangeTime div.change-time-reason-limit').html($('#modalBPOChangeTime input#bpo-change-time-reason').tagsinput('items').length + '/50');
                PROPZY_BPO_CHANGE_TIME.checkRequired();
            });
            $('#modalBPOChangeTime input#bpo-change-time-reason').on('itemRemoved', function(e) {
                $('#modalBPOChangeTime div.change-time-reason-limit').html($('#modalBPOChangeTime input#bpo-change-time-reason').tagsinput('items').length + '/50');
                PROPZY_BPO_CHANGE_TIME.checkRequired();
            });
            if ($("#listingTypeId").val() == 1) {
                $('div.customerEvaluatedGroup').show();
            }
            $.ajax({
                url: '/kyc-api/getListChannelTypes/63',
                data: {},
                type: 'GET'
            }).done(function(data) {
                if (data.result && data.data.length > 0) {
                    $('#change-time-date, #customerEvaluateDateSelect').html('').append('<option value="">---Chọn thời gian chốt Deal---</option>');
                    data.data[0].list.forEach(i => {
                        $('#change-time-date, #customerEvaluateDateSelect').append(`<option value="${i.code}" data-id="${i.id}">${i.name}</option>`)
                    });
                    var timeDate = $('#current-evaluated-date').html();
                    $('#modalBPOChangeTime div.change-time-reason-limit').html($('#modalBPOChangeTime input#bpo-change-time-reason').tagsinput('items').length + '/50');
                }
            });
        },
        calcDate: (code) => {
            switch (code) {
                case 'IN_THIS_MONTH':
                    return PROPZY_DATE.getStringDateAfterDays(30);
                case 'IN_60_DAYS':
                    return PROPZY_DATE.getStringDateAfterDays(60);
                case 'IN_90_DAYS':
                    return PROPZY_DATE.getStringDateAfterDays(90);
            }
            return '';
        },
        calcMinDate: (code) => {
            switch (code) {
                case 'IN_THIS_MONTH':
                    return PROPZY_DATE.getStringDateAfterDays(0);
                case 'IN_60_DAYS':
                    return PROPZY_DATE.getStringDateAfterDays(31);
                case 'IN_90_DAYS':
                    return PROPZY_DATE.getStringDateAfterDays(61);
            }
            return '';
        },
        setDefault: () => {
            $('#modalBPOChangeTime input#bpo-change-time-reason').tagsinput('removeAll');
            $('#modalBPOChangeTime input#bpo-change-time-reason').tagsinput('add', $('#customerEvaluateDateReasons').val());
            if (!$('#change-time-date').has('option[value=""]').length) {
                $('<option value="">---Chọn thời gian chốt Deal---</option>').insertBefore($('#change-time-date option:first-child'));
            }
            $('#change-time-date').val('');
            $('#modalBPOChangeTime input#expectedClosingDate').closest('.input-group').css('display', 'none');
            $('button#update-bpo-change-time-reason').attr('disabled', 'disabled');
        },
        checkRequired: () => {
            var code = $('#change-time-date').val();
            var date = $('#modalBPOChangeTime input#expectedClosingDate').val();
            var reasons = $('#modalBPOChangeTime input#bpo-change-time-reason').tagsinput('items');

            if (code && date && reasons.length > 0) {
                $('button#update-bpo-change-time-reason').removeAttr('disabled');
                return;
            }         
            $('button#update-bpo-change-time-reason').attr('disabled', 'disabled');
        },
        init: () => {
            $('#modalBPOChangeTime input#bpo-change-time-reason').val($('#customerEvaluateDateReasons').val());
            $('a.bpo-modal-change-time').unbind('click').click(function() {
                $('#modalBPOChangeTime').modal('show');
            });
            $('#customerEvaluateDateSelect').unbind('change').change(function() {
                var code = $(this).val();
                var minDate = PROPZY_BPO_CHANGE_TIME.calcMinDate(code);
                var maxDate = PROPZY_BPO_CHANGE_TIME.calcDate(code);
                $('#customerEvaluateCode').val(code);
                $('#customerEvaluateDate').val('');
                if (maxDate != '') {
                    $('#customerEvaluateDatePicker').closest('.input-group').css('display', 'table');
                    var minDateTrans = new Date(PROPZY_DATE.convertDMYToYMD(minDate))
                    var maxDateTrans = new Date(PROPZY_DATE.convertDMYToYMD(maxDate));
                    $('#customerEvaluateDatePicker').datepicker('destroy');
                    $('#customerEvaluateDatePicker').datepicker({ format: 'dd/mm/yyyy', startDate: minDateTrans, endDate: maxDateTrans });
                    $('#customerEvaluateDatePicker').datepicker('setDate', maxDate);
                }
                $('#customerEvaluateDateSelect option[value=""]').remove();
            });
            $('#customerEvaluateDatePicker').unbind('change').change(function() {
                var timeDate = $(this).val();
                $('#customerEvaluateDate').val('');
                if (timeDate != '') {
                    var d = new Date(PROPZY_DATE.convertDMYToYMD(timeDate));
                    $('#customerEvaluateDate').val(d.getTime());
                }
            });
            $('#modalBPOChangeTime #change-time-date').unbind('change').change(function() {
                var code = $(this).val();
                var minDate = PROPZY_BPO_CHANGE_TIME.calcMinDate(code);
                var maxDate = PROPZY_BPO_CHANGE_TIME.calcDate(code);
                if (maxDate != '') {
                    var minDateTrans = new Date(PROPZY_DATE.convertDMYToYMD(minDate))
                    var maxDateTrans = new Date(PROPZY_DATE.convertDMYToYMD(maxDate));
                    $('#modalBPOChangeTime input#expectedClosingDate').datepicker('destroy');
                    $('#modalBPOChangeTime input#expectedClosingDate').datepicker({ format: 'dd/mm/yyyy', startDate: minDateTrans, endDate: maxDateTrans });
                    $('#modalBPOChangeTime input#expectedClosingDate').datepicker('setDate', maxDate);
                    $('#modalBPOChangeTime input#expectedClosingDate').closest('.input-group').css('display', 'table');
                }
                $('#modalBPOChangeTime #change-time-date option[value=""]').remove();
                PROPZY_BPO_CHANGE_TIME.checkRequired();    
            });
            $('#modalBPOChangeTime input#expectedClosingDate').unbind('change').change(function() {
                PROPZY_BPO_CHANGE_TIME.checkRequired();
            });
            $('button#update-bpo-change-time-reason').unbind('click').click(function(e) {
                var code = $('#change-time-date').val();
                var date = $('#modalBPOChangeTime input#expectedClosingDate').val();
                var d = new Date(PROPZY_DATE.convertDMYToYMD(date));
                var reasons = $('#modalBPOChangeTime input#bpo-change-time-reason').tagsinput('items');
                $('#customerEvaluateCode').val(code);
                $('#customerEvaluateDate').val(d.getTime());
                $('#current-evaluated').html(`${date} <i class="fa fa-edit"></i>`);
                $('#customerEvaluateDateReasons').val(reasons.join(';'));
                $('#modalBPOChangeTime').modal('hide');
            });
            $('#modalBPOChangeTime').on('hidden.bs.modal', function () {
                PROPZY_BPO_CHANGE_TIME.setDefault();
            });
            PROPZY_BPO_CHANGE_TIME.render();
        }
    }
    $(function() {
        PROPZY_BPO_CHANGE_TIME.init();
    });
</script>