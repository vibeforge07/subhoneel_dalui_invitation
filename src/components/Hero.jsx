export default function Hero() {
  return (
    <>
      <section className="hero" id="hero">
        <div className="hero__scene" id="heroScene">
          <div className="layer hero__bg" data-depth="0.014">
            <img className="hero__img" id="heroImg" alt="" />
            <video className="hero__loop" id="heroLoop" muted playsInline loop preload="none"></video>
            <div className="stage" id="stage" aria-hidden="true">
              <div className="stage__wall"></div>
              <div className="stage__floor"></div>
              <div className="stage__drape stage__drape--l"><div className="drape__fab"></div></div>
              <div className="stage__drape stage__drape--r"><div className="drape__fab"></div></div>
              <div className="stage__valance"><div className="valance"></div></div>
            </div>
          </div>
          <div className="layer hero__glows" id="heroGlows" data-depth="0.014"></div>
        </div>
        <div className="hero__dim" id="heroDim"><i className="hero__spot" id="heroSpot"></i></div>
        <div className="hero__light" id="heroLight"><i className="hero__glow" id="heroGlow"></i></div>
        <canvas className="petals" data-petals="hero"></canvas>

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

        <div className="hero__content">
          <div className="hero__top hx">
            <svg className="hero__fly"><use href="#butterfly" /></svg>
            <p className="hero__shubho foil">শুভ বিবাহ</p>
            <p className="hero__houses" data-k="houses"></p>
            <p className="hero__intro" data-k="introductoryNote"></p>
          </div>

          <div className="hero__row">
            <div className="hero__name hero__name--l">
              <h2 className="name foil-live" data-split data-k="couple.groom.first"></h2>
              <p className="hero__parent hx"><span className="hero__rel">Son of</span> <span data-k="couple.groom.parents"></span></p>
            </div>

            <figure className="frame frame--hero" id="heroFrame" data-depth="0.03">
              <div className="frame__photo">
                <img data-asset="couple" alt="Subhoneel and Madhumita" />
                <div className="frame__empty"><span className="mono" data-mono></span></div>
              </div>
              <img className="frame__art" data-asset="frame-gold" alt="" />
            </figure>

            <div className="hero__name hero__name--r">
              <span className="hero__amp foil">&amp;</span>
              <h2 className="name foil-live" data-split data-k="couple.bride.first"></h2>
              <p className="hero__parent hx"><span className="hero__rel">Daughter of</span> <span data-k="couple.bride.parents"></span></p>
            </div>
          </div>
        </div>
        <a className="scroll-cue hx" href="#couple" aria-label="Scroll down"><span>Scroll</span><i></i></a>
      </section>

      <div className="seam" aria-hidden="true"><img data-asset="garland" alt="" /></div>
    </>
  );
}
