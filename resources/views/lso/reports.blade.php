@extends('layout.default')
@section('content')
<!-- Hidden field -->
<input type="hidden" id="hiddenUserId" value="{{$loggedInUser->userId}}">
{{ csrf_field() }}
<div id="reportCombined" class='dashboard' v-cloak>
   <h3 class="box-title">Báo cáo kết hợp</h3>   
   <div class="row">
      <div class="col-xs-12">
         <div class="box">
            <div class="box-header with-border">
               <div class="row form-group">
                   <div class="col-sm-6">
                     <label class="control-label col-sm-5">Theo LSO</label>
                     <div class="col-sm-4 padding-side-0 select-2">
                        <select v-model="userId" class="form-control" v-on:change="onChange">
                             <option selected :value="null">-Chọn LSO-</option>
                             <option v-for="member in members" :value="member.userId">
                               @{{ member.name }}
                             </option>
                         </select>
                     </div>                     
                   </div>
                   <div class="col-sm-2 padding-right-0">
                       <label class="control-label">Theo Ngày</label>
                   </div>
                   <div class="col-sm-3">
                      <div class="input-group input-daterange">
                          <input id="fromDate" type="text" class="form-control" value="" placeholder="Từ ngày">
                          <div class="input-group-addon"><i class="fa fa-hand-o-right" aria-hidden="true"></i></div>
                          <input id="toDate" type="text" class="form-control" value="" placeholder="Đến ngày">
                      </div>
                   </div>
               </div>
               <div class="row form-group">
                   <div class="col-sm-6">
                     <label class="control-label col-sm-5">Theo Quận</label>
                     <div class="col-sm-4 padding-side-0 select-2">
                         <select v-model="districtId" class="form-control" v-on:change="onChange">
                             <option selected :value="null">-Chọn quận-</option>
                             <option v-for="district in districts" :value="district.districtId">
                               @{{ district.districtName }}
                             </option>
                         </select>
                     </div>
                   </div>
                   <div class="col-sm-2 padding-right-0">
                       <label class="control-label">Theo Đơn Giá</label>
                   </div>
                   <div class="col-sm-3">
                       <select v-model="priceId" class="form-control">
                             <option selected :value="null">-Chọn đơn giá-</option>
                             <option v-for="price in prices" :value="price.id">
                               @{{ price.text }}
                             </option>
                        </select>
                   </div>                   
               </div>
            </div>
            <div class="box-body">
               <div class="ui col-sm-12 container">
                <div class="text-center" v-if="loading"><span class="fa fa-spinner fa-spin fa-3x"></span>Loading...</div>
                <vuetable ref="vuetable"
                    :api-url="apiUrl"
                    :fields="fields"
                    :css="css.table"
                    :api-mode="true"
                    pagination-path=""
                    @vuetable:loading="onLoading"        
                    @vuetable:loaded="onLoaded"
                    @vuetable:pagination-data="onPaginationData">
                </vuetable>
                <div class="pull-right">
                  <vuetable-pagination ref="pagination" :css="css.pagination"@vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
         </div>
         <!-- /.box -->
      </div>
      <!-- /.col -->
   </div>
   <!-- /.row -->
</div>
<div id="reportResultWork" class='dashboard' v-cloak>   
   <h3 class="box-title">Hiệu quả công việc LSO</h3>   
   <div class="row">
      <div class="col-xs-12">
         <div class="box">
            <div class="box-header with-border">
               <div class="row form-group">
                   <div class="col-sm-6">
                     <label class="control-label col-sm-5">Theo LSO</label>
                     <div class="col-sm-4 padding-side-0 select-2">
                        <select v-model="userId" class="form-control" v-on:change="onChange">
                             <option selected :value="null">-Chọn LSO-</option>
                             <option v-for="member in members" :value="member.userId">
                               @{{ member.name }}
                             </option>
                         </select>
                     </div>                     
                   </div>
                   <div class="col-sm-2 padding-right-0">
                       <label class="control-label">Theo Ngày</label>
                   </div>
                   <div class="col-sm-3">
                      <div class="input-group input-daterange">
                          <input id="fromDateWork" type="text" class="form-control" value="" placeholder="Từ ngày">
                          <div class="input-group-addon"><i class="fa fa-hand-o-right" aria-hidden="true"></i></div>
                          <input id="toDateWork" type="text" class="form-control" value="" placeholder="Đến ngày">
                      </div>
                   </div>
               </div>
               <div class="row form-group">
                   <div class="col-sm-6">
                     <label class="control-label col-sm-5">Theo Quận</label>
                     <div class="col-sm-4 padding-side-0 select-2">
                         <select v-model="districtId" class="form-control" v-on:change="onChange">
                             <option selected :value="null">-Chọn quận-</option>
                             <option v-for="district in districts" :value="district.districtId">
                               @{{ district.districtName }}
                             </option>
                         </select>
                     </div>
                   </div>
                   <div class="col-sm-2 padding-right-0">
                       <label class="control-label">Theo Đơn Giá</label>
                   </div>
                   <div class="col-sm-3">
                       <select v-model="priceId" class="form-control">
                             <option selected :value="null">-Chọn đơn giá-</option>
                             <option v-for="price in prices" :value="price.id">
                               @{{ price.text }}
                             </option>
                        </select>
                   </div>                   
               </div>
            </div>
            <div class="box-body">
               <div class="ui col-sm-12 container">
                <div class="text-center" v-if="loading"><span class="fa fa-spinner fa-spin fa-3x"></span>Loading...</div>
                <vuetable ref="vuetable"
                    :api-url="apiUrl"
                    :fields="fields"
                    :css="css.table"
                    :api-mode="true"
                    pagination-path=""
                    @vuetable:loading="onLoading"        
                    @vuetable:loaded="onLoaded"
                    @vuetable:pagination-data="onPaginationData">
                </vuetable>
                <div class="pull-right">
                  <vuetable-pagination ref="pagination" :css="css.pagination"@vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
         </div>
         <!-- /.box -->
      </div>
      <!-- /.col -->
   </div>
   <!-- /.row -->
</div>
<div class="dashboard">
  <div class="row">
    <div class="pull-right col-sm-2">
      <button id="export" class="btn btn-primary btn-block"><i class="fa fa-download" aria-hidden="true"></i> Export</button>
    </div>
  </div>
</div>
@endsection
@section('page-js')
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/momentjs/moment.min.js") }}"></script>
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-mask/jquery.mask.js")}}"></script>
<!-- Bootstrap Notify -->
<script src="{{loadAsset("/plugins/bootstrap-notify/bootstrap-notify.min.js")}}"></script>
@if ($tmpDepartmentId == 11)
<script src="{{loadAsset("js/lso/reminder.js") }}"></script>
@endif
<!-- Vue JS -->
<script src="{{loadAsset("/plugins/vue/vue.min.js") }}"></script>    
<script src="{{loadAsset("/plugins/vue/vue-resource.js") }}"></script>
<script src="{{loadAsset("/plugins/vue/vuetable.js") }}"></script>    
<script src="{{loadAsset("/js/vee-validate/vee-validate.js") }}"></script> 
<script src="{{loadAsset("/js/vee-validate/locale/vi.js") }}"></script>
<script src="{{loadAsset("js/lso/reports.js") }}"></script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/lso/style.css")}}" rel="stylesheet" type="text/css" />
@stop
