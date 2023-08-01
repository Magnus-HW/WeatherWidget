import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { CityWeather } from '@/domains/weather-widget/types'

export const useWeatherStore = defineStore('weatherStore', () => {
  const weatherStoreData = ref<CityWeather[]>([])

  const isWeatherEmpty = computed(() => { 
    console.log("empty");
    
    return weatherStoreData.value.length == 0})

  function addCityWeather(cityWeather: CityWeather): void {
    weatherStoreData.value = [...weatherStoreData.value, cityWeather]
  }
  function deleteCityWeather(cityToDelete: CityWeather): void {
    const cityToDeleteStr = JSON.stringify(cityToDelete)
    weatherStoreData.value = weatherStoreData.value.filter(cityWeather => JSON.stringify(cityWeather) !== cityToDeleteStr)
  }
  function updateCities(cities: CityWeather[]): void {
    weatherStoreData.value = cities
  }
  return { weatherStoreData, isWeatherEmpty, addCityWeather, deleteCityWeather, updateCities }
})
