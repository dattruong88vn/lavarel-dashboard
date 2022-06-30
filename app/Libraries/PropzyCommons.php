<?php

namespace App\Libraries;

use Carbon\Carbon;

class PropzyCommons {

    public static function showEllapseTime($timeStamp) {
        $currentTime = Carbon::now();
        $itemDate = Carbon::createFromTimestamp($timeStamp);
        $diffString = "";
        $diffInMinutes = $itemDate->diffInMinutes($currentTime);
        if ($diffInMinutes < 60) {
            $diffString = $diffInMinutes . ' phút';
        } else {
            $diffInHours = $itemDate->diffInHours($currentTime);
            if ($diffInHours < 24) {
                $diffString = $diffInHours . ' giờ';
            } else {
                $diffInDays = $itemDate->diffInDays($currentTime);
                $diffString = $diffInDays . ' ngày';
            }
        }
        return $diffString;
    }
    public static function getPurposeIdFromDetail($purpose = [], &$arr = [], $field = 'id') {
        if($purpose['checked']) {
            $arr[] = $purpose[$field];
        }
        foreach($purpose['childs'] as $p) {
            self::getPurposeIdFromDetail($p, $arr, $field);
        }
        return $arr;
    }
    public static function getPurposeTextFromDetail($purpose = [], &$arr = []) {
        return self::getPurposeIdFromDetail($purpose, $arr, 'title');
    }
}
