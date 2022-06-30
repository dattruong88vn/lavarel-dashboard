function confirmMeeting() {
    if (typeof lead.requiredAction !== 'undefined' && lead.requiredAction != "") {
        loadMeetingReason((optionString) => {
            $.confirm({
                title: 'Không tạo meeting!',
                content: '' +
                    '<form action="/lead/meeting-not-created" method="post" id="meeting-not-created">' +
                    '<input type="hidden" name="_token" value="{{ csrf_token() }}">' +
                    '<div class="form-group">' +
                    '<input type="hidden" value="' + lead.leadId + '"  name="leadId" class="leadId" />' +
                    '<label>Chọn lý do</label>' +
                    '<select class="form-control reasonId" name="reasonId"><option value="">-Chọn lý do-</option>' + optionString + '</select>' +
                    '<label>Ghi chú</label>' +
                    '<textarea name="note" class="form-control note"></textarea>' +
                    '</div>' +
                    '</form>',
                buttons: {
                    formSubmit: {
                        text: 'Gửi',
                        btnClass: 'btn-blue',
                        action: function() {
                            var name = this.$content.find('.reasonId').val();
                            if (!name) {
                                $.alert('Vui lòng chọn 1 lý do');
                                return false;
                            }
                            this.$content.find('form')[0].submit();
                        }
                    }
                },
                onContentReady: function() {
                    // bind to events
                    var jc = this;
                    this.$content.find('form').on('submit', function(e) {
                        // if the user submits the form by pressing enter in the field.
                        e.preventDefault();
                        jc.$$formSubmit.trigger('click'); // reference the button and click it
                    });
                }
            });
        });
    } else {
        $('#modalCreateMeeting').modal('hide');
    }
}

const loadMeetingReason = (callBack) => {
    axios.get(fullPathApiMeetingReason).then(xhr => {
        const response = xhr.data;
        if(response.result){
            const reasons = response.data;
            const reasonsString = reasons.map((reason,index)=>{
                return `<option value="${reason.id}">${reason.name}</option>`;
            }).join('');
            callBack(reasonsString);
        }
    }).catch(err => {
        console.error(err);
    });
}

// init
$(document).ready(()=>{})