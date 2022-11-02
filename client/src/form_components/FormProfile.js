import React from 'react'
import './Form.css'
import { useDispatch, useSelector } from "react-redux";


function FormProfile() {
    const user = useSelector((state) => state.user.currentUser);
    console.log(user);


  return (
    <div className='form-profile'>
        <div className='form-profile-box'>
            <form>
                <div className='form-profile-box-input'>
                    <label>Username</label>
                    <input className='form-profile-username' type='text'  placeholder={user[0].userName}/>
                </div>
                <div className='form-profile-box-input'>
                    <label>Email</label>
                    <input className='form-profile-email' type='email' placeholder={user[0].email}/>
                </div>
                <div className='form-profile-box-input'>
                    <label>Change Your Password</label>
                    <input className='form-profile-password' type='password' placeholder={user[0].password}/>
                </div>
                <div className='form-profile-box-input'>
                    <label>About You</label>
                    <textarea name='' id='' cols='30' rows='6' placeholder={user[0].userInfo}></textarea>
                </div>
                <div>
                    <button className='form-profile-btn' onClick=''>Update Profile</button>
                </div>
                <div>
                <button className='form-profile-btn-del' onClick=''>Delete Your Profile</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default FormProfile
