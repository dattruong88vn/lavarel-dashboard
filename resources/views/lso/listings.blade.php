@extends('layout.default')
@section('content')
<div id="listings" class='dashboard'>
   {{ csrf_field() }}
   <h3 class="box-title">Danh Sách Tin Đăng Hệ Thống</h3>
   <!-- Hidden field -->
   <input type="hidden" id="hiddenUserId" value="{{$loggedInUser->userId}}">
   <div class="row">
      <div class="col-xs-12">
         <div class="box">
            <div class="box-header with-border">
               <div class="row form-group">
                   <div class="col-sm-6">
                     <label class="control-label col-sm-5">Theo loại listing</label>
                     <div class="col-sm-4 padding-side-0 select-2">
                        <select v-model="classify" class="form-control" v-on:change="onChange">
                             <option selected :value="null" >-Chọn loại listing-</option>
                             <option v-for="classifyItem in classifies" :value="classifyItem.id">
                               @{{ classifyItem.text }}
                             </option>
                         </select>
                     </div>                     
                   </div>
                   <div class="col-sm-2 padding-right-0">
                       <label class="control-label">Theo ngày live</label>
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
                     <label class="control-label col-sm-5">Theo quận</label>
                     <div class="col-sm-4 padding-side-0 select-2">
                         <select v-model="districtId" class="form-control" v-on:change="onChange">
                             <option selected :value="null" >-Chọn quận-</option>
                             <option v-for="district in districts" :value="district.districtId">
                               @{{ district.districtName }}
                             </option>
                         </select>
                     </div>
                   </div>
                   <div class="col-sm-2 padding-right-0">
                       <label class="control-label">Theo loại đăng tin</label>
                   </div>
                   <div class="col-sm-3">
                       <select v-model="sourceId" class="form-control" v-on:change="onChange">
                             <option selected :value="null" >-Chọn loại đăng tin-</option>
                             <option v-for="source in sources" :value="source.id">
                               @{{ source.text }}
                             </option>
                        </select>
                   </div>                   
               </div>
               <div class="row form-group">
                   <div class="col-sm-6">
                     <label class="control-label col-sm-5">Theo status hiện tại</label>
                     <div class="col-sm-4 padding-side-0 select-2">
                         <select v-model="statusId" class="form-control" v-on:change="onChange">
                             <option selected :value="null" >-Chọn tình trạng-</option>
                             <option v-for="status in statuses" :value="status.id">
                               @{{ status.text }}
                             </option>
                         </select>
                     </div>
                   </div>
                   <div class="col-sm-2 padding-right-0">
                       <label class="control-label">Theo loại tin đăng hệ thống</label>
                   </div>
                   <div class="col-sm-3">
                       <select v-model="type" class="form-control" v-on:change="onChange">
                             <option selected :value="null" >-Chọn loại tin đăng hệ thống-</option>
                             <option v-for="typeChoose in types" :value="typeChoose.id">
                               @{{ typeChoose.text }}
                             </option>
                        </select>
                   </div>
               </div>
               <div class="row form-group">
                  <div class="col-sm-6">
                   </div>
                   <div class="col-sm-2 padding-right-0">
                       <label class="control-label">Theo nhân viên LSO</label>
                   </div>
                   <div class="col-sm-3">
                       <select v-model="memberId" class="form-control" v-on:change="onChange">
                             <option selected :value="null" >-Chọn NV-</option>
                             <option v-for="member in members" :value="member.userId">
                               @{{ member.name }}
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
                    data-path="data"
                    pagination-path=""
                    :per-page="10"                    
                    @vuetable:pagination-data="onPaginationData"
                    @vuetable:loading="onLoading"        
                    @vuetable:loaded="onLoaded">                    
                </vuetable>                
                <vuetable-pagination-info info-template="<label>Tổng:</label> {total} dữ liệu" no-data-template="Không có dữ liệu" ref="paginationInfo"></vuetable-pagination-info>
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
<script src="{{loadAsset("js/lso/listings.js") }}"></script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/listing.css")}}" rel="stylesheet" type="text/css" />
@stop
