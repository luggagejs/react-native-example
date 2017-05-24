export default function getForecast(zip) {
  const KEY_API = '68cb713dca337d1e9d552834e1ee55a0'

  return fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${KEY_API}`)
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON)
      return {
        main: responseJSON.weather[0].main,
        description: responseJSON.weather[0].description,
        temp: responseJSON.main.temp
      }
    })
    .catch((error) => {
      console.warn(error)
    })
}
