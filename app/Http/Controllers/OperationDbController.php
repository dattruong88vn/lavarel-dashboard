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
use Illuminate\Support\Facades\Log;

class OperationDbController extends BaseController
{

//  user: cs01 (Customer Service), tm01 (Transaction manager), ls01 (Listing Service), bd01(Business Development), as01 (Agent support)
//  pass 123

    public function __construct()
    {
        parent::__construct();
    }

    
    public function rAccountManager(Request $request) {
        $data['accountList'] = get_json(GET_ACCOUNT_LIST)->data;
        return view('operation.r-accounts')->with($data);
    }
    // Functions for LS team
    public function listingManagement(Request $request) {
        return view('operation.ls-listing');
    }

    private function getHtmlAgentList($listingTypeId = -1, $purposeId = -1, $chooseOnlyOne = true)
    {
        // -- Can not run javascript tags --
        $data['agentList'] = get_json(GET_AGENT_LIST."/".$listingTypeId."/".$purposeId."/-1")->data;
        $data['chooseOnlyOne'] = $chooseOnlyOne;
        $view = View::make('operation.sub-items.html-agent-list', $data);
        return $view->render();
    }

    public function assignListingForAgent()
    {
        if (\Request::isMethod('post'))
        {
            $cur_request_id = df_int(\Request::input('requestId'));
            $listAgent = explode(',', substr(\Request::input('list_agent_id'), 0, strlen(\Request::input('list_agent_id'))-1));

            $post = array();
            $response = null;
            if(\Request::input('choose_type') == 1) // -- Choose one --
            {
                $post['requestId'] = $cur_request_id;
                $post['agentId'] = (int) $listAgent[0];
//                $post['rlistingIds'] = unserialize(\Request::input('str_listing_id'));
                foreach (\Request::input('rListingIds') as $num)
                    $post['rlistingIds'][] = df_int($num);

                $response = post_json(ASSIGN_AGENT_LISTING, $post);
            } else // -- Choose multi --
            {
                foreach ($listAgent as $agent)
                    $post[] = array('requestId' => $cur_request_id, 'agentId' => (int)$agent);

                $response = post_json(ASSIGN_MULTI_AGENT_LISTING, $post);
            }

//            echo json_encode($post);
//            exit();

            if(!empty($response->result)) {
                Session::flash('succ_msg', 'Đã assign agent cho request thành công');
            } else
            {
                Session::flash('err_msg', $response->message);
            }

        }
        return redirect('customer-service/quan-ly-requests');
    }

