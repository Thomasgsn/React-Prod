import Top from "./Top/Top";
import Listening from "./MyProds/MyProds";
import Sidebar from "../assets/Sidebar/Sidebar";

import "./Prods.css";

const Prods = () => {
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
      </div>
    </div>
  );
};

export default Prods;
