<!-- Main Header -->
<header class="main-header">

    <!-- Logo -->
    <a href="/" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini">
            <b>DB</b>
        </span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>DASHBOARD</b></span>
    </a>

    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                @if($currentGroup['departmentId'] != 20)
                <!-- Messages: style can be found in dropdown.less-->
                <!-- Notifications Menu -->
                {{--  <li class="dropdown notifications-menu">
                    <a href="#" class="toggleNotifications">
                        <i class="fa fa-list-ul"></i>
                        <span class="label label-warning hiddenDealNotifyCount">0</span>
                    </a>
                </li>  --}}

                <li class="dropdown notifications-menu ">
                    <!-- Menu toggle button -->
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-globe" style="font-size: 25px;"></i>
                        <span class="label label-danger commonNotifyCount" style="font-size: 15px;"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="header">Thông báo</li>
                        <li>
                            <!-- Inner Menu: contains the notifications -->
                            <ul class="menu commonNotifyList">
                            </ul>
                        </li>
                        <li class="footer"></li>
                    </ul>
                </li>

                {{--  <li class="dropdown notifications-menu">
                    <!-- Menu toggle button -->
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-bell-o"></i>
                        <span class="label label-warning dealNotifyCount">0</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="header">Thông báo</li>
                        <li>
                            <!-- Inner Menu: contains the notifications -->
                            <ul class="menu dealNotifyList">
                            </ul>
                        </li>
                        <li class="footer"></li>
                    </ul>
                </li>

                <li class="dropdown notifications-menu">
                    <!-- Menu toggle button -->
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-check-circle"></i>
                        <span class="label label-warning listingMatchedOrderNotifyCount">0</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="header">Listing phù hợp với order</li>
                        <li>
                            <!-- Inner Menu: contains the notifications -->
                            <ul class="menu listingMatchedOrderNotifyList">
                            </ul>
                        </li>
                        <li class="footer"><a href="/order/get-list">Xem tất cả</a></li>
                    </ul>
                </li>

                <!-- Notifications Menu -->
                <li class="dropdown notifications-menu">
                    <!-- Menu toggle button -->
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-cubes"></i>
                        <span class="label label-warning newAssignedCreateListingCount">0</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="header">Bạn được assign <span class="newAssignedCreateListingCount">0</span> listing
                        </li>
                        <li>
                            <!-- Inner Menu: contains the notifications -->
                            <ul class="menu assignedNotificationListCreate">
                            </ul>
                        </li>
                        <li class="footer"><a href="/listing/assigned">Xem tất cả</a></li>
                    </ul>
                </li>

                <!-- Notifications Menu -->
                <li class="dropdown notifications-menu">
                    <!-- Menu toggle button -->
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-cube"></i>
                        <span class="label label-warning newAssignedListingCount">0</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="header">Bạn được assign <span class="newAssignedListingCount">0</span> listing</li>
                        <li>
                            <!-- Inner Menu: contains the notifications -->
                            <ul class="menu assignedNotificationList">
                            </ul>
                        </li>
                        <li class="footer"><a href="/pos/prescreener">Xem tất cả</a></li>
                    </ul>
                </li>  --}}

                @endif
                <!-- User Account Menu -->
                <li class="dropdown user user-menu">
                    <!-- Menu Toggle Button -->
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <!-- The user image in the navbar--><img
                                src="{{(Session::get("user")->photo)?Session::get("user")->photo:loadAsset("/dist/img/logo.jpg") }}"
                                class="img-circle" alt="User Image" style="width:24px; height: 24px" onerror="this.src='/dist/img/logo.jpg'"/>
                        <!-- hidden-xs hides the username on small devices so only the image appears. -->
                        &nbsp; <span class="hidden-xs">{{ str_limit(Session::get("user")->name, 7) }}</span>
                    </a>
                    <ul class="dropdown-menu">
                        <!-- The user image in the menu -->
                        <li class="user-header"><img
                                    src="{{(Session::get("user")->photo)?Session::get("user")->photo:loadAsset("/dist/img/logo.jpg") }}"
                                    class="img-circle" alt="User Image" onerror="this.src='/dist/img/logo.jpg'"/>
                            <p>
                                {{ Session::get("user")->name }}
                                <small>--</small>
                            </p>
                        </li>
                        <li class="user-footer">
                            <div style="padding: 0px" class="col-md-6"><a href="/user/profile" class="btn btn-default btn-block btn-flat">Tài khoản</a></div>
                            <div style="padding: 0px" class="col-md-6"><a href="/logout" class="btn btn-default btn-block btn-flat">Đăng xuất</a></div>
                            <!-- <div class="pull-left">
                                
                            </div>
                            <div class="pull-right">
                                
                            </div> -->
                        </li>
                        <!-- Menu Footer-->
                        <!-- <li class="user-footer">
                            <div class="">
                                <a href="/logout" class="btn btn-default btn-flat">Sign out</a>
                            </div>
                        </li> -->
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</header>
<div class="message-panel" style="position:fixed;bottom:16px;right: 16px;z-index: 50000;padding:0px 16px;">
    <div class="assignedNotification alert alert-danger" style="position:relative;display:none;">
        <div class="message"></div>
        <a href="#" style="position:absolute;right:2px;top:2px;" class="close-notification"><i class="fa fa-remove"></i></a>
    </div>
    <div class="assignedNotificationCreate alert alert-danger" style="position:relative;display:none;">
        <div class="message"></div>
        <a href="#" style="position:absolute;right:2px;top:2px;" class="close-notification"><i class="fa fa-remove"></i></a>
    </div>
</div>

<script>
    var departmentId = parseInt("{{$currentGroup['departmentId']}}");
    var agentSiteUrl = "{{AGENT_SITE_URL}}";
    var isShowModalTaskDetail = {{isset($isShowModalTaskDetail)?$isShowModalTaskDetail:true}};
</script>