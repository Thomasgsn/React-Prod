import { useState, useEffect } from "react";

import Top from "./Top/Top";
import Activity from "../assets/Activity/Activity";
import MyPlaylists from "./MyPlaylists/MyPlaylists";
import Sidebar from "../assets/Sidebar/Sidebar";
import Recommendation from "../assets/Recommendation/Recommendation";

import "./Home.css";

const Body = ({userInfo }) => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/home")
      .then((response) => response.json())
      .then((dataPlaylist) => {
        setPlaylist(dataPlaylist);
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
          <Top {...{ userInfo }} />
          <div className="bottom flex">
            <MyPlaylists {...{ playlist }} />
            <Activity />
          </div>
          <Recommendation />
        </div>
      </div>
    </div>
  );
};

export default Body;
