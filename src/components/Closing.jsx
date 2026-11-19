export default function Closing() {
  return (
    <section className="panel panel--maroon closing" id="closing">
      <div className="card-edge" aria-hidden="true"></div>
      <div className="deco" data-deco="bl" data-depth="0.03" aria-hidden="true">
        <img data-asset="roses-corner" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="deco" data-deco="br" data-depth="0.03" aria-hidden="true">
        <img data-asset="roses-corner" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="side-drape side-drape--l" aria-hidden="true">
        <div className="drape__fab"></div>
        <svg className="side-drape__tassel"><use href="#tassel" /></svg>
      </div>
      <div className="side-drape side-drape--r" aria-hidden="true">
        <div className="drape__fab"></div>
        <svg className="side-drape__tassel"><use href="#tassel" /></svg>
      </div>
      <canvas className="petals" data-petals="closing"></canvas>
      <div className="closing__grid">
        <div className="closing__text">
          <svg className="closing__fly"><use href="#butterfly" /></svg>
          <h2 className="closing__line foil" data-k="closing.line"></h2>
          <p className="closing__names">
            <span data-k="couple.bride.first"></span> <i>&amp;</i> <span data-k="couple.groom.first"></span>
          </p>
          <svg className="lotusline"><use href="#lotusline" /></svg>
          <p className="closing__date" data-k="wedding.short"></p>
          <button className="btn btn--gold" id="shareBtn" type="button">
            <svg><use href="#i-share" /></svg>Share invite
          </button>
          <p className="closing__fam" data-k="families"></p>
        </div>
        <div className="closing__visual">
          <div className="bells bells--l" data-bells="3" aria-hidden="true"></div>
          <div className="bells bells--r" data-bells="3" data-shift="1" aria-hidden="true"></div>
          <div className="arch arch--photo closing__arch" data-arch>
            <div className="arch__inner">
              <img
                className="arch__photo"
                data-asset="closing"
                alt=""
                style={{ objectPosition: '50% 60%' }}
                loading="lazy"
                decoding="async"
              />
              <div className="arch__empty"><svg className="closing__fly"><use href="#butterfly"/></svg></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
