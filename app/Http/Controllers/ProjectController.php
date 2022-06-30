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
class ProjectController extends BaseController
{    
    public function __construct()
    {
        parent::__construct();
        View::share('propertyTypeList', get_json(GET_PROPERTY_TYPE_LIST));
    }

    public function projectList() {
        $data['title'] = "Danh sách dự án";
        $data['projectList'] = get_json(GET_PROJECT);
        return view('project/project-list')->with($data);

    }
     
    public function projectCreate() {     
        
        $data['page_title'] = "Tạo project";
        $data['brokerageList'] = get_json(GET_BROKERAGE_LIST)->data;
        $data['districts'] = get_json(GET_DISTRICTS . "/1");
        $data['developerList'] = get_json(GET_DEVELOPER)->data;
        // dd(get_json(GET_DEVELOPER));
        //$data['amenitiesList'] = get_json(GET_AMENITIES_PROJECT);
        $data['page_type'] = "CREATE";
        return view('project/project-detail')->with($data);
    }
    public function projectEdit($projectId) {     
        //$data['projectList'] = get_json(GET_PROJECT)->data;
        $data['page_title'] = "Edit project";
        $data['projectDetail'] = get_json(GET_DETAIL_PROJECT.'/'.$projectId)->data;
        $data['districts'] = get_json(GET_DISTRICTS . "/1");
        $data['brokerageList'] = get_json(GET_BROKERAGE_LIST)->data;
        $data['developerList'] = get_json(GET_DEVELOPER)->data;
        //$data['amenitiesList'] = get_json(GET_AMENITIES_PROJECT);
        $data['page_type'] = "EDIT";
        // dd($data['projectDetail']);
        return view('project/project-detail')->with($data);
    }

    public function createProject(Request $request) {
        $data = $request->json()->all();
        if (!empty($data['projectName'])) {
            $data['projectName'] = htmlspecialchars($data['projectName'], ENT_QUOTES);
        }

        $response = post_json(CREATE_PROJECT, $data);
        return json_encode($response);
    }
    public function editProject(Request $request) {
        $data = $request->json()->all();
        if (!empty($data['projectName'])) {
            $data['projectName'] = htmlspecialchars($data['projectName'], ENT_QUOTES);
        }

        $response = post_json(UPDATE_PROJECT, $data);
        return json_encode($response);
    }

    public function developerList() {
        $data['title'] = "Danh sách nhà đầu tư";
        // var_dump(get_json(DEVELOPPER_LIST));
        // exit();
        $data['developerList'] = get_json(DEVELOPPER_LIST);

        return view('project/developer-list')->with($data);
    }

    public function developerCreate() {
        $data['title'] = "Tạo nhà đầu tư";
        return view('project/developer-page')->with($data);
    }

    public function developerEdit($developerId) {
        // var_dump($developerId);
        // exit();
        $data['title'] = "Sửa nhà đầu tư";
        $data['developer'] = get_json(DEVELOPPER."/".$developerId);
        return view('project/developer-page')->with($data);
    }

    public function imageProjectUploader(Request $request) {
        $image = Input::file('file_data');
        $fileId = md5($image->getClientSize().time()) . '_image';

        $filename  = $fileId.'.' . $image->getClientOriginalExtension();

        $img = Image::make($image->getRealPath())
            ->save(UPLOAD_PATH.'images/' . $filename)
            ->resize(700, 525)->save(UPLOAD_PATH.'thumbnail_for_gridview/' . $filename)
            ->resize(500, 375)->save(UPLOAD_PATH.'thumbnail_for_similar/' . $filename)
            ->resize(300, 225)->save(UPLOAD_PATH.'thumbnail_for_mapview/' . $filename);
        $data["initialPreview"] = array("<img src='".UPLOAD_URL."images/".$filename."' class='file-preview-image' fileid='". $fileId."' alt='".$filename."' title='".$filename."'>");
        $data["initialPreviewConfig"] = array(
            array("caption" => "", "key"=> $filename)
        );  
        return json_encode($data);
}
public function imageProjectRemover(Request $request) {
    $filename = $request->get("key");
    if(file_exists(UPLOAD_PATH.'images/' . $filename)) {
        unlink(UPLOAD_PATH.'images/' . $filename);
    }
    //if(file_exists(UPLOAD_PATH.'thumbnail_for_gridview/' . $filename)) {
       // unlink(UPLOAD_PATH.'thumbnail_for_gridview/' . $filename);
   // }
    //if(file_exists(UPLOAD_PATH.'thumbnail_for_similar/' . $filename)) {
        //unlink(UPLOAD_PATH.'thumbnail_for_similar/' . $filename);
    //}
    //if(file_exists(UPLOAD_PATH.'thumbnail_for_mapview/' . $filename)) {
       // unlink(UPLOAD_PATH.'thumbnail_for_mapview/' . $filename);
   // }
    $data = array();
    return json_encode($data);
}


public function imageDeveloperUploader(Request $request) {

        $image = Input::file('file_data');
        $fileId = md5($image->getClientSize().time()) . '_image';
        // var_dump($fileId);
        // exit();
        $filename  = $fileId.'.' . $image->getClientOriginalExtension();

        $img = Image::make($image->getRealPath())
            ->save(UPLOAD_PATH.'images/' . $filename);
            // ->resize(700, 525)->save(UPLOAD_PATH.'thumbnail_for_gridview/' . $filename)
            // ->resize(500, 375)->save(UPLOAD_PATH.'thumbnail_for_similar/' . $filename)
            // ->resize(300, 225)->save(UPLOAD_PATH.'thumbnail_for_mapview/' . $filename);
        $data["initialPreview"] = array("<img src='".UPLOAD_URL."images/".$filename."' class='file-preview-image' fileid='". $fileId."' alt='".$filename."' title='".$filename."'>");
        $data["initialPreviewConfig"] = array(
            array("caption" => "", "key"=> $filename)
        );  
        return json_encode($data);
}
public function imageDeveloperRemover(Request $request) {
    $filename = $request->get("key");
    if(file_exists(UPLOAD_PATH.'images/' . $filename)) {
        unlink(UPLOAD_PATH.'images/' . $filename);
    }
    // if(file_exists(UPLOAD_PATH.'thumbnail_for_gridview/' . $filename)) {
    //     unlink(UPLOAD_PATH.'thumbnail_for_gridview/' . $filename);
    // }
    // if(file_exists(UPLOAD_PATH.'thumbnail_for_similar/' . $filename)) {
    //     unlink(UPLOAD_PATH.'thumbnail_for_similar/' . $filename);
    // }
    // if(file_exists(UPLOAD_PATH.'thumbnail_for_mapview/' . $filename)) {
    //     unlink(UPLOAD_PATH.'thumbnail_for_mapview/' . $filename);
    // }
    $data = array();
    return json_encode($data);
}

    public function developerPost(Request $request) {
        $data = $request->json()->all();
        $response = post_json(DEVELOPPER, $data);
        return json_encode($response);
    }
    public function getProjectList(){
        $result = get_json(GET_PROJECT);
        return json_encode($result);
    }
    public function getProjectListByDistrict(Request $request) {
        $params = $request->only(['cityId', 'districtId']);
        $params = [
            'districtId' => isset($params['districtId']) ? (int)$params['districtId'] : null,
            'cityId' => isset($params['cityId']) ? (int)$params['cityId'] : null,
        ];
        $response = post_json(GET_PROJECT, $params);
        return json_encode($response);
    }

}
