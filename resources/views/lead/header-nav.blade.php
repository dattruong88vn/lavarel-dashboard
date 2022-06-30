<nav class="nav-lead img-function">
    <ul class="nav text-center">
        <li class="col-sm-2 link-detail"><a href="/lead/detail/{{$lead->leadId}}">
            <i class="fa fa-usd fa-2x"></i>
            <!-- <img src="/images/icon-deal-lead.png" /> -->
            <p>Lead</p></a></li>
        <?php if (!empty($lead->orderId)): ?>
            <li class="col-sm-2 link-order hidden"><a href="/lead/order/{{$lead->leadId}}">
                <i class="fa fa-ticket fa-2x"></i>
                <!-- <img src="/images/icon-order.png" /> -->
                <p>Order</p></a></li>
        <?php endif; ?>
        <li class="col-sm-2 link-events hidden"><a href="/lead/events/{{$lead->leadId}}">
            <i class="fa fa-list fa-2x"></i>
            <!-- <img src="/images/icon-events.png" /> -->
            <p>Sự kiện</p></a></li>
        <li class="col-sm-2 link-chat hidden"><a href="/lead/chat/{{$lead->leadId}}">
            <!-- <img src="/images/icon-chat-page.png" /> -->
            <i class="fa fa-comments fa-2x"></i>
            <p>Chat</p></a></li>
        <li class="col-sm-2 link-history"><a href="/lead-history/requests/{{$lead->leadId}}">
            <i class="fa fa-history fa-2x"></i>
            <!-- <img src="/images/icon-history.png" /> -->
            <p>Lịch sử</p></a></li>
        <li class="col-sm-2 link-product hidden"><a href="/lead/product/{{$lead->leadId}}">
            <i class="fa fa-th-large fa-2x"></i>
            <!-- <img src="/images/icon-product.png" /> -->
            <p>Sản phẩm</p></a></li>
    </ul>
</nav>
<script>
    $(".link-{{$currentActivePage}} a").addClass('active');
</script>