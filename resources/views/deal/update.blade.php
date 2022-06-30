@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class='page-request'>
    <form method="post" id="formCreate" class="form-horizontal">
        <div class="db-tm-item deal-tm-customer-info">
            <div class="row">
                @if(!empty($deal->agentInfo->agentId))
                <div class="col-md-12">
                    <div class="box box-primary">
                        <div class="box-body">
                            <label class="radio-inline">
                                <input type="radio" value="1" {{$deal->agentInfo->isBuyForCustomer == true || $deal->agentInfo->isBuyForCustomer === null ? "checked" : ""}} name="isBuyForCustomer">Mua cho khách hàng
                            </label>
                            <label class="radio-inline">
                                <input type="radio" value="0" {{$deal->agentInfo->isBuyForCustomer == false && $deal->agentInfo->isBuyForCustomer !== null ? "checked" : ""}} name="isBuyForCustomer">Mua cho chính mình
                            </label>
                        </div>
                    </div>
                </div>
                @endif
                <div class="col-md-12">
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">THÔNG TIN KHÁCH HÀNG</h3>
                        </div>
                        <input type="hidden" id="customerId" name="customerId" value="{{$deal->customers->customerId}}" />
                        <input type="hidden" id="dealId" name="dealId" value="{{$deal->dealId}}" />
                        <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
                        <div class="box-body">
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Campaign ID</label>
                                <div class="col-sm-4">
                                    <input type="text" disabled class="form-control" value="{{!empty($deal->campaignId) ? $deal->campaignId : ''}}" id="campaignId" name="campaignId" placeholder="N/A">
                                    <div class="errors"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Tên <span class="required">(*)</span></label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="customerName" name="customerName" placeholder="N/A" value="{{$deal->customers->name}}" />
                                    <div class="errors"></div>
                                </div>
                                <label for="" class="col-sm-2 control-label">Đối tượng <span class="required">(*)</span></label>
                                <div class="col-sm-4">
                                    <select id="subjectId" name="subjectId" class="form-control">
                                        <option value="">N/A</option>
                                        <?php foreach ($subjects as $subject) : ?>
                                            <option value="{{$subject->subjectId}}" {{$subject->subjectId==$deal->subjectId?"selected":""}}>{{$subject->subjectName}}</option>
                                        <?php endforeach; ?>
                                    </select>
                                    <input type="hidden" name="subjectName" id="subjectName" value="" />
                                    <div class="errors"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Phone <span class="required">(*)</span></label>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <input id="customerPhone" name="customerPhone" type="text" class="form-control hidden" placeholder="N/A" value="{{base64_encode($deal->customers->phone)}}" />

                                        <span class="customerPhones">
                                            <?php foreach ($deal->customers->phoneList as $phone) : ?>
                                                <span class="phone-item">xxxxxxxx{{substr($phone->phone, strlen($phone->phone)-2, 2 )}}, </span>
                                            <?php endforeach; ?>
                                        </span>
                                        <?php if (count($deal->customers->phoneList) < 2) : ?>
                                            <span id="addCustomerPhone" class=""><i class="fa fa-plus"></i></span>
                                        <?php endif; ?>
                                    </div>
                                    <div class="errors"></div>
                                </div>
                                <?php if (count($deal->customers->emailList) < 2) : ?>
                                    <label for="" class="col-sm-2 control-label">Email</label>
                                    <div class="col-sm-4">
                                        <div class="input-group">
                                            <input id="customerEmail" name="customerEmail" type="text" class="form-control hidden" placeholder="N/A" value="{{$deal->customers->email}}" />
                                            <span id="addCustomerEmail" class=""><i class="fa fa-plus"></i></span>
                                        </div>
                                        <div class="errors"></div>
                                    </div>
                                <?php endif; ?>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Nguồn <span class="required">(*)</span></label>
                                <div class="col-sm-4">
                                    <select id="sourceId" name="sourceId" class="form-control">
                                        <option value="">N/A</option>
                                        <?php foreach ($sources as $source) : ?>
                                            <option value="{{$source->sourceId}}" {{$source->sourceId==$deal->sourceId?"selected":""}}>{{$source->sourceName}}</option>
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
                <div class="form-group customerEvaluatedGroup" style="display:none">
                    <label for="" class="col-sm-2 control-label">Đánh giá khách hàng</label>
                    <div class="col-sm-4">
                        <label style="font-weight: normal" for=""><input type="checkbox" id="chkIsHot" name="chkIsHot" value="1" {{$deal->customerEvaluate->isHot ? 'checked' : ''}} /> Khách hàng tiềm năng </label>
                    </div>
                </div>
                <div class="form-group customerEvaluatedGroup" style="display:none">
                    <label for="" class="col-sm-2 control-label">Thời gian dự kiến chốt Deal <span class="required">(*)</span></label>
                    <input type="hidden" name="customerEvaluateDate" value="{{isset($deal->customerEvaluate->expectedClosingDate) ? $deal->customerEvaluate->expectedClosingDate : ''}}" id="customerEvaluateDate" />
                    <input type="hidden" name="customerEvaluateCode" value="{{isset($deal->customerEvaluate->optionCode) ? $deal->customerEvaluate->optionCode : ''}}" id="customerEvaluateCode" />
                    <input type="hidden" name="customerEvaluateDateReasons" value="{{isset($deal->customerEvaluate->comments) ? join(';', $deal->customerEvaluate->comments) : ''}}" id="customerEvaluateDateReasons" /> 
                    @if (isset($deal->customerEvaluate->expectedClosingDate))
                    <div class="col-sm-4">
                        <a style="text-decoration: underline;" href="javascript:void(0)" class="bpo-modal-change-time" id="current-evaluated">
                            <span id="current-evaluated-date">{{date('d/m/Y', intval($deal->customerEvaluate->expectedClosingDate)/1000)}}</span>
                            <i class="fa fa-edit"></i>
                        </a>
                    </div>
                    @else
                    <div class="col-sm-4">
                        <select name="customerEvaluateDateSelect" class="form-control" id="customerEvaluateDateSelect">
                            <option value="">---Chọn thời gian chốt Deal---</option>
                        </select>
                    </div>
                    <div class="col-sm-4">
                        <div class="input-group" style="display: none">
                            <input id="customerEvaluateDatePicker" name="customerEvaluateDatePicker" class="form-control" placeholder="N/A" />
                            <div class="input-group-addon">
                                <i class="fa fa-calendar"></i>
                            </div>
                        </div>
                    </div>
                    @endif
                    <div style="clear:both"></div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Tỉnh / Thành <span class="required">(*)</span></label>
                    <div class="col-sm-4">
                        <select id="cityId" name="cityId" class="form-control">
                            <option value="1">Hồ Chí Minh</option>
                        </select>
                        <div class="errors"></div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Hình thức GD <span class="required">(*)</span></label>
                    <div class="col-sm-2">
                        <select id="listingTypeId" name="listingTypeId" class="form-control">
                            <option value="">N/A</option>
                            <?php foreach ([1 => 'Mua', 2 => 'Thuê'] as $key => $value) : ?>
                                <option value={{$key}} {{$key==$deal->listingTypeId?"selected":""}}>{{$value}}</option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <label for="" class="col-sm-2 control-label">Thuộc nhóm BĐS <span class="required">(*)</span></label>
                    <div class="col-sm-2">
                        <select name="propertyTypeGroup" id="propertyTypeGroup" class="form-control" style="width: 100%;">
                            <option value="">N/A</option>
                        </select>
                    </div>
                    <label for="" class="col-sm-2 control-label">Loại BĐS <span class="required">(*)</span></label>
                    <div class="col-sm-2">
                        <select name="propertyTypeId" id="propertyTypeId" class="form-control" style="width: 100%;">
                            <option value="">N/A</option>
                        </select>
                    </div>
                    <div class="col-sm-push-8 col-sm-4 control-label hide" id="error-propertyTypeId-wrapper"></div>
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
                                            <?php foreach ($districts as $district) :
                                                $selected = '';
                                                if (in_array($district->districtId, $currentDistricts)) {
                                                    $selected = "selected";
                                                }
                                            ?>
                                                <option {{$selected}} value="{{$district->districtId}}-{{$district->districtName}}" }}>{{$district->districtName}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                        <input type="hidden" id="preferDistrict" name="preferDistrict" value="{{$isPreferedDistrict>0?$isPreferedDistrict:""}}" />
                                        <div class="errors district-errors"></div>
                                    </div>
                                </div>
                                <div class="row form-group" style="">
                                    <label class="control-label col-xs-12 col-sm-12 col-md-2">Phường</label>
                                    <div class="col-xs-12 col-sm-12 col-md-10">
                                        <div id="wardGenerate" class="row">
                                            {!! $wardsHtml !!}
                                        </div>
                                        <input type="hidden" id="preferWard" name="preferWard" value="{{$isPreferedWard>0?$isPreferedWard:""}}" />
                                        <!-- <div class="errors district-errors"></div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Mục đích</label>
                    <div class="col-sm-10">
                        <input type="hidden" name="txtPurposeList" id="txtPurposeList" value="" />
                        <div class="border-padding-10">
                            <div class="" id="div-purpose" data-ids="{{$purposeList}}"></div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Khoảng giá khách tìm kiếm
                        <span class="required">(*)</span>
                    </label>
                    <div class="col-sm-4">
                        <span id="price-span" class="price-box">-- Vui lòng chọn --</span>
                        <input data-from="{{$deal->initialBudget}}" data-to="{{!empty($deal->finalBudget)?$deal->finalBudget:''}}" id="initialBudgetPriceBox" data-id-to="finalBudget" data-id-from="initialBudget" data-id-unit="listingTypeId" data-unit-none="" data-unit-milion="2" data-id-price-span="price-span" name="initialBudget" type="hidden" class="form-control price-box" value="-" />
                        <input id="initialBudget" name="initialBudget" type="hidden" value="" />
                        <input id="finalBudget" name="finalBudget" type="hidden" value="" />
                    </div>
                    <label for="" class="col-sm-2 control-label">Ngân sách khách đang có <span class="required">(*)</span></label>
                    <div class="col-sm-4">
                        <input id="initialBudgetFixed" name="initialBudgetFixed" type="text" class="form-control" placeholder="N/A" value="{{!empty($deal->initialBudgetFixed)?$deal->initialBudgetFixed:""}}" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Diện tích min <span class="required">(*)</span></label>
                    <div class="col-sm-4">
                        <input id="minSize" name="minSize" type="text" class="form-control numvad auto-format-size" placeholder="N/A" value="{{!empty($deal->minSize)?$deal->minSize:""}}" />
                    </div>
                    <label for="" class="col-sm-2 control-label">Diện tích max <span class="required hidden">(*)</span></label>
                    <div class="col-sm-4">
                        <input id="maxSize" name="maxSize" type="text" class="form-control numvad auto-format-size" placeholder="N/A" value="{{!empty($deal->maxSize)?$deal->maxSize:""}}" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Bed</label>
                    <div class="col-sm-4">
                        <input id="bedRooms" name="bedRooms" type="number" min="0" class="form-control" placeholder="N/A" value="{{!empty($deal->bedRooms)?$deal->bedRooms:""}}" />
                    </div>
                    <label for="" class="col-sm-2 control-label">Bath</label>
                    <div class="col-sm-4">
                        <input id="bathRooms" name="bathRooms" type="number" min="0" class="form-control" placeholder="N/A" value="{{!empty($deal->bathRooms)?$deal->bathRooms:""}}" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Ngày dự tính dọn vô</label>
                    <div class="col-sm-4">
                        <div class="input-group date">
                            <input id="moveInDate" name="moveInDate" class="form-control" placeholder="N/A" value="{{!empty($deal->moveInDate)?date('m/d/Y',$deal->moveInDate/1000):NULL}}" />
                            <div class="input-group-addon">
                                <i class="fa fa-calendar"></i>
                            </div>
                        </div>
                        <div class="errors"></div>
                    </div>

                    <label for="" class="col-sm-2 control-label">Khả năng đáp ứng </label>
                    <div class="col-sm-4">
                        <input id="responsiveness" name="responsiveness" type="number" class="form-control" min="0" value="{{!empty($deal->responsiveness)?$deal->responsiveness:""}}" placeholder="N/A" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Hướng</label>
                    <div class="col-sm-10">
                        <select id="directionIds" name="directionIds[]" multiple="multiple">
                            <?php foreach ($directions as $direction) : ?>
                                <option value="{{$direction->dId}}" {{in_array($direction->dId, $currentDirections)?"selected":""}}>{{$direction->directionName}}</option>
                            <?php endforeach; ?>
                        </select>
                        <div class="errors"></div>
                        <input type="hidden" id="preferDirection" name="preferDirection" value="{{$isPreferedDirection}}" />
                    </div>
                </div>
                @include('shared.position-update',['lead'=>$deal])
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Năm xây dựng</label>
                    <div class="col-sm-4">
                        <input id="yearBuilt" name="yearBuilt" class="form-control" value="{{$deal->yearBuilt}}" placeholder="N/A">
                        <div class="errors"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Tiện ích</label>
                    <div class="col-sm-10">
                        <a class="showAmenities" data-toggle="collapse" data-target="#amenities" style="cursor: pointer">Xem thêm</a>
                        <div id="amenities" class="collapse">
                            <div class="amenity-content">
                                <?php foreach ($amenities as $amenity) : ?>
                                    <div class="col-md-3 utilitie-item-content">
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" data="0" class="utilitie" name="amenityId[]" datatext="{{$amenity->name}}" value="{{$amenity->id}}" <?php echo in_array($amenity->id, $currentAmenities) ? "checked='checked'" : ""; ?> />
                                                {{$amenity->name}}
                                            </label>
                                        </div>
                                        <div class="amenityc-child-content" data="3">
                                            <?php foreach ($amenity->childs as $amenityChild) : ?>
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" data="0" class="utilitie" name="amenityId[]" datatext="{{$amenityChild->name}}" value="{{$amenityChild->id}}" <?php echo in_array($amenityChild->id, $currentAmenities) ? "checked='checked'" : ""; ?> />
                                                        {{$amenityChild->name}}
                                                    </label>
                                                </div>
                                            <?php endforeach; ?>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Lưu ý khác</label>
                    <div class="col-sm-10">
                        <textarea id="note" name="note" class="form-control note" rows="8">{{$deal->note}}</textarea>
                    </div>
                </div>
            </div>

            <div class="btn-group-request" style="position:fixed;bottom:0px;right:0px;z-index: 100000000">
                <button type="button" id="btnSaveDeal" class="btn btn-success">Lưu</button>
                <a href="/deal/detail/{{$deal->dealId}}" id="btnCancel" class="btn btn-warning margin">Trở về</a>
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
@include('shared.modal-meeting')
@include('deal.modal-add-customer-phone')
@include('deal.modal-changetime')
@endsection



@extends('templates.amenities-item')
@section('page-js')
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/priceFormat/autoNumeric.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=places&language=vi-VN&key=AIzaSyDpdmD6vwtMod5wbhS5yYGTD05dsn79UaU"></script>
<script src="{{loadAsset("/js/gmap3.js")}}"></script>

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>

<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-validation/dist/jquery.validate.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-mask/jquery.mask.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/selectize.js/dist/js/standalone/selectize.min.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.js")}}"></script>
<script src="{{loadAsset("/js/template7.min.js")}}"></script>
<script src="{{loadAsset('/js/deal/commons.js')}}"></script>
<script type="text/javascript" src="{{ loadAsset("js/commons/jquery.price-box.js")}}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js"></script>
<script type="text/javascript">
    var deal = {
        dealId: "{{$deal->dealId}}",
        timeInactive: "{{$deal->timeInactive}}",
    };
    <?php
    // hidden phone number
    $customers = !empty($deal->customers) ? $deal->customers : null;
    if (!empty($customers)) {
        $customers->phone = !empty($customers->phone) ? base64_encode($customers->phone) : null;
        if (!empty($customers->phoneList)) {
            foreach ($customers->phoneList as $index => $phone) {
                $customers->phoneList[$index]->phone = !empty($phone->phone) ? base64_encode($phone->phone) : null;
            }
        }
        $deal->customers = $customers;
    }
    ?>
    var dataForRLDFuncs = <?php echo json_encode($deal); ?>;
    // dataForRLDFuncs = JSON.parse(dataForRLDFuncs);
</script>
<script src="{{loadAsset('/js/commons/deal/deal-functions.js')}}"></script>
<script src="{{loadAsset('/js/deal/update.js')}}"></script>
<script type="text/javascript">
    $(document).ready(function() {
        $('.wardIds').each(function() {
            var idWard = '#' + $(this).attr('id');
            DealFunctions.WardIdDom(idWard);
        })
    })
</script>
<script type="text/javascript" src="{{ loadAsset("js/common/purpose-multi-level.js")}}"></script>

@stop
@section('page-css')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.css">
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.theme.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/selectize.js/dist/css/selectize.css")}}" rel="stylesheet" type="text/css" />
<style>
    .errors {
        color: #f00;
    }

    .datepicker {
        z-index: 100000 !important;
    }

    .pac-container {
        z-index: 100000 !important;
    }

    #image-slider {
        z-index: 999999999;
    }

    .district-wrapper .wards {
        margin-left: 16px;
        border-right: 2px;
    }




    #modalSearchListingsResultOverview {
        padding-right: 0px !important;
    }

    #modalSearchListingsResultOverview .modal-dialog {
        width: 100% !important;
        margin: 0 auto;
    }
</style>
@stop