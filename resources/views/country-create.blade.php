@extends('layout.default')

@section('content')
	<div class="create-country">
		<div class="row">
			<div class="col-md-12">
				<div class="box box-primary">
	                <div class="box-header with-border">
	                  <h3 class="box-title">Quốc gia</h3>
	                </div><!-- /.box-header -->
	                <div class="box-body">
	                	<div class="row">
	                		<div class="col-md-6">
	                			<div class="form-group">
	                				<label>Tên</label>
					            	<input type="text" class="form-control nameCountry" name="nameCountry" placeholder="Tên">
	                			</div>
	                		</div>
	                	</div><!--#row-->
	                	<div class="row">
	                		<div class="col-md-6">
	                			<div class="form-group">
	                				<label>Code</label>
					            	<input type="text" class="form-control codeCountry" name="codeCountry" placeholder="Code">
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