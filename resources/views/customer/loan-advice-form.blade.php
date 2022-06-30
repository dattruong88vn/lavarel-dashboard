<form method="post" id="formLoadAdvice" class="form-horizontal">
    <div class="db-tm-item deal-tm-rating-test-1">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">TƯ VẤN VAY VỐN</h3>
                    </div>
                    <input type="hidden" class="form-control rlistingId" name="" placeholder="" />
                    
                    <div class="box-body">
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">Tên khách hàng</label>

                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="customerName" name="" placeholder="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">Mục đích vay</label>
                            <div class="col-sm-4">
                                <span class="no-bold">Vay mua nhà</span>
                            </div>
                            <label for="" class="col-sm-2 control-label">Khoản vay</label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="loan" name="loan" placeholder="">
                            </div>
                        </div>
                        <div class="form-group">                            
                            <label for="" class="col-sm-2 control-label">Vay vốn từ ngân hàng</label>
                            <div class="col-sm-4">
                                <select id="loanFromBankId" name="loanFromBankId" class="form-control select2" >
                                    <option value="">Chọn ngân hàng</option>
                                    <?php foreach ($banks as $bank): ?>
                                        <option value="{{$bank->id}}">{{$bank->name}}</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">Vay bao lâu</label>
                            <div class="col-sm-10 bank-maturity-years">
                                <?php foreach ($bankMaturityYears as $listItem): ?>
                                    <div class="checkbox col-sm-3 hidden" >
                                        <label class="no-bold"><input type="radio" name="maturityYearId" class="maturityYearId maturityYearId-{{$listItem->id}}" value="{{$listItem->id}}" />{{$listItem->name}}</label>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">Nghề nghiệp hiện tại</label>
                            <div class="col-sm-10">
                                <?php foreach ($bankCurrentPositions as $listItem): ?>
                                    <div class="checkbox col-sm-3" >
                                        <label class="no-bold"><input type="radio" name="currentPositionId" class="currentPositionId currentPositionId-{{$listItem->id}}" value="{{$listItem->id}}" />{{$listItem->name}}</label>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">Thu nhập hàng tháng</label>
                            <div class="col-sm-8">
                                <?php foreach ($bankMonthlyIncomes as $listItem): ?>
                                    <div class="checkbox col-sm-3" >
                                        <label class="no-bold"><input type="radio" name="monthlyIncomId" class="monthlyIncomId monthlyIncomId-{{$listItem->id}}" value="{{$listItem->id}}" />{{$listItem->name}}</label>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">Hình thức nhận lương</label>
                            <div class="col-sm-4">
                                <?php foreach ($bankPaymentMethods as $listItem): ?>
                                    <div class="checkbox col-sm-6" >
                                        <label class="no-bold"><input type="radio" name="paymentMethodId" class="paymentMethodId paymentMethodId-{{$listItem->id}}" value="{{$listItem->id}}" />{{$listItem->name}}</label>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                            <label for="" class="col-sm-2 control-label">Lương chuyển qua ngân hàng</label>
                            <div class="col-sm-4">
                                <select id="salaryFromBankId" name="salaryFromBankId" class="form-control select2" >
                                    <option value="">Chọn ngân hàng</option>
                                    <?php foreach ($banks as $bank): ?>
                                        <option value="{{$bank->id}}">{{$bank->name}}</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">Độ tuổi khách hàng</label>
                            <div class="col-sm-10">
                                <?php foreach ($bankAgeRanges as $listItem): ?>
                                    <div class="checkbox col-sm-3" >
                                        <label class="no-bold"><input type="radio" name="ageRangeId" class="ageRangeId ageRangeId-{{$listItem->id}}" value="{{$listItem->id}}" />{{$listItem->name}}</label>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">Tỷ lệ mức góp tăng mỗi năm</label>
                            <div class="col-sm-3">
                                <label id="interestedRate"></label>%
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-2">
                            </div>                            
                            <div class="col-xs-3">
                                <button class="btn btn-warning btnCalculateLoanAdvice">Tính</button>
                            </div>
                        </div>
                        <div class="result-group">
                            <ul class="nav nav-tabs">
                                <li class="active"><a data-toggle="tab" href="#tab_origionalResult">Kết quả lịch trả nợ với dư nợ ban đầu</a></li>
                                <li><a data-toggle="tab" href="#tab_decreaseResult">Kết quả  lịch trả nợ với dư nợ giảm dần</a></li>
                            </ul>
                            <div class="tab-content">
                                <div id="tab_origionalResult" class="tab-pane fade in active">
                                    <table id="origionalResult" class="table table-bordered table-striped origionalResult">
                                        <thead>
                                            <tr>
                                                <th>Kỳ trả nợ</th>
                                                <th>Gốc còn lại</th>
                                                <th>Gốc</th>
                                                <th>Lãi</th>
                                                <th>Tổng G+L</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="tab_decreaseResult" class="tab-pane fade">

                                    <table id="decreaseResult" class="table table-bordered table-striped decreaseResult">
                                        <thead>
                                            <tr>
                                                <th>Kỳ trả nợ</th>
                                                <th>Gốc còn lại</th>
                                                <th>Gốc</th>
                                                <th>Lãi</th>
                                                <th>Tổng G+L</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>                            
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <button class="btn btn-success margin btnSaveLoanAdvice">Lưu</button>
                            </div>
                        </div>
                    </div>                        
                </div>
            </div>
        </div>
    </div>
