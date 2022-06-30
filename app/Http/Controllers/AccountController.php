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

class AccountController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function searchers() {
        return view("account.searchers");
    }

    public function searchersData() {

        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $searchKeywords = $requestData['search']['value'];
        $post_data = array(
            "term" => (strlen($searchKeywords) > 0 ? $searchKeywords : null)
        );
        $data = post_json("agent/searcher/$page/32", $post_data)->data;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }

    public function searcherToAgent($id) {
        $response = get_json("agent/searcher-to-agent/$id");
        return response()->json($response);
    }

    /**
     * get user accounts by type
     * 
     * @param integer $id typeId
     */
    public function getListJson($id) {
        
        if(isset($_GET['active'])){
            // -1 lay het, 2 tai khoan dang active, 3 tai khoan bi khoa
            $response = get_json("user/account/list/$id/-1");
        }else{
            $response = get_json("user/account/list/$id");
        }
        return response()->json($response);
    }

}
