import "./MyPlaylists.css";

const MyPlaylists = ({ navigateTo, playlist, playlistProd }) => {
  return (
    // <div className="myPlaylistsSection">
    //   <div className="heading">
    //     {playlist.map((pl: any) => (
    //       <section className="carousel flex">
    //         <div className="flex" style={{ flexDirection: "column" }}>
    //           <h1 className="playlistTitle">{pl.name}</h1>
    //           <div className="border">
    //             <ul key={pl.id} className="carousel-items">
    //               {playlistProd.map((p: any) =>
    //                 p.idTB === pl.id ? (
    //                   <li key={p.id} className="carousel-item">
    //                     <div className="card">
    //                       <h4 className="card-title">{p.name}</h4>
    //                       <img
    //                         src={"/prods/cover_prods/" + p.name + p.id + ".jpg"}
    //                         alt={`${p.name} By. _oftyn`}
    //                         className="prodCover"
    //                       />
    //                     </div>
    //                   </li>
    //                 ) : (
    //                   <></>
    //                 )
    //               )}
    //             </ul>
    //           </div>
    //         </div>
    //       </section>
    //     ))}
    //   </div>
    // </div>
    <>
      <div className="bentoGrid">
        <div className="flex" id="flex1">
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
        </div>
        <div id="grid">
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
        </div>
        <div className="flex" id="flex2">
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
        </div>
      </div>
    </>
  );
};

export default MyPlaylists;
