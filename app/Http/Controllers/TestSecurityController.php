<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;
use App\Libraries\CacheManager;


/**
 * @author Hoang.Phan <hoang.phan@propzy.com>
 * https://github.com/kpavlov/spring-hmac-rest
 */

class TestSecurityController extends BaseController {

    const SCHEMA = 'http';
    const API_URI = "/api/";
    private $host = 'localhost';
    private $port = '9090';
    private $api_url;
    private $api_key = "fuck";
    private $api_secret = 'ThanhXaoKe';

    public function __construct() {
        parent::__construct();
    }

    
    function clientIPToHex($ip="") {
        $hex="";
        if($ip=="") $ip=getEnv("REMOTE_ADDR");
        $part=explode('.', $ip);
        for ($i=0; $i<=count($part)-1; $i++) {
            $hex.=substr("0".dechex($part[$i]),-2);
        }
        return $hex;
    }

    
    function uuid($serverID=1)
    {
        $t=explode(" ",microtime());
        return sprintf( '%04x-%08s-%08s-%04s-%04x%04x',
            $serverID,
            $this->clientIPToHex(),
            substr("00000000".dechex($t[1]),-8),   // get 8HEX of unixtime
            substr("0000".dechex(round($t[0]*65536)),-4), // get 4HEX of microtime
            mt_rand(0,0xffff), mt_rand(0,0xffff));
    }

    private function createAuthHeader($uri, $date, $method, $payload)
    {
        $nonce = $this->uuid();
        $string_to_sign =
            $method."\n" .
            static::SCHEMA."\n" .
            $this->host.":".$this->port."\n" .
            $this->API_URI.$uri . "\n" .
            "application/json\n" .
            $this->api_key."\n" .
            $nonce . "\n" .
            $date . "\n" .
            json_encode($payload) . "\n";
        echo $string_to_sign;
        $digest = hash_hmac('sha512', $string_to_sign, $this->api_secret, true);
        return 'HmacSHA512 fuck:' . $nonce . ':' . base64_encode($digest);
    }

    public function index(){        
        $date = new \DateTime( "NOW" );
        echo $this->createAuthHeader('postRequest', $date->getTimestamp()*1000, 'POST', ["fuck"=>"ThanhXaoKe"] ); 
        echo "\n\r============\n\r";
        echo $this->createAuthHeader('postRequest', $date->getTimestamp()*1000, 'GET', new \stdClass() ); 
        echo "\n\r============\n\r";
        echo $this->createAuthHeader('postRequest', $date->getTimestamp()*1000, 'PUT', ["fuck"=>"ThanhXaoKe"] ); 
    }

}
