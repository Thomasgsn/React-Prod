import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

import { IconArrowRight, IconLock, IconUser } from "@tabler/icons-react";

import "../User.css";
import v1 from "../../assets/media/login_movie/1.mp4";
import v2 from "../../assets/media/login_movie/2.mp4";
import oftyn from "../../assets/media/oftyn.png";
import axios from "axios";

const Login = () => {
  const videos = [v1, v2];
  const randomIndex = Math.floor(Math.random() * videos.length);
  const randomVideo = videos[randomIndex];

  const navigateTo = useNavigate();

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  axios.defaults.withCredentials = true;
  const loginUser = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    Axios.post("http://localhost:8081/login", {
      LoginUsername: loginUsername,
      LoginPassword: loginPassword,
    })
      .then((res) => {
        if (res.data.Login) {
          navigateTo("/home");
        } else {
          alert(`Error in id or password`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:8081/user')
    .then (res => {
      if(res.data.valid) {
        navigateTo('/home')
      } else {
        navigateTo('/login')
      }
    })
  },[])

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={randomVideo} autoPlay muted loop />

          <div className="textDiv">
            <h2 className="title">Find the best production for your needs</h2>
            <p>Free & low price prods !</p>
          </div>

          <div className="footerDiv flex">
            <span className="text">Don't have an account ?</span>
            <Link to="/register">
              <button className="btn">Sign Up</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={oftyn} alt="Logo Oftyn" />
            <h3>Welcome Back !</h3>
          </div>

          <form action="" className="form grid">
            <span className="message">no message</span>

            <div className="inputDiv">
              <div>
                <label htmlFor="username">Username</label>
                <div className="input flex">
                  <IconUser className="icon" />
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter Username"
                    onChange={(event) => {
                      setLoginUsername(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <div className="input flex">
                  <IconLock className="icon" />
                  <input
                    type="password"
                    id="password"
                    autoComplete='current-password'
                    placeholder="Enter password"
                    onChange={(event) => {
                      setLoginPassword(event.target.value);
                    }}
                  />
                </div>
              </div>
              <button type="submit" className="btn flex" onClick={loginUser}>
                <span>Login</span>
                <IconArrowRight className="icon" />
              </button>
            </div>
            <span className="forgotPassword">
              Forgot your password ? <a href="">click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
