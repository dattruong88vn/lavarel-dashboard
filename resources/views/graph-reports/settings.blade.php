@extends('layout.default')

@section('content')
<input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
<div class="management-setting form-horizontal">
	<div class="box box-primary">
		<div class="box-header with-border">
            <h3 class="box-title">ĐIỀU CHỈNH TARGET</h3>
        </div>
        <div class="box-body">
        	<div class="bl-verify">
        		<div class="row">
                    <div class="col-sm-12">
                        <div class="text-center">
                            <button class="btn btn-warning margin btnReportType btnReportTypeMonth active" data-type="1">THÁNG</button>
                            <button class="btn btn-success btnReportType btnReportTypeQuarter" data-type="2">QUÝ</button>
                        </div>
                    </div>
        		</div>
        		<div class="row">
        			<div class="col-sm-5 col-centered">
        				<div class="col-sm-5 text-center">
        					<div class="radio">
		                        <label>
		                        	<input type="radio" id="startCurrent"  name="timeOfStart" value="1" checked />
                                    <span id="startCurrentTitle"> THÁNG HIỆN TẠI</span>
		                        </label>
	                        </div>
        				</div>
        				<div class="col-sm-5 text-center">
        					<div class="radio">
		                        <label>
		                        	<input type="radio" id="startNext"  name="timeOfStart" value="2" />
                                    <span id="startNextTitle"> THÁNG KẾ TIẾP</span>
		                        </label>
		                    </div>
        				</div>
                    </div>
        		</div>
        	</div>
        	<br>
            <div class="bl-edit-target">
            	<div class="row">
            		<div class="col-sm-12">
            			<div class="row">
            				<div class="col-sm-5" id="settingsTargetList"></div>
            				<div class="col-sm-7" id="settingsTargetHistory">
                                <div class="form-group">
                                    <table id="" class="table table-bordered table-striped table-fixed">
                                        <thead>
                                        <tr>
                                            <th width="176px">NGÀY GIỜ</th>
                                            <th width="152px">TARGET TRƯỚC CHỈNH SỬA</th>
                                            <th width="146px">TARGET SAU CHỈNH SỬA</th>
                                            <th width="135px">BỞI AI?</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td>Chưa có dữ liệu</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
            			</div>
            		</div>
            	</div>
            	<div class="text-center">
            		<button class="btn btn-success" id="btnSaveTarget">SAVE</button>
            	</div>
            </div>
        </div>
    </div>

    <div class="box box-primary">
		<div class="box-header with-border">
            <h3 class="box-title">ĐIỀU CHỈNH CÔNG THỨC CHO SALE FUNNEL</h3>
        </div>
        <div class="box-body">
            <div class="bl-edit-target">
            	<div class="row">
            		<div class="col-sm-12">
                        <form id="reportSaleFunnelData" name="reportSaleFunnelData">
            			<table id="" class="table table-bordered table-striped">
				            <thead>
				                <tr>
                                    <?php foreach ($itemsSaleFunnel as $item) : ?>
                                        <th><?= mb_strtoupper($item->saleFunnelTypeName, 'UTF-8'); ?></th>
                                    <?php endforeach; ?>
				                </tr>
				            </thead>
				            <tbody>
				            	<tr>
                                    <?php foreach ($itemsSaleFunnel as $item) : ?>
                                        <td>
                                            <input type="number"
                                                   name="saleFunnel[<?= $item->saleFunnelTypeId; ?>][targetValue]"
                                                   saleFunnelTypeId="<?= $item->saleFunnelTypeId; ?>"
                                                   class="form-control txtSaleFunnel" value="<?= $item->targetValue; ?>" />
                                            <input type="hidden"
                                                   name="saleFunnel[<?= $item->saleFunnelTypeId; ?>][saleFunnelTypeId]"
                                                   class="form-control" value="<?= $item->saleFunnelTypeId; ?>" />
                                        </td>
                                    <?php endforeach; ?>
				            	</tr>
				            </tbody>
				        </table>
                        </form>
				        <hr>
            		</div>

            		<div class="col-sm-12" id="settingsSaleFunnelHistoryList">
            			<table id="" class="table table-bordered table-striped">
				            <thead>
				                <tr>
				                    <th>NGÀY GIỜ</th>
				                    <th>% TRƯỚC CHỈNH SỬA</th>
				                    <th>% SAU CHỈNH SỬA</th>
				                    <th>BỞI AI?</th>
				                </tr>
				            </thead>
				            <tbody>
				            	<tr>
				            		<td colspan="4">Chưa có dữ liệu</td>
				            	</tr>
				            </tbody>
				        </table>
            		</div>
            	</div>
            	<div class="text-center">
            		<button type="button" id="btnSaveSaleFunnel" class="btn btn-success">SAVE</button>
            	</div>
            </div>
        </div>
    </div>
</div>
@stop

@section('page-js')
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>

<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>

<script src="{{loadAsset("/js/report/settings.js")}}"></script>
@stop

@section('page-css')
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/morris/morris.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
@stop