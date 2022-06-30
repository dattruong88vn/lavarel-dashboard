<?php
if (isset($listings)):
    foreach ($listings as $listing):
        if ($listing->fromSchedule) {
            continue;
        }
        ?>
        <tr data-item-id="{{$listing->rlistingId}}">
            <td>
                <?php
                if (!$listing->isDeposited):
                    $isChecked = "";
                    $isDisabled = "";
                    if ($listing->isScheduled) {
                        $isChecked = 'checked';
                        $isDisabled = 'disabled';
                    }
                    ?>
                    <input type="checkbox" class="select-listing" {{$isChecked}} {{$isDisabled}} value="{{$listing->rlistingId}}" />
                    <?php
                else:
                    ?>
                    <span>Deposited</span>
                <?php endif; ?>
            </td>
            <td>
                <a href="<?= PRODUCT_URL . 'chi-tiet/' . str2url($listing->title) . '/' . str2url($listing->districtName) . '/' . $listing->rlistingId; ?>" target="_blank">
                    {{$listing->rlistingId}}
                </a>
            </td>
            <td>                
                <?php if ($listing->photo): ?>
                    <img src="{{$listing->photo->link}}" style="width:48px;height: auto;" />
                <?php endif; ?>
            </td>
            <td>
                <?php if (!empty($listing->redBookPhotos)): ?>
                    <img class="redBookPhoto" style="width:48px;height: auto;" src="{{$listing->redBookPhotos[0]}}" />
                    <input type="hidden" class="redBookPhotos" value="{{json_encode($listing->redBookPhotos)}}" />
                <?php endif; ?>
            </td>
            <td>
                <?php if (!empty($listing->pinkBookPhotos)): ?>
                    <img class="pinkBookPhoto" style="width:48px;height: auto;" src="{{$listing->pinkBookPhotos[0]}}" />
                    <input type="hidden" class="pinkBookPhotos" value="{{json_encode($listing->pinkBookPhotos)}}" />
                <?php endif; ?>
            </td>
            <td>{{$listing->directionName}}</td>
            <td class="text-right">{{$listing->sizeWidth}} x {{$listing->sizeLength}}</td>
            <td>{{$listing->bedRooms}}</td>
            <td>{{$listing->bathRooms}}</td>
            <td>{{$listing->formatSize}}</td>
            <td>{{$listing->formatPrice}}</td>
            <td><span class="address">{{$listing->address}}</span></td>
            <td>{{$listing->ownerPhone?$listing->ownerPhone:""}}</td>
            <td>{{$listing->ownerName}}</td>
            <td>{{$listing->sourceBy}}</td>
            <td><input class="deactivate-listing"  type="checkbox" value="{{$listing->rlistingId}}" <?php echo $listing->isDeactivated ? "checked='checked'" : ""; ?>   <?php echo $listing->isDeactivated ? "disabled='disabled'" : ""; ?>  /></td>
            <td><input class="select-customer-listing"  value="{{$listing->rlistingId}}"  type="checkbox" <?php echo $listing->isSelected ? "checked='checked'" : ""; ?>   <?php echo $listing->isSelected ? "disabled='disabled'" : ""; ?>   /></td>
            <td><button type="button" class="btnRemoveEmailListing" data-id="{{$listing->rlistingId}}"><i class="fa fa-remove" ></i></button></td>
        </tr>
        <?php
    endforeach;
    ?>
    <script type="text/javascript">
        $(".select-all-listing").on('click', function () {
            $(this).parents("table").find('.select-listing').prop("checked", $(this).prop('checked'));
        });
        $('.select-listing').on('click', function () {
            var isSelected = $(this).prop('checked');
            if (false == isSelected) {
                $(this).parents('table').find('.select-all-listing').prop('checked', false);
            }else{
                
            }
        });
        $(".btnRemoveEmailListing").unbind("click");
        $(".deactivate-listing").unbind("click");
        $(".btnRemoveEmailListing").on("click", function (event) {
            event.preventDefault();
            var leadId = $("#leadId").val();
            var rlistingId = $(this).attr('data-id');
            $("#ajax-loading").show();
            var current = $(this);
            $.ajax({
                url: "/lead/remove-email-listing/" + leadId + "/" + rlistingId,
                type: "get"
            }).done(function (response) {
                current.parents('tbody').html(response);
                /*
                 console.log($(".selected-listing-" + rlistingId).parents(".listing"));
                 $(".selected-listing-" + rlistingId).parents(".listing").show();
                 $(".selected-listing-" + rlistingId).prop('checked', false);
                 */

                if (current.parents("tr").find(".deactivate-listing").prop("checked")) {
                    return;
                } else {
                    $(".selected-listing-" + rlistingId).parents(".listing").show();
                    $(".selected-listing-" + rlistingId).prop('checked', false);
                }
            }).always(function () {
                $("#ajax-loading").hide();
            });
        });

        $(".deactivate-listing").on("click", function (event) {
            var current = $(this);
            if ($(this).prop("checked")) {
                var rlistingId = parseInt($(this).val());
                var leadId = parseInt($("#leadId").val());
                $('#ajax-loading').show();
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('#csrf-token').val()
                    }
                });
                $.ajax({
                    url: '/lead/deactivate-listing',
                    type: 'post',
                    data: JSON.stringify({
                        'rlistingId': rlistingId,
                        'leadId': leadId
                    })
                }).done(function (response) {
                    console.log(response);
                    if (response.result) {
                        current.prop('disabled', true);
                    }
                }).always(function () {
                    $('#ajax-loading').hide();
                });
            }
        });


        $(".select-customer-listing").on("click", function (event) {
            var current = $(this);
            if ($(this).prop("checked")) {
                var rlistingId = parseInt($(this).val());
                var leadId = parseInt($("#leadId").val());
                $('#ajax-loading').show();
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('#csrf-token').val()
                    }
                });
                $.ajax({
                    url: '/lead/select-customer-listing',
                    type: 'post',
                    data: JSON.stringify({
                        'rlistingId': rlistingId,
                        'leadId': leadId
                    })
                }).done(function (response) {
                    console.log(response);
                    if (response.result) {
                        current.prop('disabled', true);
                    }
                }).always(function () {
                    $('#ajax-loading').hide();
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
    <?php
endif;
?>