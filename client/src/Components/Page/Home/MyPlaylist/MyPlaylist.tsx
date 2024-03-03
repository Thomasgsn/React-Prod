import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@chakra-ui/react";
import { IconArrowNarrowRight } from "@tabler/icons-react";

import "./MyPlaylist.css";

const MyPlaylist = () => {
  const [reco, setReco] = useState([]);
  const [nb, setNb] = useState(0);
  const [nbArtist, setNbArtist] = useState(0);

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
        setReco(data.reco);
        setNb(data.nb.nb);
        setNbArtist(data.nbArtist.nbArtist);
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
        <a href="" className="singleItem">
          <img
            src="https://t2.genius.com/unsafe/340x340/https%3A%2F%2Fimages.genius.com%2F8467a617c94ddf00a30396b6ba279d3e.1000x1000x1.jpg"
            alt="Favorite Song"
          />
          <h3>AAMO - DANS L'TRAP</h3>
        </a>
        <a href="" className="singleItem">
          <img
            src="https://t2.genius.com/unsafe/340x340/https%3A%2F%2Fimages.genius.com%2F8467a617c94ddf00a30396b6ba279d3e.1000x1000x1.jpg"
            alt="Favorite Song"
          />
          <h3>AAMO - DANS L'TRAP</h3>
        </a>
        <a href="" className="singleItem">
          <img
            src="https://t2.genius.com/unsafe/340x340/https%3A%2F%2Fimages.genius.com%2F8467a617c94ddf00a30396b6ba279d3e.1000x1000x1.jpg"
            alt="Favorite Song"
          />
          <h3>AAMO - DANS L'TRAP</h3>
        </a>
        <a href="" className="singleItem">
          <img
            src="https://t2.genius.com/unsafe/340x340/https%3A%2F%2Fimages.genius.com%2F8467a617c94ddf00a30396b6ba279d3e.1000x1000x1.jpg"
            alt="Favorite Song"
          />
          <h3>AAMO - DANS L'TRAP</h3>
        </a>
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
              {reco.map((r: any) => (
                <Tooltip fontSize="xl" label={r.artist}>
                  <a href="">
                    <img
                      src={`../recommendations/${r.artist}.jpg`}
                      alt={r.artist}
                    />
                  </a>
                </Tooltip>
              ))}
            </div>
            <div className="cardText">
              <span>
                {nb} recommendations <br />
                <small>{nbArtist} artist different.</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPlaylist;
