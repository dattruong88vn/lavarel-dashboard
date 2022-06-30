<!-- make call -->
<div id="transferPS" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <form id="formTransferPSModal" method="post" class="form">
                <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
                <input type="hidden" id="dealId" name="dealId" value="{{$deal->dealId}}" />
                <input type="hidden" id="rlistingIdsToPS" name="rlistingIdsToPS" value=""/>
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4>Các loại dịch vụ</h4>
                </div>
                <div class="modal-body">				
                    <div id="propzyServices"></div>
                    <div class="form-group">
                        <label for="">Ghi chú:</label>
                        <textarea id="content" name="content" class="form-control" placeholder="Ghi chú"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success" id="btnDoTransferPS">Gửi PS</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Hủy bỏ</button>
                </div>
            </form>
        </div>

    </div>
</div>
<!-- end make call -->

<script type="text/javascript">
    var TransferToPS = (function () {
        var myModal = $("#transferPS");
        $(".btnShowTransferPSForm").on("click", function (event) {
            event.preventDefault();
            var rListingIds = [];
            var txtRListingIds = $('#arrayStoreListingForAction').val().trim();
            if (txtRListingIds.length <= 0) {
                showPropzyAlert('Không có listing để gửi');
                return false;
            }
            var rListingIds = JSON.parse($('#arrayStoreListingForAction').val());
            if (rListingIds.length <= 0) {
                showPropzyAlert('Không có listing để gửi');
                return false;
            } else if (rListingIds.length > 1) {
                showPropzyAlert('Chỉ được chọn tối đa 1 listing');
                return false;
            }
            // \\ Jack's code

            $("#rlistingIdsToPS").val(rListingIds);
            showPropzyLoading();
            $.ajax({
                url: "/deal/get-list-service-type/?rlistingId="+rListingIds,
                type: "get"
            }).done(function (response) {
                var html = "";
                if (response.result) {
                    for (var i = 0; i < response.data.length; i++) {
                        var item = response.data[i];
                        //html += '<label class="col-sm-8">'+item.name+'</label>';
                        //html += '<div class="col-sm-4">';
                        //html += '<label>';
                        //html += '<input value="'+item.name+'" name="services['+item.id+']" type="checkbox">';
                        //html += '</label>';
                        //html += '</div>';
                        html += '<div class="checkbox">';
                        html += '<label>';
                        html += '<input value="' + item.name + '" name="services[' + item.id + ']" type="checkbox"> ' + item.name;
                        html += '</label>';
                        html += '</div>';
                    }
                }
                $("#propzyServices").html(html);
                myModal.modal();
            }).always(function () {
                hidePropzyLoading();
            });
        });
        $("#btnDoTransferPS").on("click", function (event) {
            event.preventDefault();
            showPropzyLoading();
            $.ajax({
                url: "/deal/transfer-ps",
                data: $("#formTransferPSModal").serialize(),
                type: "post"

            }).done(function (response) {
                // console.log(response);return false;
                if(response.result){                    
                    window.location.reload();
                }
                showPropzyAlert(response.message);
                myModal.modal("hide");
            }).always(function () {
                hidePropzyLoading();
            });
        });
    })();
</script>