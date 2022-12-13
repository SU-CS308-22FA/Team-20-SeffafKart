import React, {useState, useEffect} from 'react'
import './Game.css'
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {Link, useLocation} from 'react-router-dom';
import StarRating from '../components/StarRating';


function Game(props) {
  const location = useLocation();
  const [match_data, setMatchData] = useState("");
  const [admin_acts, setAdminActs] = useState([]);
  const match_id = location.state;
  const user = useSelector((state) => state.user.currentUser);
  let text = ""
  let posRate = 0
  let negRate = 0
  const [pR, setPosRate] = useState();
  const [nR, setNegRate] = useState();
  const [posclick, setPosClick] = useState(false);
  const [negclick, setNegClick] = useState(false);
  const [ctr, setCtr] = useState(0);
  const [voted, setVoted] = useState({});

  const [r1,setR1] = useState(0);
  const [r2,setR2] = useState(0);
  const [r3,setR3] = useState(0);

  const [refereeCTR, setRefereeCTR] = useState(0)

  /**
   * rate the administrative act with the given id according to the given rate type 
   * @param  {integer} id id of the administrative act
   * @param  {string} rate rate type, pos or neg, of the adminisrative act
   */
  const handleRate = async (id,rate) => {
    Axios.get(`http://localhost:3001/api/ratingadminact/act_id=${id}&user_id=${user[0].id}`)
    .then((response) => {
        console.log(response.data,"data")
        if(response.data.length !== 0) {
          if(response.data[0].rate_type === rate) {
            console.log("del time")
            Axios.delete(`http://localhost:3001/api/deleterate/${response.data[0].id}`)
            .then((response) => {
                alert("deleted");
            });
          } else {
            Axios.put("http://localhost:3001/api/updaterateadminact", {
              user_id:user[0].id,
              rate_type: rate,
              act_id: id
            }).then((response) => {
                alert("successfully voted act");
            });
          }
        } 
        else {
          alert("not rated before");
          Axios.post("http://localhost:3001/api/rateadminact", {
            user_id:user[0].id,
            rate_type: rate,
            act_id: id
          }).then((response) => {
              alert("successfully voted act");
          });
        }
    });
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
}, [])

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/ratingreferee/match_id=${match_id}`)
    .then((response) => {
      console.log(response.data)
      response.data.forEach(element => {
        if(element.referee_num === 1) {
          console.log(element.value)
          setR1(r1 + element.value)
        }
        else if (element.referee_num === 2) {
          console.log(element.value)
          setR2(r2 + element.value)
        }
        else if (element.referee_num === 3) {
          console.log(element.value)
          setR3(r3 + element.value)
        }
      });
    });
    console.log(r1,r2,r3,"rates")
  }, [refereeCTR])


  /**
   * rate main referee according to the given value
   * @param  {integer} data rate value
   */
  const getRateRefereeOne = (data) => {
    Axios.get(`http://localhost:3001/api/ratingreferee/match_id=${match_id}&user_id=${user[0].id}&referee_num=${1}`)
    .then((response) => {
        console.log(response.data,"data respoms")
        console.log(response)
        if(response.data.length !== 0) {
          alert("rated before")
          Axios.put("http://localhost:3001/api/updateratereferee", {
            match_id: match_id,
            user_id:user[0].id,
            value: data,
            referee_num: 1
          }).then((response) => {
              alert("successfully changed vote");
          });
        } 
        else {
          alert("not rated before");
          Axios.post("http://localhost:3001/api/ratereferee", {
            match_id: match_id,
            user_id:user[0].id,
            value: data,
            referee_num: 1
          }).then((response) => {
              alert("successfully voted referee");
          });
        }
    });
    setRefereeCTR(refereeCTR + 1)
  }

  const getRateRefereeTwo = (data) => {
    Axios.get(`http://localhost:3001/api/ratingreferee/match_id=${match_id}&user_id=${user[0].id}&referee_num=${2}`)
    .then((response) => {
        console.log(response.data,"data respoms")
        console.log(response)
        if(response.data.length !== 0) {
          alert("rated before")
          Axios.put("http://localhost:3001/api/updateratereferee", {
            match_id: match_id,
            user_id:user[0].id,
            value: data,
            referee_num: 2
          }).then((response) => {
              alert("successfully changed vote");
          });
        } 
        else {
          alert("not rated before");
          Axios.post("http://localhost:3001/api/ratereferee", {
            match_id: match_id,
            user_id:user[0].id,
            value: data,
            referee_num: 2
          }).then((response) => {
              alert("successfully voted referee");
          });
        }
    });
    setRefereeCTR(refereeCTR + 1)
  }

  const getRateRefereeThree = (data) => {
    Axios.get(`http://localhost:3001/api/ratingreferee/match_id=${match_id}&user_id=${user[0].id}&referee_num=${3}`)
    .then((response) => {
        console.log(response.data,"data respoms")
        console.log(response)
        if(response.data.length !== 0) {
          alert("rated before")
          Axios.put("http://localhost:3001/api/updateratereferee", {
            match_id: match_id,
            user_id:user[0].id,
            value: data,
            referee_num: 3
          }).then((response) => {
              alert("successfully changed vote");
          });
        } 
        else {
          alert("not rated before");
          Axios.post("http://localhost:3001/api/ratereferee", {
            match_id: match_id,
            user_id:user[0].id,
            value: data,
            referee_num: 3
          }).then((response) => {
              alert("successfully voted referee");
          });
        }
    });
    setRefereeCTR(refereeCTR + 1)
  }

  if(match_data.main_referee != null){
    text = <div className='referee-container'>
              <text className='referee-text'>Main Official: {match_data.main_referee}</text>
              <div className='referee-rating'>
              <StarRating setRate={getRateRefereeOne}/>
              </div>
              <text className='referee-text'>1st Assistant Official: {match_data.first_assistant_referee}</text>
              <div className='referee-rating'>
              <StarRating setRate={getRateRefereeTwo}/>
              </div>
              <text className='referee-text'>2nd Assistant Official: {match_data.second_assistant_referee}</text>
              <div className='referee-rating'>
              <StarRating setRate={getRateRefereeThree}/>
              </div>
          </div>
  }
  else{
    text = <div className='referee-container'>
      <text className='referee-text'>Referees not yet assigned.</text>
    </div>
}

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
      <i className="postIconLike fas fa-thumbs-up" onClick={() => handleRate(act.admin_act_id,"pos")}></i>
      <i className="postIconDislike fas fa-thumbs-down" onClick={() => handleRate(act.admin_act_id,"neg")}></i>
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
            <text className='referee-title'>Referees</text>
            {text}
          </div >
        </div>
    </div>
    </>
  )
}

export default Game
