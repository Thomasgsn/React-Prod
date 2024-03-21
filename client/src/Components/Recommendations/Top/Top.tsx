import {
  IconUser,
  IconBell,
  IconSearch,
  IconArrowDown,
  IconSeparator,
  IconArrowUp,
  IconCircleLetterX,
} from "@tabler/icons-react";

import "./Top.css";

const Top = ({
  navigateTo,
  search,
  setSearch,
  filter,
  setFilter,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) => {
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
                nbReco{" "}
                {filter === "nbReco" ? (
                  <IconArrowDown className="icon" />
                ) : (
                  <IconArrowUp className="icon" />
                )}
              </button>
            ) : (
              <button className="btn flex" onClick={() => setFilter("nbReco")}>
                nbReco <IconSeparator className="icon" />
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
                Name<IconSeparator className="icon" />
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
