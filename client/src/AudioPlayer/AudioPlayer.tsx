import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";

import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

import "./AudioPlayer.css";

const AudioPlayer = () => {
  const { id } = useParams();

  let idInt: number;
  if (!isNaN(id)) {
    idInt = parseInt(id);
  } else {
    idInt = 1;
  }

  const [tracks, setTracks] = useState([]);
  const [trackIndex, setTrackIndex] = useState(idInt - 1);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
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

  const openPlayer = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    fetch("http://localhost:8081/audioplayer")
      .then((response) => response.json())
      .then((dataPlayer) => {
        setTracks(dataPlayer);
        setCurrentTrack(tracks[trackIndex]);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, [trackIndex, tracks]);

  return (
    <div className={`audioPlayer flex ${isClicked ? "opened" : "closed"} `}>
      <div onClick={openPlayer} className="icon open flex">
        {isClicked ? (
          <IconChevronDown className="chevron" />
        ) : (
          <IconChevronUp className="chevron" />
        )}
      </div>

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
        }}
      />
      <div
        style={{
          width: "50rem",
          height: "5rem",
          background: "red",
        }}
      ></div>
    </div>
  );
};
export default AudioPlayer;
