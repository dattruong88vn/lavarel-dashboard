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

class DocumentsController extends BaseController {

	public function __construct() {
        parent::__construct();
    }

    public function index(){
    	return view('documents.index');
    }

    public function store(){
        $requestData = \Request::input();
        if(!empty($requestData['id'])){
//            return response()->json($requestData);
            $resp = put_json('document/update',$requestData);
            return response()->json($resp);
        }
        return response()->json(post_json('document/create',$requestData));
    }

    public function getList(){
        $requestData = \Request::input();
        // return response()->json($requestData);
        $page = get_current_page($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        // return response()->json($postData);
        $response = get_Json("document/list/$page/10");
        // return response()->json($response);
        $viewData = [
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list,
            // 'postData' => $postData
        ];

        return response()->json($viewData);
    }

    public function delete($id){
        // return response()->json([
        //     "code" => 200,
        //     "result" => true
        // ]);
        $response = delete_json("document/delete/$id");
        return response()->json($response);
    }
}