import React, {useState} from "react";
import './FormAdmin.css'
import Axios from "axios";

function FormAdminAct() {

    
  const [actgame, setActGame] = useState("");
  const [actinfo, setActInfo] = useState("");
  const [actdate, setActDate] = useState("");
  const [acttime, setActTime] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
          
      };

  return (
    <div className="form-content-act">
        <h1 className="title-act">Create an Administrative Act</h1>
      <form onSubmit={handleSubmit} className="form-act" noValidate>
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
        <button className="form-input-btn-act" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default FormAdminAct
