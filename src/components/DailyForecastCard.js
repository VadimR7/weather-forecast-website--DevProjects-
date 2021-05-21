import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import timeStampToDate from '../helpers/timeStampToDate';
import SingleDayTempChart from '../containers/SingleDayTempChart';

const useStyles = makeStyles(() => ({
  centered: {
    padding: '0',
    textAlign: 'center',
  },
  centeredItem: {
    alignSelf: 'center',
    textAlign: 'right',
  },
  dailyForecastCard: {
    padding: '0px 5px',
    border: '1px solid #e8e8e8',
    margin: '5px 5px',
    borderRadius: 10,
    cursor: 'pointer',
    backgroundColor: '#fcfcfc',
  },
  textPadding: {
    padding: '5px 0px 5px 0',
  },
}));

export default function DailyForecast({ dailyForecast, index, windSpeedUnit }) {
  const classes = useStyles();
  const [isDisplayed, setIsDisplayed] = useState(false);
  const detailsKey = index;

  const { dt, pop, weather, temp } = dailyForecast;
  const dailyForecastDate = timeStampToDate(dt, 'getMediumFormat');
  const dailyPrecipitation = Math.round(pop * 100);
  const dailyWeatherMainDescription = weather[0].main;
  const dailyWeatherAltDescription = weather[0].description;
  const dailyIcon = weather[0].icon;
  const dailyMaxTemp = Math.round(temp.max);
  const dailyMinTemp = Math.round(temp.min);

  const handleOnClickWeatherDetailsToggle = () => {
    setIsDisplayed((prevState) => !prevState);
  };

  return (
    <Grid
      className={classes.dailyForecastCard}
      container
      item
      xs={12}
      key={index}
      onClick={() => handleOnClickWeatherDetailsToggle(index)}
    >
      <Grid container item xs={12}>
        <Grid container item xs={7} className={classes.textPadding}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">{dailyForecastDate}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              {dailyWeatherMainDescription}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={1} className={classes.centeredItem}>
          <Typography>
            {dailyPrecipitation}
            <span>%</span>
          </Typography>
        </Grid>

        <Grid item xs={2} style={{ textAlign: 'left' }}>
          <img
            src={`https://openweathermap.org/img/wn/${dailyIcon}.png`}
            alt={dailyWeatherAltDescription}
            style={{ height: '100%' }}
          />
        </Grid>

        <Grid container item xs={2} className={classes.textPadding}>
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <Typography variant="body1">
              {dailyMaxTemp}
              <span>{'\u00B0'}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <Typography variant="body2">
              {dailyMinTemp}
              <span>{'\u00B0'}</span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {isDisplayed && detailsKey === index && (
        <DailyForecastDetails
          dailyDetailsForecast={dailyForecast}
          windSpeedUnit={windSpeedUnit}
        />
      )}
    </Grid>
  );
}

function DailyForecastDetails({ dailyDetailsForecast, windSpeedUnit }) {
  const classes = useStyles();

  const { temp, wind_speed, humidity, uvi, pop } = dailyDetailsForecast;
  const dailyTemp = Object.entries(temp);
  const dailyWindSpeed = wind_speed;
  const dailyHumidity = humidity;
  const dailyUviIndex = uvi;
  const dailyPrecipitation = Math.round(pop * 100);

  return (
    <Grid container item xs={12}>
      <Grid container item xs={12} sm={5} className={classes.textPadding}>
        <Grid container item xs={6}>
          <Grid item xs={12}>
            <Typography variant="body2">Wind speed</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">Humidity</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">UV Index</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">Chance of rain</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item xs={12}>
            <Typography variant="body1">
              {dailyWindSpeed}
              <span> {windSpeedUnit}</span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              {dailyHumidity}
              <span>%</span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{dailyUviIndex}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              {dailyPrecipitation}
              <span>%</span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={7} style={{ justifyContent: 'center' }}>
        <SingleDayTempChart dailyTemp={dailyTemp} />
      </Grid>
    </Grid>
  );
}
