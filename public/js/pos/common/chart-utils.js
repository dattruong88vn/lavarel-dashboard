// ChartJS
function PieChart() {
	// Default configs
	this.configs = {
		containerId: 'chart-container', // <div id="chart-container" style="width: 300px"></div>
		canvasId: 'chart', // <canvas id="chart"></canvas>
		chartConfig: {
			type: 'pie',
			data: {
				datasets: [{
					data: [20, 39],
					backgroundColor: ['#ff6384', '#36a2eb']
				}],
				
				// These labels appear in the legend and in the tooltips when hovering different arcs
				labels: [
					'Red',
					'Green'
				]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Chart.js v2.5',
					fontSize: 20
				},
				tooltips: {
					callbacks: {
						label: function (tooltipItem, data) {
							var allData = data.datasets[tooltipItem.datasetIndex].data;
							var tooltipLabel = data.labels[tooltipItem.index];
							var tooltipData = allData[tooltipItem.index];
							var total = 0;
							for (var i in allData) {
								total += allData[i];
							}
							var tooltipPercentage = Math.round((tooltipData / total) * 100);
							return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
						}
					}
				},
				pieceLabel: {
					// Chart.PieceLabel.min.js addon - https://github.com/emn178/Chart.PieceLabel.js
					// demo: https://emn178.github.io/Chart.PieceLabel.js/samples/demo/
					
					render: function (args) {
						return args.label + ' : ' + args.value + ' (' + args.percentage + '%)';
					},
					fontColor: ['white', 'white'],
					precision: 1
				}
			}
		}
	};
	
	this.show = function () {
		this.chartContainer = $('#' + this.configs.containerId);
		this.chartContainer.html('').append('<canvas id="' + this.configs.canvasId + '"></canvas>');
		this.canvas = this.chartContainer.find('#' + this.configs.canvasId).get(0).getContext('2d');
		this.chart = new Chart(this.canvas, this.configs.chartConfig);
		return this.chart;
	}
}
