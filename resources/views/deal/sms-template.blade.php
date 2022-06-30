<?php if ($type == 1): ?>
    Danh sach BDS tai Propzy phu hop voi nhu cau quy khach tai {{SMS_LISTING_URL}}{{$code}}. De duoc ho tro LH {{$lastMsg}} Xem them: http://propzy.vn/app [code]{{$code}}[code]
<?php elseif ($type == 2): ?>
    Propzy khong the lien he voi Quy khach qua SDT da dang ky. De duoc ho tro, LH {{$lastMsg}} Xem them: https://propzy.vn/app
<?php elseif ($type == 3): ?>
    Truy cap https://propzy.vn/app de tham khao hon 10.000 BDS moi duoc cap nhat moi ngay. De duoc ho tro, LH {{$lastMsg}}
<?php endif; ?>