    public function csUpdateRequest(Request $request, $requestId = null)
    {
        $response = get_json(GET_REQUEST_DETAIL.'/'.$requestId);

        if(empty($response->result))
            return redirect('customer-service/tao-request');

        if ($request->isMethod('post'))
        {
            $post['requestId'] = (int) $requestId;
            $post['customerId'] = $request->input('customerId');

            $post['listingTypeId'] = df_int($request->input('listingTypeId'), NULL);
            $post['purposeId'] = df_int($request->input('purposeTypeId'), NULL);
            $post['propertyTypeId'] = df_int($request->input('propertyTypeId'), NULL);
            $post['bedrooms'] = df_int($request->input('bedrooms'), NULL);
            $post['bathrooms'] = df_int($request->input('bathrooms'), NULL);
            $post['directionId'] = df_int($request->input('directionId'), NULL);
            $post['yearBuild'] = df_int($request->input('yearBuild'), NULL);
            $post['timePosted'] = df_int($request->input('timePosted'), NULL);

            $post['minSize'] = df_float($request->input('minSize'), NULL);
            $post['maxSize'] = df_float($request->input('maxSize'), NULL);
            $post['minPrice'] = df_float($request->input('minPrice'), NULL);
            $post['maxPrice'] = df_float($request->input('maxPrice'), NULL);

            $post['message'] = df($request->input('message'), NULL);

            $requestList = $request->input('requestListDistricts', array());
            $requestListDistricts = array();
            foreach ($requestList as $item) {
                $requestListDistricts[]['districtId'] = (int) $item;
            }
            $post['requestListDistricts'] = $requestListDistricts;

            // -- tra ve json --
//            echo json_encode($post);

            $response = put_json(UPDATE_REQUEST_DETAIL, $post);

            if(!empty($response->result)) {
                Session::flash('succ_msg', 'Đã update request mới thành công');
            } else
            {
                Session::flash('err_msg', $response->message);
            }
            return redirect('customer-service/update-request/'.$requestId);
        }

//        $requestData = $response->data;
        $requestData = objectToArray($response->data);
        $response = get_json(GET_CUSTOMER_DETAIL.'/'.$response->data->customerId);
        $customeData = objectToArray($response->data);

        // -- Create All Listing Info --
        $allListingTypeInfo = getAllListingTypeInfo();
        $data['allListingTypeInfo'] = $allListingTypeInfo;
        if (!empty($requestData['listingTypeId'])) {
            $propertyTypeList = array();
            $purposeTypeList = array();

            $allListingTypeInfo = getAllListingTypeInfo();

            foreach ($allListingTypeInfo as $listing)
            {
                if($listing['id'] == $requestData['listingTypeId']) {
                    $purposeTypeList = $listing['list'];
                    foreach ($listing['list'] as $purpose)
                        if($purpose['id'] == $requestData['purposeId'])
                            $propertyTypeList = $purpose['list'];
                }
            }
            $data['arrPropertyTypeList'] = $propertyTypeList; // Phai doi do trung ten bien o View::share
            $data['purposeTypeList'] = $purposeTypeList;
        }

        $listingsList = get_json(GET_LISTING_FOR_REQUEST.'/'.$requestId)->data;
        $data['districtList'] = get_json(GET_DISTRICT_LIST."/1");
        $data['requestData'] = $requestData;
        $data['customeData'] = $customeData;
        $data['listingsList'] = $listingsList;
        $data['customerId'] = $customeData['customerId'];
        $data['requestId'] = $requestId;

        $data['post_url'] = url('customer-service/update-request/'.$requestId);

        $data['allow_assign'] = 1;
        if(havePermission('assign_agent'))
            $data['allow_assign'] = 2;

        $data['html_agent_list_choose_one'] = $this->getHtmlAgentList(-1, -1, true);
        $data['html_agent_list_choose_multi'] = $this->getHtmlAgentList(-1, -1, false);

        return view('operation.cs-request', $data);
    }

