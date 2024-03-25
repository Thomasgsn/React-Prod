import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Top from "./Top/Top";
import Sidebar from "../assets/Sidebar/Sidebar";
import SelectedProds from "../assets/SelectedProds/SelectedProds";
import Recommendation from "../assets/Recommendation/Recommendation";

import "./Playlist.css";

const Playlist = ({ userInfo }) => {
  const { playlistName } = useParams();

  const [prods, setProds] = useState([]);
  const [filter, setFilter] = useState("date");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  useEffect(() => {
    fetch(`http://localhost:8081/playlist/${playlistName}?filterBy=${filter}&searchBy=${search}&priceRange=${minPrice}-${maxPrice}`)
      .then((response) => response.json())
      .then((playlistProd) => {
        setProds(playlistProd);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, [filter, maxPrice, minPrice, playlistName, search]);

  const navigateTo = useNavigate();

  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <Top {...{
              navigateTo,
              search,
              setSearch,
              filter,
              setFilter,
              minPrice,
              maxPrice,
              setMinPrice,
              setMaxPrice,
              userInfo,
            }} />
          <div className="bottom flex">
            <SelectedProds {...{ playlistName, prods }} />
          </div>
          <Recommendation />
        </div>
      </div>
    </div>
  );
};

export default Playlist;
