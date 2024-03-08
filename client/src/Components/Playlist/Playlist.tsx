import Top from "./Top/Top";
import Activity from "./Activity/Activity";
import Listening from "./MyPlaylist/MyPlaylist";
import Sidebar from "../assets/Sidebar/Sidebar";

import "./Playlist.css";

const Playlist = () => {
  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <Top />
          <div className="bottom flex">
            <Listening />
            <Activity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
