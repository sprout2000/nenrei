import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Titlebar from './Titlebar';
import Icon from './icon-192.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      html: {
        margin: 0,
        padding: 0,
      },
      body: {
        margin: 0,
        padding: 0,
        backgroundColor: '#efeff4',
      },
      '#root': {
        margin: 0,
        padding: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    root: {
      margin: 0,
      padding: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
    },
    icon: {
      margin: '0 auto',
      padding: 0,
    },
    content: {
      textAlign: 'center',
    },
    card: {
      margin: '1em auto',
      width: '80vw',
      maxWidth: 400,
    },
    label: {
      fontWeight: 'bold',
      color: 'rgb(0, 122, 255)',
      letterSpacing: '0.25em',
      userSelect: 'none',
    },
    form: {
      minWidth: 250,
      padding: 10,
    },
    select: {
      minWidth: 200,
    },
    answer: {
      fontWeight: 'bold',
      color: 'rgb(255, 45, 85)',
      letterSpacing: '0.25em',
    },
    age: {
      fontSize: '6em',
      color: '#1f1f21',
    },
  })
);

const App = (): JSX.Element => {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [year, setYear] = useState(1955);
  const [month, setMonth] = useState(4);

  const toggleDrawer = (open: boolean): void => {
    setDrawerOpen(open);
  };

  const Wareki = (
    start: number,
    end: number,
    wareki: string
  ): JSX.Element[] => {
    const items = [];
    for (let i = start + 1; i < end; i++) {
      const key = wareki + i;
      items.push(
        <MenuItem key={key} value={i}>
          {wareki}
          {i - start + 1}年 ({i})
        </MenuItem>
      );
    }

    return items;
  };

  const Tsuki = (): JSX.Element[] => {
    const items = [];
    for (let i = 1; i <= 12; i++) {
      items.push(
        <MenuItem key={i} value={i}>
          {i}月
        </MenuItem>
      );
    }

    return items;
  };

  const Taisyo = Wareki(1912, 1926, '大正');
  const Syowa = Wareki(1926, 1989, '昭和');
  const Heisei = Wareki(1989, 2019, '平成');
  const monthItems = Tsuki();

  const birthday = moment(`${year}-${month}-01`, 'YYYY-MM-DD');
  const today = moment();
  const y = today.diff(birthday, 'years');
  const m = Math.floor(moment.duration(today.diff(birthday)).as('months') % 12);

  return (
    <div className={classes.root}>
      <Titlebar toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <div className={classes.icon}>
          <img src={Icon} width={64} height={64} alt="年齢計算" />
        </div>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.label}>生まれ年と月</div>
            <div>
              <FormControl className={classes.form}>
                <Select
                  className={classes.select}
                  value={year}
                  onChange={(e): void => setYear(e.target.value as number)}>
                  <MenuItem value={1926}>大正元年 (1912)</MenuItem>
                  {Taisyo}
                  <MenuItem value={1926}>大正15年,昭和元年 (1926)</MenuItem>
                  {Syowa}
                  <MenuItem value={1989}>昭和64年,平成元年 (1989)</MenuItem>
                  {Heisei}
                  <MenuItem value={2019}>平成31年, 令和元年 (2019)</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.form}>
                <Select
                  className={classes.select}
                  value={month}
                  onChange={(e): void => setMonth(e.target.value as number)}>
                  {monthItems}
                </Select>
              </FormControl>
            </div>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.answer}>年齢</div>
            <span className={classes.age}>{y}</span>歳
            <span className={classes.age}>{m}</span>ヶ月
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
