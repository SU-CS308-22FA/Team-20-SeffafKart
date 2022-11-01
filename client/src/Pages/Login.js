import React, { useState } from "react";
import "../form_components/Form.css";
import FormLogin from "../form_components/FormLogin";
import Home from "./Home";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  function submitForm() {
    setIsLogin(true);
    console.log("login");
  }

  return (
    <>
      <div className="form-background-login">
        <h1 className="login-welcome">WELCOME</h1>
        <div className="form-container-login">
          <span className="close-btn">×</span>
          {!isLogin ? <FormLogin /> : <Home />}
        </div>
      </div>
    </>
  );
};

export default Login;
