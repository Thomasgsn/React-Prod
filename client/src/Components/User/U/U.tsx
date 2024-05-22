import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserInfo, UserVisit } from "../../../utils/type";

import axios from "axios";
import Cookies from "js-cookie";
import Sidebar from "../../assets/Sidebar/Sidebar";

import "./U.css";

const U = ({ userInfo }: { userInfo: UserInfo }) => {
  const id = Number(useParams().id);
  const navigateTo = useNavigate();

  const [userVisit, setUserVisit] = useState<UserVisit>({
    id: 0,
    username: "",
    avatar: "",
    detail: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8081/u/${id}`)
      .then((response) => response.json())
      .then((results) => {
        setUserVisit(results.userVisit);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, [id]);

  if (isNaN(id)) {
    if (userInfo) {
      navigateTo("/u/" + userInfo.id);
    } else navigateTo("/login");
  }

  const [displayEdit, setDisplayEdit] = useState<boolean>(false);

  const [newUser, setNewUser] = useState<UserVisit>({
    id: 0,
    username: "",
    avatar: "",
    detail: "",
    email: "",
    role: "",
  });
  useEffect(() => {
    setNewUser(userInfo);
  }, [userInfo]);

  const [emailError, setEmailError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError(null);
      }
    }
  };
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
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

    if (newUser.username != userInfo.username) {
      const confirmEdit = window.confirm(
        "Will changing your username log you out, are you sure?"
      );
      if (!confirmEdit) {
        return;
      }
      Cookies.remove("connectId", { path: "/", domain: "localhost" });
      navigateTo("/login");
    }

    const formData = new FormData();
    formData.append("newUser", JSON.stringify(newUser));

    if (file) {
      formData.append("file", file);
    }

    try {
      await axios.post("http://localhost:8081/updateuser", formData);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const logout = () => {
    Cookies.remove("connectId", { path: "/", domain: "localhost" });
    navigateTo("/login");
  };

  const text = (text: string) => {
    return text.split("\n").map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ));
  };

  return (
    <div className="homePage flex">
      <div className="container">
        <Sidebar {...{ userInfo }} />
        <div className="mainContent">
          <div className="bottom u">
            {userVisit != undefined ? (
              <>
                <div className=" userSeeInfo flex">
                  {userVisit != null ? (
                    <div>
                      {displayEdit ? (
                        <div className="seeInfo">
                          <form className="flex top" onSubmit={handleSubmit}>
                            <div className="avatar flex">
                              <img
                                src={
                                  imagePreview
                                    ? imagePreview
                                    : `/avatars/${userInfo.avatar}`
                                }
                                alt="Preview"
                                style={{ maxWidth: "100px" }}
                              />
                            </div>
                            <input
                              type="file"
                              name="file"
                              className="file"
                              onChange={handleFileChange}
                            />
                            <div className="flex userInfo">
                              <div className="flex">
                                <input
                                  type="text"
                                  maxLength={23}
                                  name="username"
                                  onChange={handleChange}
                                  placeholder={newUser.username}
                                  defaultValue={newUser.username}
                                />
                                <div className="btns flex">
                                  <button type="submit" className="btn edit">
                                    Update profil
                                  </button>
                                  <button
                                    onClick={() => setDisplayEdit(!displayEdit)}
                                    className="btn edit"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                          <div className="detail">
                            <div className="flex">
                              <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                placeholder={newUser.email}
                                defaultValue={newUser.email}
                              />
                            </div>
                            <textarea
                              type="text"
                              name="detail"
                              onChange={handleChange}
                              placeholder={newUser.detail}
                              defaultValue={newUser.detail}
                              style={{ width: "80%", height: "10rem" }}
                            ></textarea>
                          </div>
                        </div>
                      ) : (
                        <div className="seeInfo">
                          <div className="flex top">
                            <div className="avatar flex">
                              <img
                                src={`/avatars/${userVisit.avatar}`}
                                alt={`${userVisit.username} avatar`}
                              />
                            </div>
                            <div className="flex userInfo">
                              <div>
                                <div className="flex">
                                  <h3>{userVisit.username}</h3>
                                  <div className="btns flex">
                                    {userVisit?.id == userInfo.id ? (
                                      <>
                                        <button
                                          className="btn edit"
                                          onClick={() =>
                                            setDisplayEdit(!displayEdit)
                                          }
                                        >
                                          Edit profil
                                        </button>
                                        <button
                                          className="btn edit"
                                          onClick={logout}
                                        >
                                          Logout
                                        </button>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="detail">
                            <div className="flex">
                              <p>{userVisit.email}</p>
                            </div>
                            {userVisit.detail && (
                              <p>{text(userVisit.detail)}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>user not found</>
                  )}
                </div>
              </>
            ) : (
              <>user not found</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default U;
