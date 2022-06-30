<?php
/**
 * Created by PhpStorm.
 * User: hooaluu
 * Date: 5/29/2019
 * Time: 2:58 PM
 */
?>
@extends('layout.default')

@section('content')
    @include('agent-manager.block-agent-create-template')
    <div id="modal-change-status" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <div class="modal-content">
                <div class="modal-header">
                    <a href="#" class="close" data-dismiss="modal">&times;</a>
                    <h4 class="modal-title">Duyệt môi giới chưa chính thức</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label class="control-label" for="agent-info-source-cancel">Nguồn hủy</label>
                                    </div>
                                    <div class="col-md-12 ">
                                        <select class="form-control" id="agent-info-source-cancel"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label class="control-label" for="agent-info-reason-cancel">Lý do</label>
                                    </div>
                                    <div class="col-md-12 ">
                                        <select class="form-control" id="agent-info-reason-cancel"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row agent-info-note-cancel-wrapper">
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label class="control-label" for="agent-info-note-cancel">Ghi chú</label>
                                    </div>
                                    <div class="col-md-12 ">
                                        <textarea class="form-control" rows="3" id="agent-info-note-cancel"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" id="agent-info-change-status-save">Lưu</button>
                </div>
            </div>

        </div>
    </div>
    @include('agent-manager.list-duplicate-agents-modal')
@endsection

@section('page-js')
    <script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
    <script src="{{ loadAsset("/js/propzy-validator.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/common-pos.js") }}"></script>
    <script type="text/javascript">
        const _PAGE_TYPE = '{{$pageTypeAgent}}';
        const _DETAIL = {!! $detail !!};
    </script>
    <script src="{{ loadAsset("/js/agent-manager/agent-create-edit.js")}}"></script>
@stop
@section('page-css')
    <link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
@stop