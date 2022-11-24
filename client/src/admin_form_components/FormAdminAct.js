import React, {useState} from "react";
import './FormAdmin.css'
import Axios from "axios";
import { useSelector } from "react-redux";

function FormAdminAct() {
    const user = useSelector((state) => state.user.currentUser);
    const user_id = user[0].id


    const [actgame, setActGame] = useState("");
    const [actinfo, setActInfo] = useState("");
    const [actdate, setActDate] = useState("");
    const [acttime, setActTime] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        Axios.post("https://seffafkart-client.onrender.com/api/createact", {
          author_id: user_id,
          act_info: actinfo,
          act_date: actdate,
          act_time: acttime,
          act_game: actgame
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
        <label className="form-label-act">Enter the match the act belongs to</label>
        <input
            className="form-input-act"
            type="text"
            name="actgame"
            value={actgame}
            placeholder="Give the match information"
            onChange={(e) => {
                setActGame(e.target.value);
            }}
        />
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
        <label className="form-label-act">Enter the date and time of the act</label>
        <input
            className="form-date"
            type="text"
            name="actdate"
            value={actdate}
            placeholder="**/**/****"
            onChange={(e) => {
            setActDate(e.target.value);
            }}
        />
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
