<table id="table-assign-listings" class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>ID</th>
      <th>Loại hình</th>
      <th>Loại BĐS</th>
      <th>Diện tích</th>
      <th>Địa chỉ</th>
      <th>Quận</th>      
      <th>Đăng</th>
      <th>Review/Live</th>      
      <th><input type="checkbox" class="check-all-listing" value="all" /></th>
    </tr>
  </thead>
  <tbody>
    <?php foreach ($items as $item): ?>
      <tr>
        <td>{{$item->rlistingId}}</td>
        <td>{{$item->propertyTypeName}}</td>
        <td>{{$item->listingTypeName}}</td>
        <td>{{$item->floorSize}} m2</td>
        <td>{{$item->address}}</td>
        <td>{{$item->districtName}}</td>
        <td>{{ $item->ownerName }}
          @if($item->reviewedDate != null)    
          <br>{{ date('d-m-Y H:i:s', $item->createdDate/1000) }}
          @endif
        </td>
        <td>{{ $item->reviewerName }} 
          @if($item->reviewedDate != null)    
          <br>{{ date('d-m-Y H:i:s', $item->reviewedDate/1000) }}
          @endif
        </td>
        <td><input type="checkbox" class="select-listing" value="{{$item->rlistingId}}" /></td>
      </tr>
    <?php endforeach; ?>
  </tbody>
</table>
<script type="text/javascript">
  var selectedListingIds = [];
  $('.select-listing').click(function () {
    var selectedId = $(this).val();
    if ($(this).prop("checked")) {
      if (selectedListingIds.indexOf(selectedId) < 0) {
        selectedListingIds.push(selectedId);
      }
    } else {
      index = selectedListingIds.indexOf(selectedId);
      if (index >= 0) {
        selectedListingIds.splice(index, 1);
      }
    }
    console.log(selectedListingIds);
  });
  fixDataTableVNSearch("#table-assign-listings");
  var table = $("#table-assign-listings").DataTable();
  $('.check-all-listing').click(function () {
    $(':checkbox', table.rows().nodes()).prop('checked', this.checked);
  });
</script>   