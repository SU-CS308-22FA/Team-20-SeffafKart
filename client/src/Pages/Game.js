import React, {useState, useEffect} from 'react'
import './Game.css'
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {Link, useLocation} from 'react-router-dom';


function Game(props) {
  const location = useLocation();
  const [match_data, setMatchData] = useState("");
  const [admin_acts, setAdminActs] = useState([]);
  const match_id = location.state;
  const user = useSelector((state) => state.user.currentUser);

  let posRate = 0
  let negRate = 0
  const [pR, setPosRate] = useState();
  const [nR, setNegRate] = useState();
  const [posclick, setPosClick] = useState(false);
  const [negclick, setNegClick] = useState(false);
  const [ctr, setCtr] = useState(0);
  const [voted, setVoted] = useState({});


  const handlePos = async (id,rate) => {
    if(voted[id] === "neg") {
        setPosClick(true)
        posRate = rate + 1;
        handleDecNeg(id);
    } else if (voted[id] === "pos" && posclick){
        posRate = rate - 1;
        setPosClick(false)
    } else {
        setPosClick(true)
        posRate = rate + 1;
    }
    setPosRate(posRate)
    Axios.put("http://localhost:3001/api/updateposrate", {
      act_rate_pos: posRate,
      admin_act_id: id,
      user_id: user[0].id,
    }).then((response) => {
        setCtr(ctr+1);
        alert("update");
        voted[id] = "pos";
        setVoted(voted);
    });
  }

const handleNeg = async (id,rate) => {
    if(voted[id] === "pos") {
        negRate = rate + 1;
        setNegClick(true)
        handleDecPos(id);
    } else if (voted[id] === "neg" && negclick){
        negRate = rate - 1;
        setNegClick(false)
    } else {
        setNegClick(true)
        negRate = rate + 1;
    }
    setNegRate(negRate)
    
    Axios.put("http://localhost:3001/api/updatenegrate", {
      act_rate_neg: negRate,
      admin_act_id: id,
      user_id: user[0].id,
    }).then((response) => {
        setCtr(ctr+1);
        alert("update");
        voted[id] = "neg";
        setVoted(voted);
    });
  }

  const handleDecPos = (id) => {
    voted[id] = "";
    Axios.put("http://localhost:3001/api/decreaseposrate", {
      admin_act_id: id,
      user_id: user[0].id,
    })
  }

  const handleDecNeg = (id) => {
    voted[id] = "";
    Axios.put("http://localhost:3001/api/decreasenegrate", {
      admin_act_id: id,
      user_id: user[0].id,
    })
  }

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
}, [ctr])


const adminActs = admin_acts.map((act, index) => {
  return (
  <div className="act-box-game">
    <span className='act-box-time'>{act.act_time}</span>
    <span className='act-box-info'>
      {act.act_info}
    </span>
    <div className='act-box-bottom'>
      <button className="act-box-comments">
      <Link className="text" style={{textDecoration:'none'}} to="/comments" state={act.admin_act_id}>Comment</Link>
      </button>
      <div className='act-box-rate'>
      <label>{act.act_rate_pos}</label>
      <i className="postIconLike fas fa-thumbs-up" onClick={() => handlePos(act.admin_act_id,act.act_rate_pos)}></i>
      <i className="postIconDislike fas fa-thumbs-down" onClick={() => handleNeg(act.admin_act_id,act.act_rate_neg)}></i>
      <label>  {act.act_rate_neg}</label>
      </div>
    </div>
  </div>
  )});



  return (
    <>
    <div className='outside-container'>
        <div className='match-container'>
          <text className="match-date">{match_data.date}</text>
          <text className="match-info"> 
          {match_data.home_team} -  {match_data.away_team}
          </text>
          <div className="match-bottom">
            <text  className="match-time">Match time: {match_data.time}</text>

            <text className="match-location">Location: {match_data.location}</text>
          </div>
        </div>
        <hr/>
        <div className='bottom-container'>
          <div className='act-container'>
            {adminActs}
          </div>
          <div className='referee-container'>

          </div>
        </div>
    </div>
    </>
  )
}

export default Game
