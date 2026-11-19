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
          <p className="head__kicker"><b>VIII</b>The venue</p>
          <h2 className="head__title" data-words>কোথায়</h2>
          <svg className="lotusline"><use href="#lotusline" /></svg>
        </header>
        <div className="venue__grid">
          <figure className="frame frame--venue">
            <div className="frame__photo">
              <img data-asset="venue" alt="The venue" loading="lazy" decoding="async" />
              <div className="frame__empty">
                <svg><use href="#i-pin" /></svg>
              </div>
            </div>
            <img className="frame__art" data-asset="frame-gold" alt="" loading="lazy" decoding="async" />
          </figure>
          <div className="venue__info">
            <h3 className="venue__name" data-k="venue.name"></h3>
            <p className="venue__addr" data-k="venue.address"></p>
            <p className="venue__note" data-k="venue.note"></p>
            <div className="venue__map">
              <iframe
                id="mapFrame"
                title="Venue map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <a className="btn btn--crimson" id="mapBtn" target="_blank" rel="noopener">
              <svg><use href="#i-pin" /></svg>Open in Google Maps
            </a>
          </div>
        </div>
        <img className="peacock peacock--l" data-asset="peacock" alt="" loading="lazy" decoding="async" />
        <img className="peacock peacock--r" data-asset="peacock" alt="" loading="lazy" decoding="async" />
      </section>

      {/* RSVP: Arpon's own section slots in here, between #venue and #closing */}
      <div className="seam" aria-hidden="true"><img data-asset="garland" alt="" loading="lazy" decoding="async" /></div>
    </>
  );
}
