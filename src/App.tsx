import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

/** Styles */
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';

/** Common components */
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

/** Card */
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

/** Form (Select) */
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

/** App Shell for PWA */
import Header from './Header';
import SideBar from './SideBar';

const useStyles = makeStyles(() =>
  createStyles({
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
      padding: '1em 0',
    },
    card: {
      margin: '1em auto',
      width: '80vw',
      maxWidth: 400,
      color: '#666',
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
    month: {
      fontSize: '3em',
      color: '#1f1f21',
    },
  })
);

const App = (): JSX.Element => {
  const classes = useStyles();

  const [year, setYear] = useState(1955);
  const [month, setMonth] = useState(4);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (): void => setDrawerOpen(!drawerOpen);

  const Wareki = (start: number, end: number, gengo: string): JSX.Element[] => {
    const items = [];
    for (let i = start + 1; i < end; i++) {
      const key = gengo + i;
      items.push(
        <MenuItem key={key} value={i}>
          <Typography>
            {gengo}
            {i - start + 1}年 ({i})
          </Typography>
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
          <Typography>{i}月</Typography>
        </MenuItem>
      );
    }

    return items;
  };

  const Taisyo = Wareki(1912, 1926, '大正');
  const Syowa = Wareki(1926, 1989, '昭和');
  const Heisei = Wareki(1989, 2019, '平成');
  const monthItems = Tsuki();

  const birthday = moment(`${year}-${month}`, 'YYYY-MM');
  const today = moment();
  const age = today.diff(birthday, 'years');

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header toggleDrawer={toggleDrawer} />
      <SideBar toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
      <div className={classes.content}>
        <div className={classes.icon}>
          <img src='icons/icon-192.png' width={64} height={64} alt='年齢計算' />
        </div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.label}>生まれ年と月</Typography>
            <div>
              <FormControl variant='outlined' className={classes.form}>
                <Select
                  className={classes.select}
                  value={year}
                  onChange={(e): void => setYear(e.target.value as number)}>
                  <MenuItem value={1926}>
                    <Typography>大正元年 (1912)</Typography>
                  </MenuItem>
                  {Taisyo}
                  <MenuItem value={1926}>
                    <Typography>大正15年,昭和元年 (1926)</Typography>
                  </MenuItem>
                  {Syowa}
                  <MenuItem value={1989}>
                    <Typography>昭和64年,平成元年 (1989)</Typography>
                  </MenuItem>
                  {Heisei}
                  <MenuItem value={2019}>
                    <Typography>平成31年,令和元年 (2019)</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl variant='outlined' className={classes.form}>
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
            <Typography className={classes.answer}>年齢</Typography>
            <Typography>
              満<span className={classes.age}>{age}</span>歳
            </Typography>
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
