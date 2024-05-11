import { Prods } from "../utils/type";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";

import "./AudioPlayer.css";

const AudioPlayer = () => {
  const id = Number(useParams().id);

  const [tracks, setTracks] = useState<Prods[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<Prods>(tracks[trackIndex]);

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
    fetch(`http://localhost:8081/audioplayer/${id}`)
      .then((response) => response.json())
      .then((dataPlayer) => {
        setTracks(dataPlayer);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, [id, tracks]);

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
    </div>
  );
};
export default AudioPlayer;
