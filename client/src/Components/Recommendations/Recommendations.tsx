import { useEffect, useState } from "react";

import Top from "./Top/Top";
import MyRecommendation from "./MyRecommendation/MyRecommendation";
import Sidebar from "../assets/Sidebar/Sidebar";

import "./Recommendations.css";

const Recommendation = ({ user }) => {
  const [artistReco, setArtistReco] = useState([]);

  const [filter, setFilter] = useState("date");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      `http://localhost:8081/recommendations?filterBy=${filter}&searchBy=${search}`
    )
      .then((response) => response.json())
      .then((dataArtistReco) => {
        setArtistReco(dataArtistReco);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, [filter, search]);

  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <Top
            {...{
              search,
              setSearch,
              filter,
              setFilter,
            }}
          />
          <div className="bottom flex">
            <MyRecommendation {...{ artistReco }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
