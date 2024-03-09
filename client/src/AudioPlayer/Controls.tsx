import { useEffect, useState, useCallback, useRef } from "react";

import {
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconPlayerPlay,
  IconPlayerPause,
  IconVolume3,
  IconVolume,
  IconVolume2,
} from "@tabler/icons-react";

import "./Controls.css";
import ProgressBar from "./ProgressBar";

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);

  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const handlePrevious = () => {
    if (trackIndex === 0) {
      const lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
      setTrackIndex((prev: number) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
  };

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev: number) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  const [volume, setVolume] = useState(80);
  const [muteVolume, setMuteVolume] = useState(false);

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <div className="controlsDiv">
      <div className="player">
        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration }}
        />
        <div className="buttons flex">
          <button className="btn" onClick={handlePrevious}>
            <IconPlayerSkipBack />
          </button>
          <button className="btn" onClick={togglePlayPause}>
            {isPlaying ? <IconPlayerPause /> : <IconPlayerPlay />}
          </button>
          <button className="btn" onClick={handleNext}>
            <IconPlayerSkipForward />
          </button>
        </div>
      </div>
      <div className="volume">
        <button className="btn" onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <IconVolume3 />
          ) : volume < 40 ? (
            <IconVolume2 />
          ) : (
            <IconVolume />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Controls;
