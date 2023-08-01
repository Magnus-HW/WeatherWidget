import type { CityWeather } from "@/domains/weather-widget/types";

export interface WeatherStoreData {
  [key:string]: CityWeather
}