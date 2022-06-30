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
            <table id="notes"  class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Mã tin đăng</th>
                        <th>Người tạo</th>
                        <th>Ngày tạo</th>
                        <th>Nội dung ghi chú</th>
                        <th>Lý do</th>
                        <th>Tình trạng</th>
                        <th>Đã xem</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</section>

<!-- Modal -->
<div id="noteModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Modal Header</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <label class="col-sm-2">rListingId</label>
                    <div class="col-sm-10 rlistingId"></div>
                </div>
                <div class="form-group row">
                    <label class="col-xs-12">Ghi chú</label>
                    <div class="note col-xs-12"></div>
                </div>
                <div class="row">
                    <hr />
                    <div class="images">

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class='btn btn-warning btn-merger-note' href='#' style='margin-left:6px;'>Merge</a>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>


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
    return "<a href='/listing/" + data + "' target='_blank'>" + data + "</a>";
}
var renderNoteId = function (data, type, object) {
    if (!data) {
        return "";
    }
    return "<a onclick='return showNoteModal(" + data + ")' href='/listing/" + data + "'>" + data + "</a>";
}
var renderPhoto = function (data, type, object) {
    if (!data) {
        return "";
    }
    if (object.photos != null && object.photos.length > 0) {
        data = "<img style='max-height:48px;' src='" + object.photos[0].link + "' />";
    }
    return data;
};
var renderAction = function (data, type, object) {
    if (!data) {
        return "";
    }
    var checked = "";
    var disabled = "";
    if(object.isDeleted){
        checked='checked';
        disabled = 'disabled';
    }
    //console.log(object);
    //var returnValue = "<a class='btn btn-danger btn-delete-note-" + data + "'  onclick='return deleteNote(" + object.noteId + ");' href='#'>Xóa</a>";
    var returnValue = "<input type='checkbox' class='checkbox-delete-note-" + data + "' "+checked+"  "+disabled+" value='" + data + "'   onclick='return deleteNote(this, " + object.noteId + ");' >";
    return returnValue;
};
var renderIsFull = function (data, type, object) {
    var returnValue = "Thiếu";
    if (object.isFull) {
        returnValue = "Đầy đủ";
    } else {
        returnValue = ((object.updateFields !== null && object.updateFields.trim() !== '') ? "Đã nhập: " + object.updateFields : "");
    }
    return returnValue;
}
$("#notes").DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": "/listing/notes-list-data",
    "scrollX": false,
    "ordering": false,
    "lengthChange": false,
    "columns": [
        {data: 'rlistingId', render: renderListingLink},
        {data: 'createdByName'},
        {data: 'createdDate', render: dateRender},
        {data: 'descriptionFinal'},
        {data: 'reasonNote'},
        {data: 'isFull', render: renderIsFull},
        {data: 'noteId', render: renderAction}
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

function deleteNote(selector, id) {
    if (!confirm("Bạn có chắc là muốn xóa ghi chú: " + id)) {
        return false;
    }
    if ($(selector).prop('checked')) {
        var url = "/listing/delete-note/" + id;
        get_sync(url, true, function (response) {
            if (response.result) {
                $(selector).prop('disabled', true);
            }
            showPropzyAlert(response.message);
        }, true);
    }
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