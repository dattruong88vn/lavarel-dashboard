<?php
if (isset($listings)):
    foreach ($listings as $listing):
        if (!$listing->isSelected) {
            continue;
        }
        ?>
        <div class="col-md-3 listing" style="margin-bottom: 16px;min-height: 480px;" data-item-id="{{$listing->rlistingId}}" data-have-request-contract="{{$listing->haveRequestContract==true?"true":"false"}}">

            <div style="position:relative">
                <a href="<?= PRODUCT_URL . 'chi-tiet/' . str2url($listing->title) . '/' . str2url($listing->districtName) . '/' . $listing->rlistingId; ?>" target="_blank">
                    <img src="{{$listing->photo->link}}" class="thumbnail" style="width:100%" />
                </a>


                <?php
                $likeButton = "/images/icon-like.jpg";
                if ($listing->behaviour == 2):
                    $likeButton = "/images/icon-dislike.jpg";
                endif;
                ?>
                <?php if ($listing->behaviour == 1): ?>                                            
                    <img src="/images/icon-like.png" style="position:absolute;top:0px;left:0px;" />
                <?php elseif ($listing->behaviour == 2): ?>
                    <img src="/images/icon-dislike.png" style="position:absolute;top:0px;left:0px;" />
                <?php endif; ?>
                <div>
                    <?php
                    if (isset($listing->stampType) && $listing->stampType == 1):
                        $labelSold = "/images/img-sold.png";
                        if ($listing->listingTypeId == 2) {
                            $labelSold = "/images/img-rented.png";
                        }
                        ?>
                        <img src="{{$labelSold}}" style="position:absolute;top:0px;left:0px;" />
                    <?php endif; ?>
                </div>
            </div>                                        
            <div class="text-center">
                {{$listing->rlistingId}} | {{$listing->bedRooms}} / {{$listing->bathRooms}} (BED/BATH) | {{$listing->formatPrice}}
                <div>{{$listing->address}}</div>
            </div>
            <div>
                <?php if (!isset($listing->stampType)): ?>
                    <label>
                        <input class="deactivate-listing" type="checkbox" <?php echo $listing->isDeactivated ? "checked='checked'" : ""; ?>   value="{{$listing->rlistingId}}"    <?php echo $listing->isDeactivated ? "disabled='disabled'" : ""; ?>   /> Deactivate
                    </label>
                <?php endif; ?>
                <!--
                <label><input type="checkbox" /> Đã xem</label>
                -->                                             
            </div>
            <?php if ($listing->behaviour == 2): ?>
                <div class="text-center">Lý do: {{$listing->reasonName}}</div>
                <?php
            elseif ($listing->behaviour != 2):
                $statusIdList = array();
                //var_dump($listing->statusList);
                if ($listing->statusList) {
                    foreach ($listing->statusList as $key => $value) {
                        $statusIdList[] = $value->statusId;
                    }
                }
                ?>
                <div>
                    <?php foreach ($listingStatusList as $ls): ?>
                        <label><input type="checkbox" class="change-listing-status" data-rlisting-id="{{$listing->rlistingId}}" value="{{$ls->statusId}}" <?php echo in_array($ls->statusId, $statusIdList) ? "checked disabled" : ""; ?> /> {{$ls->statusName}}</label>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            <div>
                <label>
                    <?php
                    if (!$listing->isDeposited):
                        $isChecked = "";
                        $isDisabled = "";
                        if ($listing->isScheduled) {
                            $isChecked = 'checked';
                            $isDisabled = 'disabled';
                        }
                        ?>
                        <input type="checkbox" class="select-listing" {{$isChecked}} {{$isDisabled}} value="{{$listing->rlistingId}}" />  Chọn đặt lịch xem
                        <?php
                    else:
                        ?>
                        <span>Deposited</span>
                    <?php endif; ?>
                </label>
                <span class="address hidden">{{$listing->address}}</span>
            </div>
            <div class="row">
                <button class="btn btn-success margin btnShowMeetingForm" data-rlisting-id="{{$listing->rlistingId}}" >Tạo meeting</button>
            </div>
        </div>
        <?php
    endforeach;
endif;
?>
<div class="clearfix"></div>

<script>
    $(".btnShowMeetingForm").on("click", function (event) {
        event.preventDefault();
        $("#newMeetingReminderModal .rlistingId").val($(this).attr("data-rlisting-id"));
        $("#newMeetingReminderModal").modal();
        $("#newMeetingReminderModal #whenDate").datepicker();
        $("#newMeetingReminderModal #whenTime").timepicker({
            showMeridian: false
        });
    });

</script>