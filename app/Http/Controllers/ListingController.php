<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;
use App\Libraries\CacheManager;
use Validator;
use Illuminate\Support\Facades\Log;
use \Cache;

class ListingController extends BaseController {

    const SESSION_DUPLICATED_LISTING_ID = "DUPLICATED_LISTING_IDS";

    public function __construct() {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        parent::__construct();
    }

    public function index(Request $request) {
        $data['queryString'] = $_SERVER['QUERY_STRING'];
        $data['page_title'] = "LISTING";
        $data['userTypeList'] = get_json(GET_USER_TYPE_LIST);
        $data['buildingList'] = get_json(GET_BUILDINGS)->data;

        $object = array(
            'buildingId' => $request->input('building-name') ? (int) $request->input('building-name') : null,
            'propertyTypeId' => $request->input('property-type') ? (int) $request->input('property-type') : null,
            'staffId' => $request->input('staffId') ? (int) $request->input('staffId') : null,
            'source' => $request->input('source') ? (int) $request->input('source') : null,
            'createdDate' => $request->input('date-create') ? strtotime($request->input('date-create')) : null,
            'reviewedDate' => $request->input('date-live') ? strtotime($request->input('date-live')) : null,
            'deletedDate' => $request->input('date-delete') ? strtotime($request->input('date-delete')) : null,
            'assignedDate' => $request->input('assignedDate') ? strtotime($request->input('assignedDate')) : null
        );
        $object['createdDate'] = $request->input('date-create');
        $object['reviewedDate'] = $request->input('date-live');
        $object['deletedDate'] = $request->input('date-delete');
        $object['assignedDate'] = $request->input('assignedDate');
        //var_dump($object);
        //var_dump($request->all());
        //var_dump($object);
        // exit();
        $data['filterList'] = $object;
        //var_dump($data['listingList']);
        $data['isFull'] = $request->input('isFull') != "" ? $request->input('isFull') : 1;
        $data['accountList'] = get_json(GET_ACCOUNT_LIST)->data;
        //return response()->json($user);
        $isAdmin = $this->isCurrentAdmin();
        $data['isAdmin'] = $isAdmin;
        return view('listing')->with($data);
    }

    public function getAjaxListingList(Request $request) {
        //date_default_timezone_set('Asia/Ho_Chi_Minh');
        $orderedColumns = array(
            '0' => 'ID',
            '1' => 'LISTING_TYPE',
            '2' => 'PROPERTY_TYPE',
            '3' => 'SIZE',
            '5' => 'DISTRICT',
            '6' => 'ASSIGNED_DATE',
            '9' => 'STATUS'
        );
        $object = array(
            'buildingId' => $request->input('building-name') ? (int) $request->input('building-name') : null,
            'propertyTypeId' => $request->input('property-type') ? (int) $request->input('property-type') : null,
            'staffId' => $request->input('staffId') ? (int) $request->input('staffId') : null,
            'source' => $request->input('source') ? (int) $request->input('source') : null,
            'createdDate' => $request->input('date-create') ? strtotime($request->input('date-create')) : null,
            'reviewedDate' => $request->input('date-live') ? strtotime($request->input('date-live')) : null,
            'deletedDate' => $request->input('date-delete') ? strtotime($request->input('date-delete')) : null,
            'assignedDate' => $request->input('assignedDate') ? strtotime($request->input('assignedDate')) : null
        );

        //var_dump( $response);
        $object['deletedDate'] = $request->input('date-delete') ? strtotime($request->input('date-delete')) : NULL;
        //var_dump($object);
        //var_dump($request->all());
        //var_dump($object);
        // exit();

        $object['limitItem'] = df_int($request->input('length') ? $request->input('length') : 10);

        $pageNumber = $request->input('start') ? $request->input('start') + 1 : 1;
        if ($pageNumber >= $object['limitItem']) {
            $pageNumber = 1 + ($pageNumber / $object['limitItem']);
        }
        $object['pageNumber'] = df_int($pageNumber);
        $object['columnName'] = 'ID';
        $search = $request->input('search');
        $object['searchKey'] = $search['value'] ? $search['value'] : NULL;
        $orders = $request->input('order');
        $object['columnName'] = $orders[0]['column'] ? $orderedColumns[$orders[0]['column'] . ''] : 'ID';
        $dir = $orders[0]['dir'];
        $object['orderType'] = ($dir == null || $dir == 'asc') ? 2 : 1;
        $object['isFull'] = $request->input('isFull');
        if ($object['isFull'] == null) {
            $object['isFull'] = 1;
        } else {
            $object['isFull'] = (int) $object['isFull'];
        }
        //return response()->json($object);
        $response = post_json(GET_LISTING_LIST, $object);

        //return response()->json($response);
        $returnObject = array(
            'draw' => $request->get('draw') ? $request->get('draw') : 1,
            "recordsTotal" => $response->data->totalResults,
            'recordsFiltered' => $response->data->totalResults,
            'data' => array()
        );


        $isAdmin = $this->isCurrentAdmin();

        //return response()->json($response);
        foreach ($response->data->list as $item) {
            $allowEditChecked = "";
            if ($item->allowEdit) {
                $allowEditChecked = "checked";
            }
            $returnObject['data'][] = array(
                '<a href="/listing/' . $item->rlistingId . '" >' . $item->rlistingId . '</a>',
                $item->listingTypeName,
                $item->propertyTypeName,
                $item->floorSize,
                $item->address,
                $item->districtName,
                $item->assignedDate ? date('d-m-Y H:i:s', $item->assignedDate / 1000) : NULL,
                $item->ownerName . "<br />" . ($item->createdDate ? date('d-m-Y H:i:s', $item->createdDate / 1000) : NULL),
                $item->reviewerName . "<br />" . ($item->reviewedDate ? date('d-m-Y H:i:s', $item->reviewedDate / 1000) : NULL),
                $item->statusName,
                $item->source,
                $isAdmin ? "<input type='checkbox' class='allowEdit' $allowEditChecked onclick=\"return changeAllowEdit(this, '$item->rlistingId')\" />" : "",
                //$item->allowEdit,
                '<button type="button" class="btn btn-primary" onclick="return doDuplicate(' . $item->rlistingId . ')" id="duplicateListing">Duplicate</button>'
            );
        }

        $data['filterList'] = $object;
        $data['listingList'] = $response;
        return response()->json($returnObject);
    }

    public function isListingViewable($id) {
        $result = true;
        $responseListing = get_json(GET_LISTING_DETAIL . "/" . $id);
        return response()->json($responseListing);
        if ($responseListing->code == 403) {
            $result = FALSE;
        }
        $viewData = array(
            "result" => $result
        );
        return response()->json($viewData);
    }

