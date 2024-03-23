import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./Components/User/Login/Login";
import Register from "./Components/User/Register/Register";
import OnEnter from "./Components/User/OnEnter/OnEnter";
import Home from "./Components/Home/Home";
import Shop from "./Components/Shop/Shop";
import Prods from "./Components/Prods/Prods";
import Prod from "./Components/Prod/Prod";
import Playlists from "./Components/Playlists/Playlists";
import Playlist from "./Components/Playlist/Playlist";
import Recommendations from "./Components/Recommendations/Recommendations";

import AudioPlayer from "./AudioPlayer/AudioPlayer";

import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/user")
      .then((res) => {
        if (res.data.valid) {
          setUsername(res.data.username);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/user/${username}`)
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des informations utilisateur:', error);
      });
  }, [username]);

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
          <Home {...{ userInfo, username }} />
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
          <AudioPlayer />
        </div>
      ),
    },
    {
      path: "/playlists",
      element: (
        <div>
          <Playlists />
        </div>
      ),
    },
    {
      path: "/playlist/:playlistName",
      element: (
        <div>
          <Playlist />
        </div>
      ),
    },
    {
      path: "/recommendations",
      element: (
        <div>
          <Recommendations />
        </div>
      ),
    },
    {
      path: "/recommendation/:name",
      element: (
        <div>
          <Playlist />
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

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
