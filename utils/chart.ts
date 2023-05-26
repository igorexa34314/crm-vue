import { ChartData, ChartOptions } from 'chart.js';

export const chartData: ChartData<'pie'> = {
	labels: [],
	datasets: [{ data: [], backgroundColor: [], borderColor: '#8D6E63' }]
};

export const chartOptions: ChartOptions = {
	responsive: true,
	plugins: {
		legend: {
			position: 'left',
			align: 'center',
			labels: {
				boxHeight: 30,
				font: {
					weight: 'bold',
					size: 16
				}
			}
		},
		title: {
			display: true,
			text: 'chart_title',
			color: '#D50000',
			font: {
				size: 22,
				lineHeight: '1.5'
			}
		}
	}
};
