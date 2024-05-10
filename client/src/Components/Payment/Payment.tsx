import { UserInfo } from "../../utils/type";

import Top from "./Top/Top";
import Sidebar from "../assets/Sidebar/Sidebar";

import "./Payment.css";

const Payment = ({ userInfo }: { userInfo: UserInfo }) => {
  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar {...{ userInfo }} />
        <div className="mainContent">
          <Top {...{ userInfo }} />
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

export default Payment;