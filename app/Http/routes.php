<?php
Route::post('/forgot-pws', 'UserRoleController@forgotPws');
Route::any('/change-password', 'UserRoleController@changePassword');
Route::any('/store-reset', 'UserRoleController@storeReset');
Route::get('/logout', 'IndexController@logout');
Route::any('/login', 'IndexController@login');
Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');
Route::get('index', 'IndexController@index');
Route::post('/listing/reassign', 'ListingController@reassign');
Route::get('/is-session-alive', 'UserController@isSessionAlive');
Route::any('/active-user/{activationKey}', 'UserController@createPassword');
Route::any('/user/do-create-password', 'UserController@doCreatePassword');

Route::get('/403-forbidden', function () {
    return view("errors.403");
});

Route::get('/404-not-found', function () {
    return view("errors.404");
});

Route::get('/401-not-permission', function () {
    return view("errors.401");
});

Route::group(['middleware' => 'auth.session'], function () {
    Route::any('/', 'IndexController@index');
    // Index
    Route::get('/dashboard/sub-tasks/{priority}/{id}', 'DashboardController@subTasks');
    Route::get('/dashboard/sub-tasks-data/{priority}/{id}', 'DashboardController@subTasksData');
    Route::get('/dashboard', 'IndexController@dashboard');
    Route::get('/account-manager', 'OperationDbController@rAccountManager');
    Route::any('/set-status', 'OperationDbController@setStatus');
    // OPeration management
    Route::get('/listing-service/quan-ly-listing', 'OperationDbController@listingManagement');
    Route::get('/listing-service/listing', 'OperationDbController@listingDetail');

    Route::get('/facade', function () {
        DefaultLayoutSupport::get();
    });

    Route::get('user/suspend-account/{socialUid}', 'UserController@suspendAccount');
    Route::post('user/reset-password', 'UserController@resetPasswordJson');
    Route::get('agent/assign-brokerage-firm/{agentId}/{brokerageId}', 'OperationDbController@agenAssignBrokerageFirm');

    // TM Team
    Route::get('/transactions/history/{transactionId}', 'OperationDbController@tmTransactionHistory');

    Route::get('/brokerage-firm', 'OperationDbController@brokerageFirm');
    Route::get('/brokerage-firm/tao-moi', 'OperationDbController@createBrokerageFirm');
    Route::get('/brokerage-firm/{brokerageFirmId}', 'OperationDbController@updateBrokerageFirm');
    // Manage listings
    Route::get('listing', 'ListingController@index');
    Route::post('listing', 'ListingController@index');
    Route::get('listing/new', 'ListingController@listingCreate');
    Route::get('listing/find', 'ListingController@find');
    Route::any('listing/search/{transactionId?}', 'ListingController@listingSearch');
    Route::any('listing/get-ajax-listing-list', 'ListingController@getAjaxListingList');
    Route::any('listing/assigned', 'ListingController@assignedListings');
    Route::any('/listing/get-assigned-listings', 'ListingController@getAssignedListings');
    Route::any('/listing/create-from-brief-form/{id}', 'ListingController@createFromBriefForm');
    Route::any('/listing/notes-list', 'ListingController@notesList');
    Route::any('/listing/notes-list-data', 'ListingController@notesListData');
    Route::any('/listing/notes/{id}', 'ListingController@notes');
    Route::any('/listing/merge-notes/{rlistingId}/{noteId}', 'ListingController@mergeNotes');
    Route::any('/listing/is-listing-viewable/{id}', 'ListingController@isListingViewable');
    Route::any('listing/find-by-ids', 'ListingController@findByIds');

    Route::get('/listing/check-availability', 'ListingController@checkAvailability');
    Route::get('/listing/create-address-suggestion', 'ListingController@createAddressSuggestion');
    Route::get('/listing/update-address-suggestion/{id}', 'ListingController@updateAddressSuggestion');
    Route::get('/listing/address-suggestions', 'ListingController@addressSuggestions');
    Route::get('/listing/address-suggestions-data', 'ListingController@addressSuggestionsData');
    Route::get('/listing/get-address-suggestion/{wardId}', 'ListingController@getAddressSuggestion');
    Route::get('/listing/check-status', 'ListingController@checkStatus');
    Route::get('/listing/get-list-from-agent', 'ListingController@getListFromAgent');
    Route::post('/listing/set-available', 'ListingController@setAvailable');
    Route::post('/listing/save-search-listing', 'ListingController@saveSearchListing');
    Route::post('/listing/create-lead-from-available', 'ListingController@createLeadFromAvailable');
    Route::get('/listing/agent-search-listing', 'ListingController@agentSearchListing');
    Route::post('/listing/update-note-for-agent-search', 'ListingController@updateNoteForAgentSearch');

    Route::get('duplicate/{rListingId}', 'ListingController@duplicateListing');
    Route::post('imageBuildingUploader', 'ListingController@imageBuildingUploader');
    Route::post('videoBuildingUploader', 'ListingController@videoBuildingUploader');

    Route::post('videoListingRemover', 'ListingController@videoListingRemover');

    Route::post('createListing', 'ListingController@createListingJson');
    Route::post('updateListing', 'ListingController@updateListingJson');
    Route::post('checkDuplicates', 'ListingController@chekDuplicatesJson');


    Route::get('listing/getRelatedListingRequest', 'ListingController@getRelatedListingRequest');
    Route::get('listing/{slug}', 'ListingController@listingDetail');
    Route::get('listing/view/{slug}', 'ListingController@listingView');
    Route::get('get-project-detail/{projectId}', 'CommonController@projectDetail');
    Route::post('imageListingUploader', 'ListingController@imageListingUploader');
    Route::post('videoListingUploader', 'ListingController@videoListingUploader');
    Route::post('imageListingRemover', 'ListingController@imageListingRemover');

    Route::get('draft', 'ListingController@draft');
    Route::get('draft/{slug}', 'ListingController@draftDetail');

    //Manage amenities
    Route::get('amenities/get-amenities', 'AmenitiesController@getAmenities');
    Route::get('amenities/get-around-amenities', 'AmenitiesController@getAroundAmenities');
    Route::post('amenities/add-around-amenities', 'AmenitiesController@addAroundAmenities');

    //Manage buildings
    Route::get('building', 'BuildingController@index');
    Route::post('building/list', 'BuildingController@buildingList');
    Route::get('building/new/{listingType}/{propertyType}/{level}', 'BuildingController@newBuilding');

    Route::get('building/{id}', 'BuildingController@editBuildingPage');
    Route::post('building/search-building', 'BuildingController@searchBuilding');
    Route::post('createBuilding', 'BuildingController@createBuilding');
    Route::post('editBuilding', 'BuildingController@editBuilding');

    //Manage users
    Route::match(['get', 'post'], 'staff', 'UserController@staff');


    Route::post('create-new-account', 'UserController@createAccountJson');
    Route::post('update-account', 'UserController@updateAccountJson');
    Route::get('checkUserName/{username}', 'UserController@checkUserNameJson');
    Route::get('create-account', 'UserController@create');
    // start phan quyen : minh.nguyen
    Route::get('user-role/invite-contacts', 'UserController@inviteContacts');
    Route::get('user-role/create-department', 'UserController@createDepartment');
    Route::get('user-role/edit-department/{departmentId}', 'UserController@editDepartment');
    Route::get('user-role/list-departments/{parentId}', 'UserController@listDepartments');
    Route::get('user-role/detail-infos/user/{contactId}', 'UserController@detailInfosUser');
    Route::get('user-role/detail-infos/customer/{customerId}', 'UserController@detailInfosCustomer');
    Route::get('user-role/detail-infos/owner/{ownerId}', 'UserController@detailInfosOwner');
    Route::get('user-role/detail-infos/agent/{agentId}', 'UserController@detailInfosAgent');
    Route::get('user-role/lock-contacts/{contactId}', 'UserController@lockContacts');
    Route::get('user-role/unlock-contacts/{contactId}', 'UserController@unlockContacts');
    Route::get('get-profile/{profileId}', 'ContactController@getProfile');

    // end phan quyen : minh.nguyen
    Route::get('account-manager/update/{id}', 'UserController@edit');
    Route::post('account-manager/check-assign-district', 'UserController@checkAssignDistrict');
    Route::post('users/update-district-assigned', 'UserController@updateDistrictAssigned');

    Route::get('request-password', 'UserController@requestResetPassword');
    Route::get('new-password', 'UserController@reset-password');

    Route::get('lising-assign-review/{assignedId}/{quantity}/{userType}', 'ListingController@assignReview');

    Route::get('lising-assign-create/{assignedId}/{quantity}', 'ListingController@assignCreate');

    Route::get('listingday', 'ListingController@listingday');

    Route::get('get-ward/{districtId}', 'CommonController@getWard');
    Route::get('get-district/{cityId}', 'CommonController@getDistrict');
    Route::get('common/wards/{districtId}', 'CommonController@getWards');
    Route::get('get-user/{source}', 'CommonController@getUser');
    Route::post('get-user-by-source', 'CommonController@getUserBySource');

    Route::get('get-amenities/{listingTypeId}/{propertyTypeId}/{level}', 'CommonController@getAmenities');
    Route::get('get-district/{cityId}', 'CommonController@getDistrict');

    Route::get('get-agent-list/{listingTypeId}/{purposeId}/{districtId}', 'CommonController@agentList');
    Route::get('get-buiding-list', 'CommonController@getBuidingList');
    Route::get('get-buiding-detail/{buildingId}', 'CommonController@getBuidingDetail');
    Route::get('get-block-list/{buildingId}', 'CommonController@getBlockList');
    Route::get('get-block-detail/{blockId}', 'CommonController@getBlockDetail');
    Route::get('property_type/list/{listingTypeId}', 'CommonController@getPropertyType');
    Route::get('get-tu-trach/{key?}', 'CommonController@getTuTrach');
    //timer counter
    Route::post('timer-counter/track-time-lead', 'CommonController@timeCounterTrackTimeLead');
    Route::post('timer-counter/track-time-deal', 'CommonController@timeCounterTrackTimeDeal');
    //country
    Route::get('create-country', 'IndexController@create_country');
    Route::get('edit-country', 'IndexController@edit_country');
    Route::get('list-country', 'IndexController@list_country');

    //city
    Route::get('create-city', 'IndexController@create_city');
    Route::get('edit-city', 'IndexController@edit_city');
    Route::get('list-city', 'IndexController@list_city');

    //district
    Route::get('create-district', 'IndexController@create_district');
    Route::get('edit-district', 'IndexController@edit_district');
    Route::get('list-district', 'IndexController@list_district');

    //project
    Route::get('project-create', 'ProjectController@projectCreate');
    Route::post('createProject', 'ProjectController@createProject');
    Route::post('editProject', 'ProjectController@editProject');
    Route::get('project/{slug}', 'ProjectController@projectEdit');
    Route::get('project', 'ProjectController@projectList');
    Route::get('get-project-list', 'ProjectController@getProjectList');
    Route::post('get-project-list-by-district', 'ProjectController@getProjectListByDistrict');

    //developer
    Route::get('developer', 'ProjectController@developerList');
    Route::get('developer-create', 'ProjectController@developerCreate');
    Route::get('developer-edit/{developerId}', 'ProjectController@developerEdit');
    Route::post('developer-post', 'ProjectController@developerPost');


    Route::post('imageDeveloperUploader', 'ProjectController@imageDeveloperUploader');
    Route::post('imageDeveloperRemover', 'ProjectController@imageDeveloperRemover');

    //brokerage firm
    Route::get('brokerage-firm', 'BrokerageFirmController@brokerageFirmList');
    Route::get('brokerage-firm-create', 'BrokerageFirmController@brokerageFirmCreate');
    Route::get('brokerage-firm-edit/{bfId}', 'BrokerageFirmController@brokerageFirmEdit');
    Route::post('imageBrokerageFirmUploader', 'BrokerageFirmController@imageBrokerageFirmUploader');
    Route::post('imageBrokerageFirmRemover', 'BrokerageFirmController@imageBrokerageFirmRemover');
    Route::post('postBrokerageFirm', 'BrokerageFirmController@postBrokerageFirm');

    // tasks
    Route::post("/task/insert", 'TaskController@insert');
    Route::post("/task/update/{id}", 'TaskController@update');
    Route::get("/task/delete/{id}", 'TaskController@delete');
    Route::get("/task", 'TaskController@index');
    Route::get('/task/get-ajax', 'TaskController@getAjax');

    // options
    Route::get('option/get-dashboard-statitics', 'OptionController@getDashBoardStatitics');
    Route::get('option/show-latest-dashboard-statitics', 'OptionController@showLatestDashBoardStatitics');
    Route::any('config-dashboard', 'OptionController@configDashBoard');

    // staff
    Route::get("staff/assign-reviews/{id}", 'UserController@assignReviews');

    //seo api
    Route::get('seo/get-directions', 'SeoController@getDirections');
    Route::get('seo/new-page', 'SeoController@showCreatePage');
    Route::get('seo/{slug}', 'SeoController@showEditPage');
    Route::post('seo/postpage/{slug}', 'SeoController@postPage');
    Route::post('seo/delete', 'SeoController@deletePage');
    // Report
    Route::get('/admin-report', 'ReportController@adminReport');
    Route::get('/report/agent-listing-search/{socialUid}', 'ReportController@agentListingSearch');

    // Request
    Route::get('/request/', 'RequestController@listRequest');
    Route::any('/request/insert', 'RequestController@insert');
    Route::any('/request/detail/{id}', 'RequestController@detail');
    Route::any('/request/update/{id}', 'RequestController@update');
    Route::any('/request/do-update', 'RequestController@doUpdate');
    Route::any('/request/create-lead', 'RequestController@createLead');
    Route::any('/request/check-phone/{phone}', 'RequestController@checkPhone');
    Route::any('/request/check-email/{email}', 'RequestController@checkEmail');
    // Lead
    Route::any('/lead/update/{id}', 'LeadController@update');
    Route::any('/lead/detail/{id}', 'LeadController@detail');
    Route::any('/lead/find-listing', 'LeadController@findListing');
    Route::any('/lead/remove-email-listing/{leadId}/{rlistingId}', 'LeadController@removeEmailListing');
    Route::any('/lead/add-email-listings', 'LeadController@addEmailListings');
    Route::any('/lead/reload-email-listings/{leadId}', 'LeadController@reloadEmailListings');
    Route::any('/lead/get-email-listings/{leadId}', 'LeadController@getEmailListings');
    Route::any('/lead/deactivate-listing', 'LeadController@deactivateListing');
    Route::any('/lead/select-customer-listing', 'LeadController@selectCustomerListing');
    Route::any('/lead/do-update', 'LeadController@doUpdate');
    Route::any('/lead/generate-deal', 'LeadController@generateDeal');
    Route::any('/lead/get-customer-email-template/{leadId}', 'LeadController@getCustomerEmailTemplate');
    Route::any('/lead/send-email-listing/{leadId}', 'LeadController@sendEmailListing');
    Route::any('/lead/get-activitities', 'LeadController@getDealActivities');

    // Deal
    Route::any('/deal/update/{id}', 'DealController@update');
    Route::any('/deal/detail/{id}', 'DealController@detail');
    Route::any('/deal/detail-in-group/{id}', 'DealController@detailInGroup');
    Route::any('/deal/do-update', 'DealController@doUpdate');
    Route::any('/deal/find-listing/{dealId}', 'DealController@findListing');
    Route::any('/deal/deactivate-listing', 'DealController@deactivateListing');
    Route::any('/deal/select-customer-listing', 'DealController@selectCustomerListing');
    Route::any('/deal/add-email-listings', 'DealController@addEmailListings');
    Route::any('/deal/remove-email-listing/{dealId}/{rlistingId}', 'DealController@removeEmailListing');
    Route::any('/deal/get-activitities', 'DealController@getDealActivities');

    Route::any("/deal/schedule-feedbacks", "DealController@scheduleFeedBack");

    //Matching
    Route::any('/matching-configuration/get-criteria-list/{screenId}/{propId}', 'PropertyMatchingRankingConfigurationController@getCriteriaList');
    Route::any('/matching-configuration', 'PropertyMatchingRankingConfigurationController@index');
    Route::any('/matching-configuration/get-criteria-items/{screenId}/{propId}', 'PropertyMatchingRankingConfigurationController@getCriteriaItems');
    Route::any('/matching-configuration/get-criteria-item/{code}/{screenId}/{propId}', 'PropertyMatchingRankingConfigurationController@getCriteriaItem');
    Route::any('/matching-configuration/set-criteria/{screenId}/{propId}', 'PropertyMatchingRankingConfigurationController@setCriteria');

    Route::post("/crm-dashboard/save-task-form/{id}/{defineId}", "CrmDashboardController@saveTaskForm");

    // Todo Calendar task
    Route::post("/calendar-task", "CalendarTaskController@index");
    Route::get("/calendar-task/detail/{id}", "CalendarTaskController@detail");

    // Order
    Route::get("/order/get-status-detail/{orderId}/{statusId}", "OrderController@getStatusDetail");
    Route::get("/order/detail/{id}", "OrderController@detail");
    Route::get("/order/contact/{orderId}/{contactId}", "OrderController@contact");
    Route::get("/order/get-list-data/{status?}", "OrderController@getListData");
    Route::get("/order/listing/{orderId}/{listingId}", "OrderController@listing");
    Route::get("/order/get-email-content/{orderId}/{listingId}", "OrderController@getEmailContent");

    // BPO
    Route::get("/bpo/history/{listingId}", "BpoController@history");
    Route::get("/bpo/resolve-detail/{listingId}", "BpoController@resolveDetail");
    Route::get("/bpo/detail/{listingId}", "BpoController@detail");
    Route::any("/health-check", "BpoController@checkHealthPage");

    //BA Dashboard
    Route::get('/ba-dashboard', 'BaDashboardController@index');
    Route::get('/pipeline', 'BaDashboardController@index');
    Route::get('/deal', 'BaDashboardController@index');
    Route::get('/bpo-buyside', 'BaDashboardController@index');

    // Agent
    Route::get('/agent/get-list/{type}', 'AgentController@getList');


    Route::get('/kyc/{slug}', 'KycController@index');
    Route::get('/demo/{page}', 'DemoController@index');

    //Commission Document
    Route::get('/commission-document/add', 'CommissionDocumentController@index');
    Route::get('/commission-document/detail/{id}', 'CommissionDocumentController@index');
    Route::get('/commission-document/get-document-list', 'CommissionDocumentController@getDocumentList');
    Route::get('/commission-document/get-type-list', 'CommissionDocumentController@getTypeList');
    Route::get('/commission-document/add-document', 'CommissionDocumentController@addDocument');
    Route::get('/commission-document/get-detail-document/{id}', 'CommissionDocumentController@getDetailDocument');
    Route::get('/commission-document/update-document', 'CommissionDocumentController@updateDocument');


    //SPA INCLUDE
    include('spaRoutes.php');


    //Commission Config    
    Route::get('/commission-config/add', 'CommissionConfigController@index');
    Route::get('/commission-config/detail/{id}', 'CommissionConfigController@index');

    /**
     * LSO
     */
    // LSO Crawler
    // LSO Crawer list
    Route::any('/lso/crawlers', 'LsoController@crawlers');
    // LSO Crawler tạo mới
    Route::any('/lso/crawler', 'LsoController@createCrawler');
    // LSO Crawler xem/chỉnh sửa
    Route::any('/lso/crawler/{id}', 'LsoController@editCrawler');

    /**
     * TASKS OF BPO LISTING
     */

    Route::get('/bpo-listing', 'BpoListingController@index');
    Route::get('/bpo-zone-listing', 'BpoListingController@bpoZone');

    /*
     * API Upload Image
    */
    Route::post('/listing/api/upload', 'FileUploadController@uploadFile');

    /*
     * API Upload Document
    */
    Route::post('/document/api/upload', 'FileUploadController@uploadDocument');

    // TPA for listing and lead-deal for agent
    Route::group(['middleware' => 'authTPA'], function () {
        Route::get('/lead-deal-by-agent', "LeadDealByAgentController@index");
        Route::get('/listing-by-agent', "ListingByAgentController@index");
    });

    Route::group(['prefix' => 'pos'], function () {
        // Router TPA
        Route::group(['middleware' => 'authTPA'], function () {
            Route::get('/training', "Pos\TrainingController@index");
            Route::get('/members', "Pos\MembersController@index");
        });
        // -- Default router for all --
        Route::any('/{controller?}/{action?}/{params?}', function ($controller = 'index', $action = 'index', $params = NULL) {
            $controller = str_replace(' ', '', ucwords(str_replace('-', ' ', $controller))) . 'Controller';
            $action = lcfirst(str_replace(' ', '', ucwords(str_replace('-', ' ', $action))));
            $objController = \App()->make("\\App\\Http\\Controllers\\Pos\\" . $controller);
            return $objController->callAction($action, empty($params) ? array() : explode('/', $params));
        });
    });


    /// PRICETAG
    Route::group(['prefix' => 'price-tag'], function () {
        Route::post('/tag-listing/add', "PriceTagController@addTagToListing");
        Route::get('/tag-display/list/default', "PriceTagController@getDefaultDisplayTag");
        Route::get('/tag-listing/aggregate-by-listing-ids/{rlistingId}', "PriceTagController@getDisplayTagListing");
        Route::post('/tag-tracking/view-listing', "PriceTagController@postTrackingTagListing");
    });
    /// END PRICETAG


    // Map route
        Route::get("/maps/lat-lng", "MapsController@index");
        Route::get("/maps/lat-lng/{value}", "MapsController@index");
        Route::get("/maps/lat-lng/{value}/{typeMap}", "MapsController@index");
        Route::get("/maps/place", "MapsController@index");
        Route::get("/maps/place/{value}", "MapsController@index");
        Route::get("/maps/plot-number", "MapsController@index");

    // -- Default router for all --
    Route::any('/{controller?}/{action?}/{params?}', function ($controller = 'index', $action = 'index', $params = NULL) {
        $controller = str_replace(' ', '', ucwords(str_replace('-', ' ', $controller))) . 'Controller';
        $action = lcfirst(str_replace(' ', '', ucwords(str_replace('-', ' ', $action))));
        $objController = \App()->make("\\App\\Http\\Controllers\\" . $controller);
        return $objController->callAction($action, empty($params) && $params != 0 ? array() : explode('/', $params));
    })->where('params', '[/]{0,1}[A-Za-z0-9\-\\/]+');
});
