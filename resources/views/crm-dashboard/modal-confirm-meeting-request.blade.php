<?php
$updateRequestForm = [
    "purpose" => [
        "resident" => "Để ở",
        "commercial" => "Kinh doanh",
        "investment" => "Đầu tư"
    ],
    "findHowLong" => [
        "0_7" => "< 7 ngày",
        "7_30" => "7 đến 30 ngày",
        "30_60" => "30 đến 60 ngày"
    ],
    "numberOfViewed" => [
        "0" => "0",
        "0_5" => "< 5",
        "5_10" => "5 - 10",
        "10+" => "> 10",
    ],
    "agencySupport" => [
        1 => "Có",
        2 => "Chưa",
    ],
    "propertyPosition" => [
        1 => "Mặt tiền",
        2 => "Hẽm"
    ],
    "budgetType" => [
        1 => "Có sẵn",
        2 => "Vay",
        3 => "Người thân hỗ trợ"
    ],
    "budget" => [
        "0_1.8" => "< 1,8 tỷ",
        "1.8_3" => "1,8 tỷ - 3 tỷ",
        "3+" => "> 3 tỷ"
    ]
];
?>

<div id="modalConfirmMeetingRequest" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formConfirmMeetingRequest" method="post" >
                <input type="hidden" id="dealId" name="dealId" value="" />
                <input type="hidden" id="meetingId" name="meetingId" class="meetingId" value="" />
                <input type="hidden" id="reminderDate" name="reminderDate" class="reminderDate" value="" />
                <input type="hidden" id="taskId" name="taskId" class="taskId" value="" />
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Chi tiết xác nhận nhu cầu</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group row text-center"><h4>Nhu cầu khách hàng</h4></div>
                    <div class="form-group row">
                        <label class="col-sm-3">Mục đích mua <span class="required">*</span></label>
                        <div class="col-sm-9">
                            <!--<input type="text" class="purpose form-control" value="" />-->
                            <select class="purpose form-control changeHideShow">
                                <option value="">Chọn</option>
                                <?php foreach ($updateRequestForm["purpose"] as $key => $value): ?>
                                    <option value="{{$key}}">{{$value}}</option>
                                <?php endforeach; ?>
                            </select>

                            <!-- html update by QuangHuynh 13/06/2017 -->
                            @include('MucDichMuaNhaHidden')

                            <div class="errors errors-purpose" ></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3">Tìm nhà bao lâu</label>
                        <div class="col-sm-9">
                            <!--<input type="text" class="findHowLong form-control" value="" />-->
                            <select class="findHowLong form-control form-show-hidden-not-id">
                                <option value="">Chọn</option>
                                <?php foreach ($updateRequestForm["findHowLong"] as $key => $value): ?>
                                    <option value="{{$key}}">{{$value}}</option>
                                <?php endforeach; ?>
                            </select>

                            <!-- html update by QuangHuynh 13/06/2017 -->
                            <div class="neighbours">

                                <!-- Input for TimNhaBaoLau -->
                                <div class="form-show-hidden" style="padding: 5px 0px 0px 10px;" id="forDauTu">
                                    <div class="row">
                                        <div class="col-md-7 col-xs-7"><label>Thao khảo giá qua:</label></div>
                                        <div class="col-md-5 col-xs-5">
                                            <select insertmore="ThamKhaoGiaQua" class="form-control">
                                                <option value="">Chọn</option>
                                                <option value="Bản thân">Bản thân</option>
                                                <option value="Mô Giới">Mô Giới</option>
                                                <option value="Internet">Internet</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-7 col-xs-7"><label>Đã đi xem với MG:</label></div>
                                        <div class="col-md-5 col-xs-5">
                                            <select insertmore="DaDiXemVoiMG" class="form-control">
                                                <option value="">Chọn</option>
                                                <option value="Có">Có</option>
                                                <option value="Không">Không</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-7 col-xs-7"><label>Có tiếp tục đi xem với MG:</label></div>
                                        <div class="col-md-5 col-xs-5">
                                            <select insertmore="CoTiepTucDiXemVoiMG" class="form-control">
                                                <option value="">Chọn</option>
                                                <option value="Có">Có</option>
                                                <option value="Không">Không</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <!-- \ Input for TimNhaBaoLau -->
                            </div>

                            <div class="errors errors-findHowLong" ></div>
                        </div>
                    </div>
                    <div class="form-group row">
                            <label class="col-sm-3" >Đã xem bao nhiêu căn</label>
                            <div class="col-sm-9" >
                                <!--<input type="text" class="numberOfViewed form-control" value="" />-->
                                <select class="numberOfViewed form-show-hidden-not-id form-control">
                                    <option value="">Chọn</option>
                                    <?php foreach ($updateRequestForm["numberOfViewed"] as $key => $value): ?>
                                        <option value="{{$key}}">{{$value}}</option>
                                    <?php endforeach; ?>
                                </select>
                                <div class="neighbours">
                                    <div class="form-show-hidden">
                                        <label class="col-sm-3" style="padding: 0px">Đang xem xét listing ngoài:</label>
                                        <div class="col-sm-9" style="padding: 0px">
                                            <select insertmore="DangXemXetListingNgoai" class="form-control">
                                                <option value="">Chọn</option>
                                                <option value="Có">Có</option>
                                                <option value="Không">Không</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="errors errors-numberOfViewed" ></div>
                            </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3">Đi xem với môi giới</label>
                        <div class="col-sm-9">
                            <select class="agencySupport form-control" style="width:100%" >
                                <option value="">Chọn</option>
                                <?php foreach ($updateRequestForm["agencySupport"] as $key => $value): ?>
                                    <option value="{{$key}}">{{$value}}</option>
                                <?php endforeach; ?>
                            </select>
                            <div class="errors errors-agencySupport" ></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3">Khu vực  <span class="required">*</span></label>
                        <div class="col-sm-9">
                            <input type="text" class="area form-control" value="" />
                            <div class="errors errors-area" ></div>
                        </div>
                    </div>  
                    <div class="form-group row">
                        <label class="col-sm-3">Diện tích</label>
                        <div class="col-sm-9">
                            <input type="text" class="size form-control" value="" />
                            <div class="errors errors-size" ></div>
                        </div>
                    </div> 
                    <div class="form-group row">
                        <label class="col-sm-3">Hướng</label>
                        <div class="col-sm-9">
                            <input type="text" class="direction form-control" value="" />
                            <div class="errors errors-direction" ></div>
                        </div>
                    </div>  
                    <div class="form-group row">
                        <label class="col-sm-3">Vị trí  <span class="required">*</span>:</label>
                        <div class="col-sm-3">
                            <select class="propertyPosition form-control" style="width:100%" >
                                <option value="">Chọn Vị trí</option>
                                <?php foreach ($updateRequestForm["propertyPosition"] as $key => $value): ?>
                                    <option value="{{$key}}">{{$value}}</option>
                                <?php endforeach; ?>
                            </select>
                            <div class="errors errors-propertyPosition" ></div>
                        </div>
                        <div class="col-sm-6 alleySizeWrapper">
                            <label class="col-sm-4">Hẽm rộng:</label>
                            <div class="col-sm-8">
                                <input type="text" class="alleyWidth form-control" value="" />
                                <div class="errors errors-alleyWidth" ></div>
                            </div>
                        </div>
                    </div>   

                    <div class="form-group row">

                        <div class="">
                            <label class="col-sm-3">Ngân sách từ <span class="required">*</span></label>
                            <div class="col-sm-9">
                                <!--<input type="text" class="numberOfViewed form-control" value="" />-->
                                <input type="text" name="price_from" class="initialBudget form-control">
                                <div class="">
                                    <div class="">
                                        <label class="col-sm-3" style="padding: 0px">đến:</label>
                                        <div class="col-sm-9" style="padding: 0px">
                                            <input type="text" name="price_to" class="initialBudget price_to form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="errors errors-price" ></div>
                            </div>
                        </div>

                    </div>                 

                    <div class="form-group row">
                        <label class="col-sm-3">Tình trạng Ngân sách  <span class="required">*</span>: </label>
                        <div class="col-sm-9">
                            <select class="budgetType form-control changeHideShow" style="width:100%" >
                                <option value="">Chọn</option>
                                <?php foreach ($updateRequestForm["budgetType"] as $key => $value): ?>
                                    <option value="{{$key}}">{{$value}}</option>
                                <?php endforeach; ?>
                            </select>
                            @include('TinhTrangNganSach')
                            <div class="errors errors-budgetType" ></div>
                        </div>
                    </div> 

                    <div class="form-group row">
                        <label class="col-sm-3">Thời hạn  <span class="required">*</span>:</label>
                        <?php
                        $times = [
                            1 => "< 1 tháng",
                            2 => "1 đến 3 tháng",
                            3 => "> 3 tháng",
                            4 => "Không xác định"
                                ]
                        ?>
                        <div class="col-sm-9">
                            <select class="time form-control form-show-hidden-not-id" style="width:100%" >
                                <option value="">Chọn</option>
                                <?php foreach ($times as $key => $value): ?>
                                    <option value="{{$key}}">{{$value}}</option>
                                <?php endforeach; ?>
                            </select>
                            <div class="errors errors-time" ></div>

                            <div class="neighbours" style="padding: 5px 0px 0px 10px;" id="forDauTu">
                                <div class="row form-show-hidden">
                                    <div class="col-md-2 col-xs-2"><label>Lý do:</label></div>
                                    <div class="col-md-10 col-xs-10">
                                        <textarea insertmore="LyDoThoiHan" class="form-control"></textarea>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div> 
                    <div class="form-group row">
                        <label class="col-sm-3">Mua cho ai</label>
                        <div class="col-sm-9">
                            <input type="text" class="buyFor form-control" value="" />
                            <div class="errors errors-buyFor" ></div>
                        </div>
                    </div> 
                    <div class="form-group row">
                        <label class="col-sm-3">Ai là người quyết định</label>
                        <div class="col-sm-9">
                            <input type="text" class="whoDecision form-control" value="" />
                            <div class="errors errors-whoDecision" ></div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3">Yếu tố quan trọng nhất  <span class="required">*</span></label>
                        <div class="col-sm-9">
                            <input type="text" class="importantFactor form-control" value="" />
                            <div class="errors errors-importantFactor" ></div>
                        </div>
                    </div>

                    <div class="form-group row text-center"><h4>Thông tin KH</h4></div>

                    <div class="form-group row">
                        <label class="col-sm-3">Nghề nghiệp</label>
                        <div class="col-sm-9">
                            <input type="text" class="job form-control" value="" />
                            <div class="errors errors-job" ></div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3">Độ tuổi</label>
                        <div class="col-sm-9">
                            <input type="text" class="age form-control" value="" />
                            <div class="errors errors-age" ></div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3">Thu nhập</label>
                        <div class="col-sm-9">
                            <input type="text" class="income form-control" value="" />
                            <div class="errors errors-income" ></div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3">Nhà có bao nhiêu người</label>
                        <div class="col-sm-9">
                            <input type="text" class="numberOfFamilyMembers form-control" value="" />
                            <div class="errors errors-numberOfFamilyMembers" ></div>
                        </div>
                    </div>


                    <div class="form-group row">
                        <label class="col-sm-3">Nơi ở hiện tại</label>
                        <?php
                        $accommodationType = [
                            1 => "Nhà",
                            2 => "Nhà trọ"
                                ]
                        ?>
                        <div class="col-sm-9">
                            <select class="accommodationType form-control" style="width:100%" >
                                <option value="">Chọn nơi ở</option>
                                <?php foreach ($accommodationType as $key => $value): ?>
                                    <option value="{{$key}}">{{$value}}</option>
                                <?php endforeach; ?>
                            </select>
                            <div class="errors errors-accommodationType" ></div>
                        </div>
                    </div> 

                    <div class="form-group row">
                        <label class="col-sm-3">Địa chỉ hiện tại</label>
                        <div class="col-sm-9">
                            <input type="text" class="address form-control" value="" />
                            <div class="errors errors-address" ></div>
                        </div>
                    </div>

                    <div class="form-group text-center">
                        <button class="btn btn-success btnSave">Lưu</button>
                    </div>
                </div>
                <!--
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
                -->
            </form>
        </div>

    </div>
