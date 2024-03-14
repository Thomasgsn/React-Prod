import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Top from "./Top/Top";
import MyPlaylists from "./MyPlaylists/MyPlaylists";
import Sidebar from "../assets/Sidebar/Sidebar";
import Recommendation from "../assets/Recommendation/Recommendation";

import "./Playlists.css";

const Playlists = () => {

  const [playlist, setPlaylist] = useState([]);
  const [playlistProd, setPlaylistProd] = useState([]);

  const navigateTo = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8081/playlists")
      .then((response) => response.json())
      .then((data) => {
        setPlaylist(data.playlist);
        setPlaylistProd(data.playlistProd);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, []);



  const [username, setUsername] = useState("");
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
  
  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <Top {...{ username }}/>
          <div className="bottom flex">
            <MyPlaylists {...{ navigateTo, playlist, playlistProd }} />
          </div>
      <Recommendation />
        </div>
      </div>
    </div>
  );
};

export default Playlists;
