export interface YMD {
  y: number;
  m: number;
  d: number;
}

/** 明治元年(新暦換算)の開始日。これより前は未対応 */
export const MIN_DATE = '1868-01-25';

const ERAS = [
  { name: '令和', y: 2019, m: 5, d: 1 },
  { name: '平成', y: 1989, m: 1, d: 8 },
  { name: '昭和', y: 1926, m: 12, d: 25 },
  { name: '大正', y: 1912, m: 7, d: 30 },
  { name: '明治', y: 1868, m: 1, d: 25 },
] as const;

const key = (v: YMD) => v.y * 10000 + v.m * 100 + v.d;

export const toISO = ({ y, m, d }: YMD) =>
  `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

export function parseISO(s: string): YMD | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const dt = new Date(y, mo - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return null;
  return { y, m: mo, d };
}

export function today(): YMD {
  const n = new Date();
  return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() };
}

/** 和暦表記（例: 令和元年 / 平成30年）。明治より前は null */
export function toWareki(v: YMD): string | null {
  const k = key(v);
  for (const e of ERAS) {
    if (k >= key(e)) {
      const n = v.y - e.y + 1;
      return `${e.name}${n === 1 ? '元' : n}年`;
    }
  }
  return null;
}

/** 満年齢 */
export function calcAge(birth: YMD, now: YMD): number {
  let age = now.y - birth.y;
  if (now.m < birth.m || (now.m === birth.m && now.d < birth.d)) age--;
  return age;
}

const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ANIMALS = ['ねずみ', 'うし', 'とら', 'うさぎ', 'たつ', 'へび', 'うま', 'ひつじ', 'さる', 'とり', 'いぬ', 'いのしし'];

const mod = (n: number, m: number) => ((n % m) + m) % m;

/** 西暦年から干支を求める（暦年ベース。例: 2024 → 甲辰・辰） */
export function eto(year: number) {
  const s = mod(year - 4, 10);
  const b = mod(year - 4, 12);
  return {
    kanshi: STEMS[s] + BRANCHES[b],
    branch: BRANCHES[b],
    animal: ANIMALS[b],
  };
}
