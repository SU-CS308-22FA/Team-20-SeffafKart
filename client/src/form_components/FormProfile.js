import React, { useState } from "react";
import "./Form.css";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import {
  updateUserName,
  updateUserEmail,
  updateUserPassword,
  updateUserinfo,
  logoutUser,
} from "../redux/userSlice";

function FormProfile() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  let userId = null;
  console.log("user");
  console.log(user);

  const [deleted, setDeleted] = useState(false);
  const [newUsername, SetNewUsername] = useState("");
  const [newPassword, SetNewPassword] = useState("");
  const [newEmail, SetNewEmail] = useState("");
  const [newUserInfo, SetNewUserInfo] = useState("");

  if (!deleted) {
    userId = user[0].id;
    console.log(userId);
  }

  const updatePassword = (e) => {
    e.preventDefault();
    Axios.put(
      "https://cs308-team20-seffafkart-production.up.railway.app/api/updatepassword",
      {
        password: newPassword,
        id: userId,
      }
    ).then((response) => {
      dispatch(updateUserPassword(newPassword));
      alert("update");
    });
  };

  const updateUsername = (e) => {
    e.preventDefault();
    Axios.put(
      "https://cs308-team20-seffafkart-production.up.railway.app/api/updateusername",
      {
        userName: newUsername,
        id: userId,
      }
    ).then((response) => {
      dispatch(updateUserName(newUsername));
      alert("update");
    });
  };

  const updateEmail = (e) => {
    e.preventDefault();
    Axios.put(
      "https://cs308-team20-seffafkart-production.up.railway.app/api/updateemail",
      {
        email: newEmail,
        id: userId,
      }
    ).then((response) => {
      dispatch(updateUserEmail(newEmail));
      alert("update");
    });
  };

  const updateUserInfo = (e) => {
    e.preventDefault();
    Axios.put(
      "https://cs308-team20-seffafkart-production.up.railway.app/api/updateuserinfo",
      {
        userInfo: newUserInfo,
        id: userId,
      }
    ).then((response) => {
      dispatch(updateUserinfo(newUserInfo));
      alert("update");
    });
  };

  const deleteUser = (e) => {
    e.preventDefault();
    Axios.delete(
      `https://cs308-team20-seffafkart-production.up.railway.app/api/delete/${user[0].username}`
    ).then((response) => {
      setDeleted(true);
      dispatch(logoutUser);
      alert("deleted");
    });
  };

  return (
    <>
      {" "}
      {deleted ? (
        <section>
          <Navigate to="/home" />
        </section>
      ) : (
        <div className="form-profile">
          <div className="form-profile-box">
            <form>
              <div className="form-profile-box-input">
                <label>Username</label>
                <input
                  className="form-profile-username"
                  type="text"
                  placeholder={user[0].username}
                  onChange={(e) => {
                    SetNewUsername(e.target.value);
                  }}
                />
                <div>
                  <button className="form-profile-btn" onClick={updateUsername}>
                    Update Username
                  </button>
                </div>
              </div>
              <div className="form-profile-box-input">
                <label>Email</label>
                <input
                  className="form-profile-email"
                  type="email"
                  placeholder={user[0].email}
                  onChange={(e) => {
                    SetNewEmail(e.target.value);
                  }}
                />
                <div>
                  <button className="form-profile-btn" onClick={updateEmail}>
                    Update Email
                  </button>
                </div>
              </div>
              <div className="form-profile-box-input">
                <label>Change Your Password</label>
                <input
                  className="form-profile-password"
                  type="password"
                  placeholder={user[0].password}
                  onChange={(e) => {
                    SetNewPassword(e.target.value);
                  }}
                />
                <div>
                  <button className="form-profile-btn" onClick={updatePassword}>
                    Update Password
                  </button>
                </div>
              </div>
              <div className="form-profile-box-input">
                <label>About You</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="6"
                  placeholder={user[0].userinfo}
                  onChange={(e) => {
                    SetNewUserInfo(e.target.value);
                  }}
                ></textarea>
                <div>
                  <button className="form-profile-btn" onClick={updateUserInfo}>
                    Update Info
                  </button>
                </div>
              </div>
              {/* <div>
                    <button className='form-profile-btn' onClick=''>Update Profile</button>
                </div> */}
              <div>
                <button className="form-profile-btn-del" onClick={deleteUser}>
                  Delete Your Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default FormProfile;
