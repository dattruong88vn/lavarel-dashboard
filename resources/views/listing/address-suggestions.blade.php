<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Danh sách noted listing</h3>
            <span class="pull-right">
                <!--<button class="btn-export btn btn-warning">Export to xlsx/csv</button>-->
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">
            <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
            <table id="items"  class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Đường</th>
                        <th>Phường</th>
                        <th>Quận</th>
                        <th>Tỉnh / TP</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</section>


@endsection



@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/fnSetFilteringDelay.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>

<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>

<script type="text/javascript">
var renderListingLink = function (data, type, object) {
    if (!data) {
        return "";
    }
    return "<a href='/listing/" + data + "'>" + data + "</a>";
}
var renderNoteId = function (data, type, object) {
    if (!data) {
        return "";
    }
    return "<a onclick='return showNoteModal(" + data + ")' href='/listing/" + data + "'>" + data + "</a>";
}
var renderAction = function (data, type, object) {
    if (!data) {
        return "";
    }
    //console.log(object);
    var returnValue = "<a class='btn btn-danger' href='/listing/update-address-suggestion/" + object.id + "'>Sửa</a>";
    return returnValue;
}
$("#items").DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": "/listing/address-suggestions-data",
    "scrollX": false,
    "ordering": false,
    "lengthChange": false,
    "columns": [
        {data: 'streetName'},
        {data: 'wardName'},
        {data: 'districtName'},
        {data: 'cityName'},
        {data: 'id', render: renderAction}
    ],
    "createdRow": function (row, data, index) {
    }
});
function showNoteModal(noteId) {
    $("#noteModal .btn-merger-note").attr("data-note-id", noteId);
    showPropzyLoading();
    $.ajax({
        url: '/listing/notes/' + noteId,
        type: 'get'
    }).done(function (response) {
        if (response.result) {
            var imagesHtml = "";
            if (response.data.photos) {
                for (i = 0; i < response.data.photos.length; i++) {
                    var photo = response.data.photos[i];
                    imagesHtml += "<img style='max-height:90px' class='col-md-3' src='" + photo.link + "' />";
                }
            }
            $(".images").html(imagesHtml);
            $("#noteModal .rlistingId").html("<a href='/listing/" + response.data.rlistingId + "' >" + response.data.rlistingId + "</a>");
            $("#noteModal .note").html(response.data.description);
            $("#noteModal .btn-merger-note").attr("data-rlisting-id", response.data.rlistingId);
            $("#noteModal").modal();
        }
    }).always(function () {
        hidePropzyLoading();
    });
    return false;
}
$("#noteModal .btn-merger-note").on("click", function (event) {
    event.preventDefault();
    var rlistingId = $(this).attr("data-rlisting-id");
    var noteId = $(this).attr("data-note-id");
    mergeNote(noteId, rlistingId);
});

function deleteNote(id) {
    if (!confirm("Bạn có chắc là muốn xóa ghi chú: " + id)) {
        return false;
    }
    var url = "/listing/delete-note/" + id;
    get_sync(url, true, function (response) {
        if (response.result) {
            $(".btn-delete-note-" + id).parents("tr").remove();
        }
    }, true);
    return false;
}
function mergeNote(noteId, rlistingId) {
    var url = "/listing/merge-notes/" + rlistingId + "/" + noteId;
    get_sync(url, true, function (response) {
        showPropzyAlert(response.message);
    }, true);
    return false;
}
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
@stop