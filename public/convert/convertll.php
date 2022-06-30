<form action="./convertll.php" method="POST">
<table>
<tbody>
<tr>
<td>Nhập Lat</td>
<td>Nhập Lng</td>
<td>Hành động</td>
</tr>
<tr>
<td><input type="text" name="xvalue" /></td>
<td><input type="text" name="yvalue" /></td>
<td><button type="submit">Xác nhận</button></td>
</tr>
</tbody>
</table>
</form>
<?php

if(isset($_POST) && count($_POST)) {
	$x = $_POST['xvalue'];
	$y = $_POST['yvalue'];
	
	$r = exec('echo "'.$y.' '.$x.'" | /usr/bin/cs2cs +proj=longlat +datum=WGS84 +no_defs +to +proj=longlat +ellps=WGS84 +towgs84=-191.90441429,-39.30318279,-111.45032835,0.00928836,-0.01975479,0.00427372,0.252906278 +no_defs -f %.10f', $resultInput);
	$resultInput= explode(" ",$r);
	$resultInput= explode("	",$resultInput[0]);
	
	echo "<br/>";

	$r = exec('echo "'.$resultInput[0].' '.$resultInput[1].'" | /usr/bin/cs2cs +proj=longlat +datum=WGS84 +no_defs +to +proj=tmerc +lat_0=0 +lon_0=105.75 +k=0.9999 +x_0=500000 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs -f %.10f', $resultInput);
	$resultInput= explode(" ",$r);
	$resultInput= explode("	",$resultInput[0]);
	
	
	echo "Kết quả sau khi tính toán theo hệ tọa độ lat long:  ".$resultInput[1].",".$resultInput[0]."<br/>";
	//echo "Xem trên bản đồ: <a target='_BLANK' href='https://www.google.com/maps?q=".$resultInput[1].",".$resultInput[0]."'>Bản đồ</a>";
}
?>