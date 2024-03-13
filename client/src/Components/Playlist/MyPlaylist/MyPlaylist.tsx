import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconArrowNarrowRight } from "@tabler/icons-react";

import "./MyPlaylist.css";
import Recommendation from "../../assets/Recommendation/Recommendation";

const MyPlaylist = () => {

  const navigateTo = useNavigate();
  const navigateToPlaylist = () => {
    navigateTo("/playlist");
  };
  const navigateToRecommendation = () => {
    navigateTo("/recommendation");
  };

  const playlistName = useParams()

  // const [playlist, setPlaylist] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8081/home")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPlaylist(data.playlist);
  //     })
  //     .catch((error) =>
  //       console.error("Erreur lors de la récupération des données :", error)
  //     );
  // }, []);

  return (
    <div className="myPlaylistSection">
      <div className="heading flex">
        <h1>My Playlist</h1>
        <button onClick={navigateToPlaylist} className="btn flex">
          See All
          <IconArrowNarrowRight className="icon" />
        </button>
      </div>
      <div className="secContainer flex">
        Maintenance
        {playlistName}
        {/* {playlist.map((p: any) => (
          <a href={"/playlist/" + p.name.toLowerCase()} className="singleItem">
            <img src={"/cover_prods/" + p.cover} alt={p.name} />
            <h3>{p.name}</h3>
          </a>
        ))} */}
      </div>
      <Recommendation />
    </div>
  );
};

export default MyPlaylist;
