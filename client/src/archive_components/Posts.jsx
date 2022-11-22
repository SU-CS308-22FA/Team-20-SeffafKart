import Post from "./Post"
import "./posts.css"
import Axios from "axios";
import React, { useState} from "react";
import { useSelector } from "react-redux";

export default function Posts(){
    const user = useSelector((state) => state.user.currentUser);
    const [success, setSuccess] = useState(false);
    const [adminActs, SetAdminActs] = useState("");

    const getAdminActs = async (e) => {
        e.preventDefault();
        Axios.get("http://localhost:3001/api/admin_acts", {
        }).then((response) => {
            console.log(response.data)
            SetAdminActs(response.data)
         });
      };
    
      const listItems = adminActs.map((act) =>
        <Post item={act} />
        );
      

    return (
        <div className="posts">
            {listItems}
        </div>
    )
}