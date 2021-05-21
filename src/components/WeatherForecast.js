import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import DailyChart from '../containers/DailyChart';
import locationNameSplit from '../helpers/locationNameSplit';
import timeStampToDate from '../helpers/timeStampToDate';
import HourlyChart from '../containers/HourlyChart';
import DailyForecast from './DailyForecastCard';
import CenteredTabs from '../containers/CenteredTabs';

const useStyles = makeStyles(() => ({
  centeredChartWeb: {
    textAlign: '-webkit-center;',
  },
  centeredChartMoz: {
    textAlign: '-moz-center;',
  },
  centered: {
    padding: '0',
    textAlign: 'center',
    alignSelf: 'center',
  },
  weatherUnit: {
    fontSize: 30,
    verticalAlign: 'text-top',
  },
  chartContainer: {
    border: '1px solid #e8e8e8',
    borderRadius: '7px',
    margin: '5px',
  },
  textPadding: {
    padding: '5px 0px 5px 0',
  },
}));

export default function WeatherForecast(props) {
  const classes = useStyles();
  
  const { location, weatherData, weatherUnit } = props;

  const { currentWeather, dailyForecast, hourlyForecast } = weatherData;
  const { tempUnit } = weatherUnit;
  const { windSpeedUnit } = weatherUnit;

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (newValue) => setTabValue(newValue);

  const splittedLocationName = locationNameSplit(location);

  const {
    dt,
    temp,
    feels_like,
    pressure,
    humidity,
    clouds,
    uvi,
    wind_speed,
    weather,
    weatherDescription,
  } = currentWeather;
  const currentDateAndTime = timeStampToDate(dt, 'getLongFormat');
  const currentTemp = Math.round(temp);
  const currentFeelsLikeTemp = Math.round(feels_like);
  const currentPressureValue = Math.round(pressure);
  const currentHumidityValue = Math.round(humidity);
  const currentCloudinessValue = Math.round(clouds);
  const currentUviIndex = uvi;
  const currentWindSpeed = Math.round(wind_speed);
  const currentWeatherMainDescription = weather[0].main;
  const currentWeatherAltDescription = weatherDescription;

  return (
    <Grid container>
      {/* Current Weather Card */}
      <Grid item xs={12} className={classes.centered}>
        <Typography variant="h5" className={classes.textPadding}>
          {splittedLocationName}
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.centered}>
        <Typography variant="body1" className={classes.textPadding}>
          {currentDateAndTime}
        </Typography>
      </Grid>
      <Grid container item xs={6}>
        <Grid item xs={12} className={classes.centered}>
          <Typography variant="h2" style={{ padding: 10 }}>
            {currentTemp}
            <span className={classes.weatherUnit}>{tempUnit}</span>
          </Typography>
        </Grid>
        <Grid container item xs={12} style={{ height: 'fit-content' }}>
          <Grid
            container
            item
            xs={12}
            lg={6}
            style={{
              paddingLeft: '5px',
              height: 'fit-content',
              textAlign: 'right',
            }}
          >
            <Grid item xs={6}>
              <Typography variant="body2">Feels like</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                style={{ textAlign: 'left', paddingLeft: '10px' }}
              >
                {currentFeelsLikeTemp}
                <span>{'\u00B0'}</span>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Pressure</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ textAlign: 'left', paddingLeft: '10px' }}
            >
              <Typography variant="body2">
                {currentPressureValue}
                <span> hPa</span>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Humidity</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ textAlign: 'left', paddingLeft: '10px' }}
            >
              <Typography variant="body2">
                {currentHumidityValue}
                <span>%</span>
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            lg={6}
            style={{
              paddingLeft: '5px',
              height: 'fit-content',
              textAlign: 'right',
            }}
          >
            <Grid item xs={6}>
              <Typography variant="body2">Cloudiness</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ textAlign: 'left', paddingLeft: '10px' }}
            >
              <Typography variant="body2">
                {currentCloudinessValue}
                <span>%</span>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">UV index</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                style={{ textAlign: 'left', paddingLeft: '10px' }}
              >
                {currentUviIndex}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Wind Speed</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ textAlign: 'left', paddingLeft: '10px' }}
            >
              <Typography variant="body2">
                {currentWindSpeed}
                <span> {windSpeedUnit}</span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={6}>
        <Grid
          item
          xs={12}
          style={{ height: '70%' }}
          className={classes.centered}
        >
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
            alt={currentWeatherAltDescription}
            style={{ height: '100%' }}
          />
        </Grid>
        <Grid item xs={12} className={classes.centered}>
          <Typography variant="h6" className={classes.textPadding}>
            {currentWeatherMainDescription}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12} className={classes.chartContainer}>
        {/* Switch Tabs */}
        <Grid item xs={12}>
          <Typography align="center" style={{ padding: '10px' }}>
            Hourly Forecast
          </Typography>
          <CenteredTabs
            value={tabValue}
            onChange={handleTabChange}
            tempUnit={tempUnit}
            windSpeedUnit={windSpeedUnit}
          />
        </Grid>
        {/* Hourly Forecast Chart*/}
        <Grid
          item
          xs={12}
          className={`${classes.centeredChartMoz} ${classes.centeredChartWeb}`}
        >
          <HourlyChart hourlyForecast={hourlyForecast} tabValue={tabValue} />
        </Grid>
      </Grid>
      <Grid item container xs={12} className={classes.chartContainer}>
        {/* Daily Forecast Chart*/}
        <Grid
          item
          xs={12}
          className={`${classes.centeredChartMoz} ${classes.centeredChartWeb}`}
        >
          <Typography align="center" style={{ padding: '10px' }}>
            Daily Forecast
          </Typography>
          <DailyChart dailyForecast={dailyForecast} />
        </Grid>
      </Grid>
      {/* Daily Forecast Cards */}
      {dailyForecast.map((day, index) => {
        const {dt} = day
        return (
          <DailyForecast
            key={dt}
            index={index}
            dailyForecast={day}
            windSpeedUnit={windSpeedUnit}
          />
        );
      })}
    </Grid>
  );
}
