import { useEffect, useRef, useState } from 'react';
import { parseISO, toISO, toWareki, today } from '../lib/calendar';

interface Props {
  id?: string;
  value: string; // YYYY-MM-DD
  min: string;
  max: string;
  onChange: (v: string) => void;
}

const WEEK = ['日', '月', '火', '水', '木', '金', '土'];
const monthKey = (y: number, m: number) => y * 12 + (m - 1);

export default function DatePicker({ id, value, min, max, onChange }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const selected = parseISO(value);
  const minD = parseISO(min)!;
  const maxD = parseISO(max)!;
  const minK = monthKey(minD.y, minD.m);
  const maxK = monthKey(maxD.y, maxD.m);

  const [view, setView] = useState(() => {
    const b = selected ?? today();
    return { y: b.y, m: b.m };
  });
  const curK = monthKey(view.y, view.m);

  const clamp = (k: number) => Math.min(Math.max(k, minK), maxK);
  const goto = (k: number) => {
    const c = clamp(k);
    setView({ y: Math.floor(c / 12), m: (c % 12) + 1 });
  };

  const toggle = () => {
    if (!open) {
      const b = selected ?? today();
      goto(monthKey(b.y, b.m));
    }
    setOpen(!open);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const first = new Date(view.y, view.m - 1, 1).getDay();
  const dayCount = new Date(view.y, view.m, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: first }, () => null),
    ...Array.from({ length: dayCount }, (_, i) => i + 1),
  ];
  const todayISO = toISO(today());

  const YearBtn = ({ delta, label }: { delta: number; label: string }) => (
    <button
      type="button"
      className="dp-nav-btn"
      disabled={clamp(curK + delta) === curK}
      onClick={() => goto(curK + delta)}
      aria-label={`${Math.abs(delta / 12)}年${delta < 0 ? '前' : '後'}へ`}
    >
      {label}
    </button>
  );

  const wareki = toWareki({ y: view.y, m: view.m, d: 1 });
  const triggerLabel = selected
    ? `${selected.y}年${selected.m}月${selected.d}日（${toWareki(selected) ?? '—'}）`
    : '日付を選択';

  return (
    <div className="dp" ref={rootRef}>
      <button
        id={id}
        type="button"
        className="dp-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggle}
      >
        {triggerLabel}
      </button>

      {open && (
        <div className="dp-pop" role="dialog" aria-label="カレンダー">
          <div className="dp-row">
            <YearBtn delta={-120} label="−10年" />
            <YearBtn delta={-12} label="−1年" />
            <div className="dp-title">
              {view.y}年{wareki ? <small>（{wareki}）</small> : null}
            </div>
            <YearBtn delta={12} label="+1年" />
            <YearBtn delta={120} label="+10年" />
          </div>

          <div className="dp-row">
            <button
              type="button"
              className="dp-nav-btn"
              disabled={curK <= minK}
              onClick={() => goto(curK - 1)}
              aria-label="前の月"
            >
              ‹
            </button>
            <div className="dp-title">{view.m}月</div>
            <button
              type="button"
              className="dp-nav-btn"
              disabled={curK >= maxK}
              onClick={() => goto(curK + 1)}
              aria-label="次の月"
            >
              ›
            </button>
          </div>

          <div className="dp-grid">
            {WEEK.map((w) => (
              <div key={w} className="dp-week">
                {w}
              </div>
            ))}
            {cells.map((d, i) => {
              if (d === null) return <div key={`e${i}`} />;
              const iso = toISO({ y: view.y, m: view.m, d });
              const disabled = iso < min || iso > max;
              const cls = ['dp-day', iso === value ? 'sel' : '', iso === todayISO ? 'today' : '']
                .filter(Boolean)
                .join(' ');
              return (
                <button
                  key={d}
                  type="button"
                  className={cls}
                  disabled={disabled}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
