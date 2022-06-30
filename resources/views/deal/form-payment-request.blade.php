<!-- make call -->
<div id="paymentRequestModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formPaymentRequestModal" method="post" class="form-horizontal">
                <input type="hidden" class="reminderTypeId" name="reminderTypeId" value=1 />
                <input type="hidden" id="customerId" name="customerId" value="{{$request->customerId}}" />
                <input type="hidden" id="dealId" name="dealId" value="{{$deal->dealId}}" />
                <input type="hidden" class="customerName" name="customerName" value="{{$request->customers->name}}" />
                <input type="hidden" class="customerPhone" name="customerPhone" value="{{$request->customers->phone}}" />
                <input type="hidden" class="dealJson" name="dealJson" value="" />

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Yêu cầu thanh toán</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="" class="col-sm-3">Ngày:</label>
                        <div class="col-sm-9">
                            <input type="text" id="sentDate" name="sentDate" class="form-control" value=""/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="" class="col-sm-3">Kính gửi:</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control saleName" value=""/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="" class="col-sm-3">Mã Giao dịch:</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control dealId" value=""/>
                        </div>
                    </div>
                    <p><b>Thông tin Chủ nhà/Đối tác môi giới:</b></p>
                    <div class="form-group">
                        <label for="" class="col-sm-3">Tên đầy đủ:</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="saleName" name="saleName" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="" class="col-sm-3">Địa chỉ:</label>
                        <div class="col-sm-9">
                            <input type="text" name="address" id="address" class="form-control" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="" class="col-sm-3">Mã số thuế :</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="taxCode" name="taxCode" />
                        </div>
                    </div>
                    <p>Cám ơn Quý vị/Quý Công ty đã hợp tác với Propzy để Khách hàng của chúng tôi thực hiện chốt giao dịch bất động sản thành công với Quý vị, với chi tiết như sau.</p>
                    <div class="form-group">
                        <label for="" class="col-sm-6">- Giá trị giao dịch Mua/bán:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="transactionValue" name="transactionValue" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="" class="col-sm-6">- Tổng số tiền hoa hồng môi giới nhận được:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" name="totalCommission" id="totalCommission"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="" class="col-sm-6 control-label">+ Phần Hoa hồng của Đối tác môi giới:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="commissionForSale" name="commissionForSale"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="" class="col-sm-6 control-label">+ Phần Phí Dịch vụ của Propzy:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="serviceFees" name="serviceFees" />
                        </div>
                    </div>
                    <div class="form-group text-abc">
                        <label for="" class="col-sm-3 control-label">( Bằng chữ:</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="serviceFeesInText" id="serviceFeesInText" />
                        </div>
                    </div>
                    <br><br>
                    <p>Theo thỏa thuận các bên đã thống nhất, đề nghị Quý vị/Quý Công ty thanh toán mức phí Dịch vụ của Propzy nêu trên trong vòng 05 ngày kể từ ngày nhận được Yêu cầu thanh toán này bằng phương thức sau: </p>
                    <div class="form-group">
                        <label class="col-sm-12">
                            <input type="radio" class="paymentMethod paymentMethod-1" name="paymentMethod" value="1" /> Chuyển khoản qua Ngân hàng vào một trong các tài khoản sau:
                        </label>
                        <div class="col-sm-12">Tên Tài khoản: <b>CÔNG TY TNHH MTV PROPZY VIỆT NAM</b></div>
                        <ol>
                            <li>Số tài khoản: 033 100 043 2560 tại VIETCOMBANK – Chi nhánh Bến Thành.</li>
                            <li>Số tài khoản: 10 201 000 260 3360 tại VIETINBANK  –  Chi nhánh 02 TP HCM.</li>
                            <li>Số tài khoản: 22 163 1149 tại ACB –  Chi nhánh Nguyễn Văn Trỗi.</li>
                            <li>Số tài khoản: 06 013 045 6378 tại SACOMBANK –  Chi nhánh Nguyễn Văn Trỗi.</li>
                        </ol>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-12">
                            <input type="radio" class="paymentMethod paymentMethod-2" name="paymentMethod" value="2" /> Tiền mặt tại Bộ Phận Kế toán Giao dịch, VP Propzy: Lầu 02, Tòa nhà Fonterra, 38/6N Nguyễn Văn Trỗi, P.15, Q. Phú Nhuận, TP. HCM.
                        </label>
                    </div> 
                    <p>Trân trọng cám ơn sự hợp tác của Quý khách.</p>
                    <div class="form-group text-center">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-9">
                            <div>ĐẠI DIỆN CÔNG TY TNHH MTV PROPZY VIỆT NAM</div>
                            <p><b>Quản lý Giao dịch<br>(Transaction Management)</b></p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success btnSendPaymentRequest">Gửi</button>
                    <button class="btn btn-success btnSavePaymentRequest">Lưu nháp</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </form>
        </div>

    </div>
</div>
<!-- end make call -->