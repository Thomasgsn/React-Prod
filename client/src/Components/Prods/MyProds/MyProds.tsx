import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Recommendation from "../../assets/Recommendation/Recommendation";

import "./MyProds.css";

const MyProds = () => {
  const [prods, setProds] = useState([]);

  const navigateTo = useNavigate();
  const navigateToPlaylist = () => {
    navigateTo("/playlist");
  };

  useEffect(() => {
    fetch("http://localhost:8081/prods")
      .then((response) => response.json())
      .then((dataProds) => {
        setProds(dataProds);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, []);

  return (
    <div className="myProdSection">
      <div className="heading flex">
        <h1>My Prods</h1>
      </div>
      <div className="secContainer flex">
        {prods.map((p: any) => (
          <a href={"/prod/" + p.id} className="singleItem">
            <img src={"/cover_prods/" + p.name + p.id +".jpg"} alt={p.name} />
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

export default MyProds;
