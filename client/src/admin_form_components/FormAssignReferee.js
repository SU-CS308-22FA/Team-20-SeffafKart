import React, {useState} from "react";
import './FormAssignReferee.css'
import Axios from "axios";
import { useSelector } from "react-redux";
import {useLocation} from "react-router-dom";

function FormAssignReferee(props) {
    const location = useLocation();
    console.log(props, "props");
    console.log(location, "location")
    const user = useSelector((state) => state.user.currentUser);
    const user_id = user[0].id

    const match_id = location.state;
    console.log(match_id)
    console.log(user_id)

    const [main_referee, setMainReferee] = useState("");
    const [first_assistant_referee, set1stAssistant] = useState("");
    const [second_assistant_referee, set2ndAssistant] = useState("");
    // const [acttime, setActTime] = useState("");

    /**
     * Handle the submit event of updating referee fields of an football match to the database via form
     * @param  {Event} e The event instance of the current state
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        Axios.put("http://localhost:3001/api/assignofficials", {
          main_referee: main_referee,
          first_assistant_referee: first_assistant_referee,
          second_assistant_referee: second_assistant_referee,
          match_id: match_id
        }).then((err) => {
          alert("Referees are successfully assigned");
          //console.log(err);
          if(err === null) {
            console.log("assignment done")
          }
         });  
      };

    //   const updatePassword = (e) => {
    //     e.preventDefault();
    //     Axios.put("http://localhost:3001/api/updatepassword", {
    //       password: newPassword,
    //       id: userId,
    //     }).then((response) => {
    //         dispatch(updateUserPassword(newPassword))
    //         alert("update");
    //     });
    //   };

  return (
    <div className="form-content-referee">
        <h1 className="title-act">Assign Match Officials</h1>
      <form className="form-act" noValidate>
        <div className="form-inputs-act">
        <label className="form-label-act">Enter the main official</label>
        <input
            className="form-input-act"
            type="text"
            name="main_official"
            value={main_referee}
            placeholder="Give the name of the main referee"
            onChange={(e) => {
                setMainReferee(e.target.value);
            }}
        />
        {/* {errors.username && <p>{errors.username}</p>} */}
        </div>
        <div className="form-inputs-act">
        <label className="form-label-act">Enter the first assistant official's name</label>
        <input
            className="form-input-act"
            type="text"
            name="first_assistant_off"
            value={first_assistant_referee}
            placeholder="Enter the name of first assistant referee"
            onChange={(e) => {
            set1stAssistant(e.target.value);
            }}
        />
         {/* {errors.username && <p>{errors.username}</p>} */}
        </div>
        <div className="form-inputs-act">
        <label className="form-label-act">Enter the second assistant official's name</label>
        <input
            className="form-input-act"
            type="text"
            name="second_assistant_off"
            value={second_assistant_referee}
            placeholder="Enter the name of second assistant referee"
            onChange={(e) => {
            set2ndAssistant(e.target.value);
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

export default FormAssignReferee
