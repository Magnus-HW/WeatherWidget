import type { City, CityWeather } from './types'

export const localStorageService = {
  getCitiesList(): CityWeather[] {
    const cityWeatherList = localStorage.getItem('citiesList')
    const cityWeatherListStr = cityWeatherList ? JSON.parse(cityWeatherList) : []
    return cityWeatherListStr
  },
  setWeatherListList(cityWeatherList: CityWeather[]): void {
    const citiesListToStr = JSON.stringify(cityWeatherList)
    localStorage.setItem('citiesList', citiesListToStr)
    return
  },
  isCityInLocaleStorage(city: City): boolean {
    const cityWeatherList = this.getCitiesList()
    const foundCity = cityWeatherList.find(
      (cityWeather) => cityWeather.name == city.name && cityWeather.sys.country == city.country
    )
    return foundCity ? true : false
  },
  setCityWeather(newCity: CityWeather): { alreadyInStorage: boolean } {
    const cityWeatherList = this.getCitiesList()
    //JSON.stringify(city) === JSON.stringify(city) -> bad performance
    const newCityStr = JSON.stringify(newCity)
    if (
      cityWeatherList.find((cityWeather) => JSON.stringify(cityWeather) === newCityStr) == undefined
    ) {
      cityWeatherList.push(newCity)
      const citiesListToStr = JSON.stringify(cityWeatherList)
      localStorage.setItem('citiesList', citiesListToStr)
      return { alreadyInStorage: false }
    }
    return { alreadyInStorage: true }
  },
  deleteCity(cityToDelete: CityWeather): void {
    const cityWeatherList = this.getCitiesList()
    
    const updatedCities = cityWeatherList.filter(
      (cityWeather) => cityWeather.name !== cityToDelete.name && cityWeather.sys.country !== cityToDelete.sys.country
    )
    this.setWeatherListList(updatedCities)
  }
}
