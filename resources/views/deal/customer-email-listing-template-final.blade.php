<?php
// hàm này để render thêm các tr td --- Mục đích không làm bẻ giao diện khi có dưới 3 item
function renderTrTd($listings)
{
    $total = count($listings);
    $html = '';
    foreach ($listings as $item) {
        $html .= '<td width="33%" style="width:33.33%;padding: 10px 12px 10px 0;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" align="left" bgcolor="#ffffff" style="margin-bottom:10px">
        <tr>
          <td width="100%" align="left" style="border:1px solid #d8d8d8;padding:3px 3px 10px;">
            <a href="' . $item->link . '">
              <img src="' . $item->photo->link . '" height="135" class="img-listing" width="100%" alt="" style="width:100%; height: 135px;">
            </a>
              
              <p style="font-size:12px;color:#515151;margin:8px 5px 0;">' . str_limit($item->title, $limit = 25, $end = '...') . '</p>
              <p style="font-size:20px;color:#f07323;font-weight:bold;margin:5px 8px 0;">' . $item->formatPrice . '</p>
              <table style="color:#030303;font-size:11px;margin:0 8px;">
              <tr>
                <td style="padding: 8px 10px 8px 0px;display:inline-block;border-right:1px solid #d8d8d8"><img style="" src="https://cdn.propzy.vn/images_email_template/v3/ic-acreage.png" alt="ic-acreage.png">&nbsp; ' . $item->formatSize . '</td>
                <td style="padding: 8px 10px 8px 0px;display:inline-block;border-right:1px solid #d8d8d8;margin-left:7px"><img style="" src="https://cdn.propzy.vn/images_email_template/v3/ic-bedroom.png" alt="ic-bedroom.png">&nbsp; ' . $item->bedRooms . '</td>
                <td style="padding: 8px 10px 8px 0px;display:inline-block;margin-left:7px;"><img style="" src="https://cdn.propzy.vn/images_email_template/v3/ic-bathroom.png" alt="ic-bathroom.png">&nbsp; ' . $item->bathRooms . '</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="left" bgcolor="#ffffff" style="">
          <tr>
            <td width="100%" align="center" height="30" style="background-color:#f07323;padding:5px 0px 5px 0px">
              <a href="' . $item->link . '" style="text-transform:uppercase;font-size:14px;color:#fff;text-decoration:none;background-color:#f07323;width:100%;display:inline-block;">XEM THÊM</a>
            </td>
          </tr>
        </table>
      </td>';
    }
    if ($total < 3) {
        $total = 3 - $total;
        for ($i = 0; $i < $total; $i++) {
            $html .= '<td width="33%" style="width:33.33%;padding: 10px 12px 10px 0;"></td>';
        }
    }
    return $html;
}
?>
<!--
<table>
<tr>
  <td style="padding-left:10px">
    <p style="margin: 0 0 20px;color:#165aa9;font-size:18px;">Chào anh/chị {{$leadDeal->customers->name}},</p>
    <p style="font-size:14px;color:#262025;">Em là {{$currentUser->name}} – Chuyên viên quản lý giao dịch Propzy. Hiện tại, trên Propzy có một số {{$leadDeal->propertyType->typeName}} phù hợp với nhu cầu tìm kiếm của Anh/Chị, vui lòng bấm vào link dưới đây để xem chi tiết:</p>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" align="left" bgcolor="#ffffff" style="padding:0;">
      <tr>
        <td style="padding:0;">
          <table style="padding:10px 12px 10px 0;" width="100%" border="0" cellspacing="0" cellpadding="0" align="left">
            <tr>{!! renderTrTd($listings) !!}</tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>
<tr>
  <td style="font-size:14px;padding-left:10px">
    <p style="margin:0 0 10px;color:#262025;">Cần hỗ trợ thêm, Anh/Chị vui lòng liên hệ:</p>
    
    <p style="margin:18px 0;">Propzy rất vui được tư vấn và hỗ trợ Anh/Chị.<br>Trân trọng.</p>
    @include('templates.emailSignature', ['currentUser' => $currentUser])
  </td>
</tr>
</table>
<table>
<tr>
  <td>&nbsp;&nbsp;&nbsp;</td>
</tr>
</table>
-->
<div>
    <h4>Chào Quý khách!</h4>
    <p>
        Em là {{$baName}} – Chuyên viên tư vấn BĐS Propzy. Hiện tại, trên Propzy có một số {{$leadDeal->propertyType->typeName}} phù hợp với nhu cầu tìm kiếm của Quý khách, vui lòng bấm vào đường dẫn dưới đây để xem chi tiết:
        <br/>
        <?php foreach ($listings as $item) {
            echo '<a href = '.$item->link.'>'.$item->link.'</a><br/>';
        }
        ?>
    </p>
    <p>
        Cần hỗ trợ thêm, Quý khách vui lòng liên hệ: *4663 nhấn {{$voIp}} hoặc {{$baMobile}} gặp {{$baName}}.
    </p>
    <p>
        Mời Quý khách truy cập: <a href="http://propzy.vn/app">http://propzy.vn/app</a> để tham khảo hơn 10.000 BĐS mới được cập nhật mỗi ngày và tin tức BĐS trong khu vực và toàn quốc. 
    </p>
</div>
<p>
    Propzy rất vui được tư vấn và hỗ trợ Quý khách.
</p>
<p>Trân trọng,</p>
<p>PROPZY - NỀN TẢNG BẤT ĐỘNG SẢN THẬT.</p>
<!-- @include('templates.emailSignature', ['currentUser' => $currentUser]) -->