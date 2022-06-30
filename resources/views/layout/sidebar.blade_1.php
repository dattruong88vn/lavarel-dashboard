    <!-- Left side column. contains the sidebar -->
<aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

        <!-- Sidebar user panel (optional) -->
        <div class="user-panel">
            <div class="pull-left image">
                <img src="{{loadAsset("/dist/img/user2-160x160.jpg") }}" class="img-circle" alt="User Image" onerror="this.src='/dist/img/logo.jpg'"/>
            </div>
            <div class="pull-left info">
                <p>{{ Session::get("user")->name }}</p>
                <!-- Status -->
                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>

        <!-- search form (Optional) -->
        <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
                <input type="text" name="q" class="form-control" placeholder="Search..."/>
                <span class="input-group-btn">
                  <button type='submit' name='search' id='search-btn' class="btn btn-flat"><i class="fa fa-search"></i></button>
                </span>
            </div>
        </form>
        <!-- /.search form -->
        <ul class="sidebar-menu">
            <li class="header">CHỨC NĂNG NHANH</li>         
            @foreach (Session::get("user")->userRoles as $role) 
                @if ( $role->isDisplay && $role->quickAccess)
                    @if( $role -> id === 36) 
                    <li class="treeview active">
                      <a href="#">
                        <!--<i class="fa fa-share"></i>--> <span>Tạo building</span>
                        <i class="fa fa-angle-left pull-right"></i>
                      </a>
                      <ul class="treeview-menu" style="display: none;">
                        <li class="">
                          <a href="#"><i class="fa"></i> Mua <i class="fa fa-angle-left pull-right"></i></a>
                          <ul class="treeview-menu" style="display: none;">
                           <?php foreach ($propertyTypeList as $key => $propertyType): ?>
                            <?php if(isset($propertyType->hasGroup) && $propertyType->listingType->listingTypeID == 1 && $propertyType->hasGroup) { ?>
                                    <li><a href="/building/new/<?=$propertyType->listingType->listingTypeID?>/<?=$propertyType->propertyTypeID?>/1"><i class="fa fa-cube"></i> <?=$propertyType->typeName?></a></li>
                                <?php } ?> 
                            <?php endforeach ?>
                          </ul>
                        </li>
                        <li class="">
                          <a href="#"><i class="fa"></i> Thuê <i class="fa fa-angle-left pull-right"></i></a>
                          <ul class="treeview-menu" style="display: none;">
                            <?php foreach ($propertyTypeList as $key => $propertyType): ?>
                                <?php if(isset($propertyType->hasGroup) && $propertyType->listingType->listingTypeID == 2 && $propertyType->hasGroup) { ?>
                                    <li><a href="/building/new/<?=$propertyType->listingType->listingTypeID?>/<?=$propertyType->propertyTypeID?>/1"><i class="fa fa-cube"></i> <?=$propertyType->typeName?></a></li>
                                <?php } ?>
                            <?php endforeach ?>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    @else
                    <li><a id="role{{  $role->id }}" href="/{{  $role->url }}"><span>{{  $role->role }}</span></a></li>
                    @endif
                @endif
            @endforeach
            <li class="header">QUẢN LÝ</li>
            @foreach (Session::get("user")->userRoles as $role) 
                @if ( $role-> isDisplay &&  !$role-> quickAccess)
                    <li><a id="role{{  $role->id }}" href="/{{  $role->url }}"><span>{{  $role->role }}</span></a></li>
                @endif
            @endforeach
            <?php if (isset($currentGroup) && $currentGroup['id'] == 1) { ?>
              <li><a href="/task">Việc cần làm</a></li>
              <li class="header">Cấu hình</li>
              <li><a href="/config-dashboard" >Cấu hình dashboard</a></li>
            <?php } ?>
              
              <!-- menu tạm thời để development -->
              <li class='header'>MOCK UP</li>
              <li><a href="/lead/create">Form lead của TM</a></li>
              <li><a href="/lead/get-list">ALL LEADS</a></li>
              <li><a href="/deal/create">Form deal của TM</a></li>
              <li><a href="/invoice/create">Form invoice của TM</a></li>
              <li><a href="/request/create">Form tạo request...</a></li>
              <li><a href="/listing/check-availability">Check Availability</a></li>
              <li><a href="/contact/add">Form add contact</a></li>
              <li><a href="/admin-report">Reports Admin page</a></li>
              
              <li class='header'>MOCK UP REPORTS</li>
              <li><a href="/report/agent-listing-overview">Table 1</a></li>
              <li><a href="/report/agent-activities">Table 2</a></li>
              <li><a href="/report/agent-listing-search">Table 2 -> 1</a></li>
              <li><a href="/report/agent-booking-count">Table 2 -> 2</a></li>
              <li><a href="/report/agent-count-overview">Table 3</a></li>
              <li><a href="/report/ls-listing-overview">Table 4</a></li>
              <li><a href="/report/listing-status-overview">Table 5</a></li>
              <li><a href="/report/problem-and-recommented">Table 5 -> 1</a></li>
              <li><a href="/report/closed-deals">Closed Deals</a></li>
              
        </ul>
        <!-- Sidebar Menu -->
        
    </section>
    <!-- /.sidebar -->
</aside>