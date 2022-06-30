@extends('layout.default')

@section('content')
<div class="listing">
    <div class="row">
        <div class="col-md-12">                
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Danh sách Listing</h3>
                </div><!-- /.box-header -->
                <div class="box-body">
                    <div class="row">
                        <form method="GET" action="" accept-charset="UTF-8" class="formFilter">
                        <!--<input type="hidden" name="_token" value="{{ csrf_token() }}">-->
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Building</label>
                                    <select class="form-control select2"  name="building-name" id="building-name" style="width: 100%;">
                                        <option value="">--- Building ---</option>
                                        <?php foreach ($buildingList as $building): ?>
                                            <option value="{{ $building->buildingId }}"
                                                    @if($building->buildingId == $filterList['buildingId']) selected="selected"  @endif 
                                                    >{{ $building->buildingName }}</option>
                                                <?php endforeach; ?>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Loại BĐS</label>
                                    <select class="form-control select2" id="property-type" name="property-type" style="width: 100%;">
                                        <option value="">--- Loại BĐS ---</option>
                                        <?php foreach ($propertyTypeList as $propertyType): ?>
                                            <option value="{{ $propertyType->propertyTypeID }}"
                                                    @if($propertyType->propertyTypeID == $filterList['propertyTypeId']) selected="selected"  @endif 
                                                    >{{ $propertyType->typeName }}</option>
                                                <?php endforeach ?>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Ngày đăng</label>
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-calendar"></i>
                                        </div>

                                        <input type="text" class="form-control pull-right filter-date active" name="date-create" id="date-create"
                                               value="{{ $filterList['createdDate'] or "" }}">

                                    </div><!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Ngày live</label>
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-calendar"></i>
                                        </div>
                                        <input type="text" class="form-control pull-right filter-date active" name="date-live" id="date-live" value="{{ $filterList['reviewedDate'] or "" }}">

                                    </div><!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Ngày xóa</label>
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-calendar"></i>
                                        </div>
                                        <input type="text" class="form-control pull-right filter-date active" name="date-delete" id="date-delete" value="{{ $filterList['deletedDate'] or "" }}">

                                    </div><!-- /.input group -->
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Nguồn Listing</label>
                                    <select class="form-control select2" id="source" name="source" style="width: 100%;">
                                        <option value="">Nguồn Listing</option>
                                        <?php foreach ($userTypeList as $useryType): ?>
                                            <option value="{{ $useryType->id }}" @if($useryType->id == $filterList['source']) selected="selected"  @endif >{{ $useryType->name }}</option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Staff</label>
                                    <select class="form-control select2" id="staffId" name="staffId">
                                        <option value="">--- Chọn staff ---</option>
                                        <?php foreach ($accountList as $account): ?>
                                            <option value="{{$account->userId}}" <?php echo ($account->userId == $filterList['staffId']) ? "selected" : ""; ?>>{{$account->name}}</option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Ngày assigned</label>
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-calendar"></i>
                                        </div>
                                        <input type="text" class="form-control pull-right filter-date active" name="assignedDate" id="assignedDate" value="{{ $filterList['assignedDate'] or "" }}">

                                    </div><!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="hidden" name="isFull" id="isFull" value="{{$isFull}}" />
                                    <button type="submit" class="btn btn-info btnFilter" data-type="1">Lọc đầy đủ</button>
                                    <button type="submit" class="btn btn-info btnFilter" data-type="0">Lọc không đầy đủ</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <table id="table-listing" class="table table-bordered table-striped table-listing">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Loại hình GD</th>
                                <th>Loại BĐS</th>
                                <th>Diện tích</th>
                                <th class="width-col" data-orderable="false">Địa chỉ</th>
                                <th>Quận</th>
                                <th>Ngày assigned</th>
                                <th class="width-col-person" data-orderable="false">Đăng</th>
                                <th class="width-col-person" data-orderable="false">Review/ Live</th>
                                <th>Trạng thái</th>
                                <th data-orderable="false">Nguồn</th>
                                <th data-orderable="false">Cho phép sửa</th>
                                <th class="width-col-person" data-orderable="false">Action</th>

                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                    <div class="pull-left">
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary">Delete</button>
                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                <span class="caret"></span>
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="#">Delete</a></li>
                                <li><a href="#">Deactive</a></li>
                                <li><a href="#">Duplicate</a></li>
                            </ul>
                        </div>
                    </div>
                </div><!-- /.box-body -->                    
            </div><!-- /.box -->
        </div>
    </div>
