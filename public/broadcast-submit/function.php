<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 5/3/2018
 * Time: 5:17 PM
 */
function getData($url =''){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$url."?access_token=8dce1efe6830e6f912cb72e0c984fa4e0b49a7d4f1874ab45b3151cb382dc347");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec ($ch);
    curl_close ($ch);
    return json_decode($response);
}

function postData($url ='',$data = array(),$headers=array()){
    $ch1 = curl_init();
    $headersSend= array();
    foreach ($headers as $key =>$item){
        $headersSend[]=$key.":".$item;
        if($key=='Content-Type' && $item=="application/json; charset=utf-8")
            $data = json_encode($data,JSON_UNESCAPED_UNICODE );
    }
    $options = array(
        CURLOPT_URL => $url."?access_token=8dce1efe6830e6f912cb72e0c984fa4e0b49a7d4f1874ab45b3151cb382dc347",
        CURLOPT_HEADER => true,
        CURLOPT_HTTPHEADER => $headersSend,
        CURLOPT_POST => 1,
        CURLOPT_POSTFIELDS => $data,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false
    );

    curl_setopt_array($ch1, $options);
    $result = curl_exec($ch1);
    $header_size = curl_getinfo($ch1, CURLINFO_HEADER_SIZE);
    $header = substr($result, 0, $header_size);
    $body = substr($result, $header_size);
    $response = json_decode($body, true);
    curl_close($ch1);
    return $response;
}