@extends('layout.default')

@section('content')
	<div class="create-city">
		<div class="row">
			<div class="col-md-12">
				<div class="box box-primary">
	                <div class="box-header with-border">
	                  <h3 class="box-title">Tỉnh/Thành phố</h3>
	                </div><!-- /.box-header -->
	                <div class="box-body">
	                	<div class="row">
	                		<div class="col-md-6">
		                		<div class="form-group">
	                                <label>Tên Quốc gia</label>
	                                <select id="name-country" name="type-nameCountry" class="form-control select2">
	                                  <option value="2" >Hồ Chí Minh</option>
	                                  <option value="1">Hà Nội</option>
	                                </select>
	                            </div>
	                        </div>
	                	</div><!--#row-->
	                	<div class="row">
	                		<div class="col-md-6">
	                			<div class="form-group">
	                				<label>Tên tỉnh/thành phố</label>
					            	<input type="text" class="form-control nameCity" name="nameCountry" placeholder="Tên tỉnh/thành phố">
	                			</div>
	                		</div>
	                	</div><!--#row-->
	                	<div class="row">
	                		<div class="col-md-6">
	                			<div class="form-group">
	                				<label>Tên viết tắt</label>
					            	<input type="text" class="form-control shortname-city" name="codeCountry" placeholder="Code">
	                			</div>
	                		</div>
	                	</div><!--#row-->
	                	<div class="row">
	                		<div class="col-md-12">
	                			<div class="row">
	                				<div class="col-md-6">
	                					<div class="form-group">
			                				<label>Lat</label>
							            	<input type="text" class="form-control lat-city" name="codeCountry" placeholder="Lat">
			                			</div>
	                				</div>
	                				<div class="col-md-6">
	                					<div class="form-group">
			                				<label>Long</label>
							            	<input type="text" class="form-control long-city" name="codeCountry" placeholder="Long">
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