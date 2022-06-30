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

class BroadcastController extends BaseController
{

    function __construct()
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        parent::__construct();
    }

    function store($type = 'deal')
    {
        $requestData = \Request::input();
        if ($requestData['type']) {
            $type = $requestData['type'];
        }
        unset($requestData['type']);
        $data = post_json($type . '/request/broadcast/' . $requestData['id'], $requestData);

        return response()->json(['api' => $type . '/request/broadcast/' . $requestData['id'], 'response' => $data, 'dataPost' => $requestData]);
    }

    function index()
    {
        $districtList = get_json(GET_DISTRICT_LIST . "/" . 1)->data;
        $viewData['districts'] = $districtList;

        $postData['searchKey'] = null;
        $res = post_json('/request/broadcasted', $postData);
        //        return response()->json($postData);
        // $resDetail = get_json('/request/broadcasted/3/responses/1/100');
        // return response()->json(['res'=>$resDetail,'api'=>'/request/broadcasted']); /request/broadcast/listing/status/list
        if ($res->result) {
            $viewData['list'] = array();
            foreach ($res->data as $item) {
                $checktype = !empty($item->dealId) ? $item->dealId : $item->leadId;
                if (empty($viewData['list'][$checktype]))
                    $viewData['list'][$checktype] = array();
                array_push($viewData['list'][$checktype], $item);
            }
            // Get list status
            $statusLists = get_json('/request/broadcast/listing/status/list')->data;
            $filterStatus = [23, 1, 27, 28, 29, 3, 7, 5, 6];
            $statusListsGotFilter = [];
            foreach ($filterStatus as $value) {
                foreach ($statusLists as $v) {
                    if ($v->id == $value) {
                        $statusListsGotFilter[] = $v;
                    }
                }
            }
            $viewData['list_status'] = $statusListsGotFilter;
            return view('broadcast.index')->with($viewData);
        } else {
            return response()->json(['res' => $res, 'api' => '/request/broadcasted']);
        }
    }

    function searchBroadcast()
    {
        $requestData = \Request::input();
        $postData['searchKey'] = $requestData['searchKey'];
        $res = post_json('/request/broadcasted', $postData);
        //return response()->json($res);
        if ($res->result) {
            //    		$viewData['list'] = $res->data;
            $viewData['list'] = array();
            foreach ($res->data as $item) {
                $checktype = !empty($item->dealId) ? $item->dealId : $item->leadId;
                if (empty($viewData['list'][$checktype]))
                    $viewData['list'][$checktype] = array();
                array_push($viewData['list'][$checktype], $item);
            }
            //            return response()->json($viewData);
            $returnHTML = view('broadcast.left')->with($viewData)->render();
            return response()->json($returnHTML);
        } else {
            return response()->json(['res' => $res, 'api' => '/request/broadcasted']);
        }
    }

    function filterBroadcast()
    {
        $requestData = \Request::input();
        $postData['filter'] = $requestData['filter'];
        //        return response()->json($postData);
        $resDetail = post_json('/request/broadcasted/' . $requestData['id'] . '/responses/' . $requestData['page'] . '/2', $postData);
        //        return response()->json($resDetail);
        $viewData['detail'] = $resDetail->data->list;
        //return response()->json($viewData);
        $returnHTML = view('broadcast.right')->with($viewData)->render();
        return response()->json($returnHTML);
    }

    function getBroadcastDetail()
    {
        $postData = array();
        $requestData = \Request::input();
        $postData['sort'][] = [
            'columnName' => 'br.createdDate',
            'value'      => 'desc'

        ];
        //return response()->json($requestData);
        $resDetail = post_json('/request/broadcasted/' . $requestData['id'] . '/responses/' . $requestData['page'] . '/2', $postData);
        $viewData['detail'] = $resDetail->data->list;
        //        return response()->json($viewData['detail']);
        $returnHTML = view('broadcast.right')->with($viewData)->render();
        return response()->json($returnHTML);
    }

    function updateBroadcastStatus()
    {
        $requestData = \Request::input();
        $result = get_json('request/broadcasted/property/' . $requestData['broadcastResponseId'] . '/bookmark/' . $requestData['status']);
        return response()->json($result);
    }

    function updateBroadcastNote()
    {
        $requestData = \Request::input();
        $dataPost['note'] = $requestData['note'];
        $data = post_json('request/broadcasted/property/' . $requestData['broadcastResponseId'] . '/note', $dataPost);
        return response()->json(['api' => 'request/broadcasted/property/' . $requestData['broadcastResponseId'] . '/note', 'response' => $data, 'dataPost' => $dataPost]);
    }
}
