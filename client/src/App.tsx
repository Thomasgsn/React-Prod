import Login from "./Components/User/Login/Login";
import Register from "./Components/User/Register/Register";
import OnEnter from "./Components/User/OnEnter/OnEnter";
import Home from "./Components/Home/Home";
import Shop from "./Components/Shop/Shop";
import Prods from "./Components/Prods/Prods";
import Prod from "./Components/Prod/Prod";
import Playlist from "./Components/Playlist/Playlist";
import Recommendation from "./Components/Recommendation/Recommendation";

import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";



import AudioPlayer from "./AudioPlayer/AudioPlayer";




const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <OnEnter />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <Register />
      </div>
    ),
  },
  {
    path: "/home",
    element: (
      <div>
        <Home />
      </div>
    ),
  },
  {
    path: "/shop",
    element: (
      <div>
        <Shop />
      </div>
    ),
  },
  {
    path: "/prods",
    element: (
      <div>
        <Prods />
      </div>
    ),
  },
  {
    path: "/prod/:id",
    element: (
      <div>
        <Prod />
      </div>
    ),
  },
  {
    path: "/playlist",
    element: (
      <div>
        <Playlist />
      </div>
    ),
  },{
    path: "/recommendation",
    element: (
      <div>
        <Recommendation />
      </div>
    ),
  },
  {
    path: "/audio",
    element: (
      <div>
        <AudioPlayer />
      </div>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
