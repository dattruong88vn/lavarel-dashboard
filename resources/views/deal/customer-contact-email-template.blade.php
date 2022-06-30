<div style="padding: 0 50px; margin: 30px auto">
    <div>
        <p>Gửi Anh / Chị {{$deal->request->customers->name}},</p>
        <p>Thông tin đính kèm là mẫu Hợp đồng {{$deal->request->propertyType->typeName}} được biên soạn từ đội ngũ Luật sư, chuyên gia Bất động sản giàu kinh nghiệm tại Propzy. Mẫu Hợp đồng sẽ giúp anh/chị bảo vệ quyền lợi của mình trong quá trình giao dịch mua - bán bất động sản.</p>        
        <p>Mọi thắc anh/chị vui lòng liên hệ hotline <b>0873066099</b>, Email <b>hi@propzy.com</b> để nhận được tư vấn từ Propzy</p>
        <p>Trân trọng,</p>
    </div>
    <hr />
    <div>
        @include('templates.emailSignature', ['currentUser' => $currentUser])    
    </div>