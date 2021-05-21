import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { PaperContainer, CenteredBox } from './AppStyle';
import { CircularProgress } from '@material-ui/core';
import SearchField from './components/SearchField';
import WeatherForecast from './components/WeatherForecast';
import geoCodeAPI from './api/geoCodingApi';
import weatherAPI from './api/weatherApi';

const weatherUnits = {
  metric: {
    type: 'metric',
    tempUnit: '\u2103',
    windSpeedUnit: 'm/s',
  },
  imperial: {
    type: 'imperial',
    tempUnit: '\u2109',
    windSpeedUnit: 'miles/h',
  },
};

const inputErrorInitState = {
  error: false,
  errMsg: null,
};

const networkErrorInitState = {
  error: false,
  errMsg: null,
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [inputError, setInputError] = useState(inputErrorInitState);
  const [networkError, setNetWorkError] = useState(networkErrorInitState);
  const [toggleWeatherUnit, setToggleWeatherUnit] = useState(true);
  const [weatherUnit, setWeatherUnit] = useState(weatherUnits.metric);
  const [weatherData, setWeatherData] = useState(null);

  const handleOnClickPageReload = () => {
    window.location.reload();
  };

  const handleOnClickWeatherUnitChange = () => {
    setToggleWeatherUnit((previousValue) => !previousValue);
  };

  useEffect(() => {
    if (toggleWeatherUnit) {
      setWeatherUnit(weatherUnits.metric);
      return;
    }
    setWeatherUnit(weatherUnits.imperial);
  }, [toggleWeatherUnit]);

  useEffect(() => {
    let geolocationRequestCompleted = false;

    const succesCallback = (position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;
      geolocationRequestCompleted = true;
      geoCodeAPI([lon, lat], (response) => setCoordinates(response));
    };
    const errorCallback = () => {
      geolocationRequestCompleted = true;
      setSearchQuery('London');
    };

    if (!navigator.geolocation) {
      setSearchQuery('London');
      return;
    }
    navigator.geolocation.getCurrentPosition(succesCallback, errorCallback, {
      timeout: 3000,
    });
    setTimeout(function () {
      if (!geolocationRequestCompleted) {
        errorCallback();
      }
    }, 3001);
  }, []);

  useEffect(() => {
    const succesGeoData = (geoData) => {
      if (inputError.error) {
        setInputError(inputErrorInitState);
      }
      setCoordinates(geoData);
    };

    const errorGeoInput = (e) => {
      setInputError(e);
    };

    const errorGeoNetwork = (e) => {
      setNetWorkError(e);
    };

    if (searchQuery) {
      geoCodeAPI([searchQuery], succesGeoData, errorGeoInput, errorGeoNetwork);
    }
  }, [searchQuery, inputError.error]);

  useEffect(() => {
    const errorWeatherData = (e) => {
      setNetWorkError(e);
    };
    if (coordinates) {
      const succesWeatherData = (weatherData) => {
        setWeatherData({
          currentWeather: weatherData.data.current,
          dailyForecast: weatherData.data.daily,
          hourlyForecast: weatherData.data.hourly,
        });
      };
      const { latitude, longitude } = coordinates;
      weatherAPI(
        latitude,
        longitude,
        weatherUnit.type,
        succesWeatherData,
        errorWeatherData
      );
    }
  }, [coordinates, weatherUnit.type, inputError.error]);

  return (
    <>
      <Header
        toggleWeatherUnit={toggleWeatherUnit}
        oncliCkWeatherUnitChange={handleOnClickWeatherUnitChange}
        onClickPageReload={handleOnClickPageReload}
      />
      <CenteredBox>
        <SearchField
          handleSearchQuery={(e) => setSearchQuery(e)}
          error={inputError}
        />
      </CenteredBox>
      <PaperContainer>
        {weatherData && coordinates ? (
          <WeatherForecast
            location={coordinates.place}
            weatherData={weatherData}
            weatherUnit={weatherUnit}
          />
        ) : (
          <CenteredBox>
            {networkError.error ? (
              <h4>{networkError.errMsg}</h4>
            ) : (
              <CircularProgress />
            )}
          </CenteredBox>
        )}
      </PaperContainer>
    </>
  );
}
