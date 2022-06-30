<!-- <strong>Kênh thông tin:</strong>
<span class="">
    {{ !empty($leadDealDetail->channelTypeName) ? $leadDealDetail->channelTypeName : 'N/A' }} {{ !empty($leadDealDetail->channelSubTypeName) ? ' - ('.$leadDealDetail->channelSubTypeName.')' : '' }} {{ !empty($leadDealDetail->tCName) ? ' - ('.$leadDealDetail->tCName.')' : '' }}
</span>
<hr> -->

@if(!empty($leadDealDetail->channelTypeName))
	<strong>{{$leadDealDetail->channelTypeName}}:</strong>
	<span>
		{{ !empty($leadDealDetail->channelSubTypeName) ? $leadDealDetail->channelSubTypeName : '' }}
		{{ !empty($leadDealDetail->tCName) ? $leadDealDetail->tCName : '' }}
	</span>
	<hr>
@endif

