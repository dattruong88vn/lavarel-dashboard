@extends('layout.default')

@section('content')
    <div class='dashboard'>
      <section>
        <h1>
          Quản Lý Brokerage firm
        </h1>
      </section>
      
      <section>
        <div class="row">
          <div class="col-md-12">
            <div class="box">
              <div class="box-header with-border">
                <h3 class="box-title">#</h3>
              </div>
              <div class="box-body">
                <table class="table table-bordered" id="table">
                  <thead>
                    <th style="width: 50px">#</th>
                    <th>Tên</th>
                    <th>Ngày tạo</th>
                  </thead>
                  <tbody>
                  @foreach($results->data as $key =>$result)
                  <tr>
                    <td>{{ $key+1 }}</td>
                    <td><a href="brokerage-firm-manager/edit/{{ $result-> bfId }}">{{ $result-> name }}</a></td>
                    <td>{{ date('d-m-Y', $result->createdDate/1000) }}</td>
                  </tr>
                  @endforeach
                  </tbody>
                </table>
              </div>
              <!-- <div class="box-footer clearfix">
                <ul class="pagination pagination-sm no-margin pull-right">
                  <li><a href="#">&laquo;</a></li>
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">&raquo;</a></li>
                </ul>
              </div> -->
            </div>
          </div>
        </div>
      </section>

    </div>


@endsection


@section('page-js')
  
  <script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
  <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
  <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
   <script src="{{loadAsset("/js/template7.min.js")}}"></script>
  <script src="{{loadAsset("/js/function.js")}}"></script>
    <script src="{{loadAsset("/js/helper.js")}}"></script>
  <script>

  $(document).ready(function(){
    fixDataTableVNSearch("#table");
    $('#table').dataTable();
    // $('.block').click(function(){
    //   agentId = $(this).attr('agentId');
    //   console.log(agentId);
    //   url = "/agent/lock/"+agentId;

    //   get_sync(url, true, function(data){
    //      if(data.result){
    //       alert('Lock thành công');
    //       location.reload();
    //      }
    //    });
    // });

    // $('.unBlock').click(function(){
    //   agentId = $(this).attr('agentId');
    //   console.log(agentId);
    //   url = "/agent/unlock/"+agentId;

    //   get_sync(url, true, function(data){
    //      if(data.result){
    //       alert('Unlock thành công');
    //       location.reload();
    //      }
    //    });
    // });
    // function block(z) {
    //   console.log(z);
    //   alert(z);
    // }
})
</script>
@stop
@section('page-css')
  <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
@stop