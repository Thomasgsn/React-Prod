import {
  IconUser,
  IconBell,
  IconSearch,
  IconCircleLetterX,
} from "@tabler/icons-react";

import "./Top.css";

const Top = ({ navigateTo,  search, setSearch, }) => {
  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="find flex">
          <label>Find by :</label>
          <div className="flex" style={{ flexDirection: "column" }}>
            <button onClick={() => navigateTo("/prods")} className="btn">
              All prods
            </button>
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
            <IconCircleLetterX className="icon" onClick={() => setSearch("")} />
          )}
        </div>

        <div className="userCenter flex">
          <a href="#notification">
            <IconBell className="icon" />
          </a>
          <a href="#user">
            <IconUser className="icon" />
          </a>
        </div>
      </div>
      <div className="secSection flex"></div>
    </div>
  );
};

export default Top;
