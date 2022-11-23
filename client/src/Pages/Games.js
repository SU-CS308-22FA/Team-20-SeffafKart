import React, {useState} from 'react'
import './Home.css'
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';


function Games() {

  const user = useSelector((state) => state.user.currentUser);
  const isLogin = useSelector((state) => state.user.isLogin);
  const isAdmin = useSelector((state) => state.user.admin);

  const handleClick = () => {
    console.log("act")
  }

  return (
    <>
    {isAdmin? 
    (
    <div className="act-box">
      <button className="act-button" onClick={handleClick}>
        <Link className="act-text" style={{textDecoration:'none'}} to="/match">ADD FOOTBALL MATCH</Link>
      </button>
    </div>
    ) :
    (<div>
      GAMES
    </div>)}
    </>
  )
}

export default Games
