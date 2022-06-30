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

class RequestManagerController extends BaseController {

//  user: cs01 (Customer Service), tm01 (Transaction manager), ls01 (Listing Service), bd01(Business Development), as01 (Agent support)
//  pass 123

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        return $this->show();
    }

    public function show($page = 0) {
        $response = get_json(LIST_REQUEST);
        $data['list_requests'] = $response->data;
        //return response()->json($data);
        $data['current_page'] = $page;

//        if (havePermission('assign_agent'))
//        {
//            // -- Get data for include --
//            $data['html_agent_list_choose_one'] = $this->getHtmlAgentList(-1, -1, true);
//            $data['html_agent_list_choose_multi'] = $this->getHtmlAgentList(-1, -1, false);
//        }
        if (havePermission('assign_staff_to_request')) {
            // -- Get data for include --
            $data['html_bde_list_choose_one'] = $this->getHtmlBdeMemberList(-1, -1, true);
        }

        return view('request-manager.show', $data);
    }

    //Get request detail
    public function getDetail($requestId = null) {
        $response = get_json(GET_REQUEST_DETAIL . '/' . $requestId);
        return json_encode($response);
        exit();
    }

    public function create() {
        //return;
        if (\Request::isMethod('post')) {
            $post['name'] = df(\Request::input('name'), NULL);
            $post['customerId'] = NULL;
            $post['phone'] = preg_replace('/[^0-9]/', '', df(\Request::input('phone'), ''));
            $post['email'] = df(\Request::input('email'), NULL);
            $post['gender'] = df(\Request::input('gender'), NULL);
            $post['job'] = df(\Request::input('job'), NULL);
            $post['workingPlace'] = df(\Request::input('workingPlace'), NULL);
            $post['age'] = df_int(\Request::input('age'), NULL);
            $post['source'] = df(\Request::input('source'), NULL);

            $requestListItem['listingTypeId'] = df_int(\Request::input('listingTypeId'), NULL);
            $requestListItem['purposeId'] = df_int(\Request::input('purposeTypeId'), NULL);
            $requestListItem['propertyTypeId'] = df_int(\Request::input('propertyTypeId'), NULL);
            $requestListItem['bedrooms'] = df_int(\Request::input('bedrooms'), NULL);
            $requestListItem['bathrooms'] = df_int(\Request::input('bathrooms'), NULL);
            $requestListItem['directionId'] = df_int(\Request::input('directionId'), NULL);
            $requestListItem['yearBuild'] = df_int(\Request::input('yearBuild'), NULL);
            $requestListItem['timePosted'] = df_int(\Request::input('timePosted'), NULL);

            $requestListItem['minSize'] = df_float(\Request::input('minSize'), NULL);
            $requestListItem['maxSize'] = df_float(\Request::input('maxSize'), NULL);

            $requestListItem['minPrice'] = df(\Request::input('minPrice'), NULL);
            if (!empty($requestListItem['minPrice']))
                $requestListItem['minPrice'] = (float) str_replace('.', '', $requestListItem['minPrice']);

            $requestListItem['maxPrice'] = df(\Request::input('maxPrice'), NULL);
            if (!empty($requestListItem['maxPrice']))
                $requestListItem['maxPrice'] = (float) str_replace('.', '', $requestListItem['maxPrice']);

            $requestListItem['message'] = df(\Request::input('message'), NULL);

            $requestList = \Request::input('requestListDistricts', array());
            $requestListDistricts = array();
            foreach ($requestList as $item) {
                $requestListDistricts[]['districtId'] = (int) $item;
            }
            $requestListItem['requestListDistricts'] = $requestListDistricts;

            $post['requestList'][] = $requestListItem;

            $response = post_json(CREATE_REQUEST, $post);

            if (!empty($response->result)) {
                Session::flash('succ_msg', 'Đã tạo request mới thành công');
            } else {
                Session::flash('err_msg', $response->message);
            }
            return redirect('request-manager/create');
        }

        $data['districtList'] = get_json(GET_DISTRICT_LIST . "/1");

        $data['allListingTypeInfo'] = getAllListingTypeInfo();

        $data['allow_assign'] = 1;
        $data['post_url'] = url('request-manager/create');

        // -- Create default data --
//        $data['requestData'] = $requestData[''];
        $customeData = array();
        $customeData['gender'] = 'male';
        $data['customeData'] = $customeData;

        return view('request-manager.create-form', $data);
    }

    public function update($requestId = null) {
        $response = get_json(GET_REQUEST_DETAIL . '/' . $requestId);

        if (empty($response->result))
            return redirect('request-manager');

        if (\Request::isMethod('post')) {
            $post['requestId'] = (int) $requestId;
            $post['customerId'] = \Request::input('customerId');

            $post['listingTypeId'] = df_int(\Request::input('listingTypeId'), NULL);
            $post['purposeId'] = df_int(\Request::input('purposeTypeId'), NULL);
            $post['propertyTypeId'] = df_int(\Request::input('propertyTypeId'), NULL);
            $post['bedrooms'] = df_int(\Request::input('bedrooms'), NULL);
            $post['bathrooms'] = df_int(\Request::input('bathrooms'), NULL);
            $post['directionId'] = df_int(\Request::input('directionId'), NULL);
            $post['yearBuild'] = df_int(\Request::input('yearBuild'), NULL);
            $post['timePosted'] = df_int(\Request::input('timePosted'), NULL);

            $post['minSize'] = df_float(\Request::input('minSize'), NULL);
            $post['maxSize'] = df_float(\Request::input('maxSize'), NULL);

            $post['minPrice'] = df(\Request::input('minPrice'), NULL);
            if (!empty($post['minPrice']))
                $post['minPrice'] = (float) str_replace('.', '', $post['minPrice']);

            $post['maxPrice'] = df(\Request::input('maxPrice'), NULL);
            if (!empty($post['maxPrice']))
                $post['maxPrice'] = (float) str_replace('.', '', $post['maxPrice']);

            $post['message'] = df(\Request::input('message'), NULL);

            $requestList = \Request::input('requestListDistricts', array());
            $requestListDistricts = array();
            foreach ($requestList as $item) {
                $requestListDistricts[]['districtId'] = (int) $item;
            }
            $post['requestListDistricts'] = $requestListDistricts;

            // -- tra ve json --
//            echo json_encode($post);
            // -- Update customer infor --
            $postCustomer['name'] = df(\Request::input('name'), NULL);
            $postCustomer['customerId'] = df(\Request::input('customerId'), NULL);
            $postCustomer['phone'] = preg_replace('/[^0-9]/', '', df(\Request::input('phone'), ''));

            $postCustomer['email'] = df(\Request::input('email'), NULL);
            $postCustomer['gender'] = df(\Request::input('gender'), NULL);
            $postCustomer['job'] = df(\Request::input('job'), NULL);
            $postCustomer['workingPlace'] = df(\Request::input('workingPlace'), NULL);
            $postCustomer['age'] = df_int(\Request::input('age'), NULL);
            $postCustomer['source'] = df(\Request::input('source'), NULL);

            $responseCustomer = put_json(CREATE_REQUEST, $postCustomer);
            if (empty($responseCustomer->result)) {
                Session::flash('err_msg', $response->message);
                return redirect('request-manager/update/' . $requestId);
            }
            // -- --------------------- --

            $response = put_json(UPDATE_REQUEST_DETAIL, $post);
            if (!empty($response->result)) {
                Session::flash('succ_msg', 'Đã update request mới thành công');
            } else {
                Session::flash('err_msg', $response->message);
            }
            return redirect('request-manager/update/' . $requestId);
        }

//        $requestData = $response->data;
        $requestData = objectToArray($response->data);
        $response = get_json(GET_CUSTOMER_DETAIL . '/' . $response->data->customerId);
        $customeData = objectToArray($response->data);

        // -- Create All Listing Info --
        $allListingTypeInfo = getAllListingTypeInfo();
        $data['allListingTypeInfo'] = $allListingTypeInfo;
        if (!empty($requestData['listingTypeId'])) {
            $propertyTypeList = array();
            $purposeTypeList = array();

            $allListingTypeInfo = getAllListingTypeInfo();

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

        $listingsList = get_json(GET_LISTING_FOR_REQUEST . '/' . $requestId)->data;
        $data['districtList'] = get_json(GET_DISTRICT_LIST . "/1");
        $data['requestData'] = $requestData;
        $data['customeData'] = $customeData;
        $data['listingsList'] = $listingsList;
        $data['customerId'] = $customeData['customerId'];
        $data['requestId'] = $requestId;

        $data['post_url'] = url('request-manager/update/' . $requestId);

        $data['allow_assign'] = 1;
        if (havePermission('assign_agent'))
            $data['allow_assign'] = 2;

//        $data['html_agent_list_choose_one'] = $this->getHtmlAgentList(-1, -1, true);
//        $data['html_agent_list_choose_multi'] = $this->getHtmlAgentList(-1, -1, false);
//        $requestId = null ,$type = null , $chooseType = 1, $str_assigned_id = ''
//        + requestId la id cua request
//        + type = 1 (Request khong co listing)/ 2(request co listing)
//        $chooseType 1 => one, 2 => multi
        $data['html_agent_list_choose_multi'] = $this->getHtmlAgentListByRequestId($requestId, 1, 2);
        $data['html_agent_list_choose_one'] = $this->getHtmlAgentListByRequestId($requestId, 2, 1);

        $listingsByRequest = get_json(GET_LIST_BY_REQUEST . '/' . $requestId);
        //return response()->json($listingsByRequest);
        $data['listingsByRequest'] = $listingsByRequest;

        return view('request-manager.create-form', $data);
    }

    /*
      public function sendEmailForCustomer()
      {
      if (\Request::isMethod('post'))
      {
      $requestId = df_int(\Request::input('requestId'));

      $post['requestId'] = $requestId;
      foreach (\Request::input('rSendEmailIds') as $num)
      $post['rlistingIds'][] = df_int($num);

      $response = post_json(SEND_EMAIL_WITH_LISTING_FOR_CUSTOMER, $post);

      if(!empty($response->result)) {
      Session::flash('succ_msg', 'Đã gửi email cho customer thành công');
      } else
      {
      Session::flash('err_msg', $response->message);
      }
      return redirect('request-manager/update/'.$requestId);
      }
      return redirect('request-manager');
      }
     * 
     */

    /**
     * @Edited Phan Minh Hoàng
     * @return type
     */
    public function sendEmailForCustomer() {
        if (\Request::isMethod('post')) {
            $requestId = df_int(\Request::input('requestId'));
            $SelectedSendEmailIds = \Request::input('SelectedSendEmailIds');
            $post['requestId'] = $requestId;
            $nums = explode(',', $SelectedSendEmailIds);
            foreach ($nums as $num)
                $post['rlistingIds'][] = df_int($num);

            $response = post_json(SEND_EMAIL_WITH_LISTING_FOR_CUSTOMER, $post);

            if (!empty($response->result)) {
                Session::flash('succ_msg', 'Đã gửi email cho customer thành công');
            } else {
                Session::flash('err_msg', $response->message);
            }
            return redirect('request-manager/update/' . $requestId);
        }
        return redirect('request-manager');
    }

    public function assignListingForAgent() {
        if (\Request::isMethod('post')) {
            $cur_request_id = df_int(\Request::input('requestId'));
            $listAgent = explode(',', substr(\Request::input('list_agent_id'), 0, strlen(\Request::input('list_agent_id')) - 1));

            $post = array();
            $response = null;
            if (\Request::input('choose_type') == 1) { // -- Choose one --
                $post['requestId'] = $cur_request_id;
                $post['agentId'] = (int) $listAgent[0];
//                $post['rlistingIds'] = unserialize(\Request::input('str_listing_id'));

                $SelectedAssignIds = \Request::input('SelectedAssignIds');
                $nums = explode(',', $SelectedAssignIds);
                foreach ($nums as $num)
                    $post['rlistingIds'][] = df_int($num);
                $response = post_json(ASSIGN_AGENT_LISTING, $post);
            } else { // -- Choose multi --
                foreach ($listAgent as $agent)
                    $post[] = array('requestId' => $cur_request_id, 'agentId' => (int) $agent);

                $response = post_json(ASSIGN_MULTI_AGENT_LISTING, $post);
            }

            if (!empty($response->result)) {
                Session::flash('succ_msg', 'Đã assign listing cho agent thành công');
            } else {
                Session::flash('err_msg', $response->message);
            }
            return redirect('request-manager/update/' . $cur_request_id);
        }
        return redirect('request-manager');
    }

    // -- Assign function for RequestManager show  --
    public function assignRequestToStaff() {
        if (\Request::isMethod('post')) {
            $current_page = df_int(\Request::input('current_page', 0));
            $cur_request_id = df_int(\Request::input('cur_request_id'));

            $listStaff = explode(',', substr(\Request::input('list_staff_id'), 0, strlen(\Request::input('list_staff_id')) - 1));

            foreach ($listStaff as $staff)
                $post[] = array('requestId' => $cur_request_id, 'userId' => (int) $staff);

            // -- Su dung chung API khac nhau userId != agentId --
            $response = post_json(ASSIGN_MULTI_AGENT_LISTING, $post);
            if (!empty($response->result)) {
                Session::flash('succ_msg', 'Đã assign Member cho request thành công');
            } else {
                Session::flash('err_msg', $response->message);
            }
        }
        return redirect('request-manager/show/' . $current_page);
    }

    // -- Assign function for RequestManager show  --
    public function assignRequestToAgent() {
        if (\Request::isMethod('post')) {
            $current_page = df_int(\Request::input('current_page', 0));
            $cur_request_id = df_int(\Request::input('cur_request_id'));
            $listAgent = explode(',', substr(\Request::input('list_agent_id'), 0, strlen(\Request::input('list_agent_id')) - 1));

            $post = array();
            $response = null;
            if (\Request::input('choose_type') == 1) { // -- Choose one --
                $post['requestId'] = $cur_request_id;
                $post['agentId'] = (int) $listAgent[0];
                $post['rlistingIds'] = unserialize(\Request::input('str_listing_id'));
                $response = post_json(ASSIGN_AGENT_LISTING, $post);
            } else { // -- Choose multi --
                foreach ($listAgent as $agent)
                    $post[] = array('requestId' => $cur_request_id, 'agentId' => (int) $agent);

                $response = post_json(ASSIGN_MULTI_AGENT_LISTING, $post);
            }

            if (!empty($response->result)) {
                Session::flash('succ_msg', 'Đã assign agent cho request thành công');
            } else {
                Session::flash('err_msg', $response->message);
            }
        }
        return redirect('request-manager/show/' . $current_page);
    }

}
