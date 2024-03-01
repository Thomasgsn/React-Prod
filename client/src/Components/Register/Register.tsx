import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconUserShield,
  IconArrowNarrowRight,
  IconShieldLock,
  IconMail,
} from "@tabler/icons-react";
import "./Register.css";
import v1 from "../assets/login_movie/1.mp4";
import v2 from "../assets/login_movie/2.mp4";
import oftyn from "../assets/oftyn.png";
import Axios from "axios";

const Register = () => {
  const videos = [v1, v2];
  const randomIndex = Math.floor(Math.random() * videos.length);
  const randomVideo = videos[randomIndex];

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createUser = () => {
    Axios.post("http://localhost:8081/register", {
      Email: email,
      Username: username,
      Password: password,
    }).then(() => {
      console.log("User has been created");
    });
  };

  return (
    <div className="registerPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={randomVideo} autoPlay muted loop />

          <div className="textDiv">
            <h2 className="title">Find the best production for your needs</h2>
            <p>Free & low price prods !</p>
          </div>

          <div className="footerDiv flex">
            <span className="text">Already have an account ?</span>
            <Link to="/">
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={oftyn} alt="Logo Oftyn" />
            <h3>Welcome !</h3>
          </div>

          <form action="" className="form grid">
            <span className="showMessage">Register</span>
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <IconUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </div>

              <label htmlFor="email">Email</label>
              <div className="input flex">
                <IconMail className="icon" />
                <input
                  type="text"
                  id="email"
                  placeholder="Enter Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
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
                      setPassword(event.target.value);
                    }}
                  />
                </div>

                <button type="submit" className="btn flex" onClick={createUser}>
                  <span>Register</span>
                  <IconArrowNarrowRight className="icon" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
