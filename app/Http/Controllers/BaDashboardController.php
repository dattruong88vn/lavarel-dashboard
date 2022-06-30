<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use function GuzzleHttp\json_decode;

class BaDashboardController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index(Request $request)
    {
        if($request->path() != 'ba-dashboard') {
            $isAccessPermissionPage = false;
            $pageCanBeAccessed = get_json('/ba-dashboard/access');
            for ($i = 0; $i < count($pageCanBeAccessed->data); $i++) {
                if ($pageCanBeAccessed->data[$i]->url == ('/' . $request->path())) {
                    $isAccessPermissionPage = true;
                }
            }
            if (!$isAccessPermissionPage) {
                abort(401);
            }
        }
        return $this->getList();
    }

    function buildDataPost($requestData, $postData)
    {
        if (!empty($requestData['progressQuoIDs'])) {
            $postData["progressQuoIDs"] = [
                df_int($requestData['progressQuoIDs'])
            ];
        }
        if (!empty($requestData['fromDate'])) {
            $postData["fromDate"] = $requestData['fromDate'];
        }
        if (!empty($requestData['toDate'])) {
            $postData["toDate"] = $requestData['toDate'];
        }
        // new update
        if (!empty($requestData['listingTypeId'])) {
            $postData["listingTypeId"] = $requestData['listingTypeId'];
        }
        if (!empty($requestData['propertyTypeId'])) {
            $postData["propertyTypeId"] = $requestData['propertyTypeId'];
        }
        if (!empty($requestData['scoreCardType'])) {
            $postData["scoreCardType"] = $requestData['scoreCardType'];
        }
        if (!empty($requestData['zoneField'])) {
            $postData["zoneIds"] =  [$requestData['zoneField']];
        }
        if (!empty($requestData['teamField'])) {
            $postData["teamIds"] =  [$requestData['teamField']];
        }
        if (!empty($requestData['departmentField'])) {
            $postData["departmentIds"] =  [$requestData['departmentField']];
        }
        if (!empty($requestData['districtId'])) {
            $postData["districtIds"] =  [$requestData['districtId']];
        }
        if (!empty($requestData['wardId'])) {
            $postData["wardIds"] =  [$requestData['wardId']];
        }
        if (!empty($requestData['memberField'])) {
            $postData["assignes"] =  $requestData['memberField'];
        }
        if (!empty($requestData['dealId'])) {
            $postData["dealId"] =  $requestData['dealId'];
        }
        return $postData;
    }

    public function generateFilterDealButton()
    {
        $requestData = \Request::input();
        if (count($requestData) > 0) {
            $dataPost = $this->buildDataPost($requestData, []);
            if (empty($requestData['assignes']) || $requestData['assignes'] == "null") {
                $requestData['assignes'] = null;
            }
            $apiDealButtonsResponse = post_json(GET_DEAL_GROUP_STATUS, (object) $dataPost);
        } else {
            $apiDealButtonsResponse = post_json(GET_DEAL_GROUP_STATUS, (object) ['fromDate' => null, 'toDate' => null]);
        }
        if (in_array($apiDealButtonsResponse->code, [401, 403, 404, 503])) {
            abort($apiDealButtonsResponse->code);
        }
        if (count($requestData) > 0) {
            $viewData['deal_buttons'] = $apiDealButtonsResponse->data;
            $returnHTML = view('shared.group-button-deal')->with($viewData)->render();
            return response()->json($returnHTML);
        } else {
            return $apiDealButtonsResponse->data;
        }
    }

    public function getList()
    {
        $viewData['isGroupAdmin'] = $this->isCurrentAdmin();
        return view('deal.list')->with($viewData);
    }
}
