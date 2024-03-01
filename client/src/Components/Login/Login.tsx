import { Link } from "react-router-dom";
import {
  IconUserShield,
  IconArrowNarrowRight,
  IconShieldLock,
} from "@tabler/icons-react";
import "./Login.css";
import v1 from "../assets/login_movie/1.mp4";
import v2 from "../assets/login_movie/2.mp4";
import oftyn from "../assets/oftyn.png";
import { useState } from "react";
import Axios from "axios";

const Login = () => {
  const videos = [v1, v2];
  const randomIndex = Math.floor(Math.random() * videos.length);
  const randomVideo = videos[randomIndex];

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const loginUser = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:8081/login', {
      LoginUsername: loginUsername,
      LoginPassword: loginPassword
    }).then((response: any)=> {
      console.log(response)
    })
  }

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
            <span className="showMessage">Login</span>
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <IconUserShield className="icon" />
                <input type="text" id="username" placeholder="Enter Username"
                onChange={(event) => {
                    setLoginUsername(event.target.value);
                  }}/>
              </div>

              <div className="inputDiv">
                <label htmlFor="password">Password</label>
                <div className="input flex">
                  <IconShieldLock className="icon" />
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    onChange={(event) => {
                      setLoginPassword(event.target.value);
                    }}/>
                </div>

                <button type="submit" className="btn flex" onClick={loginUser}>
                  <span>Login</span>
                  <IconArrowNarrowRight className="icon" />
                </button>
              </div>
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
