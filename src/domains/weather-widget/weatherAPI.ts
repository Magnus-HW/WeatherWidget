import type { City, CityWeather } from './types'
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
export const weatherAPI = {

  url(name: string, country: string): string {
    return `https://api.openweathermap.org/data/2.5/weather?q=${name},${country}&appid=${API_KEY}&units=metric`
  },

  async fetchCityWeather(newCity: City): Promise<NonNullable<CityWeather | Error>> {    
    try {
      const response = await fetch(this.url(newCity.name, newCity.country))
      if (!response.ok) {
        throw new Error('Failed to fetch data, status code: ' + response.status)
      }
      const weatherObject = (await response.json()) as CityWeather
      return weatherObject
    } catch (error) {
      if (error instanceof Error) return error
      else return Error('Unknow error')
    }
  },
  async fetchAllCitiesWeather(citiesWeather: CityWeather[]): Promise<Error | CityWeather[]> {
    const citiesFetchArgs = citiesWeather.map(
      (cityWeather) => ({ name: cityWeather.name, country: cityWeather.sys.country }) as City
    )
    try {
      const promises = citiesFetchArgs.map((city) => this.fetchCityWeather(city).then((res) => res))
      const weathers = (await Promise.all(promises)) as CityWeather[]
      return weathers
    } catch (error) {
      if (error instanceof Error) return error
      else return Error('Unknow error')
    }
  }
}
