import {
  IconUser,
  IconSearch,
  IconArrowDown,
  IconSeparator,
  IconArrowUp,
  IconX,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../../utils/type";
import { Dispatch, SetStateAction } from "react";

import "./Top.css";

const Top = ({
  search,
  setSearch,
  filter,
  setFilter,
  userInfo,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  userInfo: UserInfo;
}) => {
  const navigateTo = useNavigate();

  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="orders flex">
          <label>Order by:</label>
          <div className="flex orderItem">
            {filter === "date" || filter === "dateinv" ? (
              <button
                className="btn flex"
                style={{
                  backgroundColor: "var(--primarySecondColor)",
                  color: "var(--primaryColor)",
                }}
                onClick={() => {
                  filter === "date" ? setFilter("dateinv") : setFilter("date");
                }}
              >
                Date{" "}
                {filter === "date" ? (
                  <IconArrowUp className="icon" />
                ) : (
                  <IconArrowDown className="icon" />
                )}
              </button>
            ) : (
              <button className="btn flex" onClick={() => setFilter("date")}>
                Date <IconSeparator className="icon" />
              </button>
            )}

            {filter === "nbReco" || filter === "nbRecoinv" ? (
              <button
                className="btn flex"
                style={{
                  backgroundColor: "var(--primarySecondColor)",
                  color: "var(--primaryColor)",
                }}
                onClick={() => {
                  filter === "nbReco"
                    ? setFilter("nbRecoinv")
                    : setFilter("nbReco");
                }}
              >
                Number of recommendations{" "}
                {filter === "nbReco" ? (
                  <IconArrowUp className="icon" />
                ) : (
                  <IconArrowDown className="icon" />
                )}
              </button>
            ) : (
              <button className="btn flex" onClick={() => setFilter("nbReco")}>
                Number of recommendations <IconSeparator className="icon" />
              </button>
            )}

            {filter === "name" || filter === "nameinv" ? (
              <button
                className="btn flex"
                style={{
                  backgroundColor: "var(--primarySecondColor)",
                  color: "var(--primaryColor)",
                }}
                onClick={() => {
                  filter === "name" ? setFilter("nameinv") : setFilter("name");
                }}
              >
                Name{" "}
                {filter === "name" ? (
                  <IconArrowDown className="icon" />
                ) : (
                  <IconArrowUp className="icon" />
                )}
              </button>
            ) : (
              <button className="btn flex" onClick={() => setFilter("name")}>
                Name
                <IconSeparator className="icon" />
              </button>
            )}
          </div>
        </div>

        <div className="searchBar flex">
          <input
            onChange={(event) => {
              const filteredValue = event.target.value.replace(/["']/g, "");
              setSearch(filteredValue);
            }}
            value={search}
            type="text"
            placeholder="Search"
          />
          {!search || search == "" ? (
            <IconSearch className="icon" />
          ) : (
            <IconX className="icon" onClick={() => setSearch("")} />
          )}
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
      <div className="secSection flex"></div>
    </div>
  );
};

export default Top;
