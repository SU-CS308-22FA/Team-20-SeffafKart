import React, { useState, useEffect, useRef, useContext } from "react";
import validate from "./validateInfo";
import useForm from "./useForm";
import { Navigate } from 'react-router-dom';
import Axios from "axios";
import "./Form.css";

function FormLogin() {

  const [password, SetPassword] = useState("");
  const [email, SetEmail] = useState("");
  const [errMsg,setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [loginStatus, setLoginStatus] = useState("");

  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

    

  const LoginCheck = async (e) => {
    e.preventDefault();
      Axios.post("http://localhost:3001/api/login", {
      // userName: userName,
      password: password,
      email: email,
      }).then((response) => {

        if(response.data.message) {
          setLoginStatus(response.data.message)
        }
        else {
          setSuccess(true)
        }
      });
  };

  const { handleSubmit, values, errors } = useForm(validate);

  const [details, setDetails] = useState({ email: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();

    //Login(details);
  };

  return (
    <>
    {success ? (
      <section>
        <Navigate to="/" />
      </section>
    ) : (
      <div className="form-content-right">
      <form onSubmit={LoginCheck} className="form" noValidate>
        <h1>Login</h1>
        <div className="form-inputs">
          <label className="form-label">Enter your email</label>
          <input
            className="form-input"
            type="text"
            name="email"
            ref={userRef}
            value={email}
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
            value={password}
            placeholder="Password"
            onChange={(e) => {
              SetPassword(e.target.value);
            }}
          />
          {/* {errors.username && <p>{errors.username}</p>} */}
        </div>
        <button className="form-input-btn" type="submit">
          Login
        </button>
        <h1>{loginStatus}</h1>

        <span className="form-input-login">
          Do not have an account? Register <a href="/sign-up">here</a>
        </span>
      </form>
    </div>
    )}
    </>
  );
}

export default FormLogin;