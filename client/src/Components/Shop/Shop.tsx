import Top from "./Top/Top";
import Activity from "./Activity/Activity";
import Listening from "./MyPlaylist/MyPlaylist";
import Sidebar from "../assets/Sidebar/Sidebar";

import "./Shop.css";

const Shop = () => {
  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <Top />
          <div className="bottom flex">
            {/* <Listening />
            <Activity /> */}
            <p>Maintenance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
