

{{--start group--}}
<div class="form-group">
    <label>Địa Điểm - <i class="check-all"><input type="checkbox" id="check-all">Check All</i></label>
    <div class="checkbox">
        @foreach($districtList as $item)
            <label class="w-15">
                <input type="checkbox" id="requestListDistricts" name="requestListDistricts[]" value="{{ $item->districtId }}"
                       <?php
                       $requestListDistricts = df_ref($requestData['requestListDistricts'], array());
                       foreach ($requestListDistricts as $reqDistrict)
                           if($item->districtId == $reqDistrict['districtId'])
                               echo 'checked';
                       ?>
                       class="address-check">
                {{ $item->districtName }}
            </label>
        @endforeach
    </div>
</div>

<div class="row">
    <div class="col-lg-4">
        <div class="form-group">
            <label>Loại Hình Giao Dịch</label>
            <select id="listingTypeId" name="listingTypeId" class="form-control select2" style="width: 100%;">
                <option value="0">-- Chọn loại hình giao dịch --</option>
                <option value="{{ FOR_RENT }}" <?= df_ref($requestData['listingTypeId']) == FOR_RENT ? 'selected' : ''; ?>>Thuê</option>
                <option value="{{ FOR_SELL }}" <?= df_ref($requestData['listingTypeId']) == FOR_SELL ? 'selected' : ''; ?>>Mua</option>
            </select>
        </div>
    </div>

    <div class="col-lg-4">
        <div class="form-group">
            <label>Mục đích kinh doanh</label>
            <select id="purposeTypeId" name="purposeTypeId"class="form-control select2" style="width: 100%;">
                <option value="0">-- Chọn mục đích kinh doanh --</option>
                <?php
                foreach (df_ref($purposeTypeList, array()) as $value)
                    echo "<option value='{$value['id']}' ".(df_ref($requestData['purposeId']) == $value['id'] ? 'selected' : '').">{$value['name']}</option>";
                ?>
            </select>
        </div>
    </div>

    <div class="col-lg-4">
        <div class="form-group">
            <label>Loại Bất Động Sản</label>
            <select id="propertyTypeId" name="propertyTypeId"class="form-control select2" style="width: 100%;">
                <option value="0">-- Chọn loại hình bất động sản --</option>
                <?php
                foreach (df_ref($arrPropertyTypeList, array()) as $value)
                    echo "<option value='{$value['id']}' ".(df_ref($requestData['propertyTypeId']) == $value['id'] ? 'selected' : '').">{$value['name']}</option>";
                ?>
            </select>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-lg-3">
        <div class="form-group">
            <label>Phòng Ngủ</label>
            <select id="bedrooms" name="bedrooms" class="form-control select2" style="width: 100%;">
                <option value="0">-- Chọn số phòng ngủ</option>
                @for($i = 1 ; $i <= 10 ; $i++)
                    <option value="{{ $i }}" <?= df_ref($requestData['bedrooms']) == $i ? 'selected' : ''; ?>>{{ $i }}</option>
                @endfor
            </select>
        </div>
    </div>
    <div class="col-lg-3">
        <div class="form-group">
            <label>Phòng Tắm</label>
            <select id="bathrooms" name="bathrooms" class="form-control select2" style="width: 100%;">
                <option value="0">-- Chọn số phòng tắm</option>
                @for($i = 1 ; $i <= 10 ; $i++)
                    <option value="{{ $i }}" <?= df_ref($requestData['bathrooms']) == $i ? 'selected' : ''; ?>>{{ $i }}</option>
                @endfor
            </select>
        </div>
    </div>

    <div class="col-lg-3">
        <div class="form-group">
            <label>Hướng Nhà</label>
            <select id="directionId" name="directionId" class="form-control select2" style="width: 100%;">
                @foreach(unserialize(SEL_DERECTION) as $key => $value)
                    <option value="{{ $key }}" <?= df_ref($requestData['directionId']) == $key ? 'selected' : ''; ?>>{{ $value }}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="col-lg-3">
        <div class="form-group">
            <label>Năm Xây Dựng</label>
            <select id="yearBuild" name="yearBuild" class="form-control select2" style="width: 100%;">
                <option value="0">-- Chọn năm xây dựng --</option>
                @foreach(unserialize(SEL_YEARS) as $key => $value)
                    <option value="{{ $key }}" <?= df_ref($requestData['yearBuild']) == $key ? 'selected' : ''; ?>>{{ $value }}</option>
                @endforeach
            </select>
        </div>
    </div>


</div>

