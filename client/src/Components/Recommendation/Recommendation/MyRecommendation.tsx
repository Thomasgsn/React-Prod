import "./MyRecommendation.css";

const MyRecommendation = ({ reco, recoName }) => {
  if (!reco) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recoSection">
      <div className="heading flex">
        <h1>Recommendation for {recoName}</h1>
      </div>
      <div className="secContainer flex">

      {reco.map((r: any) => (
          <a key={r.id} href={r.ytLink} className="singleItem">
            <img
              src={"/recommendations/" + recoName + ".jpg"}
              alt={recoName}
            />
            <h3>{r.song}</h3>
          </a>
        ))}

      </div>
    </div>
  );
};

export default MyRecommendation;
