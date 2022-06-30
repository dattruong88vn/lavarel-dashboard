<script type="text/html" id="charges-tmpl" type="text/template7">
    <div class="row row-hh">
        <div class="col-md-4">
            <div class="form-group">
                <select id="feeItem" class="form-control select2" style="width: 100%;">
                    <option value="0">--- Chọn phí ---</option>
                    @foreach($buildingFeesTypeList as $FeesType)
                        <option value="{{$FeesType->ftId}}">{{$FeesType->feesName}}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <select id="feeLoc" class="form-control select2" style="width: 100%;">
                    <option value="vnd">VND</option>
                    <option value="usd">USD</option>
                </select>
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <input type="text" name="charges" class="form-control" id="charges" placeholder="Mức phí">
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label class="checkbox">
                    <input name="feeItemInclude" type="checkbox" id="feeItemInclude">
                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> &nbsp;Trong giá
                </label>
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <div class="add-row add-charges"><i class="btn-fa-circle btn-fa-circle-green fa fa-plus txt-add"></i></div>
            </div>
        </div>
    </div>
</script>