<div class="db-tm-item deal-tm-rating-tests-1">
    <div class="row">
        <div class="col-md-12">                
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title customerName">Châu Trang</h3>
                </div>
                <div class="box-body">
                    <ul class="nav nav-tabs">
                        <?php
                        $index = 1;
                        foreach ($data as $item):
                            ?>
                            <li><a href="#tab_customer_{{$index}}" data-toggle="tab">{{date('d/m/Y',$item->date/1000)}}</a></li>
                            <?php
                            $index++;
                        endforeach;
                        ?>
                    </ul>
                    <div class="tab-content">
                        <?php
                        $index = 1;
                        foreach ($data as $item):
                            ?>
                            <div class="tab-pane" id="tab_customer_{{$index}}">
                                <table class="table table-bordered">
                                    <tr>
                                        <th>Mục đích mua nhà</th>
                                        <th>Thời gian dự định mua</th>
                                        <th>Mua cho</th>
                                        <th>Nguồn hỗ trợ ngân sách</th>
                                        <th>Mức độ yêu cầu của KH</th>
                                        <th>Khả năng đáp ứng thị trường</th>
                                        <th>Điểm</th>
                                    </tr>
                                    <?php foreach($item->list as $detail): ?>
                                    <tr>
                                        <td>{{$detail->purposeName}}</td>
                                        <td>{{$detail->planBuyName}}</td>
                                        <td>{{$detail->forWhomName}}</td>
                                        <td>{{$detail->financingName}}</td>
                                        <td>{{$detail->levelRequirementName}}</td>
                                        <td>{{$detail->responsivenessName}}</td>
                                        <td>{{$detail->totalPointValue}}</td>
                                        <td>{{date('H:m:s',$detail->createdDate/1000)}}</td>
                                    </tr>
                                    <?php endforeach; ?>
                                </table>
                            </div>
                            <?php
                            $index++;
                        endforeach;
                        ?>
                    </div>
                </div>                        
            </div>
        </div>
    </div>
</div>
<script>
    $(".nav-tabs li:first-child").addClass("active");
    $("#tab_customer_1").addClass("active");
</script>