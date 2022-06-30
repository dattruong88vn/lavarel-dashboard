<?php

namespace App\Http\Controllers;

use App\Libraries\UserAuth;

class ContactController extends BaseController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function add()
    {
        return view('Contact.add');
    }

    public function mine()
    {
        $viewData = [];
        $listFilters = get_json(GET_ALL_FILTERS);
        if ($listFilters->code == 401) {
            abort($listFilters->code);
        }
        if ($listFilters->code == 200)
            $viewData['listFilters'] = $listFilters->data;
        return view('contact.mine')->with($viewData);
    }

    public function invite()
    {
        return view('contact.invite');
    }
    public function getProfile($id)
    {
        $currentUser = \Session::get("user");
        if (empty($currentUser)) {
            abort(403);
        }
        if (!UserAuth::hasPermission($currentUser, UserAuth::ENTITY_ACCOUNT)) {
            if ($id != $currentUser->userId) {
                abort(403);
            }
        }
        $detailInfos = get_json(DETAIL_INFOS . '/user/' . $id);
        return response()->json($detailInfos);
    }

    public static function profileForm($profileId)
    {
        $viewData = [];
        $viewData['userTypeList'] = get_json(GET_LISTING_USER_TYPE);
        $viewData['userTitleList'] = get_json(GET_LIST_USER_TITLE)->data;
        $viewData['profileId'] = $profileId;
        $currentUser = \Session::get("user");
        if (empty($currentUser)) {
            abort(403);
        }
        $viewData['classVisiable'] = $profileId == $currentUser->userId ? 'invisible prop-hidden' : 'form-group';
        return view('contact.profile-form', $viewData);
    }
}