    public function csNewRequest(Request $request)
    {
        if ($request->isMethod('post'))
        {
            $post['name'] = df($request->input('name'), NULL);
            $post['customerId'] = df($request->input('customerId'), NULL);
            $post['email'] = df($request->input('email'), NULL);
            $post['gender'] = df($request->input('gender'), NULL);
            $post['job'] = df($request->input('job'), NULL);
            $post['workingPlace'] = df($request->input('workingPlace'), NULL);
            $post['age'] = df_int($request->input('age'), NULL);
            $post['source'] = df($request->input('source'), NULL);

            $requestListItem['listingTypeId'] = df_int($request->input('listingTypeId'), NULL);
            $requestListItem['purposeId'] = df_int($request->input('purposeTypeId'), NULL);
            $requestListItem['propertyTypeId'] = df_int($request->input('propertyTypeId'), NULL);
            $requestListItem['bedrooms'] = df_int($request->input('bedrooms'), NULL);
            $requestListItem['bathrooms'] = df_int($request->input('bathrooms'), NULL);
            $requestListItem['directionId'] = df_int($request->input('directionId'), NULL);
            $requestListItem['yearBuild'] = df_int($request->input('yearBuild'), NULL);
            $requestListItem['timePosted'] = df_int($request->input('timePosted'), NULL);

            $requestListItem['minSize'] = df_float($request->input('minSize'), NULL);
            $requestListItem['maxSize'] = df_float($request->input('maxSize'), NULL);
            $requestListItem['minPrice'] = df_float($request->input('minPrice'), NULL);
            $requestListItem['maxPrice'] = df_float($request->input('maxPrice'), NULL);

            $requestListItem['message'] = df($request->input('message'), NULL);

            $requestList = $request->input('requestListDistricts', array());
            $requestListDistricts = array();
            foreach ($requestList as $item) {
                $requestListDistricts[]['districtId'] = (int) $item;
            }
            $requestListItem['requestListDistricts'] = $requestListDistricts;

            $post['requestList'][] = $requestListItem;

            $response = post_json(CREATE_REQUEST, $post);

            if(!empty($response->result)) {
                Session::flash('succ_msg', 'Đã tạo request mới thành công');
            } else
            {
                Session::flash('err_msg', $response->message);
            }
            return redirect('customer-service/tao-request');
        }

        $data['districtList'] = get_json(GET_DISTRICT_LIST."/1");

        $data['allListingTypeInfo'] = getAllListingTypeInfo();

        $data['allow_assign'] = 1;
        $data['post_url'] = url('customer-service/tao-request');

        // -- Create default data --
//        $data['requestData'] = $requestData[''];
        $customeData = array();
        $customeData['gender'] = 'male';
        $data['customeData'] = $customeData;
        return view('operation.cs-request', $data);
    }

    public function listingDetail(Request $request)
    {
        return view('operation.listing-detail');
    }
    // Functions for CS team
    public function csUserManagement(Request $request) {
        return view('operation.cs-user');
    }
    public function csStaffManagement(Request $request) {
        return view('operation.cs-staff');
    }

    public function agentCreate() {
      $data['districtList'] = get_json(GET_DISTRICT_LIST."/1");
      return view('operation.agent-create')->with($data);
    }

    // Functions for AS team
    public function agentDetail($agentId) {
      $data['results'] = get_json(GET_AGENT_DETAIL."/".$agentId);
      $data['districtList'] = get_json(GET_DISTRICT_LIST."/1");
      foreach ($data['results']->data->agentSettings as $key => $agentSettingsValue) {
        $data['purposeId'.$agentSettingsValue->id->purposeId] = "checked";
      }
      //var_dump($data);
      //exit();
      return view('operation.agent-detail')->with($data);
    }

    public function asRequestManagement(Request $request)
    {
        if ($request->isMethod('post'))
        {
            $cur_request_id = df_int($request->input('cur_request_id'));
            $listAgent = explode(',', substr($request->input('list_agent_id'), 0, strlen($request->input('list_agent_id'))-1));

            $post = array();
            $response = null;
            if($request->input('choose_type') == 1) // -- Choose one --
            {
                $post['requestId'] = $cur_request_id;
                $post['agentId'] = (int) $listAgent[0];
                $post['rlistingIds'] = unserialize($request->input('str_listing_id'));
                $response = post_json(ASSIGN_AGENT_LISTING, $post);
            } else // -- Choose multi --
            {
                foreach ($listAgent as $agent)
                    $post[] = array('requestId' => $cur_request_id, 'agentId' => (int)$agent);

                $response = post_json(ASSIGN_MULTI_AGENT_LISTING, $post);
            }

            if(!empty($response->result)) {
                Session::flash('succ_msg', 'Đã assign agent cho request thành công');
            } else
            {
                Session::flash('err_msg', $response->message);
            }

            return redirect('agent-support/quan-ly-requests');
        }

        $response = get_json(LIST_REQUEST);

        $data['list_requests'] = $response->data;
        $data['html_agent_list_choose_one'] = $this->getHtmlAgentList(-1, -1, true);
        $data['html_agent_list_choose_multi'] = $this->getHtmlAgentList(-1, -1, false);

        return view('operation.as-request', $data);

    }
    public function asAgentManagement(Request $request) {
      $data['results'] = get_json(GET_AGENT_ACTIVE_LIST);
      return view('operation.as-agent')->with($data);
    }
    public function asNewAgentManagement(Request $request) {
      $data['results'] = get_json(GET_AGENT_NEW_LIST);  
      return view('operation.as-new-agent')->with($data);
    }
    public function asBlacklistManagement(Request $request) {
     $data['results'] = get_json(GET_BLACK_LIST);
     return view('operation.as-blacklist')->with($data);
    }
    public function asWarningManagement(Request $request) {
      $data['results'] = get_json(GET_WARNING_LIST);
     return view('operation.as-warning')->with($data);
    }

