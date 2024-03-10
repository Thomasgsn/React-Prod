import "./DisplayTrack.css";

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  return (
    <div>
      {currentTrack && (
        <div className="display ">
          <audio
            src={`/prods/audio_prods/${currentTrack.name}${currentTrack.id}.mp3`}
            ref={audioRef}
            onEnded={handleNext}
            onLoadedMetadata={onLoadedMetadata}
          />
          <div className="trackInfo flex">
            <div className="trackCover">
              {currentTrack && (
                <img
                  src={`/prods/cover_prods/${currentTrack.name}${currentTrack.id}.jpg`}
                  alt={`${currentTrack.name} prod By. _oftyn`}
                />
              )}
            </div>
            <div className="text">
              {currentTrack && <p className="title">{currentTrack.name}</p>}
              <p>_oftyn</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DisplayTrack;
