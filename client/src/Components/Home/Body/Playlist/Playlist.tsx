import { useEffect, useState } from "react";
import { Tooltip } from '@chakra-ui/react'
import {
  IconArrowNarrowRight,
  IconHeart
} from "@tabler/icons-react";

import "./Playlist.css";

const Playlist = () => {
  const [reco, setReco] = useState([]);
  const [nb, setNb] = useState(0);
  const [nbArtist, setNbArtist] = useState(0);

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
    <div className="playlistSection">
      <div className="heading flex">
        <h1>My Playlist</h1>
        <button className="btn flex">
          See All
          <IconArrowNarrowRight className="icon" />
        </button>
      </div>
      <div className="secContainer flex">
        <div className="singleItem">
          <IconHeart className="icon" />
          <img
            src="https://t2.genius.com/unsafe/340x340/https%3A%2F%2Fimages.genius.com%2F8467a617c94ddf00a30396b6ba279d3e.1000x1000x1.jpg"
            alt="Favorite Song"
          />
          <h3>AAMO - DANS L'TRAP</h3>
        </div>
        <div className="singleItem">
          <IconHeart className="icon" />
          <img
            src="https://t2.genius.com/unsafe/340x340/https%3A%2F%2Fimages.genius.com%2F8467a617c94ddf00a30396b6ba279d3e.1000x1000x1.jpg"
            alt="Favorite Song"
          />
          <h3>AAMO - DANS L'TRAP</h3>
        </div>
        <div className="singleItem">
          <IconHeart className="icon" />
          <img
            src="https://t2.genius.com/unsafe/340x340/https%3A%2F%2Fimages.genius.com%2F8467a617c94ddf00a30396b6ba279d3e.1000x1000x1.jpg"
            alt="Favorite Song"
          />
          <h3>AAMO - DANS L'TRAP</h3>
        </div>
        <div className="singleItem">
          <IconHeart className="icon" />
          <img
            src="https://t2.genius.com/unsafe/340x340/https%3A%2F%2Fimages.genius.com%2F8467a617c94ddf00a30396b6ba279d3e.1000x1000x1.jpg"
            alt="Favorite Song"
          />
          <h3>AAMO - DANS L'TRAP</h3>
        </div>
        <div className="singleItem">
          <IconHeart className="icon" />
          <img
            src="https://t2.genius.com/unsafe/340x340/https%3A%2F%2Fimages.genius.com%2F8467a617c94ddf00a30396b6ba279d3e.1000x1000x1.jpg"
            alt="Favorite Song"
          />
          <h3>AAMO - DANS L'TRAP</h3>
        </div>
      </div>

      <div className="sellers flex">
        <div className="topSellers">
          <div className="heading flex">
            <h3>French Recommendation</h3>
            <button className="btn flex">
              See All
              <IconArrowNarrowRight className="icon" />
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              {reco.map((r: any) => (
                <Tooltip label="Tooltip">
                  <img
                    src={`../recommendations/${r.artist}.jpg`}
                    alt={r.artist}
                  />
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

        {/* <div className="featuredSellers">
          <div className="heading flex">
            <h3>Featured Sellers</h3>
            <button className="btn flex">
              See All
              <MoveRight />
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img
                src="https://placehold.co/600x400/purple/grey?text=User"
                alt="User Image"
              />
              <img
                src="https://placehold.co/600x400/orange/white?text=User"
                alt="User Image"
              />
              <img
                src="https://placehold.co/600x400/green/grey?text=User"
                alt="User Image"
              />
              <img
                src="https://placehold.co/600x400/grey/white?text=User"
                alt="User Image"
              />
            </div>
            <div className="cardText">
              <span>
                28.556 prod sold <br />
                <small>28 sellers</small>
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Playlist;
