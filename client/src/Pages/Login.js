import React, {useState} from 'react';
import '../form_components/Form.css'
import FormLogin from '../form_components/FormLogin';
import Home from './Home';

const Login = () => {
    const [isLogin, setIsLogin] = useState(false);
    function submitForm() {
        setIsLogin(true);
    }
    
    return (
        <>
      <div className='form-background'>
        <div className='form-container'>
        <span className='close-btn'>×</span>
        {/* {!isLogin ? (
          <FormLogin submitForm={submitForm} />
        ) : (
          <Home />
        )} */}
        <FormLogin/>
      </div>
      </div>
    </>
    )
}

export default Login;