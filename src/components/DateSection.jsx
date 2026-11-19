export default function DateSection() {
  return (
    <section className="panel panel--maroon date" id="date">
      <div className="card-edge" aria-hidden="true"></div>
      <div className="side-drape side-drape--l" aria-hidden="true">
        <div className="drape__fab"></div>
        <svg className="side-drape__tassel"><use href="#tassel" /></svg>
      </div>
      <div className="side-drape side-drape--r" aria-hidden="true">
        <div className="drape__fab"></div>
        <svg className="side-drape__tassel"><use href="#tassel" /></svg>
      </div>
      <div className="bells bells--l" data-bells="5" aria-hidden="true"></div>
      <div className="bells bells--r" data-bells="5" data-shift="3" aria-hidden="true"></div>
      <div className="arch arch--window date__arch" data-arch data-spring=".34" data-qx=".38">
        <div className="arch__inner">
          <header className="head head--onCream">
            <p className="head__kicker"><b>III</b>The date</p>
            <h2 className="head__title" data-words>শুভ দিন</h2>
            <svg className="lotusline"><use href="#lotusline" /></svg>
          </header>
          <div className="date__grid">
            <div className="scratch" id="scratch">
              <div className="scratch__card">
                <div className="scratch__face">
                  <p className="scratch__day" data-k="wedding.bnDay"></p>
                  <p className="scratch__date">
                    <span data-k="wedding.bnDate"></span>
                    <br />
                    <span data-k="wedding.bnYear"></span>
                  </p>
                  <p className="scratch__lagna" data-k="wedding.bnLagna"></p>
                </div>
                <canvas className="scratch__cover" id="scratchCover" aria-label="Scratch the gold to see the date"></canvas>
              </div>
              <p className="scratch__hint" id="scratchHint">Scratch the gold with your finger</p>
              <a className="btn btn--crimson scratch__cal" id="calBtn" target="_blank" rel="noopener">
                <svg><use href="#i-cal" /></svg>Add to calendar
              </a>
            </div>
            <div className="cal" id="cal">
              <div className="cal__head">
                <p className="cal__month" data-k="wedding.month"></p>
                <p className="cal__year" data-k="wedding.year"></p>
              </div>
              <div className="cal__grid" id="calGrid"></div>
            </div>
          </div>
          <img className="temples" data-asset="temples-gold" alt="" loading="lazy" decoding="async" />
        </div>
      </div>
      <img className="vase vase--l" data-asset="vase" alt="" loading="lazy" decoding="async" />
      <img className="vase vase--r" data-asset="vase" alt="" loading="lazy" decoding="async" />
      <canvas className="petals" data-petals="date"></canvas>
    </section>
  );
}
