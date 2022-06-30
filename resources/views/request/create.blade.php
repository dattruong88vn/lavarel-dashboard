@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class='page-request'>
    <form method="post" id="formCreate" class="form-horizontal">
        <div class="db-tm-item deal-tm-customer-info">
            <ul class="nav nav-tabs">
                <li class="active"><a data-type-create='customer' href="#">Khách hàng</a></li>
                <li><a data-type-create='agent' href="#">Môi giới</a></li>
            </ul>
            <div id="agent-form-more" class="row">
                <div class="col-md-12">
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Thông tin môi giới</h3>
                        </div>
                        <div class="box-body">
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Môi giới</label>
                                <div class="col-sm-10">
                                    <select id="agentId" name="agentId" class="form-control">
                                        <option value="">N/A</option>
                                        <?php foreach ($agents as $agent) : ?>
                                            <option value="{{$agent->agentId}}">{{$agent->name}} {{ !empty($agent->phone) ? ' - ' . $agent->phone : ' - NA' }} {{ !empty($agent->email) ? ' - ' . $agent->email : ' - NA' }}</option>
                                        <?php endforeach; ?>
                                    </select>
                                    <input type="hidden" name="agentName" id="agentName" value="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">THÔNG TIN KHÁCH HÀNG</h3>
                        </div>
                        <input type="hidden" id="customerId" name="customerId" value="" />
                        <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
                        <div class="box-body">
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Campaign ID</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="campaignId" name="campaignId" placeholder="N/A">
                                    <div class="errors"></div>
                                    <div>
                                        <input type="checkbox" id="check_campaignId" name="check_campaignId" placeholder="N/A">
                                        <span class="text-muted">Không có Campaign ID</span>
                                    </div>
                                </div>
                                <label for="" class="col-sm-2 control-label">Đối tượng
                                    <span class="required">(*)</span></label>
                                <div class="col-sm-4">
                                    <select id="subjectId" name="subjectId" class="form-control">
                                        <option value="">N/A</option>
                                        <?php foreach ($subjects as $subject) : ?>
                                            <option value="{{$subject->subjectId}}">{{$subject->subjectName}}</option>
                                        <?php endforeach; ?>
                                    </select>
                                    <input type="hidden" name="subjectName" id="subjectName" value="" />
                                    <div class="errors"></div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Tên
                                    <span class="required">(*)</span></label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="customerName" name="customerName" placeholder="N/A">
                                    <div class="errors"></div>
                                </div>
                                <label for="" class="col-sm-2 control-label">Thông tin Vợ/Chồng </label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="customerPartnerName" name="customerPartnerName" placeholder="N/A" maxlength="64">
                                    <div class="errors"></div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">CMND/CCCD</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="customerIdCard" name="customerIdCard" placeholder="N/A" maxlength="64">
                                    <div class="errors"></div>
                                </div>
                                <label for="" class="col-sm-2 control-label">CMND/CCCD</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="customerPartnerIdCard" name="customerPartnerIdCard" placeholder="N/A" maxlength="64">
                                    <div class="errors"></div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Cấp ngày</label>
                                <div class="col-sm-4">
                                    <div class="col-sm-5 px-0">
                                        <div class="input-group date">
                                            <input id="customerIdCardIssueDate" name="customerIdCardIssueDate" class="form-control" placeholder="N/A">
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                        <div class="errors"></div>
                                    </div>
                                    <label for="" class="col-sm-2 control-label text-center">Tại</label>
                                    <div class="col-sm-5 px-0">
                                        <input type="text" class="form-control" id="customerIdCardIssuePlace" name="customerIdCardIssuePlace" placeholder="N/A" maxlength="64">
                                        <div class="errors"></div>
                                    </div>
                                </div>
                                <label for="" class="col-sm-2 control-label">Cấp ngày</label>
                                <div class="col-sm-4">
                                    <div class="col-sm-5 px-0">
                                        <div class="input-group date">
                                            <input id="customerPartnerIdCardIssueDate" name="customerPartnerIdCardIssueDate" class="form-control" placeholder="N/A" maxlength="64">
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                        <div class="errors"></div>
                                    </div>
                                    <label for="" class="col-sm-2 control-label text-center">Tại</label>
                                    <div class="col-sm-5 px-0">
                                        <input type="text" class="form-control" id="customerPartnerIdCardIssuePlace" name="customerPartnerIdCardIssuePlace" placeholder="N/A">
                                        <div class="errors"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Hộ khẩu thường trú</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="customerPermanentAddress" name="customerPermanentAddress" placeholder="N/A" maxlength="128">
                                    <div class="errors"></div>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Số tài khoản</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="customerBankAccountNumber" name="customerBankAccountNumber" placeholder="N/A" maxlength="64">
                                    <div class="errors"></div>
                                </div>
                                <label for="" class="col-sm-2 control-label">Tại ngân hàng</label>
                                <div class="col-sm-4">
                                    <select id="customerBankIds" name="customerBankId">
                                        <option value="">N/A</option>
                                        <?php foreach ($banks as $bank) : ?>
                                            <option value="{{$bank->id}}">{{$bank->name.' ('.$bank->code.')'}}</option>
                                        <?php endforeach; ?>
                                    </select>
                                    <input type="hidden" id="preferBank" value="" />
                                    <div class="errors bank-errors"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Phone <span class="required">(*)</span></label>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <input id="customerPhone" name="customerPhone" type="text" class="form-control numvad" placeholder="N/A" />
                                        <span id="checkphone" class="input-group-addon"><i class="fa fa-search"></i></span>
                                    </div>
                                    <div class="errors"></div>
                                </div>
                                <label for="" class="col-sm-2 control-label">Email</label>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <input id="customerEmail" name="customerEmail" type="text" class="form-control" placeholder="N/A" />
                                        <span id="checkMail" class="input-group-addon"><i class="fa fa-envelope"></i></span>
                                    </div>
                                    <div class="errors"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Nguồn <span class="required">(*)</span></label>
                                <div class="col-sm-4">
                                    <select id="sourceId" name="sourceId" class="form-control">
                                        <option value="">N/A</option>
                                        <?php foreach ($sources as $source) : ?>
                                            <option value="{{$source->sourceId}}">{{$source->sourceName}}</option>
                                        <?php endforeach; ?>

                                    </select>
                                    <input type="hidden" id="sourceName" name="sourceName" value="" />
                                    <div class="errors"></div>
                                </div>
                                <?php
                                $tcs = get_transaction_centers_not_other();
                                ?>
                                <div class="col-sm-6">
                                    <select style="display: none" style="" id="sourceTCId" name="sourceTCId" class="form-control">
                                        <option value="">N/A</option>
                                        <?php foreach ($tcs as $tc) : ?>
                                            <option value="{{$tc->id}}">{{$tc->name}}</option>
                                        <?php endforeach; ?>
                                    </select>
                                    <input id="sourceOther" name="sourceOther" class="form-control" rows="4" placeholder="Nhập nguồn khác" style="display: none" />
                                </div>

                            </div>
                            @include('shared.chanelBlock')
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Gói dịch vụ đã sử dụng</label>
                                <div class="col-sm-4 px-0">
                                    <?php foreach ($servicePackages as $servicePackage) : ?>
                                        <div class="col-sm-4">
                                            <input type="checkbox" name="customerServicePackageIds[]" value="{{$servicePackage -> id }}" />
                                            <span class="text-muted text-uppercase">{{$servicePackage -> name }}</span>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        </div>
                        <div class="box-footer">
                            <button type="button" class="btn btn-success btn-check-customer hidden">Kiểm tra thông tin</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">NHU CẦU</h3>
            </div>
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Tỉnh / Thành
                        <span class="required">(*)</span></label>
                    <div class="col-sm-4">
                        <select id="cityId" name="cityId" class="form-control">
                            <option value="1">Hồ Chí Minh</option>
                        </select>
                        <div class="errors"></div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Hình thức GD
                        <span class="required">(*)</span></label>
                    <div class="col-sm-4">
                        <select id="listingTypeId" name="listingTypeId" class="form-control">
                            <option value="">N/A</option>
                            <option value=1>Mua</option>
                            <option value=2>Thuê</option>
                        </select>
                        <div class="errors"></div>
                    </div>
                    <label for="" class="col-sm-2 control-label">Nhóm BĐS<span class="required">(*)</span></label>
                    <div class="col-sm-4">
                        <select name="propertyTypeGroup" id="propertyTypeGroup" class="form-control" style="width: 100%;">
                            <option value="">N/A</option>
                        </select>
                        <div class="errors"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Loại BĐS <span class="required">(*)</span></label>
                    <div class="col-sm-4">
                        <select name="propertyTypeId" id="propertyTypeId" class="form-control" style="width: 100%;">
                            <option value="">N/A</option>
                        </select>
                        <div class="errors"></div>
                    </div>
                </div>

                <div class="form-group distward">
                    <label class="control-label col-xs-12 col-sm-2 col-md-2">Khu vực</label>
                    <div class="col-xs-12 col-sm-10 col-md-10">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="row form-group" style="">
                                    <label class="control-label col-xs-12 col-sm-12 col-md-2">Quận <span class="required">(*)</span></label>
                                    <div class="col-xs-12 col-sm-12 col-md-10">
                                        <select id="districtIds" name="districtIds[]" multiple="multiple">
                                            <?php foreach ($districts as $district) : ?>
                                                <option value="{{$district->districtId}}-{{$district->districtName}}">{{$district->districtName}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                        <input type="hidden" id="preferDistrict" name="preferDistrict" value="" />
                                        <div class="errors district-errors"></div>
                                    </div>
                                </div>
                                <div class="row form-group" style="">
                                    <label class="control-label col-xs-12 col-sm-12 col-md-2">Phường</label>
                                    <div class="col-xs-12 col-sm-12 col-md-10">
                                        <div id="wardGenerate" class="row">

                                        </div>
                                        <input type="hidden" id="preferWard" name="preferWard" value="" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Khoảng giá khách tìm kiếm
                        <span class="required">(*)</span></label>
                    <div class="col-sm-4">
                        <span id="price-span" class="price-box">-- Vui lòng chọn --</span>
                        <input id="initialBudgetPriceBox" data-id-to="finalBudget" data-id-from="initialBudget" data-id-unit="listingTypeId" data-unit-none="" data-unit-milion="2" data-id-price-span="price-span" name="initialBudget" type="hidden" class="form-control price-box" value="-" />
                        <input id="initialBudget" name="initialBudget" type="hidden" value="" />
                        <input id="finalBudget" name="finalBudget" type="hidden" value="" />
                    </div>
                    <label for="" class="col-sm-2 control-label">Ngân sách khách đang có
                        <span class="required">(*)</span></label>
                    <div class="col-sm-4">
                        <input id="initialBudgetFixed" name="initialBudgetFixed" type="text" class="form-control" placeholder="N/A" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Mục đích</label>
                    <div class="col-sm-10">
                        <input type="hidden" name="txtPurposeList" id="txtPurposeList" value="" />
                        <div class="border-padding-10">
                            <div class="" id="div-purpose"></div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Diện tích min
                        <span class="required">(*)</span></label>
                    <div class="col-sm-4">
                        <input id="minSize" name="minSize" type="text" class="form-control numvad auto-format-size" placeholder="N/A" />
                    </div>
                    <label for="" class="col-sm-2 control-label">Diện tích max
                        <span class="required hidden">(*)</span></label>
                    <div class="col-sm-4">
                        <input id="maxSize" name="maxSize" type="text" class="form-control numvad auto-format-size" placeholder="N/A" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Bed</label>
                    <div class="col-sm-4">
                        <input id="bedRooms" name="bedRooms" type="number" min="0" class="form-control" placeholder="N/A" />
                    </div>
                    <label for="" class="col-sm-2 control-label">Bath</label>
                    <div class="col-sm-4">
                        <input id="bathRooms" name="bathRooms" type="number" min="0" class="form-control" placeholder="N/A" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Ngày dự tính dọn vô</label>
                    <div class="col-sm-4">
                        <div class="input-group date">
                            <input id="moveInDate" name="moveInDate" class="form-control" placeholder="N/A">
                            <div class="input-group-addon">
                                <i class="fa fa-calendar"></i>
                            </div>
                        </div>
                        <div class="errors"></div>
                    </div>

                    <label for="" class="col-sm-2 control-label">Khả năng đáp ứng </label>
                    <div class="col-sm-4">
                        <input id="responsiveness" name="responsiveness" type="number" min="0" class="form-control" value="" placeholder="N/A" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Hướng</label>
                    <div class="col-sm-10">
                        <select id="directionIds" name="directionIds[]" multiple="multiple">
                            <?php foreach ($directions as $direction) : ?>
                                <option value="{{$direction->dId}}">{{$direction->directionName}}</option>
                            <?php endforeach; ?>
                        </select>
                        <div class="errors"></div>
                        <input type="hidden" id="preferDirection" name="preferDirection" value="" />
                    </div>
                </div>
                @include('shared.position-update')

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Năm xây dựng</label>
                    <div class="col-sm-4">
                        <input id="yearBuilt" name="yearBuilt" class="form-control" placeholder="N/A">
                        <div class="errors"></div>
                    </div>
                </div>
                <div class="form-group" id="display-amenities">
                    <label for="" class="col-sm-2 control-label">Tiện ích</label>
                    <div class="col-sm-10">
                        <a class="showAmenities" data-toggle="collapse" data-target="#amenities" style="cursor: pointer">Xem thêm</a>
                        <div id="amenities" class="collapse"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Lưu ý khác</label>
                    <div class="col-sm-10">
                        <textarea id="note" name="note" class="form-control note" rows="8"></textarea>
                    </div>
                </div>
            </div>

            <div class="btn-group-request" style="position:fixed;bottom:0px;right:0px;z-index: 1">
                <button type="button" id="createLead" class="btn btn-success createLead">Lưu</button>
                <button type="button" id="btnCancel" class="btn btn-warning margin">Hủy</button>
            </div>


        </div>

    </form>
</div>
<!-- modalMissingInfo -->
<div id="modalMissingInfo" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Thông tin bị thiếu.</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <div class="col-sm-12">
                        <textarea id="areaMissingInfo" name="areaMissingInfo" rows="6" class="form-control"></textarea>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button id="saveAndUpdate_step_2" type="button" class="btn btn-primary">Lưu Request và update sau</button>
                {{--<button type="button" class="btn btn-default" data-dismiss="modal">Lưu Request và update sau</button>--}}
            </div>
        </div>

    </div>
</div>
<!-- end modalMissingInfo -->
@include('request.modal-check-phone-result')
@include('request.modal-match-listings')
@include('shared.modal-deal-of-agent')
<button style="display:none" id="btn-agent-create"></button>
@include('shared.modal-create-agent')
@endsection
@extends('templates.amenities-item')
@section('page-js')
<script src="{{ loadAsset("/plugins/EasyAutocomplete-1.3.5/jquery.easy-autocomplete.min.js")}}"></script>
<script src="{{ loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{ loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{ loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{ loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{ loadAsset("/plugins/priceFormat/autoNumeric.js")}}"></script>
<script src="{{ loadAsset("/js/dashboard.js")}}"></script>
<script src="{{ loadAsset("/plugins/jquery-validation/dist/jquery.validate.js")}}"></script>
<script src="{{ loadAsset("/plugins/selectize.js/dist/js/standalone/selectize.min.js")}}"></script>
<script src="{{ loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{ loadAsset("/plugins/jquery-mask/jquery.mask.js")}}"></script>
<script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{ loadAsset("js/helper.js")}}"></script>
<script src="{{ loadAsset("/js/template7.min.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{ asset('/js/deal/commons.js')}}"></script>
<script type="text/javascript">
    var dataForRLDFuncs = {
        listingTypeId: 1,
        propertyTypeGroup: {
            id: null
        },
        propertyType: {
            propertyTypeID: null
        }
    };
