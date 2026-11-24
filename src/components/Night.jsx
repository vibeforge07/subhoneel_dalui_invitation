export default function Night() {
  return (
    <section className="panel panel--maroon night" id="night">
      <div className="card-edge" aria-hidden="true"></div>
      <div className="deco" data-deco="bl" data-depth="0.03" aria-hidden="true">
        <img data-asset="roses-corner" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="deco" data-deco="br" data-depth="0.03" aria-hidden="true">
        <img data-asset="roses-corner" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="frieze" aria-hidden="true"></div>
      <div className="strand strand--l" aria-hidden="true"></div>
      <div className="strand strand--r" aria-hidden="true"></div>
      <img className="lotus lotus--l" data-asset="lotus-gold" alt="" loading="lazy" decoding="async" />
      <img className="lotus lotus--r" data-asset="lotus-gold" alt="" loading="lazy" decoding="async" />
      <header className="head">
        <p className="head__kicker"><b>VII</b></p>
        <h2 className="head__title" data-words>বিয়ের রাত</h2>
        <svg className="lotusline"><use href="#lotusline" /></svg>
      </header>
      <ol className="tl" id="timeline">
        <span className="tl__line" aria-hidden="true">
          <span className="tl__fill" id="tlFill"></span>
        </span>
      </ol>
    </section>
  );
}
