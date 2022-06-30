@extends('layout.default')
@section('content')
    <div class='dashboard'>
        <div class="row">
            <div class="col-md-12">
                <!-- Hidden -->
                <div class="box box-info">
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="nav-tabs-custom">
                                    <ul class="nav nav-tabs">
                                        <li class="active" >
                                            <a id="tab-check-empty-sale" href="#content-tab-check-empty-sale" data-toggle="tab" aria-expanded="true" data-tab="1">Bán</a>
                                        </li>
                                        <li class="" >
                                            <a id="tab-check-empty-rent" href="#content-tab-check-empty-rent" data-toggle="tab" aria-expanded="false" data-tab="2">Thuê</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="content-tab-check-empty-sale">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <table id="check-empty-list-table-sale"
                                                           class="table table-bordered table-striped table-listing check-empty-table-sale" width="100%"
                                                           style="width: 100%;">
                                                        <thead>
                                                        <tr>
                                                            <th>Danh Sách Check Trống (Bán)</th>
                                                        </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="content-tab-check-empty-rent">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <table id="check-empty-list-table-rent"
                                                           class="table table-bordered table-striped table-listing check-empty-table-rent" width="100%"
                                                           style="width: 100%;">
                                                        <thead>
                                                        <tr>
                                                            <th>Danh Sách Check Trống (Thuê)</th>
                                                        </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('page-js')
@stop
@section('page-css')
    <link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
@stop