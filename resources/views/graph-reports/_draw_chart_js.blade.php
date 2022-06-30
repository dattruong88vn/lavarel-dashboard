<script type="text/javascript">
    function loadDataChart(chartId, title, data) {
      // Chuẩn bị dữ liệu cho chart
      var chartData = [['Name', 'Value']];
      var totalValue = 0;
      // Tính tổng
      $(data).each(function(idx, item){
        totalValue += item.value;
      });

      // Tính phần trăm từng đối tượng
      $(data).each(function(idx, item){
        percentValue = Math.round(item.value * 10000 / totalValue) / 100;
        if(!item.valueFormat) {
          item.valueFormat = item.value;
        }
        var itemName = item.name + " - " + percentValue + "% - " + item.valueFormat;
        chartData.push([itemName, item.value]);
      });

      var gData = google.visualization.arrayToDataTable(chartData);

      var options = {
        title: "",
        legend: 'none',
        pieSliceText: 'label',
        chartArea : {
          width: 320,
          height: 320
        },
        fontSize: 10
      };

      $("#title-"+chartId).text(title);
      if(totalValue == 0) {
        $("#" + chartId).html("<b>KHÔNG CÓ DỮ LIỆU</b>");
      }
      else {
        var chart = new google.visualization.PieChart(document.getElementById(chartId));
        function onClickChartElement() {
          var selectedItem = chart.getSelection()[0];
          if (!!selectedItem) {
            clickOnChart(data[selectedItem.row], chartId, (chartId === "listing-chart" ? 1 : 2) );
          }
        }
        google.visualization.events.addListener(chart, 'select', onClickChartElement);
        chart.draw(gData, options);
      }
      
    }
</script>