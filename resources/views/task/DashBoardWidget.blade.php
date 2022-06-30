<div class="row">
  <div class="col-lg-6 connetedSortable">
    <!-- TO DO List -->
    <div class="box box-primary">
      <div class="box-header">
        <i class="ion ion-clipboard"></i>
        <h3 class="box-title">Việc cần làm</h3>
        <div class="box-tools pull-right">
          <ul class="pagination pagination-sm inline">
            <li><a href="/task/">Xem tất cả</a></li>
          </ul>
        </div>
      </div><!-- /.box-header -->
      <div class="box-body">
        <ul class="todo-list">
        </ul>
      </div><!-- /.box-body -->
      <div class="box-footer clearfix no-border">
        <a href="/task/get-form?type=create" class="btn btn-default pull-right"><i class="fa fa-plus"></i> Thêm</a>
      </div>
    </div><!-- /.box -->
  </div>
  <div class="col-md-6">
    @include('task.DashBoardCalendarWidget')
  </div>
</div>
<script>
  function getItem(page, startDate, endDate) {
    var url = "/task/get-ajax?";
    if (startDate == undefined && endDate == undefined) {
      url += "current=1";
    } else {
      if (startDate == undefined) {
        startDate = endDate;
      } else {
        endDate = startDate;
      }
      url += "start_date=" + startDate;
    }
    $.ajax({
      url: url,
      type: "get"
    }).success(function (response) {
      $(".todo-list").html("");
      for (i = 0; i < response.items.length; i++) {
        var item = response.items[i];
        row = "<li>"
                + " <span class='text'>" + item.name + "</span>"
                + " <small class='label label-danger'><i class='fa fa-clock-o'></i> " + item.estimated_time + " hours</small>"
                + " <div class='tools'>"
                + "  <a href='/task/get-form/" + item.id + "'><i class='fa fa-edit'></i></a>"
                + "  <a href='/task/delete/" + item.id + "' class='btnDeleteTask' ><i class='fa fa-trash-o'></i></a>"
                + " </div>"
                + "</li>";
        $(".todo-list").append(row);
      }

      $(".btnDeleteTask").on("click", function (event) {
        event.preventDefault();
        if (!confirm("Bạn có chắc là xóa việc này")) {
          return false;
        }
        var url = $(this).attr("href");
        var current = $(this);
        $.ajax({
          url: url,
          type: "GET",
        }).success(function (response) {
          if (response.status == "success") {
            current.parent().parent().remove();
            getItem();
          }
        }).always(function () {

        });
      });
    });
  }
  $(document).ready(function () {
    getItem();

  });
</script>