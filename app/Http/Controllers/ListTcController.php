<?php

namespace App\Http\Controllers;

use App\Task;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;

class ListTcController extends BaseController {

    private $API = [
        'list-tc' => '/tc/list/%d/%d',
        'save-tc' => '/tc',
        'detail-tc' => '/tc/detail'
    ];

	public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }

    public function index(){
    	$viewData = [];
        $listDepartments = get_json(GET_ALL_DEPARTMENTS);
        if($listDepartments->code == 200)
            $viewData['listDepartments'] = $listDepartments->data;
        $districts = get_json(GET_DISTRICTS_BY_TC . '/1');
        if($districts->code == 200)
            $viewData['districts'] = $districts->data;
        
        $allDistricts = get_json(GET_DISTRICTS . '/1');
        if($allDistricts->code == 200)
            $viewData['allDistricts'] = $allDistricts->data;
        
        return view('list-tc.index')->with($viewData);
    }
    
    public function getAllTcs(){
        $requestData = \Request::input();
        if(isset($requestData['filters'])){
            $filters = json_decode($requestData['filters']);
            if(isset($filters->zoneIds)){
                $postData['zoneIds'] = $filters->zoneIds;
            }
            if(isset($filters->wardIds)){
                $postData['wardIds'] = $filters->wardIds;
            }
            if(isset($filters->districtIds)){
                $postData['districtIds'] = $filters->districtIds;
            }
        } else {
            $postData['zoneIds'] = null;
            $postData['wardIds'] = null;
            $postData['districtIds'] = null;
        }
        //
        $page = get_current_page($requestData);
           
        $keyword = $requestData['search']['value'];
        if(!empty($keyword)){
            $postData['keyword'] = $keyword;
        } else{
            $postData['keyword'] = null;
        }
        $limit = $requestData['length'];
        
        $postUrl = "/tc/list/".$page.'/'.$limit;
        $response = post_json($postUrl, $postData)->data;
        $viewData = array(
            'recordsTotal' => $response->totalItems,
            'recordsFiltered' => $response->totalItems,
            'data' => $response->list
        );
        return response()->json($viewData);
    }

    public function saveInfoTc() {
        $postData = \Request::json()->all();
        if (!isset($postData['tcId']) || empty($postData['tcId']) || $postData['tcId'] == ''){
            unset($postData['tcId']);
            $response = post_json($this->API['save-tc'], $postData);
        } else {
            $response = put_json($this->API['save-tc'], $postData);
        }
        return response()->json($response);
    }

    public function getDetailTc($id)
    {
        $response = get_json($this->API['detail-tc'] . "/" . $id);
        return response()->json($response);
    }
}