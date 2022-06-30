<div id="modalOwnerHistory" class="modal fade" role="dialog">
    <div class="modal-dialog" style="width: 400px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Lịch sử hoạt động của chủ nhà</h4>
            </div>
            <div class="modal-body">
                <div class="list-owner-history"></div>
                <nav class="text-center paging"></nav>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary btn-close">Đóng</button>
            </div>
        </div>
    </div>
</div>

<style>
.see-td, .see-tt, .see-kv, .see-kvp 
{
    display: inline-block;
    width: 100%;
    position: relative;
    padding-bottom: 10px;
}
.see-left, .see-right 
{
    float: left;
}
.see-left
{
    font-size: 30px;
    padding-right: 10px;
    width: 38px;
}
.see-right span 
{
    display: block;
    font-size: 16px;
}
.see-right {
    width: calc(100% - 38px);
}
.lines
{    
    position: absolute;
    left: 12px;
    top: 30px;
    height: 36px;
}
.see-td .see-left 
{
    color: red;
}
.see-tt .see-left 
{
    color: green;
}
.see-kv .see-left 
{
    color: lightseagreen;
}
.see-kvp .see-left 
{
    color: #e08e0b;
}
.see-td .lines 
{
    border-left: 1px solid red;
}
.see-tt .lines 
{
    border-left: 1px solid green;
}
.see-kv .lines 
{
    border-left: 1px solid lightseagreen;
}
.see-kvp .lines 
{
    border-left: 1px solid #e08e0b;
    height: 56px;
}
.see-right .mess-td, .see-right .mess-tt, .see-right .mess-kv, .see-right .mess-kvp
{
    font-size: 14px;
    font-style: italic;
}
#modalOwnerHistory .modal-footer 
{
    text-align: center;
}
#modalOwnerHistory .pagination-lg>li>a, #modalOwnerHistory .pagination-lg>li>span
{
    padding: 6px 12px;
    font-size: 16px;
    cursor: pointer;
}
</style>

<script>
var ModalOwnerActivities = {
    postData: {rlistingId: null, numberItem: 10, page: 1},
    paging: function (totalPage)
    {
        var obj = this;
        var htmlContent = "";
        htmlContent += "<ul class='pages pagination pagination-lg'>";
        for(var i = 1; i <= totalPage; i++)
        {
            var active = obj.postData.page == i ? "active" : "";
            htmlContent += "<li class='"+active+"'><a data-page='"+i+"' href='javascript:void(0);'>"+i+"</a></li>";
        }
        htmlContent += "</ul>";
        $(".paging").html(htmlContent);
        $(".paging > ul > li > a").unbind("click");
        $(".paging > ul > li > a").on('click', function(e){
            e.preventDefault();
            obj.postData.page = parseInt($(this).attr("data-page"));
            obj.loadDataOwnerHistory(obj.postData);
        });
    },
    renderHtmlContent: function (type, title, date) {
        var htmlContent = "";
        htmlContent += "<div class='see-"+ type +"'>";
        htmlContent += "<div class='see-left'><span class='fa fa-clock-o'></span></div>";
        htmlContent += "<div class='see-right'>";
        htmlContent += "<span>"+ title +"</span>";
        htmlContent += "<span class='mess-"+ type +"'>Ngày " + date + "</span>";
        htmlContent += "</div>";
        htmlContent += "<span class='lines'></span>";
        htmlContent += "</div>";
        return htmlContent;
    },
    loadDataOwnerHistory: function (postData) 
    {
        var obj = this;
        $.ajax({
            url: "/owner-activities/get-tracking-owner-history",
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                var htmlContent = "";
                var lstData = response.data.list;
                for (var i = 0; i < lstData.length; i++) {
                    var dataDate = moment.unix(lstData[i].historyTime / 1000).format("DD/MM/YYYY - HH:mm:ss");
                    /*if (lstData[i].code === "OWNER_VIEW_LISTING") {
                        htmlContent += obj.renderHtmlContent('td', 'Chủ nhà xem tin đăng', dataDate);
                    }
                    if (lstData[i].code === "OWNER_VIEW_NOTIFICATION") {
                        htmlContent += obj.renderHtmlContent('tt', 'Chủ nhà xem tin tức', dataDate);
                    }
                    if (lstData[i].code === "OWNER_VIEW_OTHER_LISTING") {
                        htmlContent += obj.renderHtmlContent('kv', 'Chủ nhà xem tin đăng cùng khu vực', dataDate);
                    }*/
                    if(typeof (ownerActivitesKey) !== "undefined" && ownerActivitesKey(lstData[i].code) !== null) {
                        htmlContent += obj.renderHtmlContent(ownerActivitesKey(lstData[i].code).htmlModal, ownerActivitesKey(lstData[i].code).name, dataDate);
                    }
                }
                $("#modalOwnerHistory .list-owner-history").html(htmlContent);
                obj.paging(response.data.totalPages);
                $("#modalOwnerHistory .list-owner-history div:last-child .lines").remove();
                $("#modalOwnerHistory").modal("show");
            }
        });
    },
    show: function(rlistingId){
        this.postData.rlistingId = rlistingId;
        this.loadDataOwnerHistory(this.postData);
        $(".btn-close").unbind("click");
        $(".btn-close").on("click", function (event) {
            event.preventDefault();
            $("#modalOwnerHistory").modal("hide");
        });
    }
}
</script>