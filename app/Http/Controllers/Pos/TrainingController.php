<?php

namespace App\Http\Controllers\Pos;

use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\BaseController;
use App\Http\Controllers\ZoneController as Zone;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;
use Validator;

class TrainingController extends CommonPosController
{
    private $API_LIST = [
        ];
    public function __construct()
    {
        parent::__construct();

    }

    public function index(){
        $dataView = [];
        $listStatus = get_json(\Config::get('apis.training.getStatus'))->data;
        if(!empty($listStatus)){
            foreach ($listStatus as $itemStatus){
                if($itemStatus->type==2){
                    $dataView['list_status'] =  $itemStatus->list;
                    break;
                }
            }
        }
        //@TOTO: Get from API
        $dataView['list_center'] = get_json("transaction-center")->data;
        return view("pos.training.index",$dataView);
    }

    public function getTrainingList(){
        $requestData = \Request::all();
        $numberPages = $this->getNumberPages($requestData);
        $postData = [
            "sort"=> [
                "columnName"=>"createdDate",
                "value"=>"desc"
            ],
            "statusId"=>null,
            "contractStatus"=>null,
            "tcId"=>null,
            "fromDate"=>null,
            "toDate"=>null,
            "courseIdList"=>null,
        ];
        if(isset($requestData['order'])) {
            foreach ($requestData['order'] as $key => $item) {
                /* Only order 1 columns by API */
                $postData['sort'] = [
                    "columnName" => $requestData['columns'][$item['column']]['data'],
                    "value" => $item['dir']
                ];
            }
        }
        // Rewrite filter every column to format avirable type
        $postData['statusId'] = !empty($requestData['statusId']) && $requestData['statusId'] > -1 ? (int) $requestData['statusId']: null;
        $postData['contractStatus'] = !empty($requestData['contractStatus']) && $requestData['contractStatus'] > -1 ? (int) $requestData['contractStatus']: null;
        $postData['tcId'] = isset($requestData['tcId']) && $requestData['tcId'] > -1 ? (int) $requestData['tcId']: null;
        $postData['fromDate'] = !empty($requestData['fromDate']) && $requestData['fromDate'] > -1 ? (int) $requestData['fromDate']: null;
        $postData['toDate'] = !empty($requestData['toDate']) && $requestData['toDate'] > -1 ? (int) $requestData['toDate']: null;
        $postData['courseIdList'] = !empty($requestData['courseIdList']) && $requestData['courseIdList'] > -1 ? (int) $requestData['courseIdList']: null;

        $response = $this->getResponseServer('POST', sprintf(\Config::get('apis.training.getList'),$numberPages['pages'],$numberPages['items']), $postData );
        $total = isset($response->data->totalItems) ? $response->data->totalItems : 0;
        $dataResponse = isset($response->data->list) ? $response->data->list : [];
        $response->recordsTotal = $total;
        $response->recordsFiltered = $total;
        $response->data = $dataResponse;
        return response()->json($response);
    }

    public function getTrainingShortList(){
        $requestData = \Request::all();
        $postData = [
            "keywords"=> !empty($requestData['q']) ? $requestData['q']: '',
            "statusId"=> !empty($requestData['statusId']) ? $requestData['statusId'] : null
        ];
        $response = post_json("/tpa/courses/short-list",$postData);
        $json = [];
        if($response->result){

            foreach($response->data as $key => $item){
                $json[] = [
                    'id'=>$item->courseId,
                    'text'=>$item->name
                ];
            }
        }
        return response()->json($json);
    }

    public function getDetail($id){
        $detail = get_json(sprintf("/tpa/courses/%d/",$id))->data;
        return response()->json($detail);
    }

    public function changeStatus(){
        $requestData = \Request::all();
        $postData = [
            "courseId"=> $requestData['courseId'] ? $requestData['courseId'] : null,
            "statusId"=> $requestData['statusId'] ? $requestData['statusId'] : null,
            "reasonId"=> $requestData['reasonId'] ? $requestData['reasonId'] : null,
            "reasonContent"=>$requestData['reasonContent'] ? $requestData['reasonContent'] : null,
        ];
        $result = $this->getResponseServer('POST', "/tpa/courses/status", $postData );
        return response()->json($result);
    }

    public function store(){
        $requestData = \Request::all();
        $postData = [];
        if(\Request::ajax()) {
            $postData['courseId'] = (int) $requestData['courseId'];
            $postData['name'] = $requestData['name'];
            $postData['isRequired'] = (int) isset($requestData['isRequired']) ? (int) $requestData['isRequired']:0;
            $postData['tcId'] = (int) $requestData['tcId'];
            $postData['startedDate'] = $requestData['startedDate'];
            $postData['file'] = $requestData['file'];
            $postData['totalTime'] = (int) $requestData['totalTime'];
            $postData['description'] = $requestData['description'];
            $postData['address'] = $requestData['address'];
        }else{
            $postData['courseId'] = (int) $requestData['id-training'];
            $postData['name'] = $requestData['name-training'];
            $postData['isRequired'] = (int) isset($requestData['require-training']) ? (int) $requestData['require-training']:0;
            $postData['tcId'] = (int) $requestData['center-training'];
            $postData['startedDate'] = 1000*strtotime(preg_replace('/(\d\d)\/(\d\d)\/(\d\d\d\d)/i','$1-$2-$3',$requestData['starte-date-training']));
            $postData['file'] = $requestData['path-file-training'];
            $postData['totalTime'] = (int) $requestData['time-training'];
            $postData['description'] = $requestData['des-training'];
            $postData['address'] = $requestData['address-training'];
        }
        if(empty($postData['courseId'])){
            $response = post_json(\Config::get('apis.training.common'),$postData);
        }else{
            $response = put_json(\Config::get('apis.training.common'),$postData);
        }
        //return response()->json($postData);
        if($response->result)
            return redirect('/pos/training')->with('result',1);
        else
            return redirect('/pos/training')->with('result',0);
    }
    public function updateCourse() {
        $requestData = \Request::all();
        $data = [
            "courseId" => !empty($requestData['courseId']) ? (int) $requestData['courseId'] : null,
            "name" => !empty($requestData['name']) ?  $requestData['name'] : null,
            "isRequired" => !empty($requestData['isRequired']) ? 1 : 0,
            "tcId" =>  isset($requestData['tcId']) && $requestData['tcId'] > -1 ? (int) $requestData['tcId'] : null,
            "startedDate" => !empty($requestData['startedDate']) ? $requestData['startedDate'] : null,
            "file" => !empty($requestData['file']) ? $requestData['file'] : null,
            "totalTime" => !empty($requestData['totalTime']) ? $requestData['totalTime'] : null,
            "description" => !empty($requestData['description']) ? $requestData['description'] : null,
            "address" => !empty($requestData['address']) ? $requestData['address'] : null,
        ];

        if (empty($data['courseId'])) {
            $result = $this->getResponseServer('POST', \Config::get('apis.training.common'), $data);
        } else {
            $result = $this->getResponseServer('PUT', \Config::get('apis.training.common'), $data);
        }
        return response()->json($result);
    }

    public function saveFile(){
            $json = [
                'result'=>false,
                'message'=>'Tải tập tin bị lỗi',
                'data' => null
            ];
            $file = Input::file('file');
            if($file) {
                    $response = uploadFile($file, 'course');
                    if ($response && $response['result']) {
                        $json['data'] = $response['data'];
                        $json['message'] = "Tập tin tải lên thành công";
                        $json['result'] = true;
                    } else {
                        $json['message'] = $response['message'];
                        $json['result'] = false;
                    }
            }
        return response()->json($json);
    }

}
