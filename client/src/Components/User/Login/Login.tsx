import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconArrowRight, IconLock, IconUser } from "@tabler/icons-react";

import axios from "axios";
import v1 from "../../assets/media/login_movie/1.mp4";
import v2 from "../../assets/media/login_movie/2.mp4";
import oftyn from "../../assets/media/oftyn.png";

import "../User.css";
interface User {
  username_email: string | null;
  password: string;
}

const Login = () => {
  const videos = [v1, v2];
  const randomIndex = Math.floor(Math.random() * videos.length);
  const randomVideo = videos[randomIndex];

  const navigateTo = useNavigate();
  const [user, setUser] = useState<User>({
    username_email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8081/login", user);
      window.location.reload();
    } catch (error) {
      alert(`Error in id or password`);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8081/user").then((res) => {
      if (res.data.valid === true) {
        navigateTo("/home");
      } else {
        navigateTo("/login");
      }
    });
  }, [navigateTo]);

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

          <form className="form grid" onSubmit={handleSubmit}>
            <span className="message">no message</span>

            <div className="inputDiv">
              <div>
                <label htmlFor="username or email">Username or Email</label>
                <div className="input flex">
                  <IconUser className="icon" />
                  <input
                    type="text"
                    name="username_email"
                    autoComplete="username"
                    placeholder="Enter Username or Email"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <div className="input flex">
                  <IconLock className="icon" />
                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter password"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button type="submit" className="btn flex">
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
