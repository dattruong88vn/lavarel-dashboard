<?php if ($listings): ?>
    <table class="table table-bordered table-striped" id="datatables" style="width: 1600px; overflow-x: scroll;">
        <thead>
            <tr>
                <th data-orderable="false">Chọn</th>
                <th>LID</th>
                <th data-orderable="false">Hình</th>
                <th data-orderable="false">Giấy chủ quyền</th>
                <th>Giá</th>
                <th data-orderable="false">Diện tích (dài x rộng)</th>
                <th style="width:200px">Địa chỉ</th>
                <th>Thông tin chủ listing</th>
                <th>Số ngày live</th>
                <th>Số ngày từ lần cuối cập nhật</th>
                <th>Hướng</th>
                <th data-orderable="false">Năm xây dựng</th>
                <th data-orderable="false">Điểm</th>
            </tr>
        </thead>
        <?php
        foreach ($listings as $listing):
            $liveNumber = ceil((time() - $listing->liveDate / 1000) / 86400);
            $updatedNumber = ceil((time() - $listing->updatedDate / 1000) / 86400);
            ?>
            <tr class="item listing {{$listing->isGuaranteed?'guaranteed':''}}  {{$listing->isPrivate?'listing-private':''}}" data-item-id='{{$listing->rlistingId}}' >
                <td>
                    <input type="checkbox" class="selected-email-listing selected-listing-{{$listing->rlistingId}}" value="{{$listing->rlistingId}}" />
                </td>
                <?php if (!empty($listing->link)): ?>
                    <td><a href="{{$listing->link}}" target="_blank">{{$listing->rlistingId}}</a></td>
                <?php else: ?>
                    <td><a href="/listing/{{$listing->rlistingId}}" target="_blank">{{$listing->rlistingId}}</a></td>
                <?php endif; ?>
                <td>
                    <?php if (!empty($listing->photo) && is_object($listing->photo)): ?>
                        <img src='{{$listing->photo->link}}' style="max-height:32px;" />
                    <?php endif; ?>
                </td>
                <td>
                    <?php if (!empty($listing->redBookPhotos)): ?>
                        <img class="redBookPhoto" style="width:48px;height: auto;" src="{{$listing->redBookPhotos[0]}}" />
                        <input type="hidden" class="redBookPhotos" value="{{json_encode($listing->redBookPhotos)}}" />
                    <?php endif; ?>
                    <?php if (!empty($listing->pinkBookPhotos)): ?>
                        <img class="pinkBookPhoto" style="width:48px;height: auto;" src="{{$listing->pinkBookPhotos[0]}}" />
                        <input type="hidden" class="pinkBookPhotos" value="{{json_encode($listing->pinkBookPhotos)}}" />
                    <?php endif; ?>
                </td>
                <td>{{$listing->formatPrice}}</td>
                <td>{{$listing->formatSize}}</td>
                <td style="width:200px;">{{$listing->address}}</td>
                <td>{{$listing->sourceBy}}<br>{{$listing->createdByName}}<br />{{$listing->createdByphone}}</td>
                <td>{{$liveNumber}}</td>
                <td><a href="javascript:void(0)" class="getLogListing" data-listing-id="{{$listing->rlistingId}}">{{$updatedNumber}}</a></td>
                <td>{{$listing->directionName}}</td>
                <td></td>
                <td></td>
            </tr>
        <?php endforeach; ?>

    </table> 
<?php endif; ?>
<script type="text/javascript">
    $(".selected-listing").on("click", function () {
        var leadId = parseInt($("#leadId").val());
        var rlistingId = parseInt($(this).val());
        var current = $(this);
        if ($(this).prop('checked')) {
            $("#ajax-loading").show();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('#csrf-token').val()
                }
            });
            $.ajax({
                url: "/deal/add-email-listings",
                type: "post",
                data: JSON.stringify({
                    'leadId': leadId,
                    'rlistingIds': [rlistingId]
                })
            }).done(function (response) {
                console.log($("#listing-to-send tbody"));
                $("#listing-to-send tbody").html(response);
                current.parents('.listing').hide();
            }).always(function () {
                $("#ajax-loading").hide();
            });
        }
    });



    $(".pinkBookPhoto").on("click", function (event) {
        event.preventDefault();
        var photos = JSON.parse($(this).parents("tr").find("input.pinkBookPhotos").val());
        if (photos) {
            var html = "";
            for (var x in photos) {
                html += "<div class='item' style='text-align:center'><img src='" + photos[x] + "' /></div>";
            }
            initSlideModal(html);
        }
    });
    $(".redBookPhoto").on("click", function (event) {
        event.preventDefault();
        console.log('clicked');
        var photos = JSON.parse($(this).parents("tr").find("input.redBookPhotos").val());
        if (photos) {
            var html = "";
            for (var x in photos) {
                html += "<div class='item' style='text-align:center'><img src='" + photos[x] + "' /></div>";
            }
            initSlideModal(html);
        }
    });

    function initSlideModal(html) {
        try {
            $("#owl-carousel").data('owlCarousel').destroy();
        } catch (ex) {
        }
        $("#owl-carousel").html(html);
        $("#owl-carousel").owlCarousel({
            singleItem: true,
            navigation: true,
            navigationText: ['trước', 'sau']
        });
        $("#image-slider").modal();
    }
</script>
<style>
    tr.guaranteed td{
        background: rgba(243,156,18,0.70);
    }
</style>
