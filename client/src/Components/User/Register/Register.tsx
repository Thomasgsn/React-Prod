import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

import {
  IconArrowRight,
  IconLock,
  IconUser,
  IconMail,
  IconPhoto,
  IconFileInfo,
} from "@tabler/icons-react";

import "../User.css";
import v1 from "../../assets/media/login_movie/1.mp4";
import v2 from "../../assets/media/login_movie/2.mp4";
import oftyn from "../../assets/media/oftyn.png";
import axios from "axios";

interface NewUser {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const videos = [v1, v2];
  const randomIndex = Math.floor(Math.random() * videos.length);
  const randomVideo = videos[randomIndex];
  const navigateTo = useNavigate();
  const [user, setUser] = useState<NewUser>({
    username: "",
    email: "",
    password: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [emailError, setEmailError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError(null);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0];

      if (!selectedFile.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        event.target.value = "";
        return;
      }

      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailError) {
      alert("Check your email address");
      return;
    }

    const formData = new FormData();
    formData.append("user", JSON.stringify(user));

    if (file) {
      formData.append("file", file);
    }

    for (const values of formData.values()){
      console.log(values)
    }

    try {
      await axios.post("http://localhost:8081/register", formData);
      navigateTo("/login");
    } catch (error) {
      console.error("Error:", error);
    }
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
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <form className="form grid" onSubmit={handleSubmit}>
            <span className="showMessage">Register</span>

            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <IconUser className="icon" />
                <input
                  required
                  type="text"
                  name="username"
                  autoComplete="username"
                  onChange={handleChange}
                  placeholder="Enter Usernamer"
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="Mail">Mail</label>
              <div className="input flex">
                <IconMail className="icon" />
                <input
                  required
                  type="text"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  placeholder="Enter Mail"
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <IconLock className="icon" />
                <input
                  required
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
              </div>

              <div className="inputDiv">
                <label htmlFor="avatar">Avatar</label>
                <div className="input flex">
                  <IconPhoto className="icon" />
                  <input
                    required
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ maxWidth: "100px" }}
                    />
                  )}
                </div>

                <button type="submit" className="btn flex">
                  <span>Register</span>
                  <IconArrowRight className="icon" />
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
