import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { categories, scrollTo } from 'utils';
import { style } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  gridGrow: {
    display: 'flex',
    flexDirection: 'row',
    justifyItems: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  title: {
    color: '#34495E'
  },
  appbarContentBox: {
    minWidth: 1185,
    margin: 'auto'
  },
  toolbar: {
    paddingRight: 48
  },
  agoraTheme: {
    cursor: 'pointer',
    backgroundColor: '#ffffff'
  },
}));

export default function NavAppBar() {
  const classes = useStyles();

  const handleBtnClick = (link: string) => (evt: any) => {
    evt.stopPropagation();
    scrollTo(link)
  }

  const handleBarClick = (evt: any) => {
    evt.preventDefault();
    if (window.pageYOffset > 0) {
      const height = `${window.innerHeight}px`;
      (document.querySelector("body") as HTMLElement).style.height = height;
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.agoraTheme} onClick={handleBarClick}>
        <div className={classes.appbarContentBox}>
          <Toolbar className={classes.toolbar}>
          {/* <Sidebar></Sidebar> */}
          <Grid container item
            direction="row"
            justify="flex-start"
            alignItems="center"
            >
            <i className="logo"></i>
            <Typography variant="h6" className={classes.title}>
              Agora Web Demo Example
            </Typography>
          </Grid>
          <Grid container
            item
            direction="row"
            justify="flex-end"
            alignContent="space-around"
          >
          {
            categories.map(({ name, link }, idx: number) => (
              <Button className={classes.menuButton} key={idx}  size="small" color="primary" onClick={handleBtnClick(link)}>
                {name}
              </Button>
            ))
          }
          </Grid>
        </Toolbar>
        </div>
      </AppBar>
    </div>
  );
}