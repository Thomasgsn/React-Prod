import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";

import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

import "./AudioPlayer.css";

const AudioPlayer = () => {
  // useEffect(() => {
  //   fetch("http://localhost:8081/audioplayer")
  //     .then((response) => response.json())
  //     .then((dataPlayer) => {
  //       setTracks(dataPlayer);
  //     })
  //     .catch((error) =>
  //       console.error("Erreur lors de la récupération des données :", error)
  //     );
  // }, []);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8081/prod/${id}`)
      .then((response) => response.json())
      .then((prodDetail) => {
        setTracks(prodDetail);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, [id]);

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

  const openPlayer = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className={`audioPlayer flex ${isClicked ? "opened" : "closed"} `}>
      {isClicked ? (
        <div onClick={openPlayer} className="icon open flex" >
          <IconChevronDown className="chevron"/>
        </div>
      ) : (
        <div onClick={openPlayer} className="icon open flex" >
          <IconChevronUp className="chevron"/>
        </div>
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
      <div style={{ width: "50rem", height: "5rem", background: "red" }}></div>
    </div>
  );
};
export default AudioPlayer;
