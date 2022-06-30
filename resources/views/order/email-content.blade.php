<?php
$propertyTypeName = $items[0]->propertyTypeName;
?>
<div style="padding: 0 50px; margin: 30px auto">
    <div>
        <p>Chào {{$customer->name}},</p>
        <p>Em là {{$currentUser->name}} đến từ công ty Propzy Việt Nam. Hiện trên Propzy.vn có một số {{$propertyTypeName}} đúng với nhu cầu tìm kiếm của anh/chị.</p>
        <p>Thông tin tin đăng:</p>
        <ol style="padding-top: 10px; padding-bottom:10px;">
            <?php
            $propertyTypeName = "";
            for ($index = 0; $index < count($items); $index++):
                $listing = $items[$index];
                ?>
                <li style="padding: 5px 0 5px 10px"> {{$listing->title}}, 

                    <?php if (isset($listing->numberFloor)) { ?>
                        <?php
                        if ($listing->propertyTypeId == 11) {
                            if ($listing->numberFloor === 1) {
                                echo 'Trệt';
                            } elseif ($listing->numberFloor > 1) {
                                $numberFloor = $listing->numberFloor;
                                echo '1 trệt';
                                if ($listing->isMezzanine) {
                                    echo ", " . '1 lửng';
                                    $numberFloor -= 1;
                                }
                                if ($listing->isPenhouse) {
                                    echo ", " . '1 áp mái';
                                    $numberFloor -= 1;
                                }
                                if ($listing->isRooftop) {
                                    echo ", " . '1 tầng thượng';
                                    $numberFloor -= 1;
                                }
                                if ($numberFloor - 1 != 0) {
                                    echo " + " . ($numberFloor - 1);
                                    if ($listing->numberFloor > 2)
                                        echo " " . 'lầu';
                                    else
                                        echo " " . 'lầu';
                                }
                            }
                        }
                        else {
                            if ($listing->numberFloor === 0) {
                                
                            } elseif ($listing->numberFloor === -9) {
                                
                            } else {
                                echo $listing->numberFloor;
                            }
                            echo " " . 'lầu';
                        }
                        ?>
                    <?php } ?>

                    , diện tích sử dụng {{$listing->formatSize}}, giá {{$listing->formatPrice}} </li>
            <?php endfor; ?>
        </ol>
        <p>Hiện nay các {{$propertyTypeName}} bên em nhận đươc rất nhiều sự quan tâm từ khách hàng, nên anh/chị vui lòng sắp xếp thời gian sớm để không bỏ lỡ cơ hội này và có thể mua được căn nhà ưng ý nhất. (Nhân viên bên em sẽ dẫn anh/chị đi xem nhà hoàn toàn miễn phí)</p>
        <p>Ngoài ra với mức giá mà anh chị mong muốn thì ở các khu vực lân cận với nơi anh/chị yêu cầu bên em cũng có rất nhiều {{$propertyTypeName}} phù hợp và được cập nhật lien tục, nếu anh/chị có yêu cầu gì thêm, đừng ngần ngại hãy liên hệ với Propzy.</p>
        <p>Anh/chị tham khảo các căn trên, sau đó có thể liên hệ lại Propzy bằng mail hoặc số điện thoại trên email em nhé.</p>
        <p>Em cảm ơn!</p>
    </div>
    <hr />
    <div>
        @include('templates.emailSignature', ['currentUser' => $currentUser])
    </div>
</div>