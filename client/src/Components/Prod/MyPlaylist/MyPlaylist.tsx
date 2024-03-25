import Recommendation from "../../assets/Recommendation/Recommendation";

import "./MyPlaylist.css";

const MyPlaylist = ({ prod }) => {

  if (!prod) {
    return <div>Loading...</div>;
  }

  return (
    <div className="myPlaylistSection">
      <div className="heading flex">
        <div>
          <h1>This Prod</h1>
          <p>id : {prod.id}</p>
          <p>name : {prod.name}</p>
          <p>tag : {prod.tag}</p>
          <p>BPM : {prod.BPM} bpm</p>
          <p>key : {prod.key}</p>
          <p>price : {prod.price} €</p>
          <p>releaseDate : {prod.releaseDate}</p>
          <p>idTB : {prod.idTB}</p>
          <img
            src={`/prods/cover_prods/${prod.name}${prod.id}.jpg`}
            alt={`${prod.name} By. _oftyn`}
          />
        </div>
      </div>
      <Recommendation />
    </div>
  );
};

export default MyPlaylist;
