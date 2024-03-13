import { useState, useEffect } from "react";
import Top from "./Top/Top";
import MyProds from "./MyProds/MyProds";
import Sidebar from "../assets/Sidebar/Sidebar";
import Recommendation from "../assets/Recommendation/Recommendation";

import "./Prods.css";

const Prods = () => {
  const [prods, setProds] = useState([]);
  const [filter, setFilter] = useState("date");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8081/prods?filterBy=${filter}&searchBy=${search}`)
      .then((response) => response.json())
      .then((dataProds) => {
        setProds(dataProds);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, [filter, search]);

  return (
    <div className="prodsPage flex">
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
            <MyProds
              {...{
                prods,
              }}
            />
          </div>
          <Recommendation />
        </div>
      </div>
    </div>
  );
};

export default Prods;
