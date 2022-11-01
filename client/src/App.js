import React, { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [userName, SetUserName] = useState("");
  const [password, SetPassword] = useState("");
  const [email, SetEmail] = useState("");

  const LoginCheck = () => {
    Axios.post("http://localhost:3001/api/login", {
      // userName: userName,
      password: password,
      email: email,
    }).then((response) => {
      console.log(response);
    });
  };
  // const deleteUser = (userName) => {
  //   Axios.delete(`http://localhost:3001/api/delete/${userName}`)
  // };

  return (
    <div className="App">
      <h1> MYCRUD</h1>
      <div className="form">
      <label>Email:</label>
        <input
          type="text"
          name="email"
          onChange={(e) => {
            SetEmail(e.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="text"
          name="password"
          onChange={(e) => {
            SetPassword(e.target.value);
          }}
        />
        {/* <label>Username:</label>
        <input
          type="text"
          name="userName"
          onChange={(e) => {
            SetUserName(e.target.value);
          }}
        /> */}
        

        <button onClick={LoginCheck}>LogIn</button>
        {/* <button onClick={deleteUser(userName)}>Delete</button> */}
      </div>
    </div>
  );
}

export default App;
