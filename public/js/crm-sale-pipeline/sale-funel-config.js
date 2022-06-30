function drawChart(){
    // funel_month = JSON.parse(funel_month.replace(/&quot;/g,'"'));
    funnel_all = JSON.parse(funnel_all.replace(/&quot;/g,'"'));
    console.log(funnel_all);

    var dynamicHeightCheck = false;

    // var sort = [{label:"booking",value:0},{label:"meeting",value:0},{label:"tour",value:0},{label:"negotiate",value:0},{label:"deposit",value:0}];
    // $.each(sort, function(ks,vs){
    //  $.each(funel_month,function(k,v){
    //      if(vs.label == k){
    //          vs.label = v.total + ' ' + vs.label.charAt(0).toUpperCase() + vs.label.slice(1) + ': ' + Number(v.value.toFixed(1)).toLocaleString() +'đ';
    //          vs.value = v.total;
    //      }
    //  })
    // })

    var sortAll = [{label:"booking",value:0},{label:"meeting",value:0},{label:"tour",value:0},{label:"negotiate",value:0},{label:"deposit",value:0}];
    $.each(sortAll, function(ks,vs){
        $.each(funnel_all,function(k,v){
            if(v.total > 0){
                dynamicHeightCheck = true;
            }
            if(vs.label == k){
                if(k == 'booking' || k == 'meeting' || k == 'tour'){
                    if(k == 'tour'){
                        vs.label = v.total + ' Touring: ' + v.formattedDealPrice +'\n Tổng số: '+ funnel_all.funelTotal[k].total;
                    }else{
                        vs.label = v.total + ' ' + vs.label.charAt(0).toUpperCase() + vs.label.slice(1) + ': ' + v.formattedDealPrice + '\n Tổng số: ' + funnel_all.funelTotal[k].total;
                    }
                    
                }else if(k == 'negotiate'){
                    vs.label = v.total +' Negotiating: ' + v.formattedListingPrice + '\n Tổng số: ' + funnel_all.funelTotal[k].total;
                }else if(k == 'deposit'){
                    vs.label = v.total + ' ' + vs.label.charAt(0).toUpperCase() + vs.label.slice(1) + ': ' + v.formattedDepositPrice + '\n Tổng số: ' + funnel_all.funelTotal[k].total;
                }
                
                vs.value = v.total;
            }
        })
    })

    // const options = {
    //     block: {
    //         dynamicHeight: true,
    //         minHeight: 15
    //     },
    //     tooltip : {
    //      enabled : true
    //     },
    //     label: {
    //      fontSize: '11px',
    //         format: '{l}',
    //     },
    //     events: {
    //      click: {
    //          block : function(d) {
    //              console.log(d);
    //              // alert(d.label.raw);
    //          }
    //      }
    //     }
    // };

    const optionsAll = {
        chart: {
            bottomPinch : 1,
            curve: {
                enabled : false
            }
        },
        block: {
            // dynamicHeight: dynamicHeightCheck,
            dynamicHeight: false,
            minHeight: 15,
            fill : {
                scale : ["#3c8dbc", "#00c0ef" , "#00a65a", "#f39c12","#f56954"]
            }
        },
        tooltip : {
            enabled : true,
            format : function(label, value){
                var type = label.split(' ')[1];
                type = type.substring(0, type.length - 1);
                switch(type) {
                    case 'Booking':
                        return "Những deal ở trạng thái tư vấn, tiến độ tư vấn(Deal sau khi BA nhận meeting từ TM)";
                        break;
                    case 'Meeting':
                        return "Những deal ở trạng thái tư vấn, tiến độ tư vấn(Deal đã hoàn thành form update nhu cầu đánh giá khách hàng )";
                        break;
                    case 'Touring':
                        return "Những deal ở trạng thái viewing, tiến độ viewing(Deal đã book tour-DLX)"
                        break;
                    case 'Negotiating':
                        return "Những deal ở trạng thái Thương lượng, tiến độ thương lượng(Deal đã gởi hợp đồng- đang hỗ trợ thương lượng)";
                        break;
                    default:
                        return "Những deal ở trạng thái Đóng deal, tiến độ đặt cọc";
                }
            }
        },
        label: {
            // fontSize: '10px',
            format: '{l}',
        },
        events: {
            click: {
                block : function(d) {
                    clickSaleFunel(d);
                    
                }
            }
        }
    };

    const chart = new D3Funnel('#funnel');
    chart.draw(sortAll, optionsAll);
    // chart.range(["#FF0000", "#009933" , "#0000FF"]);

    // const chartmonthly = new D3Funnel('#funnel_monthly');
    // chartmonthly.draw(sort, options);
}