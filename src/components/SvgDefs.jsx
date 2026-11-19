export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a6326" />
          <stop offset=".35" stopColor="#f6e3a8" />
          <stop offset=".55" stopColor="#c0964a" />
          <stop offset=".8" stopColor="#f1d796" />
          <stop offset="1" stopColor="#7d5a20" />
        </linearGradient>
        <linearGradient id="goldFrame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6b4a17" />
          <stop offset=".12" stopColor="#e9cd88" />
          <stop offset=".24" stopColor="#a77c33" />
          <stop offset=".36" stopColor="#fff0c2" />
          <stop offset=".5" stopColor="#b4873c" />
          <stop offset=".64" stopColor="#f1d796" />
          <stop offset=".78" stopColor="#8f6a25" />
          <stop offset=".9" stopColor="#e2c27a" />
          <stop offset="1" stopColor="#5e4013" />
        </linearGradient>
        <linearGradient id="goldV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8e7b0" />
          <stop offset=".5" stopColor="#d8b064" />
          <stop offset="1" stopColor="#8a6326" />
        </linearGradient>
        <linearGradient id="goldBell" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5e4013" />
          <stop offset=".22" stopColor="#f6e3a8" />
          <stop offset=".45" stopColor="#d8b064" />
          <stop offset=".72" stopColor="#a87c34" />
          <stop offset="1" stopColor="#4a3410" />
        </linearGradient>
        <radialGradient id="goldBall" cx=".35" cy=".3" r=".75">
          <stop offset="0" stopColor="#fff6d8" />
          <stop offset=".35" stopColor="#e9c877" />
          <stop offset=".75" stopColor="#a87c34" />
          <stop offset="1" stopColor="#5e4013" />
        </radialGradient>
        <filter id="bevel" x="-6%" y="-6%" width="112%" height="112%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" result="b" />
          <feSpecularLighting in="b" surfaceScale="2.6" specularConstant=".95" specularExponent="18" lightingColor="#fff4d2" result="s">
            <feDistantLight azimuth="235" elevation="40" />
          </feSpecularLighting>
          <feComposite in="s" in2="SourceAlpha" operator="in" result="si" />
          <feComposite in="SourceGraphic" in2="si" operator="arithmetic" k1="0" k2="1" k3=".8" k4="0" result="lit" />
          <feDropShadow in="lit" dx="0" dy="3" stdDeviation="2.5" floodColor="#1a0306" floodOpacity=".5" />
        </filter>
      </defs>
      <symbol id="butterfly" viewBox="0 0 120 84">
        <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path pathLength="1" d="M63 30C70 16 92 6 108 10c8 2 6 14-2 22c-9 9-27 12-43 10z" />
          <path pathLength="1" d="M63 44c14-2 32 4 36 16c3 10-6 18-15 14c-9-4-17-16-21-26z" />
          <path pathLength="1" d="M66 32c8-9 22-15 34-15M68 37c10-4 22-6 31-10M67 49c9 1 19 6 24 13" />
          <g transform="matrix(-1 0 0 1 120 0)">
            <path pathLength="1" d="M63 30C70 16 92 6 108 10c8 2 6 14-2 22c-9 9-27 12-43 10z" />
            <path pathLength="1" d="M63 44c14-2 32 4 36 16c3 10-6 18-15 14c-9-4-17-16-21-26z" />
            <path pathLength="1" d="M66 32c8-9 22-15 34-15M68 37c10-4 22-6 31-10M67 49c9 1 19 6 24 13" />
          </g>
          <path pathLength="1" d="M58.5 19C55 12 50 8 45 7c-2.2-.4-3 2-1 2.6M61.5 19C65 12 70 8 75 7c2.2-.4 3 2 1 2.6" />
        </g>
        <path d="M60 24c2.2 0 3 3 3 6v28c0 4-1.4 9-3 9s-3-5-3-9V30c0-3 .8-6 3-6z" fill="currentColor" />
        <circle cx="60" cy="20.5" r="3" fill="currentColor" />
        <circle cx="92" cy="20" r="3" fill="currentColor" />
        <circle cx="28" cy="20" r="3" fill="currentColor" />
        <circle cx="86" cy="63" r="2.2" fill="currentColor" />
        <circle cx="34" cy="63" r="2.2" fill="currentColor" />
      </symbol>
      <symbol id="lotusline" viewBox="0 0 280 36">
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path d="M2 24H104M176 24H278" strokeWidth="1" />
          <path d="M20 28H96M184 28H260" strokeWidth=".6" opacity=".6" />
          <path d="M140 4c6 7 7 15 0 22c-7-7-6-15 0-22z" strokeWidth="1.1" />
          <path d="M140 26c-9-1-17-7-19-15c9 1 15 7 19 15zM140 26c9-1 17-7 19-15c-9 1-15 7-19 15z" strokeWidth="1.1" />
          <path d="M140 26c-11 2-21-1-27-7c9-2 19 1 27 7zM140 26c11 2 21-1 27-7c-9-2-19 1-27 7z" strokeWidth="1.1" />
          <path d="M124 30q16 5 32 0" strokeWidth="1.1" />
        </g>
        <circle cx="108" cy="24" r="2" fill="currentColor" />
        <circle cx="172" cy="24" r="2" fill="currentColor" />
        <circle cx="140" cy="15" r="1.6" fill="currentColor" />
      </symbol>
      <symbol id="corner" viewBox="0 0 90 90">
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path d="M3 88V22Q3 3 22 3H88" strokeWidth="1.4" />
          <path d="M10 88V28Q10 10 28 10H88" strokeWidth=".7" opacity=".7" />
          <path d="M17 17c9 0 21 6 23 19c-12-1-22-9-23-19z" strokeWidth="1.2" />
          <path d="M17 17c3-8 12-12 21-9c-5 7-13 10-21 9zM17 17c-8 3-12 12-9 21c7-5 10-13 9-21z" strokeWidth="1" />
          <path d="M46 10c6-5 15-4 18 2c2 5-3 9-7 6c-3-2-1-6 2-5M10 46c-5 6-4 15 2 18c5 2 9-3 6-7c-2-3-6-1-5 2" strokeWidth="1" />
        </g>
        <circle cx="17" cy="17" r="2.6" fill="currentColor" />
        <circle cx="76" cy="3" r="1.8" fill="currentColor" />
        <circle cx="3" cy="76" r="1.8" fill="currentColor" />
      </symbol>
      <symbol id="lotusSm" viewBox="-10 -12 20 14">
        <g fill="url(#goldV)" stroke="#5e4013" strokeWidth=".45">
          <path transform="rotate(-68)" d="M0-6.4C1.6-4 1.6-1.9 0 0C-1.6-1.9-1.6-4 0-6.4Z" />
          <path transform="rotate(68)" d="M0-6.4C1.6-4 1.6-1.9 0 0C-1.6-1.9-1.6-4 0-6.4Z" />
          <path transform="rotate(-36)" d="M0-8.4C2-5.4 2-2.6 0 0C-2-2.6-2-5.4 0-8.4Z" />
          <path transform="rotate(36)" d="M0-8.4C2-5.4 2-2.6 0 0C-2-2.6-2-5.4 0-8.4Z" />
          <path d="M0-11C2.6-7 2.6-3 0 0C-2.6-3-2.6-7 0-11Z" />
          <ellipse cy=".9" rx="4.2" ry="1.5" />
        </g>
      </symbol>
      <symbol id="bell" viewBox="-11 -1 22 30">
        <path d="M-2.2 1.6h4.4l.7 2.4h-5.8z" fill="url(#goldV)" stroke="#5e4013" strokeWidth=".4" />
        <path d="M-4 4C-4.6 9-6.4 13.5-8.8 18.2Q-9.8 20.2-7.6 20.6H7.6Q9.8 20.2 8.8 18.2C6.4 13.5 4.6 9 4 4Z" fill="url(#goldBell)" stroke="#5e4013" strokeWidth=".5" />
        <path d="M-5.6 10.5Q0 12.3 5.6 10.5M-8.4 18.9Q0 20.6 8.4 18.9" fill="none" stroke="#6e4d19" strokeWidth=".7" opacity=".75" />
        <circle cy="23.4" r="2.1" fill="url(#goldBall)" stroke="#5e4013" strokeWidth=".4" />
      </symbol>
      <symbol id="flourish" viewBox="0 0 240 24">
        <path d="M0 12h92M148 12h92" stroke="currentColor" strokeWidth="1" />
        <path d="M94 12c7-8 14-8 18 0c-4 8-11 8-18 0zM146 12c-7-8-14-8-18 0c4 8 11 8 18 0z" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M120 3l8 9-8 9-8-9z" fill="currentColor" />
        <circle cx="86" cy="12" r="1.8" fill="currentColor" />
        <circle cx="154" cy="12" r="1.8" fill="currentColor" />
      </symbol>
      <symbol id="diya" viewBox="0 0 48 30">
        <path d="M4 14c3 9 11 13 20 13s17-4 20-13c-6 2-13 3-20 3S10 16 4 14z" fill="currentColor" />
        <path d="M4 14c6 2 13 3 20 3s14-1 20-3" fill="none" stroke="#1a0a06" strokeOpacity=".35" strokeWidth="1" />
        <path d="M37 13.5c2.5-1 5-2.6 7-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </symbol>
      <symbol id="tassel" viewBox="0 0 40 120">
        <path d="M20 0C8 14 6 30 20 40C34 30 32 14 20 0Z" fill="none" stroke="url(#goldV)" strokeWidth="3" />
        <circle cx="20" cy="44" r="6.5" fill="url(#goldBall)" stroke="#5e4013" strokeWidth=".6" />
        <path d="M13 50h14l2 8H11z" fill="url(#goldBell)" stroke="#5e4013" strokeWidth=".5" />
        <path d="M11 58q9 3 18 0l3 52q-12 6-24 0z" fill="url(#goldBell)" />
        <path d="M13 62v46M16 62v48M19 62v48M22 62v48M25 62v48M28 62v46" stroke="#6e4d19" strokeWidth=".7" opacity=".7" />
        <path d="M10 110q10 6 20 0" fill="none" stroke="#5e4013" strokeWidth=".8" />
      </symbol>
      <symbol id="i-thala" viewBox="0 0 48 48">
        <ellipse cx="24" cy="31" rx="17" ry="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="24" cy="30" rx="11" ry="3.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M22 29c-1-7-3-11-7-15M24 29c0-8 1-12 3-17M26 29c2-6 5-9 9-12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </symbol>
      <symbol id="i-haldi" viewBox="0 0 48 48">
        <path d="M31 22c3-8 9-12 14-13c0 6-5 12-14 13zM31 22c5-4 9-7 13-12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M8 24h30c0 8-6.7 13-15 13S8 32 8 24z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <ellipse cx="23" cy="24" rx="15" ry="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </symbol>
      <symbol id="i-topor" viewBox="0 0 48 48">
        <path d="M24 8C25.5 16 34 21 35 33H13C14 21 22.5 16 24 8Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M16.2 27q7.8 3 15.6 0M18.6 21q5.4 2.6 10.8 0M21.4 15q2.6 1.6 5.2 0" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M11 33h26v3.6H11z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="24" cy="6" r="2" fill="currentColor" />
      </symbol>
      <symbol id="i-kolapata" viewBox="0 0 48 48">
        <path d="M5 31C10 18 30 13 44 18C39 31 19 37 5 31z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M5 31C19 27 32 22 44 18" fill="none" stroke="currentColor" strokeWidth="1.1" />
        <path d="M18 25.5c1.5-5 9.5-6 12-1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </symbol>
      <symbol id="i-pin" viewBox="0 0 24 24">
        <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </symbol>
      <symbol id="i-cal" viewBox="0 0 24 24">
        <rect x="3.5" y="5" width="17" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </symbol>
      <symbol id="i-share" viewBox="0 0 24 24">
        <circle cx="18" cy="5.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="6" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="18" cy="18.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.2 10.8l7.6-4.1M8.2 13.2l7.6 4.1" stroke="currentColor" strokeWidth="1.6" />
      </symbol>
    </svg>
  );
}
