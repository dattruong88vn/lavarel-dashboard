<?php
    $tcs = get_transaction_centers_not_other();
?>
<div class="form-group">
	<label for="" class="col-sm-2 control-label">Kênh thông tin:</label>
	<div class="col-sm-4">
		<select id="channelType" name="channelType" class="form-control">
			<option value="">N/A</option>
			<?php foreach ($chanels as $chanel): ?>
			<option {{isset($lead->channelType) && $chanel->id==$lead->channelType?"selected":""}} {{isset($deal->channelType) && $chanel->id==$deal->channelType?"selected":""}} value="{{$chanel->id}}">{{$chanel->name}}</option>
			<?php endforeach; ?>

		</select>
	</div>
	<div class="col-sm-6">
		<select id="channelSubType" name="channelSubType" class="form-control">
			<option value="">N/A</option>
		</select>
		<select style="display: none;" id="tCId" name="tCId" class="form-control">
			<option value="">N/A</option>
			@foreach ($tcs as $tc)
				<option value="{{$tc->id}}">{{$tc->name}}</option>
			@endforeach
		</select>
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function(){
		RLDFuncs.getChanelChild();
	})
</script>