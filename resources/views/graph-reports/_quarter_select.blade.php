<select class="form-control">
    <?php
    $curYear = date("Y"); // 2016
    $curMonth = intval(date("m")); // 12
    $curQuarterStart = 0;
    $curMonthStart = 0;
    $arrQuarter = array(1,4,7,10);
    // Lấy ra quý hiện tại
    foreach ($arrQuarter as $quarter => $monthStart) {
        if($curMonth >= $monthStart) {
            $curQuarterStart = $quarter + 2;
        }
    } 
    for ($i = 0; $i <= 3; $i++) { 
        // Hiển thị quý
        $curQuarterStart--;

        if($curQuarterStart === 0) {
            $curQuarterStart = 4; 
            $curYear --;
        }
        
        // Lấy timestamp của quý tương ứng
        $curMonthStart = $arrQuarter[$curQuarterStart - 1];

        $fromdate = strtotime("$curYear-".$curMonthStart."-01");
        

        if($curMonthStart + 3 > 12) {
            $curYear++;
        }
        $curMonthEnd = ($curMonthStart + 3) % 12;
        $todate = strtotime("$curYear-".$curMonthEnd."-01");
        if($curMonthStart + 3 > 12) {
            $curYear--;
        }
    ?>
    <option fromdate="<?=date("U", $fromdate);?>000" todate="<?=date("U", $todate);?>000">Quý <?=($curQuarterStart)?>/<?=$curYear?></option>
    <?php } ?>
</select>