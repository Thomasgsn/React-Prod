import { useState } from "react";
import { IconDice5 } from "@tabler/icons-react";
import "./MyPlaylists.css";

const MyPlaylists = ({ navigateTo, playlist }) => {
  const [index1, setIndex1] = useState(
    Math.floor(Math.random() * playlist.length)
  );
  const [index2, setIndex2] = useState(
    Math.floor(Math.random() * playlist.length)
  );

  if (index1 == index2) {
    if (index1 == playlist.length) {
      setIndex2(index2 - 1);
    } else {
      setIndex2(index2 + 1);
    }
  }

  const reloadIndex = () => {
    setIndex1(Math.floor(Math.random() * playlist.length));
    setIndex2(Math.floor(Math.random() * playlist.length));

    if (index1 == index2) {
      if (index1 == playlist.length) {
        setIndex2(index2 - 1);
      } else {
        setIndex2(index2 + 1);
      }
    }
  };

  return (
    <div className="myPlaylistsSection">
      <IconDice5 className="icon" onClick={reloadIndex} />
      <div className="bentoGrid flex">
        <div className="col flex">
          <div className="content duu full between">
            <div className="flex full">
              <div className="item full">
                {playlist[index1] ? (
                  <div
                    className="playlist"
                    // onClick={navigateTo(
                    //   "/playlist/" + playlist[index].name.toLowerCase()
                    // )}
                  >
                    <img
                      src={
                        "/prods/cover_prods/" +
                        playlist[index1].prod_name +
                        playlist[index1].prod_id +
                        ".jpg"
                      }
                      alt={playlist[index1].name}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="item full">
              {playlist[index2] ? (
                  <div
                    className="playlist"
                    // onClick={navigateTo(
                    //   "/playlist/" + playlist[index].name.toLowerCase()
                    // )}
                  >
                    <img
                      src={
                        "/prods/cover_prods/" +
                        playlist[index2].prod_name +
                        playlist[index2].prod_id +
                        ".jpg"
                      }
                      alt={playlist[index2].name}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className="uqq full">
            <div className="item full">test</div>
          </div>
        </div>

        <div className="col flex">
          <div className="line flex">
            <div className="item full">test</div>
          </div>
        </div>

        <div className="col flex">
          <div className="content uqq full">
            <div className="item full">test</div>
          </div>

          <div className="duu full between">
            <div className="flex full">
              <div className="item full">
                <div className="plus full flex">+ 7</div>
              </div>
              <div className="item full">
                <div className="plus full">+ 7</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPlaylists;
