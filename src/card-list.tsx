import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Card from './card';
import Typography from '@material-ui/core/Typography';
import {menus} from './utils';

const useStyles = makeStyles(theme => ({
  cardList: {
    marginTop: 88,
    paddingBottom: 25,
    minWidth: 1120,
    maxWidth: 1120,
    margin: 'auto'
  },
  cardTitle: {
    marginBottom: '0.65rem'
  }
}));

export default function CardList() {
  const classes = useStyles();
  return (
    <Grid container item
    direction="column"
    alignItems="stretch"
    className={classes.cardList}>
      {
        menus.map((props: any, idx: number) => (
          // <ExpandCard key={idx} title={props.name}>
            <Grid key={idx}
            container item
            justify="space-between"
            alignItems="stretch">
              <Typography className={classes.cardTitle} id={props.id} variant="h5">
                {props.name}
              </Typography>
              <Grid container >
                <>
                {
                  props.items && props.items.length > 0 && props.items.map((properties: any, idx: number) => (
                    <Card key={idx} properties={properties}/>
                  ))
                }
                </>
              </Grid>
            </Grid>
          // </ExpandCard>
        ))
      }
    </Grid>
  );
}