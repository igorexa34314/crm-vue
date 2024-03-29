import { computed, unref, MaybeRef } from 'vue';
import { ChartData, ChartOptions, ChartType } from 'chart.js/dist/types';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import { useI18n } from 'vue-i18n';
import { useTheme } from 'vuetify';
import randomColor from 'randomcolor';

export const useChart = <T extends ChartType = 'pie'>(
	labels: MaybeRef<ChartData<T>['labels'] | undefined>,
	data: MaybeRef<ChartData<T>['datasets'][number]['data'] | undefined>
) => {
	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

	const { t } = useI18n({ inheritLocale: true, useScope: 'global' });
	const theme = useTheme();

	const chartOptions = computed<ChartOptions>(() => ({
		responsive: true,
		plugins: {
			legend: {
				position: 'left',
				align: 'center',
				labels: {
					boxHeight: 30,
					font: {
						weight: 'bold',
						size: 16,
					},
				},
			},
			title: {
				display: true,
				text: t('chart_title'),
				color: theme.global.current.value.dark ? '#B8C7D3' : '#D50000',
				font: {
					size: 22,
					lineHeight: '1.5',
				},
			},
		},
	}));

	const chartData = computed<ChartData<T>>(
		() =>
			({
				labels: unref(labels) || [],
				datasets: [
					{
						data: unref(data || []),
						backgroundColor: randomColor({
							count: unref(data)?.length || 1,
							hue: theme.global.current.value.dark ? '#0E5578' : 'random',
							luminosity: theme.global.current.value.dark ? 'light' : 'bright',
						}),
						borderColor: theme.global.current.value.dark ? '#143c53' : '#8D6E63',
					},
				],
			}) as unknown as ChartData<T>
	);

	return { chartData, chartOptions };
};
