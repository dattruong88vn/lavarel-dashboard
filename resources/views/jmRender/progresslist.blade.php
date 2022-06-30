<?php $flag = false; ?>
@foreach($leadDealDetail->progressList as $progress)       
<div class="col-xs-1 bs-wizard-step
     @if($leadDealDetail->progressId == $progress->progressId)
     active
     <?php $flag = true; ?>
     @else
     @if($flag != true)
     complete
     @elseif($flag == true && $leadDealDetail->progressId != $progress->progressId)
     disabled
     @endif
     @endif
     ">
    <div class="text-center bs-wizard-stepnum">{{$progress->progressName}}
    </div>
    <div class="progress"><div style="background-color: #e1e1d0;" class="progress-bar"></div></div>
    <a href="#" class="bs-wizard-dot"
       @if($leadDealDetail->progressId == $progress->progressId)
       style="background-color:#fbe8aa;"
       @endif
       ></a>
       <div style="text-align: center;">
         @if($progress->lable != null)
           <span class="label label-warning">{{ $progress->lable }}</span>
         @endif
       </div>
    @if($progress->progressQuoList != null && count($progress->progressQuoList) > 0)
    <div class="bs-wizard-info text-center">
        @foreach($progress->progressQuoList as $progressQuoName)
        <span class="label label-warning">{{ $progressQuoName->progressQuoName }} &nbsp;&nbsp;</span>
        @endforeach
    </div>
    @endif
</div>
@endforeach