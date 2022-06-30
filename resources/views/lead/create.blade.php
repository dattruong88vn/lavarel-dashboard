@extends('layout.default')

@section('content')

<div class='dashboard'>
    <form method="post" id="formCustomerInfo" class="form-horizontal">
        <section>
            <div class="db-tm-item deal-tm-customer-info">
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-primary">
                            <div class="box-header with-border">
                                <h3 class="box-title">THÔNG TIN KHÁCH HÀNG {{$customerId}}</h3>
                            </div>
                            <input type="hidden" id="customerId" name="customerId" value="{{$customerId}}" />
                            <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
                            <div class="box-body">
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Tên khách hàng *</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="customerName" name="customerName" placeholder="Tên khách hàng">
                                        <div class="errors"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Phone</label>
                                    <div class="col-sm-4">
                                        <div class="input-group">
                                            <input id="customerPhone" name="customerPhone" type="number" class="form-control">
                                            <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Email</label>
                                    <div class="col-sm-4">
                                        <div class="input-group">
                                            <input type="email" name="customerEmail" id="customerEmail" class="form-control">
                                            <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Nguồn *</label>
                                    <div class="col-sm-4">
                                        <select id="sourceId" name="sourceId" class="form-control">
                                            <?php foreach ($sources as $source): ?>
                                                <option value="{{$source->sourceId}}">{{$source->sourceName}}</option>
                                            <?php endforeach; ?>

                                        </select>
                                        <textarea id="sourceOther" name="sourceOther" class="form-control" rows="4" placeholder="Nhập nguồn khác" style="display: none"></textarea>
                                        <input type="hidden" id="sourceName" name="sourceName" value="" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Status</label>
                                    <div class="col-sm-4">
                                        <select id="statusId" name="statusId"  class="form-control">
                                            <?php foreach ($statusList as $status): ?>
                                                <option value="{{$status->statusId}}">{{$status->statusName}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                        <input type="hidden" name="statusName" id="statusName" value="" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Responsible person</label>
                                    <div class="col-sm-4">
                                        <select id="assignedTo" name="assignedTo"  class="form-control">
                                            <option value={{$userId}} selected="selected">{{$userName}}</option>
                                            <?php foreach ($accounts as $account): ?>
                                                <option value="{{$account->userId}}" >{{$account->name}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Đối tượng *</label>
                                    <div class="col-sm-4">
                                        <select id="subjectId" name="subjectId" class="form-control">
                                            <?php foreach ($subjects as $subject): ?>
                                                <option value="{{$subject->subjectId}}">{{$subject->subjectName}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                        <input type="hidden" name="subjectName" id="subjectName" value="" />
                                    </div>
                                    <label for="" class="col-sm-2 control-label">Thiết bị</label>
                                    <div class="col-sm-4">
                                        <select id="device" name="device" class="form-control">
                                            <option value="N/A">N/A</option>
                                            <option value="Desktop">Desktop</option>
                                            <option value="Mobile">Mobile</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Do môi giới nào giới thiệu?</label>
                                    <div class="col-sm-4">
                                        <select id="agentId" name="agentId" class="form-control">
                                            <option value="">--- chọn môi giới ---</option>
                                            <?php foreach ($agents as $agent): ?>
                                                <option value="{{$agent->agentId}}">{{$agent->name}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                        <input type="hidden" name="agentName" id="agentName" value="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="db-tm-item deal-tm-customer-need">
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-primary">
                            <div class="box-header with-border">
                                <h3 class="box-title">NHU CẦU KHÁCH HÀNG</h3>
                            </div>
                            <div class="box-body">
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Hình thức giao dịch *</label>
                                    <div class="col-sm-4">
                                        <select id="listingTypeId" name="listingTypeId" class="form-control">
                                            <option value=1>Mua</option>
                                            <option value=2>Thuê</option>
                                        </select>
                                    </div>
                                    <label for="" class="col-sm-2 control-label">Ngày dự tính dọn vào *</label>
                                    <div class="col-sm-4">
                                        <div class="input-group date" data-provide="datepicker">
                                            <input id="moveInDate" name="moveInDate" class="form-control" >
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                        <div class="errors"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Loại bất động sản</label>
                                    <div class="col-sm-10">
                                        <select name="propertyTypeId" id="propertyTypeId" class="form-control select2" style="width: 100%;">
                                            <option value="">---Chọn loại bất động sản---</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Ngân sách ban đầu<br/>(dự trù)</label>
                                    <div class="col-sm-4">
                                        <input id="initialBudget" name="initialBudget" type="text" class="form-control" />
                                    </div>
                                    <label for="" class="col-sm-1 control-label">ĐẾN</label>
                                    <div class="col-sm-3">
                                        <input id="finalBudget" name="finalBudget" type="text" class="form-control" />
                                    </div>
                                    <div class="col-sm-2">
                                        <select id="currency" name="currency" class="form-control" >
                                            <option>VND</option>
                                            <option>USD</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Quận (*)</label>
                                    <div class="col-sm-10">
                                        <div class="errors district-errors"></div>
                                        <?php foreach ($districts as $district): ?>
                                            <div class="col-sm-4" >
                                                <label><input class="districts" type="checkbox" name="districtId[]" value="{{$district->districtId}}">{{$district->districtName}}</label>
                                                <span><input type="radio" name="isPrefered" class="isPrefered" value="{{$district->districtId}}">Prefered</span>
                                            </div>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Diện tích:</label>
                                    <div class="col-sm-4">
                                        <input id="minSize" name="minSize" type="number" class="form-control" placeholder="m2">
                                        <div class="errors"></div>
                                    </div>
                                    <label for="" class="col-sm-2 control-label">to</label>
                                    <div class="col-sm-4">
                                        <input id="maxSize" name="maxSize" type="number" class="form-control" placeholder="m2">
                                        <div class="errors"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Bed</label>
                                    <div class="col-sm-4">
                                        <input id="bedRooms" name="bedRooms" type="number" class="form-control" />
                                    </div>
                                    <label for="" class="col-sm-2 control-label">Bath</label>
                                    <div class="col-sm-4">
                                        <input id="bathRooms" name="bathRooms" type="number" class="form-control" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Tiện ích</label>
                                    <div class="col-sm-10" id="amenities">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Lưu ý khác</label>
                                    <div class="col-sm-10">
                                        <textarea id="note" name="note" class="form-control" placeholder="Lưu ý khác"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="btn-group-request">
                <button type="button" id="btnFindListing" class="btn btn-success">Tìm listing phù hợp</button>
                <button type="button" id="btnBroadcast" class="btn btn-warning margin">Broadcast</button>
            </div>
        </section>
    </form>

    <section>
        <h4>Tin đăng khách chọn <a href="#" class="btn btn-success">Tìm listing tương tự</a></h4>
        <table id="pending-requests"  class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>LID</th>
                    <th>Bed</th>
                    <th>Bath</th>
                    <th>Size</th>
                    <th>Price (VNĐ)</th>
                    <th>Address</th>
                    <th>Call owner to<br/>check availability</th>
                    <th class="text-center">Deactive</th>
                    <th>Call Reminder</th>
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
                        <td class="text-center"><i class="fa fa-phone text-green"></i></td>
                        <td class="text-center"><input type="checkbox" /></td>
                        <td><button class="makeCallReminder">Tạo call reminder</button></td>
                    </tr>
                <?php endfor; ?>
            </tbody>
        </table>

        <h4>Tin đăng gửi khách <a href="#" class="btn btn-success">Add more listing</a> <a href="#" class="btn btn-warning">Email to custommers</a></h4>
        <table id="listings-to-send"  class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>LID</th>
                    <th>Bed</th>
                    <th>Bath</th>
                    <th>Size</th>
                    <th>Price (VNĐ)</th>
                    <th>Address</th>
                    <th>Call owner to<br/>check availability</th>
                    <th>Deactive</th>
                    <th>Call Reminder</th>
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
                        <td class="text-center"><i class="fa fa-phone text-green"></i></td>
                        <td><input type="checkbox" /></td>
                        <td><button class="makeCallReminder">Tạo call reminder</button></td>
                    </tr>
                <?php endfor; ?>
            </tbody>
        </table>
    </section>


    <section class="box box-primary">
        <div class="box-header">
            <div class="box-title"><span>Thông tin listing</span></div>
            <label class="pull-right"><input type="checkbox" id="selectAllListing" /> Chọn tất cả</label>
        </div>
        <div class="box-body">
            <div id="listings" style="margin-bottom:32px;">
            </div>
        </div>
    </section>

</div>

<!-- make call -->
<div id="makeCallReminderModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">New call</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <label class="col-sm-2">When</label>
                    <div class="col-sm-10">
                        <input type="text" id="when-date" />
                        <input type="text" id="when-time" />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2"></label>
                    <div class="col-sm-10">
                        <label><input type="checkbox" /> set reminder</label> <input type="text" size="4" /> mins
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2">Type</label>
                    <div class="col-sm-10">Outgoing call</div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2">With</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2">Subject</label>
                    <div class="col-sm-10">
                        <div><input type="text" class="form-control" placeholder="Please specify the call subject." /></div>
                        <div>
                            <textarea class="form-control" rows="6">

                            </textarea>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2">Responsible persion</label>
                    <div class="col-sm-10">
                        <div><input type="text" class="form-control" /></div>
                        <div>status: pending</div>
                        <div>Priority: normal</div>
                    </div>
                </div>
                <div class="form-group text-center">
                    <button class="btn btn-success">Save</button>
                    <a href="#" class="btn btn-danger"  data-dismiss="modal" >Cancel</a>
                </div>
            </div>
            <!--
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
            -->
        </div>

    </div>
</div>
<!-- end make call -->



<!-- alert model -->
<div id="alertModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Thông báo</h4>
            </div>
            <div class="modal-body message">
                <p>Some text in the modal.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>
<!-- end alert modal -->
@endsection


@extends('templates.amenities-item')
@section('page-js')
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>

<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-mask/jquery.mask.js")}}"></script>

<script src="{{loadAsset("/js/template7.min.js")}}"></script>
<script type="text/javascript">
var level = 2;
var firstRun = true;
$(document).ready(function () {

    $('#initialBudget').mask("#,##0", {reverse: true});
    $('#finalBudget').mask("#,##0", {reverse: true});

    getPropertyTypes(1);
    $("#listingTypeId").change(function () {
        var listingTypeId = $(this).val();
        getPropertyTypes(listingTypeId);

        listingTypeId = $('#listingTypeId').val();
        var propertyTypeId = $('#propertyTypeId').val();
        getAmedities(listingTypeId, propertyTypeId);
    });
    $("#propertyTypeId").change(function () {
        listingTypeId = $('#listingTypeId').val();
        propertyTypeId = $('#propertyTypeId').val();
        getAmedities(listingTypeId, propertyTypeId);
    });
    $("#sourceId").change(function () {
        var sourceId = $(this).val();
        $("#sourceOther").val("");
        if (sourceId == 7) {
            $("#sourceOther").show();
        } else {
            $("#sourceOther").hide();
        }
    });

    $("#btnFindListing").on("click", function (event) {
        event.preventDefault();
        prepareForm();
        if (validateForm()) {
            $("#ajax-loading").show();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('#csrf-token').val()
                }
            });

            $.ajax({
                url: "/lead/find-listing",
                data: $("#formCustomerInfo").serialize(),
                type: "post"
            }).done(function (response) {
                $("#listings").html(response);
                //window.location.href = "#listings";
                $('html, body').animate({
                    scrollTop: $("#listings").offset().top - 60
                }, 500);
            }).always(function () {
                $("#ajax-loading").hide();
            });
        }
    });
    $("#createLead").on("click", function (event) {
        event.preventDefault();
        prepareForm();
        if (validateForm()) {
            $("#ajax-loading").show();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('#csrf-token').val()
                }
            });

            $.ajax({
                url: "/request/create-lead",
                data: $("#formCustomerInfo").serialize(),
                type: "post"
            }).done(function (response) {
                if (response.result === true) {
                    window.location = '/lead';
                } else {

                }
            }).always(function () {
                $("#ajax-loading").hide();

            });
        }
    });
    $("#selectAllListing").on("click", function () {
        console.log($(this).attr('checked'));
        $(".selected-listing").prop("checked", $(this).prop('checked'));
    });
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

    var customerName = $("#customerName").val().trim();
    if (customerName === "") {
        isValidated = false;
        $("#customerName").parent().find(".errors").html("Nhập tên khách hàng!");
    }

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

    if ($(".districts:checked").length <= 0) {
        isValidated = false;
        $(".district-errors").html("Chọn quận");
    }

    if (!isValidated) {
        $("#alertModal .message").html("Có lỗi xảy ra. Vui lòng kiểm tra dữ liệu của bạn.");
        $("#alertModal").modal();
    }
    return isValidated;
}
</script>



@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<style>
    .errors{
        color:#f00;
    }
</style>
@stop
