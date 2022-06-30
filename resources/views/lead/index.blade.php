@extends('layout.default')

@section('content')

<div class='dashboard'>
  <div class="text-center">
    <h1 style="margin-top: 0px;">Leads</h1>
    <div><label>Lead ID: </label> 23010303 - auto</div>
  </div>
  <fieldset>
    <legend>Thông tin khách hàng</legend>
    <div class="form-group row">
      <label class="col-md-2">Tên</label>
      <div class="col-md-4" ><input type="text" class="form-control" /></div>
    </div>
    <div class="form-group row">
      <label class="col-md-2">Phone</label>
      <div class="col-md-4"><input type="text" class="form-control" /> </div>
      <div class="col-md-4"><button class="makeCallReminder">Tạo call reminder</button></div>
    </div>
    <div class="form-group row">
      <label class="col-md-2">Email</label>
      <div class="col-md-4"><input type="text" class="form-control" /></div>
    </div>
    <div class="form-group row">
      <label class="col-md-2">Nguồn</label>
      <div class="col-md-4">
        <select class="form-control">
          <option>--- Chọn nguồn ---</option>
        </select>
      </div>
      <div class="col-md-4"><input type="text" placeholder="Nhập nguồn" class="form-control" /></div>
    </div>
    <div class="form-group row">
      <label class="col-md-2">Status</label>
      <div class="col-md-4">
        <select class="form-control" >
          <option>--- Chọn loai lead ---</option>
        </select>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-md-2">Responsible person</label>
      <div class="col-md-4">
        (auto theo configurable settings)
      </div>
    </div>
  </fieldset>
  <fieldset>
    <legend>Nhu cầu</legend>
    <div class="form-group row">
      <label class="col-md-2">Hình thức giao dịch</label>
      <div class="col-md-4">
        <select id="listingType" name="listingType" class="form-control select2" style="width: 100%;">
          <option value="2" >Thuê</option>
          <option value="1">Bán</option>
        </select>
      </div>
      <label class="col-md-2">Loại bất động sản</label>
      <div class="col-md-4">
        <select id="propertyType" name="propertyType" class="form-control select2" style="width: 100%;">
          <?php
          foreach ($propertyTypeList as $propertyType):
            if ($propertyType->listingType->listingTypeID == 2):
              ?>
              <option value="{{ $propertyType->propertyTypeID }}" >{{ $propertyType->typeName }}</option>
              <?php
            endif;
          endforeach;
          ?>
        </select>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2">Ngân sách ban đầu<br />(Dự trù)</label>
      <div class="col-md-4">
        <input type="number" class="form-control" />
      </div>
      <label class="col-md-2 text-danger">Ngân sách final</label>
      <div class="col-md-4">
        <input type="number" class="form-control" />
      </div>
    </div>

    <div class="form-group row">
    </div>

    <div class="form-group row">
      <label class="col-md-2">Quận</label>
      <div class="col-md-10">
        <select name="district" id="district" class="form-control select2 district"style="width: 100%;">
          <?php foreach ($districtList as $district): ?>
            <option value="{{ $district->districtId }}">{{ $district->districtName }}</option>
          <?php endforeach; ?>
        </select>
      </div>
    </div>

    <div class="form-group row">
    </div>

    <div class="form-group row">

      <label class="col-md-2">Diện tích</label>
      <div class="col-md-2">
        <input type="number" class="form-control" />
      </div>
      <label class="col-md-1 text-right">Bed</label>
      <div class="col-md-2">
        <input type="number" class="form-control" />
      </div>

      <label class="col-md-1 text-right">Bath</label>
      <div class="col-md-2">
        <input type="number" class="form-control" />
      </div>
    </div>


    <div class="form-group row">
      <label class="col-md-2">Tiện ích</label>
      <div class="col-md-10">
        <select id="commodity"  multiple="multiple" class="form-control">
          <option value="-1">--- Chọn tiện ích ---</option>
          <?php for ($i = 0; $i < 10; $i++): ?>
            <option value="{{$i}}">{{$i}}</option>
          <?php endfor; ?>
        </select>
      </div>
    </div>
  </fieldset>
  <section>
    <h2  style="border-bottom:double 4px #aaa;display:inline-block;" class="text-green">Thông tin listing</h2>
    <div style="margin-bottom:32px;">
      <?php for ($i = 0; $i < 6; $i++): ?>
        <div class="col-md-4" style="margin-bottom: 16px;">
          <img src="http://dummyimage.com/600x400" class="thumbnail" style="width:100%" />
          <div class="text-center"><input type="checkbox" /> tick chọn</div>
          <div class="text-center">
            LID | SIZE (BED/BATH) | PRICE | ADDRESS
          </div>
        </div>
      <?php endfor; ?>
      <div class="clearfix"></div>
    </div>
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
            <td><button>Tạo call reminder</button></td>
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
            <td><button>Tạo call reminder</button></td>
          </tr>
        <?php endfor; ?>
      </tbody>
    </table>
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
          <a href="#" class="btn btn-danger" >Cancel</a>
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
@endsection

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
<script type="text/javascript">

function get_amenities() {
  var listingTypeId = $('#listingType').val();
  var propertyTypeId = $('#propertyType').val();
  var level = 2;
  var url = "/get-amenities/" + listingTypeId + "/" + propertyTypeId + '/' + level;
  console.log(url);
  get_sync(url, true, function (data) {
    console.log(data);
  });
}
$(document).ready(function () {
  fixDataTableVNSearch("#pending-requests");
  $("#pending-requests").DataTable();
  fixDataTableVNSearch("#listings-to-send");
  $("#listings-to-send").DataTable();
  $(".datepicker").datepicker();
  $("#district").select2();
  $("#commodity").select2();
  $(".makeCallReminder").on("click", function () {
    $("#makeCallReminderModal").modal();
  });
  $('#listingType').change()

});
</script>



@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop
