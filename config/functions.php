<?php
// master_quick_check_git_1 
use GuzzleHttp\Client;

function post_json_sam_db($url, $obj, $write_log = false, $method = 'POST')
{
    $token = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
    $client = new Client();
    //$response = json_decode($client->request('POST', BASE_API_PRIVATE . $url . $token, ['json' => $obj])->getBody());
    // echo BASE_API_PRIVATE . $url . $token, ['json' => $obj]; die();
    //        return $response;
    $response = null;
    try {
        $response = $client->request($method, BASE_SAM_DB_API_PRIVATE . $url . $token, [
            'json' => $obj,
            'on_stats' => function (\GuzzleHttp\TransferStats $stats) {
                if (LOG_TIME_RESP && $stats->getTransferTime() >= 0.0)
                    echo $stats->getEffectiveUri() . ' : ' . $stats->getTransferTime() . " - post_json <br/>";
            }
        ]);
        if ($response->getStatusCode() != 200 || $write_log)
            writeLog(BASE_SAM_DB_API_PRIVATE . $url . $token, $method, $obj, $response->getBody());
    } catch (GuzzleHttp\Exception\RequestException $ex) {
        writeLog(BASE_SAM_DB_API_PRIVATE . $url . $token, $method, $obj, $ex->getMessage(), true);
        $returnVal = new \stdClass();
        $returnVal->result = false;
        $returnVal->message = 'Đã có lỗi xảy ra';
        return $returnVal;
    }
    return json_decode($response->getBody());
}

function loadHub($path)
{
    return getenv('FE_HUB').$path.'?v='.md5(getenv('RELEASE_DATE'));
}

function put_json_with_header($url, $obj)
{
    $token = \Session::has("user") ? \Session::get("user")->token : "";
    $headers = [
        'Authorization' => $token
    ];
    $client = new Client();
    $response = json_decode($client->request('PUT', BASE_API_CALL_PRIVATE . $url, [
        'json' => $obj,
        'headers' => $headers
    ])->getBody());
    return $response;
}

function get_json_with_header($url){
    $token = \Session::has("user") ? \Session::get("user")->token : "";
    $headers = [
        'Authorization' => $token
    ];
    $client = new Client();
    $response = json_decode($client->request('GET', BASE_API_CALL_PRIVATE . $url, [
        'headers' => $headers
    ])->getBody());
    return $response;
}

function post_json_deal_service($url, $obj){
    $token = \Session::has("user") ? \Session::get("user")->token : "";
    $headers = [
        'Authorization' => "Bearer $token"
    ];
    $client = new Client();
    $response = json_decode($client->request('POST', API_GATEWAY_PRIVATE."/deal/api" . $url, [
        'json' => $obj,
        'headers' => $headers
    ])->getBody());
    return $response;
}


if (!function_exists('put_json')) {

    function put_json($url, $obj)
    {
        $token = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
        $client = new Client();
        $response = json_decode($client->request('PUT', BASE_API_PRIVATE . $url . $token, ['json' => $obj, 'on_stats' => function (\GuzzleHttp\TransferStats $stats) {
            if (LOG_TIME_RESP && $stats->getTransferTime() >= 0.0)
                echo $stats->getEffectiveUri() . ' : ' . $stats->getTransferTime() . " - put_json<br/>";
        }])->getBody());
        return $response;
    }
}
if (!function_exists('get_current_page')) {

    function get_current_page($requestData)
    {
        $start = isset($requestData['start']) ? df_int($requestData['start']) : 0;
        $numberItem = isset($requestData['length']) ? df_int($requestData['length']) : 10;
        $page = ($start / $numberItem) + 1;
        return $page;
    }
}

if (!function_exists('get_json_search_listing')) {

    function get_json_search_listing($url, $write_log = false, $method = 'GET')
    {
        $token = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
        $client = new Client();
        //        $response = json_decode($client->request('GET', BASE_API_PRIVATE . $url . $token)->getBody());
        //        return $response;
        $response = null;
        try {
            $response = $client->request($method, BASE_API_SEARCH_LISTING . $url . $token, ['on_stats' => function (\GuzzleHttp\TransferStats $stats) {
                if (LOG_TIME_RESP && $stats->getTransferTime() >= 0.0)
                    echo $stats->getEffectiveUri() . ' : ' . $stats->getTransferTime() . " - get_json_search_listing<br/>";
            }]);
            if ($response->getStatusCode() != 200 || $write_log)
                writeLog(BASE_API_SEARCH_LISTING . $url . $token, $method, array(), $response->getBody());
        } catch (GuzzleHttp\Exception\RequestException $ex) {
            writeLog(BASE_API_SEARCH_LISTING . $url . $token, $method, array(), $ex->getMessage(), true);
            $returnVal = new \stdClass();
            $returnVal->result = false;
            $returnVal->message = 'Có lỗi xảy ra trong quá trình xử lý dữ liệu! Bạn hãy kiểm tra lại giá trị nhập và thử lại.';
            return $returnVal;
        }
        return json_decode($response->getBody());
    }
}

if (!function_exists('post_json')) {
    function loadAsset($path, $secure = null)
    {
        $sepa = '&';
        if (strpos($path, '?') === false) {
            $sepa = '?';
        }
        if (protocol) {
            return secure_asset($path . $sepa . 'v=' . md5(getenv('RELEASE_DATE')), $secure);
        } else {
            return asset($path . $sepa . 'v=' . md5(getenv('RELEASE_DATE')), $secure);
        }
    }

    function post_json($url, $obj, $write_log = false, $method = 'POST')
    {
        $token = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
        $client = new Client();
        //$response = json_decode($client->request('POST', BASE_API_PRIVATE . $url . $token, ['json' => $obj])->getBody());
        // echo BASE_API_PRIVATE . $url . $token, ['json' => $obj]; die();
        //        return $response;
        $response = null;
        try {
            $response = $client->request($method, BASE_API_PRIVATE . $url . $token, [
                'json' => $obj,
                'on_stats' => function (\GuzzleHttp\TransferStats $stats) {
                    if (LOG_TIME_RESP && $stats->getTransferTime() >= 0.0)
                        echo $stats->getEffectiveUri() . ' : ' . $stats->getTransferTime() . " - post_json <br/>";
                }
            ]);
            if ($response->getStatusCode() != 200 || $write_log)
                writeLog(BASE_API_PRIVATE . $url . $token, $method, $obj, $response->getBody());
        } catch (GuzzleHttp\Exception\RequestException $ex) {
            writeLog(BASE_API_PRIVATE . $url . $token, $method, $obj, $ex->getMessage(), true);
            $returnVal = new \stdClass();
            $returnVal->result = false;
            $returnVal->message = 'Đã có lỗi xảy ra';
            return $returnVal;
        }
        return json_decode($response->getBody());
    }

    function post_json_loca($url, $obj, $write_log = false, $method = 'POST')
    {
        $token = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
        $client = new Client();
        //$response = json_decode($client->request('POST', BASE_API_PRIVATE . $url . $token, ['json' => $obj])->getBody());
        // echo BASE_API_PRIVATE . $url . $token, ['json' => $obj]; die();
        //        return $response;
        $response = null;
        try {
            $response = $client->request($method, BASE_LOCATION . $url . $token, ['json' => $obj, 'on_stats' => function (\GuzzleHttp\TransferStats $stats) {
                if (LOG_TIME_RESP && $stats->getTransferTime() >= 0.0)
                    echo $stats->getEffectiveUri() . ' : ' . $stats->getTransferTime() . " - post_json_loca<br/>";
            }]);
            if ($response->getStatusCode() != 200 || $write_log)
                writeLog(BASE_API_PRIVATE . $url . $token, $method, $obj, $response->getBody());
        } catch (GuzzleHttp\Exception\RequestException $ex) {
            writeLog(BASE_LOCATION . $url . $token, $method, $obj, $ex->getMessage(), true);
            $returnVal = new \stdClass();
            $returnVal->result = false;
            $returnVal->message = 'Đã có lỗi xảy ra';
            return $returnVal;
        }
        return json_decode($response->getBody());
    }

    function post_json_export($url, $obj, $write_log = false, $method = 'POST')
    {
        $token = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
        $client = new Client();
        //$response = json_decode($client->request('POST', BASE_API_PRIVATE . $url . $token, ['json' => $obj])->getBody());
        // echo BASE_API_PRIVATE . $url . $token, ['json' => $obj]; die();
        //        return $response;
        $response = null;
        try {
            $response = $client->request($method, BASE_API_EXPORT . $url . $token, ['json' => $obj, 'on_stats' => function (\GuzzleHttp\TransferStats $stats) {
                if (LOG_TIME_RESP && $stats->getTransferTime() >= 0.0)
                    echo $stats->getEffectiveUri() . ' : ' . $stats->getTransferTime() . " - post_json_export<br/>";
            }]);
            if ($response->getStatusCode() != 200 || $write_log)
                writeLog(BASE_API_PRIVATE . $url . $token, $method, $obj, $response->getBody());
        } catch (GuzzleHttp\Exception\RequestException $ex) {
            writeLog(BASE_API_EXPORT . $url . $token, $method, $obj, $ex->getMessage(), true);
            $returnVal = new \stdClass();
            $returnVal->result = false;
            $returnVal->message = 'Đã có lỗi xảy ra';
            return $returnVal;
        }
        return json_decode($response->getBody());
    }

    function post_json_search_listing($url, $obj, $write_log = false, $method = 'POST')
    {
        $token = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
        $client = new Client();
        $response = null;
        try {
            $response = $client->request($method, BASE_API_SEARCH_LISTING . $url . $token, ['json' => $obj, 'on_stats' => function (\GuzzleHttp\TransferStats $stats) {
                if (LOG_TIME_RESP && $stats->getTransferTime() >= 0.0)
                    echo $stats->getEffectiveUri() . ' : ' . $stats->getTransferTime() . " - post_json_search_listing<br/>";
            }]);
            if ($response->getStatusCode() != 200 || $write_log)
                writeLog(BASE_API_SEARCH_LISTING . $url . $token, $method, $obj, $response->getBody());
        } catch (GuzzleHttp\Exception\RequestException $ex) {
            writeLog(BASE_API_SEARCH_LISTING . $url . $token, $method, $obj, $ex->getMessage(), true);
            $returnVal = new \stdClass();
            $returnVal->result = false;
            $returnVal->message = 'Đã có lỗi xảy ra';
            return $returnVal;
        }
        return json_decode($response->getBody());
    }

    function post_json_sam($url, $obj, $write_log = false, $method = 'POST', $isV2 = false)
    {
        $token = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
        $token_sam = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
        if ($isV2) {
            $token_sam = \Session::has("user") ? "?access_token=" . \Session::get("user")->socialUser->accessToken : "";
        }
        $client = new Client();
        //$response = json_decode($client->request('POST', BASE_API_PRIVATE . $url . $token, ['json' => $obj])->getBody());
        //echo BASE_API_PRIVATE . $url . $token, ['json' => $obj]; die();
        //        return $response;

        $response = null;
        try {
            $response = $client->request($method, BASE_SAM_API . $url . $token_sam, ['json' => $obj, 'on_stats' => function (\GuzzleHttp\TransferStats $stats) {
                if (LOG_TIME_RESP && $stats->getTransferTime() >= 0.0)
                    echo $stats->getEffectiveUri() . ' : ' . $stats->getTransferTime() . " - post_json_sam<br/>";
            }]);
            if ($response->getStatusCode() != 200 || $write_log)
                writeLog(BASE_API_PRIVATE . $url . $token, $method, $obj, $response->getBody());
        } catch (GuzzleHttp\Exception\RequestException $ex) {
            writeLog(BASE_SAM_API . $url . $token_sam, $method, $obj, $ex->getMessage(), true);
            $returnVal = new \stdClass();
            $returnVal->result = false;
            $returnVal->message = 'Đã có lỗi xảy ra';
            return $returnVal;
        }
        return json_decode($response->getBody());
    }

    function post_json_sam_v2($url, $obj, $write_log = false, $method = 'POST')
    {
        return post_json_sam($url, $obj, $write_log, $method, true);
    }

    function post_json_external($url, $obj, $write_log = false, $method = 'POST')
    {

        $client = new Client(['verify' => false]);
        $response = null;
        try {
            $response = $client->request($method, $url, ['json' => $obj, 'on_stats' => function (\GuzzleHttp\TransferStats $stats) {
                if (LOG_TIME_RESP && $stats->getTransferTime() >= 0.0)
                    echo $stats->getEffectiveUri() . ' : ' . $stats->getTransferTime() . " - post_json_external<br/>";
            }]);
            if ($response->getStatusCode() != 200 || $write_log)
                writeLog($url, $method, $obj, $response->getBody());
        } catch (GuzzleHttp\Exception\RequestException $ex) {
            writeLog($url, $method, $obj, $ex->getMessage(), true);
            $returnVal = new \stdClass();
            $returnVal->result = false;
            $returnVal->message = 'Đã có lỗi xảy ra';
            return $returnVal;
        }
        return json_decode($response->getBody());
    }
}
if (!function_exists('post_json_external_stream')) {
    function post_json_external_stream($url, $obj, $write_log = false)
    {
        $client = new Client(['verify' => false]);
        $response = null;
        try {
            $response = $client->request('POST', $url, ['json' => $obj, 'on_stats' => function (\GuzzleHttp\TransferStats $stats) {
                if (LOG_TIME_RESP && $stats->getTransferTime() >= 0.0)
                    echo $stats->getEffectiveUri() . ' : ' . $stats->getTransferTime() . " - post_json_external_stream<br/>";
            }]);
            if ($response->getStatusCode() != 200 || $write_log)
                writeLog($url, 'POST', $obj, 'post_json_external_stream : ' . $url);
        } catch (GuzzleHttp\Exception\RequestException $ex) {
            writeLog($url, 'POST', $obj, 'post_json_external_stream : ' . $url . ': FALSE', true);
        }
        $content = null;
        if (isset($response)) {
            $content = $response->getBody()->getContents();
        }
        return $content;
    }
}

if (!function_exists('get_json')) {

    function get_json($url, $write_log = false, $method = 'GET')
    {
        $token = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
        $client = new Client();
        //        $response = json_decode($client->request('GET', BASE_API_PRIVATE . $url . $token)->getBody());
        //        return $response;
        $response = null;
        try {
            $response = $client->request($method, BASE_API_PRIVATE . $url . $token, [
                'on_stats' => function (\GuzzleHttp\TransferStats $stats) {
                    if (LOG_TIME_RESP && $stats->getTransferTime() >= 0.0)
                        echo $stats->getEffectiveUri() . ' : ' . $stats->getTransferTime() . " - GET<br/>";
                }
            ]);
            if ($response->getStatusCode() != 200 || $write_log)
                writeLog(BASE_API_PRIVATE . $url . $token, $method, array(), $response->getBody());
        } catch (GuzzleHttp\Exception\RequestException $ex) {
            writeLog(BASE_API_PRIVATE . $url . $token, $method, array(), $ex->getMessage(), true);
            $returnVal = new \stdClass();
            $returnVal->result = false;
            $returnVal->message = 'Có lỗi xảy ra trong quá trình xử lý dữ liệu! Bạn hãy kiểm tra lại giá trị nhập và thử lại.';
            return $returnVal;
        }
        return json_decode($response->getBody());
    }
}

function get_json_export($url, $write_log = false, $method = 'GET')
{
    $token = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
    $client = new Client();
    //        $response = json_decode($client->request('GET', BASE_API_PRIVATE . $url . $token)->getBody());
    //        return $response;
    $response = null;
    try {
        $response = $client->request($method, BASE_API_EXPORT . $url . $token, ['on_stats' => function (\GuzzleHttp\TransferStats $stats) {
            if (LOG_TIME_RESP && $stats->getTransferTime() >= 0.0)
                echo $stats->getEffectiveUri() . ' : ' . $stats->getTransferTime() . " - get_json_export<br/>";
        }]);
        if ($response->getStatusCode() != 200 || $write_log)
            writeLog(BASE_API_EXPORT . $url . $token, $method, array(), $response->getBody());
    } catch (GuzzleHttp\Exception\RequestException $ex) {
        writeLog(BASE_API_EXPORT . $url . $token, $method, array(), $ex->getMessage(), true);
        $returnVal = new \stdClass();
        $returnVal->result = false;
        $returnVal->message = 'Có lỗi xảy ra trong quá trình xử lý dữ liệu! Bạn hãy kiểm tra lại giá trị nhập và thử lại.';
        return $returnVal;
    }
    return json_decode($response->getBody());
}

if (!function_exists('get_json_sam')) {

    function get_json_sam($url, $write_log = false, $method = 'GET', $isV2 = false)
    {
        $token_sam = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
        if ($isV2) {
            $token_sam = \Session::has("user") ? "?access_token=" . \Session::get("user")->socialUser->accessToken : "";
        }
        $client = new Client();
        //        $response = json_decode($client->request('GET', BASE_API_PRIVATE . $url . $token)->getBody());
        //        return $response;
        $response = null;
        try {
            $response = $client->request($method, BASE_SAM_API . $url . $token_sam, ['on_stats' => function (\GuzzleHttp\TransferStats $stats) {
                if (LOG_TIME_RESP && $stats->getTransferTime() >= 0.0)
                    echo $stats->getEffectiveUri() . ' : ' . $stats->getTransferTime() . " - get_json_sam<br/>";
            }]);
            if ($response->getStatusCode() != 200 || $write_log)
                writeLog(BASE_SAM_API . $url . $token_sam, $method, array(), $response->getBody());
        } catch (GuzzleHttp\Exception\RequestException $ex) {
            writeLog(BASE_SAM_API . $url . $token_sam, $method, array(), $ex->getMessage(), true);
            $returnVal = new \stdClass();
            $returnVal->result = false;
            $returnVal->message = 'Có lỗi xảy ra trong quá trình xử lý dữ liệu! Bạn hãy kiểm tra lại giá trị nhập và thử lại.';
            return $returnVal;
        }
        return json_decode($response->getBody());
    }

    function get_json_sam_v2($url, $write_log = false, $method = 'GET')
    {
        return get_json_sam($url, $write_log = false, $method = 'GET', true);
    }
}

