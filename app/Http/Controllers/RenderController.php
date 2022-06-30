<?php
namespace App\Http\Controllers;

use App\Task;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Storage;

class RenderController extends BaseController {
    public function __construct() {
        parent::__construct();
        //
    }

    public function renderProgressList(){
    	$postData = \Request::json()->all();

    	if($postData['type'] == 'lead'){
    		$viewData['leadDealDetail'] = get_json(GET_LEAD_DETAIL . '-new/' . $postData['typeId'])->data;
    	}else{
    		$viewData['leadDealDetail'] = get_json(GET_DEAL_DETAIL . '-new/' . $postData['typeId'])->data;
    	}
    	$returnHTML = view('jmRender.progresslist')->with($viewData)->render();
    	
    	return response()->json($returnHTML);
    }

    public function renderCountTabFollowing(){
        $postData = \Request::json()->all();

        if($postData['type'] == 'lead'){
            $countListing = post_json('listing/deal-lead', (object) ['leadId' => $postData['typeId']])->data;
        }else{
            $countListing = post_json('listing/deal-lead', (object) ['dealId' => $postData['typeId']])->data;
        }

        $sortForCountListing = [];
        
        foreach ($countListing as $key => $value) {
            $sortForCountListing[$value->typeListing] = $value->count;
        }
        $viewData['countListing'] = $sortForCountListing;
        $viewData['type'] = $postData['type'];

        $returnHTML = view('jmRender.countTabFollowing')->with($viewData)->render();
        
        return response()->json($returnHTML);
    }
}
?>