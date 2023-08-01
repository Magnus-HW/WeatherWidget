import type { City, CityWeather } from "./types";
import { weatherService } from "./weatherService";

export const actionsController = {
  addCity(newCity: City): void {
    weatherService.addCityWeather(newCity);
  },
  deleteCity(newCity: CityWeather): void {
    weatherService.deleteCity(newCity)
  },
  updateWeatherList(weatherArr: CityWeather[]): void {
    weatherService.updateCities(weatherArr)
  },
  async initializeCities() : Promise<void>{
    await weatherService.initializeCities();
  }
};
