import { useRef, useState } from "react";
import { tracks } from "../Components/assets/media/prods/prods.js";

// import components
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";

import {IconChevronUp} from '@tabler/icons-react'

import "./AudioPlayer.css";

const AudioPlayer = () => {
  const [isClicked, setIsClicked] = useState(false);

  const openPlayer = () => {
    setIsClicked(!isClicked);
  };


  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);

  const [duration, setDuration] = useState(0);

  const audioRef = useRef();
  const progressBarRef = useRef();

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  return (
    <div className={`audioPlayer flex ${isClicked ? 'opened' : 'closed'} `} >
      <IconChevronUp onClick={openPlayer} className="icon open" />
      <DisplayTrack
        {...{
          currentTrack,
          audioRef,
          setDuration,
          progressBarRef,
          handleNext,
        }}
      />
      <Controls
        {...{ audioRef, progressBarRef, duration, handleNext, setTrackIndex }}
      />
      <div style={{ width: "50rem", height: "10rem", background: "red" }}></div>
    </div>
  );
};
export default AudioPlayer;