    public function listingDetail(Request $request, $slug) {
        $requestForceAccess = $request->input("forceAccess");
        $forceAccess = FALSE;
        $listingId = (explode("-", $slug));
        $listingId = $listingId[count($listingId) - 1];
        $duplicatedRlistingIds = session(static::SESSION_DUPLICATED_LISTING_ID);
        $referrer = $request->headers->get('referer');
        $requestArray = explode('/', $referrer);
        //return response()->json($requestArray);
        $returnUrl = "/listing";
        if (!$requestForceAccess) {
            if (count($requestArray) > 1) {
                if ($requestArray[count($requestArray) - 1] == "listing" || $requestArray[count($requestArray) - 1] == "assigned") {
                    $returnUrl = $referrer;
                }
                if ($requestArray[count($requestArray) - 2] == "listing" && $requestArray[count($requestArray) - 1] == "new") {
                    if (!empty($duplicatedRlistingIds) && in_array($listingId, $duplicatedRlistingIds)) {
                        $forceAccess = TRUE;
                    }
                }
            }
        } else {
            $forceAccess = ($requestForceAccess == 1) ? TRUE : FALSE;
        }
        $data['returnUrl'] = $returnUrl;
        $data['forceAccess'] = $forceAccess;
        //return GET_LISTING_DETAIL . "/" . $listingId . "/" . ($forceAccess?"true":"false");
        $responseListing = get_json(GET_LISTING_DETAIL . "/" . $listingId . "/" . ($forceAccess ? "true" : "false"));
        //return response()->json( $responseListing);
        if ($responseListing->code == 403) {
            return redirect("/listing");
        }
        $data['listing'] = $responseListing->data;
        //var_dump($data['listing']);
        //exit();
        $listingTypeId = $data['listing']->listingType->listingTypeID;
        $propertyTypeId = $data['listing']->propertyType->propertyTypeID;
        if (isset($data['listing']->cityId)) {
            $cityId = $data['listing']->cityId;
        } else {
            $cityId = -1;
        }
        if (isset($data['listing']->districtId)) {
            $districtId = $data['listing']->districtId;
        } else {
            $districtId = -1;
        }

        $purposeId = $data['listing']->purpose->purPoseID;

        if (count($data['listing']->amenitiesOtherList) > 0) {
            $arr_other_amenities = array();
            $arr_other_amenities_en = array();
            foreach ($data['listing']->amenitiesOtherList as $value) {
                $amenities = $value->amenityName;
                $amenitiesEn = $value->amenityNameEn;
                if (isset($amenities)) {
                    array_push($arr_other_amenities, $amenities);
                }
                if (isset($amenitiesEn)) {
                    array_push($arr_other_amenities_en, $amenitiesEn);
                }
            }
            $data['arr_other_amenities'] = $arr_other_amenities;
            $data['arr_other_amenities_en'] = $arr_other_amenities_en;
        }
        foreach ($data['listing']->socialCommunications as $value) {
            if (!empty($value->agentType)) {
                $data['agentObject'] = array(
                    'id' => array('socialUid' => $value->id->socialUid),
                    'email' => $value->email,
                    'name' => $value->name,
                    'telephone' => $value->telephone,
                    'phone' => $value->phone,
                    'address' => $value->address,
                    'agentType' => array('agentTypeId' => $value->agentType->agentTypeId)
                );
            } else {
                $data['ownerObject'] = array(
                    'id' => array('socialUid' => $value->id->socialUid),
                    'email' => $value->email,
                    'name' => $value->name,
                    'telephone' => $value->telephone,
                    'phone' => $value->phone,
                    'address' => $value->address
                );
            }
        }
        /* if(intval($data['listing']->blockId) != null)
          {
          $data['blockdetail'] = get_json(GET_BLOCK_DETAIL.'/'.$data['listing']->blockId)->data;

          if($data['listing']->blockId == $data['blockdetail']->blockId)
          {
          $data['numberBasement'] = $data['blockdetail']->numberBasement;
          $data['numberElevator'] = $data['blockdetail']->numberElevator;
          $data['yearBuilt'] = $data['blockdetail']->yearBuilt;
          $data['yearFixed'] = $data['blockdetail']->yearFixed;
          $data['numberFloor'] = $data['blockdetail']->numberFloor;
          }
          }

          if(intval($data['listing']->buildingId) == 0 && $data['listing']->buildingObject != null)
          {
          foreach ($data['buildingList'] as $value) {
          if(intval($data['listing']->buildingId) == $value->buildingId)
          {
          $data['numberBasement'] = $listing['buildingObject']->numberBasement;
          $data['numberElevator'] = $listing['buildingObject']->numberElevator;
          $data['yearBuilt'] = $listing['buildingObject']->yearBuilt;
          $data['yearFixed'] = $listing['buildingObject']->yearFixed;
          $data['numberFloor'] =$listing['buildingObject']->numberFloor;
          }
          }
          }
          else
          {
          if(isset($data['listing']->numberBasement))
          {$data['numberBasement'] = $data['listing']->numberBasement;}
          if(isset($data['listing']->numberElevator))
          {$data['numberElevator'] = $data['listing']->numberElevator;}
          if(isset($data['listing']->yearBuil))
          {$data['yearBuilt'] = $data['listing']->yearBuilt;}
          if(isset($data['listing']->yearFixed))
          {$data['yearFixed'] = $data['listing']->yearFixed;}
          if(isset($data['listing']->numberFloor))
          {$data['numberFloor'] = $data['listing']->numberFloor;}
          }
         */

        if (isset($data['listing']->source)) {
            $listingSource = $data['listing']->source;
            $data['listUser'] = Cache::remember('GET_USER_LIST_' . $listingSource, \Config::get('constant.expiredAt'), function() use ($listingSource) {
                return get_json(GET_USER_LIST . "/" . $listingSource)->data;
            });
        }
        $data['propertyTypeList'] = Cache::remember('GET_PROPERTY_TYPE_LIST', \Config::get('constant.expiredAt'), function() {
            return get_json(GET_PROPERTY_TYPE_LIST);
        });

        $data['fee_listing'] = Cache::remember('GET_FEES_TYPE_LIST', \Config::get('constant.expiredAt'), function() {
            return get_json(GET_FEES_TYPE_LIST);
        });

        foreach ($data['listing']->relatedListingFees as $key => $value) {
            if ($value->currency == "VND") {
                $data['currency_fee'] = "VND";
                break;
            }
            if ($value->currency == "USD") {
                $data['currency_fee'] = "USD";
                break;
            }
        }
        $data['buildingList'] = Cache::remember('GET_BUILDINGS', \Config::get('constant.expiredAt'), function() {
            return get_json(GET_BUILDINGS)->data;
        });
        $data['userTypeList'] = Cache::remember('GET_LISTING_USER_TYPE', \Config::get('constant.expiredAt'), function() {
            return get_json(GET_LISTING_USER_TYPE);
        });


        //var_dump($data['propertyTypeListFilter']);
        // exit();
        //var_dump($data['buildingList']);
        $data['cityList'] = Cache::remember('GET_CITY_LIST', \Config::get('constant.expiredAt'), function() {
            return get_json(GET_CITY_LIST);
        });
        $data['districtList'] = Cache::remember('GET_DISTRICT_LIST_' . $cityId, \Config::get('constant.expiredAt'), function() use ($cityId) {
            return get_json(GET_DISTRICT_LIST . "/" . $cityId);
        });
        $data['wardList'] = Cache::remember('GET_WARD_LIST_' . $districtId , \Config::get('constant.expiredAt'), function() use ($districtId) {
            return get_json(GET_WARD_LIST . "/" . $districtId)->data;
        });

        if ($listingTypeId == 3) {
            $listingTypeId = 1;
        }
        if ($listingTypeId == 4) {
            $listingTypeId = 2;
        }
        $data['propertyTypeListFilter'] = Cache::remember('GET_PROPERTY_TYPE_LIST_' . $listingTypeId, \Config::get('constant.expiredAt'), function() use ($listingTypeId) {
            return get_json(GET_PROPERTY_TYPE_LIST . "/" . $listingTypeId);
        });
        //var_dump($listingTypeId);
        //exit();
        $data['amenityList'] = Cache::remember('GET_AMENITIES_' . $listingTypeId . "_" . $propertyTypeId . "_2", \Config::get('constant.expiredAt'), function() use ($listingTypeId, $propertyTypeId) {
            return get_json(GET_AMENITIES . "/" . $listingTypeId . "/" . $propertyTypeId . "/2");
        });
        $data['projectList'] = Cache::remember('GET_PROJECT', \Config::get('constant.expiredAt'), function() {
            return get_json(GET_PROJECT)->data;
        });
        $data['requestListLittle'] = array(); //get_json(GET_LITTLE_REQUEST)->data;
        $data['transactionListLittle'] = array(); //get_json(GET_LITTLE_TRANSACTION)->data;
        $data['reasonPendingList'] = Cache::remember('GET_REASON_TYPE_LIST_1', \Config::get('constant.expiredAt'), function() {
            return get_json(GET_REASON_TYPE_LIST . "/1")->data;
        });
        $data['reasonRejectList'] = Cache::remember('GET_REASON_TYPE_LIST_2', \Config::get('constant.expiredAt'), function() {
            return get_json(GET_REASON_TYPE_LIST . "/2")->data;
        });
        $data['agentList'] = Cache::remember('GET_AGENT_LIST_' . $listingTypeId . "_" . $purposeId . "_" . $districtId, \Config::get('constant.expiredAt'), function() use ($listingTypeId, $purposeId, $districtId) {
            return get_json(GET_AGENT_LIST . "/" . $listingTypeId . "/" . $purposeId . "/" . $districtId)->data;
        });
        $data['phpage_title'] = "Thông tin listing";

        $abc = check_fee_listing(1, $data['listing']->relatedListingFees);
        if (check_amenities_listing(327, $data['listing']->amenitiesList)) {
            //var_dump(check_amenities_listing(327,$data['listing']->amenitiesList));
        };

        return view('info-listing')->with($data);
    }

