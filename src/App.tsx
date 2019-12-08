import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Titlebar from './Titlebar';
import Icon from './icon-144.png';
import './index.css';

interface BirthDay {
  year: number;
  month: number;
  date: number;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: 0,
      padding: 0,
      height: '100%',
      overflow: 'hidden',
      backgroundColor: '#f5f5f5',
      fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
    },
    icon: {
      margin: '0 auto',
      padding: 0,
    },
    content: {
      textAlign: 'center',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
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
    <React.Fragment>
      <div className={classes.root}>
        <Titlebar toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
        <div className={classes.content}>
          <div className={classes.icon}>
            <img src={Icon} width={64} height={64} alt="年齢計算" />
          </div>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.label}>生年月日</div>
              <FormControl className={classes.form}>
                <Select
                  value={year}
                  onChange={(e): void => setYear(e.target.value as number)}>
                  <MenuItem value={1912}>大正元年 (1912)</MenuItem>
                  <MenuItem value={1913}>大正2年 (1913)</MenuItem>
                  <MenuItem value={1914}>大正3年 (1914)</MenuItem>
                  <MenuItem value={1915}>大正4年 (1915)</MenuItem>
                  <MenuItem value={1916}>大正5年 (1916)</MenuItem>
                  <MenuItem value={1917}>大正6年 (1917)</MenuItem>
                  <MenuItem value={1918}>大正7年 (1918)</MenuItem>
                  <MenuItem value={1919}>大正8年 (1919)</MenuItem>
                  <MenuItem value={1920}>大正9年 (1920)</MenuItem>
                  <MenuItem value={1921}>大正10年 (1921)</MenuItem>
                  <MenuItem value={1922}>大正11年 (1922)</MenuItem>
                  <MenuItem value={1923}>大正12年 (1923)</MenuItem>
                  <MenuItem value={1924}>大正13年 (1924)</MenuItem>
                  <MenuItem value={1925}>大正14年 (1925)</MenuItem>
                  <MenuItem value={1926}>大正15年, 昭和元年 (1926)</MenuItem>
                  <MenuItem value={1927}>昭和2年 (1927)</MenuItem>
                  <MenuItem value={1928}>昭和3年 (1928)</MenuItem>
                  <MenuItem value={1929}>昭和4年 (1929)</MenuItem>
                  <MenuItem value={1930}>昭和5年 (1930)</MenuItem>
                  <MenuItem value={1931}>昭和6年 (1931)</MenuItem>
                  <MenuItem value={1932}>昭和7年 (1932)</MenuItem>
                  <MenuItem value={1933}>昭和8年 (1933)</MenuItem>
                  <MenuItem value={1934}>昭和9年 (1934)</MenuItem>
                  <MenuItem value={1935}>昭和10年 (1935)</MenuItem>
                  <MenuItem value={1936}>昭和11年 (1936)</MenuItem>
                  <MenuItem value={1937}>昭和12年 (1937)</MenuItem>
                  <MenuItem value={1938}>昭和13年 (1938)</MenuItem>
                  <MenuItem value={1939}>昭和14年 (1939)</MenuItem>
                  <MenuItem value={1940}>昭和15年 (1940)</MenuItem>
                  <MenuItem value={1941}>昭和16年 (1941)</MenuItem>
                  <MenuItem value={1942}>昭和17年 (1942)</MenuItem>
                  <MenuItem value={1943}>昭和18年 (1943)</MenuItem>
                  <MenuItem value={1944}>昭和19年 (1944)</MenuItem>
                  <MenuItem value={1945}>昭和20年 (1945)</MenuItem>
                  <MenuItem value={1946}>昭和21年 (1946)</MenuItem>
                  <MenuItem value={1947}>昭和22年 (1947)</MenuItem>
                  <MenuItem value={1948}>昭和23年 (1948)</MenuItem>
                  <MenuItem value={1949}>昭和24年 (1949)</MenuItem>
                  <MenuItem value={1950}>昭和25年 (1950)</MenuItem>
                  <MenuItem value={1951}>昭和26年 (1951)</MenuItem>
                  <MenuItem value={1952}>昭和27年 (1952)</MenuItem>
                  <MenuItem value={1953}>昭和28年 (1953)</MenuItem>
                  <MenuItem value={1954}>昭和29年 (1954)</MenuItem>
                  <MenuItem value={1955}>昭和30年 (1955)</MenuItem>
                  <MenuItem value={1956}>昭和31年 (1956)</MenuItem>
                  <MenuItem value={1957}>昭和32年 (1957)</MenuItem>
                  <MenuItem value={1958}>昭和33年 (1958)</MenuItem>
                  <MenuItem value={1959}>昭和34年 (1959)</MenuItem>
                  <MenuItem value={1960}>昭和35年 (1960)</MenuItem>
                  <MenuItem value={1961}>昭和36年 (1961)</MenuItem>
                  <MenuItem value={1962}>昭和37年 (1962)</MenuItem>
                  <MenuItem value={1963}>昭和38年 (1963)</MenuItem>
                  <MenuItem value={1964}>昭和39年 (1964)</MenuItem>
                  <MenuItem value={1965}>昭和40年 (1965)</MenuItem>
                  <MenuItem value={1966}>昭和41年 (1966)</MenuItem>
                  <MenuItem value={1967}>昭和42年 (1967)</MenuItem>
                  <MenuItem value={1968}>昭和43年 (1968)</MenuItem>
                  <MenuItem value={1969}>昭和44年 (1969)</MenuItem>
                  <MenuItem value={1970}>昭和45年 (1970)</MenuItem>
                  <MenuItem value={1971}>昭和46年 (1971)</MenuItem>
                  <MenuItem value={1972}>昭和47年 (1972)</MenuItem>
                  <MenuItem value={1973}>昭和48年 (1973)</MenuItem>
                  <MenuItem value={1974}>昭和49年 (1974)</MenuItem>
                  <MenuItem value={1975}>昭和50年 (1975)</MenuItem>
                  <MenuItem value={1976}>昭和51年 (1976)</MenuItem>
                  <MenuItem value={1977}>昭和52年 (1977)</MenuItem>
                  <MenuItem value={1978}>昭和53年 (1978)</MenuItem>
                  <MenuItem value={1979}>昭和54年 (1979)</MenuItem>
                  <MenuItem value={1980}>昭和55年 (1980)</MenuItem>
                  <MenuItem value={1981}>昭和56年 (1981)</MenuItem>
                  <MenuItem value={1982}>昭和57年 (1982)</MenuItem>
                  <MenuItem value={1983}>昭和58年 (1983)</MenuItem>
                  <MenuItem value={1984}>昭和59年 (1984)</MenuItem>
                  <MenuItem value={1985}>昭和60年 (1985)</MenuItem>
                  <MenuItem value={1986}>昭和61年 (1986)</MenuItem>
                  <MenuItem value={1987}>昭和62年 (1987)</MenuItem>
                  <MenuItem value={1988}>昭和63年 (1988)</MenuItem>
                  <MenuItem value={1989}>昭和64年, 平成元年 (1989)</MenuItem>
                  <MenuItem value={1990}>平成2年 (1990)</MenuItem>
                  <MenuItem value={1991}>平成3年 (1991)</MenuItem>
                  <MenuItem value={1992}>平成4年 (1992)</MenuItem>
                  <MenuItem value={1993}>平成5年 (1993)</MenuItem>
                  <MenuItem value={1994}>平成6年 (1994)</MenuItem>
                  <MenuItem value={1995}>平成7年 (1995)</MenuItem>
                  <MenuItem value={1996}>平成8年 (1996)</MenuItem>
                  <MenuItem value={1997}>平成9年 (1997)</MenuItem>
                  <MenuItem value={1998}>平成10年 (1998)</MenuItem>
                  <MenuItem value={1999}>平成11年 (1999)</MenuItem>
                  <MenuItem value={2000}>平成12年 (2000)</MenuItem>
                  <MenuItem value={2001}>平成13年 (2001)</MenuItem>
                  <MenuItem value={2002}>平成14年 (2002)</MenuItem>
                  <MenuItem value={2003}>平成15年 (2003)</MenuItem>
                  <MenuItem value={2004}>平成16年 (2004)</MenuItem>
                  <MenuItem value={2005}>平成17年 (2005)</MenuItem>
                  <MenuItem value={2006}>平成18年 (2006)</MenuItem>
                  <MenuItem value={2007}>平成19年 (2007)</MenuItem>
                  <MenuItem value={2008}>平成20年 (2008)</MenuItem>
                  <MenuItem value={2009}>平成21年 (2009)</MenuItem>
                  <MenuItem value={2010}>平成22年 (2010)</MenuItem>
                  <MenuItem value={2011}>平成23年 (2011)</MenuItem>
                  <MenuItem value={2012}>平成24年 (2012)</MenuItem>
                  <MenuItem value={2013}>平成25年 (2013)</MenuItem>
                  <MenuItem value={2014}>平成26年 (2014)</MenuItem>
                  <MenuItem value={2015}>平成27年 (2015)</MenuItem>
                  <MenuItem value={2016}>平成28年 (2016)</MenuItem>
                  <MenuItem value={2017}>平成29年 (2017)</MenuItem>
                  <MenuItem value={2018}>平成30年 (2018)</MenuItem>
                  <MenuItem value={2019}>平成31年, 令和元年 (2019)</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.form}>
                <Select
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
              <FormControl className={classes.form}>
                <Select
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
    </React.Fragment>
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
