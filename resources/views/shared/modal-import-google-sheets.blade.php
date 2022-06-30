<div id="modalImportGoogleSheets" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Import</h4>
            </div>
            <div class="modal-body">	
                <div class="container container-modal">
                    <div class="row">
                        <label>
                            <input type="radio" checked id="checkGoogleSheet" name="checkUrl">Google sheet
                        </label>
                        <div class="col-md-11 col-md-offset-1">
                            Url <input class="url-input" placeholder="Nhập đường dẫn">
                        </div>
                    </div>
                </div>
                <div class="container-error">
                    <p class="error">Import không thành công</p>
                    <p class="error-content"></p>
                    <p>Vui lòng kiểm tra lại</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary btn-choose">Import</button>
                <button class="btn btn-normal btn-cancel">Hủy</button>
            </div>
        </div>
    </div>
</div>

<style>
    #checkGoogleSheet {
        margin-right:8px;
    }
    .container-error {
        display:none;
    }
    .container-error .error {
        color:red;
    }
    .container-modal {
        width:500px !important;
    }
    #modalImportGoogleSheets .url-input {
        width:90%;
    }
</style>