    public function asAgentVieweds(Request $request) {
        return view('operation.as-agent-viewed');
    }
    public function asOnlineRequests(Request $request) {
        return view('operation.as-online-requests');
    }
    public function asOfflineRequests(Request $request) {
        return view('operation.as-offline-requests');
    }

    // Functions for TM team
    public function tmTransactions(Request $request) {
        $data['results'] = get_json(GET_TRANSACTION_LIST);
        $data['html_agent_list'] = $this->getHtmlAgentList(-1, -1, true);
        return view('operation.tm-transactions')->with($data);
    }

    public function tmTransactionDetail(Request $request, $transactionId)
    {
        if ($request->isMethod('post'))
        {
            $post['transactionId'] = (int) $request->input('transactionId');
            $ids = array();
            foreach ($request->input('rListingIds') as $listingId)
                $ids[] = (int) $listingId;
            $post['rlistingIds'] = $ids;

//            echo json_encode($post);
            $response = post_json(TRANSACTION_ADD_LISTING, $post);
            if(!empty($response->result)) {
                Session::flash('succ_msg', 'Đã thêm listing vào transaction thành công');
            } else
            {
                Session::flash('err_msg', $response->message);
            }
            return redirect('transactions/detail/'.$post['transactionId']);
        }

        $response = get_json(GET_TRANSACTION_DETAIL."/".$transactionId);
        if(empty($response->result))
            die($response->message);

        $data['transactionDetail'] = $response->data;

        $response = get_json(GET_TRANSACTION_DETAIL_LISTING."/".$transactionId);

        if(empty($response->result))
            die($response->message);

        $data['transactionListing'] = $response->data;
        $data['districtList'] = get_json(GET_DISTRICT_LIST."/1");
        $data['allListingTypeInfo'] = getAllListingTypeInfo();

        return view('operation.tm-transaction-detail', $data);
    }
    
    public function tmTransactionSearch(Request $request) {
        return view('operation.tm-search');
    }
    public function tmOverview(Request $request) {
        return view('operation.tm-overview');
    }


    public function tmSentListings($transactionId) {
        $data['results'] = get_json(GET_TRANSACTION_DETAIL_LISTING."/".$transactionId);
        return view('operation.tm-sent-listings')->with($data);
    }
    public function agentLock($agentId) {
      $results = get_json(GET_LOCK_AGENT."/".$agentId);
      return response()->json($results);
    }

    public function agentUnLock($agentId) {
      $results = get_json(GET_UNLOCK_AGENT."/".$agentId);
      return response()->json($results);
    }

    public function agentCreateJson(Request $request) {
        $data = $request->json()->all();
        // var_dump($data);
        // exit();
        $response = post_json(AGENT_CREATE, $data);
        return json_encode($response);
    } 

    public function agentUpdateJson(Request $request) {
        $data = $request->json()->all();
        $response = put_json(AGENT_UPDATE, $data);
        return json_encode($response);
    }  

    public function agentChangeStatusJson(Request $request) {
        $data = $request->json()->all();
        $response = post_json(AGENT_CHANGE_STATUS, $data);
        return json_encode($response);
    } 

