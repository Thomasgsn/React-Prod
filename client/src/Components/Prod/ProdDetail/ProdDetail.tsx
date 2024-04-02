import "./ProdDetail.css";

const ProdDetail = ({ prod }) => {
  return (
    <div className="sidebarProdInfo grid">
      <div className="menuDiv">
        <h3 className="divTitle">{prod.name} Detail</h3>
        <ul className="menuList grid">
          <li className="listItem">
            <p className="menuLink flex">
              <span className="smallText">{prod.BPM} BPM</span>
            </p>
          </li>

          <li className="listItem">
            <p className="menuLink flex">
              <span className="smallText">{prod.idTB}</span>
            </p>
          </li>

          <li className="listItem">
            <p className="menuLink flex">
              <span className="smallText">{prod.key}</span>
            </p>
          </li>

          <li className="listItem">
            <p className="menuLink flex">
              <span className="smallText">{prod.BPM} BPM</span>
            </p>
          </li>

          <li className="listItem">
            <p className="menuLink flex">
              <span className="smallText">{prod.price} €</span>
            </p>
          </li>

          <li className="listItem">
            <p className="menuLink flex">
              <span className="smallText">{prod.releaseDate}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProdDetail;
