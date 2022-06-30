<?php

function str2url($str = NULL, $sperator = "-") {
    if (!$str)
        return NULL;

    $str = mb_strtolower($str, 'utf-8');

    $str = str_replace(array('&amp;', '&quot;', '&lt;', '&gt;', '*', '/'), " ", $str);
    $str = preg_replace("/[^a-zA-Z0-9- ]/", "-", $str);
    $str = preg_replace('/\s\s+/', ' ', $str);
    $str = trim($str);
    $str = preg_replace('/\s+/', $sperator, $str);

    $str = str_replace("----", "-", $str);
    $str = str_replace("---", "-", $str);
    $str = str_replace("--", "-", $str);
    $str = trim($str, $sperator);
    $str = strtolower($str);
    return $str;
}

$requestData = $_POST;
$file_name = 'mail-gun-' . str2url(date('Y-m-d H:i:s'));
$file_name .= '.html';

if ($handle = fopen('./logs/' . $file_name, "a+")) {
    if (!fwrite($handle, json_encode($requestData))) {
        echo "Unable to write to log file";
    }
    fclose($handle);
} else {
    echo "Can not open path : " . './logs/' . $file_name;
}