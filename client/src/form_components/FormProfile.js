import React from 'react'
import './Form.css'


function FormProfile() {
  return (
    <div className='form-profile'>
        <div className='form-profile-box'>
            <form>
                <div className='form-profile-box-input'>
                    <label>Username</label>
                    <input className='form-profile-username' type='text' placeholder=''/>
                </div>
                <div className='form-profile-box-input'>
                    <label>Email</label>
                    <input className='form-profile-email' type='email' placeholder=''/>
                </div>
                <div className='form-profile-box-input'>
                    <label>Change Your Password</label>
                    <input className='form-profile-password' type='password' placeholder=''/>
                </div>
                <div className='form-profile-box-input'>
                    <label>About You</label>
                    <textarea name='' id='' cols='30' rows='6' placeholder='About you..'></textarea>
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
