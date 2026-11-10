import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const SHARE_URL = 'https://sprout2000.github.io/nenrei';
const ICON = `${import.meta.env.BASE_URL}icon-192.png`;

export default function Menu() {
  const [open, setOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (!open && !showQR) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setShowQR(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, showQR]);

  return (
    <>
      <button
        type="button"
        className="menu-btn"
        aria-label="メニューを開く"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="drawer-backdrop" onClick={() => setOpen(false)}>
          <nav
            className="drawer"
            role="dialog"
            aria-label="メニュー"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="banner">
              <img src={ICON} alt="" width={56} height={56} />
              <div>
                <div className="banner-title">年齢計算</div>
                <div className="banner-version">バージョン {__APP_VERSION__}</div>
              </div>
            </div>
            <ul className="menu-list">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setShowQR(true);
                  }}
                >
                  このアプリを共有
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {showQR && (
        <div className="modal-backdrop" onClick={() => setShowQR(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="このアプリを共有"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>このアプリを共有</h2>
            <QRCodeSVG value={SHARE_URL} size={220} marginSize={4} />
            <p className="modal-url">{SHARE_URL}</p>
            <button type="button" onClick={() => setShowQR(false)}>
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
}
