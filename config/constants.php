<?php
$protocol = ((isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] == 'devdashboard.propzy.vn') || (isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] == 'testdashboard.propzy.vn') || (isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] == 'preproddashboard.propzy.vn')) ? true : false;
define('protocol', $protocol);
$_SERVER['SERVER_ADDR'] = $_SERVER['SERVER_ADDR'] ?? '';
if (!defined('BASE_API')) {
    // load config from .env or .env.local
    define('GG_KEY', getenv('GG_KEY'));
    define('CALL_SERVICES', getenv('CALL_SERVICES'));
    define('BASE_API_CALL', getenv('BASE_API_CALL'));
    define('FE_HUB', getenv('FE_HUB'));
    define('BASE_API_CALL_PRIVATE', getenv('BASE_API_CALL_PRIVATE'));
    define('UPLOAD_URL', getenv('UPLOAD_URL'));
    define('UPLOAD_URL_PRIVATE', getenv('UPLOAD_URL_PRIVATE'));
    define('BASE_API', getenv('BASE_API'));
    define('BASE_API_PRIVATE', getenv('BASE_API_PRIVATE'));
    define('BASE_API_SEARCH_LISTING', getenv('BASE_API_SEARCH_LISTING'));
    define('BASE_API_EXPORT', getenv('BASE_API_EXPORT'));
    define('BASE_SAM_API', getenv('BASE_SAM_API'));
    define('BASE_SAM_DB_API', getenv('BASE_SAM_DB_API'));
    define('BASE_SAM_DB_API_PRIVATE', getenv('BASE_SAM_DB_API_PRIVATE'));
    define('BASE_WEB_SOCKET_API', getenv('BASE_WEB_SOCKET_API'));
    define('BASE_UPLOAD_API', getenv('BASE_UPLOAD_API'));
    define('BASE_UPLOAD_API_PUBLIC', getenv('BASE_UPLOAD_API_PUBLIC'));
    define('FILE_UPLOAD_API', getenv('FILE_UPLOAD_API'));
    define('UPLOAD_PATH', __DIR__ . getenv('UPLOAD_PATH'));
    define('PRODUCT_URL', getenv('PRODUCT_URL'));
    define('SITE_URL', getenv('SITE_URL'));
    define('SMS_LISTING_URL', getenv('SMS_LISTING_URL'));
    define('AGENT_SITE_URL', getenv('AGENT_SITE_URL'));
    define('CRAWLER_API', getenv('CRAWLER_API'));
    define('BASE_LOCATION', getenv('BASE_LOCATION'));
    define('API_GATEWAY', getenv('API_GATEWAY'));
    define('AGENT_TOURING', getenv('AGENT_TOURING'));
    define('USER_ROLE', getenv('USER_ROLE'));
    define('API_GATEWAY_PRIVATE', getenv('API_GATEWAY_PRIVATE'));
    define('PORTAL_BASE_URL', getenv('PORTAL_BASE_URL'));
    define('BASE_BACKOFFICE_API', getenv('BASE_BACKOFFICE_API'));



    // end load config

    define("LOG_TIME_RESP", false);

    // var_dump(BASE_API); die();
    // -- Ban => listingTypeID = 1 --
    // -- Ban , khong match toa nha => listingTypeID = 3 --
    // -- Thue => listingTypeID = 2 --
    // -- Thue , khong match toa nha => listingTypeID = 4 --

    define('FOR_SELL', 1);
    define('FOR_RENT', 2);
    define('FOR_SELL_DONT_MATCH', 3);
    define('FOR_RENT_DONT_MATCH', 4);

    define('STATUS_CREATE', 1);
    define('STATUS_EDIT', 2);

    // -- For SALE --
    define('CHUNG_CU_SELL', 8);
    define('NHA_RIENG_SELL', 11);

    // -- For RENT --
    define('CHUNG_CU', 1);
    define('NHA_RIENG_LIVE', 2);
    define('BIET_THU_LIVE', 3);

    define('VAN_PHONG', 4);
    define('NHA_RIENG_BUSS', 5);
    define('BIET_THU_BUSS', 6);
    define('MAT_BANG', 7);
    define('PHONG_CHO_THUE', 10);

    // -- Define REQUEST --
    define('REQUEST_HAVE_LISTING', 1);
    define('REQUEST_NOT_HAVE_LISTING', 2);

    define("SEL_PROPERTY_FOR_SELL", serialize(array(
        "0" => "- Chọn loại bđs -",
        CHUNG_CU_SELL => 'Chung cư',
        NHA_RIENG_SELL => 'Nhà riêng'
    )));

    define("SEL_PROPERTY_FOR_RENT", serialize(array(
        "0" => "- Chọn loại bđs -",
        CHUNG_CU => 'Chung cư',
        VAN_PHONG => 'Văn phòng',
        NHA_RIENG_BUSS => 'Nhà riêng kinh doanh',
        BIET_THU_BUSS => 'Biệt thự kinh doanh',
        MAT_BANG => 'Mặt bằng',
        PHONG_CHO_THUE => 'Phòng cho thuê',
        NHA_RIENG_LIVE => 'Nhà riêng để ở',
        BIET_THU_LIVE => 'Biệt thự để ở'
    )));

    define("SEL_DERECTION", serialize(array(
        "" => "- Chọn hướng -",
        "1" => 'Đông',
        "2" => 'Tây',
        "3" => 'Nam',
        "4" => 'Bắc',
        "5" => 'Đông Bắc',
        "6" => 'Tây Bắc',
        "7" => 'Đông Nam',
        "8" => 'Tây Nam'
    )));
    define("TU_TRACH", serialize(array(
        "dong_tu_trach" => array(1, 3, 4, 7),
        "tay_tu_trach" => array(2, 8, 6, 5)
    )));

    $SEL_YEARS = array();
    for ($i = 2016; $i >= 1975; $i--)
        $SEL_YEARS[$i] = $i;
    define("SEL_YEARS", serialize($SEL_YEARS));

    define('GET_LISTING_TYPE_INFO', 'type/list');

    define('SIGN_IN', 'user/signIn');
    define('GET_DEPARTMENTS', 'departments/list');
    define('GET_AMENITIES', 'get_amenities');
    define('GET_CITIES', 'get_cities');
    define('WARDS', 'wards');
    define('CITIES', 'cities');
    define('GET_DISTRICTS', 'districts');
    define('GET_AGENTS_DISTRICTS', 'agent/district/list');
    define('GET_BUILDINGS', 'building/list');
    define('GET_BUILDING_DETAIL', 'building');
    define('GET_STAFFS', 'user/staffs/list');
    define('GET_REMAINING_LISTING', 'remaining_listing');
    define('GET_ASSIGNED_LISTING_NOTIFICATION', 'listing/notification/list');
    define('GET_REMAINING_LISTING_WITH_DETAIL', 'listing/remaining/list');
    define('GET_ASSIGN_REVIEW', 'listing/assign_review');
    define('LISTING_NOTIFICATION_TRACK', 'listing/notification/track/review');
    define('LISTING_NOTIFICATION_TRACK_CREATE', 'listing/notification/track/create');
    define('ASSIGN_REVIEW_LISTING', 'listing/assign_review');
    define('GET_ASSIGN_CREATE', 'listing/assign_create');
    define('GET_FEES_TYPE_LIST', 'fees_type/list');
    define('GET_PROPERTY_TYPE_LIST', 'property_type/list');
    define('GET_REAL_ESTATE_GROUP', 'v2/property_type_group/list');
    define('GET_PROPERTY_TYPE_LIST_V2', 'v2/property_type/list/%d/%d');
    //define('GET_LISTING_LIST', 'listing/list/false/10/1');
    define('GET_LISTING_LIST', 'listing/list');
    define('FIND_LISTING_BY_IDS', 'listing/find-by-ids');
    define('FIND_LISTING', 'listing/find');
    define('SEARCH_LISTING_V2', 'listing/search');
    define('FILTER_LISTING', 'listing/crawlers');

    define('GET_LISTING_COUNT', 'listing/count_all_listing');
    define('GET_ASSIGNED_LISTINGS', 'listing/assigned/list');
    define('REASSIGN_LISTING', 'listing/review/reassign');
    define('GET_LISTING_USER_TYPE', 'user/type/list');
    define('RECEIVE_LISTING', '/user/receive-listing/%d');
    define('DUPLICATE_LISTING', 'listing/duplicate');

    define('GET_LISTING_DRAFT', 'listing/drafts');
    define('GET_DRAFT_DETAIL', 'listing/draft');
    define('GET_REASON_TYPE_LIST', 'listing/reason/list');

    define('LISTING_CUSTOM_SEARCH', 'listing/custom-search');
    define('LISTING_CUSTOM_SEARCH_VERSION_MATCHING', 'listing/v2/filter-data');
    define('LISTING_LOG', 'listing/v2/log');

    define('CHECK_USERNAME', 'user/validate_username');
    define('GET_ACCOUNT_LIST', 'user/account/list');
    define('GET_AGENTS_BY_AM', 'agent/list');
    define('GET_OTHER_STAFFS', 'user/other_staff/list');
    define('CREATE_ACCOUNT', 'user/account');
    define('GET_DETAIL_ACCOUNT', 'user/account');
    define('UPDATE_ACCOUNT', 'user/account');
    define('RESPONSIBLE_LIST', 'user/responsible/list');
    define('USER_RESPONSIBLES', 'user/responsibles');
    define('USER_CHECK_ASSIGN_DISTRICT', 'user/check-assign-district');
    define('USER_UPDATE_DISTRICT_ASSIGNED', 'user/assign-district/%d');

    define('GET_LISTING_DETAIL', 'listing');
    define('GET_ROLL_LIST', 'user/roles/list');
    define('GET_ENTITIES_LIST', 'entities/list');
    define('CREATE_LISTING', 'listing');
    define('UPDATE_LISTING', 'listing');
    define('CHECK_DUPLICATES', 'listing/duplicate/check');
    define('GET_USER_TYPE_LIST', 'user/type/list');
    define('GET_CITY_LIST', 'get_cities');
    define('GET_STREETS', 'streets');
    define('GET_DISTRICT_LIST', 'districts');
    define('GET_WARD_LIST', 'get_wards');
    define('GET_ACCOUNT_MANAGER', 'user/account/list');
    define('GET_AMENITIES_CHECK', 'get_amenities');
    define('GET_BLOCK_LIST', 'blocks/list');
    define('GET_BLOCK_DETAIL', 'block');
    define('DETAIL_BUILDING_SUGGESTION', "listing/parent");
    define('GET_AGENT_LIST', 'agent/list');
    define('GET_AGENT_SALE_LIST', 'agent/sale/list');
    define('GET_AGENT_LIST_BY_REQUEST', 'agent/list');
    define('GET_AM_LIST', 'am/list');
    define('LISTING_NOTES_LIST', 'listing/notes/list');
    define('LISTING_NOTES', 'listing/notes');
    define('LISTING_UPDATE_NOTE', 'listing/note'); // http://dev.propzy.vn/w/dashboard_api_v2/listing/create_note_from_lead_or_from_deal/
    define('LISTING_ADDRESS_SUGGESTION', 'listing/address_suggestion');
    define('LISTING_ADDRESS_SUGGESTIONS', 'listing/address_suggestions');
    define('AGENT_SEARCH_LISTING', 'agent/list/agent-search-listing');

    define('GET_USER_LIST', 'user/list');
    define('GET_USER_BY_SOURCE', 'user/list-source');
    define('CREATE_BUILDING', 'building');
    define('EDIT_BUILDING', 'building');

    //project

    define('GET_DEVELOPER', 'investor/list');
    define('CREATE_PROJECT', 'project');
    define('UPDATE_PROJECT', 'project');
    define('GET_PROJECT', 'project/list');
    define('GET_DETAIL_PROJECT', 'project');
    define('DEVELOPPER_LIST', 'investor/list');
    define('DEVELOPPER', 'investor');

    define('GET_BROKERAGE_LIST', 'agent/brokerage_firm/list');

    define('INSERT_REQUEST', 'request');
    define('CREATE_REQUEST', 'customer');
    define('LIST_REQUEST', 'request/list');
    define('GET_REQUEST_DETAIL', 'request');
    define('GET_REQUEST_DETAIL_V2', 'request/detail');
    define('UPDATE_REQUEST_DETAIL', 'request');
    define('UPDATE_REQUEST', 'request');
    define('GET_LISTING_FOR_REQUEST', 'request/search');
    define('GET_LITTLE_REQUEST', 'request/little_list');
    define('GET_REQUEST_STATUS_LIST', 'request/status/list');
    define('GET_REQUEST_SOURCE_LIST', 'request/source/list/');
    define('GET_REQUEST_SUBJECT_LIST', 'request/subject/list/');

    define('SEND_EMAIL_WITH_LISTING_FOR_CUSTOMER', 'request/send_mail/customer');

    define('ASSIGN_AGENT_LISTING', 'request/assign_agent/listing');
    define('ASSIGN_MULTI_AGENT_LISTING', 'request/assign');
    define('SEARCH_LISTING', 'request/search');
    // customer
    define('GET_CUSTOMER_PHONE_BLOCKED', 'customer/phone-blocked');
    define('UNBLOCK_CUSTOMER_PHONE', '/customer/unblock-phone');
    define('GET_CUSTOMER_DETAIL', 'customer');
    define('CUSTOMER_REVIEW_PURPOSE_LIST', 'customer/review-purpose/list');
    define('CUSTOMER_REVIEW_PLAN_BUY_LIST', 'customer/review-plan-buy/list');
    define('CUSTOMER_FOR_WHOM_LIST', 'customer/review-for-whom/list');
    define('CUSTOMER_REVIEW_FINANCING_LIST', 'customer/review-financing/list');
    define('CUSTOMER_REVIEW_REQUIREMENT_LEVEL_LIST', 'customer/review-level-requirement/list');
    define('CUSTOMER_REVIEW_RESPONSESIVENESS_LIST', 'customer/review-responsiveness/list');
    define('CUSTOMER_REVIEW', 'customer/review');
    define('CUSTOMER_REVIEW_LIST', 'customer/review/list');
    define('CUSTOMER_REVIEW_HISTORY', 'customer/review-history');
    define('BANK_MATURITY_YEAR_LIST', 'bank/maturity-year/list');
    define('BANK_MATURITY_MONTH_LIST', 'bank/maturity-month/list');
    define('BANK_CURRENT_POSITION_LIST', 'bank/current-position/list');
    define('BANK_MONTHLY_INCOME_LIST', 'bank/monthly-income/list');
    define('BANK_PAYMENT_METHOD_LIST', 'bank/payment-method/list');
    define('BANK_AGE_RANGE_LIST', 'bank/age-range/list');
    define('BANK_LIST', 'bank/list');
    define('LOAN_ADVICE_RESULT', 'bank/loan-advice-result');
    define('BANK_LOAN_ADVICE', 'bank/loan-advice');
    define('SEARCH_CUSTOMER_BY_PHONE', 'lead/search-lead-deal-customer-by-phone');


    define('GET_BLACK_LIST', 'agent/black_list');
    define('GET_LOCK_AGENT', 'agent/lock');
    define('GET_UNLOCK_AGENT', 'agent/unlock');
    define('GET_WARNING_LIST', 'agent/warning_list');

    define('GET_AGENT_ACTIVE_LIST', 'agent/active_list');
    define('AGENT_ACTIVE_LIST', 'agent/active/list');
    define('GET_AGENT_DETAIL', 'agent');
    define('AGENT_SEARCH', 'agent/search');
    define('AGENT_SUGGEST_CLIENT_SERVICE', 'agent/suggest-client-service');

    define('AGENT_UPDATE', 'agent');
    define('AGENT_CREATE', 'agent');
    define('GET_AGENT_VIEWED_LIST', 'agent/listings_viewed');

    define('GET_AGENT_NEW_LIST', 'agent/new_list');
    define('AGENT_CHANGE_STATUS', 'agent/change_status');
    define('AGENT_REPORT', 'agent/report');
    define('USER_SUSPEND_ACCOUNT', 'user/suspend_account');
    define('AGENT_ASSIGN_BROKERAGE_FIRM', 'agent/assign_brokerage_firm');
    define('USER_RESET_PASSWORD', 'user/reset_password');

    define('GET_TRANSACTION_STATUS_LIST', 'transaction/status/list');
    define('GET_TRANSACTION_LIST', 'transaction/list');
    define('GET_TRANSACTION_DETAIL', 'transaction');
    define('GET_TRANSACTION_DETAIL_LISTING', 'transaction/listings');
    define('GET_TRANSACTION_NOTICED', 'transaction/noticed/list');
    define('GET_TRANSACTION_NOTICED_LOGS', 'transaction/noticed/logs');
    define('GET_TRANSACTION_NOTICED_LOG', 'transaction/noticed/log');
    define('GET_TRANSACTION_NOTE_LIST', 'transaction/note/list');
    define('TRANSACTION_NOTE_UPDATE', 'transaction/note');

    define('SEND_TRANSACTION_FOR_LISTING_AGENT', 'transaction/listing_agent/push');
    define('SEND_TRANSACTION_FOR_SALE_AGENT', 'transaction/sale_agent/push');
    define('SEND_TRANSACTION', 'transaction/push');


    define('TRANSACTION_CHANGE_AGENT', 'transaction/change/agent');
    define('TRANSACTION_ASSIGN_TO_STAFF', 'transaction/change/staff');
    define('TRANSACTION_CHANGE_STATUS', 'transaction/update/status');
    define('TRANSACTION_ADD_LISTING', 'transaction/add_listing');
    define('TRANSACTION_LIST_LOG_SEARCH', 'request/search/logs');
    define('TRANSACTION_DETAIL_LOG_SEARCH', 'request/search/log');
    define('GET_LITTLE_TRANSACTION', 'transaction/little_list');

    define('BROKERAGE_FIRM_POST', 'brokerage_firm');
    define('BROKERAGE_FIRM', 'brokerage_firm');
    define('BROKERAGE_FIRM_LIST', 'brokerage_firm/list');

    // -- business developer member --
    define('GET_BDE_MEMBER_LIST', 'user/staffs/list');

    // -- brokerage_firm --
    define('GET_BROKERAGE_FIRM_LIST', 'brokerage_firm/list');

    // -- Report --
    define('GET_REPORT_REQUEST_ON_STAFF', 'report/request_on_staff');
    define('GET_NEWEST_LISTINGS', 'listing/newest/list');
    define('GET_NEWEST_BUILDING', 'building/newest/list');
    define('GET_LIST_BY_REQUEST', 'listing/list');
    define('GET_LIST_OVERVIEW', 'report/listing/count/over_view_for_status');
    define('GET_LIST_OVERVIEW_ACQUIRED_BUILDING', 'report/listing/count/acquired_building');
    define('GET_LIST_OVERVIEW_PROJECT', 'report/project/count');
    define('GET_REPORT_AGENT_ACTIVITIES', 'report/agent/activities');
    define('GET_REPORT_COUNT_PENDING', 'report/listing/count/pending');
    define('GET_REPORT_COUNT_REJECTED', 'report/listing/count/reject');
    define('GET_REPORT_AGENT_SEARCH', 'report/agent/search');
    define('GET_REPORT_AGENT_BOOKING_COUNT', 'report/agent/booking');
    define('GET_LISTING_CREATED_BY_AGENT', 'report/listing');
    define('EXPORT_REPORT', 'export/report');

    /* Report 1.0 */
    define('GET_AGENT_OVERVIEW', 'report/agent/overview');

    /* Report 3.0 */
    define('GET_COUNT_AGENT_OVERVIEW', 'report/agent/count/overview');
    define('GET_COUNT_AGENT_FOR_DATE', 'report/agent/count/overview_for_date');

    /* Report 4.0 */
    define('GET_LISTING_SALE_OVERVIEW', 'report/agent/count/over_view_for_sale');
    define('GET_LISTING_RENT_RESIDENTAL_OVERVIEW', 'report/agent/count/over_view_for_rent_residential');
    define('GET_LISTING_RENT_COMMERCIAL_OVERVIEW', 'report/agent/count/over_view_for_rent_commercial');

    /* Report 6.0 */
    define('GET_COUNT_DEAL', 'report/deal/count');
    define('GET_CLOSED_DEAL', 'report/deal/closed/overview');

    /* Report 7.0 */
    define('GET_LISTING_QUALIFY', 'report/listing/quality');

    /* Import gg sheet */
    define('IMPORT_GOOGLE_SHEET', 'marketing/import/google-sheet');

    //seo
    define('GET_LIST_SEO_PAGE', 'seo/property/list');
    define('POST_SEO_PROPERTY', 'seo/property');
    define('GET_SEO_PROPERTY', 'seo/property');
    define('DELETE_SEO_PROPERTY', 'seo/property/delete');

    // customer
    define('GENERATE_CUSTOMER_ID', 'customer/generate_id/%d');
    define('GET_LIST_PHONE', 'customer');
    // lead
    define('CREATE_LEAD_FROM_REQUEST', 'lead');
    define('CREATE_LEAD', 'lead/create');
    define('MATCH_REQUEST', 'lead/match-request');
    define('MATCH_LISTING', 'lead/match-listing');
    define('GET_LEAD_LIST', 'lead/list/-1');
    define('GET_LEAD_DETAIL', 'lead/v2/detail');
    define('REMOVE_EMAIL_LISTING', 'lead/listing');
    define('ADD_EMAIL_LISTING', 'lead/listing/map');
    define('GET_LEAD_LISTINGS', 'lead/listing/mapped/list');
    define('GET_LEAD_STATUS_LIST', 'lead/status/list');
    define('DEACTIVATE_LEAD_LISTING', 'lead/listing/deactivate');
    define('UPDATE_LEAD', 'lead/update');
    define('LEAD_EMAIL_LISTING_TO_CUSTOMER', 'listing/customer/email');
    define('EMAIL_LISTING_AND_UPDATE_LEAD_DEAL', 'listing/customer-email-and-update-ld-form');
    define('DEAL_SEND_CONTRACTS', 'deal/contracts/send');
    define('GET_LEAD_GROUP_STATUS', 'lead/status/group/list');
    define('GET_LEAD_LIST_INDIVIDUAL', 'lead/list');
    define('LEAD_REMINDER', 'lead/reminder');
    define('LEAD_SCHEDULE', 'lead/schedule');
    define('LEAD_UPDATE_ACTIVATED', 'lead/update/activated');
    define('LEAD_ACTIVITIES_LIST', 'lead/activities/list');
    define('LEAD_REMINDERS_LIST', 'lead/reminders/list');
    define('LEAD_REMINDER_READ', 'lead/reminder/read');
    define('LEAD_HISTORIES', 'lead/histories');
    define('LEAD_NOTES_LIST', 'lead/notes/list');
    define('LEAD_NOTE', 'lead/note');

    define("SELECT_LEAD_LISTING", 'lead/listing/selected');

    // Deal
    define('GET_DEAL_LIST', 'deal/list/-1');
    define('GENERATE_DEAL', 'deal');
    define('UPDATE_DEAL', 'deal/update');
    define('GET_DEAL_DETAIL', 'deal/detail');
    define('GET_DEAL_STATUS_LIST', 'deal/status/list');
    define('CHECK_AGENT_PHONE', 'agent/check/phone');
    define('CHECK_AGENT_EMAIL', 'agent/check/email');
    define('DEACTIVATE_DEAL_LISTING', 'deal/listing/deactivate');
    define('GET_DEAL_LISTINGS', 'deal/listing/mapped/list');
    define('ADD_DEAL_EMAIL_LISTING', 'deal/listing/map');
    define('REMOVE_DEAL_EMAIL_LISTING', 'deal/listing');
    define("SELECT_DEAL_LISTING", 'deal/listing/selected');
    define("ADD_NUMBER_OF_LISTING_VIEW", "deal/view/number");
    define('DEAL_LIST_BRIEF_FORM', 'deal/brief_form/list');
    define('DEAL_HISTORIES', 'deal/histories');

    define("GET_DIRECTIONS", 'directions/list');
    define("GET_DIRECTIONS2", 'directions');
    define("GET_DEAL_GROUP_STATUS", 'deal/status/group/list');
    define("GET_LIST_MATCHED_TABS_DEAL", 'basic-settings/dashboard');
    define("GET_LIST_MATCHED_TABS_LEAD", 'basic-settings/dashboard');
    define("GET_LIST_MATCHED_TABS_KYC", 'basic-settings/kyc');
    define("GET_DEAL_LIST_INDIVIDUAL", 'deal/list');
    define('DEAL_REMINDER', 'deal/reminder');
    define('DEAL_SALE_REMINDER', 'deal/sale/reminder');
    define('DEAL_UPDATE_ACTIVATED', 'deal/update/activated');
    define('MAKE_DEAL_MEETING_REMINDER', 'deal/meeting');
    define('MAKE_DEAL_EVENT_REMINDER', 'deal/event');
    define('DEAL_LISTING_STATUS_LIST', 'deal/listing/status/list');
    define('DEAL_LISTING_STATUS', 'deal/listing/status');
    define('DEAL_ACTIVITIES_LIST', 'deal/activities/list');
    define('DEAL_NOTIFY', 'notification/deal');
    define('DEAL_REMINDERS_LIST', 'deal/reminders/list');
    define('DEAL_REMINDER_READ', 'deal/reminder/read');
    define('DEAL_CONTRACTS', 'deal/contracts');
    define('DEAL_SCHEDULE', 'deal/schedule');
    define('DEAL_REQUEST_FEEDBACK', 'deal/request-feedback/');
    define('DEAL_FEEDBACKS', 'deal/feedbacks');
    define('DEAL_FEEDBACK', 'deal/feedback');

    // Schedule
    define('SCHEDULE_LATE_STARTED', 'schedule/lated-start');
    define('SCHEDULE_SOLVED', 'schedule/solved');
    define('SCHEDULE_LATE', 'schedule/late');
    define('SCHEDULE_CANCEL', 'schedule/cancel');
    define('SCHEDULE_GOING', 'schedule/going');
    define('SCHEDULE_END', 'schedule/end');
    define('SCHEDULE_WRONG_LOCATION', 'schedule/incorrect-location');
    define('SCHEDULE_DETAIL_END', 'schedule/feedback-listings');
    define('SCHEDULE_ORDER_LISTING', 'schedule/listing-order');

    // order
    define('ORDER', "order");
    define("BROADCAST", "order/broadcast");
    define("LIST_ORDER", "order/list");
    define("TM_DEAL_NOTIFICATION", "notification/deal");
    define("SET_TM_DEAL_NOTIFICATION_READ", "notification/deal/read");
    define("ORDER_RESPONDED_CONTACT", "order/responded/contact");
    define("ORDER_CALL", "order/call");
    define("ORDER_COUNT_RESPONDED_STATUS", "order/count/responded/status");
    define('ORDER_UPDATE_ACTIVITY', 'order/update/activity');
    define('ORDER_LIST_RESPONDED', 'order/list/responded/');
    define('ORDER_LIST_RESPONDED_LISTING', 'order/list/responded/listing/');
    define('ORDER_LIST_RESPONDED_CONTACT', 'order/list/responded/contact');
    define('ORDER_NOTE', 'order/note');
    define('ORDER_LISTING_DETAIL', 'order/listing/detail');
    define('ORDER_EMAIL_LS_CREATE_LISTING', 'order/email/ls/create/listing');
    //define('ORDER_EMAIL_LS_CONTACT_LISTING_MISMATCH', 'order/email/ls/contact/listing/mismatch');
    define('ORDER_EMAIL_LS_CONTACT', 'order/email/ls/contact');
    define('ORDER_EMAIL_LS_CONTACT_LISTING_MISMATCH', 'order/email/ls/contact/listing/mismatch');
    define('DEAL_BRIEFT_FORM', 'deal/brief_form');
    define('DEAL_NOTES_LIST', 'deal/notes/list');
    define('DEAL_NOTE', 'deal/note');
    define('DEAL_MEETING_LIST', 'deal/meeting/list');
    define('DEAL_REQUEST_DETAIL', 'deal/request');

    /* Graph report apis */
    define('GET_REGIONS', 'regions/list');
    define('GET_CITIES_BY_REGIONS', 'cities/list');
    define('GET_DISTRICTS_BY_CITIES', 'districts/list');
    define('GET_DISTRICT_LIST_BY_CITY', 'district/list');
    define('GET_DISTRICT_LIST_BY_USER', 'district/config/user/%d');
    define('REPORT_LISTING_BY_REGION', 'report/listing/region');
    define('REPORT_LISTING_BY_AGENT', 'report/listing/agent/region');
    define('REPORT_LISTING_BY_AM', 'report/agent/am/region');
    define('REPORT_TOP_AGENT', 'report/top/agent/region');
    define('REPORT_BY_TYPE', 'report/by_type/region');
    define('REPORT_DISTRIBUTION_GRAPH', 'report/district/chart');
    define('REPORT_LIST_USER_TYPE', 'user/list/{type}/by_region');
    define('REPORT_SALES_FUNNEL', 'report/deal/status');
    define('REPORT_HISTORY', 'report/historys');
    /* Graph report apis v2 */
    define('MANAGEMENT_REPORT_OVERVIEW', 'kpi/overview');
    define('MANAGEMENT_REPORT_SETTINGS_GET_TARGET', 'kpi/target/%d/%d');
    define('MANAGEMENT_REPORT_SETTINGS_SAVE_TARGET', 'kpi/target');
    define('MANAGEMENT_REPORT_SETTINGS_GET_TARGET_HISTORY', 'kpi/target/history/%d/%d');
    define('MANAGEMENT_REPORT_SETTINGS_GET_SALE_FUNNEL', 'kpi/sale-funnel/get');
    define('MANAGEMENT_REPORT_SETTINGS_SAVE_SALE_FUNNEL', 'kpi/sale-funnel/update');
    define('MANAGEMENT_REPORT_SETTINGS_GET_SALE_FUNNEL_HISTORY', 'kpi/sale-funnel/history/%d');

    /*     * * LISTING */
    define('MANAGEMENT_REPORT_LISTING_CHART', 'kpi/chart/listing');
    define('MANAGEMENT_REPORT_LISTING_VALUE', 'kpi/list/listing-agent-owner');
    define('MANAGEMENT_REPORT_LISTING_COMMISSION', 'kpi/list/commission-listing');
    define('MANAGEMENT_REPORT_LISTING_COLUMN_CHART', 'kpi/chart/column-listing');

    /*     * * LEAD */
    define('MANAGEMENT_REPORT_LEAD', 'kpi/chart/circle/lead');
    define('MANAGEMENT_REPORT_LEAD_SOURCE', 'kpi/lead/customers-source');
    define('MANAGEMENT_REPORT_LEAD_COMPARE', 'kpi/chart/column/lead');
    define('MANAGEMENT_REPORT_LEAD_DISTRIBUTE_BY_REGION', 'kpi/lead/distribution-by-region');
    define('MANAGEMENT_REPORT_LEAD_CUSTOMER_FOR_AREA', 'kpi/lead/customers-area');


    /*     * * DEAL */
    define('MANAGEMENT_REPORT_DEAL', 'kpi/chart/circle/deal');
    define('MANAGEMENT_REPORT_DEAL_SOURCE', 'kpi/deal/customers-source');
    define('MANAGEMENT_REPORT_DEAL_COMPARE', 'kpi/chart/column/deal');
    define('MANAGEMENT_REPORT_DEAL_DISTRIBUTE_BY_REGION', 'kpi/deal/distribution-by-region');
    define('MANAGEMENT_REPORT_DEAL_CUSTOMER_FOR_AREA', 'kpi/deal/customers-area');
    define('MANAGEMENT_REPORT_DEAL_SALE_FUNNEL', 'kpi/deal/sale-funnel');
    define('MANAGEMENT_REPORT_DEAL_SALE_FUNNEL_CUSTOMER', 'kpi/deal/sale-funnel/get-customer');

    //matching
    define('MATCHING', 'configuration');
    define('GET_ALL_DEPARTMENTS', 'departments/get-all');
    define('GET_LIST_ZONE', 'departments/get-list-zone');
    define('GET_LIST_TEAM', 'departments/get-list-team');
    define('GET_LIST_DEPARTMENT', 'departments/get-list-department');
    define('GET_LIST_MEMBER', 'departments/get-list-user');
    define('GET_DISTRICTS_BY_PERMISSION', 'departments/get-list-district');
    define('GET_WARDS_BY_PERMISSION', 'departments/get-list-ward');
    define('POST_GET_TEAM', 'departments/tree/parentIds');
    define('POST_GET_USERS', 'hrm-contacts/list/user/departmentIds');
    define('GET_POSITION', 'user-positions/get-by-department');
    define('GET_POSITION_V2', 'user-positions/user/get-by-department');
    define('GET_AREAS_BY_DEPARTMENT', 'departments/get-districts');
    define('INVITE_CONTACT', 'auth/invite-user');
    define('GET_ACTIVATION_KEY', 'user/get-by-activation-key/');
    define('DO_CREATE_PASSWORD', 'auth/active-user');
    define('GET_DEPARTMENT_TYPE', 'departments/types');
    define('DO_CREATE_DEPARTMENT', 'departments/create');
    define('DETAIL_DEPARTMENT', 'departments');
    define('DO_UPDATE_DEPARTMENT', 'departments/update');
    define('GET_LIST_DEPARTMENTS', 'departments/tree');
    define('GET_LIST_DEPARTMENTS_V2', 'departments/user/tree'); // api hotfix ASM role
    define('UPDATE_POSITIONS', 'user/update-positions');
    define('DETAIL_INFOS', 'hrm-contacts');
    define("GET_DEAL_LIST_USER", 'hrm-contacts/deal/list');
    define("GET_DEAL_GROUP_STATUS_CONTACTS", 'hrm-contacts/status/group/list');
    define('DO_UPDATE_INFOS_USER', 'hrm-contacts/update-user');
    define('DO_DELETE_USER', 'hrm-contacts/delete-user');
    define('DO_UPDATE_STATUS_USER', 'hrm-contacts/change-status-user');
    define('DO_UPDATE_INFOS_CUSTOMER', 'hrm-contacts/update-customer');
    define('DO_DELETE_CUSTOMER', 'hrm-contacts/delete-customer');
    define("GET_LISTING_OWNER", 'contact-owner-listing/listings');
    define("GET_CHANNEL_STATUS_PRE", 'prescreen/channel-status');
    define("GET_CHANNEL_STATUS_SA", 'seller/channel-status/1');
    define("GET_ALL_FILTERS", 'hrm-contacts/get-filter-form');
    define("DO_LOCK_USER", 'hrm-contacts/lock');
    define('DO_UPDATE_STATUS_AGENT', 'hrm-contacts/change-status-agent');
    define('GET_LISTING_AGENT_POSTED', 'contact-agent-listing/listings');
    define('GET_DISTRICTS_BY_TC', 'district/tc/list');
    define('DO_TRACKING_BA_VIEW_INFO', 'tracking/deal-lead/search-listing');
    //DO_UPDATE_INFOS_OWNER

    /* event */
    define('EVENTS', 'events');
    define('EVENTS_HISTORY', 'events/history');
    define('EXPORT_REPORTS_EVENTS', 'export/report/events');
    define('EVENT_ITEMS', 'events/items');
    define('EVENT_LOGS', 'events/log');

    /* activity */
    define("ACTIVITY_LIST", 'activity/list');
    define("ACTIVITY_DONE", 'activity/done');

    /* bank */
    //define("BANK_LIST", 'bank/list');
    define("BANK", 'bank/');

    define('TASK_DEFINITIONS', 'task/definitions');
    define('TASK_PARENTS', 'task/parents');
    define('SUB_TASKS', 'task/childs');
    define('TASK_CREATE', 'task/create');
    define('CRM_TASK', 'crm/task');
    define('CRM_TASK_DEFINITIONS', 'task/crm/definitions');
    define('CRM_DONE_TASK', 'crm/done-task');
    define('CRM_ACCEPT_MEETING', 'crm/accept-meeting');
    define('CRM_REASSIGN_MEETING', 'crm/reassign-meeting');
    define('DEAL_MEETING_CONFIRM_REQUEST', 'deal/meeting/confirm-request');
    define('CRM_LISTING_CART', 'crm/listing-cart');
    define('CRM_LISTING_CART_DELETE', 'crm/listing-cart/delete');
    define('CRM_SERVICES', 'crm/services');
    define('LISTING_SERVICES', 'listing/{rlistingId}/services');

    // DIY
    define('DIY_LIST', 'diy/list');
    define('DIY_UPDATE_SEND', 'diy/update-send');
    define('DIY_UPDATE_STATUS', 'diy/update-status');

    // LSO
    define('LSO_CONSTRUCT_FAME', 1);
    define('LSO_CONSTRUCT_ROOF', 2);
    define('LSO_CONSTRUCT_WALL', 3);
    define('LSO_CONSTRUCT_FLOOR', 4);
    define('LSO_CONSTRUCT_CEIL', 5);

    // PAGINATION DIYs
    define('NUMBER_ITEMS', 10);

    // PERMISSION LSO
    // CRAWLERS
    define('ACCESS_DENIED_PERM', 1);
    define('ALL_OPEN_PERM', 5);

    // CRM2 QUESTION
    define('LIST_QUESTION_NOT_IN_FORM', 'profile/get-question-form/1');
    define('LIST_QUESTION_IN_FORM', 'profile/get-question-form/2');
    define('PROFILE_QUESTION', 'profile/question');
    define('QUESTION_FORM', 'profile/question-form');
    define('QUESTION_DELETE', 'profile/question/');
    define('QUESTION_MODAL_VIEW', 'profile/get-question-form-result/');
    define('SET_QUESTION_MODAL_VIEW', 'profile/set-question-form-result');
    define('HISTORY_PROFILE', 'histories');
    define('HISTORY_TOUR_BOOKED', 'histories/get-tour-booked');
    define('HISTORY_TOUR_GONE', 'histories/get-tour-went');
    define('HISTORY_TOUR_CANCLED', 'histories/get-tour-canceled');
    define('HISTORY_DETAIL', 'histories/lead-deal');
    define('HISTORY_LIST_EVENT_HISTORY', 'histories/lead-deal/type');
    define('HISTORY', '/histories/list/');
    define('UPDATE_PROFILE', 'user/update-profile');

    define('SCHEDULE_MISSING_SCHEDULES', 'schedule/missing-schedule');
    define('SCHEDULE_WHAT_HAPPENDED', 'schedule/what-happen');
    define('ba_summary', 'report/ba/summary');
    define('sale_funel', 'report/ba/deals/summary');

    define("CHANNEL_TYPES", "channel-types/%d");
    define('DO_CHANGE_PASSWORD', 'user/change-password');
    define('DELETE_POSITION', 'user-positions/delete');

    define('LIST_SHORT_INFO', 'agent/list-short-info');
    define("AGENT_EXIST", "agent/existing");
    define("AGENT_EXIST_BY_CUSTOMER_ID", "agent/existing-with-customer");
    define("CUSTOMER_TO_AGENT", "agent/convert-customer-to-agents");
    define(
        "AGENT_UPDATE_CUSTOMER_INFO",
        "deal/customer-info"
    );
    define(
        "CREATE_MORTGAGE_REQUEST",
        "mortgage/create-request"
    );
    define("PRICE_RANGES", "ranges/vi");
    define("ALLEY_TYPE", "alley/2");
    // Time Counter + Warning
    define("DO_SAVE_TIME_COUNTER_ASSISTANT", "prescreen/time_counter");
    define("DO_SAVE_TIME_COUNTER_SA", "seller/time_counter");
    define("DO_SAVE_TIME_COUNTER", "");
    define("GET_NOTIFY_TIME_COUNTER", "notification/warning");

    define('GET_COUNTRIES', 'countries');
    define('GET_CITIES_BY_ZONE_TEAM', 'cities');
    define('GET_TEAM_BY_ZONE', '/departments/get-team-by-zone');
    define('GET_DISTRICT_BY_ZONE_TEAM', '/user-role/districts');
    define('GET_WARD_BY_ZONE_TEAM_DISTRICT', '/user-role/wards');

    /// PRICETAG
    define('BASE_API_PRICE_TAG', getenv('BASE_API_PRICE_TAG'));
    define('PRICE_TAG_LISTING_ADD', 'tag-listing/add');
    define('PRICE_TAG_DISPLAY_DEF', 'tag-display/list/default');
    define('PRICE_TAG_DISPLAY_LIST', 'tag-listing/aggregate-by-listing-ids/{rlistingId}');
    define('PRICE_TAG_TRACKING_LIST', 'tag-tracking/view-listing');
    /// END PRICETAG
    
    //// SAME TOURS
    define('CHECK_DUPLICATED_TOUR', 'schedule-processed/schedule/check-time-duplicate');
    define('GET_LIST_SAME_TOURS', '');

    // UPDATE TOUR PERMISSION
    define('ADD_TOUR_PERMISSION', 'permission/has-tour-add-permission');

    // AGENT PROFILE
    define('GET_LIST_USER_TITLE', 'user/user-title');
    define('GET_LIST_SOCIAL_NETWORK', 'user/social-network-type');
    // END AGENT PROFILE

    // CALENDAR TASK
    define('CALENDAR_TASK_BASE_API', getenv('CALENDAR_TASK_BASE_API'));
    // END CALENDAR TASK
}
