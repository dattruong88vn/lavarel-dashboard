<li class="header">CHỨC NĂNG REQUEST</li>
<li><a href="/listing-service/quan-ly-listing"><span> Quản lý Listing </span></a></li>

<li class="header">CHỨC NĂNG</li>
<!-- Optionally, you can add icons to the links -->
<li><a href="/create-account"><span>Tạo account</span></a></li>
<li class="treeview">
  <a href="#">
    <i class="fa fa-share"></i> <span>Project</span>
    <i class="fa fa-angle-left pull-right"></i>
  </a>
    <ul class="treeview-menu" style="display: none;">
        <li class="">
            <a href="/project"><span>Danh sách</span></a>
        </li>
        <li class="">
            <a href="/project-create"><span>Tạo project</span></a>
        </li>
    </ul>
</li>

<li class="treeview">
  <a href="#">
    <i class="fa fa-share"></i> <span>Developer</span>
    <i class="fa fa-angle-left pull-right"></i>
  </a>
    <ul class="treeview-menu" style="display: none;">
        <li class="">
            <a href="/developer"><span>Danh sách</span></a>
        </li>
        <li class="">
            <a href="/developer-create"><span>Tạo mới</span></a>
        </li>
    </ul>
</li>
<li class="treeview">
  <a href="#">
    <i class="fa fa-share"></i> <span>Brokerage firm</span>
    <i class="fa fa-angle-left pull-right"></i>
  </a>
    <ul class="treeview-menu" style="display: none;">
        <li class="">
            <a href="/brokerage-firm"><span>Danh sách</span></a>
        </li>
        <li class="">
            <a href="/brokerage-firm-create"><span>Tạo mới</span></a>
        </li>
    </ul>
</li>
<li><a href="/listing/new"><span>Tạo listing</span></a></li>
<li class="treeview active">
  <a href="#">
    <i class="fa fa-share"></i> <span>Tạo building</span>
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
<li class="header">QUẢN LÝ</li>
<li><a href="/staff"><span>Staff</span></a></li>
<li><a href="/listing"><span>Listing</span></a></li>
<li><a href="/building"><span>Building</span></a></li>
<li><a href="/draft"><span>Draft</span></a></li>
<li><a href="/brokerage-firm"><span> Quản lý Brokerage Firm</span></a></li>
