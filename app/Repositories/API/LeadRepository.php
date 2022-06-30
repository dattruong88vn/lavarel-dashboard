<?php

namespace App\Repositories\API;

use Carbon\Carbon;

class LeadRepository {

    public function preparePostData($postData, $isConvertPhone = true) {

        $isPrefered = isset($postData['preferDistrict']) ? $postData['preferDistrict'] : -1;
        $amenitiesList = NULL;
        if (isset($postData['amenityId'])) {
            $amenitiesList = array();
            foreach ($postData['amenityId'] as $amenity) {
                $item['id'] = array(
                    "amenityId" => $amenity
                );
                $amenitiesList[] = $item;
            }
        }

        $districtsList = NULL;
        if (!empty($postData['districtIds'])) {
            $districtsList = array();
            foreach ($postData['districtIds'] as $districtId) {
                $item = [
                            'id' => array(
                                'districtId' => explode('-', $districtId)[0],
                            ),
                            'isPrefered' => (explode('-', $districtId)[0] == $isPrefered)
                        ];
                $districtsList[] = $item;
            }
        }

        $isPreferedWard = isset($postData['preferWard']) ? $postData['preferWard'] : -1;
        $wardsList = NULL;
        if (!empty($postData['wardIds'])) {
            $wardsList = array();
            foreach ($postData['wardIds'] as $wardId) {
                $item = [
                            'id' => array(
                                'wardId' => $wardId,
                            ),
                            'isPrefered' => ($wardId == $isPreferedWard)
                        ];
                $wardsList[] = $item;
            }
        }



        $isPreferedDirection = isset($postData['preferDirection']) ? $postData['preferDirection'] : -1;
        $directionsList = NULL;
        if (!empty($postData['directionIds'])) {
            $directionsList = array();
            foreach ($postData['directionIds'] as $directionId) {
                $item = array(
                    'id' => ['directionId' => $directionId],
                    'isPrefered' => ($directionId == $isPreferedDirection)
                );
                $directionsList[] = $item;
            }
        }


        unset($postData['directionIds']);
        unset($postData['isPreferedDirection']);
        $postData['directionsList'] = $directionsList;
        $postData['wardsList'] = $wardsList;


        $customers = array(
            'customerId' => $postData['customerId'] ? trim($postData['customerId']) : NULL,
            'name' => $postData['customerName'] ? trim($postData['customerName']) : NULL,
            'email' => !empty($postData['customerEmail']) ? trim($postData['customerEmail']) : NULL,
            'phone' => $postData['customerPhone'] ? trim($postData['customerPhone']) : NULL,
            'isDeleted' => FALSE
        );

        if (isset($postData['moveInDate']) && trim($postData['moveInDate']) != '') {
            $postData['moveInDate'] = Carbon::createFromFormat('m/d/Y H:i:s', $postData['moveInDate']." 00:00:00")->timestamp * 1000;
        } else {
            $postData['moveInDate'] = NULL;
        }
        if (isset($postData['customerIdCardIssueDate']) && trim($postData['customerIdCardIssueDate']) != '') {
            $postData['customerIdCardIssueDate'] = Carbon::createFromFormat('m/d/Y H:i:s', $postData['customerIdCardIssueDate']." 00:00:00")->timestamp * 1000;
        } else {
            $postData['customerIdCardIssueDate'] = NULL;
        }
        if (isset($postData['customerPartnerIdCardIssueDate']) && trim($postData['customerPartnerIdCardIssueDate']) != '') {
            $postData['customerPartnerIdCardIssueDate'] = Carbon::createFromFormat('m/d/Y H:i:s', $postData['customerPartnerIdCardIssueDate']." 00:00:00")->timestamp * 1000;
        } else {
            $postData['customerPartnerIdCardIssueDate'] = NULL;
        }
        if (trim($postData['sourceOther']) == '') {
            $postData['sourceOther'] = NULL;
        }
        if (!empty($postData['minSize'])) {
            $minSizeNum = (int)str_replace(',', "", $postData['minSize']);
            $postData['minSize'] = (string)$minSizeNum;
        }
        if (!empty($postData['maxSize'])) {
            $maxSizeNum = (int)str_replace(',', "", $postData['maxSize']);
            $postData['maxSize'] = (string)$maxSizeNum;
        }
        if (trim($postData['minSize']) == '') {
            $postData['minSize'] = NULL;
        }
        if (trim($postData['maxSize']) == '') {
            $postData['maxSize'] = NULL;
        }
        $postData['initialBudget'] = trim(str_replace(',', '', $postData['initialBudget']));
        if ($postData['initialBudget'] == '') {
            $postData['initialBudget'] = NULL;
        }
        $postData['finalBudget'] = trim(str_replace(',', '', $postData['finalBudget']));
        if ($postData['finalBudget'] == '') {
            $postData['finalBudget'] = NULL;
        }

        $postData['initialBudgetFixed'] = trim(str_replace(',', '', $postData['initialBudgetFixed']));
        if ($postData['initialBudgetFixed'] == '') {
            $postData['initialBudgetFixed'] = NULL;
        }

        if (trim($postData['responsiveness']) == '') {
            $postData['responsiveness'] = NULL;
        }
        if (trim($postData['bedRooms']) == '') {
            $postData['bedRooms'] = NULL;
        }
        if (trim($postData['bathRooms']) == '') {
            $postData['bathRooms'] = NULL;
        }
        if (trim($postData['note']) == '') {
            $postData['note'] = NULL;
        }

        // if (!empty($postData['position'])) {
        //     if ($postData['position']['roadFrontageDistance']) {
        //         $roadFrontageDistance = $postData['position']['roadFrontageDistance'];
        //         if ($roadFrontageDistance == 0) {
        //             $postData['position']['roadFrontageDistanceFrom'] = 0;
        //             $postData['position']['roadFrontageDistanceTo'] = 100;
        //         } else if ($roadFrontageDistance == 100) {
        //             $postData['position']['roadFrontageDistanceFrom'] = 100;
        //             $postData['position']['roadFrontageDistanceTo'] = 200;
        //         } else if ($roadFrontageDistance == 200) {
        //             $postData['position']['roadFrontageDistanceFrom'] = 200;
        //             $postData['position']['roadFrontageDistanceTo'] = 500;
        //         } else if ($roadFrontageDistance == 500) {
        //             $postData['position']['roadFrontageDistanceFrom'] = 500;
        //         }
        //     }
        // }
        unset($postData['amenityId']);
        unset($postData['isPrefered']);
        unset($postData['preferWard']);
        unset($postData['wardIds']);
        unset($postData['customerName']);
        unset($postData['customerEmail']);
        unset($postData['customerPhone']);
        unset($postData['districtIds']);
        unset($postData['preferDistrict']);
        unset($postData['_token']);

        $postData['amenitiesList'] = $amenitiesList;
        $postData['cityList'] = [
            [
                "id" => [
                    "cityId" => 1,
                ],
                "isPrefered" => true
            ]
        ];
        $postData['districtsList'] = $districtsList;
        $postData['customers'] = $customers;
        $postData['customerId'] = empty($postData['customerId']) ? null : $postData['customerId'];
        $postData['positionList'] = [];
        foreach ($postData['position'] as $key => $value) {
          if(!empty($value['id'])){
            if($value['id']['positionId'] == 2){
              $roadFrontageDistance = $value['roadFrontageDistance'];
              if ($roadFrontageDistance == 0 && $roadFrontageDistance != '') {
                  $value['roadFrontageDistanceFrom'] = 0;
                  $value['roadFrontageDistanceTo'] = 100;
              } else if ($roadFrontageDistance == 100) {
                  $value['roadFrontageDistanceFrom'] = 100;
                  $value['roadFrontageDistanceTo'] = 200;
              } else if ($roadFrontageDistance == 200) {
                  $value['roadFrontageDistanceFrom'] = 200;
                  $value['roadFrontageDistanceTo'] = 500;
              } else if ($roadFrontageDistance == 500) {
                $value['roadFrontageDistanceFrom'] = 500;
                $value['roadFrontageDistanceTo'] = null;
              }
            }
            $postData['positionList'][] = $value;
          }
        }
        unset($postData['position']);

        // decode customer phone
        if($isConvertPhone && !empty($postData["customers"]["phone"]) ){
            $arrPhones = explode(",",$postData["customers"]["phone"]); $coverPhones = [];
            
            foreach($arrPhones as $phone){
                $coverPhones[] = base64_decode($phone);
            }
            $postData["customers"]["phone"] = implode(",",$coverPhones);
        }
        return $postData;
    }

    public function update($postData) {

    }

}