</form>
<script type="text/javascript">
    $('#loan').mask("#,##0", {reverse: true});
    if (loanAdviceData !== null) {
        repopulateLoanAdviceForm(loanAdviceData);
    }
    $("#bankId").select2();
    $("#formLoadAdvice #customerName").val($("#formCustomerInfo #customerName").val());
    $(".btnSaveLoanAdvice").on("click", function (event) {
        event.preventDefault();
        var formData = $("#formLoadAdvice").serializeArray();
        if (!validateForm("#formLoadAdvice")) {
            return false;
        }
        var loanAdvicePostData = prePareData(formData);

        showPropzyLoading();
        $.ajax({
            url: "/customer/save-loan-advice",
            type: "post",
            data: JSON.stringify(loanAdvicePostData)
        }).done(function (response) {
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    });
    $("#loanFromBankId").change(function () {

        $(".bank-maturity-years").html("");
        showPropzyLoading();
        var bankId = $(this).val();
        $.ajax({
            url: "/bank/detail/" + bankId,
            type: "get"
        }).done(function (response) {
            if (response.result) {
                $("#interestedRate").html(response.data.interestedRate);
            }
        }).always(function () {
        });
        getMaturityYears({
            'bankId': bankId
        });

    });

    function getMaturityYears(params) {
        $.ajax({
            url: "/bank/get-maturity-years/" + params.bankId,
            type: "get"
        }).done(function (response) {
            var html = "";
            if (response.result) {
                $(response.data).each(function (index, item) {
                    var checked = "";
                    if (params.currentMaturityId && item.id == params.currentMaturityId) {
                        checked = "checked";
                    }
                    html += "<div class='checkbox col-sm-3'>";
                    html += "<label class='no-bold'><input type='radio' name='maturityYearId' " + checked + " class='maturityYearId maturityYearId-" + item.id + "' value='" + item.id + "'>" + item.name + "</label>";
                    html += "</div>";



                });
            }
            $(".bank-maturity-years").html(html);
        }).always(function () {
            hidePropzyLoading();
        });
    }


    $(".btnCalculateLoanAdvice").on("click", function (event) {
        event.preventDefault();
        $(".calculateResult tbody").html("");
        var formData = $("#formLoadAdvice").serializeArray();
        if (!validateForm("#formLoadAdvice")) {
            return false;
        }
        var loanAdvicePostData = prePareData(formData);

        showPropzyLoading();
        $.ajax({
            url: "/customer/calculate-loan-advice",
            type: "post",
            data: JSON.stringify(loanAdvicePostData)
        }).done(function (response) {
            if (response.result) {
                var origionalResult = "";
                var originalTotal = {
                    cornner: 0,
                    interestRate: 0,
                    total: 0
                };
                var decreaseResult = "";
                var decreaseTotal = {
                    cornner: 0,
                    interestRate: 0,
                    total: 0
                };
                for (i = 0; i < response.data.length; i++) {
                    var item = response.data[i];
                    origionalResult += "<tr><td>"
                            + item.month + "</td><td>"
                            + number_format(item.remainingCorner, 2, ".", ",") + "</td><td>"
                            + (i > 0 ? number_format(item.corner, 2, ".", ",") : "") + "</td><td>"
                            + (i > 0 ? number_format(item.interestRateOriginal, 2, ".", ",") : "") + "</td><td>"
                            + (i > 0 ? number_format(item.totalOriginal, 2, ".", ",") : "") + "</td></tr>";
                    originalTotal.cornner += item.corner;
                    originalTotal.interestRate += item.interestRateOriginal;
                    originalTotal.total += item.totalOriginal;


                    decreaseResult += "<tr><td>"
                            + item.month + "</td><td>"
                            + number_format(item.remainingCorner, 2, ".", ",") + "</td><td>"
                            + (i > 0 ? number_format(item.corner, 2, ".", ",") : "") + "</td><td>"
                            + (i > 0 ? number_format(item.interestRateDecrease, 2, ".", ",") : "") + "</td><td>"
                            + (i > 0 ? number_format(item.totalDecrease, 2, ".", ",") : "") + "</td></tr>";
                    decreaseTotal.cornner += item.corner;
                    decreaseTotal.interestRate += item.interestRateDecrease;
                    decreaseTotal.total += item.totalDecrease;
                }
                origionalResult += "<tr><td>Tổng</td><td></td><td>"
                        + (i > 0 ? number_format(originalTotal.cornner, 2, ".", ",") : "") + "</td><td>"
                        + (i > 0 ? number_format(originalTotal.interestRate, 2, ".", ",") : "") + "</td><td>"
                        + (i > 0 ? number_format(originalTotal.total, 2, ".", ",") : "") + "</td></tr>";
                console.log(decreaseResult);
                $(".origionalResult tbody").html(origionalResult);

                decreaseResult += "<tr><td>Tổng</td><td></td><td>"
                        + (i > 0 ? number_format(decreaseTotal.cornner, 2, ".", ",") : "") + "</td><td>"
                        + (i > 0 ? number_format(decreaseTotal.interestRate, 2, ".", ",") : "") + "</td><td>"
                        + (i > 0 ? number_format(decreaseTotal.total, 2, ".", ",") : "") + "</td></tr>";
                $(".decreaseResult tbody").html(decreaseResult);
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    });
    function prePareData(formData) {
        var loanAdvicePostData = {
            "loan": null,
            "customerId": null,
            "salaryFromBankId": null,
            "loanFromBankId": null,
            "maturityYearId": null,
            "currentPositionId": null,
            "monthlyIncomId": null,
            "paymentMethodId": null,
            "ageRangeId": null
        };
        loanAdvicePostData.customerId = $("#customerId").val();
        for (i = 0; i < formData.length; i++) {
            var input = formData[i];
            loanAdvicePostData[input.name] = input.value;
        }
        loanAdvicePostData.loan = loanAdvicePostData.loan.replace(/,/g, '');
        if ($("#salaryFromBankId").val().trim() === "") {
            loanAdvicePostData.salaryFromBankId = null;
        }
        try {
            if (leadId !== undefined) {
                loanAdvicePostData.leadId = leadId;
            }
        } catch (ex) {
            loanAdvicePostData.leadId = null;
        }
        try {
            if (dealId !== undefined) {
                loanAdvicePostData.dealId = dealId;
            }
        } catch (ex) {
            loanAdvicePostData.dealId = null;
        }
        return loanAdvicePostData;
    }
    function validateForm(form) {
        var isValidated = true;
        if (!validateRadio(form, ".maturityYearId")) {
            isValidated = false;
        }
        if (!validateRadio(form, ".currentPositionId")) {
            isValidated = false;
        }
        if (!validateRadio(form, ".monthlyIncomId")) {
            isValidated = false;
        }
        if (!validateRadio(form, ".paymentMethodId")) {
            isValidated = false;
        }
        if (!validateRadio(form, ".ageRangeId")) {
            isValidated = false;
        }
        if ($("#loan").val().trim() === "") {
            isValidated = false;
        }
        if ($("#loanFromBankId").val().trim() === "") {
            isValidated = false;
        }
        if ($(".paymentMethodId:checked").val() === "1") {
            if ($("#salaryFromBankId").val().trim() === "") {
                isValidated = false;
            }
        }
        if (!isValidated) {
            showPropzyAlert("Phải nhập đầy đủ các fields");
        }

        return isValidated;
    }
    function validateRadio(form, selector) {
        selector = form + " " + selector + ":checked";
        return $(selector).length >= 0;
    }
    function repopulateLoanAdviceForm(data) {
        $(".bankId-" + data.loanFromBankId).prop("checked", true);
        getMaturityYears({
            "bankId": data.loanFromBankId,
            "currentMaturityId": data.maturityYearId
        });
        //$(".maturityYearId-" + data.maturityYearId).prop("checked", true);
        $(".currentPositionId-" + data.currentPositionId).prop("checked", true);
        $(".monthlyIncomId-" + data.monthlyIncomId).prop("checked", true);
        $(".paymentMethodId-" + data.paymentMethodId).prop("checked", true);
        $(".ageRangeId-" + data.ageRangeId).prop("checked", true);
        $("#interestedRate").html(data.interestedRate);
        $("#loanFromBankId").val(data.loanFromBankId);
        if (data.salaryFromBankId) {
            $("#salaryFromBankId").val(data.salaryFromBankId);
        }
        $("#loan").val(number_format(data.loan, 0, '.', ','));
        if (data.bankLoanAdviceResult) {
            var origionalResult = "";
            var originalTotal = {
                cornner: 0,
                interestRate: 0,
                total: 0
            };
            var decreaseResult = "";
            var decreaseTotal = {
                cornner: 0,
                interestRate: 0,
                total: 0
            };
            for (i = 0; i < data.bankLoanAdviceResult.length; i++) {
                var item = data.bankLoanAdviceResult[i];
                origionalResult += "<tr><td>"
                        + item.month + "</td><td>"
                        + number_format(item.remainingCorner, 2, ".", ",") + "</td><td>"
                        + (i > 0 ? number_format(item.corner, 2, ".", ",") : "") + "</td><td>"
                        + (i > 0 ? number_format(item.interestRateOriginal, 2, ".", ",") : "") + "</td><td>"
                        + (i > 0 ? number_format(item.totalOriginal, 2, ".", ",") : "") + "</td></tr>";
                originalTotal.cornner += item.corner;
                originalTotal.interestRate += item.interestRateOriginal;
                originalTotal.total += item.totalOriginal;


                decreaseResult += "<tr><td>"
                        + item.month + "</td><td>"
                        + number_format(item.remainingCorner, 2, ".", ",") + "</td><td>"
                        + (i > 0 ? number_format(item.corner, 2, ".", ",") : "") + "</td><td>"
                        + (i > 0 ? number_format(item.interestRateDecrease, 2, ".", ",") : "") + "</td><td>"
                        + (i > 0 ? number_format(item.totalDecrease, 2, ".", ",") : "") + "</td></tr>";
                decreaseTotal.cornner += item.corner;
                decreaseTotal.interestRate += item.interestRateDecrease;
                decreaseTotal.total += item.totalDecrease;
            }
            origionalResult += "<tr><td>Tổng</td><td></td><td>"
                    + (i > 0 ? number_format(originalTotal.cornner, 2, ".", ",") : "") + "</td><td>"
                    + (i > 0 ? number_format(originalTotal.interestRate, 2, ".", ",") : "") + "</td><td>"
                    + (i > 0 ? number_format(originalTotal.total, 2, ".", ",") : "") + "</td></tr>";
            $(".origionalResult tbody").html(origionalResult);

            decreaseResult += "<tr><td>Tổng</td><td></td><td>"
                    + (i > 0 ? number_format(decreaseTotal.cornner, 2, ".", ",") : "") + "</td><td>"
                    + (i > 0 ? number_format(decreaseTotal.interestRate, 2, ".", ",") : "") + "</td><td>"
                    + (i > 0 ? number_format(decreaseTotal.total, 2, ".", ",") : "") + "</td></tr>";
            $(".decreaseResult tbody").html(decreaseResult);
        }
    }
</script>

