import React, {useState} from "react";
import './FormAdmin.css'
import Axios from "axios";
import { useSelector } from "react-redux";
import {useLocation} from "react-router-dom";

function FormAdminAct(props) {
    const location = useLocation();
    console.log(props, "props");
    console.log(location, "location")
    const user = useSelector((state) => state.user.currentUser);
    const user_id = user[0].id

    const match_id = location.state;
    console.log(match_id)

    const [actgame, setActGame] = useState("");
    const [actinfo, setActInfo] = useState("");
    const [actdate, setActDate] = useState("");
    const [acttime, setActTime] = useState("");

    /**
     * Handle the submit event of inserting an administrative act to the database via form
     * @param  {Event} e The event instance of the current state
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        Axios.post("https://seffafkart-client.onrender.com/api/createact", {
          author_id: user_id,
          act_info: actinfo,
          act_date: actdate,
          act_time: acttime,
          match_id: match_id
        }).then((err) => {
          alert("Act is successfully created");
          //console.log(err);
          if(err === null) {
            console.log("act created")
          }
         });  
      };

  return (
    <div className="form-content-act">
        <h1 className="title-act">Create an Administrative Act</h1>
      <form className="form-act" noValidate>
        <div className="form-inputs-act">
        {/* {errors.username && <p>{errors.username}</p>} */}
        </div>
        <div className="form-inputs-act">
        <label className="form-label-act">Enter the content of the administrative act</label>
        <textarea
            id='' cols='30' rows='6'
            className="form-input-act-text"
            type="text"
            name="actinfo"
            value={actinfo}
            placeholder="Enter the information"
            onChange={(e) => {
            setActInfo(e.target.value);
            }}
        />
        {/* {errors.username && <p>{errors.username}</p>} */}
        </div>
        <div className="form-datetime">
        <label className="form-label-act">Enter the time of the act</label>
        <input
            className="form-time"
            type="text"
            name="acttime"
            value={acttime}
            placeholder="00:00"
            onChange={(e) => {
            setActTime(e.target.value);
            }}
        />
        {/* {errors.username && <p>{errors.username}</p>} */}
        </div>
        <button className="form-input-btn-act" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default FormAdminAct
