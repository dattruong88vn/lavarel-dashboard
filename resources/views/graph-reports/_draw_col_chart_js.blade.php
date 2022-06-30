<script type="text/javascript">
    function drawColChart(chartId, title, chartData) {
      //
      drawData = [ ['Name']];

      $(chartData).each(function(idx, data){
        isAdded = false;
        currentIdx = 0
        $(data).each(function(dataIdx, element){
          if(element[0] == data.name) {
            isAdded = true;
            currentIdx = dataIdx;
            return false;
          }
        });

        if(!isAdded) {
           drawData.push([data.name]);
           currentIdx = drawData.length - 1;
        }

        $(data.chartItems).each(function(itemIdx, itemData){
          drawData[currentIdx].push(itemData.value);
          if(idx == 0) {
            drawData[0].push(itemData.name);
          }
        });
      });

      var data = google.visualization.arrayToDataTable(drawData);

      var options = {
        title: '',
        chartArea : {
          left: 50
        },
      };
      $("#title-"+chartId).text(title);
      var chart = new google.visualization.ColumnChart(document.getElementById(chartId));
      chart.draw(data, options);
    }
</script>