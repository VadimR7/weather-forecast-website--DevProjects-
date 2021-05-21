import axios from 'axios';

export const geocoding = axios.create({
  baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/`
});

export const weather = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/`
  });

const API = {
    geocoding,
    weather
}

export default API