import Recommendation from "../../assets/Recommendation/Recommendation";

import {
  IconAdjustmentsHorizontal,
  IconCalendarEvent,
  IconCreditCardPay,
  IconFileInvoice,
  IconKey,
} from "@tabler/icons-react";

import "./MyProd.css";

const MyProd = ({ prod }) => {
  if (!prod) {
    return <div>Loading...</div>;
  }

  return (
    <div className="myPlaylistSection">
      <div className="heading flex">
        <div>
          <div className="prodInfo grid">
            <div className="menuDiv">
              <h3 className="divTitle">{prod.name} Detail</h3>
              <ul className="menuList grid">
                <li className="listItem">
                  <p className="menuLink flex">
                    <IconFileInvoice className="icon" />
                    <span className="smallText">{prod.typebeat}</span>
                  </p>
                </li>

                <li className="listItem">
                  <p className="menuLink flex">
                    <IconKey className="icon" />
                    <span className="smallText">{prod.key}</span>
                  </p>
                </li>

                <li className="listItem">
                  <p className="menuLink flex">
                    <IconAdjustmentsHorizontal className="icon" />
                    <span className="smallText">{prod.BPM} BPM</span>
                  </p>
                </li>

                <li className="listItem">
                  <p className="menuLink flex">
                    <IconCreditCardPay className="icon" />
                    <span className="smallText">{prod.price} €</span>
                  </p>
                </li>

                <li className="listItem">
                  <p className="menuLink flex">
                    <IconCalendarEvent className="icon" />
                    <span className="smallText">
                      {prod.releaseDate ? prod.releaseDate.slice(0, 10) : <></>}
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <img  
          src={`/prods/cover_prods/${prod.cover}`}
          alt={`${prod.name} By. _oftyn`}
          className="prodCover"
        />
      </div>
      <Recommendation />
    </div>
  );
};

export default MyProd;
