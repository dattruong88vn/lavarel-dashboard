<table id="" class="table table-bordered table-striped">
    <thead>
    <tr>
        <th>NGÀY GIỜ</th>
        <th>% TRƯỚC CHỈNH SỬA</th>
        <th>% SAU CHỈNH SỬA</th>
        <th>BỞI AI?</th>
    </tr>
    </thead>
    <tbody>

        <?php if (empty($items)): ?>
        <tr>
            <td colspan="4">Chưa có dữ liệu</td>
        </tr>
        <?php endif; ?>
        <?php foreach ($items as $item): ?>
        <tr>
            <td><?= date('d/m/Y H:i:s A', $item->createdDate/1000) ; ?></td>
            <td><?= $item->targetOldValue; ?></td>
            <td><?= $item->targetValue; ?></td>
            <td><?= $item->updatedBy; ?></td>
        </tr>
        <?php endforeach; ?>

    </tbody>
</table>