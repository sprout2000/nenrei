import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import localforage from 'localforage';

/** Styles */
import CssBaseline from '@material-ui/core/CssBaseline';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import pink from '@material-ui/core/colors/pink';

/** Common components */
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

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
    wareki: {
      fontSize: '1.25em',
      fontWeight: 'normal',
      userSelect: 'none',
      fontFamily: "'Roboto Mono', mono-space",
      padding: '2em 0',
      color: '#1f1f21',
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

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 10,
    width: '80%',
    maxWidth: '600px',
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -10,
    marginLeft: -10,
    '&:focus,&:hover,&$active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  track: {
    height: 10,
    borderRadius: 4,
    backgroundColor: pink[500],
    opacity: 0.7,
  },
  rail: {
    height: 10,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
    borderRadius: 4,
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

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

  const wareki = (seireki: number): string => {
    if (seireki === 1912) {
      return `大正元年 (${seireki})`;
    } else if (seireki <= 1925) {
      return `大正${seireki - 1911}年 (${seireki})`;
    } else if (seireki === 1926) {
      return `大正15年,昭和元年 (${seireki})`;
    } else if (seireki <= 1988) {
      return `昭和${seireki - 1925}年 (${seireki})`;
    } else if (seireki === 1989) {
      return `昭和64年,平成元年 (${seireki})`;
    } else if (seireki <= 2018) {
      return `平成${seireki - 1988}年 (${seireki})`;
    } else if (seireki === 2019) {
      return `平成31年,令和元年 (${seireki})`;
    } else {
      return `令和${seireki - 2018}年 (${seireki})`;
    }
  };

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
    e: React.ChangeEvent<{}>,
    val: number | number[]
  ): void => {
    if (e.target) {
      setYear(Number(val));
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
            <Typography className={classes.wareki}>{wareki(year)}</Typography>
            <IOSSlider
              max={2020}
              min={1912}
              step={1}
              value={year}
              onChange={(e, val): void => handleOnChange(e, val)}
            />
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
