import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Recommendation from "../../assets/Recommendation/Recommendation";

import "./MyPlaylist.css";

const MyPlaylist = () => {
  const [prod, setProd] = useState([]);

  const navigateTo = useNavigate();
  const navigateToPlaylist = () => {
    navigateTo("/playlist");
  };

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8081/prod/${id}`)
      .then((response) => response.json())
      .then((prodDetail) => {
        setProd(prodDetail[0]);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, [id]);

  if (isNaN(id)) {
    return <div>We cannot access to this production...</div>;
  }

  if (!prod) {
    return <div>Loading...</div>;
  }

  return (
    <div className="myPlaylistSection">
      <div className="heading flex">
        <div>
          <h1>This Prod</h1>
          <p>id : {prod.id}</p>
          <p>name : {prod.name}</p>
          <p>tag : {prod.tag}</p>
          <p>BPM : {prod.BPM} bpm</p>
          <p>key : {prod.key}</p>
          <p>price : {prod.price} €</p>
          <p>releaseDate : {prod.releaseDate}</p>
          <p>idTB : {prod.idTB}</p>
          <img
            src={`/prods/cover_prods/${prod.name}${prod.id}.jpg`}
            alt={`${prod.name} By. _oftyn`}
          />
        </div>
      </div>
      <Recommendation />
    </div>
  );
};

export default MyPlaylist;
