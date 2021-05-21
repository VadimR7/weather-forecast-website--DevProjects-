import { weather } from './API';

export default function geoCode(lat, lon, units, succesCallback, errorCallback) {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  return weather
    .get(
      `onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=alerts,minutely&appid=${API_KEY}`
    )
    .then((response) => {
        succesCallback({
          data: response.data,
        });
    })
    .catch((error) => {
      if (error.response) {
        errorCallback({
          error: true,
          errMsg: `Weather API - ${error.response.data.message}. Status code - ${error.response.status}`,
        });
      } else if (error.request) {
        errorCallback({
          error: true,
          errMsg: `Weather API - No response from the server, please try again later`,
        });
      } else {
        errorCallback({
          error: true,
          errMsg: `Weather API - Ups :(, somethink went wrong - Error = ${error.message}`,
        });
      }
    });
}
