<div id="modalUpdateAfterView" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <form id="formUpdateAfterView" method="post" class="form-horizontal">
                <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Phản hồi của KH cho từng listing</h4>
                </div>
                <div class="modal-body">				
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Tên Listing</th>
                                <th>Thích/Không Thích</th>
                                <th>Tại sao</th>
                                <th>Xem xét</th>
                            <tr>
                        </thead>
                        <tbody id="listingFeedbackForms"></tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success btnSave">Save</button>
                </div>
            </form>
        </div>

    </div>
</div>

<script type="text/javascript">
    function showModalUpdateAfterView(listingIds) {
        $("#modalUpdateAfterView").modal();
        var html = '';
        var numberListing = listingIds.length;
        for (var i = 0; i < numberListing; i++) {
            var item = listingIds[i];
            html += '<tr>';
            html += '<td>' + item + '</td>';
            html += '<td>';
            html += '<input type="hidden" name="listingIds[]" value="' + item + '">';
            html += '<select class="form-control" id="customerFeedback_' + item + '" name="customerFeedback_' + item + '">';
            html += '<option value="">Chọn</option>';
            html += '<option value="1">Có</option>';
            html += '<option value="0">Không</option>';
            html += '</select>';
            html += '<span class="errors"></span>';
            html += '</td>';
            html += '<td>';
            html += '<input type="text" class="form-control" placeholder="" id="reason_' + item + '" name="reason_' + item + '">';
            html += '<span class="errors"></span>';
            html += '</td>';
            html += '<td>';
            html += '<select class="form-control" id="investigate_' + item + '" name="investigate_' + item + '">';
            html += '<option value="">Chọn</option>';
            html += '<option value="1">Có</option>';
            html += '<option value="0">Không</option>';
            html += '</select>';
            html += '<span class="errors"></span>';
            html += '</td>';
            html += '</tr>';

        }
        $("#listingFeedbackForms").html(html);
    }

//save 
    $("#modalUpdateAfterView .btnSave").on("click", function (event) {
        $("#formUpdateAfterView").find('.errors').html('');
        event.preventDefault();
        var isValidated = true;
        var detail_datas = [];
        var numberListing = 0;
        $('input[name="listingIds[]"]').each(function () {
            var listingItem = $(this).val();
            var customerFeedback = $("#customerFeedback_" + listingItem + " option:selected").val();
            var reason = $("#reason_" + listingItem).val();
            var checkReson = true;
               if (customerFeedback.trim() == '') {
                   isValidated = false;
                   $("#customerFeedback_" + listingItem).parent().find('.errors').html('Chưa chọn');
               }
               if (parseInt(customerFeedback) == 1) {
                   var checkReson = false;
               }

               if (reason.trim() == '' && checkReson) {
                   isValidated = false;
                   $("#reason_" + listingItem).parent().find('.errors').html('Chưa nhập');
               }

            if (customerFeedback.trim() != '') {
                customerFeedback = parseInt(customerFeedback);
            } else {
                customerFeedback = null;
            }

            if (reason.trim() != '') {
                reason = reason.trim();
            } else {
                reason = null;
            }

            var investigate = $("#investigate_" + listingItem).val();
            if (investigate.trim() == '') {
                isValidated = false;
                $("#investigate_" + listingItem).parent().find('.errors').html('Chưa nhập');
            }
            if (investigate.trim() != '') {
                investigate = parseInt(investigate);
            } else {
                investigate = null;
            }
            numberListing++;
            //console.log(customerFeedback);
            //console.log(reason);
            //console.log(investigate);
            var detail_data = {
                "listingId": parseInt(listingItem),
                "customerFeedback": customerFeedback,
                "reason": reason,
                "investigate": investigate,
            };
            //check nếu không chọn thích/không thích thì khỏi post
            if (customerFeedback != null) {
                detail_datas.push(detail_data);
            }
        });

        if (isValidated == false) {
            return false;
        }
        
        var postData = {
            "numberListing": numberListing,
            "details": detail_datas,
        }

        //console.log(postData);
        showPropzyLoading();
        $.ajax({
            url: '/crm-dashboard/save-task-form/' + taskId + '/' + defineId,
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                $("#modalUpdateAfterView").modal('hide');
                $(".dashboard .negotiate-button").show();
                showModalCreateTasks(taskId);
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });

    });
</script>
