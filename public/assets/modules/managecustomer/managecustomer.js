var PieChart = {
    chartData: [],
    çhartColors: [],
    drawChart: function() {
        var data = google.visualization.arrayToDataTable(PieChart.chartData);
        var chartWidth = $('#piechart').width();
        var chartHeight = $('#piechart').height();
        var options = {
            legend: 'none',
            colors: PieChart.çhartColors,
            width: chartWidth,
            height:chartHeight,
            chartArea: {width:chartWidth,left:0,top:0,height:chartHeight}
        };
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }
};

var startApp =function () {
    $('.waiting-payment').mask("#.##0đ", {reverse: true});
    $('.paymented').mask("#.##0đ", {reverse: true});
    
    $('.filter-date').click(function(event){
        event.stopPropagation();
    });
    $('.select-date').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true
    });
    //
    var colors = {
        PAYMENT_PENDING:'#a50000',
        PAYMENT_COMPLETED:'#f1792b',
        CLOSING:'#a8c357',
        DEPOSIT:'#57a3f0',
        NEGOTIATING:'#8b75a1',
        TOURING:'#da7167',
        CONSULT:'#f7d170',
        PENDING:'#f1f1f1'
    };
    var nameKey = {
        PAYMENT_PENDING:'Chờ thanh toán',
        PAYMENT_COMPLETED:'Đã thanh toán',
        CLOSING:'Ký hợp đồng',
        DEPOSIT:'Đặt cọc',
        NEGOTIATING:'Thương lượng',
        TOURING:'Đi xem',
        CONSULT:'Tư vấn',
        PENDING:'Hủy'
    };
    // chart
    setTimeout(function(){
        App.Feature.Post("/api/get-buyer-chart", {}, function (response) {
            if(response.length !== 0){
                var chartData = [];
                var chartColors =[];
                chartData.push(['chart','value chart']);
                $.each(response, function(key,val){
                    chartData.push([nameKey[key], val.amount]);
                    chartColors.push(colors[key]);
                });
                PieChart.chartData = chartData;
                PieChart.çhartColors = chartColors;
                google.charts.load('current', {'packages': ['corechart']});
                google.charts.setOnLoadCallback(PieChart.drawChart);
            } else {
                $('#piechart').html('<img src="/assets/images/version-4/no-chart.png" class="img-responsive center-block"/>');
            }
        });
    },500);
    
    ////////////// SEARCH / FILTER
    // search mobile
    $('#find-by-date').click(function(){
        $('#popup-customer-calendar').modal();
    });
    $('#find-by-name').click(function(){
        $('#popup-customer-search').modal();
    });
    // desktop
    $('#manage-apply').click(function(){
        $('.bl-pagination').hide();
        var actual_link = window.location.href;
        var lastUrl = actual_link.split('/').pop();
        if (lastUrl.match("p[0-9]*")) {
            var link = location.href.replace(lastUrl, '', window.location.href);
            window.history.pushState('object', document.title, link);
        }
        $(this).prop('disabled',true);
        var dataPost = {};
        var fromDate = $('#fromDate').val().split("/");
        var newFromDate = fromDate[1]+"/"+fromDate[0]+"/"+fromDate[2];
        dataPost.fromDate = new Date(newFromDate).getTime();
        
        var toDate = $('#toDate').val().split("/");
        var newToDate = toDate[1]+"/"+toDate[0]+"/"+toDate[2];
        dataPost.toDate = new Date(newToDate).getTime();
        if(dataPost.fromDate > dataPost.toDate){
            App.UI.Error('Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc');
            $(this).prop('disabled',false);
            return false;
        }
        //
        $('.infos-buyer').html('');
        App.Feature.Post('/api/get-buyer-list',dataPost,function(response){
            if(response.totalItems > 0){
                var html = '';
                $.each(response.list, function(key,val){
                    html+= '<div class="col-sm-6"><div class="customer-info"><p><b>Tên khách hàng: </b><span>';
                    html+= val.customerName;
                    html+= '</span></p><p><b>Ngân sách: </b><span>';
                    html+= val.initialBudgetFixedVnd;
                    html+= '</span></p><p><b>Vị trí BĐS: </b><span>';
                    html+= val.districtName;
                    html+= '</span></p><div class="bl-status bl-deposit">';
                    if(val.code == 'CONSULT')
                       html+= '<p class="p-info advisory">Tư vấn</p>';
                    else if(val.code == 'TOURING')
                       html+= '<p class="p-info see">Đi xem</p>';
                    else if(val.code == 'NEGOTIATING')
                       html+= '<p class="p-info negotiate">Thương lượng</p>';
                    else if(val.code == 'CLOSING')
                       html+= '<p class="p-info contract">Ký hợp đồng</p>';
                    else if(val.code == 'PENDING')
                       html+= '<p class="p-info">Hủy</p>';
                    else if(val.code == 'DEPOSIT')
                       html+= '<p class="p-info deposit">Đặt cọc</p>';
                    else if(val.code == 'PAYMENT_COMPLETED')
                       html+= '<p class="p-info pay-complete">Đã thanh toán</p>';
                   else if(val.code == 'PAYMENT_PENDING')
                       html+= '<p class="p-info pay-pending">Chờ thanh toán</p>';
                    html+= '<p class="p-date">';
                    html+= moment(val.createdDate).format("DD/MM/YYYY");
                    html+= '</p></div></div></div>';
                });
                $('.infos-buyer').html(html);
            }
        });
        //
        App.Feature.Post('/api/get-buyer-chart',dataPost,function(response){
            $('#piechart').html('');
            if(response.length == 0){
                $.each($('.number-trade p'),function(key,val){
                    $(this).text('0');
                });
                $('#piechart').html('<img src="/assets/images/version-4/no-chart.png" class="img-responsive center-block"/>');
                //$('#piechart').removeClass('piechart');
            } else {
                // số lượng giao dịch
                $('.number-trade').html('');
                var html = '';
                if(typeof(response['PAYMENT_COMPLETED'])!='undefined')
                    html+= '<p>' + response['PAYMENT_COMPLETED'].amount + '</p>';
                else
                    html+= '<p>'+ 0 +'</p>';
                if(typeof(response['PAYMENT_PENDING'])!='undefined')
                    html+= '<p>' + response['PAYMENT_PENDING'].amount + '</p>';
                else
                    html+= '<p>'+ 0 +'</p>';
                if(typeof(response['CLOSING'])!='undefined')
                    html+= '<p>' + response['CLOSING'].amount + '</p>';
                else
                    html+= '<p>'+ 0 +'</p>';
                if(typeof(response['DEPOSIT'])!='undefined')
                    html+= '<p>'+ response['DEPOSIT'].amount + '</p>';
                else
                    html+= '<p>'+ 0 +'</p>';
                if(typeof(response['NEGOTIATING'])!='undefined')
                    html+= '<p>'+  response['NEGOTIATING'].amount + '</p>';
                else
                    html+= '<p>'+ 0 +'</p>';
                if(typeof(response['TOURING'])!='undefined')
                    html+= '<p>'+  response['TOURING'].amount + '</p>';
                else
                    html+= '<p>'+ 0 +'</p>';
                if(typeof(response['CONSULT'])!='undefined')
                    html+= '<p>'+  response['CONSULT'].amount + '</p>';
                else
                    html+= '<p>'+ 0 +'</p>';
                if(typeof(response['PENDING'])!='undefined')
                    html+= '<p>'+  response['PENDING'].amount + '</p>';
                else
                    html+= '<p>'+ 0 +'</p>';
                $('.number-trade').html(html);
                //pie chart
                $('#piechart').addClass('piechart');
                
                var chartData = [];
                var chartColors =[];
                chartData.push(['chart','value chart']);
                $.each(response, function(key,val){
                    chartData.push([nameKey[key], val.amount]);
                    chartColors.push(colors[key]);
                });
                PieChart.chartData = chartData;
                google.charts.load('current', {'packages': ['corechart']});
                google.charts.setOnLoadCallback(PieChart.drawChart);             
            }
        });
        //
        $('#dLabel1').parent().removeClass('open');
        $('#dLabel1').val($('#fromDate').val() + ' - ' + $('#toDate').val());
        $(this).prop('disabled',false);
    });
    //manage-apply-mobile : mobile
    $('#manage-apply-mobile').click(function(){
        $('.bl-pagination').hide();
        var actual_link = window.location.href;
        var lastUrl = actual_link.split('/').pop();
        if (lastUrl.match("p[0-9]*")) {
            var link = location.href.replace(lastUrl, '', window.location.href);
            window.history.pushState('object', document.title, link);
        }
        $(this).prop('disabled',true);
        var dataPost = {};
        var fromDate = $('#fromDate').val().split("/");
        var newFromDate = fromDate[1]+"/"+fromDate[0]+"/"+fromDate[2];
        dataPost.fromDate = new Date(newFromDate).getTime();
        
        var toDate = $('#toDate').val().split("/");
        var newToDate = toDate[1]+"/"+toDate[0]+"/"+toDate[2];
        dataPost.toDate = new Date(newToDate).getTime();
        if(dataPost.fromDate > dataPost.toDate){
            App.UI.Error('Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc');
            $(this).prop('disabled',false);
            return false;
        }
        $('.infos-buyer').html('');
        App.Feature.Post('/api/get-buyer-list',dataPost,function(response){
            if(response.totalItems > 0){
                var html = '';
                $.each(response.list, function(key,val){
                    html+= '<div class="bl-table"><div class="customer-info"><p><b>Tên khách hàng: </b><span>';
                    html+= val.customerName;
                    html+= '</span></p><p><b>Ngân sách: </b><span>';
                    html+= val.initialBudgetFixedVnd;
                    html+= '</span></p><p><b>Vị trí BĐS: </b><span>';
                    html+= val.districtName;
                    html+= '</span></p><div class="bl-status bl-deposit">';
                    if(val.code == 'CONSULT')
                       html+= '<p class="p-info advisory">Tư vấn</p>';
                    else if(val.code == 'TOURING')
                       html+= '<p class="p-info see">Đi xem</p>';
                    else if(val.code == 'NEGOTIATING')
                       html+= '<p class="p-info negotiate">Thương lượng</p>';
                    else if(val.code == 'CLOSING')
                       html+= '<p class="p-info contract">Ký hợp đồng</p>';
                    else if(val.code == 'PENDING')
                       html+= '<p class="p-info">Hủy</p>';
                    else if(val.code == 'DEPOSIT')
                       html+= '<p class="p-info deposit">Đặt cọc</p>';
                    else if(val.code == 'PAYMENT_COMPLETED')
                       html+= '<p class="p-info pay-complete">Đã thanh toán</p>';
                    else if(val.code == 'PAYMENT_PENDING')
                       html+= '<p class="p-info pay-pending">Chờ thanh toán</p>';
                    html+= '<p class="p-date">';
                    html+= moment(val.createdDate).format("DD/MM/YYYY");
                    html+= '</p></div></div></div>';
                });
                $('.infos-buyer').html(html);
            }
        });
        //
        App.Feature.Post('/api/get-buyer-chart',dataPost,function(response){
            $('#piechart').html('');
            if(response.length == 0){
                $('#piechart').html('<img src="/assets/images/version-4/no-chart.png" class="img-responsive center-block"/>');
                //$('#piechart').removeClass('piechart');
                $('.status-customer').html('');
                var html = '';
                html+= '<p class="p-info pay-complete">Đã thanh toán: ' + 0 + '</p>';
                html+= '<p class="p-info pay-pending">Chờ thanh toán: ' + 0 + '</p>';
                html+= '<p class="p-info contract">Ký hợp đồng:' + 0 + '</p>';
                html+= '<p class="p-info deposit">Đặt cọc: '+ 0 + '</p>';
                html+= '<p class="p-info negotiate">Thương lượng: '+  0 + '</p>';
                html+= '<p class="p-info see">Đi xem: '+ 0 + '</p>';
                html+= '<p class="p-info advisory">Tư vấn: '+ 0 + '</p>';
                html+= '<p class="p-info">Hủy: '+ 0 +'</p>';
                $('.status-customer').html(html);
            } else {
                // số lượng giao dịch
                $('.status-customer').html('');
                var html = '';
                if(typeof(response['PAYMENT_COMPLETED'])!='undefined')
                    html+= '<p class="p-info pay-complete">Đã thanh toán: ' + response['PAYMENT_COMPLETED'].amount + '</p>';
                else
                    html+= '<p class="p-info pay">Đã thanh toán: '+ 0 +'</p>';
                if(typeof(response['PAYMENT_PENDING'])!='undefined')
                    html+= '<p class="p-info pay-pending">Chờ thanh toán: ' + response['PAYMENT_PENDING'].amount + '</p>';
                else
                    html+= '<p class="p-info pay-pending">Chờ thanh toán: '+ 0 +'</p>';
                if(typeof(response['CLOSING'])!='undefined')
                    html+= '<p class="p-info contract">Ký hợp đồng:' + response['CLOSING'].amount + '</p>';
                else
                    html+= '<p class="p-info contract">Ký hợp đồng:'+ 0 +'</p>';
                if(typeof(response['DEPOSIT'])!='undefined')
                    html+= '<p class="p-info deposit">Đặt cọc: ' + response['DEPOSIT'].amount + '</p>';
                else
                    html+= '<p class="p-info deposit">Đặt cọc: '+ 0 +'</p>';
                if(typeof(response['NEGOTIATING'])!='undefined')
                    html+= '<p class="p-info negotiate">Thương lượng: ' +  response['NEGOTIATING'].amount + '</p>';
                else
                    html+= '<p class="p-info negotiate">Thương lượng: '+ 0 +'</p>';
                if(typeof(response['TOURING'])!='undefined')
                    html+= '<p class="p-info see">Đi xem: ' +  response['TOURING'].amount + '</p>';
                else
                    html+= '<p class="p-info see">Đi xem: ' + 0 +'</p>';
                if(typeof(response['CONSULT'])!='undefined')
                    html+= '<p class="p-info advisory">Tư vấn: ' +  response['CONSULT'].amount + '</p>';
                else
                    html+= '<p class="p-info advisory">Tư vấn: ' + 0 +'</p>';
                if(typeof(response['PENDING'])!='undefined')
                    html+= '<p class="p-info">Hủy: ' +  response['PENDING'].amount + '</p>';
                else
                    html+= '<p class="p-info">Hủy: ' + 0 +'</p>';
                $('.status-customer').html(html);
                //pie chart
                $('#piechart').addClass('piechart');
                
                var chartData = [];
                var chartColors =[];
                chartData.push(['chart','value chart']);
                $.each(response, function(key,val){
                    chartData.push([nameKey[key], val.amount]);
                    chartColors.push(colors[key]);
                });
                PieChart.chartData = chartData;
                google.charts.load('current', {'packages': ['corechart']});
                google.charts.setOnLoadCallback(PieChart.drawChart);              
            }
        });
        //
        $('#dLabel1').parent().removeClass('open');
        $('#popup-customer-calendar').modal('hide');
        $(this).prop('disabled',false);
    });
    // desktop
    $('.search-by-name').click(function(){
        $('.bl-pagination').hide();
        var actual_link = window.location.href;
        var lastUrl = actual_link.split('/').pop();
        if (lastUrl.match("p[0-9]*")) {
            var link = location.href.replace(lastUrl, '', window.location.href);
            window.history.pushState('object', document.title, link);
        }
        //
        var dataPost = {};
        if($('#fromDate').val()!=='' || $('#toDate').val()!==''){
            var fromDate = $('#fromDate').val().split("/");
            var newFromDate = fromDate[1]+"/"+fromDate[0]+"/"+fromDate[2];
            dataPost.fromDate = new Date(newFromDate).getTime();

            var toDate = $('#toDate').val().split("/");
            var newToDate = toDate[1]+"/"+toDate[0]+"/"+toDate[2];
            dataPost.toDate = new Date(newToDate).getTime();
            if(dataPost.fromDate > dataPost.toDate){
                App.UI.Error('Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc');
                $(this).prop('disabled',false);
                return false;
            }
        }
        dataPost.customerName = $('#customerName').val();
        $('.infos-buyer').html('');
        App.Feature.Post('/api/get-buyer-list',dataPost,function(response){
            if(response.totalItems > 0){
                var html = '';
                $.each(response.list, function(key,val){
                    html+= '<div class="col-sm-6"><div class="customer-info"><p><b>Tên khách hàng: </b><span>';
                    html+= val.customerName;
                    html+= '</span></p><p><b>Ngân sách: </b><span>';
                    html+= val.initialBudgetFixedVnd;
                    html+= '</span></p><p><b>Vị trí BĐS: </b><span>';
                    html+= val.districtName;
                    html+= '</span></p><div class="bl-status bl-deposit">';
                    if(val.code == 'CONSULT')
                       html+= '<p class="p-info advisory">Tư vấn</p>';
                    else if(val.code == 'TOURING')
                       html+= '<p class="p-info see">Đi xem</p>';
                    else if(val.code == 'NEGOTIATING')
                       html+= '<p class="p-info negotiate">Thương lượng</p>';
                    else if(val.code == 'CLOSING')
                       html+= '<p class="p-info contract">Ký hợp đồng</p>';
                    else if(val.code == 'PENDING')
                       html+= '<p class="p-info">Hủy</p>';
                    else if(val.code == 'DEPOSIT')
                       html+= '<p class="p-info deposit">Đặt cọc</p>';
                    else if(val.code == 'PAYMENT_COMPLETED')
                       html+= '<p class="p-info pay-complete">Đã thanh toán</p>';
                    else if(val.code == 'PAYMENT_PENDING')
                       html+= '<p class="p-info pay-pending">Chờ thanh toán</p>';
                    html+= '<p class="p-date">';
                    html+= moment(val.createdDate).format("DD/MM/YYYY");
                    html+= '</p></div></div></div>';
                });
                $('.infos-buyer').html(html);
            }
        });
        App.Feature.Post('/api/get-buyer-chart',dataPost,function(response){
            $('#piechart').html('');
            if(response.length == 0){
                $.each($('.number-trade p'),function(key,val){
                    $(this).text('0');
                });
                $('#piechart').html('<img src="/assets/images/version-4/no-chart.png" class="img-responsive center-block"/>');
                //$('#piechart').removeClass('piechart');
            } else {
                // số lượng giao dịch
                $('.number-trade').html('');
                var html = '';
                if(typeof(response['PAYMENT_COMPLETED'])!='undefined')
                    html+= '<p>' + response['PAYMENT_COMPLETED'].amount + '</p>';
                else
                    html+= '<p>'+ 0 +'</p>';
                if(typeof(response['PAYMENT_PENDING'])!='undefined')
                    html+= '<p>' + response['PAYMENT_PENDING'].amount + '</p>';
                else
                    html+= '<p>'+ 0 +'</p>';
                if(typeof(response['CLOSING'])!='undefined')
                    html+= '<p>' + response['CLOSING'].amount + '</p>';
                else
                    html+= '<p>'+ 0 +'</p>';
                if(typeof(response['DEPOSIT'])!='undefined')
                    html+= '<p>'+ response['DEPOSIT'].amount + '</p>';
                else
                    html+= '<p>'+ 0 +'</p>';
                if(typeof(response['NEGOTIATING'])!='undefined')
                    html+= '<p>'+  response['NEGOTIATING'].amount + '</p>';
                else
                    html+= '<p>'+ 0 +'</p>';
                if(typeof(response['TOURING'])!='undefined')
                    html+= '<p>'+  response['TOURING'].amount + '</p>';
                else
                    html+= '<p>'+ 0 +'</p>';
                if(typeof(response['CONSULT'])!='undefined')
                    html+= '<p>'+  response['CONSULT'].amount + '</p>';
                else
                    html+= '<p>'+ 0 +'</p>';
                if(typeof(response['PENDING'])!='undefined')
                    html+= '<p>'+  response['PENDING'].amount + '</p>';
                else
                    html+= '<p>'+ 0 +'</p>';
                $('.number-trade').html(html);
                //pie chart
                $('#piechart').addClass('piechart');
                
                var chartData = [];
                var chartColors =[];
                chartData.push(['chart','value chart']);
                $.each(response, function(key,val){
                    chartData.push([nameKey[key], val.amount]);
                    chartColors.push(colors[key]);
                });
                PieChart.chartData = chartData;
                google.charts.load('current', {'packages': ['corechart']});
                google.charts.setOnLoadCallback(PieChart.drawChart);             
            }
        });
    });
    // mobile
    $('.search-by-name-mobile').click(function(){
        $('.bl-pagination').hide();
        var actual_link = window.location.href;
        var lastUrl = actual_link.split('/').pop();
        if (lastUrl.match("p[0-9]*")) {
            var link = location.href.replace(lastUrl, '', window.location.href);
            window.history.pushState('object', document.title, link);
        }
        //
        var dataPost = {};
        if($('#fromDate').val()!=='' || $('#toDate').val()!==''){
            var fromDate = $('#fromDate').val().split("/");
            var newFromDate = fromDate[1]+"/"+fromDate[0]+"/"+fromDate[2];
            dataPost.fromDate = new Date(newFromDate).getTime();

            var toDate = $('#toDate').val().split("/");
            var newToDate = toDate[1]+"/"+toDate[0]+"/"+toDate[2];
            dataPost.toDate = new Date(newToDate).getTime();
            if(dataPost.fromDate > dataPost.toDate){
                App.UI.Error('Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc');
                $(this).prop('disabled',false);
                return false;
            }
        }
        dataPost.customerName = $('#customerName').val();
        $('.infos-buyer').html('');
        App.Feature.Post('/api/get-buyer-list',dataPost,function(response){
            if(response.totalItems > 0){
                var html = '';
                $.each(response.list, function(key,val){
                    html+= '<div class="bl-table"><div class="customer-info"><p><b>Tên khách hàng: </b><span>';
                    html+= val.customerName;
                    html+= '</span></p><p><b>Ngân sách: </b><span>';
                    html+= val.initialBudgetFixedVnd;
                    html+= '</span></p><p><b>Vị trí BĐS: </b><span>';
                    html+= val.districtName;
                    html+= '</span></p><div class="bl-status bl-deposit">';
                    if(val.code == 'CONSULT')
                       html+= '<p class="p-info advisory">Tư vấn</p>';
                    else if(val.code == 'TOURING')
                       html+= '<p class="p-info see">Đi xem</p>';
                    else if(val.code == 'NEGOTIATING')
                       html+= '<p class="p-info negotiate">Thương lượng</p>';
                    else if(val.code == 'CLOSING')
                       html+= '<p class="p-info contract">Ký hợp đồng</p>';
                    else if(val.code == 'PENDING')
                       html+= '<p class="p-info">Hủy</p>';
                    else if(val.code == 'DEPOSIT')
                       html+= '<p class="p-info deposit">Đặt cọc</p>';
                    else if(val.code == 'PAYMENT_COMPLETED')
                       html+= '<p class="p-info pay-complete">Đã thanh toán</p>';
                    else if(val.code == 'PAYMENT_PENDING')
                       html+= '<p class="p-info pay-pending">Chờ thanh toán</p>';
                    html+= '<p class="p-date">';
                    html+= moment(val.createdDate).format("DD/MM/YYYY");
                    html+= '</p></div></div></div>';
                });
                $('.infos-buyer').html(html);
            }
        });
        //
        App.Feature.Post('/api/get-buyer-chart',dataPost,function(response){
            $('#piechart').html('');
            if(response.length == 0){
                $('#piechart').html('<img src="/assets/images/version-4/no-chart.png" class="img-responsive center-block"/>');
                //$('#piechart').removeClass('piechart');
                $('.status-customer').html('');
                var html = '';
                html+= '<p class="p-info pay-complete">Đã thanh toán: ' + 0 + '</p>';
                html+= '<p class="p-info pay-pending">Chờ thanh toán: ' + 0 + '</p>';
                html+= '<p class="p-info contract">Ký hợp đồng:' + 0 + '</p>';
                html+= '<p class="p-info deposit">Đặt cọc: '+ 0 + '</p>';
                html+= '<p class="p-info negotiate">Thương lượng: '+  0 + '</p>';
                html+= '<p class="p-info see">Đi xem: '+ 0 + '</p>';
                html+= '<p class="p-info advisory">Tư vấn: '+ 0 + '</p>';
                html+= '<p class="p-info">Hủy: '+ 0 +'</p>';
                $('.status-customer').html(html);
            } else {
                // số lượng giao dịch
                $('.status-customer').html('');
                var html = '';
                if(typeof(response['PAYMENT_COMPLETED'])!='undefined')
                    html+= '<p class="p-info pay-complete">Đã thanh toán: ' + response['PAYMENT_COMPLETED'].amount + '</p>';
                else
                    html+= '<p class="p-info pay">Đã thanh toán: '+ 0 +'</p>';
                if(typeof(response['PAYMENT_PENDING'])!='undefined')
                    html+= '<p class="p-info pay-pending">Chờ thanh toán: ' + response['PAYMENT_PENDING'].amount + '</p>';
                else
                    html+= '<p class="p-info pay-pending">Chờ thanh toán: '+ 0 +'</p>';
                if(typeof(response['CLOSING'])!='undefined')
                    html+= '<p class="p-info contract">Ký hợp đồng:' + response['CLOSING'].amount + '</p>';
                else
                    html+= '<p class="p-info contract">Ký hợp đồng:'+ 0 +'</p>';
                if(typeof(response['DEPOSIT'])!='undefined')
                    html+= '<p class="p-info deposit">Đặt cọc: ' + response['DEPOSIT'].amount + '</p>';
                else
                    html+= '<p class="p-info deposit">Đặt cọc: '+ 0 +'</p>';
                if(typeof(response['NEGOTIATING'])!='undefined')
                    html+= '<p class="p-info negotiate">Thương lượng: ' +  response['NEGOTIATING'].amount + '</p>';
                else
                    html+= '<p class="p-info negotiate">Thương lượng: '+ 0 +'</p>';
                if(typeof(response['TOURING'])!='undefined')
                    html+= '<p class="p-info see">Đi xem: ' +  response['TOURING'].amount + '</p>';
                else
                    html+= '<p class="p-info see">Đi xem: ' + 0 +'</p>';
                if(typeof(response['CONSULT'])!='undefined')
                    html+= '<p class="p-info advisory">Tư vấn: ' +  response['CONSULT'].amount + '</p>';
                else
                    html+= '<p class="p-info advisory">Tư vấn: ' + 0 +'</p>';
                if(typeof(response['PENDING'])!='undefined')
                    html+= '<p class="p-info">Hủy: ' +  response['PENDING'].amount + '</p>';
                else
                    html+= '<p class="p-info">Hủy: ' + 0 +'</p>';
                $('.status-customer').html(html);
                //pie chart
                $('#piechart').addClass('piechart');
                
                var chartData = [];
                var chartColors =[];
                chartData.push(['chart','value chart']);
                $.each(response, function(key,val){
                    chartData.push([nameKey[key], val.amount]);
                    chartColors.push(colors[key]);
                });
                PieChart.chartData = chartData;
                google.charts.load('current', {'packages': ['corechart']});
                google.charts.setOnLoadCallback(PieChart.drawChart);              
            }
        });
        //
        $('#popup-customer-search').modal('hide');
    });
    // filter desktop
    $('.filter-status').click(function(){
        $('.bl-pagination').hide();
        var code = $(this).data('code');
        var color = $(this).data('color');
        var text = $(this).find('.p-info').text();
        $('#dLabel2').find('.p-info').text(text);
        $('#dLabel2').find('#status-filter').removeClass('all');
        $('#dLabel2').find('#status-filter').addClass(color);
        var dataPost = {};
        if(code == "all")
            dataPost.statusIds = null;
        else
            dataPost.statusIds = code;
        //infos-buyer
        $('.infos-buyer').html('');
        App.Feature.Post('/api/get-buyer-list',dataPost,function(response){
            if(response.totalItems > 0){
                var html = '';
                $.each(response.list, function(key,val){
                    html+= '<div class="col-sm-6"><div class="customer-info"><p><b>Tên khách hàng: </b><span>';
                    html+= val.customerName;
                    html+= '</span></p><p><b>Ngân sách: </b><span>';
                    html+= val.initialBudgetFixedVnd;
                    html+= '</span></p><p><b>Vị trí BĐS: </b><span>';
                    html+= val.districtName;
                    html+= '</span></p><div class="bl-status bl-deposit">';
                    if(val.code == 'CONSULT')
                       html+= '<p class="p-info advisory">Tư vấn</p>';
                    else if(val.code == 'TOURING')
                       html+= '<p class="p-info see">Đi xem</p>';
                    else if(val.code == 'NEGOTIATING')
                       html+= '<p class="p-info negotiate">Thương lượng</p>';
                    else if(val.code == 'CLOSING')
                       html+= '<p class="p-info contract">Ký hợp đồng</p>';
                    else if(val.code == 'PENDING')
                       html+= '<p class="p-info">Hủy</p>';
                    else if(val.code == 'DEPOSIT')
                       html+= '<p class="p-info deposit">Đặt cọc</p>';
                    else if(val.code == 'PAYMENT_COMPLETED')
                       html+= '<p class="p-info pay-complete">Đã thanh toán</p>';
                    else if(val.code == 'PAYMENT_PENDING')
                       html+= '<p class="p-info pay-pending">Chờ thanh toán</p>';
                    html+= '<p class="p-date">';
                    html+= moment(val.createdDate).format("DD/MM/YYYY");
                    html+= '</p></div></div></div>';
                });
                $('.infos-buyer').html(html);
            }
        });
    });
    // filter mobile
    $('.filter-status-mobile').click(function(){
        $('.bl-pagination').hide();
        var code = $(this).data('code');
//        var text = $(this).find('.p-info').text();
//        $('#dLabel2').text(text);
        $('#dLabel2').parent().removeClass('open');
        var dataPost = {};
        if(code == "all")
            dataPost.statusIds = null;
        else
            dataPost.statusIds = code;
        $('.infos-buyer').html('');
        App.Feature.Post('/api/get-buyer-list',dataPost,function(response){
            if(response.totalItems > 0){
                var html = '';
                $.each(response.list, function(key,val){
                    html+= '<div class="bl-table"><div class="customer-info"><p><b>Tên khách hàng: </b><span>';
                    html+= val.customerName;
                    html+= '</span></p><p><b>Ngân sách: </b><span>';
                    html+= val.initialBudgetFixedVnd;
                    html+= '</span></p><p><b>Vị trí BĐS: </b><span>';
                    html+= val.districtName;
                    html+= '</span></p><div class="bl-status bl-deposit">';
                    if(val.code == 'CONSULT')
                       html+= '<p class="p-info advisory">Tư vấn</p>';
                    else if(val.code == 'TOURING')
                       html+= '<p class="p-info see">Đi xem</p>';
                    else if(val.code == 'NEGOTIATING')
                       html+= '<p class="p-info negotiate">Thương lượng</p>';
                    else if(val.code == 'CLOSING')
                       html+= '<p class="p-info contract">Ký hợp đồng</p>';
                    else if(val.code == 'PENDING')
                       html+= '<p class="p-info">Hủy</p>';
                    else if(val.code == 'DEPOSIT')
                       html+= '<p class="p-info deposit">Đặt cọc</p>';
                    else if(val.code == 'PAYMENT_COMPLETED')
                       html+= '<p class="p-info pay-complete">Đã thanh toán</p>';
                    else if(val.code == 'PAYMENT_PENDING')
                       html+= '<p class="p-info pay-pending">Chờ thanh toán</p>';
                    html+= '<p class="p-date">';
                    html+= moment(val.createdDate).format("DD/MM/YYYY");
                    html+= '</p></div></div></div>';
                });
                $('.infos-buyer').html(html);
            }
        });
    });
    // detail of lead
    $('.total-listing').click(function(){
        $('.div-listing-intro').html('');
        $('.bl-progress').html('');
        $('#popup-management-customer .bl-pagination').html('');
        var leadId = parseInt($(this).data('leadid'));
        var dealId = parseInt($(this).data('dealid'));
        var customerName = $(this).data('customername');
        var typeName = $(this).data('typename');
        var initialBudgetFixedVnd = $(this).data('initialbudgetfixedvnd');
        var districtName = $(this).data('districtname');
        $('.detail-customerName').html('<b>Tên khách: </b>'+ customerName);
        $('.detail-typeName').html('<b>Nhu cầu: </b>'+ typeName);
        $('.detail-initialBudgetFixedVnd').html('<b>Ngân sách: </b>'+ initialBudgetFixedVnd);
        $('.detail-districtName').html('<b>Khu vực: </b>'+ districtName);
        var dataPost = {};
        dataPost.leadId = leadId;
        dataPost.moneyType = 0;
        dataPost.isPaging = false;
        if(dealId == ''){
            dataPost.dealId = null;
        } else {
            dataPost.dealId = dealId;
        }
        var isMobile = $('#is-mobile').val();
        App.Feature.Post('/api/get-buyer-detail-listing',dataPost,function(response){
            if(response.result){
                // pagination
                var totalItems = response.data.totalItems;
                var item = 5;
                var totalPage = parseInt(totalItems/item)+1;
                if(totalItems%item == 0){
                    totalPage = totalPage-1;
                }
                if(totalPage > 1){
                    var paginator = '';
                    paginator+= '<a class="paginate hidden pagination" data-page="prev" href="javascript:;">prev</a>';
                    paginator+= '<a class="current pagination" onclick="clickPaginator(this,'+ leadId +','+ dealId +'); return false;" data-page="1" href="javascript:;">1</a>';
                    for(var i=2;i<=totalPage;i++){
                        paginator+= '<a class="paginate pagination" onclick="clickPaginator(this,'+ leadId +','+ dealId +'); return false;" data-page="'+ i +'" href="javascript:;">'+ i +'</a>';
                    }
                    paginator+= '<a class="paginate hidden pagination" data-page="next" href="javascript:;">Next</a>';
                    $('#popup-management-customer .bl-pagination').html(paginator);
                }
                var currentPage = $('#popup-management-customer .bl-pagination').find('.current').data('page');
                if(totalPage == 1){
                    currentPage = 1;
                }
                //
                $('.detail-totalListing').html('Bất động sản giới thiệu ('+ response.data.totalItems +')');
                var html = '';
                $.each(response.data.list, function(key,val){
                    if(key < currentPage*item){
                        html+= '<div class="media">';
                        if(isMobile == 0){
                            html+= '<div class="media-left">';
                                html+= '<img class="detail-img lazy" src="/assets/images/listing-no-image.png" data-src="'+ val.photo.thumb887x500Link +'" alt="">';
                            html+= '</div>';
                        }
                        html+= '<div class="media-body">';
                            html+= '<p class="detail-listing-id">Mã BĐS: '+ val.rListingId +'</p>';
                            html+= '<p class="detail-listing-address">Địa chỉ: '+ val.streetName + ', ' + val.wardName + ', ' + val.districtName +'</p>';
                            html+= '<p class="detail-listing-price">Giá: '+ val.priceVnd +'</p>';
                            html+= '<p class="detail-listing-date">Ngày : '+ moment(val.createdBasketDate).format("DD/MM/YYYY") +'</p>';
                        html+= '</div>';
                        if(val.isDlx)
                            html+= '<div class="bl-set-calendar">Đặt lịch xem</div>';
                        html+= '</div>';
                    }
                });
                $('.div-listing-intro').html(html);
            }
        });
        //        
        var dataSend = {};
        dataSend.leadId = leadId;
        dataSend.moneyType = 0;
        if(dealId == ''){
            dataSend.dealId = null;
        } else {
            dataSend.dealId = dealId;
        }
        //console.log(dataSend);
        setTimeout(function(){
            App.Feature.Post('/api/get-buyer-detail',dataSend,function(response){
                //console.log(response);
                if(response.result){
                    if(response.data.progressList !== null && response.data.progressList.length > 0){
                        var html = '';
                        html+= '<h4 class="h4-title">Cập nhật tiến độ</h4>';
                        html+= '<ul class="li-progress">';
                        $.each(response.data.progressList, function(key,val){
                            html+= '<li>';
                            html+= '<p class="p-title">'+ val.statusName +'</p>';
                            if(val.contents.length > 1)
                                html+= '<p>Ngày '+ val.contents[val.contents.length-1].createdDate +': Khách hàng '+ response.data.customerName + ' ' + val.contents[val.contents.length-1].progressName +'</p>';
                            else
                                html+= '<p>Ngày '+ val.contents[0].createdDate +': Khách hàng '+ response.data.customerName + ' ' + val.contents[0].progressName +'</p>';
                            html+= '</li>';
                        });
                        html+= '</ul>';
                        $('.bl-progress').html(html);
                    }
                }
            });
        },500);
    });
};

