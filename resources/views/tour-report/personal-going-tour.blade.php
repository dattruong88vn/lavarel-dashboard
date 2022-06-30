
<input type="hidden" class="goingTourCount" value="{{count($tours->list)}}" />
<?php foreach ($tours->list as $tour): ?>
    <div class="row" style="padding-bottom: 32px;">
        <div class="col-sm-2" style="padding-top: 30px">
                <label><a href="/deal/tour/{{$tour->dealId}}" target="_blank">{{$tour->csName}}</a></label>
                <div style="color:#ffcd56">{{!empty($tour->realStatusName)?"($tour->realStatusName)":""}}</div>
                <div style="color:#c52020">{{!empty($tour->scheduleTime)?date('d/m/Y', $tour->scheduleTime/1000):""}}</div>
        </div>
        <div class="col-sm-8">
            <div class="row bs-wizard" style="border-bottom:0;">
                <?php
                $addressCount = count($tour->list);
                $width = 100 / $addressCount;
                if ($addressCount == 1) {
                    $width = 100;
                }
                $index = 0;
                foreach ($tour->list as $tourDetail):
                    $index++;
                    $status = "status-" . $tourDetail->statusId;
                    ?>
                    <div class="bs-wizard-step  {{$status}}" style="width: {{$width-0.2}}%; float:left;">
                        <div class="bs-wizard-stepnum" title="{{$tourDetail->address}}" style="position: relative;">
                            <span style="position: absolute;bottom:0px;padding-right: 10px">{{mb_substr($tourDetail->address, 0, 36)}}...</span>
                        </div>
                        <div class="progress"><div class="progress-bar"></div></div>
                        <a href="#" class="bs-wizard-dot"  
                        title="{{$tourDetail->address}}@if($tourDetail->reasonDismiss != null) &#10;Lý do bỏ qua: {{$tourDetail->reasonDismiss}}
                        @endif
                        "></a>
                        <div class="clear"></div>
                        <div class="bs-wizard-info" style="clear:both;">
                            <?php if ($tourDetail->statusId == 4): ?>
                                <b>{{$tourDetail->reasonName}}</b>
                            <?php else: ?>
                                <!-- // 1 3 -->
                                @if($tourDetail->statusId != 1 && $tourDetail->statusId != 3)
                                    <b class="starRenderPropzy" poin="{{$tourDetail->percentValue}}">{{$tourDetail->percentValue}}</b>
                                @endif
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

        </div>
        <div class="col-sm-1" style="padding-top: 45px">
            <?php if (empty($tour->realStatusId) || in_array($tour->realStatusId, [1, 2, 3, 4])): ?>
                <button class="btn btn-danger btn-show-add-listing-modal" style="vertical-align: middle" data-deal-id="{{$tour->dealId}}" data-schedule-id="{{$tour->scheduleId}}">Thêm listing</button>
            <?php endif; ?>
        </div>

    </div>
<?php endforeach; ?>

<script>

    $(".btn-show-add-listing-modal").on("click", function (event) {
        event.preventDefault();
        var scheduleId = $(this).attr("data-schedule-id");
        var dealId = $(this).attr("data-deal-id");
        $("#modalAddListings .scheduleId").val(scheduleId);
        CustomerCart.showCart(dealId);
        $("#modalAddListings").modal();
    });
</script>