import {
  IconAdjustmentsHorizontal,
  IconArrowBack,
  IconArrowLeft,
  IconCalendarEvent,
  IconCreditCardPay,
  IconFileInvoice,
  IconKey,
  IconShoppingBag,
} from "@tabler/icons-react";
import { useState } from "react";
import { Prods } from "../../../utils/type";
import { useNavigate } from "react-router-dom";

import Loader from "../../../utils/Loader";
import Recommendation from "../../assets/Recommendation/Recommendation";

import "./MyProd.css";

const MyProd = ({ prod }: { prod: Prods }) => {
  const navigateTo = useNavigate();
  const [allowBack, setAllowBack] = useState(false);

  if (!prod) {
    setTimeout(() => {
      setAllowBack(true);
    }, 3000);

    const Return = () => {
      if (!allowBack) return <></>;
      return (
        <button onClick={() => navigateTo("/prods")} className="btn flex">
          Go back
          <IconArrowBack className="icon" />
        </button>
      );
    };

    return (
      <>
        <Loader />
        <Return />
      </>
    );
  }

  return (
    <div className="myPlaylistSection">
      <button onClick={() => navigateTo("/prods")} className="btn flex goBack">
        <IconArrowLeft className="icn" />
        Go back
      </button>
      <div className="heading flex">
        <div className="flex prod">
          <div className="prodInfo grid">
            <div className="infoDiv">
              <h3 className="divTitle">{prod.name} Detail</h3>
              <ul className="menuList grid">
                <li className="listItem">
                  <div className="menuLink flex">
                    <div className="flex typeInfo">
                      <IconFileInvoice className="icon" />
                      <p>Style</p>
                    </div>
                    <span>{prod.typebeat}</span>
                  </div>
                </li>

                <li className="listItem">
                  <div className="menuLink flex">
                    <div className="flex typeInfo">
                      <IconKey className="icon" />
                      <p>Key</p>
                    </div>
                    <span>{prod.key}</span>
                  </div>
                </li>

                <li className="listItem">
                  <div className="menuLink flex">
                    <div className="flex typeInfo">
                      <IconAdjustmentsHorizontal className="icon" />
                      <p>BPM</p>
                    </div>
                    <span>{prod.BPM}</span>
                  </div>
                </li>

                <li className="listItem">
                  <div className="menuLink flex">
                    <div className="flex typeInfo">
                      <IconCreditCardPay className="icon" />
                      <p>Price</p>
                    </div>
                    <span>{prod.price} €</span>
                  </div>
                </li>

                <li className="listItem">
                  <div className="menuLink flex">
                    <div className="flex typeInfo">
                      <IconCalendarEvent className="icon" />
                      <p>Release</p>
                    </div>
                    <span>{prod.releaseDate.slice(0, 10)}</span>
                  </div>
                </li>

                <li className="listItem">
                  <div className="menuLink flex">
                    <div className="flex typeInfo">
                      <IconShoppingBag className="icon" />
                      <p>Buy it</p>
                    </div>
                    <span>
                      <a
                        href={`https://www.instrurap.fr/beats/track/${prod.instrurapLink}`}
                      >
                        here
                      </a>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <img
            src={`/prods/${prod.cover}`}
            alt={`${prod.name} By. _oftyn`}
            className="prodCover"
          />
        </div>
      </div>
      <Recommendation />
    </div>
  );
};

export default MyProd;
