import "./Sidebar.css";
import oftyn from "../media/oftyn.png";
import {
  IconHome,
  IconMusic,
  IconBrandSafari,
  IconFileDownload,
  IconUserCircle,
  IconTrendingUp,
  IconNotebook,
  IconCreditCard,
  IconInfoCircle,
} from "@tabler/icons-react";

const Sidebar = () => {
  return (
    <div className="sidebar grid">
      <div className="logoDiv flex">
        <img src={oftyn} alt="oftyn" className="logo" />
        <h2>_oftyn</h2>
      </div>

      <div className="menuDiv">
        <h3 className="divTitle">Musical Menu</h3>
        <ul className="menuList grid">
          <li className="listItem">
            <a href="/home" className="menuLink flex">
              <IconHome className="icon" />
              <span className="smallText">Home</span>
            </a>
          </li>

          <li className="listItem">
            <a href="/shop" className="menuLink flex">
              <IconBrandSafari className="icon" />
              <span className="smallText">
                Explore <span className="removeText">Shop</span>
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="/prods" className="menuLink flex">
              <IconMusic className="icon" />
              <span className="smallText">All Prods</span>
            </a>
          </li>

          <li className="listItem">
            <a href="/playlists" className="menuLink flex">
              <IconFileDownload className="icon" />
              <span className="smallText">Free Prods</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="settingsDiv">
        <h3 className="divTitle">_oftyn Menu</h3>
        <ul className="menuList grid">
          <li className="listItem">
            <a href="/aboutme" className="menuLink flex">
              <IconUserCircle className="icon" />
              <span className="smallText">About Me</span>
            </a>
          </li>

          <li className="listItem">
            <a href="/contacts" className="menuLink flex">
              <IconNotebook className="icon" />
              <span className="smallText">Contacts</span>
            </a>
          </li>

          <li className="listItem">
            <a href="/home" className="menuLink flex">
              <IconCreditCard className="icon" />
              <span className="smallText">Payment</span>
            </a>
          </li>
        </ul>
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
  );
};

export default Sidebar;