    public function agentReport($agentId, $reasonId) {
        $response = get_json(AGENT_REPORT."/".$agentId."/".$reasonId);
        return json_encode($response);
    } 

    public function agenAssignBrokerageFirm($agentId, $brokerageId) {
        $response = get_json(AGENT_ASSIGN_BROKERAGE_FIRM."/".$agentId."/".$brokerageId);
        return json_encode($response);
    } 

    public function resetPasswordJson(Request $request) {
        $data = $request->json()->all();
        $response = post_json(AGENT_CHANGE_STATUS, $data);
        return json_encode($response);
    }

    public function tmChangeAgent($transactionId, $agentId) {
        $response = get_json(TRANSACTION_CHANGE_AGENT.'/'.$transactionId.'/'.$agentId);
        return json_encode($response);
    }

    public function tmChangeStatus($transactionId, $statusId) {
        $response = get_json(TRANSACTION_CHANGE_STATUS.'/'.$transactionId.'/'.$statusId);
        return json_encode($response);
    }

    public function imageAgentAvatarUploader(Request $request) {

            $image = Input::file('file_data');
            $fileId = md5($image->getClientSize().time()) . '_image';
            // var_dump($fileId);
            // exit();
            $filename  = $fileId.'.' . $image->getClientOriginalExtension();

            $img = Image::make($image->getRealPath())
                ->save(UPLOAD_PATH.'images/' . $filename);
            $data["initialPreview"] = array("<img class='agent-avatar' src='".UPLOAD_URL."images/".$filename."' class='file-preview-image' fileid='". $fileId."' alt='".$filename."' title='".$filename."'>");
            $data["initialPreviewConfig"] = array(
                array("caption" => "", "key"=> $filename)
            );  
            return json_encode($data);
    }
    public function imageAgentAvatarRemover(Request $request) {
        $filename = $request->get("key");
        if(file_exists(UPLOAD_PATH.'images/' . $filename)) {
            unlink(UPLOAD_PATH.'images/' . $filename);
        }
        $data = array();
        return json_encode($data);
    }

    public function imageAgentCompanyLogoUploader(Request $request) {

            $image = Input::file('file_data');
            $fileId = md5($image->getClientSize().time()) . '_image';
            // var_dump($fileId);
            // exit();
            $filename  = $fileId.'.' . $image->getClientOriginalExtension();

            $img = Image::make($image->getRealPath())
                ->save(UPLOAD_PATH.'images/' . $filename);
            $data["initialPreview"] = array("<img class='agent-companylogo' src='".UPLOAD_URL."images/".$filename."' class='file-preview-image' fileid='". $fileId."' alt='".$filename."' title='".$filename."'>");
            $data["initialPreviewConfig"] = array(
                array("caption" => "", "key"=> $filename)
            );  
            return json_encode($data);
    }
    public function imageAgentCompanyLogoRemover(Request $request) {
        $filename = $request->get("key");
        if(file_exists(UPLOAD_PATH.'images/' . $filename)) {
            unlink(UPLOAD_PATH.'images/' . $filename);
        }
        $data = array();
        return json_encode($data);
    }
    #Bussiness Development
    public function bdRequestManagement(Request $request) {
      return view('operation.bd-staff');
    }
    
    public function bd(Request $request) {
      return view('operation.as-agent');
    }
    
    public function brokerageFirm(Request $request) {
      return view('operation.brokerage-firm');
    }
    
    public function createBrokerageFirm(Request $request) {
      return view('operation.brokerage-firm-detail');
    }

    public function updateBrokerageFirm($brokerageFirmId) {
      return view('operation.brokerage-firm-detail');
    }

    public function setStatus() {
        $result = [];
        try {
            $postData = \Request::json()->all();
            $result = post_json("user/account/set-status", $postData);            
        } catch (Exception $e) {
            $result = ['result' => false];
        }

        return response()->json($result);
    }
}



