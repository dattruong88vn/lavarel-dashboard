<div class="modal-body">        
    <input type="hidden" class="hidden-total-result" value="{{!empty($customers)?count($customers):0}}" />
    <?php if (!empty($customers) && count($customers) > 0): ?>
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Tên</th>
                    <th>Trạng thái</th>
                    <th>Loại giao dịch</th>
                    <th>Nhóm BĐS</th>
                    <th>Loại BĐS</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($customers as $customer): ?>
                    <tr>
                        <td>{{$customer->id}}</td>
                        <td>{{$customer->statusName}}</td>
                        <td>{{$customer->listingTypeName}}</td>
                        <td>{{$customer->propertyTypeGroupName}}</td>
                        <td>{{$customer->propertyTypeName}}</td>
                    </tr>
                    <?php
                endforeach;
                ?>

            </tbody>
        </table>
        <?php
    endif;
    ?>
</div>
