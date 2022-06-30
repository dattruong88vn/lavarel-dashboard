<?php
namespace App\Http\Controllers\Pos;

use App\Lib\ImageLib;
use Storage;
use Session;
use View;
use Input;
use Validator;

class ImageController extends CommonPosController
{

    private $API_LIST = [];

    public function downloadFile($url)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
        $raw = curl_exec($ch);
        curl_close($ch);
        
        $downloadPath = $path = Storage::disk('local')->getDriver()
            ->getAdapter()
            ->getPathPrefix() . '/' . basename($url);
        if (file_exists($downloadPath)) {
            unlink($downloadPath);
        }
        $fp = fopen($downloadPath, 'x');
        fwrite($fp, $raw);
        fclose($fp);
        return $downloadPath;
    }

    public function crop()
    {
        $request = \Request::json()->all();
        $request['downloadPath'] = $this->downloadFile($request['imageUrl']);
        list ($orgWidth, $orgHeight) = getimagesize($request['downloadPath']);
        $magicianObj = new ImageLib($request['downloadPath']);
        $newWidth = ($orgWidth / $request['imageEditorWidth']) * $request['areas'][0]['width'];
        $newHeight = ($orgHeight / $request['imageEditorHeight']) * $request['areas'][0]['height'];
        $x = ($orgWidth / $request['imageEditorWidth']) * $request['areas'][0]['x'];
        $y = ($orgHeight / $request['imageEditorHeight']) * $request['areas'][0]['y'];
        $request['orgWidth'] = $orgWidth;
        $request['orgHeight'] = $orgHeight;
        $request['newWidth'] = $newWidth;
        $request['newHeight'] = $newHeight;
        $request['x'] = $x;
        $request['y'] = $y;
        $magicianObj->cropImage($newWidth, $newHeight, $x . 'x' . $y);
        $magicianObj->saveImage($request['downloadPath'], 100);
        $request['uploadRs'] = uploadImageFilesUseApiFromPath($request['downloadPath']);
        unlink($request['downloadPath']);
        return response()->json($request);
    }

    public function resize()
    {
        $request = \Request::json()->all();
        $request['downloadPath'] = $this->downloadFile($request['imageUrl']);
        $magicianObj = new ImageLib($request['downloadPath']);
        $magicianObj->resizeImage($request['imageEditorResizeWidth'], $request['imageEditorResizeHeight']);
        $magicianObj->saveImage($request['downloadPath'], 100);
        $request['uploadRs'] = uploadImageFilesUseApiFromPath($request['downloadPath']);
        unlink($request['downloadPath']);
        return response()->json($request);
    }

    public function rotate()
    {
        $request = \Request::json()->all();
        $request['downloadPath'] = $this->downloadFile($request['imageUrl']);
        $magicianObj = new ImageLib($request['downloadPath']);
        $magicianObj->rotate(intval($request['imageEditorRotate']));
        $magicianObj->saveImage($request['downloadPath'], 100);
        $request['uploadRs'] = uploadImageFilesUseApiFromPath($request['downloadPath']);
        unlink($request['downloadPath']);
        return response()->json($request);
    }

    public function blur()
    {
        $request = \Request::json()->all();
        $request['downloadPath'] = $this->downloadFile($request['imageUrl']);
        list ($orgWidth, $orgHeight) = getimagesize($request['downloadPath']);
        $magicianObj = new ImageLib($request['downloadPath']);
        $newWidth = ($orgWidth / $request['imageEditorWidth']) * $request['areas'][0]['width'];
        $newHeight = ($orgHeight / $request['imageEditorHeight']) * $request['areas'][0]['height'];
        $x = ($orgWidth / $request['imageEditorWidth']) * $request['areas'][0]['x'];
        $y = ($orgHeight / $request['imageEditorHeight']) * $request['areas'][0]['y'];
        $request['orgWidth'] = $orgWidth;
        $request['orgHeight'] = $orgHeight;
        $request['newWidth'] = $newWidth;
        $request['newHeight'] = $newHeight;
        $request['x'] = $x;
        $request['y'] = $y;
        $magicianObj->blurImage($newWidth, $newHeight, $x . 'x' . $y);
        $magicianObj->saveImage($request['downloadPath'], 100);
        $request['uploadRs'] = uploadImageFilesUseApiFromPath($request['downloadPath']);
        unlink($request['downloadPath']);
        return response()->json($request);
    }

    public function flip()
    {
        $request = \Request::json()->all();
        $request['downloadPath'] = $this->downloadFile($request['imageUrl']);
        $magicianObj = new ImageLib($request['downloadPath']);
        $magicianObj->flipImage(intval($request['type']));
        $magicianObj->saveImage($request['downloadPath'], 100);
        $request['uploadRs'] = uploadImageFilesUseApiFromPath($request['downloadPath']);
        unlink($request['downloadPath']);
        return response()->json($request);
    }

    public function brightness()
    {
        $request = \Request::json()->all();
        $request['downloadPath'] = $this->downloadFile($request['imageUrl']);
        $magicianObj = new ImageLib($request['downloadPath']);
        $imageEditorBrightness = intval($request['imageEditorBrightness']);
        $imageEditorBrightness = $imageEditorBrightness > 100 ? 100 : $imageEditorBrightness;
        $imageEditorBrightness = $imageEditorBrightness < - 100 ? - 100 : $imageEditorBrightness;
        $magicianObj->brightnessImage(intval($request['imageEditorBrightness']));
        $magicianObj->saveImage($request['downloadPath'], 100);
        $request['uploadRs'] = uploadImageFilesUseApiFromPath($request['downloadPath']);
        unlink($request['downloadPath']);
        return response()->json($request);
    }

    public function url2base64()
    {
        $request = \Request::json()->all();
        $result = '';
        $url = $request['url'];
        if(hasValue($url)){
            $urlParts = pathinfo($url);
            $extension = $urlParts['extension'];
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            $response = curl_exec($ch);
            curl_close($ch);
            $result = 'data:image/' . $extension . ';base64,' . base64_encode($response);
        }

        return $result;
    }

    public function dataUrl2image(){
        $request = \Request::json()->all();
        $result = '';
        $dataURL = $request['dataURL'];
        if(hasValue($dataURL)){
            $type = '';
            if (preg_match('/^data:image\/(\w+);base64,/', $dataURL, $type)) {
                $dataURL = substr($dataURL, strpos($dataURL, ',') + 1);
                $type = strtolower($type[1]); // jpg, png, gif
            
                if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
                    throw new \Exception('invalid image type');
                }
            
                $dataURL = base64_decode($dataURL);
            
                if ($dataURL === false) {
                    throw new \Exception('base64_decode failed');
                }
            } else {
                throw new \Exception('did not match data URI with image data');
            }
            
            file_put_contents("tmp_img.{$type}", $dataURL);
            $result = uploadImageFilesUseApiFromPath("tmp_img.{$type}");
            unlink("tmp_img.{$type}");
        }
        return $result;
    }
}
