<!-- make call -->
<div id="setTargetModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formSetTarget" method="post" >                
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Thiết lập target</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <div class="col-sm-3">
                            <label for="">Khu vực</label>
                            <select id="targetRegions" name="" class="form-control select2" multiple="multiple">
                            </select>
                        </div>
                        <div class="col-sm-3">
                            <label for="">Thành phố/tỉnh</label>
                            <select id="targetCities" name="" class="form-control select2" multiple="multiple">
                            </select>
                        </div>
                        <div class="col-sm-3">
                            <label for="">Quận</label>
                            <select id="targetDistricts" name="" class="form-control select2" multiple="multiple">

                            </select>
                        </div>
                        <div class="col-sm-3">
                            <label for="">AM</label>
                            <select id="ams" name="" class="form-control select2" multiple="multiple">

                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <table class="table table-bordered">
                            <tr>
                                <th>Các tiêu chí</th>
                                <th class="hidden">%</th>
                                <th>target</th>
                            </tr>
                            <tr class="target" targetType="1">
                                <td>Số Agent tăng trưởng hàng tháng (AG)</td>
                                <td class="hidden"><input type="text" class="targetScore hidden" value="0"></td>
                                <td><input type="text" class="targetValue" /></td>
                            </tr>
                            <tr class="target" targetType="2">
                                <td>Số môi giới đang hoạt động (AAR)</td>
                                <td class="hidden"><input type="text" class="targetScore hidden" value="0"></td>
                                <td><input type="text" class="targetValue" /></td>
                            </tr>
                            <tr class="target" targetType="3">
                                <td>Số tin đăng trên mỗi môi giới (LPA)</td>
                                <td class="hidden"><input type="text" class="targetScore hidden" value="0"></td>
                                <td><input type="text" class="targetValue" /></td>
                            </tr>
                        </table>
                    </div>
                    <div class="form-group text-center">
                        <button class="btn btn-success btnSaveTarget">Save</button>
                        <a href="#" class="btn btn-danger"  data-dismiss="modal" >Cancel</a>
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
<!-- end make call -->