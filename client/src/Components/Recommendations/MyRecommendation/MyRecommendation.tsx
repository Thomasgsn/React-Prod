import { IconArrowNarrowRight } from "@tabler/icons-react";

import "./MyRecommendation.css";

const MyRecommendation = ({ navigateTo, artistReco, nbReco, nbArtist }) => {
  return (
    <div className="recoSection">
      <div className="heading flex">
        <h1>
          My Recommendations{" "}
        </h1>
        <p>{artistReco.length} recommendations</p>
      </div>
      <div className="secContainer flex">
        {artistReco.map((a: any) => (
          <a key={a.id} href={"/recommendation/" + a.name} className="singleItem">
            <img
              src={"/recommendations/" + a.name + ".jpg"}
              alt={a.name}
            />
            <h3>{a.name}</h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MyRecommendation;
