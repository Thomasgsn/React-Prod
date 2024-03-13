import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Top from "./Top/Top";
import Listening from "./MyPlaylist/MyPlaylist";
import Sidebar from "../assets/Sidebar/Sidebar";
import ProdDetail from "./ProdDetail/ProdDetail";

import "./Prod.css";

const Prod = () => {
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
            <Listening />
          </div>
        </div>
        <ProdDetail />
      </div>
    </div>
  );
};

export default Prod;
