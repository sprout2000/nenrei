import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Titlebar from './Titlebar';
import Icon from './icon-192.png';

interface BirthDay {
  year: number;
  month: number;
  date: number;
}

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
  const [day, setDay] = useState(1);

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

  const Taisyo = Wareki(1912, 1926, '大正');
  const Syowa = Wareki(1926, 1989, '昭和');
  const Heisei = Wareki(1989, 2019, '平成');

  const toggleDrawer = (open: boolean): void => {
    setDrawerOpen(open);
  };

  const birthday: BirthDay = {
    year: year,
    month: month,
    date: day,
  };

  const calcAge = (obj: BirthDay): number => {
    const birthDate = new Date(obj.year, obj.month - 1, obj.date);

    const y2 = birthDate
      .getFullYear()
      .toString()
      .padStart(4, '0');
    const m2 = (birthDate.getMonth() + 1).toString().padStart(2, '0');
    const d2 = birthDate
      .getDate()
      .toString()
      .padStart(2, '0');

    const today = new Date();

    const y1 = today
      .getFullYear()
      .toString()
      .padStart(4, '0');
    const m1 = (today.getMonth() + 1).toString().padStart(2, '0');
    const d1 = today
      .getDate()
      .toString()
      .padStart(2, '0');

    const age = Math.floor(
      (Number(y1 + m1 + d1) - Number(y2 + m2 + d2)) / 10000
    );

    return age;
  };

  const age = calcAge(birthday);

  const uru = [
    1912,
    1916,
    1920,
    1924,
    1928,
    1932,
    1936,
    1940,
    1944,
    1948,
    1952,
    1956,
    1960,
    1964,
    1968,
    1972,
    1976,
    1980,
    1984,
    1988,
    1992,
    1996,
    2000,
    2004,
    2008,
    2012,
    2016,
  ];
  const isUru = uru.includes(year);

  const samurai = [2, 4, 6, 9, 11];
  const isSam = samurai.includes(month);
  const isFeb = month === 2;

  if (isFeb && !isUru && day > 28) {
    setDay(28);
  } else if (isFeb && day > 29) {
    setDay(29);
  } else if (isSam && day > 30) {
    setDay(30);
  }

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
            <div className={classes.label}>生年月日</div>
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
                  <MenuItem value={1}>1月</MenuItem>
                  <MenuItem value={2}>2月</MenuItem>
                  <MenuItem value={3}>3月</MenuItem>
                  <MenuItem value={4}>4月</MenuItem>
                  <MenuItem value={5}>5月</MenuItem>
                  <MenuItem value={6}>6月</MenuItem>
                  <MenuItem value={7}>7月</MenuItem>
                  <MenuItem value={8}>8月</MenuItem>
                  <MenuItem value={9}>9月</MenuItem>
                  <MenuItem value={10}>10月</MenuItem>
                  <MenuItem value={11}>11月</MenuItem>
                  <MenuItem value={12}>12月</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.form}>
                <Select
                  className={classes.select}
                  value={day}
                  onChange={(e): void => setDay(e.target.value as number)}>
                  <MenuItem value={1}>1日</MenuItem>
                  <MenuItem value={2}>2日</MenuItem>
                  <MenuItem value={3}>3日</MenuItem>
                  <MenuItem value={4}>4日</MenuItem>
                  <MenuItem value={5}>5日</MenuItem>
                  <MenuItem value={6}>6日</MenuItem>
                  <MenuItem value={7}>7日</MenuItem>
                  <MenuItem value={8}>8日</MenuItem>
                  <MenuItem value={9}>9日</MenuItem>
                  <MenuItem value={10}>10日</MenuItem>
                  <MenuItem value={11}>11日</MenuItem>
                  <MenuItem value={12}>12日</MenuItem>
                  <MenuItem value={13}>13日</MenuItem>
                  <MenuItem value={14}>14日</MenuItem>
                  <MenuItem value={15}>15日</MenuItem>
                  <MenuItem value={16}>16日</MenuItem>
                  <MenuItem value={17}>17日</MenuItem>
                  <MenuItem value={18}>18日</MenuItem>
                  <MenuItem value={19}>19日</MenuItem>
                  <MenuItem value={20}>20日</MenuItem>
                  <MenuItem value={21}>21日</MenuItem>
                  <MenuItem value={22}>22日</MenuItem>
                  <MenuItem value={23}>23日</MenuItem>
                  <MenuItem value={24}>24日</MenuItem>
                  <MenuItem value={25}>25日</MenuItem>
                  <MenuItem value={26}>26日</MenuItem>
                  <MenuItem value={27}>27日</MenuItem>
                  <MenuItem value={28}>28日</MenuItem>
                  {isFeb && !isUru ? (
                    undefined
                  ) : (
                    <MenuItem value={29}>29日</MenuItem>
                  )}
                  {isFeb ? undefined : <MenuItem value={30}>30日</MenuItem>}
                  {isFeb || isSam ? (
                    undefined
                  ) : (
                    <MenuItem value={31}>31日</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.answer}>年齢</div>
            <span className={classes.age}>{age}</span>歳
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
