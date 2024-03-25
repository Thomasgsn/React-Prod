import StatsProd from "../../assets/StatsProds/StatsProd";

import { IconUser } from "@tabler/icons-react";

import "./Top.css";
import v1 from "../../assets/media/login_movie/1.mp4";
import v2 from "../../assets/media/login_movie/2.mp4";

const Top = ({ userInfo, navigateTo }) => {
  const videos = [v1, v2];
  const randomIndex = Math.floor(Math.random() * videos.length);
  const randomVideo = videos[randomIndex];
  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="title">
          <h1>
            As a french producer, I want share my french inspiration
          </h1>
          <p>
            hey{" "}
            <span className="welcomeUser">
              {userInfo ? userInfo.username : <></>}
            </span>
            , did you know any new artists through me ?
          </p>
        </div>
        <div className="adminDiv flex">
          <a onClick={() => {userInfo ? navigateTo(`/u/${userInfo.id}`) : navigateTo('/login')}}>
            <IconUser className="icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Top;
