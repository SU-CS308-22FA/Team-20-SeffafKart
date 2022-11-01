import React, { useState } from "react";
import validate from "./validateInfo";
import useForm from "./useForm";
import Axios from "axios";
import "./Form.css";

function FormLogin() {
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

  const { handleSubmit, values, errors } = useForm(validate);

  const [details, setDetails] = useState({ email: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();

    //Login(details);
  };

  return (
    <div className="form-content-right">
      <form onSubmit={handleSubmit} className="form" noValidate>
        <h1>Login</h1>
        <div className="form-inputs">
          <label className="form-label">Enter your email</label>
          <input
            className="form-input"
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              SetEmail(e.target.value);
            }}
          />
          {/* {errors.username && <p>{errors.username}</p>} */}
        </div>
        <div className="form-inputs">
          <label className="form-label">Enter your password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              SetPassword(e.target.value);
            }}
          />
          {/* {errors.username && <p>{errors.username}</p>} */}
        </div>
        <button className="form-input-btn" type="submit" onClick={LoginCheck}>
          Login
        </button>
        <span className="form-input-login">
          Do not have an account? Register <a href="/sign-up">here</a>
        </span>
      </form>
    </div>
  );
}

export default FormLogin;