if (!function_exists('delete_json')) {

    function delete_json($url)
    {
        $token = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
        $client = new Client();
        $response = json_decode($client->request('DELETE', BASE_API_PRIVATE . $url . $token, ['on_stats' => function (\GuzzleHttp\TransferStats $stats) {
            if (LOG_TIME_RESP && $stats->getTransferTime() >= 0.0)
                echo $stats->getEffectiveUri() . ' : ' . $stats->getTransferTime() . " - delete_json<br/>";
        }])->getBody());
        return $response;
    }
}

if (!function_exists('isImage')) {
    function isImage($url)
    {
        $pos = strrpos($url, ".");
        if ($pos === false)
            return false;
        $ext = strtolower(trim(substr($url, $pos)));
        $imgExts = array(".gif", ".jpg", ".jpeg", ".png", ".tiff", ".tif"); // this is far from complete but that's always going to be the case...
        if (in_array($ext, $imgExts))
            return true;
        return false;
    }
}

if (!function_exists('last_slug_id')) {

    function last_slug_id($url)
    {
        $objId = (explode("-", $url));
        $objId = $objId[count($objId) - 1];
        return intval($objId);
    }
}
if (!function_exists('last_slug_indexof')) {

    function last_slug_indexof($url, $indexOf)
    {
        $objId = (explode("-", $url));
        $objId = $objId[count($objId) - $indexOf];
        return intval($objId);
    }
}

if (!function_exists('check_amenities_listing')) {

    function check_amenities_listing($idAmenities, $ObjectAmenitiesLising)
    {
        foreach ($ObjectAmenitiesLising as $value) {
            if ($value->id->amenityId == $idAmenities)
                return true;
        }
        return false;
    }
}
if (!function_exists('check_user_roll')) {

    function check_user_roll($idAmenities, $ObjectAmenitiesLising)
    {
        foreach ($ObjectAmenitiesLising as $value) {
            if ($value->id == $idAmenities)
                return true;
        }
        return false;
    }
}
if (!function_exists('check_brokerage')) {

    function check_brokerage($idAmenities, $ObjectAmenitiesLising)
    {
        foreach ($ObjectAmenitiesLising as $value) {
            if ($value->id->brokerageFirmId == $idAmenities)
                return true;
        }
        return false;
    }
}
if (!function_exists('check_fee_listing')) {

    function check_fee_listing($idFee, $ObjectFeeListing)
    {
        if (!empty($ObjectFeeListing)) {
            foreach ($ObjectFeeListing as $key => $value) {
                if ($value->id->feesTypeId == $idFee)
                    return $ObjectFeeListing[$key];
            }
        }
        return null;
    }
}
if (!function_exists('check_fee_listing')) {

    function check_fee_listing($idFee, $ObjectFeeListing)
    {
        if (!empty($ObjectFeeListing)) {
            foreach ($ObjectFeeListing as $key => $value) {
                if ($value->id->feesTypeId == $idFee)
                    return $ObjectFeeListing[$key];
            }
        }
        return null;
    }
}
if (!function_exists('df')) {

    // Check varible existed or not
    function df($value, $default = "", $allowZero = false)
    {
        if ($allowZero)
            return !isset($value) ? $default : $value;

        return empty($value) ? $default : $value;
    }
}
if (!function_exists('df_ref')) {

    // Check varible existed or not
    function df_ref(&$value, $default = "", $allowZero = false)
    {
        if ($allowZero)
            return !isset($value) ? $default : $value;

        return empty($value) ? $default : $value;
    }
}
if (!function_exists('df_int')) {

    // Check varible existed or not
    function df_int($value, $default = NULL, $allowZero = false)
    {
        if ($allowZero)
            return !isset($value) ? $default : $value;

        return empty($value) ? $default : (int) $value;
    }
}
if (!function_exists('df_float')) {

    // Check varible existed or not
    function df_float($value, $default = NULL, $allowZero = false)
    {
        if ($allowZero)
            return !isset($value) ? $default : $value;


        return empty($value) ? $default : (float) $value;
    }
}

