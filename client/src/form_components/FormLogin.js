import React, {useState} from 'react'
import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';


function FormLogin({Login,error,submitForm}) {
    const {handleSubmit, values, errors} = useForm(
        submitForm,
        validate
    );

    const [details, setDetails] = useState({email:"",password:""});
  
    const submitHandler = e => {
        e.preventDefault();

        Login(details);
    }

    
    return (
    <div className='form-content-right'>
        <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Login
        </h1>
        <div className='form-inputs'>
        <label className='form-label'>Enter your email</label>
        <input
            className='form-input'
            type='text'
            name='email'
            placeholder='Email'
            value={details.email}
            onChange={e => setDetails({...details, email: e.target.value})}
          />
          {/* {errors.username && <p>{errors.username}</p>} */}
        </div>
        <div className='form-inputs'>
        <label className='form-label'>Enter your password</label>
        <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Password'
            value={details.password}
            onChange={e => setDetails({...details, password: e.target.value})}
          />
          {/* {errors.username && <p>{errors.username}</p>} */}
        </div>
        <button className='form-input-btn' type='submit'>
          Login
        </button>
        <span className='form-input-login'>
          Do not have an account? Register <a href='/sign-up'>here</a>
        </span>
        </form>
    </div>
  )
}

export default FormLogin;
