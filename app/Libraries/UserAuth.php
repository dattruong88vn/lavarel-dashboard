<?php

namespace App\Libraries;

class UserAuth
{

    const ENTITY_HRM_DEPARTMENT = "hrm_department";
    const ENTITY_POS_PRESCREEN = "pos_prescreen";
    const ENTITY_POS_SELLER_ADVISOR = "pos_sa";
    const ENTITY_ACCOUNT = "account";
    const ENTITY_REQUEST = "request";
    const ENTITY_CONFIG_QUESTION = "config_question";
    const ENTITY_LEAD = "lead";
    const ENTITY_ORDER = "order";
    const ENTITY_DEAL = "deal";
    const ENTITY_DEAL_CONTRACT = "deal_contract";
    const ENTITY_DEAL_MEETING = "deal_meeting";
    const ENTITY_LSO = "lso";
    const ENTITY_BRIEF_FORM = "brief_form";
    const ENTITY_LISTING = "listing";
    const ENTITY_CRAWLER = "crawler";
    const ENTITY_POS_CRAWLER = "pos_crawler";
    const ENTITY_CUSTOMER = "customers";
    const ENTITY_POSITION = "position";
    const ENTITY_MATCH_LISTING_CONFIG = "match_listing_congif";
    const ENTITY_STAFF = "staff";
    const ENTITY_AGENT = "agent";
    const ENTITY_OWNER = "owner";
    const ENTITY_CUSTOMER_REVIEW = "customer_review";
    const ENTITY_USER_ROLE = "user_role";
    const ENTITY_HRM_CONTACT = "hrm_contact";
    const ENTITY_HRM_POSITION = "hrm_position";
    const ENTITY_TASK = "task";
    const ENTITY_MEETING = "meeting";
    const ENTITY_BASKET = "basket";
    const ENTITY_STREET = "street";
    const ENTITY_BUILDING = "building";
    const ENTITY_PROJECT = "project";
    const ENTITY_QUICK_CHECK_LISTING = "quick_check_listing";
    const ENTITY_SOCIAL_USER = "social_useosr";
    const ENTITY_LISTING_NEW = "related_listing_matching_new";
    const ENTITY_LEAD_MATCH_LISTING = "lead_match_listing_value";
    const HISTORY_USER = "direction_tracking_execute_action";
    const ENTITY_BROADCAST = "broadcast";
    const ENTITY_RELATED_LISTING = "related_listing";
    const ENTITY_VISITOR = "visitor";
    const ENTITY_TRANSFER_TO_PS = "transfer-to-ps";
    const ENTITY_CONTRACT = "contract";
    const ENTITY_SALE_PIPELINE_REPORT = "sale_pipeline_report";
    const ENTITY_SALE_FUNNEL_REPORT = "sale_funnel_report";
    const MARKET_REPORT = "market_report";
    const TOUR = "cs_schedule";



    const ACTION_READ = "read";
    const ACTION_ADD = "add";
    const ACTION_UPDATE = "update";
    const ACTION_DELETE = "delete";
    const ACTION_EXPORT = "export";
    const ACTION_IMPORT = "import";
    const ACTION_LIST = "list";
    const ACTION_ASSIGN = "assign";

    const PERMISSION_ACCESS_DENIED = 1;
    const PERMISSION_PERSONAL = 2;
    const PERMISSION_PERSONAL_AND_DEPARTMENT = 3;  // zone
    const PERMISSION_PERSONAL_AND_ASSIGNEE = 4;
    const PERMISSION_ALL_OPEN = 5;
    const PERMISSION_ASSIGNEE = 6;

    public static function hasPermission($user, $entityCode, $actionCode = null, $permissionId = null)
    {

        if (empty($user->permissions)) {
            return false;
        }

        foreach ($user->permissions as $user_permission) {
            if ($user_permission->entityCode == $entityCode) {

                if (empty($actionCode)) {
                    return true;
                }

                if ($user_permission->actionCode == $actionCode) {
                    if (empty($permissionId)) {
                        return true;
                    }

                    if ($user_permission->permissionId == $permissionId) {
                        return true;
                    }

                    return false;
                }
            }
        }

        return false;
    }

    public static function checkIsGroupAdminonType($items, $types)
    {
        if (count($items) === 0) {
            return false;
        }

        // check type and isGroupAdmin
        // at current, isGroupAdmin are both true and false, so only check existing isGroupAdmin === true
        // return true
        foreach ($items as $item) {
            if (in_array($item->departmentType, $types) && $item->isGroupAdmin === true) {
                return true;
            }
        }
    }
}
