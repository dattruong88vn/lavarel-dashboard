@extends('layout.default')

@section('content')
	<div class="create-account">
		<div class="row">
			<div class="col-md-12">
				<div class="box box-primary">
	                <div class="box-header with-border">
	                  <h3 class="box-title">Mật khẩu mới</h3>
	                </div><!-- /.box-header -->
	                <div class="box-body">
	                	<form id="new-password">
		                	<div class="form-group has-feedback">
					        	<label>Mật khẩu mới</label>
					            <input type="password" class="form-control password" name="password" placeholder="Mật khẩu mới">
					        </div>
					        <div class="form-group has-feedback">
					        	<label>Xác nhận mật khẩu mới</label>
					            <input type="password" class="form-control confirmPassword" name="confirmPassword" placeholder="Xác nhận mật khẩu mới">
					        </div>
					        <button class="btn btn-primary">Gửi</button>
				        </form>
	                </div>
	            </div>
			</div>
		</div>
	</div>
@endsection

@section('page-js')
	<script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>
	<script type="text/javascript">
		$(document).ready(function() {
		    $('#new-password').bootstrapValidator({
         		message: 'This value is not valid',
         		feedbackIcons: {
		            valid: 'glyphicon glyphicon-ok',
		            invalid: 'glyphicon glyphicon-remove',
		            validating: 'glyphicon glyphicon-refresh'
		        },
	            fields: {
	              	password: {
		                validators: {
		                    notEmpty: {
		                        message: 'Bạn chưa nhập password'
		                    },
		                    identical: {
		                        field: 'confirmPassword',
		                        message: 'Nật khẩu không trùng khớp'
		                    }
		                }
		            },
		            confirmPassword: {
		                validators: {
		                    notEmpty: {
		                        message: 'Bạn chưa nhập xác nhận mật khẩu'
		                    },
		                    identical: {
		                        field: 'password',
		                        message: 'Mật khẩu không trùng khớp'
		                    }
		                }
		            }
	            }
       		});
		});
	</script>
@stop
@section('page-css')
     <link href="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel="stylesheet" type="text/css" />
@stop