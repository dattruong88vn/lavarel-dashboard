<section id="section-notes">
    <form method="post" action="" id="form-request-update">
        <div class="box box-primary">
            <div class="box-header">
                <h2>Ghi chú</h2>
            </div>
            <div class="box-body">
                <textarea class="notes form-control" rows="6" ></textarea>
            </div>
            <div class="box-footer">
                <button class="btn btn-success btnSaveNote">Yêu cầu update {{$lead->dealId?"deal":"lead"}}</button>
            </div>
        </div>
    </form>
</section>