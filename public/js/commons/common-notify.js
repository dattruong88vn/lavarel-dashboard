function commonNotifyTimer() {
    let _this = this;

    _this.init = function () {
        initNotify();
    };

    async function initNotify() {
        // console.log("stop"); return false;
        let notiCountElm = $('.notifications-menu .commonNotifyCount');
        let notiListElm = $('.notifications-menu .commonNotifyList');
        let li = "";
        let notifyData = null;
        let countNotify = null;
        let tableTimeCounter = null;
        notiListElm.html('');
        
        promise = await axios.get('/time-counter/get-notify-time-counter', {
            params: {}
        }).then(response => {
            notifyData = response.data.data;
        }).catch(err => {
        });

        for (let i = 0; i < notifyData.length ; i++) {
            if (notifyData[i].totalId !== 0) {
                countNotify = countNotify + 1;

                li += `
                <li><a data-notis='${JSON.stringify(notifyData[i].list)}' data-types='${notifyData[i].type}' data-code='${notifyData[i].code}'> ${notifyData[i].message} </a></li>`;
            }
        }
        notiListElm.html(li);
        notiCountElm.html(countNotify);

        // check remove pointer 
        var anchors = document.querySelectorAll('.notifications-menu .commonNotifyList li a');
        Array.prototype.forEach.call(anchors, function (element, index) {
            if (element.getAttribute('data-code') === 'SELLER_ADVISER_UPDATE_GUARANTEED') {
                element.style.cursor = 'default';
            }
        });

        $('.notifications-menu .commonNotifyList li a').on('click', function (data) {
            var dataStuff = $(this).attr('data-notis');
            var dataTypes = $(this).attr('data-types');
            var dataCode = $(this).attr('data-code');
            dataStuff = JSON.parse(dataStuff);
            
            var arrSaleCodes = [
                "TIME_COUNTER_ASSISTANT_STAFF",
                "TIME_COUNTER_ASSISTANT_LEADER",
                "TIME_COUNTER_ASSISTANT_ASM",
                "TIME_COUNTER_ASSISTANT_MANAGER",
                "TIME_COUNTER_SELLER_STAFF",
                "TIME_COUNTER_SELLER_LEADER",
                "TIME_COUNTER_SELLER_ASM",
                "TIME_COUNTER_SELLER_MANAGER"
            ];
            var arrAssCode = [
                "TIME_COUNTER_ASSISTANT_STAFF",
                "TIME_COUNTER_ASSISTANT_LEADER",
                "TIME_COUNTER_ASSISTANT_ASM",
                "TIME_COUNTER_ASSISTANT_MANAGER"
            ];
            var arrBsaCode = [
                "TIME_COUNTER_SELLER_STAFF",
                "TIME_COUNTER_SELLER_LEADER",
                "TIME_COUNTER_SELLER_ASM",
                "TIME_COUNTER_SELLER_MANAGER"
            ];
            var arrSpecialListingExpiredCode = [
                "SELLER_ADVISER_UPDATE_GUARANTEED",
                "POS_MANAGER_UPDATE_GUARANTEED",
            ];
            if(arrSaleCodes.includes(dataCode)){
                // warning of sale side
                if (dataStuff.length > 0 ) {
                    $('#modalInfoCommonNotiSale').modal();
                    $('#modalInfoCommonNotiSale').on('shown.bs.modal', function (e) {
                        if (tableTimeCounter !== null) {
                            tableTimeCounter.destroy();
                        }
                        tableTimeCounter = $("#tableInfoNotifyTimeCounterSale").DataTable({
                            "paging": true,
                            "searching": false,
                            "ordering": false,
                            "lengthChange": false,
                            "pageLength": 5,
                            "bInfo": false,
                            "pagingType": "simple",
                            "data": dataStuff,
                            "language":{
                                "paginate": {
                                    previous: "Trước",
                                    next: "Tiếp"
                                },
                                "info": "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục"
                            },
                            "drawCallback": function () {
                                $('.view_more_detail').showMore({
                                  minheight: 80,
                                  buttontxtmore: "xem thêm <i class='fa fa-angle-down' ></i>",
                                  buttontxtless: "thu gọn <i class='fa fa-angle-up' ></i>",
                                });
                            },
                            "columns": [
                                {"data": "ids", orderable: false, render: function (data, type, object) {
                                    let render = 'N/A';
                                    if(object.details && object.details.length > 0) {
                                        render =  object.details.length;
                                    }
                                    return `<span class="num-count">${render}</span>`;
                                }},
                                {"data": "name", orderable: false},
                                {"data": "groupName", orderable: false, render: function (data, type, object) {
                                    if(data) {
                                        return data;
                                    }
                                    return 'N/A';
                                }},
                                {"data": "details", orderable: false, render: function (data, type, object) {
                                    let render = 'N/A';
                                    if(data && data.length > 0) {
                                        if(arrAssCode.includes(dataCode)) {
                                            // assistant
                                            if(dataCode != 'TIME_COUNTER_ASSISTANT_LEADER' && dataCode != 'TIME_COUNTER_ASSISTANT_ASM') {
                                                render =  data.map(item => {
                                                    return `<a onClick="openDetail(this, '${'/pos/prescreener/detail/' + item.id}'); return false;" style="display: inline-block;text-decoration: underline;" href="javascrip:;"><span>${item.id}</span> (<small>${moment.unix(item.createdDate / 1000).locale('vi').fromNow()}</small>)</a>`;
                                                });
                                            } else {
                                                render =  data.map(item => {
                                                    return `<div style="display: inline-block;"><span>${item.id}</span> (<small>${moment.unix(item.createdDate / 1000).locale('vi').fromNow()  }</small>)</div>`;
                                                });
                                            }
                                        } else if(arrBsaCode.includes(dataCode)) {
                                            //bsa
                                            if(dataCode != 'TIME_COUNTER_SELLER_LEADER' && dataCode != 'TIME_COUNTER_SELLER_ASM') {
                                                render =  data.map(item => {
                                                    return `<a onClick="openDetail(this, '${'/pos/sa/detail/' + item.id}'); return false;" style="display: inline-block;text-decoration: underline;" href="javascrip:;"><span>${item.id}</span> (<small>${moment.unix(item.createdDate / 1000).locale('vi').fromNow()}</small>)</a>`;
                                                });
                                            } else {
                                                render =  data.map(item => {
                                                    return `<div style="display: inline-block;"><span>${item.id}</span> (<small>${moment.unix(item.createdDate / 1000).locale('vi').fromNow()  }</small>)</div>`;
                                                });
                                            }
                                        }
                                    }
                                    return '<div class="view_more_detail">' + render + '</div>';
                                }}
                            ]
                        });
                        tableTimeCounter.columns.adjust();
                    });
                }
            } else if (arrSpecialListingExpiredCode.includes(dataCode)) {
                if (dataCode === 'POS_MANAGER_UPDATE_GUARANTEED') {
                    window.location.href = `/pos/manager/report`;
                } 
                
            } else {
                // warning of buy side
                if (dataStuff.length > 0 ) {
                    $('#modalInfoCommonNoti').modal();
                    $('#modalInfoCommonNoti').on('shown.bs.modal', function (e) {
                        if (tableTimeCounter !== null) {
                            tableTimeCounter.destroy();
                        }
                        tableTimeCounter = $("#tableInfoNotifyTimeCounter").DataTable({
                            "paging": true,
                            "searching": false,
                            "ordering": false,
                            "lengthChange": false,
                            "pageLength": 5,
                            "bInfo": false,
                            "pagingType": "simple",
                            "data": dataStuff,
                            "language":{
                                "paginate": {
                                    previous: "Trước",
                                    next: "Tiếp"
                                },
                                "info": "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục"
                            },
                            "drawCallback": function () {
                                $('.view_more_detail').showMore({
                                  minheight: 80,
                                  buttontxtmore: "xem thêm <i class='fa fa-angle-down' ></i>",
                                  buttontxtless: "thu gọn <i class='fa fa-angle-up' ></i>",
                                });
                            },
                            "columns": [
                                {"data": "ids", orderable: false, render: function (data, type, object) {
                                    let render = 'N/A';
                                    if(object.details && object.details.length > 0) {
                                        render =  object.details.length;
                                    }
                                    return `<span class="num-count">${render}</span>`;
                                }},
                                {"data": "name", orderable: false},
                                {"data": "groupName", orderable: false, render: function (data, type, object) {
                                    if(data) {
                                        return data;
                                    }
                                    return 'N/A';
                                }},
                                {"data": "details", orderable: false, render: function (data, type, object) {
                                    let render = 'N/A';
                                    if(data && data.length > 0) {
                                        if (dataTypes == 'meeting') {
                                            render =  data.map(item => {
                                                return `<div style="display: inline-block;"><span>${item.customerName}</span></div>`
                                            });
                                        } else if(dataTypes != "null") {
                                            render =  data.map(item => {
                                                return `<a style="display: inline-block;text-decoration: underline;" href="${'/' + dataTypes + '/detail/' + item.id}"><span>${item.id}</span> (<small>${moment.unix(item.createdDate / 1000).locale('vi').fromNow()}</small>)</a>`
                                            });
                                        } else {
                                            render =  data.map(item => {
                                                return `<div style="display: inline-block;"><span>${item.id}</span> (<small>${moment.unix(item.createdDate / 1000).locale('vi').fromNow()  }</small>)</div>`
                                            });
                                        }
                                    }
                                    return '<div class="view_more_detail">' + render + '</div>';
                                }}
                            ]
                        });
                        tableTimeCounter.columns.adjust();
                    });
                }
            }
        });
    }
}

var commonNotifyTimer = new commonNotifyTimer();
commonNotifyTimer.init();

var openDetail = function(element, link){
    var numCount = $(element).closest('tr[role=row]').find('.num-count').text();
    if(numCount-1 <= 0){
        // hết listing
        // $(element).closest('tr[role=row]').remove();
        window.location.href = link;
    } else {
        // còn listing
        // $(element).closest('tr[role=row]').find('.num-count').text(numCount-1);
        // $(element).remove();
        window.location.href = link;
    }
};