@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class='page-request'>
    <?php $csrf_token = csrf_token() ?>
    <input type="hidden" id="csrf-token" name="_token" value="{{$csrf_token}}" />
    <form method="post" id="formCustomerInfo" class="form-horizontal">
        <section>
            <div class="db-tm-item deal-tm-customer-info">
                <div class="row">
                    <div class="col-md-12">                
                        <div class="box box-primary">
                            <div class="box-header with-border">
                                <h3 class="box-title">THÔNG TIN VÀ NHU CẦU KHÁCH HÀNG {{$request->customerId}}</h3>
                            </div>
                            <input type="hidden" id="orderId" value="{{$orderId}}" />
                            <input type="hidden" id="customerId" name="customerId" value="{{$request->customerId}}" />
                            <input type="hidden" id="requestId" name="requestId" value="{{$request->requestId}}" />
                            <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-sm-5">
                                        <div class="form-group">
                                            <label for="" class="col-sm-4 control-label">Tên khách hàng *</label>
                                            <div class="col-sm-8">
                                                <label class="control-label no-bold">{{$request->customers->name}}</label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="" class="col-sm-4 control-label">Phone</label>
                                            <div class="col-sm-8">
                                                <div class="input-group">
                                                    <label class="control-label no-bold">{{$request->customers->phone}}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="" class="col-sm-4 control-label">Email</label>
                                            <div class="col-sm-8">
                                                <div class="input-group">
                                                    <label class="control-label no-bold">{{$request->customers->email}}</label>
                                                </div>
                                                <div class="errors"></div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="" class="col-sm-4 control-label">Hình thức giao dịch *</label>
                                            <div class="col-sm-8">
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
                                        <div class="form-group">
                                            <label for="" class="col-sm-4 control-label">Loại bất động sản</label>
                                            <div class="col-sm-8">
                                                <select name="propertyTypeId" id="propertyTypeId" class="form-control" style="width: 100%;">
                                                    <?php foreach ($propertyTypes as $propertyType): ?>
                                                        <option value="{{$propertyType->propertyTypeID}}" <?php echo $propertyType->propertyTypeID == $request->propertyTypeId ? "selected='selected'" : ""; ?> >{{$propertyType->typeName}}</option>
                                                    <?php endforeach; ?>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-7">
                                        <div class="form-group">
                                            <label for="" class="col-sm-2 control-label">Quận (*)</label>
                                            <div class="col-sm-10">
                                                <div class="errors district-errors"></div>
                                                <?php foreach ($districts as $district): ?>
                                                    <div class="col-sm-6" >
                                                        <?php if (in_array($district->districtId, $currentDistricts)): ?>
                                                            <label>
                                                                <input class="districts" type="checkbox" name="districtId[]" value="{{$district->districtId}}" <?php echo in_array($district->districtId, $currentDistricts) ? "checked='checked'" : ""; ?>>
                                                                {{$district->districtName}}
                                                            </label>
                                                            <span>
                                                                <input type="radio" name="isPrefered" class="isPrefered" value="{{$district->districtId}}" <?php echo $district->districtId == $isPreferedDistrict ? "checked='checked'" : ""; ?> >
                                                                Prefered
                                                            </span>
                                                        <?php endif; ?>
                                                    </div>
                                                <?php endforeach; ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Ngân sách ban đầu<br/>(dự trù)</label>
                                    <div class="col-sm-2">
                                        <label class="control-label no-bold">{{number_format($request->initialBudget)}}</label>
                                    </div>
                                    <label for="" class="col-sm-2 control-label">ĐẾN</label>
                                    <div class="col-sm-2">
                                        <label class="control-label no-bold">{{number_format($request->finalBudget)}}</label>
                                    </div>
                                    <div class="col-sm-2">
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
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Diện tích:</label>
                                    <div class="col-sm-2">
                                        <label class="control-label no-bold">{{$request->minSize}}</label>
                                    </div>
                                    <label for="" class="col-sm-2 control-label">to</label>
                                    <div class="col-sm-2">
                                        <label class="control-label no-bold">{{$request->maxSize}}</label>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Hướng:</label>
                                    <div class="col-sm-10">
                                        <?php foreach ($directions as $direction): ?>
                                            <div class="checkbox col-sm-3" >
                                                <?php if (in_array($direction->dId, $currentDirections)): ?>
                                                    <label class="no-bold"><input type="checkbox" value="{{$direction->dId}}" name="directions[]" class="directions direction-{{$direction->dId}}" <?php echo in_array($direction->dId, $currentDirections) ? "checked='checked'" : "" ?> /> {{$direction->directionName}}</label>
                                                    <label><input type="radio" name="isPreferedDirection" class="isPreferedDirection" value="{{$direction->dId}}" <?php echo in_array($direction->dId, $currentDirections) ? "checked='checked'" : ""; ?> />Prefered</label>
                                                <?php endif; ?>
                                            </div>
                                        <?php endforeach; ?>                                        
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Lưu ý khác</label>
                                    <div class="col-sm-10">
                                        <label class="control-label no-bold">{{$request->note}}</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Bed</label>
                                    <div class="col-sm-2">
                                        <label class="control-label no-bold">{{$request->bedRooms}}</label>
                                    </div>
                                    <label for="" class="col-sm-2 control-label">Bath</label>
                                    <div class="col-sm-2">
                                        <label class="control-label no-bold">{{$request->bathRooms}}</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Tiện ích</label>
                                    <div class="col-sm-10" id="amenities">
                                        <div class="amenity-content">
                                            <?php foreach ($amenities as $amenity): ?>
                                                <div class="col-md-3 utilitie-item-content">
                                                    <?php if (in_array($amenity->id, $currentAmenities)): ?>
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
                                                    <?php endif; ?>
                                                </div>
                                            <?php endforeach; ?>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Ngày dự tính dọn vào</label>
                                    <div class="col-sm-4">
                                        <div class="input-group date" data-provide="datepicker">
                                            <?php
                                            if ($request->moveInDate) {
                                                $request->moveInDate = date('m/d/Y', $request->moveInDate / 1000);
                                            } else {
                                                $request->moveInDate = NULL;
                                            }
                                            ?>
                                            <label class="control-label no-bold">{{$request->moveInDate}}</label>
                                        </div>
                                        <div class="errors"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Nguồn *</label>
                                    <div class="col-sm-4">
                                        <label class="control-label no-bold">{{$request->sourceName}}</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Status</label>
                                    <div class="col-sm-4">                                        
                                        <label class="control-label no-bold">{{$request->statusName}}</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Responsible person</label>
                                    <div class="col-sm-4">
                                        <select id="assignedTo" name="assignedTo"  class="form-control">
                                            <option value=""></option>
                                            <option value={{$userId}}  <?php echo $userId == $request->assignedTo ? "selected='selected'" : ""; ?>  >{{$userName}}</option>
                                            <?php
                                            if ($accounts):
                                                foreach ($accounts as $account):
                                                    ?>
                                                    <option value="{{$account->userId}}" <?php echo $account->userId == $request->assignedTo ? "selected='selected'" : ""; ?>  >{{$account->name}}</option>
                                                    <?php
                                                endforeach;
                                            endif;
                                            ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Đối tượng *</label>
                                    <div class="col-sm-2">
                                        <label class="control-label no-bold">{{$request->subjectName}}</label>
                                    </div>
                                    <label for="" class="col-sm-2 control-label">Thiết bị</label>
                                    <div class="col-sm-2">
                                        <label class="control-label no-bold">{{$request->device}}</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Do môi giới nào giới thiệu?</label>
                                    <div class="col-sm-4">
                                        <select id="agentId" name="agentId" class="form-control">
                                            <option value=""></option>
                                            <?php foreach ($agents as $agent): ?>
                                                <option value="{{$agent->agentId}}" <?php echo $agent->agentId == $request->agentId ? "selected='selected'" : ""; ?>  >{{$agent->name}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                        <input type="hidden" name="agentName" id="agentName" value="" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Khả năng đáp ứng thị trường (%)</label>
                                    <div class="col-sm-4">
                                        <label class="control-label no-bold">{{$request->responsiveness}}</label>
                                    </div>
                                </div>
                                <div class="btn-group-request hidden" style="position:fixed;bottom:0px;right:0px;z-index: 100000000">
                                    <button type="button" id="createLead" class="btn btn-success">Tạo lead</button>
                                    <button type="button" id="saveAndUpdate" class="btn btn-warning margin">Lưu Request và update sau</button>
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
                                            <th>Price (USD)</th>
                                            <th>Price (in VNĐ)</th>
                                            <th>Location</th>
                                            <th>Source</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php for ($i = 0; $i < 6; $i++): ?>
                                            <tr>
                                                <td>{{$i}}</td>
                                                <td>{{$i}}</td>
                                                <td>{{$i}}</td>
                                                <td>{{$i}}</td>
                                                <td>{{$i}}</td>
                                                <td>{{$i}}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        <?php endfor; ?>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </form>
    <section class="box">
        <div class="box-header">
            <div>Notes</div>
            <hr />
        </div>
        <div class="box-body" id="tab_notes">
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
    </section>
</div>

<!-- agent call -->
<div id="agentCallReminderModal" class="modal fade db-tm-item" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title text-center">THÔNG BÁO</h4>
            </div>
            <div class="modal-body">
                <h4>Số điện thoại này có thể thuộc về môi giới sau đây:</h4>
                <div class="form-group row">
                    <div class="col-sm-3">
                        <img src="http://dummyimage.com/600x400" class="thumbnail" style="width:100%" />
                    </div>
                    <div class="col-sm-9">
                        <table id="agent-info"  class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Tên</th>
                                    <th>Chuyên môn</th>
                                    <th>SDT</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="text-center">
                        <a href="#" class="margin"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a>
                        <a href="#" class="margin"><span class="icon-st-item"><i class="fa fa-envelope"></i></span></a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
<!-- end agent call -->

<!-- agent call -->
<div id="customerCallReminderModal" class="modal fade db-tm-item" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title text-center">THÔNG BÁO</h4>
            </div>
            <div class="modal-body">
                <h4>Số điện thoại này có thể thuộc về khách hàng sau đây:</h4>
                <div class="form-group row">
                    <div class="col-sm-3">
                        <img src="http://dummyimage.com/600x400" class="thumbnail" style="width:100%" />
                    </div>
                    <div class="col-sm-9">
                        <table id="agent-info"  class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Tên</th>
                                    <th>Trạng thái của giao dịch gần đây nhất</th>
                                    <th>SDT</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="text-center">
                        <a href="#" class="margin"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a>
                        <a href="#" class="margin"><span class="icon-st-item"><i class="fa fa-envelope"></i></span></a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
<!-- end agent call -->

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
                        <textarea id="areaMissingInfo" name="areaMissingInfo" rows="6" class="form-control">{{$request->missingInfo}}</textarea>
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

@endsection



@extends('templates.amenities-item')
@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-mask/jquery.mask.js")}}"></script>
<script src="{{loadAsset("js/helper.js")}}"></script>

<script src="{{loadAsset("/js/template7.min.js")}}"></script>

<script type="text/javascript">
var level = 2;
var firstRun = true;

var noteList = <?php echo json_encode($notesList) ?>;
showNoteList(noteList);
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});
$(document).ready(function () {
    $("input, select").prop("disabled", true);
    repopulateTuTrachChecked('input.directions');
    $('#initialBudget').mask("#,##0", {reverse: true});
    $('#finalBudget').mask("#,##0", {reverse: true});
});
function getPropertyTypes(listingTypeId) {
    $.ajax({
        url: '/common/get-property-type/' + listingTypeId,
        type: 'get'
    }).done(function (response) {
        var html = "";
        for (i = 0; i < response.length; i++) {
            var item = response[i];
            html += "<option value='" + item.propertyTypeID + "'>" + item.typeName + "</option>";
        }
        $("#propertyTypeId").html(html).select2();
        if (firstRun) {
            propertyTypeId = $('#propertyTypeId').val();
            getAmedities(listingTypeId, propertyTypeId);
            firstRun = false;
        }
    }).always(function () {

    });
}


