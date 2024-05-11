import { UserInfo, Prods } from "../../utils/type";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Top from "./Top/Top";
import MyProd from "./MyProd/MyProd";
import Sidebar from "../assets/Sidebar/Sidebar";

import "./Prod.css";

const Prod = ({ userInfo }: { userInfo: UserInfo }) => {
  const navigateTo = useNavigate();

  const id = Number(useParams().id);

  const [prod, setProd] = useState<Prods>({
    id,
    name: "",
    tag: "",
    coverProdFile: "",
    prodFile: "",
    instrurapLink: "",
    BPM: 0,
    key: "",
    price: 0,
    prod_name: "",
    cover: "",
    releaseDate: "",
    idTB: 0,
    typebeat: "",
  });

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
            <Sidebar {...{ userInfo }} />
            <div className="mainContent">
              <div className="bottom flex">
                We cannot access to this production...
              </div>{" "}
              <button className="btn" onClick={() => navigateTo("/prods")}>
                Find a prod
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar {...{ userInfo }} />
        <div className="mainContent">
          <Top {...{ userInfo }} />
          <div className="bottom flex">
            <MyProd {...{ prod }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prod;
