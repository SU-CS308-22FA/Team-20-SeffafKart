import React, {useState} from "react";
import Axios from "axios";
import './Forms.css'

function FormCreateMatch() {
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [hometeam, setHomeTeam] = useState("");
  const [awayteam, setAwayTeam] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location === "" || date ===""  || time ===""  || hometeam ===""  || awayteam ==="") {
      setErrors("All parts must be filled!!")
    }
    else {
      Axios.post("http://localhost:3001/api/creatematch", {
        location: location,
        time: time,
        home_team: hometeam,
        away_team: awayteam,
        date: date
      }).then((err) => {
        alert("Match is successfully created");
        //console.log(err);
        if(err === null) {
          console.log("Match created")
        }
        });
    }
  };

  return (
    <div className="form-content-match">
        <h1 className="title-act">Create a Football Match</h1>
      <form className="form-act" noValidate>
        <div className="form-inputs-act">
        <label className="form-label-act">Enter the location of the game</label>
        <input
            className="form-input-act"
            type="text"
            name="location"
            value={location}
            placeholder="Give the location info of the game"
            onChange={(e) => {
                setLocation(e.target.value);
            }}
        />
        </div>
        <div className="form-inputs-act">
        <label className="form-label-act">Enter the home team</label>
        <textarea
            id='' cols='30' rows='6'
            className="form-input-act-text"
            type="text"
            name="hometeam"
            value={hometeam}
            placeholder="Enter the home team"
            onChange={(e) => {
            setHomeTeam(e.target.value);
            }}
        />
        </div>
        <div className="form-inputs-act">
        <label className="form-label-act">Enter the away team</label>
        <textarea
            id='' cols='30' rows='6'
            className="form-input-act-text"
            type="text"
            name="awayteam"
            value={awayteam}
            placeholder="Enter the away team"
            onChange={(e) => {
            setAwayTeam(e.target.value);
            }}
        />
        </div>
        <div className="form-datetime">
        <label className="form-label-act">Enter the date and time of the match</label>
        <input
            className="form-date"
            type="text"
            name="date"
            value={date}
            placeholder="**/**/****"
            onChange={(e) => {
            setDate(e.target.value);
            }}
        />
        <input
            className="form-time"
            type="text"
            name="time"
            value={time}
            placeholder="00:00"
            onChange={(e) => {
            setTime(e.target.value);
            }}
        />
        </div>
        <label className="form-error">{errors}</label>
        <button className="form-input-btn-act" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default FormCreateMatch