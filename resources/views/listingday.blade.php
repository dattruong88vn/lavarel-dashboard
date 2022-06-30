@extends('layout.default')

@section('content')
	<div class="listing-day">
		<div class="row">
			<div class="col-md-12">
				<div class="box box-primary">
	                <div class="box-header with-border">
	                  <h3 class="box-title">Listing về trong ngày</h3>
	                </div><!-- /.box-header -->
	                <div class="box-body">
	                	<form id="form-listing-day">
	                		<div class="form-group">
	                			<label>Loại BDS</label>
	                			<select name="kind_bds" class="form-control select2" style="width: 100%;">
	                				<option value="">Chọn loại BDS</option>
                                    <option>Căn hộ</option>
                                    <option>Nhà riêng</option>
                                    <option>Văn phòng</option>
                                </select>
	                		</div>
		                	<div class="form-group">
		                		<label>Tiêu đề</label>
					            <input type="text" class="form-control title" name="title" placeholder="Tiêu đề">
					        </div>
					        <div class="form-group">
					        	<label>Số lượng</label>
					            <input type="number" class="form-control number" name="number" placeholder="Số lượng">
					        </div>
					        <div class="form-group">
					        	<label>Tên BD</label>
					            <input type="text" class="form-control name_bd" name="name_bd" placeholder="Tên BD">
					        </div>
					        <div class="form-group">
	                			<label>Quận</label>
	                			<select name="district" class="form-control select2" style="width: 100%;">
	                				<option value="">Chọn quận</option>
                                    <option>Quận 1</option>
                                    <option>Quận 2</option>
                                    <option>Quận 3</option>
                                </select>
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
		    $('#form-listing-day').bootstrapValidator({
		        message: 'This value is not valid',
		        feedbackIcons: {
		            valid: 'glyphicon glyphicon-ok',
		            invalid: 'glyphicon glyphicon-remove',
		            validating: 'glyphicon glyphicon-refresh'
		        },
		        fields: {
		        	kind_bds: {
		                validators: {
		                    notEmpty: {
		                        message: 'Bạn chưa chọn loại BDS'
		                    }
		                }
		            },
		        	title: {
		                validators: {
		                    notEmpty: {
		                        message: 'Bạn chưa nhập tiêu đề'
		                    }
		                }
		            },
		            number: {
		                validators: {
		                    notEmpty: {
		                        message: 'Bạn chưa nhập số lượng'
		                    }
		                }
		            },
		           	name_bd: {
		                validators: {
		                    notEmpty: {
		                        message: 'Bạn chưa nhập tên bd'
		                    }
		                }
		            },
		            district: {
		                validators: {
		                    notEmpty: {
		                        message: 'Bạn chưa chọn quận'
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