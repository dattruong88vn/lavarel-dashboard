<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use View;

class NotificationController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function assignedListing() {
        $data = array();
        $oldItemsCount = \Session::get('OLD_ASSIGNED_LISTING_NOTIFICATION');
        $oldItemsCountCreate = \Session::get('OLD_ASSIGNED_LISTING_NOTIFICATION_CREATE');
        if (!isset($oldItemsCount)) {
            $oldItemsCount = 0;
        }
        if (!isset($oldItemsCountCreate)) {
            $oldItemsCountCreate = 0;
        }
        $response = get_json(GET_ASSIGNED_LISTING_NOTIFICATION);
        $newItemsCount = $oldItemsCount;
        $newItemsCountCreate = $oldItemsCountCreate;
        //return response()->json($response);
        if ($response->result == TRUE) {
            $data['items'] = $response->data->reviewList;
            $newItemsCount = 0;
            foreach ($response->data->reviewList as $item) {
                if ($item->isRead == FALSE) {
                    $newItemsCount++;
                }
            }
            $addedItemsCount = $newItemsCount - $oldItemsCount;
            $data['addedItemsCount'] = $addedItemsCount;
            $data['newItemsCount'] = $newItemsCount;

            $data['isNotify'] = ($addedItemsCount > 0) ? TRUE : FALSE;

            $data['itemsCreate'] = $response->data->createList;
            if ($response->data->createList) {
                $newItemsCountCreate = $response->data->createList[0]->remainListing;
            } else {
                $newItemsCountCreate = $oldItemsCountCreate;
            }
            $addedItemsCountCreate = $newItemsCountCreate - $oldItemsCountCreate;
            $data['addedItemsCountCreate'] = $addedItemsCountCreate;
            $data['newItemsCountCreate'] = $newItemsCountCreate;

            $data['isNotifyCreate'] = ($addedItemsCountCreate > 0) ? TRUE : FALSE;
        }
        \Session::put('OLD_ASSIGNED_LISTING_NOTIFICATION', $newItemsCount);
        \Session::put('OLD_ASSIGNED_LISTING_NOTIFICATION_CREATE', $newItemsCountCreate);
        return response()->json($data);
    }

    public function assignedListingClicked() {
        $id = \Request::input('rlistingId');
        $postObject = array(
            "rlistingId" => $id
        );
        //return response()->json($postObject);
        $response = post_json(LISTING_NOTIFICATION_TRACK, $postObject);
        return response()->json($response);
    }

    public function assignedListingCreateClicked() {
        $id = \Request::input('logId');
        $postObject = array(
            "logId" => doubleval($id)
        );

        //return response()->json($postObject);
        $response = post_json(LISTING_NOTIFICATION_TRACK_CREATE, $postObject);
        return response()->json($response);
    }

    public function tmDeal() {
        $response = get_json(TM_DEAL_NOTIFICATION);
        return response()->json($response);
    }

    public function tmDealClicked() {
        $id = \Request::input('dealId');
        $postObject = array(
            "dealId" => $id
        );
        //return response()->json($postObject);
        $response = get_json(SET_TM_DEAL_NOTIFICATION_READ . "/" . $id);
        $response->result=true;
        return response()->json($response);
    }

    public function listingMatchedOrder() {
        $apiUrl = "order/list/listing_match_order";
        $response = get_json($apiUrl);
        return response()->json($response);
    }
    
    public function setRead($id){
        $response = get_json("notification/read/$id");
        return response()->json($response);
    }
    
    public function setShow($id){
        $response = get_json("notification/set-show/$id");
        return response()->json($response);
    }

    public function getUnreadNotification(){
        $response = get_json("notification/notification-not-read");
        return response()->json($response);
    }

    public function setReadRemindTask($id){
        $response = get_json("notification/read-remind-task/$id");
        return response()->json($response);
    }

}
