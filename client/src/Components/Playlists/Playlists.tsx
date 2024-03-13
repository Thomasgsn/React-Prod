import Top from "./Top/Top";
import Activity from "./Activity/Activity";
import MyPlaylists from "./MyPlaylists/MyPlaylists";
import Sidebar from "../assets/Sidebar/Sidebar";

import "./Playlists.css";

const Playlists = () => {
  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <Top />
          <div className="bottom flex">
            <MyPlaylists />
            <Activity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlists;
