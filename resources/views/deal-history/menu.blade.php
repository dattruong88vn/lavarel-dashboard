<div class="col-md-12">
    <div class="box">
      <div class="box-header" style="padding-left: 20px;">
        <h4><i class="fa fa-th"></i> Lịch sử:</li></h4>
      </div>
      <div class="box-body">
        <a class="btn btn-app 
          @if(Request::segment(2) == 'requests')
            active
          @endif
        " href="/deal-history/requests/{{Request::segment(3)}}/{{Request::segment(4)}}">
          <i class="fa fa-inbox"></i> Nhu Cầu
        </a>
        <a class="btn btn-app 
          @if(Request::segment(2) == 'tour')
            active
          @endif" href="/deal-history/tour/{{Request::segment(3)}}/{{Request::segment(4)}}">
          <i class="fa fa-map-marker"></i> Tour
        </a>
        <a class="btn btn-app 
          @if(Request::segment(2) == 'call')
            active
          @endif" href="/deal-history/call/{{Request::segment(3)}}/{{Request::segment(4)}}">
          <i class="fa fa-phone"></i> Call
        </a>
        <a class="btn btn-app 
          @if(Request::segment(2) == 'email')
            active
          @endif" href="/deal-history/email/{{Request::segment(3)}}/{{Request::segment(4)}}">
          <i class="fa fa-envelope-o"></i> Email
        </a>
        <a class="btn btn-app 
          @if(Request::segment(2) == 'detail')
            active
          @endif" href="/deal-history/detail/{{Request::segment(3)}}/{{Request::segment(4)}}">
          <i class="fa fa-info"></i> Chi Tiết
        </a>
        <!-- <a class="btn btn-app">
          <span class="badge bg-yellow">3</span>
          <i class="fa fa-bullhorn"></i> Notifications
        </a>
        <a class="btn btn-app">
          <span class="badge bg-green">300</span>
          <i class="fa fa-barcode"></i> Products
        </a>
        <a class="btn btn-app">
          <span class="badge bg-purple">891</span>
          <i class="fa fa-users"></i> Users
        </a>
        <a class="btn btn-app">
          <span class="badge bg-teal">67</span>
          <i class="fa fa-inbox"></i> Orders
        </a>
        <a class="btn btn-app">
          <span class="badge bg-aqua">12</span>
          <i class="fa fa-envelope"></i> Inbox
        </a>
        <a class="btn btn-app">
          <span class="badge bg-red">531</span>
          <i class="fa fa-heart-o"></i> Likes
        </a> -->
      </div><!-- /.box-body -->
    </div><!-- /.box -->
  </div>