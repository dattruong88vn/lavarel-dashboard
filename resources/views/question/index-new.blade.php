@extends('layout.default')
@section('content')
    <?php $csrf_token = csrf_token(); ?>
    <input type="hidden" id="csrf-token" name="_token" value="{{$csrf_token}}"/>

    <div class="row" id="question-page">
        <div class="col-md-12">
            <div class="box box-info">
                <div class="box-body">
                    <div class="row form-group">
                        <div class="col-md-12">
                            <button class="btn btn-sm btn-primary btn-change-listing-type" id="btn-listing-type-buy"
                                    data-id="1" disabled>Mua
                            </button>
                            <button class="btn btn-sm btn-default btn-change-listing-type" id="btn-listing-type-rent"
                                    data-id="2">Thuê
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- QUESTION -->

            <div class="row form-group">
                <div class="col-md-6 questions-panel-left" style="border-right: 5px solid #dedede;">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="box box-info">
                                <div class="box-body">
                                    <div class="questions" id="add-edit-panel"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12" id="question-list-panel"></div>
                    </div>
                </div>
                <div class="col-md-6  questions-panel-right">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="box box-info">
                                <div class="box-body">
                                    <h3 id="displayblockForm" class="text-center">Form đánh giá khách hàng <span class="scope_display">0 %</span></h3>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12" id="question-list-form-panel"></div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <button class="btn btn-primary" id="btn-save-form-question" style="width: 100%">Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="modal_select_question" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Chọn logic câu hỏi phụ</h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="dataQuestionModal" name="">
                    <input type="hidden" id="positionQuestionModal" name="">
                    <input type="hidden" id="positionAnswerModal" name="">
                    <input type="hidden" id="question-sub-answer" name="">
                    <input type="hidden" id="question-sub-question" name="">
                    <div class="row form-group" id="questions-sub-content"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" id="btn-save-sub-question">Lưu
                    </button>
                </div>
            </div>

        </div>
    </div>
@endsection
@section('page-js')
    <script type="text/javascript">
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': "{{$csrf_token}}"
            }
        });
    </script>
    <script src="{{ loadAsset("/js/questions/index.js")}}"></script>
@stop
@section('page-css')
    <style type="text/css">
        .questions label {
            padding-left: 10px;
        }

        .questions .input-clean-j {
            border-top: none;
            border-left: none;
            border-right: none;
        }

        .questions .answer {
            padding-left: 30px;
            text-align: right;
        }

        .questions .answer a {
            font-size: 12px;
        }

        .questions .group-action-question {
            margin-top: 10px;
        }

        .questions .group-action-question span {
            margin-right: 10px;
        }

        .question-items .answer-action-top, .question-items-form .answer-action-top {
            float: right;
        }

        .question-items .answer-action-top > i, .question-items-form .answer-action-top > i {
            font-size: 16px;
            margin-left: 10px;
            cursor: pointer;
        }

        .question-items li, .question-items-form li {
            width: 100%;
            margin-bottom: 5px;
            padding: 5px;
        }

        .add-logic-question {
            margin-left: 5px;
            font-size: 16px;
            cursor: pointer;
        }
    </style>
@stop
