<?php

namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Http\Requests;

class DealService {

    /**
     * Generate post data for seach listing on deal/lead.
     * 
     * @author Phan Minh Hoàng <hoang.phan@propzy.com>
     * @param type $filterData
     * @return $postData
     */
    public static function generateSearchPostData($filterData) {
        $fromTo = [];
        if (!empty($filterData['alleyFromTo']) || !empty($filterData['alleyToValue'])) {
            $alleyFilter = ['type' => "alley"];
            if (!empty($filterData['alleyFromTo'])) {
                $alleyFilter['fromValue'] = $filterData['alleyFromTo'];
            }
            if (!empty($filterData['alleyToValue'])) {
                $alleyFilter['toValue'] = $filterData['alleyToValue'];
            }
            $fromTo[] = count($alleyFilter) > 0 ? $alleyFilter : null;
        }

        if (isset($filterData['lengthFromTo']) && $filterData['lengthFromTo'] > 0 && isset($filterData['lengthToValue']) && $filterData['lengthToValue'] > 0) {
            $lengthFromTo = $filterData['lengthFromTo'];
            $lengthToValue = $filterData['lengthToValue'];

            $fromTo[] = array(
                'fromValue' => $lengthFromTo,
                'toValue' => $lengthToValue,
                'type' => "length"
            );
        }

        if (isset($filterData['widthFromTo']) && $filterData['widthFromTo'] > 0 && isset($filterData['widthToValue']) && $filterData['widthToValue'] > 0) {
            $widthFromTo = $filterData['widthFromTo'];
            $widthToValue = $filterData['widthToValue'];
            $fromTo[] = array(
                'fromValue' => $widthFromTo,
                'toValue' => $widthToValue,
                'type' => "width"
            );
        }

        if (isset($filterData['yearBuiltFromTo']) && $filterData['yearBuiltFromTo'] > 0 && isset($filterData['yearBuiltToValue']) && $filterData['yearBuiltToValue'] > 0) {
            $fromTo[] = array(
                'fromValue' => $filterData['yearBuiltFromTo'],
                'toValue' => $filterData['yearBuiltToValue'],
                'type' => "yearBuilt"
            );
            \Session::put('yearBuiltFromToDeal', $filterData['yearBuiltFromTo']);
            \Session::put('yearBuiltToValueDeal', $filterData['yearBuiltToValue']);
        } else {
            \Session::forget('yearBuiltFromToDeal');
            \Session::forget('yearBuiltToValueDeal');
        }
        unset($filterData['yearBuiltFromTo']);
        unset($filterData['yearBuiltToValue']);
        //end fromTo

        $postData = null;
        if (!empty($filterData['dealId'])) {
            $dealId = $filterData['dealId'];
            $deal = get_json(GET_DEAL_DETAIL . '/' . $dealId)->data;
            $deal->request->directionsList = $deal->directionList;
            $postData = $deal->request;
            $postData->dealId = $dealId;
        } else {
            $leadId = $filterData['leadId'];
            $lead = get_json(GET_LEAD_DETAIL . '/' . $leadId)->data;
            $postData = $lead->request;
            $postData->leadId = $leadId;
            $postData->dealId = null;
        }
        //return response()->json($postData);
        unset($postData->requestId);
        unset($postData->requestId);
        unset($postData->listingType);
        unset($postData->propertyType);
        unset($postData->rlistingsList);
        unset($postData->leadFinalBudget);
        unset($postData->leadFinalBudget);
        unset($postData->leadNote);
        unset($postData->createdBy);
        unset($postData->updatedBy);
        unset($postData->createdDate);
        unset($postData->createdDate);
        unset($postData->isDeleted);
        unset($postData->purposeId);
        $postData->customers = NULL;
        $postData->amenitiesList = NULL;


        $districtsList = NULL;
        if (!empty($filterData['districtIdAdvange'])) {
            $districtsList = array();
            foreach ($filterData['districtIdAdvange'] as $districtIdAdvange) {
                $item = array(
                    'districtId' => $districtIdAdvange,
                );
                $districtsList[] = $item;
            }
        } else {
            if (isset($postData->districtsList)) {
                $districtsList = array();
                foreach ($postData->districtsList as $district) {
                    $item = array(
                        'districtId' => $district->districtId,
                        'isPrefered' => $district->isPrefered
                    );
                    $districtsList[] = $item;
                }
            }
        }
        $postData->districtsList = $districtsList;




        $directionsList = NULL;
        if (isset($filterData['directionsAdvange'])) {
            $directionsList = array();
            foreach ($filterData['directionsAdvange'] as $directionIdAdvange) {
                $item = array(
                    'directionId' => $directionIdAdvange,
                );
                $directionsList[] = $item;
            }
            \Session::put('directionsAdvangeDeal', $filterData['directionsAdvange']);
        } else {
            if (isset($postData->directionsList)) {
                $directionsList = array();
                foreach ($postData->directionsList as $direction) {
                    $item = array(
                        'directionId' => $direction->directionId,
                        'isPrefered' => $direction->isPrefered
                    );
                    $directionsList[] = $item;
                }
            }
        }
        $postData->directionsList = count($directionsList) > 0 ? $directionsList : null;


        if (isset($filterData['wardAdvange'])) {
            $wardsList = array();
            foreach ($filterData['wardAdvange'] as $wardAdvangeId) {
                $wardsList[] = (int) $wardAdvangeId;
            }
            $postData->wardsList = $wardsList;
        } else {
            unset($postData->wardsList);
        }
        if (count($fromTo) > 0) {
            $postData->fromTo = $fromTo;
        } else {
            unset($postData->fromTo);
        }

        if (!empty($filterData['privateListing']) && $filterData['privateListing'] > 0) {
            $postData->privateListing = $filterData['privateListing'];
        } else {
            unset($postData->privateListing);
        }

        $sortColumnIndex = isset($filterData['order']) ? $filterData['order'][0]['column'] : 0;
        $sortColumn = !empty($filterData['columns']) ? $filterData['columns'][$sortColumnIndex]['data'] : 'rlistingId';
        switch ($sortColumn) {
            case 'formatPrice':
                $sortColumn = 'price';
                break;
            case 'licensePhotos':
                $sortColumn = 'pinkBook';
                break;
            case 'formatSize':
                $sortColumn = 'floorSize';
                break;
            case 'sourceBy':
                $sortColumn = 'userTypeId';
                break;
            case 'districtName':
                $sortColumn = 'districtId';
                break;
            case 'wardName':
                $sortColumn = 'wardId';
                break;
            case 'directionName':
                $sortColumn = 'directionId';
                break;
            case 'incompatible':
            case 'licensePhotos':
            case 'sourceAdd':
                $sortColumn = 'rlistingId';
                break;
        }
        $postData->sortType = isset($filterData['order']) ? $filterData['order'][0]['dir'] : 'asc';
        $postData->sortColumn = $sortColumn;
        //return response()->json($filterData['columns']);
        //return response()->json($postData);
        $districtsList_onlyvalue = [];
        foreach ($postData->districtsList as $v) {
            $districtsList_onlyvalue[] = $v['districtId'];
        }
        $directionsList_onlyvalue = [];
        if (!empty($postData->directionsList)) {
            foreach ($postData->directionsList as $v) {
                $directionsList_onlyvalue[] = $v['directionId'];
            }
        }

        $filterParams = [
            "keySearch" => !empty($postData->keySearch) ? $postData->keySearch : NULL,
            "fromTo" => !empty($postData->fromTo) ? $postData->fromTo : Null,
            "privateListing" => !empty($postData->privateListing) ? $postData->privateListing : NULL,
            "sortColumn" => !empty($postData->sortColumn) ? $postData->sortColumn : NULL,
            "sortType" => !empty($postData->sortType) ? $postData->sortType : NULL,
            "wardsList" => !empty($postData->wardsList) ? $postData->wardsList : NULL,
            "districtsList" => !empty($districtsList_onlyvalue) ? $districtsList_onlyvalue : NULL,
            "directionsList" => !empty($directionsList_onlyvalue) ? $directionsList_onlyvalue : NULL
        ];


        if (\Request::input('loadtime') == 1) {
            $filterParams = NULL;
        }

        $postData->filterParams = $filterParams;
        return $postData;
    }

}
