import React, {useState} from 'react'
import './Home.css'
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import Archive from './Archive';


function Home() {

  const user = useSelector((state) => state.user.currentUser);
  const isLogin = useSelector((state) => state.user.isLogin);
  console.log(isLogin)
  
  const isAdmin = useSelector((state) => state.user.admin);
  console.log(isAdmin)

  const handleClick = () => {
    console.log("act")
  }

  return (
    <>
    <div>
    {isAdmin? 
    (
    <div className="act-box">
      <button className="act-button" onClick={handleClick}>
        <Link className="act-text" style={{textDecoration:'none'}} to="/match">ADD FOOTBALL MATCH</Link>
      </button>
    </div>
    ) :
    (<></>)}
    </div>
    <div>
    <Archive />
    </div>
    </>
  )
}

export default Home