if (!function_exists('str2url')) {

    function str2url($str = NULL, $sperator = "-")
    {
        if (!$str)
            return NULL;

        $str = mb_strtolower($str, 'utf-8');
        $str = textToVN($str);

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
        $str = ($str == "van-phong") ? "van-phong-cho-thue" : $str;
        $str = ($str == "can-ho") ? "can-ho-cho-thue" : $str;
        return $str;

        // 		$str = mb_strtolower($str,'utf-8');
        // 		$str  = textToVN($str);
        // 		$str = preg_replace('/[^0-9a-z\.]/is',' ',$str);
        // 		$str = trim($str);
        // 		$str = preg_replace('/\s+/','-',$str);
        // 		return str_replace(' ','-',$str);
    }
}
if (!function_exists('textToVN')) {

    function textToVN($str)
    {
        $str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", "a", $str);
        $str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", "e", $str);
        $str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", "i", $str);
        $str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", "o", $str);
        $str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", "u", $str);
        $str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", "y", $str);
        $str = preg_replace("/(đ)/", "d", $str);

        $str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", "A", $str);
        $str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", "E", $str);
        $str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", "I", $str);
        $str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", "O", $str);
        $str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", "U", $str);
        $str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", "Y", $str);
        $str = preg_replace("/(Đ)/", "D", $str);

        return $str;
    }
}
if (!function_exists('word_limiter')) {

    function word_limiter($str, $limit = 100, $end_char = '&#8230;')
    {
        if (trim($str) == '') {
            return $str;
        }

        preg_match('/^\s*+(?:\S++\s*+){1,' . (int) $limit . '}/', $str, $matches);

        if (strlen($str) == strlen($matches[0])) {
            $end_char = '';
        }

        return rtrim($matches[0]) . $end_char;
    }
}
if (!function_exists('call_controller')) {

    function call_controller($controller = 'index', $action = 'index', $link_params = array())
    {
        $controller = str_replace(' ', '', ucwords(str_replace('-', ' ', $controller))) . 'Controller';
        $action = lcfirst(str_replace(' ', '', ucwords(str_replace('-', ' ', $action))));
        $objController = \App()->make("\\App\\Http\\Controllers\\" . $controller);
        return $objController->callAction($action, empty($link_params) ? array() : explode('/', $link_params));
    }
}
if (!function_exists('agentSettings')) {

    // Check varible existed or not
    function agentSettings($value, $agentSettings)
    {
        foreach ($agentSettings as $key => $agentSettingsValue) {
            if ($value == $agentSettingsValue)
                return "checked";
        }
        return null;
    }
}
if (!function_exists('objectToArray')) {

    function objectToArray($obj)
    {
        return json_decode(json_encode($obj), true);
    }
}
if (!function_exists('havePermission')) {

    function havePermission($key)
    {
        return !empty(\Session::get('userRoles')[$key]) ? \Session::get('userRoles')[$key] : false;
    }
}
if (!function_exists('getAllListingTypeInfo')) {

    function getAllListingTypeInfo()
    {
        return objectToArray(get_json(GET_LISTING_TYPE_INFO)->data);
    }
}

if (!function_exists('writeLog')) {

    function writeLog($url, $method, $data, $bodyData, $isError = false)
    {
        if ((strpos($_SERVER['SERVER_ADDR'], "127.0.0.1") !== false || strpos($_SERVER['SERVER_NAME'], "localhost") !== false) && $isError) {
            print_r($bodyData);
            die;
        }
        //return false;
        $str = '<h3>API URL</h3>';
        $str .= "<pre>";
        $str .= print_r($url, true);
        $str .= "</pre>";
        $str .= '<h3>Method : ' . $method . '</h3>';
        $str .= '<h3>POST data</h3>';
        $str .= "<pre>";
        $str .= print_r($data, true);
        $str .= "</pre>";
        $str .= '<h3>POST data JSON</h3>';
        $str .= "<pre>";
        $str .= print_r(json_encode($data), true);
        $str .= "</pre>";
        $str .= '<h3>Result</h3>';
        $str .= "<pre>";
        $str .= print_r(json_decode($bodyData), true);
        $str .= "</pre>";

        $content = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/></head><body>";
        $content .= $str;
        $content .= "</body></html>";

        $file_name = str2url(date('Y-m-d H:i:s'));

        if (\Session::has("user"))
            $file_name .= '.' . \Session::get("user")->token;
        $file_name .= '.html';

        if ($handle = fopen(public_path() . '/logs/' . $file_name, "a+")) {
            if (!fwrite($handle, $content)) {
                echo "Unable to write to log file";
            }
            fclose($handle);
        } else {
            echo "Can not open path : " . public_path() . '/logs/' . $file_name;
        }
    }
}

if (!function_exists('checkInputData')) {
    function checkInputData($inputData = null)
    {
        if (!isset($inputData) || is_null($inputData) || empty($inputData) || ($inputData == "null")) {
            return null;
        }
        return $inputData;
    }
}

if (!function_exists('getLoggedInUserInfo')) {
    function getLoggedInUserInfo()
    {
        $loggedInUser = Session::get('user');
        return $loggedInUser;
    }
}

if (!function_exists('generateFakeResult')) {

    function generateFakeResult()
    {
        return [
            "message" => "Thao tác thành công",
            "result" => true,
            "data" => null
        ];
    }
}

if (!function_exists('uploadFile')) {
    function uploadFile($image, $type = 'listing')
    {
        $token = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
        $headers = array("Content-Type:multipart/form-data");
        $postfields = [
            "file" => new \CURLFile($image->getRealPath(), $image->getMimeType()),
            "fileName" => $image->getClientOriginalName(),
            "type" => $type,
            "source" => "dashboard"
        ];
        $ch = curl_init();
        $options = array(
            CURLOPT_URL => FILE_UPLOAD_API . \Config::get('apis.listing.upload') . $token,
            CURLOPT_HEADER => true,
            CURLOPT_POST => 1,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => $postfields,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => false
        );
        curl_setopt_array($ch, $options);
        $result = curl_exec($ch);

        $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $header = substr($result, 0, $header_size);
        $body = substr($result, $header_size);

        $uploadRs = json_decode($body, true);
        curl_close($ch);

        return $uploadRs;
    }
}


