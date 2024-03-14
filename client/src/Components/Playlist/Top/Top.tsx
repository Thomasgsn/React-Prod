import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatsProd from "../../assets/StatsProds/StatsProd";

import {
  IconArrowNarrowRight,
  IconInfoCircle,
  IconUser,
  IconBell,
  IconSearch,
} from "@tabler/icons-react";

import "./Top.css";
import v1 from "../../assets/media/login_movie/1.mp4";
import v2 from "../../assets/media/login_movie/2.mp4";

const Top = ({ username }) => {
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
          <p>
            Hello <span className="welcomeUser">{username}</span>, Welcome back!
          </p>
        </div>
        <div className="searchBar flex">
          <input type="text" placeholder="Search" />
          <IconSearch className="icon" />
        </div>

        <div className="adminDiv flex">
          <a href="#notification">
            <IconBell className="icon" />
          </a>
          <a href="#user">
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
        <StatsProd />
      </div>
    </div>
  );
};

export default Top;
