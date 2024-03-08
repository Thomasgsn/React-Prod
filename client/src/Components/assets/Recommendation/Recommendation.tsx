import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { Tooltip } from "@chakra-ui/react";

const Recommendation = () => {

    const navigateTo = useNavigate();
   
    const navigateToRecommendation = () => {
      navigateTo("/recommendation");
    };

    const [artistReco, setArtistReco] = useState([]);
    const [nb, setNb] = useState([]);
    const [nbArtist, setNbArtist] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8081/home")
          .then((response) => response.json())
          .then((data) => {
            setArtistReco(data.artistReco);
            setNb(data.nb);
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
                {nb.map((n: any) => (
                  <>{n.nb}</>
                ))}{" "}
                recommendations <br />
                <small>
                  {nbArtist.map((n: any) => (
                    <>{n.nbArtist}</>
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