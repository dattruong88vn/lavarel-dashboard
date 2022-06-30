
<?php
foreach ($oldListings as $listing):
    /*
      if ($listing->isDismiss) {
      continue;
      }
     * */
    ?>
    <tr class="{{$listing['isFeedback']?"fedback":""}} {{$listing['isDismiss']?"dismiss":""}}" data-rlisting-id="{{$listing['rlistingId']}}">
        <td width="80px">
            <a href="/listing/{{$listing['rlistingId']}}" target="_blank">{{$listing['rlistingId']}}</a>
            <?php if (!$listing['isDismiss'] && !$listing['isFeedback']): ?>
                <a href="#" class="btn-remove-listing text-red" data-rlisting-id="{{$listing['rlistingId']}}"><i class="glyphicon glyphicon-minus-sign"></i></a>
            <?php endif; ?>
            <input class="is-dismiss is-dismiss-{{$listing['rlistingId']}}" type="hidden" value="{{$listing['isDismiss']?1:0}}" />
        </td>
        <td>{{$listing['address']}}</td>
        <td>{{$listing['phoneOwner']}}</td>
        <td>        
            <div class="form-group">
                <div class="input-group bootstrap-timepicker timepicker">
                    <input type='text' class="form-control listing-schedule-time" value="{{date('H:i',$listing['scheduleTime']/1000)}}" />
                    <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
            </div>
        </td>
        <!--<td>Thứ tự đi xem</td>-->
        <td>
            <input type="text" class="listing-note listing-note-{{$listing['rlistingId']}} form-control" value="{{$listing['note']}}"  />
        </td>
        <td>{{$listing['isFeedback']?"Có":"Không"}}</td>
        <?php if ($showListingsStatus): ?>
            <td>
                <?php if (!$listing['isDismiss']): ?>
                    <span>Bình thường</span>
                <?php else: ?>
                    <span>Listing này bị bỏ qua {{!empty($listing['reasonName'])?" Lý do: ".$listing['reasonName']:""}}</span>
                <?php endif; ?>
            </td>
        <?php endif; ?>
        <td>{{!empty($listing['percentValue'])?number_format($listing['percentValue'], 2)."%":"N/A"}}</td>
    </tr>    
    <?php
endforeach;
?>