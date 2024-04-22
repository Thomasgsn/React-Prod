import { useState, useEffect } from "react";
import Sidebar from "../Components/assets/Sidebar/Sidebar";
import { IconArrowLeft } from "@tabler/icons-react";

import "./Edit.css";

const Edit = ({ userInfo }) => {
  const [changes, setChanges] = useState("none");

  const DisplayChanges = () => {
    switch (changes) {
      case "none":
        return (
          <ul className="edit">
            <li onClick={() => setChanges("prod")}>prod</li>
            <li onClick={() => setChanges("playlist")}>playlist</li>
            <li onClick={() => setChanges("recommendation")}>recommendation</li>
            <li onClick={() => setChanges("recoArtist")}>
              artist recommendation
            </li>
          </ul>
        );

      case "prod":
        return (
          <div className="editThing">
            <IconArrowLeft
              onClick={() => setChanges("none")}
              className="icon"
            />
            <p>prod</p>
          </div>
        );
      case "playlist":
        return (
          <div className="editThing">
            <IconArrowLeft
              onClick={() => setChanges("none")}
              className="icon"
            />
            <p>playlist</p>
          </div>
        );
      case "recommendation":
        return (
          <div className="editThing">
            <IconArrowLeft
              onClick={() => setChanges("none")}
              className="icon"
            />
            <p>recommendation</p>
          </div>
        );
      case "recoArtist":
        return (
          <div className="editThing">
            <IconArrowLeft
              onClick={() => setChanges("none")}
              className="icon"
            />
            <p>artist recommendation</p>
          </div>
        );

      default:
        return (
          <ul>
            <li>ERROR</li>
          </ul>
        );
    }
    if (changes === null) {
      return <></>;
    }
    return <></>;
  };

  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar {...{ userInfo }} />
        <div className="mainContent">
          Admin Edit
          <div className="bottom flex">
            <DisplayChanges />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
