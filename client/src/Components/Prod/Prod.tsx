import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import Top from "./Top/Top";
import Listening from "./MyPlaylist/MyPlaylist";
import Sidebar from "../assets/Sidebar/Sidebar";
import ProdDetail from "./ProdDetail/ProdDetail";

import "./Prod.css";

const Prod = () => {

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Faites une requête à votre backend pour récupérer les détails de la prod en utilisant l'ID
    // Utilisez par exemple fetch() ou axios pour cela

    // Exemple (assurez-vous d'ajuster en fonction de votre backend) :
    fetch(`http://localhost:8081/prod/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

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
