import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Top from "./Top/Top";
import ThisPlaylist from "./ThisPlaylist/ThisPlaylist";
import Sidebar from "../assets/Sidebar/Sidebar";

import "./Playlist.css";


const Playlist = () => {
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
          <Top />
          <div className="bottom flex">
            <ThisPlaylist />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
