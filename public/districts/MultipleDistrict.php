<?php
header('Content-type: application/vnd.google-earth.kml');
header('Content-Disposition:attachment; filename="districts.kml"');//'. time() .'
$districts = explode(",",$_GET["districts"]);
?>
<?php echo "<?xml version='1.0' encoding='UTF-8'?>\n"; ?>
<kml xmlns='http://www.opengis.net/kml/2.2'>
  <Document>
    <name><?=$districts?></name>
    <description><![CDATA[]]></description>
    <Folder>
      <name><?=$districts?></name>
        <?php 
          
          foreach ($districts as $key => $district) {
            include $district.".php";
          }
        ?>
    </Folder>
    <Style id='normal'>
      <PolyStyle>
        <color><?=$_GET['color']?></color>
        <fill>1</fill>
        <outline>1</outline>
      </PolyStyle>
    </Style>  
    <StyleMap id='normal_style'>
      <Pair>
        <key>normal</key>
        <styleUrl>#normal</styleUrl>
      </Pair>
    </StyleMap>
  </Document>
</kml>