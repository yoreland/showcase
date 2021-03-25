import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const cardHeight = 300;

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingBottom: 25
  },
  cardGutter: {
    marginBottom: 35,
  },
  card: {
    maxHeight: cardHeight,
    maxWidth: 240,
    minHeight: cardHeight,
    minWidth: 240,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 25,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 8px 0px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 3px 3px -2px"
    }
    // boxShadow: {}
  },
  button: {
    borderColor: '#3ab7f8',
    color: '#3ab7f8',
    minWidth: 170,
    maxWidth: 170,
    minHeight: 39,
    maxHeight: 39,
    // fontSize: 18,
    letterSpacing: 0.4,
    '&:hover': {
      borderColor: '#006ad8',
      color: '#006ad8',
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  gridContainer: {
    paddingLeft: 33,
    paddingRight: 33,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  gridContentContainer: {
    flex: 1,
    minHeight: 175,
    maxHeight: 175,
    textAlign: 'center'
  }
}));

interface CardProps {
  properties: {
    name: string,
    desc: string,
    link: string
    logo: string
  }
}

export default function CardContainer({ properties }: CardProps) {
  const classes = useStyles();
  return (
    <Grid container item xs={3}
        direction="column"
        className={classes.cardGutter}
      >
      <Card className={classes.card}>
        {/* <CardContent> */}
          <Grid container 
          className={classes.gridContainer}
          direction="row"
          justify="center">
            <Typography variant="h6">
              {properties.name}
            </Typography>
            <Grid className={classes.gridContentContainer} container item justify="center" alignItems="flex-start">
              <i className={`iconfont ${properties.logo}`} />
              <Typography paragraph color="textSecondary" variant="body2">
                {properties.desc}
              </Typography>
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" onClick={() => {
            window.open(properties.link);
          }}>SHOW CASE</Button>
          </Grid>
        {/* </CardContent> */}
      </Card>
    </Grid>
  );
}