function getAmedities(listingTypeId, propertyTypeId) {
    url = "/get-amenities/" + listingTypeId + "/" + propertyTypeId + '/' + level;
    console.log(url);
    get_sync(url, true, function (data) {
        var template = $('#tien-ich-tmpl').html();
        var compiledTemplate = Template7.compile(template);
        $('#amenities').html(compiledTemplate(data));
        $('#amenities input').attr('name', 'amenityId[]');
    });

}
function prepareForm() {
    $("#sourceName").val($("#sourceId").find('option:selected').text());
    $("#subjectName").val($("#subjectId").find('option:selected').text());
    $("#statusName").val($("#statusId").find('option:selected').text());
    $("#agentName").val($("#agentId").find('option:selected').text());
}
function validateForm() {

    var isValidated = true;
    $(".errors").text("");
    message = "Có lỗi xảy ra. Vui lòng kiểm tra dữ liệu của bạn.";

    var customerName = $("#customerName").val().trim();
    if (customerName === "") {
        isValidated = false;
        $("#customerName").parent().find(".errors").html("Nhập tên khách hàng!");
    }

    /*
     var moveInDate = $("#moveInDate").val().trim();
     if (moveInDate === "") {
     isValidated = false;
     $("#moveInDate").parent().parent().find(".errors").html("Chọn ngày dọn vào!");
     }
     if ($("#minSize").val().trim() === "") {
     isValidated = false;
     $("#minSize").parent().find(".errors").html("Nhập diện tích nhỏ nhất!");
     }
     if ($("#maxSize").val().trim() === "") {
     isValidated = false;
     $("#maxSize").parent().find(".errors").html("Nhập diện tích lớn nhất!");
     }
     */
    if ($(".districts:checked").length <= 0) {
        isValidated = false;
        $(".district-errors").html("Chọn quận");
    }

    var customerPhone = $("#customerPhone").val().trim();
    var customerEmail = $("#customerEmail").val().trim();
    if (customerPhone === "" && customerEmail === "")
    {
        isValidated = false;
        $("#customerPhone").parent().parent().find(".errors").html('Bạn phải nhập sđt hoặc email.');
    } else
    {
        if (customerPhone !== "" && !isPhoneNumber(customerPhone))
        {
            isValidated = false;
            $("#customerPhone").parent().parent().find(".errors").html('Bạn phải nhập chính xác sđt.');
        } else if (customerEmail !== "" && !isEmail(customerEmail))
        {
            isValidated = false;
            $("#customerEmail").parent().parent().find(".errors").html('Bạn phải nhập chính xác Email.');
        }
    }

    if (!isValidated) {
        showPropzyAlert(message);
    }

    return isValidated;
}



$("#btnSaveComment").on("click", function (event) {
    event.preventDefault();
    var note = $(".txtComment").val();
    showPropzyLoading();
    $.ajax({
        url: "/order/add-note",
        type: "POST",
        data: JSON.stringify({
            orderId: $("#orderId").val(),
            note: note
        })
    }).done(function (response) {
        if (response.result) {
            showNoteList(response.data);
        }
    }).always(function () {
        hidePropzyLoading();
    });
});
function showNoteList(noteList) {
    $(".txtComment").val("");
    var notesListHtml = "";
    for (i = 0; i < noteList.length; i++) {
        var item = noteList[i];
        var isMine = item.isMine ? "isMine" : "";
        var photo = item.photo ? item.photo : "/images/icon-tm.png";
        notesListHtml += "<li class='" + isMine + " row' >";
        notesListHtml += "<img src='" + photo + "' /><div><b>" + (item.name?item.name:"") + "</b> - <i>" + moment(item.createdDate).format("DD/MM/YYYY HH:mm:ss") + "</i></div>";
        notesListHtml += "<div>" + item.note + "</div>";
        notesListHtml += "</li>";
    }
    $(".notesList").html(notesListHtml);

}
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/css/listing-create.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<style>
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
</style>
@stop