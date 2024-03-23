import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Top from "./Top/Top";
import SelectedProds from "../assets/SelectedProds/SelectedProds";
import Sidebar from "../assets/Sidebar/Sidebar";
import Recommendation from "../assets/Recommendation/Recommendation";

import "./Prods.css";

const Prods = ({ user }) => {
  const [prods, setProds] = useState([]);
  const [filter, setFilter] = useState("date");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  useEffect(() => {
    fetch(
      `http://localhost:8081/prods?filterBy=${filter}&searchBy=${search}&priceRange=${minPrice}-${maxPrice}`
    )
      .then((response) => response.json())
      .then((dataProds) => {
        setProds(dataProds);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, [filter, maxPrice, minPrice, search]);
  const navigateTo = useNavigate();

  return (
    <div className="prodsPage flex">
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <Top
            {...{
              navigateTo,
              search,
              setSearch,
              filter,
              setFilter,
              minPrice,
              maxPrice,
              setMinPrice,
              setMaxPrice,
            }}
          />
          <div className="bottom flex">
            <SelectedProds {...{ prods }} />
          </div>
          <Recommendation />
        </div>
      </div>
    </div>
  );
};

export default Prods;
