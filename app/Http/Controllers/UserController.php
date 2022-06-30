<?php

namespace App\Http\Controllers;

use App\Common;
use Illuminate\Http\Request;
use Session;
use Cookie;
use Input;
use App\Libraries\UserAuth;

class UserController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }
    public function logout(Request $request)
    {
        $request->session()->forget('user');
        $request->session()->flush();
        return redirect("/");
    }
    public function isSessionAlive()
    {
        $user = Session::get("user");
        $isAlive = FALSE;
        if (isset($user)) {
            $isAlive = TRUE;
        }
        return response()->json(array(
            'isAlive' => $isAlive
        ));
    }
    public function staff(Request $request)
    {
        $from_date = strtotime("midnight", time()) . "000";
        $to_date = (strtotime("tomorrow", time()) - 1) . "000";
        if (isset($_COOKIE['staff_from_date'])) {
            $from_date = $_COOKIE['staff_from_date'];
            $to_date = $_COOKIE['staff_to_date'];
        }
        $data['staffs'] = get_json(GET_STAFFS . "/" . $from_date . "/" . $to_date)->data;
        $data['remainingListing'] = get_json(GET_REMAINING_LISTING);
        return view('staff')->with($data);
    }
    public function assignReviews($id)
    {
        $data['staffId'] = $id;
        $data['remainingListing'] = get_json(GET_REMAINING_LISTING);
        return view('staff-assign-reviews')->with($data);
    }
    public function getAssignReviewsList()
    {
        $userTypeIds = \Request::input("userTypeIds");
        $postData['strUserType'] = $userTypeIds;
        $responses = post_json(GET_REMAINING_LISTING_WITH_DETAIL, $postData);
        $data['items'] = $responses->data;
        return view('get-assign-reviews-list')->with($data);
    }
    public function doAssignReviews($id)
    {
        $postData['userId'] = df_int(\Request::input('staffId'));
        $strListingIds = \Request::input("listingIds");
        $rListingIds = explode(",", $strListingIds);
        foreach ($rListingIds as $num) {
            $postData['rlistingIds'][] = df_int($num);
        }
        $response = post_json(ASSIGN_REVIEW_LISTING, $postData);
        return response()->json($response);
    }
    public function createAccountJson(Request $request)
    {
        $data = $request->json()->all();
        if ($data['userDistricts'] == NULL) {
            $data['userDistricts'] = [];
        }
        $data['cityId'] = df_int($data['cityId']);
        $response = post_json(CREATE_ACCOUNT, $data);
        return response()->json($response);
    }
    public function updateAccountJson(Request $request)
    {
        $data = $request->json()->all();
        if ($data['userDistricts'] == NULL) {
            $data['userDistricts'] = [];
        }
        $data['cityId'] = df_int($data['cityId']);
        $response = put_json(UPDATE_ACCOUNT, $data);
        return json_encode($response);
    }
    public function checkUserNameJson($username)
    {
        $resultCheck = get_json(CHECK_USERNAME . "/" . $username);
        return response()->json($resultCheck);
    }
    // public function uploadAvatar() {
    //     $image = Input::file('file_data');
    //     $fileId = md5($image->getClientSize() . time()) . '_image';
    //     // var_dump($fileId);
    //     // exit();
    //     $filename = $fileId . '.' . $image->getClientOriginalExtension();
    //     $originImage = Image::make($image->getRealPath());
    //     $width = $originImage->width();
    //     $height = $originImage->height();
    //     $ratio = 1;
    //     if ($width > 300) {
    //         $ratio = 300 / $width;
    //     }
    //     $img = $originImage->resize($width * $ratio, $height * $ratio)
    //             ->save(UPLOAD_PATH . 'avatar/' . $filename);
    //     //->save(UPLOAD_PATH . 'avatar/' . $filename);
    //     $data["initialPreview"] = array("<img class='agent-avatar file-preview-image' src='" . UPLOAD_URL . "avatar/" . $filename . "' fileid='" . $fileId . "' alt='" . $filename . "' title='" . $filename . "'>");
    //     $data["initialPreviewConfig"] = array(
    //         array("caption" => "", "key" => $filename)
    //     );
    //     return json_encode($data);
    // }
    /**
     * Upload Avatar
     *
     * @return JSON uploaded images
     */
    public function uploadAvatar()
    {
        // Get upload image
        $image = Input::file('file_data');
        $fileId = md5($image->getClientSize() . time()) . '_image';
        $fileName = $image->getClientOriginalName();
        // Upload image via API
        $uploadRs = uploadImageFilesUseApi($image, 'avatar');
        $data = [
            "initialPreview" => ["<img src='" . UPLOAD_URL . $uploadRs['data']['file_name'] . "' data-src='" . $uploadRs['data']['file_name'] . "' class='agent-avatar file-preview-image' fileid='" . $fileId . "' alt='" . $fileName . "' title='" . $fileName . "'>"],
            "initialPreviewConfig" => [
                "caption" => "",
                "key" => $fileName
            ]
        ];
        return json_encode($data);
    }
    public function uploadMortgageGetUrl()
    {
        if (Input::file('filepond')) {
            $image = Input::file('filepond');
            $fileId = md5($image->getClientSize() . time()) . '_image';
            $fileName = $image->getClientOriginalName();
            $uploadRs = uploadFile($image, 'mortgage');
            return UPLOAD_URL . $uploadRs['data']['file_name'];
        }
    }
    public function uploadAvatarGetUrl()
    {
        if (Input::file('file_data')) {
            $image = Input::file('file_data');
            $fileId = md5($image->getClientSize() . time()) . '_image';
            $fileName = $image->getClientOriginalName();
            $uploadRs = uploadImageFilesUseApi($image, 'avatar');
            return UPLOAD_URL . $uploadRs['data']['file_name'];
        } else {
            return "";
        }
    }
    public function getById($id, $flag = "")
    {
        $data['user'] = $flag == "" ? get_json(GET_DETAIL_ACCOUNT . '/' . $id)->data : get_json(GET_DETAIL_ACCOUNT . '/' . $id);
        return response()->json($data['user']);
    }
    public function removeAvatar()
    {
        $filename = UPLOAD_PATH . 'avatar/' . \Request::input("key");
        if (file_exists($filename) && is_file($filename)) {
            unlink($filename);
        }
        $data = array();
        return json_encode($data);
    }
    public function create()
    {
        $data['listDepartments'] = get_json(GET_DEPARTMENTS)->data;
        $data['userTypeList'] = get_json(GET_LISTING_USER_TYPE);
        $data['entitiesList'] = get_json(GET_ENTITIES_LIST)->data;
        $data['cityList'] = get_json(GET_CITY_LIST);
        $data['districtList'] = get_json(GET_DISTRICT_LIST . "/1")->data;
        $data['createdBy'] = Session::get("user");
        return view('create-account')->with($data);
    }
    public function createPassword($activationKey)
    {
        $viewData['activationKey'] = $activationKey;
        $viewData['info'] = Common::decodeJwt($activationKey);
        return view('users.create-password')->with($viewData);
    }
    public function doInviteContacts()
    {
        $postData = \Request::json()->all();
        $response = post_json(INVITE_CONTACT, $postData);
        return response()->json($response);
    }
    public function doUnpublishContacts()
    {
        $postData = \Request::json()->all();
        $response = put_json('hrm-contacts/unpublish-user', $postData);
        return response()->json($response);
    }
    public function doCreatePassword()
    {
        $postData = \Request::json()->all();
        $response = post_json(DO_CREATE_PASSWORD, $postData);
        return response()->json($response);
    }
    public function doChangePassword()
    {
        $postData = \Request::json()->all();
        $response = put_json(DO_CHANGE_PASSWORD, $postData);
        return response()->json($response);
    }
    public function getFilterContacts()
    {
        $data['listFilters'] = get_json(GET_ALL_FILTERS)->data;
        return response()->json($data);
    }
    public function getAllContacts()
    {
        $requestData = \Request::input();
        $postData = [];
        if (isset($requestData['filters'])) {
            $filters = json_decode($requestData['filters']);
        }
        //
        $page = get_current_page($requestData);
        $searchKeywords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $value = $requestData['order'][0]['dir'];
        $sort = [];
        $sort['columnName'] = $sortColumn;
        $sort['value'] = $value;
        $postData['sorts'][0] = $sort;
        $filter = [];
        if (!empty($searchKeywords)) {
            $filter['searchKeyword'] = $searchKeywords;
        } else {
            $filter['searchKeyword'] = null;
        }
        if (isset($filters)) {
            foreach ($filters as $key => $value) {
                $filter[$key] = $value;
            }
        }
        $postData['filters'] = $filter;
        $limit = $requestData['length'];
        $postUrl = "/hrm-contacts/list/" . $page . '/' . $limit;
        $response = post_json($postUrl, $postData)->data;
        $viewData = array(
            'recordsTotal' => $response->totalItems,
            'recordsFiltered' => $response->totalItems,
            'data' => $response->list
        );
        return response()->json($viewData);
    }
    public function getAllPositions()
    {
        $data['positions'] = get_json('user-positions/get-all')->data;
        return response()->json($data);
    }
    public function updatePositions()
    {
        $postData = \Request::json()->all();
        $response = post_json(UPDATE_POSITIONS, $postData);
        return response()->json($response);
    }
    public function detailInfosUser($contactId)
    {
        $viewData = [];
        $currentUser = \Session::get("user");
        if (empty($currentUser)) {
            abort(403);
        }
        if (!UserAuth::hasPermission($currentUser, UserAuth::ENTITY_ACCOUNT)) {
            if ($contactId != $currentUser->userId) {
                abort(403);
            }
        }
        $viewData['selfUpdate'] = false;
        if ($contactId == $currentUser->userId) {
            $viewData['selfUpdate'] = true;
        }
        $detailInfos = get_json(DETAIL_INFOS . '/user/' . $contactId);
        $zoneId = [];
        foreach ($detailInfos->data->departments as $department) {
            if ($department->departmentType == "ZONE") {
                array_push($zoneId, $department->departmentId);
            }
        }
        $viewData['zoneId'] = $zoneId;
        $teamId = [];
        foreach ($detailInfos->data->departments as $department) {
            if ($department->departmentType == "GROUP") {
                array_push($teamId, $department->departmentId);
            }
        }
        $viewData['teamId'] = $teamId;
        if ($detailInfos->code != 200) {
            abort($detailInfos->code);
        }
        $viewData['userInfor'] = $detailInfos->data->userInfor;
        $viewData['groups'] = $detailInfos->data->userInfor->groups;
        $departmentId = [];
        foreach ($detailInfos->data->departments as $department) {
            if ($department->departmentType == "DEPARTMENT") {
                array_push($departmentId, $department->departmentId);
            }
        }
        $viewData['departmentId'] = $departmentId;
        $viewData['listDepartments'] = $detailInfos->data->departments;
        $cityId = [];
        foreach ($detailInfos->data->cities as $city) {
            array_push($cityId, $city->cityId);
        }
        $viewData['cityId'] = $cityId;
        $viewData['cities'] = $detailInfos->data->cities;
        $districtId = [];
        foreach ($detailInfos->data->districts as $district) {
            $id = $district->districtId . "_" . $district->cityId;
            array_push($districtId, $id);
        }
        $viewData['districtId'] = $districtId;
        $viewData['districts'] = $detailInfos->data->districts;
        $wardsId = [];
        foreach ($detailInfos->data->wards as $ward) {
            $id = $ward->wardId . "_" . $ward->cityId . "_" . $ward->districtId;
            array_push($wardsId, $id);
        }
        $viewData['wardId'] = $wardsId;
        $viewData['wards'] = $detailInfos->data->wards;
        $viewData['positions'] = $detailInfos->data->positions;
        $positionId = [];
        foreach ($detailInfos->data->positions as $positions) {
            array_push($positionId, $positions->positionId);
        }
        $viewData['positionId'] = $positionId;
        $viewData['emails'] = $detailInfos->data->emails;
        $viewData['phones'] = $detailInfos->data->phones;
        $tcId = [];
        foreach ($detailInfos->data->tcs as $tc) {
            array_push($tcId, $tc->tcId);
        }
        $viewData['tcId'] = $tcId;
        $viewData['tcs'] = $detailInfos->data->tcs;
        $viewData['msnv'] = $detailInfos->data->userInfor->msnv;
        $viewData['listingTypes'] = $detailInfos->data->listingTypes;
        
        $userInfo = $detailInfos->data->userInfor;
        $viewData['allPositions'] = get_json('user-positions/get-all')->data;
        $allDepartments = get_json(GET_ALL_DEPARTMENTS);
        if ($allDepartments->code == 200)
            $viewData['allDepartments'] = $allDepartments->data;
        $requestDetail = $detailInfos->data;
        $currentDepartments  = array();
        $isPreferedDepartment = -1;
        foreach ($requestDetail->departments as $myDepartment) {
            $currentDepartments[] = $myDepartment->departmentId;
            if ($myDepartment->isPrimary) {
                $isPreferedDepartment = $myDepartment->departmentId;
            }
        }
        $viewData['currentDepartments'] = $currentDepartments;
        $viewData['isPreferedDepartment'] = $isPreferedDepartment;
        //
        $currentPositions  = array();
        $isPreferedPosition = -1;
        foreach ($requestDetail->positions as $myPosition) {
            $currentPositions[] = $myPosition->positionId;
            if ($myPosition->isPrimary) {
                $isPreferedPosition = $myPosition->positionId;
            }
        }
        $viewData['currentPositions'] = $currentPositions;
        $viewData['isPreferedPosition'] = $isPreferedPosition;
        //
        $allDistricts = get_json(GET_DISTRICTS . '/1');
        if ($allDistricts->code == 200)
            $viewData['allDistricts'] = $allDistricts->data;
        $currentDistricts = array();
        $isPreferedDistrict = -1;
        foreach ($requestDetail->districts as $myDistrict) {
            $currentDistricts[] = $myDistrict->districtId;
            if ($myDistrict->isPrimary) {
                $isPreferedDistrict = $myDistrict->districtId;
            }
        }
        $viewData['currentDistricts'] = $currentDistricts;
        $viewData['isPreferedDistrict'] = $isPreferedDistrict;
        $dealButtons = [];
        $childOfContinueWatchings = [];
        $totalDealOfContinueWatchings = 0;
        $buttonToRemoveIndexs = [];
        $buttonIndex = -1;
        foreach ($dealButtons as $dealButton) {
            $buttonIndex++;
            if (in_array($dealButton->statusId, [17, 20])) {
                $childOfContinueWatchings[] = $dealButton;
                $totalDealOfContinueWatchings += $dealButton->numberOfDeals;
                $buttonToRemoveIndexs[] = $buttonIndex;
            }
            if (in_array($dealButton->statusId, [13])) {
                $buttonToRemoveIndexs[] = $buttonIndex;
            }
        }
        foreach ($buttonToRemoveIndexs as $index) {
            unset($dealButtons[$index]);
        }
        $viewData['entitiesListUpdate'] = [];
        $viewData['entitiesList'] = get_json(GET_ENTITIES_LIST)->data;
        $myPermissions = get_json('user/permissions/' . $contactId)->data;
        $entitiesIdListUpdate = [];
        foreach ($viewData['entitiesList'] as $item) {
            $selected = false;
            foreach ($item->actions as $ac) {
                foreach ($ac->permissions as $p) {
                    if (isset($myPermissions)) {
                        if (count($myPermissions) > 0) {
                            foreach ($myPermissions as $private) {
                                if ($private->actionId == $ac->actionId && $private->entityId == $item->id && $p->permissionId == $private->permissionId) {
                                    $selected = true;
                                }
                            }
                        }
                    }
                }
            }
            if ($selected == true) {
                array_push($viewData['entitiesListUpdate'], $item);
                $entitiesIdListUpdate[] = $item->id;
            }
        }
        $viewData['myPermissions'] = $myPermissions;
        $viewData['entitiesIdListUpdate'] = $entitiesIdListUpdate;
        $viewData['deal_buttons'] = $dealButtons;
        $viewData['userTypeList'] = get_json(GET_LISTING_USER_TYPE);
        $viewData['listUser'] = isset($userInfo->socialUser) ? get_json(GET_USER_LIST . '/' . $userInfo->socialUser->userTypeId)->data : null;
        
        return view('users.detail-infos-user')->with($viewData);
    }
    public function getListDeal($userId, $statusId)
    {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $searchKeywords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $postData = array(
            'sortColumn' => $sortColumn,
            'sortType' => $sortType,
            "searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : null)
        );
        $limit = $requestData['length'];
        $data = post_json(GET_DEAL_LIST_USER . '/user' . '/' . $userId . "/" . $statusId . "/" . $page . "/" . $limit, $postData)->data;
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data ? $data->totalItems : 0,
            'recordsFiltered' => $data ? $data->totalItems : 0,
            'data' => $data ? $data->list : []
        );
        return response()->json($viewData);
    }
    public function doUpdateInfosUser()
    {
        $postData = \Request::json()->all();
        //var_dump($postData);die;
        $response = put_json(DO_UPDATE_INFOS_USER, $postData);
        return response()->json($response);
    }
    public function doUpdateStatusUser()
    {
        $postData = \Request::json()->all();
        $response = put_json(DO_UPDATE_STATUS_USER, $postData);
        return response()->json($response);
    }
    public function detailInfosCustomer($customerId)
    {
        $viewData = [];
        $detailInfos = get_json(DETAIL_INFOS . '/customer/' . $customerId);
        if ($detailInfos->code == 200) {
            $viewData['userInfor'] = $detailInfos->data->userInfor;
            $viewData['sources'] = $detailInfos->data->userInfor->sources;
            $viewData['emails'] = $detailInfos->data->emails;
            $viewData['phones'] = $detailInfos->data->phones;
        }
        $apiButtonsResponse = get_json(GET_DEAL_GROUP_STATUS_CONTACTS . '/' . 'customer' . '/' . $customerId);
        if (in_array($apiButtonsResponse->code, [401, 403, 404, 503])) {
            abort($apiButtonsResponse->code);
        }
        $dealButtons = $apiButtonsResponse->data;
        $childOfContinueWatchings = [];
        $totalDealOfContinueWatchings = 0;
        $buttonToRemoveIndexs = [];
        $buttonIndex = -1;
        foreach ($dealButtons as $dealButton) {
            $buttonIndex++;
            if (in_array($dealButton->statusId, [17, 20])) {
                $childOfContinueWatchings[] = $dealButton;
                $totalDealOfContinueWatchings += $dealButton->numberOfDeals;
                $buttonToRemoveIndexs[] = $buttonIndex;
            }
            if (in_array($dealButton->statusId, [13])) {
                $buttonToRemoveIndexs[] = $buttonIndex;
            }
        }
        foreach ($buttonToRemoveIndexs as $index) {
            unset($dealButtons[$index]);
        }
        $viewData['deal_buttons'] = $dealButtons;
        return view('users.detail-infos-customer')->with($viewData);
    }
    public function doUpdateInfosCustomer()
    {
        $postData = \Request::json()->all();
        $response = put_json(DO_UPDATE_INFOS_CUSTOMER, $postData);
        return response()->json($response);
    }
    public function getListProperty($customerId, $statusId)
    {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $searchKeywords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $postData = array(
            'sortColumn' => $sortColumn,
            'sortType' => $sortType,
            "searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : null)
        );
        $limit = $requestData['length'];
        $data = post_json(GET_DEAL_LIST_USER . '/customer' . '/' . $customerId . "/" . $statusId . "/" . $page . "/" . $limit, $postData)->data;
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }
    public function detailInfosOwner($ownerId)
    {
        $viewData = [];
        $detailInfos = get_json(DETAIL_INFOS . '/owner/' . $ownerId);
        if ($detailInfos->code == 200) {
            $viewData['ownerId'] = $ownerId;
            $viewData['detailInfos'] = $detailInfos->data;
            $viewData['emails'] = $detailInfos->data->emails;
            $viewData['phones'] = $detailInfos->data->phones;
        }
        $apiButtonsResponsePre = get_json(GET_CHANNEL_STATUS_PRE);
        if (in_array($apiButtonsResponsePre->code, [401, 403, 404, 503])) {
            abort($apiButtonsResponsePre->code);
        }
        $dealButtonsPres = $apiButtonsResponsePre->data;
        $buttonsPre = [];
        foreach ($dealButtonsPres as $key => $dealButtonsPre) {
            if ($dealButtonsPre->type == 5 || $dealButtonsPre->type == 6) {
                foreach ($dealButtonsPre->list as $key => $val) {
                    array_push($buttonsPre, $val);
                }
            }
        }
        $viewData['buttonsPre'] = $buttonsPre;
        //
        $apiButtonsResponseSa = get_json(GET_CHANNEL_STATUS_SA);
        if (in_array($apiButtonsResponseSa->code, [401, 403, 404, 503])) {
            abort($apiButtonsResponseSa->code);
        }
        $dealButtonsSas = $apiButtonsResponseSa->data[0]->list;
        $buttonsSa = [];
        foreach ($dealButtonsSas as $key => $dealButtonsSa) {
            array_push($buttonsSa, $dealButtonsSa);
        }
        $viewData['buttonsSa'] = $buttonsSa;
        return view('users.detail-infos-owner')->with($viewData);
    }
    public function getListingOwner($ownerId)
    {
        $requestData = \Request::input();
        $postData = [];
        $page = get_current_page($requestData);
        //
        $type = '';
        if (isset($requestData['type']))
            $type = $requestData['type'];
        if (isset($requestData['status']))
            $status = $requestData['status'];
        if ($type == 'lso') {
            $postData['LSOListingStatusIds'] = $status;
        } elseif ($type == 'rlisting') {
            $postData['RListingStatusIds'] =  $status;
        }
        //
        $searchKeywords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $value = $requestData['order'][0]['dir'];
        $sort = [];
        $sort['columnName'] = $sortColumn;
        $sort['value'] = $value;
        $postData['ownerId'] = $ownerId;
        $postData['sort'] = $sort;
        $limit = $requestData['length'];
        $data = post_json(GET_LISTING_OWNER . "/" . $page . "/" . $limit, $postData)->data;
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }
    public function doUpdateInfosOwner()
    {
        $postData = \Request::json()->all();
        $response = put_json(DO_UPDATE_INFOS_OWNER, $postData);
        return response()->json($response);
    }
    public function detailInfosAgent($agentId)
    {
        $viewData = [];
        $detailInfos = get_json(DETAIL_INFOS . '/agent/' . $agentId);
        return response()->json($detailInfos);
        if ($detailInfos->code == 200) {
            $viewData['agentId'] = $agentId;
            $viewData['userInfor'] = $detailInfos->data->userInfor;
            $viewData['sources'] = $detailInfos->data->userInfor->sources;
            $viewData['emails'] = $detailInfos->data->emails;
            $viewData['phones'] = $detailInfos->data->phones;
        }
        $apiButtonsResponsePre = get_json(GET_CHANNEL_STATUS_PRE);
        if (in_array($apiButtonsResponsePre->code, [401, 403, 404, 503])) {
            abort($apiButtonsResponsePre->code);
        }
        $dealButtonsPres = $apiButtonsResponsePre->data;
        $buttonsPre = [];
        foreach ($dealButtonsPres as $key => $dealButtonsPre) {
            if ($dealButtonsPre->type == 5 || $dealButtonsPre->type == 6) {
                foreach ($dealButtonsPre->list as $key => $val) {
                    array_push($buttonsPre, $val);
                }
            }
        }
        $viewData['buttonsPre'] = $buttonsPre;
        $apiButtonsResponseSa = get_json(GET_CHANNEL_STATUS_SA);
        if (in_array($apiButtonsResponseSa->code, [401, 403, 404, 503])) {
            abort($apiButtonsResponseSa->code);
        }
        $dealButtonsSas = $apiButtonsResponseSa->data[0]->list;
        $buttonsSa = [];
        foreach ($dealButtonsSas as $key => $dealButtonsSa) {
            array_push($buttonsSa, $dealButtonsSa);
        }
        $viewData['buttonsSa'] = $buttonsSa;
        $apiButtonsResponse = get_json(GET_DEAL_GROUP_STATUS_CONTACTS . '/' . 'agent' . '/' . $agentId);
        if (in_array($apiButtonsResponse->code, [401, 403, 404, 503])) {
            abort($apiButtonsResponse->code);
        }
        $dealButtons = $apiButtonsResponse->data;
        $childOfContinueWatchings = [];
        $totalDealOfContinueWatchings = 0;
        $buttonToRemoveIndexs = [];
        $buttonIndex = -1;
        foreach ($dealButtons as $dealButton) {
            $buttonIndex++;
            if (in_array($dealButton->statusId, [17, 20])) {
                $childOfContinueWatchings[] = $dealButton;
                $totalDealOfContinueWatchings += $dealButton->numberOfDeals;
                $buttonToRemoveIndexs[] = $buttonIndex;
            }
            if (in_array($dealButton->statusId, [13])) {
                $buttonToRemoveIndexs[] = $buttonIndex;
            }
        }
        foreach ($buttonToRemoveIndexs as $index) {
            unset($dealButtons[$index]);
        }
        $viewData['deal_buttons'] = $dealButtons;
        return view('users.detail-infos-agent')->with($viewData);
    }
    public function doUpdateStatusAgent()
    {
        $postData = \Request::json()->all();
        $response = put_json(DO_UPDATE_STATUS_AGENT, $postData);
        return response()->json($response);
    }
    public function getListDealAgent($agentId, $statusId)
    {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $searchKeywords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $postData = array(
            'sortColumn' => $sortColumn,
            'sortType' => $sortType,
            "searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : null)
        );
        $limit = $requestData['length'];
        $data = post_json(GET_DEAL_LIST_USER . '/agent' . '/' . $agentId . "/" . $statusId . "/" . $page . "/" . $limit, $postData)->data;
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }
    public function getListDealAgentPosted($agentId)
    {
        $requestData = \Request::input();
        $postData = [];
        $page = get_current_page($requestData);
        $type = '';
        if (isset($requestData['type']))
            $type = $requestData['type'];
        if (isset($requestData['status']))
            $status = $requestData['status'];
        if ($type == 'lso') {
            $postData['LSOListingStatusIds'] = $status;
        } elseif ($type == 'rlisting') {
            $postData['RListingStatusIds'] =  $status;
        }
        $searchKeywords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $value = $requestData['order'][0]['dir'];
        $sort = [];
        $sort['columnName'] = $sortColumn;
        $sort['value'] = $value;
        $postData['agentId'] = $agentId;
        $postData['sort'] = $sort;
        $limit = $requestData['length'];
        $data = post_json(GET_LISTING_AGENT_POSTED . "/" . $page . "/" . $limit, $postData)->data;
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }
    public function lockContacts($contactId, Request $request)
    {
        $requestData = \Request::input();
        $postData = [];
        $contactType = $requestData['type'];
        $postData['contactType'] = $contactType;
        $postData['contactId'] = $contactId;
        $response = put_json(DO_LOCK_USER, $postData);
        if ($response->code == 200) {
            $request->session()->flash('status', 'Khóa thành công!');
            return redirect("/contact/mine");
        }
    }
    public function unlockContacts($contactId, Request $request)
    {
        $postData = [];
        $postData['statusId'] = 2;
        $postData['userId'] = $contactId;
        $response = put_json(DO_UPDATE_STATUS_USER, $postData);
        if ($response->code == 200) {
            $request->session()->flash('status', 'Mở khóa thành công!');
            return redirect("/contact/mine");
        }
    }
    /**
     * End Users : Phân quyền
     */
    public function edit($id_account)
    {
        $data['listDepartments'] = get_json(GET_DEPARTMENTS)->data;
        $data['userTypeList'] = get_json(GET_LISTING_USER_TYPE);
        $data['entitiesList'] = get_json(GET_ENTITIES_LIST)->data;
        $data['detailAccount'] = get_json(GET_DETAIL_ACCOUNT . '/' . $id_account)->data;
        $data['createdBy'] = Session::get("user");
        $data['listUser'] = isset($data['detailAccount']->socialUser) ? get_json(GET_USER_LIST . '/' . $data['detailAccount']->socialUser->userTypeId)->data : null;
        //return response()->json($data);
        $data['cityList'] = get_json(GET_CITY_LIST);
        $data['districtList'] = get_json(GET_DISTRICT_LIST . "/1");
        return view('edit-account')->with($data);
    }
    public function requestResetPassword()
    {
        return view('request-reset-password');
    }
    public function resetPassword()
    {
        return view('reset-password');
    }
    public function suspendAccount($socialUid)
    {
        $response = get_json(USER_SUSPEND_ACCOUNT . "/" . $socialUid);
        return json_encode($response);
    }
    public function resetPasswordJson(Request $request)
    {
        $data = $request->json()->all();
        $response = post_json(USER_RESET_PASSWORD, $data);
        return json_encode($response);
    }
    public function profile()
    {
        $user = Session::get("user");
        return $this->detailInfosUser($user->userId);
    }
    public function updateProfile()
    {
        $postData = array_except(\Request::input(), ['_token']);
        $postData['photo'] = $this->uploadAvatarGetUrl();
        $postData = array_filter($postData, function ($value) {
            return $value !== '';
        });
        $responses = put_json(UPDATE_PROFILE, $postData);
        if ($responses->result) {
            if (isset($postData['password'])) {
                Session()->forget('user');
                Session()->flush();
                return redirect("/login")->withErrors(['Thay đổi mật khẩu thành công !']);
            } else {
                $user = Session::get("user");
                Session()->put('user', get_json(GET_DETAIL_ACCOUNT . '/' . $user->userId)->data);
                return \Redirect::back()->withErrors([$responses->message]);
            }
        } else {
            return \Redirect::back()->withErrors([$responses->message]);
        }
    }
    public function allowLoginOutside()
    {
        if (Session::get("user")->userId != 1) {
            abort(404);
        }
        $userAgent = \Request::header('User-Agent');
        $postData = [
            'userAgent' => $userAgent
        ];
        $response = post_json("user/register-cookie", $postData);
        if ($response && $response->result && !empty($response->data)) {
            Cookie::queue("LOGGED_IN_PROPZY", $response->data->cookie, 9999999, null, null, false, false);
        }
        $response->isMobileDevice = isMobileDev();
        return response()->json($response);
    }
    public function testCookie()
    {
        if (Session::get("user")->userId != 1) {
            abort(404);
        }
        return Cookie::get(\Request::input('id'));
    }
    public function checkAssignDistrict(Request $request)
    {
        $data = $request->json()->all();
        $response = post_json(USER_CHECK_ASSIGN_DISTRICT, $data);
        return response()->json($response);
    }
    public function updateDistrictAssigned(Request $request)
    {
        $data = $request->all();
        $response = post_json(sprintf(USER_UPDATE_DISTRICT_ASSIGNED, $data["userId"]), $data["list"]);
        return response()->json($response);
    }
    public function savePermissions()
    {
        $data = \Request::json()->all();
        $response = post_json('user/save-permissions', $data);
        return response()->json($response);
    }
    public function receiveListing()
    {
        $data = \Request::json()->all();
        $response = post_json(sprintf(RECEIVE_LISTING, $data["userId"]), $data["arrayListing"]);
        return response()->json($response);
    }
    public function getListSocialNetwork()
    {
        $result = get_json(GET_LIST_SOCIAL_NETWORK);
        return response()->json($result->data);
    }
}
