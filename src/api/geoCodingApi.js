import { geocoding } from './API';

export default function geoCode(address, succesCallback, inputErrorCallback, networkErrorCallback) {
  const API_KEY = process.env.REACT_APP_GEOLOCATION_API_KEY;

  if (address.length === 1) {
    address = address[0].toString();
    return geocoding
      .get(`${address}.json?limit=1&types=place&access_token=${API_KEY}`)
      .then((response) => {
        if (response.data.features.length === 0) {
          inputErrorCallback({
            error: true,
            errMsg: 'Please provide a valid location',
          });
        } else {
          succesCallback({
            latitude: response.data.features[0].center[1],
            longitude: response.data.features[0].center[0],
            place: response.data.features[0].place_name,
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          networkErrorCallback({
            error: true,
            errMsg: `Geocoding API - ${error.response.data.message}. Status code - ${error.response.status}`,
          });
        } else if (error.request) {
          networkErrorCallback({
            error: true,
            errMsg: `Geocoding API - No response from the server, please try again later`,
          });
        } else {
          networkErrorCallback({
            error: true,
            errMsg: `Geocoding API - Ups :(, somethink went wrong - Error = ${error.message}`,
          });
        }
      });
  }

  if (address.length === 2) {
    const lon = address[0];
    const lat = address[1];
    return geocoding
      .get(`${lon},${lat}.json?limit=1&types=place&access_token=${API_KEY}`)
      .then((response) => {
        succesCallback({
          latitude: lat,
          longitude: lon,
          place: response.data.features[0].place_name,
        });
      })
      .catch((error) => {
        if (error.response) {
          networkErrorCallback({
            error: true,
            errMsg: `Geocoding API - ${error.response.data.message}. Status code - ${error.response.status}`,
          });
        } else if (error.request) {
          networkErrorCallback({
            error: true,
            errMsg: `Geocoding API - No response from the server, please try again later`,
          });
        } else {
          networkErrorCallback({
            error: true,
            errMsg: `Geocoding API - Ups :(, somethink went wrong - Error = ${error.message}`,
          });
        }
      });
  }
}
