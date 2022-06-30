<form method="post" id="" class="form-horizontal">
    <div class="db-tm-item deal-tm-rating-test-2">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">ĐÁNH GIÁ KHÁCH HÀNG</h3>
                        <div>Điểm hiện tại: <span class="totalPointValue"></span> / <span class="totalPercentValue"></span>%</div>
                    </div>
                    <div class="box-body">
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">1. Mục đích mua nhà</label>
                            <div class="col-sm-1"><input type="text" size="3" value="15" disabled="disabled" />%</div>
                            <div class="col-sm-9">
                                <?php foreach ($purposeList as $listItem): ?>
                                    <div class="checkbox col-sm-3" >
                                        <label class="no-bold"><input type="radio" name="purposeId" class="purposeId purposeId-{{$listItem->id}}" value="{{$listItem->id}}" data-point-value="{{$listItem->pointValue}}" />{{$listItem->name}}</label>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">2. Thời gian dự định mua</label>
                            <div class="col-sm-1"><input type="text" size="3" value="15" disabled="disabled"   />%</div>
                            <div class="col-sm-9">
                                <?php foreach ($planBuyList as $listItem): ?>
                                    <div class="checkbox col-sm-3" >
                                        <label class="no-bold"><input type="radio" name="planBuyId" class="planBuyId planBuyId-{{$listItem->id}}" value="{{$listItem->id}}" data-point-value="{{$listItem->pointValue}}" />{{$listItem->name}}</label>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">3. Mua cho</label>
                            <div class="col-sm-1"><input type="text" size="3" value="5" disabled="disabled"   />%</div>
                            <div class="col-sm-9">
                                <?php foreach ($forWhomList as $listItem): ?>
                                    <div class="checkbox col-sm-3" >
                                        <label class="no-bold"><input type="radio" name="forWhomId" class="forWhomId forWhomId-{{$listItem->id}}" value="{{$listItem->id}}" data-point-value="{{$listItem->pointValue}}" />{{$listItem->name}}</label>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">4. Nguồn hỗ trợ ngân sách</label>
                            <div class="col-sm-1"><input type="text" size="3" value="10" disabled="disabled"   />%</div>
                            <div class="col-sm-9">
                                <?php foreach ($financingList as $listItem): ?>
                                    <div class="checkbox col-sm-3" >
                                        <label class="no-bold"><input type="radio" name="financingId" class="financingId financingId-{{$listItem->id}}" value="{{$listItem->id}}" data-point-value="{{$listItem->pointValue}}" />{{$listItem->name}}</label>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">5. Mức độ yêu cầu của KH</label>
                            <div class="col-sm-1"><input type="text" size="3" value="25" disabled="disabled"   />%</div>
                            <div class="col-sm-9">
                                <?php foreach ($requirementLevelList as $listItem): ?>
                                    <div class="checkbox col-sm-3" >
                                        <label class="no-bold"><input type="radio" name="levelRequirementId" class="levelRequirementId levelRequirementId-{{$listItem->id}}" value="{{$listItem->id}}" data-point-value="{{$listItem->pointValue}}" />{{$listItem->name}}</label>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">5. Khả năng đáp ứng thị trường</label>
                            <div class="col-sm-1"><input type="text" size="3" value="30" disabled="disabled"   />%</div>
                            <div class="col-sm-9">
                                <?php foreach ($reviewResponsivenessList as $listItem): ?>
                                    <div class="checkbox col-sm-3" >
                                        <label class="no-bold"><input type="radio" name="responsivenessId" class="responsivenessId responsivenessId-{{$listItem->id}}" value="{{$listItem->id}}" data-point-value="{{$listItem->pointValue}}" />{{$listItem->name}}</label>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <button class="btn btn-success btnSaveCustomerReview">Lưu hồ sơ KH</button>
                            </div>
                        </div>
                    </div>                        
                </div>
            </div>
        </div>
    </div>
</form>
<script type="text/javascript">
    $(".btnSaveCustomerReview").on("click", function (event) {
        event.preventDefault();
        var postData = {
            "customerId": $("#customerId").val(),
            "financingId": $(".financingId:checked").val(),
            "forWhomId": $(".forWhomId:checked").val(),
            "planBuyId": $(".planBuyId:checked").val(),
            "levelRequirementId": $(".levelRequirementId:checked").val(),
            "purposeId": $(".purposeId:checked").val(),
            "responsivenessId": $(".responsivenessId:checked").val()
        };
        for (var prop in postData) {
            if (postData[prop] === undefined) {
                showPropzyAlert("Phải chọn tất cả các điều kiện");
                return false;
            }
        }
        try {
            if (leadId) {
                postData.leadId = leadId;
            }
        } catch (ex) {
        }
        try {
            if (dealId !== undefined) {
                postData.dealId = dealId;
            }
        } catch (ex) {
        }
        showPropzyLoading();
        $.ajax({
            url: "/customer/save-review",
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                for (var prop in postData) {
                    if (customerReviewData !== null) {
                        customerReviewData[prop] = postData[prop];
                    } else {
                        customerReviewData = postData;
                    }
                }
                $(".totalPointValue").html(response.data.totalPointValue);
                $(".totalPercentValue").html(response.data.totalPercentValue);
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    });
    if (customerReviewData !== null) {
        repopulateReviewForm(customerReviewData);
    }
    function repopulateReviewForm(data) {
        $(".purposeId-" + data.purposeId).prop("checked", true);
        $(".planBuyId-" + data.planBuyId).prop("checked", true);
        $(".forWhomId-" + data.forWhomId).prop("checked", true);
        $(".financingId-" + data.financingId).prop("checked", true);
        if (data.responsivenessId) {
            $(".responsivenessId-" + data.responsivenessId).prop("checked", true);
        }
        $(".levelRequirementId-" + data.levelRequirementId).prop("checked", true);
        $(".totalPointValue").html(data.totalPointValue);
        $(".totalPercentValue").html(data.totalPercentValue);
    }
</script>
