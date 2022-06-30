@extends('layout.default')

@section('content')
<div class="staff-page">

  <div class="row">
    <div class="col-md-12">
      <div class="box box-info">
        <div class="box-header content-header">
          <h1 style="border-bottom: 4px double #000;display:inline-block;">Assign reviews</h1>
        </div>
        <div class="box-body">
          <div class="message">
            <?php if (session()->has('assignAlert') && !session('assignAlert')->result) { ?>
              <div class="alert alert-danger alert-dismissable">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <?= session('assignAlert')->message ?>
              </div>
            <?php } ?>
          </div>
          <div class="row">
            <div class="form-group">
              <label class="control-label col-sm-2">Assign type: </label>
              <?php foreach ($remainingListing as $remainingItem): ?> 
                <span class="col-xs-3">
                  <input type="checkbox" value="{{ $remainingItem->userType->id }}" class="user-type" />
                  {{ $remainingItem->userType->name }}  ({{ $remainingItem->count }})
                </span>
              <?php endforeach ?>
            </div>
          </div>
          <h3>Danh sách Listing</h3>
          <div style="margin-top:16px;" class="listings"></div>
          <form id="mainForm" method="post">
            <input type="hidden" id="staffId" name="staffId" value="{{$staffId}}" />
            <input type="hidden" id="listingIds" name="listingIds" value="" />
            <input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}"> 
            <button class="btn btn-success btnAssign">Assign</button>
          </form>
        </div><!-- /.box-body -->
      </div><!-- /.box -->
    </div>
  </div> 
</div>

@endsection

@section('page-js')   
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrapValidator/language/vi_VN.js")}}"></script>
<script src="{{loadAsset("/js/function.js")}}"></script>    
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script type="text/javascript">
$(document).ready(function () {
  function getListingTable(userTypeIds) {
    var url = "/user/get-assign-reviews-list";
    if (userTypeIds) {
      url += "?userTypeIds=" + userTypeIds;
    }
    $.ajax({
      "type": "get",
      "url": url
    }).success(function (response) {
      $(".listings").html(response);
    });
  }

  getListingTable();
  $(".user-type").on("click", function () {
    var userTypeIds = "";
    $(".user-type").each(function () {
      if ($(this).prop("checked")) {
        userTypeIds += $(this).val() + ",";
      }
    });
    if (userTypeIds !== "") {
      userTypeIds = userTypeIds.substring(0, userTypeIds.length - 1);
    }
    getListingTable(userTypeIds);
  });
  $(".btnAssign").on("click", function (event) {
    event.preventDefault();
    var url = '/user/do-assign-reviews/{{$staffId}}';
    $("#listingIds").val(selectedListingIds);
    $("#mainForm").attr("action", url);
    $.ajax({
      type: "post",
      url: url,
      data: $("#mainForm").serialize()
    }).success(function (response) {
      console.log(response);
      if (response.result !== true) {
        alert(response.message);
      } else {
        window.location = window.location;
      }
    });
  });
});
</script>   
@stop
@section('page-css')
<link href="{{loadAsset("/css/staff.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />

@stop


