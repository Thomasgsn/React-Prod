import { Dispatch, ReactEventHandler, SetStateAction } from "react";
import { Prods } from "../utils/type";

import "./DisplayTrack.css";

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}: {
  currentTrack: Prods;
  setDuration: Dispatch<SetStateAction<number>>;
  handleNext: ReactEventHandler<HTMLAudioElement>;
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
            src={`/prods/${currentTrack.prodFile}`}
            ref={audioRef}
            onEnded={handleNext}
            onLoadedMetadata={onLoadedMetadata}
          />
          <div className="trackInfo flex">
            <div className="trackCover">
              {currentTrack && (
                <img
                  src={`/prods/${currentTrack.cover}`}
                  alt={`${currentTrack.name} prod By. _oftyn`}
                />
              )}
            </div>
            <div className="text">
              {currentTrack && (
                <a href={"/prod/" + currentTrack.id} className="title">
                  {currentTrack.name}
                </a>
              )}
              <div className="tags flex">
                {currentTrack.tag.split("; ").map((tag: string) => (
                  <p key={tag.replace(";", "")}>{tag.replace(";", "")}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DisplayTrack;
