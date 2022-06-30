<aside class="main-sidebar">
    <section class="sidebar">
        <div class="user-panel">
            <div class="pull-left image">
                <img src="{{(Session::get("user")->photo)?Session::get("user")->photo:loadAsset("/dist/img/logo.jpg") }}" class="img-circle" alt="User Image" onerror="this.src='/dist/img/logo.jpg'" />
            </div>
            <div class="pull-left info">
                <p>{{ Session::get("user")->name }}</p>
                <!-- Status -->
                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>
        <div class="tm-border-top"></div>
        <ul class="sidebar-menu">
            <li class="header">Chức năng nhanh</li>
            @php
                $user = $currentUser;
            @endphp
            @foreach($user->entities as $entity)
                @foreach($entity->features as $feature)
                    @if($feature->isDisplay == true && $feature->quickAccess)
                        @if($feature->id == 36)
                            <li class="treeview">
                                <a href="#">
                                    <span>Tạo building</span>
                                    <i class="fa fa-angle-left pull-right"></i>
                                </a>
                                <ul class="treeview-menu" style="display: none;">
                                    <li class="">
                                        <a href="#"><i class="fa"></i> Mua
                                            <i class="fa fa-angle-left pull-right"></i></a>
                                        <ul class="treeview-menu" style="display: none;">
                                            @foreach ($propertyTypeList as $key => $propertyType)
                                            @if (isset($propertyType->hasGroup) && $propertyType->listingType->listingTypeID == 1 && $propertyType->hasGroup)
                                            <li>
                                                <a href="/building/new/<?= $propertyType->listingType->listingTypeID ?>/<?= $propertyType->propertyTypeID ?>/1"><i class="fa fa-cube"></i> <?= $propertyType->typeName ?>
                                                </a>
                                            </li>
                                            @endif
                                            @endforeach
                                        </ul>
                                    </li>
                                    <li class="">
                                        <a href="#"><i class="fa"></i> Thuê <i class="fa fa-angle-left pull-right"></i></a>
                                        <ul class="treeview-menu" style="display: none;">
                                            @foreach ($propertyTypeList as $key => $propertyType)
                                            @if (isset($propertyType->hasGroup) && $propertyType->listingType->listingTypeID == 2 && $propertyType->hasGroup)
                                            <li>
                                                <a href="/building/new/<?= $propertyType->listingType->listingTypeID ?>/<?= $propertyType->propertyTypeID ?>/1"><i class="fa fa-cube"></i> <?= $propertyType->typeName ?>
                                                </a>
                                            </li>
                                            @endif
                                            @endforeach
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        @else
                            <?php
                            $iconMenu = '';
                            switch ($feature->featureName) {
                                case 'Thêm mới Account':
                                    $iconMenu = '<i class="fa fa-2x fa-user-plus" aria-hidden="true"></i>';
                                    break;
                                default:
                                    $iconMenu = '<i class="fa fa-2x fa-dashboard"></i>';
                                    break;
                            }
                            ?>
                            <li class="treeview"><a href="/{{$feature->url}}">{!! $iconMenu !!}<span>{{$feature->featureName}}</span></a></li>
                        @endif
                    @endif
                @endforeach
            @endforeach
            <li class="header">Quản Lý</li>
            @foreach($user->entities as $entity)
                <?php
                if (empty($entity->features)) {
                    continue;
                }
                $iconMenu = '';
                switch ($entity->name) {
                    case 'Meeting':
                        $iconMenu = '<i class="fa fa-2x fa-users" aria-hidden="true"></i>';
                        break;
                    case 'Thu thập dữ liệu':
                        $iconMenu = '<i class="fa fa-2x fa-hand-rock-o" aria-hidden="true"></i>';
                        break;
                    case 'Báo cáo':
                        $iconMenu = '<i class="fa fa-2x fa-flag-o" aria-hidden="true"></i>';
                        break;
                    case 'Lọc dữ liệu':
                        $iconMenu = '<i class="fa fa-2x fa-filter" aria-hidden="true"></i>';
                        break;
                    case 'Tư vấn chủ nhà':
                        $iconMenu = '<i class="fa fa-2x fa-commenting-o" aria-hidden="true"></i>';
                        break;
                    case 'Kiểm tra tin đăng':
                        $iconMenu = '<i class="fa fa-2x fa-eye" aria-hidden="true"></i>';
                        break;
                    case 'Quản lý dịch vụ người bán':
                        $iconMenu = '<i class="fa fa-2x fa-pie-chart" aria-hidden="true"></i>';
                        break;
                    case 'Account':
                        $iconMenu = '<i class="fa fa-2x fa-user-circle" aria-hidden="true"></i>';
                        break;
                    case 'Chỉnh sửa câu hỏi':
                        $iconMenu = '<i class="fa fa-2x fa-question-circle-o" aria-hidden="true"></i>';
                        break;
                    case 'Deal':
                        $iconMenu = '<i class="fa fa-2x fa-th"></i>';
                        break;
                    case 'Request':
                        $iconMenu = '<i class="fa fa-2x fa-th"></i>';
                        break;
                    case 'Lead':
                        $iconMenu = '<i class="fa fa-2x fa-th"></i>';
                        break;
                    case 'Listing mới':
                        $iconMenu = '<i class="fa fa-2x fa-rss" aria-hidden="true"></i>';
                        break;
                    case 'Công Việc':
                        $iconMenu = '<i class="fa fa-2x fa-tasks" aria-hidden="true"></i>';
                        break;
                    case 'Report For Staff':
                        $iconMenu = '<i class="fa fa-2x fa-map-o" aria-hidden="true"></i>';
                        break;
                    default:
                        $iconMenu = '<i class="fa fa-2x fa-angle-double-right" aria-hidden="true"></i>';
                        break;
                }
                ?>
                <li class="treeview">
                    <a href="#">
                        {!! $iconMenu !!}
                        <span> {{$entity->name}}</span>

                        <!--Total commission notification--->
                        @if($entity->id == 77)
                        <span class="commission-deal-notification" id="commission_deal_notification">
                            <commission-notification-element></commission-notification-element>
                        </span>
                        @endif
                        @foreach($entity->features as $feature)
                            @if($feature->isDisplay == true)
                                @if($feature->id != 36)
                                    @if($feature->id == 201)
                                        <span class="commission-deal-notification" id="bpo-notification-all" style="display: none; margin-left: 30px;">
                                            <bpo-notification-element></bpo-notification-element>
                                        </span>
                                    @endif
                                @endif
                            @endif
                        @endforeach
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu menu-open">
                        @foreach($entity->features as $feature)
                            @if($feature->isDisplay == true)
                                @if($feature->id == 36)
                                    <li class="treeview">
                                        <a href="#">
                                            <!--<i class="fa fa-share"></i>--> <span>Tạo building</span>
                                            <i class="fa fa-angle-left pull-right"></i>
                                        </a>
                                        <ul class="treeview-menu" style="display: none;">
                                            <li class="">
                                                <a href="#"><i class="fa"></i> Mua
                                                    <i class="fa fa-angle-left pull-right"></i></a>
                                                <ul class="treeview-menu" style="display: none;">
                                                    @foreach ($propertyTypeList as $key => $propertyType)
                                                    @if (isset($propertyType->hasGroup) && $propertyType->listingType->listingTypeID == 1 && $propertyType->hasGroup) { ?>
                                                    <li>
                                                        <a href="/building/new/<?= $propertyType->listingType->listingTypeID ?>/<?= $propertyType->propertyTypeID ?>/1">
                                                            <i class="fa fa-cube"></i> <?= $propertyType->typeName ?>
                                                        </a>
                                                    </li>
                                                    @endif
                                                    @endforeach
                                                </ul>
                                            </li>
                                            <li class="">
                                                <a href="#"><i class="fa"></i> Thuê
                                                    <i class="fa fa-angle-left pull-right"></i></a>
                                                <ul class="treeview-menu" style="display: none;">
                                                    @foreach ($propertyTypeList as $key => $propertyType)
                                                    @if (isset($propertyType->hasGroup) && $propertyType->listingType->listingTypeID == 2 && $propertyType->hasGroup)
                                                    <li>
                                                        <a href="/building/new/<?= $propertyType->listingType->listingTypeID ?>/<?= $propertyType->propertyTypeID ?>/1"><i class="fa fa-cube"></i> <?= $propertyType->typeName ?>
                                                        </a>
                                                    </li>
                                                    @endif
                                                    @endforeach
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                @else
                                    <li id="{{ $feature->code ? "left_menu_" . $feature->code : ''}}">
                                        <a href="/{{$feature->url}}">
                                            {{$feature->featureName}}
                                            @if($feature->id == 201)
                                                <span class="commission-deal-notification" id="bpo-notification" style="display: none; float: right;">
                                                    <bpo-notification-element></bpo-notification-element>
                                                </span>
                                            @endif
                                            @if($feature->code === 'commission_deal')
                                                <span class="commission-deal-notification" id="commission_deal_notification">
                                                    <commission-notification-element></commission-notification-element>
                                                </span>
                                            @endif
                                        </a>
                                    </li>
                                @endif
                            @endif
                        @endforeach
                    </ul>
                </li>
            @endforeach
        </ul>
        <!-- Sidebar Menu -->

    </section>
    <!-- /.sidebar -->
</aside>


<script src="{{loadAsset("/js/sidebar.js")}}"></script>
<script src="{{loadAsset("/js/bpoNotification.js")}}"></script>