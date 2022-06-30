<!-- <li class="active pull-right"><a onclick="emailListingTableRender()" href="#email_tab_content" data-toggle="tab">Listing đã giới thiệu <span class="badge">{{$countListing['sent_mail']}}</span></a></li> -->
<li class="pull-right"><a onclick="likeListingTableRender()" href="#ganery_tab_content" data-toggle="tab">Bộ sưu tập <span class="badge">{{$countListing['basket']}}</span></a></li>
<li class="pull-right"><a onclick="notLikeListingTableRender();return false;" href="#not_like" data-toggle="tab">Listing đã xóa khỏi BST <span class="badge">{{!empty($countListing['not_basket']) || $countListing['not_basket'] == 0 ?$countListing['not_basket']:"N/A"}}</span></a></li>
@if($type != 'lead')
<li class="pull-right"><a href="#touredTab" data-toggle="tab">Listing đã xem <span class="badge">{{$countListing['scheduled']}}</span></a></li>
@endif
