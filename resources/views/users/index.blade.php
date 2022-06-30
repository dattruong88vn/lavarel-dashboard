@extends('layout.default')

@section('content')
<?php $csrf_token = csrf_token() ?>
	<div class="row">
	  <div class="col-md-3">

	    <!-- Profile Image -->
	    <div class="box box-primary">
	      <div class="box-body box-profile">
	        <img class="profile-user-img img-responsive img-circle" src="{{  ($user->photo) ? $user->photo : loadAsset("/dist/img/logo.jpg")}}" alt="User profile picture">
	        <h3 class="profile-username text-center">{{ $user->name }}</h3>
	        <!-- <p class="text-muted text-center">Software Engineer</p> -->
	      </div><!-- /.box-body -->
	    </div><!-- /.box -->
	  </div><!-- /.col -->
	  <div class="col-md-9">
	    <div class="nav-tabs-custom">
	      <ul class="nav nav-tabs">
	        <li class="active"><a href="#settings" data-toggle="tab">Cập nhật</a></li>
	      </ul>
	      <div class="tab-content">
	      	@if($errors->any())
	      	<div class="alert alert-success" role="alert">
	      	  {{$errors->first()}}
	      	</div>
	      	@endif
	        <div class="tab-pane active" id="settings">
	          <form id="updateProfile" method="post" action="/user/update-profile" enctype="multipart/form-data" class="form-horizontal">
	          	<input type="hidden" id="csrf-token" name="_token" value="{{$csrf_token}}" />
	          	<input type="hidden" name="userId" value="{{ $user->userId}}">
	          	<!-- <div class="label label-info">Thông tin</div> -->
	          	<h2 class="title-with-line"><span style="background-color: white;">THÔNG TIN</span></h2>

	            <div class="form-group">
	              <label class="col-sm-3 control-label">Tên <span style="color: red;">(*)</span></label>
	              <div class="col-sm-9">
	                <input name="name" value="{{ $user->name }}"  type="text" class="form-control" placeholder="Tên">
	              </div>
	            </div>
	            <div class="form-group">
	              <label class="col-sm-3 control-label">Email <span style="color: red;">(*)</span></label>
	              <div class="col-sm-9">
	                <input type="email" name="email" class="form-control" value="{{ $user->email }}"  placeholder="Email">
	              </div>
	            </div>
	            <div class="form-group">
	              <label class="col-sm-3 control-label">Số điện thoại <span style="color: red;">(*)</span></label>
	              <div class="col-sm-9">
	                <input type="text" name="phone" value="{{ count($user->phones) > 0 ? $user->phones[0]->phone : '' }}"  onkeypress='return event.charCode >= 48 && event.charCode <= 57' class="form-control"  placeholder="Số điện thoại">
	              </div>
	            </div>
				  <div class="form-group">
					  <label class="col-sm-3 control-label">Hot line</label>
					  <div class="col-sm-9">
						  <input type="text" name="hot-line" value="{{$hotLine}}" class="form-control"  placeholder="hot line" disabled>
					  </div>
				  </div>
				  <div class="form-group">
					  <label class="col-sm-3 control-label">Void Id Ext</label>
					  <div class="col-sm-9">
						  <input type="text" name="hot-line" value="{{$user->voipId}}" class="form-control"  placeholder="Void Id Ext" disabled>
					  </div>
				  </div>
	            <div class="form-group">
	              <label class="col-sm-3 control-label">Chữ ký <span style="color: red;">(*)</span></label>
	              <div class="col-sm-9">
	                <textarea  name="signature" id="signature" rows="10" cols="80">{{ $user->signature }}</textarea>
	              </div>
	            </div>
	            <div class="form-group">
                     <label class="col-sm-3 control-label">Ảnh đại diện</label>
                    <div class="col-sm-9">
                      <input name="file_data" type="file">
                	</div>
                </div>
                <!-- <hr> -->
	            <!-- <div class="label label-info">Bảo mật</div> -->
	            <h2 class="title-with-line"><span style="background-color: white;">BẢO MẬT</span></h2>
	            <div class="form-group">
	              <label class="col-sm-3 control-label">Mật khẩu hiện tại</label>
	              <div class="col-sm-9">
	                <input type="password" name="oldPassword" class="form-control" placeholder="Mật khẩu hiện tại">
	              </div>
	            </div>
	            <div class="form-group">
	              <label class="col-sm-3 control-label">Mật khẩu mới</label>
	              <div class="col-sm-9">
	                <input type="password" id="password" name="password" class="form-control" placeholder="Mật khẩu mới">
	              </div>
	            </div>
	            <div class="form-group">
	              <label class="col-sm-3 control-label">Nhập lại mật khẩu mới</label>
	              <div class="col-sm-9">
	                <input type="password" id="password_again" name="rePassword" class="form-control" placeholder="Nhập lại mật khẩu mới">
	              </div>
	            </div>
	            <div class="form-group">
	              <div class="col-sm-offset-4 col-sm-8">
	                <button type="submit" class="btn btn-danger">Cập nhật</button>
	              </div>
	            </div>
	            <div id="error" style="height: 50px;"></div>
	          </form>
	        </div><!-- /.tab-pane -->
	      </div><!-- /.tab-content -->
	    </div><!-- /.nav-tabs-custom -->
	  </div><!-- /.col -->
	</div><!-- /.row -->
@endsection

@section('page-js')
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.16.0/jquery.validate.min.js"></script>
	<!-- CK Editor -->
    <script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
    <script type="text/javascript" src="/js/jm_commons/root.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			CKEDITOR.replace('signature');
			CKEDITOR.replace('agent_introduce');

			$('#updateProfile button[type="submit"]').on('click',function(){
				$( "#updateProfile" ).validate({
				  ignore:[],
				  errorClass: 'error text-danger',
				  rules: {
				  	name : {
		                required : true
		            },
		            email : {
		            	required : true
		            },
		            phone : {
		            	required : true
		            },
		            signature: {
	                   ckeditor_required : true
	                 },
				    rePassword: {
				      equalTo: "#password"
				    }
				  },
				  messages: {
		             name: {
		                 required: "Vui lòng nhập tên"
		             },
		             email: {
		                 required: "Vui lòng nhập email"
		             },
		             phone : {
		             	required : "Vui lòng nhập số điện thoại"
		             },
		             rePassword : {
		             	equalTo : "Mật khẩu không trùng khớp"
		             }
		         }
				});

				jQuery.validator.addMethod("ckeditor_required", function(value, element) {
				   var editorId = $(element).attr('id');
					  var messageLength = CKEDITOR.instances[editorId].getData().replace(/<[^>]*>/gi, '').length;
				      // return messageLength.length === 0;
				      if(messageLength > 0){
				      	return true;
				      }else{return false;}
				}, "Vui lòng nhập chữ ký email");

				if($( "#updateProfile" ).valid()) // done valid simple
				{ 
					if($('#updateProfile input[type="file"]').val().length >= 1){
						var checkFileIsImg = JMCommons.validImg($('#updateProfile input[type="file"]').val());
						if(!checkFileIsImg){
							showPropzyAlert('Vui lòng cập nhật ảnh đại diện với định dạng JPG | PNG | JPEG');
							return false;
						}else{
							$( "#updateProfile" ).submit();
						}
					}else{
						$( "#updateProfile" ).submit();
					}
				}else{
					return false;
				}
			})

		})
	</script>
@stop
@section('page-css')
@stop