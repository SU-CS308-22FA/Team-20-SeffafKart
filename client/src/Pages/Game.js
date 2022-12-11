import React, {useState, useEffect} from 'react'
import './Home.css'

import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {Link, useLocation} from 'react-router-dom';


function Game(props) {
  const location = useLocation();
  const [match_data, setMatchData] = useState("");
  const [admin_acts, setAdminActs] = useState("");
  const match_id = location.state;

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/football_match/${match_id}`)
    .then(res => {
        setMatchData(res.data[0])
    }).catch(err => console.log(err))
    Axios.get(`http://localhost:3001/api/admin_acts/match_id=${match_id}`)
    .then(res => {
        setAdminActs(res.data)
    }).catch(err => console.log(err))
    console.log("ne zaman")
}, [])

  return (
    <>
    <div>{match_data.location}
    </div>
    </>
  )
}

export default Game
