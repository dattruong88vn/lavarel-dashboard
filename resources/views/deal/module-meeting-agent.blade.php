<?php
    $defineStatus = [
        1 => "Hẹn môi giới đến thanh toán",
        2 => "Đã gửi yêu cầu thanh toán cho môi giới",
        3 => "Hoàn tất thanh toán"
    ];
?>
<hr>
<strong>Do môi giới nào giới thiệu:</strong>
<span class="text-muted">
    {{!empty($leadDealDetail->agentName)?$leadDealDetail->agentName:'N/A'}}
</span>
@if(!empty($leadDealDetail->agentCommisstionPrice))
<hr>
<strong>Hoa hồng (môi giới):</strong>
<span class="text-muted">
    {{ number_format($leadDealDetail->agentCommisstionPrice) }}
</span>
@endif
@if(!empty($leadDealDetail->trackingScheduleTime))
    <table style="margin-top: 5px;background: aliceblue;" class="table">
        <tr>
            <th>LID</th>
            <th>Nguồn</th>
            <th>Trạng thái môi giới</th>
            <th>Ngày đi xem</th>
            <th>Ngày tạo</th>
            <th>Ghi chú của khách hàng</th>
            <th>Thông tin khác</th>
        </tr>
        @foreach($leadDealDetail->trackingScheduleTime as $item)
        <?php
            $listingHtmlCover = [];
            foreach($item->rlistingIds as $listingHtml){
                $listingHtmlCover[] = empty($listingHtml) ? "N/A" : "<a onclick='JMDetail.openModalListingDetailForAllPage($listingHtml);return false;' href='#'>$listingHtml</a>";
            }
        ?>
            <tr>
                <td>{!!implode(', ', $listingHtmlCover)!!}</td>
                <td>{{$item->sourceName}}</td>
                <td>{{!empty($item->profileStatusName) ? $item->profileStatusName : 'N/A'}}</td>
                <td>{{!empty($item->date) ? date('d-m-Y H:i', $item->date/1000) : 'NA'}}</td>
                <td>{{date('d-m-Y H:i', $item->createdDate/1000)}}</td>
                <td>{{!empty($item->customerNote) ? $item->customerNote : 'N/A'}}</td>
                <td>{{!empty($item->featureName) ? $item->featureName : 'N/A'}}</td> 
            </tr>
        @endforeach
    </table>
@endif

@if(!empty($leadDealDetail->statusAgentCommission))
    <hr> <a style="color: #fb7533; font-weight: 600;text-decoration: underline;"
    @if($leadDealDetail->statusAgentCommission == 1)
        data-toggle="modal" data-target="#modal-meeting-agent" href="#"
    @endif
    >{{ $defineStatus[$leadDealDetail->statusAgentCommission] }}</a>
    @include('shared.modal-meeting-agent')
@endif
