import { IconUser } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
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
            Hello{" "}
            <span className="welcomeUser">
              {userInfo ? userInfo.username : <></>}
            </span>
            , you want one of my prods ?
          </p>
        </div>

        <div className="user flex">
          {userInfo.role === "admin" && (
            <span style={{ color: "red", fontWeight: "700" }}>ADMIN</span>
          )}
          <span className="name">
            {userInfo.username ? (
              <a href={`/u/${userInfo.id}`}>{userInfo.username}</a>
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
      go directly to this link to buy my prods
      <br />
      <a href="https://www.instrurap.fr/p/_Oftyn">link</a>
    </div>
  );
};

export default Top;
