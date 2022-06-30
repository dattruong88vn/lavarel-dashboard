<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Route;
use Intervention\Image\ImageManagerStatic as Image;
use Input;

class BaseController extends Controller {

//  user: cs01 (Customer Service), tm01 (Transaction manager), ls01 (Listing Service), bd01(Business Development), as01 (Agent support)
//  pass 123
    // Permission
    private $editPerm;
    private $addPerm;

    public function __construct() {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $this->setPermission();
        $currentUser = \Session::get("user");
        $propertyTypeList = [];
        if (!\Request::ajax() && !empty($currentUser)) {
            if(Session::has('propertyTypeList')){
                $propertyTypeList = Session::get("propertyTypeList");
            }else{
                $propertyTypeList = get_json(GET_PROPERTY_TYPE_LIST);
                Session::put('propertyTypeList', $propertyTypeList);
            }
            // dd(Session::all());
            if(Session::has('callPurpose')){
                $_getCallPurpose = Session::get("callPurpose");
            }else{
                $_getCallPurpose = $this->getCallPurpose();
                Session::put('callPurpose', $_getCallPurpose);
            }
            View::share("callPurposes", $_getCallPurpose);
            View::share("hotLine", '(028) 73 066 099');
        }
        View::share('propertyTypeList', $propertyTypeList);
        if (!empty($currentUser)) {
            View::share('isCurrentAdmin', $this->isCurrentAdmin());
        }
        //View::share('propertyTypeList', get_json(GET_PROPERTY_TYPE_LIST));
        View::share('isShowModalTaskDetail', !empty(\Request::input("show-modal-task-detail")) ? \Request::input("show-modal-task-detail") : true);
        View::share('isPage', isset(Route::getCurrentRequest()->segments()[0]) ? Route::getCurrentRequest()->segments()[0] : null);

    }

    public function getCallPurpose() {
        $currentGroup = \Session::get('currentGroup');
        $returnValue = [];
        if(in_array($currentGroup['departmentId'], [5, 12])){
            $response = get_json('task/get-definitions-call/'.$currentGroup['departmentId']);
            if($response->result && !empty($response->data)){
                $returnValue = $response->data;
            }
        }
        return $returnValue;        
    }

//    protected function getHtmlAgentList($listingTypeId = -1, $purposeId = -1, $chooseOnlyOne = true)
//    {
//        // -- Can not run javascript tags --
//        $data['agentList'] = get_json(GET_AGENT_LIST."/".$listingTypeId."/".$purposeId."/-1")->data;
//        $data['chooseOnlyOne'] = $chooseOnlyOne;
//        $view = View::make('request-manager.sub-items.html-agent-list', $data);
//        return $view->render();
//    }

    protected function getHtmlAgentListByRequestId($requestId = null, $type = null, $chooseType = 1, $str_assigned_id = '') {
//        + requestId la id cua request
//        + type = 1 (Request khong co listing)/ 2(request co listing)
//        $chooseType 1 => one, 2 => multi
//        $str_assigned_id = -23-12-34-
        $data['show_dialog_class'] = 'mfp-hide zoom-anim-dialog';
        if (\Request::ajax())
            $data['show_dialog_class'] = '';

        if (empty($requestId) || empty($type))
            exit();

        $data['agentList'] = get_json(GET_AGENT_LIST_BY_REQUEST . "/" . $requestId . "/" . $type)->data;
        $data['chooseType'] = $chooseType;
        $data['str_assigned_id'] = $str_assigned_id;

//        return view('request-manager.sub-items.html-agent-list-by-request-id', $data);
        $view = View::make('request-manager.sub-items.html-agent-list-by-request-id', $data);
        return $view->render();
    }

    protected function getHtmlAgentSaleList($chooseOnlyOne = true) {
        // -- Can not run javascript tags --
        $data['agentList'] = get_json(GET_AGENT_SALE_LIST)->data;
        $data['chooseOnlyOne'] = $chooseOnlyOne;
        $view = View::make('request-manager.sub-items.html-agent-sale-list', $data);
        return $view->render();
    }

    protected function getHtmlStaffList($chooseOnlyOne = true) {
        // -- Can not run javascript tags --
        $data['staffList'] = get_json(GET_BDE_MEMBER_LIST)->data;
        $data['chooseOnlyOne'] = $chooseOnlyOne;
        $view = View::make('request-manager.sub-items.html-staff-list', $data);
        return $view->render();
    }