    public function listingView(Request $request, $slug) {
        $requestForceAccess = $request->input("forceAccess");
        $forceAccess = FALSE;
        $listingId = (explode("-", $slug));
        $listingId = $listingId[count($listingId) - 1];
        $duplicatedRlistingIds = session(static::SESSION_DUPLICATED_LISTING_ID);
        $referrer = $request->headers->get('referer');
        $requestArray = explode('/', $referrer);
        //return response()->json($requestArray);
        $returnUrl = "/listing";
        if (!$requestForceAccess) {
            if (count($requestArray) > 1) {
                if ($requestArray[count($requestArray) - 1] == "listing" || $requestArray[count($requestArray) - 1] == "assigned") {
                    $returnUrl = $referrer;
                }
                if ($requestArray[count($requestArray) - 2] == "listing" && $requestArray[count($requestArray) - 1] == "new") {
                    if (!empty($duplicatedRlistingIds) && in_array($listingId, $duplicatedRlistingIds)) {
                        $forceAccess = TRUE;
                    }
                }
            }
        } else {
            $forceAccess = ($requestForceAccess == 1) ? TRUE : FALSE;
        }
        $data['returnUrl'] = $returnUrl;
        $data['forceAccess'] = $forceAccess;
        //return GET_LISTING_DETAIL . "/" . $listingId . "/" . ($forceAccess?"true":"false");
        $responseListing = get_json(GET_LISTING_DETAIL . "/" . $listingId . "/" . ($forceAccess ? "true" : "false"));
        //return response()->json( $responseListing);
        if ($responseListing->code == 403) {
            return redirect("/listing");
        }
        $data['listing'] = $responseListing->data;
        //var_dump($data['listing']);
        //exit();
        $listingTypeId = $data['listing']->listingType->listingTypeID;
        $propertyTypeId = $data['listing']->propertyType->propertyTypeID;
        if (isset($data['listing']->cityId)) {
            $cityId = $data['listing']->cityId;
        } else {
            $cityId = -1;
        }
        if (isset($data['listing']->districtId)) {
            $districtId = $data['listing']->districtId;
        } else {
            $districtId = -1;
        }

        $purposeId = $data['listing']->purpose->purPoseID;

        if (count($data['listing']->amenitiesOtherList) > 0) {
            $arr_other_amenities = array();
            $arr_other_amenities_en = array();
            foreach ($data['listing']->amenitiesOtherList as $value) {
                $amenities = $value->amenityName;
                $amenitiesEn = $value->amenityNameEn;
                if (isset($amenities)) {
                    array_push($arr_other_amenities, $amenities);
                }
                if (isset($amenitiesEn)) {
                    array_push($arr_other_amenities_en, $amenitiesEn);
                }
            }
            $data['arr_other_amenities'] = $arr_other_amenities;
            $data['arr_other_amenities_en'] = $arr_other_amenities_en;
        }
        foreach ($data['listing']->socialCommunications as $value) {
            if (!empty($value->agentType)) {
                $data['agentObject'] = array(
                    'id' => array('socialUid' => $value->id->socialUid),
                    'email' => $value->email,
                    'name' => $value->name,
                    'telephone' => $value->telephone,
                    'phone' => $value->phone,
                    'address' => $value->address,
                    'agentType' => array('agentTypeId' => $value->agentType->agentTypeId)
                );
            } else {
                $data['ownerObject'] = array(
                    'id' => array('socialUid' => $value->id->socialUid),
                    'email' => $value->email,
                    'name' => $value->name,
                    'telephone' => $value->telephone,
                    'phone' => $value->phone,
                    'address' => $value->address
                );
            }
        }
        /* if(intval($data['listing']->blockId) != null)
          {
          $data['blockdetail'] = get_json(GET_BLOCK_DETAIL.'/'.$data['listing']->blockId)->data;

          if($data['listing']->blockId == $data['blockdetail']->blockId)
          {
          $data['numberBasement'] = $data['blockdetail']->numberBasement;
          $data['numberElevator'] = $data['blockdetail']->numberElevator;
          $data['yearBuilt'] = $data['blockdetail']->yearBuilt;
          $data['yearFixed'] = $data['blockdetail']->yearFixed;
          $data['numberFloor'] = $data['blockdetail']->numberFloor;
          }
          }

          if(intval($data['listing']->buildingId) == 0 && $data['listing']->buildingObject != null)
          {
          foreach ($data['buildingList'] as $value) {
          if(intval($data['listing']->buildingId) == $value->buildingId)
          {
          $data['numberBasement'] = $listing['buildingObject']->numberBasement;
          $data['numberElevator'] = $listing['buildingObject']->numberElevator;
          $data['yearBuilt'] = $listing['buildingObject']->yearBuilt;
          $data['yearFixed'] = $listing['buildingObject']->yearFixed;
          $data['numberFloor'] =$listing['buildingObject']->numberFloor;
          }
          }
          }
          else
          {
          if(isset($data['listing']->numberBasement))
          {$data['numberBasement'] = $data['listing']->numberBasement;}
          if(isset($data['listing']->numberElevator))
          {$data['numberElevator'] = $data['listing']->numberElevator;}
          if(isset($data['listing']->yearBuil))
          {$data['yearBuilt'] = $data['listing']->yearBuilt;}
          if(isset($data['listing']->yearFixed))
          {$data['yearFixed'] = $data['listing']->yearFixed;}
          if(isset($data['listing']->numberFloor))
          {$data['numberFloor'] = $data['listing']->numberFloor;}
          }
         */

        if (isset($data['listing']->source)) {
            $listingSource = $data['listing']->source;
            $data['listUser'] = Cache::remember('GET_USER_LIST_' . $listingSource, \Config::get('constant.expiredAt'), function() use ($listingSource) {
                return get_json(GET_USER_LIST . "/" . $listingSource)->data;
            });
        }
        $data['propertyTypeList'] = Cache::remember('GET_PROPERTY_TYPE_LIST', \Config::get('constant.expiredAt'), function() {
            return get_json(GET_PROPERTY_TYPE_LIST);
        });

        $data['fee_listing'] = Cache::remember('GET_FEES_TYPE_LIST', \Config::get('constant.expiredAt'), function() {
            return get_json(GET_FEES_TYPE_LIST);
        });

        foreach ($data['listing']->relatedListingFees as $key => $value) {
            if ($value->currency == "VND") {
                $data['currency_fee'] = "VND";
                break;
            }
            if ($value->currency == "USD") {
                $data['currency_fee'] = "USD";
                break;
            }
        }
        $data['buildingList'] = Cache::remember('GET_BUILDINGS', \Config::get('constant.expiredAt'), function() {
            return get_json(GET_BUILDINGS)->data;
        });
        $data['userTypeList'] = Cache::remember('GET_LISTING_USER_TYPE', \Config::get('constant.expiredAt'), function() {
            return get_json(GET_LISTING_USER_TYPE);
        });


        //var_dump($data['propertyTypeListFilter']);
        // exit();
        //var_dump($data['buildingList']);
        $data['cityList'] = Cache::remember('GET_CITY_LIST', \Config::get('constant.expiredAt'), function() {
            return get_json(GET_CITY_LIST);
        });
        $data['districtList'] = Cache::remember('GET_DISTRICT_LIST_' . $cityId, \Config::get('constant.expiredAt'), function() use ($cityId) {
            return get_json(GET_DISTRICT_LIST . "/" . $cityId);
        });
        $data['wardList'] = Cache::remember('GET_WARD_LIST_' . $districtId , \Config::get('constant.expiredAt'), function() use ($districtId) {
            return get_json(GET_WARD_LIST . "/" . $districtId)->data;
        });

        if ($listingTypeId == 3) {
            $listingTypeId = 1;
        }
        if ($listingTypeId == 4) {
            $listingTypeId = 2;
        }
        $data['propertyTypeListFilter'] = Cache::remember('GET_PROPERTY_TYPE_LIST_' . $listingTypeId, \Config::get('constant.expiredAt'), function() use ($listingTypeId) {
            return get_json(GET_PROPERTY_TYPE_LIST . "/" . $listingTypeId);
        });
        //var_dump($listingTypeId);
        //exit();
        $data['amenityList'] = Cache::remember('GET_AMENITIES_' . $listingTypeId . "_" . $propertyTypeId . "_2", \Config::get('constant.expiredAt'), function() use ($listingTypeId, $propertyTypeId) {
            return get_json(GET_AMENITIES . "/" . $listingTypeId . "/" . $propertyTypeId . "/2");
        });
        $data['projectList'] = Cache::remember('GET_PROJECT', \Config::get('constant.expiredAt'), function() {
            return get_json(GET_PROJECT)->data;
        });
        $data['requestListLittle'] = array(); //get_json(GET_LITTLE_REQUEST)->data;
        $data['transactionListLittle'] = array(); //get_json(GET_LITTLE_TRANSACTION)->data;
        $data['reasonPendingList'] = Cache::remember('GET_REASON_TYPE_LIST_1', \Config::get('constant.expiredAt'), function() {
            return get_json(GET_REASON_TYPE_LIST . "/1")->data;
        });
        $data['reasonRejectList'] = Cache::remember('GET_REASON_TYPE_LIST_2', \Config::get('constant.expiredAt'), function() {
            return get_json(GET_REASON_TYPE_LIST . "/2")->data;
        });
        $data['agentList'] = Cache::remember('GET_AGENT_LIST_' . $listingTypeId . "_" . $purposeId . "_" . $districtId, \Config::get('constant.expiredAt'), function() use ($listingTypeId, $purposeId, $districtId) {
            return get_json(GET_AGENT_LIST . "/" . $listingTypeId . "/" . $purposeId . "/" . $districtId)->data;
        });
        $data['phpage_title'] = "Thông tin listing";

        $abc = check_fee_listing(1, $data['listing']->relatedListingFees);
        if (check_amenities_listing(327, $data['listing']->amenitiesList)) {
            //var_dump(check_amenities_listing(327,$data['listing']->amenitiesList));
        };

        return view('listing.info-listing-view')->with($data);
    }

