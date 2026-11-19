export default function LetterScene() {
  return (
    <section className="letter-scene panel--maroon" id="letter">
      <div className="letter-scene__pin">
        {/* white alpona turning behind the card and the drapes (shows once assets/alpona.* exists) */}
        <div className="alpona alpona--l" aria-hidden="true"><div className="alpona__art"></div></div>
        <div className="alpona alpona--r" aria-hidden="true"><div className="alpona__art"></div></div>
        <div className="card-edge" aria-hidden="true"></div>
        <div className="side-drape side-drape--l" aria-hidden="true">
          <div className="drape__fab"></div>
          <svg className="side-drape__tassel"><use href="#tassel" /></svg>
        </div>
        <div className="side-drape side-drape--r" aria-hidden="true">
          <div className="drape__fab"></div>
          <svg className="side-drape__tassel"><use href="#tassel" /></svg>
        </div>
        <img className="letter-scene__chand" data-asset="chandelier" alt="" loading="lazy" decoding="async" />
        <header className="head head--tight">
          <p className="head__kicker"><b>II</b>The invitation</p>
          <h2 className="head__title" data-words>নিমন্ত্রণপত্র</h2>
        </header>
        <div className="env-stage" id="envStage">
          <div className="env" id="env">
            <div className="env__back"></div>
            {/* the wedding card: pages are built by main.js (a two-page book on desktop, one page at a time on phones) */}
            <div className="book" id="book"><div className="book__leaves" id="bookLeaves"></div></div>
            <div className="env__front"><span className="env__edge"></span></div>
            <div className="env__flap" id="envFlap"><div className="env__flap-face"></div><div className="env__flap-back"></div></div>
            <div className="env__seal" id="envSeal"><span className="mono" data-mono></span></div>
          </div>
        </div>
        <p className="letter-scene__hint" id="letterHint">Keep scrolling</p>
      </div>
    </section>
  );
}
