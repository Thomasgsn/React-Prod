import { useNavigate } from "react-router-dom";

import {
  IconArrowNarrowRight,
  IconInfoCircle,
  IconUser,
  IconBell,
  IconSearch,
} from "@tabler/icons-react";

import "./Top.css";
import v1 from "../../../assets/login_movie/1.mp4";
import v2 from "../../../assets/login_movie/2.mp4";

const Top = () => {
  const videos = [v1, v2];
  const randomIndex = Math.floor(Math.random() * videos.length);
  const randomVideo = videos[randomIndex];

  const navigateTo = useNavigate();
  const navigateToExploreMore = () => {
    navigateTo("/home");
  };
  const navigateToAllProds = () => {
    navigateTo("/home");
  };

  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="title">
          <h1>
            Welcome to the <i>_oftyn shop</i>.
          </h1>
          <p>Hello IconUser, Welcome back!</p>
        </div>
        <div className="IconSearchBar flex">
          <input type="text" placeholder="IconSearch" />
          <IconSearch className="icon" />
        </div>

        <div className="adminDiv flex">
          <a href="#notification">
            <IconBell className="icon" />
          </a>
          <a href="#IconUser">
            <IconUser className="icon" />
          </a>
        </div>
      </div>

      <div className="cardSection flex">
        <div className="rightCard flex">
          <h1>Use the best production</h1>
          <p>With my prods, get the result you want !</p>

          <div className="buttons flex">
            <button onClick={navigateToExploreMore} className="btn">
              Explore More
            </button>
            <button onClick={navigateToAllProds} className="btn transparent">
              All Prods
            </button>
          </div>

          <div className="videoDiv">
            <video src={randomVideo} autoPlay muted loop></video>
          </div>
        </div>

        <div className="leftCard flex">
          <div className="main flex">
            <div className="textDiv">
              <h1>My Stats</h1>
              <div className="flex">
                <span>
                  This Mounth <br /> <small>4 Orders</small>
                </span>
                <span>
                  Total <br /> <small>142 Orders</small>
                </span>
              </div>

              <span className="flex link">
                Go to my orders
                <IconArrowNarrowRight className="icon" />
              </span>
            </div>

            <div className="sidebarCard">
              <IconInfoCircle className="icon" />
              <div className="cardContent">
                <div className="circle1"></div>
                <div className="circle2"></div>

                <h3>Report a bug!</h3>
                <p>You find a bug, tell me about it.</p>
                <button className="btn">Report</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;