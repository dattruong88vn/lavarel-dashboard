<div class="form-group">
    <div class="col-sm-4">
        <label for="">Chọn khu vực</label>
        <select id="regions" name="" class="form-control select2" multiple="multiple">
        </select>
    </div>
    <div class="col-sm-4">
        <label for="">Chọn thành phố/tỉnh</label>
        <select id="cities" name="" class="form-control select2" multiple="multiple">
        </select>
    </div>
    <div class="col-sm-4">
        <label for="">Chọn quận</label>
        <select id="districts" name="" class="form-control select2" multiple="multiple">

        </select>
    </div>
</div>
<script type="text/javascript">
    $(function(){
        $("#regions").change(function(){
            selectionChange = true;
            postData.regionIdsList = parseIntArray($(this).val());
            getCitiesByRegions(postData.regionIdsList);
        });
        $("#cities").change(function(){
            selectionChange = true;
            postData.cityIdsList = parseIntArray($(this).val());
            getDistrictsByCities($("#regions").val(), postData.cityIdsList);
        });
        $("#districts").change(function(){
            selectionChange = true;
            postData.districtIdsList = parseIntArray($(this).val());
        });
        getRegions();
    });
</script>