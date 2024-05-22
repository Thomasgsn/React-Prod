import StatsProd from "../../assets/StatsProds/StatsProd";

import { IconUser } from "@tabler/icons-react";

import "./Top.css";
import v1 from "../../assets/media/login_movie/1.mp4";
import v2 from "../../assets/media/login_movie/2.mp4";
import { useNavigate } from "react-router-dom";

import { UserInfo } from "../../../utils/type";

const Top = ({ userInfo }: { userInfo: UserInfo }) => {
  const videos = [v1, v2];
  const randomIndex = Math.floor(Math.random() * videos.length);
  const randomVideo = videos[randomIndex];
  const navigateTo = useNavigate();
  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="title">
          <h1>
            Welcome to the <i>_oftyn shop</i>.
          </h1>
          <p>
            Hello{" "}
            <span className="welcomeUser">
              {userInfo ? userInfo.username : <></>}
            </span>
            , Welcome back!
          </p>
        </div>
        <div className="user flex">
        {userInfo.role === "admin" && (
          <span style={{ color: "red", fontWeight: "700" }}>ADMIN</span>
        )}
        <span className="name">
          {userInfo.username ? (
            <a href={`/u/${userInfo.id}`}>
              {userInfo.username}
            </a>
          ) : (
            <div className="flex">
              <a href={`/login`}>
                <span style={{ fontWeight: "700" }}>LOGIN</span>
              </a>
              <p>or</p>
              <a href={`/register`}>
                <span style={{ fontWeight: "700", marginLeft: ".5rem" }}>
                  REGISTER
                </span>
              </a>
            </div>
          )}
        </span>
        {userInfo.avatar && (
          <a href={userInfo.avatar ? `/u/${userInfo.id}` : "/login"}>
            <div className="avatar flex">
              <img
                src={`/avatars/${userInfo.avatar}`}
                alt={`${userInfo.username} avatar`}
              />
            </div>
          </a>
        )}
        </div>
      </div>

      <div className="cardSection flex">
        <div className="rightCard flex">
          <h1>Use the best production</h1>
          <p>With my prods, get the result you want !</p>

          <div className="buttons flex">
            <button onClick={() => navigateTo("/shop")} className="btn">
              Explore More
            </button>
            <button
              onClick={() => navigateTo("/prods")}
              className="btn transparent"
            >
              All Prods
            </button>
          </div>

          <div className="videoDiv">
            <video src={randomVideo} autoPlay muted loop></video>
          </div>
        </div>
        <StatsProd />
      </div>
    </div>
  );
};

export default Top;
