import Top from "./Top/Top";
import Activity from "./Activity/Activity";
import Listening from "./MyPlaylist/MyPlaylist";

import './Playlist.css'

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Listening />
        <Activity />
      </div>
    </div>
  );
};

export default Body;
