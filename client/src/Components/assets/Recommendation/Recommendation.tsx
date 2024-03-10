import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconArrowNarrowRight } from "@tabler/icons-react";

import "./Recommendation.css"

const Recommendation = () => {

    const navigateTo = useNavigate();
   
    const navigateToRecommendation = () => {
      navigateTo("/recommendation");
    };

    const [artistReco, setArtistReco] = useState([]);
    const [nbReco, setNbReco] = useState([]);
    const [nbArtist, setNbArtist] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8081/recovignette")
          .then((response) => response.json())
          .then((data) => {
            setArtistReco(data.artistReco);
            setNbReco(data.nbReco);
            setNbArtist(data.nbArtist);
          })
          .catch((error) =>
            console.error("Erreur lors de la récupération des données :", error)
          );
      }, []);


  return (
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
            <div className="users flex">
              {artistReco.map((a: any) => (
                  <a key={a.nom} href="">
                    <img src={`../recommendations/${a.nom}.jpg`} alt={a.nom} />
                    <p>{a.nom}</p>
                  </a>
              ))}
            </div>
            <div className="cardText">
              <span>
                {nbReco.map((n: any) => (
                  <span key={n.nb}>{n.nb}</span>
                ))}{" "}
                recommendations <br />
                <small>
                  {nbArtist.map((n: any) => (
                    <span key={n.nbArtist}>{n.nbArtist}</span>
                  ))}{" "}
                  artist different.
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Recommendation