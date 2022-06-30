<script id="move-in-date-sale" type="text/template7">
	<h3 class="box-title">Ngày có thể dọn vào</h3>  
   	<div class="row">
              <div class="col-md-3 col-xs-12">
                  <div class="form-group">
                    <div class="radio">
                      <label><input id="afterSigningContract" type="radio" name="optradio" value="" >Dọn vào sau khi ký hợp đồng</label>
                    </div>   
                  </div>                                                      
              </div>   
              <div class="col-md-3 col-xs-12">
                <div class="form-group">
                  <div class="radio">
                    <label><input id="moveInNowSale" type="radio" name="optradio">Dọn Vào Ngay</label>
                  </div>
                </div>
              </div> 
              <div class="col-md-3 col-xs-12">
                  <div class="form-group">
                    <div class="radio">
                      <label>
                      <input id="afterNumberDays" type="radio" name="optradio">Sau khi ký hợp đồng [x] ngày</label>
                       <select  id="afterNumberDaysSelect" class="form-control select2 bs-select-hidden"  style=
                          "width: 100%;">                                      
                            @for($i = 1;$i <= 24;$i++)
                                  <option value="{{$i}}"> {{$i}} tháng</option>
                            @endfor                                        
                       </select>     
                    </div>
                  </div>

              </div>
              <div class="col-md-3 col-xs-12">
                <div class="form-group"> 
                    <div class="radio">  
                      <label><input id="eventDateSaleCheck" type="radio" name="optradio" >Ngày dọn vào</label> 
                       <div class="date">
                      
                        <div class="input-group input-append date" id="datePicker">

                            <input id="eventDateSale" type="text" class="form-control" name="eventDateSale" value=""/>
                            <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                    </div>
                    </div>
                   
                </div>                               
              </div> 
  </div> <!-- End row -->
</script>