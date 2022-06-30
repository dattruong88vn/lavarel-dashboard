<!-- modal nhập email agent -->
<div id="modalAddEmailAgent" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content add-email-agent">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
                <h4 class="modal-title">Email Agent chưa có, vui lòng nhập email</h4>
            </div>
            <div class="modal-body body-input-email">
                <input id="newAgentEmail" name="newAgentEmail" type="text" class="form-control" placeholder="N/A" value="" />
                <div class="errors" ></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-add-email">Xác nhận</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- end modal nhập email agent -->

<!-- modal : email = 0; phone > 1 : choose phone  -->
<div id="modalChooseMainPhone" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content choose-main-phone">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
                <h4 class="modal-title">Chọn số điện thoại để đăng nhập</h4>
            </div>
            <div class="modal-body body-choose-main-phone">
                <div id="phoneList" class="phoneList col-md-12 row">
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-choose-main-phone">Xác nhận</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- modal : email > 1; phone = 1 : choose email  -->
<div id="modalChooseMainEmail" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content choose-main-email">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
                <h4 class="modal-title">Chọn email để đăng nhập</h4>
            </div>
            <div class="modal-body body-choose-main-email">
                <div id="emailList" class="emailList col-md-12 row">
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-choose-main-email">Xác nhận</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- modal 0 : email > 1; phone > 1  : choose email + phone -->
<div id="modalChooseMainPhoneEmail" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content choose-main-phone-email">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
                <h4 class="modal-title">Chọn số điện thoại và email để đăng nhập</h4>
            </div>
            <div class="modal-body body-chosen-main">
                <div id="emailListing" class="emailList col-md-12 row">
                    
                </div>
                <div id="phoneList" class="phoneList col-md-12 row">
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-chosen-main-email-phone">Xác nhận</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- end modal 0 -->

<div id="modalAddInfosNewCustomer" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
                <h4 class="modal-title">Thêm thông tin khách hàng mới</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <div class="form-row row">
                        <label for="" class="col-sm-2 control-label">Tên <span class="required">(*)</span></label>
                        <div class="col-sm-4">
                            <input class="form-control" id="customerName" name="customerName" placeholder="N/A" value=""/>
                            <div class="errors"></div>
                        </div>
                        <label for="" class="col-sm-2 control-label">Phone <span class="required">(*)</span></label>
                        <div class="col-sm-4">
                            <input id="customerPhone" name="customerPhone" type="number" class="form-control" placeholder="N/A"  value=""/>
                            <div class="errors" ></div>
                        </div>
                    </div>
                    <div class="form-row row">
                        <label for="" class="col-sm-2 control-label">Email</label>
                        <div class="col-sm-4">
                            <input id="customerEmail" name="customerEmail" type="text" class="form-control" placeholder="N/A"   value="" />
                            <div class="errors" ></div>
                        </div>
                        <label for="" class="col-sm-2 control-label">Nguồn  <span class="required">(*)</span></label>
                        <div class="col-sm-4">
                            <select required id="sourceId" name="sourceId" class="form-control">
                                <option value="">N/A</option>
                                <?php foreach ($sources as $source): ?>
                                    <option value="{{$source->sourceId}}">{{$source->sourceName}}</option>
                                <?php endforeach; ?>
                            </select>
                            <div class="errors" ></div>
                        </div>
                    </div>
                    <div class="form-row row">
                        <label for="" class="col-sm-2 control-label">Đối tượng  <span class="required">(*)</span></label>
                        <div class="col-sm-4">
                            <select required id="subjectId" name="subjectId" class="form-control">
                                <option value="">N/A</option>
                                <?php foreach ($subjects as $subject): ?>
                                    <option value="{{$subject->subjectId}}">{{$subject->subjectName}}</option>
                                <?php endforeach; ?>
                            </select>
                            <div class="errors" ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-add-infos">OK</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- modal 1 : chọn khi có nhiều khách hàng -->
<div id="modalChooseCustomer" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content choose-customer-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
                <h4 class="modal-title">Thông tin đã tồn tại trong hệ thống</h4>
            </div>
            <div class="modal-body">
                <table class="table table-align">
                    <thead class="thead-align">
                        <th style="width:10%;"></th>
                        <th style="width:30%;">Mã khách hàng</th>
                        <th style="width:60%;">Họ tên khách hàng</th>
                    </thead>
                    <tbody id="customers-infos" class="content-customer">
                        
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-choose">Xác nhận</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- end modal 1 -->

<!-- modal 2 : chọn customer hoặc agent -->
<div id="modalChooseCustomerOrAgent" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content choose-customer-or-agent">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
                <h4 class="modal-title">Chọn Customer hoặc Agent</h4>
            </div>
            <div class="modal-body body-customer-agent">
                <div class="col-md-6">
                    <input class="customer-agent" type="radio" name="customer_agent" value="customer"/> Customer
                </div>
                <div class="col-md-6">
                    <input class="customer-agent" type="radio" name="customer_agent" value="agent"/> Agent
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-select-customer-agent">Xác nhận</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- end modal 2 -->