    public function assignedListings(Request $request) {
        $data['queryString'] = $_SERVER['QUERY_STRING'];
        $data['page_title'] = "LISTING";
        $data['userTypeList'] = get_json(GET_USER_TYPE_LIST);
        $data['buildingList'] = get_json(GET_BUILDINGS)->data;

        $object = array(
            'buildingId' => $request->input('building-name') ? (int) $request->input('building-name') : null,
            'propertyTypeId' => $request->input('property-type') ? (int) $request->input('property-type') : null,
            'staffId' => $request->input('staffId') ? (int) $request->input('staffId') : null,
            'source' => $request->input('source') ? (int) $request->input('source') : null,
            'createdDate' => $request->input('date-create') ? strtotime($request->input('date-create')) : null,
            'reviewedDate' => $request->input('date-live') ? strtotime($request->input('date-live')) : null,
            'deletedDate' => $request->input('date-delete') ? strtotime($request->input('date-delete')) : null,
            'assignedDate' => $request->input('assignedDate') ? strtotime($request->input('assignedDate')) : null
        );
        $object['createdDate'] = $request->input('date-create');
        $object['reviewedDate'] = $request->input('date-live');
        $object['deletedDate'] = $request->input('date-delete');
        $object['assignedDate'] = $request->input('assignedDate');
        //var_dump($object);
        //var_dump($request->all());
        //var_dump($object);
        // exit();
        $data['filterList'] = $object;
        $staffs = get_json(GET_OTHER_STAFFS)->data;
        //return response()->json($staffs);
        $data['staffs'] = $staffs;
        $data['isFull'] = $request->input('isFull') != "" ? $request->input('isFull') : 1;
        $data['accountList'] = get_json(GET_ACCOUNT_LIST)->data;
        return view('assigned-listings')->with($data);
    }