if (!function_exists('uploadImageFilesUseApi')) {
    function uploadImageFilesUseApi($image, $type = 'listing')
    {
        $token = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
        $headers = array("Content-Type:multipart/form-data");
        $postfields = [
            "file" => new \CURLFile($image->getRealPath(), $image->getMimeType()),
            "type" => $type,
            "departmentCode" => \Session::get("user")->departments[0]->departmentId,
            "source" => "dashboard"
        ];

        $ch = curl_init();

        $options = array(
            CURLOPT_URL => BASE_UPLOAD_API . \Config::get('apis.listing.upload') . $token,
            CURLOPT_HEADER => true,
            CURLOPT_POST => 1,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => $postfields,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => false
        );
        curl_setopt_array($ch, $options);
        $result = curl_exec($ch);

        $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $header = substr($result, 0, $header_size);
        $body = substr($result, $header_size);

        $uploadRs = json_decode($body, true);
        curl_close($ch);

        return $uploadRs;
    }

    function uploadImageFilesUseApiFromPath($imagePath, $type = 'listing')
    {
        $token = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
        $headers = array("Content-Type:multipart/form-data");
        $postfields = [
            "file" => new \CURLFile($imagePath, mime_content_type($imagePath)),
            "type" => $type,
            "fileSize" => filesize($imagePath),
            "source" => "dashboard"
        ];

        $ch = curl_init();
        $options = array(
            CURLOPT_URL => BASE_UPLOAD_API . \Config::get('apis.listing.upload') . $token,
            CURLOPT_HEADER => true,
            CURLOPT_POST => 1,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => $postfields,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => false
        );
        curl_setopt_array($ch, $options);
        $result = curl_exec($ch);

        $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $header = substr($result, 0, $header_size);
        $body = substr($result, $header_size);

        $uploadRs = json_decode($body, true);
        curl_close($ch);

        return $uploadRs;
    }
}

// if (!function_exists('renderStar')) {

//     function renderStar($poin) {
//         return $poin;
//     }

// }
if (!function_exists('renderPosition')) {

    function renderPosition($leadDealDetail)
    {
        // get data hẻm
        $alleyTypes = get_json(ALLEY_TYPE)->data;
        $alleyArray = [];
        foreach ($alleyTypes as $key => $value) {
            array_push($alleyArray, $alleyArray[$value->alleyId] = $value->alleyName);
        }
        // $alleyArray = [8 => 'Xe ba gác', 9 => 'Xe ô tô', 10 => 'Xe tải'];

        $alleyPrint = "";
        $positionsArray = [1 => 'Mặt tiền', 2 => 'Hẻm'];
        $alleyTypeArray = [1 => 'Hẻm thông', 2 => 'Hẻm cụt'];
        // $roadFrontageDistanceArray = [0 => '<= 100m', 100 => '100m - 200m', 200 => '200m - 500m', 500 => '>500m'];
        foreach ($leadDealDetail->positionList as $key => $value) {
            if (isset($value->positionId)) {
                if (array_key_exists($value->positionId, $positionsArray)) {
                    $alleyPrint .= "<br/>- " . $positionsArray[$value->positionId];
                }
                if ($value->positionId == 2) { // nếu vị trí là hẻm thì bổ sung thông tin
                    if (isset($value->alleyId) && array_key_exists($value->alleyId, $alleyArray)) {
                        $alleyPrint .= ' <br/>&ensp;&ensp;&ensp;+ ' . $alleyArray[$value->alleyId];
                    }
                    if (isset($value->alleyType) && array_key_exists($value->alleyType, $alleyTypeArray)) {
                        $alleyPrint .= ' <br/>&ensp;&ensp;&ensp;+ ' . $alleyTypeArray[$value->alleyType];
                    }
                    // $coverRoadFrontageDistanceFrom = $value->roadFrontageDistanceFrom == '0' ? 1 : $value->roadFrontageDistanceFrom;
                    // dd(round($value->roadFrontageDistanceFrom));
                    // return $value->roadFrontageDistanceFrom;
                    // $value->roadFrontageDistanceFrom = $value->roadFrontageDistanceFrom+1;
                    if (isset($value->roadFrontageDistanceFrom)) {
                        switch ($value->roadFrontageDistanceFrom) {
                            case 0:
                                $alleyPrint .= ' <br/> &ensp;&ensp;&ensp;+ Khoảng cách đến mặt tiền đường: <= 100m';
                                break;
                            case 100:
                                $alleyPrint .= ' <br/> &ensp;&ensp;&ensp;+ Khoảng cách đến mặt tiền đường: 100m - 200m';
                                break;
                            case 200:
                                $alleyPrint .= ' <br/> &ensp;&ensp;&ensp;+ Khoảng cách đến mặt tiền đường: 200m - 500m';
                                break;
                            case 500:
                                $alleyPrint .= ' <br/> &ensp;&ensp;&ensp;+ Khoảng cách đến mặt tiền đường: >500m';
                                break;
                            default:
                                // code...
                                break;
                        }
                        // if($value->roadFrontageDistanceFrom == 0){
                        // 	$alleyPrint .= ' <br/> &ensp;&ensp;&ensp;+ Khoảng cách đến mặt tiền đường: <= 100m';
                        // }else{
                        // 	if(array_key_exists($value->roadFrontageDistanceFrom, $roadFrontageDistanceArray)){
                        // 		$alleyPrint .= ' <br/>&ensp;&ensp;&ensp;+ Khoảng cách đến mặt tiền đường: ' . $roadFrontageDistanceArray[$value->roadFrontageDistanceFrom];
                        // 	}
                        // }
                    }
                    if (isset($value->alleyWidth)) {
                        $alleyPrint .= '<br/>&ensp;&ensp;&ensp;+ Độ rộng hẻm: ' . $value->alleyWidth . 'm';
                    }
                } else {
                    if (isset($value->roadFrontageWidth)) {
                        $alleyPrint .= ' <br/>&ensp;&ensp;&ensp;+  Độ rộng mặt tiền đường: ' . $value->roadFrontageWidth . 'm';
                    }
                }
            } else {
                $alleyPrint .= "N/A";
            }
        }

        return $alleyPrint;
    }
}


if (!function_exists('isMobileDev')) {

    function isMobileDev()
    {
        if (isset($_SERVER['HTTP_USER_AGENT']) and !empty($_SERVER['HTTP_USER_AGENT'])) {
            $user_ag = $_SERVER['HTTP_USER_AGENT'];
            if (preg_match('/(Mobile|Android|Tablet|GoBrowser|[0-9]x[0-9]*|uZardWeb\/|Mini|Doris\/|Skyfire\/|iPhone|Fennec\/|Maemo|Iris\/|CLDC\-|Mobi\/)/uis', $user_ag)) {
                return true;
            } else {
                return false;
            };
        } else {
            return false;
        };
    }
}

