import { useQuery } from "@tanstack/react-query";
import { getCityForecast } from "../api/weatherServices";

export const useCityForecast = (city) => {
    return useQuery({
        queryKey: ['forecast', city],
        queryFn: () => getCityForecast(city),
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};