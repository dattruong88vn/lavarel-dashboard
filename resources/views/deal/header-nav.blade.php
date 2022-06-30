<nav class="nav-lead img-function">
    <ul class="nav text-center">
        <li class="col-sm-1-8 link-detail">
            <a href="/deal/detail/{{$deal->dealId}}">
                <i class="fa fa-usd fa-2x"></i>
                <!-- <img src="/images/icon-deal-lead.png" /> -->
                <p>Deal</p>
            </a>
        </li>
        <?php //if (!empty($deal->orderId)): ?>
            <li class="col-sm-1-8 link-order hidden">
                <a href="/deal/order/{{$deal->dealId}}">
                    <i class="fa fa-ticket fa-2x"></i>
                    <!-- <img src="/images/icon-order.png" /> -->
                    <p>Order</p>
                </a>
            </li>
        <?php //endif; ?>
        <li class="col-sm-1-8 link-events hidden">
            <a href="/deal/events/{{$deal->dealId}}">
                <i class="fa fa-list fa-2x"></i>
                <!-- <img src="/images/icon-events.png" /> -->
                <p>Sự kiện</p>
            </a>
        </li>
        <li class="col-sm-1-8 link-chat hidden">
            <a href="/deal/chat/{{$deal->dealId}}">
                <i class="fa fa-comments fa-2x"></i>
                <!-- <img src="/images/icon-chat-page.png" /> -->
                <p>Chat</p>
            </a>
        </li>
        <li class="col-sm-1-8 link-history">
            <a href="/deal-history/requests/{{$deal->leadId}}/{{$deal->dealId}}">
                <i class="fa fa-history fa-2x"></i>
                <!-- <img src="/images/icon-history.png" /> -->
                <p>Lịch sử</p>
            </a>
        </li>
        <li class="col-sm-1-8 link-product hidden">
            <a href="/deal/product/{{$deal->dealId}}">
                <i class="fa fa-th-large fa-2x"></i>
                <!-- <img src="/images/icon-product.png" /> -->
                <p>Sản phẩm</p>
            </a>
        </li>
        <li class="col-sm-1-8 link-feedbacks hidden">
            <a href="/deal/feed-backs/{{$deal->dealId}}">
                <i class="fa fa-comments-o fa-2x"></i>
                <!-- <img src="/images/icon-chat-page.png" /> -->
                <p>Phản hồi</p>
            </a>
        </li>
        <li class="col-sm-1-8 link-tour hidden">
            <a href="/deal/tour/{{$deal->dealId}}">
                <i class="fa fa-map-marker fa-2x"></i>
                <!-- <img src="/images/icon-tour.png" /> -->
                <p>Tour</p>
            </a>
        </li>
    </ul>
</nav>
<script>
    $(".link-{{$currentActivePage}} a").addClass('active');
</script>
<style>
    .col-sm-1-7{
        float:left;
        width:14%;
    }
    .col-sm-1-8{
        float:left;
        width:12%;
    }
</style>