if (!function_exists('isAllowedIp')) {

    function isAllowedIp($clientIp)
    {
        $allowedIps = [
            '127.0.0.1',
            '113.161.85.107',
            '210.245.34.13'
        ];
        if (!in_array($clientIp, $allowedIps)) {
            return false;
        }
        return true;
    }
}

if (!function_exists("get_transaction_centers_not_other")) {

    function get_transaction_centers_not_other()
    {
        $tcs = get_json("transaction-center")->data;
        $not_other_arr = [];
        if (count($tcs) > 0) {
            foreach ($tcs as $key => $value) {
                $tcs[$key]->id = $value->tcId;
                if ($value->tcId != 0) {
                    $not_other_arr[] = $value;
                }
            }
        }
        return $not_other_arr;
    }
}

if (!function_exists("get_transaction_centers")) {

    function get_transaction_centers()
    {
        $tcs = get_json("transaction-center")->data;
        if (count($tcs) > 0) {
            foreach ($tcs as $key => $value) {
                $tcs[$key]->id = $value->tcId;
            }
        }
        return $tcs;
        return [
            (object) [
                "id" => 1,
                "name" => "Head - Lê Đại Hành",
                'address' => 'Tầng 4, tòa nhà Flemington, 182 Lê Đại Hành, Phường 15, Quận 11, TP. Hồ Chí Minh'
            ],
            (object) [
                "id" => 4,
                "name" => "TC 829A Luỹ Bán Bích",
                'address' => '829A Lũy Bán Bích, Phường Tân Thành, Quận Tân Phú, TP. Hồ Chí Minh'
            ],
            (object) [
                "id" => 5,
                "name" => "TC 202 Điện Biên Phủ",
                'address' => '202 Điện Biên Phủ, Phường 17, Quận Bình Thạnh, TP. Hồ Chí Minh'
            ],
            (object) [
                "id" => 6,
                "name" => "TC 241 Phan Huy Ích",
                'address' => '241 Phan Huy Ích, Phường 14, Quận Gò Vấp, TP. Hồ Chí Minh'
            ],
            (object) [
                "id" => 7,
                "name" => "TC 672 A30 Phan Văn Trị",
                'address' => '672 A30 Phan Văn Trị, Phường 10, Quận Gò Vấp, TP. Hồ Chí Minh'
            ],
            (object) [
                "id" => 3,
                "name" => "Khác",
                'address' => -1
            ]
        ];
    }
}

if (!function_exists("get_color_tasks")) {

    function get_color_tasks()
    {
        return [
            'High' => (object) [
                "background" => '#f3581d',
                "border" => "#f3581d"
            ],
            'Low' => (object) [
                "background" => '#75ca3b',
                "border" => "#75ca3b"
            ],
            'Medium' => (object) [
                "background" => '#ffda67',
                "border" => "#ffda67"
            ],
        ];
    }
}

if (!function_exists('cryptoJsAesDecrypt')) {
    /**
     * Helper library for CryptoJS AES encryption/decryption
     * Allow you to use AES encryption on client side and server side vice versa
     *
     * @author BrainFooLong (bfldev.com)
     * @link https://github.com/brainfoolong/cryptojs-aes-php
     */
    /**
     * Decrypt data from a CryptoJS json encoding string
     *
     * @param mixed $passphrase
     * @param mixed $jsonString
     * @return mixed
     */
    function cryptoJsAesDecrypt($passphrase, $jsonString)
    {
        $jsondata = json_decode($jsonString, true);
        try {
            $salt = hex2bin($jsondata["s"]);
            $iv = hex2bin($jsondata["iv"]);
        } catch (Exception $e) {
            return null;
        }
        $ct = base64_decode($jsondata["ct"]);
        $concatedPassphrase = $passphrase . $salt;
        $md5 = array();
        $md5[0] = md5($concatedPassphrase, true);
        $result = $md5[0];
        for ($i = 1; $i < 3; $i++) {
            $md5[$i] = md5($md5[$i - 1] . $concatedPassphrase, true);
            $result .= $md5[$i];
        }
        $key = substr($result, 0, 32);
        $data = openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);
        return json_decode($data, true);
    }

    /**
     * Encrypt value to a cryptojs compatiable json encoding string
     *
     * @param mixed $passphrase
     * @param mixed $value
     * @return string
     */
    function cryptoJsAesEncrypt($passphrase, $value)
    {
        $salt = openssl_random_pseudo_bytes(8);
        $salted = '';
        $dx = '';
        while (strlen($salted) < 48) {
            $dx = md5($dx . $passphrase . $salt, true);
            $salted .= $dx;
        }
        $key = substr($salted, 0, 32);
        $iv = substr($salted, 32, 16);
        $encrypted_data = openssl_encrypt(json_encode($value), 'aes-256-cbc', $key, true, $iv);
        $data = array("ct" => base64_encode($encrypted_data), "iv" => bin2hex($iv), "s" => bin2hex($salt));
        return json_encode($data);
    }

    // Dashboard encrypt
    function dashboardEncrypt($key, $string)
    {
        return cryptoJsAesEncrypt($key, $string);
    }

    function encryptPhoneNumber($phoneNumber)
    {
        return dashboardEncrypt(csrf_token(), $phoneNumber);
    }

    function setCallKeyCookie()
    {
        Cookie::queue('call-key', csrf_token(), 60 * 60 * 100, null, null, false, false);
    }

    if (!function_exists('get_json_test')) {

        function get_json_test($url)
        {
            $string = file_get_contents(__DIR__ . '/../json_data_exp/' . str_replace('/', '.', $url) . '.json');
            return json_decode($string);
        }
    }
}

