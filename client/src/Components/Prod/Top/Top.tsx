import { useNavigate } from "react-router-dom";

import {
  IconUser,
  IconSearch,
} from "@tabler/icons-react";

import "./Top.css";

const Top = ({ userInfo }) => {
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
        <div className="searchBar flex">
          <input type="text" placeholder="Search" />
          <IconSearch className="icon" />
        </div>

        <div className="adminDiv flex">
          <a onClick={() => {userInfo ? navigateTo(`/u/${userInfo.id}`) : navigateTo('/login')}}>
            <IconUser className="icon" />
          </a>
        </div>
      </div>

      {/* <div className="cardSection flex">
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
              <h1>My Prods</h1>
              <div className="flex">
                <span>
                  This Mounth <br />{" "}
                  <small>
                    {prodMounth.map((p: any) => (
                      <>{p.nbProdMounth}</>
                    ))}{" "}
                    Prods done
                  </small>
                </span>
                <span>
                  All Time <br />{" "}
                  <small>
                    {prodTotal.map((p: any) => (
                      <>{p.nbProd}</>
                    ))}{" "}
                    Prods done
                  </small>
                </span>
              </div>

              <span className="flex link">
                Go to my Shop
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
      </div>*/}
    </div>
  );
};

export default Top;
