import Page from "./Components/Page/Page";
import Login from "./Components/User/Login/Login";
import Register from "./Components/User/Register/Register";
import OnEnter from "./Components/User/OnEnter/OnEnter";

import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
        <Page />
      </div>
    ),
  },
  {
    path: "/shop",
    element: (
      <div>
        <Page />
      </div>
    ),
  },{
    path: "/prod",
    element: (
      <div>
        <Page />
      </div>
    ),
  },
  {
    path: "/playlist",
    element: (
      <div>
        <Page />
      </div>
    ),
  },{
    path: "/recommendation",
    element: (
      <div>
        <Page />
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
