<?php
foreach ($listings as $listing):
    if ($listing->isSelected) {
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
        <td>{{$listing->agentPhone?$listing->agentPhone:$listing->socialUserPhone}}</td>
        <td><input class="deactivate-listing"  type="checkbox" value="{{$listing->rlistingId}}" <?php echo $listing->isDeactivated ? "checked='checked'" : ""; ?>   <?php echo $listing->isDeactivated ? "disabled='disabled'" : ""; ?>  /></td>
        <td><input class="select-customer-listing"  value="{{$listing->rlistingId}}"  type="checkbox" <?php echo $listing->isSelected ? "checked='checked'" : ""; ?>   <?php echo $listing->isSelected ? "disabled='disabled'" : ""; ?>   /></td>
        <td>N/A</td>
        <td><button type="button" class="btnRemoveEmailListing" data-id="{{$listing->rlistingId}}"><i class="fa fa-remove" ></i></button></td>
    </tr>
<?php endforeach; ?>

<script>
    initEmailListing();
</script>