<div class="neighbours">
<!-- Vay -->
    <div class="borrowAmmountWrapper form-show-hidden" id="2">
        <div class="row">
            <label class="col-sm-4">Vay bao nhiêu</label>
            <div class="col-sm-8">
                <input type="text" insertmore="VayBaoNhieu" class="borrowPrice initialBudget form-control" value="" />
                <div class="errors errors-borrowPrice" ></div>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-4">Thẩm định khoản vay</label>
            <div class="col-sm-8">
                <select insertmore="ThamDinhKhoanVay" class="form-control">
                    <option value="">Chọn</option>
                    <option value="Có">Có</option>
                    <option value="Chưa">Chưa</option>
                </select>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-4">Có cần Propzy hỗ trợ?</label>
            <div class="col-sm-8">
                <select insertmore="CoCanPropzyHoTro" class="form-control">
                    <option value="">Chọn</option>
                    <option value="Có">Có</option>
                    <option value="Không">Không</option>
                </select>
            </div>
        </div>
    </div>
    <!-- \ Vay -->

    <!-- Người thân -->
    <div class="forHoTroTuNguoiThan form-show-hidden" id="3">
        <div class="row">
            <label class="col-sm-4">Người thân là ai</label>
            <div class="col-sm-8">
                <input type="text" insertmore="NguoiThanLaAi" class="borrowPrice form-control" value="" />
                <div class="errors errors-borrowPrice" ></div>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-4">Hỗ trợ bao nhiêu</label>
            <div class="col-sm-8">
                <select insertmore="HoTroBaoNhieu" class="form-control">
                    <option value="">Chọn</option>
                    <option value="80%+">> 80%</option>
                    <option value="50%_70%">50% - 80%</option>
                    <option value="30%_50%">30% - 50%</option>
                    <option value="30%-">< 30%</option>
                </select>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-4">Người hỗ trợ có sẵn</label>
            <div class="col-sm-8">
                <select insertmore="NguoiHoTroCoSan" class="form-control">
                    <option value="">Chọn</option>
                    <option value="Có">Có</option>
                    <option value="Không">Không</option>
                </select>
            </div>
        </div>
    </div>

    <!-- \ Người thân -->

    <!-- có sẵn -->
    <div class="forNganSachCoSan form-show-hidden" id="1">
        <div class="row">
            <label class="col-sm-4">Có sẵn bao nhiêu</label>
            <div class="col-sm-8">
                <input type="text" insertmore="CoSanBaoNhieu" class="borrowPrice initialBudget form-control" value="" />
                <div class="errors errors-borrowPrice" ></div>
            </div>
        </div>
    </div>
    <!-- \ có sẵn -->
</div>