    public function getAssignedListings(Request $request) {
        $orderedColumns = array(
            '0' => 'ID',
            '1' => 'LISTING_TYPE',
            '2' => 'PROPERTY_TYPE',
            '3' => 'SIZE',
            '5' => 'DISTRICT',
            '6' => 'ASSIGNED_DATE',
            '9' => 'STATUS'
        );

        $object = array(
            'buildingId' => $request->input('building-name') ? (int) $request->input('building-name') : null,
            'propertyTypeId' => $request->input('property-type') ? (int) $request->input('property-type') : null,
            'staffId' => $request->input('staffId') ? (int) $request->input('staffId') : null,
            'source' => $request->input('source') ? (int) $request->input('source') : null,
            'createdDate' => $request->input('date-create') ? strtotime($request->input('date-create')) : null,
            'reviewedDate' => $request->input('date-live') ? strtotime($request->input('date-live')) : null,
            'deletedDate' => $request->input('date-delete') ? strtotime($request->input('date-delete')) : null,
            'assignedDate' => $request->input('assignedDate') ? strtotime($request->input('assignedDate')) : null
        );
        //var_dump($object);
        //var_dump($request->all());
        //var_dump($object);
        // exit();

        $object['limitItem'] = df_int($request->input('length') ? $request->input('length') : 10);

        $pageNumber = $request->input('start') ? $request->input('start') + 1 : 1;
        if ($pageNumber >= $object['limitItem']) {
            $pageNumber = 1 + ($pageNumber / $object['limitItem']);
        }
        $object['pageNumber'] = df_int($pageNumber);
        $object['columnName'] = 'ID';
        $search = $request->input('search');
        $object['searchKey'] = $search['value'] ? $search['value'] : NULL;
        $orders = $request->input('order');
        $object['columnName'] = $orders[0]['column'] ? $orderedColumns[$orders[0]['column'] . ''] : 'ID';
        $dir = $orders[0]['dir'];
        $object['orderType'] = ($dir == null || $dir == 'asc') ? 2 : 1;
        $object['isFull'] = $request->input('isFull');
        if ($object['isFull'] == null) {
            $object['isFull'] = 1;
        } else {
            $object['isFull'] = (int) $object['isFull'];
        }
        $response = post_json(GET_ASSIGNED_LISTINGS, $object);
        $returnObject = array(
            'draw' => $request->get('draw') ? $request->get('draw') : 1,
            "recordsTotal" => $response->data->totalResults,
            'recordsFiltered' => $response->data->totalResults,
            'data' => array()
        );
        //return response()->json($response);
        foreach ($response->data->list as $item) {
            $returnObject['data'][] = array(
                '<a href="/listing/' . $item->rlistingId . '" >' . $item->rlistingId . '</a>',
                $item->listingTypeName,
                $item->propertyTypeName,
                $item->floorSize,
                $item->address,
                $item->districtName,
                $item->assignedDate ? date('d-m-Y H:i:s', $item->assignedDate / 1000) : NULL,
                $item->ownerName . "<br />" . ($item->createdDate ? date('d-m-Y H:i:s', $item->createdDate / 1000) : NULL),
                $item->reviewerName . "<br />" . ($item->reviewedDate ? date('d-m-Y H:i:s', $item->reviewedDate / 1000) : NULL),
                $item->statusName,
                $item->source,
                "<a href='#' class='reassign' onclick='return reassign($item->rlistingId)' >Reassign</a>"
            );
        }

        $data['filterList'] = $object;
        $data['listingList'] = $response;
        return response()->json($returnObject);
    }

    /*
     * /imageListingUploader[/?dir=where_to_save]
     */

    // public function imageListingUploader(Request $request) {
    //     $directory = $request->input('dir') ? $request->input('dir') . '/' : "images/";
    //     $image = Input::file('file_data');
    //     $fileId = md5($image->getClientSize() . time()) . '_image';
    //
    //     $filename = $fileId . '.' . $image->getClientOriginalExtension();
    //
    //     $img = Image::make($image->getRealPath())
    //                     ->save(UPLOAD_PATH . $directory . $filename)
    //                     ->resize(700, 525)->save(UPLOAD_PATH . 'thumbnail_for_gridview/' . $filename)
    //                     ->resize(500, 375)->save(UPLOAD_PATH . 'thumbnail_for_similar/' . $filename)
    //                     ->resize(300, 225)->save(UPLOAD_PATH . 'thumbnail_for_mapview/' . $filename);
    //     $data["initialPreview"] = array("<img src='" . UPLOAD_URL . $directory . $filename . "' class='file-preview-image' fileid='" . $fileId . "' alt='" . $filename . "' title='" . $filename . "'><div class='checkbox'><label><input class='isPrivatePhoto' name='isPrivatePhoto' id='isPrivatePhoto' type='checkbox'>  Riêng Tư</label></div>");
    //     $data["initialPreviewConfig"] = array(
    //         array("caption" => "", "key" => $filename)
    //     );
    //     return json_encode($data);
    // }

    /**
     * Upload image
     *
     * @param  Request $request
     * @return JSON $data
     */
    public function imageListingUploader(Request $request) {
      $type = $request->input('dir') ? ($request->input('dir') == 'use_right_type' ? 'useright' : 'listing') : 'listing';
      // Get upload image
      $image = Input::file('file_data');
      $fileId = md5($image->getClientSize() . time()) . '_image';
      $fileName = $fileId . '.' . $image->getClientOriginalExtension();

      // Upload image via API
      $uploadRs = uploadImageFilesUseApi($image, $type);
      $data = [
        "initialPreview" => 
        [
            "<img src='" . UPLOAD_URL . $uploadRs['data']['file_name'] . "' data-src='" . $uploadRs['data']['file_name'] . "' class='file-preview-image' fileid='" . $fileId . "' alt='" . $fileName . "' title='" . $fileName . "'><div class='checkbox'><label><input class='isPrivatePhoto' name='isPrivatePhoto' id='isPrivatePhoto' type='checkbox'>  Riêng Tư</label></div><div class='file-thumbnail-footer'>
               <div class='file-actions'>
                  <div class='file-footer-buttons'>
                     <button type='button' class='kv-file-remove btn btn-xs btn-default' title='Remove file' data-url='/imageListingRemover' data-key='".$fileId."'><i class='glyphicon glyphicon-trash text-danger'></i></button>
                  </div>
               </div>
            </div>"
        ],
        "initialPreviewConfig" => [
          "caption" => "",
          "key" => $fileName
        ]
      ];

      return json_encode($data);
    }

