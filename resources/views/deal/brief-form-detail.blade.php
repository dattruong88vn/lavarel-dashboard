<div id="modalContactNote" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Propzy</h4>
            </div>
            <div class="modal-body">
                <div style="height:100%;overflow: scroll">
                    <form id="formContactNote" method="post" class="form-horizontal" action="/deal/save-brief-form">
                        <input type="hidden" name="id" value="{{$data->id}}" />
                        <!--
                        <input type="hidden" name="orderId" value="{{$data->orderId}}" />
                        <input type="hidden" name="contactId" id="contactId" value="{{$data->contactId}}"  />
                        -->
                        <input type="hidden" name="longitude" id="longitude" value="{{$data->longitude}}" />
                        <input type="hidden" name="latitude" id="latitude" value="{{$data->latitude}}" />
                        <input type="hidden" name="isTransferToLs" id="isTransferToLs" value=false />
                        <input type="hidden" name="photo" id="photo" value="{{json_encode($data->photos)}}" />
                        <div class="form-group">
                            <label class="col-sm-2">Địa chỉ</label>
                            <div class="col-sm-10">
                                <input type="text" name="address" id="address" class="form-control required" value="{{$data->address}}" />
                                <div class="errors"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2">Liên hệ</label>
                            <div class="col-sm-10"><input type="text" name="name" id="name" class="form-control" value="{{$data->name}}" /></div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2">Số ĐT</label>
                            <div class="col-sm-10">
                                <input type="text" name="phone" id="phone" class="form-control required" value="{{$data->phone}}"  />
                                <div class="errors"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2">Note</label>
                            <div class="col-sm-10"><input type="text" name="note" id="note" class="form-control" value="{{$data->note}}"   /></div>
                        </div>

                        <div class="form-group">
                            <div class="col-xs-12">
                                <!--Images/Video-->
                                <div class="col-md-12 col-xs-12">
                                    <div class="form-group imageListing">
                                        <label>Hình ảnh</label>
                                        <div class="errors" ></div>
                                        <input class="file-image" multiple type="file" class="file" data-upload-url="/imageListingUploader">
                                    </div>
                                </div>
                                <!-- #Images/Video-->
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success btn-transfer-to-ls">Chuyển cho LS</button>
                <button class="btn btn-success btn-save-brief-form">Lưu</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>
<script>
    $(document).ready(function () {
        var photos = null;
        if ($("#photo").val().trim() !== "") {
            photos = JSON.parse($("#photo").val().trim());
        }
        var photoPath = [];
        var pathConfig = [];
        if (photos) {
            $(photos).each(function (index, item) {
                console.log(item);
                linkArr = item.split("/");
                fileid = linkArr[linkArr.length - 1].split(".");
                photoPath.push("<img src='" + item + "' class='file-preview-image' fileid='" + fileid[fileid.length - 2] + "' name='" + fileid[fileid.length - 2] + "' alt='" + linkArr[linkArr.length - 1] + "' title='" + linkArr[linkArr.length - 1] + "' /> <div class='checkbox'></div>");

                pathConfig.push({
                    caption: "",
                    width: '120px',
                    url: "/imageListingRemover",
                    key: linkArr[linkArr.length - 1]
                });
            });
        }


        $(".file-image").fileinput({
            deleteUrl: "/imageListingRemover",
            allowedFileExtensions: ['jpg', 'png', 'gif'],
            initialPreview: photoPath,
            initialPreviewConfig: pathConfig,
            overwriteInitial: false,
            allowedFileTypes: ['image'],
            slugCallback: function (filename) {
                return filename.replace('(', '_').replace(']', '_');
            }
        }).on('fileenabled', function () {
            $('.file-preview-thumbnails').css('position', 'relative');
        });
        $(".file-image").fileinput('enable');


        $(".btn-save-brief-form").click(function (event) {
            event.preventDefault();
            saveBriefForm();
        });

        $(".btn-transfer-to-ls").click(function (event) {
            event.preventDefault();
            $("#isTransferToLs").val(true);
            saveBriefForm();
        });
        $("#modalContactNote").modal();
    });
    function saveBriefForm() {
        var form = "#formContactNote";
        if ($(form + ' .file-preview-frame').length == 0)
        {
            $(form + ' .imageListing .errors').html('Vui lòng chọn ít nhất một tấm ảnh');
            $(form + ' .imageListing').focus();
            return false;
        }
        if ($(form + ' .imageListing').find('.kv-upload-progress .progress-bar-success').length > 0) {
            if ($(form + ' .imageListing .kv-upload-progress').find('.progress-bar-success').attr('aria-valuenow') < 100)
            {
                $(form + ' .imageListing .errors').html('Quá trình upload ảnh chưa xong!');
                return false;
            }
        }


        var photos = [];
        $(form + " .imageListing .file-preview .file-preview-initial").each(function (idx, element) {
            var fileName = $(element).find("img").attr('src');
            photos.push(fileName);
        });
        $(form + ' #photo').val(JSON.stringify(photos));
        showPropzyLoading();
        $.ajax({
            url: "/deal/save-brief-form",
            type: 'POST',
            data: $("#formContactNote").serialize()
        }).done(function (response) {
            if (response.result) {
                $("#modalContactNote").modal('hide');
                showPropzyAlert(response.message);
                window.location=window.location;
            }
        }).always(function () {
            hidePropzyLoading();
        });

    }
</script>
