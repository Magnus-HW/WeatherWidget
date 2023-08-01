import type { City, CityWeather } from "./types";
import { weatherService } from "./weatherService";

export const actionsController = {
  addCityWeather(newCity: City): void {
    weatherService.addCityWeather(newCity);
  },
  deleteCityWeather(newCity: CityWeather): void {
    weatherService.deleteCityWeather(newCity)
  },
  updateWeatherList(weatherArr: CityWeather[]): void {
    weatherService.updateCities(weatherArr)
  },
  async initializeCities() : Promise<void>{
    await weatherService.initializeCities();
  }
};
