<div style="padding: 0 50px; margin: 30px auto">
    <div>
        <p>Chào {{$leadDeal->customers->name}},</p>
        <p>Propzy đã nhận được nhu cầu {{$leadDeal->listingType->typeName}} {{$leadDeal->propertyType->typeName}} của bạn và đang tiến hành tìm kiếm, đánh giá sản phẩm phù hợp. Propzy sẽ gọi điện và trao đổi trực tiếp với bạn trong vòng 3 ngày tới để cập nhật thông tin.</p>
        <p>
            Mọi thắc mắc vui lòng liên hệ Hotline: 0873 066 099 hoặc email: hi@propzy.com
        </p>
        <p>
            Trong thời gian chờ đợi, bạn vẫn có thể chủ động truy cập Propzy.vn để tham khảo hơn 50+ bất động sản mới mỗi ngày và đặt lịch xem với Propzy.
        </p>
        <p>Trân trọng!</p>
    </div>
    <hr />
    <div>
        @include('templates.emailSignature', ['currentUser' => $currentUser])
    </div>
</div>