var clickPaginator = function(element,leadId, dealId){
    $(element).parent().find('.current').addClass('paginate');
    $(element).parent().find('.current').removeClass('current');
    $(element).removeClass('paginate');
    $(element).addClass('current');
    runApi(leadId, dealId);
};

var runApi = function(leadId, dealId){
    $('.div-listing-intro').html('');
    var dataPost = {};
    dataPost.leadId = leadId;
    dataPost.moneyType = 0;
    dataPost.isPaging = false;
    dataPost.dealId = dealId;
    var isMobile = $('#is-mobile').val();
    App.Feature.Post('/api/get-buyer-detail-listing',dataPost,function(response){
        //console.log(response);
        if(response.result){
            // pagination
            var totalItems = response.data.totalItems;
            var item = 5;
            var totalPage = parseInt(totalItems/item)+1;
            if(totalItems%item == 0){
                totalPage = totalPage-1;
            }
            //console.log(totalPage);
            var currentPage = $('#popup-management-customer .bl-pagination').find('.current').data('page');
            if(totalPage == 1){
                currentPage = 1;
            }
            if(totalPage > 1){
                var paginator = '';
                paginator+= '<a class="paginate hidden pagination" data-page="prev" href="javascript:;">prev</a>';
                for(var i=1;i<=totalPage;i++){
                    if(currentPage == i)
                        paginator+= '<a class="current pagination" onclick="clickPaginator(this,'+ leadId +','+ dealId +'); return false;" data-page="'+ i +'" href="javascript:;">'+ i +'</a>';
                    else
                        paginator+= '<a class="paginate pagination" onclick="clickPaginator(this,'+ leadId +','+ dealId +'); return false;" data-page="'+ i +'" href="javascript:;">'+ i +'</a>';
                }
                paginator+= '<a class="paginate hidden pagination" data-page="next" href="javascript:;">Next</a>';
                $('#popup-management-customer .bl-pagination').html(paginator);
            }
            //
            //$('.detail-totalListing').html('Bất động sản giới thiệu ('+ response.data.totalItems +')');
            var html = '';
            $.each(response.data.list, function(key,val){
                if(key>=(currentPage-1)*item && key<currentPage*item){
                    html+= '<div class="media">';
                    if(isMobile == 0){
                        html+= '<div class="media-left">';
                            html+= '<img class="detail-img lazy" src="/assets/images/listing-no-image.png" data-src="'+ val.photo.thumb887x500Link +'" alt="">';
                        html+= '</div>';
                    }
                    html+= '<div class="media-body">';
                        html+= '<p class="detail-listing-id">Mã BĐS: '+ val.rListingId +'</p>';
                        html+= '<p class="detail-listing-address">Địa chỉ: '+ val.streetName + ', ' + val.wardName + ', ' + val.districtName +'</p>';
                        html+= '<p class="detail-listing-price">Giá: '+ val.priceVnd +'</p>';
                        html+= '<p class="detail-listing-date">Ngày : '+ moment(val.createdBasketDate).format("DD/MM/YYYY") +'</p>';
                    html+= '</div>';
                    if(val.isDlx)
                        html+= '<div class="bl-set-calendar">Đặt lịch xem</div>';
                    html+= '</div>';
                }
            });
            $('.div-listing-intro').html(html);
        }
    });
};