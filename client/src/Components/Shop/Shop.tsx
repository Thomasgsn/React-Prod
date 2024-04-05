import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Top from "./Top/Top";
import Activity from "../assets/Activity/Activity";
import MyPlaylists from "./MyPlaylists/MyPlaylists";
import Sidebar from "../assets/Sidebar/Sidebar";
import Recommendation from "../assets/Recommendation/Recommendation";

import "./Shop.css";

const Shop = ({userInfo }) => {
  const navigateTo = useNavigate()
  const [playlist, setPlaylist] = useState([]);
  const [playlistProd, setPlaylistProd] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8081/shop`)
      .then((response) => response.json())
      .then((data) => {
        setPlaylist(data.playlist);
        setPlaylistProd(data.playlistProd);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, []);

  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar />
        <div className="shopContent">
          <Top {...{ userInfo, navigateTo }} />
          <div className="bottom flex">
            <MyPlaylists {...{ navigateTo, playlist , playlistProd }} />
          </div>
          <Recommendation />
        </div>
      </div>
    </div>
  );
};

export default Shop;