<div class="row">
    <div class="col-lg-3">
        <div class="form-group">
            <label>Diện Tích Từ</label>
            <input type="text" id="minSize" name="minSize" class="form-control"
                   value="<?= df_ref($requestData['minSize']); ?>"
                   placeholder="Diện Tích Từ">
        </div>
    </div>
    <div class="col-lg-3">
        <div class="form-group">
            <label>Đến</label>
            <input type="text" id="maxSize" name="maxSize" class="form-control"
                   value="<?= df_ref($requestData['maxSize']); ?>"
                   placeholder="Đến">
        </div>
    </div>
    <div class="col-lg-3">
        <div class="form-group">
            <label>Giá Từ</label>
            <input type="text" id="minPrice" name="minPrice" class="form-control"
                   value="<?= df_ref($requestData['minPrice']); ?>"
                   placeholder="Giá Từ">
        </div>
    </div>
    <div class="col-lg-3">
        <div class="form-group">
            <label>Đến</label>
            <input type="text" id="maxPrice" name="maxPrice" class="form-control"
                   value="<?= df_ref($requestData['maxPrice']); ?>"
                   placeholder="Đến">
        </div>
    </div>
</div>

<div class="row">
    <div class="col-lg-3">
        <div class="form-group">
            <label>Tạo cách đây (Số ngày)</label>
            <input type="text" id="timePosted" name="timePosted" class="form-control txt-dv"
                   value="<?= df_ref($requestData['timePosted']); ?>"
                   placeholder="Tạo cách đây [x] ngày" style="width: 100%;">
        </div>
    </div>    
    <div class="col-lg-6" >

    @if( df_ref($removeMessage, false) != true)
        <div class="form-group">
            <label>Request Note</label>
            <textarea id="message" name="message" class="form-control" rows="2" placeholder="Note" tabindex="9">{{ df_ref($requestData['message']) }}</textarea>
        </div>
    @else
        <div class='form-group'>
            <label>Request Note</label>
            <textarea readonly="readonly" class="form-control" style='min-height:144px'>{{$requestData['message']}}</textarea>
        </div>
    @endif
    </div>

</div>
{{--end group--}}

@section('page-js')

    <script src="{{loadAsset("/plugins/jquery-mask/jquery.mask.js")}}"></script>

    <script language="JavaScript">

        json_str = '<?= json_encode($allListingTypeInfo); ?>';
        var listingTypeObj;

        $(function(){
            listingTypeObj = JSON.parse(json_str);
//            console.log(listingTypeObj);
            $("#minPrice").mask('000.000.000.000.000.000', {reverse: true});
            $("#maxPrice").mask('000.000.000.000.000.000', {reverse: true});
        });

        $('#listingTypeId').change(function(){
            console.log('listingTypeId');
            var htmlProperty='<option value="0">-- Chọn loại hình bất động sản --</option>';
            var htmlPurpose='<option value="0">-- Chọn mục đích kinh doanh --</option>';
            curr_listing_id = parseInt($(this).val());
            if(curr_listing_id == 0)
            {
                $('#propertyTypeId').html(htmlProperty).select2();
                $('#purposeTypeId').html(htmlPurpose).select2();
                return;
            }
            $.each(listingTypeObj, function( index, listing ) {
                if(listing.id == curr_listing_id)
                {
                    $.each(listing.list, function( index, purpose ) {
                        htmlPurpose += '<option value="'+purpose.id+'">'+purpose.name+'</option>';
                    });
                    $('#propertyTypeId').html(htmlProperty).select2();
                }
            });

            $('#purposeTypeId').html(htmlPurpose).select2();
            $('#propertyTypeId').html(htmlProperty).select2();
        });

        $('#purposeTypeId').change(function(){
            curr_listing_id = parseInt($('#listingTypeId').val());
            curr_purpose_id = parseInt($(this).val());
            var htmlProperty='<option value="0">-- Chọn loại hình bất động sản --</option>';
            if(curr_purpose_id == 0)
            {
                $('#propertyTypeId').html(htmlProperty).select2();
                return;
            }

            $.each(listingTypeObj, function( index, listing ) {

                if(listing.id == curr_listing_id)
                {
                    $.each(listing.list, function( index, purpose ) {
                        if(purpose.id == curr_purpose_id) {
                            $.each(purpose.list, function(index, property){
                                htmlProperty += '<option value="'+property.id+'">'+property.name+'</option>';
                            });
                            $('#propertyTypeId').html(htmlProperty).select2();
                        }
                    });
                }

            });
        });


    </script>

@append




