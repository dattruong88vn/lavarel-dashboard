<div id="modal-register-to-training" style="z-index: 1051" class= "modal fade" role = "dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="title-traing-action">Chọn khóa học lại</h4>
            </div>
            <div class="modal-body">
                <div id="content-transfer-training">
                    <div class="form-group">
                        <select name="transfer-training" class="form-control">
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="submit-transfer-training" class="btn btn-primary">CHuyển</button>
                    <button type="button" data-dismiss="modal" class="btn btn-danger">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(document).ready(function () {
        $("select[name='transfer-training']").select2({
            placeholder: 'Chọn khóa học',
            ajax: {
                url: '/pos/training/get-training-short-list',
                dataType: 'json',
                delay: 250,
                processResults: function (data) {
                    return {
                        results: data
                    };
                },
                cache: true
            }
        });
    });

</script>
