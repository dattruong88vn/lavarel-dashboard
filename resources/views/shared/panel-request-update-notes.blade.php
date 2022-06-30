<section id="request-update-notes">
    <div class="box box-primary">
        <div class="box-header">
            <h4>Notes</h4>
        </div>
        <div class="box-body">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th style="width:200px;">Ngày</th>
                        <th>Nội dung</th>
                        <th style="width:200px;">Người tạo</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($requestUpdateNotes as $noteItem): ?>
                        <tr>
                            <td>{{date('d/m/y H:i:s',$noteItem->createdDate/1000)}}</td>
                            <td>{{$noteItem->note}}</td>
                            <td>{{$noteItem->userName}}</td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</section>