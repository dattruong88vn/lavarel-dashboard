<?php

namespace App\Http\Controllers;

class DealMeetingController extends BaseController
{

    const DONE_REASONS = [
        "1" => "Khách hàng không đến",
        "2" => "Không liên hệ được",
        "3" => "Hoàn thành"
    ];

    public function __contruct()
    {
    }

    public function list()
    {
        $viewData = [
            "doneReasons" => static::DONE_REASONS,
            "transactionCenters" => get_transaction_centers(),
            "isCrm" => $this->isCrm(),
            "reasonDelete" => $this->reasonDelete(),
            "isCurrentAdmin" => $this->isCurrentAdmin()
        ];
        return view("deal-meeting.list")->with($viewData);
    }

    public function reasonDelete()
    {
        return get_json('deal/get-reason/2')->data;
    }

    public function listData()
    {
        $requestData = \Request::input();
        $postData = [
            "isDone" => FALSE,
            "searchKeywords" => !empty($requestData["search"]) ? $requestData["search"]["value"] : NULL
        ];

        if (!empty($requestData['listingTypeId'])) {
            $postData['dataFilter']['listingTypeId'] = $requestData['listingTypeId'];
        }

        if (!empty($requestData['propertyTypeId'])) {
            $postData['dataFilter']['propertyTypeId'] = $requestData['propertyTypeId'];
        }

        $page = get_current_page($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $response = post_json("/deal/meeting-list/$page/10", $postData);
        if (!empty($response->data->list)) {
            $tcs = get_transaction_centers();
            foreach ($response->data->list as $item) {
                $item->tcName = null;
                foreach ($tcs as $tc) {
                    if ($tc->id == $item->tCId) {
                        $item->tcName = $tc->name;
                        break;
                    }
                }
            }
        };

        $viewData = [
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list,
        ];

        return response()->json($viewData);
    }

    public function done()
    {
        $postData = \Request::json()->all();
        $response = post_json('deal/meeting/done', $postData);
        return response()->json($response);
    }
}
