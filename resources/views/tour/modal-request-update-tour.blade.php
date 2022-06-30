<div id="modalRequestUpdatetour" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

                <h4 class="modal-title">Yêu cầu thay đổi thông tin tour</h4>
            </div>

            <div class="modal-body">
                <input type="hidden" class="scheduleId" value="" />

                <div class="form-group row row-rlistings">
                    <div class="col-sm-12">
                        <div class="group-listings"></div>
                        <div class="errors errors-listings"></div>
                    </div>    
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-success btnSend" >Gửi</button>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    var ModalRequestUpdateTour = (function(){

        var modal = null;

        var validateForm = function(postData){
            var isValid = true;
            modal.find(".errors").html("");
            if(postData.listingsInfor.length<=0){
                    modal.find(".errors-listings").html("Chọn listing");
                    isValid = false;                    

            }
            for(let i=0;i<postData.listingsInfor.length; i++){
                var listingsInfor = postData.listingsInfor[i];
                console.log(listingsInfor);
                if(listingsInfor.reasonId==""){
                    modal.find(".errors-reasonId-"+listingsInfor.rlistingId).html("Chọn lý do");
                    isValid = false;
                    continue;                    
                }
                if($.inArray(parseInt(listingsInfor.reasonId),[12, 13, 14])==-1 && listingsInfor.note.trim()==""){
                    modal.find(".errors-note-"+listingsInfor.rlistingId).html("Nhập nội dung gửi đi");
                    isValid = false;
                }

            }

            return isValid;
        }

        var initModal = function(){
            if(modal==null){
                modal = $("#modalRequestUpdatetour");
                modal.find(".btnSend").on("click", function(event){
                    event.preventDefault();
                    var postData = {
                        "scheduleId": modal.find(".scheduleId").val(),
                        "listingsInfor": []
                    };
                    modal.find(".rlistingId:checked").each(function(){
                        var id = $(this).val();
                        if(id){

                            var listingsInfor = {
                              "note": modal.find(".note-"+id).val(),
                              "rlistingId": parseInt(id),
                              "reasonId": modal.find(".reasonId-"+id).val()
                            };


                            postData.listingsInfor.push(listingsInfor);
                        }
                    });
                    if(!validateForm(postData)){
                        return false;
                    }
                    console.log(postData);
                    showPropzyLoading();
                    $.ajax({
                        "url": "/tour/push-change-info-to-cc",
                        "type": "post",
                        "data": JSON.stringify(postData)
                    }).done(function(response){
                        if(response.result){
                            modal.modal("hide");
                        }
                        showPropzyAlert(response.message);
                    }).always(function(){
                        hidePropzyLoading();
                    });
                });
            }            
        }

        var showModal = function(params){
            initModal();
            $.ajax({
                "url": "/tour/get-change-tour-info-reasons",
                "type": "post"
            }).done(function(response){
                var htmlReasons = "<option value=''>Chọn lý do</option>";
                if(response.result){
                    for(var i=0;i<response.data.length;i++){
                        var item = response.data[i];
                        htmlReasons += "<option value='"+item.id+"'>"+item.name+"</option>";
                    }
                }

                var htmlListings = "<table class='table table-borderess'>";
                for(var i=0;i<params.rlistingIds.length; i++){
                    var listing = params.rlistingIds[i];
                    htmlListings += "<tr>";
                    htmlListings += "<td><input type='checkbox' class='rlistingId' value='"+listing.rlistingId+"' /></td>";
                    htmlListings += "<td>"+listing.address+"</td>";
                    htmlListings += "<td><select class='form-control reasonId reasonId-"+listing.rlistingId+"' data-rlisting-id = '"+listing.rlistingId+"'>";
                    htmlListings += htmlReasons;
                    htmlListings += "</select><div class='errors errors-reasonId-"+listing.rlistingId+"'></div></td>";
                    htmlListings += "<td><input class='form-control note note-"+listing.rlistingId+"' /><div class='errors errors-note-"+listing.rlistingId+"'></div></td>";
                    htmlListings += "</tr>"
                }
                htmlListings += "</table>";
                modal.find(".scheduleId").val(params.scheduleId);
                modal.find(".group-listings").html(htmlListings);
                modal.find(".note").hide();
                modal.modal();
                initSelectReason();
            }).always(function(){

            });
        }



        var initSelectReason = function(){            

                modal.find('.reasonId').change(function(){
                    modal.find(".errors").html("");
                    var value = $(this).val();   
                    var rlistingId = $(this).attr("data-rlisting-id");
                    if(value!=""){
                        if($.inArray(parseInt(value),[12, 13, 14])==-1){
                            modal.find(".note-"+rlistingId).show();
                        }else{
                            modal.find(".note-"+rlistingId).hide();
                        }
                    }
                });
        }

        return {
            "showModal": showModal
        }
    })();
</script>