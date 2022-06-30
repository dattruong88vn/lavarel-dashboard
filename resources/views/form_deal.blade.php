@extends('layout.default')

@section('content')
    <div class="db-tm-item deal-tm-info-cus">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Thông Tin Khách Hàng</h3>
                    </div>
                    <form class="form-horizontal">
                        <div class="box-body">
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Tên khách hàng</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="" placeholder="Tên khách hàng">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Phone</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" id="" placeholder="Phone">
                                </div>
                                <div class="col-sm-3">
                                    <button type="submit" class="btn btn-info">Tạo call reminder</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Email</label>
                                <div class="col-sm-10">
                                    <input type="email" class="form-control" id="" placeholder="Email">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Nguồn</label>
                                <div class="col-sm-10">
                                    <select class="form-control select2">
                                        <option>option 1</option>
                                        <option>option 2</option>
                                        <option>option 3</option>
                                        <option>option 4</option>
                                        <option>option 5</option>
                                    </select>
                                </div>
                              
                            </div>
                        </div>
                    </form>                  
              </div>
            </div>
        </div>
    </div>

    <div class="db-tm-item deal-tm-re-cus">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Thông Tin Nhu Cầu Khách Hàng</h3>
                    </div>
                    <div class="box-body">
                        <div class="form-group">
                            <label class="col-sm-3">Hình thức giao dịch:</label>
                            <div class="col-sm-9">Mua/Thuê</div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3">Loại bất động sản: </label>
                            <div class="col-sm-9">Nhà</div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3">Ngân sách ban đầu (dự trù): </label>
                            <div class="col-sm-9">8000</div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3">Ngân sách (final):</label>
                            <div class="col-sm-9">9000 (lấy giá trung bình của số listing chọn nếu có hơn 1 listing)</div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3">Quận (s): </label>
                            <div class="col-sm-9">1,2,3</div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3">Số phòng ngủ: </label>
                            <div class="col-sm-2">34</div>
                            <label class="col-sm-2">Số phòng tắm: </label>
                            <div class="col-sm-2">34</div>
                            <label class="col-sm-2">Diện tích: </label>
                            <div class="col-sm-1">34</div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3">Tiện ích khác or Thông tin thêm:</label>
                            <div class="col-sm-9">..........</div>
                        </div>
                        <div class="box-footer ch-bt-fo">
                            <button type="submit" class="btn btn-info pull-right">Broadcast</button>
                        </div>
                    </div>                
              </div>
            </div>
        </div>
    </div>

    <div class="db-tm-item deal-tm-info">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Thông Tin Deal</h3>
                    </div>
                    <form class="form-horizontal">
                        <div class="box-body">
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Trạng thái giao dịch:</label>
                                <div class="col-sm-10">
                                    <select class="form-control select2">
                                        <option>Viewing</option>
                                        <option>option 2</option>
                                        <option>option 3</option>
                                        <option>option 4</option>
                                        <option>option 5</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-sm-2 control-label">Sales đang phụ trách:</label>
                                <div class="col-sm-10">
                                    <select multiple class="form-control">
                                        <option>Availible Sale 01</option>
                                        <option>Availible Sale 02</option>
                                        <option>Availible Sale ..</option>
                                        <option>Availible Sale ..</option>
                                        <option>Availible Sale ..</option>
                                        <option>Availible Sale ..</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">AM đang tham gia:</label>
                                <div class="col-sm-10">.........</div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">Môi giới đang tham gia:</label>
                                <div class="col-sm-10">.........</div>
                            </div>
                            <div class="box-footer ch-bt-fo">
                                <button type="submit" class="btn btn-info pull-right">Reassign</button>
                            </div>
                        </div>
                    </form>                
              </div>
            </div>
        </div>
    </div>

    <div class="db-tm-item deal-tm-info-listing">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Thông Tin Listing</h3>
                      <span class="pull-right">** listing KH xem rồi ko thích sẽ đc làm mờ, listing đi đến giai đoạn xa hơn (suy nghĩ, đặt cọc) sẽ đc để sáng</span>
                    </div>
                    <div class="box-body">
                        <table id="table-deal-listing" class="table table-bordered">
                            <thead>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th style="width: 10%">hình</th>
                                    <th>LID</th>
                                    <th>Bed</th>
                                    <th>Bath</th>
                                    <th>Price</th>
                                    <th>Address</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td><div class="img-listing"><img src="{{loadAsset("/dist/img/123.jpg")}}" alt="" /></div></td>
                                    <td>3</td>
                                    <td>5</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                              <input type="checkbox">
                                              Deactive
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="no-like">
                                    <td>1</td>
                                    <td><div class="img-listing"><img src="{{loadAsset("/dist/img/123.jpg")}}" alt="" /></div></td>
                                    <td>3</td>
                                    <td>5</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                              <input type="checkbox">
                                              Deactive
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="no-like">
                                    <td>1</td>
                                    <td><div class="img-listing"><img src="{{loadAsset("/dist/img/123.jpg")}}" alt="" /></div></td>
                                    <td>3</td>
                                    <td>5</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                              <input type="checkbox">
                                              Deactive
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td><div class="img-listing"><img src="{{loadAsset("/dist/img/123.jpg")}}" alt="" /></div></td>
                                    <td>3</td>
                                    <td>5</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                              <input type="checkbox">
                                              Deactive
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td><div class="img-listing"><img src="{{loadAsset("/dist/img/123.jpg")}}" alt="" /></div></td>
                                    <td>3</td>
                                    <td>5</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                              <input type="checkbox">
                                              Deactive
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td><div class="img-listing"><img src="{{loadAsset("/dist/img/123.jpg")}}" alt="" /></div></td>
                                    <td>3</td>
                                    <td>5</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                              <input type="checkbox">
                                              Deactive
                                            </label>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                            <tfoot>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>hình</th>
                                    <th>LID</th>
                                    <th>Bed</th>
                                    <th>Bath</th>
                                    <th>Price</th>
                                    <th>Address</th>
                                    <th>#</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
              </div>
            </div>
        </div>
    </div>

    <div class="db-tm-item deal-tm-tab-listing">
        <div class="row">
            <div class="col-md-12">                
                <div class="nav-tabs-custom">
                    <ul class="nav nav-tabs">
                      <li class="active"><a href="#tab_deal_1" data-toggle="tab">Stream</a></li>
                      <li><a href="#tab_deal_2" data-toggle="tab">Activity</a></li>
                      <li><a href="#tab_deal_3" data-toggle="tab">Products</a></li>
                      <li><a href="#tab_deal_4" data-toggle="tab">History</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab_deal_1">
                            <div class="list-bt-tm">
                                <button class="btn btn-default">+ Call</button>
                                <button class="btn btn-default">+ Email</button>
                                <button class="btn btn-default">+ Meeting</button>
                                <button class="btn btn-default">+ Event</button>
                                <button class="btn btn-default">+ Task</button>
                            </div>
                            <div class="des">
                                A wonderful serenity has taken possession of my entire soul,
                                like these sweet mornings of spring which I enjoy with my whole heart.
                                I am alone, and feel the charm of existence in this spot,
                                which was created for the bliss of souls like mine. I am so happy,
                                my dear friend, so absorbed in the exquisite sense of mere tranquil existence,
                                that I neglect my talents. I should be incapable of drawing a single stroke
                                at the present moment; and yet I feel that I never was a greater artist than now.
                            </div>
                        </div>
                        <div class="tab-pane" id="tab_deal_2">
                            <div class="list-bt-tm">
                                <button class="btn btn-default">+ Call</button>
                                <button class="btn btn-default">+ Email</button>
                                <button class="btn btn-default">+ Meeting</button>
                                <button class="btn btn-default">+ Event</button>
                                <button class="btn btn-default">+ Task</button>
                            </div>
                            <div class="des">
                                B wonderful serenity has taken possession of my entire soul,
                                like these sweet mornings of spring which I enjoy with my whole heart.
                                I am alone, and feel the charm of existence in this spot,
                                which was created for the bliss of souls like mine. I am so happy,
                                my dear friend, so absorbed in the exquisite sense of mere tranquil existence,
                                that I neglect my talents. I should be incapable of drawing a single stroke
                                at the present moment; and yet I feel that I never was a greater artist than now.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="db-tm-item deal-tm-new-call">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">New Call</h3>
                    </div>
                    <div class="box-body">

                        <div class="form-group">
                            <label class="col-sm-1">When:</label>
                            <div class="col-sm-6">
                                <div class="input-group">
                                    <input type="text" class="form-control date-when">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-5">
                                <div class="bootstrap-timepicker">
                                    <div class="form-group">
                                      <div class="input-group">
                                        <input type="text" class="form-control timepicker">
                                        <div class="input-group-addon">
                                          <i class="fa fa-clock-o"></i>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-1"></label>
                            <div class="checkbox col-sm-2 w-15">
                                <label>
                                  <input type="checkbox">
                                  Set reminder
                                </label>
                            </div>
                            <div class="col-sm-2 w-10">
                              <input type="text" class="form-control" id="" placeholder="15">
                            </div>
                            <div class="col-sm-1 w-10">
                                <div class="ch-select2">
                                    <select class="form-control select2">
                                        <option>min</option>
                                        <option>hr</option>
                                        <option>days</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group cl-box">
                            <label class="col-sm-1 control-label">Type: </label>
                            <div class="col-sm-1 w-15">
                                <div class="ch-select2">
                                    <select class="form-control select2">
                                        <option>Outgoing call</option>
                                        <option>Incoming call</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group cl-box">
                            <label for="" class="col-sm-1 control-label">With</label>
                            <div class="col-sm-11">
                                <input type="text" class="form-control" id="" placeholder="">
                            </div>
                        </div>
                        <div class="form-group cl-box">
                            <label for="" class="col-sm-1 control-label">Subject</label>
                            <div class="col-sm-11">
                                <input type="text" class="form-control" id="" placeholder="Please specify the call subject">
                            </div>
                        </div>
                        <div class="form-group cl-box">
                            <label for="" class="col-sm-1 control-label"></label>
                            <div class="col-sm-11">
                                <textarea class="form-control" rows="3" placeholder="Please enter the call description"></textarea>
                            </div>
                        </div>
                        <div class="form-group cl-box">
                            <label for="" class="col-sm-1 control-label">Responsible person: </label>
                            <div class="col-sm-11">
                                <input type="text" class="form-control" id="" placeholder="John le">
                            </div>
                        </div>
                        <div class="form-group cl-box">
                            <label class="col-sm-1 control-label">Status: </label>
                            <div class="col-sm-11 w-15">
                                <div class="ch-select2">
                                    <select class="form-control select2">
                                        <option>Pending</option>
                                        <option>Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group cl-box">
                            <label class="col-sm-1 control-label">Priority: </label>
                            <div class="col-sm-11 w-10">
                                <div class="ch-select2">
                                    <select class="form-control select2">
                                        <option>Low</option>
                                        <option>nomal</option>
                                        <option>high</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group cl-box">
                          <label for="" class="col-sm-1 control-label">Attach File</label>
                          <input type="file" id="" class="col-sm-11">
                        </div>
                        <div class="box-footer">
                            <button type="submit" class="btn btn-primary pull-right">Save</button>
                            <button type="reset" class="btn btn-primary pull-right">Cancel</button>
                        </div>
                    </div>
              </div>
            </div>
        </div>
    </div>
    <div class="db-tm-item deal-tm-new-meeting">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">New Meeting</h3>
                    </div>
                    <div class="box-body">

                        <div class="form-group">
                            <label class="col-sm-1">When:</label>
                            <div class="col-sm-6">
                                <div class="input-group">
                                    <input type="text" class="form-control date-when">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-5">
                                <div class="bootstrap-timepicker">
                                    <div class="form-group">
                                      <div class="input-group">
                                        <input type="text" class="form-control timepicker">
                                        <div class="input-group-addon">
                                          <i class="fa fa-clock-o"></i>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-1"></label>
                            <div class="checkbox col-sm-2 w-15">
                                <label>
                                  <input type="checkbox">
                                  Set reminder
                                </label>
                            </div>
                            <div class="col-sm-2 w-10">
                              <input type="text" class="form-control" id="" placeholder="15">
                            </div>
                            <div class="col-sm-1 w-10">
                                <div class="ch-select2">
                                    <select class="form-control select2">
                                        <option>min</option>
                                        <option>hr</option>
                                        <option>days</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group cl-box">
                            <label class="col-sm-1 control-label">Type: </label>
                            <div class="col-sm-1 w-15">
                                <div class="ch-select2">
                                    <select class="form-control select2">
                                        <option>Outgoing call</option>
                                        <option>Incoming call</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group cl-box">
                            <label for="" class="col-sm-1 control-label">With</label>
                            <div class="col-sm-11">
                                <input type="text" class="form-control" id="" placeholder="">
                            </div>
                        </div>
                        <div class="form-group cl-box">
                            <label for="" class="col-sm-1 control-label">Subject</label>
                            <div class="col-sm-11">
                                <input type="text" class="form-control" id="" placeholder="Please specify the call subject">
                            </div>
                        </div>
                        <div class="form-group cl-box">
                            <label for="" class="col-sm-1 control-label"></label>
                            <div class="col-sm-11">
                                <textarea class="form-control" rows="3" placeholder="Please enter the call description"></textarea>
                            </div>
                        </div>
                        <div class="form-group cl-box">
                            <label for="" class="col-sm-1 control-label">Responsible person: </label>
                            <div class="col-sm-11">
                                <input type="text" class="form-control" id="" placeholder="John le">
                            </div>
                        </div>
                        <div class="form-group cl-box">
                            <label class="col-sm-1 control-label">Status: </label>
                            <div class="col-sm-11 w-15">
                                <div class="ch-select2">
                                    <select class="form-control select2">
                                        <option>Pending</option>
                                        <option>Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group cl-box">
                            <label class="col-sm-1 control-label">Priority: </label>
                            <div class="col-sm-11 w-10">
                                <div class="ch-select2">
                                    <select class="form-control select2">
                                        <option>Low</option>
                                        <option>nomal</option>
                                        <option>high</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group cl-box">
                          <label for="" class="col-sm-1 control-label">Attach File</label>
                          <input type="file" id="" class="col-sm-11">
                        </div>
                        <div class="box-footer">
                            <button type="submit" class="btn btn-primary pull-right">Save</button>
                            <button type="reset" class="btn btn-primary pull-right">Cancel</button>
                        </div>
                    </div>
              </div>
            </div>
        </div>
    </div>
    <div class="db-tm-item deal-tm-new-call">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Add New Event</h3>
                    </div>
                    <div class="box-body">
                        <div class="form-group cl-box">
                            <label class="col-sm-2 control-label">Deal: </label>
                            <div class="col-sm-10">Nguyen N N</div>
                        </div>
                        <div class="form-group cl-box">
                            <label for="" class="col-sm-2 control-label">Event Type: </label>
                            <div class="col-sm-10">
                                <select class="form-control select2">
                                    <option>Deposit</option>
                                    <option>option 2</option>
                                    <option>option 3</option>
                                    <option>option 4</option>
                                    <option>option 5</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group cl-box">
                            <label for="" class="col-sm-2 control-label"></label>
                            <div class="col-sm-10">
                                <textarea class="form-control" rows="3" placeholder="Type in the event description"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2">Event Date:</label>
                            <div class="col-sm-5">
                                <div class="input-group">
                                    <input type="text" class="form-control date-when">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-5">
                                <div class="bootstrap-timepicker">
                                    <div class="form-group">
                                      <div class="input-group">
                                        <input type="text" class="form-control timepicker">
                                        <div class="input-group-addon">
                                          <i class="fa fa-clock-o"></i>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2"></label>
                            <div class="checkbox col-sm-2 w-15">
                                <label>
                                  <input type="checkbox">
                                  Set reminder
                                </label>
                            </div>
                            <div class="col-sm-2 w-10">
                              <input type="text" class="form-control" id="" placeholder="15">
                            </div>
                            <div class="col-sm-1 w-10">
                                <div class="ch-select2">
                                    <select class="form-control select2">
                                        <option>min</option>
                                        <option>hr</option>
                                        <option>days</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group cl-box">
                          <label for="" class="col-sm-2 control-label">Attach File</label>
                          <input type="file" id="" class="col-sm-10">
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">Deal Stage: </label>
                            <div class="col-sm-3">
                                <select class="form-control select2">
                                    <option>Viewed-Not</option>
                                    <option>option 2</option>
                                    <option>option 3</option>
                                    <option>option 4</option>
                                    <option>option 5</option>
                                </select>
                            </div>
                        </div>
                        
                    </div>
              </div>
            </div>
        </div>
    </div>

    <div class="db-tm-item deal-tm-news">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Bảng Tin</h3>
                    </div>
                    <div class="box-body">
                        <table id="table-deal-news" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>note</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td><a href="#">Lead vừa được tạo</a></td>
                                    <td>Lead ID</td>
                                    <td>Comment/Activity</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td><a href="#">Lead vừa được tạo</a></td>
                                    <td>Lead ID</td>
                                    <td>Comment/Activity</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td><a href="#">Lead vừa được tạo</a></td>
                                    <td>Lead ID</td>
                                    <td>Comment/Activity</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td><a href="#">Lead vừa được tạo</a></td>
                                    <td>Lead ID</td>
                                    <td>Comment/Activity</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>note</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
              </div>
            </div>
        </div>
    </div>

    <div class="db-tm-item deal-tm-meeting">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Meeting Ngày Hôm Nay</h3>
                    </div>
                    <div class="box-body">
                        <table id="table-deal-meeting" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>Client ID</th>
                                    <th>Budget</th>
                                    <th>Meeting location</th>
                                    <th>Sale's location</th>
                                    <th></th>
                                    <th>Call KH</th>
                                    <th>Call Owner</th>
                                    <th>Call Sales</th>
                                    <th>Reassign</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2324</td>
                                    <td>$3494</td>
                                    <td>HCM</td>
                                    <td>HN</td>
                                    <td class="text-center"><span class="icon-st-item"><i class="fa fa-exclamation-circle"></i></span></td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                    <td><a href="#">Reassign</a></td>
                                    <td>Late</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>2324</td>
                                    <td>$3494</td>
                                    <td>HCM</td>
                                    <td>HN</td>
                                    <td class="text-center"><span class="icon-st-item"><i class="fa fa-smile-o"></i></span></td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                    <td><a href="#">Reassign</a></td>
                                    <td>Late</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>Client ID</th>
                                    <th>Budget</th>
                                    <th>Meeting location</th>
                                    <th>Sale's location</th>
                                    <th></th>
                                    <th>Call KH</th>
                                    <th>Call Owner</th>
                                    <th>Call Sales</th>
                                    <th>Reassign</th>
                                    <th>Status</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="db-tm-item deal-tm-tab-queue">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Call In Queue</h3>
                    </div>
                    <div class="box-body">
                        <div class="nav-tabs-queue">
                            <ul class="nav nav-tabs">
                              <li class="active"><a href="#tab_queue_1" data-toggle="tab">General</a></li>
                              <li><a href="#tab_queue_2" data-toggle="tab">Call Owner</a></li>
                              <li><a href="#tab_queue_3" data-toggle="tab">Call Prospect</a></li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active" id="tab_queue_1">
                                    <table class="table table-bordered table-striped table-deal-queue">
                                        <thead>
                                            <tr>
                                                <th style="width: 10px">#</th>
                                                <th style="width: 10%">Client ID</th>
                                                <th>Nội dung cuộc gọi</th>
                                                <th>Comment</th>
                                                <th></th>
                                                <th style="width: 15%">Set call reminder</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>2324</td>
                                                <td>
                                                    A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in 
                                                </td>
                                                <td>
                                                   nd feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in 
                                                </td>
                                                <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                                <td><a href="#">Set reminder</a></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>2324</td>
                                                <td>
                                                    A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in 
                                                </td>
                                                <td>
                                                   nd feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in 
                                                </td>
                                                <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                                <td><a href="#">Set reminder</a></td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th style="width: 10px">#</th>
                                                <th style="width: 10%">Client ID</th>
                                                <th>Nội dung cuộc gọi</th>
                                                <th>Comment</th>
                                                <th></th>
                                                <th style="width: 15%">Set call reminder</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div class="tab-pane" id="tab_queue_2">
                                    <table class="table table-bordered table-striped table-deal-queue">
                                        <thead>
                                            <tr>
                                                <th style="width: 10px">#</th>
                                                <th style="width: 10%">Client ID</th>
                                                <th>Nội dung cuộc gọi</th>
                                                <th>Comment</th>
                                                <th></th>
                                                <th style="width: 15%">Set call reminder</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>2324</td>
                                                <td>
                                                    A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in 
                                                </td>
                                                <td>
                                                   nd feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in 
                                                </td>
                                                <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                                <td><a href="#">Set reminder</a></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>2324</td>
                                                <td>
                                                    A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in 
                                                </td>
                                                <td>
                                                   nd feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in 
                                                </td>
                                                <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                                <td><a href="#">Set reminder</a></td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th style="width: 10px">#</th>
                                                <th style="width: 10%">Client ID</th>
                                                <th>Nội dung cuộc gọi</th>
                                                <th>Comment</th>
                                                <th></th>
                                                <th style="width: 15%">Set call reminder</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="db-tm-item deal-tm-deposit">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Deposit Ngày Hôm Nay</h3>
                    </div>
                    <div class="box-body">
                        <table id="table-deal-deposit" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>Client ID</th>
                                    <th>Comission</th>
                                    <th>Meeting location</th>
                                    <th>Sale's location</th>
                                    <th></th>
                                    <th>Call KH</th>
                                    <th>Call Owner</th>
                                    <th>Call Sales</th>
                                    <th>Reassign</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2324</td>
                                    <td>$3494</td>
                                    <td>HCM</td>
                                    <td>HN</td>
                                    <td class="text-center"><span class="icon-st-item"><i class="fa fa-exclamation-circle"></i></span></td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                    <td><a href="#">Reassign</a></td>
                                    <td>Late</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>2324</td>
                                    <td>$3494</td>
                                    <td>HCM</td>
                                    <td>HN</td>
                                    <td class="text-center"><span class="icon-st-item"><i class="fa fa-smile-o"></i></span></td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                    <td><a href="#">Reassign</a></td>
                                    <td>Late</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>Client ID</th>
                                    <th>Comission</th>
                                    <th>Meeting location</th>
                                    <th>Sale's location</th>
                                    <th></th>
                                    <th>Call KH</th>
                                    <th>Call Owner</th>
                                    <th>Call Sales</th>
                                    <th>Reassign</th>
                                    <th>Status</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="db-tm-item deal-tm-match">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">New Matched Orders</h3>
                    </div>
                    <div class="box-body">
                        <table id="table-deal-match" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>Client ID</th>
                                    <th>Order ID</th>
                                    <th>Số matched listings</th>
                                    <th>Email to KH</th>
                                    <th>Call KH</th>
                                    <th>Call Owner</th>
                                    <th>Matched on</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2324</td>
                                    <td>3434</td>
                                    <td>22</td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-envelope"></i></span></a></td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                    <td>4pm 10/04/2015</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>2324</td>
                                    <td>3434</td>
                                    <td>22</td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-envelope"></i></span></a></td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                    <td class="text-center"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></td>
                                    <td>4pm 10/04/2016</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>Client ID</th>
                                    <th>Order ID</th>
                                    <th>Số matched listings</th>
                                    <th>Email to KH</th>
                                    <th>Call KH</th>
                                    <th>Call Owner</th>
                                    <th>Matched on</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="db-tm-item deal-tm-role">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Role</h3>
                    </div>
                    <div class="box-body">
                        <table id="table-deal-role" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th style="width: 20%">Group/User</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Group: Administrators</td>
                                    <td>
                                        <div class="form-group w-20">
                                            <select class="form-control select2">
                                                <option>Administrators</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Group: Sales </td>
                                    <td>
                                        <div class="form-group w-20">
                                            <select class="form-control select2">
                                                <option>Administrators</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>User: Son Trinh </td>
                                    <td>
                                        <div class="form-group w-20">
                                            <select class="form-control select2">
                                                <option>Administrators</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th style="width: 20%">Group/User</th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                        <div class="box-footer">
                            <button type="reset" class="btn btn-primary pull-right">Save</button>
                            <button type="submit" class="btn btn-primary pull-right">Add access permission</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="db-tm-item deal-tm-role-02">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Role</h3>
                    </div>
                    <div class="box-body">
                        <table id="table-deal-role-02" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <a href="#">Sales <span class="icon-st-item-ch"><i class="fa fa-wrench"></i></span></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>
                                        <a href="#">Sales Supervisors <span class="icon-st-item-ch"><i class="fa fa-wrench"></i></span></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>
                                        <a href="#">Customer Support <span class="icon-st-item-ch"><i class="fa fa-wrench"></i></span></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>
                                        <a href="#">Customer Support Supervisors <span class="icon-st-item-ch"><i class="fa fa-wrench"></i></span></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="box-footer">
                            <button type="submit" class="btn btn-primary pull-right">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="db-tm-item deal-tm-manager-role">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Manager Role</h3>
                    </div>
                    <div class="box-body">
                        <div class="form-group">
                            <label for="" class="col-sm-1 control-label">Role</label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="" placeholder="abc">
                            </div>
                        </div>
                        <table id="table-deal-manager-role" class="table-bordered none-border-bt">
                            <thead>
                                <tr>
                                    <th>Entity</th>
                                    <th>Read</th>
                                    <th>Add</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                    <th>Export</th>
                                    <th>Import</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Contact</td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Company</td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="group-table">
                                    <td colspan="7" class="none-border">
                                        <table class="table-bordered"  width="100%">
                                            <thead>
                                                <tr>
                                                    <th><span class="item-show">Deal</span></th>
                                                    <th>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="child-table">
                                                <tr>
                                                    <td>Viewing</td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Negotiation/Review</td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Desposit (before Contracts)</td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Contracts Out</td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Viewed-Not Satisfied</td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Deposit</td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Called but did not pick up</td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Contracts Signed - Closed</td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Closed Lost</td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>On Hold</td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td style="display: none;"></td>
                                    <td style="display: none;"></td>
                                    <td style="display: none;"></td>
                                    <td style="display: none;"></td>
                                    <td style="display: none;"></td>
                                    <td style="display: none;"></td>
                                </tr>
                                <tr class="group-table">
                                    <td colspan="7" class="none-border">
                                        <table class="table-bordered" width="100%">
                                            <thead>
                                                <tr>
                                                    <th><span class="item-show">Lead</span></th>
                                                    <th>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="child-table">
                                                <tr>
                                                    <td>New Request</td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Assigned to Client Services</td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>...</td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-group ch-select2 w-100">
                                                            <select class="form-control select2">
                                                                <option>All</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td style="display: none;"></td>
                                    <td style="display: none;"></td>
                                    <td style="display: none;"></td>
                                    <td style="display: none;"></td>
                                    <td style="display: none;"></td>
                                    <td style="display: none;"></td>
                                </tr>
                                <tr>
                                    <td>Quote</td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Invoice</td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group ch-select2 w-100">
                                            <select class="form-control select2">
                                                <option>All</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="checkbox col-sm-3 w-100">
                            <label>
                              <input type="checkbox">
                              User can edit settings
                            </label>
                        </div>
                        <div class="box-footer">
                            <button type="submit" class="btn btn-primary pull-left">Apply</button>
                            <button type="submit" class="btn btn-primary pull-left">Save</button>
                            <button type="submit" class="btn btn-primary pull-right">Delete role</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('page-js')
    <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
    <script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
    <script>
        $(function () {
            $(".select2").select2();

            $(".timepicker").timepicker({
              showInputs: false
            });
            $('#table-deal-deposit, #table-deal-match, .table-deal-queue, #table-deal-meeting, #table-deal-news, #table-deal-listing').DataTable({
                "paging": true,
                "lengthChange": true,
                "searching": true,
                "ordering": true,
                "info": true,
                "autoWidth": true
            });
            $('#table-deal-role, #table-deal-role-02').DataTable({
                "paging": false,
                "lengthChange": false,
                "searching": false,
                "ordering": false,
                "info": false,
                "autoWidth": false
            });
            $('#table-deal-manager-role').DataTable({
                "paging": false,
                "lengthChange": false,
                "searching": false,
                "ordering": false,
                "info": false,
                "autoWidth": false
            });
            $('.item-show').on('click', function(e){
                $(this).toggleClass("active-show");
                $(this).parents('thead').next($('.child-table')).slideToggle();
            });
            $('.date-when').datepicker({
                format: 'dd/mm/yyyy'
            });
            /*$("#table-listing").DataTable({
                "scrollX": true
            });

            var dateCreate = $('#date-create').datepicker({
                format: 'dd-mm-yyyy'
            }).on('changeDate', function(e) {
                $(this).parent().find('input[type="hidden"]').val(e.timeStamp)
                filterListing.deletedDate = e.timeStamp;
              //console.log(e.timeStamp)
            });

            $('#date-live').datepicker({
                format: 'dd-mm-yyyy'
            }).on('changeDate', function(e) {
               $(this).parent().find('input[type="hidden"]').val(e.timeStamp)
               filterListing.deletedDate = e.timeStamp;
              //code
            });

            $('#date-delete').datepicker({
                format: 'dd-mm-yyyy'
            }).on('changeDate', function(e) {
                $(this).parent().find('input[type="hidden"]').val(e.timeStamp)
                filterListing.deletedDate = e.timeStamp;
                //code
            });


            var filterListing = {
              "buildingId":83,
              "propertyTypeId":1,
              "source":"BD",
              "createdDate":347327460000,
              "reviewedDate":347327460000,
              "deletedDate":347327460000
            }*/


            // $("select.form-control, input.filter-date").change(function(){
            //     var type = $(this).attr('id');
            //     switch(type) {
            //         case 'building-name':
            //             filterListing.buildingId = parseInt($(this).val());
            //             console.log(filterListing.buildingId);
            //             break;
            //         case 'property-type':
            //             filterListing.propertyTypeId = parseInt($(this).val());
            //             console.log(filterListing.propertyTypeId);
            //             break;
            //         case 'source':
            //             filterListing.source = parseInt($(this).val());
            //             console.log(filterListing.source);
            //             break;                      
            //         // default:
            //         //     default code block
            //     }
            // });
        });

    </script>
@stop
@section('page-css')
    <link href="{{loadAsset("/css/common.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datatables/jquery.dataTables.min.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.min.css")}}" rel="stylesheet" type="text/css" />
@stop