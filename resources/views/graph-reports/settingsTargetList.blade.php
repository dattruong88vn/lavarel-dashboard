
<form action="" id="reportTargetData" name="reportTargetData">

<?php
    foreach ($items as $item) :
        $idName = 'txt';
        switch ($item->targetTypeId) {
            case 1:
                $idName = 'txtTraffic';
                break;
            case 2:
                $idName = 'txtListing';
                break;
            case 3:
                $idName = 'txtLead';
                break;
            case 4:
                $idName = 'txtDeal';
                break;
        }
?>
<div class="col-sm-12">
    <div class="form-group">
        <label class="control-label col-sm-2"><?= strtoupper($item->targetTypeName); ?></label>
        <div class="col-sm-8">
            <input class="form-control inputText" type="number" id="<?= $idName; ?>TargetValue" name="<?= $idName; ?>[targetValue]" value="<?= $item->targetValue; ?>"/>
            <input class="form-control" type="hidden" id="<?= $idName; ?>TargetId" name="<?= $idName; ?>[targetId]" value="<?= $item->targetId; ?>"/>
            <input class="form-control" type="hidden" id="<?= $idName; ?>TypeId" name="<?= $idName; ?>[targetTypeId]" value="<?= $item->targetTypeId; ?>"/>
        </div>
        <button type="button" class="btn btn-primary btnShowTargetListHistory" targetId="<?= $item->targetId; ?>">
            <i class="fa fa-history"></i>
        </button>
    </div>
</div>
<?php endforeach; ?>

</form>