</script>
<script src="{{ asset('/js/commons/deal/deal-functions.js')}}"></script>
<script type="text/javascript">
    $(document).ready(function() {
        DealFunctions.getPropertyTypeGroup(dataForRLDFuncs.listingTypeId)
        DealFunctions.getListPropertyTypes(dataForRLDFuncs.listingTypeId, dataForRLDFuncs.propertyTypeGroup.id)
    })
</script>
<script src="{{ asset('/js/commons/deal/match-lead-deal.js')}}"></script>
<script type="text/javascript" src="{{ asset("js/request/common.js")}}"></script>
<script type="text/javascript" src="{{ asset("js/request/create_logic_agents.js")}}"></script>
<script type="text/javascript" src="{{ asset("js/request/create.js")}}"></script>
<script type="text/javascript" src="{{ asset("js/common/purpose-multi-level.js")}}"></script>
<script type="text/javascript" src="{{ asset("js/commons/jquery.price-box.js")}}"></script>
@if($currentUser->departments[0]->departmentId == 14 || $currentUser->departments[0]->departmentId == 17)
<script src="{{ loadAsset("/js/pos/sa/SACreateRequest.js")}}"></script>
@endif
@stop
@section('page-css')
<link href="{{ loadAsset("/css/listing-create.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/plugins/selectize.js/dist/css/selectize.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/css/listing-create.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/plugins/EasyAutocomplete-1.3.5/easy-autocomplete.min.css")}}" rel="stylesheet" type="text/css" />
<style>
    .errors {
        color: #f00;
    }

    /*fix style easy-autocomplete*/
    .easy-autocomplete-container {
        top: 100%;
    }

    .easy-autocomplete {
        width: 100% !important
    }

    .px-0 {
        padding-left: 0;
        padding-right: 0;
    }

    .text-center {
        text-align: center !important;
    }
</style>
@stop