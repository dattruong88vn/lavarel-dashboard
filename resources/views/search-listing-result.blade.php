@extends('layout.empty')

@section('content')

<div class="row">
  <div class="col-md-12">
    <div class="box">
      <div class="box-header with-border">
        <h3 class="box-title">Kết Quả Tìm Kiếm</h3>
      </div>
      <div class="box-body">
        <table id="table-search-listing" class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Address</th>
              <th>Type</th>
              <th>Chung cư/dự án</th>
              <th>Giá</th>
              <th width="10%">#</th>
            </tr>
          </thead>
          <tbody>

            <?php foreach ($listingList as $item): ?>
              <tr>
                <td>
                  <?php
                  $url = PRODUCT_URL . 'chi-tiet/' . str2url($item->title) . '/' . str2url($item->districtName) . '/' . $item->rlistingId;
                  ?>
                  <a href="{{$url}}" target="_blank">{{ $item->title }}</a>
                </td>
                <td>{{ $item->address }}</td>
                <td>{{ $item->typeName }}</td>
                <td>{{ $item->propertyName }}</td>
                <td class="text-right">{{$item->formatPrice}}</td>
                <td><div class="checkbox"><label><input type="checkbox" class="chkListingIds" name="rListingIds[]" value="{{  $item->rlistingId }}"></label></div></td>
              </tr>
            <?php endforeach; ?>

          </tbody>
          <tfoot>
            <tr>
              <th>Title</th>
              <th>Address</th>
              <th>Type</th>
              <th>Chung cư/dự án</th>
              <th style="min-width:120px;">Giá</th>
              <th width="10%">#</th>
            </tr>
          </tfoot>
        </table>
      </div><!-- /.box-body -->

    </div><!-- /.box -->
  </div>
</div>

<script src="{{loadAsset("/js/helper.js")}}"></script>
<script language="JavaScript">

$(function () {
  fixDataTableVNSearch("#table-search-listing");
  $("#table-search-listing").DataTable();
});

//    function doSubmit(frm)
//    {
//        console.log($("input[name='rListingIds[]']:checked").length);
//        if ($("input[name='rListingIds[]']:checked").length <= 0)
//        {
//            showPageAlert('Error', 'Bạn phải chọn danh sách listing!');
//            return;
//        }
//        console.log($("input[name='agentId']:checked").length);
//        console.log(frm.serialize());
//        frm.submit();
//    }

</script>

@endsection