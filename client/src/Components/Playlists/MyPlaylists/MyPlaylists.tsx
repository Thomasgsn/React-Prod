import { IconArrowNarrowRight } from "@tabler/icons-react";

import "./MyPlaylists.css";

const MyPlaylists = ({ navigateTo, playlist, playlistProd }) => {
  return (
    <div className="myPlaylistSection">
      <div className="heading flex">
        <h1>My Playlist</h1>
      </div>
      <div className="secContainer flex">
        {playlist.map((p: any) => (
          <div className="playlists" key={p.id}>
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

            <div className="playlistLastProd flex">
              {playlistProd.map((prod: any) => (
                <span className="prod" key={prod.id}>
                  {prod.idTB === p.id ? (
                    <div>
                      <img
                        onClick={() => navigateTo(`/prod/${prod.id}`)}
                        src={`prods/cover_prods/${prod.name}${prod.id}.jpg`}
                      />
                      <span className="prodTooltip flex">{prod.name}</span>
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
