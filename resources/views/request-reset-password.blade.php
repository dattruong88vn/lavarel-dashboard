@extends('layout.default')

@section('content')
	<div class="create-account">
		<div class="row">
			<div class="col-md-12">
				<div class="box box-primary">
	                <div class="box-header with-border">
	                  <h3 class="box-title">Lấy lại mật khẩu</h3>
	                </div><!-- /.box-header -->
	                <div class="box-body">
	                	<form id="password-retrieval">
		                	<div class="form-group">
		                		<label>Email</label>
					            <input type="email" name="email" class="form-control" placeholder="Email">
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
		    $('#password-retrieval').bootstrapValidator({
         		message: 'This value is not valid',
         		feedbackIcons: {
		            valid: 'glyphicon glyphicon-ok',
		            invalid: 'glyphicon glyphicon-remove',
		            validating: 'glyphicon glyphicon-refresh'
		        },
	            fields: {
	              email: {
	                    validators: {
	                        notEmpty: {
	                            message: 'Bạn chưa nhập email'
	                        },
	                        emailAddress: {
	                            message: 'Email không hợp lệ'
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