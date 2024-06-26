import { useNavigate } from "react-router-dom";
import { IconUser } from "@tabler/icons-react";
import { UserInfo } from "../../../utils/type";

import "./Top.css";

const Top = ({ userInfo }: { userInfo: UserInfo }) => {
  const navigateTo = useNavigate();

  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="title">
          <h1>
            Welcome to the <i>_oftyn shop</i>.
          </h1>
          <p>
            Hey{" "}
            <span className="welcomeUser">
              {userInfo ? userInfo.username : <></>}
            </span>
            , do you like this prod ? <a>Purchase it !</a>
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
    </div>
  );
};

export default Top;
