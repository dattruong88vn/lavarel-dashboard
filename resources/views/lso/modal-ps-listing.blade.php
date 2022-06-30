<div id="modal-ps-listing" class="modal fade" role="dialog">
   <div class="modal-dialog">
      <div class="modal-content">         
         <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <ul class="nav nav-tabs">
              <li class="ps-link active"><a data-toggle="tab" href="#ps">Yêu Cầu Dịch Vụ</a></li>
              <li class="done-ps-link"><a data-toggle="tab" href="#done-ps">Đã Yêu Cầu</a></li>
            </ul>
            <div class="tab-content">
              <div id="ps" class="tab-pane fade in active">                
                <div class="container">
                  <h2></h2>
                  <div class="col-sm-12">
                    <form class="form-horizontal">
                      <table id="lso-ps-datas" class="table borderless">
                      </table>                
                      <div class="row form-group">
                        <label class="col-sm-12">Lý do</label> 
                        <div class="col-sm-6">     
                          <textarea id="sendPsContent" class="form-control" rows="5"></textarea>
                        </div>
                      </div>
                      <div class="col-sm-2"></div>
                      <div class="col-sm-2 text-center">                        
                        <button id="send-ps" type="button" class="btn btn-primary btn-block">Gửi</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div id="done-ps" class="tab-pane fade">                
                <div class="container">
                  <h2></h2>
                  <div class="col-sm-12">
                    <form class="form-horizontal">
                      <table id="lso-ps-done-datas" class="table borderless">
                      </table>                      
                      <div class="col-sm-2"></div>
                      <div class="col-sm-2 text-center">                        
                        <button id="send-done-ps" type="button" class="btn btn-primary btn-block">Xong</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>              
            </div>
         </div>         
      </div>
   </div>
</div>
