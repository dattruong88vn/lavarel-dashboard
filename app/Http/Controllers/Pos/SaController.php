<?php

namespace App\Http\Controllers\Pos;

use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\BaseController;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;
use Validator;

class SaController extends CommonPosController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $user = \Session::has("user") ? \Session::get("user") : null;
        $isAccessPermissionPage = false;
        for ($i = 0; $i < count($user->entities); $i++) {
            if ($user->entities[$i]->code == "pos_sa" && !empty($user->entities[$i]->features)) {
                $isAccessPermissionPage = true;
            }
        }
        if (!$isAccessPermissionPage) {
            abort(401);
        }
        return view("pos.sa.index",['user' => $user]);
    }

    public function oldVersion()
    {
        return view("pos.sa.index",['user' => \Session::has("user") ? \Session::get("user") : null]);
    }

    public function detail($id)
    {

        if (!is_numeric($id) || $id == 0) {
            dd("ID không đúng");
        }
        // get info detail
        $response = get_json(sprintf(\Config::get('apis.sa.listings'), $id));
        //$response_seller_photos = get_json(sprintf(\Config::get('apis.sa.seller-photos'), $id));
        setCallKeyCookie();
        // check role can action button group
        $right = false;
        $respRole = post_json_sam_db('/users/check-viewing-update-on-object',["rlistingIds"=>[$id]]);

        if($respRole && $respRole->result && count($respRole->data) > 0){
            $listingItem = $respRole->data[0];
            $right = $listingItem->viewUpdateDetailListing;
        }
        
        // \\check role can action button group
        if ($response->result && !empty($response->data)) {
            // optimize code, only get more api if get response successfully
            $response_propzy_services = get_json(sprintf(\Config::get('apis.sa.propzy-services'), $id));
            $response_seller_update_listing = get_json(sprintf(\Config::get('apis.sa.seller-update-listing'), $id));

            // revert encoded special char for title and metatag title
            $response->data->title = htmlspecialchars_decode($response->data->title, ENT_QUOTES);
            if (!empty($response->data->metaTag)) {
                $response->data->metaTag->title = $response->data->title;
            }

            $jsDetailData = \GuzzleHttp\json_encode($response->data);
            $role = 'edit';
            return view("pos.sa.detail", ['jsDetailData' => $jsDetailData, 'right' => $right, 'role' => $role, 'propzy_services' => $response_propzy_services->data, 'seller_drafts' => $response_seller_update_listing->data]);
        } else {
            dd($response->message);
        }
    }

    public function updatePropzyServices($id)
    {
        $postData = \Request::input();
        $response = put_json(sprintf(\Config::get('apis.sa.propzy-services'), $id), $postData);
        return $response->code;
    }

    public function getSellerPhotos($id)
    {
        $postData = \Request::input();
        $response = put_json(sprintf(\Config::get('apis.sa.seller-photos'), $id), $postData);
        return $response->code;
    }


    public function view($id)
    {
        if (!is_numeric($id) || $id == 0) {
            dd("ID không đúng");
        }
        $response = get_json(sprintf(\Config::get('apis.sa.listings'), $id));
        if ($response->result && !empty($response->data)) {
            $jsDetailData = \GuzzleHttp\json_encode($response->data);
            $role = 'view';
            return view("pos.sa.detail", ['jsDetailData' => $jsDetailData, 'role' => $role]);
        } else {
            dd($response->message);
        }
    }

    public function create()
    {

        $role = 'create';
        return view("pos.sa.detail", ['role' => $role, 'right' => true]);
    }

    function marketReport($rlistingId = null)
    {
        $data = [
            'rlistingId' => $rlistingId
        ];

        $data = \GuzzleHttp\json_encode($data);

        return view('pos.sa.marketReport', ['data' => $data]);
    }

    function checkEmptyList()
    {
        return view('pos.sa.checkEmptyList');
    }


    function negotiationManager()
    {
        return view('pos.sa.negotiateList');
    }

    function depositManager()
    {
        return view('pos.sa.depositList');
    }

    function depositHistoryManager($depositId = -1)
    {
        $data = [
            'depositId' => $depositId
        ];
        return view('pos.sa.depositHistoryManager', compact('data'));
    }

    function negotiationHistoryManager($negotiationId_dealId = '0-0')
    {
        $negotiationId_dealId = explode('-', $negotiationId_dealId);
        $data = [
            'negotiationId' => $negotiationId_dealId[0],
            'dealId' => $negotiationId_dealId[1]
        ];
        return view('pos.sa.negotiationHistoryManager', compact('data'));
    }
    function updateLatLong()
    {
        return view('pos.sa.updateLatLong');
    }

    function depositSupportManager()
    {
        return view('pos.sa.depositSupportManager');
    }

    function checkExistZoneFromLatLng()
    {        
        $postData = \Request::input();        
        $response = post_json_back_office('map/forward-api-to', [
            'serviceName'=> "geo",
            'urlSuffix'=> '/landplot/search-with-location?keyword=' . $postData['location'],
            'method' => 'GET',
            'body'=> new \stdClass()
        ]);
        return response()->json($response->result && !empty($response->data->data));
    }
}
