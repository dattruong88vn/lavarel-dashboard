@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<?php $csrf_token = csrf_token() ?>
<div>
    @include('deal.header-nav')
</div>

<form id="dealInformation" class="form-horizontal">
    <div class="db-tm-item deal-tm-customer-info deal-info">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">KHÁCH HÀNG</h3>
                    </div>
                    <input type="hidden" id="customerId" name="customerId" value="{{$request->customerId}}" />
                    <div class="box-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Tên KH *</label>
                                    <div class="col-sm-12">
                                        <input type="text" class="form-control" id="customerName" name="customerName" value="{{isset($request->customers)?$request->customers->name:""}}" placeholder="N/A" />
                                        <div class="errors"></div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Phone</label>
                                    <div class="col-sm-12">
                                        <div>
                                            <input id="customerPhone" name="customerPhone" type="number" class="form-control hidden" value="{{isset($request->customers)?$request->customers->phone:""}}" placeholder="N/A" min="1" />
                                            <div class="errors"></div>
                                        </div>
                                        <div class="m-t-7">
                                            <button class="btn btn-success makeCall">Gọi</button>
                                            <button class="btn btn-success makeCallReminder">Tạo reminder</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Email</label>
                                    <div class="col-sm-12">
                                        <div>
                                            <input type="email" name="customerEmail" id="customerEmail" class="form-control"  value="{{isset($request->customers)?$request->customers->email:""}}" placeholder="N/A" />                                            
                                            <div class="errors"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Nguồn *</label>
                                    <div class="col-sm-12">
                                        <select id="sourceId" name="sourceId" class="form-control">
                                            <?php foreach ($sources as $source): ?>
                                                <option value="{{$source->sourceId}}" <?php echo $source->sourceId == $request->sourceId ? "selected='selected'" : ""; ?> >{{$source->sourceName}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                        <textarea id="sourceOther" name="sourceOther" class="form-control" rows="4" placeholder="Nhập nguồn khác" style="display: none">{{$request->sourceOther}}</textarea>
                                        <input type="hidden" id="sourceName" name="sourceName" value="" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <!-- <label class="col-sm-7 control-label">Do môi giới nào giới thiệu? </label>
                                <label class="col-sm-5 control-label not-bold">{{$deal->agentName?"":$deal->agentName}}<br />{{$deal->agentPhone?"":$deal->agentPhone}}</label> -->
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Đối tượng *</label>
                                    <div class="col-sm-12">
                                        <select id="subjectId" name="subjectId" class="form-control">
                                            <?php foreach ($subjects as $subject): ?>
                                                <option value="{{$subject->subjectId}}" <?php echo $subject->subjectId == $request->subjectId ? "selected='selected'" : ""; ?>  >{{$subject->subjectName}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                        <input type="hidden" name="subjectName" id="subjectName" value="" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <input type="hidden" name="dealId" id="dealId" value="{{$deal->dealId}}" />
    <div class="db-tm-item deal-tm-customer-need">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">GIAO DỊCH</h3>
                <label class="control-label hidden"><input type="checkbox" id="isSpecialDeal" <?php echo!empty($deal->meetingId) ? "checked" : ""; ?> /> Special Deal</label>
            </div>  
            <div class="box-body">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Hình thức giao dịch *</label>
                                    <div class="col-sm-12">
                                        <?php
                                        $listingTypes = array(
                                            1 => 'Mua',
                                            2 => 'Thuê'
                                        );
                                        ?>
                                        <select id="listingTypeId_bk" name="listingTypeId" class="form-control" disabled="disabled">
                                            <?php foreach ($listingTypes as $key => $value): ?>
                                                <option value={{$key}} <?php echo $key == $request->listingTypeId ? "selected='selected'" : ""; ?> >{{$value}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                        <input type="hidden" name="listingTypeId" value="{{$request->listingTypeId}}" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">                            
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Loại bất động sản</label>
                                    <div class="col-sm-12">
                                        <select name="propertyTypeId_bk" id="propertyTypeId" class="form-control" style="width: 100%;" disabled="disabled">
                                            <?php foreach ($propertyTypes as $propertyType): ?>
                                                <option value="{{$propertyType->propertyTypeID}}" <?php echo $propertyType->propertyTypeID == $request->propertyTypeId ? "selected='selected'" : ""; ?> >{{$propertyType->typeName}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                        <input type="hidden" name="propertyTypeId" value="{{$request->propertyTypeId}}" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Ngân sách ban đầu (dự trù)</label>
                                    <div class="col-sm-12">
                                        <input id="initialBudget" name="initialBudget" type="text" class="form-control" value="{{number_format($request->initialBudget,0,'.','')}}" placeholder="N/A" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12 control-label">&nbsp;</label>
                                    <label for="" class="col-sm-2 control-label">ĐẾN</label>
                                    <div class="col-sm-10">
                                        <input id="finalBudget" name="finalBudget" type="text" class="form-control" value="{{number_format($request->finalBudget,0,'.','')}}" placeholder="N/A"  />
                                        <div class="errors"></div>
                                    </div>
                                    <div class="col-sm-2 hidden" style="margin:0px; padding: 0px;">
                                        <?php
                                        $currencies = array(
                                            "VND" => "VND",
                                            "USD" => "USD"
                                        );
                                        ?>
                                        <select id="currency" name="currency" class="form-control" >
                                            <?php foreach ($currencies as $key => $value): ?>
                                                <option value="{{$key}}" <?php echo $key == $request->currency ? "selected='selected'" : ""; ?> >{{$value}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">




                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Ngân sách ban đầu (Fixed)</label>
                                    <div class="col-sm-12">
                                        <input type="text" id="initialBudgetFixed" name="initialBudgetFixed" value="{{number_format($request->initialBudgetFixed)}}" class="form-control" />
                                        <div class="errors initialbudgetfixed-errors"></div>
                                    </div>

                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Ngân sách final (Fixed)</label>
                                    <div class="col-sm-12">
                                        <input type="text" id="dealFinalBudget" name="dealFinalBudget" value="{{!empty($deal->finalBudget)?number_format($deal->finalBudget):""}}" class="form-control" />
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div class="row" >
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Diện tích:</label>
                                    <div class="col-sm-5">
                                        <input id="minSize" name="minSize" type="number" class="form-control" placeholder="m2" value="{{$request->minSize}}" placeholder="N/A" />
                                        <div class="errors"></div>
                                    </div>
                                    <label for="" class="col-sm-2 control-label">Đến</label>
                                    <div class="col-sm-5">
                                        <input id="maxSize" name="maxSize" type="number" class="form-control" placeholder="m2" value="{{$request->maxSize}}" placeholder="N/A" />
                                        <div class="errors"></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Ngày dự tính dọn vào *</label>
                                    <div class="col-sm-12">
                                        <div class="input-group date">
                                            <?php
                                            if ($request->moveInDate) {
                                                $request->moveInDate = date('m/d/Y', $request->moveInDate / 1000);
                                            } else {
                                                $request->moveInDate = NULL;
                                            }
                                            ?>
                                            <input id="moveInDate" name="moveInDate" class="form-control" value="{{$request->moveInDate}}" placeholder="N/A" />
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                        <div class="errors"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group row">
                                    <div class="col-sm-6">
                                        <label for="" >Bed</label>
                                        <div >
                                            <input id="bedRooms" name="bedRooms" type="number" class="form-control" value="{{$request->bedRooms}}" placeholder="N/A"  />
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <label for="" >Bath</label>
                                        <div>
                                            <input id="bathRooms" name="bathRooms" type="number" class="form-control" value="{{$request->bathRooms}}" placeholder="N/A"   />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Khả năng đáp ứng thị trường (%)</label>
                                    <div class="col-sm-12">
                                        <input id="responsiveness" name="responsiveness" type="number" class="form-control" value="{{$deal->responsiveness}}" placeholder="N/A" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Phân loại:</label>
                                    <div class="col-sm-12">
                                        <select id="typeId" name="typeId" class="form-control">
                                            <?php foreach ($dealTypes as $dealType): ?>
                                                <option value="{{$dealType->typeId}}"  {{$dealType->typeId==$deal->typeId?"selected='selected'":""}}>{{$dealType->typeName}}</option>
                                            <?php endforeach; ?>
                                        </select>                                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group row">
                            <label for="" class="col-sm-12">Quận (*)</label>
                            <div class="col-sm-12 errors district-errors"></div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <?php foreach ($districts as $district): ?>
                                        <div class="col-sm-6" >
                                            <label>
                                                <input class="districts" type="checkbox" name="districtId[]" value="{{$district->districtId}}" <?php echo in_array($district->districtId, $currentDistricts) ? "checked='checked'" : ""; ?>>
                                                {{$district->districtName}}
                                            </label>
                                            <span>
                                                <input type="radio" name="isPrefered" class="isPrefered" value="{{$district->districtId}}" <?php echo $district->districtId == $isPreferedDistrict ? "checked='checked'" : ""; ?> >Prefered
                                            </span>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="">
                    <div class="form-group">
                        <label for="" class="col-sm-2 control-label">Hướng:</label>
                        <div class="col-sm-10">
                            <?php foreach ($directions as $direction): ?>
                                <div class="checkbox col-sm-3" >
                                    <label class="no-bold"><input type="checkbox" value="{{$direction->dId}}" name="directions[]" class="directions" <?php echo in_array($direction->dId, $currentDirections) ? "checked='checked'" : "" ?> /> {{$direction->directionName}}</label>
                                    <label><input type="radio" name="isPreferedDirection" class="isPreferedDirection" value="{{$direction->dId}}" <?php echo $isPreferedDirection == $direction->dId ? "checked='checked'" : ""; ?> />Prefered</label>
                                </div>
                            <?php endforeach; ?>
                            <div class="errors"></div>
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="" class="col-sm-2 control-label">Lưu ý khác</label>
                        <div class="col-sm-10">
                            <textarea id="note" name="note" class="form-control" placeholder="Lưu ý khác">{{$request->note}}</textarea>
                        </div>
                    </div>

                    <div class="form-group hidden">
                        <label for="" class="col-sm-2 control-label">Tiện ích</label>
                        <div class="col-sm-10" id="amenities">
                            <div class="amenity-content">
                                <?php foreach ($amenities as $amenity): ?>
                                    <div class="col-md-3 utilitie-item-content">
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" data="0" class="utilitie" name="amenityId[]" datatext="{{$amenity->amenityName}}" value="{{$amenity->id}}" <?php echo in_array($amenity->id, $currentAmenities) ? "checked='checked'" : ""; ?> />
                                                {{$amenity->amenityName}}
                                            </label>
                                        </div>
                                        <div class="amenityc-child-content" data="3">
                                            <?php foreach ($amenity->amenityChild as $amenityChild): ?>
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" data="0" class="utilitie" name="amenityId[]" datatext="{{$amenityChild->amenityName}}" value="{{$amenityChild->id}}" <?php echo in_array($amenityChild->id, $currentAmenities) ? "checked='checked'" : ""; ?>  />
                                                        {{$amenityChild->amenityName}}
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
            </div>
        </div>
    </div>        
    <section class="box box-primary">
        <div class="box-header with-border">
            <div class="box-title">
                <span>Thông tin listing</span> 
                <button id="btnSearchListing" class="btn btn-success margin">Tìm kiếm nâng cao</button>
            </div>
        </div>
        <div class="box-body">
            <div id="listings">
                <table class="table table-bordered table-striped" id="dataTableListings">
                    <thead>
                        <tr>
                            <th data-orderable="false">Chọn</th>
                            <th>LID</th>
                            <th data-orderable="false">Hình</th>
                            <th data-orderable="false">Giấy chủ quyền</th>
                            <th data-orderable="false">Giá thương lượng thấp nhất</th>
                            <th data-orderable="false">Phân loại</th>
                            <th>Giá</th>
                            <th data-orderable="false">Diện tích (dài x rộng)</th>
                            <th>Địa chỉ</th>
                            <th>Thông tin chủ listing</th>
                            <th>Số ngày live</th>
                            <th>updated (Days)</th>
                            <th>Hướng</th>
                            <th data-orderable="false">Năm xây dựng</th>
                            <th data-orderable="false">Điểm</th>
                        </tr>
                    </thead>                  
                </table> 
            </div>
            <div style="margin-top:16px;">
                <button type="button" id="btnBroadcast" class="btn btn-warning hide">Broadcast</button>
                <a id="btnOpenEmailForm" href="#" class="btn btn-success">Email to KH</a>
                <a id="btnEmailNoListingToCustomer" href="#" class="btn btn-danger hidden">Gửi mail không có hàng</a>
                <!--<a id="btnOpenScheduleForm" href="#" class="btn btn-warning">Đặt lịch xem</a>-->
                <a id="btnContinueScheduleForm" href="#" class="btn btn-warning">Thêm xong</a>
                <a id="btnAddCart" href="#" class="btn btn-success">Thêm vào giỏ hàng</a>
            </div>
        </div>
    </section>
    <div class="db-tm-item deal-tm-listing-info-1">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">THÔNG TIN THÊM</h3>
            </div>
            <div class="box-body">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="" class="col-sm-12">Trạng thái</label>
                            <div class="col-sm-6">
                                <select id="statusId" name="statusId"  class="form-control">
                                    <?php foreach ($statusList as $status): ?>
                                        <option value="{{$status->statusId}}" <?php echo $status->statusId == $deal->statusId ? "selected='selected'" : ""; ?> >{{$status->statusName}}</option>
                                    <?php endforeach; ?>
                                </select>                                
                            </div>
                            <div class="col-sm-6">
                                <button data-href="/deal/request-feedback" data-requested="{{!empty($deal->isRequestFeedback)?$deal->isRequestFeedback:""}}" class="btn btn-warning btn-request-feedback">Gửi yêu cầu phản hồi cho KH</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 hidden">
                        <div class="form-group">
                            <label for="" class="col-sm-12">Sale Tham Gia</label>
                            <div class="col-sm-12">
                                <select id="saleId" name="saleId"  class="form-control select2">
                                    <option value="">Chọn sale tham gia</option>
                                    <?php foreach ($sales as $sale): ?>
                                        <option value="{{$sale->agentId}}" {{$sale->agentId==$deal->saleId?"selected='selected'":""}}>{{$sale->name}}</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div></div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="" class="col-sm-12">Người chịu trách nhiệm chính</label>
                            <div class="col-sm-12" {{$deal->assignedTo}}>
                                <select id="assignedTo" name="assignedTo"  class="form-control select2">
                                    <option value={{$userId}}  <?php echo $userId == $request->assignedTo ? "selected='selected'" : ""; ?>  >{{$userName}}</option>
                                    <?php
                                    if ($accounts):
                                        foreach ($accounts as $account):
                                            ?>
                                            <option value="{{$account->userId}}" <?php echo $account->userId == $deal->assignedTo ? "selected='selected'" : ""; ?>  >{{$account->name}}</option>
                                            <?php
                                        endforeach;
                                    endif;
                                    ?>
                                </select>
                            </div>

                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <div class="col-sm-3">
                                <label class="col-sm-12">&nbsp;</label>
                                <button class="btn btn-success btnReAssign">Chuyển giao</button>
                            </div>                                            
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="" class="col-sm-12">Do môi giới nào giới thiệu?</label>
                            <div class="col-sm-12">
                                <select id="agentId" name="agentId" class="form-control select2"   data-old-am="{{$request->amOfAgentPresenter}}">
                                    <option value="">--- chọn môi giới ---</option>
                                    <?php foreach ($agents as $agent): ?>
                                        <option value="{{$agent->agentId}}" <?php echo $agent->agentId == $deal->agentId ? "selected='selected'" : ""; ?>  >{{$agent->name}}</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="" class="col-sm-12">AM của môi giới giới thiệu</label>
                            <div class="col-sm-12">
                                <select id="amOfAgentPresenter" name="amOfAgentPresenter" class="form-control select2">
                                    <option value="">--- chọn AM ---</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="" class="col-sm-12">Môi giới phục vụ</label>
                            <div class="col-sm-12">
                                <select id="agentServe" name="agentServe" class="form-control select2" data-old-am="{{$request->amOfAgentServe}}">
                                    <option value="">--- chọn môi giới ---</option>
                                    <?php foreach ($agents as $agent): ?>
                                        <option value="{{$agent->agentId}}" <?php echo (!empty($request->agentServe) && $agent->agentId == $request->agentServe) ? "selected='selected'" : ""; ?>  >{{$agent->name}}</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="" class="col-sm-12">AM của môi giới phục vụ</label>
                            <div class="col-sm-12">
                                <select id="amOfAgentServe" name="amOfAgentServe" class="form-control select2">
                                    <option value="">--- chọn AM ---</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6"></div>
                    <div class="col-sm-6"></div>
                </div>    
            </div>
        </div>
    </div>
</form>
<?php if ($deal->notes): ?>
    @include("shared.panel-request-update-notes", ["requestUpdateNotes"=>$deal->notes])
<?php endif; ?>
<section id="customerForm">
</section>



<div class="show-btn-action-group" style="position:fixed;bottom:10px;right:10px;z-index:1000000">

    <?php if (!empty($deal->meeting) && $currentGroup['departmentId'] == 5 && $deal->meeting->isGenerated == false): ?>
        <button id="btnShowMeeting" class="btn btn-success" data-meeting-id="{{$deal->meeting->id}}">Xem lại meeting cho CRM</button>
    <?php endif; ?>
    <?php if ($currentGroup['departmentId'] != 12): ?>
        <?php if ($deal->meeting == NULL || ($deal->meeting != NULL && $deal->meeting->isGenerated == false)): ?>
            <button type="button" id="btnSendToCrm" class="btn btn-success">Chuyển cho Crm</button>
        <?php endif; ?>
    <?php endif; ?>
    <button id="btnSaveDeal" class="btn btn-success margin">Save</button>
    <?php if (!$request->customers->isOld): ?>
        <button type="button" id="btnSetOldCustomer" class="btn btn-success hidden">KH cũ</button>
    <?php endif; ?>
    <button type="button" class="btn btn-success btnShowTransferPSForm" data-from-table='#dataTableListings_wrapper'>Chuyển PS</button>
    <button type="button" id="btnShowPaymentRequestForm" class="btn btn-success">Yêu cầu thanh toán</button>
    <button type="button" id="btnShowLoanAdviceForm" class="btn btn-success">Tư vấn vay vốn</button>
    <!-- <button type="button" id="btnShowCustomerReviewForm" class="btn btn-success">Form đánh giá KH</button> -->
    <button type="button" class="btn btn-success" onclick="openModalQuestion('{{$deal->leadId}}', '1')">Form đánh giá KH</button>
    <button id="btnShowSendContract" {{$deal->contractFile?"":"disabled"}} class="btn btn-success margin">{{$deal->isSentContract?"Gửi lại hợp đồng":"Gửi hợp đồng"}}</button>
    <button id="btnShowUploadContract" class="btn btn-success margin">{{$deal->contractFile?"Reupload hợp đồng":"Upload hợp đồng"}}</button>
    <button id="btnShowEventForm" class="btn btn-success margin">Tạo Event</button>
    <a href="#" class="btn btn-warning">Generate invoice</a>
    <a href="#" title="Tạm ẩn nhóm nút chức năng" class="btn btn-default btn-hide margin"><i class="fa fa-angle-down"></i></a>
</div>

<div class="hide-btn-action-group" style="position:fixed;bottom:0px;right:0px;z-index:1000000">
    <a href="#" title="Hiện nhóm nút chức năng" class="btn btn-default btn-hide margin"><i class="fa fa-angle-up"></i></a>
</div>
<div style="height: 600px;"></div>

@include("deal.form-call-reminder")
@include("deal.form-meeting-reminder")
@include("deal.form-event-reminder")
@include('deal.email-listing-to-customer-modal')
@include('deal.email-contract-to-customer-modal')
@include('deal.form-payment-request')
@include('deal.modal-schedule')
@include('shared.modal-meeting')
@include('deal.form-transfer-ps')
@include('shared.modal-show-log-listing')
@include('shared.modal-search-listing',['data' => $deal])
@include('deal.modal-search-listings-result-overview',['data' => $deal])

<!-- add new event -->
<div id="newEventReminderModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Add new event</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <label class="col-sm-2">Deal</label>
                    <div class="col-sm-10">Nguyễn Thị Hiền</div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2">Event Type</label>
                    <div class="col-sm-10">
                        <select class="form-control">
                            <option>Deposit</option>
                        </select>
                    </div>
                    <div class="col-md-12">
                        <textarea class="form-control" rows="3" placeholder="Type in the event description"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2">Event Date:</label>
                    <div class="col-sm-5">1 Apr 2016</div>
                    <div class="col-sm-5">
                        <label><input type="checkbox" /> set reminder</label> <input type="text" size="4" /> mins
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2">Where</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2">Attach file</label>
                    <div class="col-sm-10">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2">Deal Stage</label>
                    <div class="col-sm-10">
                        <select class="form-control">
                            <option>Viewed-Not Satisfied</option>
                        </select>
                    </div>
                </div>
                <div class="form-group text-center">
                    <button class="btn btn-success">Add</button>
                    <a href="#" class="btn btn-danger"  data-dismiss="modal" >Cancel</a>
                </div>
            </div>
        </div>
        <!--
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
        -->
    </div>

</div>
<!-- end add new event -->

<!-- modal upload contract -->
<div id="upLoadContract" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">

            <form id="formUploadContact" method="post" enctype="multipart/form-data" action="/deal/upload-contract/{{$deal->dealId}}"> 
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Upload hợp đồng</h4>
                </div>
                <div class="modal-body">                   
                    <input type="hidden" id="csrf-token" name="_token" value="{{$csrf_token}}" />
                    <div class="row">
                        <!--Images/Video-->
                        <div class="col-xs-12">
                            <div class="form-group contract-preview">
                                <a target="_blank" href="{{$deal->contractFile}}" >{{$deal->contractFile}}</a>
                            </div>
                            <div class="form-group contract">
                                <label>Chọn file hợp đồng</label>
                                <input class="file" type="file" name="file_data" />
                            </div>
                        </div>
                    </div>                    
                    <div class="form-group text-center">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-default btn-upload-contract">Upload</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
    </div>

</div>

<div id="image-slider" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div id="owl-carousel" class="owl-carousel owl-theme">
                </div>
            </div>
        </div>

    </div>
</div>

<div id="modalReassignResponsiblePerson" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Reassign người chịu trách nhiệm chính</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="" class="col-sm-12">Người chịu trách nhiệm chính</label>
                        <div class="col-sm-12" {{$deal->assignedTo}}>
                            <select class="assignedTo form-control" name="assignedTo" >
                                <option value=''  >Chọn người chịu trách nhiệm</option>
                                <option value='{{$userId}}' >{{$userName}}</option>
                                <?php
                                if ($accounts):
                                    foreach ($accounts as $account):
                                        ?>
                                        <option value="{{$account->userId}}" >{{$account->name}}</option>
                                        <?php
                                    endforeach;
                                endif;
                                ?>
                            </select>
                            <div class="errors" ></div>
                        </div>

                    </div>
                    <div class="form-group">
                        <label for="" class="col-sm-12">Lý do chuyển cho người khác</label>
                        <div class="col-sm-12">
                            <textarea  name="leadReassignReason" id="leadReassignReason" class="form-control" rows="6" placeholder="Nhập lý do"></textarea>
                            <div class="errors" ></div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success btnSaveReassignResponsiblePerson">Lưu</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Hủy</button>
            </div>
        </div>

    </div>
</div>

<!-- note for listing -->
<div id="noteForListing" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Note cho listing</h4>
            </div>
            <div class="modal-body">
                <form id="formNoteForListing" method="post">
                    <input type="hidden" id="csrf-token" name="_token" value="{{$csrf_token}}" />
                    <input type="hidden" id="noteListingId" name="noteListingId" value="" />
                    <div class="form-group row">
                        <label class="col-sm-2">Nội dung</label>
                        <div class="col-xs-12">
                            <textarea id="noteContent" name="noteContent" class="form-control" rows="7"></textarea>
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button type="button" id="btnUpdateNote" class="btn btn-success">Cập nhật</button>
                        <a href="#" class="btn btn-danger"  data-dismiss="modal" >Bỏ qua</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@include('shared.modal-meeting')
@endsection



@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=places&language=vi-VN&key=AIzaSyDpdmD6vwtMod5wbhS5yYGTD05dsn79UaU"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<!--<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>-->
<!--<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>-->


<!-- <script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script> -->
<script src="{{loadAsset("/js/jquery.geocomplete.js")}}"></script>
<script src="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.js")}}"></script>
<script type="text/javascript">
        var showSearchResultOverview = true;
        var dealId = "{{$deal->dealId}}";
        var leadId = "{{$deal->leadId}}";
        var isBroadcast = false;
        var level = 2;
        var firstRun = true;
        var currentGroup = <?php echo json_encode($currentGroup); ?>;
        var noListingEmailTitle = "<?php echo "Propzy thông báo kết quả tìm kiếm " . $deal->request->listingType->typeName . " " . $deal->request->propertyType->typeName; ?>";
        var contractFile = [
<?php if ($deal->contractFile): ?>
            "{{$deal->contractFile}}"
<?php endif; ?>
        ];
        var deal = <?php echo json_encode($deal); ?>;
        var customerReviewData = <?php echo json_encode($deal->customerReview); ?>;
        var loanAdviceData = <?php echo json_encode($deal->bankLoanAdvice); ?>;</script>

<script src="{{loadAsset("/js/gmap3.js")}}"></script>
<script src="{{loadAsset("/js/deal/commons.js")}}"></script>
<script src="{{loadAsset("/js/deal/detail.js")}}"></script>
<script src="{{loadAsset("/js/deal/search-listing.js")}}"></script>
<script src="{{loadAsset("/js/deal/update-hoang-extended.js")}}"></script>

<script type="text/javascript">
        JModalConfirmMeetingRequest.show_hide_button_group();
</script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.theme.css")}}" rel="stylesheet" type="text/css" />
<style type="text/css">
    .prefered{
        text-decoration: underline;
    }

    .datepicker {
        z-index: 100000 !important;
    }
    .pac-container{ 
        z-index: 100000 !important;        
    }
    ul.notesList {
        list-style: none;
        margin:0px;
        padding:0px;
    }
    .notesList li{
        padding:16px;
    }
    .notesList li img{
        width:auto;
        height:48px;
        margin-right:  16px;
        float:left;
    }

    .notesList .isMine img{
        width:auto;
        height:48px;
        margin-right: 16px;
        float: left;
    }
    .notesList .isMine{
        text-align: left;
    }
    #image-slider{
        z-index:999999999;
    }
    .district-wrapper .wards{
        margin-left: 16px;
        border-right:2px;
    }


    #modalSearchListingsResultOverview{
        padding-right: 0px !important;
    }
    #modalSearchListingsResultOverview .modal-dialog{
        width: 100% !important;
        margin:0 auto;
    }
</style>
@stop