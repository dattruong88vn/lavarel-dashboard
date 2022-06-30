<div class="same-tours__header label-bold">
    <span>Danh sách tour trùng</span>
    <button type="button" class="close" data-dismiss="modal" onClick="$('#sameToursDetailModal').modal('hide')">×
</div>
</button>
<hr />
<div class="same-tours__body">
    <p>{{$detail->info->assignName}} đã có tour vào khung giờ <b>{{$detail->info->estimatedStartTime}}-{{$detail->info->estimatedFinishTime}}</b> ngày <b>{{$detail->info->estimatedDate}}</b>. Chi tiết như sau:</p>
    <?php
        if (isset($detail->listing)):
            foreach ($detail->listing as $item):
    ?>
        <div class="same-tours__item">
            <div class="label-bold">{{\Carbon\Carbon::createFromTimestamp($item->scheduleTime/1000)->format('H:i')}}-{{\Carbon\Carbon::createFromTimestamp($item->estimatedDate/1000)->format('H:i')}}</div>
            <div>Deal: <a href="/deal/detail/{{$item->dealId}}" target="_blank" class="same-tours__deal-id">{{$item->dealId}}</a></div>
            <div>Tên khách hàng: {{$item->customerName}}</div>
        </div>
        <?php
            endforeach;
        endif;
    ?>
    <p>Vui lòng chọn lại thời gian hoặc thay đổi nhân viên đi Tour.</p>   
</div>
