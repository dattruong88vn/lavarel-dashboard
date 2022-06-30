<div id="modalShowLogListing" class="modal fade modalShowLogListing" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close btn-close-modal-log-listings">&times;</button>
                <h4 class="modal-title">Nội dung cập nhật</h4>
            </div>
            <div class="modal-body">	
                <table class="table table-bordered table-striped" id="datatableLogListing">
                    <thead>
                        <tr>
                            <th>Ngày</th>
                            <th>Loại</th>
                            <th>Người</th>
                            <th>Nội dung</th>
                            <th>Xem xét</th>
                            <th>Thích/Không thích</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success addListingNote"><i class="glyphicon glyphicon-plus"></i></button>
            </div>
        </div>
    </div>
</div>

<div id="modalNoteListing" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">				
                <input type="hidden" class="rlistingId" value="" />
                <div>
                    <textarea class="note form-control" rows="8"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success btnSave">Lưu</button>
            </div>
        </div>
    </div>
</div>

<script>
    var viewLogListingDataTable = null;
    var modalNoteListing = $("#modalNoteListing");
    $(".btn-close-modal-log-listings").on("click", function(event){
        event.preventDefault();
        $('#modalShowLogListing').modal("hide");

    });
    function getLogListing(listingID) {
        showPropzyLoading();
        $.fn.dataTableExt.sErrMode = 'throw';
        try {
            viewLogListingDataTable.destroy();
        } catch (ex) {
        }
        viewLogListingDataTable = $("#datatableLogListing").DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "/deal/get-log-for-listing/" + listingID,
            //"ajax": "/deal/get-log-for-listing/13677",
            "ordering": false,
            "lengthChange": false,
            "searching": false,
            "columns": [
                {"data": "createdDate"},
                {"data": "typeName"},
                {"data": "name"},
                {"data": "reason"},
                {"data": "investigate"},
                {"data": "customerFeedback"}
            ],
            "order": [[1, "desc"]],
            "initComplete": function (settings, json) {
                hidePropzyLoading();
            }
        });
        $('#modalShowLogListing').modal();
        modalNoteListing.find(".rlistingId").val(listingID);
        $("#modalShowLogListing").find(".addListingNote").on("click", function (event) {
            event.preventDefault();
            modalNoteListing.modal();
            $("#modalShowLogListing").modal("hide");
        });
    }
    function defineGetLogListing() {
        $(".getLogListing").on("click", function (event) {
            event.preventDefault();
            var listingID = $(this).attr('data-listing-id');
            $('#modalShowLogListing').modal();
            getLogListing(listingID);
        });
    }
    modalNoteListing.find(".btnSave").on("click", function (event) {
        event.preventDefault();
        var postData = {
            rlistingId: parseInt(modalNoteListing.find(".rlistingId").val()),
            content: modalNoteListing.find(".note").val()
        };
        showPropzyLoading();
        $.ajax({
            url: "/listing/comment",
            data: JSON.stringify(postData),
            type: "post"
        }).done(function (response) {
            alert(response.message);
            if (response.result) {
                modalNoteListing.modal("hide");
                modalNoteListing.find(".note").val("");
                getLogListing(postData.rlistingId);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });

</script>