@extends('layout.default')

@section('content')
	<div class="create-district">
		<div class="row">
			<div class="col-md-12">
				<div class="box box-primary">
	                <div class="box-header with-border">
	                  <h3 class="box-title">Quận/Huyện</h3>
	                </div><!-- /.box-header -->
	                <div class="box-body">
	                	<div class="row">
	                		<div class="col-md-6">
		                		<div class="form-group">
	                                <label>Tên Thành phố</label>
	                                <select id="name-city" name="type-nameCity" class="form-control select2">
	                                  <option value="2" >Hồ Chí Minh</option>
	                                  <option value="1">Hà Nội</option>
	                                </select>
	                            </div>
	                        </div>
	                	</div><!--#row-->
	                	<div class="row">
	                		<div class="col-md-6">
	                			<div class="form-group">
	                				<label>Tên Quận/Huyện</label>
					            	<input type="text" class="form-control nameDistrict" name="nameDistrict" placeholder="Tên quận/huyện">
	                			</div>
	                		</div>
	                	</div><!--#row-->
	                	<div class="row">
	                		<div class="col-md-12">
	                			<div class="row">
	                				<div class="col-md-6">
	                					<div class="form-group">
			                				<label>Lat</label>
							            	<input type="text" class="form-control lat-district" name="latDistrict" placeholder="Lat">
			                			</div>
	                				</div>
	                				<div class="col-md-6">
	                					<div class="form-group">
			                				<label>Long</label>
							            	<input type="text" class="form-control long-district" name="longDistrict" placeholder="Long">
			                			</div>
	                				</div>
	                			</div>
	                		</div>
	                	</div><!--#row-->
	                	<div class="row">
	                		<div class="col-md-6">
	                			<div class="form-group">
	                				<div class="checkbox">
                                    <label>
	                                    <input type="checkbox">Activated
                                    </label>
                                  </div>
	                			</div>
	                		</div>
	                	</div><!--#row-->
	                	<div class="box-footer">
		                    <button id="finish" type="submit" class="btn btn-primary">Hoàn tất</button>
		                </div>
	                </div><!--#box-body-->
	            </div>
			</div>
		</div>
	</div>
@endsection

@section('page-js')
	<script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>
		
@stop
@section('page-css')
     <link href="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel="stylesheet" type="text/css" />
@stop