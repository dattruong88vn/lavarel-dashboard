@extends('layout.default')

@section('content')
<div class='dashboard'>
    <section>
        <h1>
            Danh sách searcher
        </h1>
    </section>
    <section>
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-body">
                        <table class="table table-bordered" id="main-items">
                            <thead>
                            <th style="width: 10px">User ID</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>

</div>
@endsection


@section('page-js')

<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script type="text/javascript">

var renderAction = function (data, type, object) {
    if (!data) {
        return "";
    }
    data = "<a href='#' onclick=\"return changeToAgent(this, \'" + data + "')\">Chuyển qua unapproved agent</a>";
    return data;
}
function changeToAgent(selector, id) {
    console.log(selector);
    showPropzyLoading();
    $.ajax({
        url: "/account/searcher-to-agent/" + id
    }).done(function (response) {
        if (response.result) {
            $(selector).parents("tr").remove();
        }
        showPropzyAlert(response.message);
    }).always(function () {
        hidePropzyLoading();
    })
}
$('#main-items').dataTable({
    //searching: false,
    "lengthChange": false,
    'processing': true,
    'serverSide': true,
    'ajax': '/account/searchers-data',
    "scrollX": true,
    "columns": [
        {data: "accountId"},
        {data: "name"},
        {data: "email"},
        {data: "phone"},
        {data: "socialUid", render: renderAction}
    ]
});
</script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
@stop