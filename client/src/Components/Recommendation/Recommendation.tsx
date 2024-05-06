import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Top from "./Top/Top";
import MyRecommendation from "./Recommendation/MyRecommendation";
import Sidebar from "../assets/Sidebar/Sidebar";

import "./Recommendation.css";

const Recommendation = ({ userInfo }) => {
  const { id } = useParams();
  const [reco, setReco] = useState([]);
  const [recoName, setRecoName] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8081/r/${id}`)
    .then((response) => response.json())
      .then((data) => {
        setReco(data.recom);
        setRecoName(data.recoName[0].name);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, [id]);

  const navigateTo = useNavigate();

  if (isNaN(id)) {
    return (
      <div>
        <div className="homePage flex">
          <div className="container">
        <Sidebar {...{userInfo}} />
            <div className="mainContent">
              <div className="bottom flex">
                We cannot access to this recommendation...
              </div>{" "}
              <button className="btn" onClick={() => navigateTo("/recommendation")}>
                Look all my recommendation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar {...{userInfo}} />
        <div className="mainContent">
          <Top
            {...{
              userInfo,
              navigateTo,
            }}
          />
          <div className="bottom flex">
            <MyRecommendation {...{ reco, recoName }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
