export default function Venue() {
  return (
    <>
      <section className="panel panel--cream panel--strips venue" id="venue">
        <div className="card-edge" aria-hidden="true"></div>
        <div className="deco" data-deco="tl" data-depth="0.03" aria-hidden="true">
          <img data-asset="roses-corner" alt="" loading="lazy" decoding="async" />
        </div>
        <div className="deco" data-deco="tr" data-depth="0.03" aria-hidden="true">
          <img data-asset="roses-corner" alt="" loading="lazy" decoding="async" />
        </div>
        <header className="head head--onCream">
          <p className="head__kicker"><b>VIII</b>The Venues</p>
          <h2 className="head__title" data-words>কোথায়</h2>
          <svg className="lotusline"><use href="#lotusline" /></svg>
        </header>
        <div className="venue__duo" id="venueDuo"></div>
        <img className="peacock peacock--l" data-asset="peacock" alt="" loading="lazy" decoding="async" />
        <img className="peacock peacock--r" data-asset="peacock" alt="" loading="lazy" decoding="async" />
      </section>

      {/* RSVP: Arpon's own section slots in here, between #venue and #closing */}
      <div className="seam" aria-hidden="true"><img data-asset="garland" alt="" loading="lazy" decoding="async" /></div>
    </>
  );
}
