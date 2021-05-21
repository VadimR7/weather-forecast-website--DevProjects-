import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  unitButton: {
    backgroundColor: '#4c8ffc',
    color: 'white',
    fontSize: '15px'
  },
  siteLogo: {
    cursor: 'pointer',
  },
}));

export default function DenseAppBar({ toggleWeatherUnit, oncliCkWeatherUnitChange, onClickPageReload }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" style={{ justifyContent: 'space-between' }}>
          <Typography className={classes.siteLogo} variant="h6" noWrap onClick={onClickPageReload}>
            VR Weather
          </Typography>
          <Box>
            <Typography>
              <Button onClick={oncliCkWeatherUnitChange} variant="outlined" size='small' className={classes.unitButton}>
                  {toggleWeatherUnit ? '\u2109' : '\u2103'}
              </Button>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
