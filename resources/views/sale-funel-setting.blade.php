@extends('layout.default')

@section('page-css')
	
@stop

@section('content')
	<form method="post" action="/sale-funel-setting/store-setting" id="sale-funel-setting-form" class="box box-default">
		<input type="hidden" name="_token" id="token" value="{{ csrf_token() }}">
	    <div class="box-header with-border">
	      <h3 class="box-title">Sale Funel Setting</h3>
	    </div><!-- /.box-header -->
	    <div class="box-body">
	    	@if (session('status'))
		    	<div class="alert alert-success">
				  <strong>Info!</strong> {{ session('status') }}
				</div>
			@endif
	    <div class="row">
			<div class="col-md-5">
              <div class="form-group">
                <label>Target</label>
                <input value="{{ old('target') }}" name="target" required onkeydown="return ( event.ctrlKey || event.altKey
                        || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false)
                        || (95<event.keyCode && event.keyCode<106)
                        || (event.keyCode==8) || (event.keyCode==9)
                        || (event.keyCode>34 && event.keyCode<40)
                        || (event.keyCode==46) )" type="text" class="form-control target" placeholder="Nhập target ...">
              </div><!-- /.form-group -->
		    </div><!-- /.col -->
            <div class="col-md-3">
                <div class="form-group">
                    <label>Từ tháng:</label>
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                        </div>
                        <input name="from-month" required type="text" class="form-control pull-right active from-month" id="reservation" value="{{ old('from-month') }}">
                    </div><!-- /.input group -->
                </div>
            </div><!-- /.col -->
			<div class="col-md-2">
				<div class="form-group">
					<label>Tới tháng:</label>
					<div class="input-group">
						<div class="input-group-addon">
							<i class="fa fa-calendar"></i>
						</div>
						<input name="to-month" required type="text" class="form-control pull-right active to-month" id="reservation" value="{{ old('to-month') }}">
					</div><!-- /.input group -->
				</div>
			</div><!-- /.col -->
			<div style="margin-top: 25px" class="col-md-2">
				<button class="btn btn-block btn-success">Thêm target</button>
			</div>
	    </div><!-- /.row -->

		  <div class="list">
				<div class="num-active"> Số BA đang active: <b>{{ $num_ba_active }}</b> </div>
				<br>
				<table id="table-listing" class="table table-bordered table-striped table-listing">
					<thead>
					<tr>
						<th>Từ tháng</th>
						<th>Tới tháng</th>
						<th>Target</th>
					</tr>
					</thead>
					<tbody>
						<?php foreach ($list_ba_active as $item) { ?>
							<td> {{ date("m/Y", ($item->fromDate/1000)) }}</td>
							<td>{{ date("m/Y", ($item->toDate/1000)) }}</td>
							<td>{{ $item->value ? number_format($item->value) : "Không có target" }}</td>
						<?php } ?>
					</tbody>
				</table>
		  </div>
	    </div><!-- /.box-body -->
	  </form>

@stop
<style type="text/css">
    /*.table-condensed thead tr:nth-child(2),
    .table-condensed tbody {
        display: none
    }
	.daterangepicker select.monthselect, .daterangepicker select.yearselect {
		padding: 5px!important;
		border: 1px solid #eee;
		border-radius: 5px; 
	}*/
</style>
@section('page-js')
	<script type="text/javascript" src="{{loadAsset('plugins/daterangepicker/daterangepicker.js')}}"></script>
	<script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.7/jquery.validate.min.js"></script>
	<script type="text/javascript" src="{{loadAsset('plugins/mask/jquery.mask.min.js')}}"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$(".from-month").datepicker({
		        format: "mm-yyyy",
		        viewMode: "months", 
		        minViewMode: "months"
		    }).on('changeDate', function(ev){ 
		        $(".from-month").datepicker('hide'); 
		    });
            $(".to-month").datepicker({
		        format: "mm-yyyy",
		        viewMode: "months", 
		        minViewMode: "months"
		    }).on('changeDate', function(ev){ 
		        $(".to-month").datepicker('hide'); 
		    });
			$('#sale-funel-setting-form').validate();
			$('.target').mask("#,##0", {reverse: true});
		})
	</script>
@stop