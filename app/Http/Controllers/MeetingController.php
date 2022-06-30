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
use Carbon\Carbon;
use Illuminate\Support\Facades\Response;
use App\Http\Services\DealService;
use App\Repositories\API\RepositoriesFactory;
use App\Repositories\API\LeadRepository;
use App\Repositories\API\CommonsRepository;

class MeetingController extends BaseController
{
    public function __construct()
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        parent::__construct();
    }

    public function index()
    {
        $status = get_json('get-meeting-status')->data;
        return View::make('meeting.index',['status'=>$status]);
    }

    public function export($page,$dataPost){
        return post_json_export("deal/meeting/export-list/" . $page . "/10", $dataPost);
    }

    public function store()
    {
        $requestData = \Request::input();
        $page = get_current_page($requestData);

        $searchKeywords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $postData = array(
            "sorts" => [
                array(
                    "columnName" => $sortColumn,
                    "value" => $sortType
                )]
        );
        $postData['filters'] = null;

        if (!empty($requestData['range'])) {
            $postData['filters'] = [
                'ranges' => [
                    [
                        'columnName' => 'reminderDate',
                        'from' => (float)explode('-', $requestData['range'])[0],
                        'to' => (float)explode('-', $requestData['range'])[1]
                    ]
                ],

            ];
        }

        if (isset($requestData['transaction'])) {
            $postData['filters']['columns'][] = [
                "columnName" => 'tcId',
                "value" => [$requestData['transaction']]
            ];
        }

        if (isset($requestData['status'])) {
            $status = $requestData['status'];
            $postData['filters']['columns'][] = [
                "columnName" => 'statusId',
                "value" => [$status]
            ];
        }

        if (!empty($requestData['listingTypeId'])) {
            $listingTypeId = $requestData['listingTypeId'];
            $postData['filters']['columns'][] = [
                "columnName" => 'listingTypeId',
                "value" => [$listingTypeId]
            ];
        }

        if (!empty($requestData['propertyTypeId'])) {
            $propertyTypeId = $requestData['propertyTypeId'];
            $postData['filters']['columns'][] = [
                "columnName" => 'propertyTypeId',
                "value" => [$propertyTypeId]
            ];
        }

        $postData["filters"]["searchKeyword"] = (strlen($searchKeywords) > 0 ? $searchKeywords : null);
//        return response()->json($postData);
        $resp = post_json("deal/meeting/get-list/" . $page . "/10", $postData);
        if ($resp->result) {
            $data = $resp->data;
            $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

            $viewData = array(
                'draw' => $draw,
                'recordsTotal' => $data->totalItems,
                'recordsFiltered' => $data->totalItems,
                'data' => $data->list,
                'postData' => $postData,
                'api' => "deal/meeting/get-list/" . $page . "/10",
                'resp' => $resp
            );
            if(isset($requestData['download'])){
                $viewData['downloadj'] = $this->export($page,$postData);
            }
        } else {
            $viewData = array(
                'postData' => $postData,
                'api' => "deal/meeting/get-list/" . $page . "/10",
                'resp' => $resp
            );
        }

        return response()->json($viewData);
    }
}