    /*
     * /imageListingUploader[?dir=where_to_save]
     */

    public function imageListingRemover(Request $request) {
        $filename = $request->get("key");
        $directory = $request->input('dir') ? $request->input('dir') . '/' : "images/";
        if (file_exists(UPLOAD_PATH . $directory . $filename)) {
            unlink(UPLOAD_PATH . $directory . $filename);
        }
        if (file_exists(UPLOAD_PATH . 'thumbnail_for_gridview/' . $filename)) {
            unlink(UPLOAD_PATH . 'thumbnail_for_gridview/' . $filename);
        }
        if (file_exists(UPLOAD_PATH . 'thumbnail_for_similar/' . $filename)) {
            unlink(UPLOAD_PATH . 'thumbnail_for_similar/' . $filename);
        }
        if (file_exists(UPLOAD_PATH . 'thumbnail_for_mapview/' . $filename)) {
            unlink(UPLOAD_PATH . 'thumbnail_for_mapview/' . $filename);
        }
        $data = array();
        return json_encode($data);
    }

    public function videoListingUploader(Request $request) {
        $videoDocument = Input::file('file_data');
        $fileId = time() . '_video';
        $filename = $fileId . '.' . $videoDocument->getClientOriginalExtension();
        $file = move_uploaded_file($videoDocument->getRealPath(), UPLOAD_PATH . 'videos/' . $filename);

        $data["initialPreview"] = array(0 => "<video width='213px' height='160px' controls title='" . $filename . "'><source name='" . $fileId . "' title='" . $filename . "' src='" . UPLOAD_URL . "videos/" . $filename . "' type='video/mp4'><div class='file-preview-other'><span class='file-icon-4x'><i class='glyphicon glyphicon-file'></i></span></div></video>")
        ;
        $data["initialPreviewConfig"] = array(
            array("caption" => "", "key" => $filename)
        );
        return json_encode($data);
    }

    public function videoListingRemover(Request $request) {
        $filename = $request->get("key");
        if (file_exists(UPLOAD_PATH . 'videos/' . $filename)) {
            unlink(UPLOAD_PATH . 'videos/' . $filename);
        }
        $data = array();
        return json_encode($data);
    }

    public function createListingJson(Request $request) {
        $data = $request->json()->all();
        //return response()->json($data);
        $response = post_json(CREATE_LISTING, $data);
        return json_encode($response);
    }

    public function duplicateListing($rListingId) {
        $data = get_json(DUPLICATE_LISTING . "/" . $rListingId);
        return response()->json($data);
    }

    public function updateListingJson(Request $request) {
        $data = $request->json()->all();
        $listing_id = $data['rlistingId'];

        //return json_encode($data);
        //return response()->json($data);
        $response = put_json(UPDATE_LISTING, $data);

        $config_cache['cache_path'] = '/var/www/html/propzyvn_cache_test/';
        $cache = new CacheManager($config_cache);
        //echo response()->json($cache->cache_info());
        /*
         * Xóa cache listing.
         */
        $cache->delete_by_tag('listing_' . $listing_id);

        return json_encode($response);
    }

    public function listingCreate() {
        $viewData = $this->prepareCreateData();
        $viewData['dataSource'] = "NEW";
        $viewData['itemData'] = NULL;
        return view('listing-create')->with($viewData);
    }

    public function createFromBriefForm($id) {
        $response = get_json(DEAL_REQUEST_DETAIL . "/$id");
        //return response()->json($response);
        $viewData = $this->prepareCreateData();
        $viewData['dataSource'] = "BRIEF_FORM";
        $viewData['itemData'] = $response->data;
        return view('listing-create')->with($viewData);
    }

    public function prepareCreateData() {

        $data['developerList'] = get_json(GET_DEVELOPER)->data;
        $data['fee_listing'] = get_json(GET_FEES_TYPE_LIST);
        $data['propertyTypeList'] = get_json(GET_PROPERTY_TYPE_LIST);
        $data['userTypeList'] = get_json(GET_LISTING_USER_TYPE);
        $data['buildingList'] = get_json(GET_BUILDINGS)->data;
        $data['cityList'] = get_json(GET_CITY_LIST);
        $data['districtList'] = get_json(GET_DISTRICT_LIST . "/1");

        $data['projectList'] = get_json(GET_PROJECT)->data;
        $data['requestListLittle'] = array(); //get_json(GET_LITTLE_REQUEST)->data;
        $data['transactionListLittle'] = array(); //get_json(GET_LITTLE_TRANSACTION)->data;
        $data['page_title'] = "Tạo mới Listing";
        $data['reasonPendingList'] = get_json(GET_REASON_TYPE_LIST . "/1")->data;
        $data['wardList'] = get_json(GET_WARD_LIST . "/1")->data;
        return $data;
    }

    public function assignReview($assignedId, $quantity, $userType) {

        $url = "/" . $assignedId . "/" . $quantity . "/" . $userType;

        $data['assignAlert'] = get_json(GET_ASSIGN_REVIEW . $url);

        return back()->with($data);
    }

    public function assignCreate($assignedId, $quantity) {
        $url = "/" . $assignedId . "/" . $quantity;
        $data['assignAlert'] = get_json(GET_ASSIGN_CREATE . $url);

        return back()->with($data);
    }

    public function reassign() {
        $item['userId'] = df_int(\Request::input('userId'));
        $item['rlistingId'] = df_int(\Request::input('rlistingId'));
        $response = post_json(REASSIGN_LISTING, $item);
        return response()->json($response);
    }

    public function listingday() {
        return view('listingday');
    }

    public function draft(Request $request) {
        $data['page_title'] = "LISTING";
        $response = get_json(GET_LISTING_DRAFT);

        $listingList = array();
        foreach ($response->data as $key => $listing) {
            $lst = unserialize($listing->title);
            $lst['step'] = $listing->step;
            $lst['socialUser'] = $listing->socialUser;
            $lst['draftId'] = $listing->draftId;
            $lst['createdDate'] = $listing->createdDate;
            array_push($listingList, $lst);
        }
        //var_dump( $response);
        //exit();
        if ($request->isMethod('POST')) {
            $object['createdDate'] = $request->input('date-create');
            $object['reviewedDate'] = $request->input('date-live');
            $object['deletedDate'] = $request->input('date-delete');
        }

        //$data['filterList'] = $object;
        $data['listingList'] = $listingList;
        return view('draft.draft')->with($data);
    }

