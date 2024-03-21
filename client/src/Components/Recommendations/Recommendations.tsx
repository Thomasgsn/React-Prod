import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Top from "./Top/Top";
import MyRecommendation from "./MyRecommendation/MyRecommendation";
import Sidebar from "../assets/Sidebar/Sidebar";

import "./Recommendations.css";

const Recommendation = () => {
  const [username, setUsername] = useState("");
  const navigateTo = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/user")
      .then((res) => {
        if (res.data.valid) {
          setUsername(res.data.username);
        } else {
          navigateTo("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
    <div className="homePage flex">
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <Top />
          <div className="bottom flex">
            <MyRecommendation {...{ navigateTo, artistReco, nbReco, nbArtist }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
