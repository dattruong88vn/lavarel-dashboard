<?php

namespace App\Http\Controllers\Pos;

use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\BaseController;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cookie;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;

class PrescreenerController extends CommonPosController
{

    private $apiList = [
        'loadNotificationCurrentUser' => 'notification/current-user',
        'updateNotification' => 'notification/read',
        'searchPhoneHighlight' => 'prescreen/listings/highline',
        'diyUpdateList' => 'prescreen/listings/updated-diy-list',
        'deleteSubPhone' => 'prescreen/listings/delete-sub-phone',
        'changePhone' => 'prescreen/listings/reverse-phone-number'
    ];

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        return view('pos.prescreener.index');
    }

    public function detail($id)
    {
        if (!is_numeric($id) || $id == 0) {
            dd("ID không đúng");
        }
        // get info detail
        $response = get_json(sprintf(\Config::get('apis.prescreener.list') . "/%d", $id));

        if ($response->result && !empty($response->data)) {
            // revert encoded special char for title and metatag title
            $response->data->title = htmlspecialchars_decode($response->data->title, ENT_QUOTES);

            $jsDetailData = \GuzzleHttp\json_encode($response->data);

            return view("pos.prescreener.detail", ['jsDetailData' => $jsDetailData, 'page_code' => 'DETAIL']);
        } else {
            dd($response->message);
        }
    }

    public function view($id)
    {
        if (!is_numeric($id) || $id == 0) {
            dd("ID không đúng");
        }
        $response = get_json(sprintf(\Config::get('apis.prescreener.list') . "/%d", $id));
        if ($response->result && !empty($response->data)) {
            $jsDetailData = \GuzzleHttp\json_encode($response->data);
            return view("pos.prescreener.detail", ['jsDetailData' => $jsDetailData, 'page_code' => 'VIEW']);
        } else {
            dd($response->message);
        }
    }

    public function create()
    {
        return view("pos.prescreener.create");
    }


    public function insertListing()
    {
        $requestData = \Request::json()->all();
        if (!empty($requestData['title'])) {
            $requestData['title'] = htmlspecialchars($requestData['title'], ENT_QUOTES);
        }

        $response = post_json(\Config::get('apis.prescreener.create'), $requestData);
        return response()->json($response);
    }

    public function getListingList()
    {
        //todo getListingList
        $requestData = \Request::all();

        $numberItems = $requestData['length'];

        $page = ($requestData['start'] / $numberItems) + 1;

        $requestData['workTypeId'] = isset($requestData['workTypeId']) ? $requestData['workTypeId'] : null;

        $postData = $this->builDataPostList($requestData);

        $response = post_json(sprintf(\Config::get('apis.prescreener.list') . "/%d/%d", $page, $numberItems), $postData);

        $response = ['recordsTotal' => isset($response->data->totalItems) ? $response->data->totalItems : 0, 'recordsFiltered' => isset($response->data->totalItems) ? $response->data->totalItems : 0, 'data' => isset($response->data->list) ? $response->data->list : [], 'postData' => $postData];
        return response()->json($response);
    }
    public function getUpdateDiyList()
    {
        $requestData = \Request::all();

        $numberItems = $requestData['length'];

        $page = ($requestData['start'] / $numberItems) + 1;

        $postData = $this->builDataPostList($requestData);

        $response = post_json(sprintf($this->apiList['diyUpdateList'] . "/%d/%d", $page, $numberItems), $postData);
        $response->requestData = $postData;

        $response = ['recordsTotal' => isset($response->data->totalItems) ? $response->data->totalItems : 0, 'recordsFiltered' => isset($response->data->totalItems) ? $response->data->totalItems : 0, 'data' => isset($response->data->list) ? $response->data->list : [], 'postData' => $postData];

        return response()->json($response);
    }

    public function overview()
    {
        $requestData = \Request::all();

        $dataPost = $this->builDataPostList($requestData);
        $response = post_json(\Config::get('apis.prescreener.overview'), $dataPost);
        $response->requestData = $dataPost;
        return response()->json($response);
    }

    public function sendDiy($id)
    {
        $response = get_json(sprintf(\Config::get('apis.prescreener.send-diy'), $id));

        return response()->json($response);
    }

    public function channelTypes()
    {
        $response = get_json(\Config::get('apis.prescreener.channel-types'));

        return response()->json($response);
    }

    public function channelStatus()
    {
        $response = get_json(\Config::get('apis.prescreener.channel-status'));

        return response()->json($response);
    }

    public function createReminder()
    {
        $requestData = \Request::all();

        $response = post_json(\Config::get('apis.prescreener.createReminder'), $requestData);

        return response()->json($response);
    }

    public function updateListing()
    {
        $requestData = \Request::json()->all();
        if (!empty($requestData['title'])) {
            $requestData['title'] = htmlspecialchars($requestData['title'], ENT_QUOTES);
        }
        $response = post_json(\Config::get('apis.prescreener.updateListing'), $requestData, false, 'PUT');

        return response()->json($response);
    }

    public function getReminder()
    {
        $response = get_json(\Config::get('apis.prescreener.getReminder'));

        return response()->json($response);
    }

    public function closeReminder()
    {
        $requestData = \Request::all();

        $response = get_json(\Config::get('apis.prescreener.closeReminder') . '/' . $requestData['reminderId']);

        return response()->json($response);
    }

    public function cancelListing()
    {
        $requestData = \Request::json()->all();

        $response = get_json(\Config::get('apis.prescreener.cancelListing'), $requestData);

        return response()->json($response);
    }

    public function sendSA()
    {
        $requestData = \Request::json()->all();

        $response = post_json(\Config::get('apis.prescreener.sendSA'), $requestData);

        return response()->json($response);
    }

    public function trackCall()
    {
        $requestData = \Request::json()->all();

        $lsoId = $requestData['lsoId'];

        unset($requestData['lsoId']);

        $response = post_json(\Config::get('apis.prescreener.trackCall') . '/' . $lsoId . '/track-call', $requestData);

        return response()->json($response);
    }

    public function loadNotificationCurrentUser()
    {
        $response = get_json($this->apiList['loadNotificationCurrentUser']);

        return response()->json($response);
    }

    public function updateNotification()
    {
        $requestData = \Request::json()->all();

        $response = get_json($this->apiList['updateNotification'] . '/' . $requestData['mongoId']);

        return response()->json($response);
    }

    public function searchPhoneHighlight()
    {
        $requestData = \Request::json()->all();

        $response = post_json($this->apiList['searchPhoneHighlight'], $requestData);

        $response->requestData = $requestData;

        return response()->json($response);
    }


    public function changePhone()
    {
        $requestData = \Request::json()->all();
        $response = $this->getResponseServer('PUT', $this->apiList['changePhone'], $requestData);
        return response()->json($response);
    }
    public function deleteSubPhone()
    {
        $requestData = \Request::json()->all();
        $response = $this->getResponseServer('PUT', $this->apiList['deleteSubPhone'], $requestData);
        return response()->json($response);
    }
    private function builDataPostList($request)
    {
        $postData = [
            'typeId' => empty($request['typeId']) ? null : intval($request['typeId']),
            'sort' =>  empty($request['sort']) ? null : $request['sort'],
            'workTypeId' => empty($request['workTypeId']) ? null : $request['workTypeId'],
            'statusId' => empty($request['statusId']) ? null : $request['statusId'],
            'phone' => empty($request['phone']) ? null : $request['phone'],
            'notAssigned' => empty($request['notAssigned']) ? null : $request['notAssigned'],
            'assignedToList' => empty($request['assignedToList']) ? null : $request['assignedToList'],
            'id' => empty($request['id']) ? null : $request['id'],
            'sourceId' => empty($request['sourceId']) ? null : $request['sourceId'],
            'tcid' => empty($request['tcid']) ? null : $request['tcid'],
            'name' => empty($request['name']) ? null : $request['name'],
            'address' => empty($request['address']) ? null : $request['address'],
            'fromStatusDate' => empty($request['fromStatusDate']) ? null : intval($request['fromStatusDate']),
            'toStatusDate' => empty($request['toStatusDate']) ? null : intval($request['toStatusDate']),
            'channelTypeId' => empty($request['channelTypeId']) ? null : $request['channelTypeId'],
            'channelTypeChildId' => empty($request['channelTypeChildId']) ? null : $request['channelTypeChildId'],
            'listingTypeId' => isset($request['listingTypeId']) ? (int) $request['listingTypeId'] : null,
            'propertyTypeIds' => !empty($request['propertyTypeIds']) ?  (string) $request['propertyTypeIds'] : null,
            'landCode' => isset($request['landCode']) ? $request['landCode'] : null,
            'mapCode' => isset($request['mapCode']) ? $request['mapCode'] : null,
            'zoneIds' => !empty($request['zoneField']) ? $request['zoneField'] : null,
            'teamIds' => !empty($request['teamField']) ? $request['teamField'] : null,
            'departmentIds' => !empty($request['departmentField']) ? $request['departmentField'] : null,
            'userIds' => !empty($request['memberField']) ? $request['memberField'] : null,
            'districtId' => !empty($request['districtId']) ? $request['districtId'] : null,
            'wardId' => !empty($request['wardId']) ? $request['wardId'] : null,
        ];
        return $postData;
    }

    public function getComments($id){
        $response = get_json("prescreen/listings/$id/comments");
        return response()->json($response);
    }

    // check lat long
    public function validateLatLong()
    {
        $requestData = \Request::json()->all();
        $response = post_json(\Config::get('apis.prescreener.location-validate'), $requestData);
        return response()->json($response);
    }
}
