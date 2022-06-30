<div style="padding: 0 50px; margin: 30px auto">
    <h4>Chào {{$leadDeal->customers->name}},</h4>
    <p>Propzy đã nhận được thông tin của quý khách. Trong vòng 2 giờ, chuyên viên hỗ trợ khách hàng sẽ liên hệ với quý khách thông qua thông tin đã đăng ký</p>
    <ul>
        <li><label>Họ và tên</label>: {{$leadDeal->customers->name}}</li>
        <li><label>Email</label>: {{$leadDeal->customers->email}}</li>
        <li><label>Điện thoại</label>: {{$leadDeal->customers->phone}}</li>
        <li>
            <label>Nhu cầu</label>: <br />
            - {{$leadDeal->propertyType->typeName}}
        </li>
    </ul>
    <p>
        Quý khách cần hỗ trợ thêm vui lòng liên hệ hotline: <b>(028)73 066 099</b><br />
        Cảm ơn quá khách đã quan tâm và sử dụng dịch vụ!<br />
        Trân trọng,
    </p>
    <hr />
    <div>
        @include('templates.emailSignature', ['currentUser' => $currentUser])
    </div>
</div>