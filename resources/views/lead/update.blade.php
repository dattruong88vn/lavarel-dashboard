@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class='page-request'>
    <form method="post" id="formCreate" class="form-horizontal">
        <div class="db-tm-item deal-tm-customer-info">
            <div class="row">
                @if(!empty($lead->agentInfo->agentId))
                <div class="col-md-12">
                    <div class="box box-primary">
                        <div class="box-body">
                            <label class="radio-inline">
                                <input type="radio" value="1" {{$lead->agentInfo->isBuyForCustomer == true || $lead->agentInfo->isBuyForCustomer === null ? "checked" : ""}} name="isBuyForCustomer">Mua cho khách hàng
                            </label>
                            <label class="radio-inline">
                                <input type="radio" value="0" {{$lead->agentInfo->isBuyForCustomer == false && $lead->agentInfo->isBuyForCustomer !== null ? "checked" : ""}} name="isBuyForCustomer">Mua cho chính mình
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
                        <input type="hidden" id="customerId" name="customerId" value="{{$lead->customers->customerId}}" />
                        <input type="hidden" id="leadId" name="leadId" value="{{$lead->leadId}}" />
                        <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
                        <div class="box-body">
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Campaign ID</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" value="{{!empty($lead->campaignId) ? $lead->campaignId : ''}}" id="campaignId" name="campaignId" placeholder="N/A">
                                    <div class="errors"></div>
                                </div>
                                <label for="" class="col-sm-2 control-label">Đối tượng <span class="required">(*)</span></label>
                                <div class="col-sm-4">
                                    <select id="subjectId" name="subjectId" class="form-control">
                                        <option value="">N/A</option>
                                        <?php foreach ($subjects as $subject) : ?>
                                            <option value="{{$subject->subjectId}}" {{$subject->subjectId==$lead->subjectId?"selected":""}}>{{$subject->subjectName}}</option>
                                        <?php endforeach; ?>
                                    </select>
                                    <input type="hidden" name="subjectName" id="subjectName" value="" />
                                    <div class="errors"></div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Tên <span class="required">(*)</span></label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="customerName" name="customerName" placeholder="N/A" value="{{$lead->customers->name}}" />
                                    <div class="errors"></div>
                                </div>
                                <label for="" class="col-sm-2 control-label">Thông tin Vợ/Chồng </label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="customerPartnerName" name="customerPartnerName" placeholder="N/A" maxlength="64" value="{{$lead->customerPartnerName}}">
                                    <div class="errors"></div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">CMND/CCCD</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="customerIdCard" name="customerIdCard" placeholder="N/A" maxlength="64" value="{{$lead->customerIdCard}}">
                                    <div class="errors"></div>
                                </div>
                                <label for="" class="col-sm-2 control-label">CMND/CCCD</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="customerPartnerIdCard" name="customerPartnerIdCard" placeholder="N/A" maxlength="64" value="{{$lead->customerPartnerIdCard}}">
                                    <div class="errors"></div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Cấp ngày</label>
                                <div class="col-sm-4">
                                    <div class="col-sm-5 px-0">
                                        <div class="input-group date">
                                            <input id="customerIdCardIssueDate" name="customerIdCardIssueDate" class="form-control" placeholder="N/A" value="{{!empty($lead->customerIdCardIssueDate)?date('m/d/Y',$lead->customerIdCardIssueDate/1000):NULL}}"">
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                        <div class="errors"></div>
                                    </div>
                                    <label for="" class="col-sm-2 control-label text-center">Tại</label>
                                    <div class="col-sm-5 px-0">
                                        <input type="text" class="form-control" id="customerIdCardIssuePlace" name="customerIdCardIssuePlace" placeholder="N/A" maxlength="64" value="{{$lead->customerIdCardIssuePlace}}">
                                        <div class="errors"></div>
                                    </div>
                                </div>
                                <label for="" class="col-sm-2 control-label">Cấp ngày</label>
                                <div class="col-sm-4">
                                    <div class="col-sm-5 px-0">
                                        <div class="input-group date">
                                            <input id="customerPartnerIdCardIssueDate" name="customerPartnerIdCardIssueDate" class="form-control" placeholder="N/A" maxlength="64" value="{{!empty($lead->customerPartnerIdCardIssueDate)?date('m/d/Y',$lead->customerPartnerIdCardIssueDate/1000):NULL}}">
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                        <div class="errors"></div>
                                    </div>
                                    <label for="" class="col-sm-2 control-label text-center">Tại</label>
                                    <div class="col-sm-5 px-0">
                                        <input type="text" class="form-control" id="customerPartnerIdCardIssuePlace" name="customerPartnerIdCardIssuePlace" placeholder="N/A" value="{{$lead->customerPartnerIdCardIssuePlace}}">
                                        <div class="errors"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Hộ khẩu thường trú</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="customerPermanentAddress" name="customerPermanentAddress" placeholder="N/A" maxlength="128" value="{{$lead->customerPermanentAddress}}">
                                    <div class="errors"></div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Số tài khoản</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="customerBankAccountNumber" name="customerBankAccountNumber" placeholder="N/A" maxlength="64" value="{{$lead->customerBankAccountNumber}}">
                                    <div class="errors"></div>
                                </div>
                                <label for="" class="col-sm-2 control-label text-center">Tại ngân hàng</label>
                                <div class="col-sm-4">
                                    <select id="customerBankIds" name="customerBankId">
                                        <option value="">N/A</option>
                                        <?php foreach ($banks as $bank) :?>
                                            <option value="{{$bank->id}}" {{$bank->id==$lead->customerBankId?"selected":""}}>{{$bank->name.' ('.$bank->code.')'}}</option>
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
                                        <input id="customerPhone" name="customerPhone" type="text" class="form-control hidden" placeholder="N/A" value="{{base64_encode($lead->customers->phone)}}" />
                                        <span class="customerPhones">
                                            <?php foreach ($lead->customers->phoneList as $phone) : ?>
                                                <span class="phone-item">xxxxxxxx{{substr($phone->phone, strlen($phone->phone)-2, 2 )}}, </span>
                                            <?php endforeach; ?>
                                        </span>
                                        <?php if (count($lead->customers->phoneList) < 2) : ?>
                                            <span id="addCustomerPhone" class=""><i class="fa fa-plus"></i></span>
                                        <?php endif; ?>
                                    </div>
                                    <div class="errors"></div>
                                </div>

                                <?php if (count($lead->customers->emailList) < 2) : ?>
                                    <label for="" class="col-sm-2 control-label">Email</label>
                                    <div class="col-sm-4">
                                        <div class="input-group">
                                            <input id="customerEmail" name="customerEmail" type="text" class="form-control hidden" placeholder="N/A" value="{{$lead->customers->email}}" />
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
                                            <option value="{{$source->sourceId}}" {{$source->sourceId==$lead->sourceId?"selected":""}}>{{$source->sourceName}}</option>
                                        <?php endforeach; ?>

                                    </select>
                                    <!-- <textarea id="sourceOther" name="sourceOther" class="form-control" rows="4" placeholder="Nhập nguồn khác" style="display: none"></textarea> -->
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
                                        <input type="checkbox" name="customerServicePackageIds[]" value="{{$servicePackage -> id }}"  {{ in_array($servicePackage -> id, $lead -> customerServicePackageIds) ? "checked" : ""}} />
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
                                <option value={{$key}} {{$key==$lead->listingTypeId?"selected":""}}>{{$value}}</option>
                            <?php endforeach; ?>
                        </select>
                        <div class="errors"></div>
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
                        <div class="errors"></div>
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
                        <input data-from="{{$lead->initialBudget}}" data-to="{{!empty($lead->finalBudget)?$lead->finalBudget:''}}" id="initialBudgetPriceBox" data-id-to="finalBudget" data-id-from="initialBudget" data-id-unit="listingTypeId" data-unit-none="" data-unit-milion="2" data-id-price-span="price-span" name="initialBudget" type="hidden" class="form-control price-box" value="-" />
                        <input id="initialBudget" name="initialBudget" type="hidden" value="" />
                        <input id="finalBudget" name="finalBudget" type="hidden" value="" />
                    </div>
                    <label for="" class="col-sm-2 control-label">Ngân sách khách đang có <span class="required">(*)</span></label>
                    <div class="col-sm-4">
                        <input id="initialBudgetFixed" name="initialBudgetFixed" type="text" class="form-control" placeholder="N/A" value="{{!empty($lead->initialBudgetFixed)?$lead->initialBudgetFixed:""}}" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Diện tích min <span class="required">(*)</span></label>
                    <div class="col-sm-4">
                        <input id="minSize" name="minSize" type="text" class="form-control numvad auto-format-size" placeholder="N/A" value="{{!empty($lead->minSize)?$lead->minSize:""}}" />
                    </div>
                    <label for="" class="col-sm-2 control-label">Diện tích max <span class="required hidden">(*)</span></label>
                    <div class="col-sm-4">
                        <input id="maxSize" name="maxSize" type="text" class="form-control numvad auto-format-size" placeholder="N/A" value="{{!empty($lead->maxSize)?$lead->maxSize:""}}" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Bed</label>
                    <div class="col-sm-4">
                        <input id="bedRooms" name="bedRooms" type="number" min="0" class="form-control" placeholder="N/A" value="{{!empty($lead->bedRooms)?$lead->bedRooms:""}}" />
                    </div>
                    <label for="" class="col-sm-2 control-label">Bath</label>
                    <div class="col-sm-4">
                        <input id="bathRooms" name="bathRooms" type="number" min="0" class="form-control" placeholder="N/A" value="{{!empty($lead->bathRooms)?$lead->bathRooms:""}}" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Ngày dự tính dọn vô</label>
                    <div class="col-sm-4">
                        <div class="input-group date">
                            <input id="moveInDate" name="moveInDate" class="form-control" placeholder="N/A" value="{{!empty($lead->moveInDate)?date('m/d/Y',$lead->moveInDate/1000):NULL}}" />
                            <div class="input-group-addon">
                                <i class="fa fa-calendar"></i>
                            </div>
                        </div>
                        <div class="errors"></div>
                    </div>

                    <label for="" class="col-sm-2 control-label">Khả năng đáp ứng </label>
                    <div class="col-sm-4">
                        <input id="responsiveness" name="responsiveness" type="number" min="0" class="form-control" value="{{!empty($lead->responsiveness)?$lead->responsiveness:""}}" placeholder="N/A" />
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

                @include('shared.position-update')
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">Năm xây dựng</label>
                    <div class="col-sm-4">
                        <input id="yearBuilt" name="yearBuilt" class="form-control" value="{{$lead->yearBuilt}}" placeholder="N/A">
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
                        <textarea id="note" name="note" class="form-control note" rows="8">{{$lead->note}}</textarea>
                    </div>
                </div>
            </div>

            <div class="btn-group-request" style="position:fixed;bottom:0px;right:0px;z-index: 100000000">
                <button type="button" id="btnSaveLead" class="btn btn-success">Lưu</button>
                <button type="button" id="btnCancel" class="btn btn-warning margin">Trở về</button>
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
<script src="{{loadAsset("js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-mask/jquery.mask.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/selectize.js/dist/js/standalone/selectize.min.js")}}"></script>
<script src="{{loadAsset("/js/template7.min.js")}}"></script>
<script src="{{loadAsset('/js/deal/commons.js')}}"></script>
<script type="text/javascript" src="{{ loadAsset("js/commons/jquery.price-box.js")}}"></script>
<script type="text/javascript" src="/js/intercom.js"></script>
<script>
    function confirmMeeting() {
        if (typeof lead.requiredAction !== 'undefined' && lead.requiredAction != "") {
            var optionString = '@foreach($meetingReason as $reason) "<option value=\'{{$reason->id}}\'>{{$reason->name}}</option>" @endforeach';
            $.confirm({
                title: 'Không tạo meeting!',
                content: '' +
                    '<form action="/lead/meeting-not-created" method="post" id="meeting-not-created">' +
                    '<input type="hidden" name="_token" value="{{ csrf_token() }}">' +
                    '<div class="form-group">' +
                    '<input type="hidden" value="' + lead.leadId + '"  name="leadId" class="leadId" />' +
                    '<label>Chọn lý do</label>' +
                    '<select class="form-control reasonId" name="reasonId"><option value="">-Chọn lý do-</option>' + optionString + '</select>' +
                    '<label>Ghi chú</label>' +
                    '<textarea name="note" class="form-control note"></textarea>' +
                    '</div>' +
                    '</form>',
                buttons: {
                    formSubmit: {
                        text: 'Gửi',
                        btnClass: 'btn-blue',
                        action: function() {
                            var name = this.$content.find('.reasonId').val();
                            if (!name) {
                                $.alert('Vui lòng chọn 1 lý do');
                                return false;
                            }
                            this.$content.find('form')[0].submit();
                            //                                            $.alert('Your name is ' + name);
                            //                                            alert($('form#meeting-not-created').attr('action'));
                        }
                    }
                },
                onContentReady: function() {
                    // bind to events
                    var jc = this;
                    this.$content.find('form').on('submit', function(e) {
                        // if the user submits the form by pressing enter in the field.
                        e.preventDefault();
                        jc.$$formSubmit.trigger('click'); // reference the button and click it
                    });
                }
            });
        } else {
            $('#modalCreateMeeting').modal('hide');
        }
    }
    $(document).ready(function() {
        @if(isset($lead->requiredAction) && $lead->requiredAction == 'question-form')

        openModalQuestion('{{$lead->leadId}}', '1', 'auto', null, false)
        // hidePropzyLoading();
        // $.notify("Bảng đánh giá khách hàng đang được tải lên ...", "info");

        @elseif(isset($lead->requiredAction) && $lead->requiredAction == 'create-meeting')

        triggerSendToCrm();

        @endif
    })
