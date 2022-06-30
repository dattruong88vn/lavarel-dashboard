<div class="form-group">
    <table id="" class="table table-bordered table-striped table-fixed">
        <thead>
        <tr>
            <th width="176px">NGÀY GIỜ</th>
            <th width="152px">TARGET TRƯỚC CHỈNH SỬA</th>
            <th width="146px">TARGET SAU CHỈNH SỬA</th>
            <th width="135px">BỞI AI?</th>
        </tr>
        </thead>
        <tbody id="settingsTargetHistoryBody">
            <?php if (empty($items)): ?>
            <tr>
                <td>Chưa có dữ liệu</td>
            </tr>
            <?php endif; ?>
            <?php foreach ($items as $item): ?>
            <tr>
                <td width="176px"><?= date('d/m/Y H:i:s A', $item->createdDate/1000) ; ?></td>
                <td width="152px"><?= df($item->targetOldValue, '&nbsp;'); ?></td>
                <td width="146px"><?= df($item->targetValue, '&nbsp;'); ?></td>
                <td width="118px"><?= df($item->updatedBy, '&nbsp;'); ?></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>

