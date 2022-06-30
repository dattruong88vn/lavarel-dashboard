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

class TransactionManagerController extends BaseController {

//  user: cs01 (Customer Service), tm01 (Transaction manager), ls01 (Listing Service), bd01(Business Development), as01 (Agent support)
//  pass 123

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        return $this->show();
    }

    public function show() {
        $data['transaction_status_list'] = get_json(GET_TRANSACTION_STATUS_LIST)->data;

        $response = get_json(GET_TRANSACTION_LIST);
        if (empty($response->result))
            die($response->message);

        $data['results'] = $response;

//        $data['html_agent_list'] = $this->getHtmlAgentList(-1, -1, true);
        if (havePermission('assign_agent'))
            $data['html_agent_sale_list'] = $this->getHtmlAgentSaleList(true);
        if (havePermission('assign_staff_to_transaction'))
            $data['html_staff_list'] = $this->getHtmlStaffList(true);

        return view('transaction-manager.show')->with($data);
    }

    public function detail($transactionId) {

        $data['transaction_status_list'] = get_json(GET_TRANSACTION_STATUS_LIST)->data;

//        $data['html_agent_list'] = $this->getHtmlAgentList(-1, -1, true);
        if (havePermission('assign_agent'))
            $data['html_agent_sale_list'] = $this->getHtmlAgentSaleList(true);
        if (havePermission('assign_staff_to_transaction'))
            $data['html_staff_list'] = $this->getHtmlStaffList(true);
        if (\Request::isMethod('post')) {
            $post['transactionId'] = (int) \Request::input('transactionId');
            $ids = array();
            foreach (\Request::input('rListingIds') as $listingId)
                $ids[] = (int) $listingId;
            $post['rlistingIds'] = $ids;

//            echo json_encode($post);
            $response = post_json(TRANSACTION_ADD_LISTING, $post);
            if (!empty($response->result)) {
                Session::flash('succ_msg', 'Đã thêm listing vào transaction thành công');
            } else {
                Session::flash('err_msg', $response->message);
            }
            return redirect('transaction-manager/detail/' . $post['transactionId']);
        }

        $response = get_json(GET_TRANSACTION_DETAIL . "/" . $transactionId);
        if (empty($response->result))
            die($response->message);

        $data['transactionDetail'] = $response->data;
        $requestId = $response->data->requestId;

        // -- Get list listings of transaction  --
        $response = get_json(GET_TRANSACTION_DETAIL_LISTING . "/" . $transactionId);

        if (empty($response->result))
            die($response->message);

        $data['transactionListing'] = $response->data;
        $data['districtList'] = get_json(GET_DISTRICT_LIST . "/1");
        $data['allListingTypeInfo'] = getAllListingTypeInfo();

        // -- Get request info of this transaction  --
        $data['requestData'] = array();
        if (!empty($requestId)) {

            $response = get_json(GET_REQUEST_DETAIL . '/' . $requestId);
            $requestData = objectToArray($response->data);
            $data['requestData'] = $requestData;

            // -- Create All Listing Info --
            if (!empty($requestData['listingTypeId'])) {
                $propertyTypeList = array();
                $purposeTypeList = array();
                $allListingTypeInfo = $data['allListingTypeInfo'];
                foreach ($allListingTypeInfo as $listing) {
                    if ($listing['id'] == $requestData['listingTypeId']) {
                        $purposeTypeList = $listing['list'];
                        foreach ($listing['list'] as $purpose)
                            if ($purpose['id'] == $requestData['purposeId'])
                                $propertyTypeList = $purpose['list'];
                    }
                }
                $data['arrPropertyTypeList'] = $propertyTypeList;
                $data['purposeTypeList'] = $purposeTypeList;
            }
        }
        return view('transaction-manager.detail', $data);
    }

    public function delete($transactionId) {
        $response = delete_json(GET_TRANSACTION_DETAIL . '/' . $transactionId);
        return json_encode($response);
    }

    public function history($transactionId) {
        $response = get_json(TRANSACTION_LIST_LOG_SEARCH . "/" . $transactionId);
        if (empty($response->result))
            die($response->message);

        $data['historyList'] = $response->data;
        return view('transaction-manager.transaction-history', $data);
    }

    public function historyDetail($historyId) {
        $response = get_json(TRANSACTION_DETAIL_LOG_SEARCH . "/" . $historyId);
        if (empty($response->result))
            die($response->message);

        $data['allListingTypeInfo'] = getAllListingTypeInfo();
        $data['districtList'] = get_json(GET_DISTRICT_LIST . "/1");

        $requestData = objectToArray($response->data);
        $data['requestData'] = $requestData;

        // -- Create All Listing Info --
        if (!empty($requestData['listingTypeId'])) {
            $propertyTypeList = array();
            $purposeTypeList = array();
            $allListingTypeInfo = $data['allListingTypeInfo'];
            foreach ($allListingTypeInfo as $listing) {
                if ($listing['id'] == $requestData['listingTypeId']) {
                    $purposeTypeList = $listing['list'];
                    foreach ($listing['list'] as $purpose)
                        if ($purpose['id'] == $requestData['purposeId'])
                            $propertyTypeList = $purpose['list'];
                }
            }
            $data['arrPropertyTypeList'] = $propertyTypeList;
            $data['purposeTypeList'] = $purposeTypeList;
        }

        return view('transaction-manager.transaction-history-detail', $data);
    }

    public function noticedTransaction() {
        $response = get_json(GET_TRANSACTION_NOTICED);
        if (empty($response->result))
            die($response->message);

        $data['districtList'] = get_json(GET_DISTRICT_LIST . "/1");
        $allListingTypeInfo = getAllListingTypeInfo();
        $data['allListingTypeInfo'] = $allListingTypeInfo;
        $data['noticedList'] = $response->data;

        return view('transaction-manager.noticed-transaction', $data);
    }

    public function noticedTransactionHistory($transactionId) {
        $response = get_json(GET_TRANSACTION_NOTICED_LOGS . "/" . $transactionId);
        if (empty($response->result))
            die($response->message);
        $data['saleAgent'] = $response->data->saleAgent;
        $data['listingAgent'] = $response->data->listingAgent;

        return view('transaction-manager.noticed-transaction-history', $data);
    }

    public function noticedTransactionLog() {
        if (\Request::isMethod('post')) {
            $post['transactionId'] = \Request::input('transactionId');
            $post['dateTime'] = \Request::input('dateTime');
            $response = post_json(GET_TRANSACTION_NOTICED_LOG, $post);
            return json_encode($response);
        }
        exit();
    }

    public function sentListings($transactionId) {
        $data['results'] = get_json(GET_TRANSACTION_DETAIL_LISTING . "/" . $transactionId);
        return view('transaction-manager.sent-listings')->with($data);
    }

    public function changeAgent($transactionId, $agentId) {
        $response = get_json(TRANSACTION_CHANGE_AGENT . '/' . $transactionId . '/' . $agentId);
        return json_encode($response);
    }

    public function assignStaff($transactionId, $staffId) {
        $response = get_json(TRANSACTION_ASSIGN_TO_STAFF . '/' . $transactionId . '/' . $staffId);
        return json_encode($response);
    }

    public function changeStatus($transactionId, $statusId) {
        $response = get_json(TRANSACTION_CHANGE_STATUS . '/' . $transactionId . '/' . $statusId);
        return json_encode($response);
    }

    //Comment out function of A.Duc
    /* public function sendTransaction($to_user, $transactionId)
      {
      if($to_user == 'listing-agent')
      {
      $response = get_json(SEND_TRANSACTION_FOR_LISTING_AGENT.'/'.$transactionId);
      return json_encode($response);
      }
      elseif ($to_user == 'sale-agent')
      {
      $response = get_json(SEND_TRANSACTION_FOR_SALE_AGENT.'/'.$transactionId);
      return json_encode($response);
      }
      exit();
      } */

    public function sendTransaction() {
        if (\Request::isMethod('post')) {
            $transactionId = \Request::input('transactionId');
            $type = \Request::input('type');
            $request_ = \Request::input('request');
            $response = post_json(SEND_TRANSACTION . "/" . $transactionId . "/" . $type, $request_);
            return json_encode($response);
        }
        exit();
    }

    public function actionNote($transactionId = null) {
        if (\Request::isMethod('post') && !empty($transactionId)) {
            $note_action = \Request::input('note_action');
            $note_id = (int) \Request::input('note_id');
            $note_content = \Request::input('note_content');

            if ($note_action == 'add') {
                $post['transactionId'] = $transactionId;
                $post['note'] = $note_content;
                $response = post_json(TRANSACTION_NOTE_UPDATE, $post);
                return json_encode($response);
            } elseif ($note_action == 'edit') {
                $post['id'] = $note_id;
                $post['transactionId'] = $transactionId;
                $post['note'] = $note_content;
                $response = put_json(TRANSACTION_NOTE_UPDATE, $post);
                return json_encode($response);
            } elseif ($note_action == 'delete') {
                $response = delete_json(TRANSACTION_NOTE_UPDATE . '/' . $note_id);
                return json_encode($response);
            }
        }

        // -- Get transaction note list --
        $data['noteList'] = get_json(GET_TRANSACTION_NOTE_LIST . '/' . $transactionId)->data;
        $data['transactionId'] = $transactionId;
        return view('transaction-manager._list_transaction_note')->with($data);
    }

    public function getTcList() {
        $response = post_json('/tc/list/1/1000', ["searchKeyword"=>null]);
        return response()->json($response);
    }

}
