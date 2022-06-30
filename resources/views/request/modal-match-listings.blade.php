<!-- modal match listing -->
<div id="modalMatchListing" class="modal fade  " role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Nhập link listing</h4>
            </div>
            <div class="modal-body">
                <table class="table table-bordered tableListingLinks">
                    <tbody></tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-match">Match</button>
            </div>
        </div>

    </div>
</div>
<!-- end modal match listing -->
<script type="text/javascript">
    var ModalMatchListings = (function () {
        var myModal = $("#modalMatchListing");
        function showModal() {
            myModal.modal();
            return false;
        }
        myModal.find(".btn-match").on("click", function (event) {
            event.preventDefault();
            var postData = {
                "rlistingIds": [],
                "listingTypeId": null,
                "propertyTypeId": null,
                "phone": $("#customerPhone").val().trim()

            };

            myModal.find(".listing-link").each(function () {
                var rlistingLink = $(this).val().trim();
                if (rlistingLink && rlistingLink.indexOf('/id') != -1) {
                    rlistingLink = rlistingLink.split("/id");
                    var rlistingId = rlistingLink[rlistingLink.length - 1];
                    rlistingId =  rlistingId.split('?')[0];
                    if (rlistingId) {
                        postData.rlistingIds.push(rlistingId);
                    }
                }else{
                    $(this).css('border','2px solid red');
                }
            });
            if (postData.rlistingIds.length <= 0) {
                showPropzyAlert("Liên kết không hợp lệ");
                return false;
            }
            showPropzyLoading();
            $.ajax({
                url: "/request/match-listings",
                data: JSON.stringify(postData),
                type: "post"
            }).done(function (response) {
                if (response.result) {
                    removeListingLinkInputs();
                    myModal.modal("hide");
                }
                showPropzyAlert(response.message);
            }).always(function () {
                hidePropzyLoading();

            });

        });

        function addListingLinksInput() {
            $(".tableListingLinks tbody").append("<tr><td><input type='text' class='form-control listing-link' /></td><td class='text-center'><button class='btn btn-success addListingLink'><i class='fa fa-plus'></i></button> <button class='btn btn-danger removeListingLink'><i class='fa fa-minus'></i></button></td></tr>");
            initListingLinkButtons();
        }

        function removeListingLinkInputs(){
            $(".tableListingLinks tbody").html("");
            addListingLinksInput();

        }

        function initListingLinkButtons() {

            var btn = myModal.find(".addListingLink");
            btn.unbind("click");
            btn.on("click", function (event) {
                event.preventDefault();
                addListingLinksInput();
            });




            myModal.find(".removeListingLink").on("click", function (event) {
                event.preventDefault();
                if (myModal.find(".removeListingLink").length > 1) {
                    $(this).parents("tr").remove();
                }
            });
        }
        addListingLinksInput();

        return {
            "showModal": showModal
        };
    })();
</script>