    public function draftDetail($slug) {
        $listingId = (explode("-", $slug));
        $listingId = $listingId[count($listingId) - 1];

        $draft = get_json(GET_DRAFT_DETAIL . "/" . $listingId)->data;

        $data['listing'] = unserialize(json_decode($draft->jsonString));
        $data['socialUser'] = $draft->socialUser;

        $data['accountId'] = $draft->accountId;
        $data['draftId'] = $draft->draftId;
        $data['userTypeId'] = $draft->userTypeId;
        $data['listUser'] = get_json(GET_USER_LIST . "/" . $data['userTypeId'])->data;
        if (isset($data['listing']['step_1'])) {
            $listing = $data['listing']['step_1'];
        }
        if (isset($data['listing']['step_2'])) {
            $listing = array_merge($listing, $data['listing']['step_2']);
        }
        if (isset($data['listing']['step_3'])) {
            $listing = array_merge($listing, $data['listing']['step_3']);
        }
        if (isset($data['listing']['step_4'])) {
            $listing = array_merge($listing, $data['listing']['step_4']);
        }
        if (isset($data['listing']['step_5'])) {
            $listing = array_merge($listing, $data['listing']['step_5']);
        }
        $listing['draftTitle'] = null; //    unserialize($data['listing']['draftTitle']);
        $listing['draftId'] = $data['listing']['draftId'];
        $listing['buildingObject'] = json_decode($listing['buildingObject']);
        //var_dump($listing['buildingObject']);
        //exit();
        $listing['amenities'] = isset($listing['amenities']) ? array($listing['amenities']) : array();
        $listing['amenities_building'] = isset($listing['amenities_building']) ? array($listing['amenities_building']) : array();

        $data['listing'] = $listing;

        $listingTypeId = $data['listing']['listingType'] or 2;
        $propertyTypeId = $data['listing']['propertyType'];
        $cityId = $data['listing']['cityId'];
        $districtId = $data['listing']['districtId'];
        $purposeId = $data['listing']['purposeType'];
        $data['buildingList'] = get_json(GET_BUILDINGS)->data;
        //var_dump($data['buildingList']);
        $data['listing'] = json_decode(json_encode($listing), FALSE);
        //var_dump($data['listing']);
        //exit();
        //$detail_building = json_decode(get_json(DETAIL_BUILDING_SUGGESTION.'/'.$listing['buildingId'].'/'.$listing['buildingBlock'].'/'.$listing['listingType'].'/USD'));
        //var_dump($data['listing']);
        //exit();

        if (intval($data['listing']->buildingId) != 0 && count($data['listing']->buildingObject->blocks) > 0) {
            $data['blockdetail'] = get_json(GET_BLOCK_DETAIL . '/' . $data['listing']->buildingBlock)->data;
            if ($data['listing']->buildingBlock == $data['blockdetail']->blockId) {
                $data['numberBasement'] = $data['blockdetail']->numberBasement;
                $data['numberElevator'] = $data['blockdetail']->numberElevator;
                $data['yearBuilt'] = $data['blockdetail']->yearBuilt;
                $data['yearFixed'] = $data['blockdetail']->yearFixed;
                $data['numberFloor'] = $data['blockdetail']->numberFloor;
            }
        } elseif (intval($data['listing']->buildingId) == 0 && $data['listing']->buildingObject != null) {
            foreach ($data['buildingList'] as $value) {
                if (intval($data['listing']->buildingId) == $value->buildingId) {
                    $data['numberBasement'] = $listing['buildingObject']->numberBasement;
                    $data['numberElevator'] = $listing['buildingObject']->numberElevator;
                    $data['yearBuilt'] = $listing['buildingObject']->yearBuilt;
                    $data['yearFixed'] = $listing['buildingObject']->yearFixed;
                    $data['numberFloor'] = $listing['buildingObject']->numberFloor;
                }
            }
        } else {
            if (isset($data['listing']->numberBasement)) {
                $data['numberBasement'] = $data['listing']->numberBasement;
            }
            if (isset($data['listing']->numberElevator)) {
                $data['numberElevator'] = $data['listing']->numberElevator;
            }
            if (isset($data['listing']->yearBuil)) {
                $data['yearBuilt'] = $data['listing']->yearBuilt;
            }
            if (isset($data['listing']->yearFixed)) {
                $data['yearFixed'] = $data['listing']->yearFixed;
            }
            if (isset($data['listing']->numberFloor)) {
                $data['numberFloor'] = $data['listing']->numberFloor;
            }
        }

        $data['userTypeList'] = get_json(GET_LISTING_USER_TYPE);
        $data['propertyTypeList'] = get_json(GET_PROPERTY_TYPE_LIST);
        $data['fee_listing'] = get_json(GET_FEES_TYPE_LIST);

        //var_dump($data['buildingList']);
        //exit();
        $data['cityList'] = get_json(GET_CITY_LIST);
        $data['districtList'] = get_json(GET_DISTRICT_LIST . "/" . $cityId);
        $data['amenityList'] = get_json(GET_AMENITIES . "/" . $listingTypeId . "/" . $propertyTypeId . "/2");
        $data['buildingAmenities'] = get_json(GET_AMENITIES . "/" . $listingTypeId . "/" . $propertyTypeId . "/1");
        $data['agentList'] = get_json(GET_AGENT_LIST . "/" . $listingTypeId . "/" . $purposeId . "/" . $districtId);

        $data['page_title'] = "Tạo mới Listing";
        //var_dump($data);
        return view('draft.draftDetail')->with($data);
    }

    public function listingSearch(Request $request, $transactionId = null) {



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

        $post['minPrice'] = df(\Request::input('minPrice'), NULL);
        if (!empty($post['minPrice']))
            $post['minPrice'] = (float) str_replace('.', '', $post['minPrice']);

        $post['maxPrice'] = df(\Request::input('maxPrice'), NULL);
        if (!empty($post['maxPrice']))
            $post['maxPrice'] = (float) str_replace('.', '', $post['maxPrice']);

        $requestList = $request->input('requestListDistricts', array());
        $requestListDistricts = array();
        foreach ($requestList as $item) {
            $requestListDistricts[]['districtId'] = (int) $item;
        }
        $post['requestListDistricts'] = $requestListDistricts;

        // -- tra ve json --
//        return response()->json($post);
        $url = SEARCH_LISTING;
        if (!empty($transactionId))
            $url .= '/' . $transactionId;
        $response = post_json($url, $post);
        if (empty($response->result)) {
            echo $response->message;
            exit();
        }

        $data['listingList'] = $response->data;

        // -- return html --
        return view('search-listing-result', $data);
    }

    public function chekDuplicatesJson(Request $request) {
        $rlistingIds = array();
        $data = $request->json()->all();
        $response = post_json(CHECK_DUPLICATES, $data);
        if ($response->result && $response->data != null && count($response->data) > 0) {
            foreach ($response->data as $listing) {
                $rlistingIds[] = $listing->rlistingId;
            }
        }
        session(array(static::SESSION_DUPLICATED_LISTING_ID => $rlistingIds));
        return json_encode($response);
    }

    public function checkAvailability() {
        return view('listing.check-availability');
    }

    public function notesList() {
        return view("listing.notes-list");
    }

