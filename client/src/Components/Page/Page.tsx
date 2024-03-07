import Home from "./Home/Home";
import Playlist from "./Playlist/Playlist";
import Sidebar from "./Sidebar/Sidebar";
import "./Page.css";

const Page = () => {

  const Body = () => {
    const body = window.location.pathname
    console.log(body)
    if (body === '/home') return <Home />
    if (body === '/shop') return <Home />
    if (body === '/prod') return <Home />
    if (body === '/playlist') return <Playlist />
    if (body === '/recommendation') return <>  <Playlist /></>
    
    return <Home />
    
  }

  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar />
        <Body />
      </div>
    </div>
  );
};

export default Page;
