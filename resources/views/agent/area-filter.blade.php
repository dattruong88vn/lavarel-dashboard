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
<div class="form-group">
    <div class="col-xs-4">
        <label for="">Tên</label>
        <input type="text" name="name" id="name" value="" class="form-control" />
    </div>
    <div class="col-sm-4 text-center">
        <label class="col-xs-12">&nbsp;</label>
        <button id="btnSearch" class="btn btn-primary">Search</button>	
        <button id="btnViewAll" class="btn btn-primary">Xem tất cả</button>	
        <button class="btnShowAssignModal btn btn-warning">Thiết lập target</button>
    </div>
</div>
<script type="text/javascript">
    $(function () {
        $("#regions").change(function () {
            selectionChange = true;
            postData.regionIdsList = parseIntArray($(this).val());
            getCitiesByRegions("#cities",postData.regionIdsList);
        });
        $("#cities").change(function () {
            selectionChange = true;
            postData.cityIdsList = parseIntArray($(this).val());
            getDistrictsByCities("#districts",$("#regions").val(), postData.cityIdsList);
        });
        $("#districts").change(function () {
            selectionChange = true;
            postData.districtIdsList = parseIntArray($(this).val());
        });
        //showPropzyLoading();
        getRegions("#regions");
        /*getCitiesByRegions(null);
         getDistrictsByCities(null, null,function(){
         hidePropzyLoading();
         });*/
    });
</script>