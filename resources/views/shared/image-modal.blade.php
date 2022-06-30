<div id="imageModal" class="modal fade" role="dialog">
    <div class="modal-dialog" style="top: 50%;transform: translateY(-50%);">
        <!-- Modal content-->
        <div class="modal-content" style="background: transparent; border: 0px; box-shadow:none">
            <div class="modal-header" style="border-bottom: 0px">
                <button type="button" class="close" data-dismiss="modal" style="color:white;opacity:unset">&times;</button>
            </div>
            <div class="modal-body">
                <img id="imageUrl" src="{{env('URL_IMAGE_POPUP')}}?v={{base64_encode(env('URL_IMAGE_POPUP'))}}" />
            </div>
            <div class="modal-footer" style="border-top: 0px">

            </div>
        </div>

    </div>
</div>

<script type="text/javascript">
    if({{env('OPEN_IMAGE_POPUP')}}) {
        if(<?php echo Session::get("openImage")?>)  {
            let img = document.getElementById('imageUrl'); 
            let width = img.width;
            $("#imageModal .modal-content").css({width: `${width+30}px`});
            $("#imageModal").modal({backdrop: 'static', keyboard: false});
        }
    }
        
    $("#imageModal").on('hide.bs.modal', function() {
        $.ajax({
            url: "/index/closeImageModal",
            type: "get",
        }).done(function(response) {
        })
    });

</script>