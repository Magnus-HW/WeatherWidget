import { weatherAPI } from "./weatherAPI"
import { localStorageService } from "./localStorageService"
import { useWeatherStore } from "@/stores/weatherCities"
import type {City, CityWeather} from "@/domains/weather-widget/types"

export const weatherService = {

  async addCityWeather(newCity: City): Promise<void>{
    if(localStorageService.isCityInLocaleStorage(newCity)) {
      return
    }
    const cityWeather = await weatherAPI.fetchCityWeather(newCity)
    if(!(cityWeather instanceof Error)) {  
      useWeatherStore().addCityWeather(cityWeather);
      localStorageService.setCityWeather(cityWeather)
    }
  },

  deleteCity(cityToDelete: CityWeather): void {
    localStorageService.deleteCity(cityToDelete);
    useWeatherStore().deleteCityWeather(cityToDelete);
  },

  updateCities(weatherList: CityWeather[]): void {
    useWeatherStore().updateCities(weatherList)
    localStorageService.setWeatherListList(weatherList)
  },
  
  async initializeCities(): Promise<void> {
    const citiesList = localStorageService.getCitiesList()
    if(citiesList.length !== 0) {
      const cityWeatherList = await weatherAPI.fetchAllCitiesWeather(citiesList);
      if(!(cityWeatherList instanceof Error)) {
        useWeatherStore().updateCities(cityWeatherList)
      }
    }
  }
}