export default function Countdown() {
  return (
    <>
      <section className="panel panel--emboss countdown" id="countdown">
        <div className="card-edge" aria-hidden="true"></div>
        <div className="deco" data-deco="l" data-depth="0.04" aria-hidden="true">
          <img data-asset="roses-corner" alt="" loading="lazy" decoding="async" />
        </div>
        <div className="deco" data-deco="r" data-depth="0.04" aria-hidden="true">
          <img data-asset="roses-corner" alt="" loading="lazy" decoding="async" />
        </div>
        <header className="head head--onCream head--tight">
          <p className="head__kicker"><b>IV</b>Until Shubhodrishti</p>
          <h2 className="head__title" data-words>আর মাত্র</h2>
          <svg className="lotusline"><use href="#lotusline" /></svg>
        </header>
        <div className="cd" id="cd">
          <div className="cd__cell"><span className="cd__num" data-cd="d">00</span><span className="cd__lbl">দিন</span></div>
          <div className="cd__cell"><span className="cd__num" data-cd="h">00</span><span className="cd__lbl">ঘণ্টা</span></div>
          <div className="cd__cell"><span className="cd__num" data-cd="m">00</span><span className="cd__lbl">মিনিট</span></div>
          <div className="cd__cell"><span className="cd__num" data-cd="s">00</span><span className="cd__lbl">সেকেন্ড</span></div>
        </div>
      </section>

      <div className="seam" aria-hidden="true"><img data-asset="garland" alt="" loading="lazy" decoding="async" /></div>
    </>
  );
}
