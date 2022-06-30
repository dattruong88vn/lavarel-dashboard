<?php

namespace App\Repositories\API;
use Carbon\Carbon;

class DealRepository {

    public function preparePostData($postData) {

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
                $item = array(
                    'id' => ['districtId' => $districtId],
                    'isPrefered' => ($districtId == $isPrefered)
                );
                $districtsList[] = $item;
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


        $customers = array(
            'customerId' => $postData['customerId'],
            'name' => $postData['customerName'] ? trim($postData['customerName']) : NULL,
            'email' => !empty($postData['customerEmail']) ? trim($postData['customerEmail']) : NULL,
            'phone' => $postData['customerPhone'] ? trim($postData['customerPhone']) : NULL,
            'isDeleted' => FALSE
        );

        if (isset($postData['moveInDate']) && trim($postData['moveInDate']) != '') {
            $postData['moveInDate'] = Carbon::createFromFormat('m/d/Y', $postData['moveInDate'])->timestamp * 1000;
        } else {
            $postData['moveInDate'] = NULL;
        }
        if (trim($postData['sourceOther']) == '') {
            $postData['sourceOther'] = NULL;
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
        unset($postData['amenityId']);
        unset($postData['isPrefered']);
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

        return $postData;
    }

    public function update($postData) {
        
    }

}