    protected function getHtmlBdeMemberList($chooseOnlyOne = true) {
        // -- Can not run javascript tags --
        $data['bdeList'] = get_json(GET_BDE_MEMBER_LIST)->data;
        $data['chooseOnlyOne'] = $chooseOnlyOne;
        $view = View::make('request-manager.sub-items.html-bde-member-list', $data);
        return $view->render();
    }

    protected function getHtmlBrokerageFirmList($chooseOnlyOne = true) {
        // -- Can not run javascript tags --
        $data['results'] = get_json(GET_BROKERAGE_FIRM_LIST)->data;
        $data['chooseOnlyOne'] = $chooseOnlyOne;
        $view = View::make('request-manager.sub-items.html-brokerage-firm-list', $data);
        return $view->render();
    }

    public function isCurrentAdmin() {
        $user = Session::get("user");
        $isAdmin = false;
        if(!empty($user->departments)){
            foreach ($user->departments as $dept) {
                if ($dept->isGroupAdmin) {
                    $isAdmin = true;
                    break;
                }
            }
        }
        return $isAdmin;
    }

    public function isCrm() {
        $user = Session::get("user");
        $result = false;
        foreach ($user->departments as $dept) {
            if ($dept->departmentId == 12) {
                $result = true;
                break;
            }
        }
        return $result;
    }

    /**
     * Set Permission
     *
     * @author huy.chau@propzy.vn
     * @return void
     */
    private function setPermission() {
        // Get Logged-in user info
        $loggedInUser = getLoggedInUserInfo();
        if (!empty($loggedInUser)) {
            if(!empty($loggedInUser->departments)){
                if ($loggedInUser->departments[0]->departmentId == 13) {
                    if (isset($loggedInUser->entities[0]->actions)) {
                        if (count($loggedInUser->entities[0]->actions) > 0) {
                            foreach ($loggedInUser->entities[0]->actions as $action) {
                                switch ($action->actionName) {
                                    case 'Update':
                                        $this->editPerm = $this->getActionPermission($action->permissionId);
                                        View::share('editPerm', $this->editPerm);
                                        break;
                                    case 'Add':
                                        $this->addPerm = $this->getActionPermission($action->permissionId);
                                        View::share('addPerm', $this->addPerm);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Get flag for selected permission
     *
     * @author huy.chau@propzy.vn
     * @param  integer $permiss 
     * @return integer 0 (DENIED) 1 (ALLOW)
     */
    private function getActionPermission($permiss) {
        if ($permiss == ACCESS_DENIED_PERM) {
            return 0;
        } else {
            return 1;
        }
    }

    protected function getDepartmentGroup($departmentId = null) {
        $departments = collect();
        try {
            $resultDepartment = $data['listDepartments'] = get_json(GET_DEPARTMENTS);
            if($resultDepartment->result) {
                $data = $resultDepartment->data;
                if(is_array($data) && count($data) > 0) {
                    foreach ($data as $department) {
                        $departments = $departments->union([ $department->id=> [
                            'id' => $department->id,
                            'departmentName' => $department->departmentName,
                            'departmentCode' => $department->departmentCode,
                            'parentId' => $department->parentId,
                            'child' => collect(),
                        ]]);
                    }
                    if (isset($departmentId)) {
                       $departmentMain = $departments->filter(function ($value, $key) use ($departmentId){
                           return $key == $departmentId;
                       });
                        $departmentChild = $departments->filter(function ($value, $key) use ($departmentId){
                            return $value['parentId'] == $departmentId;
                        });
                        if($departmentChild->count() > 0) {
                            $departmentMain['child'] = $departmentChild;
                        }
                        $departments = $departmentMain;
                    }
                }
            }

        } catch (Exception $e) {

        }
        return $departments;
    }

    protected function numberPageFromRequest($request) {
        $numberPage = 10;
        $items = isset($request['length']) ? $request['length'] : $numberPage;
        return [
            'items' => $items,
            'pages' => ((isset($request['start']) ? $request['start'] : 0) / $items) + 1,
            'offset' => $items,
            'limit' => (isset($request['start']) ? $request['start'] : 0),
        ];
    }

}
