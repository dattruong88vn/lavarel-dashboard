<!-- Trigger the modal with a button -->
<!-- <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#updateCustomerAgent">Open Modal</button> -->

<!-- Modal -->
<form id="updateCustomerAgent" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Thông tin khách mua</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="phone">Số điện thoại khách hàng <span class="error">(*)</span></label>
            <input type="text" class="form-control" name="phone" id="phone">
        </div>
        <div class="form-group">
            <label for="name">Họ tên khách hàng <span class="error">(*)</span></label>
            <input type="text" class="form-control" name="name" id="name">
        </div>
        <div class="form-group">
            <label for="cmnd">Số CMND khách hàng <span class="error">(*)</span></label>
            <input type="text" class="form-control" name="cmnd" id="cmnd">
        </div>
      </div>
      <div class="modal-footer">
          <button type="submit" class="btn btn-primary">Lưu</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
      </div>
    </div>

  </div>
</form>
<script src="{{loadAsset("/plugins/jquery-validation/dist/jquery.validate.js")}}"></script>
<script type="text/javascript">
    $(document).ready(function () {

    var validator = $('#updateCustomerAgent').validate({
        rules: {
            name: {
                required: true
            },
            phone: {
                required: true,
                number: true
            },
            cmnd: {
                required: true,
                number: true
            }
        },messages: {
            name: {
                required: "Nhập họ tên khách hàng"
            },
            phone: {
                required: "Nhập số điện thoại khách hàng",
                number: "Số điện thoại không đúng"
            },
            cmnd: {
                required: "Nhập số CMND khách hàng",
                number: "Số CMND không đúng"
            }
        },     
        highlight: function (element) {
            // $(element).closest('.form-group').removeClass('success').addClass('error');
        },
        success: function (element) {
            // element.text('OK!').addClass('valid')
            //     .closest('.form-group').removeClass('error').addClass('success');
        }
    });
    $('#updateCustomerAgent').on('submit',function(event){
        event.preventDefault();
        if(validator.form()){
            let plusUrl = "";
            if(typeof lead != "undefined"){
                plusUrl = `&leadId=${lead.leadId}`;
            }else if(typeof deal != "undefined"){
                plusUrl = `&dealId=${deal.dealId}`;
            }
            $.ajax({
                url: `/agent/update-customer-info`,
                data: $( this ).serialize()+plusUrl,
                type: "POST"
            }).done(function (response) {
                showPropzyAlert(response.message);
                if (response.result) {
                    $(this).modal('hide');
                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                }
            }).always(function () {
                $("#ajax-loading").hide();
            });
        }
    })
});
</script>