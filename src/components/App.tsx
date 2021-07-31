import React, { useEffect, useReducer, createContext } from 'react';
import localforage from 'localforage';

import {
  createStyles,
  makeStyles,
  ThemeProvider,
  createTheme,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { QR } from './QR';
import { Snack } from './Snack';
import { SideBar } from './SideBar';
import { TitleBar } from './TitleBar';

import { State } from '../lib/State';
import { Action } from '../lib/Action';
import { reducer } from '../lib/reducer';
import { initialState } from '../lib/initialState';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const typeguardStorage = (arg: any): arg is Storage => {
  return (
    arg !== null &&
    typeof arg === 'object' &&
    typeof arg.year === 'number' &&
    typeof arg.month === 'number'
  );
};

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          margin: 0,
          padding: 0,
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitTapHighlightColor: 'transparent !important',
          height: '100%',
        },
        body: {
          height: '100%',
        },
        '#root': {
          height: '100%',
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) =>
  createStyles({
    offset: theme.mixins.toolbar,
    root: {
      margin: 0,
      padding: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
      height: '100%',
      backgroundColor: '#efeff4',
      position: 'relative',
      overflow: 'hidden',
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
    eto: {
      userSelect: 'text',
    },
  })
);

export const calc = (y: number, m: number): number => {
  const birthday = y * 10000 + m * 100 + 1;
  const today = new Date();
  const target = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + 1;

  return Math.floor((target - birthday) / 10000);
};

export const eto = (y: number): string => {
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

  return `${es[y % 10]}${tos[y % 12]}`;
};

export const AppContext = createContext(
  {} as {
    state: State;
    dispatch: React.Dispatch<Action>;
  }
);

export const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();

  const Wareki = (start: number, end: number): JSX.Element[] => {
    const items = [];

    for (let i = start; i <= end; i++) {
      let gengo = '';
      let offset = 0;

      if (i < 1926) {
        gengo = '大正';
        offset = 1911;
      } else if (i < 1989) {
        gengo = '昭和';
        offset = 1925;
      } else if (i < 2019) {
        gengo = '平成';
        offset = 1988;
      } else {
        gengo = '令和';
        offset = 2018;
      }
      const wareki = i - offset;

      const dataE2E = i === 1971 ? 'year' : '';

      items.push(
        <MenuItem key={i} value={i} data-e2e={dataE2E}>
          <Typography>
            {gengo}
            {wareki === 1 ? '元' : wareki}年 ({i})
          </Typography>
        </MenuItem>
      );
    }

    return items;
  };

  const Tsuki = (): JSX.Element[] => {
    const items = [];

    for (let i = 1; i <= 12; i++) {
      const dataE2E = i === 1 ? 'month' : '';
      items.push(
        <MenuItem key={i} value={i} data-e2e={dataE2E}>
          <Typography>{i}月</Typography>
        </MenuItem>
      );
    }

    return items;
  };

  const Years = Wareki(
    new Date().getFullYear() - 100,
    new Date().getFullYear()
  );
  const Months = Tsuki();

  useEffect(() => {
    localforage
      .getItem('nenrei-20210401')
      .then((value) => {
        if (!value || !typeguardStorage(value)) {
          dispatch({ type: 'year', value: 1989 });
          dispatch({ type: 'month', value: 4 });
        } else {
          dispatch({ type: 'year', value: value.year });
          dispatch({ type: 'month', value: value.month });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    localforage
      .setItem('nenrei-20210401', { year: state.year, month: state.month })
      .catch((err) => console.error(err));
  }, [state.month, state.year]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <CssBaseline />
          <QR />
          <TitleBar />
          <SideBar />
          <div className={classes.content}>
            <div className={classes.offset} />
            <div className={classes.icon}>
              <img src="./icon-288.png" width={96} height={96} alt="年齢計算" />
            </div>
            <Snack />
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.label}>生まれ年と月</Typography>
                <div>
                  <FormControl variant="outlined" className={classes.form}>
                    <Select
                      data-e2e="year-selector"
                      className={classes.select}
                      value={state.year}
                      onChange={(e) => {
                        dispatch({
                          type: 'year',
                          value: Number(e.target.value),
                        });
                      }}
                    >
                      {Years}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl variant="outlined" className={classes.form}>
                    <Select
                      data-e2e="month-selector"
                      className={classes.select}
                      value={state.month}
                      onChange={(e) => {
                        dispatch({
                          type: 'month',
                          value: Number(e.target.value),
                        });
                      }}
                    >
                      {Months}
                    </Select>
                  </FormControl>
                </div>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.answer}>年齢</Typography>
                <Typography>
                  満
                  <span className={classes.age}>
                    <span data-e2e="age">{calc(state.year, state.month)}</span>
                  </span>
                  歳
                </Typography>
                <Typography>
                  <span className={classes.eto}>
                    <span data-e2e="eto">{eto(state.year)}</span>
                  </span>
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
};