<!-- modal 3 : xác nhận hoặc hủy agent -->
<div id="modalConfirmCreateAgent" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content confirm-agent">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
                <h4 class="modal-title">Xác nhận thông tin Agent</h4>
            </div>
            <div class="modal-body body-confirm-agent">
                <div id="name-agent" class="col-md-12 row-agent name-agent">
                    Tên Agent:
                </div>
                <div id="dealIds" class="col-md-12 row-agent dealIds">
                    DealIds:
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-confirm-agent">Xác nhận</button>
                <button type="button" class="btn btn-danger btn-cancel-agent">Hủy</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- end modal 3 -->


<script type="text/javascript">
    var isValidEmail = function(email) {
	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return re.test(email);
	};
    
    var inputAllowNumber = function(input, allowSeparator){
        allowSeparator = (typeof allowSeparator !== 'undefined' ? allowSeparator : true);
        if($.isArray(input)) {
            $.each(input,function(index,element) {
                $(element).on('input', function () {
                    var text = $(this).val().match(/[\d]/g);
                    if(allowSeparator)
                        var text = $(this).val().match(/[\d\.]/g);
                    text = !!text ? text.join("") : "";
                    $(this).val(text);
                });
            });
        }else{
            $(input).on('input', function () {
                var text = $(this).val().match(/[\d]/g);
                if(allowSeparator)
                    var text = $(this).val().match(/[\d\.]/g);
                text = !!text ? text.join("") : "";
                $(this).val(text);
            });
        }
    };
    
    var ModalAddInfosNewCustomer = (function () {
        var dataSend = {};
        var myModal = $("#modalAddInfosNewCustomer");
        var modalFrist = $("#modalChooseCustomer");
        var modalSecond = $('#modalChooseCustomerOrAgent');
        var modalThird = $('#modalConfirmCreateAgent');
        
        var showModal = function (params) {
            dataSend = params;
            myModal.modal();
        };
        
        inputAllowNumber("#customerPhone",false);
        //
        myModal.find(".btn-add-infos").on("click", function (event){
            event.preventDefault();
            myModal.find('.errors').html('');
            var isValidated = true;
            var customerName = myModal.find("#customerName").val();
            if(customerName.trim() === ''){
                $("#customerName").parent().find('.errors').html('Nhập tên');
                isValidated = false;
            }
            var customerPhone = myModal.find("#customerPhone").val();
            if(customerPhone.trim() === ''){
                $("#customerPhone").parent().find('.errors').html('Nhập số điện thoại');
                isValidated = false;
            }
            if(customerPhone.trim().length > 15 || customerPhone.trim().length < 10){
                $("#customerPhone").parent().find('.errors').html('Số điện thoại không hợp lệ');
                isValidated = false;
            }
            var customerEmail = myModal.find("#customerEmail").val().trim();
            if(customerEmail != '' && !isValidEmail(customerEmail)){
                $("#customerEmail").parent().find('.errors').html('Email không hợp lệ');
                isValidated = false;
            }
            var sourceId = myModal.find("#sourceId").val();
            if(sourceId === ''){
                $("#sourceId").parent().find('.errors').html('Chọn nguồn');
                isValidated = false;
            }
            var subjectId = myModal.find("#subjectId").val();
            if(subjectId === ''){
                $("#subjectId").parent().find('.errors').html('Chọn đối tượng');
                isValidated = false;
            }
            if (false === isValidated) {
                return false;
            }
            dataSend['newCustomerInfo'] = {
                "customerName":customerName,
                "customerPhone":customerPhone,
                "customerEmail":customerEmail,
                "sourceId":sourceId,
                "subjectId":subjectId
            };
            console.log(dataSend);
            showPropzyLoading();
            $.ajax({
                url: '/request/add-new-infos-customer',
                type: 'post',
                data: JSON.stringify(dataSend)
            }).done(function (response) {
                myModal.find("#customerName").val('');
                myModal.find("#customerPhone").val('');
                myModal.find("#customerEmail").val('');
                myModal.find("#sourceId option:selected").prop('selected', false);
                myModal.find("#subjectId option:selected").prop('selected', false);
                if(response.result){
                    //console.log('Thao tác thành công');
                    showPropzyAlert('Thêm thông tin khách hàng thành công');
                    myModal.modal('hide');
                    window.location.reload();
                }else{
                    if(response.data.errorsType == 'ERROR_MULTI_CUSTOMERS')
                    {
                        modalFrist.modal({
                            backdrop: 'static',
                            keyboard: false
                        });
                        var html = '';
                        for(var i=0;i<response.data.customers.length;i++){
                            html+= '<tr>';
                            html+= '<td>';
                            html+= '<input class="select-id" name="chosen" type="radio" value="'+response.data.customers[i].customerId+'"/>';
                            html+= '</td>';

                            html+= '<td>';
                            html+= response.data.customers[i].customerId;
                            html+= '</td>';

                            html+= '<td>';
                            html+= response.data.customers[i].name;
                            html+= '</td>';
                            html+= '</tr>';
                        }
                        modalFrist.find('#customers-infos').html(html);
                        modalFrist.find(".btn-choose").on("click", function (event){
                            event.preventDefault();
                            var selectedCustomerId = modalFrist.find('input[name="chosen"]:checked').val();
                            if(!selectedCustomerId){
                                showPropzyAlert('Vui lòng chọn 1 khách hàng');
                                return false;
                            }
                            dataSend['selectedCustomerId'] = selectedCustomerId;
                            console.log(dataSend);
                            showPropzyLoading();
                            $.ajax({
                                url: '/request/add-new-infos-customer',
                                type: 'post',
                                data: JSON.stringify(dataSend)
                            }).done(function (response) {
                                if(response.result){
                                    //console.log('Thành công');
                                    showPropzyAlert('Thao tác thành công');
                                    modalFrist.modal('hide');
                                    myModal.modal('hide');
                                    window.location.reload();
                                } else {
                                    showPropzyAlert('Đã có lỗi xảy ra');
                                    console.log(response);
                                }
                            }).always(function () {
                                hidePropzyLoading();
                            });
                        });
                    }
                    else if(response.data.errorsType == 'ERROR_CUSTOMER_DOUBLE_ROLE')
                    {
                        modalSecond.modal({
                            backdrop: 'static',
                            keyboard: false
                        });

                        modalSecond.find(".btn-select-customer-agent").on("click", function (event){
                            event.preventDefault();
                            var contactType = modalSecond.find('input[name="customer_agent"]:checked').val();
                            if(!contactType){
                                showPropzyAlert('Vui lòng chọn Customer hoặc Agent');
                                return false;
                            }
                            //
                            dataSend['selectedAgentId'] = response.data.agents[0].agentId;;
                            dataSend['contactType'] = contactType;
                            console.log(dataSend);
                            showPropzyLoading();
                            $.ajax({
                                url: '/request/add-new-infos-customer',
                                type: 'post',
                                data: JSON.stringify(dataSend)
                            }).done(function (response) {
                                if(response.result){
                                    //console.log('Thành công');
                                    showPropzyAlert('Thao tác thành công');
                                    modalSecond.modal('hide');
                                    myModal.modal('hide');
                                    window.location.reload();
                                } else {
                                    showPropzyAlert('Đã có lỗi xảy ra');
                                    console.log(response);
                                }
                            }).always(function () {
                                hidePropzyLoading();
                            });
                        });
                    }
                    else if(response.data.errorsType == 'ERROR_AGENTS_EXISTED')
                    {
                        modalThird.modal({
                            backdrop: 'static',
                            keyboard: false
                        });

                        var name_agent = response.data.agents[0].name;
                        var dealIds = response.data.agents[0].dealIds;
                        var dealId = '';
                        if(dealIds.length != null){
                            for(var j=0;j<response.data.agents[0].dealIds.length;j++){
                                dealId+= '<a href="/deal/detail/'+ response.data.agents[0].dealIds[j] +'">' + response.data.agents[0].dealIds[j] + '</a>'+', ';
                            }
                            dealId = dealId.trim().slice(0, -1);
                        }
                        modalThird.find('#name-agent').text('Tên Agent : '+name_agent);
                        modalThird.find('#dealIds').html('DealIds : '+dealId);
                        if(dealId === ''){
                            modalThird.find('#dealIds').hide();
                        }
                        //
                        modalThird.find(".btn-confirm-agent").on("click", function (event){
                            event.preventDefault();
                            dataSend['selectedAgentId'] = response.data.agents[0].agentId;
                            dataSend['confirmCreateAgent'] = true;
                            console.log(dataSend);
                            showPropzyLoading();
                            $.ajax({
                                url: '/request/add-new-infos-customer',
                                type: 'post',
                                data: JSON.stringify(dataSend)
                            }).done(function (response) {
                                if(response.result){
                                    //console.log('Thành công');
                                    showPropzyAlert('Thao tác thành công');
                                    modalThird.modal('hide');
                                    myModal.modal('hide');
                                    window.location.reload();
                                } else {
                                    showPropzyAlert('Đã có lỗi xảy ra');
                                    console.log(response);
                                }
                            }).always(function () {
                                hidePropzyLoading();
                            });
                        });
                        //
                        modalThird.find(".btn-cancel-agent").on("click", function (event){
                            event.preventDefault();
                            modalThird.modal('hide');
                            myModal.modal('hide');
                        });
                    }
                }
            }).always(function () {
                hidePropzyLoading();
            });
        });

        return {
            "showModal": showModal
        };
    })();
</script>