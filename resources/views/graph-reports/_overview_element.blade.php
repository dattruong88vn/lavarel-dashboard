<?php foreach ($data as $key => $target) { ?>
    <div class="col-sm-6 border-right border-bottom">
        <h3 class="text-center">
        	<?php if(strtolower($target->targetTypeName) == "traffic") { ?>
        		<a><?=strtoupper($target->targetTypeName)?> (<span id="<?=$target->targetTypeName?>_value"><?=$target->currentValue?></span>)</a>
        	<?php } else { ?>
        		<a href="/report/management-report-<?=strtolower($target->targetTypeName)?>/<?=$postData['fromDate']?>/<?=$postData['toDate']?>" ><?=strtoupper($target->targetTypeName)?> (<span id="<?=$target->targetTypeName?>_value"><?=$target->currentValue?></span>)</a>
        	<?php } ?>
            
        </h3>
        <p>Target: <span id="<?=$target->targetTypeName?>_target"> <?=$target->targetValue?></span></p>
        <p>Run-rate: <span id="<?=$target->targetTypeName?>_runrate"> <?=$target->runrateValue ? round($target->runrateValue, 2) : "--"?></span></p>
    </div>
<?php } ?>