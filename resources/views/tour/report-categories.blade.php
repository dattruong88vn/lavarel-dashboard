<?php

function renderDefaultContent($categoryId) {
    ?>
    <table id="dataTableContent{{$categoryId}}" class="table table-bordered data-table-{{$categoryId}} tableCategory dataTable{{$categoryId}}" data-table-name = "dataTable{{$categoryId}}">
        <thead>
            <tr>
                <th>Ngày bắt đầu đi xem</th>
                <th>Deal Id</th>
                <th>Số listing đi xem</th>
                <th>Tên CS</th>
                <th>Tên TM tham gia</th>
                <th>Tên CRM tham gia</th>
                <th>Tên / SĐT KH</th>
                <th>Giờ đi xem</th>
                <th>Ghi chú</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    <?php
}

function renderTourDeal($categoryId) {
    ?>
    <table id="dataTableContent{{$categoryId}}" class="table table-bordered data-table-{{$categoryId}} tableCategory dataTable{{$categoryId}}" data-table-name = "dataTable{{$categoryId}}">
        <thead>
            <tr>
                <th>Deal Id</th>
                <th>Số tour/deal</th>
                <th>Tên TM tham gia</th>
                <th>Tên CRM tham gia</th>
                <th>Tên / SĐT KH</th>
                <th>Giờ đi xem</th>
                <th>Ghi chú</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    <?php
}

function renderCanceledTours($categoryId) {
    ?>
    <div class="row">
        <div class="col-sm-4">
            <table id="canceledToursSummary" class="table table-bordered">
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    <table id="dataTableContent{{$categoryId}}" class="table table-bordered data-table-{{$categoryId}} tableCategory dataTable{{$categoryId}}" data-table-name = "dataTable{{$categoryId}}">
        <thead>
            <tr>
                <th>Ngày bắt đầu đi xem</th>
                <th>Deal Id</th>
                <th>Lý do cancel</th>
                <th>Số listing đi xem</th>
                <th>Tên CS</th>
                <th>Tên TM tham gia</th>
                <th>Tên CRM tham gia</th>
                <th>Tên / SĐT KH</th>
                <th>Giờ đi xem</th>
                <th>Ghi chú</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    <?php
}

function renderLateTours($categoryId) {
    ?>
    <table id="dataTableContent{{$categoryId}}" class="table table-bordered data-table-{{$categoryId}} tableCategory dataTable{{$categoryId}}" data-table-name = "dataTable{{$categoryId}}">
        <thead>
            <tr>
                <th>Ngày bắt đầu đi xem</th>
                <th>Deal Id</th>
                <th>Số listing đi xem</th>
                <th>Thời gian trễ trung bình từng tour</th>
                <th>Tên CS</th>
                <th>Tên TM tham gia</th>
                <th>Tên CRM tham gia</th>
                <th>Tên / SĐT KH</th>
                <th>Giờ đi xem</th>
                <th>Ghi chú</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    <?php
}

function renderSpecialContent($categoryId) {
    switch ($categoryId) {
        case 5:
            renderTourDeal($categoryId);
            break;
        case 6:
            renderCanceledTours($categoryId);
            break;
        case 7:
            renderLateTours($categoryId);
            break;
        default :
            break;
    }
}
?>

<div>
    <?php foreach ($data as $category): ?>
        <a href="#" onclick="return showCategoryContent(this, {{$category->id}});" class="btn btn-warning btn-show-content" style="margin-bottom: 6px">
            <span>{{$category->name}}: {{$category->value}}</span>
            <?php if ($category->timeAvg): ?>
                <span style="margin-left: 32px;">Thời gian trễ trung bình: {{$category->timeAvg}} phút</span>
            <?php endif; ?>
        </a>
    <?php endforeach; ?>
</div>
<?php foreach ($data as $category): ?>
    <div class="box box-primary hidden category-content category-content-{{$category->id}}">
        <div class="box-body">
            <?php
            if (in_array($category->id, $specialViewIds)) {
                renderSpecialContent($category->id);
            } else {
                renderDefaultContent($category->id);
            }
            ?>
        </div>
    </div>
<?php endforeach; ?>

<div id="modalHistories" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body">
                <table id="tableHistories" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Ngày</th>
                            <th>Tên CS</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>

    </div>
</div>
