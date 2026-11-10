import { useMemo, useState } from 'react';
import DatePicker from './components/DatePicker';
import Menu from './components/Menu';
import { MIN_DATE, calcAge, eto, parseISO, toISO, toWareki, today, type YMD } from './lib/calendar';

const STORAGE_KEY = 'birthdate';

/** 初期値: 現在50歳で4月1日生まれの人の生年月日 */
function defaultBirth(): string {
  const n = today();
  const passed = n.m > 4 || (n.m === 4 && n.d >= 1);
  return toISO({ y: n.y - 50 - (passed ? 0 : 1), m: 4, d: 1 });
}

function load(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? defaultBirth();
  } catch {
    return defaultBirth();
  }
}

function save(v: string) {
  try {
    localStorage.setItem(STORAGE_KEY, v);
  } catch {
    /* 保存できない環境では無視 */
  }
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function Info({ title, date }: { title: string; date: YMD }) {
  const e = eto(date.y);
  return (
    <section className="card">
      <h2>{title}</h2>
      <dl>
        <Row label="西暦" value={`${date.y}年${date.m}月${date.d}日`} />
        <Row label="和暦" value={`${toWareki(date) ?? '—'}${date.m}月${date.d}日`} />
        <Row label="干支" value={`${e.kanshi}（${e.branch}・${e.animal}）`} />
      </dl>
    </section>
  );
}

export default function App() {
  const [value, setValue] = useState(load);

  const now = today();
  const nowISO = toISO(now);
  const birth = useMemo(() => parseISO(value), [value]);
  const valid = birth !== null && value >= MIN_DATE && value <= nowISO;

  const onChange = (v: string) => {
    setValue(v);
    save(v);
  };

  return (
    <main className="app">
      <Menu />
      <header className="head">
        <img src={`${import.meta.env.BASE_URL}icon-192.png`} alt="" width={72} height={72} />
        <h1>年齢計算</h1>
      </header>

      <section className="card">
        <div className="label-row">
          <label htmlFor="birth">生年月日</label>
          <span className="hint">タップして選択</span>
        </div>
        <DatePicker id="birth" value={value} min={MIN_DATE} max={nowISO} onChange={onChange} />
        {value && !valid && (
          <p className="error">明治元年（1868年1月25日）から今日までの日付を選んでください。</p>
        )}
      </section>

      {valid && birth && (
        <>
          <section className="card hero">
            <div className="age">
              <span className="num">{calcAge(birth, now)}</span>
              <span className="unit">歳</span>
            </div>
            <p>数え年 {now.y - birth.y + 1}歳</p>
          </section>
          <Info title="生まれた日" date={birth} />
          <p className="note">干支は立春ではなく、1月1日で切り替わる暦年で計算しています。</p>
        </>
      )}
    </main>
  );
}
