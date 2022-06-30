@extends('layout.default')

@section('content')
<?php $csrf_token = csrf_token(); ?>
<div class='dashboard'>
    <form method="post" id="formCustomerInfo" class="form-horizontal">
        <section>
            <div>
                @include('lead.header-nav')
            </div>
            <div class="db-tm-item deal-tm-customer-info">
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-primary">
                            <div class="box-header with-border">
                                <h3 class="box-title">KHÁCH HÀNG</h3>
                            </div>
                            <input type="hidden" id="customerId" name="customerId" value="{{$lead->customerId}}" />
                            <input type="hidden" id="requestId" name="requestId" value="{{$lead->requestId}}" />
                            <input type="hidden" id="leadId" name="leadId" value="{{$lead->leadId}}" />
                            <input type="hidden" id="csrf-token" name="_token" value="{{$csrf_token}}" />
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
                                            <?php
                                            if ($lead->dealId == null) {
                                                echo '<label for="" class="col-sm-12">Phone</label>';
                                            }
                                            ?>                                            
                                            <div class="col-sm-12">
                                                <?php
                                                if ($lead->dealId == null) {
                                                    ?>
                                                    <div class="input-group">
                                                        <input id="customerPhone" name="customerPhone" type="number" class="hidden form-control" value="{{isset($request->customers)?$request->customers->phone:""}}" placeholder="N/A" />
                                                        <span class="hidden input-group-addon"><i class="fa fa-phone"></i></span>
                                                    </div>
                                                    <?php
                                                } else {
                                                    ?>													
                                                    <input id="customerPhone" name="customerPhone" type="hidden" class="form-control" value="{{isset($request->customers)?$request->customers->phone:""}}" placeholder="N/A" />
                                                    <?php
                                                }
                                                ?>
                                                <div class="m-t-7">
                                                    <?php if (empty($lead->dealId)): ?>
                                                        <button class="btn btn-success makeCall">Gọi</button>
                                                    <?php endif; ?>
                                                    <button class="btn btn-success makeCallReminder">Tạo reminder</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">Email</label>
                                            <div class="col-sm-12">
                                                <div class="input-group">
                                                    <input type="email" name="customerEmail" id="customerEmail" class="form-control"  value="{{isset($request->customers)?$request->customers->email:""}}" placeholder="N/A" />
                                                    <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
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
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">Do môi giới nào giới thiệu?</label>
                                            <div class="col-sm-12">
                                                <div name="agentName" class="agentName" value="" >{{!empty($lead->agentName)?$lead->agentName:'N/A'}}<br />{{$lead->agentPhone?"":$lead->agentPhone}}</div>
                                            </div>
                                        </div>
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

                        <div class="box box-primary">
                            <div class="box-header with-border">
                                <h3 class="box-title">GIAO DỊCH</h3>
                                <label class="control-label hidden"><input type="checkbox" id="isSpecialDeal" <?php echo!empty($lead->meetingId) ? "checked" : ""; ?> /> Special Deal</label>
                            </div>
                            <div class="box-body">
                                <div class="row hidden">
                                    <label for="" class="col-sm-2 control-label">Thiết bị</label>
                                    <div class="col-sm-4">
                                        <?php
                                        $devices = array(
                                            "N/A",
                                            "Desktop",
                                            "Mobile"
                                        );
                                        ?>
                                        <select id="device" name="device" class="form-control">
                                            <?php foreach ($devices as $key => $value): ?>
                                                <option value="{{$value}}" <?php echo $value == $request->device ? "selected='selected'" : ""; ?>  >{{$value}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                </div>
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
                                                        <select id="listingTypeId" name="listingTypeId" class="form-control">
                                                            <?php foreach ($listingTypes as $key => $value): ?>
                                                                <option value={{$key}} <?php echo $key == $request->listingTypeId ? "selected='selected'" : ""; ?> >{{$value}}</option>
                                                            <?php endforeach; ?>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6" >
                                                <div class="form-group">
                                                    <label for="" class="col-sm-12">Loại bất động sản</label>
                                                    <div class="col-sm-12">
                                                        <select name="propertyTypeId" id="propertyTypeId" class="form-control" style="width: 100%;">
                                                            <?php foreach ($propertyTypes as $propertyType): ?>
                                                                <option value="{{$propertyType->propertyTypeID}}" <?php echo $propertyType->propertyTypeID == $request->propertyTypeId ? "selected='selected'" : ""; ?> >{{$propertyType->typeName}}</option>
                                                            <?php endforeach; ?>
                                                        </select>
                                                    </div>
                                                </div>  
                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-12">Ngân sách ban đầu (dự trù)</label>
                                                    <div class="col-sm-10">
                                                        <input id="initialBudget" name="initialBudget" type="text" class="form-control" value="{{number_format($request->initialBudget,0,'.','')}}" placeholder="N/A" />
                                                    </div>
                                                    <label for="" class="col-sm-2 control-label">ĐẾN</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-12 control-label">&nbsp;</label>
                                                    <div class="col-sm-7 padding-r-0">
                                                        <input id="finalBudget" name="finalBudget" type="text" class="form-control" value="{{number_format($request->finalBudget,0,'.','')}}" placeholder="N/A"  />
                                                        <div class="errors"></div>
                                                    </div>
                                                    <div class="col-sm-5">
                                                        <?php
                                                        $currencies = array(
                                                            "VND" => "VND",
                                                            "USD" => "USD"
                                                        );
                                                        ?>
                                                        <select id="currency" name="currency" class="form-control padding-r-0" >
                                                            <?php foreach ($currencies as $key => $value): ?>
                                                                <option value="{{$key}}" <?php echo $key == $request->currency ? "selected='selected'" : ""; ?> >{{$value}}</option>
                                                            <?php endforeach; ?>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-12">Ngân sách ban đầu (Fixed) *</label>
                                                    <div class="col-sm-12">
                                                        <input type="text" id="initialBudgetFixed" name="initialBudgetFixed" value="{{number_format($request->initialBudgetFixed)}}" class="form-control" />
                                                        <div class="errors initialbudgetfixed-errors"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-12">Ngân sách (final)</label>
                                                    <div class="col-sm-12">
                                                        <input id="leadFinalBudget" name="leadFinalBudget" type="text" class="form-control" value="{{$lead->finalBudget}}" placeholder="N/A" />
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
                                                    <label for="" class="col-sm-1 control-label">to</label>
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
                                                        <input id="responsiveness" name="responsiveness" type="number" class="form-control" value="{{$lead->responsiveness}}" placeholder="N/A" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-12">Phân loại:</label>
                                                    <div class="col-sm-12">
                                                        <select id="typeId" name="typeId" class="form-control">
                                                            <?php foreach ($dealTypes as $dealType): ?>
                                                                <option value="{{$dealType->typeId}}" {{$dealType->typeId==$lead->typeId?"selected='selected'":""}}>{{$dealType->typeName}}</option>
                                                            <?php endforeach; ?>
                                                        </select>                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
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
                                                                <input type="radio" name="isPrefered" class="isPrefered" value="{{$district->districtId}}" <?php echo $district->districtId == $isPreferedDistrict ? "checked='checked'" : ""; ?> >
                                                                Prefered
                                                            </span>
                                                        </div>
                                                    <?php endforeach; ?>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Hướng:</label>
                                    <div class="col-sm-10">
                                        <?php foreach ($directions as $direction): ?>
                                            <div class="checkbox col-sm-3" >
                                                <label class="no-bold"><input type="checkbox" value="{{$direction->dId}}" name="directions[]" class="directions" <?php echo in_array($direction->dId, $currentDirections) ? "checked='checked'" : "" ?>/ > {{$direction->directionName}}</label>
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

                                <div class="form-group row">
                                    <label for="" class="col-sm-2 control-label">Tiện ích</label>
                                    <div class="col-sm-10" id="amenities">
                                        <div class="amenity-content">
                                            <?php
                                            $child = [];
                                            foreach ($amenities as $key => $value) {
                                                if (count($value->amenityChild) > 0) {
                                                    $child[] = $amenities[$key];
                                                    unset($amenities[$key]);
                                                }
                                            }

                                            usort($child, function ($a, $b) {
                                                return count($a->amenityChild) - count($b->amenityChild);
                                            });
                                            // $amenities = array_merge($amenities,$child);
                                            ?>
                                            <div class="notChild">
                                                <?php foreach ($amenities as $amenity): ?>

                                                    <div class="col-md-4 utilitie-item-content">
                                                        <div class="checkbox">
                                                            <label>
                                                                <input type="checkbox" data="0" class="utilitie" name="amenityId[]" datatext="{{$amenity->amenityName}}" value="{{$amenity->id}}" <?php echo in_array($amenity->id, $currentAmenities) ? "checked='checked'" : ""; ?> />
                                                                {{$amenity->amenityName}}
                                                            </label>
                                                        </div>
                                                        @if( count( $amenity->amenityChild ) > 0 )
                                                        <div style="padding-left: 10px; border-left: 1px solid #dedede" class="amenityc-child-content" data="3">
                                                            <?php foreach ($amenity->amenityChild as $amenityChild): ?>
                                                                <div class="checkbox">
                                                                    <label>
                                                                        <input type="checkbox" data="0" class="utilitie" name="amenityId[]" datatext="{{$amenityChild->amenityName}}" value="{{$amenityChild->id}}" <?php echo in_array($amenityChild->id, $currentAmenities) ? "checked='checked'" : ""; ?>  />
                                                                        {{$amenityChild->amenityName}}
                                                                    </label>
                                                                </div>
                                                            <?php endforeach; ?>
                                                        </div>
                                                        @endif
                                                    </div>

                                                <?php endforeach; ?>
                                            </div>

                                            <div class="hasChild">
                                                <?php foreach ($child as $amenity): ?>

                                                    <div class="col-md-4 utilitie-item-content">
                                                        <div class="checkbox">
                                                            <label>
                                                                <input type="checkbox" data="0" class="utilitie" name="amenityId[]" datatext="{{$amenity->amenityName}}" value="{{$amenity->id}}" <?php echo in_array($amenity->id, $currentAmenities) ? "checked='checked'" : ""; ?> />
                                                                {{$amenity->amenityName}}
                                                            </label>
                                                        </div>
                                                        @if( count( $amenity->amenityChild ) > 0 )
                                                        <div style="padding-left: 10px; border-left: 1px solid #dedede" class="amenityc-child-content" data="3">
                                                            <?php foreach ($amenity->amenityChild as $amenityChild): ?>
                                                                <div class="checkbox">
                                                                    <label>
                                                                        <input type="checkbox" data="0" class="utilitie" name="amenityId[]" datatext="{{$amenityChild->amenityName}}" value="{{$amenityChild->id}}" <?php echo in_array($amenityChild->id, $currentAmenities) ? "checked='checked'" : ""; ?>  />
                                                                        {{$amenityChild->amenityName}}
                                                                    </label>
                                                                </div>
                                                            <?php endforeach; ?>
                                                        </div>
                                                        @endif
                                                    </div>

                                                <?php endforeach; ?>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 hidden">
                                    <ul>
                                        <?php foreach ($lead->leadReassignReason as $reassignReason): ?>                                        
                                            <li>{{date('d/m/y H:i:s',$reassignReason->createdDate/1000)}} {{isset($reassignReason->assignFromName)?$reassignReason->assignFromName:""}} => {{isset($reassignReason->assignToName)?$reassignReason->assignToName:""}} : {{$reassignReason->note}}</li>
                                        <?php endforeach; ?>
                                    </ul>
                                </div>

                                <div class="show-btn-action-group btn-group-request" style="position:fixed;bottom:10px;right:10px;z-index: 9999">
                                    <?php if (!isset($lead->dealId) || (isset($lead->dealId) && $lead->dealId == NULL)): ?>
                                        <?php if ((($lead->meeting != NULL && $lead->meeting->isGenerated == false))): ?> 
                                            <button id="btnShowMeeting" class="btn btn-success margin" data-meeting-id="{{$lead->meeting->id}}">Xem lại meeting cho CRM</button>
                                        <?php endif; ?>
                                    <?php endif; ?>
                                    <?php if (!isset($lead->dealId) || $lead->dealId == NULL): ?>
                                        <button id="btnSave" class="btn btn-success margin">Lưu</button>
                                    <?php endif; ?>
                                    <?php if (!$request->customers->isOld): ?>
                                        <button type="button" id="btnSetOldCustomer" class="btn btn-success hidden margin">KH cũ</button>
                                    <?php endif; ?>
                                    <button type="button" id="btnShowLoanAdviceForm" class="btn btn-success margin">Tư vấn vay vốn</button>
                                    <!-- <button type="button" id="btnShowCustomerReviewForm" class="btn btn-success margin">Form đánh giá KH</button> -->
                                    <button type="button" onclick="openModalQuestion('{{$lead->leadId}}', '1')"  class="btn btn-success margin">Form đánh giá KH</button>
                                    <button type="button" id="btnFindListing" class="btn btn-success hidden margin">Tìm listing</button>                                    
                                    <?php if ($currentGroup['departmentId'] == 5): ?>
                                        <?php if ((!isset($lead->dealId) || $lead->dealId == NULL) && !$lead->meeting): ?>
                                            <button type="button" id="btnSendToCrm" class="btn btn-success margin">Chuyển cho Crm</button>
                                        <?php endif; ?>
                                    <?php endif; ?>
                                    <?php if ($currentGroup['departmentId'] == 12 && !empty($lead->dealId)): ?>
                                        <a href="/deal/update/{{$lead->dealId}}" class="btn btn-warning margin" >Xem deal</a>
                                    <?php endif; ?>							


                                    <?php
                                    if ($lead->dealId == NULL):
                                        //if (($currentGroup['departmentId'] == 5 && ($lead->meeting == null || ($lead->meeting != NULL && $lead->meeting->isAccepted != TRUE))) || ($currentGroup['departmentId'] == 12 && $lead->meeting != null && $lead->meeting->isAccepted == TRUE)):
                                        if (($currentGroup['departmentId'] == 12 && $lead->meeting != null && $lead->meeting->isAccepted == TRUE)):
                                            ?>
                                            <button id="btnGenerateDeal" class="btn btn-warning margin">Generate Deal</button>
                                            <?php
                                        endif;
                                    endif;
                                    ?>


                                    <?php if ($currentGroup['departmentId'] == 12 && $lead->meeting != NULL): ?>
                                        <?php if (empty($lead->dealId) && $lead->meeting->isAccepted == true && $lead->meeting->isReported == false) : ?>											
                                            <!--<button type="button" id="btnReportMeetingToTm" class="btn btn-success">Báo TM</button>-->
                                            <button type="button" id="btnRepostCustomerNotArrive" class="btn btn-success margin">Báo KH không đến</button>
                                        <?php endif; ?>
                                    <?php endif; ?>

                                    <a href="#" title="Tạm ẩn nhóm nút chức năng" class="btn btn-default btn-hide margin"><i class="fa fa-angle-down"></i></a>
                                </div>

                                <div class="hide-btn-action-group" style="position:fixed;bottom:0px;right:0px;z-index: 9999">
                                    <a href="#" title="Hiện nhóm nút chức năng" class="btn btn-default btn-hide margin"><i class="fa fa-angle-up"></i></a>
                                </div>
                            </div>
                        </div>
                        <section class="box box-primary">
                            <div class="box-header with-border">
                                <div class="box-title"><span>Thông tin listing</span> 
                                    <button id="btnSearchListing" class="btn btn-success margin">Tìm kiếm nâng cao</button></div>
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
                                <div style="margin-top:16px">
                                    <button type="button" id="btnBroadcast" class="btn btn-warning hidden">Broadcast</button>
                                    <a id="btnOpenEmailForm" href="#" class="btn btn-success">Email to KH</a>
                                    <a id="btnEmailNoListingToCustomer" href="#" class="btn btn-danger">Gửi mail không có hàng</a>
                                    <!--<a id="btnOpenScheduleForm" href="#" class="btn btn-warning">Đặt lịch xem</a>-->
                                    <a id="btnContinueScheduleForm" href="#" class="btn btn-warning">Thêm xong</a>
                                    <a id="btnAddCart" href="#" class="btn btn-success">Thêm vào giỏ hàng</a>
                                </div>
                            </div>
                        </section>
                        <div class="box box-primary">
                            <div class="box-header with-border">
                                <h3 class="box-title">THÔNG TIN THÊM</h3>
                            </div>
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">Trạng thái</label>
                                            <div class="col-sm-12">
                                                <select id="statusId" name="statusId"  class="form-control">
                                                    <?php foreach ($statusList as $status): ?>
                                                        <option value="{{$status->statusId}}" <?php echo $status->statusId == $lead->statusId ? "selected='selected'" : ""; ?> >{{$status->statusName}}</option>
                                                    <?php endforeach; ?>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">Sale Tham Gia</label>
                                            <div class="col-sm-12">
                                                <select id="saleId" name="saleId"  class="form-control select2">
                                                    <option value="">Chọn sale tham gia</option>
                                                    <?php foreach ($sales as $sale): ?>
                                                        <option value="{{$sale->agentId}}" {{$sale->agentId==$request->saleId?"selected='selected'":""}}>{{$sale->name}}</option>
                                                    <?php endforeach; ?>
                                                </select>
                                            </div>
                                        </div></div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">Người chịu trách nhiệm chính</label>
                                            <div class="col-sm-12" {{$lead->assignedTo}}>
                                                <select id="assignedTo" name="assignedTo"  class="form-control select2">
                                                    <option value={{$userId}}  <?php echo $userId == $request->assignedTo ? "selected='selected'" : ""; ?>  >{{$userName}}</option>
                                                    <?php
                                                    if ($accounts):
                                                        foreach ($accounts as $account):
                                                            ?>
                                                            <option value="{{$account->userId}}" <?php echo $account->userId == $lead->assignedTo ? "selected='selected'" : ""; ?>  >{{$account->name}}</option>
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
                                                <select id="agentId" name="agentId" class="form-control select2"  data-old-am="{{$request->amOfAgentPresenter}}">
                                                    <option value="">--- chọn môi giới ---</option>
                                                    <?php foreach ($agents as $agent): ?>
                                                        <option value="{{$agent->agentId}}" <?php echo $agent->agentId == $request->agentId ? "selected='selected'" : ""; ?>  >{{$agent->name}}</option>
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
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="db-tm-item deal-tm-customer-need hidden">
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-primary">
                            <div class="box-body">
                                <table id="pending-requests"  class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>LID</th>
                                            <th>Bed</th>
                                            <th>Bath</th>
                                            <th>Size</th>
                                            <th>Price (in VNĐ)</th>
                                            <th>Address</th>
                                            <th>Call owner to check availbility </th>
                                            <th>Deactivate</th>
                                            <th>Khách chọn đi xem</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($lead->rlistingsList as $listing): ?>
                                            <tr>
                                                <td>{{$listing->rlistingId}}</td>
                                                <td>{{$listing->bedRooms}}</td>
                                                <td>{{$listing->bathRooms}}</td>
                                                <td>{{$listing->formatSize}}</td>
                                                <td>{{$listing->formatPrice}}</td>
                                                <td>{{$listing->address}}</td>
                                                <td>N/A</td>
                                                <td><input type="checkbox" <?php $listing->isDeactivated ? "checked='checked'" : ""; ?> /></td>
                                                <td><input type="checkbox" <?php $listing->isSelected ? "checked='checked'" : ""; ?> /></td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </form>

    <?php if ($lead->notes): ?>
        @include("shared.panel-request-update-notes", ["requestUpdateNotes"=>$lead->notes])
    <?php endif; ?>
    <?php if ($currentGroup['departmentId'] == 3 || ($currentGroup['departmentId'] == 5 && !empty($lead->dealId))): ?>
        @include("shared.lead-deal-notes")
    <?php endif; ?>
    <section id="customerForm">
    </section>

</div>
<div style="height: 600px;"></div>
<!-- make call -->
<div id="makeCallReminderModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formMakeCallReminderModal" method="post" >
                <input type="hidden" class="reminderTypeId" name="reminderTypeId" value=1 />
                <input type="hidden" id="customerId" name="customerId" value="{{$lead->customerId}}" />
                <input type="hidden" id="leadId" name="leadId" value="{{$lead->leadId}}" />
                <input type="hidden" class="customerName" name="customerName" value="{{isset($request->customers)?$request->customers->name:""}}" />
                <input type="hidden" class="customerPhone" name="customerPhone" value="{{isset($request->customers)?$request->customers->phone:""}}" />
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">New call</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label class="col-sm-2">When</label>
                        <div class="col-sm-10">
                            <div class="col-md-6">
                                <div class="input-group date" data-provide="datepicker">
                                    <input id="whenDate" name="whenDate" class="form-control" />
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                </div>
                                <div class="errors"></div>
                            </div>
                            <div class="col-md-6">
                                <div class="input-group bootstrap-timepicker timepicker">
                                    <input id="whenTime" type="text" class="form-control input-small">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                </div>
                                <div class="errors"></div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2"></label>
                        <div class="col-sm-10 input-group">
                            <label><input  type="checkbox" checked="checked" /> set reminder</label> <input type="text" class="reminderTime" name="reminderTime" size="4" /> mins

                            <div class="errors"></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Type</label>
                        <div class="col-sm-10">
                            <select class="type" name="type">
                                <option value=1>Inbound</option>
                                <option value=2>Outbound</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">With</label>
                        <div class="col-sm-10">
                            <span>{{isset($request->customers)?$request->customers->name:""}}</span>
                            <a href="tel:{{isset($request->customers)?$request->customers->phone:""}}" class="tel">{{isset($request->customers)?$request->customers->phone:""}}</a>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Subject</label>
                        <div class="col-sm-10">
                            <div>
                                <!--<input type="text" name="subject" class="form-control subject" placeholder="Please specify the call subject." />-->
                                <select name="subject" class="form-control subject">                                    
                                </select>
                                <input type="hidden" name="defineId" class="defineId" value="" />
                                <div class="errors"></div>
                            </div>
                            <div>
                                <textarea name="content" class="form-control content" rows="4"></textarea>
                                <div class="errors"></div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Responsible person</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" value="{{$userName}}" readonly="readonly" />
                            <input type="hidden" name="userId" class="userId" value="{{$userId}}" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Status</label>
                        <div class="col-sm-10">
                            <select class="statusId" name="statusId">
                                <option value=1>Pending</option>
                                <option value=2>Done</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Priority</label>
                        <div class="col-sm-10">
                            <select class="priorityId" name="priorityId">
                                <option value=1>Low</option>
                                <option value=2>High</option>
                                <option value=3>Normal</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button class="btn btn-success btnSaveCallReminder">Save</button>
                        <a href="#" class="btn btn-danger"  data-dismiss="modal" >Cancel</a>
                    </div>
                </div>
                <!--
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
                -->
            </form>
        </div>

    </div>
</div>
<!-- end make call -->


<div id="image-slider" class="modal fade" role="dialog">
    <div class="modal-dialog">

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
                        <div class="col-sm-12" {{$lead->assignedTo}}>
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


@include('lead.modal-schedule')
@include('shared.modal-meeting')
@include('lead.modal-report-meeting-to-tm')
@include('shared.modal-show-log-listing')
@include('shared.modal-search-listing',['data' => $lead])
@include('deal.email-listing-to-customer-modal')
@include('deal.modal-search-listings-result-overview',['data' => $lead])
@endsection


@extends('templates.amenities-item')
@section('page-js')
<script src="{{loadAsset("/js/helper.js")}}"></script>
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
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-mask/jquery.mask.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.js")}}"></script>
<script src="{{loadAsset("/js/BriaXCall.js")}}"></script>
<script src="{{loadAsset("/js/template7.min.js")}}"></script>
<script type="text/javascript">

                                        JModalConfirmMeetingRequest.show_hide_button_group();
                                        var leadId = "{{$lead -> leadId}}";
                                        var dealId = <?php echo $lead->dealId ? $lead->dealId : "null"; ?>;
                                        var currentAssignTo = "{{$lead->assignedTo}}";
                                        var isBroadcast = false;
                                        var level = 2;
                                        var firstRun = true;
                                        var lead = <?php echo json_encode($lead); ?>;
                                        var customerReviewData = <?php echo json_encode($lead->customerReview); ?>;
                                        var loanAdviceData = <?php echo json_encode($lead->bankLoanAdvice); ?>;
                                        var noListingEmailTitle = "<?php echo "Propzy thông báo kết quả tìm kiếm " . $lead->request->listingType->typeName . " " . $lead->request->propertyType->typeName; ?>";
<?php if ($currentGroup['departmentId'] == 12): ?>
                                            $(".content-wrapper button").hide();
                                            $(".content-wrapper .btn").hide();
                                            $(".modal .btn").show();
                                            $("#btnReportMeetingToTm").show();
                                            $("#btnGenerateDeal").show();
                                            $("#btnRepostCustomerNotArrive").show();
                                            $("#btnAddCart").show();
<?php endif; ?>
<?php if ($currentGroup['departmentId'] == 5 && $lead->meeting && $lead->meeting->isGenerated): ?>
                                            $(".content-wrapper .btn").hide();
                                            $("#btnShowMeeting").show();
<?php endif; ?>

<?php if ($currentGroup['departmentId'] == 3 && $lead->assignedTo): ?>
                                            $(".content-wrapper .btn").hide();
<?php endif; ?>
                                        $(document).ready(function () {
                                        $(".btnSaveNote").show();
                                        var requestUpdate = new RequestUpdate(null, leadId);
                                        requestUpdate.init();
                                        });
                                        $("#btnSearchListing").show();
                                        $("#btnDoSearchListing").show();
                                        $("#btnDoResetSearchListing").show();
                                        $(".btnFilterListing").show();
                                        $("button.close").show();
                                        var showSearchResultOverview = false;</script>
<script src="{{loadAsset('/js/lead/lead-detail.js')}}"></script>
<script src="{{loadAsset('/js/deal/search-listing.js')}}"></script>



@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.theme.css")}}" rel="stylesheet" type="text/css" />
<style>
    .errors{
        color:#f00;
    }
    .datepicker {
        z-index: 100000 !important;
    }
    .pac-container{ 
        z-index: 100000 !important;        
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
