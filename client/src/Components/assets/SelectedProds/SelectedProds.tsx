import "./SelectedProds.css";

const SelectedProds = ({ playlistName, prods }) => {
  return (
    <div className="prodSection">
      <div className="heading flex">
        <h1>
          My Prods{" "}
          {playlistName && playlistName != "" ? (
            <span>
              in <i>{playlistName}</i> playlist
            </span>
          ) : (
            <></>
          )}
        </h1>
        <p>{prods.length} prods</p>
      </div>
      <div className="secContainer flex">
        {prods.map((p: any) => (
          <a key={p.name} href={"/prod/" + p.id} className="singleItem">
            <img
              src={"/prods/cover_prods/" + p.name + p.id + ".jpg"}
              alt={`${p.name} By. _oftyn`}
            />
            <div className="price flex">
              {p.price !== 0 ? <p>{p.price} €</p> : <p>[FREE]</p>}
            </div>
            <h3>{p.name}</h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SelectedProds;
