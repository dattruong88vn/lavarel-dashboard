<?php

namespace App\Http\Controllers\Pos;

use GuzzleHttp\Client;
use Storage;
use Session;
use View;
use Input;
use Validator;

class UtilitiesController extends CommonPosController
{

    private $API_LIST = [];
	public function __construct() {
		parent::__construct();
	}

	public function saveImage() {
        $request = \Request::all();
        $imageUrl = $request['url'];

        $ch = curl_init ($imageUrl);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
        $raw=curl_exec($ch);
        curl_close ($ch);


        $downloadPath = $path = Storage::disk('local')->getDriver()->getAdapter()->getPathPrefix() . '/' . basename($imageUrl);
        if(file_exists($downloadPath)){
            unlink($downloadPath);
        }
        $fp = fopen($downloadPath,'x');
        fwrite($fp, $raw);
        fclose($fp);

        ob_end_clean();
        return response()->download($downloadPath)->deleteFileAfterSend(true);// $name, $headers)
    }
    public function Imagebase64() {
        $request = \Request::all();
        $imageUrl = $request['url'];
        $path = parse_url($imageUrl);
        //$path["path"]

        $client = new Client();
        $response = null;
        try {
            $response = $client->request('GET', UPLOAD_URL_PRIVATE .  $path["path"]);
        } catch (GuzzleHttp\Exception\RequestException $ex) {

        }

        $extension = 'png';

        $base64 = '';
        if (isset($response)) {

            $types = $response->getHeader("Content-Type");
            if (isset($types) && count($types) > 0) {
                foreach ($types as $type) {
                    if (strpos($type, 'jpg')) {
                        $extension = 'jpg';
                    }
                    if (strpos($type, 'jpeg')) {
                        $extension = 'jpeg';
                    }
                    if (strpos($type, 'gif')) {
                        $extension = 'gif';
                    }
                    if (strpos($type, 'png')) {
                        $extension = 'png';
                    }
                }
            }
            $raw = $response->getBody()->getContents();
            $base64 = base64_encode($raw);
        }
        $result = 'data:image/' . $extension . ';base64,' .$base64;
        ob_end_clean();
        return response($result);
    }

    public function saveImageToServer() {
        $request = \Request::all();
        define('UPLOAD_DIR', 'images/');

        $tmp_dir = sys_get_temp_dir();
        $img = $request['img'];
        $type = isset($request['type']) ? $request['type'] : 'listing';
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $file = $tmp_dir. '/' . uniqid() . '.png';
        $success = file_put_contents($file, $data);
        $result = "";
        if ($success) {
            $result = uploadImageFilesUseApiFromPath($file, $type);
            unlink($file);
        }
        return response($result);
    }
    public function cropImage() {
        $request = \Request::all();
        define('UPLOAD_DIR', 'images/');

        $tmp_dir = sys_get_temp_dir();
        $img = $request['img'];
        $type = isset($request['type']) ? $request['type'] : 'listing';
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $file = $tmp_dir. '/' . uniqid() . '.png';
        $success = file_put_contents($file, $data);
        $result = "";
        if ($success) {
            $result = uploadImageFilesUseApiFromPath($file, $type);
            unlink($file);
        }
        return response($result);
    }

    function convertCoordinate(){
        $response = [
            'result'=> true,
            'error' => false,
            'data'=> null,
            'message' => 'Thành công'
        ];
        $postData = \Request::json()->all();
        $r = exec('echo "'.$postData['y'].' '.$postData['x'].'" | /usr/bin/cs2cs +proj=tmerc +lat_0=0 +lon_0=105.75 +k=0.9999 +x_0=500000 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +to +proj=longlat +datum=WGS84 +no_defs -f %.10f', $resultInput);
        $resultInput= explode(" ",$r);
        $resultInput= explode("	",$resultInput[0]);
        if(!empty($resultInput[0]) && !empty($resultInput[1])) {
            $r = exec('echo "'.$resultInput[0].' '.$resultInput[1].'" | /usr/bin/cs2cs +proj=longlat +ellps=WGS84 +towgs84=-191.90441429,-39.30318279,-111.45032835,0.00928836,-0.01975479,0.00427372,0.252906278 +no_defs +to +proj=longlat +datum=WGS84 +no_defs -f %.10f', $resultInput);
            $resultInput= explode(" ",$r);
            $resultInput= explode("	",$resultInput[0]);
            $response['data'] = $resultInput;
        } else {
            $response['result'] = false;
            $response['error'] = true;
            $response['message'] = "Thất bại";
        }

        return response()->json($response);
    }


}
