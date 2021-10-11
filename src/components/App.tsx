import localforage from 'localforage';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import GlobalStyles from '@mui/material/GlobalStyles';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import { QR } from './QR';
import { SideBar } from './SideBar';
import { TitleBar } from './TitleBar';

import icon64 from '../icons/icon-64.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const typeguardStorage = (arg: any): arg is Storage => {
  return (
    arg !== null &&
    typeof arg === 'object' &&
    typeof arg.year === 'number' &&
    typeof arg.month === 'number'
  );
};

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Container = styled('div')({
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const Icon = styled('div')({
  margin: '0 auto',
  padding: 0,
});

const CardDiv = styled(Card)({
  margin: '1em auto',
  width: '80vw',
  maxWidth: 400,
  color: '#666',
});

const Label = styled(Typography)({
  fontWeight: 'bold',
  color: 'rgb(0, 122, 255)',
  letterSpacing: '0.25em',
  userSelect: 'none',
});

const FormContainer = styled(FormControl)({
  minWidth: 250,
  padding: 10,
});

const Selector = styled(Select)({
  minWidth: 200,
});

const Answer = styled(Typography)({
  fontWeight: 'bold',
  color: 'rgb(255, 45, 85)',
  letterSpacing: '0.25em',
});

const Age = styled('span')({
  fontSize: '6em',
  color: '#1f1f21',
});

const Eto = styled('span')({
  userSelect: 'text',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff375f',
    },
  },
});

export const App: React.FC = () => {
  const [year, setYear] = useState(1989);
  const [month, setMonth] = useState(4);
  const [qrOpen, setQrOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const calc = (y: number, m: number): number => {
    const birthday = y * 10000 + m * 100 + 1;
    const today = new Date();
    const target =
      today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + 1;

    return Math.floor((target - birthday) / 10000);
  };

  const eto = (y: number): string => {
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

      items.push(
        <MenuItem key={i} value={i}>
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
      items.push(
        <MenuItem key={i} value={i}>
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

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const openQR = () => setQrOpen(true);
  const closeQR = () => setQrOpen(false);

  useEffect(() => {
    localforage
      .getItem('nenrei-20211001')
      .then((value) => {
        if (!value || !typeguardStorage(value)) {
          setYear(1989);
          setMonth(4);
        } else {
          setYear(value.year);
          setMonth(value.month);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    localforage
      .setItem('nenrei-20211001', { year, month })
      .catch((err) => console.error(err));
  }, [year, month]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          html: {
            height: '100%',
          },
          body: {
            margin: 0,
            padding: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
            height: '100%',
          },
          '#root': {
            margin: 0,
            padding: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
            height: '100%',
            backgroundColor: '#efeff4',
            position: 'relative',
            overflow: 'hidden',
          },
        }}
      />
      <QR qrOpen={qrOpen} onClose={closeQR} />
      <SideBar
        drawerOpen={drawerOpen}
        onQROpen={openQR}
        toggleDrawer={toggleDrawer}
      />
      <TitleBar toggleDrawer={toggleDrawer} />
      <Container>
        <Offset />
        <Icon>
          <img src={icon64} width={64} height={64} alt="年齢計算" />
        </Icon>
        <CardDiv>
          <CardContent>
            <Label>生まれ年と月</Label>
            <div>
              <FormContainer variant="outlined">
                <Selector
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  {Years}
                </Selector>
              </FormContainer>
            </div>
            <div>
              <FormContainer variant="outlined">
                <Selector
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                >
                  {Months}
                </Selector>
              </FormContainer>
            </div>
          </CardContent>
        </CardDiv>
        <CardDiv>
          <CardContent>
            <Answer>年齢</Answer>
            <Typography>
              満<Age>{calc(year, month)}</Age>歳
            </Typography>
            <Typography>
              <Eto>{eto(year)}</Eto>
            </Typography>
          </CardContent>
        </CardDiv>
      </Container>
    </ThemeProvider>
  );
};
