export default function Gallery() {
  return (
    <section className="gallery panel--maroon" id="gallery">
      <div className="gallery__pin" id="galPin">
        <div className="card-edge" aria-hidden="true"></div>
        <div className="deco deco--chand" data-deco="chand-l" data-depth="0.05" aria-hidden="true">
          <img data-asset="chandelier" alt="" loading="lazy" decoding="async" />
        </div>
        <div className="deco deco--chand" data-deco="chand-r" data-depth="0.05" aria-hidden="true">
          <img data-asset="chandelier" alt="" loading="lazy" decoding="async" />
        </div>
        <header className="head head--tight">
          <p className="head__kicker"><b>V</b>Our Kolkata</p>
          <h2 className="head__title" data-words>আমাদের কলকাতা</h2>
        </header>
        <div className="gallery__viewport">
          <div className="gallery__track" id="galTrack"></div>
        </div>
      </div>
    </section>
  );
}
