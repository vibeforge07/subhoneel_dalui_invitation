export default function Couple() {
  return (
    <section className="panel panel--maroon couple" id="couple">
      <div className="card-edge" aria-hidden="true"></div>
      <div className="deco" data-deco="bl" data-depth="0.03" aria-hidden="true"><img data-asset="roses-corner" alt="" /></div>
      <div className="deco" data-deco="br" data-depth="0.03" aria-hidden="true"><img data-asset="roses-corner" alt="" /></div>
      <div className="bells bells--l" data-bells="4" aria-hidden="true"></div>
      <div className="bells bells--r" data-bells="4" data-shift="2" aria-hidden="true"></div>
      <header className="head">
        <p className="head__kicker"><b>I</b>The couple</p>
        <h2 className="head__title" data-words>বর ও কনে</h2>
        <svg className="lotusline"><use href="#lotusline" /></svg>
        <p className="head__sub" data-k="bondingNote"></p>
      </header>
      <div className="couple__grid">
        <article className="person person--groom">
          <div className="arch arch--photo" data-arch>
            <div className="arch__inner">
              <img className="arch__photo" data-asset="groom" alt="Subhoneel" style={{ objectPosition: "50% 0%" }} />
              <div className="arch__empty"><span className="initial" data-k="couple.initials.0"></span></div>
            </div>
          </div>
          <div className="person__text">
            <p className="person__role">The groom</p>
            <h3 className="person__name foil" data-k="couple.groom.full"></h3>
            <p className="person__parents" data-k="couple.groom.parentsBn"></p>
            <p className="person__about" data-k="couple.groom.about"></p>
          </div>
        </article>

        <div className="couple__and" aria-hidden="true">
          <svg className="couple__fly"><use href="#butterfly" /></svg>
          <span className="foil">&amp;</span>
        </div>

        <article className="person person--bride">
          <div className="arch arch--photo" data-arch>
            <div className="arch__inner">
              <img className="arch__photo" data-asset="bride" alt="Madhumita" style={{ objectPosition: "50% 0%" }} />
              <div className="arch__empty"><span className="initial" data-k="couple.initials.1"></span></div>
            </div>
          </div>
          <div className="person__text">
            <p className="person__role">The bride</p>
            <h3 className="person__name foil" data-k="couple.bride.full"></h3>
            <p className="person__parents" data-k="couple.bride.parentsBn"></p>
            <p className="person__about" data-k="couple.bride.about"></p>
          </div>
        </article>
      </div>
    </section>
  );
}