/// PRICETAG
if (!function_exists('post_json_pricetag')) {
    function post_json_pricetag($url, $obj, $write_log = false, $method = 'POST')
    {
        $token = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
        $client = new Client();
        //$response = json_decode($client->request('POST', BASE_API_PRIVATE . $url . $token, ['json' => $obj])->getBody());
        // echo BASE_API_PRIVATE . $url . $token, ['json' => $obj]; die();
        //        return $response;
        $response = null;
        try {
            $response = $client->request($method, BASE_API_PRICE_TAG . $url . $token, [
                'json' => $obj,
                'on_stats' => function (\GuzzleHttp\TransferStats $stats) {
                    if (LOG_TIME_RESP && $stats->getTransferTime() >= 0.0)
                        echo $stats->getEffectiveUri() . ' : ' . $stats->getTransferTime() . " - post_json_loca<br/>";
                },
                'headers' => [
                    'Authorization' => 'Bearer ' . (\Session::get("user")->token ?? ''),
                    'Content-Type' => 'application/json'
                ]
            ]);
            if ($response->getStatusCode() != 200 || $write_log)
                writeLog(BASE_API_PRICE_TAG . $url . $token, $method, $obj, $response->getBody());
        } catch (GuzzleHttp\Exception\RequestException $ex) {
            writeLog(BASE_API_PRICE_TAG . $url . $token, $method, $obj, $ex->getMessage(), true);
            $returnVal = new \stdClass();
            $returnVal->result = false;
            $returnVal->message = 'Đã có lỗi xảy ra';
            return $returnVal;
        }
        return json_decode($response->getBody());
    }
}

if (!function_exists('get_json_pricetag')) {
    function get_json_pricetag($url, $write_log = false, $method = 'GET')
    {
        $token = \Session::has("user") ? "?access_token=" . \Session::get("user")->token : "";
        $client = new Client();
        //        $response = json_decode($client->request('GET', BASE_API_PRIVATE . $url . $token)->getBody());
        //        return $response;
        $response = null;
        try {
            $response = $client->request($method, BASE_API_PRICE_TAG . $url . $token, [
                'on_stats' => function (\GuzzleHttp\TransferStats $stats) {
                    if (LOG_TIME_RESP && $stats->getTransferTime() >= 0.0)
                        echo $stats->getEffectiveUri() . ' : ' . $stats->getTransferTime() . " - GET<br/>";
                },
                'headers' => [
                    'Authorization' => 'Bearer ' . (\Session::get("user")->token ?? ''),
                ]
            ]);
            if ($response->getStatusCode() != 200 || $write_log)
                writeLog(BASE_API_PRICE_TAG . $url . $token, $method, array(), $response->getBody());
        } catch (GuzzleHttp\Exception\RequestException $ex) {
            writeLog(BASE_API_PRICE_TAG . $url . $token, $method, array(), $ex->getMessage(), true);
            $returnVal = new \stdClass();
            $returnVal->result = false;
            $returnVal->message = 'Có lỗi xảy ra trong quá trình xử lý dữ liệu! Bạn hãy kiểm tra lại giá trị nhập và thử lại.';
            return $returnVal;
        }
        return json_decode($response->getBody());
    }
}
/// END PRICETAG

if (!function_exists('get_json_agent_tour')) {

    function get_json_agent_tour($url){
        $token = \Session::has("user") ? \Session::get("user")->token : "";
        $headers = [
            'Authorization' => 'Bearer ' . $token
        ];
        $client = new Client();
        $response = json_decode($client->request('GET', AGENT_TOURING . $url, [
            'headers' => $headers
        ])->getBody());
        return $response;
    }
}

if (!function_exists('post_json_agent_tour')) {

    function post_json_agent_tour($url, $obj){
        $token = \Session::has("user") ? \Session::get("user")->token : "";
        $headers = [
            'Authorization' => "Bearer $token"
        ];
        $client = new Client();
        $response = json_decode($client->request('POST', AGENT_TOURING . $url, [
            'json' => $obj,
            'headers' => $headers
        ])->getBody());
        return $response;
    }

}

if (!function_exists('put_json_agent_tour')) {

    function put_json_agent_tour($url, $obj){
        $token = \Session::has("user") ? \Session::get("user")->token : "";
        $headers = [
            'Authorization' => "Bearer $token"
        ];
        $client = new Client();
        $response = json_decode($client->request('PUT', AGENT_TOURING . $url, [
            'json' => $obj,
            'headers' => $headers
        ])->getBody());
        return $response;
    }

}

if (!function_exists('get_json_user_role')) {

    function get_json_user_role($url){
        $token = \Session::has("user") ? \Session::get("user")->token : "";
        $headers = [
            'Authorization' => 'Bearer ' . $token
        ];
        $client = new Client();
        $response = json_decode($client->request('GET', USER_ROLE . $url, [
            'headers' => $headers
        ])->getBody());
        return $response;
    }
}

if (!function_exists('post_json_user_role')) {

    function post_json_user_role($url, $obj){
        $token = \Session::has("user") ? \Session::get("user")->token : "";
        $headers = [
            'Authorization' => "Bearer $token"
        ];
        $client = new Client();
        $response = json_decode($client->request('POST', USER_ROLE . $url, [
            'json' => $obj,
            'headers' => $headers
        ])->getBody());
        return $response;
    }

}

if (!function_exists('get_json_back_office')) {

    function get_json_back_office($url){
        $token = \Session::has("user") ? \Session::get("user")->token : "";
        $headers = [
            'Authorization' => 'Bearer ' . $token
        ];
        $client = new Client();
        $response = json_decode($client->request('GET', BASE_BACKOFFICE_API . $url, [
            'headers' => $headers
        ])->getBody());
        return $response;
    }
}

if (!function_exists('post_json_back_office')) {

    function post_json_back_office($url, $obj){
        $token = \Session::has("user") ? \Session::get("user")->token : "";
        $headers = [
            'Authorization' => "Bearer $token"
        ];
        $client = new Client();
        $response = json_decode($client->request('POST', BASE_BACKOFFICE_API . $url, [
            'json' => $obj,
            'headers' => $headers
        ])->getBody());
        return $response;
    }

}