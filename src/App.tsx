import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import localforage from 'localforage';

/** Styles */
import CssBaseline from '@material-ui/core/CssBaseline';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';

/** Common components */
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

/** Form (Select) */
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

/** Snackbar */
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Slide, { SlideProps } from '@material-ui/core/Slide';

/** App Shell for PWA */
import TitleBar from './TitleBar';
import SideBar from './SideBar';

import 'typeface-roboto-mono';
import './App.css';

type TransitionProps = Omit<SlideProps, 'direction'>;

const TransitionDown = (props: TransitionProps): JSX.Element => (
  <Slide {...props} direction="down" />
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const typeguardStorage = (arg: any): arg is Storage => {
  return (
    arg !== null && typeof arg === 'object' && typeof arg.year === 'number'
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    offset: theme.mixins.toolbar,
    root: {
      margin: 0,
      padding: 0,
      height: '100%',
      backgroundColor: '#efeff4',
      position: 'relative',
    },
    icon: {
      margin: '0 auto',
      padding: 0,
    },
    content: {
      textAlign: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
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
  })
);

const App = (): JSX.Element => {
  const classes = useStyles();

  const [year, setYear] = useState(1971);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const toggleDrawer = (): void => setDrawerOpen(!drawerOpen);

  const onClickOpen = (): void => setSnackOpen(true);
  const onClose = (_event?: React.SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  const action = (
    <Button color="secondary" size="small" onClick={onClose}>
      OK
    </Button>
  );

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

  const Taisyo = Wareki(1912, 1926, '大正');
  const Syowa = Wareki(1926, 1989, '昭和');
  const Heisei = Wareki(1989, 2019, '平成');
  const Reiwa = Wareki(2019, 2031, '令和');

  const calc = (seireki: number): number => {
    const today = new Date();
    const answer = today.getFullYear() - seireki;

    return answer;
  };

  const eto = (seireki: number): string => {
    const es = ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'];
    const tos = [
      '申（さる）',
      '酉（とり）',
      '戌（いぬ）',
      '亥（いのしし）',
      '子（ねずみ）',
      '丑（うし）',
      '寅（とら）',
      '卯（うさぎ）',
      '辰（たつ）',
      '巳（へび）',
      '午（うま）',
      '未（ひつじ）',
    ];

    return `${es[seireki % 10]}${tos[seireki % 12]}`;
  };

  const handleOnChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ): void => {
    if (e.target) {
      setYear(Number(e.target.value));
    }
  };

  useEffect(() => {
    localforage
      .getItem('nenrei-20200401')
      .then((value) => {
        if (!value || !typeguardStorage(value)) {
          setYear(1971);
        } else {
          setYear(value.year);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    localforage
      .setItem('nenrei-20200401', { year: year })
      .catch((err) => console.error(err));
  }, [year]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TitleBar toggleDrawer={toggleDrawer} />
      <SideBar
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
        dialogOpen={onClickOpen}
      />
      <div className={classes.content}>
        <div className={classes.offset} />
        <div className={classes.icon}>
          <img src="icons/icon-192.png" width={64} height={64} alt="年齢計算" />
        </div>
        <Snackbar
          open={snackOpen}
          TransitionComponent={TransitionDown}
          autoHideDuration={3000}
          onClose={onClose}>
          <SnackbarContent
            message="Copyright (C) 2020 Office Nishigami."
            action={action}
          />
        </Snackbar>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.label}>生まれ年</Typography>
            <div>
              <FormControl variant="outlined" className={classes.form}>
                <Select
                  className={classes.select}
                  value={year}
                  onChange={handleOnChange}>
                  <MenuItem value={1912}>
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
                  {Reiwa}
                </Select>
              </FormControl>
            </div>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.answer}>年齢</Typography>
            <Typography>
              満<span className={classes.age}>{calc(year)}</span>歳
            </Typography>
            <Typography>
              <span>{eto(year)}</span>
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
