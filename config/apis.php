<?php
/**
 * Tổng hợp APIs
 *
 * @author Huy Châu <huy.chau@propzy.vn>
 */
return [
    'lso' => [
        // Quản lý chủ nhà
        'list' => 'lso/listings/',
        'detail' => 'lso/listings/',
        // Lịch sử giao dịch
        'histories' => 'lso/histories/',
        // Assign
        'reassign' => 'lso/listings/re-assign',
        'note' => 'lso/listings/notes',
        // Tình trạng
        'statuses' => 'lso/channel-status',
        // Loại BĐS
        'propertyTypes' => 'property_type/list/',
        // Loai BDS V2
        'propertyTypesV2' => 'v2/property_type/list/',
        // Group BĐS
        'propertyTypeGroup' => 'v2/property_type_group/list',
        // Nguồn
        'sourceTypes' => 'lso/source-types',
        // Danh sách chủ quyền
        'rightTypes' => 'lso/use-right-types',
        // Loại nhà
        'houseTypes' => 'lso/house-types',
        // Ưu điểm
        'advantages' => 'lso/advantages',
        // Nhược điểm
        'disadvantages' => 'lso/disadvantages',
        // Loại công trình
        'constructionTypes' => 'lso/construction-types',
        // Dừng
        'stopLs' => 'lso/listings/stop',
        // Từ chối
        'rejectLs' => 'lso/listings/reject',
        // Bán + Dừng
        'rentSoldLs' => 'lso/listings/sold-rent',
        // Gửi LS
        'sendRequestLS' => 'lso/send-request',
        // Gửi lại thông tin
        'resend' => 'lso/resend/account/',
        // Danh sách yêu cầu nội bộ
        'listInternal' => 'lso/listings/comment/',
        'createInternalRequest' => 'lso/listings/comment/add',
        'listingOwner' => 'lso/listings/owner/',
        // PS
        // http://sc.propzy.vn/root/dashboard_service/wikis/%5Blso%5D--get-service-lsolisting
        'getLsoServices' => 'lso/services/',
        // http://sc.propzy.vn/root/dashboard_service/wikis/%5Blso%5D-delay-service-lsolisting-ps
        'delayLsoServices' => 'lso/services/delay',
        // http://sc.propzy.vn/root/dashboard_service/wikis/%5Blso%5D-done-service-lsolisting-ps
        'doneLsoServices' => 'lso/services/done',
        // http://sc.propzy.vn/root/dashboard_service/wikis/%5Blso%5D-get-service-sent-lsolisting-ps
        'getSentLsoServices' => 'lso/services/sent/',
        // http://sc.propzy.vn/root/dashboard_service/wikis/%5Blso%5D-sent-service-lsolisting-ps
        'sentLsoServices' => 'lso/services/sent',
        // http://sc.propzy.vn/root/dashboard_service/wikis/get-total-service-ps-not-done
        'totalServices' => 'lso/services/total/not-done/',
        'valuation' => 'lso/valuation/%d',
        // [lso] get lsolisting transfer system listing
        'systemtransfer' => 'lso/transfer/listing/%d/%d',
        // [lso] report combined
        'reportCombined' => 'lso/report/combined/%d/%d',
        // [lso] report result work
        'reportResultWork' => 'lso/report/result-work/%d/%d',
        'exportExcelResultWork' => 'lso/link-export',
        /*
         * Profile
         */
        // Lấy thông tin owner profile
        'profileDetail' => 'lso/owner/profile/%d',
        // Lấy thông tin profile và thông tin owner
        'profileDetailOwner' => 'lso/owner/profile/detail/%d',
        // Tạo owner profile
        'createProfile' => 'lso/owner/profile/',
        // Cập nhật thông tin owner profile
        'updateProfile' => 'lso/owner/profile/',
        // Xóa thông tin owner profile
        'deleteProfile' => 'lso/owner/profile/'
    ],
    'crawlers' => [
        'list' => 'crawler/listings/',
        'detail' => 'crawler/listings/',
        'update' => 'crawler/listings/quick-update',
        'statuses' => 'crawler/listings/status'
    ],
    'crawlerList' => [
        'getSite' => 'crawler/tool/sitelist',
        'getList' => 'crawler/tool/list/%d/%d',
        'cancelCrawler' => 'crawler/tool/status-update/%d/%d',
        'transferCrawler' => 'prescreen/listings',
        'checkDuplicate' => 'crawler/owners/check-exists',
        'checkAddressDuplicate' => 'crawler/address/check-exists',
        'link_download' => 'crawler/tool/list/generate-excel',
    ],
    'training' => [
        'common' =>'tpa/courses',
        'getList' =>'tpa/courses/%d/%d',
        'getListMembers' =>'tpa/courses/members/%d/%d',
        'getStatus' =>'tpa/channel-status',
    ],
    "listing" => [
        'sold-rent' => 'listing/sold-rent',
        'stop' => 'listing/stop',
        'upload' => 'upload',
        'getRelatedListingRequest' => 'listing/request/get/'
    ],
    "dashboard" => [
        'createstreet' => 'streets'
    ],
    'prescreener' => [
        // Get get listings list for prescreen user
        // http://sc.propzy.vn/root/propzy-dashboard-service-v2/wikis/%5Bpos%5D-get-listings-list-for-prescreen-user
        'list' => 'prescreen/listings',
        'create' => 'prescreen/listings',
        // Get overview for prescreen user
        // http://sc.propzy.vn/root/propzy-dashboard-service-v2/wikis/%5Bpos%5D-get-overview-for-prescreen-user
        'overview' => 'prescreen/overview',
        'send-diy' => 'prescreen/listings/%d/send-diy',
        'channel-types' => 'prescreen/channel-types',
        'lock-unlock' => 'prescreen/listings/%d/lock-unlock',
        'channel-status' => 'prescreen/channel-status',
        'createReminder' => 'prescreen/reminders',
        'updateListing' => 'prescreen/listings',
        'getReminder' => 'prescreen/reminders/popup',
        'closeReminder' => 'prescreen/reminders/closed-popup',
        'cancelListing' => 'prescreen/listings/stop',
        'sendSA' => 'prescreen/listings/to-real-listing',
        'trackCall' => 'prescreen/listings/',
        'resend' => 'prescreen/resend/account/%d', // owner id
        'push-to-owner' => 'prescreen/listings/%d/push-diy',
        'location-validate' => '/prescreen/location-validate'
    ],
    'sa' => [
        'channel-types'     => 'seller/channel-types/%d', //type
        'channel-status'    => 'seller/channel-status/%d', // type
        'listings-live-subtandard' => 'seller/listings/%d/%d', // page / numberItem
        'listings'          => 'seller/listings/%d', //id
        'update-listing'    => 'seller/listings',
        'track-call'        => 'seller/listings/%d/track-call',  //rlistingId
        'send-diy' => 'seller/listings/%d/send-diy', // rlistingId
        'propzy-services' => '/seller-report/services/listing/%d',
        'seller-update-listing' => 'seller-report/listing/%d',
        'seller-photos' => 'seller-report/listing/%d/photo'
    ],
    'common' => [
        'use-right-types' => 'use-right-types',
    ]
];
