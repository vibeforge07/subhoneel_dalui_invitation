export default function Gate() {
  return (
    <section className="gate" id="gate" aria-label="Invitation cover">
      <div className="gate__media">
        <img className="gate__img" id="gateImg" alt="" />
        <div className="gate__curtains" id="gateCurtains">
          <div className="drape drape--l"><div className="drape__fab"></div></div>
          <div className="drape drape--r"><div className="drape__fab"></div></div>
          <div className="gate__valance-wrap"><div className="valance"></div></div>
        </div>
        <div className="gate__seam"></div>
        <video className="gate__video" id="gateVideo" muted playsInline preload="auto"></video>
      </div>
      <div className="gate__veil"></div>
      <div className="gate__frame" aria-hidden="true"></div>
      <div className="stage-corners" aria-hidden="true">
        <div className="corner-shade corner-shade--bl"></div>
        <div className="corner-shade corner-shade--br"></div>
        <div className="corner-roses corner-roses--bl">
          <img src="/assets/roses-corner.webp" data-asset="roses-corner" alt="" loading="eager" decoding="async" />
        </div>
        <div className="corner-roses corner-roses--br">
          <img src="/assets/roses-corner.webp" data-asset="roses-corner" alt="" loading="eager" decoding="async" />
        </div>
      </div>
      <div className="gate__ui" id="gateUi">
        <svg className="gate__fly"><use href="#butterfly" /></svg>
        <p className="gate__invocation">প্রজাপতয়ে নমঃ</p>
        <h1 className="gate__title foil">শুভ বিবাহ</h1>
        <p className="gate__names">
          <span data-k="couple.bride.first"></span>
          <i>&amp;</i>
          <span data-k="couple.groom.first"></span>
        </p>
        <p className="gate__date" data-k="wedding.short"></p>
        <button className="gate__btn" id="openBtn" type="button">
          <span className="gate__btn-ring"></span>
          <span className="gate__btn-label">Open the invitation</span>
        </button>
      </div>
    </section>
  );
}
