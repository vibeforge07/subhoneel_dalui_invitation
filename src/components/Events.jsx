export default function Events() {
  return (
    <section className="panel panel--cream events" id="events">
      <div className="card-edge" aria-hidden="true"></div>
      <div className="deco" data-deco="tl" data-depth="0.03" aria-hidden="true">
        <img data-asset="roses-corner" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="deco" data-deco="tr" data-depth="0.03" aria-hidden="true">
        <img data-asset="roses-corner" alt="" loading="lazy" decoding="async" />
      </div>
      <header className="head head--onCream">
        <p className="head__kicker"><b>VI</b><span data-k="eventsRange"></span></p>
        <h2 className="head__title" data-words>অনুষ্ঠানসূচি</h2>
        <svg className="lotusline"><use href="#lotusline" /></svg>
      </header>
      <div className="events__grid" id="eventGrid"></div>
    </section>
  );
}
