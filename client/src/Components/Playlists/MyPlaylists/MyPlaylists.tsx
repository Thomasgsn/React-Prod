import { IconArrowNarrowRight } from "@tabler/icons-react";

import "./MyPlaylists.css";

const MyPlaylists = ({ navigateTo, playlist, playlistProd }) => {
  return (
    <div className="myPlaylistsSection">
      <div className="heading flex">
        <h1>My Playlists</h1>
      </div>
      <div className="secContainer flex">
        {playlist.map((p: any) => (
          <div className="singleItem" key={p.id}>
            <div className="playlistHeader flex">
              <span className="playlistName">{p.name}</span>
              <button
                onClick={() => navigateTo(`/playlist/${p.name.toLowerCase()}`)}
                className="btn flex"
              >
                See All
                <IconArrowNarrowRight className="icon" />
              </button>
            </div>

            <div className="playlistLastProd">
              {playlistProd.map((prod: any) => (
                <span className="prod" key={prod.id}>
                  {prod.idTB === p.id ? (
                    <div>
                      <img
                        src={`prods/cover_prods/${prod.name}${prod.id}.jpg`}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPlaylists;
