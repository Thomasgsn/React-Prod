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
import Recommendation from "./Components/Recommendation/Recommendation";
import AboutMe from "./Components/AboutMe/AboutMe";
import U from "./Components/User/U/U";

import Edit from "./Edit/Edit";

import AudioPlayer from "./AudioPlayer/AudioPlayer";

import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [id, setId] = useState(null);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/user")
      .then((res) => {
        if (res.data.valid) {
          setId(res.data.id)
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8081/api/user/${id}`)
        .then((response) => {
          setUserInfo(response.data.result[0]);
        })
        .catch((error) => {
          console.error(
            "Une erreur s'est produite lors de la récupération des informations utilisateur:",
            error
          );
        });
    }
  }, [id]);

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
          <Home {...{ userInfo }} />
        </div>
      ),
    },
    {
      path: "/shop",
      element: (
        <div>
          <Shop {...{ userInfo }} />
        </div>
      ),
    },
    {
      path: "/prods",
      element: (
        <div>
          <Prods {...{ userInfo }} />
        </div>
      ),
    },
    {
      path: "/prod/:id",
      element: (
        <div>
          <Prod {...{ userInfo }} />
          <AudioPlayer />
        </div>
      ),
    },
    {
      path: "/playlists",
      element: (
        <div>
          <Playlists {...{ userInfo }} />
        </div>
      ),
    },
    {
      path: "/playlist/:playlistName",
      element: (
        <div>
          <Playlist {...{ userInfo }} />
        </div>
      ),
    },
    {
      path: "/recommendations",
      element: (
        <div>
          <Recommendations {...{ userInfo }} />
        </div>
      ),
    },
    {
      path: "/r/:id",
      element: (
        <div>
          <Recommendation {...{ userInfo }} />
        </div>
      ),
    },
    {
      path: "/aboutme",
      element: (
        <div>
          <AboutMe {...{ userInfo }} />
        </div>
      ),
    },
    {
      path: "/u/:id",
      element: (
        <div>
          <U {...{ userInfo }} />
        </div>
      ),
    },
  {
      path: "/edit",
      element: (
        <div>
          <Edit {...{ userInfo }} />
        </div>
      ),
    },
    {
      path: "/edit/:section",
      element: (
        <div>
          <Edit {...{ userInfo }} />
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
