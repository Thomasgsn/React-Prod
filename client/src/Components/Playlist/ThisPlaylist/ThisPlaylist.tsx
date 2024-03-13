import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconArrowNarrowRight } from "@tabler/icons-react";

import "./ThisPlaylist.css";
import Recommendation from "../../assets/Recommendation/Recommendation";

const ThisPlaylist = () => {
  const [prods, setProds] = useState([]);

  const { playlistName } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8081/playlist/${playlistName}`)
      .then((response) => response.json())
      .then((playlistProd) => {
        setProds(playlistProd);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, [playlistName]);

  console.log(prods);

  return (
    <div className="myPlaylistSection">
      <div className="heading flex">
        <h1>{prods.length} prods in <i>{playlistName.slice(0, 1).toUpperCase() + playlistName.slice(1)}</i> Playlist</h1>
      </div>
      <div className="secContainer flex">
      {prods.map((p: any) => (
          <a key={p.name} href={"/prod/" + p.id} className="singleItem">
            <img
              src={"/prods/cover_prods/" + p.name + p.id + ".jpg"}
              alt={`${p.name} By. _oftyn`}
            />
            <div className="price flex">
              {p.price !== 0 ? <p>{p.price} €</p> : <p>[FREE]</p>}
            </div>
            <h3>{p.name}</h3>
          </a>
        ))}
      </div>
      <Recommendation />
    </div>
  );
};

export default ThisPlaylist;