    public function notesListData() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);

        $searchKeywords = $requestData['search']['value'] ? $requestData['search']['value'] : '';

        $postData = array(
            "term" => $searchKeywords,
        );
        $response = post_json(LISTING_NOTES_LIST . "/$page/10", $postData);
        //return response()->json($response);
        $viewData = array(
            'draw' => \Request::input('draw') ? \Request::input('draw') : 1,
            "recordsTotal" => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );

        return response()->json($viewData);
    }

    public function notes($id) {
        $response = get_json(LISTING_NOTES . "/$id");
        return response()->json($response);
    }

    public function deleteNote($id) {
        $response = delete_json(LISTING_NOTES . "/$id");
        return response()->json($response);
    }

    public function mergeNotes($rlistingId, $noteId) {
        $postData = array(
            "noteId" => $noteId,
            "rlistingId" => $rlistingId
        );
        $respone = put_json('listing/photos/merge', $postData);
        return response()->json($respone);
    }

    public function addressSuggestions() {
        return view("listing.address-suggestions");
    }

    public function addressSuggestionsData() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $numberItem = 10;
        //$post_data = array("searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : null));
        $data = get_json(LISTING_ADDRESS_SUGGESTIONS . "/$page/$numberItem")->data;
        //return response()->json(get_json(LISTING_ADDRESS_SUGGESTIONS . "/$page/$numberItem"));
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }

    public function createAddressSuggestion() {
        if (\Request::isMethod('post')) {
            $postData = \Request::json()->all();
            //return response()->json($postData);
            $response = post_json(LISTING_ADDRESS_SUGGESTION, $postData);
            return response()->json($response);
        }
        return view("listing.create-address-suggestion");
    }

    public function updateAddressSuggestion($id) {
        if (\Request::isMethod('post')) {
            $postData = \Request::json()->all();
            $postData["id"] = $id;
            $response = put_json(LISTING_ADDRESS_SUGGESTION, $postData);
            return response()->json($response);
        }
        $item = get_json(LISTING_ADDRESS_SUGGESTIONS . "/$id");
        //return response()->json($item);
        if ($item) {
            $item = $item->data;
        }
        $viewData['item'] = $item;
        return view("listing.update-address-suggestion")->with($viewData);
    }

    public function getAddressSuggestion($wardId) {
        $postData = array(
            "wardId" => $wardId
        );
        $item = post_json("listing/description_suggestion_from_address", $postData);
        return response()->json($item);
    }

    public function changeAllowEdit() {
        $postData = \Request::json()->all();
        $response = post_json("listing/enable-edit", $postData);
        return response()->json($response);
    }

    public function checkStatus() {
        return view("listing.check-status");
    }

    public function newStatusCheck() {
        return view("listing.new-status-check");
    }

    public function statusCheckRequests() {
        return view("listing.check");
    }

    public function getListFromAgent() {
        $postData = \Request::json()->all();
        $response = post_json("listing/get-list-from-agent", $postData);

        return response()->json($response);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => count($response->data),
            'recordsFiltered' => count($response->data),
            'data' => $data
        );
        return response()->json($viewData);
    }

    public function setAvailable() {
        $postData = \Request::json()->all();
        $response = post_json("listing/check-available", $postData);
        return response()->json($response);
    }

    public function saveSearchListing() {
        $postData = \Request::json()->all();
        $response = post_json("agent/agent-search-listing", $postData);
        return response()->json($response);
    }

    public function createLeadFromAvailable() {
        $postData = \Request::json()->all();
        $response = post_json("lead/create-quickly", $postData);
        return response()->json($response);
    }

    public function agentSearchListing() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $data = get_json(AGENT_SEARCH_LISTING . "/" . $page . "/10")->data;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }

    public function updateNoteForAgentSearch() {
        $postData = \Request::json()->all();
        $response = post_json("agent/update-note-for-agent-search-listing", $postData);
        return response()->json($response);
    }

    public function noteForListing() {
        $requestData = \Request::input();
        $postData = array(
            'rlistingId' => $requestData['noteListingId'],
            'note' => $requestData['noteContent']
        );

        $response = post_json(LISTING_UPDATE_NOTE, $postData);
        if ($response && $response->result) {
            unset($response->data);
        }
        return response()->json($response);
    }

    public function findByIds() {
        $rlistingIds = \Request::input('rlistingIds');
        $listings = post_json(FIND_LISTING_BY_IDS, array(
            'rlistingIds' => $rlistingIds
        ));
        return response()->json($listings);
    }

    public function find() {
        $rlistingIds = \Request::input('rlistingIds');        
        $postData = [
            'rlistingIds' => $rlistingIds,
            'isFilterSoldOut' => boolval(\Request::input('isFilterSoldOut'))
        ];
        if (\Request::input('dealId')) {
            $postData["dealId"] = \Request::input('dealId');
        }
        $listings = post_json(FIND_LISTING, $postData);
        return response()->json($listings);
    }

    public function comment() {
        $postData = \Request::json()->all();
        $response = post_json("listing/comment", $postData);
        /*
          $response = [
          "result" => true,
          "message" => "Thao tác thành công",
          "postData" => $postData
          ];
         */
        return response()->json($response);
    }

    /**
     * Sold & Rent
     *
     * @return JSON Result
     */
    public function transaction() {
      try {
        $requestData = \Request::json()->all();
        $validation = \Validator::make($requestData, [
          "listingId" => "required|numeric",
          "type" => "required|numeric",
          "source" => "required"
        ]);

        if ($validation->fails()) {
          return ["result" => FALSE, "message" => "Xin vui lòng kiểm tra lại dữ liệu"];
        } else {
          return response()->json(post_json(\Config::get('apis.listing.sold-rent'), $requestData));
        }
      } catch (Exception $e) {
        Log::error("[Error][Sold & Rent] " . $e->getMessage());
        return [];
      }
    }

    /**
     * Listing Stop
     *
     * @return JSON Result
     */
    public function stopListing() {
      try {
        $requestData = \Request::json()->all();
        $validation = \Validator::make($requestData, [
          "listingId" => "required|numeric",
          "reason" => "required"
        ]);

        if ($validation->fails()) {
          return ["result" => FALSE, "message" => "Xin vui lòng kiểm tra lại dữ liệu"];
        } else {
          return response()->json(post_json(\Config::get('apis.listing.stop'), $requestData));
        }
      } catch (Exception $e) {
        Log::error("[Error][Stop Listing] " . $e->getMessage());
        return [];
      }
    }

    public function getRelatedListingRequest() {
      try {
        $requestData = \Request::input();

        if (!is_numeric($requestData['id'])) {
          throw new Exception("Xin vui lòng kiểm tra lại dữ liệu");
        }

        $response = get_json(\Config::get('apis.listing.getRelatedListingRequest') . $requestData['id']);

        $viewData = [
              'recordsTotal' => isset($response->data) ? count($response->data) : 0,
              'recordsFiltered' => isset($response->data) ? count($response->data) : 0,
              'data' => isset($response->data) ? $response->data : [],
              'totalItems' => isset($response->data) ? count($response->data) : 0,
          ];
          return $viewData;
      } catch (Exception $e) {
        return [];
      }
    }
}
