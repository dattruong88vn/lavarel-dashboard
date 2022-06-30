@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<?php $csrf_token = csrf_token() ?>
<div class='page-deal'>
    <section>

    </section>

    <section>
        <div class="db-tm-item deal-tm-customer-info">
            <div class="row">
                <div class="col-md-12">                
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">KHÁCH HÀNG</h3>
                        </div>
                        <form class="form-horizontal" id="formCustomerInfo">
                            <div class="box-body">
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Tên khách hàng *</label>
                                    <div class="col-sm-4">
                                        <label class="control-label not-bold">{{$request->customers->name}}</label>
                                        <input type="hidden" name="customerName" id="customerName" value="{{$request->customers->name}}" />
                                        <input type="hidden" id="requestId" name="requestId" value="{{$request->requestId}}" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Phone</label>
                                    <div class="col-sm-4">                                        
                                        <label class="control-label not-bold">{{$request->customers->phone}}</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <button class="btn btn-primary makeCallReminder">Tạo reminder</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Email</label>
                                    <div class="col-sm-4">                                        
                                        <label id="customerEmail" class="control-label not-bold">{{$request->customers->email}}</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Nguồn</label>
                                    <div class="col-sm-4">                            
                                        <label class="control-label not-bold">{{$request->sourceName}}</label>
                                        <label class="control-label not-bold">{{$request->sourceOther}}</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Đối tượng</label>
                                    <div class="col-sm-4">
                                        <label class="control-label not-bold">{{$request->subjectName}}</label>
                                    </div>
                                    <label for="" class="col-sm-2 control-label">Thiết bị</label>
                                    <div class="col-sm-4">
                                        <label class="control-label not-bold">{{$request->device}}</label>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Do môi giới nào giới thiệu?</label>
                                    <div class="col-sm-4">
                                        <div name="agentName" class="agentName" value="" >{{!empty($deal->agentName)?$deal->agentName:'N/A'}}</div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Phân loại:</label>
                                    <div class="col-sm-4">
                                        <select id="typeId" name="typeId">
                                            <?php foreach ($dealTypes as $dealType): ?>
                                                <option value="{{$dealType->typeId}}">{{$dealType->typeName}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                        <input type="hidden" id="typeName" name="typeName" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="db-tm-item deal-tm-customer-need">
            <div class="row">
                <div class="col-md-12">                
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">THÔNG TIN NHU CẦU KHÁCH HÀNG</h3>
                        </div>
                        <form class="form-horizontal">
                            <div class="box-body">
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Hình thức giao dịch</label>
                                    <div class="col-sm-4">
                                        <label class="control-label not-bold">{{$request->listingType->typeName}}</label>
                                    </div>
                                    <label for="" class="col-sm-2 control-label">Loại bất động sản</label>
                                    <div class="col-sm-4">
                                        <label class="control-label not-bold">
                                            <?php if ($request->propertyType): ?>
                                                {{$request->propertyType->typeName}}
                                            <?php endif; ?>
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Ngân sách ban đầu (dự trù)</label>
                                    <div class="col-sm-2">
                                        <label>From:</label> <label class="control-label not-bold">{{number_format($request->initialBudget)}}</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <label>To:</label> <label class="control-label not-bold">{{number_format($request->finalBudget)}}</label>
                                    </div>
                                    <label for="" class="col-sm-2 control-label">Ngân sách final</label>
                                    <div class="col-sm-4">
                                        <label class="control-label not-bold">{{number_format($deal->newPrice)}}</label>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Ngân sách ban đầu<br/>(Fixed)</label>
                                    <div class="col-sm-4">
                                        <input type="text" id="initialBudgetFixed" name="initialBudgetFixed" value="{{number_format($request->initialBudgetFixed)}}">
                                    </div>
                                </div>

                            </div>

                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Quận</label>
                                <div class="col-sm-10">
                                    <?php foreach ($deal->districtList as $district): ?>
                                        <div class="col-sm-4" >
                                            <label class='<?php echo $district->districtId == $isPreferedDistrict ? "prefered" : ""; ?>'>
                                                <input class="districts" type="checkbox" name="districtId[]" value="{{$district->districtId}}" <?php echo in_array($district->districtId, $currentDistricts) ? "checked='checked'" : ""; ?> disabled="disabled" />
                                                {{$district->districtName}}
                                            </label>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Hướng</label>
                                <div class="col-sm-10">
                                    <?php foreach ($deal->directionList as $direction): ?>
                                        <div class="col-sm-4" >
                                            <label class='<?php echo $direction->directionId == $isPreferedDirection ? "prefered" : ""; ?>'>
                                                <input class="districts" type="checkbox" name="directions[]" value="{{$direction->directionId}}" <?php echo in_array($direction->directionId, $currentDirections) ? "checked='checked'" : ""; ?> readonly="readonly"  disabled="disabled"  />
                                                {{$direction->directionName}}
                                            </label>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Số phòng ngủ:</label>
                                <div class="col-sm-2">
                                    <label class="control-label not-bold">{{$request->bedRooms}}</label>
                                </div>
                                <label for="" class="col-sm-2 control-label">Số phòng tắm:</label>
                                <div class="col-sm-2">
                                    <label class="control-label not-bold">{{$request->bathRooms}}</label>
                                </div>
                                <label for="" class="col-sm-2 control-label">Diện tích:</label>
                                <div class="col-sm-2">
                                    <label class="control-label not-bold">{{$request->minSize}} => {{$request->maxSize}}</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Ngày dự tính dọn vào:</label>
                                <div class="col-sm-4">
                                    <label class="control-label not-bold">{{date('d/m/Y',$request->moveInDate/1000)}}</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Ghi chú:</label>
                                <div class="col-sm-4">
                                    <label class="control-label not-bold">{{$request->note}}</label>
                                </div>
                            </div>
                            <a id="btnBroadcast" href="#" class="btn btn-warning">Broadcast</a>
                    </div>
                    </form>
                </div>
            </div>
        </div>
</div>

<div class="db-tm-item deal-tm-deal-info">
    <div class="row">
        <div class="col-md-12">                
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">THÔNG TIN DEAL</h3>
                </div>
                <form id="dealInformation" class="form-horizontal">
                    <input type="hidden" id="csrf-token" name="_token" value="{{$csrf_token}}" />
                    <input type="hidden" id="dealId" name="dealId" value="{{$deal->dealId}}" />
                    <input type="hidden" id="leadId" value="{{$deal->leadId}}" />
                    <div class="box-body">
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">Trạng thái giao dịch</label>
                            <div class="col-sm-4">
                                <select id="statusId" name="statusId"  class="form-control">
                                    <?php foreach ($statusList as $status): ?>
                                        <option value="{{$status->statusId}}" <?php echo $status->statusId == $deal->statusId ? "selected='selected'" : ""; ?> >{{$status->statusName}}</option>
                                    <?php endforeach; ?>
                                </select>
                                <!--<input type="hidden" name="statusName" id="statusName" value="" />-->
                            </div>
                            <label for="" class="col-sm-3 control-label">Số listing đi xem lần này</label>
                            <div class="col-sm-2">
                                <ul class="numberOfListingsView"  style="list-style: none">
                                    <?php foreach ($deal->rlistingViewsList as $rlistingView): ?>
                                        <li>{{$rlistingView->numberOfListings}}</li>
                                    <?php endforeach; ?>
                                </ul>
                                <input id="numberOfListingView" type="text" class="form-control" value="" />
                            </div>
                            <div class="col-sm-1">
                                <a href="#" class="btn btn-primary btnAddNumberOfListingView">Add</a>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">Sales đang phụ trách</label>
                            <div class="col-sm-4">
                                <div id="lbSaleName">{{$deal->saleName}}</div>
                                <input type="hidden" id="saleId" name="saleId" value="{{$deal->saleId}}" />
                                <input type="hidden" id="saleName" name="saleName" value="{{$deal->saleName}}" />

                            </div>
                            <div class="col-sm-1">
                                <a class="btn btn-primary btn-select-toggle">
                                    <?= empty($deal->saleId) ? 'Assign' : 'Reassign'; ?>
                                </a>
                            </div>
                            <div class="col-sm-5 select-toggle">
                                <select id="reassignSale" class="form-control select2" style="width:100%">
                                    <option value="">--- Chọn sale ---</option>
                                    <?php foreach ($sales as $sale): ?>
                                        <option value="{{$sale->agentId}}">{{$sale->name}}</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">AM đang tham gia</label>
                                <div class="col-sm-10">
                                    <select id="accountManagerId" name="accountManagerId" class="form-control">
                                        <option value="">--- Chọn AM ---</option>
                                        <?php foreach ($amList as $am): ?>
                                            <option <?php echo $am->userId == $deal->accountManagerId ? "selected='selected'" : ""; ?> value="{{$am->userId}}" >
                                                {{$am->name}}
                                            </option>
                                        <?php endforeach; ?>
                                    </select>
                                    <input type="hidden" id="accountManagerName" name="accountManagerName" value="{{$deal->accountManagerName}}" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Môi giới đang tham gia</label>
                                <div class="col-sm-10">
                                    <select id="agentId" name="agentId" class="form-control select2" style="width: 100%;">
                                        <option value="">--- Chọn môi giới ---</option>
                                        <?php foreach ($listingAgents as $listingAgent): ?>
                                            <option <?php echo ($listingAgent->agentId == $deal->agentId) ? "selected='selected'" : ""; ?> value="{{$listingAgent->agentId}}">{{$listingAgent->name}}</option>
                                        <?php endforeach; ?>
                                    </select>
                                    <input type="hidden" id="agentName" name="agentName" value="{{$deal->agentName}}" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Tồng số listing đã xem đến thời điểm hiện tại:</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <table class="table table-bordered">
                                <tr>
                                    <th>Ngày Assign</th>
                                    <th>Tên Sale</th>
                                </tr>
                                <?php foreach ($deal->history as $his): ?>
                                    <tr>
                                        <td>{{date('d/m/Y H:i:s',$his->assignedDate/1000)}}</td>
                                        <td>{{$his->saleName}}</td>
                                    </tr>
                                <?php endforeach; ?>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="db-tm-item deal-tm-listing-info-1">
    <div class="row">
        <div class="col-md-12">                
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">THÔNG TIN LISTING</h3>
                </div>

                <div class="box-body">
                    <div id="customer-listings" class="row">
                    </div>
                    <button id="btnFindListing" class="btn btn-success martop-txt">Tìm thêm listing tương tự</button>
                    <a id="btnOpenListingScheduleForm" href="#" class="btn btn-warning martop-txt">Đặt lịch xem</a>
                    <a id="btnContinueListingScheduleForm" href="#" class="btn btn-warning martop-txt">Thêm xong</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="briefForm">
    <div class="box box-primary">

        <div class="box-header">
            <h4 class="list-bt-tm">Brief form mới</h4>
        </div>
        <div class="box-body">
            <table id="brief-form-list"  class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Hình</th>
                        <!--<th>Tên</th>-->
                        <th>Địa chỉ</th>
                        <!--<th>Điện thoại</th>-->
                        <th>Note</th>  
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div>
                <a id="btnOpenBriefFormScheduleForm" href="#" class="btn btn-warning martop-txt">Đặt lịch xem</a>
                <a id="btnContinueBriefFormScheduleForm" href="#" class="btn btn-warning martop-txt">Thêm xong</a>
            </div>
        </div>
    </div>
</div>

<div class="db-tm-item deal-tm-listing-info-2">
    <div class="row">
        <div class="col-md-12">                
            <div class="box box-primary">

                <div class="box-header">
                    <h4 class="list-bt-tm">Tin đăng gửi khách</h4>
                </div>

                <div class="box-body">
                    <table id="listing-to-send"  class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Chọn ĐLX</th>
                                <th>LID</th>
                                <th>Photo</th>
                                <th>Sổ đỏ</th>
                                <th>Sổ hồng</th>
                                <th>Hướng</th>                                
                                <th width="101px">Rộng x Dài</th>   
                                <th>Bed</th>
                                <th>Bath</th>
                                <th>Size</th>
                                <th>Price (VNĐ)</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th class="text-center">Deactivate</th>
                                <th class="text-center">Khách chọn đi xem</th>
                                <th>Call Reminder</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                    <a id="btnEmailToCustomer" href="#" class="btn btn-success martop-txt">Email to KH</a>
                    <a id="btnEmailNoListingToCustomer" href="#" class="btn btn-danger martop-txt">Gửi mail không có hàng</a>
                </div>
            </div>
        </div>
    </div>
</div>




<section class="box box-primary">
    <div class="box-header">
        <div class="box-title"><span>Thông tin listing tương tự</span></div>
        <label class="pull-right"><input type="checkbox" id="selectAllListing" /> Chọn tất cả</label>
    </div>
    <div class="box-body">
        <div id="listings" style="margin-bottom:32px;">
        </div>
    </div>
</section>

<section class="box box-primary">
    <div class="box-header">
        <div class="box-title"><span>Thông tin Deal</span></div>
    </div>
    <div class="box-body">
        <form class="form-horizontal">
            <?php if (!empty($deal->lastActivityName)): ?>
                <div class="form-group">
                    <label class="col-sm-3">Last activity</label>
                    <div class="col-sm-3">{{$deal->lastActivityName or ''}}</div>
                    <label class="col-sm-3">Day of last activity</label>
                    <div class="col-sm-3"><?php echo \App\Libraries\PropzyCommons::showEllapseTime($deal->lastActivityDate / 1000); ?></div>
                </div>
            <?php endif; ?>
            <div class="form-group">
                <label class="col-sm-3">Ngày từ lead chuyển thành deal</label>
                <div class="col-sm-3">{{date('d/m/Y H:i:s',$deal->createdDate/1000)}}</div>
                <label class="col-sm-3">Số ngày của deal</label>
                <div class="col-sm-3"><?php echo \App\Libraries\PropzyCommons::showEllapseTime($deal->createdDate / 1000) ?></div>
            </div>
        </form>
    </div>
</section>

<div class="db-tm-item deal-tm-stream">
    <div class="row">
        <div class="col-md-12">                
            <div class="box box-primary">
                <div class="box-body">
                    <div class="nav-tabs-stream">
                        <ul class="nav nav-tabs">
                            <li><a href="#tab_stream_1" data-toggle="tab">Stream</a></li>
                            <li class="active"><a href="#tab_stream_2" data-toggle="tab">Activity</a></li>
                            <li><a href="#tab_stream_3" data-toggle="tab">Products</a></li>
                            <li><a href="#tab_history" data-toggle="tab">History</a></li>
                            <li><a href="#tab_notes" data-toggle="tab">notes</a></li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="tab_stream_2">
                                <div class="nav-tabs-events">
                                    <ul class="nav nav-tabs">
                                        <li class="active">
                                            <a class="tab_events" href="#tab_events_1" data-type=-1 data-toggle="tab">+ All</a>
                                        </li>
                                        <li>
                                            <a class="tab_events" href="#tab_events_2" data-toggle="tab" data-type=1>+ Meeting</a>
                                        </li>
                                        <li>
                                            <a class="tab_events" href="#tab_events_3" data-toggle="tab" data-type=2>+ Call</a>
                                        </li>
                                        <li>
                                            <a class="tab_events" href="#tab_events_4" data-toggle="tab" data-type=3>+ Event</a>
                                        </li>
                                        <li>
                                            <a class="tab_events" href="#tab_events_5" data-toggle="tab" data-type=4>+ Email</a>
                                        </li>

                                        <li>
                                            <a class="tab_events" href="#tab_events_6" data-toggle="tab" data-type=5>+ Đặt lịch xem</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="tab_events_content"  style="padding-top: 32px;">
                                            <table class="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Nội dung</th>
                                                        <th>Deadline</th>
                                                        <th>Contact</th>
                                                        <th>Responsible person</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div><div class="tab-content tab-content-schedule">
                                        <div class="tab-pane active" id="tab_schedule_content"  style="padding-top: 32px;">
                                            <table class="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Mã KH</th>
                                                        <th>Tên KH</th>
                                                        <th>Số ĐT</th>
                                                        <th>Ngày tạo</th>
                                                        <th>Ngày hẹn đi xem</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="tab_stream_2">
                                Activity
                            </div>
                            <div class="tab-pane" id="tab_stream_3">
                                Products
                            </div>
                            <div class="tab-pane" id="tab_history">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>His ID</th>
                                            <th>Edited by</th>
                                            <th>Districts</th>
                                            <th>Directions</th>
                                            <th>Price from</th>
                                            <th>Price  to</th>
                                            <th>Area from</th>
                                            <th>Area to</th>
                                            <th>Bed</th>
                                            <th>Bath</th>
                                            <th>Mộ tả</th>
                                            <th>Ngày tạo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane" id="tab_notes">
                                <div class="col-xs-12">
                                    <div>
                                        <ul class="notesList">

                                        </ul>
                                    </div>
                                    <div class="form-group">
                                        <textarea class="txtComment form-control" rows="8"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <button type="button" id="btnSaveComment" class="btn btn-danger">Gửi</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="button-group">
                            <div class="col-sm-3">
                                <select multiple="" class="form-control select-toggle-stream">
                                    <option>option 1</option>
                                    <option>option 2</option>
                                    <option>option 3</option>
                                    <option>option 4</option>
                                    <option>option 5</option>
                                </select>
                            </div>
                            <div style="position:fixed;bottom:0px;right:0px;z-index:1000000">
                                <?php if (!$request->customers->isOld): ?>
                                    <button type="button" id="btnSetOldCustomer" class="btn btn-success">Khách hàng cũ</button>
                                <?php endif; ?>
                                <button type="button" id="btnShowPaymentRequestForm" class="btn btn-success">Yêu cầu thanh toán</button>
                                <button type="button" id="btnShowLoanAdviceForm" class="btn btn-success">Tư vấn vay vốn</button>
                                <button type="button" id="btnShowCustomerReviewForm" class="btn btn-success">Form đánh giá khách hàng</button>
                                <button id="btnShowSendContract" {{$deal->contractFile?"":"disabled"}} class="btn btn-success margin">{{$deal->isSentContract?"Gửi lại hợp đồng":"Gửi hợp đồng"}}</button>
                                <button id="btnShowUploadContract" class="btn btn-success margin">{{$deal->contractFile?"Reupload hợp đồng":"Upload hợp đồng"}}</button>
                                <button id="btnSaveDeal" class="btn btn-success margin">Save</button>
                                <button id="btnShowEventForm" class="btn btn-success margin">Tạo Event</button>
                                <a href="#" class="btn btn-warning">Generate to invoice</a>
                            </div>
                        </div>					
                    </div>
                </div>
            </div>
        </div>
    </div>
    <section id="customerForm">
    </section>
</div>


@include("deal.form-call-reminder")
@include("deal.form-meeting-reminder")
@include("deal.form-event-reminder")
@include('deal.email-listing-to-customer-modal')
@include('deal.email-contract-to-customer-modal')
@include('deal.form-payment-request')
@include('deal.modal-schedule')

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
var customerReviewData = <?php echo json_encode($deal->customerReview); ?>;
var loanAdviceData = <?php echo json_encode($deal->bankLoanAdvice); ?>;</script>

<script src="{{loadAsset("/js/deal/commons.js")}}"></script>
<script src="{{loadAsset("/js/deal/update.js")}}"></script>

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