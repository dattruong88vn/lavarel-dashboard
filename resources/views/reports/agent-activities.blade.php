@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class='agent-activities'>
    <section></section>
    <section>
        <div class="db-tm-item table-activities">
            <div class="row">
                <div class="col-md-12">                
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Hoạt động của agents</h3>
                        </div>
                        <div class="box-body">
                            <form id="formFilter" class="form-horizontal" method="get">
                                <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">

                                <div class="form-group">
                                    <div class="col-sm-4">
                                        <label>Account manager</label>
                                        <select id="accountManagers" name="accountManagers[]" class="form-control select2" multiple="multiple">
                                            <?php foreach ($accountManagers as $am): ?>
                                                <option value={{$am->userId}} <?php echo in_array($am->userId, $currentAms) ? "selected='selected'" : ""; ?> >
                                                    {{$am->name}}
                                                </option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                    <div class="col-sm-4">
                                        <label>Agents</label>
                                        <select id="agents" name="agents[]" class="form-control select2" multiple="multiple">
                                            <?php foreach ($agents as $agent): ?>
                                                <option value="{{$agent->agentId}}" <?php echo in_array($agent->agentId, $currentAgents) ? "selected='selected'" : ""; ?> >{{$agent->agentName}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                    <div class="col-sm-4">
                                        <label>Khu vực</label>
                                        <select id="districts" name="districts[]" class="form-control select2" multiple="multiple">
                                            <?php foreach ($districts as $district): ?>
                                                <option value="{{$district->districtID}}" <?php echo in_array($district->districtID, $currentDistricts) ? "selected='selected'" : ""; ?> >{{$district->districtName}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-4">
                                        <label for="">From</label>
                                        <div class="input-group date" data-provide="datepicker"  data-date-format="dd/mm/yyyy">
                                            <input type="text" class="form-control" id="fromDate" name="fromDate" value="{{\Request::get('fromDate')}}">
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <label>To</label>
                                        <div class="input-group date" data-provide="datepicker"  data-date-format="dd/mm/yyyy">
                                            <input  type="text" class="form-control" id="toDate" name="toDate" value="{{\Request::get('toDate')}}">
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-xs-12">
                                        <button id="btnSearch" class="btn btn-success">Tìm</button>
                                        <button id="btnExport" class="btn btn-warning">Export to xlsx/csv</button>
                                    </div>
                                </div>
                            </form>
                            <table id="activities-list" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Account Manager</th>
                                        <th>Tên Agent</th>
                                        <th>Số ĐT</th>
                                        <th>Email</th>
                                        <th>Quận</th>
                                        <th>Ngày gia nhập</th>
                                        <th>Loại hình</th>
                                        <th>Số lần search</th>
                                        <th>Số lần đặt lịch xem</th>
                                    </tr>
                                </thead>
                                <tbody>                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection



@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>

<script type="text/javascript">

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#_token').val()
    }
});
$(document).ready(function () {

<?php if ($queryString): ?>
        loadAgentActivitesDataTable();
<?php endif; ?>
    getDistrict(1);

    var fromDate = null;
    var toDate = null;


    $('#fromDate').on("change", function (event) {
    });

    $('#toDate').on("change", function (event) {
        if ($(this).val().trim() !== "") {
            toDate = moment($(this).val().trim(), "DD/MM/YYYY");
        }
    });

    $("#accountManagers").change(function () {
        getAgents();
    });
    $("#agents").change(function () {
        getAgentDistrict();
    });
    $("#btnSearch").on("click", function (event) {
        var accountManagers = null;
        if ($("#accountManagers").val()) {
            accountManagers = $("#accountManagers").val();
        }
        var agents = null;
        if ($("#agents").val()) {
            agents = $("#agents").val();
        }
        var districts = null;
        if ($("#districts").val()) {
            agents = $("#districts").val();
        }
        var fromDate = $("#fromDate").val().trim();
        var toDate = $("#toDate").val().trim();

        if (accountManagers === null && agents === null && districts === null && fromDate === "" && toDate === "") {
            showPropzyAlert("Chọn điều kiện tìm kiếm");
            event.preventDefault();
            return;
        }
    });

    $("#btnExport").on("click", function (event) {
        event.preventDefault();
        showPropzyLoading();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('#_token').val()
            }
        });
        $.ajax({
            "url": "/report/export-agent-activities",
            "data": $("#formFilter").serialize(),
            "type": "post"
        }).done(function (response) {
            if (response.result) {
                window.location.href = response.data.linkFile;
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });
});
function getAgents() {
    var amIds = $("#accountManagers").val();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#_token').val()
        }
    });
    showPropzyLoading();
    $.ajax({
        url: '/report/get-agents',
        type: 'post',
        data: JSON.stringify(amIds)
    }).done(function (response) {
        var html = '';
        if (response.result) {
            for (var x in response.data) {
                var item = response.data[x];
                html += "<option value='" + item.agentId + "' >" + item.agentName + "</option>"
            }
        }
        $("#agents").html(html).select2();
        getAgentDistrict();
    }).always(function () {
        hidePropzyLoading();
    });

}

function getAgentDistrict() {
    var agentIds = $("#agents").val();
    var accountManagers = $("#accountManagers").val();
    console.log(agentIds);
    console.log(accountManagers);
    if (agentIds === null && accountManagers === null) {
        getDistrict(1);
        return;
    }
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#_token').val()
        }
    });
    showPropzyLoading();
    $.ajax({
        url: '/report/get-agents-districts',
        type: 'post',
        data: JSON.stringify({
            'agentIdsList': agentIds,
            'userIdsList': accountManagers
        })
    }).done(function (response) {
        var html = '';
        if (response.result) {
            for (var x in response.data) {
                var item = response.data[x];
                html += "<option value='" + item.districtID + "'>" + item.districtName + "</option>";
            }

        }
        $("#districts").html(html);
    }).always(function () {
        hidePropzyLoading();
    });
}
function loadAgentActivitesDataTable() {
    $("#activities-list").DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/report/get-agent-activities?<?php echo html_entity_decode($queryString); ?>",
        "scrollX": true
    });
}
function getDistrict(cityId) {
    $.ajax({
        url: '/get-district/' + cityId,
        type: 'get'
    }).done(function (response) {
        var html = '';
        for (var x in response) {
            var item = response[x];
            html += "<option value='" + item.districtId + "'>" + item.districtName + "</option>";
        }
        $("#districts").html(html);

    }).always(function () {

    });
}

</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop