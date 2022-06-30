<div id="virtual-touring-modal-preview" class="modal" role="dialog" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Preview Virtual Touring</h4>
            </div>
            <div class="modal-body" id="preview-frame">

            </div>
            <div class="modal-footer">
                <div class="form-group">
                    <label for="virtual-touring-check-ok" class="col-md-6 text-center"><input class="virtual-touring-check" type="radio" id="virtual-touring-check-ok" name="virtual-touring-check" value="1" /> Link đúng rồi</label>
                    <label for="virtual-touring-check-not-good" class="col-md-6 text-center"><input class="virtual-touring-check" type="radio" id="virtual-touring-check-not-good" name="virtual-touring-check" value="0" /> Link sai rồi</label>
                    <div style="clear:both"></div>
                </div>
                <div class="form-group">
                    <button type="button" id="virtual-touring-ok" class="btn btn-primary">Đồng ý</button>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    Window.JS_VIRTUAL_VALIDATE = {
        isChecked: false
    }
    $(function() {
        $('#virtual-touring-modal-preview').on('show.bs.modal', function(e) {
            // if ($('input#virtualTouring').val().trim().length > 0 && !$('input#virtualTouring').val().startsWith('https://my.matterport.com/show/?m=')) {
            //     showPropzyAlert('<strong>Đường link của virtual tour không đúng.</strong> <br/><br/> Link virtual tour phải được tạo từ các plugin được hệ thống hỗ trợ (ví dụ: Matterport). <br/> Vui lòng nhập lại link đúng', null, function(){
            //         $('#virtual-touring-modal-preview').modal('hide');
            //     });
            //     return;
            // }
            $('input.virtual-touring-check').prop('checked', false);
            if (Window.JS_VIRTUAL_VALIDATE.isChecked || Window.jsDetailData.virtualTouringChecked) {
                $('input#virtual-touring-check-ok').prop('checked', true);
            }
        });
        $('button#virtual-touring-ok').click(function() {
            if ($('input.virtual-touring-check:checked').length == 0) {
                showPropzyAlert('Vui lòng cho biết link đúng hay sai !');
                return false;
            }
            if ($('input.virtual-touring-check:checked').val() == 0) {
                $('#virtualTouring').val('');
                $('#virtualTouring').trigger('change');
            }
            $('div#virtual-touring-modal-preview').modal('hide');
        });
        $('input.virtual-touring-check').click(function() {
            if ($(this).val() == '1') {
                Window.jsDetailData.virtualTouringChecked = true;
                Window.JS_VIRTUAL_VALIDATE.isChecked = true;
                return;
            }
            Window.jsDetailData.virtualTouringChecked = false;
            Window.JS_VIRTUAL_VALIDATE.isChecked = false;
        });
    });
</script>