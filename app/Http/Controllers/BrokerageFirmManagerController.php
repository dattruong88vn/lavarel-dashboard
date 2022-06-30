<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;
class BrokerageFirmManagerController extends Controller
{    
    public function __construct()
    {
        View::share('propertyTypeList', get_json(GET_PROPERTY_TYPE_LIST));
    }

    public function index()
    {
        return $this->show();
    }

    public function show()
    {
        $data['title'] = "Danh sách Brokerage firm";
        $data['results'] = get_json(BROKERAGE_FIRM_LIST);
        return view('brokeragefirm/brokerage-firm-list')->with($data);
    }

    public function brokerageFirmList() {
       

    }
     
    public function create() {     
        return view('brokeragefirm/brokerage-firm-create');
    }

    public function edit($bfId) {  
        $data['result'] = get_json(BROKERAGE_FIRM."/".$bfId);
        return view('brokeragefirm/brokerage-firm-edit')->with($data);
    }

    public function imageBrokerageFirmUploader() {
            $image = Input::file('file_data');
            $fileId = md5($image->getClientSize().time()) . '_image';
            // var_dump($fileId);
            // exit();
            $filename  = $fileId.'.' . $image->getClientOriginalExtension();

            $img = Image::make($image->getRealPath())
                ->save(UPLOAD_PATH.'images/' . $filename);
            $data["initialPreview"] = array("<img src='".UPLOAD_URL."images/".$filename."' class='file-preview-image' fileid='". $fileId."' alt='".$filename."' title='".$filename."'>");
            $data["initialPreviewConfig"] = array(
                array("caption" => "", "key"=> $filename)
            );  
            return json_encode($data);
    }
    public function imageBrokerageFirmRemover() {
        $filename = UPLOAD_PATH.'images/' . \Request::input("key");
        if(file_exists($filename) && is_file($filename)) {
            unlink($filename);
        }
        $data = array();
        return json_encode($data);
    }

    public function postBrokerageFirm() {
        // var_dump(\Request::json()->all());
        // exit();
        $data = \Request::json()->all();
        if($data['bfId'] == null){
            $response = post_json(BROKERAGE_FIRM_POST, $data);
        }else{
            $response = put_json(BROKERAGE_FIRM_POST, $data);
        }
        return json_encode($response);
    }
}


