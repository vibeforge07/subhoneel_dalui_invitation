export default function MusicButton() {
  return (
    <>
      <audio id="bgMusic" src="/assets/bgm.mp3" preload="none" loop></audio>
      <button className="music-btn" id="musicBtn" type="button" aria-label="Toggle background music" title="মিউজিক অন / অফ">
        <span className="music-btn__disc">
          <svg className="music-btn__icon music-btn__icon--play" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
          <svg className="music-btn__icon music-btn__icon--mute" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
        </span>
        <span className="music-btn__waves" aria-hidden="true">
          <i></i><i></i><i></i>
        </span>
      </button>
    </>
  );
}
