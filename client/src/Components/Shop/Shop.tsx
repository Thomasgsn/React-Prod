import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Top from "./Top/Top";

import Sidebar from "../assets/Sidebar/Sidebar";

import "./Shop.css";

const Shop = ({ user }) => {
  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <Top />
          <div className="bottom flex">
            {/* <Listening />
            <Activity /> */}
            <p>Maintenance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
