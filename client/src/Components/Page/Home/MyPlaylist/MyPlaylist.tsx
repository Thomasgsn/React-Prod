import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@chakra-ui/react";
import { IconArrowNarrowRight } from "@tabler/icons-react";

import "./MyPlaylist.css";

const MyPlaylist = () => {
  const [artistReco, setArtistReco] = useState([]);
  const [nb, setNb] = useState([]);
  const [nbArtist, setNbArtist] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  const navigateTo = useNavigate();
  const navigateToPlaylist = () => {
    navigateTo("/playlist");
  };
  const navigateToRecommendation = () => {
    navigateTo("/recommendation");
  };

  useEffect(() => {
    fetch("http://localhost:8081/home")
      .then((response) => response.json())
      .then((data) => {
        setArtistReco(data.artistReco);
        setNb(data.nb);
        setNbArtist(data.nbArtist);
        setPlaylist(data.playlist);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, []);

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
        {playlist.map((p: any) => (
          <a href="" className="singleItem">
            <img
              src="https://t2.genius.com/unsafe/340x340/https%3A%2F%2Fimages.genius.com%2F8467a617c94ddf00a30396b6ba279d3e.1000x1000x1.jpg"
              alt="Favorite Song"
            />
            <h3>{p.name}</h3>
          </a>
        ))}
      </div>

      <div className="recommendation flex">
        <div className="lastReco">
          <div className="heading flex">
            <h3>French Recommendation</h3>
            <button onClick={navigateToRecommendation} className="btn flex">
              See All
              <IconArrowNarrowRight className="icon" />
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              {artistReco.map((a: any) => (
                <Tooltip fontSize="xl" label={a.nom}>
                  <a href="">
                    <img src={`../recommendations/${a.nom}.jpg`} alt={a.nom} />
                  </a>
                </Tooltip>
              ))}
            </div>
            <div className="cardText">
              <span>
                {nb.map((a: any) => (
                  <>{a.nb}</>
                ))}{" "}
                recommendations <br />
                <small>
                  {nbArtist.map((a: any) => (
                    <>{a.nbArtist}</>
                  ))}{" "}
                  artist different.
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPlaylist;
