import { useEffect, useRef, useState } from "react";

import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";

import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

import "./AudioPlayer.css";

const AudioPlayer = () => {
  useEffect(() => {
    fetch("http://localhost:8081/audioplayer")
      .then((response) => response.json())
      .then((dataPlayer) => {
        setTracks(dataPlayer);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, []);

  const [tracks, setTracks] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);

  useEffect(() => {
    setCurrentTrack(tracks[trackIndex]);
  }, [tracks, trackIndex, currentTrack]);

  const [duration, setDuration] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

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

  const esfdf = () => {
    console.log(currentTrack);
    console.log(audioRef);
  };

  const openPlayer = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className={`audioPlayer flex ${isClicked ? "opened" : "closed"} `}>
      {isClicked ? (
        <IconChevronDown onClick={openPlayer} className="icon open" />
      ) : (
        <IconChevronUp onClick={openPlayer} className="icon open" />
      )}

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
        {...{
          audioRef,
          progressBarRef,
          duration,
          tracks,
          trackIndex,
          setTrackIndex,
          setCurrentTrack,
          setTrackIndex,
        }}
      />
      {/* <div style={{ width: "50rem", height: "10rem", background: "red" }}></div> */}
      <button style={{ width: "5rem", height: "5rem" }} onClick={esfdf}>
        currentTrack
      </button>
    </div>
  );
};
export default AudioPlayer;
