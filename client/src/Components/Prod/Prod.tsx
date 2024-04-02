import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Top from "./Top/Top";
import Listening from "./MyPlaylist/MyPlaylist";
import Sidebar from "../assets/Sidebar/Sidebar";
import ProdDetail from "./ProdDetail/ProdDetail";

import "./Prod.css";

const Prod = ({ userInfo }) => {
  const navigateTo = useNavigate();

  const { id } = useParams();

  const [prod, setProd] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8081/prod/${id}`)
      .then((response) => response.json())
      .then((prodDetail) => {
        setProd(prodDetail[0]);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, [id]);

  if (isNaN(id)) {
    return (
      <div>
        <div className="homePage flex">
          <div className="container">
            <Sidebar />
            <div className="mainContent">
              <div className="bottom flex">
                We cannot access to this production...
              </div>{" "}
              <button className="btn" onClick={() => navigateTo("/prods")}>Find a prod</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <Top {...{ userInfo }} />
          <div className="bottom flex">
            <Listening {...{ prod }} />
          </div>
        </div>
        <ProdDetail {...{ prod }} />
      </div>
    </div>
  );
};

export default Prod;
