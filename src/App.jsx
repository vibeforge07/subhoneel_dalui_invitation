import { useGSAP } from '@gsap/react';
import { startSite } from './motion/start.js';

import SvgDefs from './components/SvgDefs.jsx';
import Cursor from './components/Cursor.jsx';
import TapFx from './components/TapFx.jsx';
import MusicButton from './components/MusicButton.jsx';
import Gate from './components/Gate.jsx';
import Hero from './components/Hero.jsx';
import Couple from './components/Couple.jsx';
import LetterScene from './components/LetterScene.jsx';
import DateSection from './components/DateSection.jsx';
import Countdown from './components/Countdown.jsx';
import Gallery from './components/Gallery.jsx';
import Events from './components/Events.jsx';
import Night from './components/Night.jsx';
import Venue from './components/Venue.jsx';
import Closing from './components/Closing.jsx';

export default function App() {
  useGSAP(() => {
    startSite();
  });

  return (
    <>
      <SvgDefs />
      <Cursor />
      <TapFx />
      <MusicButton />      <Gate />
      <main id="page">
        <Hero />
        <Couple />
        <LetterScene />
        <DateSection />
        <Countdown />
        <Gallery />
        <Events />
        <Night />
        <Venue />
        <Closing />
      </main>
    </>
  );
}
