import React, { useState } from "react";
import "../form_components/Form.css";
import FormSignup from "../form_components/FormSignup";
import Home from "./Home";

const Sign_up = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <>
      <div className="form-background">
        <div className="form-container">
          <span className="close-btn">×</span>
          {!isSubmitted ? <FormSignup /> : <Home />}
        </div>
      </div>
    </>
  );
};

export default Sign_up;

/*<div className='form-content-left'>
          <img className='form-img' src='img/img-3.png' alt='spaceship' />
        </div> */
