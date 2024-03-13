import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Top from "./Top/Top";
import Activity from "./Activity/Activity";
import MyPlaylists from "./MyPlaylists/MyPlaylists";
import Sidebar from "../assets/Sidebar/Sidebar";
import Recommendation from "../assets/Recommendation/Recommendation";

import "./Home.css";

const Body = () => {
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

  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <Top {...{ username }} />
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
