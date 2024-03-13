import { useNavigate } from "react-router-dom";
import { IconArrowNarrowRight } from "@tabler/icons-react";

import "./MyPlaylists.css";

const MyPlaylists = ({playlist}) => {

  const navigateTo = useNavigate();
  const navigateToPlaylists = () => {
    navigateTo("/playlists");
  };

  return (
    <div className="myPlaylistSection">
      <div className="heading flex">
        <h1>My Playlist</h1>
        <button onClick={navigateToPlaylists} className="btn flex">
          See All
          <IconArrowNarrowRight className="icon" />
        </button>
      </div>
      <div className="secContainer flex">
        {playlist.map((p: any) => (
          <a key={p.id} href={"/playlist/" + p.name.toLowerCase()} className="singleItem">
            <img
              src={"/prods/cover_prods/" + p.prod_name + p.prod_id + ".jpg"}
              alt={p.name}
            />
            <h3>{p.name}</h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MyPlaylists;
