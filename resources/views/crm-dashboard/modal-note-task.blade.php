<div id="modalNoteTask" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <form id="formNoteTask" method="post" class="form">
                <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">				
                    <div class="form-group">
                        <label>Ghi chú *</label>
                        <textarea class="form-control" rows="3" name="note" id="note"></textarea>
                        <span class="errors"></span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success btnSave">Save</button>
                </div>
            </form>
        </div>

    </div>
</div>
<script type="text/javascript">
    function showModalNoteTask() {
        $("#modalNoteTask").modal();
    }

//save 
    $("#modalNoteTask .btnSave").on("click", function (event) {
        $("#formNoteTask").find('.errors').html('');
        event.preventDefault();
        var isValidated = true;
        var note = $('#modalNoteTask').find("#note").val();
        if (note.trim() == '') {
            isValidated = false;
            $("#note").parent().find('.errors').html('Chưa nhập ghi chú');
        }

        if (note.trim() != '') {
            note = note.trim();
        } else {
            note = null;
        }

        if (isValidated == false) {
            return false;
        }

        var postData = {
            "taskId": taskId,
            "defineId": defineId,
            "note": note,
        };
        //console.log(postData);

        showPropzyLoading();
        $.ajax({
            url: '/crm-dashboard/save-task-form-hash-map/' + taskId,
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                window.location.href = "/";
                // $("#modalSolveCanceledTour").modal('hide');
                // $("#note").val('');
                // showModalCreateTasks(taskId);
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });

        $("#modalNoteTask").modal('hide');
        hidePropzyLoading();

    });
</script>