</script>
<script type="text/javascript">
    var intercom = Intercom.getInstance();

    intercom.on('notice', function(data) {
        console.log(data.message);
    });
    JModalConfirmMeetingRequest.show_hide_button_group();
    var leadId = "{{$lead ->leadId}}";
    var dealId = <?php echo $lead->dealId ? $lead->dealId : "null"; ?>;
    var currentAssignTo = "{{$lead->assignedTo}}";
    var isBroadcast = false;
    var level = 2;
    var firstRun = true;
    <?php
    // hidden phone number
    $customers = !empty($lead->customers) ? $lead->customers : null;
    if (!empty($customers)) {
        $customers->phone = !empty($customers->phone) ? base64_encode($customers->phone) : null;
        if (!empty($customers->phoneList)) {
            foreach ($customers->phoneList as $index => $phone) {
                $customers->phoneList[$index]->phone = !empty($phone->phone) ? base64_encode($phone->phone) : null;
            }
        }
        $lead->customers = $customers;
    }
    ?>
    var lead = <?php echo json_encode($lead); ?>;
    var dataForRLDFuncs = <?php echo json_encode($lead) ?>;
    // dataForRLDFuncs = JSON.parse(dataForRLDFuncs);
    var customerReviewData = <?php echo json_encode($lead->customerReview); ?>;
    var loanAdviceData = <?php echo json_encode($lead->bankLoanAdvice); ?>;
    var noListingEmailTitle = "<?php echo "Propzy thông báo kết quả tìm kiếm " . $lead->listingType->typeName . " " . $lead->propertyType->typeName; ?>";
    <?php if ($currentGroup['departmentId'] == 12) : ?>
        $(".content-wrapper button").hide();
        $(".content-wrapper .btn").hide();
        $(".modal .btn").show();
        $("#btnReportMeetingToTm").show();
        $("#btnGenerateDeal").show();
        $("#btnRepostCustomerNotArrive").show();
        $("#btnAddCart").show();
    <?php endif; ?>
    <?php if ($currentGroup['departmentId'] == 5 && $lead->meeting && $lead->meeting->isGenerated) : ?>
        $(".content-wrapper .btn").hide();
        $("#btnShowMeeting").show();
    <?php endif; ?>

    <?php if ($currentGroup['departmentId'] == 3 && $lead->assignedTo) : ?>
        $(".content-wrapper .btn").hide();
    <?php endif; ?>
    $(document).ready(function() {
        $(".btnSaveNote").show();
        var requestUpdate = new RequestUpdate(null, leadId);
        requestUpdate.init();
        $('.wardIds').each(function() {
            var idWard = '#' + $(this).attr('id');
            DealFunctions.WardIdDom(idWard);
        })
    });
    $("#btnSaveLead").show();
    $("#btnSearchListing").show();
    $("#btnDoSearchListing").show();
    $("#btnDoResetSearchListing").show();
    $(".btnFilterListing").show();
    $("button.close").show();
    $("#btnCancel").show();
    var showSearchResultOverview = false;
</script>
<script src="{{loadAsset('/js/commons/deal/deal-functions.js')}}"></script>
<script src="{{loadAsset('/js/lead/update.js')}}"></script>
<script src="{{loadAsset('/js/deal/search-listing.js')}}"></script>
<script type="text/javascript" src="/js/lead/scripts.js"></script>
<script type="text/javascript" src="{{ loadAsset("js/common/purpose-multi-level.js")}}"></script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.theme.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/selectize.js/dist/css/selectize.css")}}" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="{{loadAsset("/css/lead/style.css")}}">
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

    .text-center {
        text-align: center;
    }

    .px-0 {
        padding-left: 0;
        padding-right: 0;
    }
</style>
@stop