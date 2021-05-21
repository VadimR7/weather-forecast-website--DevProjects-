import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    //   flexGrow: 1,
  },
  centeredBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  grid: {
    margin: '0 10px',
  },
}));

export function PaperContainer({ children }) {
  return (
    <Grid container>
      <Grid item xs={false} sm={1} md={2} lg={3} xl={4} />
      <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
        <Paper elevation={3} style={{ padding: '5px 0', marginBottom: 5 }}>
          {children}
        </Paper>
      </Grid>
      <Grid item xs={false} sm={1} md={2} lg={3} xl={4} />
    </Grid>
  );
}

export function CenteredBox({ children }) {
  const classes = useStyles();
  return <Box className={classes.centeredBox}>{children}</Box>;
}
