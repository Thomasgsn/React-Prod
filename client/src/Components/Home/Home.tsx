import Body from "./Body/Body";
import Sidebar from "./Sidebar/Sidebar";
import "./Home.css";

const Home = () => {
  // const [prods, setProds] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:8081/home")
  //     .then((res) => res.json())
  //     .then((data) => setProds(data))
  //     .catch((err) => console.error(err));
  // });

  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar />
        <Body />
        {/* <a href="/">Log Out</a>
        <div className="prodDisplay">
          <thead>
            <th>Name</th>
            <th>Cover</th>
            <th>BPM</th>
            <th>Key</th>
            <th>Price</th>
            <th>Tag</th>
            <th>Release</th>
            <th>Type Beat</th>
          </thead>
          <tbody>
            {prods.map((prod: any, i) => (
              <tr key={i}>
                <td>{prod.name}</td>
                <td>
                  <img
                    className="coverProd"
                    src={`../cover_prods/${prod.cover}`}
                    alt={`${prod.name} by _oftyn`}
                  ></img>
                </td>
                <td>{prod.BPM}</td>
                <td>{prod.key}</td>
                <td>{prod.price == 0 ? "[Free]" : prod.price}</td>
                <td>{prod.tag}</td>
                <td>{prod.realseDate}</td>
                <td>{prod.idTB}</td>
              </tr>
            ))}
          </tbody>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