</div>
<!-- Modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="duplicateListing-modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Thông Báo</h4>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
@endsection

@section('page-js')
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/js/helper.js")}}"></script> 
<script>

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': "{{csrf_token()}}"
    }
});


    $(".btnFilter").removeClass("active");
    var filterType = $("#isFull").val();
    $(".btnFilter").each(function () {
        var dataType = $(this).attr("data-type");
        console.log(dataType);
        if (dataType == filterType) {
            $(this).addClass("active");
        }
    });

function doDuplicate(rListingId) {
    urlDuplicate = "/duplicate/" + rListingId;
    get_sync(urlDuplicate, true, function (data) {
        console.log(data['data'].rListingId);
        //alert('ban da update thanh cong');
        var rlistingD = data['data'].rListingId;
        $('.modal-body').html("<p>Bạn đã duplicate thành công. RListingID mới của bạn là: <b><a target='_blank' href='listing/" + data['data'].rListingId + "'>  " + data['data'].rListingId + "<a></b></p>");
        $('#duplicateListing-modal').modal('show');

    });
    return false;
}
;
$(function () {
    $(".btnFilter").on("click", function (event) {
        event.preventDefault();
        var isFull = $(this).attr("data-type");
        $("#isFull").val(isFull);
        $(".formFilter").submit();
    });

    //fixDataTableVNSearch("#table-listing");
    
    $("#table-listing").DataTable({
        "order": [[0, "desc"]],
        'processing': true,
        'serverSide': true,
        'ajax': '/listing/get-ajax-listing-list?{!!$queryString!!}',
        "scrollX": true,        
        "columnDefs": [
            {
                "targets": [ 11 ],
                "visible": {{$isAdmin?"true":"false"}},
                "searchable": false
            }
        ]
    });

    var dateCreate = $('#date-create').datepicker({
        format: 'dd-mm-yyyy'
    }).on('changeDate', function (e) {
        $(this).parent().find('input[type="hidden"]').val(e.timeStamp)
        filterListing.deletedDate = e.timeStamp;
//console.log(e.timeStamp)
    });

    $('#date-live').datepicker({
        format: 'dd-mm-yyyy'
    }).on('changeDate', function (e) {
        $(this).parent().find('input[type="hidden"]').val(e.timeStamp)
        filterListing.deletedDate = e.timeStamp;
//code
    });
    $('#assignedDate').datepicker({
        format: 'dd-mm-yyyy'
    }).on('changeDate', function (e) {
        $(this).parent().find('input[type="hidden"]').val(e.timeStamp)
        filterListing.deletedDate = e.timeStamp;
//code
    });

    $('#date-delete').datepicker({
        format: 'dd-mm-yyyy'
    }).on('changeDate', function (e) {
        $(this).parent().find('input[type="hidden"]').val(e.timeStamp)
        filterListing.deletedDate = e.timeStamp;
//code
    });


    var filterListing = {
        "buildingId": 83,
        "propertyTypeId": 1,
        "source": "BD",
        "createdDate": 347327460000,
        "reviewedDate": 347327460000,
        "deletedDate": 347327460000
    };






// $("select.form-control, input.filter-date").change(function(){
//     var type = $(this).attr('id');
//     switch(type) {
//         case 'building-name':
//             filterListing.buildingId = parseInt($(this).val());
//             console.log(filterListing.buildingId);
//             break;
//         case 'property-type':
//             filterListing.propertyTypeId = parseInt($(this).val());
//             console.log(filterListing.propertyTypeId);
//             break;
//         case 'source':
//             filterListing.source = parseInt($(this).val());
//             console.log(filterListing.source);
//             break;                      
//         // default:
//         //     default code block
//     }
// });
});


var changeAllowEdit = function (selector, rlistingId) {
    showPropzyLoading();
    var postData = {
        "rlistingId": rlistingId,
        "allowEdit": $(selector).prop("checked")
    };
    $.ajax({
        url: "/listing/change-allow-edit/" + rlistingId,
        type: "post",
        data: JSON.stringify( postData)
    }).done(function (response) {
        showPropzyAlert(response.message);
    }).always(function () {
        hidePropzyLoading();
    });
};
</script>
@stop
@section('page-css')
<link href="{{loadAsset("/css/listing.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
@stop