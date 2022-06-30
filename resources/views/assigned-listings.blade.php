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
                      <!--<button type="submit" class="btn btn-info">Lọc</button>-->


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
                <th class="width-col"  data-orderable="false">Địa chỉ</th>
                <th>Quận</th>
                <th>Ngày assigned</th>
                <th class="width-col-person"  data-orderable="false">Đăng</th>
                <th class="width-col-person"  data-orderable="false">Review/ Live</th>
                <th>Trạng thái</th>
                <th data-orderable="false">Nguồn</th>
                <th>Reassign</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
            <!--
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
            -->
        </div><!-- /.box-body -->                    
      </div><!-- /.box -->
    </div>
  </div>
</div>

<!-- Modal -->
<div id="another-staff-modal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Reasign listing</h4>
      </div>
      <div class="modal-body">
        <h3 class="ajax-message text-danger" style="margin:0px;"></h3>
        <form id="reassign-form">
          <input type="hidden" id="selected-rlisting-id" value="" name="rlistingId" />
          <input type="hidden" name="_token" value="{{csrf_token()}}">
          <select id="user-id" name="userId" class="form-control">
            <option value="">--- Chọn staff ---</option>
            <?php foreach ($staffs as $staff) { ?>
              <option value="{{$staff->userId}}">{{$staff->name}}</option>
            <?php } ?>
          </select>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" id="btn-assign">Chuyển</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Đóng lại</button>
      </div>
    </div>

  </div>
</div>

@endsection

@section('page-js')
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/js/helper.js")}}"></script> 
<script type="text/javascript">
    


    $(".btnFilter").removeClass("active");
    var filterType = $("#isFull").val();
    $(".btnFilter").each(function () {
        var dataType = $(this).attr("data-type");
        console.log(dataType);
        if (dataType == filterType) {
            $(this).addClass("active");
        }
    });
    
function reassign(rListingId) {
  $("#selected-rlisting-id").val(rListingId);
  $("#another-staff-modal").modal();
  return false;
}

    $(".btnFilter").on("click", function(event){
        event.preventDefault();
        var isFull = $(this).attr("data-type");
        $("#isFull").val(isFull);
        $(".formFilter").submit();
    });
    
$("#btn-assign").on('click', function (event) {
  event.preventDefault();
  if ($("#user-id").val() === "") {
    alert("Chọn staff");
    return;
  }
  var postUrl = "/listing/reassign";
  var postItem = {
    "rlistingId": $("#selected-rlisting-id").val(),
    "userId": $("#user-id").val()
  }
  $.ajax({
    url: postUrl,
    type: "POST",
    data: $("#reassign-form").serialize()
  }).success(function (response) {
    $(".ajax-message").html(response.message);
    if (response.result === true) {
      window.location = window.location;
    }
  });
});
$(function () {

  $.ajaxSetup({
    headers: {
      'X-XSRF-TOKEN': "{{csrf_token()}}"
    }
  });
  //fixDataTableVNSearch("#table-listing");
  $("#table-listing").DataTable({
    "order": [[0, "desc"]],
    'processing': true,
    'serverSide': true,
    'ajax': '/listing/get-assigned-listings?{!!$queryString!!}',
    "scrollX": true
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

  $('#date-delete').datepicker({
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


  var filterListing = {
    "buildingId": 83,
    "propertyTypeId": 1,
    "source": "BD",
    "createdDate": 347327460000,
    "reviewedDate": 347327460000,
    "deletedDate": 347327460000
  }


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

</script>
@stop
@section('page-css')
<link href="{{loadAsset("/css/listing.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
@stop