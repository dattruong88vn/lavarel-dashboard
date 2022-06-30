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
    <div class="row" id="agent-request-filter">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="input-group date-range date">
                                            <input id="agent-request-date-from" class="form-control" placeholder="Từ ngày">
                                            <div class="input-group-addon">
                                                <span class="glyphicon glyphicon-th"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="input-group date-range date">
                                            <input id="agent-request-date-to" class="form-control" placeholder="Đến ngày">
                                            <div class="input-group-addon">
                                                <span class="glyphicon glyphicon-th"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12">
                                        <input type="text" id="agent-request-name" class="form-control" placeholder="Tên">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12">
                                        <input type="text" id="agent-request-email" class="form-control" placeholder="Email">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12">
                                        <input type="text" id="agent-request-phone" class="form-control" placeholder="Số ĐT">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12">
                                        <select class="form-control" id="agent-request-source"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12">
                                        <select class="form-control" id="agent-request-type"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12 text-right">
                                        <button id="agent-request-search" type="button" class="btn btn-primary">Lọc dữ liệu</button>
                                        <button id="agent-request-clear-search" type="button" class="btn btn-default">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row" id="agent-request">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-body">
                    <div class="row">
                        <div class="col-xs-12">
                            <table id="tb-agent-request" class="table table-bordered table-striped" width="100%" style="width: 100%;">
                                <thead>
                                <tr>
                                    <th>Tên MG</th>
                                    <th>Email / Số ĐT</th>
                                    <th>Loại yêu cầu</th>
                                    <th>Nguồn</th>
                                    <th>Ngày yêu cầu</th>
                                    <th width="100px">Thao tác</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('page-js')
    <script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
    <script src="{{ loadAsset("/js/propzy-validator.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/common-pos.js") }}"></script>
    <script src="{{ loadAsset("/js/agent-manager/agent-management-requests.js")}}"></script>
@stop
@section('page-css')
    <link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
    <style type="text/css">
         .btn-phone-call-request {
            color: #366501;
            width: 100%;
             padding: 2px 5px;
             margin: 0;

        }
         .btn-phone-call-request:hover {
             background: #366501;
             color: #ffff;
             cursor: pointer;
             border-radius: 10px;
             font-weight: bold;
        }
         .btn-phone-call-request > i{
             float: right;
             padding-top: 4px;
         }
    </style>
@stop