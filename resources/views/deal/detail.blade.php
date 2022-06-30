<?php
//deal/update nhưng chỉ đọc 
?>
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
                                    <label for="" class="col-sm-12">Tên KH</label>
                                    <div class="col-sm-12">
                                        <p class="form-control-static">{{isset($request->customers)?$request->customers->name:""}}</p>
                                        <div class="errors"></div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Phone</label>
                                    <div class="col-sm-12">
                                        <div class="input-group">
                                            <p class="form-control-static">{{isset($request->customers)?$request->customers->phone:""}}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Email</label>
                                    <div class="col-sm-12">
                                        <div class="input-group">
                                            <p class="form-control-static">{{isset($request->customers)?$request->customers->email:""}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Nguồn</label>
                                    <div class="col-sm-12">                                       
										<?php foreach ($sources as $source): ?>
											<?php if($source->sourceId == $request->sourceId): ?>
											<p class="form-control-static">{{$source->sourceName}}</p>
											<?php endif; ?>
										<?php endforeach; ?>                                      
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <label class="control-label">Do môi giới nào giới thiệu? </label>
                                <p class="form-control-static">{{$deal->agentName?"":$deal->agentName}}<br />{{$deal->agentPhone?"":$dea+l->agentPhone}}</p>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Đối tượng</label>
                                    <div class="col-sm-12">
										<?php foreach ($subjects as $subject): ?>
											<?php if($subject->subjectId == $request->subjectId): ?>
											<p class="form-control-static">{{$subject->subjectName}}</p>
											<?php endif; ?>	
										<?php endforeach; ?>
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
                <label class="control-label hidden"><input type="checkbox" id="isSpecialDeal" <?php echo !empty($deal->meetingId) ? "checked" : ""; ?> /> Special Deal</label>
            </div>  
            <div class="box-body">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Hình thức giao dịch</label>
                                    <div class="col-sm-12">
                                        <?php
                                        $listingTypes = array(
                                            1 => 'Mua',
                                            2 => 'Thuê'
                                        );
                                        ?>                                       
										<?php foreach ($listingTypes as $key => $value): ?>
											<?php if($key == $request->listingTypeId): ?>
											<p class="form-control-static">{{$value}}</p>
											<?php endif; ?>	
										<?php endforeach; ?>               
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">                            
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Loại bất động sản</label>
                                    <div class="col-sm-12">
										<?php foreach ($propertyTypes as $propertyType): ?>
											<?php if($propertyType->propertyTypeID == $request->propertyTypeId): ?>
											<p class="form-control-static">{{$propertyType->typeName}}</p>
											<?php endif; ?>
										<?php endforeach; ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Ngân sách ban đầu (dự trù)</label>
                                    <div class="col-sm-12">
                                       <p class="form-control-static">{{number_format($request->initialBudget,0,'.','')}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12 control-label">&nbsp;</label>
                                    <label for="" class="col-sm-2 control-label">ĐẾN</label>
                                    <div class="col-sm-10">
                                        <p class="form-control-static">{{number_format($request->finalBudget,0,'.','')}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Ngân sách ban đầu (Fixed)</label>
                                    <div class="col-sm-12">
                                        <p class="form-control-static">{{number_format($request->initialBudgetFixed)}}</p>
									</div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Ngân sách final (Fixed)</label>
                                    <div class="col-sm-12">
                                        <p class="form-control-static">{{!empty($deal->finalBudget)?number_format($deal->finalBudget):"N/A"}}</p>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div class="row" >
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Diện tích:</label>
                                    <div class="col-sm-5">
                                        <p class="form-control-static">{{($request->minSize!=''?$request->minSize:'N/A')}}</p>
                                    </div>
                                    <label for="" class="col-sm-2 control-label">Đến</label>
                                    <div class="col-sm-5">
                                        <p class="form-control-static">{{($request->maxSize!=''?$request->maxSize:'N/A')}}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Ngày dự tính dọn vào</label>
                                    <div class="col-sm-12">
                                        <div class="input-group date" data-provide="datepicker">
                                            <?php
                                            if ($request->moveInDate) {
                                                $request->moveInDate = date('m/d/Y', $request->moveInDate / 1000);
                                            } else {
                                                $request->moveInDate = 'N/A';
                                            }
                                            ?>
                                            <p class="form-control-static">{{$request->moveInDate}}</p>
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
                                            <p class="form-control-static">{{($request->bedRooms!=''?$request->bedRooms:'N/A')}}</p>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <label for="" >Bath</label>
                                        <div>
                                            <p class="form-control-static">{{($request->bathRooms!=''?$request->bathRooms:'N/A')}}</p>
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
                                        <p class="form-control-static">{{($deal->responsiveness!=''?$deal->responsiveness:'N/A')}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="" class="col-sm-12">Phân loại:</label>
                                    <div class="col-sm-12">
										<?php foreach ($dealTypes as $dealType): ?>
											<?php if($dealType->typeId==$deal->typeId): ?>
											<p class="form-control-static">{{$dealType->typeName}}</p>
											<?php endif; ?>
										<?php endforeach; ?>                                                     
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group row">
                            <label for="" class="col-sm-12">Quận</label>
							<div class="col-sm-12 errors district-errors"></div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <?php foreach ($districts as $district): ?>                              
										<?php if(in_array($district->districtId, $currentDistricts)): ?>
											<div class="col-sm-6" >
												<p class="form-control-static">
													{{$district->districtName}}
													<?php if($district->districtId == $isPreferedDistrict): ?>
														(*) isPrefered
													<?php endif; ?>
												</p>
											</div>
										<?php endif; ?> 
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <label for="" class="col-sm-2 control-label">Hướng:</label>
                        <div class="col-sm-10">
							<?php $i=0; ?>
                            <?php foreach ($directions as $direction): ?>
                                <?php if(in_array($direction->dId, $currentDirections)): ?>
									<p class="form-control-static">
									{{$direction->directionName}}
									<?php if($isPreferedDirection == $direction->dId): ?>
										(*) isPrefered
									<?php $i++; endif; ?>
									</p>
								<?php endif; ?> 
                            <?php endforeach; ?>
							<?php if($i == 0): ?>
								<p class="form-control-static">N/A</p>
							<?php endif; ?>
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="" class="col-sm-2 control-label">Lưu ý khác</label>
                        <div class="col-sm-10">
                            <p class="form-control-static">{{($request->note!=''?$request->note:'N/A')}}</p>
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
            <div class="box-title"><span>Thông tin listing</span> <button id="btnSearchListing" class="btn btn-success margin">Tìm kiếm nâng cao</button></div>
        </div>
        <div class="box-body">
            <div id="listings" style="margin-bottom:32px;max-height: 400px;overflow: scroll; overflow-x: auto;width: 100%;"></div>
            <div>
                <button type="button" id="btnBroadcast" class="btn btn-warning">Broadcast</button>
                <a id="btnOpenEmailForm" href="#" class="btn btn-success">Email to KH</a>
                <a id="btnEmailNoListingToCustomer" href="#" class="btn btn-danger">Gửi mail không có hàng</a>
                <!--<a id="btnOpenScheduleForm" href="#" class="btn btn-warning">Đặt lịch xem</a>-->
                <a id="btnContinueScheduleForm" href="#" class="btn btn-warning">Thêm xong</a>
				<a id="btnAddCart" href="#" class="btn btn-success">Thêm vào giỏ hàng</a>
            </div>
        </div>
    </section>
	<?php
	/*
    <section class="box box-primary">
        <div class="box-header with-border">
            <div class="box-title"><span>Thông tin listing</span> <button id="btnSearchListing" class="btn btn-success margin">Tìm kiếm nâng cao</button></div>
        </div>
        <div class="box-body">
			<div style="margin-bottom:32px;overflow-x:scroll;width:100%;">
				<table class="table table-bordered table-striped" id="showListings" style="width: 1600px">
					<thead>
						<tr>
							<th data-orderable="false">Chọn</th>
							<th>LID</th>
							<th data-orderable="false">Hình</th>
							<th data-orderable="false">Giấy chủ quyền</th>
							<th>Giá</th>
							<th data-orderable="false">Diện tích (dài x rộng)</th>
							<th style="width:200px">Địa chỉ</th>
							<th>Thông tin chủ listing</th>
							<th>Số ngày live</th>
							<th>Số ngày từ lần cuối cập nhật</th>
							<th>Hướng</th>
							<th data-orderable="false">Năm xây dựng</th>
							<th data-orderable="false">Điểm</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
    </section>
	*/
	?>
	@include('shared.modal-search-listing',['data' => $deal])
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
								<?php foreach ($statusList as $status): ?>
									<?php if($status->statusId == $deal->statusId): ?>
										<p class="form-control-static">{{$status->statusName}}</p>
									<?php endif; ?>
								<?php endforeach; ?>                            
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
                                        <?php if($sale->agentId==$deal->saleId): ?>
											<p class="form-control-static">{{$sale->name}}</p>
										<?php endif; ?>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
					</div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="" class="col-sm-12">Người chịu trách nhiệm chính</label>
                            <div class="col-sm-12" {{$deal->assignedTo}}>
								<?php if($userId == $request->assignedTo): ?>
									<p class="form-control-static">{{$userName}}</p>
								<?php endif; ?>
								<?php
								if ($accounts):
									foreach ($accounts as $account):
										if($account->userId == $deal->assignedTo){
										?>
											<p class="form-control-static">{{$account->name}}</p>
										<?php
										}
									endforeach;
								endif;
								?>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="" class="col-sm-12">Do môi giới nào giới thiệu?</label>
                            <div class="col-sm-12">                               
								<?php foreach ($agents as $agent): ?>
									<?php if($agent->agentId == $deal->agentId): ?>
										<p class="form-control-static">{{$agent->name}}</p>
									<?php endif; ?>
								<?php endforeach; ?>                              
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="" class="col-sm-12">AM của môi giới giới thiệu</label>
                            <div class="col-sm-12">
                                <p class="form-control-static">N/A</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="" class="col-sm-12">Môi giới phục vụ</label>
                            <div class="col-sm-12">
								<?php foreach ($agents as $agent): ?>
									<?php if(!empty($request->agentServe) && $agent->agentId == $request->agentServe): ?>
										<p class="form-control-static">{{$agent->name}}</p>
									<?php endif; ?>
								<?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="" class="col-sm-12">AM của môi giới phục vụ</label>
                            <div class="col-sm-12">
                                <p class="form-control-static">N/A</p>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</form>

<section id="customerForm">
</section>
<div class="show-btn-action-group" style="position:fixed;bottom:0px;right:0px;z-index:1000000">
    <?php if (isset($deal->meetingId) && $deal->meetingId != NULL): ?>
        <button id="btnShowMeeting" class="btn btn-success margin" data-meeting-id="{{$deal->meetingId}}">Xem lại meeting cho CRM</button>
    <?php endif; ?>
    <?php if ($currentGroup['departmentId'] != 12): ?>
		<?php if ($deal->meeting==NULL || ($deal->meeting !=NULL && $deal->meeting->isGenerated == false)): ?>
			<button type="button" id="btnSendToCrm" class="btn btn-success margin">Chuyển cho Crm</button>
		<?php endif; ?>
	<?php endif; ?>
    <?php if (!$request->customers->isOld): ?>
        <button type="button" id="btnSetOldCustomer" class="btn btn-success hidden margin">KH cũ</button>
    <?php endif; ?>
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

<!-- add new event -->
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
                        <div class="col-sm-12" {{$deal->assignedTo}}>
                            <select class="assignedTo form-control select2" name="assignedTo" >
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

@endsection



@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<!--<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>-->
<!--<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>-->


<script src="https://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places"></script>
<!-- <script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script> -->
<script src="{{loadAsset("/js/jquery.geocomplete.js")}}"></script>
<script src="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.js")}}"></script>
<script type="text/javascript">
JModalConfirmMeetingRequest.show_hide_button_group();

var dealId = "{{$deal->dealId}}";
var leadId = "{{$deal->leadId}}";
var isBroadcast = false;
var level = 2;
var firstRun = true;
var noListingEmailTitle = "<?php echo "Propzy thông báo kết quả tìm kiếm " . $deal->request->listingType->typeName . " " . $deal->request->propertyType->typeName; ?>";
var contractFile = [
<?php if ($deal->contractFile): ?>
    "{{$deal->contractFile}}"
<?php endif; ?>
];
var deal = <?php echo json_encode($deal); ?>;
var customerReviewData = <?php echo json_encode($deal->customerReview); ?>;
var loanAdviceData = <?php echo json_encode($deal->bankLoanAdvice); ?>;</script>

<script src="{{loadAsset("/js/deal/commons.js")}}"></script>
<script src="{{loadAsset("/js/deal/detail.js")}}"></script>

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
</style>
@stop