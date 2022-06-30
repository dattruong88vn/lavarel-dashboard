<select class="form-control">
	<?php for ($i = 0; $i <= 12; $i++) { 
        $k = $i - 1;
        $fromdate = strtotime( date( 'Y-m-01' )." -$i months");
        $todate = strtotime( date( 'Y-m-01' )." -$k months");
    ?>
    <option fromdate="<?=date("U", $fromdate);?>000" todate="<?=date("U", $todate);?>000" >
        Tháng <?=date("m/Y", $fromdate);?>
    </option>
    <?php } ?>
</select>