</div>

<script type="text/javascript">
    var modalConfirmMeetingRequest = $("#modalConfirmMeetingRequest");
    modalConfirmMeetingRequest.find(".alleySizeWrapper").hide();
    modalConfirmMeetingRequest.find(".borrowAmmountWrapper").hide();
    modalConfirmMeetingRequest.find(".propertyPosition").change(function () {
        var position = $(this).val();
        if (position == 2) {
            modalConfirmMeetingRequest.find(".alleySizeWrapper").show();
        } else {
            modalConfirmMeetingRequest.find(".alleySizeWrapper").hide();
            modalConfirmMeetingRequest.find(".alleyWidth").val("");
        }
    });
    modalConfirmMeetingRequest.find(".budgetType").change(function () {
        var selected = $(this).val();
        if (selected == 2) {
            modalConfirmMeetingRequest.find(".borrowAmmountWrapper").show();
        } else {
            modalConfirmMeetingRequest.find(".borrowAmmountWrapper").hide();
            modalConfirmMeetingRequest.find(".borrowAmmount").val("");
        }
    });
    $(".btnShowModalConfirmRequest").on("click", function (event) {
        event.preventDefault();
        modalConfirmMeetingRequest.find(".taskId").val(taskId);
        modalConfirmMeetingRequest.find(".meetingId").val(meetingId);
        modalConfirmMeetingRequest.modal();
    });

    JModalConfirmMeetingRequestModule.ShowMoreInputChild();
    $(document).ready(function(){
        $('.initialBudget').mask("#,##0", {reverse: true});
    })

    modalConfirmMeetingRequest.find(".btnSave").on("click", function (event) 
    {
        event.preventDefault();
        modalConfirmMeetingRequest.find(".errors").html("");
        var isValid = true;
        var purpose = modalConfirmMeetingRequest.find(".purpose").val();
        if (purpose.trim() == '') {
            isValid = false;
            modalConfirmMeetingRequest.find(".errors-purpose").html("Chọn mục đích mua.");
        }

        var area = modalConfirmMeetingRequest.find(".area").val();
        if (area.trim() == '') {
            isValid = false;
            modalConfirmMeetingRequest.find(".errors-area").html("Nhập khu vực");
        }

        var price_to = modalConfirmMeetingRequest.find(".price_to").val();
        if (area.trim() == '') {
            isValid = false;
            modalConfirmMeetingRequest.find(".errors-area").html("Nhập khoảng ngân sách");
        }

        var time = modalConfirmMeetingRequest.find(".time option:selected").val();
        if (time.trim() == '') {
            isValid = false;
            modalConfirmMeetingRequest.find(".errors-time").html("Chọn thời gian phải mua");
        }

        var propertyPosition = modalConfirmMeetingRequest.find(".propertyPosition option:selected").val();
        if (propertyPosition.trim() == '') {
            isValid = false;
            modalConfirmMeetingRequest.find(".errors-propertyPosition").html("Chọn vị trí");
        }

        var importantFactor = modalConfirmMeetingRequest.find(".importantFactor").val();
        if (importantFactor.trim() == '') {
            isValid = false;
            modalConfirmMeetingRequest.find(".errors-importantFactor").html("Nhập yếu tố quan trọng nhất");
        }

        /*
         var customerPurpose = modalConfirmMeetingRequest.find(".customerPurpose").val();
         if (customerPurpose.trim() == '') {
         isValid = false;
         modalConfirmMeetingRequest.find(".errors-customerPurpose").html("Nhập mục đích mua nhà");
         }
         */
        if (!isValid) 
        {
            var alertErr = "Vui lòng cập nhật các field sau:" ;
            modalConfirmMeetingRequest.find(".errors").each(function( index ) 
            {
              if($(this).text() != "")
              {
                alertErr += "<br/>- " + $( this ).text() ;
              }
            });
            // alertErr = alertErr.slice(0, -2);
            showPropzyAlert(alertErr);
            return false;
        }

        ;

        price_to = '';
        price_to_input = modalConfirmMeetingRequest.find(".price_to").val().replace(new RegExp(',', 'g'),'');
        
        if(price_to_input <= 1800000000){
            price_to = '0_1.8';
        }else if( price_to_input > 1800000000 && price_to_input < 3000000000){
            price_to = '1.8_3';
        }else{ price_to = '3+' }

        var postData = {
            "meetingId": modalConfirmMeetingRequest.find(".meetingId").val(),
            "taskId": modalConfirmMeetingRequest.find(".taskId").val(),
            "purpose": modalConfirmMeetingRequest.find(".purpose").val(),
            "purposeText": modalConfirmMeetingRequest.find(".purpose option:selected").text(),
            "findHowLong": modalConfirmMeetingRequest.find(".findHowLong").val(),
            "findHowLongText": modalConfirmMeetingRequest.find(".findHowLong option:selected").text(),
            "numberOfViewed": modalConfirmMeetingRequest.find(".numberOfViewed").val(),
            "numberOfViewedText": modalConfirmMeetingRequest.find(".numberOfViewed option:selected").text(),
            "agencySupport": modalConfirmMeetingRequest.find(".agencySupport").val(),
            "agencySupportText": modalConfirmMeetingRequest.find(".agencySupport option:selected").text(),
            "buyFor": modalConfirmMeetingRequest.find(".buyFor").val(),
            "whoDecision": modalConfirmMeetingRequest.find(".whoDecision").val(),
            "price": price_to,
            "priceText": modalConfirmMeetingRequest.find(".price option:selected").text(),
            "area": modalConfirmMeetingRequest.find(".area").val(),
            "budgetType": modalConfirmMeetingRequest.find(".budgetType").val(),
            "budgetTypeText": modalConfirmMeetingRequest.find(".budgetType option:selected").text(),
            "borrowPrice": modalConfirmMeetingRequest.find(".borrowPrice").val(),
            "time": modalConfirmMeetingRequest.find(".time").val(),
            "timeText": modalConfirmMeetingRequest.find(".time option:selected").text(),
            "size": modalConfirmMeetingRequest.find(".size").val(),
            "direction": modalConfirmMeetingRequest.find(".direction").val(),
            "propertyPosition": modalConfirmMeetingRequest.find(".propertyPosition").val(),
            "propertyPositionText": modalConfirmMeetingRequest.find(".propertyPosition option:selected").text(),
            "alleyWidth": modalConfirmMeetingRequest.find(".alleyWidth").val(),
            "importantFactor": modalConfirmMeetingRequest.find(".importantFactor").val(),
            "customer": {
                "job": modalConfirmMeetingRequest.find(".job").val(),
                "age": modalConfirmMeetingRequest.find(".age").val(),
                //"purpose": modalConfirmMeetingRequest.find(".customerPurpose").val(),
                "numberOfFamilyMembers": modalConfirmMeetingRequest.find(".numberOfFamilyMembers").val(),
                "accommodationType": modalConfirmMeetingRequest.find(".accommodationType").val(),
                "accommodationTypeText": modalConfirmMeetingRequest.find(".accommodationType option:selected").text(),
                "income": modalConfirmMeetingRequest.find(".income").val(),
                "address": modalConfirmMeetingRequest.find(".address").val()
            },
            "moreOption" : []
        };

        // UPDATE HIDEN FROM REUIREMENT by Quang.Huynh 13/06/2017

            // CHANGE LOGS:
            // - update html form
            // - update script

            arrInserMore = {};
            $("*[insertmore]").each(function()
            {
                key = $(this).attr('insertmore');
                arrInserMore[key] = $(this).val();
            });
            postData.moreOption = arrInserMore;
        // \ UPDATE HIDEN FROM REUIREMENT by Quang.Huynh 13/06/2017


        showPropzyLoading();
        $.ajax({
            url: '/crm-dashboard/save-task-form-hash-map/' + taskId,
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            modalConfirmMeetingRequest.modal('hide');
            showPropzyAlert(response.message);
            if (response.result) {
                //window.location.reload();
                window.location = "/";
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });
</script>