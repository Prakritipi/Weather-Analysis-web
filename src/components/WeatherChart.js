import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';

import { useQueries } from '@tanstack/react-query';
import { getCityForecast } from '../api/weatherServices';

ChartJS.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const cities = ['Kathmandu', 'Pokhara', 'Lalitpur', 'Bhaktapur'];

const WeatherChart = () => {
    const forecasts = useQueries({
        queries: cities.map(city => ({
            queryKey: ['forecast', city],
            queryFn: () => getCityForecast(city, 4), // Fetching 3 days forecast
        })),
    });

    const isloading = forecasts.some((f) => f.isLoading);
    const isError = forecasts.some((f) => f.isError);

    if (isloading) {
        return <p>Loading...</p>;
    };
    if (isError) {
        return <p>Error fetching data</p>;
    };

    const chartData = {
        labels: ['Today', 'Tomorrow', 'Day After Tomorrow'],
        datasets: forecasts?.filter(f => f.data&& f.data.forecast && f.data.forecast.forecastday)
            .map((forecast, i) => ({
            label: cities[i],
            data: forecast.data.forecast.forecastday.map((day) => day.day.avgtemp_c),
            fill: false,
            borderColor: `hsl(${i * 100}, 70%, 50%)`,
            backgroundColor: 'transparent',
        })),
    };

    // console.log("Forecasts:", forecasts.map(f => f.data));

    return (
        <div className="weather-chart w-50% mx-auto my-10">
            <h2>Weather Forecast Chart (°C)</h2>
            <Line data={chartData} />
        </div>
    );
};

export default WeatherChart;
