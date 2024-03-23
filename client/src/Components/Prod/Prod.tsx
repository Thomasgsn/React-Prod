import Top from "./Top/Top";
import Listening from "./MyPlaylist/MyPlaylist";
import Sidebar from "../assets/Sidebar/Sidebar";
import ProdDetail from "./ProdDetail/ProdDetail";

import "./Prod.css";

const Prod = ({ user }) => {
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
